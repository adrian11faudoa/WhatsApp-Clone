# 12 — Architectural Decision Records

Each ADR follows: Context → Decision → Alternatives Considered → Rationale → Consequences →
Operational Implications.

---

## ADR-001: Modular Monolith Core with Independently Deployed Realtime and Worker Tiers

**Context**: The platform needs clear domain ownership and eventual large-scale capability, but
building 18 independent microservices from day one multiplies operational surface area before any
domain has demonstrated a distinct scaling or ownership need.

**Decision**: Business-domain modules (Identity, Profiles, Conversations, Messaging, etc.) live
inside one deployable `core-api` application, each as an isolated module with a public service
interface and its own database schema. Realtime (`realtime-gateway`) and background processing
(`workers`, `media-processor`) are separate deployment units from day one because their scaling
triggers (connection count, queue depth) fundamentally differ from request/CPU-bound API traffic.

**Alternatives Considered**: (a) Full microservices per domain — rejected, premature complexity.
(b) Single monolith including realtime and workers in the same process — rejected, would couple
connection-count scaling to CPU-bound API scaling and prevent independent crash isolation for
background jobs.

**Rationale**: Matches actual differing scaling/failure profiles while minimizing operational
surface area and preserving transactional integrity for business-domain flows.

**Consequences**: Business-domain modules currently scale together; extraction of an individual
module into its own service is possible later (module boundary + schema-per-domain already
enforce this) but requires a deliberate migration, not a config change.

**Operational Implications**: One CI/CD pipeline and one release cadence for `core-api`'s many
domains initially; `realtime-gateway` and `workers` have independent pipelines/cadences from the
start.

---

## ADR-002: PostgreSQL as Sole Durable System of Record for Messages

**Context**: Message data needs durability, transactional integrity, and rich query support
(pagination, filtering); several candidate stores (Postgres, a wide-column store, the event
broker itself) were considered.

**Decision**: PostgreSQL is the sole durable system of record for messages and all core
transactional entities. The event broker is a bounded-retention delivery mechanism, never a
permanent store. Redis never holds durable-only data for messages.

**Alternatives Considered**: (a) Wide-column store (e.g., Cassandra-style) for messages —
rejected for the initial architecture because it would sacrifice transactional guarantees needed
for the outbox pattern and idempotency constraints, for scale headroom not yet needed. (b) Broker
as system of record (event sourcing) — rejected, adds replay-based rebuild complexity and
conflicts with the requirement for straightforward, indexed, paginated conversation history
queries.

**Rationale**: Transactional integrity for message persistence + idempotency is a correctness
requirement more urgent than the scale ceiling of a single well-partitioned Postgres deployment,
which is high enough for the architecture's near/mid-term targets given the partitioning strategy
in `04-database-architecture.md`.

**Consequences**: Long-term extreme scale may eventually require a different storage engine for
message data; this architecture documents that as a future lever (`10-consistency-caching-
reliability.md` §5), not a current implementation.

**Operational Implications**: Standard Postgres operational practices (backup/restore,
replication, partitioning maintenance) become critical-path operational responsibilities.

---

## ADR-003: WebSocket as the Realtime Transport

**Context**: Realtime delivery could use WebSockets, Server-Sent Events (SSE), long polling, or a
third-party realtime platform.

**Decision**: Authenticated WebSocket connections via a dedicated `realtime-gateway`.

**Alternatives Considered**: (a) SSE — rejected as the primary transport because it's
unidirectional (client-to-server actions like typing indicators would still need a separate
channel) though it remains a viable fallback for restrictive network environments (not excluded
from later addition). (b) Long polling — rejected as the primary transport due to higher latency
and higher connection-churn overhead at scale. (c) Third-party realtime platform (e.g., a managed
pub/sub SaaS) — rejected to keep the event-envelope, authorization, and multi-device sync model
fully under this architecture's control rather than a vendor's opinionated protocol.

**Rationale**: WebSocket provides bidirectional, low-latency communication suited to typing
indicators, presence, and message fan-out in one connection, with mature client library support
across web/mobile.

**Consequences**: `realtime-gateway` must handle connection-count scaling and reconnect-storm
mitigation explicitly (see `06-realtime-architecture.md` §9-10).

**Operational Implications**: Requires sticky-session-aware load balancing and connection-count-
based autoscaling, distinct from typical stateless HTTP autoscaling.

---

## ADR-004: Kafka/Redpanda as the Domain Event Backbone with Transactional Outbox

**Context**: Domain events must reliably reach realtime fan-out, search indexing, and notification
consumers without being lost if the broker is temporarily unavailable, and without creating
dual-write inconsistency between the database and the broker.

**Decision**: Use a Kafka-compatible broker with the transactional outbox pattern
(`07-events-and-queues.md` §1) — every domain-state-changing transaction writes its event to an
`outbox` table in the same transaction, and a separate relay process publishes from there.

**Alternatives Considered**: (a) Direct dual-write (write DB, then publish to broker in the same
request) — rejected, classic dual-write inconsistency risk if the second write fails after the
first succeeds. (b) Change Data Capture (CDC) off the Postgres WAL — a valid alternative to a
manual outbox table; **not selected as the primary mechanism for this volume** because it adds
infrastructure dependency (a CDC connector) for a benefit (avoiding the relay-poll table) that
doesn't outweigh the simplicity of an explicit outbox table at current scale; documented as an
alternative worth revisiting if outbox-relay polling latency becomes a bottleneck.

**Rationale**: Transactional outbox provides at-least-once, ordered-per-aggregate delivery
without distributed transactions, at the cost of a small relay-poll latency, which is acceptable
given the target performance envelope.

**Consequences**: Every event-producing module must include an outbox write in its transaction;
this is a structural discipline enforced by module-level code review/shared transaction helper,
not automatic.

**Operational Implications**: Outbox relay lag and backlog depth become a first-class operational
metric (`11-observability.md` §6).

---

## ADR-005: BullMQ-Style Durable Queue for Background Jobs, Separate from the Domain Event Broker

**Context**: Some asynchronous work (notification delivery, media processing) needs job-level
features — retries, backoff, priority, dead-letter — that are naturally modeled as jobs, not
just event consumption.

**Decision**: Domain events flow through the broker (Kafka/Redpanda); job-shaped work
(notification delivery, media processing, indexing, cleanup) is enqueued into a Redis-backed
durable queue system (BullMQ or equivalent) consumed by `workers`, typically triggered by
consuming a domain event and translating it into one or more jobs.

**Alternatives Considered**: Using the broker directly as the job queue — rejected because
broker consumer groups don't naturally provide per-job retry/backoff/priority/dead-letter
semantics as cleanly as a purpose-built job queue library, and mixing job-retry semantics into
broker offset management complicates consumer-group correctness.

**Rationale**: Separates "did this domain event happen" (broker) from "has this unit of
asynchronous work been completed" (queue), which have different retry/idempotency shapes.

**Consequences**: Two async infrastructure components to operate (broker + queue) instead of one;
justified by the clarity gained.

**Operational Implications**: Both broker consumer lag and queue depth/dead-letter counts must be
monitored (`11-observability.md` §6).

---

## ADR-006: Redis Never Holds Durable-Only Data

**Context**: Redis is fast and convenient for many use cases, creating a temptation to store data
there without a durable backing source.

**Decision**: Every Redis-backed capability in this architecture either (a) is reconstructable
from PostgreSQL on cache miss/loss, or (b) is intentionally, explicitly ephemeral by design
(presence, typing indicators) with no expectation of durability.

**Alternatives Considered**: Using Redis persistence (RDB/AOF) to treat it as a secondary durable
store for some entities — rejected as unnecessary complexity; if data needs durability, it belongs
in Postgres.

**Rationale**: Prevents silent architectural drift toward Redis becoming an undocumented second
source of truth, which is explicitly disallowed by the project's data-ownership requirements.

**Consequences**: Every new Redis usage proposed by future implementation prompts must be
justified against this rule.

**Operational Implications**: Redis can be treated as a stateless-from-a-durability-perspective
component for infrastructure/backup planning purposes (with the caveat that a Redis outage does
have availability/latency impact even though it has no durability impact).

---

## ADR-007: Object Storage with Presigned URLs, No Client-Held Storage Credentials

**Context**: Media upload/download needs to be efficient (direct client-to-storage transfer) while
remaining authorized.

**Decision**: `core-api` never proxies media bytes through itself; it issues short-TTL, single-
object presigned URLs for both upload and download, always re-authorized per access.

**Alternatives Considered**: (a) Proxying all media bytes through `core-api` — rejected, wastes
API-tier bandwidth/CPU for large files and creates an unnecessary scaling coupling between API
request volume and media transfer volume. (b) Long-lived public URLs per object — rejected,
violates the authorization-at-every-access requirement for private media.

**Rationale**: Presigned URLs offload bulk transfer to the object storage/CDN layer while
preserving per-access authorization.

**Consequences**: Every media access requires an API round-trip to mint/re-mint a signed URL,
adding one request per access compared to a long-lived public link — an accepted latency/security
tradeoff.

**Operational Implications**: Bucket policies and presigned-URL TTL configuration become a
security-review-relevant infrastructure setting.

---

## ADR-008: Multi-Device Synchronization via Durable Postgres State + Sequence-Based Resync, Not CRDTs

**Context**: Multi-device sync could be built with CRDTs/operational-transform for conflict
resolution, or with a simpler durable-source-of-truth-plus-resync model.

**Decision**: Use server-authoritative Postgres state with per-conversation monotonic sequence
numbers and REST-based resync on gap detection (`06-realtime-architecture.md` §4, §8), with
last-write-wins for the rare genuine concurrent-edit case.

**Alternatives Considered**: CRDTs for message editing — rejected as unnecessary complexity for
this data shape; concurrent edits to the same message from two devices of the same user are rare
and last-write-wins produces an acceptable, easily-reasoned-about outcome; CRDTs would be
justified for offline-first collaborative editing of a single shared document, which is not this
product's shape (messages are append-mostly, edits are single-author).

**Rationale**: Simpler to implement, test, and reason about; matches the actual conflict
frequency and shape of this domain.

**Consequences**: Not suitable if the product later adds true collaborative multi-author editing
of a single message — out of current scope.

**Operational Implications**: None beyond standard Postgres operations; no CRDT-merge
infrastructure needed.

---

## ADR-009: No End-to-End Encryption in This Architecture Volume

**Context**: WhatsApp-style products are often associated with E2EE; the project master prompt
lists it as a capability the target product "may support," not a requirement of this volume.

**Decision**: This architecture volume does not implement E2EE. Message bodies are readable
server-side (necessary for server-side search, moderation hooks, and the multi-device sync model
as designed).

**Alternatives Considered**: Building E2EE from this volume — rejected for this volume's scope;
E2EE fundamentally changes search (would require client-side/encrypted search or its removal),
moderation (server cannot scan plaintext), and multi-device sync (requires device key
distribution/management), and deserves its own dedicated architecture volume rather than being
bolted onto this one.

**Rationale**: Avoids the project's prohibited practice of claiming a cryptographic property the
architecture doesn't actually provide.

**Consequences**: If E2EE becomes a requirement, expect a significant architectural revision, not
an incremental patch.

**Operational Implications**: None for this volume; flagged for future architecture work.

---

## ADR-010: Search Index Is Never an Authorization Boundary

**Context**: Search results could theoretically be filtered at index time (bake authorization into
the indexed document) or at query time (re-check authorization against current state on every
query).

**Decision**: Query-time authorization filtering, re-checked against current membership state on
every search request (`08-media-search-notifications.md` §2.4), regardless of what the index
itself contains or how stale it might be.

**Alternatives Considered**: Index-time-only filtering (bake membership into the document at
index time) — rejected as the sole mechanism, because a membership change (e.g., removal from a
group) would not immediately revoke search visibility if the index update is delayed, creating a
real authorization gap, however brief.

**Rationale**: Correctness for authorization must never depend on index freshness.

**Consequences**: Slightly more query-time work (a membership-set lookup before every search
query) — an accepted cost for closing the authorization gap.

**Operational Implications**: Search query latency includes one authorization-lookup round-trip
(cached, per §`10-consistency-caching-reliability.md` §2), not a raw index-only query.
