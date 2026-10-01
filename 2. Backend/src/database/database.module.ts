import { Global, Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export const DATABASE_CONNECTION = Symbol('DATABASE_CONNECTION');
export const DATABASE_POOL = Symbol('DATABASE_POOL');

export type Database = NodePgDatabase<typeof schema>;
export type DbTransaction = Parameters<
  Parameters<Database['transaction']>[0]
>[0];

/**
 * Centralizes PostgreSQL connection lifecycle behind a single provider so
 * no other module constructs its own client. All schema-aware queries use
 * the injected `Database` (Drizzle) instance; the raw `Pool` is exposed
 * separately only for health checks and manual transaction control.
 */
@Global()
@Module({
  providers: [
    {
      provide: DATABASE_POOL,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const logger = new Logger('DatabaseModule');
        const connectionString = config.get<string>('database.url');

        const pool = new Pool({
          connectionString,
          max: 10,
          idleTimeoutMillis: 30_000,
          connectionTimeoutMillis: 5_000,
        });

        pool.on('error', (err) => {
          // Idle client errors must not crash the process; they are
          // logged and surfaced through readiness checks instead.
          logger.error(`Unexpected idle Postgres client error: ${err.message}`);
        });

        return pool;
      },
    },
    {
      provide: DATABASE_CONNECTION,
      inject: [DATABASE_POOL],
      useFactory: (pool: Pool): Database => drizzle(pool, { schema }),
    },
  ],
  exports: [DATABASE_CONNECTION, DATABASE_POOL],
})
export class DatabaseModule implements OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(private readonly moduleRef: ModuleRef) {}

  async onApplicationShutdown() {
    try {
      const pool = this.moduleRef.get<Pool>(DATABASE_POOL, { strict: false });
      if (pool) {
        await pool.end();
        this.logger.log('Postgres connection pool closed cleanly.');
      }
    } catch (err) {
      this.logger.warn(
        `Error while closing Postgres connection pool: ${(err as Error).message}`,
      );
    }
  }
}
