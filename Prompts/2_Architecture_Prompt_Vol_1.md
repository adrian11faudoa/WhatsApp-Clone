# WhatsApp-Style Messaging Platform — Architecture Prompt — Volume 1

## ROLE

You are the **Principal Software Architect and Distributed Systems Engineering Lead** responsible for producing the foundational architecture specification for a production-grade, globally scalable, WhatsApp-style real-time communications platform.

This is an **architecture-definition task**, not a request to implement the complete application.

Operate with the combined responsibilities of:

* Principal Software Architect
* Distributed Systems Engineer
* Database Architect
* Security Engineer
* Reliability Engineer
* Performance Engineer
* DevOps Engineer
* Cloud Architect
* Staff Backend Engineer
* Staff Frontend Engineer
* Staff Mobile Engineer
* QA Engineer
* Technical Writer

The architecture you produce must be concrete enough to guide independently generated backend, web, mobile, infrastructure, and QA implementation work.

Do not produce a conceptual essay.

Produce a real engineering architecture specification with explicit boundaries, contracts, decisions, tradeoffs, failure behavior, and implementation guidance.

---

# PROJECT

The project is an independently engineered **production-grade, globally scalable, WhatsApp-style messaging platform**.

The completed platform is intended to support:

* user accounts;
* authentication and session management;
* profiles;
* private conversations;
* group conversations;
* group membership and administration;
* text messaging;
* message editing where supported;
* message deletion;
* replies and message references;
* reactions;
* delivery and read state;
* typing indicators;
* presence;
* last-seen behavior where permitted by privacy settings;
* conversation history;
* unread counts;
* attachments;
* images;
* video;
* audio;
* documents;
* media processing;
* secure media access;
* push notifications;
* realtime communication;
* multi-device synchronization;
* local client caching;
* synchronization and reconciliation;
* search where applicable;
* blocking;
* reporting;
* moderation and abuse prevention;
* administrative capabilities;
* privacy controls;
* analytics and operational telemetry;
* background processing;
* observability;
* deployment;
* disaster recovery.

The target technology direction is:

* Web: Next.js, React, TypeScript, Tailwind CSS.
* Mobile: React Native, Expo, TypeScript.
* Backend: NestJS, TypeScript.
* Primary database: PostgreSQL.
* Data access: Prisma or an equivalent production-grade typed data-access layer.
* Cache and ephemeral state: Redis where justified.
* Event streaming: Kafka or Redpanda where justified.
* Background jobs: BullMQ or an equivalent durable queue system.
* Object storage: S3-compatible object storage.
* Search: Elasticsearch or OpenSearch where justified.
* Realtime: authenticated WebSocket-based communication or an equivalent suitable realtime transport.
* Infrastructure: Docker, Kubernetes where justified, Helm where Kubernetes is used, Terraform or equivalent infrastructure-as-code.
* CI/CD: GitHub Actions or an equivalent production CI/CD platform.
* Observability: OpenTelemetry with appropriate metrics, logs, tracing, dashboards, and alerting.

Do not introduce technologies merely because they appear in this list.

For every infrastructure component, establish why it exists, what problem it solves, what data it owns, what failure behavior it has, and why it is appropriate for the stated scale.

---

# CURRENT ARCHITECTURE SCOPE

This volume establishes the **foundational architecture contract** for the entire project.

It must define the structures that subsequent implementation work can reliably consume without requiring undocumented architectural decisions.

This volume must establish, at minimum:

* system architecture;
* architectural style;
* bounded domains;
* service and module boundaries;
* authoritative data ownership;
* deployment-unit boundaries;
* client/backend interaction model;
* API strategy;
* realtime strategy;
* core domain model;
* primary database architecture;
* caching strategy;
* event and messaging strategy;
* asynchronous processing strategy;
* identity and session architecture;
* authorization model;
* core security boundaries;
* consistency model;
* message lifecycle;
* multi-device synchronization model;
* foundational scalability strategy;
* foundational reliability strategy;
* foundational observability architecture;
* major external integration boundaries;
* canonical terminology;
* cross-part integration contracts.

Do not attempt to fully specify every deployment, Kubernetes resource, production dashboard, CI workflow, frontend screen, mobile screen, operational runbook, or exhaustive QA matrix in this volume.

Those responsibilities belong to later planned implementation work.

This volume establishes the architectural contracts those later prompts must follow.

---

# OUT-OF-SCOPE

This volume must NOT implement the complete application.

Do not use this volume to build:

* complete backend business logic;
* complete web UI;
* complete mobile UI;
* complete production Kubernetes manifests;
* complete Terraform infrastructure;
* complete QA automation suites;
* complete CI/CD pipelines;
* complete media-processing workers;
* complete administrative interfaces;
* complete product analytics implementation.

Architecture artifacts, schemas, contract definitions, configuration specifications, and representative examples are in scope when necessary to make the architecture implementable.

The objective is to define the system, not to implement every system component.

---

# SOURCE-OF-TRUTH MODEL

This architecture volume must be designed for independent project-part generation.

Do not assume that a previous AI conversation exists.

Do not reference:

* another Claude conversation;
* a previous AI response;
* an earlier architecture discussion;
* a previously approved architecture;
* a previous prompt.

The architecture artifacts generated by this volume must be portable and suitable for later transfer into separately executed implementation prompts.

Where repository or project files are available in the execution environment, inspect them before making compatibility-sensitive changes.

Where no repository is available, create architecture artifacts that are sufficiently explicit to serve as portable contracts for later integration.

Do not fabricate existing repository state.

---

# ARCHITECTURAL OBJECTIVES

The architecture must satisfy the following long-term objectives:

* horizontal scalability;
* high availability;
* predictable failure behavior;
* clear domain ownership;
* secure access control;
* strong data integrity;
* reliable message delivery;
* independently scalable realtime infrastructure;
* independently scalable background processing;
* efficient media handling;
* observable distributed behavior;
* controlled operational complexity;
* client compatibility;
* incremental deployment;
* maintainable evolution.

Avoid premature decomposition into excessive microservices.

Use the smallest set of independently deployable boundaries that provides clear operational or scaling value.

Where modular monolith architecture is more appropriate than service decomposition for a given boundary, justify that decision explicitly.

---

# ARCHITECTURAL STYLE

Define the architectural style of the platform.

Evaluate and explicitly decide:

* modular monolith versus microservices;
* logical domain separation;
* physical deployment boundaries;
* synchronous versus asynchronous communication;
* command/query separation where appropriate;
* event-driven components;
* stateless versus stateful components;
* edge versus application responsibilities.

The decision must be grounded in:

* expected traffic;
* operational complexity;
* team ownership;
* failure isolation;
* scaling requirements;
* consistency requirements;
* deployment requirements.

Do not choose microservices merely because the project is described as large-scale.

---

# DOMAIN BOUNDARIES

Define explicit domains and bounded responsibilities.

At minimum, evaluate the appropriate boundaries for:

* Identity and Accounts;
* Profiles;
* Devices and Sessions;
* Contacts and Relationships;
* Conversations;
* Groups;
* Messaging;
* Message Receipts;
* Reactions;
* Presence;
* Media;
* Notifications;
* Search;
* Moderation and Abuse Prevention;
* Administration;
* Analytics;
* Audit;
* Realtime Gateway;
* Background Processing.

For each domain, specify:

* responsibility;
* owned data;
* commands or operations;
* queries;
* emitted events;
* consumed events;
* synchronous dependencies;
* asynchronous dependencies;
* security boundary;
* consistency requirements;
* scaling characteristics.

Avoid duplicated ownership of the same authoritative state.

---

# SERVICE AND MODULE BOUNDARIES

Define the difference between:

* logical domain modules;
* independently deployable services;
* infrastructure components;
* worker processes;
* client applications.

For each proposed service or deployable unit, specify:

* responsibility;
* data ownership;
* API surface;
* events;
* scaling model;
* failure isolation;
* deployment independence;
* operational requirements.

Explicitly identify boundaries that should remain in the same deployment unit during the initial implementation unless scale or reliability requirements later justify separation.

---

# SYSTEM CONTEXT

Produce a system-context representation describing:

* web clients;
* mobile clients;
* realtime connections;
* API edge;
* application services;
* databases;
* cache;
* event infrastructure;
* job infrastructure;
* object storage;
* media processors;
* search infrastructure;
* notification providers;
* observability systems;
* administrative clients;
* external identity or messaging dependencies where applicable.

The context representation must show trust boundaries and major data flows.

---

# REQUEST FLOW

Define the authoritative request flow for representative operations.

At minimum, describe:

* account authentication;
* conversation creation;
* sending a message;
* reading a conversation;
* acknowledging delivery;
* acknowledging read state;
* reconnecting a realtime client;
* uploading media;
* retrieving authorized media;
* updating presence;
* processing a notification.

For each flow identify:

* entry point;
* authentication;
* authorization;
* validation;
* persistence;
* event publication;
* asynchronous work;
* realtime fan-out;
* response semantics;
* failure behavior.

Do not leave critical steps implicit.

---

# DATA OWNERSHIP

Define one authoritative owner for each major state category.

At minimum determine ownership for:

* users;
* accounts;
* sessions;
* devices;
* conversations;
* memberships;
* messages;
* receipts;
* reactions;
* presence;
* media metadata;
* notification state;
* reports;
* moderation state;
* audit state.

For each major entity specify:

* system of record;
* read models if applicable;
* cache representation;
* search representation;
* event representation.

A cache, search index, or event stream must not silently become an alternate authoritative source of truth unless the architecture explicitly defines it as such.

---

# DATABASE ARCHITECTURE

Define the PostgreSQL architecture.

Specify:

* logical schema strategy;
* module ownership;
* core entities;
* relationships;
* critical constraints;
* primary indexes;
* unique constraints;
* high-volume access patterns;
* transaction boundaries;
* isolation requirements;
* concurrency controls;
* migration strategy;
* retention considerations;
* deletion strategy;
* audit requirements;
* replication strategy at the architectural level;
* read scaling strategy where appropriate.

Pay particular attention to high-volume messaging data.

Define how the system avoids:

* unbounded scans;
* inefficient offset pagination at large scale;
* contention hotspots;
* unnecessary cross-domain joins;
* uncontrolled table growth where archival is necessary.

Do not prematurely specify every database column if doing so would belong more appropriately to an implementation-specific schema prompt, but define the canonical entity model and all fields that are necessary for cross-part contracts.

---

# MESSAGE DOMAIN MODEL

Define the canonical message lifecycle and domain model.

At minimum establish concepts corresponding to:

* Message;
* Conversation;
* Sender;
* Recipient or ConversationMember;
* MessageReference;
* MessageAttachment;
* MessageReaction;
* DeliveryReceipt;
* ReadReceipt;
* client-generated message identifier;
* server-generated message identifier;
* created timestamp;
* accepted/persisted timestamp where required;
* edited state;
* deleted state.

Define the distinction between:

* client-generated identifiers;
* server identifiers;
* idempotency identifiers;
* correlation identifiers;
* tracing identifiers.

Define which identifiers are durable and which are transport-level.

---

# MESSAGE LIFECYCLE

Define the canonical lifecycle of a message from client initiation through recipient consumption.

Explicitly distinguish:

* locally composed;
* submitted;
* authenticated;
* authorized;
* validated;
* accepted;
* durably persisted;
* event published;
* delivery scheduled;
* delivered;
* read;
* edited;
* deleted;
* failed.

Define which state transitions are authoritative.

Define what happens when:

* the client retries;
* the connection drops after submission;
* the server persists before response delivery;
* the event broker temporarily fails;
* the recipient is offline;
* multiple devices acknowledge the same message;
* events arrive out of order;
* duplicate events are received.

The architecture must define idempotency and reconciliation behavior.

---

# API ARCHITECTURE

Define the platform API strategy.

Specify:

* REST conventions;
* endpoint ownership;
* API versioning strategy;
* request/response schema conventions;
* standardized error model;
* authentication requirements;
* authorization requirements;
* pagination convention;
* filtering;
* sorting;
* idempotency;
* correlation IDs;
* rate limiting;
* compatibility expectations.

Define representative contract shapes for critical operations.

Use concrete schemas where they are required for cross-part interoperability.

Do not permit individual clients to invent separate backend contracts.

---

# REALTIME ARCHITECTURE

Define the realtime architecture independently from the ordinary HTTP API.

Specify:

* connection establishment;
* authentication;
* authorization;
* connection identity;
* session identity;
* device identity;
* heartbeat;
* disconnect handling;
* reconnect behavior;
* event envelopes;
* event names;
* event versions;
* acknowledgements;
* delivery semantics;
* ordering;
* duplicate handling;
* subscription/fan-out rules;
* backpressure;
* horizontal scaling;
* shared state requirements;
* failure handling.

Define the relationship between the realtime transport and durable message state.

The realtime layer must not become the authoritative durable store for messages.

---

# REALTIME EVENT ENVELOPE

Define a canonical realtime event envelope containing, where appropriate:

* event ID;
* event type;
* event version;
* event timestamp;
* entity ID;
* conversation ID where relevant;
* device/session metadata where relevant;
* correlation ID;
* payload;
* server sequence information where required.

Define how clients detect:

* duplicates;
* gaps;
* stale events;
* invalid event versions.

---

# PRESENCE ARCHITECTURE

Define presence separately from durable messaging state.

Specify:

* online/offline semantics;
* device-level presence;
* account-level presence;
* heartbeats;
* expiration;
* TTL behavior;
* fan-out;
* privacy settings;
* stale state;
* Redis usage;
* failure behavior.

Presence must not require durable writes for every heartbeat.

Define how presence degrades when the realtime or cache layer is unavailable.

---

# TYPING INDICATOR ARCHITECTURE

Define typing indicators as ephemeral realtime state.

Specify:

* start/stop semantics;
* debounce/throttling;
* expiration;
* fan-out;
* privacy considerations;
* disconnect behavior;
* duplicate prevention.

Typing indicators must not be persisted as ordinary message history.

---

# MULTI-DEVICE ARCHITECTURE

Define how a user with multiple devices synchronizes state.

Specify:

* device identity;
* session identity;
* message replay;
* event sequence;
* synchronization checkpoints;
* reconnect;
* missed-event recovery;
* state reconciliation;
* receipt synchronization;
* read-state synchronization;
* deletion synchronization;
* edit synchronization;
* conflict handling.

Define what is durable and what can safely remain device-local.

---

# CONSISTENCY MODEL

Explicitly classify important operations according to their consistency requirements.

At minimum evaluate:

* account state;
* group membership;
* message persistence;
* message delivery state;
* read state;
* reactions;
* presence;
* typing;
* notifications;
* search indexes;
* analytics.

For each, define whether the system requires:

* strong consistency;
* transactional consistency;
* eventual consistency;
* bounded staleness;
* best-effort ephemeral state.

Do not use eventual consistency where it would create unacceptable authorization or financial correctness issues.

---

# CACHE ARCHITECTURE

Define Redis responsibilities explicitly.

For each major cache category specify:

* key naming convention;
* value structure;
* TTL;
* invalidation;
* write strategy;
* read strategy;
* stale behavior;
* memory limits;
* failure behavior.

Consider caching for:

* sessions where appropriate;
* conversation metadata;
* unread counts;
* presence;
* rate limits;
* frequently accessed profiles;
* authorization-related ephemeral state.

Do not cache data without a clear invalidation strategy.

---

# EVENT ARCHITECTURE

Define the event model.

Specify:

* event naming conventions;
* event envelope;
* versioning;
* producer ownership;
* consumer ownership;
* ordering;
* partitioning considerations;
* idempotency;
* retries;
* dead-letter handling;
* retention;
* replay strategy.

Identify canonical domain events such as appropriate message lifecycle events, conversation events, membership changes, presence-related events, media processing events, and notification events.

Do not create event types merely for internal method calls.

Events must represent meaningful domain or integration boundaries.

---

# OUTBOX AND DELIVERY RELIABILITY

Determine where transactional outbox or equivalent patterns are required.

At minimum evaluate consistency between:

* database commits;
* domain event publication;
* message delivery scheduling;
* notification scheduling;
* media-processing jobs.

Define the failure sequence when:

* database commit succeeds but event publication fails;
* event publication succeeds but consumer processing fails;
* worker succeeds but acknowledgement is lost;
* event is delivered more than once.

---

# QUEUE ARCHITECTURE

Define asynchronous job categories.

Examples may include:

* media processing;
* thumbnail generation;
* push notification delivery;
* search indexing;
* cleanup;
* retention processing;
* moderation tasks;
* analytics aggregation;
* reconciliation.

For each category define:

* queue;
* payload;
* producer;
* consumer;
* retry policy;
* timeout;
* idempotency;
* backoff;
* priority;
* failure handling;
* dead-letter strategy.

---

# MEDIA ARCHITECTURE

Define the high-level media flow:

```text
Client
  ↓
Authorized upload initiation
  ↓
Object storage
  ↓
Processing pipeline
  ↓
Validated/transcoded variants
  ↓
Metadata persistence
  ↓
CDN / authorized delivery
```

Define:

* upload authorization;
* object-key strategy;
* metadata ownership;
* processing states;
* media variants;
* signed access;
* CDN interaction;
* cleanup;
* failure recovery;
* deletion;
* abuse controls.

Do not expose raw unrestricted object-storage access.

---

# SEARCH ARCHITECTURE

Define the search architecture where search is part of the product.

Specify:

* indexed entities;
* index ownership;
* authorization filtering;
* indexing triggers;
* index consistency;
* retry/rebuild strategy;
* deletion propagation;
* query boundaries;
* ranking responsibilities;
* failure behavior.

The search index must never become an authorization bypass.

---

# NOTIFICATION ARCHITECTURE

Define the notification subsystem.

Specify:

* push-token ownership;
* device registration;
* notification eligibility;
* preference evaluation;
* deduplication;
* delivery retries;
* invalid-token cleanup;
* privacy rules;
* rate limiting;
* observability.

Separate notification intent from provider-specific delivery.

---

# AUTHENTICATION ARCHITECTURE

Define:

* registration;
* authentication;
* sessions;
* devices;
* tokens;
* refresh;
* revocation;
* account recovery;
* logout;
* suspicious activity handling;
* rate limiting.

Define which state is durable and which is ephemeral.

Define how multi-device sessions are represented.

---

# AUTHORIZATION ARCHITECTURE

Define authorization boundaries for:

* user account actions;
* conversation access;
* group administration;
* message operations;
* media access;
* moderation;
* administrative actions.

Specify the authoritative source of membership and permissions.

Define how authorization is enforced consistently across:

* HTTP;
* WebSocket;
* background workers;
* media delivery;
* administration.

---

# SECURITY BOUNDARIES

Identify major trust boundaries:

* public internet;
* web client;
* mobile client;
* API edge;
* realtime gateway;
* application services;
* worker processes;
* database;
* Redis;
* event broker;
* object storage;
* search cluster;
* administrative interfaces;
* observability stack;
* third-party providers.

For each boundary identify:

* authentication;
* authorization;
* encryption;
* validation;
* rate limiting;
* auditing;
* sensitive-data considerations.

---

# PRIVACY ARCHITECTURE

Define the architectural treatment of:

* profile visibility;
* presence;
* last seen;
* read receipts;
* blocking;
* account deletion;
* message deletion;
* retention;
* audit data;
* analytics.

Where end-to-end encryption is not part of this architecture volume's current implementation scope, explicitly distinguish transport encryption from application-level end-to-end cryptography.

Do not claim cryptographic properties that the architecture does not actually provide.

---

# FAILURE MODEL

Define major expected failure scenarios and intended system behavior.

At minimum evaluate:

* PostgreSQL unavailable;
* Redis unavailable;
* event broker unavailable;
* queue unavailable;
* object storage unavailable;
* search unavailable;
* notification provider unavailable;
* realtime gateway failure;
* individual service failure;
* worker crash;
* duplicated request;
* duplicated event;
* out-of-order event;
* network partition;
* client reconnect storm;
* regional outage.

For each failure, specify:

* immediate behavior;
* user-visible impact;
* retry behavior;
* fallback;
* data consistency implications;
* recovery requirements;
* observability.

---

# SCALABILITY MODEL

Define how the architecture scales across:

* HTTP requests;
* WebSocket connections;
* message writes;
* message reads;
* presence updates;
* event fan-out;
* workers;
* notifications;
* media processing;
* search;
* database reads;
* database writes.

Identify likely hotspots and mitigation strategies.

Consider:

* partitioning;
* sharding;
* read replicas;
* connection management;
* queue partitioning;
* consumer scaling;
* cache distribution;
* regional topology.

Do not commit to a scaling mechanism without explaining the trigger or problem it solves.

---

# AVAILABILITY MODEL

Define the intended availability strategy.

Consider:

* stateless application scaling;
* redundant instances;
* availability zones;
* database high availability;
* cache redundancy;
* broker redundancy;
* worker redundancy;
* regional failover;
* graceful degradation.

Distinguish between:

* target availability;
* architecture capability;
* infrastructure implementation to be defined later.

Do not claim an availability SLA that has not been formally established.

---

# OBSERVABILITY ARCHITECTURE

Define the observability model across system boundaries.

Specify:

* logging;
* metrics;
* tracing;
* correlation IDs;
* request IDs;
* event IDs;
* health checks;
* readiness;
* liveness;
* business metrics;
* queue metrics;
* realtime metrics;
* database metrics;
* cache metrics.

Define the minimum observability expected from:

* APIs;
* realtime gateways;
* workers;
* event consumers;
* media processing;
* notification delivery.

Include privacy-safe logging requirements.

---

# ARCHITECTURAL ARTIFACTS

Create a portable architecture artifact set in the project documentation structure appropriate to the available environment.

At minimum include:

* architecture overview;
* system context;
* component/service architecture;
* domain boundaries;
* canonical domain model;
* database architecture;
* API architecture;
* realtime architecture;
* event architecture;
* queue architecture;
* media architecture;
* authentication architecture;
* authorization architecture;
* security boundaries;
* consistency model;
* scalability model;
* reliability model;
* observability model;
* external integration boundaries;
* terminology glossary.

Where practical, use diagrams such as Mermaid or another repository-compatible diagram format.

The diagrams must correspond to the written architecture.

Do not create diagrams that contradict the specification.

---

# ARCHITECTURAL DECISION RECORDS

Create ADRs or an equivalent decision-record structure for major decisions where appropriate.

At minimum record decisions concerning:

* architectural style;
* service/module boundaries;
* primary database;
* realtime transport;
* event system;
* queue system;
* caching;
* media storage;
* search;
* authentication/session model;
* consistency model;
* multi-device synchronization.

Each decision record should identify:

* context;
* decision;
* alternatives considered;
* rationale;
* consequences;
* operational implications.

Do not create ADRs merely for trivial implementation details.

---

# PORTABLE CROSS-PART CONTRACTS

The artifacts produced by this prompt must explicitly define contracts that later independent implementation prompts can consume.

At minimum define canonical conventions for:

* identifiers;
* timestamps;
* pagination;
* API errors;
* API versioning;
* authentication terminology;
* authorization terminology;
* message states;
* conversation states;
* membership roles;
* realtime event envelopes;
* event naming;
* event versioning;
* queue payload conventions;
* correlation IDs;
* tracing identifiers;
* configuration naming;
* status values.

These contracts must be portable.

They must not depend on another conversation's hidden context.

---

# TECHNOLOGY DECISION RECORD

For each major technology, document:

* role;
* justification;
* alternatives;
* operational implications;
* scaling implications;
* failure implications;
* ownership;
* expected lifecycle.

At minimum address:

* Next.js;
* React;
* React Native;
* Expo;
* NestJS;
* PostgreSQL;
* Prisma or equivalent;
* Redis;
* Kafka/Redpanda if selected;
* BullMQ or equivalent;
* object storage;
* search technology if selected;
* WebSocket transport;
* Docker;
* Kubernetes if selected;
* Terraform or equivalent;
* observability stack.

Do not force every listed technology into the architecture.

A technology may be intentionally excluded when requirements do not justify it.

---

# SECURITY ARCHITECTURE ARTIFACTS

Include a foundational threat model covering relevant threats such as:

* account takeover;
* credential stuffing;
* session theft;
* IDOR;
* privilege escalation;
* unauthorized media access;
* malicious uploads;
* injection;
* SSRF;
* XSS;
* CSRF where applicable;
* realtime connection abuse;
* spam;
* notification abuse;
* resource exhaustion;
* secret leakage.

For each major threat, define architectural mitigations.

---

# PERFORMANCE ARCHITECTURE

Define performance objectives at the architectural level.

Consider:

* API latency;
* message send latency;
* message persistence latency;
* realtime delivery latency;
* reconnect behavior;
* database access;
* cache hit rates;
* queue latency;
* media processing throughput;
* search latency.

Use measurable targets only when they can be justified as engineering objectives.

Do not fabricate guaranteed production performance numbers.

---

# ARCHITECTURAL TRADEOFFS

Explicitly document important tradeoffs.

Examples:

* consistency versus latency;
* simplicity versus independent scaling;
* realtime freshness versus infrastructure cost;
* storage durability versus operational cost;
* synchronous processing versus asynchronous processing;
* normalized storage versus read optimization;
* regional locality versus global consistency.

Do not hide tradeoffs behind generic "best practices."

---

# IMPLEMENTATION GUIDANCE

The resulting architecture must be implementation-oriented.

For each major subsystem, provide enough guidance that a separate engineering prompt can implement it without inventing fundamental architecture.

Implementation guidance must identify:

* authoritative data;
* public contracts;
* expected dependencies;
* expected failure behavior;
* observability;
* security;
* scaling characteristics.

Do not provide complete feature implementation code in this volume.

---

# TESTABILITY

The architecture itself must be designed for verification.

Define where contract tests, integration tests, and failure tests will be possible.

Examples:

* API contract testing;
* realtime contract testing;
* event schema testing;
* queue payload validation;
* migration testing;
* permission testing;
* synchronization tests;
* failure injection.

Architecture decisions that make critical behavior impossible to test should be identified and reconsidered.

---

# DOCUMENTATION ACCURACY

All architecture artifacts must describe the actual decisions made in this volume.

Do not create documentation that refers to:

* nonexistent services;
* imaginary production environments;
* unverified cloud resources;
* future functionality as though it already exists.

Clearly distinguish:

* architectural target;
* current artifact;
* future implementation.

---

# VALIDATION

Before declaring this architecture volume complete, validate:

* terminology consistency;
* domain ownership;
* service boundaries;
* data ownership;
* API consistency;
* realtime consistency;
* event consistency;
* queue consistency;
* authorization consistency;
* security boundaries;
* failure behavior;
* scaling strategy;
* observability;
* portability of contracts;
* compatibility between independently generated project parts.

Check that no two subsystems claim conflicting ownership of the same authoritative state.

Check that realtime behavior does not contradict durable message semantics.

Check that caching does not create hidden authority.

Check that event contracts can evolve safely.

Check that background jobs are idempotent where required.

Check that multi-device synchronization has a defined recovery path.

Check that security decisions are enforced at the correct trust boundary.

---

# COMPLETION REPORT

After producing the architecture artifacts, provide a completion report containing:

* architecture artifacts created;
* documentation files created or modified;
* diagrams created;
* ADRs created;
* domains defined;
* service/module boundaries defined;
* database architecture defined;
* API contracts defined;
* realtime contracts defined;
* event contracts defined;
* queue contracts defined;
* media architecture defined;
* authentication architecture defined;
* authorization architecture defined;
* security architecture defined;
* privacy architecture defined;
* observability architecture defined;
* reliability architecture defined;
* scalability strategy defined;
* external integration boundaries defined;
* validation performed;
* unresolved architectural issues;
* assumptions requiring confirmation, if any.

Do not claim implementation of application functionality that this architecture volume did not implement.

---

# DEFINITION OF DONE

This architecture volume is complete only when:

* the foundational architecture is explicitly defined;
* major domains have clear boundaries;
* authoritative data ownership is explicit;
* deployment boundaries are explicit;
* API architecture is defined;
* realtime architecture is defined;
* message lifecycle is defined;
* multi-device synchronization is defined;
* database architecture is defined;
* cache responsibilities are defined;
* event architecture is defined;
* queue architecture is defined;
* media architecture is defined;
* notification architecture is defined;
* authentication and authorization boundaries are defined;
* security and privacy boundaries are defined;
* scalability and reliability strategies are defined;
* observability architecture is defined;
* cross-part contracts are portable;
* architectural decisions are documented;
* artifacts are internally consistent;
* diagrams match the written architecture;
* no critical architectural decision is left as an undocumented assumption;
* the output can serve as a reliable foundation for later independent implementation prompts.

This definition of done applies only to **Architecture Prompt — Volume 1**.

It does not require implementation of the complete platform.

---

# FINAL INTEGRATION COMPATIBILITY

The architecture must be suitable for later independent generation of:

* backend implementation;
* web frontend implementation;
* mobile implementation;
* infrastructure implementation;
* QA implementation.

Each of those later project parts must be able to derive its required contracts from portable artifacts and explicit prompt context.

Do not rely on memory of this conversation.

Do not rely on another AI response being available.

Do not encode hidden architectural assumptions.

Where an architectural decision is important to later implementation, make it explicit in the generated artifacts.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as an **architecture-definition milestone only**.

Implement only the architecture artifacts, contracts, specifications, diagrams, ADRs, and documentation belonging to this scope.

Do not implement the complete backend.

Do not implement the complete web client.

Do not implement the complete mobile applications.

Do not implement the complete infrastructure.

Do not implement the complete QA system.

Do not invent an additional project phase.

Do not generate implementation prompts for future phases.

Do not ask the user what the project should become; that has already been defined by this prompt.

Inspect any actually available project artifacts before making compatibility-sensitive decisions.

Where no implementation repository exists, produce the portable architecture artifact set rather than fabricating repository state.

When complete, provide the required completion report and state only what was actually created and validated.
