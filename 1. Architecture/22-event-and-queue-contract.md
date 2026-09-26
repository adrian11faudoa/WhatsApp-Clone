# 22 — Event Schema Standard, Versioning, Partitioning, and Queue Contract

This document deepens Volume 1 `07-events-and-queues.md` into a fixed, binding schema contract.

## 1. Canonical Domain Event Envelope (Fixed Schema)

```json
{
  "eventId": "018f3d00-....",
  "eventType": "message.created",
  "eventVersion": 1,
  "schemaVersion": 1,
  "aggregateType": "Message",
  "aggregateId": "018f3b2a-....",
  "conversationId": "018f3a10-....",
  "conversationSequence": 4821,
  "producer": "core-api",
  "occurredAt": "2026-09-16T14:31:56.412Z",
  "correlationId": "b3a1c2e0-....",
  "causationId": "018f3c99-....",
  "traceContext": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01",
  "payload": { }
}
```

| Field | Required | Rule |
|---|---|---|
| `eventId` | Yes | UUIDv7, deterministic from the outbox row PK (`14-...md` §1, Volume 1 `07-...md` §1) |
| `eventType` | Yes | `domain.action`, from the fixed catalog (Volume 1 `07-...md` §3) |
| `eventVersion` | Yes | Payload shape version for this `eventType`; starts at 1 |
| `schemaVersion` | Yes | Envelope-level version (distinct from `eventVersion`, mirrors `protocolVersion` in the realtime protocol, `18-...md` §1) — versions the envelope shape itself, currently `1` platform-wide |
| `aggregateType` / `aggregateId` | Yes | The domain entity type/ID this event is about (e.g., `Message`/`018f3b2a-...`) |
| `conversationId` | Where applicable | Present for all conversation-scoped events; used as the partition key (§4) |
| `conversationSequence` | Where applicable | Present for all conversation-scoped events; matches the value stored on the underlying entity |
| `producer` | Yes | Emitting deployment unit (`core-api`, `media-processor`) |
| `occurredAt` | Yes | Domain transaction commit time (`14-...md` §2.4) — **not** relay-publish time |
| `correlationId` | Yes | Propagated from the originating request/operation |
| `causationId` | No | The `eventId` of the event that caused this one, if this event was itself produced by consuming another event (e.g., `media.processing_completed` is caused by `media.upload_completed`) — enables full causal-chain reconstruction distinct from the flatter `correlationId` |
| `traceContext` | Yes | W3C Trace Context, propagated end-to-end |
| `payload` | Yes | `eventType`+`eventVersion`-specific structured data |

## 2. Naming Convention (Fixed)

`domain.action`, lowercase, snake_case within `action` where multi-word (`member_removed`,
`processing_completed`). The `domain` prefix matches the owning module name from Volume 1
`02-...md` (`account`, `session`, `device`, `profile`, `contact`, `conversation`, `group`,
`message`, `media`, `report`, `moderation`). No event type may span two domains in its name (e.g.,
no `conversation_group.updated` — if an event genuinely concerns both, it is emitted twice, once
per owning domain, each with its own domain-scoped name and payload).

## 3. Schema Compatibility Rules (Fixed)

| Change type | Rule |
|---|---|
| Add optional field to `payload` | Allowed without bumping `eventVersion`; consumers must ignore unknown fields (forward compatibility requirement on every consumer) |
| Add new `eventType` | Allowed anytime; does not affect existing consumers unless they choose to consume it |
| Remove a field from `payload` | Requires `eventVersion` bump; old and new versions may co-exist during a migration window if the producer is capable of dual-publishing, or all consumers must be upgraded before the producer cuts over (documented per-change, not a fixed global policy, but never silent) |
| Change a field's type or semantic meaning | Requires `eventVersion` bump; treated as a breaking change identically to field removal |
| Change `schemaVersion` (envelope shape itself) | Requires a platform-wide coordinated migration — this is a rare, all-consumer-simultaneously event, unlike per-`eventType` `eventVersion` bumps which can be rolled out consumer-by-consumer |

A shared, versioned TypeScript/JSON-Schema package (Volume 1 `07-...md` §7, reaffirmed) is the
single source of truth for every `eventType`'s payload shape at every `eventVersion` still in use;
`core-api` (producer) and `workers`/`realtime-gateway` (consumers) import from this package rather
than redefining the shape independently — this is a **mandatory** implementation-prompt
deliverable, not optional tooling.

## 4. Partitioning and Ordering (Fixed)

| Topic | Partition key | Ordering guarantee | Rationale |
|---|---|---|---|
| `messages` (carries `message.*`, `reaction.*`, `receipt.*` events) | `conversationId` | Strict per-conversation order | Matches `conversationSequence` (§`14-...md` §2.3); this is the only ordering guarantee that actually matters to clients |
| `conversations` (carries `conversation.*`, `group.*`) | `conversationId` | Strict per-conversation order | Membership/settings changes must be observed in the order they happened relative to messages in the same conversation (e.g., a `group.member_removed` must not be perceived as happening "before" a message that was actually sent after it) — using the **same** partition key as `messages` for the same `conversationId` is what guarantees this cross-event-type ordering within one conversation |
| `accounts` (carries `account.*`) | `userId` | Per-user order | Sequential account lifecycle transitions must not be reordered |
| `sessions` (carries `session.*`, `device.*`) | `userId` | Per-user order | Same rationale |
| `media` (carries `media.*`) | `mediaAssetId` | Per-asset order | `upload_completed` must always be observed before `processing_completed` for the same asset |
| `moderation` (carries `report.*`, `moderation.*`) | `targetId` (the reported/actioned entity) | Per-target order | Sequential moderation actions on the same target must not be reordered |

**Events that require no ordering guarantee at all** (documented explicitly, per the master
prompt's requirement): `profile.updated` (last-write-wins is acceptable — a stale intermediate
profile state briefly visible to a re-indexer causes no correctness issue), `notification.*`
(delivery-tracking, not correctness-critical order), presence/typing (not on the broker at all,
per Volume 1 `06-...md` §6-7).

## 5. Canonical Job Envelope (Queue Contract, Fixed)

```json
{
  "jobId": "018f4b00-....",
  "jobType": "notification.send",
  "jobVersion": 1,
  "createdAt": "2026-09-16T14:31:57.500Z",
  "attempt": 1,
  "maxAttempts": 8,
  "idempotencyKey": "018f3d00-....:018f4c00-....",
  "correlationId": "b3a1c2e0-....",
  "traceContext": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01",
  "payload": { }
}
```

| Field | Rule |
|---|---|
| `jobId` | UUIDv7, unique per enqueue (a retry of the same logical work reuses the same `jobId` if the queue library supports in-place retry, or generates a new `jobId` with the same `idempotencyKey` if it re-enqueues — either is acceptable since `idempotencyKey`, not `jobId`, is what handlers check) |
| `jobType` | `domain.action` naming, e.g. `notification.send`, `media.transcode`, `search.index`, `retention.cleanup`, `account.deletion_cascade` |
| `jobVersion` | Payload shape version for this `jobType`, same compatibility rules as `eventVersion` (§3) |
| `attempt` / `maxAttempts` | Current attempt number and the ceiling from Volume 1 `07-...md` §6's per-category retry policy |
| `idempotencyKey` | Composite, job-type-specific (e.g., `(eventId, pushTokenId)` for notifications, `(mediaAssetId, variantKind)` for media processing) — this is the field every handler checks before performing side effects (§6) |
| `correlationId` / `traceContext` | Propagated from the triggering event/request |

### 5.1 Retryable vs. Non-Retryable Failures

| Failure class | Retryable? | Handling |
|---|---|---|
| Transient infrastructure error (timeout, 5xx from a dependency, connection reset) | Yes | Standard backoff retry up to `maxAttempts` |
| Provider-reported permanent rejection (invalid push token, malformed media the codec cannot parse) | No | Immediately marked `failed_permanent`, no retry, but still logged/observable — never silently dropped |
| Business-rule rejection discovered mid-job (e.g., the target message was deleted before a queued search-index job ran) | No | Job handler checks current authoritative state first (per idempotency discipline, §6); if the precondition no longer holds, treats it as a no-op success, not a failure — this is not a "failure" at all, it's a correctly-detected obsolescence |
| Unexpected/unclassified error | Retryable by default (fail-safe — assume transient unless proven otherwise), but capped at `maxAttempts` same as any transient error, then dead-lettered for investigation | 

## 6. Dead-Letter Contract (Fixed)

Every queue has a paired dead-letter queue (DLQ) with the **same** job envelope plus:
```json
{ "deadLetteredAt": "...", "finalError": { "message": "...", "stack": "<redacted in default log level>" }, "attemptHistory": [ { "attempt": 1, "failedAt": "...", "errorClass": "TimeoutError" } ] }
```
DLQ entries are never auto-deleted; they are retained, alertable (Volume 1 `11-...md` §6), and
either manually requeued after remediation or explicitly discarded by an operator action that is
itself audited (an admin/operator action against the DLQ is logged the same as any other
privileged action, per `24-audit-administration-abuse-threat.md` §1).
