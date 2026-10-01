import { Global, Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import Redis from 'ioredis';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

/**
 * Single shared Redis client for ephemeral/high-speed capabilities:
 * throttling storage today; presence, distributed coordination, and
 * short-lived sync state in future milestones. Redis is never treated as
 * the durable source of truth for users, sessions, or conversations —
 * those live in PostgreSQL.
 *
 * Failure behavior: connection errors are logged, not thrown, so a
 * transient Redis outage degrades (e.g. rate limiting fails open at the
 * throttler-guard level) rather than crashing the process. Readiness
 * reports Redis health separately via the health module.
 */
@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const logger = new Logger('RedisModule');
        const enabled = config.get<boolean>('redis.enabled');
        const url = config.get<string>('redis.url') as string;

        const client = new Redis(url, {
          lazyConnect: !enabled,
          maxRetriesPerRequest: 2,
          retryStrategy: (times) => Math.min(times * 200, 2000),
        });

        client.on('error', (err) => {
          logger.warn(`Redis client error: ${err.message}`);
        });
        client.on('connect', () => logger.log('Redis client connected.'));

        return client;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule implements OnApplicationShutdown {
  private readonly logger = new Logger(RedisModule.name);

  constructor(private readonly moduleRef: ModuleRef) {}

  async onApplicationShutdown() {
    try {
      const client = this.moduleRef.get<Redis>(REDIS_CLIENT, {
        strict: false,
      });
      if (client) {
        client.disconnect();
        this.logger.log('Redis client disconnected cleanly.');
      }
    } catch (err) {
      this.logger.warn(
        `Error while disconnecting Redis client: ${(err as Error).message}`,
      );
    }
  }
}
