import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { and, asc, desc, eq, inArray, lt, or } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../database/database.module';
import {
  conversationMembers,
  conversations,
  groupProfiles,
  users,
} from '../database/schema';
import { AppException } from '../common/errors/app.exception';
import { AppErrorCode } from '../common/errors/app-error-codes';
import { AuditService } from '../common/audit/audit.service';
import {
  CursorPage,
  decodeCursor,
  encodeCursor,
  resolveLimit,
} from '../common/dto/pagination.dto';
import {
  ConversationMemberDto,
  ConversationResponseDto,
  CreateGroupConversationDto,
} from './dto/conversation.dto';

@Injectable()
export class ConversationsService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: Database,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Creates (or idempotently returns) the single DIRECT conversation
   * between two users. Correctness under concurrency comes from the
   * unique index on `conversations.direct_key`, not from an
   * application-level precheck: two simultaneous requests both attempt
   * the insert, one wins, and the loser catches the unique-violation and
   * re-reads the winner's row.
   */
  async createDirectConversation(
    requesterId: string,
    otherUserId: string,
  ): Promise<ConversationResponseDto> {
    if (requesterId === otherUserId) {
      throw new AppException({
        code: AppErrorCode.VALIDATION_FAILED,
        message: 'Cannot start a direct conversation with yourself.',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const [otherUser] = await this.db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, otherUserId))
      .limit(1);
    if (!otherUser) {
      throw new AppException({
        code: AppErrorCode.NOT_FOUND,
        message: 'User not found.',
        status: HttpStatus.NOT_FOUND,
      });
    }

    const directKey = ConversationsService.buildDirectKey(
      requesterId,
      otherUserId,
    );

    try {
      const conversationId = await this.db.transaction(async (tx) => {
        const [conversation] = await tx
          .insert(conversations)
          .values({
            type: 'DIRECT',
            directKey,
            createdById: requesterId,
          })
          .returning({ id: conversations.id });

        await tx.insert(conversationMembers).values([
          {
            conversationId: conversation.id,
            userId: requesterId,
            role: 'MEMBER',
          },
          {
            conversationId: conversation.id,
            userId: otherUserId,
            role: 'MEMBER',
          },
        ]);

        return conversation.id;
      });

      await this.auditService.record({
        type: 'CONVERSATION_CREATED',
        userId: requesterId,
        metadata: { conversationId, type: 'DIRECT' },
      });

      return this.getConversation(requesterId, conversationId);
    } catch (err) {
      if (this.isUniqueViolation(err, 'conversations_direct_key_unique')) {
        const [existing] = await this.db
          .select({ id: conversations.id })
          .from(conversations)
          .where(eq(conversations.directKey, directKey))
          .limit(1);
        if (existing) {
          return this.getConversation(requesterId, existing.id);
        }
      }
      throw err;
    }
  }

  async createGroupConversation(
    requesterId: string,
    dto: CreateGroupConversationDto,
  ): Promise<ConversationResponseDto> {
    const memberIds = Array.from(new Set(dto.memberIds)).filter(
      (id) => id !== requesterId,
    );

    if (memberIds.length > 0) {
      const found = await this.db
        .select({ id: users.id })
        .from(users)
        .where(inArray(users.id, memberIds));
      if (found.length !== memberIds.length) {
        throw new AppException({
          code: AppErrorCode.VALIDATION_FAILED,
          message: 'One or more member IDs do not correspond to a user.',
          status: HttpStatus.BAD_REQUEST,
        });
      }
    }

    const conversationId = await this.db.transaction(async (tx) => {
      const [conversation] = await tx
        .insert(conversations)
        .values({ type: 'GROUP', createdById: requesterId })
        .returning({ id: conversations.id });

      await tx.insert(groupProfiles).values({
        conversationId: conversation.id,
        name: dto.name.trim(),
        description: dto.description?.trim(),
      });

      await tx.insert(conversationMembers).values([
        {
          conversationId: conversation.id,
          userId: requesterId,
          role: 'OWNER',
        },
        ...memberIds.map((userId) => ({
          conversationId: conversation.id,
          userId,
          role: 'MEMBER' as const,
        })),
      ]);

      return conversation.id;
    });

    await this.auditService.record({
      type: 'GROUP_CREATED',
      userId: requesterId,
      metadata: { conversationId, memberCount: memberIds.length + 1 },
    });

    return this.getConversation(requesterId, conversationId);
  }

  async listMyConversations(
    userId: string,
    cursor: string | undefined,
    limit: number | undefined,
  ): Promise<CursorPage<ConversationResponseDto>> {
    const pageSize = resolveLimit(limit);
    const decoded = cursor ? decodeCursor(cursor) : null;

    const conditions = [
      eq(conversationMembers.userId, userId),
      eq(conversationMembers.status, 'ACTIVE'),
    ];

    if (decoded) {
      conditions.push(
        or(
          lt(conversations.createdAt, new Date(decoded.createdAt)),
          and(
            eq(conversations.createdAt, new Date(decoded.createdAt)),
            lt(conversations.id, decoded.id),
          ),
        )!,
      );
    }

    const rows = await this.db
      .select({
        id: conversations.id,
        type: conversations.type,
        createdAt: conversations.createdAt,
      })
      .from(conversationMembers)
      .innerJoin(
        conversations,
        eq(conversations.id, conversationMembers.conversationId),
      )
      .where(and(...conditions))
      .orderBy(desc(conversations.createdAt), desc(conversations.id))
      .limit(pageSize + 1);

    const hasMore = rows.length > pageSize;
    const page = rows.slice(0, pageSize);

    const items = await Promise.all(
      page.map((row) => this.getConversation(userId, row.id)),
    );

    const last = page[page.length - 1];
    const nextCursor =
      hasMore && last
        ? encodeCursor({
            createdAt: last.createdAt.toISOString(),
            id: last.id,
          })
        : null;

    return { items, nextCursor, hasMore };
  }

  async getConversation(
    userId: string,
    conversationId: string,
  ): Promise<ConversationResponseDto> {
    await this.assertActiveMember(userId, conversationId);

    const [conversation] = await this.db
      .select({
        id: conversations.id,
        type: conversations.type,
        createdAt: conversations.createdAt,
      })
      .from(conversations)
      .where(eq(conversations.id, conversationId))
      .limit(1);

    if (!conversation) {
      throw new AppException({
        code: AppErrorCode.NOT_FOUND,
        message: 'Conversation not found.',
        status: HttpStatus.NOT_FOUND,
      });
    }

    const members = await this.listMembers(conversationId);

    let group:
      | { name: string; description: string | null; avatarUrl: string | null }
      | undefined;
    if (conversation.type === 'GROUP') {
      const [groupRow] = await this.db
        .select({
          name: groupProfiles.name,
          description: groupProfiles.description,
          avatarUrl: groupProfiles.avatarUrl,
        })
        .from(groupProfiles)
        .where(eq(groupProfiles.conversationId, conversationId))
        .limit(1);
      group = groupRow;
    }

    return {
      id: conversation.id,
      type: conversation.type,
      createdAt: conversation.createdAt,
      group,
      members,
    };
  }

  async listMembers(conversationId: string): Promise<ConversationMemberDto[]> {
    return this.db
      .select({
        userId: conversationMembers.userId,
        role: conversationMembers.role,
        status: conversationMembers.status,
        joinedAt: conversationMembers.joinedAt,
      })
      .from(conversationMembers)
      .where(
        and(
          eq(conversationMembers.conversationId, conversationId),
          eq(conversationMembers.status, 'ACTIVE'),
        ),
      )
      .orderBy(asc(conversationMembers.joinedAt));
  }

  async leaveConversation(
    userId: string,
    conversationId: string,
  ): Promise<void> {
    const membership = await this.assertActiveMember(userId, conversationId);

    await this.db
      .update(conversationMembers)
      .set({ status: 'LEFT', leftAt: new Date(), updatedAt: new Date() })
      .where(eq(conversationMembers.id, membership.id));
  }

  /**
   * Removes a member from a GROUP conversation. Only an OWNER or ADMIN may
   * remove another member; nobody may remove the OWNER through this path
   * (ownership transfer is out of scope for this milestone).
   */
  async removeMember(
    actingUserId: string,
    conversationId: string,
    targetUserId: string,
  ): Promise<void> {
    const actingMembership = await this.assertActiveMember(
      actingUserId,
      conversationId,
    );
    await this.assertGroupConversation(conversationId);

    if (actingMembership.role === 'MEMBER') {
      throw new AppException({
        code: AppErrorCode.FORBIDDEN,
        message: 'Only owners and admins can remove members.',
        status: HttpStatus.FORBIDDEN,
      });
    }

    const [targetMembership] = await this.db
      .select()
      .from(conversationMembers)
      .where(
        and(
          eq(conversationMembers.conversationId, conversationId),
          eq(conversationMembers.userId, targetUserId),
          eq(conversationMembers.status, 'ACTIVE'),
        ),
      )
      .limit(1);

    if (!targetMembership) {
      throw new AppException({
        code: AppErrorCode.NOT_FOUND,
        message: 'Member not found.',
        status: HttpStatus.NOT_FOUND,
      });
    }

    if (targetMembership.role === 'OWNER') {
      throw new AppException({
        code: AppErrorCode.FORBIDDEN,
        message: 'The group owner cannot be removed.',
        status: HttpStatus.FORBIDDEN,
      });
    }

    await this.db
      .update(conversationMembers)
      .set({ status: 'REMOVED', leftAt: new Date(), updatedAt: new Date() })
      .where(eq(conversationMembers.id, targetMembership.id));

    await this.auditService.record({
      type: 'MEMBERSHIP_REMOVED',
      userId: actingUserId,
      metadata: { conversationId, targetUserId },
    });
  }

  async updateMemberRole(
    actingUserId: string,
    conversationId: string,
    targetUserId: string,
    role: 'ADMIN' | 'MEMBER',
  ): Promise<void> {
    const actingMembership = await this.assertActiveMember(
      actingUserId,
      conversationId,
    );
    await this.assertGroupConversation(conversationId);

    if (actingMembership.role !== 'OWNER') {
      throw new AppException({
        code: AppErrorCode.FORBIDDEN,
        message: 'Only the group owner can change member roles.',
        status: HttpStatus.FORBIDDEN,
      });
    }

    const result = await this.db
      .update(conversationMembers)
      .set({ role, updatedAt: new Date() })
      .where(
        and(
          eq(conversationMembers.conversationId, conversationId),
          eq(conversationMembers.userId, targetUserId),
          eq(conversationMembers.status, 'ACTIVE'),
        ),
      )
      .returning({ id: conversationMembers.id });

    if (result.length === 0) {
      throw new AppException({
        code: AppErrorCode.NOT_FOUND,
        message: 'Member not found.',
        status: HttpStatus.NOT_FOUND,
      });
    }

    await this.auditService.record({
      type: 'MEMBERSHIP_ROLE_CHANGED',
      userId: actingUserId,
      metadata: { conversationId, targetUserId, role },
    });
  }

  // ---------------------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------------------

  /**
   * The core conversation-access-control check: a user must not be able
   * to read or mutate a conversation solely by knowing its ID. Every
   * conversation-scoped operation in this service routes through this
   * check first.
   */
  private async assertActiveMember(userId: string, conversationId: string) {
    const [membership] = await this.db
      .select()
      .from(conversationMembers)
      .where(
        and(
          eq(conversationMembers.conversationId, conversationId),
          eq(conversationMembers.userId, userId),
          eq(conversationMembers.status, 'ACTIVE'),
        ),
      )
      .limit(1);

    if (!membership) {
      // Deliberately NOT_FOUND rather than FORBIDDEN: confirming that a
      // conversation exists to a non-member is itself an information
      // leak (IDOR-adjacent), so both "doesn't exist" and "not a member"
      // look identical to the caller.
      throw new AppException({
        code: AppErrorCode.NOT_FOUND,
        message: 'Conversation not found.',
        status: HttpStatus.NOT_FOUND,
      });
    }

    return membership;
  }

  private async assertGroupConversation(conversationId: string) {
    const [conversation] = await this.db
      .select({ type: conversations.type })
      .from(conversations)
      .where(eq(conversations.id, conversationId))
      .limit(1);

    if (!conversation || conversation.type !== 'GROUP') {
      throw new AppException({
        code: AppErrorCode.VALIDATION_FAILED,
        message: 'This operation is only valid for group conversations.',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  private isUniqueViolation(err: unknown, constraintName: string): boolean {
    const pgErr = this.extractPgError(err);
    return pgErr?.code === '23505' && pgErr?.constraint === constraintName;
  }

  private extractPgError(
    err: unknown,
  ): { code?: string; constraint?: string } | undefined {
    if (!err || typeof err !== 'object') return undefined;
    const candidate = err as {
      code?: string;
      constraint?: string;
      cause?: unknown;
    };
    if (candidate.code && candidate.constraint) return candidate;
    if (candidate.cause) return this.extractPgError(candidate.cause);
    return undefined;
  }

  private static buildDirectKey(userIdA: string, userIdB: string): string {
    return [userIdA, userIdB].sort().join(':');
  }
}
