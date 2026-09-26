# 13 — Terminology Glossary and Portable Cross-Part Contracts

## 1. Purpose

This document is the single place later implementation prompts (backend, web, mobile,
infrastructure, QA) should check for exact naming and conventions, to guarantee compatibility
across independently generated project parts, per the project master prompt's compatibility
requirements.

## 2. Canonical Terminology (Do Not Rename)

| Term | Meaning |
|---|---|
| `core-api` | The modular-monolith backend deployment unit hosting all business-domain modules |
| `realtime-gateway` | The WebSocket deployment unit handling connections, fan-out, presence, typing |
| `workers` | The background job/event-consumer deployment unit |
| `media-processor` | The specialized worker pool for media transcoding/thumbnailing |
| Domain module | A logical, isolated unit inside `core-api` (e.g., "the Messaging module") — not a separate deployable service unless explicitly stated |
| System of record | The single authoritative store for a given entity (see `02-domain-boundaries-and-ownership.md` §3) |
| Read model | A derived, non-authoritative representation of data owned elsewhere (e.g., `conversation_list_view`, search index) |
| Outbox | The transactional pattern and its backing table used to guarantee DB-write/event-publish consistency |
| Fan-out | Delivery of a realtime event from the gateway to all currently-authorized connected clients |
| `clientMessageId` | Client-generated UUID, permanent idempotency key for one message |
| `Idempotency-Key` | Generic, short-lived (24h) HTTP header idempotency mechanism for any mutating request |
| `conversationSequence` | Monotonic per-conversation counter used for gap detection in realtime delivery |
| `eventId` | Globally unique ID for one domain/realtime event, used for consumer/client dedup |
| System of record vs. cache vs. search index vs. event stream | Never interchangeable; see the data ownership matrix in `02-domain-boundaries-and-ownership.md` §3 |

## 3. Canonical Entity Names (Do Not Introduce Synonyms)

`User`, `Credential`, `Device`, `Session`, `Profile`, `PrivacySetting`, `Contact`, `Block`,
`Conversation`, `ConversationMember`, `GroupMetadata`, `GroupMember`, `Message`,
`MessageAttachment`, `MessageReference` (the reply relationship, expressed via
`replyToMessageId`), `MessageReaction`, `DeliveryReceipt`, `ReadReceipt`, `MediaAsset`,
`MediaVariant`, `PushToken`, `NotificationPreference`, `Report`, `ModerationAction`,
`AccountRestriction`, `AdminRole`, `AuditEvent`, `AnalyticsEvent`, `SearchDocument` (logical term
for any indexed projection — not a table).

## 4. Canonical Enum Values

Reproduced from `03-domain-model.md` §4 for convenience — that file is authoritative if these
ever diverge:

- `ConversationType`: `direct`, `group`
- `GroupRole`: `owner`, `admin`, `member`
- `MessageType`: `text`, `image`, `video`, `audio`, `document`, `system`
- `MessageDeletionScope`: `none`, `for_self`, `for_everyone`
- `MediaAssetStatus`: `pending_upload`, `uploaded`, `processing`, `ready`, `failed`, `deleted`
- `AccountStatus`: `active`, `suspended`, `deleted`
- `ReportStatus`: `open`, `reviewed`, `actioned`, `dismissed`

## 5. Identifier, Timestamp, Pagination Conventions

See `03-domain-model.md` §1-2 (identifiers/timestamps) and `05-api-architecture.md` §4
(pagination) for full detail. Summary:

- All entity IDs: UUIDv7, string.
- All timestamps: ISO-8601 UTC, millisecond precision, `timestamptz` in Postgres.
- All high-volume list endpoints: cursor/keyset pagination only, opaque server-encoded cursor,
  server-enforced max page size (default 100).

## 6. API Conventions Summary

- Base path `/v1`, path-based major versioning.
- Standard error envelope: `{ error: { code, message, correlationId, details? } }`
  (`05-api-architecture.md` §3).
- `Idempotency-Key` header supported on all mutating endpoints; `clientMessageId` additionally
  required in the message-send body.
- `Authorization: Bearer <JWT>` on all endpoints except registration/login/refresh/password-reset.
- `X-Correlation-Id` request/response header.

## 7. Realtime Event Envelope Summary

See `06-realtime-architecture.md` §4 for the full envelope. Required fields: `eventId`,
`eventType`, `eventVersion`, `eventTimestamp`, `conversationId` (where applicable),
`conversationSequence` (where applicable), `entityId`, `correlationId`, `producer`, `payload`.

## 8. Domain Event Naming Convention

`domain.action`, lowercase, e.g. `message.created`, `group.member_added`,
`media.processing_completed`. Full catalog in `07-events-and-queues.md` §3. New event types
introduced by later implementation prompts must follow this naming convention and must represent
a meaningful domain/integration boundary (not an internal method call).

## 9. Configuration Naming Convention

Environment variables: `SCREAMING_SNAKE_CASE`, prefixed by component where ambiguity is possible
(e.g., `CORE_API_DATABASE_URL`, `REALTIME_GATEWAY_REDIS_URL`). Feature-specific config grouped by
domain prefix (e.g., `MEDIA_MAX_UPLOAD_SIZE_BYTES`, `NOTIFICATIONS_QUIET_HOURS_DEFAULT_START`).
Exact variable names beyond this convention are an implementation-prompt decision but must follow
this casing/prefixing rule for consistency across independently generated deployment
configurations.

## 10. Status Value Conventions

All entity lifecycle/status fields use lowercase `snake_case` string enums (never integers, never
mixed casing) — consistent with the enums in §4 — so that API responses, database values, and
event payloads never require a translation layer between representations.

## 11. What Later Implementation Prompts Must Not Do

- Introduce a competing name for an already-named domain concept (§3).
- Introduce a new authoritative store for an entity that already has one (see
  `02-domain-boundaries-and-ownership.md` §3).
- Bypass the module-boundary rule (`02-domain-boundaries-and-ownership.md` §4) with direct
  cross-schema SQL joins.
- Use offset-based pagination on any high-volume table.
- Treat the event broker as a permanent store or the search index as an authorization source.
- Claim end-to-end encryption (see ADR-009 in `12-adrs.md`).
- Claim a specific availability SLA not formally established (see
  `10-consistency-caching-reliability.md` §6).
