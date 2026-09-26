# 01 — System Context and Trust Boundaries

## 1. System Context Diagram

```mermaid
flowchart TB
    subgraph Clients["Client Tier (untrusted)"]
        WEB["Web Client (Next.js/React)"]
        MOB["Mobile Client (React Native/Expo)"]
        ADMIN["Admin Console (web)"]
    end

    subgraph Edge["Edge / API Gateway (trust boundary)"]
        LB["Load Balancer / TLS Termination"]
        RATE["Rate Limiter"]
    end

    subgraph AppTier["Application Tier (trusted, private network)"]
        API["core-api (NestJS modular monolith)"]
        RT["realtime-gateway (WebSocket)"]
        WRK["workers (job/event consumers)"]
        MEDIA["media-processor"]
    end

    subgraph Data["Data Tier (trusted, private network, restricted access)"]
        PG[("PostgreSQL - system of record")]
        REDIS[("Redis - cache/ephemeral/presence")]
        BROKER[("Kafka/Redpanda - event backbone")]
        OBJ[("Object Storage - media")]
        SEARCH[("OpenSearch - search index")]
    end

    subgraph External["External Providers (third-party trust boundary)"]
        APNS["APNs / FCM (push)"]
        CDN["CDN"]
        OTEL["Observability backend"]
    end

    WEB -->|HTTPS REST + WSS| LB
    MOB -->|HTTPS REST + WSS| LB
    ADMIN -->|HTTPS REST (elevated authz)| LB

    LB --> RATE --> API
    LB --> RATE --> RT

    API <--> PG
    API <--> REDIS
    API -->|publish domain events| BROKER
    API -->|presigned upload/download URLs| OBJ

    RT <--> REDIS
    RT <--> BROKER
    API <-->|internal RPC/service calls, private network| RT

    BROKER --> WRK
    WRK --> PG
    WRK --> REDIS
    WRK --> SEARCH
    WRK --> APNS
    WRK --> MEDIA
    MEDIA --> OBJ
    MEDIA --> BROKER

    OBJ -.signed URLs.-> CDN
    CDN -.media delivery.-> WEB
    CDN -.media delivery.-> MOB

    API -.telemetry.-> OTEL
    RT -.telemetry.-> OTEL
    WRK -.telemetry.-> OTEL
```

## 2. Actors

| Actor | Description | Trust Level |
|---|---|---|
| End User (Web) | Authenticated user via browser | Untrusted until authenticated; session-scoped trust thereafter |
| End User (Mobile) | Authenticated user via iOS/Android app | Same as above |
| Administrator | Elevated-privilege operator using Admin Console | Authenticated + role-checked; highest client trust level |
| Background system | Workers, media processor | Trusted, private-network only, service-credentialed |
| External provider | APNs/FCM, CDN, observability backend | Semi-trusted; treated as untrusted for inbound data (e.g., webhook payloads must be verified) |

## 3. Trust Boundaries and Controls

| Boundary | Crossing Direction | Authentication | Authorization | Encryption | Validation | Rate Limiting | Audit |
|---|---|---|---|---|---|---|---|
| Public Internet → Edge | Inbound | None yet | N/A | TLS 1.2+ | Schema/size limits at edge | IP + account based | Edge access logs |
| Edge → core-api | Inbound | Access token (JWT) verified per-request | RBAC/ownership check per-endpoint | Private network TLS | DTO validation (class-validator or equivalent) | Per-endpoint + per-account | Structured request logs |
| Edge → realtime-gateway | Inbound (WSS upgrade) | Access token verified at handshake | Per-event authorization on subscribe/publish | Private network TLS | Envelope schema validation | Per-connection + per-account message rate | Connection lifecycle logs |
| core-api → PostgreSQL | Internal | DB credential (least-privilege role per module schema) | Row-level checks in application code; DB grants scoped per module | TLS + at-rest encryption | Parameterized queries only | Connection pool limits | Query audit for admin actions |
| core-api → Redis | Internal | AUTH credential | Namespaced key prefixes per module | TLS (where supported) / private network | N/A (structured values only) | Connection pool limits | N/A (ephemeral) |
| core-api/workers → Broker | Internal | SASL credential | Topic ACLs per producer/consumer | TLS | Event schema validation | Producer quotas | Broker audit logs |
| core-api → Object Storage | Internal (presigned URL issuance only) | IAM role, least privilege | Bucket policy; clients never get raw credentials | TLS | Content-type/size checks pre-issuance | Per-account upload quotas | Storage access logs |
| Clients → Object Storage/CDN | Inbound (upload/download) | Short-lived signed URL only | Signed URL scope = one object, one operation, TTL-bound | TLS | Server-side re-validation on upload-complete webhook | Per-signed-URL, per-account | Upload/download logs |
| workers → APNs/FCM | Outbound | Provider credentials (private key/service account) | N/A (outbound only) | TLS | Payload size/shape limits | Provider-side + internal throttle | Delivery result logs |
| Admin Console → core-api | Inbound | Access token + elevated role claim | Admin-role-gated endpoints, all mutating actions audited | TLS | Same DTO validation, stricter | Stricter per-admin limits | Full audit trail (who/what/when/before-after) |

## 4. Sensitive Data Flow Notes

- Access tokens and refresh tokens never appear in logs, query strings, or analytics events
  (see `09-auth-security-privacy.md` and `11-observability.md`).
- Object storage is never directly reachable by clients without a signed URL scoped to one
  object and one operation.
- The realtime gateway never queries PostgreSQL directly for authorization decisions on a hot
  path; it uses a short-TTL Redis-cached authorization snapshot (see `06-realtime-architecture.md`
  §5) refreshed on membership-change events, with fallback to a synchronous authorization check
  against `core-api` on cache miss.
- Search index queries are always filtered server-side by the requesting user's authorized
  conversation set before results are returned (see `08-media-search-notifications.md`).

## 5. External Integration Boundaries

| Integration | Direction | Purpose | Failure Isolation |
|---|---|---|---|
| APNs (iOS push) | Outbound | Push notification delivery | Isolated in `workers`; failure does not affect message persistence or realtime delivery |
| FCM (Android/Web push) | Outbound | Push notification delivery | Same as above |
| CDN | Outbound (media serving) | Cached media delivery | Falls back to direct signed object-storage URLs if CDN unavailable |
| Observability backend (OTel collector) | Outbound | Metrics/logs/traces | Never blocks request path; async/buffered export |

No other third-party identity or messaging providers are assumed in this volume. If SSO/OAuth
identity providers are introduced later, they must be added as an explicit external boundary in
an updated volume, with their own ADR.
