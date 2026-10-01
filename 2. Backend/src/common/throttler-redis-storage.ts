import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerStorage } from '@nestjs/throttler';
import Redis from 'ioredis';

/** Matches @nestjs/throttler's ThrottlerStorageRecord shape (not a public export). */
interface ThrottlerStorageRecord {
  totalHits: number;
  timeToExpire: number;
  isBlocked: boolean;
  timeToBlockExpire: number;
}

/**
 * Rate-limit counters must survive across horizontally-scaled instances,
 * so they live in Redis rather than in-process memory (the throttler
 * module's default). This uses its own short-lived Redis connection
 * rather than the shared REDIS_CLIENT provider because it must be
 * constructed synchronously inside ThrottlerModule.forRootAsync's
 * useFactory, before the rest of the DI graph (including RedisModule) is
 * necessarily resolved.
 *
 * Failure behavior: if Redis is unreachable, increments reject and the
 * guard's own error handling determines whether requests fail open or
 * closed (see AppThrottlerGuard) — this class does not swallow errors.
 */
@Injectable()
export class ThrottlerStorageRedisService implements ThrottlerStorage {
  private readonly logger = new Logger(ThrottlerStorageRedisService.name);
  private readonly client: Redis;

  constructor(config: ConfigService) {
    const url = config.get<string>('redis.url') as string;
    this.client = new Redis(url, {
      maxRetriesPerRequest: 1,
      retryStrategy: (times) => Math.min(times * 200, 2000),
    });
    this.client.on('error', (err) =>
      this.logger.warn(`Throttler Redis connection error: ${err.message}`),
    );
  }

  async increment(
    key: string,
    ttl: number,
    limit: number,
    blockDuration: number,
    throttlerName: string,
  ): Promise<ThrottlerStorageRecord> {
    const redisKey = `throttle:${throttlerName}:${key}`;
    const blockKey = `${redisKey}:blocked`;

    const isBlocked = await this.client.get(blockKey);
    if (isBlocked) {
      const blockTtl = await this.client.pttl(blockKey);
      return {
        totalHits: limit + 1,
        timeToExpire: Math.ceil(blockTtl / 1000),
        isBlocked: true,
        timeToBlockExpire: Math.ceil(blockTtl / 1000),
      };
    }

    const totalHits = await this.client.incr(redisKey);
    if (totalHits === 1) {
      await this.client.pexpire(redisKey, ttl);
    }
    const pttl = await this.client.pttl(redisKey);

    if (totalHits > limit && blockDuration > 0) {
      await this.client.set(blockKey, '1', 'PX', blockDuration);
      return {
        totalHits,
        timeToExpire: Math.ceil(pttl / 1000),
        isBlocked: true,
        timeToBlockExpire: Math.ceil(blockDuration / 1000),
      };
    }

    return {
      totalHits,
      timeToExpire: Math.ceil(pttl / 1000),
      isBlocked: false,
      timeToBlockExpire: 0,
    };
  }
}
