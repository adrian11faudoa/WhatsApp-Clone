# 28 — Implementation Handoff Contract, Cross-Part Contract Matrix, Validation

## 1. Implementation Handoff Contract

This section is the durable, standalone answer to "what can a later implementation prompt assume,
change, or must never touch." It does not depend on any other conversation existing — it is
self-contained, referencing only this document set (Volumes 1 and 2, files `00-` through `28-`).

### 1.1 What Is Authoritative (Must Not Be Reinvented)

- Domain boundaries and data ownership (Volume 1 `02-...md`).
- Canonical entity model, identifiers, enums (Volume 1 `03-...md`, this volume `14-...md`).
- The message lifecycle state machine and its retry/duplicate rules (Volume 1 `03-...md` §5,
  this volume `17-...md`).
- The API conventions, error envelope, pagination, idempotency mechanisms (Volume 1
  `05-...md`, this volume `15-...md`).
- The realtime envelope, commands, events, and disconnect codes (Volume 1 `06-...md`, this volume
  `18-...md`).
- The event envelope, naming, partitioning, and the transactional outbox pattern (Volume 1
  `07-...md`, this volume `22-...md`).
- The authentication/session/authorization model, including token lifetimes' *shape* (short-lived
  access + rotating refresh) even if exact durations are tunable (`16-...md`).
- The media lifecycle states and access-control mechanism (Volume 1 `08-...md`, this volume
  `20-...md`).
- Data ownership matrix — no entity gets a second authoritative store (Volume 1 `02-...md` §3).
- The ADRs in Volume 1 `12-adrs.md` — each represents a considered, binding architectural choice,
  not a suggestion.
- The explicit non-goal: **no end-to-end encryption** (ADR-009) — implementation prompts must not
  claim or partially build E2EE without a dedicated architecture revision first.

### 1.2 What May Be Changed (Implementation-Local Decisions)

- Exact numeric defaults called out throughout this document set as "architectural default" (edit
  window seconds, token TTLs, rate-limit thresholds, media size limits, cache TTLs) — these are
  starting points, tunable via the configuration mechanism in `25-...md`, not fixed contracts.
- Choice of specific libraries within a mandated category (e.g., which adaptive hash function
  exactly, which specific OpenTelemetry exporter, which BullMQ-equivalent library) as long as the
  category-level requirement (adaptive hash, OTel-compatible, durable-queue-with-retry-semantics)
  is met.
- The reaction per-user-per-message cardinality decision flagged as open in `17-...md` §6 (one
  reaction per user vs. multiple distinct emoji per user) — must be decided explicitly and
  documented as an ADR at implementation time, but the decision itself is implementation-local.
- The message-edit-history retention decision (`17-...md` §5.1) — whether to build
  `MessageEditHistory` at all is a product decision deferred to implementation.
- Specific secret-manager vendor, specific CI platform, specific Kubernetes/Terraform module
  structure (`25-...md`, `26-...md`).
- Exact malware-scanning mechanism/vendor for media validation (`20-...md` §7).
- Exact account-deletion redaction policy for authored messages (`23-...md` §6.2 step 5) —
  flagged as requiring a product-level ADR before implementation, not silently defaulted.

### 1.3 What Must Not Be Changed Without a New Architecture Volume

- The modular-monolith-plus-independent-realtime/worker-tiers deployment shape (ADR-001) — a
  future decision to fully decompose into microservices, or conversely to merge tiers back
  together, is architecturally significant enough to require a new ADR and likely a new
  architecture volume, not a quiet implementation-prompt choice.
- PostgreSQL as the sole durable system of record for messages (ADR-002).
- The transactional outbox pattern as the event-reliability mechanism (ADR-004) — switching to
  direct dual-write or a CDC-based approach is a reliability-model change requiring explicit
  re-architecture.
- The "search/cache/event-stream is never an authorization boundary" rule (ADR-010,
  `02-...md` §3's closing rule) — this is a security invariant, not a performance optimization
  that can be relaxed for convenience.
- The identifier system per entity (`14-...md` §1) — introducing a second, incompatible ID system
  for an already-identified entity is explicitly disallowed platform-wide.
- The cryptographic honesty statement (`09-...md` §5.1, `24-...md` §5) — no implementation prompt
  may claim end-to-end encryption without a dedicated architectural extension.

### 1.4 Mandatory Contracts for Any Independently Generated Implementation Prompt

Any backend, web, mobile, infrastructure, or QA implementation prompt executed against this
document set must:

1. Use the exact identifier formats, enum values, and naming conventions in `14-...md` and
   Volume 1 `13-...md`.
2. Implement the standard error envelope and pagination contract exactly as specified in
   `15-...md`.
3. Implement idempotency exactly as specified (`clientMessageId` for messages,
   `Idempotency-Key` generically) — not an alternative scheme.
4. Implement the realtime envelope and protocol codes exactly as specified in `18-...md`.
5. Implement the event envelope and the shared schema package requirement (`22-...md` §3) — this
   package is itself a required deliverable of the first backend implementation prompt that
   touches event production/consumption, not an optional nicety.
6. Respect the domain module boundaries (no cross-schema joins, `02-...md` §4) at the code level,
   not just at the database-grant level.
7. Implement the authorization re-verification-at-every-boundary rule (`16-...md` §2.2) — no
   boundary is permitted to trust another boundary's prior authorization decision without its own
   check.
8. Never expose a raw/unsigned object-storage URL to a client (`20-...md` §6.1).
9. Never log secrets or message body content at default log levels (Volume 1 `11-...md` §5).
10. Follow the migration expand/contract discipline for any schema or contract change
    (`27-...md` §3).

### 1.5 Integration Behavior That Must Be Preserved Across Independently Generated Parts

- A web client and a mobile client consuming the same `core-api`/`realtime-gateway` contracts
  must produce **identical** server-observed behavior for the same user action — no
  client-specific backend behavior (Volume 1 `05-...md` §11, reaffirmed).
- A backend implementation prompt must not invent a new authorization rule not derivable from
  `16-...md`'s permission matrix and ownership-check philosophy.
- An infrastructure implementation prompt must realize the trust-zone/network-boundary model in
  `26-...md` §1.1 exactly — no application-tier instance may be reachable from the public internet
  directly, and no data-tier component may be reachable from the edge zone.
- A QA implementation prompt must be able to write contract tests directly against this document
  set's fixed schemas (error envelope, event envelope, job envelope, realtime protocol) without
  needing to reverse-engineer them from an implementation.

## 2. Contract Artifact Directory (Portable Structure)

```text
docs/
  architecture/
    00-architecture-overview.md
    01-system-context-and-boundaries.md
    02-domain-boundaries-and-ownership.md
    03-domain-model.md
    04-database-architecture.md
    10-consistency-caching-reliability.md
    11-observability.md
    26-deployment-topology-and-regions.md
  contracts/
    api/
      05-api-architecture.md            (conventions overview)
      15-api-contract-standard.md       (errors, pagination, idempotency — binding)
      16-auth-session-authorization-contract.md
    realtime/
      06-realtime-architecture.md       (design rationale)
      18-realtime-protocol.md           (binding protocol: commands/events/envelope)
      19-synchronization-and-offline.md
    messages/
      17-message-contract.md
    events/
      07-events-and-queues.md           (design rationale)
      22-event-and-queue-contract.md    (binding envelope/versioning/partitioning/queue contract)
    media/
      08-media-search-notifications.md  (design rationale, §1)
      20-media-contract.md              (binding lifecycle + security)
    search-and-notifications/
      08-media-search-notifications.md  (design rationale, §2-3)
      21-notification-and-search-contract.md (binding)
  data/
    04-database-architecture.md
    23-database-high-volume-and-retention.md
  security/
    09-auth-security-privacy.md
    24-audit-administration-abuse-threat.md
  operations/
    25-configuration-and-secrets.md
    27-failure-recovery-backup-migration.md
  decisions/
    12-adrs.md
  glossary/
    13-glossary-and-cross-part-contracts.md
    14-identifier-and-time-model.md
  handoff/
    28-implementation-handoff-and-contract-matrix.md  (this file)
```

This mapping is a recommended repository layout for later implementation prompts to adopt; the
actual files delivered in this volume use a flat, numbered filename scheme (`00-` through `28-`)
for portability outside any specific repository structure. An implementation prompt with an actual
repository should feel free to reorganize into the nested structure above without changing any
content.

## 3. Cross-Part Contract Matrix

| Producer | Consumer | Contract | Failure Behavior | Security Boundary |
|---|---|---|---|---|
| Web Client | `core-api` | REST API (`15-...md`) | Retry per operation's idempotency mechanism (`15-...md` §5); `503`/`429` are retryable, `4xx` others are not | Bearer JWT, per-request server-side authorization (`16-...md` §2.2) |
| Mobile Client | `core-api` | REST API (`15-...md`) | Same, plus offline-queue-and-replay policy (`19-...md` §2) | Same |
| Admin Console | `core-api` (`/v1/admin/*`) | REST API, elevated role required | Same retry rules; failures are additionally audited regardless of outcome (`24-...md` §1.1) | Bearer JWT + `platform_role` claim, re-verified server-side (`24-...md` §2.1) |
| Web/Mobile Client | `realtime-gateway` | WebSocket protocol (`18-...md`) | Reconnect with backoff+jitter, resync via `sync`/REST (`19-...md` §1.3) | Token verified at handshake, per-event authorization (`06-...md` §3, `18-...md` §2) |
| `core-api` | PostgreSQL | Transactional persistence, per-module schema (`04-...md` §1, `06-...md`) | Fail-fast `503` on unavailability; automatic failover (`27-...md` §1) | Private network, least-privilege per-module DB role |
| `core-api`/`workers`/`realtime-gateway` | Redis | Ephemeral state/cache (`10-...md` §2) | Degrade/fall back to Postgres or "unavailable" state, never wrong data (`27-...md` §1) | Private network, AUTH credential |
| `core-api` | Event Broker | Versioned domain events via transactional outbox (`22-...md` §1-4) | Outbox retry with backoff; durable persistence unaffected by broker outage (`27-...md` §1) | Private network, SASL credential, topic ACLs |
| `core-api`/Domain modules | Queue (BullMQ-equivalent) | Job contract (`22-...md` §5) | Retry per category policy, DLQ on exhaustion (`22-...md` §6) | Private network, Redis-backed, least-privilege |
| `media-processor` | Object Storage | Media lifecycle contract (`20-...md`) | Retry on transient failure; reconciliation job catches orphaned rows/objects (`27-...md` §2.5) | IAM least-privilege for the processor; clients only ever get signed URLs |
| `workers` (search-indexer) | OpenSearch | Indexed document contract (`21-...md` §2) | Retry, DLQ, full-rebuild capability from Postgres (`21-...md` §2.4) | Private network; query-time authorization is enforced by `core-api`, not the search cluster itself |
| `workers` (notifier) | Push Provider (APNs/FCM/Web Push) | Provider adapter over the canonical notification intent (`21-...md` §1) | Retry per provider-specific backoff, invalid-token cleanup, DLQ (`21-...md` §1.3, `27-...md` §1) | Provider credential boundary; provider is treated as semi-trusted external |
| Any producer | Any consumer of a domain event | Shared, versioned event-schema package (`22-...md` §3) | Schema-validation failure at publish time prevents malformed events from ever reaching the broker | Schema is the contract; no consumer trusts an unvalidated payload |
| `core-api` | Clients (Web/Mobile/Admin) | Standard error envelope (`15-...md` §3) | Every error is classified `retryable: true/false`, guiding client retry behavior uniformly | No internal detail leakage (`15-...md` §3) |

## 4. Validation Performed (Volume 2)

1. ✅ Every critical API (auth, messages, media, conversations, admin) has an explicit owning
   module per Volume 1 `02-...md`, cross-checked against this volume's contract files.
2. ✅ Every critical entity retains a single authoritative owner (`14-...md` §1.1's "one ID system
   per entity" rule, cross-checked against Volume 1's data ownership matrix — no new entity
   introduced in Volume 2 creates a second store).
3. ✅ Every critical event in the catalog (Volume 1 `07-...md` §3, extended by `22-...md` §4's
   partition table) has a stated producer and at least one consumer.
4. ✅ Every queue category (`22-...md` §5, Volume 1 `07-...md` §6) has a stated producer and
   worker.
5. ✅ Every asynchronous operation (outbox relay, queue jobs, media processing, notification
   delivery, search indexing) has explicit failure handling (`27-...md` §1, `22-...md` §5.1-6).
6. ✅ Realtime state (presence, typing, connection registry) is explicitly Redis-only/ephemeral
   and distinguished from durable state at every point it's discussed (`06-...md` §1/§6-7,
   `18-...md`).
7. ✅ Multi-device synchronization has a defined checkpoint model (`conversationSequence`,
   `19-...md` §1.1) and recovery path (§1.3-1.5).
8. ✅ Offline operations cannot bypass authorization — every offline-queued operation is
   re-validated server-side on replay; nothing is accepted purely on the strength of local
   optimistic state (`19-...md` §2.1-2.2).
9. ✅ Deletion propagates to derived systems: search (`21-...md` §2.2), notifications (`17-...md`
   §5.2), media (`20-...md` §6.3), cache (`10-...md` §2's event-driven invalidation).
10. ✅ Media access is independently authorized at every access, not cached from a prior check
    (`20-...md` §6).
11. ✅ Search is permission-aware at query time, immune to index staleness for authorization
    purposes (`21-...md` §2.1/2.3, ADR-010).
12. ✅ Notification payloads respect privacy (`21-...md` §1.1's `previewMode`, Volume 1 `08-...md`
    §3.2).
13. ✅ Privileged operations are audited, including denied attempts (`24-...md` §1.1).
14. ✅ Secrets are never source-controlled configuration; the configuration/secret split is
    explicit and enforced by category (`25-...md` §1/§4).
15. ✅ Deployment topology reflects actual service dependencies and trust zones (`26-...md` §1).
16. ✅ Regional architecture has an explicit (current: none-implemented, honestly stated) failure
    model and a staged future path (`26-...md` §4).
17. ✅ Backup and restore ordering is defined and validation criteria specified (`27-...md` §2.5-6).
18. ✅ Migration strategy supports rolling deployments via expand/contract discipline for schema,
    API, event, and realtime-protocol changes alike (`27-...md` §3).
19. ✅ Observability can correlate requests, events, and jobs via `correlationId`/`traceContext`
    propagated consistently across every contract in this volume (`14-...md` §1, `18-...md`,
    `22-...md` §1/§5).
20. ✅ The complete architecture remains coherent under partial failure — every failure-mode table
    in this document set (`27-...md` §1, Volume 1 `10-...md` §3) preserves the core invariant that
    durable message persistence is never compromised by any secondary subsystem's outage.

No contradiction was found between this volume and Volume 1's domain ownership, message lifecycle,
authentication model, authorization model, realtime design, event architecture, data model,
reliability model, or deployment model — this volume was written as a direct, section-by-section
deepening of Volume 1's structure, reusing its terminology and entity model without alteration.

## 5. Completion Report

**Contract artifacts created** (files `14-` through `28-`, 15 files, added to
`/mnt/user-data/outputs/architecture/`):

- Canonical identifier and time/clock model (`14-...md`)
- Binding API contract standard: errors, pagination, idempotency (`15-...md`)
- Authentication/session contract, authorization contract, group authorization model
  (`16-...md`)
- Deepened message contract: type, ordering, receipts, edit/delete, reactions (`17-...md`)
- Binding realtime protocol: handshake, commands, events, envelope, error/disconnect codes
  (`18-...md`)
- Formal synchronization protocol and offline operation model (`19-...md`)
- Media contract: lifecycle states and security controls (`20-...md`)
- Notification contract and search contract, deepened (`21-...md`)
- Event schema standard, versioning, partitioning, and queue contract (`22-...md`)
- Database high-volume strategy and data retention/deletion contract (`23-...md`)
- Audit architecture, administration architecture, abuse prevention, deepened threat model,
  cryptographic boundaries (`24-...md`)
- Configuration architecture and secret management model (`25-...md`)
- Deployment topology, environment model, regional architecture, capacity model, SLO-style
  objectives (`26-...md`)
- Failure/recovery contracts, backup/restore strategy, migration strategy (`27-...md`)
- Implementation handoff contract, cross-part contract matrix, validation (`28-...md`, this file)

**Diagrams created**: 1 media-lifecycle state diagram, 1 deployment-topology flowchart (this
volume); all consistent with and additive to Volume 1's diagrams.

**ADRs**: no new ADRs added in this volume — all decisions here are deepenings/specifications of
choices already recorded in Volume 1's `12-adrs.md`; where an open implementation-local decision
was identified (reaction cardinality, edit-history retention, account-deletion redaction policy),
it is flagged in §1.2 above as requiring its own ADR **at implementation time**, not resolved here.

**Unresolved issues / assumptions remaining implementation-local** (restated from §1.2 for
visibility): reaction per-user cardinality choice; message edit-history retention (build or not);
account-deletion message-redaction policy; exact numeric defaults for all rate limits, TTLs, and
size limits; specific vendor selections (secret manager, CI platform, malware scanner, IaC module
structure).

No backend, frontend, mobile, infrastructure, or QA code was implemented in this volume. This
document set (Volumes 1 and 2, 29 files total) is architecture and binding contracts only, ready
to serve as the complete foundation for independent backend, web, mobile, infrastructure, and QA
implementation prompts.
