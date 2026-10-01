import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../database/database.module';
import { sessions, users } from '../../database/schema';
import { AccessTokenPayload } from '../token.service';
import { AuthenticatedUser } from '../../common/decorators/current-user.decorator';

/**
 * Verifies the JWT signature/expiry (handled by passport-jwt) and then
 * checks live database state: the session must still exist and not be
 * revoked/expired, and the account must still be ACTIVE. This means a
 * revoked session or disabled account takes effect immediately, rather
 * than only once the (short-lived) access token itself expires.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    @Inject(DATABASE_CONNECTION) private readonly db: Database,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('jwt.accessSecret'),
      issuer: config.get<string>('jwt.issuer'),
      audience: config.get<string>('jwt.audience'),
    });
  }

  async validate(payload: AccessTokenPayload): Promise<AuthenticatedUser> {
    const [session] = await this.db
      .select({
        id: sessions.id,
        revoked: sessions.revoked,
        expiresAt: sessions.expiresAt,
        userId: sessions.userId,
        deviceId: sessions.deviceId,
      })
      .from(sessions)
      .where(eq(sessions.id, payload.sid))
      .limit(1);

    if (!session || session.revoked || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Session is no longer valid.');
    }

    const [user] = await this.db
      .select({ id: users.id, status: users.status })
      .from(users)
      .where(eq(users.id, payload.sub))
      .limit(1);

    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Account is not active.');
    }

    return {
      userId: user.id,
      sessionId: session.id,
      deviceId: session.deviceId,
    };
  }
}
