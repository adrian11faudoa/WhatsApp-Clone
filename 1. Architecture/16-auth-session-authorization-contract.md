# 16 — Authentication & Session Contract, Authorization Contract, Group Authorization Model

## 1. Authentication and Session Contract

### 1.1 Registration

`POST /v1/auth/register` — creates `User` (status `active`) + `Credential`. Returns no session by
itself in the strict architecture (registration and login are separate steps) unless the product
decision is to auto-login post-registration, in which case the response includes the same session
payload as §1.3. This choice is implementation-local; the contract below supports either.

### 1.2 Credential Verification

- Credentials are verified against `Credential.secretHash` using the adaptive hash function
  (Volume 1 `09-...md` §1.1).
- Failed verification returns a **generic** `401 AUTH_INVALID_CREDENTIALS` regardless of whether
  the identifier or the secret was wrong — no distinguishing signal is given.
- Verification failures increment a Redis-backed failure counter keyed by `(identifier, IP)`;
  exceeding a threshold triggers escalating lockout (`429 RATE_LIMIT_EXCEEDED` with a longer
  `Retry-After`) — see `24-audit-administration-abuse-threat.md` §3.

### 1.3 Session Issuance

`POST /v1/auth/login`:

Request:
```json
{ "identifier": "user@example.com", "secret": "...", "deviceId": "b1a2-....", "platform": "ios" }
```
Response `200 OK`:
```json
{
  "data": {
    "accessToken": "eyJhbGciOi....",
    "accessTokenExpiresAt": "2026-09-16T14:46:56.000Z",
    "refreshToken": "opaque-token-value",
    "refreshTokenExpiresAt": "2026-10-16T14:31:56.000Z",
    "sessionId": "018f2c01-....",
    "userId": "018f2c00-...."
  }
}
```

| Property | Value |
|---|---|
| Access token format | JWT, asymmetric signature (RS256 or EdDSA) |
| Access token lifetime | 15 minutes (architectural default; exact value is implementation-configurable but must remain "short," i.e., not hours) |
| Access token claims | `sub` (userId), `deviceId`, `sessionId`, `iat`, `exp`, `jti` (unique per token, for revocation-list defense-in-depth if ever needed) |
| Refresh token format | Opaque random value (not a JWT — no client-decodable structure) |
| Refresh token storage | Server stores only `refreshTokenHash` (same adaptive-hash family as credentials, or a fast cryptographic hash since the token itself is high-entropy and not user-chosen — HMAC-SHA256 is acceptable here specifically because the input is already high-entropy, unlike passwords) |
| Refresh token lifetime | 30 days (architectural default), sliding (extended on successful use, up to an absolute maximum session age, e.g., 90 days, after which re-authentication with credentials is required regardless of activity) |

### 1.4 Refresh Rotation and Reuse Detection

`POST /v1/auth/refresh`:

Request: `{ "refreshToken": "opaque-token-value" }`
Response: same shape as login (new `accessToken` + **new** `refreshToken`; the old refresh token
is immediately invalidated).

**Reuse detection**: each `Session` row tracks the current valid `refreshTokenHash` and a
`previousRefreshTokenHash` (or a lineage table). If a refresh request presents a token matching
`previousRefreshTokenHash` (i.e., an already-rotated-away token), this is treated as a signal of
possible token theft: the **entire session lineage is revoked** (`Session.revokedAt` set,
`session.revoked` event emitted, `realtime-gateway` force-disconnects), and the response is
`401 AUTH_TOKEN_REUSE_DETECTED`. The legitimate device must re-authenticate with credentials.

### 1.5 Logout / Revocation

`POST /v1/auth/logout` (current session) and `DELETE /v1/sessions/{sessionId}` (revoke a specific
other session, or `DELETE /v1/sessions` to revoke all except current — "log out other devices").
Both set `revokedAt`, emit `session.revoked`, and are audited.

### 1.6 Device Registration

`POST /v1/devices` (idempotent by `deviceId` — re-registering an already-known device updates
`lastSeenAt`/`pushToken` rather than erroring). Device registration is a prerequisite to login
issuing a session tied to that device (login implicitly upserts the device record if not already
registered, since a device is a stable client-generated identity that predates any session).

### 1.7 Session Listing and Forced Logout

`GET /v1/sessions` — returns the caller's own active sessions with device metadata (platform,
`firstSeenAt`, `lastSeenAt`, approximate last-known network context if captured) so a user can
recognize and revoke a session they don't trust. No session ever exposes its refresh token value
or hash in this listing.

### 1.8 Account Recovery

`POST /v1/auth/password-reset/request` → issues a single-use, short-lived (e.g., 30 minute)
recovery token, delivered out-of-band (email/SMS — provider mechanism is an implementation-prompt
decision). `POST /v1/auth/password-reset/confirm` consumes the token, updates `Credential`,
revokes **all** existing sessions for that account (a credential reset is always treated as a
potential compromise-recovery event), and is audited. Recovery endpoints share the same
rate-limiting/lockout protections as login (§1.2).

### 1.9 Web vs. Mobile Storage Requirements

| Client | Access token storage | Refresh token storage |
|---|---|---|
| Web | In-memory (JS variable/state), never `localStorage`/`sessionStorage` (XSS exposure) | HttpOnly, Secure, `SameSite=Strict` cookie scoped to the refresh endpoint's path only — **not** JavaScript-accessible; this is the one deliberate exception to "no cookies for API auth" (Volume 1 `09-...md` §4), justified specifically because the refresh token is long-lived and must not be reachable by any XSS payload, whereas the short-lived bearer access token's exposure window is small enough to accept in-memory JS storage |
| Mobile (iOS/Android) | Secure enclave / Keychain / Keystore-backed secure storage | Same secure storage mechanism as the access token |

Refresh tokens are never placed in a URL (query string or path) under any circumstance.

### 1.10 Suspicious Session Handling

A `session.created` event carries device/platform/approximate-network-context metadata as inputs
to future automated anomaly detection (Volume 1 `09-...md` §1.3); this volume does not mandate a
specific detection algorithm, only that the event carries sufficient metadata for one to be built
without a schema change later.

## 2. Authorization Contract

### 2.1 Canonical Roles

| Role scope | Roles | Precedence |
|---|---|---|
| Group conversation | `owner` > `admin` > `member` | Higher role is a strict superset of lower-role permissions within that conversation |
| Platform-wide | `platform_administrator` > `moderator` > (no special role / ordinary user) | Platform roles are **orthogonal** to group roles — a `platform_administrator` does not automatically become a group `owner`; platform-level actions (e.g., force-remove a member for policy violation) go through Administration-module-specific endpoints that check the platform role, not the group role |

### 2.2 Permission Matrix (Representative, Not Exhaustive)

| Action | member | admin | owner | moderator | platform_administrator |
|---|---|---|---|---|---|
| Send message | ✔ | ✔ | ✔ | — (not a group member unless separately added) | — |
| Edit own message | ✔ (within edit window) | ✔ | ✔ | — | — |
| Delete own message (for-everyone) | ✔ (within window) | ✔ | ✔ | — | — |
| Delete others' message (for-everyone) | ✘ | ✔ (group-scoped moderation) | ✔ | ✔ (platform-scoped, via Administration endpoint, audited) | ✔ |
| Add member | ✘ (unless group setting allows) | ✔ | ✔ | — | — |
| Remove member | ✘ | ✔ (cannot remove an `owner`) | ✔ | — | ✔ (platform-scoped restriction, not ordinary removal) | 
| Change member role | ✘ | ✔ (cannot promote to/demote from `owner`) | ✔ | — | — |
| Transfer ownership | ✘ | ✘ | ✔ (to another existing `admin`/`member`, who becomes `owner`; the transferring `owner` becomes `admin`) | — | — |
| Update group metadata | ✘ (unless group setting allows) | ✔ | ✔ | — | — |
| Delete group | ✘ | ✘ | ✔ | — | ✔ (platform-scoped, audited) |
| View audit log for a group | ✘ | ✔ (own group's audit slice) | ✔ | ✔ | ✔ |
| Apply account restriction | — | — | — | ✔ | ✔ |
| Assign platform roles | — | — | — | ✘ | ✔ |

### 2.3 Resource-Specific Ownership Checks (Roles Alone Are Insufficient)

Per the master prompt's explicit requirement, role names alone never substitute for a
resource-specific ownership check:

- "Edit own message": the check is not merely "is this user a `member`" but "is
  `message.senderId == requester.userId`," evaluated server-side on every request, independent of
  role.
- "Access media": the check is not "is this user authenticated" but "is this user a current
  member of a conversation that references this specific `mediaAssetId` via a
  `MessageAttachment`" (Volume 1 `08-...md` §1.2, `20-media-contract.md` §3).
- "View a specific message": membership in `message.conversationId`, re-checked at query time,
  not cached role alone.

## 3. Group Authorization Model

### 3.1 Group Creation

Any authenticated, non-restricted user may create a group; the creator becomes `owner`. Initial
members (if supplied at creation) are added atomically in the same transaction (Volume 1
`04-...md` §6), each starting as `member` unless the creator explicitly assigns a different role
in the creation payload (still capped — a creator cannot assign another user `owner` at creation
time in the same request that establishes their own ownership, to avoid ownership ambiguity at
creation; ownership transfer is a separate, explicit, single-owner-at-a-time operation, §3.5).

### 3.2 Member Invitation

`admin`/`owner` only, unless a group setting (`ConversationSettings.membersCanInvite: boolean`)
explicitly relaxes this to `member`. Invitation is blocked (`422 CONTACT_BLOCKED`) if the target
has blocked the inviter, or per product policy, if the inviter has blocked the target.

### 3.3 Member Removal

`admin`/`owner` may remove a `member`. An `admin` may not remove another `admin` or the `owner`
(prevents lateral admin-vs-admin conflict without owner involvement). Only the `owner` may remove
an `admin`. A user may always remove themselves (`leave group`), with the exception in §3.4.

### 3.4 The Last-Owner Constraint

A group must always have exactly one `owner` (never zero). If the sole `owner` attempts to leave
or be demoted, the operation fails with `422 GROUP_LAST_OWNER_CANNOT_LEAVE` unless performed as
part of an explicit ownership-transfer operation (§3.5) in the same request/transaction.

### 3.5 Ownership Transfer

A dedicated command, `TransferOwnership(conversationId, newOwnerUserId)`, callable only by the
current `owner`, atomically: sets `newOwnerUserId`'s role to `owner`, sets the calling user's role
to `admin`, in one transaction. This is the only path that changes who holds `owner`.

### 3.6 Role Changes — Race Condition Behavior

Per the master prompt's explicit requirement: concurrent membership mutations (e.g., two admins
simultaneously changing the same member's role, or one admin removing a member while another
promotes them) are serialized via the advisory-lock-on-`conversationId` mechanism defined in
Volume 1 `04-...md` §7. The transaction that acquires the lock second re-reads current state
before applying its change; if the precondition it assumed (e.g., "this user is currently
`member`") no longer holds, it fails with `409 GROUP_MEMBERSHIP_CONFLICT` rather than silently
overwriting the first transaction's effect. Clients receiving this conflict re-fetch current
membership state and may retry with updated intent.

### 3.7 Group Metadata Changes

`admin`/`owner` only, unless relaxed by `ConversationSettings.metadataEditableByMembers`. Every
metadata change emits `group.metadata_updated` and is available in the group's audit slice
(visible per §2.2's audit-log-view permissions).

### 3.8 Group Deletion

`owner` only (or platform-administrator via an audited Administration-module endpoint). Deletion
is modeled as `Conversation.archivedAt` (soft, per Volume 1's `ArchiveConversation` command) by
default; a genuinely irreversible hard-delete is a distinct, more restrictive operation not
exposed to ordinary owners in this volume's scope (avoids irreversible data loss from a single
click without a confirmation/administrative-review layer, which is a product-level UX decision
built on top of this architectural distinction).

### 3.9 Administrative Audit

Every action in §3.2–3.8 emits the corresponding domain event (Volume 1 `07-...md` §3) which the
Audit module consumes; every audit entry records actor, action, target, before/after role values
where applicable, and `correlationId`.
