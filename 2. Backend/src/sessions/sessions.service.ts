import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../database/database.module';
import { sessions } from '../database/schema';
import { AppException } from '../common/errors/app.exception';
import { AppErrorCode } from '../common/errors/app-error-codes';
import { SessionResponseDto } from './session-response.dto';

@Injectable()
export class SessionsService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async listMySessions(userId: string): Promise<SessionResponseDto[]> {
    return this.db
      .select({
        id: sessions.id,
        deviceId: sessions.deviceId,
        revoked: sessions.revoked,
        expiresAt: sessions.expiresAt,
        lastUsedAt: sessions.lastUsedAt,
        createdAt: sessions.createdAt,
      })
      .from(sessions)
      .where(eq(sessions.userId, userId))
      .orderBy(desc(sessions.lastUsedAt));
  }

  async revokeSession(userId: string, sessionId: string): Promise<void> {
    const result = await this.db
      .update(sessions)
      .set({ revoked: true, revokedAt: new Date(), updatedAt: new Date() })
      .where(and(eq(sessions.id, sessionId), eq(sessions.userId, userId)))
      .returning({ id: sessions.id });

    if (result.length === 0) {
      throw new AppException({
        code: AppErrorCode.NOT_FOUND,
        message: 'Session not found.',
        status: HttpStatus.NOT_FOUND,
      });
    }
  }
}
