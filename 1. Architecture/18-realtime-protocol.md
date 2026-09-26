# 18 — Realtime Protocol (Commands, Events, Envelope, Errors)

This document deepens Volume 1 `06-realtime-architecture.md` into a binding wire protocol.

## 1. Protocol Version

Every frame (client→server command or server→client event) carries `protocolVersion: 1` at the
top level, distinct from `eventVersion` (which versions an individual event *type*'s payload).
`protocolVersion` versions the envelope/framing itself. A client speaking `protocolVersion: 1`
must be understood by any gateway instance running compatible protocol-1 support; a breaking
change to the envelope shape itself requires a new `protocolVersion` and a negotiated or
dual-support rollout window (same expand/contract discipline as elsewhere in this architecture).

## 2. Handshake (Deepened)

1. Client opens WSS connection: `wss://realtime.<domain>/v1/connect`.
2. First frame from client (within a required timeout, e.g., 5s, or the gateway closes the
   connection with code `4001 AUTH_TIMEOUT`):
   ```json
   {
     "protocolVersion": 1,
     "type": "auth",
     "accessToken": "eyJhbGciOi....",
     "deviceId": "b1a2-....",
     "lastKnownSequences": { "018f3a10-....": 4810, "018f3a11-....": 220 }
   }
   ```
   `lastKnownSequences` is optional (omitted on first-ever connection), bounded to the client's N
   most-recently-active conversations (architectural cap: 50, to bound handshake payload size —
   conversations beyond this cap are resynced lazily on-demand when the user opens them, not at
   handshake time).
3. Gateway responds:
   - Success: `{ "protocolVersion": 1, "type": "auth_ack", "connectionId": "...", "sessionId": "...", "serverTime": "2026-09-16T14:31:56.412Z" }`, followed by a `sync_required` event (§5) per conversation with a detected gap, if any.
   - Failure: connection closed with code `4000 AUTH_FAILED` (invalid/expired token) — client must refresh its access token via REST before reconnecting.

## 3. Heartbeat

- Server sends WebSocket protocol-level `ping` every 30s; client must respond with `pong` within
  10s or the connection is considered dead and closed (`4002 HEARTBEAT_TIMEOUT`).
- Application-level `presence.heartbeat` (client→server, §4.6) is separate from the transport
  ping/pong and serves the presence/last-seen model (Volume 1 `06-...md` §6), sent every 25s while
  the app is foregrounded.

## 4. Canonical Commands (Client → Server)

All commands share this envelope:
```json
{ "protocolVersion": 1, "type": "command", "commandId": "<uuid, client-generated>", "command": "<name>", "payload": { } }
```
`commandId` is used for the server's acknowledgement correlation (§4.0) and is a **transport-level**
idempotency aid distinct from `clientMessageId`/`Idempotency-Key` (which remain the durable
idempotency mechanisms — the realtime `commandId` only dedupes *within this one connection's
lifetime* and is not durably stored).

### 4.0 Acknowledgement Envelope (Common to All Commands)

```json
{ "protocolVersion": 1, "type": "ack", "commandId": "<echoed>", "status": "ok", "result": { } }
```
or
```json
{ "protocolVersion": 1, "type": "ack", "commandId": "<echoed>", "status": "error", "error": { "code": "MESSAGE_VALIDATION_FAILED", "message": "..." } }
```
using the same `error.code` namespace as the REST API (`15-...md` §3.1) for consistency.

### 4.1 `send_message`

Payload: identical shape to `POST /v1/conversations/{id}/messages` body (`15-...md`/`17-...md`
§1). **The realtime channel and the REST endpoint are two transports for the same underlying
`SendMessage` command** — both go through the same `core-api` Messaging module validation/
persistence path (the gateway forwards the command to `core-api` via an internal call, it does
not persist messages itself, reaffirming Volume 1 `06-...md` §1). Idempotent by
`clientMessageId` regardless of which transport is used — a client may submit over REST, not get
a response due to a dropped connection, then resubmit the identical `clientMessageId` over
WebSocket after reconnecting, and receive the same accepted message rather than a duplicate.

### 4.2 `acknowledge_delivery` / `acknowledge_read`

Payload: `{ "messageId": "...", "deviceId": "..." }`. Idempotent upsert into
`DeliveryReceipt`/`ReadReceipt` (`17-...md` §4.1). Authorization: requester must be the owner of
`deviceId` and a member of the message's conversation.

### 4.3 `typing_start` / `typing_stop`

Payload: `{ "conversationId": "..." }`. Ephemeral (Volume 1 `06-...md` §7). No durable
idempotency needed; repeated `typing_start` is a harmless TTL refresh.

### 4.4 `subscribe_conversation` / `unsubscribe_conversation`

Used only for the rare case of a conversation **outside** the initial membership snapshot the
client cares about live-updating right now beyond the default "subscribed to everything you're a
member of" behavior (Volume 1 `06-...md` §5) — e.g., explicitly narrowing bandwidth on a
constrained mobile connection by unsubscribing from background conversations while keeping the
active one live. This is a client-side bandwidth optimization, not a security boundary: even an
"unsubscribed" conversation's events are still authorized to reach this connection if the client
resubscribes; unsubscribing only stops delivery, it does not revoke access.

### 4.5 `sync`

Payload: `{ "conversationId": "...", "sinceSequence": 4810 }` — an explicit, on-demand resync
request (used when the client's own gap-detection logic, Volume 1 `06-...md` §4, decides to
resync over the WebSocket channel rather than falling back to REST — both are valid transports for
resync; the client picks based on which is more convenient/already-open at that moment). Response
via `ack` with `result: { messages: [...], hasMore: boolean }`, capped at the same page-size
limits as the REST endpoint (`15-...md` §4.1).

### 4.6 `presence_heartbeat`

Payload: `{}` (device/connection identity is already known from the connection context). No ack
required (fire-and-forget; the absence of a heartbeat is what matters, not confirmation of
receipt).

## 5. Canonical Events (Server → Client)

All events share the envelope defined in Volume 1 `06-...md` §4, reproduced and extended here:

```json
{
  "protocolVersion": 1,
  "type": "event",
  "eventId": "018f3d00-....",
  "eventType": "message.created",
  "eventVersion": 1,
  "eventTimestamp": "2026-09-16T14:31:56.412Z",
  "conversationId": "018f3a10-....",
  "conversationSequence": 4821,
  "entityId": "018f3b2a-....",
  "correlationId": "b3a1c2e0-....",
  "producer": "core-api",
  "payload": { }
}
```

| Event type | Recipient scope | Ordering requirement | Retry/duplicate handling |
|---|---|---|---|
| `message_created` | All current members of `conversationId` | Ordered (`conversationSequence`) | At-least-once; client dedups by `eventId` |
| `message_updated` (edit) | All current members | Ordered | Same |
| `message_deleted` | All current members | Ordered | Same |
| `message_delivered` | The sender only (to update their own "delivered" UI) | Not ordering-sensitive (idempotent state) | Same |
| `message_read` | The sender and, for multi-device sync, the reading user's other devices | Not ordering-sensitive | Same |
| `reaction_added` / `reaction_removed` | All current members | Ordered relative to other conversation events (shares `conversationSequence` space) | Same |
| `typing_started` / `typing_stopped` | All current members' active connections (not durable) | No ordering guarantee needed (ephemeral, TTL-based) | Delivered at-most-once, best-effort; a dropped typing event self-corrects via TTL expiry, never causing a "stuck" indicator for more than the TTL window |
| `presence_changed` | Contacts of the user (per privacy settings) | No ordering guarantee needed | Best-effort |
| `conversation_updated` (settings/metadata) | All current members | Ordered | Same |
| `membership_changed` (add/remove/role change) | All current members (including the removed member, as a final event, before their authz snapshot is invalidated) | Ordered | Same |
| `notification_received` | Not a realtime-gateway event — this is a **push notification**, delivered via APNs/FCM/Web Push, not the WebSocket channel; listed here only to explicitly clarify it is **not** part of this protocol's event set, avoiding confusion with `message_created` | N/A | N/A |
| `sync_required` | The requesting connection only, at handshake or on detected server-side gap | N/A (a control signal, not a domain event) | N/A |

### 5.1 `sync_required` (Control Event, Not a Domain Event)

```json
{
  "protocolVersion": 1,
  "type": "control",
  "control": "sync_required",
  "conversationId": "018f3a10-....",
  "lastKnownSequence": 4810,
  "reason": "gap_detected"
}
```
Sent when the gateway itself detects that a connecting/reconnecting client's declared
`lastKnownSequences` (handshake, §2) is behind current state by more than a small tolerance, or
when the gateway's own fan-out mechanism detects it missed publishing to a now-reconnected client
during a prior disconnect window. The client responds by issuing `sync` (§4.5) or a REST resync
call.

## 6. Disconnect and Error Codes

| Code | Meaning | Client action |
|---|---|---|
| `4000 AUTH_FAILED` | Invalid/expired token at handshake | Refresh token via REST, reconnect |
| `4001 AUTH_TIMEOUT` | No auth frame received in time | Reconnect and send auth frame promptly |
| `4002 HEARTBEAT_TIMEOUT` | Client failed to respond to ping | Reconnect with backoff |
| `4003 RATE_LIMITED` | Too many commands from this connection | Reconnect after `Retry-After`-equivalent backoff communicated in the close reason |
| `4004 SESSION_REVOKED` | The underlying session was revoked (logout elsewhere, security action) | Do not auto-reconnect; require re-authentication |
| `4005 PROTOCOL_VERSION_UNSUPPORTED` | Client's `protocolVersion` is no longer supported | Client must upgrade |
| `1000` (standard WS normal closure) | Clean shutdown (e.g., server deploy/restart) | Reconnect with backoff (per Volume 1 `06-...md` §9) |
| `1006` (abnormal closure) | Network-level drop | Reconnect with backoff |

## 7. Protocol Error Frame (Non-Fatal, Connection Stays Open)

For malformed frames that don't warrant a full disconnect (e.g., an unrecognized `command` value
from a newer/older client):
```json
{ "protocolVersion": 1, "type": "protocol_error", "code": "UNKNOWN_COMMAND", "message": "Command 'foo' is not recognized." }
```

## 8. Envelope Consistency Rule

Commands, acks, events, and control frames all share the same top-level `protocolVersion` and
`type` discriminator field, deliberately using **one envelope family** rather than incompatible
per-domain envelopes (e.g., messaging events and presence events share the same `event` envelope
shape, differing only in `eventType` and `payload`), per the master prompt's explicit requirement
to avoid unjustified envelope fragmentation.
