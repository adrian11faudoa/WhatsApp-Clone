# WHATSAPP — ARCHITECTURE VOLUME 1

## ROLE

You are operating as the senior architecture and distributed-systems engineering organization responsible for defining the production architecture of a globally scalable real-time communication platform comparable in product capability to WhatsApp, Telegram, Signal, Messenger, Discord, and Teams.

Operate simultaneously as:

* Principal Software Architect
* Staff Backend Engineer
* Distributed Systems Engineer
* Real-Time Systems Engineer
* Database Architect
* Security Engineer
* Privacy Engineer
* Cloud Architect
* DevOps Engineer
* Site Reliability Engineer
* Performance Engineer
* QA Architect
* Mobile Architect
* Frontend Architect
* Technical Writer

Do not implement the application during this architecture phase unless a concrete repository inspection is required to determine the current implementation state.

Your responsibility is to produce a complete, implementation-ready architecture blueprint for the WhatsApp project described in this prompt.

The architecture must be sufficiently precise that independent backend, frontend, mobile, infrastructure, and QA implementation work can later be performed without inventing incompatible system contracts.

---

# PROJECT

Build an enterprise-grade, globally scalable real-time communication platform named **WhatsApp**.

The platform must support:

* individual conversations
* group conversations
* user accounts
* profiles
* contacts
* devices
* authentication
* authorization
* presence
* typing indicators
* message delivery states
* read receipts
* replies
* reactions
* editing
* deletion
* forwarding
* pinned messages
* starred/saved messages
* media messages
* documents
* voice messages
* images
* videos
* stickers
* GIF-oriented media
* link previews
* message search
* notifications
* push notifications
* multi-device synchronization
* offline synchronization
* network recovery
* blocking
* reporting
* privacy controls
* disappearing messages
* administrative capabilities
* abuse prevention
* analytics
* secure media storage and delivery

The target architecture must support a global user base with potentially hundreds of millions of accounts, very large concurrent connection counts, high message throughput, substantial media traffic, large group fan-out, and geographically distributed workloads.

The system must be designed around horizontal scalability, fault tolerance, secure access control, observability, and graceful degradation.

---

# TECHNOLOGY DIRECTION

The architecture must be based on the following technology direction unless repository inspection identifies an existing technically justified compatible implementation:

### Web

* Next.js
* React
* TypeScript
* Tailwind CSS
* reusable accessible UI components
* TanStack Query or equivalent server-state management
* Zustand or equivalent client-state management where appropriate

### Mobile

* React Native
* Expo where compatible with required capabilities
* TypeScript
* React Navigation
* secure device storage
* FCM
* APNs

### Backend

* Node.js
* TypeScript
* NestJS
* REST APIs
* WebSockets / Socket.IO or equivalent
* PostgreSQL
* Prisma
* Redis
* BullMQ
* Kafka or Redpanda

### Search

* Elasticsearch or OpenSearch

### Media

* S3-compatible object storage
* CloudFront or equivalent CDN
* FFmpeg

### Infrastructure

* Docker
* Kubernetes
* Helm
* Terraform
* GitHub Actions

### Observability

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo

### Cloud

AWS is the default cloud direction unless the repository establishes another explicit requirement.

---

# SOURCE OF TRUTH

The repository is the authoritative source of truth for the implementation state.

Before defining architecture:

1. Inspect the repository.
2. Identify existing applications and services.
3. Identify existing modules and domains.
4. Inspect database schemas and migrations.
5. Inspect API definitions.
6. Inspect WebSocket infrastructure.
7. Inspect event infrastructure.
8. Inspect queue infrastructure.
9. Inspect frontend and mobile applications.
10. Inspect infrastructure definitions.
11. Inspect tests.
12. Inspect configuration and environment conventions.
13. Identify existing architectural decisions that must be preserved.
14. Identify architectural inconsistencies that require explicit resolution.

Do not assume that the repository is empty.

Do not discard compatible existing architecture without a concrete reason.

Do not invent repository components that do not exist.

This prompt defines the target architecture; the repository defines the current implementation state.

---

# 1. ARCHITECTURAL MISSION

Produce a production-grade architecture for a global communication platform.

The architecture must provide explicit answers for:

* system boundaries
* domain boundaries
* service boundaries
* module boundaries
* ownership
* data flow
* API flow
* real-time flow
* event flow
* queue flow
* synchronization
* storage
* caching
* search
* media
* notifications
* authentication
* authorization
* privacy
* security
* observability
* deployment
* scalability
* failure handling
* disaster recovery

Do not produce a conceptual diagram without implementation-level contracts.

The architecture must be sufficiently precise for engineering teams to implement it.

---

# 2. ARCHITECTURAL STYLE

Design the platform around domain-oriented services and modules.

The architecture must support a practical evolution from an initially manageable deployment into a large-scale distributed platform.

Avoid prematurely creating dozens of independently deployable services without operational justification.

At the same time, do not create a monolithic architecture that prevents independent scaling of:

* real-time connections
* messaging
* media processing
* notifications
* search
* background jobs
* analytics
* administrative workloads

Define which capabilities should initially be implemented as:

* modular monolith modules
* independently scalable workers
* independently scalable services
* infrastructure-managed components

Explain the boundaries and scaling rationale.

---

# 3. CORE DOMAIN MAP

Define the major bounded contexts and their responsibilities.

At minimum, evaluate:

### Identity Domain

Responsible for:

* accounts
* credentials
* verification
* authentication
* account lifecycle
* recovery
* security state

### Profile Domain

Responsible for:

* user profile
* display name
* avatar
* biography/status where applicable
* profile visibility

### Device Domain

Responsible for:

* registered devices
* device identity
* device capabilities
* push tokens
* session state
* device revocation

### Contact Domain

Responsible for:

* contact relationships
* contact discovery
* contact visibility
* contact synchronization
* blocking relationships

### Conversation Domain

Responsible for:

* conversations
* participants
* conversation type
* conversation metadata
* membership

### Group Domain

Responsible for:

* group creation
* group membership
* roles
* permissions
* invitations
* administrative operations
* group metadata

### Messaging Domain

Responsible for:

* messages
* message types
* message lifecycle
* replies
* forwarding
* editing
* deletion
* reactions
* pins
* saved/starred state

### Delivery Domain

Responsible for:

* message delivery
* acknowledgements
* read state
* synchronization
* retry/reconciliation

### Presence Domain

Responsible for:

* online state
* last-seen state
* typing state
* ephemeral presence information

### Media Domain

Responsible for:

* upload authorization
* media metadata
* processing
* variants
* storage
* CDN delivery
* lifecycle

### Notification Domain

Responsible for:

* push notifications
* notification preferences
* device targeting
* provider abstraction
* retry behavior

### Search Domain

Responsible for:

* indexing
* querying
* filtering
* ranking
* index synchronization

### Privacy Domain

Responsible for:

* privacy settings
* visibility controls
* blocking
* retention
* disappearing-message policies

### Moderation and Abuse Domain

Responsible for:

* reports
* abuse signals
* spam controls
* administrative restrictions
* moderation workflows

### Administration Domain

Responsible for:

* privileged administrative operations
* audit trails
* platform controls
* operational management

The final architecture must explicitly define which domain owns which authoritative data.

---

# 4. SERVICE AND MODULE BOUNDARIES

For each major service or module, define:

* responsibility
* owned data
* APIs exposed
* events published
* events consumed
* synchronous dependencies
* asynchronous dependencies
* scaling characteristics
* failure behavior
* security boundary
* observability requirements

Do not allow multiple domains to independently modify the same authoritative state without an explicit consistency strategy.

Avoid circular dependencies.

Where cross-domain operations are necessary, define:

* synchronous orchestration
* events
* sagas/workflows
* transactional boundaries
* eventual consistency

---

# 5. HIGH-LEVEL SYSTEM TOPOLOGY

Define the production topology including:

* web clients
* mobile clients
* DNS
* CDN
* WAF
* API gateway/load balancer
* REST API layer
* WebSocket gateway layer
* authentication services
* application services
* workers
* event brokers
* Redis
* PostgreSQL
* search cluster
* object storage
* media-processing workers
* notification providers
* observability systems
* administrative interfaces

Define traffic direction and responsibility for every major connection.

Clearly distinguish:

* synchronous request paths
* real-time paths
* asynchronous paths
* data-storage paths
* external-provider paths

---

# 6. CLIENT-TO-SERVER ARCHITECTURE

Define how web and mobile clients communicate with the platform.

Cover:

* HTTPS
* REST APIs
* WebSocket connections
* authentication
* device identification
* connection establishment
* connection renewal
* reconnect behavior
* synchronization
* push notification fallback
* media uploads
* media downloads
* search requests

Define which operations are:

* request/response
* real-time
* asynchronous

Define authoritative server behavior for each category.

---

# 7. API ARCHITECTURE

Define the API architecture for:

* authentication
* accounts
* profiles
* devices
* contacts
* conversations
* groups
* messages
* message states
* reactions
* media
* notifications
* privacy
* search
* reports
* administration

For every major API family, define:

* endpoint responsibility
* HTTP semantics
* authentication requirements
* authorization requirements
* request validation
* response contract
* error model
* pagination
* idempotency requirements
* rate limiting
* observability

Use consistent versioning.

Define a standard API error model.

Define cursor-based pagination for high-volume collections where appropriate.

---

# 8. REAL-TIME ARCHITECTURE

Define the WebSocket architecture in detail.

Cover:

* connection authentication
* connection authorization
* connection registration
* device association
* connection lifecycle
* heartbeat
* disconnect handling
* reconnect handling
* session expiration
* horizontal scaling
* pub/sub
* presence
* typing indicators
* message events
* delivery events
* read events
* group events
* synchronization events

Define what state is:

* authoritative
* cached
* ephemeral
* derived

Do not store critical durable state solely inside WebSocket processes.

Define how a message created through one WebSocket node reaches recipients connected to other nodes.

---

# 9. MESSAGE LIFECYCLE

Define the complete lifecycle of a message.

At minimum, cover:

1. Client creation
2. Client-side identifier generation
3. Authentication
4. Authorization
5. Validation
6. Persistence
7. Event publication
8. Recipient fan-out
9. Delivery acknowledgement
10. Read acknowledgement
11. Offline recipient handling
12. Multi-device synchronization
13. Retry
14. Duplicate detection
15. Failure recovery
16. Editing
17. Deletion
18. Retention or expiration

Define the authoritative message state machine.

Define legal state transitions.

Define behavior when:

* a client retries
* a recipient reconnects
* a WebSocket node fails
* an event is delivered twice
* a worker fails
* a notification provider fails
* a database transaction succeeds but event publication fails
* an event is delivered before another dependent event

---

# 10. MESSAGE ORDERING

Define ordering semantics explicitly.

The architecture must distinguish between:

* client creation order
* server persistence order
* conversation sequence order
* event delivery order
* device synchronization order

Define how ordering is maintained within a conversation.

Do not require global ordering across the entire platform.

Define behavior under:

* concurrent sends
* reconnects
* multi-device usage
* retries
* delayed events
* duplicated events

---

# 11. IDEMPOTENCY

Identify every operation that may be retried.

Define idempotency mechanisms for:

* message creation
* media processing
* notification delivery
* event consumption
* background jobs
* administrative operations
* account operations

Define:

* idempotency key
* uniqueness constraint
* deduplication storage
* expiration
* retry behavior

Do not depend solely on client-side deduplication.

---

# 12. MULTI-DEVICE ARCHITECTURE

The platform must support users operating multiple devices.

Define:

* device registration
* device identity
* device authentication
* device capabilities
* device revocation
* device synchronization
* per-device delivery state
* per-device read state where required
* message fan-out
* reconnect synchronization
* stale-device handling
* push token management

Define which state belongs to:

* account
* device
* session
* conversation
* message

Ensure that revoking one device does not incorrectly invalidate unrelated devices.

---

# 13. OFFLINE AND SYNCHRONIZATION ARCHITECTURE

Define how clients operate under unreliable connectivity.

Cover:

* local message queue
* pending operations
* retry
* backoff
* acknowledgement
* synchronization cursors
* missed events
* state reconciliation
* duplicate handling
* conflict resolution
* ordering
* attachment upload recovery

Define the synchronization protocol sufficiently precisely for clients to implement it consistently.

The architecture must support clients reconnecting after:

* seconds
* minutes
* hours
* extended offline periods

without requiring complete conversation reloads whenever incremental synchronization is possible.

---

# 14. PRESENCE ARCHITECTURE

Presence is ephemeral and must not unnecessarily burden the primary relational database.

Define:

* online state
* offline state
* last-seen state
* typing indicators
* presence TTL
* heartbeat
* expiration
* privacy controls
* horizontal scaling
* Redis usage
* event fan-out

Define failure behavior when Redis or the real-time layer is unavailable.

Presence must degrade gracefully rather than corrupt durable messaging state.

---

# 15. GROUP ARCHITECTURE

Define group-specific architecture for:

* group creation
* membership
* administrators
* roles
* permissions
* invitations
* participant changes
* metadata
* group deletion
* participant removal
* membership history where required

Define authorization rules for:

* adding members
* removing members
* promoting administrators
* demoting administrators
* changing group metadata
* sending messages
* pinning messages
* changing disappearing-message settings

Define how membership changes propagate to connected devices.

---

# 16. GROUP FAN-OUT

The architecture must address large groups and high fan-out.

Define strategies for:

* small groups
* large groups
* message event distribution
* online recipients
* offline recipients
* multi-device recipients
* push notification generation

Avoid architectures where a single request synchronously performs an unbounded number of downstream operations.

Define asynchronous fan-out where appropriate.

Define backpressure and failure handling.

---

# 17. MESSAGE STORAGE

Define the PostgreSQL data model at architectural level.

Identify major entities including, where appropriate:

* Account
* Profile
* Device
* Session
* Contact
* Block
* Conversation
* ConversationParticipant
* Group
* GroupRole
* Message
* MessageRecipientState
* MessageReaction
* MessageAttachment
* MessageEdit
* MessageDeletion
* Notification
* PrivacySetting
* Report
* AuditRecord

For each entity, define:

* purpose
* ownership
* major identifiers
* important relationships
* lifecycle
* high-volume considerations
* indexing requirements
* retention implications

Do not write the final Prisma schema in this volume unless necessary to resolve an architectural contract.

---

# 18. DATABASE SCALABILITY

Define how PostgreSQL will scale.

Address:

* connection pooling
* read replicas
* partitioning
* indexing
* archival
* high-volume message tables
* write-heavy workloads
* transaction boundaries
* hot rows
* lock contention
* migration strategy
* backup strategy

Determine where partitioning is appropriate.

Do not introduce database sharding without a clear reason.

If future sharding is expected, define the architectural boundary that would permit it.

---

# 19. REDIS ARCHITECTURE

Define Redis usage by domain.

For every major Redis use case, specify:

* purpose
* key structure
* data format
* TTL
* invalidation
* consistency expectations
* failure behavior

Explicitly address:

* presence
* typing
* rate limits
* caching
* coordination
* ephemeral state

Identify which Redis data may be safely reconstructed after failure.

---

# 20. EVENT-DRIVEN ARCHITECTURE

Define the event architecture using Kafka or Redpanda.

Identify major event categories such as:

* account events
* device events
* conversation events
* membership events
* message events
* delivery events
* read events
* media events
* notification events
* moderation events

For every important event family define:

* producer
* consumer
* purpose
* ordering requirements
* partitioning strategy
* retention
* replay expectations
* idempotency
* schema versioning
* failure handling

Use a transactional outbox where required.

---

# 21. EVENT SCHEMA STANDARDS

All durable events must use a consistent envelope.

The architecture must define fields appropriate for:

* event ID
* event type
* version
* aggregate/entity ID
* producer
* occurred-at timestamp
* correlation ID
* causation ID where useful
* trace context
* payload

Event payloads must contain only information required by consumers.

Avoid embedding secrets or unnecessary private content.

Define schema evolution rules.

Consumers must tolerate compatible future schema changes.

---

# 22. QUEUE ARCHITECTURE

Define BullMQ responsibilities separately from durable event streaming.

Appropriate queue workloads may include:

* notification delivery
* media processing
* thumbnail generation
* search indexing
* cleanup
* moderation processing
* analytics aggregation
* retryable provider calls

Define:

* queue names
* job categories
* retry policies
* backoff
* concurrency
* timeout
* idempotency
* dead-letter handling
* monitoring

Do not use queues as an excuse to hide consistency problems.

---

# 23. MEDIA ARCHITECTURE

Define the complete media flow.

Cover:

1. Client requests upload authorization.
2. Server validates authorization.
3. Client uploads securely to object storage.
4. Upload completion is recorded.
5. Media is validated.
6. Processing is queued where necessary.
7. FFmpeg generates required variants.
8. Metadata is persisted.
9. Media becomes available.
10. CDN delivery is authorized.
11. Lifecycle policies manage retention.

Define:

* upload limits
* MIME validation
* object naming
* signed URLs
* expiration
* processing states
* failure states
* retries
* cleanup
* access control

---

# 24. SEARCH ARCHITECTURE

Define search architecture using Elasticsearch or OpenSearch.

Cover:

* message indexing
* conversation filtering
* authorization filtering
* indexing events
* retries
* reindexing
* aliases
* versioning
* retention
* consistency
* deleted-message handling

Search must never expose messages that the requesting user is not authorized to access.

Define how index lag is handled.

The relational database remains authoritative.

---

# 25. NOTIFICATION ARCHITECTURE

Define push notification architecture for:

* FCM
* APNs

Cover:

* device token management
* token invalidation
* notification preferences
* offline users
* multiple devices
* message grouping
* retries
* provider failures
* rate limiting
* privacy-sensitive notification content

Do not expose unnecessary private message content in notifications.

Define fallback behavior when notification providers are unavailable.

---

# 26. PRIVACY ARCHITECTURE

Define privacy controls for:

* profile visibility
* online status
* last seen
* read receipts
* contact discovery
* group invitations
* blocked users
* media access
* message retention
* disappearing messages

Privacy decisions must be enforced server-side.

Define precedence rules when privacy settings conflict with relationship or group state.

---

# 27. SECURITY ARCHITECTURE

Define security boundaries for:

* public APIs
* authenticated APIs
* WebSockets
* internal services
* workers
* databases
* Redis
* event brokers
* object storage
* search
* administrative systems

Define:

* authentication
* authorization
* secret management
* encryption in transit
* encryption at rest
* key management
* rate limiting
* abuse prevention
* audit logging
* administrative access

Clearly distinguish:

* transport encryption
* storage encryption
* application-level encryption
* end-to-end encryption

Do not represent one as another.

If end-to-end encryption is part of the product architecture, define its boundaries and cryptographic integration requirements without inventing custom cryptographic algorithms.

---

# 28. RATE LIMITING AND ABUSE CONTROL

Define rate limits for major abuse-sensitive operations.

Consider:

* login
* registration
* verification
* password recovery
* contact discovery
* message sending
* group creation
* group invitations
* media uploads
* search
* WebSocket connection attempts
* administrative operations

Define:

* identity key
* IP key
* device key
* account key
* burst behavior
* sustained rate
* Redis implementation
* failure behavior

Avoid rate limiting that creates trivial bypasses.

---

# 29. ADMINISTRATION

Define the administrative architecture.

Cover:

* administrator authentication
* privileged roles
* permissions
* audit logging
* user lookup
* account restrictions
* abuse reports
* moderation workflows
* operational dashboards

Administrative APIs must not reuse ordinary user authorization assumptions.

All privileged actions must be auditable.

---

# 30. OBSERVABILITY ARCHITECTURE

Define observability across:

* REST
* WebSockets
* PostgreSQL
* Prisma
* Redis
* Kafka/Redpanda
* BullMQ
* media processing
* search
* FCM
* APNs
* external providers

Define:

* metrics
* logs
* traces
* correlation IDs
* alerting
* dashboards
* SLO-oriented measurements

At minimum identify important measurements for:

* message latency
* message throughput
* WebSocket connection count
* reconnect rate
* event lag
* queue depth
* job failures
* database latency
* Redis latency
* search latency
* notification delivery
* media processing latency

---

# 31. FAILURE MODEL

Document expected behavior for failures including:

* API instance failure
* WebSocket node failure
* database connection failure
* Redis failure
* Kafka/Redpanda failure
* queue worker failure
* search failure
* object-storage failure
* CDN failure
* FCM failure
* APNs failure

For each dependency, define:

* timeout
* retry
* fallback
* degradation
* recovery
* user-visible behavior

Critical messaging functionality must not fail unnecessarily because a noncritical subsystem is unavailable.

---

# 32. DATA CONSISTENCY MODEL

Explicitly classify major operations as:

* strongly consistent
* transactionally consistent
* eventually consistent
* ephemeral

At minimum address:

* message persistence
* message delivery
* read receipts
* presence
* typing
* group membership
* profile updates
* search indexing
* notification delivery
* media processing

Do not hide eventual consistency.

Define how clients observe and reconcile it.

---

# 33. DISASTER RECOVERY

Define architectural requirements for:

* PostgreSQL backups
* point-in-time recovery
* Redis recovery where relevant
* event retention
* object-storage durability
* search reconstruction
* infrastructure recreation
* secrets recovery
* regional failure

Define appropriate:

* RPO
* RTO
* backup frequency
* retention
* restoration procedures
* regional recovery strategy

Search indexes and caches should be reconstructible where practical.

---

# 34. ARCHITECTURAL DECISION RECORDS

For important decisions, document:

* decision
* alternatives considered
* rationale
* consequences
* operational impact
* scalability implications
* security implications

Important decisions must include, at minimum where applicable:

* modular monolith vs services
* WebSocket scaling
* PostgreSQL scaling
* Redis usage
* event streaming
* queue architecture
* media architecture
* search architecture
* multi-device synchronization
* group fan-out
* consistency model
* regional deployment

---

# 35. ARCHITECTURE CONTRACTS

Produce explicit contracts for the implementation teams.

The architecture must establish stable conventions for:

* naming
* identifiers
* timestamps
* pagination
* API errors
* authentication
* authorization
* event envelopes
* queue jobs
* tracing
* logging
* database ownership
* configuration
* environment variables
* secrets

These contracts must be specific enough that backend, web, mobile, infrastructure, and QA implementations can remain compatible.

---

# 36. ARCHITECTURAL COMPLETION CRITERIA

Architecture Volume 1 is complete only when it provides a coherent system-level blueprint covering:

* product boundaries
* system topology
* domain boundaries
* service/module boundaries
* database ownership
* API architecture
* real-time architecture
* message lifecycle
* multi-device synchronization
* offline synchronization
* event architecture
* queue architecture
* media architecture
* search architecture
* notification architecture
* security architecture
* privacy architecture
* observability architecture
* failure behavior
* consistency model
* scalability strategy
* disaster recovery direction

Do not leave critical architectural responsibilities undefined.

Do not substitute vague statements such as "handle appropriately" where an implementation-relevant decision is required.

---

# 37. REQUIRED ARCHITECTURE DELIVERABLE

Produce the architecture as a structured engineering document inside the repository or in the repository's established architecture-documentation location.

The resulting architecture documentation must be:

* internally consistent
* implementation-oriented
* versionable
* reviewable
* explicit
* traceable

Where diagrams are used, ensure that their accompanying textual descriptions contain enough information to understand the architecture without relying solely on the diagram.

---

# 38. IMPLEMENTATION BOUNDARY

This architecture volume is responsible for defining the system-level architecture and foundational contracts.

Do not prematurely implement all backend, frontend, mobile, or infrastructure functionality during this task.

If repository inspection reveals existing implementation that conflicts with a necessary architectural decision, resolve the conflict deliberately and document the required migration or compatibility strategy.

Do not perform broad unrelated rewrites.

---

# 39. VALIDATION REQUIREMENTS

Before declaring this architecture task complete:

1. Inspect the repository.
2. Verify the architecture against the existing project structure.
3. Verify that domain boundaries do not create circular ownership.
4. Verify database ownership.
5. Verify API and real-time responsibilities.
6. Verify event and queue responsibilities.
7. Verify multi-device synchronization.
8. Verify failure behavior.
9. Verify security boundaries.
10. Verify privacy boundaries.
11. Verify scalability assumptions.
12. Verify observability requirements.
13. Verify disaster-recovery direction.
14. Verify that web and mobile clients can consume the defined contracts.
15. Verify that infrastructure can deploy the defined topology.
16. Identify contradictions or unresolved architectural decisions.

Do not claim architectural completeness if major boundaries remain ambiguous.

---

# 40. FINAL IMPLEMENTATION REPORT

At the completion of this architecture task, report:

1. **Files Created**
2. **Files Modified**
3. **Architecture Defined**
4. **Domain Boundaries Defined**
5. **Database Ownership Defined**
6. **API Contracts Defined**
7. **Real-Time Contracts Defined**
8. **Event Contracts Defined**
9. **Queue Contracts Defined**
10. **Infrastructure Direction Defined**
11. **Security and Privacy Decisions**
12. **Observability Decisions**
13. **Reliability and Failure Decisions**
14. **Validation Performed**
15. **Compatibility Considerations**
16. **Unresolved Architectural Issues**

Only report architecture that was actually documented or implemented in the repository.

Do not claim that a contract exists if it was not actually defined.

# ARCHITECTURE STANDARD

The resulting architecture must be capable of guiding implementation of a globally scalable communication platform while remaining practical to operate, test, secure, monitor, and evolve.

Every architectural decision must support coherent integration across backend, web, mobile, infrastructure, and QA.

The architecture must prioritize:

1. Correctness
2. Security
3. Privacy
4. Data integrity
5. Reliability
6. Maintainability
7. Scalability
8. Observability
9. Performance
10. Operational efficiency
