# 02 — Domain Boundaries, Module/Service Boundaries, and Data Ownership

## 1. Domain Catalog

Each domain below is a **logical module** inside `core-api` unless marked otherwise. A module
exposes a public TypeScript service interface; other modules may only interact with it through
that interface — **never** through direct repository/ORM access to another module's tables. This
rule is what makes later physical extraction possible without a rewrite.

### 1.1 Identity & Accounts
- **Responsibility**: registration, credential management, account lifecycle (active/suspended/
  deleted), password/credential reset.
- **Owned data**: `User`, `Credential`, `AccountRecoveryRequest`.
- **Commands**: `RegisterAccount`, `ChangeCredential`, `SuspendAccount`, `DeleteAccount`.
- **Queries**: `GetAccountById`, `GetAccountByHandle`.
- **Emits**: `account.created`, `account.suspended`, `account.deleted`.
- **Consumes**: none (root domain).
- **Sync deps**: none. **Async deps**: none.
- **Security boundary**: highest — credential handling, brute-force protection.
- **Consistency**: strong/transactional.
- **Scaling**: read-heavy (login/lookup); scales with `core-api`.

### 1.2 Devices & Sessions
- **Responsibility**: device registration, session issuance/revocation, refresh-token rotation.
- **Owned data**: `Device`, `Session`.
- **Commands**: `RegisterDevice`, `IssueSession`, `RevokeSession`, `RotateRefreshToken`.
- **Queries**: `GetActiveSessions(userId)`.
- **Emits**: `session.created`, `session.revoked`, `device.registered`.
- **Consumes**: `account.deleted` (cascade session revocation).
- **Sync deps**: Identity (validate account status at login). **Async deps**: none.
- **Security boundary**: high — token issuance.
- **Consistency**: strong/transactional.

### 1.3 Profiles
- **Responsibility**: display name, avatar, status text, visibility settings.
- **Owned data**: `Profile`, `PrivacySetting`.
- **Commands**: `UpdateProfile`, `UpdatePrivacySettings`.
- **Queries**: `GetProfile(userId, viewerId)` (privacy-filtered).
- **Emits**: `profile.updated`.
- **Consumes**: `account.created` (create default profile).
- **Sync deps**: none. **Async deps**: Media (avatar asset reference, validated async).
- **Consistency**: strong for own writes; eventual for cache propagation to other users' views.

### 1.4 Contacts & Relationships
- **Responsibility**: contact list, blocking.
- **Owned data**: `Contact`, `Block`.
- **Commands**: `AddContact`, `RemoveContact`, `BlockUser`, `UnblockUser`.
- **Queries**: `ListContacts(userId)`, `IsBlocked(a,b)`.
- **Emits**: `contact.blocked`, `contact.unblocked`.
- **Consumes**: `account.deleted`.
- **Sync deps**: used synchronously by Messaging and Conversations for send-eligibility checks.
- **Consistency**: strong (blocking must take effect immediately for authorization correctness).

### 1.5 Conversations
- **Responsibility**: conversation (1:1 and group) lifecycle, conversation-level settings.
- **Owned data**: `Conversation`, `ConversationSettings`.
- **Commands**: `CreateConversation`, `UpdateConversationSettings`, `ArchiveConversation`.
- **Queries**: `GetConversation(id)`, `ListConversationsForUser(userId)` (denormalized read model,
  see `04-database-architecture.md` §5).
- **Emits**: `conversation.created`, `conversation.settings_updated`, `conversation.archived`.
- **Consumes**: none directly (Groups builds on top of Conversations).
- **Consistency**: strong/transactional.

### 1.6 Groups (extends Conversations)
- **Responsibility**: group membership, roles (owner/admin/member), group metadata.
- **Owned data**: `GroupMember` (role, joined_at, invited_by), `GroupMetadata`.
- **Commands**: `AddMember`, `RemoveMember`, `ChangeRole`, `UpdateGroupMetadata`.
- **Queries**: `ListMembers(conversationId)`, `GetMemberRole(conversationId, userId)`.
- **Emits**: `group.member_added`, `group.member_removed`, `group.role_changed`,
  `group.metadata_updated`.
- **Consumes**: `contact.blocked` (prevent invite of blocker/blockee per policy).
- **Consistency**: strong/transactional — membership is the authorization root for Messaging.

### 1.7 Messaging
- **Responsibility**: message submission, validation, persistence, editing, deletion.
- **Owned data**: `Message`, `MessageReference` (reply-to), `MessageEditHistory` (metadata only,
  not full content history unless product requires it).
- **Commands**: `SendMessage`, `EditMessage`, `DeleteMessage` (for-self / for-everyone).
- **Queries**: `GetConversationHistory(conversationId, cursor)`, `GetMessage(id)`.
- **Emits**: `message.created`, `message.edited`, `message.deleted`.
- **Consumes**: `group.member_removed` (for authorization cache invalidation), `contact.blocked`.
- **Sync deps**: Conversations/Groups (membership check), Contacts (block check), Media
  (attachment reference validation). **Async deps**: none for the write path itself — event
  publication is transactional via outbox (see `07-events-and-queues.md`).
- **Security boundary**: high — core product data.
- **Consistency**: strong/transactional for persistence; realtime delivery is at-least-once
  eventual.
- **Scaling**: highest write volume in the system; see `10-consistency-caching-reliability.md`
  for partitioning/archival strategy.

### 1.8 Message Receipts
- **Responsibility**: delivery and read receipts per (message, device/user).
- **Owned data**: `DeliveryReceipt`, `ReadReceipt`.
- **Commands**: `RecordDelivered`, `RecordRead`.
- **Queries**: `GetReceiptState(messageId)`.
- **Emits**: `message.delivered`, `message.read`.
- **Consumes**: `message.created` (to know what can be receipted).
- **Consistency**: strong for own write, at-least-once idempotent ingestion (duplicate delivery
  acks from multiple devices must not error).

### 1.9 Reactions
- **Responsibility**: emoji reactions to messages.
- **Owned data**: `MessageReaction`.
- **Commands**: `AddReaction`, `RemoveReaction`.
- **Queries**: `GetReactions(messageId)`.
- **Emits**: `message.reaction_added`, `message.reaction_removed`.
- **Consumes**: `message.deleted` (cascade-remove reactions).
- **Consistency**: strong/transactional; low write volume relative to Messaging.

### 1.10 Presence *(hosted in `realtime-gateway`, not `core-api`)*
- **Responsibility**: online/offline, last-active, device-level presence.
- **Owned data**: ephemeral Redis-only state (`Presence` is not a Postgres table).
- **Commands**: `Heartbeat`, `MarkOffline`.
- **Queries**: `GetPresence(userId)` (best-effort).
- **Emits**: `presence.changed` (ephemeral pub/sub, not durable domain event stream).
- **Consumes**: `session.revoked` (force offline).
- **Consistency**: best-effort ephemeral. See `06-realtime-architecture.md` §6.

### 1.11 Media
- **Responsibility**: upload authorization, metadata, processing-state tracking, signed access
  issuance.
- **Owned data**: `MediaAsset`, `MediaVariant`.
- **Commands**: `InitiateUpload`, `CompleteUpload`, `RequestSignedAccess`.
- **Queries**: `GetMediaAsset(id)`.
- **Emits**: `media.upload_completed`, `media.processing_completed`, `media.processing_failed`.
- **Consumes**: none for authorization; `message.deleted` for lifecycle cleanup eligibility.
- **Consistency**: strong for metadata; eventual for processed-variant availability.

### 1.12 Notifications
- **Responsibility**: push token lifecycle, notification eligibility, delivery orchestration.
- **Owned data**: `PushToken`, `NotificationPreference`, `NotificationDeliveryLog`.
- **Commands**: `RegisterPushToken`, `UpdateNotificationPreference`.
- **Queries**: `GetActiveTokens(userId)`.
- **Emits**: `notification.delivery_attempted`.
- **Consumes**: `message.created`, `group.member_added` (invite notifications), `session.revoked`
  (token cleanup trigger).
- **Consistency**: eventual/best-effort by nature of push delivery.
- **Hosted in**: `workers` (consumer logic) with metadata owned via `core-api` module boundary
  for reads/writes of `PushToken`/`NotificationPreference`.

### 1.13 Search
- **Responsibility**: indexing of searchable entities (messages, conversations, contacts) and
  authorized query execution.
- **Owned data**: none authoritative — OpenSearch indexes are a **read model**, not a system of
  record. Source of truth remains Messaging/Conversations/Contacts tables.
- **Commands**: none (derived).
- **Queries**: `SearchMessages(userId, query)`, `SearchConversations(userId, query)`.
- **Consumes**: `message.created`, `message.edited`, `message.deleted`, `conversation.created`,
  `group.member_removed` (re-index authorization scope).
- **Consistency**: eventual (bounded staleness target defined in
  `10-consistency-caching-reliability.md`).

### 1.14 Moderation & Abuse Prevention
- **Responsibility**: reporting, rate-limit policy enforcement, account restriction application.
- **Owned data**: `Report`, `ModerationAction`, `AccountRestriction`.
- **Commands**: `FileReport`, `ApplyRestriction`, `ReviewReport`.
- **Queries**: `ListReports(status)`.
- **Emits**: `report.filed`, `moderation.action_applied`.
- **Consumes**: none required; may consume messaging events for automated heuristics (future
  scope, not implemented here).
- **Consistency**: strong/transactional for restriction application (must take effect
  immediately for authorization correctness).

### 1.15 Administration
- **Responsibility**: admin role management, admin-facing operations across domains.
- **Owned data**: `AdminRole`, `AdminActionAuditEntry` (the audit entries themselves are owned by
  Audit; Administration owns the role assignments).
- **Commands**: `AssignAdminRole`, `RevokeAdminRole`, cross-domain admin actions (delegated to
  owning domain's commands, always audited).
- **Consistency**: strong/transactional.

### 1.16 Analytics
- **Responsibility**: product/operational analytics aggregation.
- **Owned data**: `AnalyticsEvent` (append-only, privacy-filtered projection — never raw message
  content).
- **Consumes**: selected domain events (allow-listed fields only).
- **Consistency**: eventual, best-effort.

### 1.17 Audit
- **Responsibility**: immutable record of security-relevant and administrative actions.
- **Owned data**: `AuditEvent`.
- **Consumes**: `account.*`, `session.*`, `group.role_changed`, `moderation.*`, all admin
  commands.
- **Consistency**: strong — audit writes are part of the same transaction as the action where the
  action originates in `core-api`; async, at-least-once for actions sourced from workers, with an
  idempotency key equal to the source event ID.

### 1.18 Realtime Gateway *(independent deployment unit, not a `core-api` module)*
- **Responsibility**: WebSocket connection lifecycle, authenticated subscription management,
  event fan-out, presence, typing indicators.
- **Owned data**: connection registry (Redis, ephemeral), presence (Redis, ephemeral).
- **Consumes**: all domain events relevant to realtime fan-out, from the broker.
- **Does not own**: any durable business data. It is a **projection and transport layer** only.

### 1.19 Background Processing *(independent deployment unit: `workers`)*
- **Responsibility**: hosts all asynchronous consumers — media processing orchestration,
  notification delivery, search indexing, retention/cleanup, reconciliation jobs.
- **Owned data**: none authoritative; operates on data owned by other domains through their
  module interfaces or dedicated repository access limited to job-tracking tables
  (`JobExecutionLog`).

## 2. Deployable Units — Precise Definition

| Unit | Process type | Statefulness | Scaling trigger | Failure isolation from |
|---|---|---|---|---|
| `core-api` | HTTP API server | Stateless | Request rate / CPU | `realtime-gateway`, `workers` (separate processes/pods) |
| `realtime-gateway` | WebSocket server | Stateless (state in Redis) | Concurrent connections | `core-api`, `workers` |
| `workers` | Job/event consumers | Stateless | Queue depth / consumer lag | `core-api`, `realtime-gateway` |
| `media-processor` | Specialized worker pool | Stateless | Queue depth (media-specific queue) | Isolated from general `workers` pool so large transcode jobs cannot starve notification delivery |

**Explicit non-extraction decision**: Identity, Profiles, Contacts, Conversations, Groups,
Messaging, Receipts, Reactions, Moderation, Administration, Audit, Analytics remain inside
`core-api` for the initial implementation. None of them currently has a scaling profile,
release cadence, or team-ownership need distinct enough to justify the operational cost of
independent services. Each is structured as an isolated NestJS module (own module folder, own
Prisma schema namespace/tables, public service class as the only cross-module entry point) so
that extraction later requires moving the module and swapping in-process calls for network calls
— not redesigning data ownership.

## 3. Data Ownership Matrix (Authoritative Source of Truth)

| Entity | System of Record | Cache Representation | Search Representation | Event Representation |
|---|---|---|---|---|
| User, Credential | PostgreSQL (Identity) | Redis: session-lookup cache only | — | `account.*` |
| Device, Session | PostgreSQL (Devices & Sessions) | Redis: active-session lookup, TTL-aligned to token expiry | — | `session.*`, `device.*` |
| Profile, PrivacySetting | PostgreSQL (Profiles) | Redis: hot-profile cache | Indexed (name/handle only, privacy-filtered) | `profile.updated` |
| Contact, Block | PostgreSQL (Contacts) | Redis: block-check cache (short TTL) | — | `contact.*` |
| Conversation, ConversationSettings | PostgreSQL (Conversations) | Redis: conversation-list read model | Indexed (metadata only) | `conversation.*` |
| GroupMember | PostgreSQL (Groups) | Redis: membership/authz snapshot (short TTL, event-invalidated) | — | `group.*` |
| Message, MessageReference | PostgreSQL (Messaging) — **sole durable store** | Redis: none durable; recent-message cache only, always re-derivable from Postgres | Indexed (content per privacy scope) | `message.created/edited/deleted` |
| DeliveryReceipt, ReadReceipt | PostgreSQL (Receipts) | Redis: unread-count counters (derived, reconciled periodically against Postgres) | — | `message.delivered/read` |
| MessageReaction | PostgreSQL (Reactions) | — | — | `message.reaction_*` |
| Presence | **Redis is authoritative** (intentionally not durable) | N/A | — | `presence.changed` (pub/sub only, not a durable topic) |
| MediaAsset, MediaVariant | PostgreSQL (Media) metadata; Object Storage (bytes) | CDN edge cache (bytes only) | — | `media.*` |
| PushToken, NotificationPreference | PostgreSQL (Notifications) | — | — | — |
| Report, ModerationAction, AccountRestriction | PostgreSQL (Moderation) | — | — | `report.filed`, `moderation.*` |
| AuditEvent | PostgreSQL (Audit) — append-only | — | — | — (Audit is a consumer, not a producer, except internally) |
| SearchDocument (message/conversation/contact projections) | **OpenSearch is authoritative only for the index itself**; content originates from Postgres | — | OpenSearch | — |

**Rule enforced across all domains**: a cache, search index, or event stream is never treated as
the source of truth for authorization or financial-grade correctness. Every authorization
decision that matters (message send eligibility, media access, admin actions) has a path back to
a Postgres read, either synchronously or via a short-TTL cache whose invalidation is driven by
the authoritative event stream.

## 4. Anti-Corruption Rule

No module may perform a JOIN across another module's tables at the SQL level. Cross-domain reads
either:
1. call the owning module's service method in-process (same deployment unit), or
2. read from a denormalized, explicitly-owned read model built for that purpose (e.g., the
   Conversations module owns and maintains `conversation_list_view`, populated from Messaging's
   `message.created` events — Messaging does not query Conversations tables directly, and
   Conversations does not query Messaging tables directly for this view).

This rule is what prevents duplicated ownership of the same authoritative state across
independently generated implementation prompts.
