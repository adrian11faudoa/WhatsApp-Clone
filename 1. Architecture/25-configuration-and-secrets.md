# 25 — Configuration Architecture and Secret Management

## 1. Configuration Categories

| Category | Examples | Where it lives | Who can read it |
|---|---|---|---|
| Public build configuration | Web client's public API base URL, feature-flag defaults visible client-side, app version | Baked into the client build or served from a public, unauthenticated config endpoint | Anyone (it is, by definition, exposed to the client) |
| Server configuration (non-secret) | Rate-limit thresholds, edit window duration, media size limits, pagination page-size caps, cache TTLs | Environment variables / a config service, loaded at process startup | `core-api`/`workers`/`realtime-gateway` processes; visible to operators via deployment tooling |
| Secret configuration | Database credentials, Redis AUTH, broker SASL credentials, JWT signing keys, object-storage IAM credentials, push-provider certificates/keys | Secret manager (vendor is an infrastructure-prompt decision — e.g., a cloud provider's secret manager or Vault-equivalent), injected at runtime, never in environment files committed to source control | Only the specific service process that needs it, via least-privilege secret-access policy |
| Environment-specific configuration | Per-environment database host, broker cluster endpoint, log level | Per-environment config source, same mechanism as server configuration, scoped by environment | Same as server configuration, scoped per environment |
| Feature flags | Gradual rollout toggles, kill switches for a specific subsystem (e.g., disable search temporarily) | A feature-flag service or config table, hot-reloadable without a full redeploy | `core-api`/`workers`/`realtime-gateway`; some flags may be safely exposed to clients (public build config), others are server-only |

## 2. Naming Convention (Fixed, Reaffirmed from Volume 1 `13-...md` §9)

`SCREAMING_SNAKE_CASE`, component-prefixed where ambiguity is possible:

```
CORE_API_DATABASE_URL
CORE_API_REDIS_URL
REALTIME_GATEWAY_REDIS_URL
REALTIME_GATEWAY_BROKER_BROKERS
WORKERS_BROKER_CONSUMER_GROUP
MESSAGING_EDIT_WINDOW_SECONDS
MESSAGING_DELETE_WINDOW_SECONDS
MEDIA_MAX_UPLOAD_SIZE_BYTES_IMAGE
MEDIA_MAX_UPLOAD_SIZE_BYTES_VIDEO
MEDIA_ACCOUNT_STORAGE_QUOTA_BYTES
NOTIFICATIONS_QUIET_HOURS_DEFAULT_START
NOTIFICATIONS_COALESCE_WINDOW_SECONDS
AUTH_ACCESS_TOKEN_TTL_SECONDS
AUTH_REFRESH_TOKEN_TTL_SECONDS
RATE_LIMIT_LOGIN_MAX_ATTEMPTS_PER_WINDOW
```

## 3. Validation — Fail Fast

Every service validates its complete required configuration set at startup (before accepting any
traffic/beginning any consumer loop) using a schema-validated configuration-loading layer (shared
across `core-api`/`workers`/`realtime-gateway`, mirroring the shared-schema-package pattern from
`22-...md` §3). A missing required value or a value failing its type/range validation causes the
process to exit immediately with a clear, specific error identifying exactly which configuration
key is invalid/missing — never a delayed failure discovered only when that config value is first
used mid-request.

## 4. Configuration Never Committed to Source Control

- `.env`-style files used for local development are `.gitignore`d; a checked-in `.env.example`
  documents required keys with placeholder (non-functional) values only.
- CI pipelines inject secrets via the CI platform's own secret store (e.g., GitHub Actions
  encrypted secrets), never via a committed file.
- No architecture document (including this one) ever contains an actual secret value — this
  document set defines *names* and *categories*, never values, per the master prompt's explicit
  prohibition.

## 5. Secret Management Model

### 5.1 Per-Environment Secret Scope

| Environment | Secret source | Access scope |
|---|---|---|
| Local | Developer's own local `.env` (gitignored), pointing at local/dev-only resources (never production credentials) | Individual developer machine |
| CI | CI platform's encrypted secret store, scoped to CI-only resources (e.g., a CI-specific test database, never production) | CI pipeline execution context only |
| Staging | Secret manager, staging-scoped secrets, isolated from production secrets entirely (no secret is shared between staging and production) | Staging deployment's service identities only |
| Production | Secret manager, production-scoped secrets | Production deployment's service identities only, least-privilege per service (e.g., `realtime-gateway`'s Redis credential does not grant access to `core-api`'s database credential) |

### 5.2 Rotation

- Database/Redis/broker credentials: rotated on a defined operational cadence (e.g., 90 days) and
  immediately upon suspected compromise; rotation is a zero-downtime operation via dual-credential
  overlap (old credential remains valid until all service instances have picked up the new one,
  then revoked) — an infrastructure-implementation-prompt deliverable, architecturally required
  here as a capability the secret-management model must support, not optional.
- JWT signing keys: supports key rotation via a `kid` (key ID) claim in issued JWTs, with the
  verification side maintaining a small set of currently-valid public keys (current + previous)
  so a rotation does not immediately invalidate all outstanding access tokens (which are
  short-lived anyway, bounding the overlap window needed to at most one access-token TTL).
- Push-provider certificates/keys: rotated per the provider's own expiry cadence, with monitoring
  (Volume 1 `11-...md` §6) alerting well before expiry to avoid a surprise outage.

### 5.3 Access Control and Auditing

- Secret access is itself logged by the secret-management platform (not by this application's own
  audit log, which is for application-domain actions — secret-access auditing is an
  infrastructure-layer concern using the secret manager's native audit capability).
- Human access to production secrets is minimized (service identities read secrets at runtime;
  humans access the secret manager's UI/CLI only for emergency/rotation operations, itself gated
  by the organization's own access-control policy, external to this architecture).

### 5.4 Disaster Recovery for Secrets

Secret manager itself must have its own backup/recovery capability (typically provided natively by
the managed secret-management service); this architecture requires that a full regional/service
recovery plan (`27-...md`) include "can all required secrets be retrieved/re-provisioned during
recovery" as an explicit checklist item, not an afterthought discovered during an actual incident.

## 6. What This Document Does Not Provide

No actual secret values, no specific secret-manager vendor selection, no specific CI platform
configuration file. Those are infrastructure-implementation-prompt deliverables built against the
categories, naming convention, and capabilities required here.
