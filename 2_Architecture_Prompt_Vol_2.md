# WHATSAPP — ARCHITECTURE VOLUME 2

## ROLE

You are operating as the senior architecture and distributed-systems engineering organization responsible for completing the implementation-ready technical architecture of a globally scalable real-time communication platform named **WhatsApp**.

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
* Mobile Architect
* Frontend Architect
* QA Architect
* Technical Writer

Do not behave as a tutorial author.

Your responsibility is to inspect the repository and produce the detailed technical architecture and contracts required for implementation of the communication platform defined by this prompt.

This architecture must stand alone as an engineering specification. Do not rely on another AI-generated prompt or conversation being available.

---

# PROJECT

Build an enterprise-grade, globally scalable real-time communication platform named **WhatsApp**.

The platform must support:

* one-to-one messaging
* group messaging
* accounts
* profiles
* contacts
* devices
* sessions
* authentication
* authorization
* presence
* typing indicators
* delivery states
* read receipts
* replies
* reactions
* editing
* deletion
* forwarding
* pinned messages
* starred/saved messages
* images
* videos
* audio
* voice messages
* documents
* stickers
* GIF-oriented media
* link previews
* message search
* push notifications
* multi-device synchronization
* offline synchronization
* privacy controls
* blocking
* reporting
* disappearing messages
* moderation
* administration
* abuse prevention
* analytics
* secure media storage and delivery

The architecture must support a global user population potentially reaching hundreds of millions of accounts, very large concurrent connection counts, high message throughput, large media volumes, large group fan-out, and geographically distributed traffic.

---

# TECHNOLOGY DIRECTION

Use the following technology direction unless repository inspection identifies an existing technically justified implementation that should remain compatible:

### Web

* Next.js
* React
* TypeScript
* Tailwind CSS
* reusable accessible components
* TanStack Query or equivalent
* Zustand or equivalent where appropriate

### Mobile

* React Native
* Expo where compatible
* TypeScript
* React Navigation
* secure device storage
* FCM
* APNs

### Backend

* Node.js
* TypeScript
* NestJS
* REST
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

AWS is the default cloud direction unless the repository explicitly establishes another provider.

---

# SOURCE OF TRUTH

The repository is the authoritative source of truth for the current implementation.

Before making architectural decisions:

1. Inspect the repository.
2. Inspect the existing applications and packages.
3. Inspect database schemas and migrations.
4. Inspect API definitions.
5. Inspect WebSocket implementations.
6. Inspect event and queue infrastructure.
7. Inspect frontend and mobile implementations.
8. Inspect media handling.
9. Inspect infrastructure configuration.
10. Inspect tests.
11. Inspect environment configuration.
12. Identify existing contracts that must remain compatible.
13. Identify implementation gaps that the architecture must address.

Do not assume that functionality exists simply because it is conceptually required.

Do not replace existing compatible architecture without a technical justification.

The repository describes what currently exists.

This prompt defines the detailed architectural target.

---

# 1. ARCHITECTURAL MISSION

Complete the technical blueprint required to implement the platform safely at production scale.

This architecture volume must turn the high-level architecture into explicit implementation contracts covering:

* API conventions
* database structures
* real-time protocols
* synchronization
* event contracts
* queue contracts
* security
* privacy
* media
* notifications
* search
* clients
* observability
* infrastructure interfaces
* failure handling
* operational behavior

Do not produce vague conceptual descriptions.

Every major technical decision must be concrete enough for implementation teams to follow without inventing incompatible behavior.

---

# 2. DOMAIN CONTRACTS

Define detailed contracts for the following domains:

### Identity

Define:

* account identifiers
* credential lifecycle
* authentication methods
* account verification
* account recovery
* account deletion
* security state

### Profiles

Define:

* profile identifiers
* editable fields
* visibility
* avatar ownership
* profile update propagation
* privacy enforcement

### Devices

Define:

* device identifiers
* device registration
* device naming
* capabilities
* push-token association
* session association
* revocation
* synchronization state

### Contacts

Define:

* contact relationships
* discovery
* synchronization
* visibility
* blocking
* contact lifecycle

### Conversations

Define:

* conversation identifiers
* direct conversations
* group conversations
* participants
* conversation metadata
* lifecycle
* unread state

### Groups

Define:

* group identifiers
* roles
* membership
* permissions
* invitation behavior
* administration
* membership changes

### Messages

Define:

* identifiers
* message types
* sender
* conversation
* timestamps
* sequence/order
* content
* attachments
* reply relationships
* edit state
* deletion state
* reactions
* forwarding
* expiration

### Delivery

Define:

* queued
* accepted
* delivered
* read
* failed
* retry
* synchronization state

Do not create inconsistent definitions across domains.

---

# 3. IDENTIFIER STRATEGY

Define identifier strategies for:

* accounts
* profiles
* devices
* sessions
* conversations
* groups
* messages
* attachments
* events
* jobs
* reports
* administrative records

Identifiers must be:

* globally safe
* collision resistant
* appropriate for distributed generation where necessary
* indexable
* suitable for API exposure

Define where UUIDs, ULIDs, database-generated identifiers, or another strategy is appropriate.

Explain implications for:

* ordering
* indexing
* pagination
* sharding
* event partitioning

---

# 4. TIME AND CLOCK SEMANTICS

Define standardized timestamp behavior.

Specify:

* server timestamps
* client timestamps
* timezone handling
* precision
* clock skew
* ordering implications
* expiration calculations
* retention calculations

Server-controlled timestamps must be authoritative for security-sensitive and ordering-sensitive operations.

Client timestamps must never be trusted for authorization or authoritative ordering.

---

# 5. API CONTRACT STANDARD

Define the complete API contract conventions.

Specify:

* URL versioning
* resource naming
* HTTP methods
* status codes
* request envelopes
* response envelopes
* validation errors
* authorization errors
* resource-not-found behavior
* conflict behavior
* rate-limit responses
* internal error behavior
* request IDs
* correlation IDs

Define a consistent error format containing enough structured information for web and mobile clients to behave correctly without leaking sensitive internal information.

---

# 6. PAGINATION CONTRACT

Define pagination for:

* conversations
* messages
* contacts
* groups
* participants
* media
* search
* notifications
* administrative records

Prefer cursor pagination for high-volume resources.

Define:

* cursor encoding
* cursor contents
* sort order
* stable ordering
* invalid cursor behavior
* deleted-record behavior
* concurrent insertion behavior

Do not expose raw database implementation details through cursors.

---

# 7. MESSAGE API CONTRACT

Define detailed request/response semantics for:

* creating messages
* retrieving messages
* acknowledging delivery
* acknowledging reads
* editing messages
* deleting messages
* reacting
* forwarding
* pinning
* saving
* replying
* retrying failed sends

Define:

* authentication
* authorization
* idempotency
* validation
* ordering
* error handling
* response behavior
* event generation

Message creation must be safe under retries.

---

# 8. WEBSOCKET CONTRACT

Define the real-time protocol.

Specify:

### Connection

* authentication
* device identity
* connection identifier
* heartbeat
* timeout
* reconnect
* session expiration

### Client-to-server events

Define appropriate event names and payload responsibilities for:

* presence
* typing
* message send
* delivery acknowledgement
* read acknowledgement
* synchronization requests
* group operations where appropriate

### Server-to-client events

Define appropriate events for:

* new messages
* message state changes
* reactions
* edits
* deletions
* conversation updates
* membership updates
* presence
* typing
* synchronization
* notification-related state

Every event must have:

* stable name
* version
* identifier
* payload contract
* authorization requirements
* idempotency behavior
* ordering expectations

---

# 9. REAL-TIME AUTHENTICATION

Define how WebSocket connections authenticate.

Address:

* access-token validation
* device binding
* session validation
* token expiration
* revocation
* reconnect authentication
* concurrent connections
* suspicious connection behavior

Do not place authorization solely at connection establishment.

Each sensitive operation must still be authorized against current server-side state.

---

# 10. SYNCHRONIZATION PROTOCOL

Define a formal synchronization protocol.

The protocol must allow a device to request changes after:

* temporary network loss
* application restart
* device restart
* long offline periods
* WebSocket failure
* push notification delivery
* partial synchronization

Define:

* synchronization cursor
* server change sequence
* per-device state
* incremental changes
* acknowledgement
* replay
* deduplication
* reconciliation
* full resynchronization fallback

Define what happens when a cursor is:

* valid
* expired
* corrupted
* too old
* no longer available

---

# 11. MULTI-DEVICE MESSAGE SEMANTICS

Define exactly how messages behave across multiple devices.

Address:

* sender's multiple devices
* recipient's multiple devices
* device-specific delivery
* read state
* message edits
* deletions
* reactions
* disappearing messages
* attachments
* retries
* device revocation

Avoid duplicate message creation when multiple devices perform retries.

Define authoritative conversation state independently from individual device state.

---

# 12. OFFLINE MESSAGE QUEUE

Define the client-side pending-operation model.

Operations may include:

* sending a message
* editing
* deleting
* reacting
* marking read
* uploading media

Define:

* operation ID
* local status
* server status
* retry count
* retry delay
* dependency ordering
* conflict behavior
* cancellation
* expiration

The server must remain authoritative.

---

# 13. DATABASE CONTRACT

Define the relational schema architecture in implementation-ready detail.

For each major table/entity define:

* primary key
* foreign keys
* important columns
* uniqueness
* nullable fields
* indexes
* constraints
* ownership
* lifecycle
* deletion behavior
* retention
* partitioning considerations

At minimum cover:

* accounts
* credentials/security state
* profiles
* devices
* sessions
* contacts
* blocks
* conversations
* conversation participants
* groups
* group roles
* messages
* message states
* reactions
* attachments
* message edits
* message deletions
* notification records
* privacy settings
* reports
* audit records
* outbox records

Do not leave ownership ambiguous.

---

# 14. MESSAGE DATABASE DESIGN

Message persistence is one of the highest-volume portions of the platform.

Define:

* message primary key
* conversation lookup strategy
* sender lookup strategy
* chronological ordering
* indexes
* partitioning
* attachment relationships
* reply relationships
* deletion representation
* edit representation
* expiration representation

Optimize for:

* recent-message retrieval
* conversation pagination
* synchronization
* unread calculations
* moderation access where authorized
* administrative investigation where legally and operationally appropriate

Avoid designs requiring expensive full-table scans.

---

# 15. DELIVERY-STATE DATABASE DESIGN

Define how delivery and read states are persisted.

Distinguish:

* message-level state
* recipient-level state
* device-level state

Avoid generating unnecessarily large relational records when a derived representation can provide equivalent correctness.

Define indexes and retention.

Define behavior for:

* offline recipients
* multiple devices
* duplicate acknowledgements
* delayed acknowledgements
* revoked devices

---

# 16. TRANSACTION BOUNDARIES

Identify which operations must be transactional.

Examples include:

* account creation
* conversation creation
* message persistence
* group membership changes
* device registration
* outbox creation

For each important transaction define:

* authoritative database
* transaction scope
* isolation requirements
* rollback behavior
* external side effects

External services must not be treated as participating in PostgreSQL transactions unless a real distributed transaction mechanism exists and is justified.

Use outbox/event patterns for reliable asynchronous propagation.

---

# 17. OUTBOX ARCHITECTURE

Define the transactional outbox strategy.

The architecture must specify:

* outbox ownership
* event record structure
* event status
* retry behavior
* publisher workers
* ordering
* deduplication
* cleanup
* monitoring
* failure recovery

A successful database transaction must not result in silently lost durable events.

Outbox publication must be idempotent.

---

# 18. EVENT PARTITIONING

Define Kafka/Redpanda partitioning strategies.

Choose appropriate partition keys based on:

* conversation
* account
* device
* aggregate

Preserve ordering where required without creating excessive hot partitions.

Define:

* topic naming
* partition strategy
* retention
* replication
* consumer groups
* retry strategy
* dead-letter strategy

Do not use a single global partition for high-volume messaging.

---

# 19. EVENT VERSIONING

Define event evolution rules.

Every durable event must have a version.

Define:

* backward compatibility
* additive changes
* deprecated fields
* consumer migration
* producer migration
* replay behavior
* schema validation

Do not silently change event semantics.

---

# 20. QUEUE CONTRACTS

Define the production queue contracts for:

* notification delivery
* media processing
* thumbnails
* search indexing
* cleanup
* moderation
* analytics

For each queue define:

* job name
* payload
* retry count
* backoff
* timeout
* concurrency
* priority
* idempotency
* deduplication
* dead-letter handling
* metrics

Queue payloads must be compact and versionable.

---

# 21. MEDIA DATA MODEL

Define entities for:

* media asset
* upload session
* media variant
* processing job
* attachment
* access authorization

Define media states such as:

* initiated
* uploading
* uploaded
* processing
* ready
* failed
* expired
* deleted

Define ownership and authorization for each state.

---

# 22. MEDIA SECURITY

Define:

* upload authorization
* content validation
* object isolation
* signed URLs
* expiration
* download authorization
* CDN behavior
* malware scanning where applicable
* metadata validation
* file-size restrictions

Never allow an authenticated user to retrieve arbitrary objects merely by knowing an object identifier.

---

# 23. SEARCH CONTRACT

Define the search API and indexing model.

Search must support only authorized content.

Define:

* searchable fields
* filters
* pagination
* ranking
* indexing triggers
* deletion triggers
* reindexing
* authorization filtering
* stale-index behavior

The primary database remains authoritative.

---

# 24. NOTIFICATION CONTRACT

Define notification records and provider abstractions.

The architecture must support:

* device token registration
* token invalidation
* provider selection
* retries
* backoff
* provider failures
* notification preferences
* multiple devices
* deduplication

Define privacy rules for notification payloads.

Do not place sensitive content into notifications unless explicitly allowed by the user's privacy settings and product requirements.

---

# 25. PRIVACY DATA MODEL

Define persistent structures for:

* privacy preferences
* blocked users
* visibility settings
* notification preferences
* disappearing-message settings
* contact discovery preferences

Define inheritance and precedence rules.

Privacy must not be implemented solely through frontend filtering.

---

# 26. DISAPPEARING MESSAGES

Define the architecture for message expiration.

Cover:

* conversation-level configuration
* message-level expiration timestamp
* server-side expiration
* client display behavior
* synchronization
* offline devices
* deletion events
* media cleanup
* search cleanup
* backup implications

Define authoritative expiration behavior.

Avoid relying solely on client timers.

---

# 27. BLOCKING

Define blocking semantics.

When a user blocks another user, specify behavior for:

* new messages
* existing conversations
* presence
* last seen
* typing
* profile visibility
* calls if applicable
* notifications
* group interactions
* media

Define whether blocking is unilateral and how the blocked state is enforced.

---

# 28. REPORTING AND MODERATION

Define:

* report types
* reporter
* target
* evidence references
* status
* administrative review
* audit trail
* retention
* access control

Moderation systems must minimize unnecessary access to private content.

Administrative access must be auditable.

---

# 29. SECURITY THREAT MODEL

Produce a threat model addressing at minimum:

* credential theft
* account takeover
* session theft
* token replay
* IDOR
* privilege escalation
* malicious WebSocket clients
* spam
* brute force
* credential stuffing
* malicious uploads
* injection
* SSRF
* XSS
* CSRF
* event poisoning
* queue abuse
* notification abuse
* scraping
* enumeration
* denial of service

For each threat define:

* attack surface
* mitigation
* monitoring
* response

---

# 30. CRYPTOGRAPHY BOUNDARIES

Clearly define cryptographic responsibilities.

Separate:

* TLS
* database/storage encryption
* secret encryption
* token signing
* password hashing
* application-level encryption
* end-to-end encryption if implemented

Use established cryptographic libraries.

Do not invent custom cryptographic primitives.

If end-to-end encryption is part of the implementation scope, define the architecture around established protocols and libraries, including:

* identity keys
* device keys
* session establishment
* key rotation
* multi-device behavior
* message encryption boundaries
* attachment encryption
* recovery implications

Do not claim cryptographic guarantees that the actual architecture cannot provide.

---

# 31. CLIENT SECURITY

Define secure client responsibilities for web and mobile.

Cover:

* token storage
* refresh handling
* secure device storage
* logout
* session revocation
* sensitive data handling
* local cache protection
* notification privacy
* deep-link validation
* malicious content handling

Do not store long-lived secrets in insecure browser storage when a safer architecture is available.

---

# 32. FRONTEND ARCHITECTURE CONTRACT

Define the web client's architectural boundaries.

Cover:

* routing
* authentication state
* authorization
* API client
* WebSocket client
* query/cache layer
* local state
* message cache
* optimistic operations
* error boundaries
* notification handling
* accessibility
* analytics

Define how the frontend reacts to:

* token expiration
* WebSocket reconnect
* stale data
* synchronization
* authorization failure
* rate limiting
* offline behavior

---

# 33. MOBILE ARCHITECTURE CONTRACT

Define the mobile client's architectural boundaries.

Cover:

* navigation
* authentication
* secure storage
* API client
* WebSocket client
* local persistence
* offline queue
* synchronization
* push notifications
* deep links
* media handling
* permissions
* background behavior

Define how mobile clients reconcile local state with authoritative server state.

---

# 34. INFRASTRUCTURE CONTRACT

Define the infrastructure interfaces required by the application.

Specify:

* service discovery
* networking
* ingress
* TLS
* DNS
* load balancing
* Kubernetes workloads
* autoscaling
* PostgreSQL
* Redis
* Kafka/Redpanda
* search
* object storage
* CDN
* secrets
* IAM
* observability

Define environment-specific differences for:

* local
* development
* test
* staging
* production

Do not require production-scale infrastructure for local development.

---

# 35. MULTI-REGION ARCHITECTURE

Define the global deployment strategy.

Address:

* region selection
* traffic routing
* latency
* data residency
* regional failover
* active-active vs active-passive
* database topology
* event replication
* media locality
* CDN behavior
* search locality
* WebSocket locality

Clearly identify which data is:

* region-local
* globally replicated
* authoritative in one region
* eventually replicated

Do not assume multi-region writes are trivial.

---

# 36. CAPACITY AND SCALING

Define scaling dimensions for:

* API servers
* WebSocket nodes
* workers
* PostgreSQL
* Redis
* Kafka/Redpanda
* search
* media processors
* notification workers

Identify:

* horizontal scaling triggers
* bottlenecks
* hot partitions
* connection limits
* queue saturation
* database saturation
* regional capacity limits

Define metrics required for capacity planning.

---

# 37. SLO AND RELIABILITY TARGETS

Define practical service-level objectives for important paths.

At minimum consider:

* API availability
* message acceptance latency
* message delivery latency
* WebSocket connection availability
* synchronization latency
* notification processing
* media processing
* search availability

Define how SLOs are measured.

Avoid defining unrealistic guarantees that the architecture cannot support.

---

# 38. FAILURE AND RECOVERY CONTRACTS

Define explicit recovery behavior for:

### PostgreSQL failure

Cover:

* connection exhaustion
* primary failure
* replica failure
* failover
* retry
* transaction rollback

### Redis failure

Cover:

* cache loss
* presence loss
* rate-limit degradation
* reconnection

### Kafka/Redpanda failure

Cover:

* producer failure
* consumer lag
* delayed events
* replay

### Search failure

Cover:

* degraded search
* index reconstruction
* eventual consistency

### Object storage failure

Cover:

* upload failure
* download failure
* processing retries

### Push provider failure

Cover:

* retry
* backoff
* provider recovery

---

# 39. BACKUP AND RESTORE ARCHITECTURE

Define backup requirements for:

* PostgreSQL
* configuration
* secrets where recoverable through the chosen secret-management system
* important object metadata

Define:

* backup frequency
* retention
* encryption
* geographic redundancy
* restore testing
* point-in-time recovery

Caches and search indexes should be reconstructible whenever practical.

---

# 40. OPERATIONAL RUNBOOK REQUIREMENTS

Define required runbooks for:

* service outage
* database failover
* Redis failure
* event broker outage
* queue backlog
* WebSocket overload
* media processing backlog
* search outage
* notification outage
* security incident
* regional failure
* restore procedure

Runbooks must identify:

* symptoms
* metrics
* diagnosis
* mitigation
* recovery
* verification

---

# 41. ARCHITECTURAL VALIDATION

Before completing this architecture task:

1. Inspect the repository.
2. Validate domain boundaries.
3. Validate database ownership.
4. Validate API contracts.
5. Validate WebSocket contracts.
6. Validate synchronization semantics.
7. Validate event schemas.
8. Validate queue contracts.
9. Validate media flows.
10. Validate notification flows.
11. Validate privacy enforcement.
12. Validate security boundaries.
13. Validate failure behavior.
14. Validate multi-region assumptions.
15. Validate scalability assumptions.
16. Validate frontend and mobile integration requirements.
17. Validate infrastructure compatibility.
18. Identify contradictions.
19. Identify missing contracts.
20. Resolve or explicitly document unresolved architectural decisions.

The architecture must be internally coherent before implementation begins.

---

# 42. IMPLEMENTATION BOUNDARY

This prompt defines the detailed architecture and implementation contracts for the WhatsApp platform.

Do not use this task as an excuse to rewrite the entire repository.

Do not implement unrelated product functionality.

Where existing implementation differs from the architecture, document the required compatibility strategy, migration, or justified exception.

Do not silently invalidate existing APIs, schemas, or infrastructure.

---

# 43. DOCUMENTATION REQUIREMENTS

Document the architecture in the repository's established architecture/documentation location.

Include, where appropriate:

* system diagrams
* domain diagrams
* data-flow diagrams
* sequence diagrams
* API contracts
* WebSocket contracts
* event contracts
* queue contracts
* data ownership
* security boundaries
* deployment topology
* failure behavior
* operational requirements
* architecture decision records

Text accompanying diagrams must remain sufficient to understand the architecture independently.

---

# 44. COMPLETION CRITERIA

Architecture Volume 2 is complete only when the repository contains an implementation-ready technical architecture covering:

* domain contracts
* identifier strategy
* time semantics
* API conventions
* pagination
* message APIs
* WebSocket protocol
* authentication
* synchronization
* multi-device behavior
* offline operations
* database contracts
* transaction boundaries
* outbox architecture
* event partitioning
* event versioning
* queue contracts
* media contracts
* search contracts
* notification contracts
* privacy model
* disappearing messages
* blocking
* moderation
* threat model
* cryptographic boundaries
* frontend architecture
* mobile architecture
* infrastructure interfaces
* multi-region strategy
* capacity planning
* SLOs
* failure recovery
* backups
* operational runbooks

No major implementation team should need to invent fundamental system contracts after this architecture has been completed.

---

# 45. FINAL IMPLEMENTATION REPORT

At the completion of this architecture task, report:

1. **Files Created**
2. **Files Modified**
3. **Domain Contracts Defined**
4. **API Contracts Defined**
5. **WebSocket Contracts Defined**
6. **Synchronization Contracts Defined**
7. **Database Contracts Defined**
8. **Event and Queue Contracts Defined**
9. **Media and Notification Contracts Defined**
10. **Security and Privacy Architecture Defined**
11. **Client Architecture Defined**
12. **Infrastructure Architecture Defined**
13. **Multi-Region and Scaling Decisions**
14. **Reliability and Disaster-Recovery Decisions**
15. **Validation Performed**
16. **Compatibility Considerations**
17. **Unresolved Architectural Issues**

Only report decisions and documentation actually produced in the repository.

Do not claim that a contract has been finalized if it remains unresolved.

# ARCHITECTURE STANDARD

The completed architecture must allow backend, frontend, mobile, infrastructure, and QA engineering work to proceed against consistent contracts.

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
