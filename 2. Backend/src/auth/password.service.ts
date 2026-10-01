import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

/**
 * Centralizes password hashing so no module implements its own hashing
 * logic. Uses argon2id (the OWASP-recommended variant) with configurable
 * cost parameters. Never implement custom cryptography here.
 */
@Injectable()
export class PasswordService {
  constructor(private readonly config: ConfigService) {}

  async hash(plaintext: string): Promise<string> {
    return argon2.hash(plaintext, {
      type: argon2.argon2id,
      memoryCost: this.config.get<number>('argon2.memoryCost'),
      timeCost: this.config.get<number>('argon2.timeCost'),
      parallelism: this.config.get<number>('argon2.parallelism'),
    });
  }

  async verify(hash: string, plaintext: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, plaintext);
    } catch {
      // A malformed hash must never throw into caller code — treat as a
      // verification failure so callers can respond uniformly (avoids
      // distinguishable error paths that would aid enumeration).
      return false;
    }
  }
}
