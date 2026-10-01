# Messaging Platform — Backend (Volume 1: Foundation)

Foundational backend for the WhatsApp-style messaging platform: accounts,
authentication, devices, sessions, conversations (direct + group), and
conversation membership. This is **Backend Volume 1** — message
send/delivery, realtime transport, media, notifications, search, and
moderation are explicitly out of scope and left for later milestones (see
"Future compatibility" below).

## Architecture at a glance

- **Runtime**: NestJS + TypeScript
- **Database**: PostgreSQL via **Drizzle ORM** (see "Why Drizzle, not
  Prisma" below) + `pg`
- **Cache / rate limiting**: Redis via `ioredis`
- **Auth**: argon2id password hashing, short-lived signed JWT access
  tokens, long-lived opaque (hashed-at-rest) refresh tokens with rotation
- **Validation**: `class-validator` / `class-transformer` DTOs, global
  `ValidationPipe`
- **Docs**: OpenAPI/Swagger, served at `/api/v1/docs` outside production
- **Observability**: structured JSON logs, request correlation IDs,
  liveness/readiness health checks

### Why Drizzle, not Prisma

The master prompt names Prisma as the default, with an explicit
allowance for "an equivalent strongly typed data-access layer." In the
sandbox this was built in, Prisma's query/schema engine binaries are
fetched from `binaries.prisma.sh` at `prisma generate` time, and that
host is not reachable from the environment's network allowlist (only
package registries and a few source hosts are reachable). Drizzle ORM
ships as pure JavaScript/TypeScript over the standard `pg` driver, so it
installs and runs entirely from the npm registry. If Prisma is genuinely
required for this project, swapping back is a contained change scoped to
`src/database/` and `drizzle.config.ts` — the rest of the codebase talks
to the database only through the `Database` type exported from
`src/database/database.module.ts`.

## Project layout

```
src/
  main.ts                  Application bootstrap (helmet, CORS, Swagger, shutdown)
  app.module.ts             Root module wiring
  config/                   Typed, Joi-validated environment configuration
  database/                 Drizzle schema, connection lifecycle, migration/seed scripts
  redis/                    Shared Redis client (rate limiting today; presence/coordination later)
  common/                   Cross-cutting concerns: errors, filters, interceptors,
                             middleware, decorators, pagination, audit log, throttler guard
  auth/                     Register/login/refresh/logout, password + token services, JWT strategy/guard
  users/                    Current-user profile + public profile lookup
  devices/                  Device listing/revocation
  sessions/                 Session listing/revocation
  conversations/            Direct + group conversation foundation, membership, roles
test/
  *.e2e-spec.ts              Integration tests against a real Postgres + Redis
drizzle/                    Generated SQL migrations (source of truth for schema changes)
```

## Prerequisites

- Node.js 20+
- PostgreSQL 14+ (tested against 16)
- Redis 6+

## Setup

```bash
npm install
cp .env.example .env        # then fill in real secrets — see below
npm run db:migrate          # applies drizzle/*.sql to DATABASE_URL
npm run db:seed             # optional: seeds 3 dev users + a direct + group conversation
npm run start:dev
```

`npm run db:seed` creates `alice@example.dev`, `bob@example.dev`,
`carol@example.dev`, all with password `dev-seed-password-only`. It
refuses to run when `NODE_ENV=production`.

### Required environment variables

See `.env.example` for the full, commented list. The application
validates all of these at startup (`src/config/env.validation.ts`) and
**refuses to start** if required variables are missing or malformed, or
if `NODE_ENV=production` with a placeholder JWT secret still in place.

Key variables:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` | Must each be ≥32 chars, and must differ |
| `CORS_ORIGINS` | Comma-separated allowed origins |

## Running tests

```bash
npm test              # unit tests (pure logic: password hashing, tokens, pagination, throttler tracking)
npm run test:e2e       # integration tests against a real Postgres + Redis (messaging_test DB)
```

`test:e2e` reads `.env.test`, which should point `DATABASE_URL` at a
**separate** test database (never the dev/prod one — tests truncate all
application tables between runs). Rate limiting is automatically
disabled when `NODE_ENV=test` (see `AppThrottlerGuard.shouldSkip`) since
integration tests intentionally exercise auth endpoints many times in
quick succession; this does not affect production/development behavior,
which is covered separately by unit tests on the guard's tracking logic.

What's covered:

- **Auth**: registration (incl. duplicate email/username, password
  policy, no password hash ever returned), login (incl. uniform
  invalid-credentials response for both "wrong password" and "unknown
  email"), refresh-token rotation + invalidation of the rotated-away
  token, logout revoking the session, rejection of missing/malformed
  bearer tokens.
- **Conversations**: direct-conversation creation, idempotency,
  symmetry (either participant can initiate), **correctness under 8
  concurrent duplicate-creation requests** (asserts exactly one row is
  ever created), self-conversation rejection, unknown-user rejection,
  **IDOR protection** (a non-member gets 404, indistinguishable from a
  nonexistent conversation), pagination bounds.
  Groups: creator becomes OWNER, only OWNER/ADMIN can remove members,
  the OWNER cannot be removed, only the OWNER can change roles, members
  can leave voluntarily and lose access afterward.

## API surface (this milestone)

All routes are under `/api/v1` (except `/health/live` and
`/health/ready`, which are excluded from the prefix for orchestrator
convenience).

```
POST   /auth/register
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout               (auth required)
POST   /auth/logout-all           (auth required)

GET    /users/me                  (auth required)
PATCH  /users/me                  (auth required)
GET    /users/:userId             (auth required — public profile view)

GET    /devices                   (auth required)
DELETE /devices/:deviceId         (auth required)

GET    /sessions                  (auth required)
DELETE /sessions/:sessionId       (auth required)

GET    /conversations                              (auth required, cursor-paginated)
POST   /conversations/direct                        (auth required)
POST   /conversations/groups                         (auth required)
GET    /conversations/:conversationId                (auth required)
GET    /conversations/:conversationId/members         (auth required)
DELETE /conversations/:conversationId/members/me       (auth required — leave)
DELETE /conversations/:conversationId/members/:userId  (auth required — OWNER/ADMIN only)
PATCH  /conversations/:conversationId/members/:userId/role  (auth required — OWNER only)

GET    /health/live
GET    /health/ready
```

Full request/response schemas: run the app and open `/api/v1/docs`
(Swagger UI; disabled when `NODE_ENV=production`).

### Error shape

Every error response — validation failures, domain errors, and
unexpected exceptions alike — has the same shape:

```json
{
  "error": {
    "code": "EMAIL_ALREADY_REGISTERED",
    "message": "An account with this email already exists.",
    "details": { "...": "optional" },
    "retryable": false,
    "requestId": "...",
    "timestamp": "...",
    "path": "/api/v1/auth/register"
  }
}
```

Stable codes are enumerated in `src/common/errors/app-error-codes.ts`.

## Security notes

- Passwords are hashed with **argon2id** (`src/auth/password.service.ts`),
  cost parameters configurable via env, never logged.
- Refresh tokens are opaque random values; only their **SHA-256 hash**
  is persisted (`sessions.refresh_token_hash`), so a database leak alone
  cannot be replayed. Refresh is **rotating**: each use invalidates the
  presented token and issues a new one on the same session row.
- Access tokens are short-lived (15 min default) signed JWTs, verified
  against **live session state** on every request (`JwtStrategy`) — a
  revoked session or disabled account takes effect immediately rather
  than waiting for the token to expire on its own.
- Login responses are timing-equalized between "unknown email" and
  "wrong password" (a dummy hash verification always runs) and return
  the identical `INVALID_CREDENTIALS` error code, to resist email
  enumeration.
- Every conversation-scoped endpoint checks active membership before
  reading or mutating; a non-member gets the same `404` as a
  nonexistent conversation, not a `403`, since the alternative leaks
  conversation existence to non-members (IDOR-adjacent).
- Direct-conversation uniqueness is enforced by a **database unique
  index** on a deterministic `direct_key` (sorted pair of user IDs), not
  an application-level precheck — verified safe under 8 concurrent
  requests in `test/conversations.e2e-spec.ts`.
- Rate limiting (`@nestjs/throttler`, Redis-backed storage) applies
  tighter limits to `register`/`login`/`refresh` than the global
  default, dimensioned by authenticated user ID when available and IP
  otherwise.
- Global exception filter never leaks stack traces, SQL, or internal
  topology to clients.
- No secrets are hardcoded anywhere; `.env` is git-ignored;
  `.env.example` documents every variable without real values; startup
  fails if `NODE_ENV=production` and a placeholder JWT secret is still
  set.

## Future compatibility

This schema and API surface are designed so later milestones can add,
without redesigning what exists here:

- **Messaging**: `Conversation` is already the natural parent for a
  future `messages` table; `conversation_members.last_read_at` is
  reserved and unused today, for read receipts / unread counts.
- **Realtime**: `Session`/`Device` already carry the identity needed to
  authorize a WebSocket connection the same way HTTP requests are
  authorized (`JwtStrategy`'s live-session check pattern applies
  directly).
- **Media, notifications, search, moderation**: no schema or API
  decisions here assume these don't exist; they're simply not built
  yet.
- **Audit log**: `audit_events` already records the security-sensitive
  events from this milestone (registration, login, logout, refresh,
  session revocation, group creation, membership changes) in an
  extensible shape a later admin/analytics milestone can query or
  extend.

## What is explicitly NOT in this milestone

Per the Backend Volume 1 scope: message send/delivery, WebSocket
messaging, message receipts/reactions, production presence, media
upload/processing, push notification delivery, search indexing,
moderation workflows, analytics pipelines, Kafka/event-stream
infrastructure, full BullMQ worker infrastructure, Kubernetes/Terraform
deployment, frontend, and mobile apps. None of these have been faked or
stubbed — the endpoints and tables for them simply do not exist yet.
