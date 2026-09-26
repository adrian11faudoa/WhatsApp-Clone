# 17 — Message Contract, Ordering, Receipts, Edit/Delete, Reactions

## 1. Canonical Message Representation (API Resource Shape)

```json
{
  "id": "018f3b2a-....",
  "clientMessageId": "b6b0e6c2-....",
  "conversationId": "018f3a10-....",
  "conversationSequence": 4821,
  "senderId": "018f2c00-....",
  "senderDeviceId": "018f2c01-....",
  "type": "text",
  "body": "hey, are we still on for tomorrow?",
  "attachments": [],
  "replyToMessageId": null,
  "clientComposedAt": "2026-09-16T14:31:55.000Z",
  "serverAcceptedAt": "2026-09-16T14:31:56.412Z",
  "editedAt": null,
  "deletedAt": null,
  "deletionScope": "none",
  "reactionSummary": [ { "emoji": "👍", "count": 3, "reactedByMe": false } ],
  "deliveryState": "delivered",
  "readState": "read"
}
```

### 1.1 Separation of Persistent State from Transport Metadata

| Field | Persistent (DB column) | Transport-only (never a DB column) |
|---|---|---|
| `id`, `clientMessageId`, `conversationId`, `senderId`, `senderDeviceId`, `type`, `body`, `replyToMessageId`, `clientComposedAt`, `serverAcceptedAt`, `editedAt`, `deletedAt`, `deletionScope` | ✔ | |
| `conversationSequence` | ✔ (assigned and stored at persistence time, per Volume 1 `06-...md` §4) | |
| `attachments` | ✔ (via `MessageAttachment` rows) | |
| `reactionSummary` | Derived/computed at read time from `MessageReaction` rows — not stored as a denormalized column on `Message` itself, to avoid write contention on the message row from unrelated reaction activity | |
| `deliveryState`, `readState` | Derived/computed at read time from `DeliveryReceipt`/`ReadReceipt` rows for the requesting user — **never** stored as a column on `Message` (these are per-recipient, not per-message, so a single "deliveryState" field on the message itself would be meaningless for a group conversation with mixed per-recipient states; the API resource shape above renders the requesting *viewer's own* aggregated state as a convenience field, computed at serialization time, not persisted) | |
| Any WebSocket-only signal (e.g., "currently being fanned out," ephemeral typing state referencing this conversation) | | ✔ — never touches the `Message` schema |

## 2. Message Type Contract

| Type | `body` | `attachments` | Notes |
|---|---|---|---|
| `text` | Required, non-empty | Empty | Plain text; client-side rendering must treat as untrusted text (no HTML execution — Volume 1 `09-...md` §4) |
| `image` | Optional (caption) | Exactly 1 image `MediaAsset` reference | |
| `video` | Optional (caption) | Exactly 1 video `MediaAsset` reference | |
| `audio` | Optional | Exactly 1 audio `MediaAsset` reference | |
| `document` | Optional (caption/filename display hint) | Exactly 1 document `MediaAsset` reference | |
| `system` | Required, server-generated (e.g., "Alice added Bob") | Empty | `senderId` is null or a reserved system-sender sentinel; not user-editable/deletable by ordinary users |
| `reply` | Not a distinct `type` — a reply is any of the above types with `replyToMessageId` set. There is no separate "reply" message type, avoiding a combinatorial explosion of type × reply-or-not variants | | |
| `reaction` | Not a message type at all — reactions are a distinct entity (`MessageReaction`), never represented as a `Message` row, to keep the message stream free of high-frequency low-information noise | | |
| `deleted` | Not a distinct `type` — deletion is represented via `deletedAt`/`deletionScope` on the original message, preserving its original `type` for client-side "this was a [type] message, now deleted" rendering if desired | | |

### 2.1 Extensibility and Unknown-Type Handling

New message types may be added additively (new string value in the `type` enum) without a schema
migration beyond adding the value to the application-level enum/check constraint. **Client
compatibility rule**: a client encountering an unrecognized `type` value must render a generic,
non-crashing fallback (e.g., "This message type isn't supported in this app version — update to
view it") rather than failing to render the entire conversation. This is a mandatory client
behavior carried into the web/mobile implementation prompts.

## 3. Message Ordering (Deepened from Volume 1)

- **Authoritative ordering key**: `conversationSequence` (strictly monotonic per
  `conversationId`, assigned transactionally at persistence — Volume 1 `06-...md` §4, this
  volume's `14-...md` §2.3).
- **Database ordering**: `(conversationId, conversationSequence)` composite index, identical in
  effect to `(conversationId, serverAcceptedAt, id)` since both are monotonic together, but
  `conversationSequence` is the one clients reason about for gap detection because it is a small
  dense integer, not a timestamp requiring epsilon-comparison.
- **Cross-device ordering**: identical — all devices of all members observe the same
  `conversationSequence` stream for a given conversation; there is no per-device reordering.
- **Event ordering**: guaranteed only within a partition (`conversationId`-keyed, Volume 1
  `07-...md` §4) — the broker provides in-partition order, and the outbox relay publishes in the
  order rows were committed (`ORDER BY created_at` on the poll query, single relay-writer per
  partition-range to avoid relay-level reordering — see §3.1 below for the concurrency detail this
  implies).
- **Replay ordering**: a resync (`GET .../messages?since=<sequence>`) always returns results
  ordered by `conversationSequence ASC` regardless of the conversation history endpoint's default
  `DESC` ordering for normal pagination — resync is forward-fill, not backward-browse, and this
  distinction is a fixed contract detail new implementers must not conflate.
- **Client rendering on out-of-order arrival**: reaffirmed from Volume 1 — buffer briefly, reorder
  within a bounded window (2s architectural default), resync via REST if the gap persists.

### 3.1 Outbox Relay Ordering Guarantee

To guarantee that `conversationSequence` order matches publish order for a given conversation,
the outbox relay processes rows **ordered by `(conversation_id, conversation_sequence)`** within
each polling batch, and — if the relay is horizontally scaled — partitions its own polling work by
a hash of `conversation_id` so that no two relay workers ever publish for the same conversation
concurrently (avoiding a race where relay worker A publishes sequence 5 after relay worker B has
already published sequence 6 for the same conversation).

## 4. Message Receipt Model (Deepened)

| State | Meaning | Durable? |
|---|---|---|
| `accepted` | Server has durably persisted the message (Volume 1 message lifecycle `Persisted` state) | Implicit — represented by the message row's mere existence, not a separate receipt row |
| `delivered` | At least one active device of a given recipient has received the fan-out event and acknowledged it | Yes — `DeliveryReceipt(messageId, userId, deviceId, deliveredAt)` |
| `read` | The recipient (via at least one device) has viewed the message | Yes — `ReadReceipt(messageId, userId, deviceId, readAt)` |

### 4.1 Multi-Device Aggregation

- **Per-device**: raw rows as above, one per `(messageId, userId, deviceId)`.
- **Account-level aggregation** (what's shown to the *sender* as "delivered"/"read" for a given
  recipient in a 1:1 or group conversation): `delivered` if **any** device of that recipient has a
  `DeliveryReceipt`; `read` if **any** device has a `ReadReceipt`. This is computed at query/
  fan-out time from the per-device rows, never stored as a separate aggregate column (avoiding a
  second source of truth that could drift from the underlying rows).
- **Deduplication**: `UNIQUE (message_id, user_id, device_id)` with `INSERT ... ON CONFLICT DO
  UPDATE` — repeated delivery/read acks from the same device for the same message are idempotent
  no-ops that simply confirm (and may update, e.g., re-affirm `readAt` monotonically — a `readAt`
  update only ever moves forward in time, never backward, via `GREATEST(existing, new)` semantics
  at the SQL level) the existing row.
- **Conflict resolution**: there is no genuine conflict to resolve — receipts are monotonic,
  append/upsert-only facts, not competing edits.
- **Read timestamp behavior**: `readAt` is set to server-receipt time of the read acknowledgment
  (per `14-...md` §2.2), not client-composed time.

### 4.2 Derived vs. Durable

Receipts themselves are durable (Postgres rows). The **aggregated view** exposed to a sender
("read by Alice, Bob; delivered to Carol") is derived/computed at read time — this is explicitly
called out because the master prompt requires this distinction to be specified, and getting it
wrong (e.g., caching a stale aggregate without invalidation) is a common correctness bug class
this architecture avoids by not persisting the aggregate at all.

## 5. Edit and Delete Model (Deepened)

### 5.1 Edit

| Property | Rule |
|---|---|
| Eligibility | Only `senderId == requester.userId` |
| Edit window | Architectural default 15 minutes from `serverAcceptedAt`; exact value is a product/config decision (`MESSAGING_EDIT_WINDOW_SECONDS` config key, per `25-configuration-and-secrets.md`) |
| Authorization | Sender-only; group admins/owners do **not** have edit rights over others' messages (only delete rights, per §2.2 of `16-...md`) — editing someone else's words is a materially different, more sensitive capability than removing them, and this architecture does not grant it to anyone |
| Versioning | The current row holds only the latest `body`; if product policy requires edit-history retention, a separate, explicitly-scoped `MessageEditHistory(messageId, previousBody, editedAt)` append-only table is used — **out of this volume's mandatory scope**, but the schema shape is reserved so an implementation prompt can add it without redesigning `Message` |
| History retention (if enabled) | Visible only to the sender and, per policy, group admins for moderation purposes — never to arbitrary members, since edit history can reveal retracted content the editor intended to correct |
| Client synchronization | `message.edited` fan-out event (full new `body`, `editedAt`) — all devices of all members update their local cache from this single event; no per-device special-casing |
| Event propagation | `message.edited` → Search (re-index), Realtime Gateway (fan-out) — reaffirmed from Volume 1 |

### 5.2 Delete

| Scope | Who | Effect | Propagation |
|---|---|---|---|
| `for_self` | Any member, on any message they can see | Per-user tombstone (`MessageDeletionMark(messageId, userId, deletedAt)`); message remains fully intact for everyone else | No fan-out to other members (this is a purely local-to-the-requester effect); the requester's own other devices *do* need to see it, so a lightweight `message.deletion_mark_added` event is delivered only to that user's own device set, not the conversation's members |
| `for_everyone` | Sender (within edit-window-equivalent deletion window, architecturally the same or a separately configured `MESSAGING_DELETE_WINDOW_SECONDS`), or group `admin`/`owner` (moderation), or `platform_administrator` | Canonical row: `deletedAt` set, `body` nulled, `deletionScope = for_everyone`; attachments become eligible for reference-counted cleanup (Volume 1 `08-...md` §1.2) | `message.deleted` fan-out to all current members; Search removes/flags the document; Notifications does not retroactively recall an already-delivered push (not technically possible with most providers) but suppresses any *not-yet-sent* notification for this message if still queued (dedup/cancellation check in the notification worker before send) |

### 5.3 Client Rendering of Deleted Messages

A `for_everyone`-deleted message is still present in the conversation stream (preserves
`conversationSequence` continuity and reply-reference integrity) but renders as a placeholder
("This message was deleted") using `deletedAt != null` as the signal; `body` is not present
(nulled server-side, not just hidden client-side — the server does not send deleted content to
clients who did not already have it cached before deletion).

## 6. Reaction Model (Deepened)

| Property | Rule |
|---|---|
| Representation | `MessageReaction(messageId, userId, emoji, createdAt)` |
| Uniqueness | `UNIQUE (message_id, user_id, emoji)` — a user may react with the same emoji only once per message |
| Per-user-per-message limit | Product-configurable: either "one reaction total per user per message" (adding a new emoji replaces the old one — requires a `UNIQUE (message_id, user_id)` constraint instead, with `AddReaction` performing an upsert) or "multiple distinct emoji per user per message" (the `UNIQUE (message_id, user_id, emoji)` constraint above). This volume documents both as valid architectural options and requires the implementation prompt to pick one explicitly (an ADR-worthy decision at implementation time, not silently defaulted) |
| Add/remove semantics | `AddReaction`: `INSERT ... ON CONFLICT DO NOTHING` (idempotent — reacting twice with the same emoji is a no-op, not an error). `RemoveReaction`: `DELETE ... WHERE ...` (idempotent — removing an already-absent reaction is a no-op success, not an error) |
| Aggregation | `reactionSummary` (§1) is computed at read time via `GROUP BY emoji, COUNT(*)`, plus a `reactedByMe` boolean computed against the requesting user's own rows — never persisted as a denormalized count column on `Message`, avoiding write contention between reaction activity and message-row reads |
| Realtime propagation | `message.reaction_added` / `message.reaction_removed`, fanned out to all conversation members, carrying the delta (not a full recomputed summary) so clients can increment/decrement their local aggregate without a full re-fetch |
| Persistence | Durable, transactional (Volume 1 `02-...md` §1.9) |
| Authorization | Requester must be a current member of the message's conversation |
| Synchronization | Reactions follow the same multi-device model as messages — no special-casing; a device reconnecting after being offline picks up missed reaction events via the same resync mechanism (`19-synchronization-and-offline.md`) |
| Retry-safety | Because both add and remove are idempotent upserts/deletes keyed on the natural unique constraint, a client retry after a network timeout can safely repeat the exact same request without creating duplicate reaction rows or duplicate fan-out semantics beyond a harmless repeated no-op event (which the client's own `eventId` dedup absorbs, per Volume 1 `06-...md` §4) |
