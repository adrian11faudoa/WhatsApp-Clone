# 19 — Synchronization Protocol and Offline Operation Model

## 1. Formal Synchronization Protocol

### 1.1 Checkpoint Model

The client's synchronization state for a conversation is a single integer: the highest
`conversationSequence` it has durably applied locally (`lastKnownSequence`). This is the **only**
checkpoint concept in the protocol — no separate "cursor," "offset," or "vector clock" is
introduced, keeping the reconciliation model simple and matching the single-writer-per-
conversation ordering guarantee established in `17-message-contract.md` §3.

### 1.2 Initial Synchronization (New Device / First Login)

1. Client authenticates, has no `lastKnownSequences` at all.
2. Client fetches its conversation list: `GET /v1/conversations` (cursor-paginated, ordered by
   `lastMessageAt DESC`).
3. For each conversation the client opens, it fetches the most recent page of history:
   `GET /v1/conversations/{id}/messages?limit=50` (no cursor — first page).
4. Client records `lastKnownSequence` = the `conversationSequence` of the newest message
   returned, per conversation.
5. Client establishes the realtime connection (`18-...md` §2) supplying these
   `lastKnownSequences` (capped to the 50 most-recently-active conversations per the handshake
   payload bound) so it immediately starts receiving live events without a gap from step 3/4's
   snapshot moment.

### 1.3 Incremental Synchronization (Reconnect)

1. Client reconnects, supplies `lastKnownSequences` per conversation in the auth frame
   (`18-...md` §2).
2. Gateway compares each supplied sequence against the current head sequence (queried from
   `core-api`/cache) for that conversation.
3. If `current - lastKnown` is small (below a threshold, e.g., ≤ 50) and within the broker's
   retention window, the gateway can optionally fast-path by requesting `core-api` to fan-out the
   missed range directly as a batch of `message_created`-equivalent events; **however, the
   canonical, always-correct path is the REST resync** (`GET .../messages?since=<lastKnown>`),
   which the client always performs as source of truth regardless of whether the gateway's
   fast-path also fires — this deliberate redundancy (gateway fast-path as a latency optimization,
   REST resync as the correctness guarantee) means a fast-path bug can never cause silent data
   loss, only, at worst, a redundant harmless re-delivery absorbed by `eventId`/`clientMessageId`
   dedup.
4. If the gap exceeds the threshold, or the conversation isn't in the client's recently-active
   set at all, the gateway sends `sync_required` (`18-...md` §5.1) and takes no further fan-out
   action for that conversation until the client explicitly resyncs.

### 1.4 Missed-Event Recovery — What "Missed" Covers

- Missed `message.created/edited/deleted` → recovered via `GET .../messages?since=`.
- Missed `group.member_added/removed/role_changed` → recovered via
  `GET /v1/conversations/{id}/members` (full current membership fetch — membership lists are
  small enough that a full re-fetch on reconnect is simpler and cheap, versus an incremental
  membership-delta protocol).
- Missed `message.delivered/read` (receipts) → recovered as part of the message resync response,
  which includes each message's current aggregated `deliveryState`/`readState` (`17-...md` §1),
  not a separate receipt-specific sync call.
- Missed `conversation.settings_updated` → recovered via `GET /v1/conversations/{id}`
  (full current settings re-fetch, same rationale as membership — low value in a delta protocol
  for infrequently-changing, small data).

### 1.5 Pagination During Sync

The `since=<sequence>` resync endpoint uses the same cursor-pagination mechanics as normal
history browsing (`15-...md` §4.1) but ordered `ASC` from the checkpoint (`17-...md` §3) with
`hasMore` indicating whether the client must issue a follow-up call to fully catch up (bounded by
the same `limit` cap — a client that has been offline for a very long time and has thousands of
missed messages catches up over several paginated calls, not one unbounded response).

### 1.6 Conflict Reconciliation

The only "conflict" possible in this model is the message-edit race already resolved by
last-write-wins (Volume 1 `06-...md` §8, ADR-008 in `12-adrs.md`). Synchronization itself has no
conflicts to reconcile beyond correctly applying an ordered, gap-free stream of authoritative
server state — there is no client-authored state that the server must merge against
concurrently-changed server state, because every durable write (message send, edit, delete,
receipt, reaction, membership change) is validated and applied server-side first, and the client
only ever reconciles its local cache to match server state, never the reverse.

### 1.7 Stale/Invalid Checkpoint Detection

If a client presents a `lastKnownSequence` **higher** than the server's current head for that
conversation (a corrupted local state, e.g., from a bug or a restored-from-backup device with
stale-but-internally-inconsistent data), the server treats this as an invalid checkpoint: responds
with `sync_required` and `reason: "invalid_checkpoint"`, and the client is required to discard its
local cache for that conversation and perform a full initial sync (§1.2) for it rather than trust
any of its cached state, since a sequence number ahead of the server is evidence the local cache is
not a valid prefix of true history.

## 2. Offline Operation Model

### 2.1 Operations Permitted Offline (Locally Queued)

| Operation | Local identifier | Pending state | Retry state | Server ack | Failure state |
|---|---|---|---|---|---|
| Send message | `clientMessageId` (generated at compose time, before any network attempt) | Rendered immediately in the UI with a "sending" indicator, keyed by `clientMessageId` | Client retries on reconnect using the **same** `clientMessageId` (per `03-...md` §5.2 / `15-...md` §5.2) — safe indefinitely, not bounded by the 24h generic idempotency window | Server response (`201`/`200` via REST, or the `ack`/fan-out via WebSocket) reconciles the optimistic local row (matched by `clientMessageId`) with the authoritative `id`/`conversationSequence`/`serverAcceptedAt` | If the server ultimately rejects (e.g., `403` — removed from conversation while offline), the local message transitions to a visible "failed to send" state with the specific reason; it is never silently dropped |
| Add/remove reaction | N/A (no durable local ID needed — idempotent by natural key) | Optimistic local UI toggle | Retried on reconnect (idempotent, safe to repeat) | Fan-out event or REST response confirms | Failure (e.g., removed from conversation) reverts the optimistic toggle and surfaces an error |
| Mark delivered/read | N/A | Optimistic local state change | Retried on reconnect | Server upsert confirms | Failure is rare/non-blocking (a receipt ack failing has no user-visible consequence beyond eventual re-attempt) |
| Typing indicator | N/A | Not meaningfully "offline-queueable" — typing state older than the reconnect gap is stale and is simply not sent at all upon reconnect (no retry) | N/A | N/A | N/A |
| Edit/delete message | Uses the existing `messageId` (must already be known locally, i.e., cannot edit/delete a message that itself hasn't been confirmed by the server yet — client-side UI prevents editing a still-"sending" optimistic message) | Optimistic local update | Retried on reconnect via `Idempotency-Key` header (generic mechanism, `15-...md` §5.1, since edit/delete aren't `clientMessageId`-keyed operations) | Server response confirms | Failure (e.g., edit window expired while offline) reverts the optimistic change and surfaces the specific error |
| Create conversation | Client-generated local-only placeholder ID, **never** transmitted to or recognized by the server (distinct from `clientMessageId`, which the server does track) — used purely for local UI navigation before the server-assigned `conversationId` exists | Optimistic local conversation shell | Retried on reconnect via required `Idempotency-Key` header (`15-...md` §5.3) | Server response provides the authoritative `conversationId`, and the client migrates its local placeholder's queued messages (if any were composed against it while offline) to reference the real ID | Failure surfaces an error; any messages queued against the placeholder remain queued and are retried against the real ID once created, or surfaced as failed if conversation creation itself ultimately fails |

### 2.2 Operations Never Permitted Offline

Anything requiring a server-side authorization decision the client cannot safely presume will
still hold by the time connectivity returns: group membership/role changes by an admin (an admin's
own permissions could have been revoked while offline — this is not queued optimistically as
"probably still allowed," it simply requires connectivity to attempt at all, per the "offline
state must never bypass server authorization" requirement), account/session management, media
upload initiation (requires a fresh presigned URL from the server, cannot be pre-generated
offline), search (inherently requires server round-trip), administrative/moderation actions.

### 2.3 Local Storage of Pending State

Clients maintain a local "outbox" of pending operations (message sends, reactions, receipts, edits/
deletes) keyed by their respective idempotency identifiers, persisted in local device storage
(mechanism is a client-implementation-prompt decision — e.g., SQLite/AsyncStorage/IndexedDB) so
that pending operations survive an app restart while still offline, not just a network blip. This
local outbox is purely a client-side concern; the server has no visibility into or dependency on
its existence — the server-side idempotency mechanisms (§2.1's identifiers) are what make it safe
regardless of how long the client holds a pending operation before retrying.

### 2.4 Reconciliation on Reconnect

Reconnect triggers, in order: (1) realtime handshake per §1.3, (2) drain of the local pending
outbox — replaying each queued operation against its respective REST/WebSocket endpoint using its
established idempotency identifier, (3) normal resync per §1.3–1.5 to pick up server-side changes
that happened while offline (messages from others, membership changes, etc.), interleaved
correctly by `conversationSequence` with the client's own now-confirmed sent messages.
