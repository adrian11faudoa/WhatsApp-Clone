import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  const configValues: Record<string, unknown> = {
    'jwt.accessSecret': 'a'.repeat(32),
    'jwt.refreshSecret': 'b'.repeat(32),
    'jwt.accessTokenTtlSeconds': 900,
    'jwt.refreshTokenTtlSeconds': 2_592_000,
    'jwt.issuer': 'messaging-platform',
    'jwt.audience': 'messaging-platform-clients',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TokenService,
        JwtService,
        {
          provide: ConfigService,
          useValue: { get: (key: string) => configValues[key] },
        },
      ],
    }).compile();

    service = moduleRef.get(TokenService);
  });

  it('signs and verifies an access token round-trip', () => {
    const payload = {
      sub: 'user-1',
      sid: 'session-1',
      did: 'device-1',
    };
    const { token, expiresInSeconds } = service.signAccessToken(payload);
    expect(expiresInSeconds).toBe(900);

    const decoded = service.verifyAccessToken(token);
    expect(decoded.sub).toBe(payload.sub);
    expect(decoded.sid).toBe(payload.sid);
    expect(decoded.did).toBe(payload.did);
  });

  it('rejects a token signed with a different secret', () => {
    const forged = new JwtService().sign(
      { sub: 'attacker' },
      { secret: 'wrong-secret'.padEnd(32, '0') },
    );
    expect(() => service.verifyAccessToken(forged)).toThrow();
  });

  it('generates a refresh token whose hash is deterministic for the same token', () => {
    const { token, hash } = service.generateRefreshToken();
    expect(service.hashRefreshToken(token)).toBe(hash);
  });

  it('generates unique refresh tokens on each call', () => {
    const a = service.generateRefreshToken();
    const b = service.generateRefreshToken();
    expect(a.token).not.toEqual(b.token);
    expect(a.hash).not.toEqual(b.hash);
  });
});
