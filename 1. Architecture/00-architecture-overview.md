# 00 — Architecture Overview

## Document Status

This is **Architecture Volume 1** for the WhatsApp-style messaging platform. It is a portable
architecture contract, independent of any specific AI conversation or prior session. It assumes
no repository currently exists. All later implementation prompts (backend, web, mobile,
infrastructure, QA) must treat this document set as the source of truth for cross-part contracts.

Nothing in this document set claims that infrastructure has been provisioned, that code has been
written, or that tests have been executed. It defines contracts and decisions only.

## 1. Purpose

Define the foundational, implementation-oriented architecture for a production-grade,
globally scalable, real-time messaging platform (private chats, group chats, media, presence,
notifications, multi-device sync) so that independently generated backend, web, mobile,
infrastructure, and QA work can proceed without inventing conflicting fundamentals.

## 2. Architectural Style Decision

**Decision: Modular Monolith (Majolith) core + independently scaled Realtime Gateway and
Worker tiers, with narrowly-scoped extraction candidates identified for future separation.**

### Rationale

- At initial and mid-scale (up to low tens of millions of MAU), a well-modularized NestJS
  monolith with clear domain module boundaries provides lower operational complexity, easier
  transactional integrity (e.g., conversation creation + membership + outbox write in one
  transaction), and faster iteration than a premature microservices split.
- Three concerns have fundamentally different scaling and failure profiles from the core
  request/response API and **are separated as independent deployment units from day one**:
  1. **Realtime Gateway** (WebSocket fan-out) — scales on concurrent connections, not on CPU-bound
     business logic; needs independent horizontal scaling and its own rollout cadence.
  2. **Workers** (background job / event consumers: media processing, notification delivery,
     search indexing, retention) — scales on queue depth, needs independent crash isolation so a
     bad job never starves API capacity.
  3. **Media processing pipeline** — CPU/IO-bound, bursty, must not share a process pool with
     API request handling.
- All other domains (Identity, Profiles, Conversations, Messaging, Receipts, Reactions,
  Moderation, Administration) are **logical modules inside one deployable API application**
  (`core-api`), each with an enforced internal boundary (no direct cross-module DB access;
  only through a module's public service interface), so they *can* be extracted later into
  separate services without a full rewrite — but are not extracted now because none of them
  individually justifies independent scaling, independent on-call ownership, or independent
  release cadence at this stage.
- Presence is logically a domain but is **physically hosted inside the Realtime Gateway process
  group** because its data (ephemeral, Redis-backed, sub-second churn) is only meaningful in the
  context of live connections.

### Explicitly Rejected Alternative

**Full microservices per domain from day one** — rejected. It would require distributed
transactions for basic flows (e.g., "create conversation" touching Conversations + Memberships +
Audit), multiply operational surface area (18 domains × service scaffolding, CI, deploys,
dashboards) before any domain has demonstrated it needs independent scaling, and increase
integration ambiguity across independently generated project parts — directly contradicting the
project's integration-ambiguity-minimization requirement.

### Deployment Units (defined precisely in `02-domain-boundaries-and-ownership.md`)

| Unit | Contains | Scales on |
|---|---|---|
| `core-api` | Identity, Profiles, Devices/Sessions, Contacts, Conversations, Groups, Messaging, Receipts, Reactions, Moderation, Administration, Audit (all as internal modules) | CPU / request rate |
| `realtime-gateway` | WebSocket connection handling, presence, typing indicators, realtime fan-out | Concurrent connections |
| `workers` | Media processing, notification delivery, search indexing, retention/cleanup, reconciliation jobs | Queue depth |
| `media-processor` (worker specialization) | Transcoding, thumbnailing | CPU/IO, burst |
| PostgreSQL | Durable system of record | Vertical + read replicas |
| Redis | Cache, presence, rate limits, ephemeral coordination | Memory / ops throughput |
| Event broker (Kafka/Redpanda) | Domain event backbone | Partition throughput |
| Object storage (S3-compatible) | Media assets | N/A (managed) |
| Search cluster (OpenSearch/Elasticsearch) | Search indexes | Shard count |

## 3. Architectural Objectives — How This Design Satisfies Them

- **Horizontal scalability**: `core-api`, `realtime-gateway`, and `workers` are stateless
  processes behind a load balancer / connection router; state lives in Postgres, Redis, the
  broker, and object storage.
- **High availability**: no single-instance dependency in the application tier; durable state
  stores use managed HA topologies (see `10-consistency-caching-reliability.md`).
- **Clear domain ownership**: every entity has exactly one system of record (see
  `02-domain-boundaries-and-ownership.md`).
- **Reliable message delivery**: transactional outbox pattern for the Messaging domain (see
  `07-events-and-queues.md`).
- **Independently scalable realtime and background processing**: separate deployment units.
- **Controlled operational complexity**: 4 application deployment units, not 18.
- **Incremental deployment**: modules inside `core-api` are structured so any one can be lifted
  into its own service later without changing its public contract.

## 4. Key Architectural Tradeoffs

| Tradeoff | Decision | Consequence |
|---|---|---|
| Consistency vs. latency for message send | Strong consistency (durable write before ack) | Slightly higher p50 send latency; correctness over speed |
| Simplicity vs. independent scaling | Modular monolith for business domains | Some domains scale together until extraction is justified |
| Realtime freshness vs. infra cost | At-least-once delivery + client dedup, not exactly-once | Avoids distributed-transaction complexity across gateway/broker |
| Storage durability vs. cost | Postgres as sole durable store for messages; Redis never durable-only | Redis outage never loses messages |
| Normalized storage vs. read optimization | Normalized core schema + denormalized read models (conversation list, unread counts) | Extra invalidation logic, much faster common reads |
| Regional locality vs. global consistency | Single-region-primary Postgres initially, regional read replicas for read-heavy paths later | Simpler correctness model at current scale; documented as future work, not implemented now |

## 5. Non-Goals of This Volume

This volume does not implement business logic, UI, Kubernetes manifests, Terraform, CI
pipelines, or QA automation. It defines the contracts those later prompts must conform to.

## 6. Document Map

| File | Contents |
|---|---|
| `00-architecture-overview.md` | This file |
| `01-system-context-and-boundaries.md` | System context diagram, trust boundaries |
| `02-domain-boundaries-and-ownership.md` | Domains, module/service boundaries, data ownership |
| `03-domain-model.md` | Canonical entities, identifiers, message lifecycle |
| `04-database-architecture.md` | PostgreSQL schema strategy, indexes, migration/retention |
| `05-api-architecture.md` | REST conventions, error model, representative contracts |
| `06-realtime-architecture.md` | WebSocket protocol, event envelope, presence, typing, multi-device sync |
| `07-events-and-queues.md` | Event architecture, outbox, queue contracts |
| `08-media-search-notifications.md` | Media pipeline, search, notifications |
| `09-auth-security-privacy.md` | AuthN/AuthZ, threat model, privacy architecture |
| `10-consistency-caching-reliability.md` | Consistency model, cache architecture, failure model, scalability, availability |
| `11-observability.md` | Logging, metrics, tracing, health checks |
| `12-adrs.md` | Architectural Decision Records |
| `13-glossary-and-cross-part-contracts.md` | Canonical terminology and portable conventions |
