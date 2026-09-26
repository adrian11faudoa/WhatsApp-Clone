# 06 — Realtime Architecture

## 1. Scope and Relationship to Durable State

The `realtime-gateway` is a **transport and fan-out layer**. It never becomes the authoritative
store for messages, receipts, or membership. Every realtime event is a notification about state
that is already (or is about to be) durable in PostgreSQL (see `03-domain-model.md` §5.1 — a
message does not exist until `Persisted`). If the realtime layer is completely unavailable,
durable state is unaffected; clients simply fall back to polling/REST sync on reconnect.

## 2. Connection Establishment

1. Client opens a WebSocket (WSS) connection to `realtime-gateway`, presenting the access token
   as a connection-time parameter (e.g., `Sec-WebSocket-Protocol` subprotocol token or an initial
   `auth` frame — not a query string, to avoid token leakage into access logs).
2. Gateway verifies the JWT signature/expiry synchronously (no DB round-trip needed for token
   validity — JWTs are self-contained and short-lived; see `09-auth-security-privacy.md` §2).
3. Gateway resolves `userId` and `deviceId` from the token, and establishes a **connection
   identity**: `{ connectionId (server-generated, ephemeral), userId, deviceId, sessionId }`.
4. Gateway loads the user's **authorization snapshot** (conversation memberships) from the
   short-TTL Redis-cached membership index; on cache miss, synchronously calls `core-api`'s
   Groups/Conversations module to build it, then caches it (TTL 60s, invalidated early by
   `group.member_added/removed` events — see §5).
5. Gateway registers the connection in Redis: `presence:connections:{userId}` (set of active
   `connectionId`s) and `presence:device:{deviceId}` (last-heartbeat timestamp).
6. Gateway sends a `sync.ready` control frame containing the client's last-known
   `conversationSequence` per conversation (if the client supplied one — see §7 for reconnect
   sync) or a full snapshot cursor if this is a first connection.

## 3. Authentication and Authorization

- **Authentication**: at handshake only (token verified once per connection); the gateway does
  not re-verify the JWT on every frame, but **does** check token expiry against wall-clock time
  before allowing new subscriptions, and force-disconnects a connection whose token has expired
  (client must reconnect with a refreshed token — see `09-auth-security-privacy.md` §3).
- **Authorization**: per-event, not just per-connection. Before fanning out a `message.created`
  event to a given connection, the gateway checks that connection's cached membership snapshot
  for that `conversationId`. Before accepting an inbound client action (e.g., `typing.start`), the
  gateway performs the same membership check.
- If the cached snapshot is stale (older than TTL) at the moment of a fan-out decision for a
  security-sensitive event, the gateway falls back to a synchronous authorization check against
  `core-api` rather than trusting stale-but-unexpired cache — favoring correctness over latency
  for this specific decision point.

## 4. Realtime Event Envelope (Canonical, Cross-Part Contract)

```json
{
  "eventId": "018f3d00-....",
  "eventType": "message.created",
  "eventVersion": 1,
  "eventTimestamp": "2026-09-16T14:31:56.412Z",
  "conversationId": "018f3a10-....",
  "conversationSequence": 4821,
  "entityId": "018f3b2a-....",
  "correlationId": "b3a1c2e0-....",
  "producer": "core-api",
  "payload": {
    "id": "018f3b2a-....",
    "senderId": "018f2c00-....",
    "type": "text",
    "body": "hey, are we still on for tomorrow?",
    "serverAcceptedAt": "2026-09-16T14:31:56.412Z"
  }
}
```

| Field | Rule |
|---|---|
| `eventId` | UUIDv7, globally unique, used by clients and the gateway itself for dedup |
| `eventType` | `domain.action` naming, matches the durable domain event name where one exists (see `07-events-and-queues.md` §3) |
| `eventVersion` | Integer, bumped only on breaking payload changes; additive fields do not bump it |
| `conversationSequence` | Monotonically increasing per-`conversationId` counter, assigned at persistence time in `core-api` (stored alongside the message/event), used by clients to detect gaps |
| `correlationId` | Propagated from the originating HTTP request, present in logs/traces for the whole flow |
| `producer` | Which service emitted the underlying domain event |

### Client Duplicate/Gap Detection

- **Duplicate**: client maintains a bounded LRU set of recently-seen `eventId`s (e.g., last 500
  per conversation); any repeat is dropped silently.
- **Gap**: client tracks the highest `conversationSequence` seen per conversation. If a new
  event's sequence is not exactly `last + 1`, the client buffers it briefly (bounded window, e.g.
  2 seconds) awaiting the missing sequence(s) via redelivery; if the gap persists past the
  window, the client issues a `GET /v1/conversations/{id}/messages?since=<lastSequence>` REST
  resync call rather than trusting the realtime stream further for that conversation until
  resynced.
- **Stale/invalid version**: a client that does not recognize `eventVersion` for a given
  `eventType` ignores the event's payload-specific fields but still advances its sequence
  tracking, and logs a client-side telemetry event for version-skew monitoring.

## 5. Subscription and Fan-Out Model

- On connect, a connection is implicitly subscribed to all conversations in its cached membership
  snapshot — there is no separate per-conversation "subscribe" call for conversations the user is
  already a member of.
- Fan-out mechanism: `realtime-gateway` instances consume domain events from the broker
  (`message.*`, `group.*`, `conversation.*`, `presence.*`-adjacent) via a shared consumer group.
  Each gateway instance holds only the connections attached to it; it looks up, via Redis, which
  `connectionId`s (across all gateway instances) are subscribed to the event's `conversationId`
  and are hosted on *this* instance, and delivers directly to those local WebSocket connections.
  Cross-instance delivery is achieved because **every gateway instance consumes the same broker
  topic/partition set relevant to it** — not via a separate pub/sub relay — simplifying the
  delivery path to: broker → each gateway instance filters to its own local connections → push.
- Membership changes (`group.member_added/removed`) immediately invalidate the affected user's
  cached authorization snapshot on all gateway instances (via a Redis pub/sub invalidation
  channel) so a removed member stops receiving fan-out for that conversation within the
  invalidation propagation window (architectural target: < 2s).

## 6. Presence Architecture

- **Storage**: Redis only. No Postgres table. Key: `presence:user:{userId}` → hash of
  `{deviceId: lastHeartbeatAt}`; TTL-refreshed per device, not per key, so multi-device presence
  degrades gracefully per device.
- **Heartbeat**: client sends a lightweight `presence.heartbeat` frame every N seconds
  (architectural default: 25s) while connected; the WebSocket connection itself is also a
  liveness signal — on clean or unclean disconnect, the gateway immediately clears that device's
  presence entry (not waiting for TTL) when it detects the socket close, with TTL expiry as the
  backstop for ungraceful process death of the gateway itself.
- **Account-level presence** (shown to other users) = "online" if any device has a live entry,
  else "last seen at max(lastHeartbeatAt across devices)", filtered by the viewed user's
  `PrivacySetting.presenceVisibility`/`lastSeenVisibility` (checked synchronously against
  `core-api`-owned settings, cached with short TTL).
- **Fan-out**: `presence.changed` is published on a Redis pub/sub channel scoped to "contacts of
  this user" — **not** a durable broker topic — because presence has no replay/audit requirement
  and durability would only add cost with no correctness benefit.
- **Degradation when Redis is unavailable**: presence becomes unavailable (clients show "presence
  unknown," never a stale/wrong "online"); this never blocks message send/receive, which do not
  depend on presence.

## 7. Typing Indicators

- Ephemeral, not persisted anywhere durable. `typing.start` / `typing.stop` frames, scoped to a
  `conversationId`, fanned out only to other current members' active connections (same fan-out
  mechanism as §5, but the event never touches the broker — it is relayed directly
  gateway-instance-to-gateway-instance via the same Redis pub/sub used for presence, since it has
  identical durability requirements: none).
- **Debounce**: client throttles `typing.start` to at most once per 3s of continued typing; the
  gateway auto-expires a typing indicator 10s after the last `typing.start` if no `typing.stop` or
  refresh arrives (handles abrupt disconnects without an explicit stop frame).
- **Duplicate prevention**: idempotent by nature (repeated `typing.start` just refreshes a TTL);
  no dedup key needed.

## 8. Multi-Device Synchronization Model

| Concern | Design |
|---|---|
| Device identity | Stable client-generated `deviceId`, registered at login (see `03-domain-model.md` §1) |
| Session identity | Server-issued `sessionId` per login, tied to a `deviceId` and refresh-token lineage |
| Missed-event recovery | On reconnect, client supplies its last-known `conversationSequence` per active conversation (bounded to N most-recently-active conversations in the initial handshake payload to avoid unbounded reconnect cost); gateway/`core-api` returns any events since that sequence via REST resync (`GET /v1/conversations/{id}/messages?since=`), not by replaying the raw event log, because Postgres is the durable source, not the broker |
| Read-state sync | `ReadReceipt` is per `(messageId, userId, deviceId)`; a "conversation read" convenience state exposed to clients is derived as "max serverAcceptedAt read by any of the user's devices," so reading on one device clears the unread badge on all devices via the normal `message.read` fan-out event |
| Deletion sync | `message.deleted` fan-out event reaches all devices of all members; each device updates its local cache independently — no special multi-device deletion protocol needed beyond normal fan-out |
| Edit sync | Same as deletion — `message.edited` fan-out event is sufficient |
| Conflict handling | The only genuinely concurrent multi-device write is rare (e.g., editing the same message from two devices near-simultaneously); resolved by last-write-wins on `editedAt` at the database layer (the second `UPDATE` simply overwrites, and both devices converge via the fan-out event reflecting final state) — no CRDT/merge complexity is justified for this data shape |
| Intermittent connectivity | Devices are not assumed to hold a continuously active connection; all synchronization state needed for correctness (conversation sequence, receipts) is durable in Postgres, never solely in an open WebSocket's in-memory state |

## 9. Backpressure and Failure Handling

- **Per-connection outbound buffer limit**: if a client's WebSocket send buffer exceeds a bound
  (slow consumer), the gateway drops non-critical ephemeral events first (typing indicators,
  presence) before ever dropping durable-event notifications; if the buffer remains over bound,
  the connection is closed with a code instructing the client to reconnect and resync via REST —
  never silently drops a `message.created` notification without the client's sequence-gap
  detection catching it on the next successful frame or reconnect.
- **Gateway instance crash**: connections on that instance drop; clients reconnect (with backoff
  + jitter to avoid a reconnect storm) to another instance behind the load balancer and resync via
  §8's missed-event recovery. No message loss, because durability never depended on the gateway.
- **Broker consumer lag on the gateway side**: fan-out latency increases but no events are lost
  (broker retains and the gateway's consumer group resumes from its committed offset); clients
  experience delayed-but-eventually-consistent delivery, bounded by broker retention.
- **Horizontal scaling**: gateway instances are stateless aside from the local WebSocket
  connections they hold; scaling out adds instances behind the load balancer, each independently
  consuming the shared broker topics for its fan-out decisions. Connection-to-instance affinity is
  handled by the load balancer's sticky routing at connect time; no cross-instance handoff of an
  established connection is required.

## 10. Reconnect Behavior

- Exponential backoff with full jitter, starting at ~500ms, capped at ~30s, reset on any
  successful connection lived longer than a threshold (e.g., 10s) to avoid penalizing a
  legitimately reconnecting client after a brief blip.
- On every reconnect, the client always performs the handshake described in §2 and the
  missed-event recovery described in §8 — reconnect is never assumed to be a seamless resume of
  exactly where the previous connection left off at the transport level.
