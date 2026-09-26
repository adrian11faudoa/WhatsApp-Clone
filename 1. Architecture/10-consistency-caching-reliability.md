# 10 — Consistency Model, Cache Architecture, Failure Model, Scalability, Availability

## 1. Consistency Classification

| Operation/state | Classification | Rationale |
|---|---|---|
| Account creation/credential changes | Strong / transactional | Security-critical |
| Session issuance/revocation | Strong / transactional | Security-critical |
| Group membership changes | Strong / transactional | Root of message-access authorization |
| Message persistence | Strong / transactional | Message existence must not be ambiguous |
| Message delivery state (fan-out to recipients) | Eventual (at-least-once) | Realtime transport is inherently best-effort-with-retry, not transactional |
| Read state (ReadReceipt) | Strong write / eventual propagation to other members | The writing device's own record is transactional; other members observing it is via eventual fan-out |
| Reactions | Strong / transactional | Low volume, simple correctness expectation |
| Presence | Best-effort ephemeral | No durability requirement; staleness is expected and acceptable |
| Typing indicators | Best-effort ephemeral | Same as presence |
| Notifications | Eventual, best-effort | Delivery depends on external providers, inherently non-guaranteed |
| Search indexes | Eventual, bounded staleness (p99 < 5s target) | Derived read model, never authorization-relevant beyond query-time re-filtering |
| Analytics | Eventual, best-effort | No correctness dependency elsewhere in the system |

**Rule**: eventual consistency is never used where it would create an authorization or
financial-correctness gap. Every place eventual consistency is used above, the architecture
provides either a query-time re-check against authoritative state (search, media access) or a
guarantee that staleness only affects a non-authorization concern (presence, typing, notification
timing).

## 2. Cache Architecture (Redis)

| Cache | Key pattern | Value | TTL | Write strategy | Invalidation | Failure behavior |
|---|---|---|---|---|---|---|
| Session lookup | `session:{sessionId}` | Minimal session validity flag | Aligned to access-token lifetime (15 min) | Write-through on session issuance | Explicit delete on revocation + natural TTL expiry | Miss → fall back to DB read; never fail the request |
| Conversation membership snapshot (used by realtime-gateway) | `authz:membership:{userId}` | Set of conversationId + role | 60s | Populated on first miss from `core-api` | Explicit invalidation via pub/sub on `group.member_*` events | Miss → synchronous `core-api` call; Redis outage → gateway calls `core-api` for every authz check (higher latency, not incorrect) |
| Block-check cache | `authz:block:{userIdPair}` | boolean | 30s | Populated on first miss | Explicit invalidation on `contact.blocked/unblocked` | Miss → DB read |
| Conversation list / unread counts | `conv:list:{userId}` | Denormalized list payload | 30s soft TTL + event-driven refresh | Updated incrementally on `message.created`/`message.read` | Event-driven; periodic reconciliation job corrects drift (see §4) | Miss → rebuild from `conversation_list_view` Postgres table |
| Presence | `presence:user:{userId}` | Per-device heartbeat map | Per-device TTL (heartbeat interval × 2) | Write on heartbeat/connect/disconnect | Self-expiring | Redis outage → presence unavailable (never wrong), see `06-realtime-architecture.md` §6 |
| Rate limit counters | `ratelimit:{scope}:{key}` | Token bucket state | Window-aligned (e.g., 60s) | Atomic INCR/EXPIRE | Self-expiring | Redis outage → fail-open or fail-closed is a deployment-configurable policy; default recommendation is fail-closed for auth endpoints (safer) and fail-open with a hard-coded fallback cap for general read endpoints (availability-favoring) — this split must be made explicit in the implementation prompt |
| Hot profile cache | `profile:{userId}` | Profile display fields | 5 min | Populated on read-miss | Event-driven invalidation on `profile.updated` | Miss → DB read |

**Rule**: every cache entry above is reconstructable from Postgres (or, for presence, is
intentionally non-durable by design) — no cache is a silent alternate source of truth.

## 3. Failure Model

| Failure | Immediate behavior | User-visible impact | Retry/fallback | Recovery |
|---|---|---|---|---|
| PostgreSQL primary unavailable | `core-api` write/read requests depending on the primary fail fast with `503` | Message send/read, auth, membership changes unavailable | Health-check-triggered failover to standby (infrastructure-managed); `core-api` retries connection with backoff | Automatic failover promotes standby; brief write unavailability during promotion |
| PostgreSQL read replica lagging/unavailable | Reads routed to replica fall back to primary (with a circuit breaker to avoid overloading primary) | Slightly higher latency, no data loss | Circuit breaker + fallback routing | Replica rejoins automatically once healthy |
| Redis unavailable | All cache reads miss; all cache writes are best-effort no-ops (never block the primary operation) | Higher latency (extra DB reads), presence/typing degrade to unavailable, rate limiting falls back to its configured fail policy | Application-level circuit breaker around Redis calls with a short timeout | Reconnect automatically; caches repopulate naturally on next access |
| Event broker unavailable | Outbox rows accumulate unpublished; `core-api` writes are unaffected (outbox write is local to the Postgres transaction) | Realtime fan-out, search indexing, notifications delayed; message persistence unaffected | Outbox relay retries with backoff | Backlog drains once broker recovers; no data loss |
| Queue system unavailable | Job producers (event consumers publishing into a queue) buffer/retry | Async side effects (notifications, indexing, media processing) delayed | Bounded retry with backoff | Backlog drains on recovery |
| Object storage unavailable | Upload/download requests fail; message send for text still succeeds, media messages show upload-pending/failed state | Media features degraded; text messaging unaffected | Client-side retry with backoff; presigned URL re-issuance on retry | Recovers with provider; no data loss for already-stored objects |
| Search unavailable | Search queries return a clear "search temporarily unavailable" error, not stale/wrong results | Search feature unavailable | Indexing jobs queue and retry | Backlog drains; full rebuild available if needed |
| Notification provider unavailable | Notification jobs retry per §`07-events-and-queues.md` §6, eventually dead-letter | Delayed/missed push notifications; in-app state unaffected | Bounded retry | Provider recovery drains queue |
| `realtime-gateway` instance failure | Affected connections drop | Brief realtime gap for affected users | Client reconnect with backoff + jitter, missed-event resync (`06-realtime-architecture.md` §8) | New connections route to healthy instances via load balancer |
| `core-api` instance failure | In-flight requests to that instance fail | Client-visible error/retry for in-flight requests only | Load balancer health checks remove the instance; client retries | Auto-scaling/orchestrator replaces the instance |
| Worker crash mid-job | Job not acknowledged/committed | None if job is still queued/retryable | Queue redelivers per retry policy; idempotent handlers make redelivery safe | Normal queue recovery |
| Duplicated request (client retry) | Idempotency key / `clientMessageId` absorbs it | None — same response returned | N/A | N/A |
| Duplicated event (at-least-once broker) | Consumer `eventId` dedup absorbs it | None | N/A | N/A |
| Out-of-order event | Client sequence-gap detection buffers/resyncs (`06-realtime-architecture.md` §4) | Brief reordering, self-corrected | Client-side resync via REST | N/A |
| Network partition (app tier ↔ data tier) | Requests depending on the unreachable store fail fast (`503`), no silent partial writes (transactions ensure all-or-nothing) | Feature-specific unavailability, never silent corruption | Standard connection retry with backoff | Resolves when partition heals |
| Client reconnect storm (e.g., after a regional blip) | Gateway connection-count limits + exponential backoff with jitter on the client prevent thundering herd | Slightly staggered reconnection | N/A | Self-resolving within the backoff window |
| Regional outage | Out of scope for single-region initial architecture (see §5) — full regional failover is a documented future capability, not implemented in this volume | Full platform unavailability in single-region deployment | N/A at this volume's scope | Documented as future work |

## 4. Reconciliation

- Denormalized read models (`conversation_list_view`, Redis unread counters) are corrected by a
  periodic reconciliation job (`workers`, low priority, see `07-events-and-queues.md` §6) that
  recomputes them from the authoritative Postgres tables (`message`, `read_receipt`) and corrects
  any drift caused by missed/dropped events, without requiring the event-driven path to be
  perfect.

## 5. Scalability Model

| Dimension | Strategy | Trigger |
|---|---|---|
| HTTP request volume | Horizontal scaling of stateless `core-api` instances behind a load balancer | CPU/request-rate thresholds |
| WebSocket connection volume | Horizontal scaling of `realtime-gateway` instances; connection count is the scaling metric, not CPU | Concurrent connection count thresholds |
| Message write volume | Postgres vertical scaling initially; **conversation-based partitioning is the identified future lever** if a single primary's write throughput becomes the bottleneck (e.g., partition the `message` table by `conversation_id` hash in addition to the time-range partitioning already described in `04-database-architecture.md` §9) | Sustained write latency/throughput degradation |
| Message read volume | Read replicas (already part of initial topology, `04-database-architecture.md` §10); further scaled by adding replicas | Replica read latency/saturation |
| Presence/typing update volume | Redis horizontal scaling (cluster mode) if a single Redis instance's ops/sec becomes limiting | Redis ops/sec or memory thresholds |
| Event fan-out | Broker partition count scaled to consumer parallelism (`realtime-gateway`/`workers` instance count) | Consumer lag |
| Worker throughput | Horizontal scaling of `workers`/`media-processor` pools, independently per queue | Queue depth / age of oldest unprocessed job |
| Media processing | Independent scaling of `media-processor` pool, GPU/CPU-optimized instance types as needed | Queue depth specific to `media-processing` |
| Search | Shard count scaled with index size; replica shards scaled with query volume | Index size / query latency |
| Database reads at global scale | **Regional read replicas** — identified as a future scalability lever, not implemented in this volume; requires an explicit consistency-model update (bounded staleness for cross-region reads) before adoption | Cross-region read latency becoming a demonstrated problem |

### 5.1 Identified Hotspots

- The `message` table is the dominant write path; mitigations (time partitioning now-provisioned,
  conversation-hash partitioning identified as future work, keyset pagination mandatory) are
  already reflected in `04-database-architecture.md`.
- Extremely large groups (e.g., broadcast-scale channels) create a fan-out amplification problem
  at both the realtime layer (one message → thousands of WebSocket pushes) and the notification
  layer (thousands of push sends). This architecture's event-driven fan-out from a single durable
  `message.created` event naturally batches this work in `workers`/`realtime-gateway` rather than
  in the synchronous `SendMessage` request path, keeping send latency independent of recipient
  count — but very large groups (tens of thousands of members) are flagged as requiring dedicated
  fan-out optimization (e.g., fan-out-on-read for huge groups instead of fan-out-on-write) as a
  future architectural addition, not solved in this volume.

## 6. Availability Model

- **Target capability of this architecture** (not a claimed SLA): each stateless application
  tier (`core-api`, `realtime-gateway`, `workers`) runs multiple instances across at least two
  availability zones; PostgreSQL and Redis use managed multi-AZ HA configurations; the broker and
  search cluster use their standard multi-node replicated topologies.
- **Graceful degradation** is preferred over hard failure wherever a subsystem is non-essential to
  core messaging (presence, typing, search, notifications, media processing) — see §3's
  per-failure behavior, which consistently keeps text message send/receive functional even when
  secondary subsystems are down.
- **What this volume does not provide**: a formally committed availability percentage (e.g.,
  "99.95% uptime") — that is a business/SLA decision requiring infrastructure implementation and
  monitoring history to substantiate, not an architectural claim.
- **Regional failover** (multi-region active/active or active/passive) is explicitly **not**
  part of this volume's implemented scope; the architecture is structured (stateless app tiers,
  event-driven decoupling, no cross-service synchronous chains beyond what's documented) to make
  it addable later without a redesign, but it is not designed in detail here.
