# 09 — Authentication, Authorization, Security, and Privacy Architecture

## 1. Authentication Architecture

### 1.1 Registration and Credentials

- Registration creates a `User` (Identity domain, `status=active`) and a `Credential` row
  (`secretHash` using a strong adaptive hash — e.g., Argon2id or bcrypt with an appropriate work
  factor; the exact parameters are a security-review decision at implementation time, not fixed
  here beyond "must be an adaptive, salted hash, never reversible encryption or a fast hash like
  SHA-256 alone").
- Passwords/credentials are never logged, never returned in any API response, never included in
  events, and never present in plaintext outside the request body of the registration/login/
  change-credential calls themselves (which are TLS-protected in transit and never persisted as
  plaintext).

### 1.2 Sessions, Tokens, Devices

- **Access token**: short-lived JWT (architectural default: 15 minutes), signed (asymmetric —
  e.g., RS256/EdDSA — so `realtime-gateway` and any future service can verify without sharing a
  symmetric secret with `core-api`), containing `userId`, `deviceId`, `sessionId`, `iat`, `exp`.
  Contains no sensitive data beyond identifiers.
- **Refresh token**: long-lived, opaque (not a JWT), stored server-side hashed
  (`Session.refreshTokenHash`), rotated on every use (rotation-on-use with reuse detection: if a
  refresh token is presented that has already been rotated/consumed, the entire session lineage
  is revoked and the user is forced to re-authenticate — this detects token theft).
- **Device tracking**: every session is tied to a `deviceId`; `GetActiveSessions(userId)` lets a
  user see and revoke sessions per device (e.g., "log out other devices").
- **Logout/revocation**: sets `Session.revokedAt`; subsequent refresh attempts with that lineage
  fail; `realtime-gateway` force-disconnects any live connection for a revoked session (consuming
  `session.revoked`, see `07-events-and-queues.md` §3).
- **Account recovery**: time-boxed, single-use recovery tokens (separate from sessions),
  invalidated after use or expiry; recovery flows are subject to the same rate-limiting and
  brute-force protections as login.

### 1.3 Brute-Force and Abuse Protection

- Login and recovery endpoints: Redis-backed rate limiting per `(accountIdentifier, IP)` pair with
  exponential lockout escalation; generic error messages that do not reveal whether the identifier
  (email/handle) exists (`AUTH_INVALID_CREDENTIALS` regardless of which factor was wrong).
- Suspicious-activity signals (e.g., many failed attempts, login from a new device/region) are
  identified as inputs to the Moderation/Administration domains for future automated response;
  this volume establishes the event hooks (`session.created` carries device/context metadata
  consumable for this purpose), not a specific fraud-detection implementation.

## 2. Authorization Architecture

### 2.1 Principle

**Authorization is always enforced server-side, against authoritative state, at every trust
boundary independently** — HTTP, WebSocket, background workers, and media delivery each perform
their own check; none trusts a decision made by another layer without re-verification at the
point of action.

### 2.2 Enforcement Points

| Boundary | Authoritative source | Enforcement |
|---|---|---|
| HTTP (`core-api`) | Groups/Conversations module (membership), Contacts module (blocks) | Every mutating and reading endpoint touching conversation/message data calls the owning module's authorization check before acting; no endpoint infers authorization purely from the JWT beyond identity |
| WebSocket (`realtime-gateway`) | Cached membership snapshot (short TTL, event-invalidated), with synchronous fallback to `core-api` for security-sensitive decisions | See `06-realtime-architecture.md` §3 |
| Background workers | Same module service calls as `core-api` (in-process if colocated, or a private internal API if extracted later) | A worker never assumes an event's presence in the broker implies current authorization — e.g., a notification job re-checks the recipient is still a member before sending, since membership may have changed after the event was produced |
| Media delivery | Media module cross-checks the requester's membership in any conversation that references the asset | `GET /v1/media/{id}/access` is itself an authorized endpoint, not a bare redirect |
| Administration | AdminRole + per-action audit | Every admin action is both role-gated and logged with before/after state |

### 2.3 Authorization Model

- **Role-based** for group administration (`owner`, `admin`, `member` — see
  `03-domain-model.md` §4).
- **Membership-based** (ownership/participation) for conversation and message access — a user can
  read/write in a conversation if and only if they have an active (`leftAt IS NULL`)
  `ConversationMember`/`GroupMember` row.
- **Relationship-based** for contact-sensitive actions — blocking is checked bidirectionally
  before allowing new direct-conversation creation or group invitation, per product policy.
- **Attribute-based** for privacy-gated reads (e.g., presence/last-seen visibility depends on the
  viewed user's `PrivacySetting` and the viewer's relationship to them).

### 2.4 IDOR Prevention

Every resource-scoped endpoint takes the resource ID from the URL and independently verifies the
authenticated caller's relationship to it via the owning module — the API never trusts a
client-supplied `userId`/`conversationId` pairing without that server-side check, and (per
`05-api-architecture.md` §3) returns `404` rather than `403` where existence itself would leak
information.

## 3. Security Boundaries (Summary Table — Full Detail in `01-system-context-and-boundaries.md`)

See `01-system-context-and-boundaries.md` §3 for the complete boundary-by-boundary table. This
section adds security-specific detail not repeated there.

## 4. Threat Model

| Threat | Mitigation |
|---|---|
| Account takeover via credential stuffing | Adaptive-hash credentials, rate limiting, lockout escalation, optional MFA hook (architecturally anticipated, not mandated in this volume), device/session visibility for the user |
| Session/token theft | Short-lived access tokens, refresh-token rotation with reuse detection, TLS everywhere, tokens never logged |
| IDOR | Server-side, per-request authorization re-verification at every boundary (§2.2) |
| Privilege escalation (e.g., member granting themselves admin) | Role-change commands validated against the *caller's* current role server-side, never client-asserted; role hierarchy enforced in the Groups module |
| Unauthorized media access | Signed, short-TTL, single-object URLs only; every access re-authorized (§2.2) |
| Malicious uploads | Content-type/size validation at issuance and post-upload verification; processing pipeline isolated (`media-processor` runs untrusted-input parsing in an isolated worker pool, not in `core-api`'s process) |
| Injection (SQL, NoSQL, command) | Parameterized queries only (ORM-enforced), no dynamic query construction from user input, no shell invocation on user-controlled input in `media-processor` (library-based transcoding, not shelling out to user-influenced CLI arguments) |
| SSRF | Any server-side fetch of a client-supplied URL (none identified as required in this volume's scope) would require an allow-list; no such fetch exists in the current design — flagged for re-evaluation if link-preview functionality is added later |
| XSS | Web client treats all message content as untrusted text (no HTML rendering of message bodies); any rich content (e.g., link previews) is rendered through a sanitized, allow-listed renderer — a client-implementation requirement carried from this architecture |
| CSRF | API is token-bearer-authenticated (`Authorization` header, not cookies) for all cross-origin-capable clients, which inherently avoids classic cookie-based CSRF; if a cookie-based web session is later introduced, `SameSite` + CSRF token requirements must be added in an ADR update |
| Realtime connection abuse (connection flooding) | Per-account and per-IP connection-count limits at the gateway, enforced via Redis counters |
| Spam / message flooding | Per-account and per-conversation send-rate limiting (§`05-api-architecture.md` §8), Moderation domain reporting/restriction hooks |
| Notification abuse | Per-recipient coalescing (`08-media-search-notifications.md` §3.2), provider-level and internal throttling |
| Resource exhaustion (large payloads, pagination abuse) | Server-enforced max page size, max message body length, max attachment count, presigned-upload size limits |
| Secret leakage | Secrets never in source control or logs; secret management via the deployment environment's secret store (specific vendor is an infrastructure-prompt decision); access tokens/refresh tokens/credential hashes excluded from all log sinks by structured-logging field allow-listing (see `11-observability.md`) |

## 5. Privacy Architecture

| Concern | Architectural treatment |
|---|---|
| Profile visibility | `PrivacySetting` per user, enforced server-side on every profile read by a non-owner |
| Presence / last-seen | Enforced server-side in the Realtime Gateway's presence read path (`06-realtime-architecture.md` §6), not just hidden client-side |
| Read receipts | Toggleable per `PrivacySetting.readReceiptsEnabled`; if disabled, the user's `ReadReceipt` writes still occur (for the user's own multi-device sync — see `06-realtime-architecture.md` §8) but are not exposed to other conversation members via the receipts query/fan-out |
| Blocking | Bidirectional enforcement — a block prevents new direct-message conversation creation and is checked before group invitations; existing conversation history is not retroactively hidden unless the user also deletes-for-self |
| Account deletion | Cascading, event-driven anonymization (see `04-database-architecture.md` §9); mechanism defined here, exact redaction policy deferred to a product ADR |
| Message deletion | For-self (per-user tombstone) vs. for-everyone (canonical tombstone) — see `03-domain-model.md` §5.3 |
| Retention | Audit data retained per compliance policy (external, not fixed here); message data retention/archival mechanism defined in `04-database-architecture.md` §9 |
| Analytics | Allow-listed field projection only (`analytics.analytics_event`); raw message bodies are never copied into the analytics store |

### 5.1 Encryption Honesty Statement

- **Transport encryption**: TLS 1.2+ is mandatory on every network hop described in
  `01-system-context-and-boundaries.md`. This is the only encryption property this architecture
  volume currently provides.
- **At-rest encryption**: provided at the infrastructure layer (managed Postgres/object-storage
  encryption-at-rest) — a standard operational control, not an application-level cryptographic
  guarantee.
- **End-to-end encryption is explicitly NOT part of this architecture volume.** Message bodies
  are readable by the backend (necessary for server-side search, moderation, and multi-device
  sync as currently designed). This architecture must not be described, marketed, or documented
  anywhere as providing end-to-end encryption. If E2EE is a future product requirement, it
  requires a dedicated architecture volume covering key management, device key distribution,
  and the resulting incompatibility with server-side search/moderation as currently
  architected — it is not a small addition to this design and is called out here explicitly so no
  later implementation prompt mistakenly assumes it.
