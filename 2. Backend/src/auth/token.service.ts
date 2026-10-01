import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomBytes } from 'crypto';

export interface AccessTokenPayload {
  sub: string; // userId
  sid: string; // sessionId
  did: string; // deviceId
}

/**
 * Owns all token-related cryptographic operations:
 *  - short-lived, signed JWT access tokens (stateless verification)
 *  - long-lived opaque refresh tokens (state-backed via Session rows so
 *    they can be revoked server-side, which a stateless JWT cannot be)
 *
 * The refresh token's plaintext is only ever returned to the client once,
 * at issuance; only its SHA-256 hash is persisted, so a database leak
 * cannot be replayed as a valid refresh token.
 */
@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  signAccessToken(payload: AccessTokenPayload): {
    token: string;
    expiresInSeconds: number;
  } {
    const expiresInSeconds = this.config.get<number>(
      'jwt.accessTokenTtlSeconds',
    ) as number;

    const token = this.jwtService.sign(payload, {
      secret: this.config.get<string>('jwt.accessSecret'),
      expiresIn: expiresInSeconds,
      issuer: this.config.get<string>('jwt.issuer'),
      audience: this.config.get<string>('jwt.audience'),
    });

    return { token, expiresInSeconds };
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    return this.jwtService.verify<AccessTokenPayload>(token, {
      secret: this.config.get<string>('jwt.accessSecret'),
      issuer: this.config.get<string>('jwt.issuer'),
      audience: this.config.get<string>('jwt.audience'),
    });
  }

  generateRefreshToken(): { token: string; hash: string; expiresAt: Date } {
    const token = randomBytes(64).toString('base64url');
    const hash = this.hashRefreshToken(token);
    const ttlSeconds = this.config.get<number>(
      'jwt.refreshTokenTtlSeconds',
    ) as number;
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
    return { token, hash, expiresAt };
  }

  hashRefreshToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
