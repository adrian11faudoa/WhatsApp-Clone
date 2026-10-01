import { Inject, Injectable } from '@nestjs/common';
import { HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { Pool } from 'pg';
import Redis from 'ioredis';
import { DATABASE_POOL } from '../database/database.module';
import { REDIS_CLIENT } from '../redis/redis.module';

@Injectable()
export class PostgresHealthIndicator {
  constructor(@Inject(DATABASE_POOL) private readonly pool: Pool) {}

  async check(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.pool.query('SELECT 1');
      return { [key]: { status: 'up' } };
    } catch (err) {
      throw new HealthCheckError('Postgres check failed', {
        [key]: { status: 'down', message: (err as Error).message },
      });
    }
  }
}

@Injectable()
export class RedisHealthIndicator {
  constructor(@Inject(REDIS_CLIENT) private readonly client: Redis) {}

  async check(key: string): Promise<HealthIndicatorResult> {
    try {
      const result = await this.client.ping();
      if (result !== 'PONG') {
        throw new Error(`Unexpected PING response: ${result}`);
      }
      return { [key]: { status: 'up' } };
    } catch (err) {
      throw new HealthCheckError('Redis check failed', {
        [key]: { status: 'down', message: (err as Error).message },
      });
    }
  }
}
