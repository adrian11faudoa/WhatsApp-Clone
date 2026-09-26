# 27 — Failure and Recovery Contracts, Backup/Restore, Migration Strategy

## 1. Failure and Recovery Contract (Per Dependency, Fixed)

For every critical infrastructure dependency, the following is fixed and binding — deepening
Volume 1 `10-consistency-caching-reliability.md` §3 with explicit timeout/retry/circuit-breaker
values as architectural defaults (implementation-tunable, but must exist).

| Dependency | Timeout | Retry policy | Circuit breaker | Degraded behavior | Alerting | Recovery |
|---|---|---|---|---|---|---|
| PostgreSQL (primary) | Connection: 5s; query: statement-specific (short for OLTP reads/writes, e.g., 2-5s; longer for admin/reporting queries against replicas) | Connection retry with backoff (up to a bounded number of attempts before failing the request) | Yes — after N consecutive failures, `core-api` briefly stops attempting new primary connections and fails fast with `503 DEPENDENCY_UNAVAILABLE, retryable: true`, retrying the breaker's half-open probe on an interval | All primary-dependent writes/reads fail fast; no silent partial writes (transactions are all-or-nothing) | Connection-failure-rate alert, replication-lag alert | Automatic failover promotes standby (managed-provider capability); breaker closes once connections succeed again |
| PostgreSQL (read replica) | Same as primary for query timeout | Retry once against replica, then fall back to primary | Yes — replica-specific breaker; tripping it routes reads to primary instead of failing the request | Higher latency (primary absorbs replica's read load temporarily), no read failure | Replica-lag/connection-failure alert | Replica rejoins automatically; breaker closes |
| Redis | Connection: 1-2s (fast — Redis calls are always on a latency-sensitive path with a DB fallback) | One retry, then treat as unavailable for this request | Yes — trips quickly given the tight timeout, avoiding cascading latency into `core-api` request handling | Cache miss on every read (falls through to Postgres); writes become no-ops; presence/typing unavailable; rate limiting falls back to its configured fail-open/fail-closed policy (`10-...md` §2) | Redis connection-failure-rate and memory-usage alerts | Reconnect automatically; caches repopulate naturally |
| Event broker | Produce: 5s; consume: no hard timeout (long-poll is normal) | Outbox relay: bounded exponential backoff, indefinite retry (never gives up — the outbox row simply stays unpublished) | Yes, on the produce side — after repeated publish failures, the relay backs off more aggressively (avoiding a tight retry loop hammering a struggling broker) | Realtime fan-out, search indexing, notifications delayed; message persistence unaffected | Outbox-backlog-depth alert, broker-cluster-health alert | Backlog drains once broker recovers |
| Queue system (BullMQ/Redis-backed) | Enqueue: 2-3s | Bounded retry on enqueue failure (rare, since it shares Redis's fast-timeout profile above) | Shares Redis's breaker | Async side effects delayed | Queue-depth/age alerts | Backlog drains on recovery |
| Object storage | Presigned-URL issuance (IAM call): 3-5s; client-direct upload/download: provider-managed, not `core-api`'s concern | Bounded retry on issuance failure | Yes, on the issuance path | Upload/download features degraded; text messaging unaffected | Storage-API error-rate alert | Recovers with provider; no data loss for already-stored objects |
| Search cluster | Query: 2-3s | One retry, then fail | Yes | `503 DEPENDENCY_UNAVAILABLE` for search endpoints specifically (never a silent empty result — `21-...md` §2.5); indexing jobs queue and retry independently | Search-cluster-health/query-latency alerts | Backlog drains; full rebuild available if needed (`21-...md` §2.4) |
| Push provider (APNs/FCM) | Provider-specific (typically 5-10s) | Bounded retry per Volume 1 `07-...md` §6 (up to 8 attempts), then dead-letter | Yes, per-provider — a provider-wide outage trips the breaker so `workers` stops burning retry budget against a fully-down provider, resuming probes on an interval | Delayed/missed push notifications; in-app state unaffected | Provider-error-rate alert (segmented by provider so an APNs outage doesn't mask a healthy FCM path or vice versa) | Provider recovery drains queue |
| `realtime-gateway` instance restart | N/A (client-side reconnect timeout governs, `18-...md` §6) | Client reconnect with backoff+jitter | N/A (client-side concern) | Brief realtime gap for affected connections | Instance-health/restart-rate alert | New connections route to healthy instances; missed-event resync (`19-...md` §1.3) |
| Regional failure | N/A (out of current implemented scope, `26-...md` §4.3) | N/A | N/A | Full platform unavailability | Region-health alert (external monitoring, since in-region observability may itself be down) | Manual/future-automated failover per `26-...md` §4.4's staged plan |

## 2. Backup and Restore Strategy

### 2.1 PostgreSQL

- **Continuous WAL archiving** + **daily full base backups** (managed-provider capability),
  enabling point-in-time recovery (PITR) to any point within the retention window.
- **Retention**: base backups retained per an operational policy (e.g., 30 days), WAL retained to
  cover the same PITR window.
- **Cross-region backup copy**: backups replicated to a separate region/storage location from the
  primary deployment, so a full regional loss of the primary region's storage does not also
  destroy the means of recovery.

### 2.2 Object Storage

- **Versioning enabled** on the media bucket — an accidental overwrite/delete is recoverable via
  version history for a defined window before a version is permanently expired by lifecycle
  policy.
- Cross-region replication of the bucket (or a periodic cross-region sync job) for the same
  regional-loss-of-backup-means reason as §2.1.

### 2.3 Event Retention as a Non-Backup

The broker's 7-day retention (Volume 1 `07-...md` §4) is explicitly **not** a backup mechanism —
it is a delivery buffer. Recovery of historical domain state always goes through PostgreSQL
(§2.1), never through broker replay, per ADR-002 (`12-adrs.md`).

### 2.4 Configuration and Secrets Backup

- Infrastructure-as-code definitions (Terraform/equivalent state and definitions) are themselves
  version-controlled and backed up as part of the standard source-control/CI backup posture — not
  a separate mechanism.
- Secret recovery model: the secret manager's own native backup/recovery capability
  (`25-...md` §5.4) is the recovery path; this architecture does not maintain a parallel,
  independent copy of secret values anywhere (doing so would itself be a security control
  regression).

### 2.5 Restore Ordering

A full-system restore (e.g., after a catastrophic primary-region data-tier loss) follows this
order, because later steps depend on earlier ones being consistent:

1. Restore PostgreSQL to the desired point-in-time (the authoritative source of truth for
   everything else).
2. Restore/verify object storage state (media bytes) — cross-checked against `MediaAsset` rows
   restored in step 1 (a reconciliation job flags any `MediaAsset` row with no corresponding
   object, or any object with no corresponding row, for manual/automated cleanup).
3. Rebuild the search index fully from the restored Postgres state (§`21-...md` §2.4) — never
   restored from a search-cluster-native backup, since Postgres post-restore is the fresh source
   of truth and a stale search backup could reintroduce since-corrected staleness.
4. Redis and the broker are **not restored from backup at all** — they are ephemeral/bounded-
   retention by design (ADR-002, ADR-006); after a restore, Redis starts empty and repopulates
   naturally from Postgres-backed reads; the broker starts empty and the outbox relay begins
   publishing fresh from any unpublished (or, if outbox rows were also lost, from a
   reconciliation-job-detected gap — see §2.6) rows.
5. Application-tier services (`core-api`, `realtime-gateway`, `workers`, `media-processor`) are
   redeployed/restarted against the restored data tier.

### 2.6 Restore Validation

A restore is not considered complete until: (a) the reconciliation jobs (Volume 1 `07-...md` §6,
`23-...md`) have run at least one full pass and reported no unresolved drift beyond an accepted
threshold, (b) a smoke-test suite (send/receive a message, upload/access media, run a search
query, authenticate) passes against the restored environment, and (c) key business metrics
(message volume, active-connection count) return to expected ranges — restore success is
evidenced, not assumed.

### 2.7 Recovery Drills

Backup existence is explicitly distinguished from **tested** recoverability: a periodic (e.g.,
quarterly) recovery drill — restoring a backup into an isolated environment and running the
validation steps in §2.6 — is a required operational practice for this architecture to be
considered production-ready, per the master prompt's explicit distinction. This volume specifies
the requirement and the validation criteria; scheduling and execution are an
operations/infrastructure-implementation-prompt responsibility.

## 3. Migration Strategy

### 3.1 Database Schema Migrations (Reaffirmed and Deepened from Volume 1 `04-...md` §8)

- **Expand/contract**, always. No migration both adds a constraint/`NOT NULL` column and expects
  it populated in the same deploy for a high-volume table.
- **Backward-compatible deployments**: a new application version's code must work correctly
  against both the pre-migration and post-migration schema during a rolling deployment window
  (some instances on old code, some on new, briefly) — this means an "expand" migration (add
  column/table) is deployed *before* the application code that requires it, and a "contract"
  migration (drop column/table) is deployed *after* all application code that could reference it
  has been fully rolled out.
- **Index creation**: `CREATE INDEX CONCURRENTLY` always, for any table with meaningful
  concurrent write traffic (`messaging.message`, `receipts.*` explicitly called out per
  `23-...md` §3).
- **Large-table migration behavior**: any migration touching `messaging.message` or
  `receipts.*` at scale is executed as a batched, resumable background operation (e.g.,
  backfilling a new column in chunks with a brief pause between batches to avoid replication-lag
  spikes and lock contention), never a single blocking `UPDATE` across the full table.
- **Rollback limitations**: an "expand" step is always safely rollback-able (the added
  column/table simply goes unused). A "contract" step, once executed, is generally **not**
  rollback-able without a fresh migration to re-add what was dropped (and, for dropped columns,
  the data is gone unless a backup/archive was taken first) — this asymmetry is why contract
  steps are always the *last* step of a migration sequence, executed only after sufficient
  confidence (a bake-in period) that the expand step and the code depending on it are fully
  correct in production.

### 3.2 API Compatibility

- Additive changes (new optional fields, new endpoints) ship without a version bump and without
  breaking existing clients (`15-...md` §2).
- Breaking changes require a new path-versioned API (`/v2`), with the old version (`/v1`)
  continuing to function through a documented deprecation window (`Deprecation`/`Sunset` headers,
  `15-...md` §2) — old mobile-client versions in particular cannot be forced to update
  instantly, so `/v1` must remain functional for a realistic window matching mobile app-store
  update-adoption timelines (a product decision on exact duration, architecturally required to be
  "long enough for realistic mobile client upgrade adoption," not a fixed number here).

### 3.3 Event Compatibility

Reaffirmed from `22-...md` §3: additive-only within an `eventVersion`; breaking changes bump
`eventVersion` with either dual-publishing during the migration window or consumer-upgrade-first
sequencing, explicitly chosen per change (never silently defaulted).

### 3.4 Realtime Protocol Compatibility

`protocolVersion` (`18-...md` §1) follows the same expand/contract discipline: the gateway
supports the current and previous `protocolVersion` simultaneously during a client-upgrade
rollout window, never cutting over all-at-once in a way that would strand not-yet-updated mobile
clients (which, unlike web clients, cannot be force-refreshed).

### 3.5 Migration Testing (Cross-Reference)

Migration correctness is validated via the testability hooks defined in Volume 1
(`00-...md`/`request_evaluation` is not part of this architecture's own scope, but Volume 1's
general testability requirement extends here): every schema migration is exercised against a
staging environment with production-representative (synthetic/anonymized) data volume before
being promoted to production, and every migration is paired with an automated rollback/forward-
fix runbook entry, not left to ad hoc improvisation during an incident.
