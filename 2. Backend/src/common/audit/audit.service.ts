import { Inject, Injectable, Logger } from '@nestjs/common';
import { DATABASE_CONNECTION, Database } from '../../database/database.module';
import { auditEvents } from '../../database/schema';

export type AuditEventType =
  | 'AUTH_LOGIN_SUCCESS'
  | 'AUTH_LOGIN_FAILURE'
  | 'AUTH_REGISTER'
  | 'AUTH_LOGOUT'
  | 'AUTH_TOKEN_REFRESH'
  | 'SESSION_REVOKED'
  | 'SESSION_REVOKED_ALL'
  | 'ACCOUNT_DISABLED'
  | 'CONVERSATION_CREATED'
  | 'GROUP_CREATED'
  | 'MEMBERSHIP_ROLE_CHANGED'
  | 'MEMBERSHIP_REMOVED';

export interface RecordAuditEventInput {
  type: AuditEventType;
  userId?: string;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Minimal, extensible security-event audit log for this milestone. Later
 * administrative/analytics milestones can build richer querying and
 * retention on top of the same `audit_events` table without renaming it.
 *
 * Audit recording failures are logged, never thrown — a logging problem
 * must not fail the underlying security-sensitive operation it describes.
 */
@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async record(input: RecordAuditEventInput): Promise<void> {
    try {
      await this.db.insert(auditEvents).values({
        type: input.type,
        userId: input.userId,
        ip: input.ip,
        userAgent: input.userAgent,
        metadata: input.metadata ?? null,
      });
    } catch (err) {
      this.logger.warn(
        `Failed to record audit event ${input.type}: ${(err as Error).message}`,
      );
    }
  }
}
