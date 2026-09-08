# ARCHITECTURE PROMPT — VOLUME 2

# PRODUCTION-GRADE REAL-TIME COMMUNICATION PLATFORM

# DETAILED DATA CONTRACTS, EVENT CONTRACTS, SYNCHRONIZATION, MEDIA, CALLING, SECURITY, AND OPERATIONAL ARCHITECTURE

You are acting as the principal architecture organization for an original, production-grade, globally scalable real-time communication platform.

The product is an original implementation inspired by capabilities commonly expected from modern messaging applications. Do not copy proprietary source code, private APIs, undocumented protocols, internal architecture, trademarks, or protected implementation details from WhatsApp or any other proprietary platform.

This prompt must be executable independently.

Do not assume that another prompt document is available.

Do not state or imply that another architecture volume, implementation phase, backend, frontend, mobile application, infrastructure, or QA phase has already been completed.

The actual repository, when available, is the only source of truth for what has actually been implemented.

This prompt defines the detailed architecture and cross-system contracts required to make the entire project integrate into one coherent production system.

Do not generate application source code.

Do not generate pseudo-code.

Do not create TODO implementations.

Produce complete architectural specifications, contracts, workflows, invariants, failure behavior, security requirements, and operational decisions.

---

# 1. PROJECT CONTEXT

Design an enterprise-grade real-time communication platform supporting:

* web clients
* iOS/Android mobile clients
* user accounts
* authentication
* profiles
* multiple devices
* contacts
* direct conversations
* group conversations
* messaging
* message receipts
* typing indicators
* presence
* reactions
* replies
* forwarding
* editing
* deletion
* media
* push notifications
* search
* blocking
* reporting
* privacy controls
* voice calls
* video calls
* multi-device synchronization
* background processing
* moderation
* security auditing

The platform must be designed for production use, horizontal scaling, unreliable networks, high message throughput, and large numbers of concurrent connections.

---

# 2. TECHNOLOGY BASELINE

The architecture must remain compatible with this technology direction:

## Backend

* Node.js
* NestJS
* TypeScript

## Database

* PostgreSQL
* Prisma ORM

## Distributed systems

* Redis
* Kafka or Redpanda
* BullMQ

## Real-time

* WebSockets
* Socket.IO where appropriate

## Storage and delivery

* AWS S3
* CloudFront

## Media

* FFmpeg
* image-processing tooling

## Notifications

* Firebase Cloud Messaging
* Apple Push Notification service

## Calling

* WebRTC
* STUN
* TURN

## Search

* Elasticsearch or OpenSearch

## Web

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* Zustand where appropriate

## Mobile

* React Native
* Expo
* TypeScript
* React Navigation
* TanStack Query
* Zustand where appropriate

## Infrastructure

* Docker
* Kubernetes
* Helm
* Terraform
* GitHub Actions

## Observability

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo

Do not introduce alternative technologies without a concrete architectural justification.

---

# 3. STANDALONE + INTEGRATION REQUIREMENT

This prompt must work independently.

At the same time, every specification in this prompt must be designed to integrate with the same project.

The actual repository is the implementation source of truth.

When implementation begins, engineering agents must:

1. inspect the repository
2. inspect existing schemas
3. inspect existing APIs
4. inspect existing event contracts
5. inspect existing modules
6. inspect existing infrastructure
7. reuse compatible implementation
8. preserve compatible contracts
9. avoid duplicate implementations
10. avoid regenerating unchanged files
11. make minimal safe corrections when required

Do not depend on another prompt being present.

Do not refer to another prompt as an authority.

Instead, repeat the necessary project assumptions directly in this document.

If repository implementation and this architecture differ, the implementation team must analyze the difference rather than blindly replacing working code.

---

# 4. CONTRACT-FIRST ARCHITECTURE

Define explicit canonical contracts for the entire platform.

The following must have one authoritative conceptual representation:

* User
* Device
* Session
* Conversation
* ConversationMember
* Message
* MessageAttachment
* MessageReaction
* MessageReceipt
* Presence
* Notification
* MediaAsset
* Call
* CallParticipant
* Block
* Report

Do not allow web, mobile, backend, event consumers, and workers to invent incompatible representations.

Where transport-specific DTOs are required, they must map to the same underlying domain semantics.

---

# 5. GLOBAL IDENTIFIER CONTRACT

Use a globally safe identifier strategy.

Prefer UUIDv7 or another time-sortable globally unique identifier where appropriate.

The architecture must define:

* identifier format
* generation authority
* database representation
* serialization format
* validation
* public exposure
* idempotency relationship

Client-generated identifiers may be used for request idempotency and local optimistic state, but server-authoritative entity identifiers must remain authoritative for persisted entities.

Never use predictable sequential public IDs when doing so creates enumeration or privacy risk.

---

# 6. GLOBAL TIMESTAMP CONTRACT

Use UTC timestamps for persisted server data.

Define canonical fields such as:

* createdAt
* updatedAt
* deletedAt
* expiresAt
* deliveredAt
* readAt
* lastSeenAt

Client timestamps may be retained as metadata where useful but must never override authoritative server time.

Define serialization consistently across:

* REST
* WebSockets
* Kafka/Redpanda
* database
* mobile
* web

Handle clock skew explicitly.

---

# 7. API CONTRACT

Define a consistent REST API contract.

Every API response must have predictable semantics.

Define:

* HTTP method conventions
* resource naming
* URL versioning
* request validation
* response structure
* error structure
* pagination
* filtering
* sorting
* idempotency
* authentication
* authorization
* rate limiting

Use cursor-based pagination for high-volume resources.

---

# 8. API ERROR CONTRACT

Define one canonical error model.

Errors should provide safe machine-readable information such as:

* error code
* message
* request/correlation ID
* optional validation details
* retryability where appropriate

Do not expose:

* stack traces
* database errors
* internal service details
* secrets
* security-sensitive implementation information

Define appropriate HTTP status semantics.

Differentiate:

* validation failure
* authentication failure
* authorization failure
* resource not found
* conflict
* rate limit
* dependency failure
* server failure

Avoid leaking whether sensitive resources exist when enumeration protection requires a generic response.

---

# 9. PAGINATION CONTRACT

Define cursor pagination consistently.

Every high-volume endpoint must specify:

* cursor encoding
* ordering
* page size
* maximum page size
* next cursor
* previous cursor where supported
* stable ordering fields

The cursor must not expose sensitive internal database details unnecessarily.

Pagination must remain stable under concurrent inserts.

---

# 10. AUTHENTICATION CONTRACT

Define authentication independently from authorization.

Support:

* account registration
* login
* session creation
* access token
* refresh token
* rotation
* revocation
* device sessions
* logout
* logout-all
* suspicious-session detection
* brute-force protection

Define:

* access-token lifetime
* refresh-token lifetime
* token rotation
* revocation model
* device binding
* session identifiers
* secure storage requirements

Do not place long-lived credentials in insecure client storage.

---

# 11. AUTHORIZATION CONTRACT

Every protected operation must have server-side authorization.

Authorization must consider:

* user identity
* device/session
* conversation membership
* group role
* resource ownership
* privacy settings
* blocking
* moderation role
* administrative privileges

Define a reusable authorization policy model.

Prevent:

* IDOR
* cross-user access
* revoked-device access
* unauthorized group administration
* unauthorized media access
* unauthorized call participation

---

# 12. USER AND DEVICE MODEL

Define the relationship:

User → Account → Device → Session.

A user may own multiple devices.

A device may have:

* device ID
* platform
* app version
* push token
* capabilities
* last active timestamp
* registration metadata
* security state

Define device revocation semantics.

Revocation must invalidate access appropriately and prevent future synchronization.

---

# 13. CONVERSATION CONTRACT

Define a canonical conversation model supporting:

* direct conversations
* group conversations

A conversation must have:

* ID
* type
* creation metadata
* lifecycle state
* membership
* settings

Group conversations must support:

* owner
* administrators
* members
* roles
* permissions
* membership changes
* group metadata
* invitations
* removal
* leaving
* group deletion/closure semantics

Define authorization for each operation.

---

# 14. DIRECT CONVERSATION UNIQUENESS

A direct conversation between two users must have deterministic uniqueness.

Define a safe invariant ensuring that multiple concurrent requests cannot create duplicate direct conversations.

The database must enforce the invariant rather than relying solely on application-level checks.

Consider:

* canonical participant ordering
* unique constraints
* race conditions
* retries

---

# 15. MESSAGE CONTRACT

Define the canonical message model.

A message should conceptually support:

* ID
* conversation ID
* sender ID
* client idempotency ID
* server creation timestamp
* message type
* content
* reply relationship
* forwarding metadata where applicable
* edit state
* deletion state
* attachment references
* metadata appropriate to the feature

Do not put arbitrary unvalidated JSON into the core message model merely for convenience.

Define which fields are immutable.

Define which fields can change after creation.

---

# 16. MESSAGE TYPES

Define an extensible message-type system.

At minimum consider:

* text
* image
* video
* audio
* voice message
* document
* system message
* call event message

The architecture must allow future message types without breaking existing clients.

Unknown message types must fail safely.

---

# 17. MESSAGE IDEMPOTENCY CONTRACT

Define the canonical idempotency mechanism.

The client must be able to retry a message request safely.

The system must handle:

* lost response
* timeout
* connection interruption
* duplicate HTTP request
* duplicate WebSocket submission
* concurrent duplicate requests

Database-level uniqueness must protect the invariant.

Repeated submissions must return the existing logical result rather than create duplicate business messages.

---

# 18. MESSAGE ORDERING CONTRACT

Define ordering semantics.

The architecture must distinguish:

* client creation time
* server persistence time
* event publication time
* delivery time
* read time

Define authoritative ordering using server-side semantics.

Account for:

* concurrent messages
* multiple devices
* retries
* reconnects
* offline clients
* event delays

Do not claim global ordering if the architecture cannot guarantee global ordering.

Define the minimum ordering guarantee for:

* a conversation
* a sender
* a device
* an event stream partition

---

# 19. MESSAGE RECEIPTS

Define message receipt semantics.

Support:

* sent
* delivered
* read
* failed

Determine whether receipt state is represented:

* per recipient
* per device
* as an aggregate
* through derived state

The architecture must avoid excessive write amplification for large groups.

Define how receipts are synchronized across multiple devices.

---

# 20. MESSAGE EDITING

Define message-edit semantics.

Specify:

* authorization
* editable message types
* editing time restrictions if any
* revision model
* updated timestamps
* synchronization
* audit requirements
* client behavior
* search-index updates

Define whether edit history is retained and under what privacy/retention rules.

---

# 21. MESSAGE DELETION

Define:

* delete-for-self
* delete-for-everyone where supported
* authorization
* retention
* tombstones
* synchronization
* search removal
* media cleanup
* notification behavior

Deleted content must not accidentally remain accessible through:

* APIs
* WebSockets
* search
* CDN
* caches
* background jobs
* derived indexes

Define the lifecycle of deletion events.

---

# 22. REACTIONS

Define message reaction semantics.

Support:

* user
* message
* reaction type
* timestamps

Define uniqueness rules so a user cannot unintentionally create duplicate identical reactions.

Define updates and removals.

Design for high-frequency reaction changes without unnecessary database contention.

---

# 23. REPLIES AND FORWARDING

Define reply relationships.

A reply should reference a canonical message ID rather than duplicate the entire source message.

Define behavior when the referenced message is:

* deleted
* inaccessible
* outside retention
* blocked
* no longer available

Forwarding must respect authorization and privacy.

Do not allow forwarding to bypass visibility rules.

---

# 24. PRESENCE CONTRACT

Presence is ephemeral.

Define:

* online
* offline
* last seen
* typing

Specify:

* heartbeat interval
* expiration
* stale-state behavior
* multiple-device aggregation
* privacy controls
* blocking behavior

Presence should be backed by Redis or equivalent ephemeral infrastructure, while durable user/account state remains in PostgreSQL.

---

# 25. TYPING INDICATORS

Typing indicators must be:

* ephemeral
* rate limited
* authorization-aware
* automatically expired

Do not persist every typing event to PostgreSQL.

Define:

* start
* stop
* timeout
* reconnect behavior
* multi-device behavior

---

# 26. REAL-TIME EVENT CONTRACT

Define one canonical event envelope.

Include appropriate fields such as:

* eventId
* eventType
* version
* timestamp
* aggregateId
* correlationId
* traceId
* payload

Define event versioning.

Clients must be able to safely ignore unsupported optional fields.

Breaking changes must use explicit version evolution.

---

# 27. WEBSOCKET EVENT CATEGORIES

Define events for categories such as:

## Messaging

* message.created
* message.updated
* message.deleted
* message.reaction.created
* message.reaction.removed

## Receipts

* message.sent
* message.delivered
* message.read

## Conversation

* conversation.created
* conversation.updated
* conversation.member.added
* conversation.member.removed
* conversation.member.role_changed

## Presence

* presence.changed
* typing.started
* typing.stopped

## Calls

* call.created
* call.accepted
* call.rejected
* call.ended
* call.signaling

Do not force all events through WebSockets.

Identify which events require durable event infrastructure.

---

# 28. RECONNECT AND RECOVERY CONTRACT

A client must be able to recover after:

* network interruption
* application suspension
* WebSocket disconnect
* server restart
* load balancer change

Define:

* connection handshake
* last acknowledged event
* synchronization cursor
* missed-event retrieval
* duplicate handling
* ordering
* resubscription

Critical durable events must be recoverable from authoritative state or durable event history.

Never rely exclusively on transient WebSocket delivery.

---

# 29. MULTI-DEVICE SYNCHRONIZATION

Define synchronization semantics for:

* messages
* receipts
* reactions
* edits
* deletions
* conversation metadata
* membership
* unread state
* settings

A new device must be able to establish a consistent state.

Define:

* initial sync
* incremental sync
* cursor
* conflict resolution
* duplicate handling
* revocation

---

# 30. EVENT BUS CONTRACT

For Kafka/Redpanda, define event envelope fields:

* event ID
* event type
* schema version
* aggregate ID
* producer
* occurred-at
* correlation ID
* trace context
* payload

Define:

* topic naming
* partitioning
* keys
* retention
* consumer groups
* retry topics
* dead-letter topics
* schema evolution

Use at-least-once delivery semantics.

Every consumer must be idempotent.

---

# 31. EVENT PARTITIONING

Define partition keys carefully.

Messaging events should preserve required ordering without producing unnecessary hot partitions.

Evaluate:

* conversation ID
* aggregate ID
* user ID

for different event categories.

Explicitly identify where ordering is required and where ordering is unnecessary.

---

# 32. OUTBOX CONTRACT

Define the transactional outbox structure.

At minimum conceptually support:

* event ID
* event type
* aggregate ID
* payload
* version
* created timestamp
* publication state
* attempt count
* last attempt timestamp
* failure information where safe

Define:

* transaction boundary
* publisher behavior
* retry
* duplicate publication
* cleanup
* monitoring

The outbox publisher must be idempotent or tolerate duplicate publication.

---

# 33. BULLMQ CONTRACT

Define queues for appropriate asynchronous workloads.

Potential queues include:

* notifications
* media processing
* search indexing
* cleanup
* moderation
* retention
* synchronization
* integration retries

Every queue must define:

* producer
* consumer
* priority
* retry count
* timeout
* backoff
* concurrency
* idempotency
* dead-letter behavior
* metrics

---

# 34. MEDIA DATA MODEL

Define the lifecycle and conceptual model of a MediaAsset.

Support:

* media ID
* owner
* uploader
* content type
* size
* storage key
* processing state
* variants
* dimensions
* duration
* checksum
* moderation/security state
* lifecycle state

Do not trust client-provided metadata.

---

# 35. MEDIA PROCESSING WORKFLOW

Define:

1. upload authorization
2. direct upload
3. validation
4. processing job
5. security validation
6. metadata extraction
7. transcoding
8. thumbnail generation
9. variant generation
10. persistence
11. CDN availability
12. cleanup

Define retry and failure behavior.

Processing must be asynchronous when workloads are expensive.

---

# 36. PRIVATE MEDIA ACCESS

Define how authorization is enforced before private media delivery.

The system must prevent:

* guessed object keys
* unauthorized signed URLs
* stale authorization
* revoked access
* blocked-user access

Define signed URL/token lifetime.

Consider whether CDN access should require signed URLs, signed cookies, or an equivalent controlled mechanism.

---

# 37. SEARCH CONTRACT

Define search documents for:

* users
* conversations where appropriate
* messages

Search documents must contain only data appropriate for indexing.

Define:

* source of truth
* indexing event
* update event
* deletion event
* reindex strategy
* authorization filtering

Never allow search to become an authorization bypass.

---

# 38. NOTIFICATION CONTRACT

Define a canonical notification request.

Conceptually include:

* notification ID
* recipient
* target device
* notification type
* target resource
* privacy-safe payload
* priority
* expiration
* provider
* delivery state

Define provider-specific adapters without allowing provider-specific concepts to leak throughout the domain.

---

# 39. NOTIFICATION DEDUPLICATION

Prevent duplicate notifications caused by:

* event retries
* consumer retries
* provider retries
* multiple devices

Define:

* notification idempotency key
* deduplication period
* device-level behavior
* retry semantics

---

# 40. CALL DOMAIN MODEL

Define:

* Call
* CallParticipant
* CallSession
* signaling state
* connection state
* termination reason

Support:

* initiating
* ringing
* accepted
* rejected
* missed
* active
* ended
* failed

Define participant authorization.

---

# 41. CALL SIGNALING

WebSockets should carry signaling where appropriate.

Define:

* offer
* answer
* ICE candidates
* renegotiation
* participant changes
* termination

Signaling messages must be:

* authenticated
* authorized
* scoped to the call
* rate limited
* observable

Do not treat signaling as media transport.

---

# 42. WEBRTC ARCHITECTURE

Define the role of:

* WebRTC
* STUN
* TURN
* signaling servers

Account for:

* NAT traversal
* restrictive networks
* network changes
* reconnects
* device changes
* bandwidth changes
* ICE failure
* TURN fallback

Do not assume peer-to-peer connectivity.

---

# 43. PRIVACY CHANGE PROPAGATION

Define what happens when a user changes:

* privacy settings
* blocking
* profile visibility
* conversation membership
* device authorization

Changes must propagate to:

* API authorization
* WebSockets
* caches
* search
* notifications
* media access
* background workers
* event consumers

Avoid stale authorization state becoming a security vulnerability.

---

# 44. ACCOUNT DELETION

Define account-deletion architecture.

Consider:

* active sessions
* devices
* conversations
* messages
* group ownership
* media
* search indexes
* notifications
* event records
* audit records
* legal/operational retention requirements

Distinguish:

* immediate access revocation
* logical deletion
* asynchronous cleanup
* permanent deletion
* derived-data cleanup

Deletion must not leave unauthorized access paths.

---

# 45. SECURITY EVENT MODEL

Define security/audit events for important operations such as:

* login
* logout
* session creation
* session revocation
* device registration
* device revocation
* password/credential changes
* account deletion
* privilege changes
* group administration
* moderation
* suspicious activity

Audit records must avoid storing unnecessary sensitive communication content.

---

# 46. RATE LIMITING ARCHITECTURE

Define rate limits for:

* login
* registration
* password/credential operations
* user lookup
* message sending
* conversation creation
* group operations
* media uploads
* WebSocket connections
* typing events
* call signaling
* reports
* search

Rate limits must consider:

* user
* IP
* device
* endpoint
* resource
* authentication state

Do not create limits that can trivially be bypassed by switching identifiers.

---

# 47. ABUSE PREVENTION

Define controls against:

* spam
* mass messaging
* automated account creation
* malicious uploads
* message flooding
* connection flooding
* call abuse
* report abuse
* enumeration

Use progressive controls where appropriate:

* rate limits
* reputation signals
* temporary restrictions
* moderation workflows
* audit events

Avoid designs that require storing unnecessary sensitive behavioral data.

---

# 48. DATA CONSISTENCY MATRIX

Produce a matrix identifying the consistency model for major data.

At minimum classify:

* accounts
* credentials
* devices
* conversations
* membership
* messages
* message receipts
* presence
* typing
* media metadata
* media processing state
* notifications
* search
* calls
* audit events

For each define:

* authoritative source
* consistency model
* acceptable staleness
* recovery mechanism

---

# 49. FAILURE MATRIX

Produce a failure matrix for critical dependencies.

At minimum analyze:

| Dependency     | Failure     | Critical Impact | Fallback                                   | Recovery                |
| -------------- | ----------- | --------------- | ------------------------------------------ | ----------------------- |
| PostgreSQL     | unavailable | high            | defined degraded behavior                  | reconnect/recovery      |
| Redis          | unavailable | medium/high     | durable fallback where possible            | rebuild ephemeral state |
| Kafka/Redpanda | unavailable | medium/high     | durable outbox                             | replay                  |
| BullMQ         | unavailable | medium          | retry later                                | worker recovery         |
| S3             | unavailable | medium/high     | graceful media failure                     | retry                   |
| Search         | unavailable | low/medium      | database-backed fallback where appropriate | reindex                 |
| FCM/APNs       | unavailable | medium          | queue/retry                                | provider recovery       |
| TURN           | unavailable | call-specific   | alternate connectivity                     | retry/fallback          |

Expand this matrix with concrete platform behavior.

---

# 50. SCALABILITY HOTSPOTS

Explicitly analyze:

* large groups
* high-volume conversations
* message fan-out
* unread counters
* presence
* WebSocket connection concentration
* event partition hotspots
* Redis hot keys
* PostgreSQL contention
* search indexing bursts
* media-processing bursts
* notification bursts

For each hotspot define:

* cause
* mitigation
* scaling strategy
* observability
* failure behavior

---

# 51. SECURITY AND PRIVACY INVARIANTS

Define invariants that must never be violated.

Examples:

* users cannot access unauthorized conversations
* blocked users cannot bypass blocking through alternate endpoints
* revoked devices cannot continue authenticated synchronization
* deleted content cannot remain accessible through stale authorization
* search cannot expose unauthorized information
* signed media access cannot outlive its intended authorization window
* push notifications cannot unnecessarily expose private content
* administrative privileges cannot be escalated through user-controlled IDs

Turn these into testable architectural requirements.

---

# 52. CROSS-CLIENT COMPATIBILITY

Web and mobile clients must consume compatible backend contracts.

Define:

* API versioning
* WebSocket versioning
* event compatibility
* capability negotiation where appropriate
* feature flags where appropriate
* backwards-compatible evolution

A mobile client may remain offline for extended periods.

Therefore backend changes must tolerate older supported clients.

---

# 53. BACKWARD COMPATIBILITY

Every contract evolution must consider:

* old mobile versions
* web sessions
* background workers
* event consumers
* queued jobs
* search indexes
* cached data
* database migrations

Never deploy a schema/API/event change that immediately breaks still-supported consumers.

Use expand-and-contract migration patterns where appropriate.

---

# 54. ARCHITECTURAL DOCUMENTATION

Produce clear documentation for:

* system context
* component boundaries
* domain model
* data model
* API contracts
* WebSocket contracts
* event contracts
* queues
* media lifecycle
* notification lifecycle
* call lifecycle
* security model
* privacy model
* consistency model
* failure model
* scaling model
* migration principles

Include architecture decision records for major tradeoffs.

---

# 55. IMPLEMENTATION HANDOFF REQUIREMENTS

The architecture must provide enough precision for engineers to implement without inventing contradictory behavior.

Backend engineers must be able to derive:

* modules
* entities
* repositories
* services
* controllers
* event publishers
* consumers
* workers
* authorization policies

Frontend engineers must be able to derive:

* API contracts
* WebSocket events
* state semantics
* pagination
* errors
* authentication behavior

Mobile engineers must be able to derive:

* synchronization
* offline behavior
* device semantics
* notifications
* deep links
* real-time behavior

Infrastructure engineers must be able to derive:

* dependencies
* deployment units
* networking
* storage
* observability
* scaling requirements

QA engineers must be able to derive:

* invariants
* acceptance criteria
* failure cases
* security requirements
* consistency requirements

---

# 56. REPOSITORY INTEGRATION

If an actual repository is available, inspect it before making implementation-specific claims.

Determine:

* existing structure
* existing technology
* existing modules
* existing database
* existing migrations
* existing API contracts
* existing event contracts
* existing infrastructure
* existing tests

Treat actual repository state as authoritative for implementation status.

Do not delete compatible work merely to match an abstract architecture.

When incompatible implementation exists:

1. identify the conflict
2. determine whether it is a real architectural problem
3. preserve compatibility where possible
4. migrate safely when necessary
5. update affected consumers
6. test the migration

---

# 57. NO FALSE COMPLETION

Never state:

* "the backend is already implemented"
* "the frontend already exists"
* "the infrastructure is complete"
* "the database has already been created"
* "the previous architecture is approved"
* "the previous volume was completed"

unless the actual repository proves it.

This document describes architecture.

It does not prove implementation.

---

# 58. NO PLACEHOLDER ARCHITECTURE

Do not produce vague statements such as:

* "use a scalable event system"
* "implement authentication securely"
* "support real-time messaging"
* "use caching where needed"
* "add monitoring"

Every critical requirement must specify:

* responsibility
* contract
* data
* behavior
* failure handling
* security
* consistency
* observability

---

# 59. FINAL ARCHITECTURAL OBJECTIVE

The architecture defined by this prompt must support one coherent production-grade communication platform.

The resulting architecture must allow independent implementation of:

* backend
* web
* mobile
* real-time systems
* media
* notifications
* search
* calls
* infrastructure
* QA

while ensuring that all components share compatible:

* domain semantics
* identifiers
* APIs
* database contracts
* event contracts
* WebSocket contracts
* queue semantics
* security rules
* privacy rules
* observability conventions

The actual repository is the integration boundary.

Every implementation phase must inspect and integrate with the repository rather than assuming that another prompt has already been executed.

The architecture must be complete, internally consistent, production-oriented, secure, privacy-preserving, horizontally scalable, observable, resilient, and ready for implementatio

You are operating in Senior Engineering Team Mode.

Complete the remaining production-ready architecture for an enterprise-scale real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation and must not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp.

This prompt is an independent architecture prompt.

Do not implement backend code.

Do not implement frontend code.

Do not implement mobile code.

Do not generate infrastructure implementation files.

Do not generate Dockerfiles.

Do not generate Kubernetes manifests.

Do not generate Terraform files.

Do not generate application source code.

Produce architecture, specifications, contracts, diagrams, engineering decisions, security models, operational strategies, and implementation guidance only.

────────────────────────────────────────

PROJECT

Build a production-ready global real-time communication platform capable of supporting:

• Hundreds of millions of registered users
• Tens of millions of daily active users
• Billions of messages
• Tens of millions of concurrent real-time connections
• One-to-one messaging
• Group messaging
• Communities
• Channels where appropriate
• Stories/status
• Images
• Videos
• Audio
• Voice messages
• Documents
• Stickers
• GIFs
• Voice calls
• Video calls
• Group calls
• Push notifications
• Offline synchronization
• Multi-device synchronization
• End-to-end encryption
• Contact discovery
• Blocking
• Reporting
• Moderation
• Business accounts
• Administration
• Analytics
• Multi-region deployment
• High availability
• Disaster recovery
• Horizontal scaling

The architecture must support:

• Global deployment
• Low latency
• Fault tolerance
• Strong privacy
• Strong security
• Long-term maintainability
• Future extensibility

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Web:

• Next.js
• React
• TypeScript
• Tailwind CSS
• shadcn/ui

Mobile:

• React Native
• Expo
• TypeScript

Backend:

• Node.js
• NestJS
• TypeScript

Database:

• PostgreSQL
• Prisma ORM

Caching:

• Redis

Real-Time:

• WebSockets
• Socket.IO where appropriate

Event Streaming:

• Kafka or Redpanda

Background Processing:

• BullMQ

Search:

• Elasticsearch or OpenSearch

Object Storage:

• AWS S3-compatible object storage

CDN:

• CloudFront or equivalent CDN

Push Notifications:

• Firebase Cloud Messaging
• Apple Push Notification Service

Voice/Video:

• WebRTC
• STUN
• TURN
• Media infrastructure where required

Infrastructure:

• Docker
• Kubernetes
• Helm
• Terraform
• GitHub Actions

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Secrets:

• HashiCorp Vault or approved cloud-native secret management

────────────────────────────────────────

VOLUME 2 OBJECTIVE

Complete the remaining enterprise architecture for:

1. Advanced multi-device architecture
2. Desktop and additional device architecture
3. Advanced synchronization
4. Message fan-out and large-group architecture
5. Media ingestion and processing
6. Media storage and CDN delivery
7. Stories/status scalability
8. Voice/video infrastructure
9. Call scalability and quality
10. End-to-end encryption operations
11. E2EE multi-device key management
12. Contact discovery and privacy
13. Notification architecture
14. Search and privacy
15. Abuse prevention
16. Moderation
17. Business accounts
18. Administration
19. Analytics
20. Localization
21. Feature flags
22. Complete security architecture
23. Threat model
24. Complete observability
25. Deployment architecture
26. Kubernetes topology
27. Multi-region architecture
28. Disaster recovery
29. Capacity planning
30. Failure analysis
31. Data consistency strategy
32. Enterprise testing strategy
33. Architectural Decision Records
34. Backend implementation roadmap
35. Complete Project Index

────────────────────────────────────────

MULTI-DEVICE ARCHITECTURE

Design support for:

• Multiple mobile devices
• Web sessions
• Desktop sessions
• Tablets
• Future client platforms

Define:

• Device registration
• Device identity
• Device verification
• Device naming
• Device capabilities
• Device trust
• Device limits
• Device revocation
• Remote logout
• Session synchronization
• Message synchronization
• Encryption synchronization

Define behavior for:

• New device registration
• Device removal
• Lost device
• Compromised device
• Revoked device
• Expired session
• Offline device
• Reconnected device
• Stale synchronization state

Clearly separate:

• Account identity
• User identity
• Device identity
• Session identity

────────────────────────────────────────

DEVICE CAPABILITY ARCHITECTURE

Design a capability model covering differences between clients.

Support capability evaluation for:

• Platform
• OS
• Application version
• Push notifications
• Background execution
• Camera
• Microphone
• Storage
• Audio codecs
• Video codecs
• WebRTC
• Media resolution
• Encryption capabilities

The backend must not assume all clients support identical features.

────────────────────────────────────────

DESKTOP ARCHITECTURE

Define architecture boundaries for desktop applications.

Support:

• Authentication
• Device activation
• Session management
• Real-time communication
• Offline synchronization
• Local persistence
• Media
• Notifications
• Calls
• Device revocation
• Remote logout

Keep platform-specific logic isolated from domain services.

────────────────────────────────────────

ADVANCED SYNCHRONIZATION ARCHITECTURE

Design synchronization for unreliable connections and multiple devices.

Support:

• Initial synchronization
• Incremental synchronization
• Delta synchronization
• Synchronization cursors
• Sequence numbers
• Missed events
• Event replay
• Offline queues
• Retry
• Conflict handling
• Duplicate detection
• Long-disconnection recovery
• Partial synchronization
• Synchronization batching
• Backpressure

Define:

• Cursor ownership
• Cursor invalidation
• Recovery behavior
• Data retention requirements
• Ordering guarantees
• Idempotency

────────────────────────────────────────

MESSAGE ORDERING ARCHITECTURE

Define ordering for:

• One-to-one messages
• Group messages
• Offline messages
• Concurrent messages
• Retries
• Multi-device delivery

Evaluate:

• Server timestamps
• Conversation sequence numbers
• Client timestamps
• Message IDs
• Logical ordering

Client clocks must not be the authoritative source of ordering.

────────────────────────────────────────

MESSAGE FAN-OUT ARCHITECTURE

Design strategies for:

• One-to-one conversations
• Small groups
• Large groups
• Very large groups
• Communities
• Channels

Evaluate:

• Fan-out on write
• Fan-out on read
• Hybrid approaches

Define:

• Recipient selection
• Device fan-out
• Offline recipients
• Delivery queues
• Ordering
• Read receipts
• Notification behavior
• Regional distribution

Select the appropriate strategy for each scale category.

────────────────────────────────────────

LARGE GROUP ARCHITECTURE

Design groups ranging from small conversations to very large communities.

Define:

• Membership storage
• Permission evaluation
• Administrative roles
• Message distribution
• Delivery receipts
• Read receipts
• Presence
• Notifications
• Moderation
• Abuse controls

Avoid requiring a synchronous broadcast to every group member for normal message processing.

────────────────────────────────────────

MEDIA INGESTION ARCHITECTURE

Design the complete media lifecycle.

Support:

• Upload authorization
• Direct object-storage upload
• Upload completion verification
• Integrity validation
• Malware scanning boundary
• Metadata extraction
• Media validation
• Processing
• Compression
• Transcoding
• Thumbnail generation
• Preview generation
• Storage
• CDN publication
• Expiration
• Cleanup

Define:

• Service ownership
• Event flow
• Queue flow
• Retry policies
• Idempotency
• Dead-letter handling
• Temporary storage
• Permanent storage
• Failure recovery

Application servers must not unnecessarily proxy large media files.

────────────────────────────────────────

MEDIA STORAGE ARCHITECTURE

Define object storage architecture for:

• Original uploads
• Processed images
• Processed videos
• Audio
• Voice messages
• Documents
• Stickers
• GIFs
• Thumbnails
• Temporary processing artifacts

Define:

• Object naming
• Metadata
• Encryption
• Access control
• Lifecycle rules
• Retention
• Cleanup
• Signed access
• CDN integration

────────────────────────────────────────

CDN ARCHITECTURE

Design global delivery for:

• Images
• Videos
• Audio
• Voice messages
• Documents
• Thumbnails
• Static assets

Define:

• Origin architecture
• Cache behavior
• TTL
• Cache keys
• Signed URLs
• Signed cookies where appropriate
• Token expiration
• Cache invalidation
• Regional routing
• Origin protection
• Bandwidth optimization
• Cost optimization

Differentiate:

• Public content
• Protected content
• Private user content
• Immutable media
• Temporary media

────────────────────────────────────────

STORIES / STATUS ARCHITECTURE

Design scalable temporary content.

Support:

• Text status
• Image status
• Video status
• Audience selection
• Privacy settings
• Viewers
• Expiration
• Reactions where appropriate
• Deletion

Define:

• Storage
• Visibility
• Viewer tracking
• Expiration mechanism
• Cleanup
• CDN delivery
• Notification behavior
• Privacy enforcement

Stories must not create unnecessary synchronous load on core messaging services.

────────────────────────────────────────

VOICE AND VIDEO INFRASTRUCTURE

Design production WebRTC architecture for:

• One-to-one voice calls
• One-to-one video calls
• Group voice calls
• Group video calls

Define:

• Signaling
• SDP exchange
• ICE
• STUN
• TURN
• NAT traversal
• Session management
• Media routing
• SFU architecture where appropriate
• Media server boundaries
• Regional routing
• Failover
• Connection recovery

Application servers should handle signaling/control-plane responsibilities rather than carrying normal high-bandwidth media traffic.

────────────────────────────────────────

CALL SCALABILITY

Design for:

• Large concurrent call volumes
• Large TURN traffic
• Large SFU traffic
• Regional load balancing
• Network degradation
• Connection migration
• Regional failure

Define:

• Horizontal scaling
• Dedicated capacity
• Autoscaling
• Health checks
• Capacity planning
• Regional placement
• Failover
• Resource isolation

────────────────────────────────────────

CALL QUALITY ARCHITECTURE

Define telemetry for:

• Packet loss
• Jitter
• Round-trip latency
• Bitrate
• Resolution
• Frame rate
• Audio quality
• Connection failures
• Reconnection frequency
• Regional performance
• Device performance

Define:

• Client telemetry
• Server telemetry
• Aggregation
• Dashboards
• Alerts
• Privacy boundaries

────────────────────────────────────────

END-TO-END ENCRYPTION OPERATIONS

Expand the E2EE architecture.

Define:

• Identity keys
• Device keys
• Pre-keys
• Session establishment
• Message encryption
• Group encryption
• Key rotation
• Device registration
• Device addition
• Device removal
• Device verification
• Key invalidation
• Recovery boundaries
• Encrypted backup boundaries

Clearly separate:

• Transport encryption
• Server-side encryption
• End-to-end encryption

Do not invent cryptographic algorithms.

Do not implement cryptography.

Define the architecture for using established protocols and audited cryptographic libraries.

────────────────────────────────────────

E2EE MULTI-DEVICE ARCHITECTURE

Define how encrypted messaging works across multiple devices.

Address:

• New device
• Device verification
• Key distribution
• Key rotation
• Device revocation
• Lost devices
• Compromised devices
• Group membership changes
• Offline devices
• Message fan-out

Define what metadata remains observable to backend infrastructure without exposing plaintext content.

────────────────────────────────────────

CONTACT DISCOVERY AND PRIVACY

Design privacy-preserving contact discovery.

Support:

• Contact synchronization
• Contact discovery
• Invitations
• Blocking
• Privacy settings

Define:

• Data minimization
• Enumeration protection
• Rate limiting
• Abuse detection
• Privacy-preserving matching
• Retention

Do not expose unnecessary personal information.

────────────────────────────────────────

NOTIFICATION ARCHITECTURE

Design:

• Push notifications
• In-app notifications
• Email notifications where appropriate

Support:

• New messages
• Missed calls
• Group activity
• Security events
• Account events
• Business events

Define:

• FCM
• APNS
• Device token management
• Preferences
• Deduplication
• Retry
• Backoff
• Rate limiting
• Provider failures
• Privacy-safe payloads
• Multi-device notification routing

────────────────────────────────────────

SEARCH ARCHITECTURE

Design search for:

• Users
• Contacts
• Groups
• Communities
• Conversations
• Business accounts
• Messages where technically and cryptographically appropriate

Define:

• Index ownership
• Indexing pipeline
• Ranking
• Autocomplete
• Typo tolerance
• Reindexing
• Index versioning
• Privacy boundaries

Explicitly address E2EE.

Do not create a server-side plaintext index of E2EE-protected message content.

Define client-side search boundaries where required.

────────────────────────────────────────

ABUSE PREVENTION

Design defenses against:

• Spam
• Mass messaging
• Automated account creation
• Credential stuffing
• Account takeover
• Malicious links
• Malicious files
• Harassment
• Impersonation
• Bot abuse
• API abuse
• Automated scraping

Define:

• Rate limiting
• Reputation
• Risk scoring
• Behavioral signals
• Device signals
• Account signals
• Automated enforcement
• Manual review
• Blocking
• Reporting
• Appeals

Account for the limitations imposed by E2EE.

────────────────────────────────────────

MODERATION ARCHITECTURE

Design moderation for:

• User reports
• Group reports
• Community reports
• Business abuse
• Spam
• Malicious media
• Account abuse
• Policy violations

Support:

• Automated checks
• Manual review
• Evidence handling
• Appeals
• Administrative actions
• Audit trails
• Policy versioning

Clearly define what moderation can and cannot inspect under E2EE.

Do not design mechanisms that secretly defeat the encryption model.

────────────────────────────────────────

BUSINESS ACCOUNT ARCHITECTURE

Design modular business functionality.

Support:

• Business profiles
• Business verification
• Business users
• Business roles
• Business permissions
• Business hours
• Business catalogs
• Automated responses
• Business messaging
• Business analytics

Define:

• Organization boundaries
• Data ownership
• Authorization
• Audit
• Rate limits
• Abuse controls

────────────────────────────────────────

ADMINISTRATION ARCHITECTURE

Design an enterprise administration platform.

Support:

• User management
• Account management
• Device management
• Group management
• Business management
• Reports
• Moderation
• Security investigation
• Feature flags
• System configuration
• Audit logs
• Operational dashboards

Define:

• Administrative roles
• Permissions
• Approval workflows
• Sensitive actions
• Dual-control operations where appropriate
• Audit requirements

High-risk operations must be traceable.

────────────────────────────────────────

ANALYTICS ARCHITECTURE

Design analytics without overloading PostgreSQL.

Track:

Platform:

• DAU
• MAU
• Retention
• User growth
• Regional activity

Messaging:

• Message volume
• Delivery latency
• Read latency
• Failure rate
• Group activity

Calls:

• Call attempts
• Successful calls
• Call duration
• Connection failures
• Quality metrics

Media:

• Upload volume
• Processing latency
• CDN traffic
• Failure rates

Business:

• Business activity
• Business messaging
• Business account usage

Security:

• Login anomalies
• Abuse signals
• Suspicious activity

Define:

• Event ingestion
• Stream processing
• Aggregation
• Long-term storage
• Retention
• Privacy
• Data minimization

────────────────────────────────────────

LOCALIZATION ARCHITECTURE

Support:

• Multiple languages
• Localized UI
• Regional formatting
• Time zones
• Localized notifications
• Regional policies
• Regional configuration

Define:

• Locale model
• Fallback strategy
• Translation workflow
• Client language negotiation
• Backend localization boundaries

────────────────────────────────────────

FEATURE FLAG ARCHITECTURE

Design feature flags supporting:

• Global rollout
• Percentage rollout
• User targeting
• Region targeting
• Device targeting
• Platform targeting
• Kill switches
• Experiments

Define:

• Flag ownership
• Evaluation
• Caching
• Propagation
• Audit history
• Expiration
• Cleanup

────────────────────────────────────────

SECURITY ARCHITECTURE

Design complete security architecture covering:

Identity security:

• Password hashing
• MFA
• Passkeys
• Session security
• Device security
• Token rotation
• Session revocation

Application security:

• Input validation
• Output encoding
• Secure headers
• CORS
• CSRF where applicable
• XSS protection
• SQL injection protection
• Rate limiting
• Abuse prevention

Infrastructure security:

• IAM
• Least privilege
• Network segmentation
• Encryption at rest
• Encryption in transit
• Secrets management
• Kubernetes security
• Container security
• Supply-chain security

Messaging security:

• E2EE
• Device verification
• Key management
• Replay protection
• Message confidentiality

────────────────────────────────────────

THREAT MODEL

Create a threat model covering:

• Account takeover
• Credential stuffing
• Session hijacking
• Token theft
• Device compromise
• API abuse
• Spam
• Malicious files
• Malicious links
• Unauthorized media access
• WebSocket abuse
• WebRTC abuse
• TURN abuse
• Business-account abuse
• Insider threats
• Data leakage
• DDoS
• Supply-chain attacks
• Kubernetes compromise
• Secret exposure
• Encryption-key compromise

For each major threat define:

• Attack vector
• Affected systems
• Preventive controls
• Detection
• Response
• Recovery
• Residual risk

────────────────────────────────────────

MULTI-REGION ARCHITECTURE

Design the complete global multi-region architecture.

Define:

• Regional application clusters
• Regional WebSocket gateways
• Global traffic routing
• Regional data ownership
• Cross-region event replication
• Cross-region synchronization
• Regional failover
• Object-storage replication
• CDN failover
• Search recovery
• Kafka replication

Classify data as:

• Region-local
• Globally replicated
• Eventually consistent
• Strongly consistent

Avoid unnecessary cross-region synchronous dependencies.

Define behavior when a user's primary region becomes unavailable.

────────────────────────────────────────

DEPLOYMENT ARCHITECTURE

Design:

• Development
• Testing
• Staging
• Production

Include:

• Kubernetes
• Helm
• Container registry
• CI/CD
• Rolling deployments
• Canary deployments
• Blue/green deployments where appropriate
• Automatic rollback
• Health verification

Define deployment boundaries for:

• APIs
• WebSocket gateways
• Workers
• Media processing
• Call signaling
• Search
• Kafka
• Redis
• PostgreSQL
• Observability

────────────────────────────────────────

KUBERNETES TOPOLOGY

Design Kubernetes topology.

Include:

• Cluster strategy
• Namespaces
• Node pools
• Application workloads
• WebSocket workloads
• Worker workloads
• Media workloads
• Call workloads
• Stateful workloads

Define:

• Resource requests
• Resource limits
• Horizontal Pod Autoscaling
• Cluster Autoscaling
• Pod Disruption Budgets
• Resource Quotas
• Network Policies
• Service Accounts
• Secrets
• Health checks

Identify workloads requiring:

• Dedicated nodes
• High CPU
• High memory
• Specialized capacity
• Independent autoscaling
• Regional placement

────────────────────────────────────────

OBSERVABILITY ARCHITECTURE

Use:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Define observability for:

• APIs
• Authentication
• Messaging
• Message delivery
• WebSockets
• Presence
• Calls
• TURN
• Media processing
• Kafka
• Redis
• PostgreSQL
• Search
• Notifications
• Security
• Background jobs

Define:

• SLIs
• SLOs
• Golden signals
• Structured logs
• Metrics
• Traces
• Correlation IDs
• Trace propagation
• Dashboards
• Alerts
• Sensitive-data redaction

────────────────────────────────────────

DISASTER RECOVERY

Define:

• RTO
• RPO
• Database backups
• Point-in-time recovery
• Object storage recovery
• Kafka recovery
• Redis recovery
• Search recovery
• Kubernetes recovery
• Infrastructure-state recovery
• Regional failover

Create recovery strategies for:

• Database failure
• Region failure
• Kafka failure
• Redis failure
• Search failure
• Object-storage failure
• WebSocket failure
• Call infrastructure failure
• Media-processing failure

────────────────────────────────────────

CAPACITY AND SCALABILITY

Create capacity-planning assumptions for:

• Registered users
• Daily active users
• Concurrent connections
• Messages per second
• Peak messages per second
• Group fan-out
• Presence events
• Media uploads
• Media downloads
• Calls
• TURN bandwidth
• SFU bandwidth
• Database operations
• Redis operations
• Kafka throughput

Identify:

• Primary bottlenecks
• Scaling dimensions
• Horizontal scaling strategies
• Partitioning
• Caching
• Backpressure
• Capacity triggers

Clearly identify assumptions.

Do not fabricate false precision.

────────────────────────────────────────

FAILURE SCENARIOS

Define graceful behavior for:

• PostgreSQL unavailable
• Redis unavailable
• Kafka unavailable
• Search unavailable
• Push providers unavailable
• S3 unavailable
• WebSocket gateway failure
• Call signaling failure
• TURN failure
• SFU failure
• Media processing backlog
• CDN degradation
• Regional outage

For each define:

• Detection
• Immediate response
• Fallback
• Retry
• Circuit breaker where appropriate
• Degraded behavior
• Recovery
• Data reconciliation

────────────────────────────────────────

DATA CONSISTENCY STRATEGY

Define consistency requirements for:

• Accounts
• Devices
• Conversations
• Messages
• Message delivery
• Read receipts
• Group membership
• Communities
• Presence
• Stories
• Calls
• Notifications
• Search
• Analytics
• Business accounts

Define where to use:

• Strong consistency
• Eventual consistency
• Idempotency
• Optimistic concurrency
• Distributed locks
• Transactional outbox
• Sagas where justified

Avoid distributed transactions where possible.

────────────────────────────────────────

TESTING STRATEGY

Define enterprise testing architecture.

UNIT TESTING

• Domain logic
• Services
• Utilities
• Encryption interfaces

INTEGRATION TESTING

• PostgreSQL
• Prisma
• Redis
• Kafka
• BullMQ
• WebSockets
• WebRTC signaling
• External providers

CONTRACT TESTING

• REST APIs
• WebSocket contracts
• Event schemas
• Internal service contracts

END-TO-END TESTING

• Registration
• Authentication
• Device registration
• Messaging
• Groups
• Communities
• Media
• Stories
• Calls
• Notifications
• Multi-device synchronization
• Offline synchronization
• Business accounts

PERFORMANCE TESTING

• API load
• WebSocket load
• Message throughput
• Presence
• Group fan-out
• Synchronization
• Call signaling
• Media processing

RESILIENCE TESTING

• Database failure
• Redis failure
• Kafka failure
• WebSocket failure
• TURN failure
• SFU failure
• Regional failure

SECURITY TESTING

• Authentication
• Authorization
• E2EE boundaries
• Rate limiting
• Abuse prevention
• Dependency scanning
• Container scanning
• Secret scanning
• Infrastructure security

────────────────────────────────────────

ARCHITECTURAL DECISION RECORDS

Define ADRs for:

• Multi-device architecture
• Message fan-out
• Large-group architecture
• Media processing
• CDN architecture
• WebRTC architecture
• TURN architecture
• SFU architecture
• E2EE operations
• E2EE multi-device architecture
• Search and privacy
• Notifications
• Abuse prevention
• Moderation
• Business accounts
• Analytics
• Multi-region architecture
• Kubernetes topology
• Disaster recovery
• Capacity strategy
• Feature flags
• Administration

Each ADR must contain:

• Context
• Decision
• Alternatives considered
• Consequences

────────────────────────────────────────

BACKEND IMPLEMENTATION ROADMAP

Define the exact backend implementation order.

BACKEND MILESTONE 1

Backend monorepo foundation and shared infrastructure.

BACKEND MILESTONE 2

Configuration, logging, validation, error handling, observability, and security foundation.

BACKEND MILESTONE 3

Identity, authentication, accounts, sessions, and devices.

BACKEND MILESTONE 4

Authorization, permissions, contacts, blocking, and privacy.

BACKEND MILESTONE 5

Conversations, messaging, persistence, delivery, and receipts.

BACKEND MILESTONE 6

Offline synchronization and multi-device synchronization.

BACKEND MILESTONE 7

Groups and communities.

BACKEND MILESTONE 8

Presence and real-time WebSocket infrastructure.

BACKEND MILESTONE 9

Media uploads and media processing.

BACKEND MILESTONE 10

Stories/status.

BACKEND MILESTONE 11

Notifications.

BACKEND MILESTONE 12

E2EE boundaries and device/key management.

BACKEND MILESTONE 13

Voice/video signaling and call infrastructure integration.

BACKEND MILESTONE 14

Search and discovery.

BACKEND MILESTONE 15

Business accounts.

BACKEND MILESTONE 16

Abuse prevention, reporting, and moderation.

BACKEND MILESTONE 17

Analytics, audit, and feature flags.

BACKEND MILESTONE 18

Performance, resilience, security hardening, and production readiness.

Adjust only when dependencies require it.

────────────────────────────────────────

PROJECT INDEX

Create the complete Project Index containing:

• Project overview
• Architecture decisions
• Domains
• Services
• Service ownership
• Database ownership
• Database objects
• API contracts
• WebSocket contracts
• Event contracts
• Queue contracts
• Shared packages
• Security boundaries
• E2EE boundaries
• Media architecture
• Call architecture
• Multi-device architecture
• Multi-region architecture
• Infrastructure decisions
• Observability
• Disaster recovery
• Testing strategy
• ADRs
• Backend milestones
• Remaining implementation phases

────────────────────────────────────────

ARCHITECTURE VOLUME 2 DELIVERABLE

Produce:

1. Advanced Multi-Device Architecture
2. Device Capability Architecture
3. Desktop Architecture
4. Advanced Synchronization Architecture
5. Message Ordering Architecture
6. Message Fan-Out Architecture
7. Large Group Architecture
8. Media Processing Architecture
9. Media Storage Architecture
10. CDN Architecture
11. Stories/Status Architecture
12. Voice/Video Infrastructure
13. Call Scalability Architecture
14. Call Quality Architecture
15. E2EE Operational Architecture
16. E2EE Multi-Device Architecture
17. Contact Discovery and Privacy
18. Notification Architecture
19. Search Architecture
20. Abuse Prevention Architecture
21. Moderation Architecture
22. Business Account Architecture
23. Administration Architecture
24. Analytics Architecture
25. Localization Architecture
26. Feature Flag Architecture
27. Security Architecture
28. Threat Model
29. Multi-Region Architecture
30. Deployment Architecture
31. Kubernetes Topology
32. Observability Architecture
33. Disaster Recovery Strategy
34. Capacity and Scalability Strategy
35. Failure Scenario Analysis
36. Data Consistency Strategy
37. Testing Architecture
38. Architectural Decision Records
39. Backend Implementation Roadmap
40. Complete Project Index

────────────────────────────────────────

QUALITY REQUIREMENTS

Every architectural decision must consider:

• Scalability
• Availability
• Security
• Privacy
• Latency
• Data consistency
• Operational complexity
• Cost
• Developer productivity
• Maintainability
• Future extensibility

Prefer:

• Explicit ownership
• Clear bounded contexts
• Stateless application services where possible
• Event-driven communication where appropriate
• Idempotent consumers
• Transactional outbox
• Horizontal scaling
• Established security protocols
• Established cryptographic protocols
• Graceful degradation
• Observable systems
• Least privilege

Avoid:

• Unnecessary microservices
• Shared database ownership
• Distributed transactions where avoidable
• Tight coupling
• Single points of failure
• Redis as a system of record
• Application servers proxying large media
• Proprietary cryptography
• Frontend-only security
• Unnecessary cross-region synchronous dependencies
• Premature complexity

────────────────────────────────────────

OUTPUT RULES

This is an architecture document only.

Do not generate source code.

Do not generate placeholder implementations.

Do not generate Dockerfiles.

Do not generate Kubernetes manifests.

Do not generate Terraform files.

Do not generate frontend components.

Do not generate mobile components.

Do not implement backend services.

Generate detailed:

• Architecture specifications
• Domain boundaries
• Service responsibilities
• Ownership rules
• Data strategies
• API contracts
• WebSocket contracts
• Event contracts
• Queue definitions
• Security boundaries
• Threat model
• Scalability strategies
• Deployment architecture
• Disaster recovery
• Testing architecture
• ADRs
• Backend implementation roadmap
• Project Ind

You are operating in Senior Engineering Team Mode.

Complete the remaining production-ready architecture for an enterprise-scale real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation and must not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp.

This prompt is an independent architecture prompt.

Do not implement backend code.

Do not implement frontend code.

Do not implement mobile code.

Do not generate infrastructure implementation files.

Do not generate Dockerfiles.

Do not generate Kubernetes manifests.

Do not generate Terraform files.

Do not generate application source code.

Produce architecture, specifications, contracts, diagrams, engineering decisions, security models, operational strategies, and implementation guidance only.

────────────────────────────────────────

PROJECT

Build a production-ready global real-time communication platform capable of supporting:

• Hundreds of millions of registered users
• Tens of millions of daily active users
• Billions of messages
• Tens of millions of concurrent real-time connections
• One-to-one messaging
• Group messaging
• Communities
• Channels where appropriate
• Stories/status
• Images
• Videos
• Audio
• Voice messages
• Documents
• Stickers
• GIFs
• Voice calls
• Video calls
• Group calls
• Push notifications
• Offline synchronization
• Multi-device synchronization
• End-to-end encryption
• Contact discovery
• Blocking
• Reporting
• Moderation
• Business accounts
• Administration
• Analytics
• Multi-region deployment
• High availability
• Disaster recovery
• Horizontal scaling

The architecture must support:

• Global deployment
• Low latency
• Fault tolerance
• Strong privacy
• Strong security
• Long-term maintainability
• Future extensibility

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Web:

• Next.js
• React
• TypeScript
• Tailwind CSS
• shadcn/ui

Mobile:

• React Native
• Expo
• TypeScript

Backend:

• Node.js
• NestJS
• TypeScript

Database:

• PostgreSQL
• Prisma ORM

Caching:

• Redis

Real-Time:

• WebSockets
• Socket.IO where appropriate

Event Streaming:

• Kafka or Redpanda

Background Processing:

• BullMQ

Search:

• Elasticsearch or OpenSearch

Object Storage:

• AWS S3-compatible object storage

CDN:

• CloudFront or equivalent CDN

Push Notifications:

• Firebase Cloud Messaging
• Apple Push Notification Service

Voice/Video:

• WebRTC
• STUN
• TURN
• Media infrastructure where required

Infrastructure:

• Docker
• Kubernetes
• Helm
• Terraform
• GitHub Actions

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Secrets:

• HashiCorp Vault or approved cloud-native secret management

────────────────────────────────────────

VOLUME 2 OBJECTIVE

Complete the remaining enterprise architecture for:

1. Advanced multi-device architecture
2. Desktop and additional device architecture
3. Advanced synchronization
4. Message fan-out and large-group architecture
5. Media ingestion and processing
6. Media storage and CDN delivery
7. Stories/status scalability
8. Voice/video infrastructure
9. Call scalability and quality
10. End-to-end encryption operations
11. E2EE multi-device key management
12. Contact discovery and privacy
13. Notification architecture
14. Search and privacy
15. Abuse prevention
16. Moderation
17. Business accounts
18. Administration
19. Analytics
20. Localization
21. Feature flags
22. Complete security architecture
23. Threat model
24. Complete observability
25. Deployment architecture
26. Kubernetes topology
27. Multi-region architecture
28. Disaster recovery
29. Capacity planning
30. Failure analysis
31. Data consistency strategy
32. Enterprise testing strategy
33. Architectural Decision Records
34. Backend implementation roadmap
35. Complete Project Index

────────────────────────────────────────

MULTI-DEVICE ARCHITECTURE

Design support for:

• Multiple mobile devices
• Web sessions
• Desktop sessions
• Tablets
• Future client platforms

Define:

• Device registration
• Device identity
• Device verification
• Device naming
• Device capabilities
• Device trust
• Device limits
• Device revocation
• Remote logout
• Session synchronization
• Message synchronization
• Encryption synchronization

Define behavior for:

• New device registration
• Device removal
• Lost device
• Compromised device
• Revoked device
• Expired session
• Offline device
• Reconnected device
• Stale synchronization state

Clearly separate:

• Account identity
• User identity
• Device identity
• Session identity

────────────────────────────────────────

DEVICE CAPABILITY ARCHITECTURE

Design a capability model covering differences between clients.

Support capability evaluation for:

• Platform
• OS
• Application version
• Push notifications
• Background execution
• Camera
• Microphone
• Storage
• Audio codecs
• Video codecs
• WebRTC
• Media resolution
• Encryption capabilities

The backend must not assume all clients support identical features.

────────────────────────────────────────

DESKTOP ARCHITECTURE

Define architecture boundaries for desktop applications.

Support:

• Authentication
• Device activation
• Session management
• Real-time communication
• Offline synchronization
• Local persistence
• Media
• Notifications
• Calls
• Device revocation
• Remote logout

Keep platform-specific logic isolated from domain services.

────────────────────────────────────────

ADVANCED SYNCHRONIZATION ARCHITECTURE

Design synchronization for unreliable connections and multiple devices.

Support:

• Initial synchronization
• Incremental synchronization
• Delta synchronization
• Synchronization cursors
• Sequence numbers
• Missed events
• Event replay
• Offline queues
• Retry
• Conflict handling
• Duplicate detection
• Long-disconnection recovery
• Partial synchronization
• Synchronization batching
• Backpressure

Define:

• Cursor ownership
• Cursor invalidation
• Recovery behavior
• Data retention requirements
• Ordering guarantees
• Idempotency

────────────────────────────────────────

MESSAGE ORDERING ARCHITECTURE

Define ordering for:

• One-to-one messages
• Group messages
• Offline messages
• Concurrent messages
• Retries
• Multi-device delivery

Evaluate:

• Server timestamps
• Conversation sequence numbers
• Client timestamps
• Message IDs
• Logical ordering

Client clocks must not be the authoritative source of ordering.

────────────────────────────────────────

MESSAGE FAN-OUT ARCHITECTURE

Design strategies for:

• One-to-one conversations
• Small groups
• Large groups
• Very large groups
• Communities
• Channels

Evaluate:

• Fan-out on write
• Fan-out on read
• Hybrid approaches

Define:

• Recipient selection
• Device fan-out
• Offline recipients
• Delivery queues
• Ordering
• Read receipts
• Notification behavior
• Regional distribution

Select the appropriate strategy for each scale category.

────────────────────────────────────────

LARGE GROUP ARCHITECTURE

Design groups ranging from small conversations to very large communities.

Define:

• Membership storage
• Permission evaluation
• Administrative roles
• Message distribution
• Delivery receipts
• Read receipts
• Presence
• Notifications
• Moderation
• Abuse controls

Avoid requiring a synchronous broadcast to every group member for normal message processing.

────────────────────────────────────────

MEDIA INGESTION ARCHITECTURE

Design the complete media lifecycle.

Support:

• Upload authorization
• Direct object-storage upload
• Upload completion verification
• Integrity validation
• Malware scanning boundary
• Metadata extraction
• Media validation
• Processing
• Compression
• Transcoding
• Thumbnail generation
• Preview generation
• Storage
• CDN publication
• Expiration
• Cleanup

Define:

• Service ownership
• Event flow
• Queue flow
• Retry policies
• Idempotency
• Dead-letter handling
• Temporary storage
• Permanent storage
• Failure recovery

Application servers must not unnecessarily proxy large media files.

────────────────────────────────────────

MEDIA STORAGE ARCHITECTURE

Define object storage architecture for:

• Original uploads
• Processed images
• Processed videos
• Audio
• Voice messages
• Documents
• Stickers
• GIFs
• Thumbnails
• Temporary processing artifacts

Define:

• Object naming
• Metadata
• Encryption
• Access control
• Lifecycle rules
• Retention
• Cleanup
• Signed access
• CDN integration

────────────────────────────────────────

CDN ARCHITECTURE

Design global delivery for:

• Images
• Videos
• Audio
• Voice messages
• Documents
• Thumbnails
• Static assets

Define:

• Origin architecture
• Cache behavior
• TTL
• Cache keys
• Signed URLs
• Signed cookies where appropriate
• Token expiration
• Cache invalidation
• Regional routing
• Origin protection
• Bandwidth optimization
• Cost optimization

Differentiate:

• Public content
• Protected content
• Private user content
• Immutable media
• Temporary media

────────────────────────────────────────

STORIES / STATUS ARCHITECTURE

Design scalable temporary content.

Support:

• Text status
• Image status
• Video status
• Audience selection
• Privacy settings
• Viewers
• Expiration
• Reactions where appropriate
• Deletion

Define:

• Storage
• Visibility
• Viewer tracking
• Expiration mechanism
• Cleanup
• CDN delivery
• Notification behavior
• Privacy enforcement

Stories must not create unnecessary synchronous load on core messaging services.

────────────────────────────────────────

VOICE AND VIDEO INFRASTRUCTURE

Design production WebRTC architecture for:

• One-to-one voice calls
• One-to-one video calls
• Group voice calls
• Group video calls

Define:

• Signaling
• SDP exchange
• ICE
• STUN
• TURN
• NAT traversal
• Session management
• Media routing
• SFU architecture where appropriate
• Media server boundaries
• Regional routing
• Failover
• Connection recovery

Application servers should handle signaling/control-plane responsibilities rather than carrying normal high-bandwidth media traffic.

────────────────────────────────────────

CALL SCALABILITY

Design for:

• Large concurrent call volumes
• Large TURN traffic
• Large SFU traffic
• Regional load balancing
• Network degradation
• Connection migration
• Regional failure

Define:

• Horizontal scaling
• Dedicated capacity
• Autoscaling
• Health checks
• Capacity planning
• Regional placement
• Failover
• Resource isolation

────────────────────────────────────────

CALL QUALITY ARCHITECTURE

Define telemetry for:

• Packet loss
• Jitter
• Round-trip latency
• Bitrate
• Resolution
• Frame rate
• Audio quality
• Connection failures
• Reconnection frequency
• Regional performance
• Device performance

Define:

• Client telemetry
• Server telemetry
• Aggregation
• Dashboards
• Alerts
• Privacy boundaries

────────────────────────────────────────

END-TO-END ENCRYPTION OPERATIONS

Expand the E2EE architecture.

Define:

• Identity keys
• Device keys
• Pre-keys
• Session establishment
• Message encryption
• Group encryption
• Key rotation
• Device registration
• Device addition
• Device removal
• Device verification
• Key invalidation
• Recovery boundaries
• Encrypted backup boundaries

Clearly separate:

• Transport encryption
• Server-side encryption
• End-to-end encryption

Do not invent cryptographic algorithms.

Do not implement cryptography.

Define the architecture for using established protocols and audited cryptographic libraries.

────────────────────────────────────────

E2EE MULTI-DEVICE ARCHITECTURE

Define how encrypted messaging works across multiple devices.

Address:

• New device
• Device verification
• Key distribution
• Key rotation
• Device revocation
• Lost devices
• Compromised devices
• Group membership changes
• Offline devices
• Message fan-out

Define what metadata remains observable to backend infrastructure without exposing plaintext content.

────────────────────────────────────────

CONTACT DISCOVERY AND PRIVACY

Design privacy-preserving contact discovery.

Support:

• Contact synchronization
• Contact discovery
• Invitations
• Blocking
• Privacy settings

Define:

• Data minimization
• Enumeration protection
• Rate limiting
• Abuse detection
• Privacy-preserving matching
• Retention

Do not expose unnecessary personal information.

────────────────────────────────────────

NOTIFICATION ARCHITECTURE

Design:

• Push notifications
• In-app notifications
• Email notifications where appropriate

Support:

• New messages
• Missed calls
• Group activity
• Security events
• Account events
• Business events

Define:

• FCM
• APNS
• Device token management
• Preferences
• Deduplication
• Retry
• Backoff
• Rate limiting
• Provider failures
• Privacy-safe payloads
• Multi-device notification routing

────────────────────────────────────────

SEARCH ARCHITECTURE

Design search for:

• Users
• Contacts
• Groups
• Communities
• Conversations
• Business accounts
• Messages where technically and cryptographically appropriate

Define:

• Index ownership
• Indexing pipeline
• Ranking
• Autocomplete
• Typo tolerance
• Reindexing
• Index versioning
• Privacy boundaries

Explicitly address E2EE.

Do not create a server-side plaintext index of E2EE-protected message content.

Define client-side search boundaries where required.

────────────────────────────────────────

ABUSE PREVENTION

Design defenses against:

• Spam
• Mass messaging
• Automated account creation
• Credential stuffing
• Account takeover
• Malicious links
• Malicious files
• Harassment
• Impersonation
• Bot abuse
• API abuse
• Automated scraping

Define:

• Rate limiting
• Reputation
• Risk scoring
• Behavioral signals
• Device signals
• Account signals
• Automated enforcement
• Manual review
• Blocking
• Reporting
• Appeals

Account for the limitations imposed by E2EE.

────────────────────────────────────────

MODERATION ARCHITECTURE

Design moderation for:

• User reports
• Group reports
• Community reports
• Business abuse
• Spam
• Malicious media
• Account abuse
• Policy violations

Support:

• Automated checks
• Manual review
• Evidence handling
• Appeals
• Administrative actions
• Audit trails
• Policy versioning

Clearly define what moderation can and cannot inspect under E2EE.

Do not design mechanisms that secretly defeat the encryption model.

────────────────────────────────────────

BUSINESS ACCOUNT ARCHITECTURE

Design modular business functionality.

Support:

• Business profiles
• Business verification
• Business users
• Business roles
• Business permissions
• Business hours
• Business catalogs
• Automated responses
• Business messaging
• Business analytics

Define:

• Organization boundaries
• Data ownership
• Authorization
• Audit
• Rate limits
• Abuse controls

────────────────────────────────────────

ADMINISTRATION ARCHITECTURE

Design an enterprise administration platform.

Support:

• User management
• Account management
• Device management
• Group management
• Business management
• Reports
• Moderation
• Security investigation
• Feature flags
• System configuration
• Audit logs
• Operational dashboards

Define:

• Administrative roles
• Permissions
• Approval workflows
• Sensitive actions
• Dual-control operations where appropriate
• Audit requirements

High-risk operations must be traceable.

────────────────────────────────────────

ANALYTICS ARCHITECTURE

Design analytics without overloading PostgreSQL.

Track:

Platform:

• DAU
• MAU
• Retention
• User growth
• Regional activity

Messaging:

• Message volume
• Delivery latency
• Read latency
• Failure rate
• Group activity

Calls:

• Call attempts
• Successful calls
• Call duration
• Connection failures
• Quality metrics

Media:

• Upload volume
• Processing latency
• CDN traffic
• Failure rates

Business:

• Business activity
• Business messaging
• Business account usage

Security:

• Login anomalies
• Abuse signals
• Suspicious activity

Define:

• Event ingestion
• Stream processing
• Aggregation
• Long-term storage
• Retention
• Privacy
• Data minimization

────────────────────────────────────────

LOCALIZATION ARCHITECTURE

Support:

• Multiple languages
• Localized UI
• Regional formatting
• Time zones
• Localized notifications
• Regional policies
• Regional configuration

Define:

• Locale model
• Fallback strategy
• Translation workflow
• Client language negotiation
• Backend localization boundaries

────────────────────────────────────────

FEATURE FLAG ARCHITECTURE

Design feature flags supporting:

• Global rollout
• Percentage rollout
• User targeting
• Region targeting
• Device targeting
• Platform targeting
• Kill switches
• Experiments

Define:

• Flag ownership
• Evaluation
• Caching
• Propagation
• Audit history
• Expiration
• Cleanup

────────────────────────────────────────

SECURITY ARCHITECTURE

Design complete security architecture covering:

Identity security:

• Password hashing
• MFA
• Passkeys
• Session security
• Device security
• Token rotation
• Session revocation

Application security:

• Input validation
• Output encoding
• Secure headers
• CORS
• CSRF where applicable
• XSS protection
• SQL injection protection
• Rate limiting
• Abuse prevention

Infrastructure security:

• IAM
• Least privilege
• Network segmentation
• Encryption at rest
• Encryption in transit
• Secrets management
• Kubernetes security
• Container security
• Supply-chain security

Messaging security:

• E2EE
• Device verification
• Key management
• Replay protection
• Message confidentiality

────────────────────────────────────────

THREAT MODEL

Create a threat model covering:

• Account takeover
• Credential stuffing
• Session hijacking
• Token theft
• Device compromise
• API abuse
• Spam
• Malicious files
• Malicious links
• Unauthorized media access
• WebSocket abuse
• WebRTC abuse
• TURN abuse
• Business-account abuse
• Insider threats
• Data leakage
• DDoS
• Supply-chain attacks
• Kubernetes compromise
• Secret exposure
• Encryption-key compromise

For each major threat define:

• Attack vector
• Affected systems
• Preventive controls
• Detection
• Response
• Recovery
• Residual risk

────────────────────────────────────────

MULTI-REGION ARCHITECTURE

Design the complete global multi-region architecture.

Define:

• Regional application clusters
• Regional WebSocket gateways
• Global traffic routing
• Regional data ownership
• Cross-region event replication
• Cross-region synchronization
• Regional failover
• Object-storage replication
• CDN failover
• Search recovery
• Kafka replication

Classify data as:

• Region-local
• Globally replicated
• Eventually consistent
• Strongly consistent

Avoid unnecessary cross-region synchronous dependencies.

Define behavior when a user's primary region becomes unavailable.

────────────────────────────────────────

DEPLOYMENT ARCHITECTURE

Design:

• Development
• Testing
• Staging
• Production

Include:

• Kubernetes
• Helm
• Container registry
• CI/CD
• Rolling deployments
• Canary deployments
• Blue/green deployments where appropriate
• Automatic rollback
• Health verification

Define deployment boundaries for:

• APIs
• WebSocket gateways
• Workers
• Media processing
• Call signaling
• Search
• Kafka
• Redis
• PostgreSQL
• Observability

────────────────────────────────────────

KUBERNETES TOPOLOGY

Design Kubernetes topology.

Include:

• Cluster strategy
• Namespaces
• Node pools
• Application workloads
• WebSocket workloads
• Worker workloads
• Media workloads
• Call workloads
• Stateful workloads

Define:

• Resource requests
• Resource limits
• Horizontal Pod Autoscaling
• Cluster Autoscaling
• Pod Disruption Budgets
• Resource Quotas
• Network Policies
• Service Accounts
• Secrets
• Health checks

Identify workloads requiring:

• Dedicated nodes
• High CPU
• High memory
• Specialized capacity
• Independent autoscaling
• Regional placement

────────────────────────────────────────

OBSERVABILITY ARCHITECTURE

Use:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Define observability for:

• APIs
• Authentication
• Messaging
• Message delivery
• WebSockets
• Presence
• Calls
• TURN
• Media processing
• Kafka
• Redis
• PostgreSQL
• Search
• Notifications
• Security
• Background jobs

Define:

• SLIs
• SLOs
• Golden signals
• Structured logs
• Metrics
• Traces
• Correlation IDs
• Trace propagation
• Dashboards
• Alerts
• Sensitive-data redaction

────────────────────────────────────────

DISASTER RECOVERY

Define:

• RTO
• RPO
• Database backups
• Point-in-time recovery
• Object storage recovery
• Kafka recovery
• Redis recovery
• Search recovery
• Kubernetes recovery
• Infrastructure-state recovery
• Regional failover

Create recovery strategies for:

• Database failure
• Region failure
• Kafka failure
• Redis failure
• Search failure
• Object-storage failure
• WebSocket failure
• Call infrastructure failure
• Media-processing failure

────────────────────────────────────────

CAPACITY AND SCALABILITY

Create capacity-planning assumptions for:

• Registered users
• Daily active users
• Concurrent connections
• Messages per second
• Peak messages per second
• Group fan-out
• Presence events
• Media uploads
• Media downloads
• Calls
• TURN bandwidth
• SFU bandwidth
• Database operations
• Redis operations
• Kafka throughput

Identify:

• Primary bottlenecks
• Scaling dimensions
• Horizontal scaling strategies
• Partitioning
• Caching
• Backpressure
• Capacity triggers

Clearly identify assumptions.

Do not fabricate false precision.

────────────────────────────────────────

FAILURE SCENARIOS

Define graceful behavior for:

• PostgreSQL unavailable
• Redis unavailable
• Kafka unavailable
• Search unavailable
• Push providers unavailable
• S3 unavailable
• WebSocket gateway failure
• Call signaling failure
• TURN failure
• SFU failure
• Media processing backlog
• CDN degradation
• Regional outage

For each define:

• Detection
• Immediate response
• Fallback
• Retry
• Circuit breaker where appropriate
• Degraded behavior
• Recovery
• Data reconciliation

────────────────────────────────────────

DATA CONSISTENCY STRATEGY

Define consistency requirements for:

• Accounts
• Devices
• Conversations
• Messages
• Message delivery
• Read receipts
• Group membership
• Communities
• Presence
• Stories
• Calls
• Notifications
• Search
• Analytics
• Business accounts

Define where to use:

• Strong consistency
• Eventual consistency
• Idempotency
• Optimistic concurrency
• Distributed locks
• Transactional outbox
• Sagas where justified

Avoid distributed transactions where possible.

────────────────────────────────────────

TESTING STRATEGY

Define enterprise testing architecture.

UNIT TESTING

• Domain logic
• Services
• Utilities
• Encryption interfaces

INTEGRATION TESTING

• PostgreSQL
• Prisma
• Redis
• Kafka
• BullMQ
• WebSockets
• WebRTC signaling
• External providers

CONTRACT TESTING

• REST APIs
• WebSocket contracts
• Event schemas
• Internal service contracts

END-TO-END TESTING

• Registration
• Authentication
• Device registration
• Messaging
• Groups
• Communities
• Media
• Stories
• Calls
• Notifications
• Multi-device synchronization
• Offline synchronization
• Business accounts

PERFORMANCE TESTING

• API load
• WebSocket load
• Message throughput
• Presence
• Group fan-out
• Synchronization
• Call signaling
• Media processing

RESILIENCE TESTING

• Database failure
• Redis failure
• Kafka failure
• WebSocket failure
• TURN failure
• SFU failure
• Regional failure

SECURITY TESTING

• Authentication
• Authorization
• E2EE boundaries
• Rate limiting
• Abuse prevention
• Dependency scanning
• Container scanning
• Secret scanning
• Infrastructure security

────────────────────────────────────────

ARCHITECTURAL DECISION RECORDS

Define ADRs for:

• Multi-device architecture
• Message fan-out
• Large-group architecture
• Media processing
• CDN architecture
• WebRTC architecture
• TURN architecture
• SFU architecture
• E2EE operations
• E2EE multi-device architecture
• Search and privacy
• Notifications
• Abuse prevention
• Moderation
• Business accounts
• Analytics
• Multi-region architecture
• Kubernetes topology
• Disaster recovery
• Capacity strategy
• Feature flags
• Administration

Each ADR must contain:

• Context
• Decision
• Alternatives considered
• Consequences

────────────────────────────────────────

BACKEND IMPLEMENTATION ROADMAP

Define the exact backend implementation order.

BACKEND MILESTONE 1

Backend monorepo foundation and shared infrastructure.

BACKEND MILESTONE 2

Configuration, logging, validation, error handling, observability, and security foundation.

BACKEND MILESTONE 3

Identity, authentication, accounts, sessions, and devices.

BACKEND MILESTONE 4

Authorization, permissions, contacts, blocking, and privacy.

BACKEND MILESTONE 5

Conversations, messaging, persistence, delivery, and receipts.

BACKEND MILESTONE 6

Offline synchronization and multi-device synchronization.

BACKEND MILESTONE 7

Groups and communities.

BACKEND MILESTONE 8

Presence and real-time WebSocket infrastructure.

BACKEND MILESTONE 9

Media uploads and media processing.

BACKEND MILESTONE 10

Stories/status.

BACKEND MILESTONE 11

Notifications.

BACKEND MILESTONE 12

E2EE boundaries and device/key management.

BACKEND MILESTONE 13

Voice/video signaling and call infrastructure integration.

BACKEND MILESTONE 14

Search and discovery.

BACKEND MILESTONE 15

Business accounts.

BACKEND MILESTONE 16

Abuse prevention, reporting, and moderation.

BACKEND MILESTONE 17

Analytics, audit, and feature flags.

BACKEND MILESTONE 18

Performance, resilience, security hardening, and production readiness.

Adjust only when dependencies require it.

────────────────────────────────────────

PROJECT INDEX

Create the complete Project Index containing:

• Project overview
• Architecture decisions
• Domains
• Services
• Service ownership
• Database ownership
• Database objects
• API contracts
• WebSocket contracts
• Event contracts
• Queue contracts
• Shared packages
• Security boundaries
• E2EE boundaries
• Media architecture
• Call architecture
• Multi-device architecture
• Multi-region architecture
• Infrastructure decisions
• Observability
• Disaster recovery
• Testing strategy
• ADRs
• Backend milestones
• Remaining implementation phases

────────────────────────────────────────

ARCHITECTURE VOLUME 2 DELIVERABLE

Produce:

1. Advanced Multi-Device Architecture
2. Device Capability Architecture
3. Desktop Architecture
4. Advanced Synchronization Architecture
5. Message Ordering Architecture
6. Message Fan-Out Architecture
7. Large Group Architecture
8. Media Processing Architecture
9. Media Storage Architecture
10. CDN Architecture
11. Stories/Status Architecture
12. Voice/Video Infrastructure
13. Call Scalability Architecture
14. Call Quality Architecture
15. E2EE Operational Architecture
16. E2EE Multi-Device Architecture
17. Contact Discovery and Privacy
18. Notification Architecture
19. Search Architecture
20. Abuse Prevention Architecture
21. Moderation Architecture
22. Business Account Architecture
23. Administration Architecture
24. Analytics Architecture
25. Localization Architecture
26. Feature Flag Architecture
27. Security Architecture
28. Threat Model
29. Multi-Region Architecture
30. Deployment Architecture
31. Kubernetes Topology
32. Observability Architecture
33. Disaster Recovery Strategy
34. Capacity and Scalability Strategy
35. Failure Scenario Analysis
36. Data Consistency Strategy
37. Testing Architecture
38. Architectural Decision Records
39. Backend Implementation Roadmap
40. Complete Project Index

────────────────────────────────────────

QUALITY REQUIREMENTS

Every architectural decision must consider:

• Scalability
• Availability
• Security
• Privacy
• Latency
• Data consistency
• Operational complexity
• Cost
• Developer productivity
• Maintainability
• Future extensibility

Prefer:

• Explicit ownership
• Clear bounded contexts
• Stateless application services where possible
• Event-driven communication where appropriate
• Idempotent consumers
• Transactional outbox
• Horizontal scaling
• Established security protocols
• Established cryptographic protocols
• Graceful degradation
• Observable systems
• Least privilege

Avoid:

• Unnecessary microservices
• Shared database ownership
• Distributed transactions where avoidable
• Tight coupling
• Single points of failure
• Redis as a system of record
• Application servers proxying large media
• Proprietary cryptography
• Frontend-only security
• Unnecessary cross-region synchronous dependencies
• Premature complexity

────────────────────────────────────────

OUTPUT RULES

This is an architecture document only.

Do not generate source code.

Do not generate placeholder implementations.

Do not generate Dockerfiles.

Do not generate Kubernetes manifests.

Do not generate Terraform files.

Do not generate frontend components.

Do not generate mobile components.

Do not implement backend services.

Generate detailed:

• Architecture specifications
• Domain boundaries
• Service responsibilities
• Ownership rules
• Data strategies
• API contracts
• WebSocket contracts
• Event contracts
• Queue definitions
• Security boundaries
• Threat model
• Scalability strategies
• Deployment architecture
• Disaster recovery
• Testing architecture
• ADRs
• Backend implementation roadmap
• Project Index
