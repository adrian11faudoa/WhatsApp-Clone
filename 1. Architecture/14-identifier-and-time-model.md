# 14 — Volume 2 Overview, Canonical Identifier Model, Time and Clock Model

## 0. Relationship to Volume 1

This document set (files `14-`–`28-`) is **Architecture Volume 2**. It extends, and must remain
consistent with, Volume 1 (`00-architecture-overview.md` through `13-glossary-and-cross-part-
contracts.md`). Where Volume 1 already established a convention (e.g., UUIDv7 identifiers,
cursor pagination, the standard error envelope, the outbox pattern), Volume 2 deepens it rather
than replacing it. Any apparent conflict is resolved in favor of the more specific, later
statement here, but no such conflict is intentional — this volume was written against Volume 1 as
its source of truth. If a future reader finds a genuine contradiction, Volume 1's domain
ownership and data-ownership matrix (`02-...md` §3) remain the tie-breaker for *who owns what*;
this volume is the tie-breaker for *exact contract shape*.

## 1. Canonical Identifier Model (Full Platform Table)

| Identifier | Authority | Format | Uniqueness scope | Persisted? | Exposed to clients? | Security notes | Indexing |
|---|---|---|---|---|---|---|---|
| User ID (`userId`) | Server (Identity module) | UUIDv7 | Global | Yes | Yes | Not a secret; safe in URLs/logs | Primary key |
| Account ID | N/A — this platform has one account per user; `userId` **is** the account identifier. No separate "Account ID" concept is introduced, to avoid two incompatible ID systems for the same entity | — | — | — | — | — | — |
| Device ID (`deviceId`) | Client-generated (UUIDv4) at first install/browser profile, registered server-side | UUIDv4 | Global (collision probability negligible; server enforces uniqueness per registration) | Yes | Yes | Not a secret | Indexed on `(userId, deviceId)` |
| Session ID (`sessionId`) | Server (Devices & Sessions module) | UUIDv7 | Global | Yes | Yes (embedded in access token claims) | Not a secret itself; the refresh token tied to it is | Primary key |
| Conversation ID (`conversationId`) | Server (Conversations module) | UUIDv7 | Global | Yes | Yes | Not a secret | Primary key; partition/index key for messages |
| Membership ID | No separate ID — a membership is uniquely identified by the composite `(conversationId, userId)`; introducing a surrogate `membershipId` alongside this composite would create two ways to reference the same row and is explicitly avoided | — | — | — | — | — | Composite unique index |
| Message ID (`id`) | Server (Messaging module) | UUIDv7 | Global | Yes | Yes | Not a secret | Primary key; composite index with `conversationId` |
| Client Message ID (`clientMessageId`) | Client (UUIDv4) | UUIDv4 | Unique per `(conversationId, senderId)` (enforced by DB constraint) | Yes | Yes (round-tripped in the message resource) | Not a secret | Part of the idempotency unique constraint |
| Attachment ID | Server (Messaging module, `MessageAttachment.id`) | UUIDv7 | Global | Yes | Yes | Not a secret | Primary key |
| Media Asset ID (`mediaAssetId`) | Server (Media module) | UUIDv7 | Global | Yes | Yes | Not a secret (access to the *bytes* is separately authorized via signed URLs — see `20-media-contract.md`) | Primary key |
| Event ID (`eventId`) | Server, generated **deterministically from the outbox row's own primary key** at relay time (Volume 1, `07-...md` §1) | UUIDv7 | Global | Yes (outbox retention window) | Yes (in realtime envelope) | Not a secret | Consumer dedup key |
| Job ID | Server/queue library (BullMQ-style) | UUIDv7 (or the queue library's native ID, wrapped to expose a UUIDv7 externally in logs) | Global per queue | Yes (queue retention window) | No (internal only) | N/A | Queue-internal |
| Notification ID | Server (Notifications module) | UUIDv7 | Global | Yes | No (internal delivery-tracking only; clients see the resulting push, not this ID) | N/A | `NotificationDeliveryLog` primary key |
| Report ID | Server (Moderation module) | UUIDv7 | Global | Yes | Yes (to the reporter and to admins) | Not a secret | Primary key |
| Audit Event ID | Server (Audit module) | UUIDv7 | Global | Yes | Admin-only exposure | Not a secret, but access to the audit log itself is privileged | Primary key |
| Correlation ID | Edge or client, else server-generated | UUIDv4 | Per logical operation (may span multiple HTTP requests, e.g., upload-then-complete) | No (log/trace retention only) | Yes (returned in `X-Correlation-Id` and error envelopes) | Not a secret | N/A (log/trace field) |
| Trace ID / Span ID | OpenTelemetry SDK | W3C Trace Context | Per request/operation | No (trace-backend retention only) | No (internal header, not returned to browser JS by default) | Not a secret, but not client-facing by convention | N/A |
| Idempotency Key | Client-generated (UUIDv4) | UUIDv4 | Per `(userId, endpoint, key)`, 24h window | Yes, 24h TTL (`IdempotencyRecord` table) | Client-supplied, not server-generated | Not a secret | Unique index with TTL-based cleanup job |

### 1.1 Rule: One ID System Per Entity

No entity in this platform has two independent, incompatible identifier systems. Where a natural
key exists (membership = `(conversationId, userId)`; delivery/read receipts =
`(messageId, userId, deviceId)`), a redundant surrogate ID is deliberately **not** introduced,
per the principle stated in Volume 1 (`03-domain-model.md` §1): identifiers must not proliferate
beyond what durable reference and idempotency actually require.

### 1.2 Exposure and Security Summary

- IDs safe to appear in URLs, logs, and error messages: all entity IDs above except session's
  *associated* refresh token (never an ID exposed as such — see `16-auth-session-authorization-
  contract.md`).
- IDs that must never appear in browser-accessible JavaScript storage in plaintext long-term:
  the refresh token value (not an "ID" in this table, but flagged here since it is the one
  credential-adjacent value in the identifier universe) — see §3 of
  `16-auth-session-authorization-contract.md` for storage requirements.
- Trace IDs are propagated on internal headers; they are not deliberately hidden from a
  sufficiently-privileged client (e.g., an error response's `correlationId` can be cross-referenced
  by support staff to a trace), but are not rendered in end-user UI.

## 2. Time and Clock Model

### 2.1 Serialization

All timestamps in every API response, event, log line, and database column: **ISO-8601, UTC,
millisecond precision**, e.g. `2026-09-16T14:31:56.412Z`. No timezone offsets other than `Z`
(UTC) are ever serialized by the server. Clients render local time by conversion, never by
serialization.

### 2.2 Server Authority

**Client clocks are never trusted for any security-sensitive or ordering-sensitive decision.**
Concretely:

| Use | Authoritative clock | Client-supplied timestamp's role |
|---|---|---|
| Message ordering within a conversation | Server (`serverAcceptedAt` + `conversationSequence`, see `17-message-contract.md` §4) | `clientComposedAt` is display-hint only ("composed at," useful for showing "sent 2 minutes ago" from the sender's own perspective before server ack), never used for ordering or conflict resolution |
| Token expiry | Server (`exp` claim checked against server wall clock) | Client-reported time is never consulted |
| Idempotency-key TTL | Server (record `createdAt`, 24h from server receipt) | N/A |
| Rate-limit windows | Server (Redis TTL/window, server clock) | N/A |
| Edit-window eligibility | Server (`now() - serverAcceptedAt <= editWindow`, server clock) | N/A |
| Delivery/read receipt timestamps | Server (`deliveredAt`/`readAt` set at server receipt of the ack, not client-composed) | The client may report a local "read at" moment in its UI in real time, but the durable, cross-device-synchronized value is the server receipt time — this avoids trusting a device with a skewed clock to determine cross-device read-state ordering |
| Presence heartbeat freshness | Server (Redis TTL, server clock) | N/A |

### 2.3 Ordering Semantics

- **Total order within one conversation**: `conversationSequence`, a server-assigned, strictly
  monotonically increasing integer per `conversationId` (Volume 1, `06-...md` §4). This — not
  `serverAcceptedAt` — is the authoritative ordering key exposed to clients for gap detection,
  because two events with the same or very close timestamps (possible under concurrent writes)
  are still required to have a strict, unambiguous order.
- `serverAcceptedAt` remains the ordering key **within the database** (it's what the primary
  history index is built on — Volume 1, `04-...md` §4) and is guaranteed monotonically
  non-decreasing per conversation because `conversationSequence` assignment and
  `serverAcceptedAt` assignment happen in the same transaction, in the same order, for every
  message.
- **No global cross-conversation ordering guarantee** is provided or required. Only ordering
  within a single conversation is a correctness requirement (Volume 1, `07-...md` §4 already
  scopes broker partitioning to `conversationId` for exactly this reason).
- **Client rendering behavior on out-of-order arrival**: see Volume 1 `06-...md` §4 (buffer,
  reorder within a bounded window, resync on persistent gap) — unchanged and reaffirmed here as
  the canonical behavior.

### 2.4 Event and Job Timestamps

- Domain events: `occurredAt` = the server transaction commit time of the underlying state
  change (i.e., `serverAcceptedAt`-equivalent for that aggregate), never the relay-publish time —
  this lets consumers reason about "when did this actually happen" independent of any outbox
  relay delay.
- Job envelopes (`22-event-and-queue-contract.md` §4): `createdAt` = enqueue time,
  distinct from `occurredAt` of the triggering domain event, so processing-latency metrics can
  distinguish "event-to-enqueue" delay from "domain-action-to-event" delay.
