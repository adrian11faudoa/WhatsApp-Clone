import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import {
  PostgresHealthIndicator,
  RedisHealthIndicator,
} from './health.indicators';

/**
 * Liveness reports "process is up" only — no dependency checks — so
 * orchestrators don't restart a healthy process because of a transient
 * downstream blip. Readiness checks actual dependencies and is what load
 * balancers / orchestrators should gate traffic on.
 */
@ApiExcludeController()
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly postgres: PostgresHealthIndicator,
    private readonly redis: RedisHealthIndicator,
  ) {}

  @Get('live')
  liveness() {
    return { status: 'ok' };
  }

  @Get('ready')
  @HealthCheck()
  readiness() {
    return this.health.check([
      () => this.postgres.check('database'),
      () => this.redis.check('redis'),
    ]);
  }
}
