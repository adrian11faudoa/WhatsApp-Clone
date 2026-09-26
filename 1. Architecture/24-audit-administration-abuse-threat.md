# 24 — Audit, Administration, Abuse Prevention, Threat Model, Cryptographic Boundaries

## 1. Audit Architecture (Deepened)

### 1.1 Auditable Actions (Fixed Catalog)

| Category | Actions |
|---|---|
| Authentication/security | Login success/failure (aggregate/rate-limited logging, not one row per attempt — see §1.4), password/credential reset, session revocation, refresh-token-reuse-detected event |
| Administrative access | Any request to an `/v1/admin/*` endpoint, regardless of outcome (including denied attempts — an authorization denial on an admin endpoint is itself audit-worthy) |
| Moderation | Report filed, report reviewed, moderation action applied (message removal, account restriction) |
| Role changes | Group role changes (`owner`/`admin`/`member` transitions), platform role grant/revoke |
| Account restrictions | Restriction applied/lifted, reason, duration |
| Sensitive configuration changes | Any change to platform-wide configuration exposed via an admin endpoint (e.g., rate-limit thresholds, feature flags) |

### 1.2 Audit Record Shape (Fixed)

```json
{
  "id": "018f5000-....",
  "actorId": "018f2c00-....",
  "actorType": "user",
  "action": "group.role_changed",
  "targetType": "GroupMember",
  "targetId": "018f3a10-....:018f2c05-....",
  "before": { "role": "member" },
  "after": { "role": "admin" },
  "reason": null,
  "correlationId": "b3a1c2e0-....",
  "sourceIp": "203.0.113.42",
  "createdAt": "2026-09-16T14:31:56.412Z"
}
```

| Field | Rule |
|---|---|
| `actorId` | `userId` of the acting party, or `null` for system-initiated actions (`actorType: "system"`) |
| `actorType` | `user`, `system`, or `platform_administrator` (distinguishes an ordinary user's own action, e.g., leaving a group, from a privileged administrative action, even when both might otherwise look similar) |
| `before` / `after` | Structured snapshots of the changed fields only (not a full entity dump) — sufficient for reconstruction/review without bloating the audit table with redundant unchanged data |
| `reason` | Present for moderation/restriction actions where an operator-supplied justification is required by policy; `null` otherwise |
| `sourceIp` | Captured for security-relevant actions (login, admin access, credential changes); omitted for routine domain actions where it adds no security value and only increases PII surface in the audit table |

### 1.3 Tamper Resistance

`audit.audit_event` rows are **insert-only** at the application layer — no `UPDATE`/`DELETE`
grant exists on this table for the `core-api` application database role (enforced via Postgres
`GRANT`s, defense-in-depth beyond application code discipline). Only a separate,
highly-restricted operational role (used solely by the retention/archival job, §`23-...md` §2.4)
has any write access beyond `INSERT`, and that access is limited to moving rows to colder storage,
never modifying their content. This is "tamper-resistant relative to ordinary application state"
as required — it is not cryptographically tamper-proof (e.g., no hash-chaining/blockchain-style
integrity in this volume); if that stronger guarantee is required, it is a future architectural
addition, flagged here rather than falsely implied.

### 1.4 Authentication Attempt Logging (Volume Consideration)

Individual login *failures* are not each written as a durable `audit_event` row (that would be an
unbounded-growth vector directly exploitable by an attacker spamming login attempts to bloat the
audit table) — they are tracked in Redis-backed rate-limit counters (§3) for lockout purposes and
aggregated into observability metrics (`11-...md`). A **successful** login, a password reset, and
a lockout-triggering threshold breach (as a single aggregate event, not per-attempt) are each
audited as durable rows.

## 2. Administration Architecture (Deepened)

### 2.1 Privilege Tiers (Fixed)

| Tier | Capabilities | Authentication requirement |
|---|---|---|
| Ordinary user | Own account/profile/conversations, per Volume 1 §2.2/§`16-...md` §2 | Standard session |
| Moderator | Review/action reports, apply time-boxed account restrictions, remove messages platform-wide for policy violations | Standard session + `platform_role = moderator` claim, re-verified server-side on every admin-scoped request (never trusted from a cached client claim alone) |
| Platform administrator | Full administrative surface: role grants, permanent restrictions, group/account deletion override, configuration changes, DLQ operator actions | Standard session + `platform_role = platform_administrator`; **additionally recommended** (implementation-prompt decision, architecturally anticipated) — step-up authentication (re-confirming credentials or an MFA challenge) for the most destructive actions (permanent account deletion override, configuration changes affecting rate limits/security posture) |

### 2.2 Session Controls for Privileged Operations

Admin-tier sessions use the **same** session/token mechanism as ordinary users (`16-...md` §1) —
no separate "admin token" system, avoiding the two-incompatible-ID/token-systems anti-pattern —
but with a shorter access-token lifetime recommended for admin-role sessions (implementation-
configurable, e.g., 5 minutes instead of 15) given the higher blast radius of a compromised admin
token.

### 2.3 Separation from Ordinary User Permissions

Every admin endpoint lives under a distinct `/v1/admin/*` path prefix, gated by a dedicated
authorization guard that checks `platform_role` independent of (and in addition to, where
relevant) any group-level role check — a `platform_administrator` does not need to also be a
group `member` to remove a message from that group via the admin path, but doing so is always
logged as a `platform_administrator`-actor action (§1.2), never disguised as an ordinary member
action.

## 3. Abuse Prevention Architecture (Deepened)

### 3.1 Rate-Limit Dimensions (Fixed Matrix)

| Dimension | Applies to | Example limit shape |
|---|---|---|
| Account | Message send, media upload, conversation creation, reaction add | N per minute per `userId` |
| IP | Login, registration, password-reset-request (unauthenticated endpoints) | N per minute per IP, with escalating lockout |
| Device | Realtime connection attempts, push-token registration | N per minute per `deviceId` |
| Endpoint | Every endpoint has its own base limit category (auth-strict / write-moderate / read-generous, Volume 1 `05-...md` §8) | Category-specific |
| Resource (conversation) | Message send rate **per conversation** in addition to per-account (prevents one compromised/malicious member from flooding a specific group even if their account-level limit alone wouldn't trip) | N per minute per `(userId, conversationId)` |
| Conversation-wide aggregate | Total message rate per conversation regardless of sender, to protect against a coordinated multi-account flood of one target group | N per minute per `conversationId` across all senders |

**Explicit requirement satisfied**: abuse controls are never IP-only for account-level abuse —
every authenticated write path has an account-dimension limit in addition to (not instead of) any
IP-based limit on the unauthenticated endpoints that precede authentication.

### 3.2 Signup Abuse Controls

- IP + device-fingerprint-adjacent (best-effort, privacy-respecting — no invasive fingerprinting
  beyond what's proportionate) rate limiting on `POST /v1/auth/register`.
- Optional (implementation-prompt decision, architecturally anticipated) challenge mechanism
  (CAPTCHA-equivalent) gated behind a risk score, not applied universally to every registration by
  default, to avoid degrading legitimate user experience unless abuse signals warrant it.

### 3.3 Spam Controls

- Message-rate limits (§3.1) are the primary structural control.
- Report aggregation (Volume 1 Moderation domain): repeated reports against the same `targetId`
  within a window automatically elevate a `Report`'s priority for review, without automatically
  actioning it (avoids a coordinated false-report brigade from triggering automatic punitive
  action without human/heuristic review).

### 3.4 Blocking and Restrictions Interaction

A `Block` (Contacts domain, user-initiated, unilateral) is distinct from an `AccountRestriction`
(Moderation domain, platform-initiated, e.g., "cannot create new groups for 7 days"). Both are
checked at the relevant authorization points (`16-...md` §2.3's ownership-check philosophy
extends here: a restriction check is a resource-specific precondition on the *action*, not a
role), and either can independently deny an action — they compose (a non-restricted user can still
be blocked by a specific peer; a non-blocked user can still be under a platform restriction).

## 4. Threat Model (Deepened from Volume 1 `09-...md` §4)

| Threat | Attack surface | Trust boundary crossed | Mitigation | Detection | Recovery |
|---|---|---|---|---|---|
| Account takeover | Login endpoint | Public internet → `core-api` | Adaptive-hash credentials, rate limiting/lockout, refresh-token rotation+reuse-detection | Failed-login-rate metrics, reuse-detection alert | Forced session revocation, credential reset flow |
| Session/token theft | Client storage, network | Client ↔ Edge | Short-lived access tokens, secure storage requirements (`16-...md` §1.9), TLS everywhere | Reuse-detection (§`16-...md` §1.4) | Full session-lineage revocation |
| Credential stuffing | Login endpoint | Public internet → `core-api` | Per-IP and per-account rate limiting, generic error messages | Spike in `AUTH_INVALID_CREDENTIALS` rate from distributed IPs | Temporary stricter lockout, optional CAPTCHA escalation |
| IDOR | Any resource-scoped endpoint | Edge → `core-api` | Per-request server-side ownership/membership re-verification (`16-...md` §2.4) | Anomalous 404/403 rate per account (probing pattern) | N/A — prevented structurally, not merely detected |
| Group privilege escalation | Role-change endpoints | Edge → `core-api` (Groups module) | Server-side role-hierarchy enforcement, caller's *current* role re-checked, not client-asserted (`16-...md` §2.1, §3.6) | Audit trail review | Role reverted via audit-informed admin action |
| Unauthorized message access | Conversation/message endpoints, realtime fan-out | Edge → `core-api` / gateway | Per-request membership check at every layer (`16-...md` §2.2) | N/A — prevented structurally | N/A |
| Unauthorized media access | Media access endpoint | Edge → `core-api` (Media module) | Presigned, short-TTL, per-access-reauthorized URLs (`20-...md` §6) | Anomalous media-access-denial rate | N/A — prevented structurally |
| Malicious uploads | Upload/complete endpoints, processing pipeline | Client → Object Storage → `media-processor` | Content-type allow-list, content-sniffing, size limits, malware scan, isolated processing pool (`20-...md` §4, §7) | Validation-stage failure rate metric | Failed asset never reaches `ready`; never exposed |
| Spam | Message send, group invites | Edge → `core-api` | Multi-dimension rate limiting (§3.1), report aggregation | Message-rate anomaly metrics, report-volume spikes | Restriction application (Moderation) |
| Scraping | List/search endpoints | Edge → `core-api` | Per-account rate limiting on read-heavy endpoints, pagination page-size caps | Anomalous read-volume-per-account metric | Rate-limit escalation, restriction |
| Realtime abuse (connection flooding) | WebSocket handshake | Edge → `realtime-gateway` | Per-account/per-IP connection-count limits (Volume 1 `09-...md` §4) | Connection-count-per-account metric | Connection rejection, temporary IP/account throttling |
| Notification abuse | Any event that triggers a push | `core-api`/`workers` → Provider | Coalescing (`21-...md` §1.4), per-recipient throttling | Notification-send-rate-per-recipient metric | Throttle/suppress further sends to that recipient temporarily |
| Resource exhaustion | Large payloads, pagination abuse, oversized media | Edge → `core-api` / Object Storage | Body-size limits, page-size caps, media size/quota limits (`20-...md` §7) | Request-size and error-rate metrics | Request rejection at validation |
| Event poisoning (malformed/malicious event payload reaching a consumer) | Internal broker | `core-api`/`workers` internal | Schema validation at both publish and consume time using the shared schema package (§`22-...md` §3); a producer bug that emits a non-conformant payload is caught at publish-time validation before it ever reaches the broker | Schema-validation-failure metric/alert | Fix producer, republish from Postgres source-of-truth if needed (events are derived, never the sole record) |
| Queue poisoning (a malformed job payload repeatedly crashing a worker) | Internal queue | `workers` internal | Job payload schema validation before processing; a job that fails validation goes straight to DLQ rather than being retried `maxAttempts` times against a handler that will always crash on it | DLQ-depth alert, crash-loop detection on worker pods (infrastructure-level) | Manual DLQ review/fix/requeue |
| Secret exposure | Logs, error responses, source control | Any boundary | Field-allow-listed structured logging (`11-...md` §5), generic error envelope (`15-...md` §3), secret-management model (`25-...md` §2) | Log-scanning for accidental secret patterns (an operational/CI control, implementation-prompt deliverable) | Immediate credential rotation |
| Internal privilege escalation (a compromised worker/service using its DB role beyond its module's schema) | Internal — service-to-database | `workers`/`core-api` → PostgreSQL | Least-privilege, per-module database roles/grants (Volume 1 `04-...md` §1), no module's role has grants on another module's schema | Anomalous cross-schema query attempt (would simply fail with a permission error, logged) | N/A — prevented structurally by DB grants, a defense-in-depth layer beyond the application-level module-boundary rule |

## 5. Cryptographic Boundaries (Reaffirmed and Made Precise)

| Layer | Guarantee | Explicitly NOT guaranteed |
|---|---|---|
| TLS (every network hop, Volume 1 `01-...md` §3) | Confidentiality/integrity in transit between any two boundary-crossing components | Confidentiality from the server itself — the server can read everything it transmits/receives |
| At-rest encryption (managed Postgres/object-storage encryption) | Protection against physical media theft / unauthorized storage-layer access outside the application | Protection against a compromised application-tier credential (at-rest encryption is transparent to an authenticated application connection) |
| Application-level encryption | Not used in this volume for message content (credential hashes are the one application-level cryptographic transformation in use, per `09-...md` §1.1) | N/A |
| End-to-end encryption | **Not implemented** (Volume 1 ADR-009, reaffirmed) | Message confidentiality from the backend itself; server-side search/moderation/multi-device-sync as designed require server-readable plaintext |

**No custom cryptographic primitives are invented anywhere in this architecture.** Every
cryptographic operation (credential hashing, refresh-token hashing, JWT signing) uses established,
vetted, standard algorithms/libraries, chosen and parameterized at implementation time by a
security review, not designed from scratch in this document set.
