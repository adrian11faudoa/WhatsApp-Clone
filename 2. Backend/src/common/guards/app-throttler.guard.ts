import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ExecutionContext } from '@nestjs/common';

/**
 * Extends the default throttler guard so rate-limit keys are dimensioned
 * by authenticated account (when available) in addition to IP — this
 * keeps a single high-traffic NAT'd IP from starving unrelated accounts,
 * while still bounding unauthenticated endpoints (register/login) by IP.
 */
@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const userId = req.user?.userId;
    const ip = req.ips?.length ? req.ips[0] : req.ip;
    return userId ? `user:${userId}` : `ip:${ip}`;
  }

  /**
   * Rate limiting is disabled under automated tests: integration tests
   * exercise the same endpoints (register/login) many times in rapid
   * succession by design, and that is not the behavior the throttler is
   * meant to guard against. Production and development behavior is
   * unaffected.
   */
  protected async shouldSkip(_context: ExecutionContext): Promise<boolean> {
    return process.env.NODE_ENV === 'test';
  }
}
