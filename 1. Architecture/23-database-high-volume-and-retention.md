# 23 — Database High-Volume Strategy and Data Retention/Deletion Contract

This document deepens Volume 1 `04-database-architecture.md` §9-10.

## 1. High-Volume Table Growth Profile

| Table | Growth driver | Expected relative volume |
|---|---|---|
| `messaging.message` | One row per sent message | Highest — dominant table by an order of magnitude or more |
| `receipts.delivery_receipt` / `receipts.read_receipt` | One row per `(message, user, device)` combination | Second-highest — a multiple of message volume proportional to average conversation size × average devices per user |
| `messaging.outbox` | One row per emitted domain event | Proportional to message volume plus all other domains' event volume; bounded by prompt relay consumption (rows are not retained long after publishing — see §5) |
| `audit.audit_event` | One row per auditable action | Lower volume, unbounded retention (compliance-driven) |
| `notifications.notification_delivery_log` | One row per notification send attempt | Proportional to message volume × average recipient count, minus suppressed/muted |
| `reactions.message_reaction` | One row per reaction | Low relative to messages |

## 2. Partitioning Strategy

### 2.1 `messaging.message` — Time-Range Partitioning (Required, Provisioned in Volume 1)

Monthly range partitions on `server_accepted_at`. Each partition is independently indexable,
vacuumable, and — per retention policy (§6) — independently droppable or archivable to cold
storage without locking the active (current-month) partition. This is provisioned as a mandatory
implementation-prompt deliverable, not optional.

### 2.2 `messaging.message` — Conversation-Hash Sub-Partitioning (Future Lever, Not Implemented)

If write throughput on the active time partition becomes the bottleneck (identified trigger:
sustained p99 write latency degradation or approaching single-primary IOPS ceiling), a second
partitioning dimension — hash-partitioning by `conversation_id` within each time range — is the
architecturally anticipated next step. This is **not implemented in this volume**; it is recorded
here as the specific, named future lever so an implementation prompt facing this exact trigger
does not need to invent the strategy from scratch, only execute it.

### 2.3 `receipts.delivery_receipt` / `receipts.read_receipt`

Same monthly time-range partitioning on the receipt's own timestamp column, for the same
vacuum/archival reasons. Partition-key alignment with `message`'s partitions (same month
boundaries) is recommended so that archival/retention jobs for a given time window can process
both tables together without cross-partition-boundary complexity.

### 2.4 `audit.audit_event`

Time-range partitioned, but **retained indefinitely by default** (no automatic drop) — only moved
to cheaper storage tiers (e.g., a colder partition tablespace) as it ages, never deleted by an
automated job, since compliance retention requirements are external and must not be silently
violated by an infrastructure optimization.

## 3. Index Maintenance

- `CREATE INDEX CONCURRENTLY` for any new index added to `messaging.message` or
  `receipts.*` post-launch, to avoid locking active writes.
- Partition-local indexes (each monthly partition gets its own physical index) keep individual
  index sizes bounded and rebuild/reindex operations scoped to one partition at a time if ever
  needed, rather than requiring a full-table reindex.
- Autovacuum tuning for `messaging.message` and `receipts.*`: more aggressive
  (`autovacuum_vacuum_scale_factor` lowered from the Postgres default) on these specific tables
  given their write/update volume, to keep bloat and query-planner statistics healthy — an
  infrastructure/DBA-implementation-prompt tuning task, flagged here as required, not optional.

## 4. Write Contention and Hot Partitions

- The active (current-month) `message` partition is the system's single hottest write target.
  Mitigations: (a) the transactional-outbox write happens in the same transaction and same
  partition-adjacent table (`messaging.outbox`, also time-partitioned) to avoid cross-partition
  transaction overhead; (b) connection pooling (PgBouncer or equivalent, transaction-pooling mode)
  bounds the number of concurrent open transactions against this partition; (c) the
  conversation-hash sub-partitioning lever (§2.2) is the identified response if hash-skew from a
  small number of extremely active conversations (e.g., huge broadcast groups) becomes a hot-spot
  within the active time partition even after (a)/(b).
- Read replicas (Volume 1 `04-...md` §10) absorb read load, keeping the primary's capacity
  dedicated to writes and read-your-writes-consistent reads.

## 5. Outbox Table Lifecycle

`messaging.outbox` (and each domain schema's own outbox table) is not a permanent audit log — rows
are deleted (or moved to a short-retention archive table, e.g., 7-day retention, matching the
broker's own retention window per Volume 1 `07-...md` §4) by a scheduled cleanup job once
`published_at` is set and older than the retention window. This keeps the outbox table itself
small and fast to poll, since its only operational purpose is enabling the relay, not serving as
a durable event history (Postgres's `message`/`conversation`/etc. tables themselves are the
durable history; the outbox is transient plumbing).

## 6. Data Retention and Deletion Contract

| Data category | User-visible deletion | Operational retention | Legal/compliance retention | Backup retention |
|---|---|---|---|---|
| Messages | `for_self` (per-user tombstone) or `for_everyone` (canonical tombstone) — both immediate, user-initiated (`17-...md` §5.2) | Time-partitioned; default operational retention window is a **product/legal decision external to this architecture** — this volume defines the partitioning mechanism (§2.1) that makes any retention window enforceable, not the window's length | If a jurisdiction requires longer retention than the product's default operational window (e.g., for a specific regulated use case), that is a distinct, explicitly-configured retention override — this architecture does not assert a specific legal retention period for any jurisdiction, per the master prompt's prohibition on unestablished legal claims | Backups (§`27-...md` §2) retain point-in-time snapshots per the backup retention policy, which is independent of and typically shorter-cycling than the primary retention window; a user's deletion request does not retroactively purge already-taken backups (a documented, standard limitation — see §6.1) |
| Media | Reference-counted cleanup on `message.deleted` / `account.deleted` (Volume 1 `08-...md` §1.2) | Object storage lifecycle rules aligned to the same operational retention window as messages | Same external-decision caveat as messages | Object storage versioning/backup (§`27-...md`) is independent of live-object deletion |
| Receipts | No independent user-facing deletion (receipts are metadata about messages; they are deleted when their parent message's retention window expires, not independently) | Time-partitioned alongside messages | N/A | Same |
| Audit records | **Not user-deletable** — audit integrity requires that ordinary users (including the actor themselves) cannot erase their own audit trail | Indefinite by default (§2.4) | Governed by the external compliance requirement most applicable to the platform's operating jurisdictions — again, not asserted here | Standard backup retention |
| Analytics | Aggregate/allow-listed only (Volume 1 `05` domain — Analytics module); an individual user's raw analytics events are deleted as part of the `account.deleted` cascade (§6.2) since they are keyed to `userId` | Bounded operational window (e.g., 13 months, a common analytics-retention default) — implementation-prompt-configurable | External | Standard |
| Logs (application/observability) | Not individually user-deletable via product UI; covered by the platform's general log-retention policy | Bounded (e.g., 30-90 days hot, longer cold per `11-...md`'s observability retention needs) | External | Standard |
| Search indexes | Deleted/flagged on `message.deleted` propagation (§`21-...md` §2.2); fully removed for a deleted account via the `account.deleted` cascade re-indexing that user's content out | Mirrors source-of-truth retention | N/A (derived) | Not backed up independently — always rebuildable from Postgres (§`21-...md` §2.4) |
| Event streams (broker) | Not individually deletable; bounded retention (7 days, §5) means any given message's event naturally rolls off regardless of a specific deletion request | 7-day default | N/A | Not backed up (by design — Postgres is the durable record, per ADR-002) |

### 6.1 Backup Retention vs. Live Deletion — Explicit Limitation

A user's message/account deletion removes the data from all **live** systems (Postgres, search,
cache, object storage) within the propagation windows defined elsewhere in this document set. It
does **not** retroactively scrub already-created point-in-time database backups older than the
deletion event — restoring from such a backup would restore the since-deleted data. This is a
standard, industry-typical limitation of backup-based disaster recovery, stated explicitly here
per the master prompt's "no false completeness" requirement, rather than silently implied. If a
stronger guarantee (backup-scrubbing on deletion) is a product/compliance requirement, it requires
a dedicated backup-architecture extension not covered by this volume.

### 6.2 Account Deletion Cascade (Deepened from Volume 1 `04-...md` §9)

Triggered by `account.deleted`, executed by the `account-deletion` job (Volume 1 `07-...md` §6,
high priority, alerted-on-failure):

1. `Credential` rows hard-deleted immediately.
2. All `Session`/`Device` rows revoked/marked inactive.
3. `Profile`/`PrivacySetting` anonymized (`displayName` → tombstone value, `avatarMediaAssetId` →
   null, triggering the same reference-counted media cleanup as any other unreferenced asset).
4. `PushToken` rows invalidated.
5. Messages authored by the deleted user: **redaction policy is a product decision** (either the
   message body is redacted while the message row/position is preserved for other participants'
   conversation integrity, or fully removed per `for_everyone` semantics) — this volume defines
   the mechanism (an idempotent, resumable cascade job checking current state before each step,
   per Volume 1 `07-...md` §6's dead-letter/idempotency discipline) but not the specific policy
   choice, which must be made explicit in a product-level ADR before implementation.
6. Analytics events for the user are deleted (not merely anonymized, since analytics has no
   product need to retain even anonymized rows once the account is gone).
7. Search documents for the user's content are removed.
8. Audit records referencing the user as `actorId` or `targetId` are **retained** (audit integrity
   requirement, §6 above) — the user's identity within audit records may be display-anonymized in
   UI (e.g., "deleted user") without deleting the underlying audit row.
9. The cascade job is resumable/idempotent at each step (checks current state before acting) so a
   crash mid-cascade can safely resume without re-executing already-completed steps or skipping
   remaining ones — consistent with Volume 1 `07-...md` §6's dead-letter handling requirement that
   this job is "high priority" and must never silently fail partway.
