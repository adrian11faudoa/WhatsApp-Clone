# 11 — Observability Architecture

## 1. Pillars

- **Structured logging** — JSON logs, one event per log line, consistent field schema across all
  services.
- **Metrics** — OpenTelemetry metrics exported to a Prometheus-compatible backend.
- **Distributed tracing** — OpenTelemetry traces, W3C Trace Context propagated across every
  boundary described in `01-system-context-and-boundaries.md`.
- **Health/readiness/liveness checks** — standard per-service HTTP endpoints for orchestration.

## 2. Correlation Requirements

Every log line, metric label set (where cardinality-appropriate), and trace span carries, where
applicable:

- `correlationId` (propagated end-to-end from the originating client request or scheduled job)
- `traceId` / `spanId` (W3C Trace Context)
- `eventId` (for anything processing a domain event)
- `userId` (where the operation is user-scoped — subject to the logging exclusions in §5)
- `requestId` (per-HTTP-request, distinct from `correlationId` if a single correlation spans
  multiple requests, e.g., upload-then-complete)

This is what allows a single logical operation — e.g., "user sends a message" — to be traced from
the HTTP request, through the outbox write, through broker publication, through
`realtime-gateway` fan-out, through notification delivery — as one connected story across four
independently deployed processes.

## 3. Minimum Instrumentation Per Component

| Component | Required metrics | Required traces | Required health checks |
|---|---|---|---|
| `core-api` | Request rate/latency/error-rate per route, DB pool utilization, outbox backlog depth per schema | Span per request, child spans for DB calls and outbox writes | `/health/liveness`, `/health/readiness` (checks DB connectivity) |
| `realtime-gateway` | Active connection count, connect/disconnect rate, fan-out latency (event-publish-time to client-delivery-time), backpressure-drop count, authz-cache hit rate | Span from broker-consume to client-delivery | `/health/liveness`, `/health/readiness` (checks Redis + broker connectivity) |
| `workers` (per queue) | Queue depth, job processing latency, retry count, dead-letter count, consumer lag | Span per job execution, linked to originating `correlationId`/`traceId` from the event | `/health/liveness`, `/health/readiness` (checks broker/queue connectivity) |
| `media-processor` | Processing duration per media type, failure rate, queue depth | Span per processing job | Same pattern |
| PostgreSQL | Connection count, replication lag (replica), slow-query rate, lock wait time | N/A (infra-level) | Managed-provider health signals |
| Redis | Memory usage, eviction rate, command latency, connected clients | N/A | Managed-provider health signals |
| Broker | Consumer lag per group, partition count, under-replicated partition count | N/A | Managed-provider health signals |

## 4. Business Metrics (Product-Relevant, Not Just Infra)

- Messages sent/delivered/read per minute (aggregate, not per-user-identifiable in the metrics
  system).
- Realtime delivery latency distribution (publish → client ack).
- Notification delivery success rate per provider.
- Search index staleness (event-publish-time to index-visible-time).
- Media processing success rate and duration distribution per media type.

These are aggregate/statistical metrics, never per-message-content, and are exported with
cardinality-safe labels (no raw `userId`/`messageId` as metric labels — those belong in
traces/logs with proper access control, not in a high-cardinality metrics backend).

## 5. Privacy-Safe Logging Requirements

**Never logged, in any component, at any log level**:

- Passwords, credential hashes, access tokens, refresh tokens, API keys/secrets, signed-URL
  signatures in full (log the object key, not the full signed URL with its signature parameter).
- Message body content, except at a `debug` level that is disabled by default in production and
  gated behind an explicit, audited break-glass configuration for incident response — and even
  then, redacted/truncated wherever feasible.
- Full credential/PII fields beyond what's operationally necessary — e.g., log `userId`, not
  email/phone, in general operational logs.

**Field allow-listing** is enforced at the logging-library configuration level (a shared logging
package used by `core-api`, `realtime-gateway`, and `workers`) so individual call sites cannot
accidentally log a full request/response object containing sensitive fields — this is a structural
control, not solely a code-review convention.

## 6. Alerting (Architectural Expectations, Not a Specific Vendor Configuration)

Alertable conditions this architecture assumes will be configured downstream (exact thresholds
and paging policy are an operational/implementation-prompt decision):

- Outbox backlog depth exceeding a threshold (indicates broker/relay trouble).
- Dead-letter queue depth exceeding a threshold (indicates a systemic job failure, not isolated
  transient errors).
- Consumer lag exceeding a threshold (indicates fan-out/indexing/notification delay building up).
- Error-rate spikes per route.
- Replication lag exceeding a threshold.
- Health-check failures sustained beyond a grace period.

## 7. What This Volume Does Not Provide

This volume does not create actual Grafana dashboards, Prometheus alerting rules, or a specific
OpenTelemetry Collector deployment configuration — those are infrastructure-implementation-prompt
deliverables. It defines what must be observable and why, so that later work has an unambiguous
target.
