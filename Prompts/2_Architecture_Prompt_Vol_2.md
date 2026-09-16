# WhatsApp-Style Messaging Platform — Architecture Prompt — Volume 2

## ROLE

You are the **Principal Software Architect, Security Architect, Distributed Systems Engineer, Reliability Engineer, and Cloud Architect** responsible for completing the production architecture specification for the **WhatsApp-style messaging platform**.

This is an **architecture-definition task**.

Do not implement the complete application.

This volume extends the foundational architecture by defining the deeper production contracts required for backend, client, infrastructure, and QA implementation.

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

The resulting artifacts must be concrete enough that independently generated implementation work can consume them without inventing critical architecture.

---

# PROJECT

The project is an independently engineered **production-grade, globally scalable, WhatsApp-style real-time communications platform**.

The completed platform is intended to provide:

* secure user accounts;
* authentication and session management;
* user profiles;
* contacts and relationships;
* one-to-one conversations;
* group conversations;
* group administration;
* text messaging;
* message editing;
* message deletion;
* replies;
* reactions;
* delivery receipts;
* read receipts;
* typing indicators;
* presence;
* privacy controls;
* multimedia attachments;
* images;
* video;
* audio;
* documents;
* media processing;
* secure media delivery;
* push notifications;
* realtime communication;
* multi-device synchronization;
* local caching;
* offline synchronization;
* search;
* blocking;
* reporting;
* moderation;
* administration;
* analytics;
* auditability;
* operational telemetry;
* resilient background processing;
* production infrastructure;
* disaster recovery.

The project technology direction is:

* Next.js
* React
* TypeScript
* Tailwind CSS
* React Native
* Expo
* NestJS
* PostgreSQL
* Prisma or equivalent typed data-access tooling
* Redis where justified
* Kafka or Redpanda where justified
* BullMQ or equivalent durable job processing
* S3-compatible object storage
* Elasticsearch or OpenSearch where justified
* authenticated WebSocket-based realtime transport
* Docker
* Kubernetes where justified
* Helm where Kubernetes is used
* Terraform or equivalent infrastructure-as-code
* GitHub Actions or equivalent CI/CD
* OpenTelemetry and an appropriate metrics/logging/tracing stack

The technology list defines the project's intended direction.

Every component must still have a documented architectural purpose.

---

# CURRENT ARCHITECTURE SCOPE

This volume completes the deeper architectural contracts that were not appropriate to leave implicit in the foundational architecture.

Define:

* canonical API contracts;
* canonical realtime contracts;
* canonical event schemas;
* canonical queue contracts;
* detailed database ownership and high-volume data strategy;
* media lifecycle;
* notification lifecycle;
* search indexing lifecycle;
* multi-device synchronization protocol;
* offline reconciliation model;
* security and threat model;
* privacy architecture;
* administrative and moderation architecture;
* observability contracts;
* operational SLO/SLA-style objectives where appropriate;
* deployment topology;
* regional architecture;
* disaster recovery model;
* backup and restore strategy;
* migration and compatibility strategy;
* configuration model;
* secret-management model;
* external integration boundaries;
* implementation handoff contracts.

These artifacts must become portable project contracts suitable for later independent implementation prompts.

---

# OUT-OF-SCOPE

Do not implement:

* the complete backend;
* complete web UI;
* complete mobile UI;
* complete Kubernetes manifests;
* complete Terraform deployments;
* complete CI/CD workflows;
* complete automated QA suites;
* complete media workers;
* complete administrative UI;
* complete moderation implementation.

Architecture specifications, schemas, examples, contract artifacts, diagrams, decision records, configuration specifications, and implementation handoff documentation are in scope.

---

# SOURCE-OF-TRUTH MODEL

This volume must remain independently executable.

Do not depend on:

* previous AI responses;
* another Claude conversation;
* hidden architecture context;
* a prior assistant message;
* the wording of another prompt.

Where project artifacts or a repository are actually available, inspect them and preserve compatible existing decisions.

Where no repository is available, create portable architecture artifacts.

Never fabricate implementation state.

---

# ARCHITECTURAL CONSISTENCY REQUIREMENT

The architecture in this volume must be internally consistent.

Do not create a contract that conflicts with:

* the domain model;
* ownership boundaries;
* message lifecycle;
* authentication model;
* authorization model;
* realtime design;
* event architecture;
* data model;
* reliability model;
* deployment model.

When a contract requires a choice, make the choice explicit.

Do not leave critical decisions as "the implementation team can decide later."

---

# CANONICAL IDENTIFIER MODEL

Define the identifier strategy for the entire platform.

Differentiate:

* user ID;
* account ID where necessary;
* device ID;
* session ID;
* conversation ID;
* membership ID;
* message ID;
* client message ID;
* attachment ID;
* media asset ID;
* event ID;
* job ID;
* notification ID;
* report ID;
* audit event ID;
* correlation ID;
* trace ID;
* idempotency key.

For each identifier define:

* authority;
* format requirements;
* uniqueness scope;
* persistence;
* exposure to clients;
* security implications;
* acceptable indexing strategy.

Do not use multiple incompatible ID systems for the same domain entity.

---

# TIME AND CLOCK MODEL

Define canonical timestamp requirements.

Specify:

* serialization format;
* timezone behavior;
* precision;
* server authority;
* client timestamp handling;
* ordering semantics;
* event timestamps;
* message timestamps;
* synchronization timestamps.

Client clocks must never be trusted as the authoritative source for security-sensitive or ordering-sensitive server decisions.

Where ordering matters, define server-side sequencing mechanisms.

---

# API CONTRACT STANDARD

Define the canonical HTTP API contract.

Establish:

* base path conventions;
* versioning;
* resource naming;
* HTTP semantics;
* authentication headers/cookies;
* request IDs;
* correlation IDs;
* idempotency keys;
* content negotiation;
* validation;
* pagination;
* filtering;
* sorting;
* standardized errors;
* status codes;
* rate-limit response behavior.

Define a common error structure containing, where applicable:

* stable error code;
* human-readable message;
* field-level validation details;
* request ID;
* retryability;
* optional metadata.

Do not expose internal stack traces or infrastructure details to clients.

---

# PAGINATION CONTRACT

Define pagination consistently.

For high-volume resources prefer cursor pagination.

Define:

* cursor encoding;
* cursor ownership;
* sort guarantees;
* stable ordering;
* page size limits;
* invalid cursor behavior;
* deleted-record behavior;
* duplicate prevention;
* concurrent-write behavior.

Explicitly identify resources where offset pagination remains acceptable.

Do not permit each endpoint to invent a different pagination protocol.

---

# IDEMPOTENCY CONTRACT

Define how idempotency works for operations such as:

* sending messages;
* creating conversations;
* uploading media;
* creating group membership changes;
* notification dispatch;
* administrative operations where duplicate execution is dangerous.

Specify:

* key format;
* storage;
* lifetime;
* scope;
* request matching;
* replay behavior;
* conflicting-request behavior.

Idempotency must not create duplicate durable records when an operation is retried.

---

# AUTHENTICATION AND SESSION CONTRACT

Define the exact architectural contract for:

* account registration;
* login;
* credential verification;
* session issuance;
* refresh;
* logout;
* revocation;
* device registration;
* session listing;
* forced logout;
* account recovery;
* suspicious session handling.

Define:

* token or session strategy;
* token lifetime;
* refresh behavior;
* revocation strategy;
* device association;
* secure storage requirements;
* web-specific behavior;
* mobile-specific behavior.

Do not place secrets in URLs.

Do not expose refresh tokens unnecessarily to JavaScript-accessible contexts.

---

# AUTHORIZATION CONTRACT

Define authorization semantics for:

* user-owned resources;
* conversation membership;
* group roles;
* message operations;
* attachment access;
* moderation;
* administration;
* account management.

Define canonical roles where applicable, such as:

* member;
* administrator;
* owner;
* moderator;
* platform administrator.

Explicitly define permission inheritance and precedence.

Do not rely on role names alone where resource-specific ownership checks are required.

---

# GROUP AUTHORIZATION MODEL

Define the rules for:

* group creation;
* member invitation;
* member removal;
* role changes;
* ownership transfer;
* group metadata changes;
* message permissions;
* group deletion;
* administrative audit.

Define race-condition behavior when multiple administrators update membership simultaneously.

---

# MESSAGE CONTRACT

Define the canonical message representation.

It must address, where applicable:

* message ID;
* client message ID;
* conversation ID;
* sender ID;
* message type;
* body or structured content;
* creation time;
* server sequence;
* edit metadata;
* deletion metadata;
* reply/reference metadata;
* attachments;
* reaction state;
* delivery state;
* read state.

Separate persistent message state from transport metadata.

Do not place ephemeral WebSocket state into the durable message schema without justification.

---

# MESSAGE TYPE CONTRACT

Define extensible message-type conventions.

Examples may include:

* text;
* image;
* video;
* audio;
* document;
* system;
* reply;
* reaction;
* deleted;
* other explicitly supported content.

Do not make future extensibility dependent on changing database semantics in unsafe ways.

Define compatibility behavior for clients that receive an unknown message type.

---

# MESSAGE ORDERING

Define ordering semantics explicitly.

Establish:

* conversation-level ordering;
* server sequence;
* cross-device ordering;
* event ordering;
* database ordering;
* replay ordering;
* client rendering behavior.

Do not rely exclusively on wall-clock timestamps for total ordering.

Define what clients should do when events arrive out of order.

---

# MESSAGE RECEIPT MODEL

Define canonical state for:

* sent/accepted;
* delivered;
* read.

For multi-device users, define:

* per-device delivery;
* account-level aggregation;
* deduplication;
* conflict resolution;
* read timestamp behavior.

Specify whether receipts are durable, ephemeral, or derived.

---

# EDIT AND DELETE MODEL

Define:

* edit eligibility;
* edit windows if applicable;
* authorization;
* versioning;
* history retention where required;
* client synchronization;
* event propagation;
* deletion-for-self;
* deletion-for-everyone;
* media cleanup implications.

Define how deleted messages appear to clients and how deletion propagates to search indexes, caches, notifications, and replicas.

---

# REACTION MODEL

Define:

* supported reaction representation;
* uniqueness constraints;
* user-per-message limits;
* add/remove semantics;
* aggregation;
* realtime propagation;
* persistence;
* authorization;
* synchronization.

Ensure reactions cannot generate uncontrolled duplicate state under retries.

---

# REALTIME PROTOCOL

Define the canonical WebSocket protocol.

Specify:

* handshake;
* authentication;
* authorization;
* protocol version;
* connection identifier;
* device identifier;
* heartbeat;
* server ping/pong;
* reconnect;
* resume;
* authentication failure;
* rate limiting;
* disconnect codes;
* protocol errors.

Define the envelope for:

* commands;
* events;
* acknowledgements;
* errors.

Do not use separate incompatible envelopes for different realtime domains without clear justification.

---

# REALTIME COMMANDS

Define canonical commands such as applicable:

* send_message;
* acknowledge_delivery;
* acknowledge_read;
* typing_start;
* typing_stop;
* subscribe_conversation;
* unsubscribe_conversation;
* sync;
* presence_update.

Each command must define:

* payload;
* authorization;
* validation;
* idempotency;
* response/acknowledgement;
* error behavior.

---

# REALTIME EVENTS

Define canonical event categories such as:

* message_created;
* message_updated;
* message_deleted;
* message_delivered;
* message_read;
* reaction_added;
* reaction_removed;
* typing_started;
* typing_stopped;
* presence_changed;
* conversation_updated;
* membership_changed;
* notification_received;
* synchronization_required.

For each event define:

* event version;
* payload;
* ordering;
* recipient scope;
* retry expectations;
* duplicate handling;
* authorization.

---

# SYNCHRONIZATION PROTOCOL

Define a formal synchronization mechanism for reconnecting or newly registered devices.

The protocol must support:

* initial synchronization;
* incremental synchronization;
* missed event recovery;
* sequence checkpoints;
* pagination;
* conflict reconciliation;
* deletion propagation;
* edit propagation;
* receipt synchronization;
* membership synchronization.

Define how a client identifies its last confirmed state.

Define how the server detects a stale or invalid synchronization checkpoint.

---

# OFFLINE OPERATION MODEL

Define which client operations may be performed offline.

For offline-capable operations specify:

* local identifier;
* pending state;
* retry state;
* server acknowledgement;
* failure state;
* conflict handling;
* reconciliation.

Do not permit offline state to bypass server authorization.

---

# MEDIA CONTRACT

Define the lifecycle states of a media asset, for example:

* requested;
* uploading;
* uploaded;
* validating;
* processing;
* ready;
* failed;
* deleted;
* expired.

Define:

* upload initiation;
* upload authorization;
* object key;
* metadata;
* checksum;
* content type;
* size;
* processing jobs;
* variants;
* access control;
* signed delivery;
* cleanup.

Define the relationship between a message and its media assets.

---

# MEDIA SECURITY

Define controls for:

* malicious uploads;
* content sniffing;
* MIME spoofing;
* resource exhaustion;
* oversized files;
* unauthorized access;
* signed URL expiry;
* direct storage exposure;
* media enumeration;
* deletion races.

Media access must be authorized independently of the UI.

---

# NOTIFICATION CONTRACT

Define canonical notification intent independently from provider-specific delivery.

Specify:

* notification ID;
* user ID;
* device ID;
* notification type;
* source event;
* privacy-sensitive payload;
* delivery eligibility;
* provider;
* retry state;
* final state.

Define deduplication and invalid-provider-token handling.

---

# SEARCH CONTRACT

Define:

* indexed document types;
* searchable fields;
* indexing events;
* authorization filtering;
* deletion propagation;
* stale-index behavior;
* reindexing;
* backfill;
* failure recovery.

Search results must always be filtered according to current authorization.

---

# EVENT SCHEMA STANDARD

Define a canonical event envelope.

Include, where applicable:

* event ID;
* event type;
* event version;
* entity type;
* entity ID;
* aggregate ID;
* occurred-at timestamp;
* producer;
* correlation ID;
* causation ID;
* trace context;
* schema version;
* payload.

Define naming conventions and compatibility rules.

---

# EVENT VERSIONING

Define how events evolve.

Require:

* additive changes where possible;
* explicit versioning for breaking changes;
* consumer compatibility;
* migration windows;
* replay considerations;
* schema validation.

Do not break consumers silently.

---

# EVENT PARTITIONING AND ORDERING

For high-volume event streams define partitioning strategies around appropriate aggregate keys.

Messaging-related events should preserve required ordering within the smallest necessary scope rather than globally ordering the entire platform.

Document which events require ordering and which do not.

---

# QUEUE CONTRACT STANDARD

Define the canonical job envelope.

Include, where useful:

* job ID;
* job type;
* job version;
* created-at;
* attempt number;
* idempotency key;
* correlation ID;
* trace context;
* payload.

Define retryable versus non-retryable failures.

Define dead-letter behavior.

---

# DATABASE HIGH-VOLUME STRATEGY

Define the expected strategy for scaling high-volume tables.

Address:

* message table growth;
* receipt growth;
* audit growth;
* event/outbox growth;
* partitioning candidates;
* archival candidates;
* retention;
* index maintenance;
* vacuum/autovacuum considerations;
* hot partitions;
* write contention;
* read replicas.

Do not introduce database sharding prematurely.

Define architectural triggers that would justify later partitioning, sharding, or regional separation.

---

# DATA RETENTION AND DELETION

Define retention principles for:

* messages;
* media;
* receipts;
* audit records;
* analytics;
* logs;
* search indexes;
* event streams;
* backups.

Define deletion propagation.

Deleting a canonical entity must not silently leave unauthorized derived copies accessible indefinitely.

Differentiate:

* user-visible deletion;
* operational retention;
* legal retention where applicable;
* backup retention.

Do not make legal claims that have not been established for a specific jurisdiction.

---

# AUDIT ARCHITECTURE

Define auditable actions including, where appropriate:

* administrative access;
* moderation;
* role changes;
* account restrictions;
* authentication security actions;
* sensitive configuration changes.

Define:

* actor;
* action;
* target;
* timestamp;
* source;
* correlation ID;
* reason/context where appropriate.

Audit logs must be tamper-resistant relative to ordinary application state.

---

# ADMINISTRATION ARCHITECTURE

Define platform administration boundaries.

Separate:

* normal user permissions;
* moderator capabilities;
* support capabilities;
* platform administrator capabilities.

Define strong authentication, authorization, auditing, and session controls for privileged operations.

---

# ABUSE PREVENTION ARCHITECTURE

Define architecture for:

* request rate limiting;
* message-rate limits;
* login protection;
* signup abuse controls;
* spam controls;
* media quotas;
* suspicious activity;
* report aggregation;
* blocking;
* account restrictions.

Rate limits must be applied at appropriate dimensions such as:

* account;
* IP;
* device;
* endpoint;
* resource;
* conversation.

Do not depend exclusively on IP limits for account-level abuse.

---

# THREAT MODEL

Create a structured threat model.

At minimum cover:

* account takeover;
* session theft;
* credential stuffing;
* IDOR;
* group privilege escalation;
* unauthorized message access;
* unauthorized media access;
* malicious uploads;
* spam;
* scraping;
* realtime abuse;
* notification abuse;
* resource exhaustion;
* event poisoning;
* queue poisoning;
* secret exposure;
* internal privilege escalation.

For each threat define:

* attack surface;
* trust boundary;
* mitigation;
* detection;
* recovery.

---

# CRYPTOGRAPHIC BOUNDARIES

Explicitly define the cryptographic assumptions.

Differentiate:

* TLS;
* encryption at rest;
* application-level encryption;
* end-to-end encryption.

Do not claim end-to-end encryption unless the architecture includes an actual end-to-end cryptographic protocol.

Where end-to-end encryption is not implemented in the current architecture, make that limitation explicit.

Do not invent custom cryptographic primitives.

---

# CONFIGURATION ARCHITECTURE

Define configuration categories:

* public build configuration;
* server configuration;
* secret configuration;
* environment-specific configuration;
* feature flags.

Define naming conventions and validation.

Configuration should fail fast when required values are missing.

Do not permit secrets to enter source control.

---

# SECRET MANAGEMENT

Define the intended secret-management model.

Specify:

* development secrets;
* CI secrets;
* staging secrets;
* production secrets;
* rotation;
* access control;
* auditing;
* disaster recovery.

Do not define actual secret values.

Do not place credentials in architecture documentation.

---

# DEPLOYMENT TOPOLOGY

Define the target deployment topology at the architecture level.

Consider:

* edge/CDN;
* load balancing;
* web application;
* API services;
* realtime gateways;
* workers;
* PostgreSQL;
* Redis;
* event broker;
* object storage;
* search;
* notification integrations;
* observability.

Define trust zones and network boundaries.

---

# ENVIRONMENT MODEL

Define expected environments:

* local;
* development;
* CI/test;
* staging;
* production;
* disaster recovery or secondary region where applicable.

Specify:

* purpose;
* isolation;
* data policy;
* configuration policy;
* deployment policy;
* observability expectations.

Production data must not be copied into lower environments without appropriate safeguards.

---

# REGIONAL ARCHITECTURE

Define the intended strategy for global expansion.

Address:

* regional traffic routing;
* data locality;
* latency;
* regional failure;
* session behavior;
* message routing;
* media locality;
* CDN;
* database topology;
* cross-region events.

Do not assume active-active global writes unless the consistency and operational model genuinely supports them.

Define a realistic progression from initial deployment to larger regional architectures.

---

# CAPACITY MODEL

Define the major capacity dimensions:

* concurrent WebSocket connections;
* HTTP requests;
* messages per second;
* presence updates per second;
* events per second;
* queue throughput;
* notification throughput;
* media throughput;
* storage growth;
* database IOPS;
* cache memory;
* search indexing throughput.

Do not invent production measurements.

Define these as capacity dimensions and establish architectural scaling responses.

---

# SLO-STYLE OBJECTIVES

Where appropriate, define engineering objectives for:

* API availability;
* message acceptance;
* durable persistence;
* realtime delivery;
* synchronization;
* media processing;
* notification processing;
* search freshness;
* administrative actions.

These are engineering objectives, not contractual public SLAs unless separately established.

Define what should be measured and where.

---

# FAILURE AND RECOVERY CONTRACTS

For every critical infrastructure dependency define:

* timeout;
* retry;
* fallback;
* circuit-breaking where appropriate;
* degraded behavior;
* alerting;
* recovery.

Explicitly define:

* Redis outage;
* PostgreSQL failover;
* event broker outage;
* queue outage;
* storage outage;
* search outage;
* push-provider outage;
* realtime gateway restart;
* regional failure.

---

# BACKUP AND RESTORE

Define:

* PostgreSQL backup strategy;
* object-storage versioning/backup where applicable;
* event retention requirements;
* configuration backup;
* secret recovery model;
* restore ordering;
* restore validation;
* recovery drills.

Distinguish backup existence from tested recoverability.

---

# MIGRATION STRATEGY

Define safe schema and contract evolution.

Address:

* additive database migrations;
* backward-compatible deployments;
* expand-and-contract migrations;
* API compatibility;
* event compatibility;
* index creation strategies;
* large-table migration behavior;
* rollback limitations.

Do not require destructive migrations without a recovery strategy.

---

# IMPLEMENTATION HANDOFF CONTRACT

Create an explicit handoff section that tells later implementation prompts:

* what is authoritative;
* what may be changed;
* what must not be changed;
* what contracts are mandatory;
* which decisions are architectural;
* which choices remain implementation-local;
* what integration behavior must be preserved.

Do not refer to "this prompt" as the only place where the information exists.

Write the handoff as a durable project artifact.

---

# CONTRACT ARTIFACT DIRECTORY

Create a logical documentation structure suitable for portable transfer.

A recommended structure may include:

```text
docs/
  architecture/
    overview.md
    system-context.md
    domain-boundaries.md
    deployment-topology.md
    regional-architecture.md
    scalability.md
    reliability.md
    security.md
    privacy.md
  contracts/
    api/
      conventions.md
      errors.md
      pagination.md
      authentication.md
      authorization.md
    realtime/
      protocol.md
      envelope.md
      events.md
      synchronization.md
    events/
      envelope.md
      versioning.md
    queues/
      envelope.md
      retry-policy.md
    media/
      lifecycle.md
    notifications/
      lifecycle.md
  data/
    ownership.md
    retention.md
    migrations.md
  operations/
    configuration.md
    secrets.md
    backup-restore.md
  decisions/
    adr-*.md
```

Adapt the structure to the actual repository conventions when a repository exists.

Do not create duplicate documentation systems without justification.

---

# ARCHITECTURAL DIAGRAMS

Create diagrams for:

* system context;
* logical architecture;
* request flow;
* message send flow;
* realtime delivery flow;
* synchronization flow;
* media flow;
* event flow;
* deployment topology;
* trust boundaries;
* regional topology.

Use a consistent notation.

Diagrams must remain synchronized with textual contracts.

---

# CROSS-PART CONTRACT MATRIX

Create a matrix identifying how the major project parts interact.

At minimum cover:

| Producer             | Consumer         | Contract                  | Failure Behavior             | Security Boundary        |
| -------------------- | ---------------- | ------------------------- | ---------------------------- | ------------------------ |
| Web Client           | API              | HTTP API                  | Retry according to operation | User/Auth                |
| Mobile Client        | API              | HTTP API                  | Offline/retry policy         | User/Auth                |
| Client               | Realtime Gateway | WebSocket protocol        | Reconnect/resume             | Authenticated device     |
| Backend              | PostgreSQL       | Transactional persistence | Retry/failover               | Internal trusted network |
| Backend              | Redis            | Ephemeral state/cache     | Degrade/fallback             | Internal trusted network |
| Backend              | Event Broker     | Versioned events          | Retry/outbox                 | Internal trusted network |
| Backend              | Queue            | Job contract              | Retry/DLQ                    | Internal trusted network |
| Media Service        | Object Storage   | Media lifecycle contract  | Retry/reconciliation         | Signed authorization     |
| Search Indexer       | Search           | Indexed document contract | Retry/reindex                | Authorized data          |
| Notification Service | Push Provider    | Provider adapter          | Retry/token cleanup          | Provider boundary        |

Adapt the actual matrix to the architecture.

The matrix must identify ownership and failure behavior rather than merely listing integrations.

---

# CONTRACT VALIDATION

Validate all cross-part contracts for:

* naming consistency;
* identifier compatibility;
* timestamp compatibility;
* error compatibility;
* pagination compatibility;
* authentication compatibility;
* authorization compatibility;
* event compatibility;
* queue compatibility;
* media compatibility;
* notification compatibility;
* synchronization compatibility.

Ensure that web and mobile clients can consume the same conceptual backend contracts.

Ensure that backend modules do not emit event structures that consumers cannot interpret.

Ensure that event and queue IDs can be traced through logs and distributed traces.

---

# IMPLEMENTATION SAFETY

Do not allow future implementation prompts to infer undocumented:

* database ownership;
* service boundaries;
* authorization rules;
* message lifecycle;
* event semantics;
* queue semantics;
* media permissions;
* synchronization state.

Every critical cross-part rule should be represented in a portable artifact.

---

# VALIDATION

Before completing this architecture volume:

1. Validate that each critical API has an owner.
2. Validate that each critical entity has a single authoritative owner.
3. Validate that each critical event has a producer and intended consumers.
4. Validate that each queue has a producer and worker.
5. Validate that every asynchronous operation has failure handling.
6. Validate that realtime state is distinguishable from durable state.
7. Validate that multi-device synchronization has a defined checkpoint model.
8. Validate that offline operations cannot bypass authorization.
9. Validate that deletion propagates to derived systems.
10. Validate that media access is independently authorized.
11. Validate that search is permission-aware.
12. Validate that notification payloads respect privacy.
13. Validate that privileged operations are audited.
14. Validate that secrets are never represented as source-controlled configuration.
15. Validate that deployment topology reflects service dependencies.
16. Validate that regional architecture has an explicit failure model.
17. Validate that backup and restore ordering is defined.
18. Validate that migration strategy supports rolling deployments.
19. Validate that observability can correlate requests, events, and jobs.
20. Validate that the complete architecture remains coherent under partial failure.

---

# COMPLETION REPORT

After producing the artifacts, provide a completion report containing:

* contract artifacts created;
* architecture artifacts created;
* diagrams created;
* ADRs created or modified;
* API contract definitions;
* realtime contract definitions;
* synchronization contract;
* event contract definitions;
* queue contract definitions;
* media lifecycle contract;
* notification lifecycle contract;
* authorization model;
* security/threat model;
* privacy model;
* data-retention model;
* deployment topology;
* regional architecture;
* backup/restore strategy;
* migration strategy;
* configuration strategy;
* secret-management strategy;
* cross-part contract matrix;
* validation performed;
* unresolved issues;
* assumptions that remain implementation-local.

Do not claim implementation of runtime functionality that this architecture volume did not implement.

---

# DEFINITION OF DONE

This architecture volume is complete only when:

* critical API contracts are defined;
* authentication and authorization contracts are explicit;
* realtime protocol is explicit;
* realtime commands and events are defined;
* message ordering and lifecycle are explicit;
* synchronization protocol is explicit;
* offline reconciliation behavior is explicit;
* media lifecycle and access control are explicit;
* notification lifecycle is explicit;
* search contract is explicit;
* event envelope and versioning are explicit;
* queue contract and retry model are explicit;
* high-volume database strategy is explicit;
* retention and deletion are explicit;
* audit architecture is explicit;
* moderation and abuse boundaries are explicit;
* threat model is documented;
* configuration and secret management are explicit;
* deployment topology is defined;
* environment model is defined;
* regional strategy is defined;
* backup and restore are defined;
* migration strategy is defined;
* operational objectives are measurable where appropriate;
* cross-part contracts are portable;
* diagrams match the written architecture;
* no critical implementation handoff depends on an undocumented assumption;
* the architecture is suitable for independent backend, frontend, mobile, infrastructure, and QA implementation.

This Definition of Done applies only to **Architecture Prompt — Volume 2**.

It does not authorize implementation of the complete platform.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as an **advanced architecture and contract-definition milestone only**.

Implement only the architecture artifacts, contract specifications, diagrams, decision records, schemas, documentation, and validation belonging to this scope.

Do not implement the full backend.

Do not implement the full web application.

Do not implement the full mobile applications.

Do not implement the complete production infrastructure.

Do not implement the full QA suite.

Do not create an additional architecture volume.

Do not invent another project phase.

Do not generate future implementation prompts.

Inspect any actually available repository or project artifacts before making compatibility-sensitive changes.

Where no repository is available, create the portable architecture artifact set rather than fabricating implementation state.

When complete, provide the required completion report and accurately state what was created and validated.
