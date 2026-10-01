/**
 * Drizzle ORM schema for the WhatsApp-style messaging platform backend
 * foundation (Backend Volume 1).
 *
 * Scope: accounts, profiles, devices, sessions, conversations, conversation
 * membership, group metadata, and a minimal audit log.
 *
 * Future milestones extend this schema with Message, MessageAttachment,
 * MessageReaction, MessageReceipt, MediaAsset, Notification, PushToken and
 * SearchDocument tables. Conversation is already the natural parent for a
 * future `messages` table, and `conversation_members.last_read_at` is
 * reserved for future read-receipt / unread-count features.
 */

import {
  pgTable,
  pgEnum,
  uuid,
  text,
  boolean,
  timestamp,
  jsonb,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const accountStatusEnum = pgEnum('account_status', [
  'ACTIVE',
  'DISABLED',
  'DELETED',
]);

export const devicePlatformEnum = pgEnum('device_platform', [
  'IOS',
  'ANDROID',
  'WEB',
  'DESKTOP',
  'UNKNOWN',
]);

export const deviceStatusEnum = pgEnum('device_status', ['ACTIVE', 'REVOKED']);

export const conversationTypeEnum = pgEnum('conversation_type', [
  'DIRECT',
  'GROUP',
]);

export const memberRoleEnum = pgEnum('member_role', [
  'OWNER',
  'ADMIN',
  'MEMBER',
]);

export const memberStatusEnum = pgEnum('member_status', [
  'ACTIVE',
  'LEFT',
  'REMOVED',
]);

export const auditEventTypeEnum = pgEnum('audit_event_type', [
  'AUTH_LOGIN_SUCCESS',
  'AUTH_LOGIN_FAILURE',
  'AUTH_REGISTER',
  'AUTH_LOGOUT',
  'AUTH_TOKEN_REFRESH',
  'SESSION_REVOKED',
  'SESSION_REVOKED_ALL',
  'ACCOUNT_DISABLED',
  'CONVERSATION_CREATED',
  'GROUP_CREATED',
  'MEMBERSHIP_ROLE_CHANGED',
  'MEMBERSHIP_REMOVED',
]);

// ---------------------------------------------------------------------------
// Users / Profiles
// ---------------------------------------------------------------------------

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull(),
    passwordHash: text('password_hash').notNull(),
    status: accountStatusEnum('status').notNull().default('ACTIVE'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    emailUnique: uniqueIndex('users_email_unique').on(
      sql`lower(${table.email})`,
    ),
    statusIdx: index('users_status_idx').on(table.status),
  }),
);

export const profiles = pgTable(
  'profiles',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: 'cascade' }),
    username: text('username').notNull(),
    displayName: text('display_name').notNull(),
    avatarUrl: text('avatar_url'),
    about: text('about'),
    showLastSeen: boolean('show_last_seen').notNull().default(true),
    showOnline: boolean('show_online').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    usernameUnique: uniqueIndex('profiles_username_unique').on(
      sql`lower(${table.username})`,
    ),
  }),
);

// ---------------------------------------------------------------------------
// Devices / Sessions
// ---------------------------------------------------------------------------

export const devices = pgTable(
  'devices',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    platform: devicePlatformEnum('platform').notNull().default('UNKNOWN'),
    name: text('name'),
    appVersion: text('app_version'),
    status: deviceStatusEnum('status').notNull().default('ACTIVE'),
    lastActiveAt: timestamp('last_active_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    userIdx: index('devices_user_idx').on(table.userId),
    userStatusIdx: index('devices_user_status_idx').on(
      table.userId,
      table.status,
    ),
  }),
);

/**
 * Durable session record backing refresh-token issuance & revocation.
 * The refresh token itself is never stored — only a SHA-256 hash of it —
 * so a leaked database dump cannot be replayed as a valid refresh token.
 */
export const sessions = pgTable(
  'sessions',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    deviceId: uuid('device_id')
      .notNull()
      .references(() => devices.id, { onDelete: 'cascade' }),
    refreshTokenHash: text('refresh_token_hash').notNull().unique(),
    revoked: boolean('revoked').notNull().default(false),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    lastUsedAt: timestamp('last_used_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    userIdx: index('sessions_user_idx').on(table.userId),
    userRevokedIdx: index('sessions_user_revoked_idx').on(
      table.userId,
      table.revoked,
    ),
    deviceIdx: index('sessions_device_idx').on(table.deviceId),
    expiresIdx: index('sessions_expires_idx').on(table.expiresAt),
  }),
);

// ---------------------------------------------------------------------------
// Conversations / Membership / Groups
// ---------------------------------------------------------------------------

export const conversations = pgTable(
  'conversations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    type: conversationTypeEnum('type').notNull(),
    /**
     * Deterministic key used only for DIRECT conversations: the two
     * participant user IDs, sorted and joined. A unique index on this
     * column is what makes "at most one direct conversation per pair of
     * users" a database-enforced invariant rather than an
     * application-level, race-prone precheck. Always null for GROUP
     * conversations.
     */
    directKey: text('direct_key'),
    createdById: uuid('created_by_id')
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    directKeyUnique: uniqueIndex('conversations_direct_key_unique').on(
      table.directKey,
    ),
    typeIdx: index('conversations_type_idx').on(table.type),
  }),
);

export const groupProfiles = pgTable('group_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  conversationId: uuid('conversation_id')
    .notNull()
    .unique()
    .references(() => conversations.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const conversationMembers = pgTable(
  'conversation_members',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    conversationId: uuid('conversation_id')
      .notNull()
      .references(() => conversations.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    role: memberRoleEnum('role').notNull().default('MEMBER'),
    status: memberStatusEnum('status').notNull().default('ACTIVE'),
    /** Reserved for future read-receipt / unread-count features. */
    lastReadAt: timestamp('last_read_at', { withTimezone: true }),
    joinedAt: timestamp('joined_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    leftAt: timestamp('left_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    conversationUserUnique: uniqueIndex(
      'conversation_members_conversation_user_unique',
    ).on(table.conversationId, table.userId),
    userStatusIdx: index('conversation_members_user_status_idx').on(
      table.userId,
      table.status,
    ),
    conversationStatusIdx: index(
      'conversation_members_conversation_status_idx',
    ).on(table.conversationId, table.status),
  }),
);

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------

export const auditEvents = pgTable(
  'audit_events',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    type: auditEventTypeEnum('type').notNull(),
    userId: uuid('user_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    ip: text('ip'),
    userAgent: text('user_agent'),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    userIdx: index('audit_events_user_idx').on(table.userId),
    typeIdx: index('audit_events_type_idx').on(table.type),
    createdAtIdx: index('audit_events_created_at_idx').on(table.createdAt),
  }),
);

// ---------------------------------------------------------------------------
// Relations (used for Drizzle's relational query API)
// ---------------------------------------------------------------------------

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  devices: many(devices),
  sessions: many(sessions),
  conversationMemberships: many(conversationMembers),
  createdConversations: many(conversations),
  auditEvents: many(auditEvents),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
}));

export const devicesRelations = relations(devices, ({ one, many }) => ({
  user: one(users, { fields: [devices.userId], references: [users.id] }),
  sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
  device: one(devices, {
    fields: [sessions.deviceId],
    references: [devices.id],
  }),
}));

export const conversationsRelations = relations(
  conversations,
  ({ one, many }) => ({
    createdBy: one(users, {
      fields: [conversations.createdById],
      references: [users.id],
    }),
    members: many(conversationMembers),
    group: one(groupProfiles, {
      fields: [conversations.id],
      references: [groupProfiles.conversationId],
    }),
  }),
);

export const groupProfilesRelations = relations(groupProfiles, ({ one }) => ({
  conversation: one(conversations, {
    fields: [groupProfiles.conversationId],
    references: [conversations.id],
  }),
}));

export const conversationMembersRelations = relations(
  conversationMembers,
  ({ one }) => ({
    conversation: one(conversations, {
      fields: [conversationMembers.conversationId],
      references: [conversations.id],
    }),
    user: one(users, {
      fields: [conversationMembers.userId],
      references: [users.id],
    }),
  }),
);

export const auditEventsRelations = relations(auditEvents, ({ one }) => ({
  user: one(users, { fields: [auditEvents.userId], references: [users.id] }),
}));
