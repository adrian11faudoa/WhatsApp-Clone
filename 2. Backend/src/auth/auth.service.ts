import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { and, eq } from 'drizzle-orm';
import {
  DATABASE_CONNECTION,
  Database,
  DbTransaction,
} from '../database/database.module';
import { devices, profiles, sessions, users } from '../database/schema';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';
import { AuditService } from '../common/audit/audit.service';
import { AppException } from '../common/errors/app.exception';
import { AppErrorCode } from '../common/errors/app-error-codes';
import { HttpStatus } from '@nestjs/common';
import { DeviceInfoDto, LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

interface RequestMeta {
  ip?: string;
  userAgent?: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: Database,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly auditService: AuditService,
    private readonly config: ConfigService,
  ) {}

  async register(
    dto: RegisterDto,
    meta: RequestMeta,
  ): Promise<AuthResponseDto> {
    const normalizedEmail = dto.email.trim().toLowerCase();
    const normalizedUsername = dto.username.trim();

    const passwordHash = await this.passwordService.hash(dto.password);

    try {
      const result = await this.db.transaction(async (tx) => {
        const existingEmail = await tx
          .select({ id: users.id })
          .from(users)
          .where(eq(users.email, normalizedEmail))
          .limit(1);
        if (existingEmail.length > 0) {
          throw new AppException({
            code: AppErrorCode.EMAIL_ALREADY_REGISTERED,
            message: 'An account with this email already exists.',
            status: HttpStatus.CONFLICT,
          });
        }

        const existingUsername = await tx
          .select({ id: profiles.id })
          .from(profiles)
          .where(eq(profiles.username, normalizedUsername))
          .limit(1);
        if (existingUsername.length > 0) {
          throw new AppException({
            code: AppErrorCode.USERNAME_ALREADY_TAKEN,
            message: 'This username is already taken.',
            status: HttpStatus.CONFLICT,
          });
        }

        const [user] = await tx
          .insert(users)
          .values({ email: normalizedEmail, passwordHash })
          .returning({ id: users.id, email: users.email });

        await tx.insert(profiles).values({
          userId: user.id,
          username: normalizedUsername,
          displayName: dto.displayName.trim(),
        });

        const device = await this.registerDeviceTx(tx, user.id, dto.device);
        const session = await this.createSessionTx(tx, user.id, device.id);

        return { user, device, session };
      });

      await this.auditService.record({
        type: 'AUTH_REGISTER',
        userId: result.user.id,
        ip: meta.ip,
        userAgent: meta.userAgent,
      });

      return this.buildAuthResponse(
        result.user.id,
        normalizedEmail,
        normalizedUsername,
        dto.displayName.trim(),
        result.device.id,
        result.session.id,
        result.session.refreshToken,
      );
    } catch (err) {
      // Unique-constraint races (two concurrent registrations for the
      // same email/username) surface as a Postgres error even though we
      // pre-checked inside the transaction; translate defensively.
      if (this.isUniqueViolation(err, 'users_email_unique')) {
        throw new AppException({
          code: AppErrorCode.EMAIL_ALREADY_REGISTERED,
          message: 'An account with this email already exists.',
          status: HttpStatus.CONFLICT,
        });
      }
      if (this.isUniqueViolation(err, 'profiles_username_unique')) {
        throw new AppException({
          code: AppErrorCode.USERNAME_ALREADY_TAKEN,
          message: 'This username is already taken.',
          status: HttpStatus.CONFLICT,
        });
      }
      throw err;
    }
  }

  async login(dto: LoginDto, meta: RequestMeta): Promise<AuthResponseDto> {
    const normalizedEmail = dto.email.trim().toLowerCase();

    const [user] = await this.db
      .select({
        id: users.id,
        email: users.email,
        passwordHash: users.passwordHash,
        status: users.status,
      })
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    // Always run a hash verification, even when no user exists, using a
    // fixed dummy hash — this keeps response timing similar between
    // "unknown email" and "wrong password" so timing cannot be used to
    // enumerate registered emails.
    const passwordValid = await this.passwordService.verify(
      user?.passwordHash ?? AuthService.DUMMY_HASH,
      dto.password,
    );

    if (!user || !passwordValid) {
      await this.auditService.record({
        type: 'AUTH_LOGIN_FAILURE',
        ip: meta.ip,
        userAgent: meta.userAgent,
        metadata: { email: normalizedEmail },
      });
      throw new AppException({
        code: AppErrorCode.INVALID_CREDENTIALS,
        message: 'Invalid email or password.',
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    if (user.status !== 'ACTIVE') {
      throw new AppException({
        code: AppErrorCode.ACCOUNT_DISABLED,
        message: 'This account is disabled.',
        status: HttpStatus.FORBIDDEN,
      });
    }

    const [profile] = await this.db
      .select({
        username: profiles.username,
        displayName: profiles.displayName,
      })
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1);

    const result = await this.db.transaction(async (tx) => {
      const device = await this.registerDeviceTx(tx, user.id, dto.device);
      const session = await this.createSessionTx(tx, user.id, device.id);
      return { device, session };
    });

    await this.auditService.record({
      type: 'AUTH_LOGIN_SUCCESS',
      userId: user.id,
      ip: meta.ip,
      userAgent: meta.userAgent,
    });

    return this.buildAuthResponse(
      user.id,
      user.email,
      profile.username,
      profile.displayName,
      result.device.id,
      result.session.id,
      result.session.refreshToken,
    );
  }

  async refresh(
    refreshToken: string,
    meta: RequestMeta,
  ): Promise<AuthResponseDto> {
    const hash = this.tokenService.hashRefreshToken(refreshToken);

    const [session] = await this.db
      .select()
      .from(sessions)
      .where(eq(sessions.refreshTokenHash, hash))
      .limit(1);

    if (!session || session.revoked || session.expiresAt < new Date()) {
      throw new AppException({
        code: AppErrorCode.SESSION_EXPIRED,
        message: 'Refresh token is invalid or has expired.',
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    const [user] = await this.db
      .select({
        id: users.id,
        email: users.email,
        status: users.status,
      })
      .from(users)
      .where(eq(users.id, session.userId))
      .limit(1);

    if (!user || user.status !== 'ACTIVE') {
      throw new AppException({
        code: AppErrorCode.ACCOUNT_DISABLED,
        message: 'This account is disabled.',
        status: HttpStatus.FORBIDDEN,
      });
    }

    const [profile] = await this.db
      .select({
        username: profiles.username,
        displayName: profiles.displayName,
      })
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1);

    // Refresh-token rotation: the presented token is invalidated and a
    // new one is issued on the same session row, so a stolen-and-replayed
    // old refresh token stops working after the legitimate client's next
    // refresh.
    const rotated = this.tokenService.generateRefreshToken();
    await this.db
      .update(sessions)
      .set({
        refreshTokenHash: rotated.hash,
        expiresAt: rotated.expiresAt,
        lastUsedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(sessions.id, session.id));

    await this.auditService.record({
      type: 'AUTH_TOKEN_REFRESH',
      userId: user.id,
      ip: meta.ip,
      userAgent: meta.userAgent,
    });

    return this.buildAuthResponse(
      user.id,
      user.email,
      profile.username,
      profile.displayName,
      session.deviceId,
      session.id,
      rotated.token,
    );
  }

  async logout(
    userId: string,
    currentSessionId: string,
    refreshToken: string | undefined,
    meta: RequestMeta,
  ): Promise<void> {
    let targetSessionId = currentSessionId;

    if (refreshToken) {
      const hash = this.tokenService.hashRefreshToken(refreshToken);
      const [session] = await this.db
        .select({ id: sessions.id, userId: sessions.userId })
        .from(sessions)
        .where(eq(sessions.refreshTokenHash, hash))
        .limit(1);

      // Only allow revoking a session that belongs to the authenticated
      // user — never trust the refresh token alone as authorization.
      if (session && session.userId === userId) {
        targetSessionId = session.id;
      }
    }

    await this.db
      .update(sessions)
      .set({ revoked: true, revokedAt: new Date(), updatedAt: new Date() })
      .where(
        and(eq(sessions.id, targetSessionId), eq(sessions.userId, userId)),
      );

    await this.auditService.record({
      type: 'AUTH_LOGOUT',
      userId,
      ip: meta.ip,
      userAgent: meta.userAgent,
    });
  }

  async revokeAllSessions(userId: string, meta: RequestMeta): Promise<void> {
    await this.db
      .update(sessions)
      .set({ revoked: true, revokedAt: new Date(), updatedAt: new Date() })
      .where(and(eq(sessions.userId, userId), eq(sessions.revoked, false)));

    await this.auditService.record({
      type: 'SESSION_REVOKED_ALL',
      userId,
      ip: meta.ip,
      userAgent: meta.userAgent,
    });
  }

  // ---------------------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------------------

  /**
   * A fixed, valid argon2id hash of an unguessable constant, used only to
   * equalize timing when no matching user account exists. Not a real
   * account credential.
   */
  private static readonly DUMMY_HASH =
    '$argon2id$v=19$m=19456,t=2,p=1$c29tZXNhbHRzb21lc2FsdA$Rt6t8y0M0F2M9m3nQmS/qXKV5c4qFQ4v9U2XkR6qk1o';

  private async registerDeviceTx(
    tx: DbTransaction,
    userId: string,
    deviceInfo: DeviceInfoDto | undefined,
  ) {
    const [device] = await tx
      .insert(devices)
      .values({
        userId,
        platform: deviceInfo?.platform ?? 'UNKNOWN',
        name: deviceInfo?.name,
        appVersion: deviceInfo?.appVersion,
      })
      .returning({ id: devices.id });
    return device;
  }

  private async createSessionTx(
    tx: DbTransaction,
    userId: string,
    deviceId: string,
  ) {
    const refresh = this.tokenService.generateRefreshToken();
    const [session] = await tx
      .insert(sessions)
      .values({
        userId,
        deviceId,
        refreshTokenHash: refresh.hash,
        expiresAt: refresh.expiresAt,
      })
      .returning({ id: sessions.id });
    return { id: session.id, refreshToken: refresh.token };
  }

  private buildAuthResponse(
    userId: string,
    email: string,
    username: string,
    displayName: string,
    deviceId: string,
    sessionId: string,
    refreshToken: string,
  ): AuthResponseDto {
    const { token, expiresInSeconds } = this.tokenService.signAccessToken({
      sub: userId,
      sid: sessionId,
      did: deviceId,
    });

    return {
      user: { id: userId, email, username, displayName },
      tokens: {
        accessToken: token,
        refreshToken,
        accessTokenExpiresInSeconds: expiresInSeconds,
      },
      deviceId,
      sessionId,
    };
  }

  private isUniqueViolation(err: unknown, constraintName: string): boolean {
    const pgErr = this.extractPgError(err);
    return pgErr?.code === '23505' && pgErr?.constraint === constraintName;
  }

  private extractPgError(
    err: unknown,
  ): { code?: string; constraint?: string } | undefined {
    if (!err || typeof err !== 'object') return undefined;
    const candidate = err as {
      code?: string;
      constraint?: string;
      cause?: unknown;
    };
    if (candidate.code && candidate.constraint) return candidate;
    if (candidate.cause) return this.extractPgError(candidate.cause);
    return undefined;
  }
}
