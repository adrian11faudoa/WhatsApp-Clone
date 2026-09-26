# 21 — Notification Contract and Search Contract

## 1. Notification Contract (Deepened)

### 1.1 Canonical Notification Intent (Provider-Independent)

```json
{
  "notificationId": "018f4a00-....",
  "userId": "018f2c00-....",
  "deviceId": "018f2c01-....",
  "type": "message_received",
  "sourceEventId": "018f3d00-....",
  "payload": {
    "conversationId": "018f3a10-....",
    "previewMode": "full",
    "senderDisplayName": "Alice",
    "bodyPreview": "hey, are we still on for tomorrow?"
  },
  "eligibility": "eligible",
  "provider": "apns",
  "attempt": 1,
  "status": "pending",
  "createdAt": "2026-09-16T14:31:57.000Z"
}
```

This intent object is **internal** (never returned to clients via the REST API) — it is the
`workers`-internal representation from which a provider-specific push payload (APNs/FCM/Web Push
format) is derived at send time. Keeping intent separate from provider format lets the platform
add a new provider (e.g., a future desktop-push channel) without changing the eligibility/
deduplication logic.

| Field | Rule |
|---|---|
| `notificationId` | UUIDv7, internal tracking only |
| `sourceEventId` | The domain `eventId` that triggered this notification — links back to the causal domain event for tracing |
| `type` | `message_received`, `group_invite`, `mention` (future), `reaction_received` (product-configurable whether reactions notify at all) |
| `payload.previewMode` | `full` or `generic`, resolved from `NotificationPreference`/platform settings at send time (Volume 1 `08-...md` §3.2) |
| `eligibility` | `eligible`, `suppressed_muted`, `suppressed_quiet_hours`, `suppressed_active_viewer` — recorded even for suppressed notifications, for observability/debugging of "why didn't I get notified" support cases |
| `status` | `pending`, `sent`, `delivered_by_provider` (if the provider confirms), `failed_transient`, `failed_permanent` |

### 1.2 Deduplication (Fixed)

Dedup key: `(sourceEventId, pushTokenId)`. A `UNIQUE` constraint on
`NotificationDeliveryLog(source_event_id, push_token_id)` guarantees that even if the consuming
worker job is retried (queue redelivery), the same domain event never triggers two sends to the
same token — the second attempt's insert conflicts and the worker treats that as "already
handled," a no-op success.

### 1.3 Invalid-Token Handling

| Provider response | Action |
|---|---|
| `Unregistered`/`InvalidRegistration` (FCM) or `BadDeviceToken`/`Unregistered` (APNs) | Set `PushToken.invalidatedAt = now()` immediately; do not retry this token again for any future notification |
| Transient (5xx, timeout, provider rate-limit) | Retry per the `notification-delivery` queue's backoff policy (Volume 1 `07-...md` §6), up to 8 attempts, then dead-letter |
| Auth/config error (e.g., expired provider certificate) | Not a per-token issue — alert operationally (this indicates a platform-wide provider misconfiguration, not a bad token), dead-letter the batch, do not invalidate tokens based on this error class |

### 1.4 Coalescing (Architectural Requirement, Not a Fixed Algorithm)

The Notifications module must support collapsing multiple rapid `message_received` intents for
the same `(userId, conversationId)` into a single summarized notification (e.g., "3 new messages
from Group Chat") within a short window (implementation-configurable). This is required
specifically to avoid notification-flooding a user in an active group during a burst of messages;
the exact window and summarization text format are implementation-prompt/product decisions.

## 2. Search Contract (Deepened)

### 2.1 Query Contract

`GET /v1/search/messages?q=<query>&conversationId=<optional>&limit=&cursor=`

1. Resolve caller's authorized `conversationId` set (cached, short TTL, per Volume 1
   `08-...md` §2.4).
2. If `conversationId` is supplied, verify it's in the authorized set (`404` otherwise, existence-
   hiding pattern per `15-...md` §3.1); scope the query to it.
3. Execute the search query against OpenSearch, pre-filtered by the authorized set from step 1
   (a `terms` filter on `conversationId`, applied as a mandatory filter clause, never as a
   post-query result-filtering step — filtering after retrieval would break pagination counts and
   risks accidentally returning fewer results than `limit` due to post-filtering, whereas
   pre-filtering at the query level is both correct and efficient).
4. Response uses the same cursor-pagination contract as other search-adjacent endpoints
   (`15-...md` §4.1), ordered by relevance score with `serverAcceptedAt DESC` as a tiebreaker.

### 2.2 Indexing Event Consumption (Fixed Mapping)

| Domain event | Index action |
|---|---|
| `message.created` | Upsert message document |
| `message.edited` | Upsert (overwrite `body`, update `editedAt`) |
| `message.deleted` | Delete document (or set `deleted: true` and exclude via a mandatory query filter — implementation choice; either satisfies "a deleted message must never appear in search results") |
| `conversation.created` | Upsert conversation document |
| `conversation.settings_updated` / `group.metadata_updated` | Upsert conversation document (updated name/description for group search) |
| `group.member_removed` | No direct document mutation needed — authorization is enforced at query time (§2.1 step 1/3), not by mutating already-indexed documents; this is the specific design choice that makes ADR-010 (`12-adrs.md`) correct even under indexing delay |
| `profile.updated` | Upsert profile/contact search document (privacy-filtered fields only) |

### 2.3 Stale-Index Behavior

A stale index (indexing consumer lagging) means **new** content may not yet be searchable — an
acceptable, bounded (target p99 < 5s, Volume 1 `08-...md` §2.3) staleness. It never means
**unauthorized** content becomes searchable, because authorization is query-time, not index-time
(§2.1, ADR-010).

### 2.4 Reindexing and Backfill

A full reindex job (`workers`, `search-indexing` queue, triggered manually or by detected schema
version mismatch) reads from Postgres in batches (keyset-paginated by `id`, never `OFFSET`, same
rule as `15-...md` §4.2) and re-upserts every document; it never reads from the search cluster as
its source, guaranteeing a reindex can recover from any index corruption without data loss since
Postgres remains authoritative.

### 2.5 Failure Recovery

If OpenSearch is fully unavailable: search endpoints return
`503 DEPENDENCY_UNAVAILABLE, retryable: true` — never a silent empty-result-set (which would look
like "no matches" rather than "search is down," misleading the user). Indexing jobs queue in the
`search-indexing` queue and drain on recovery (Volume 1 `10-...md` §3).
