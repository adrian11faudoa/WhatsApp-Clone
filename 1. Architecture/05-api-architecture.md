# 05 — API Architecture

## 1. Conventions

- **Base path**: `https://api.<domain>/v1/...` — major version in the URL path.
- **Transport**: HTTPS only, JSON request/response bodies (`Content-Type: application/json`),
  except upload-initiation responses which return signed-URL metadata (still JSON).
- **Resource naming**: plural nouns, nested under parent where ownership is hierarchical:
  `/v1/conversations/{conversationId}/messages`, `/v1/conversations/{conversationId}/members`.
- **HTTP methods**: `GET` (read, safe/idempotent), `POST` (create / non-idempotent action —
  unless an `Idempotency-Key` header is supplied, see below), `PATCH` (partial update), `DELETE`
  (remove/soft-delete per resource semantics). `PUT` is not used (no full-replace semantics in
  this domain model).

## 2. API Versioning Strategy

- Path-based major versioning (`/v1`, `/v2`). A new major version is introduced only for
  breaking changes.
- Additive changes (new optional fields, new endpoints) do not require a version bump.
- Deprecation: a deprecated endpoint/version returns `Deprecation` and `Sunset` HTTP headers
  (RFC 8594) for at least one documented deprecation window before removal.
- Realtime event versioning is independent of REST API versioning (see
  `06-realtime-architecture.md` §4).

## 3. Standardized Error Model

Every error response uses the same envelope:

```json
{
  "error": {
    "code": "CONVERSATION_NOT_FOUND",
    "message": "The requested conversation does not exist or you do not have access to it.",
    "correlationId": "b3a1c2e0-....",
    "details": [
      { "field": "conversationId", "issue": "not_found_or_unauthorized" }
    ]
  }
}
```

| Field | Rule |
|---|---|
| `error.code` | Stable, machine-readable, `SCREAMING_SNAKE_CASE`, namespaced conceptually by domain (`AUTH_*`, `CONVERSATION_*`, `MESSAGE_*`, `MEDIA_*`, `RATE_LIMIT_*`) |
| `error.message` | Human-readable, safe to display, never contains stack traces or internal identifiers beyond what the client already knows |
| `error.correlationId` | Always present; matches the `X-Correlation-Id` response header and the value propagated through logs/traces |
| `error.details` | Optional, structured, used for validation errors |

**Authorization-failure ambiguity is intentional**: for resources where existence itself is
sensitive (e.g., a conversation the requester is not a member of), the API returns `404` rather
than `403`, using a code like `CONVERSATION_NOT_FOUND` — this prevents resource-enumeration via
status-code side channels. Endpoints where existence is not sensitive use `403 FORBIDDEN` with a
specific code (e.g., `INSUFFICIENT_ROLE`).

### Standard HTTP Status Mapping

| Status | Usage |
|---|---|
| 200 | Successful read or idempotent-retried write (see idempotency below) |
| 201 | Successful creation |
| 202 | Accepted for async processing (e.g., media processing kicked off) |
| 204 | Successful action with no body (e.g., delete) |
| 400 | Validation failure |
| 401 | Missing/invalid/expired authentication |
| 403 | Authenticated but authorization denied, and existence is not sensitive |
| 404 | Not found, or authorization denied where existence is sensitive |
| 409 | Conflict (e.g., concurrent membership mutation conflict) |
| 422 | Semantically invalid request that passes schema validation (e.g., replying to a message in a different conversation) |
| 429 | Rate limited (`Retry-After` header set) |
| 500 | Unexpected server error |
| 503 | Dependency unavailable, request could not be safely completed (e.g., database unreachable) |

## 4. Pagination Convention

All list endpoints use **cursor (keyset) pagination**:

Request: `GET /v1/conversations/{id}/messages?limit=50&cursor=<opaque>`

Response:
```json
{
  "data": [ /* items, newest-first unless documented otherwise */ ],
  "pageInfo": {
    "nextCursor": "eyJzZXJ2ZXJBY2NlcHRlZEF0IjoiMjAyNi0wOS0xNlQxNDozMjowNy4xMjNaIiwiaWQiOiIuLi4ifQ",
    "hasMore": true
  }
}
```

The cursor is an opaque, server-encoded token (base64 of `{serverAcceptedAt, id}` or equivalent
keyset position) — clients must not construct or parse it. `limit` has a server-enforced maximum
(architectural default: 100) to bound query cost. `OFFSET`-based pagination is not supported on
any endpoint backed by a high-volume table.

## 5. Filtering and Sorting

Filtering uses explicit query parameters per endpoint (no generic query language), e.g.
`?type=group`, `?status=open`. Sorting is fixed per endpoint to the index-backed order (e.g.,
conversation history is always `server_accepted_at DESC`) unless an endpoint explicitly documents
a `sort` parameter backed by a supporting index — arbitrary client-specified sort on unindexed
columns is not permitted.

## 6. Idempotency

- All unsafe endpoints that create durable state accept an optional `Idempotency-Key` header
  (client UUID). If a request with the same key + same authenticated user + same endpoint is
  received again within 24 hours, the server returns the original response (same status code and
  body) without re-executing the operation.
- `POST /v1/conversations/{id}/messages` additionally uses `clientMessageId` **in the request
  body** as a domain-specific, permanent idempotency key (see `03-domain-model.md` §5.2) — this is
  distinct from and in addition to the generic `Idempotency-Key` header mechanism.

## 7. Authentication and Authorization on Every Endpoint

- `Authorization: Bearer <access-token>` (JWT) required on all endpoints except
  `POST /v1/auth/register`, `POST /v1/auth/login`, `POST /v1/auth/refresh`,
  `POST /v1/auth/password-reset/*`.
- Every endpoint's handler runs an explicit authorization check against authoritative
  server-side state (module service call) before touching the requested resource — never
  inferred from the token alone beyond identity.

## 8. Rate Limiting

- Enforced at the edge (Redis-backed token bucket, keyed by `userId` + endpoint category, with a
  secondary IP-based limit for unauthenticated endpoints).
- Response headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.
- `429` responses include `Retry-After`.
- Categories with distinct limits: authentication endpoints (strict), message send (moderate,
  per-conversation and per-account), media upload initiation (moderate), general reads (generous).

## 9. Correlation and Tracing

- Every request either supplies or receives a generated `X-Correlation-Id` header, echoed in the
  response and in the error envelope.
- `traceparent` (W3C Trace Context) is propagated end-to-end from edge → `core-api` → any
  synchronous internal calls, and injected into published events (see
  `07-events-and-queues.md` §2) so a trace can be followed from HTTP request through to
  asynchronous side effects.

## 10. Representative Contract Shapes

### 10.1 `POST /v1/conversations/{conversationId}/messages`

Request:
```json
{
  "clientMessageId": "b6b0e6c2-6b0e-4e2a-9b0a-7e2b1e6c2d3f",
  "type": "text",
  "body": "hey, are we still on for tomorrow?",
  "replyToMessageId": null,
  "attachments": [],
  "clientComposedAt": "2026-09-16T14:31:55.000Z"
}
```

Response `201 Created`:
```json
{
  "data": {
    "id": "018f3b2a-....",
    "conversationId": "018f3a10-....",
    "clientMessageId": "b6b0e6c2-6b0e-4e2a-9b0a-7e2b1e6c2d3f",
    "senderId": "018f2c00-....",
    "senderDeviceId": "018f2c01-....",
    "type": "text",
    "body": "hey, are we still on for tomorrow?",
    "replyToMessageId": null,
    "clientComposedAt": "2026-09-16T14:31:55.000Z",
    "serverAcceptedAt": "2026-09-16T14:31:56.412Z",
    "editedAt": null,
    "deletedAt": null
  }
}
```
Retried with the same `clientMessageId` → `200 OK` with the same body, no duplicate created.

### 10.2 `GET /v1/conversations/{conversationId}/messages?limit=50&cursor=...`

Response `200 OK`:
```json
{
  "data": [ { "id": "...", "type": "text", "body": "...", "serverAcceptedAt": "..." } ],
  "pageInfo": { "nextCursor": "...", "hasMore": true }
}
```

### 10.3 `POST /v1/media/uploads`

Request:
```json
{ "contentType": "image/jpeg", "sizeBytes": 2456123 }
```
Response `201 Created`:
```json
{
  "data": {
    "mediaAssetId": "018f3c00-....",
    "uploadUrl": "https://storage.example.com/....?X-Amz-Signature=....",
    "uploadMethod": "PUT",
    "expiresAt": "2026-09-16T14:46:56.000Z"
  }
}
```
Client uploads bytes directly to `uploadUrl`, then calls
`POST /v1/media/{mediaAssetId}/complete` to trigger processing (see
`08-media-search-notifications.md`).

### 10.4 `POST /v1/conversations/{conversationId}/members`

Request:
```json
{ "userIds": ["018f2c00-...."] }
```
Response `200 OK` with updated member list, or `403 INSUFFICIENT_ROLE` if the caller is not an
owner/admin, or `422 MEMBER_BLOCKED` if a target user has blocked the inviter (policy-dependent).

### 10.5 Standard Error Example

`404 Not Found`:
```json
{
  "error": {
    "code": "CONVERSATION_NOT_FOUND",
    "message": "The requested conversation does not exist or you do not have access to it.",
    "correlationId": "b3a1c2e0-...."
  }
}
```

## 11. Client Compatibility Rule

No client (web, mobile, admin) may invent a backend contract not defined here or in a later
implementation prompt that extends this document set. All three clients consume the same
`core-api` REST contract and the same realtime event envelope — there is no client-specific
backend behavior.
