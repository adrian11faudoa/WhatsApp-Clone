import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PasswordService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              const values: Record<string, number> = {
                'argon2.memoryCost': 8192,
                'argon2.timeCost': 2,
                'argon2.parallelism': 1,
              };
              return values[key];
            },
          },
        },
      ],
    }).compile();

    service = moduleRef.get(PasswordService);
  });

  it('hashes a password to an argon2id hash distinct from the plaintext', async () => {
    const hash = await service.hash('a-very-secret-password');
    expect(hash).toContain('$argon2id$');
    expect(hash).not.toEqual('a-very-secret-password');
  });

  it('verifies a correct password against its hash', async () => {
    const hash = await service.hash('correct-horse-battery-staple');
    await expect(
      service.verify(hash, 'correct-horse-battery-staple'),
    ).resolves.toBe(true);
  });

  it('rejects an incorrect password', async () => {
    const hash = await service.hash('correct-horse-battery-staple');
    await expect(service.verify(hash, 'wrong-password')).resolves.toBe(false);
  });

  it('treats a malformed hash as a failed verification rather than throwing', async () => {
    await expect(service.verify('not-a-real-hash', 'anything')).resolves.toBe(
      false,
    );
  });

  it('produces different hashes for the same password (random salt)', async () => {
    const hashA = await service.hash('same-password');
    const hashB = await service.hash('same-password');
    expect(hashA).not.toEqual(hashB);
  });
});
