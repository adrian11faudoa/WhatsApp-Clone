You are operating in Senior Engineering Team Mode.

You are simultaneously acting as:

- Principal Software Architect
- Staff Backend Engineer
- Staff Frontend Engineer
- Staff Mobile Engineer
- DevOps Engineer
- Cloud Architect
- Database Architect
- Security Engineer
- QA Engineer
- UI/UX Designer
- Technical Writer

Design the complete foundational architecture for an enterprise-scale real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform must be an original implementation and must not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp.

This prompt is an independent architecture prompt.

Do not implement backend code.

Do not implement frontend code.

Do not implement mobile code.

Do not generate infrastructure implementation files.

Do not generate Dockerfiles.

Do not generate Kubernetes manifests.

Do not generate Terraform files.

Do not generate application source code.

Produce architecture, specifications, contracts, diagrams, data models, engineering decisions, and implementation guidance only.

────────────────────────────────────────

PROJECT

Build a production-ready global real-time communication platform supporting:

• Hundreds of millions of registered users
• Tens of millions of daily active users
• Billions of messages
• One-to-one messaging
• Group messaging
• Communities
• Channels where appropriate
• Voice calls
• Video calls
• Group calls
• Media sharing
• Voice messages
• Documents
• Stories/status updates
• Push notifications
• Multi-device synchronization
• Offline messaging
• Message delivery
• Read receipts
• Typing indicators
• Presence
• Contact management
• Blocking
• Reporting
• Moderation
• Business accounts
• Administration
• Analytics
• Audit logging
• End-to-end encryption architecture
• High availability
• Horizontal scaling
• Multi-region deployment
• Disaster recovery

Design the system for:

• Global operation
• Low latency
• High availability
• Fault tolerance
• Strong security
• Privacy
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

Real-Time Communication:

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
• STUN/TURN infrastructure

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

ARCHITECTURAL APPROACH

Determine whether the platform should initially use:

• Modular Monolith
• Service-Oriented Architecture
• Microservices

Do not blindly create a service for every table or feature.

Evaluate:

• Transactional consistency
• Scalability
• Latency
• Operational complexity
• Deployment independence
• Team ownership
• Failure isolation
• Cost
• Developer productivity
• Long-term maintainability

Clearly identify:

• Independently deployable services
• Shared transactional boundaries
• Authoritative data ownership
• Synchronous communication
• Asynchronous communication
• Event-driven communication
• Read models
• CQRS requirements
• Eventual consistency
• Strong consistency

Provide a migration strategy for future service extraction where appropriate.

────────────────────────────────────────

CORE PLATFORM DOMAINS

Define bounded contexts and ownership for:

Identity

Accounts

Users

Profiles

Authentication

Authorization

Sessions

Devices

Contacts

Privacy

Presence

Conversations

Messaging

Messages

Message Delivery

Message Reactions

Message Replies

Message Forwarding

Message Editing

Message Deletion

Groups

Communities

Channels

Media

Media Processing

Voice Messages

Documents

Stories

Notifications

Search

Calls

Voice Calls

Video Calls

Group Calls

Call Signaling

End-to-End Encryption

Key Management

Offline Synchronization

Multi-Device Synchronization

Blocking

Reporting

Moderation

Business Accounts

Administration

Analytics

Audit

Feature Flags

System Configuration

For each domain define:

• Responsibility
• Aggregate roots
• Entities
• Value objects
• Repositories
• Application services
• Domain services
• Domain events
• Data ownership
• Consistency requirements

────────────────────────────────────────

SYSTEM ARCHITECTURE

Design a complete high-level architecture.

CLIENT LAYER

Include:

• Web application
• iOS application
• Android application
• Desktop architecture boundaries
• Tablet architecture boundaries
• Future device integrations

EDGE LAYER

Include:

• DNS
• CDN
• WAF
• Load balancers
• API Gateway
• WebSocket Gateway
• Rate limiting
• Authentication boundaries

APPLICATION LAYER

Include:

• API services
• Domain services
• Real-time services
• Messaging services
• Call signaling
• Background workers
• Event consumers
• Scheduled jobs

DATA LAYER

Include:

• PostgreSQL
• Read replicas
• Redis
• Kafka/Redpanda
• Elasticsearch/OpenSearch
• Object storage

COMMUNICATION LAYER

Include:

• REST APIs
• WebSockets
• WebRTC
• Push notifications
• Event streaming

OBSERVABILITY LAYER

Include:

• Metrics
• Logs
• Traces
• Alerts

SECURITY LAYER

Include:

• Authentication
• Authorization
• Encryption
• Key management
• Secrets management
• Audit logging
• Network segmentation

Represent the architecture using clear text-based diagrams.

Do not use images.

────────────────────────────────────────

C4 ARCHITECTURE

Generate:

• System Context Diagram
• Container Diagram
• Component Diagram
• Deployment Diagram

For every major component define:

• Responsibility
• Inputs
• Outputs
• Dependencies
• Scaling behavior
• Failure behavior
• Security boundary

────────────────────────────────────────

SERVICE DECOMPOSITION

Evaluate and define service boundaries for:

API Gateway

Authentication Service

Identity Service

Account Service

Profile Service

Session Service

Device Service

Contact Service

Privacy Service

Presence Service

Conversation Service

Messaging Service

Message Delivery Service

Message Synchronization Service

Group Service

Community Service

Media Service

Media Processing Service

Notification Service

Search Service

Story Service

Call Signaling Service

Call Session Service

Encryption/Key Management boundaries

Moderation Service

Reporting Service

Business Account Service

Administration Service

Analytics Service

Audit Service

Feature Flag Service

Configuration Service

Do not automatically make every item an independently deployable microservice.

Combine cohesive responsibilities where appropriate.

For every final service boundary define:

• Responsibility
• Authoritative data
• APIs
• Events produced
• Events consumed
• Synchronous dependencies
• Asynchronous dependencies
• Scaling requirements
• Availability requirements
• Security boundaries

────────────────────────────────────────

SERVICE OWNERSHIP MATRIX

Create a complete ownership matrix.

For each domain identify:

• Authoritative service
• Database ownership
• API ownership
• Event ownership
• Cache ownership
• Search/read-model ownership
• Administrative ownership

Explicitly define prohibited cross-service database writes.

────────────────────────────────────────

COMMUNICATION MATRIX

Define communication between major services.

For each interaction specify:

• Producer
• Consumer
• Protocol
• Synchronous/asynchronous
• Purpose
• Consistency requirement
• Timeout
• Retry
• Idempotency
• Failure behavior

Evaluate:

• REST/HTTP
• WebSockets
• Kafka/Redpanda
• BullMQ
• Redis
• WebRTC signaling

Avoid unnecessary synchronous dependencies.

────────────────────────────────────────

MONOREPO ARCHITECTURE

Design a production-ready monorepo.

Applications:

• Web
• Mobile
• Desktop where appropriate
• Administration Dashboard
• Moderation Dashboard where appropriate

Backend:

• API Gateway
• Backend services
• Real-time services
• WebSocket services
• Call signaling services
• Background workers

Shared packages:

• API contracts
• Event contracts
• Shared types
• Validation
• Configuration
• Authentication interfaces
• Observability
• Encryption interfaces
• Testing utilities
• UI components where appropriate

Infrastructure:

• Docker
• Kubernetes
• Helm
• Terraform
• CI/CD

Documentation:

• Architecture
• API
• Events
• Database
• Security
• Operations
• ADRs
• Runbooks

Do not create shared packages merely to reduce duplication.

Shared packages must have clear ownership and dependency rules.

────────────────────────────────────────

FOLDER HIERARCHY

Generate a detailed folder hierarchy for:

• Monorepo root
• Applications
• Backend services
• Workers
• Shared packages
• Database
• Infrastructure
• Tests
• Documentation
• Configuration
• Database migrations

Include important directories and representative files.

Do not generate source code.

────────────────────────────────────────

CORE DOMAIN MODEL

Evaluate the following entities:

User

Account

Profile

ProfileSettings

PrivacySettings

Session

Device

DeviceCapability

Contact

ContactRequest

BlockedUser

Conversation

ConversationParticipant

ConversationSettings

Message

MessageAttachment

MessageReaction

MessageReply

MessageForward

MessageMention

MessageReceipt

MessageEdit

MessageDeletion

Group

GroupMember

GroupRole

Community

CommunityMember

Channel

MediaAsset

MediaProcessingJob

VoiceMessage

Document

Story

StoryViewer

Notification

NotificationPreference

PushToken

Call

CallParticipant

CallSession

CallDevice

EncryptionIdentity

DeviceKey

PreKey

SessionKey

Report

ModerationCase

BusinessAccount

BusinessProfile

AuditLog

FeatureFlag

Do not assume one database table per conceptual entity.

Define:

• Aggregate roots
• Aggregate boundaries
• Lifecycle
• Invariants
• Ownership
• Transaction boundaries

────────────────────────────────────────

DATABASE ARCHITECTURE

Design PostgreSQL for:

• Hundreds of millions of users
• Billions of messages
• Large conversation histories
• Large groups
• High-volume message receipts
• Large device/session datasets
• Large audit datasets

Define:

• Database ownership
• Schema boundaries
• Primary keys
• Foreign keys
• Indexes
• Unique constraints
• Check constraints
• Partitioning
• Replication
• Read replicas
• Connection pooling
• Archival
• Retention
• Backup
• Recovery

Identify high-growth tables.

Evaluate partitioning candidates for:

• Messages
• Message receipts
• Audit logs
• Call events
• Analytics data

Do not store large binary media inside PostgreSQL.

Do not use PostgreSQL as the primary source for high-volume ephemeral presence data.

────────────────────────────────────────

DATABASE OWNERSHIP

Define:

• Which service owns each database/schema
• Which services may directly read it
• Which services must use APIs
• Which services use read models
• How cross-domain queries are implemented
• How database migrations are owned

Prevent uncontrolled cross-service database access.

────────────────────────────────────────

ERD

Generate a complete text-based ERD.

Include:

• Primary keys
• Foreign keys
• Cardinality
• Ownership
• Important indexes
• High-growth tables
• Partitioning candidates

Clearly show relationships between:

• Users
• Accounts
• Profiles
• Devices
• Contacts
• Conversations
• Participants
• Messages
• Attachments
• Groups
• Communities
• Stories
• Calls
• Encryption metadata
• Reports
• Business accounts
• Sessions
• Notifications

────────────────────────────────────────

PRISMA STRATEGY

Define:

• Schema ownership
• Prisma schema organization
• Service-specific Prisma clients where appropriate
• Migration ownership
• Transaction boundaries
• Read replica strategy
• Connection pooling
• Query optimization
• Indexing rules
• Migration deployment strategy

Avoid a single uncontrolled shared database model.

────────────────────────────────────────

REDIS ARCHITECTURE

Design Redis usage for:

• Presence
• Session coordination
• WebSocket coordination
• Typing indicators
• Rate limiting
• Distributed locks
• Temporary synchronization state
• Notification deduplication
• Cache
• Queue infrastructure

For each use case define:

• Key pattern
• TTL
• Invalidation
• Consistency
• Failure behavior
• Memory considerations

Redis must never be the authoritative source for critical persistent data.

────────────────────────────────────────

REAL-TIME ARCHITECTURE

Design the complete WebSocket architecture.

Support:

• Connection establishment
• Authentication
• Authorization
• Heartbeats
• Reconnection
• Presence
• Typing indicators
• Message delivery
• Delivery acknowledgements
• Read receipts
• Reactions
• Group events
• Call signaling
• Multi-device synchronization

Define:

• Gateway architecture
• Connection routing
• Horizontal scaling
• Redis coordination
• Connection affinity
• Backpressure
• Rate limiting
• Connection recovery
• Regional routing
• Failure handling

Design for tens of millions of concurrent connections.

────────────────────────────────────────

MESSAGING ARCHITECTURE

Design one-to-one and group messaging.

Support:

• Text messages
• Replies
• Reactions
• Forwarding
• Mentions
• Editing
• Deletion
• Attachments
• Voice messages
• Documents
• Delivery state
• Read state
• Message ordering
• Offline delivery
• Multi-device delivery

Define:

• Client-generated message IDs
• Server-generated IDs
• Conversation sequence numbers
• Idempotency keys
• Ordering guarantees
• Deduplication
• Retry behavior
• Delivery semantics
• Persistence semantics

Do not rely on client timestamps for authoritative ordering.

────────────────────────────────────────

MESSAGE DELIVERY

Define delivery states:

• Pending
• Accepted
• Sent
• Delivered
• Read
• Failed

Define how states propagate across:

• Sender devices
• Recipient devices
• Web
• Mobile
• Desktop

Define how retries and duplicate events are handled.

────────────────────────────────────────

OFFLINE SYNCHRONIZATION

Design:

• Offline message composition
• Local pending queues
• Synchronization cursors
• Incremental synchronization
• Delta synchronization
• Missed-event recovery
• Message history synchronization
• Conflict resolution
• Duplicate prevention

Define:

• Initial sync
• Incremental sync
• Recovery after long disconnection
• Cursor invalidation
• Replay behavior
• Backpressure

────────────────────────────────────────

MULTI-DEVICE ARCHITECTURE

Support:

• Multiple smartphones
• Web
• Desktop
• Tablets
• Future clients

Define:

• Device registration
• Device verification
• Device capabilities
• Device limits
• Device revocation
• Remote logout
• Session synchronization
• Message synchronization
• Encryption synchronization

Clearly separate:

• Account identity
• User identity
• Device identity
• Session identity

────────────────────────────────────────

PRESENCE

Design:

• Online
• Offline
• Last seen
• Typing
• Recording
• Presence subscriptions

Define:

• Storage
• TTL
• Heartbeats
• Fan-out
• Privacy
• Regional behavior
• Failure behavior

Presence must remain ephemeral and must not create excessive database traffic.

────────────────────────────────────────

CONTACT ARCHITECTURE

Design:

• Contact discovery
• Contact synchronization
• Contact requests
• Blocking
• Privacy controls

Define privacy-preserving contact discovery.

Protect against:

• User enumeration
• Automated scraping
• Mass contact discovery
• Abuse

────────────────────────────────────────

AUTHENTICATION ARCHITECTURE

Support:

• Password authentication where appropriate
• Phone-based authentication where appropriate
• OAuth
• Passkeys
• MFA
• Session management
• Refresh tokens
• Device authentication
• Session revocation
• Suspicious login detection

Define:

• Credential storage
• Token strategy
• Token rotation
• Expiration
• Revocation
• Device binding
• Recovery

────────────────────────────────────────

AUTHORIZATION ARCHITECTURE

Define:

• RBAC
• Resource ownership
• Conversation permissions
• Group permissions
• Community permissions
• Business permissions
• Administrative permissions

Define enforcement at:

• Gateway
• Service
• Domain
• Database query

Frontend authorization must never be the only enforcement layer.

────────────────────────────────────────

END-TO-END ENCRYPTION FOUNDATIONS

Design boundaries for:

• Identity keys
• Device keys
• Pre-keys
• Session establishment
• Message encryption
• Group encryption
• Key rotation
• Device addition
• Device removal
• Key verification

Clearly distinguish:

• TLS
• Server-side encryption
• End-to-end encryption

Do not implement cryptographic algorithms.

Do not invent cryptography.

Define which information remains available to backend systems and which information must remain inaccessible.

────────────────────────────────────────

EVENT-DRIVEN ARCHITECTURE

Design Kafka/Redpanda architecture.

Define:

• Topic naming
• Partition strategy
• Partition keys
• Consumer groups
• Event ownership
• Retention
• Versioning
• Replay
• Idempotency
• Ordering
• Dead-letter handling
• Observability

Use transactional outbox patterns where appropriate.

────────────────────────────────────────

EVENT CATALOG

Define initial events including:

AccountCreated

AccountVerified

SessionCreated

SessionRevoked

DeviceRegistered

DeviceRevoked

ContactAdded

ContactBlocked

ConversationCreated

ConversationParticipantAdded

ConversationParticipantRemoved

MessageCreated

MessageSent

MessageDelivered

MessageRead

MessageEdited

MessageDeleted

MessageReactionAdded

MessageReactionRemoved

GroupCreated

GroupMemberAdded

GroupMemberRemoved

CommunityCreated

MediaUploaded

MediaProcessingCompleted

StoryCreated

StoryExpired

CallCreated

CallStarted

CallEnded

NotificationCreated

NotificationDelivered

UserReported

ModerationActionTaken

BusinessAccountCreated

AuditLogCreated

FeatureFlagChanged

Define payload ownership and versioning.

Do not duplicate entire database entities inside events.

────────────────────────────────────────

QUEUE ARCHITECTURE

Define BullMQ queues for:

• Push notification delivery
• Email delivery
• Media processing
• Image processing
• Video processing
• Thumbnail generation
• Story expiration
• Media cleanup
• Search indexing
• Analytics aggregation
• Notification cleanup
• Data retention
• Report processing

For each queue define:

• Producer
• Consumer
• Retry
• Backoff
• Idempotency
• Dead-letter behavior
• Concurrency
• Monitoring

Clearly distinguish queue responsibilities from Kafka responsibilities.

────────────────────────────────────────

API ARCHITECTURE

Define REST, WebSocket, and WebRTC signaling boundaries.

API categories:

Authentication

• Registration
• Login
• Logout
• Refresh
• Password reset
• Device management

Contacts

• Contact discovery
• Contact management
• Blocking

Conversations

• Create
• List
• Members
• Settings

Messages

• Send
• Edit
• Delete
• Reply
• Forward
• React
• History
• Read state

Groups

• Create
• Update
• Members
• Roles
• Permissions

Media

• Upload authorization
• Processing state
• Download authorization

Stories

• Create
• View
• Delete
• Privacy

Calls

• Create
• Accept
• Reject
• Signaling
• End

Administration

• Users
• Reports
• Moderation
• Audit

Define:

• Versioning
• Naming conventions
• Request validation
• Pagination
• Cursor pagination
• Filtering
• Sorting
• Error response format
• Authentication
• Authorization
• Rate limiting
• Idempotency

Do not generate application code.

────────────────────────────────────────

SECURITY ARCHITECTURE

Define:

• Authentication security
• Authorization
• Device security
• Session security
• Rate limiting
• Abuse prevention
• Account takeover protection
• Secrets management
• Encryption
• Audit logging
• Secure media access
• WebSocket security
• API security
• Infrastructure security

Cover OWASP best practices.

────────────────────────────────────────

SCALABILITY

Design for:

• Hundreds of millions of users
• Billions of messages
• Tens of millions of concurrent connections
• Large group fan-out
• Large media traffic
• Global deployment

Analyze:

• API scaling
• WebSocket scaling
• PostgreSQL scaling
• Redis scaling
• Kafka scaling
• Search scaling
• Media-processing scaling
• CDN scaling

Identify likely bottlenecks and mitigation strategies.

────────────────────────────────────────

FAILURE STRATEGY

Define behavior when:

• PostgreSQL is unavailable
• Redis is unavailable
• Kafka is unavailable
• Search is unavailable
• S3 is unavailable
• Push providers fail
• WebSocket gateway fails
• Call signaling fails
• Regional infrastructure fails

For every failure define:

• Detection
• Retry
• Fallback
• Degraded behavior
• Recovery
• Data reconciliation

────────────────────────────────────────

MULTI-REGION FOUNDATION

Define:

• Regional application clusters
• Global routing
• Regional data ownership
• Cross-region event replication
• Failover
• Disaster recovery

Classify data as:

• Region-local
• Globally replicated
• Eventually consistent

Avoid unnecessary synchronous cross-region calls.

────────────────────────────────────────

OBSERVABILITY FOUNDATION

Define observability for:

• API Gateway
• Authentication
• Messaging
• WebSockets
• Presence
• Database
• Redis
• Kafka
• BullMQ
• Media processing
• Notifications
• Calls

Use:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Define:

• Structured logs
• Metrics
• Traces
• Correlation IDs
• Trace propagation
• Health checks
• Readiness checks
• Liveness checks
• Alerts
• SLOs
• SLIs

────────────────────────────────────────

TESTING ARCHITECTURE

Define:

Unit Testing

• Domain logic
• Services
• Utilities

Integration Testing

• PostgreSQL
• Redis
• Kafka
• WebSockets
• External providers

Contract Testing

• REST APIs
• WebSocket contracts
• Event schemas

End-to-End Testing

• Registration
• Login
• Messaging
• Groups
• Media
• Calls
• Notifications
• Multi-device synchronization

Performance Testing

• API load
• WebSocket connections
• Message throughput
• Group messaging
• Presence
• Synchronization

Resilience Testing

• Database failures
• Redis failures
• Kafka failures
• WebSocket failures
• Regional failures

Security Testing

• Authentication
• Authorization
• Rate limiting
• Abuse prevention
• Dependency scanning

────────────────────────────────────────

ARCHITECTURAL DECISION RECORDS

Create ADRs for:

• Architecture style
• Service boundaries
• Database ownership
• Prisma strategy
• Redis strategy
• Kafka/Redpanda
• BullMQ
• WebSocket architecture
• Multi-device synchronization
• Offline synchronization
• E2EE boundaries
• Search architecture
• Object storage
• CDN
• WebRTC
• Multi-region strategy

Each ADR must contain:

• Context
• Decision
• Alternatives
• Consequences

────────────────────────────────────────

PROJECT INDEX

Create the initial Project Index containing:

• Project overview
• Technology stack
• Domains
• Services
• Service ownership
• Database ownership
• Core entities
• ERD
• APIs
• WebSocket events
• Event catalog
• Queue catalog
• Redis responsibilities
• Security boundaries
• Encryption boundaries
• Media architecture
• Call architecture
• Infrastructure principles
• Observability
• Testing strategy
• Implementation dependencies

────────────────────────────────────────

ARCHITECTURE VOLUME 1 OUTPUT

Produce:

1. Executive Architecture Overview
2. System Context
3. C4 Architecture
4. Architectural Approach
5. Domain Decomposition
6. Service Decomposition
7. Service Ownership Matrix
8. Communication Matrix
9. Monorepo Architecture
10. Detailed Folder Hierarchy
11. Core Domain Model
12. Aggregate Boundaries
13. Database Architecture
14. Database Ownership
15. Complete Text-Based ERD
16. Prisma Strategy
17. Redis Architecture
18. WebSocket Architecture
19. Messaging Architecture
20. Message Delivery Architecture
21. Group Messaging Architecture
22. Community Architecture
23. Offline Synchronization Architecture
24. Multi-Device Architecture
25. Presence Architecture
26. Contact Architecture
27. Authentication Architecture
28. Authorization Architecture
29. E2EE Foundations
30. Event-Driven Architecture
31. Event Catalog
32. Queue Architecture
33. API Architecture
34. Security Architecture
35. Scalability Strategy
36. Multi-Region Foundation
37. Failure Strategy
38. Observability Architecture
39. Testing Architecture
40. Architectural Decision Records
41. Project Index

────────────────────────────────────────

QUALITY REQUIREMENTS

Every architectural decision must evaluate:

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
• Clear domain boundaries
• Stateless services where possible
• Event-driven communication where appropriate
• Idempotent consumers
• Transactional outbox
• Horizontal scaling
• Established security protocols
• Graceful degradation
• Observable systems

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

Provide detailed specifications, diagrams, contracts, schemas, ownership rules, security boundaries, consistency requirements, and implementation guidance.

The resulting architecture must be detailed enough for independent backend, frontend, mobile, infrastructure, DevOps, and QA implementation teams to build the complete platfor

You are operating in Senior Engineering Team Mode.

Design the complete first architecture volume for an enterprise-scale real-time messaging and communication platform comparable in architectural scope to WhatsApp.

This is an independent architecture prompt.

This is:

ARCHITECTURE PHASE
VOLUME 1

Do not implement backend code.

Do not implement frontend code.

Do not implement mobile code.

Do not generate infrastructure implementation files.

The purpose of this phase is to establish the core architecture, domain model, service boundaries, data architecture, real-time architecture, messaging architecture, API architecture, security foundations, and technical contracts that the remaining architecture and implementation phases will follow.

The architecture must be original and must not copy proprietary implementation details from WhatsApp.

────────────────────────────────────────

PROJECT

Build a production-ready global real-time communication platform supporting:

• Hundreds of millions of registered users
• Tens of millions of daily active users
• Large-scale one-to-one messaging
• Group messaging
• Communities
• Voice calls
• Video calls
• Group calls
• Media sharing
• Voice messages
• Documents
• Stories/status updates
• Push notifications
• Multi-device synchronization
• Offline messaging
• Message delivery guarantees
• End-to-end encryption architecture
• Contact management
• Blocking and reporting
• Business accounts
• Administrative tools
• Moderation
• Analytics
• High availability
• Multi-region deployment
• Horizontal scaling
• Disaster recovery

Design the platform for global operation, low latency, high availability, strong security, privacy, and long-term scalability.

Do not assume that every client device has identical capabilities.

Do not design the system around a single-device architecture.

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Web:

• Next.js
• React
• TypeScript
• Tailwind CSS

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

Real-Time Communication:

• WebSockets
• Socket.IO where appropriate

Event Streaming:

• Kafka or Redpanda

Background Jobs:

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
• STUN/TURN infrastructure

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

CORE PLATFORM DOMAINS

Define bounded contexts and ownership for:

Identity

Accounts

Users

Profiles

Authentication

Authorization

Sessions

Devices

Contacts

Presence

Messaging

Conversations

Groups

Communities

Messages

Message Delivery

Message Reactions

Message Editing

Message Deletion

Media

Voice Messages

Documents

Stories

Notifications

Search

Calls

Voice Calls

Video Calls

Group Calls

Call Signaling

End-to-End Encryption

Key Management

Offline Synchronization

Multi-Device Synchronization

Blocking

Reporting

Moderation

Business Accounts

Administration

Analytics

Audit

Feature Flags

System Configuration

────────────────────────────────────────

ARCHITECTURAL APPROACH

Determine the appropriate architecture between:

• Modular Monolith
• Service-Oriented Architecture
• Microservices

Do not blindly create a microservice for every domain or database table.

Evaluate:

• Transactional consistency
• Operational complexity
• Scalability
• Latency
• Deployment independence
• Team ownership
• Failure isolation
• Data ownership
• Developer productivity
• Long-term maintainability

Clearly identify:

• Independently deployable services
• Shared transactional boundaries
• Authoritative data ownership
• Synchronous communication
• Asynchronous communication
• Event-driven communication
• Read models
• CQRS requirements
• Eventual consistency boundaries
• Strong consistency requirements

Explain why each major service boundary exists.

────────────────────────────────────────

SYSTEM ARCHITECTURE

Design the complete high-level system architecture.

CLIENT LAYER

Include:

• Web application
• iOS application
• Android application
• Desktop architecture boundaries
• Tablet architecture boundaries
• Future embedded/device integrations

EDGE LAYER

Include:

• DNS
• CDN
• WAF
• Load balancers
• API Gateway
• WebSocket Gateway
• Rate limiting
• Authentication boundaries

APPLICATION LAYER

Include:

• API services
• Authentication services
• Identity services
• Account services
• Conversation services
• Messaging services
• Real-time services
• Call signaling
• Background workers
• Event consumers
• Scheduled jobs

DATA LAYER

Include:

• PostgreSQL
• Read replicas
• Redis
• Kafka/Redpanda
• Elasticsearch/OpenSearch
• Object storage

COMMUNICATION LAYER

Include:

• WebSockets
• WebRTC
• Push notifications
• Event streaming

OBSERVABILITY LAYER

Include:

• Metrics
• Logs
• Traces
• Alerts

SECURITY LAYER

Include:

• Authentication
• Authorization
• Encryption
• Key management
• Secrets
• Audit logging
• Network segmentation

Represent the architecture using clear text-based diagrams.

Do not use images.

────────────────────────────────────────

SERVICE DECOMPOSITION

Evaluate and define appropriate service boundaries for:

API Gateway

Authentication Service

Identity Service

Account Service

Profile Service

Session Service

Device Service

Contact Service

Presence Service

Conversation Service

Messaging Service

Message Delivery Service

Message Sync Service

Group Service

Community Service

Media Service

Media Processing Service

Notification Service

Search Service

Story Service

Call Signaling Service

Call Session Service

Voice/Video Infrastructure

Encryption/Key Management boundaries

Moderation Service

Reporting Service

Business Account Service

Administration Service

Analytics Service

Audit Service

Feature Flag Service

Configuration Service

Do not create unnecessary services.

Services may be combined when strong transactional consistency, ownership, or operational simplicity makes that architecture more appropriate.

For every service define:

• Responsibility
• Owned data
• APIs
• Events produced
• Events consumed
• Synchronous dependencies
• Asynchronous dependencies
• Scaling requirements
• Availability requirements
• Security boundaries
• Failure behavior

────────────────────────────────────────

SERVICE OWNERSHIP MATRIX

Create a complete service ownership matrix.

For every major domain identify:

• Authoritative service
• Primary database ownership
• Read model ownership
• API ownership
• Event ownership
• Cache ownership
• Operational ownership

Explicitly identify which services must never directly modify another service's authoritative data.

────────────────────────────────────────

COMMUNICATION MATRIX

Create a communication matrix showing:

• Service A
• Service B
• Communication type
• Protocol
• Direction
• Synchronous/asynchronous
• Reason
• Failure behavior
• Timeout requirements
• Retry requirements

Cover:

• REST/HTTP
• Internal APIs
• WebSockets
• Kafka/Redpanda
• BullMQ
• WebRTC signaling

Avoid unnecessary synchronous dependencies.

────────────────────────────────────────

MONOREPO ARCHITECTURE

Design a production-ready monorepo containing:

Applications:

• Web
• Mobile
• Desktop where appropriate
• Admin Dashboard

Backend:

• API Gateway
• Backend services
• Real-time services
• WebSocket services
• Call signaling services
• Background workers

Shared packages:

• API contracts
• Event contracts
• Shared types
• Validation
• Configuration
• Authentication utilities
• Observability
• Encryption interfaces
• Testing utilities
• UI components where appropriate

Infrastructure:

• Docker
• Kubernetes
• Helm
• Terraform
• CI/CD

Documentation:

• Architecture
• APIs
• Events
• Database
• Security
• Operations
• ADRs
• Runbooks

Do not create uncontrolled shared packages.

Every shared package must have a clearly defined purpose and ownership boundary.

Do not share domain implementation logic between unrelated services merely to reduce duplication.

────────────────────────────────────────

FOLDER HIERARCHY

Generate a detailed production-ready folder hierarchy.

Include:

• Monorepo root
• Applications
• Backend services
• Workers
• Shared packages
• Infrastructure
• Tests
• Documentation
• Database migrations
• Configuration

Include major files and directories.

The hierarchy must be consistent with future backend, frontend, mobile, infrastructure, and testing implementation prompts.

Do not generate implementation code.

Do not generate placeholder files.

────────────────────────────────────────

CORE DOMAIN MODEL

Design the major entities and aggregates.

Evaluate:

User

Account

Profile

Session

Device

Contact

ContactRequest where appropriate

Conversation

ConversationParticipant

Message

MessageAttachment

MessageReaction

MessageReceipt

MessageEdit

MessageDeletion

MessageMention

Group

GroupMember

GroupRole

Community

CommunityMember

Channel where appropriate

MediaAsset

VoiceMessage

Document

Story

StoryViewer

Notification

Call

CallParticipant

CallSession

CallDevice

EncryptionIdentity

DeviceKey

PreKey

SessionKey

BlockedUser

Report

BusinessAccount

BusinessProfile

AuditLog

FeatureFlag

Do not force every conceptual entity into a separate database table.

Use proper aggregates and ownership boundaries.

For each major aggregate define:

• Aggregate root
• Owned entities
• Invariants
• Transaction boundary
• Authoritative service
• Lifecycle
• Consistency requirements

────────────────────────────────────────

DATABASE ARCHITECTURE

Design PostgreSQL for:

• Hundreds of millions of users
• Billions of messages
• Large numbers of conversations
• Large group membership
• High-volume message receipts
• High-volume presence information
• Large media metadata volume
• Large audit datasets

Define:

• Database ownership
• Schema boundaries
• Primary keys
• Foreign keys
• Indexes
• Unique constraints
• Check constraints
• Partitioning
• Archival
• Retention
• Replication
• Read replicas
• Connection pooling
• Backup strategy

Identify high-growth tables.

Evaluate partitioning for:

• Messages
• Message receipts
• Audit logs
• Analytics events
• Call events

Do not store high-volume ephemeral presence information as the primary source of truth in PostgreSQL.

Do not overload transactional PostgreSQL databases with analytical workloads.

────────────────────────────────────────

DATABASE OWNERSHIP

Define how database ownership works across services.

Specify:

• Which service owns each database/schema
• Which services can read directly
• Which services must use APIs
• Which services consume events
• Where read models are appropriate
• How cross-domain queries are handled
• How data migrations are coordinated

Avoid shared database ownership.

Avoid unrestricted cross-service SQL access.

────────────────────────────────────────

ERD

Generate a complete text-based ERD.

Include:

• Primary keys
• Foreign keys
• Cardinality
• Ownership
• Important indexes
• High-growth tables
• Partitioning candidates

Clearly show relationships between:

• Users
• Accounts
• Profiles
• Devices
• Contacts
• Conversations
• Participants
• Messages
• Attachments
• Groups
• Communities
• Stories
• Calls
• Encryption metadata
• Reports
• Business accounts
• Sessions
• Notifications

Identify which relationships are transactional and which are eventually consistent.

────────────────────────────────────────

PRISMA ARCHITECTURE

Define Prisma strategy including:

• Schema ownership
• Service-specific Prisma clients where appropriate
• Migration ownership
• Transaction boundaries
• Read replica strategy
• Connection pooling
• Query optimization
• Indexing rules
• Transaction isolation
• Migration deployment strategy

Avoid an uncontrolled shared Prisma schema where every service can modify every domain.

Define how services interact with data they do not own.

────────────────────────────────────────

REDIS ARCHITECTURE

Design Redis usage for:

• Presence
• Session state
• WebSocket coordination
• Rate limiting
• Typing indicators
• Online/offline state
• Distributed locks
• Temporary synchronization state
• Notification deduplication
• Cache
• Queue infrastructure

For each use case define:

• Key pattern
• TTL
• Invalidation
• Consistency requirements
• Failure behavior
• Memory considerations
• Eviction behavior

Redis must never become the authoritative source for critical persistent data.

Define the expected behavior if Redis becomes completely unavailable.

────────────────────────────────────────

REAL-TIME ARCHITECTURE

Design the WebSocket architecture.

Support:

• Connection establishment
• Authentication
• Connection lifecycle
• Reconnection
• Heartbeats
• Presence
• Typing indicators
• Message delivery
• Read receipts
• Message reactions
• Group updates
• Call signaling
• Multi-device synchronization

Define:

• WebSocket gateway architecture
• Connection routing
• Horizontal scaling
• Redis coordination
• Connection affinity requirements
• Failure recovery
• Backpressure
• Rate limiting
• Connection limits
• Heartbeat strategy
• Reconnection strategy

Design for tens of millions of concurrent connections.

Identify how connections are distributed across regions.

────────────────────────────────────────

MESSAGING ARCHITECTURE

Design one-to-one messaging.

Support:

• Text messages
• Replies
• Forwarding
• Mentions
• Reactions
• Editing
• Deletion
• Attachments
• Voice messages
• Documents
• Delivery states
• Read states
• Message ordering

Define:

• Message IDs
• Client-generated IDs
• Server-generated IDs
• Idempotency
• Ordering guarantees
• Deduplication
• Retry behavior
• Offline delivery
• Multi-device synchronization
• Message persistence
• Message fan-out

Clearly define what ordering guarantees are provided.

Do not claim global total ordering if the architecture does not require or provide it.

────────────────────────────────────────

MESSAGE IDENTIFIERS AND IDEMPOTENCY

Define:

• Client message ID
• Server message ID
• Conversation sequence
• Idempotency key
• Delivery ID
• Synchronization cursor

Define how the platform prevents duplicate messages when:

• Clients retry
• Networks reconnect
• WebSocket delivery is duplicated
• HTTP requests are retried
• Kafka events are redelivered
• Workers restart

Define idempotency boundaries for every message lifecycle operation.

────────────────────────────────────────

GROUP MESSAGING

Design scalable group messaging.

Support:

• Group creation
• Group membership
• Admin roles
• Invitations
• Permissions
• Group metadata
• Group avatar
• Group settings
• Member removal
• Member addition
• Message delivery

Define scalability strategy for large groups.

Evaluate:

• Fan-out on write
• Fan-out on read
• Hybrid fan-out
• Membership snapshots
• Delivery queues
• Regional distribution

Clearly define how the architecture changes for very large groups.

────────────────────────────────────────

COMMUNITIES

Design support for communities containing multiple groups or channels.

Define:

• Community ownership
• Membership
• Roles
• Group relationships
• Permissions
• Moderation
• Notifications
• Discovery
• Community-level settings

Avoid coupling community functionality directly to basic one-to-one conversations.

Define service ownership and data relationships.

────────────────────────────────────────

MESSAGE DELIVERY

Define message delivery states:

• Pending
• Sent
• Delivered
• Read
• Failed

Design:

• Delivery receipts
• Read receipts
• Retry
• Offline delivery
• Multi-device delivery
• Duplicate prevention
• Ordering guarantees

Define exactly-once versus at-least-once behavior where appropriate.

Define how delivery state is maintained when users have multiple devices.

────────────────────────────────────────

OFFLINE MESSAGING

Design offline message handling.

Support:

• Offline message composition
• Local pending queue
• Server-side pending delivery
• Retry
• Deduplication
• Synchronization
• Reconnection
• Message history recovery

Define:

• Pending message lifecycle
• Retry strategy
• Expiration
• Failure behavior
• Delivery guarantees
• Synchronization cursor

────────────────────────────────────────

PRESENCE ARCHITECTURE

Design:

• Online status
• Last seen
• Typing indicators
• Recording indicators
• Presence subscriptions

Presence must be optimized for extremely high scale.

Define:

• Redis usage
• TTL
• Heartbeats
• Fan-out strategy
• Regional architecture
• Failure behavior
• Privacy controls

Presence must not create excessive database writes.

────────────────────────────────────────

CONTACT ARCHITECTURE

Design:

• Contact discovery
• Contact synchronization
• Contact permissions
• Invitations
• Blocking
• Privacy controls

Define privacy-preserving boundaries for contact discovery.

Do not expose unnecessary user information.

Define:

• Contact ownership
• Contact synchronization
• Contact visibility
• Blocking interaction
• Discovery limitations

────────────────────────────────────────

ACCOUNT AND PROFILE ARCHITECTURE

Define the relationship between:

• Account
• User
• Profile
• Device
• Session

Support:

• User identity
• Profile information
• Profile settings
• Privacy settings
• Notification preferences
• Security settings
• Multiple devices

Ensure that account-level and device-level state are clearly separated.

────────────────────────────────────────

AUTHENTICATION ARCHITECTURE

Design authentication supporting:

• Email/password where appropriate
• Phone-based authentication where appropriate
• OAuth
• Passkeys
• MFA
• Session management
• Refresh tokens
• Device authentication
• Device verification

Define:

• Credential storage
• Password hashing
• Token/session strategy
• Access token lifetime
• Refresh strategy
• Session expiration
• Session revocation
• Device binding
• Suspicious login detection

Authentication must work across:

• Web
• Mobile
• Desktop
• Multiple devices

────────────────────────────────────────

AUTHORIZATION ARCHITECTURE

Design:

• RBAC
• Resource ownership
• Account-level permissions
• Profile-level permissions
• Conversation permissions
• Group permissions
• Community permissions
• Business permissions
• Administrative permissions

Define where authorization is enforced:

• API Gateway
• Service layer
• Domain layer
• Database query layer

Frontend authorization must never be the only security enforcement layer.

────────────────────────────────────────

END-TO-END ENCRYPTION FOUNDATIONS

Define the architectural foundation for end-to-end encryption.

Support boundaries for:

• Identity keys
• Device keys
• Pre-keys
• Session establishment
• Message encryption
• Group encryption
• Key rotation
• Device addition
• Device removal
• Device verification
• Key verification

Clearly distinguish:

• TLS transport encryption
• Server-side encryption
• End-to-end encryption

Do not implement cryptographic algorithms.

Do not invent proprietary cryptography.

Define which components can access plaintext and which components cannot.

Define how E2EE affects:

• Search
• Notifications
• Moderation
• Analytics
• Message storage
• Backups
• Multi-device synchronization

────────────────────────────────────────

EVENT-DRIVEN ARCHITECTURE

Use Kafka or Redpanda for durable asynchronous events.

Define:

• Topic naming
• Producers
• Consumers
• Consumer groups
• Partition keys
• Ordering
• Retention
• Replay
• Schema versioning
• Idempotency
• Dead-letter handling
• Observability

Define transactional outbox usage.

Define event ownership.

Define which events are domain events and which are integration events.

────────────────────────────────────────

INITIAL EVENT CATALOG

Define events including:

AccountCreated

AccountVerified

UserLoggedIn

SessionCreated

SessionRevoked

DeviceRegistered

DeviceRevoked

ContactAdded

ContactBlocked

ConversationCreated

ConversationParticipantAdded

ConversationParticipantRemoved

MessageCreated

MessageSent

MessageDelivered

MessageRead

MessageEdited

MessageDeleted

MessageReactionAdded

MessageReactionRemoved

GroupCreated

GroupMemberAdded

GroupMemberRemoved

GroupSettingsChanged

CommunityCreated

CommunityMemberAdded

MediaUploaded

MediaProcessed

StoryCreated

StoryExpired

CallCreated

CallStarted

CallEnded

NotificationCreated

NotificationDelivered

UserBlocked

UserReported

BusinessAccountCreated

ModerationActionTaken

AuditLogCreated

FeatureFlagChanged

Events must contain only the data required by consumers.

Do not unnecessarily duplicate entire database records inside events.

Define event versioning and backward compatibility.

────────────────────────────────────────

QUEUE ARCHITECTURE

Use BullMQ for asynchronous workloads where Kafka is unnecessary.

Define queues for:

• Media processing
• Image processing
• Video processing
• Thumbnail generation
• Push notifications
• Email delivery
• Message cleanup
• Story expiration
• Temporary media cleanup
• Search indexing
• Analytics aggregation
• Notification cleanup
• Data retention
• Report processing

For each queue define:

• Producer
• Consumer
• Retry strategy
• Backoff
• Idempotency
• Dead-letter behavior
• Monitoring
• Concurrency
• Failure behavior

Clearly distinguish Kafka responsibilities from BullMQ responsibilities.

────────────────────────────────────────

API ARCHITECTURE

Define:

• Public APIs
• Internal APIs
• WebSocket APIs
• WebRTC signaling APIs

Support:

AUTHENTICATION

• Registration
• Login
• Logout
• Session management
• Device management

CONTACTS

• Contact discovery
• Contact management
• Blocking

CONVERSATIONS

• Conversation creation
• Conversation listing
• Participant management

MESSAGES

• Send
• Edit
• Delete
• React
• Reply
• Forward
• Read receipts

GROUPS

• Create
• Update
• Members
• Roles
• Permissions

STORIES

• Create
• View
• Delete
• Privacy

CALLS

• Create
• Accept
• Reject
• Signaling
• End

MEDIA

• Upload authorization
• Processing
• Download authorization

ADMINISTRATION

• Users
• Reports
• Moderation
• Audit

Define:

• Versioning
• Validation
• Pagination
• Error format
• Rate limiting
• Idempotency
• Authentication
• Authorization

Do not generate application code.

────────────────────────────────────────

API CONTRACT STANDARDS

Define standardized conventions for:

• Request IDs
• Correlation IDs
• Error codes
• Validation errors
• Authentication errors
• Authorization errors
• Rate-limit errors
• Pagination
• Cursor pagination
• Sorting
• Filtering
• Versioning
• Idempotency

Define a consistent API error structure.

Prefer cursor pagination for high-volume resources.

────────────────────────────────────────

DATA CONSISTENCY

Explicitly define consistency requirements for:

• User accounts
• Device registration
• Conversations
• Messages
• Message delivery
• Message reads
• Group membership
• Presence
• Stories
• Calls
• Notifications
• Search
• Analytics

Identify where to use:

• Strong consistency
• Eventual consistency
• Idempotency
• Optimistic concurrency
• Distributed locks
• Transactional outbox

Do not use distributed transactions unless absolutely necessary.

────────────────────────────────────────

SCALABILITY

Design for:

• Hundreds of millions of users
• Billions of messages
• Tens of millions of concurrent WebSocket connections
• Large numbers of concurrent calls
• Large media traffic
• Global multi-region deployment

Analyze scaling for:

• API Gateway
• Authentication
• WebSocket gateways
• Messaging
• PostgreSQL
• Redis
• Kafka
• Search
• Media processing
• Object storage
• CDN
• WebRTC infrastructure

Identify:

• Likely bottlenecks
• Scaling limits
• Horizontal scaling strategies
• Caching strategies
• Partitioning strategies
• Backpressure strategies
• Capacity considerations

────────────────────────────────────────

MULTI-REGION FOUNDATIONS

Design the initial multi-region architecture.

Define:

• Regional application clusters
• Global traffic routing
• Regional data ownership
• Cross-region event replication
• Failover
• Disaster recovery boundaries

Classify data as:

• Region-local
• Globally replicated
• Eventually consistent

Avoid unnecessary cross-region synchronous calls.

Define the principles that Volume 2 will use for the complete multi-region architecture.

────────────────────────────────────────

FAILURE SCENARIOS

Define initial graceful behavior when:

• PostgreSQL is unavailable
• Redis is unavailable
• Kafka is unavailable
• Search is unavailable
• Push provider is unavailable
• Object storage is unavailable
• WebSocket gateway fails
• Authentication service fails
• Messaging service fails

For every failure define:

• Detection
• Fallback
• Retry
• Timeout
• Circuit breaking where appropriate
• Degraded functionality
• Recovery

Do not allow temporary infrastructure failures to corrupt message state.

────────────────────────────────────────

SECURITY FOUNDATIONS

Design security architecture covering:

AUTHENTICATION

• Credential security
• Password hashing
• MFA
• Passkeys
• Session security
• Refresh tokens
• Device authentication

AUTHORIZATION

• RBAC
• Resource ownership
• Group permissions
• Administrative permissions

APPLICATION SECURITY

• Input validation
• Rate limiting
• Abuse prevention
• Secure headers
• CORS
• CSRF where applicable
• XSS prevention
• SQL injection protection

INFRASTRUCTURE SECURITY

• IAM
• Least privilege
• Network segmentation
• Secrets management
• Encryption at rest
• Encryption in transit
• Kubernetes security

MESSAGING SECURITY

• E2EE boundaries
• Device verification
• Key management
• Message confidentiality
• Replay protection

────────────────────────────────────────

ABUSE PREVENTION FOUNDATIONS

Design initial defenses against:

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

Define architectural boundaries for:

• Rate limiting
• Reputation
• Blocking
• Reporting
• Automated detection
• Manual moderation

Volume 2 will expand the complete abuse-prevention and moderation architecture.

────────────────────────────────────────

OBSERVABILITY FOUNDATIONS

Design:

• Structured logs
• Metrics
• Distributed traces
• Correlation IDs
• Request tracing
• WebSocket connection metrics
• Message latency metrics
• Delivery metrics
• Database metrics
• Queue metrics
• Security metrics

Use:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Define initial observability requirements for:

• API Gateway
• Authentication
• Messaging
• WebSockets
• Database
• Redis
• Kafka
• Workers

────────────────────────────────────────

TESTING ARCHITECTURE FOUNDATIONS

Define the overall testing strategy.

Unit Testing:

• Domain logic
• Services
• Utilities

Integration Testing:

• PostgreSQL
• Redis
• Kafka
• WebSockets
• External providers

Contract Testing:

• REST APIs
• WebSocket contracts
• Event schemas

End-to-End Testing:

• Registration
• Login
• Messaging
• Groups
• Multi-device synchronization

Performance Testing:

• API load
• WebSocket connections
• Message throughput
• Group messaging
• Presence

Resilience Testing:

• Database failures
• Redis failures
• Kafka failures
• WebSocket failures

Security Testing:

• Authentication
• Authorization
• Rate limiting
• Abuse prevention
• Dependency scanning

Volume 2 will complete the broader enterprise testing strategy.

────────────────────────────────────────

ARCHITECTURAL DECISION RECORDS

Define ADRs for the major decisions established in Volume 1.

At minimum include:

• Service decomposition
• Monorepo architecture
• PostgreSQL architecture
• Prisma strategy
• Redis architecture
• Kafka/Redpanda
• BullMQ
• WebSocket architecture
• WebRTC architecture
• Object storage
• CDN
• E2EE architecture
• Multi-device synchronization
• Offline synchronization
• Search architecture
• Multi-region architecture
• Kubernetes
• Terraform
• Observability
• Secrets management

Each ADR must contain:

• Context
• Decision
• Alternatives considered
• Consequences

Do not generate implementation code.

────────────────────────────────────────

PROJECT INDEX

Create a complete Project Index for the project.

The Project Index must contain:

• Project overview
• Technology stack
• Architecture status
• Domain list
• Service list
• Service ownership
• Database ownership
• Core entities
• ERD status
• API contracts
• WebSocket contracts
• Event catalog
• Queue catalog
• Redis usage
• Security boundaries
• E2EE boundaries
• Multi-device architecture
• Multi-region principles
• Observability architecture
• Testing architecture
• ADRs
• Dependencies
• Remaining architecture work
• Implementation phases

Clearly identify which architecture areas belong to Volume 2.

────────────────────────────────────────

ARCHITECTURE VOLUME 1 OUTPUT

Produce the following sections:

1. Executive Architecture Overview
2. System Context
3. High-Level System Architecture
4. Architectural Approach
5. Domain Decomposition
6. Service Decomposition
7. Service Ownership Matrix
8. Communication Matrix
9. Monorepo Architecture
10. Detailed Folder Hierarchy
11. Core Domain Model
12. Aggregate Boundaries
13. Database Architecture
14. Database Ownership
15. Complete Text-Based ERD
16. PostgreSQL Strategy
17. Prisma Strategy
18. Redis Architecture
19. Real-Time/WebSocket Architecture
20. Messaging Architecture
21. Message Identifier and Idempotency Strategy
22. Group Messaging Architecture
23. Community Architecture
24. Message Delivery Architecture
25. Offline Messaging Architecture
26. Presence Architecture
27. Contact Architecture
28. Account and Profile Architecture
29. Authentication Architecture
30. Authorization Architecture
31. End-to-End Encryption Foundations
32. Event-Driven Architecture
33. Initial Event Catalog
34. BullMQ Queue Architecture
35. API Architecture
36. API Contract Standards
37. Data Consistency Strategy
38. Scalability Foundations
39. Multi-Region Foundations
40. Failure Scenario Analysis
41. Security Foundations
42. Abuse Prevention Foundations
43. Observability Foundations
44. Testing Architecture Foundations
45. Architectural Decision Records
46. Complete Project Index

────────────────────────────────────────

QUALITY REQUIREMENTS

Every architectural decision must evaluate:

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
• Clear domain boundaries
• Event-driven communication where appropriate
• Idempotent consumers
• Transactional outbox
• Horizontal scaling
• Stateless application services
• Established security protocols
• Cursor-based synchronization
• Clear failure boundaries
• Least-privilege access

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
• Global synchronous dependencies
• Premature complexity
• Architecture that cannot support multi-device operation

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

Provide detailed specifications, architecture decisions, diagrams, contracts, schemas, ownership rules, consistency rules, and implementation guidance.

Do not make major architectural decisions implicit.

When multiple valid approaches exist, evaluate the alternatives and explicitly select one.

The resulting Volume 1 architecture must provide a strong foundation for the remaining architecture and implementation phases.

────────────────────────────────────────

VOLUME 1 SCOPE BOUNDARY

This volume establishes the core platform architecture.

The remaining architecture should address areas such as:

• Complete multi-device architecture
• Desktop and Smart-device architecture
• Complete media processing architecture
• Stories/status architecture
• Complete voice/video call architecture
• Call scalability
• Complete E2EE architecture
• Advanced search architecture
• Notification architecture
• Advanced contact discovery
• Complete abuse prevention
• Moderation architecture
• Business account architecture
• Complete security architecture
• Threat model
• Complete observability architecture
• Deployment architecture
• Kubernetes topology
• Multi-region deployment
• Disaster recovery
• Capacity planning
• Advanced scalability analysis
• Complete failure analysis
• Complete data consistency strategy
• Enterprise testing strategy
• Final ADRs
• Final Project Index
• Backend implementation roadm

Using the requirements below, produce the complete enterprise architecture blueprint for an original, production-ready real-time communication and messaging platform.

You are operating in Senior Engineering Team Mode.

Design the complete production-ready architecture for an enterprise-scale real-time messaging and communication platform comparable in architectural scope to WhatsApp.

This is an ARCHITECTURE PHASE — VOLUME 1.

This prompt is completely independent.

Do not assume that another conversation, prompt, or Claude chat contains information that is not explicitly included in this prompt.

Do not implement backend code.
Do not implement frontend code.
Do not implement mobile code.
Do not generate infrastructure implementation files.

The purpose of this prompt is to establish the foundational architecture that future backend, frontend, mobile, infrastructure, DevOps, and QA implementation prompts will follow.

The architecture must be original and must not copy proprietary implementation details from WhatsApp.

────────────────────────────────────────

PROJECT

Build a production-ready global real-time communication platform supporting:

• Hundreds of millions of registered users
• Tens of millions of daily active users
• Large-scale one-to-one messaging
• Group messaging
• Communities
• Voice calls
• Video calls
• Group calls
• Media sharing
• Voice messages
• Documents
• Stories/status updates
• Push notifications
• Multi-device synchronization
• Offline messaging
• Message delivery guarantees
• End-to-end encryption architecture
• Contact management
• Blocking and reporting
• Business accounts
• Administrative tools
• Moderation
• Analytics
• High availability
• Multi-region deployment
• Horizontal scaling
• Disaster recovery

Design the system for global operation, low latency, high availability, strong security, privacy, and long-term scalability.

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Web:

• Next.js
• React
• TypeScript
• Tailwind CSS

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

Real-Time Communication:

• WebSockets
• Socket.IO where appropriate

Event Streaming:

• Kafka or Redpanda

Background Jobs:

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
• STUN/TURN infrastructure

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

CORE PLATFORM DOMAINS

Define bounded contexts and ownership for:

Identity

Accounts

Users

Profiles

Authentication

Authorization

Sessions

Devices

Contacts

Presence

Messaging

Conversations

Groups

Communities

Messages

Message Delivery

Message Reactions

Message Editing

Message Deletion

Media

Voice Messages

Documents

Stories

Notifications

Search

Calls

Voice Calls

Video Calls

Group Calls

Call Signaling

End-to-End Encryption

Key Management

Offline Synchronization

Multi-Device Synchronization

Blocking

Reporting

Moderation

Business Accounts

Administration

Analytics

Audit

Feature Flags

System Configuration

────────────────────────────────────────

ARCHITECTURAL APPROACH

Determine the appropriate architecture between:

• Modular Monolith
• Service-Oriented Architecture
• Microservices

Do not blindly create a microservice for every domain.

Evaluate:

• Transactional consistency
• Operational complexity
• Scalability
• Latency
• Ownership
• Deployment independence
• Failure isolation
• Developer productivity
• Cost

Clearly identify:

• Independently deployable services
• Shared transactional boundaries
• Authoritative data ownership
• Synchronous communication
• Asynchronous communication
• Event-driven communication
• Read models
• CQRS requirements
• Eventual consistency boundaries
• Strong consistency requirements

────────────────────────────────────────

SYSTEM ARCHITECTURE

Design the complete high-level architecture.

CLIENT LAYER

• Web application
• iOS application
• Android application
• Desktop architecture boundaries
• Future tablet support
• Future embedded/device integrations

EDGE LAYER

• DNS
• CDN
• WAF
• Load balancers
• API Gateway
• WebSocket Gateway
• Rate limiting
• Authentication boundaries

APPLICATION LAYER

• API services
• Real-time services
• Messaging services
• Call signaling
• Background workers
• Event consumers
• Scheduled jobs

DATA LAYER

• PostgreSQL
• Read replicas
• Redis
• Kafka/Redpanda
• Elasticsearch/OpenSearch
• Object storage

COMMUNICATION LAYER

• WebSockets
• WebRTC
• Push notifications
• Event streaming

OBSERVABILITY LAYER

• Metrics
• Logs
• Traces
• Alerts

SECURITY LAYER

• Authentication
• Authorization
• Encryption
• Key management
• Secrets
• Audit logging
• Network segmentation

Represent the architecture using clear text-based diagrams.

Do not use images.

────────────────────────────────────────

SERVICE DECOMPOSITION

Evaluate and define appropriate service boundaries for:

API Gateway

Authentication Service

Identity Service

Account Service

Profile Service

Session Service

Device Service

Contact Service

Presence Service

Conversation Service

Messaging Service

Message Delivery Service

Message Sync Service

Group Service

Community Service

Media Service

Media Processing Service

Notification Service

Search Service

Story Service

Call Signaling Service

Call Session Service

Voice/Video Infrastructure

Encryption/Key Management boundaries

Moderation Service

Reporting Service

Business Account Service

Administration Service

Analytics Service

Audit Service

Feature Flag Service

Configuration Service

Do not create unnecessary services.

For every service define:

• Responsibility
• Owned data
• APIs
• Events produced
• Events consumed
• Synchronous dependencies
• Asynchronous dependencies
• Scaling requirements
• Availability requirements

────────────────────────────────────────

SERVICE OWNERSHIP

Create a complete service ownership matrix.

Clearly identify:

• Service
• Domain
• Authoritative data
• Database ownership
• Read models
• Events produced
• Events consumed
• External dependencies
• Synchronous dependencies
• Asynchronous dependencies
• Scaling characteristics
• Failure isolation requirements

No service may directly modify another service's authoritative database.

────────────────────────────────────────

COMMUNICATION ARCHITECTURE

Define when the platform should use:

• REST APIs
• Internal HTTP APIs
• WebSockets
• Kafka/Redpanda events
• BullMQ jobs
• WebRTC signaling

Define:

• Synchronous communication rules
• Asynchronous communication rules
• Timeout policies
• Retry policies
• Circuit breaker boundaries
• Idempotency
• Eventual consistency
• Ordering requirements

Avoid unnecessary synchronous cross-service dependencies.

────────────────────────────────────────

MONOREPO ARCHITECTURE

Design a production-ready monorepo containing:

Applications:

• Web
• Mobile
• Desktop where appropriate
• Admin Dashboard

Backend:

• API Gateway
• Backend services
• Real-time services
• WebSocket services
• Call signaling services
• Background workers

Shared packages:

• API contracts
• Event contracts
• Shared types
• Validation
• Configuration
• Authentication utilities
• Observability
• Encryption interfaces
• Testing utilities
• UI components where appropriate

Infrastructure:

• Docker
• Kubernetes
• Helm
• Terraform
• CI/CD

Documentation:

• Architecture
• APIs
• Events
• Database
• Security
• Operations
• ADRs
• Runbooks

Do not create uncontrolled shared packages.

Shared packages must have explicit ownership and dependency rules.

────────────────────────────────────────

FOLDER HIERARCHY

Generate a detailed production-ready folder hierarchy.

Include:

• Monorepo root
• Applications
• Backend services
• Workers
• Shared packages
• Infrastructure
• Tests
• Documentation
• Database migrations
• Configuration

Include important files and directories.

Do not generate implementation code.

The hierarchy must be consistent with the architecture and future implementation prompts.

────────────────────────────────────────

CORE DOMAIN MODEL

Design the major entities and aggregates.

Evaluate:

User

Account

Profile

Session

Device

Contact

ContactRequest where appropriate

Conversation

ConversationParticipant

Message

MessageAttachment

MessageReaction

MessageReceipt

MessageEdit

MessageDeletion

MessageMention

Group

GroupMember

GroupRole

Community

CommunityMember

Channel where appropriate

MediaAsset

VoiceMessage

Document

Story

StoryViewer

Notification

Call

CallParticipant

CallSession

CallDevice

EncryptionIdentity

DeviceKey

PreKey

SessionKey

BlockedUser

Report

BusinessAccount

BusinessProfile

AuditLog

FeatureFlag

Do not force every conceptual entity into a separate database table.

Use proper aggregates and ownership boundaries.

────────────────────────────────────────

DATABASE ARCHITECTURE

Design PostgreSQL for:

• Hundreds of millions of users
• Billions of messages
• Large numbers of conversations
• Large group membership
• High-volume message receipts
• High-volume presence information
• Large media metadata volume
• Large audit datasets

Define:

• Database ownership
• Schema boundaries
• Primary keys
• Foreign keys
• Indexes
• Unique constraints
• Check constraints
• Partitioning
• Archival
• Retention
• Replication
• Read replicas
• Connection pooling
• Backup strategy

Identify high-growth tables.

Evaluate partitioning for:

• Messages
• Message receipts
• Audit logs
• Analytics events
• Call events

Do not store high-volume ephemeral presence information as the primary source of truth in PostgreSQL.

────────────────────────────────────────

ERD

Generate a complete text-based ERD.

Include:

• Primary keys
• Foreign keys
• Cardinality
• Ownership
• Important indexes
• High-growth tables
• Partitioning candidates

Clearly show relationships between:

• Users
• Devices
• Contacts
• Conversations
• Participants
• Messages
• Attachments
• Groups
• Communities
• Stories
• Calls
• Encryption metadata
• Reports
• Business accounts

────────────────────────────────────────

PRISMA ARCHITECTURE

Define Prisma strategy including:

• Schema ownership
• Service-specific Prisma clients where appropriate
• Migration ownership
• Transaction boundaries
• Read replica strategy
• Connection pooling
• Query optimization
• Indexing rules

Avoid an uncontrolled shared Prisma schema where every service can modify every domain.

────────────────────────────────────────

REDIS ARCHITECTURE

Design Redis usage for:

• Presence
• Session state
• WebSocket coordination
• Rate limiting
• Typing indicators
• Online/offline state
• Distributed locks
• Temporary synchronization state
• Notification deduplication
• Cache
• Queue infrastructure

For each use case define:

• Key pattern
• TTL
• Invalidation
• Consistency requirements
• Failure behavior

Redis must never become the authoritative source for critical persistent data.

────────────────────────────────────────

REAL-TIME ARCHITECTURE

Design the WebSocket architecture.

Support:

• Connection establishment
• Authentication
• Connection lifecycle
• Reconnection
• Heartbeats
• Presence
• Typing indicators
• Message delivery
• Read receipts
• Message reactions
• Group updates
• Call signaling
• Multi-device synchronization

Define:

• WebSocket gateway architecture
• Connection routing
• Horizontal scaling
• Redis coordination
• Connection affinity requirements
• Failure recovery
• Backpressure
• Rate limiting

────────────────────────────────────────

MESSAGING ARCHITECTURE

Design one-to-one messaging.

Support:

• Text messages
• Replies
• Forwarding
• Mentions
• Reactions
• Editing
• Deletion
• Attachments
• Voice messages
• Documents
• Delivery states
• Read states
• Message ordering

Define:

• Message IDs
• Client-generated IDs
• Server-generated IDs
• Idempotency
• Ordering guarantees
• Deduplication
• Retry behavior
• Offline delivery
• Multi-device synchronization

Clearly define the message lifecycle from client submission through persistence, delivery, acknowledgment, and synchronization.

────────────────────────────────────────

GROUP MESSAGING

Design scalable group messaging.

Support:

• Group creation
• Group membership
• Admin roles
• Invitations
• Permissions
• Group metadata
• Group avatar
• Group settings
• Member removal
• Message delivery

Define scalability strategy for large groups.

Explain:

• Membership storage
• Permission evaluation
• Message fan-out
• Delivery strategy
• Read receipts
• Presence behavior
• Large-group limitations

────────────────────────────────────────

COMMUNITIES

Design support for communities containing multiple groups or channels.

Define:

• Community ownership
• Membership
• Roles
• Group relationships
• Permissions
• Moderation
• Notifications
• Discovery

Avoid coupling community functionality directly to basic one-to-one conversations.

────────────────────────────────────────

MESSAGE DELIVERY

Define message delivery states:

• Pending
• Sent
• Delivered
• Read
• Failed

Design:

• Delivery receipts
• Read receipts
• Retry
• Offline delivery
• Multi-device delivery
• Duplicate prevention
• Ordering guarantees

Define exactly-once versus at-least-once behavior where appropriate.

Do not claim exactly-once delivery unless technically justified.

────────────────────────────────────────

OFFLINE SYNCHRONIZATION

Design synchronization architecture supporting unreliable networks.

Support:

• Offline message composition
• Local message queue
• Synchronization
• Conflict resolution
• Retry
• Duplicate prevention
• Incremental synchronization
• Delta synchronization
• Message history synchronization
• Device synchronization

Define:

• Synchronization cursors
• Sequence identifiers
• Recovery behavior
• Resync behavior
• Missing-message detection

────────────────────────────────────────

MULTI-DEVICE ARCHITECTURE

Support:

• Multiple mobile devices
• Web sessions
• Desktop sessions
• Device registration
• Device verification
• Device revocation
• Remote logout
• Session synchronization

Define how messages and encryption keys synchronize across devices.

Do not assume a single-device architecture.

────────────────────────────────────────

PRESENCE ARCHITECTURE

Design:

• Online status
• Last seen
• Typing indicators
• Recording indicators
• Presence subscriptions

Presence must be optimized for extremely high scale.

Define:

• Redis usage
• TTL
• Heartbeats
• Fan-out strategy
• Regional architecture
• Failure behavior

────────────────────────────────────────

MEDIA ARCHITECTURE

Design media handling for:

• Images
• Videos
• Audio
• Voice messages
• Documents
• Stickers
• GIFs
• Thumbnails

Define:

• Upload authorization
• Direct S3 uploads
• Object naming
• Metadata
• Virus scanning boundaries
• Processing
• Compression
• Thumbnail generation
• CDN delivery
• Signed URLs
• Expiration
• Cleanup

Application servers must not proxy large media files unnecessarily.

────────────────────────────────────────

STORIES / STATUS ARCHITECTURE

Design temporary status content.

Support:

• Text status
• Image status
• Video status
• Privacy controls
• Viewers
• Expiration
• Reactions where appropriate

Define:

• Storage
• Expiration
• Visibility
• Viewer tracking
• Cleanup
• CDN strategy

────────────────────────────────────────

VOICE AND VIDEO CALL ARCHITECTURE

Design:

• One-to-one voice calls
• One-to-one video calls
• Group calls
• Call invitations
• Call acceptance
• Call rejection
• Call termination
• Network changes
• Reconnection

Use WebRTC where appropriate.

Define:

• Signaling
• STUN
• TURN
• ICE
• Session management
• Media routing
• NAT traversal
• Quality adaptation
• Call state

Do not route real-time media through normal application servers unless explicitly justified.

────────────────────────────────────────

CALL SCALABILITY

Define architecture for:

• Large numbers of concurrent calls
• Regional call routing
• TURN scaling
• Media server scaling where required
• Call failover
• Network degradation
• Connection recovery

Identify which components require horizontal scaling.

────────────────────────────────────────

END-TO-END ENCRYPTION ARCHITECTURE

Design an E2EE architecture appropriate for a modern secure messaging platform.

Define boundaries for:

• Identity keys
• Device keys
• Pre-keys
• Session establishment
• Message encryption
• Group encryption
• Key rotation
• Device addition
• Device removal
• Key verification

Clearly distinguish:

• Server-side encryption
• Transport encryption
• End-to-end encryption

Do not implement cryptographic algorithms in this architecture phase.

Do not invent proprietary cryptography.

Use established cryptographic protocols and audited libraries in future implementation.

────────────────────────────────────────

SEARCH ARCHITECTURE

Design search for:

• Contacts
• Users
• Conversations
• Groups
• Communities
• Messages where permitted by the encryption/privacy architecture

Define:

• Search index ownership
• Indexing strategy
• Privacy boundaries
• Ranking
• Autocomplete
• Typo tolerance
• Regionalization
• Reindexing

Explicitly account for the fact that end-to-end encrypted message content cannot simply be indexed server-side as plaintext.

────────────────────────────────────────

NOTIFICATION ARCHITECTURE

Design:

• Push notifications
• In-app notifications
• Email where appropriate

Support:

• New messages
• Missed calls
• Group activity
• Security events
• Account events

Define:

• FCM
• APNS
• Notification preferences
• Deduplication
• Retry
• Provider failures
• Rate limiting
• Notification privacy

────────────────────────────────────────

CONTACT ARCHITECTURE

Design:

• Contact discovery
• Contact synchronization
• Contact permissions
• Invitations
• Blocking
• Privacy controls

Define privacy-preserving boundaries for contact discovery.

Do not expose unnecessary user information.

────────────────────────────────────────

SECURITY ARCHITECTURE

Design complete security architecture covering:

Authentication:

• Password authentication where supported
• OAuth
• Passkeys
• MFA
• Session management
• Refresh tokens
• Device authentication

Authorization:

• RBAC
• Resource ownership
• Group permissions
• Administrative permissions

Application Security:

• Input validation
• Rate limiting
• Abuse prevention
• Secure headers
• CORS
• CSRF where applicable
• XSS prevention
• SQL injection protection

Infrastructure Security:

• IAM
• Least privilege
• Network segmentation
• Secrets management
• Encryption
• Kubernetes security

Messaging Security:

• E2EE boundaries
• Device verification
• Key management
• Message confidentiality
• Replay protection

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

Define:

• Detection
• Rate limiting
• Reputation
• Reporting
• Blocking
• Automated enforcement
• Manual moderation

────────────────────────────────────────

MODERATION

Design moderation architecture for:

• User reports
• Group reports
• Account abuse
• Business abuse
• Malicious media
• Spam
• Policy violations

Define what can and cannot be inspected given E2EE.

Support:

• Reports
• Evidence boundaries
• Appeals
• Administrative actions
• Audit trails

────────────────────────────────────────

BUSINESS ACCOUNTS

Design architecture supporting:

• Business profiles
• Business verification
• Business messaging
• Business hours
• Business catalogs
• Automated responses
• Business users
• Business permissions

Keep business functionality modular and independently extensible.

────────────────────────────────────────

EVENT-DRIVEN ARCHITECTURE

Use Kafka or Redpanda for durable asynchronous events.

Define:

• Topic naming
• Producers
• Consumers
• Consumer groups
• Partition keys
• Ordering
• Retention
• Replay
• Schema versioning
• Idempotency
• Dead-letter handling
• Observability

Define an initial event catalog including:

AccountCreated

AccountVerified

UserLoggedIn

DeviceRegistered

DeviceRevoked

ContactAdded

ConversationCreated

ConversationParticipantAdded

MessageCreated

MessageSent

MessageDelivered

MessageRead

MessageEdited

MessageDeleted

MessageReactionAdded

GroupCreated

GroupMemberAdded

GroupMemberRemoved

CommunityCreated

MediaUploaded

MediaProcessed

StoryCreated

StoryExpired

CallCreated

CallStarted

CallEnded

NotificationCreated

NotificationDelivered

UserBlocked

UserReported

BusinessAccountCreated

ModerationActionTaken

AuditLogCreated

FeatureFlagChanged

Events must contain only the data required by consumers and must not unnecessarily duplicate entire database records.

────────────────────────────────────────

QUEUE ARCHITECTURE

Use BullMQ for asynchronous workloads where Kafka is unnecessary.

Define queues for:

• Media processing
• Image processing
• Video processing
• Thumbnail generation
• Push notifications
• Email delivery
• Message cleanup
• Story expiration
• Temporary media cleanup
• Search indexing
• Analytics aggregation
• Notification cleanup
• Data retention
• Report processing

For each queue define:

• Producer
• Consumer
• Retry strategy
• Backoff
• Idempotency
• Dead-letter behavior
• Monitoring

────────────────────────────────────────

API ARCHITECTURE

Define:

• Public APIs
• Internal APIs
• WebSocket APIs
• WebRTC signaling APIs

Support:

Authentication:

• Registration
• Login
• Logout
• Session management
• Device management

Contacts:

• Contact discovery
• Contact management
• Blocking

Conversations:

• Conversation creation
• Conversation listing
• Participant management

Messages:

• Send
• Edit
• Delete
• React
• Reply
• Forward
• Read receipts

Groups:

• Create
• Update
• Members
• Roles
• Permissions

Stories:

• Create
• View
• Delete
• Privacy

Calls:

• Create
• Accept
• Reject
• Signaling
• End

Media:

• Upload authorization
• Processing
• Download authorization

Administration:

• Users
• Reports
• Moderation
• Audit

Define:

• Versioning
• Validation
• Pagination
• Error format
• Rate limiting
• Idempotency
• Authentication
• Authorization

Do not generate application code.

────────────────────────────────────────

DATA CONSISTENCY

Explicitly define consistency requirements for:

• User accounts
• Device registration
• Conversations
• Messages
• Message delivery
• Message reads
• Group membership
• Presence
• Stories
• Calls
• Notifications
• Search
• Analytics

Identify where to use:

• Strong consistency
• Eventual consistency
• Idempotency
• Optimistic concurrency
• Distributed locks
• Transactional outbox

────────────────────────────────────────

SCALABILITY

Design for:

• Hundreds of millions of users
• Billions of messages
• Tens of millions of concurrent WebSocket connections
• Large numbers of concurrent calls
• Large media traffic
• Global multi-region deployment

Analyze scaling for:

• API Gateway
• Authentication
• WebSocket gateways
• Messaging
• PostgreSQL
• Redis
• Kafka
• Search
• Media processing
• Object storage
• CDN
• WebRTC infrastructure

Identify likely bottlenecks and mitigation strategies.

────────────────────────────────────────

MULTI-REGION ARCHITECTURE

Design:

• Regional application clusters
• Global traffic routing
• Regional data ownership
• Cross-region event replication
• Failover
• Disaster recovery

Define which data can be:

• Region-local
• Globally replicated
• Eventually consistent

Avoid unnecessary cross-region synchronous calls.

────────────────────────────────────────

FAILURE SCENARIOS

Define graceful behavior when:

• PostgreSQL is unavailable
• Redis is unavailable
• Kafka is unavailable
• Search is unavailable
• Push provider is unavailable
• Object storage is unavailable
• WebSocket gateway fails
• TURN infrastructure fails
• Region becomes unavailable

For every failure define:

• Detection
• Fallback
• Retry
• Degraded functionality
• Recovery

────────────────────────────────────────

OBSERVABILITY

Design:

• Structured logs
• Metrics
• Distributed traces
• Correlation IDs
• Connection metrics
• Message latency metrics
• Delivery metrics
• Call quality metrics
• Media processing metrics
• Queue metrics
• Database metrics
• Security metrics

Use:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Define critical dashboards and alerts.

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
• Regional failover
• Infrastructure recovery

Include recovery procedures for:

• Database failure
• Region failure
• Messaging infrastructure failure
• Object storage failure
• Real-time infrastructure failure

────────────────────────────────────────

TESTING ARCHITECTURE

Define:

Unit Testing:

• Domain logic
• Services
• Utilities

Integration Testing:

• PostgreSQL
• Redis
• Kafka
• WebSockets
• External providers

Contract Testing:

• REST APIs
• WebSocket contracts
• Event schemas

End-to-End Testing:

• Registration
• Login
• Messaging
• Groups
• Media
• Calls
• Notifications
• Multi-device synchronization

Performance Testing:

• API load
• WebSocket connections
• Message throughput
• Group messaging
• Presence
• Call signaling
• Media processing

Resilience Testing:

• Database failures
• Redis failures
• Kafka failures
• WebSocket failures
• Regional failures

Security Testing:

• Authentication
• Authorization
• Encryption boundaries
• Rate limiting
• Abuse prevention
• Dependency scanning

────────────────────────────────────────

ARCHITECTURAL DECISION RECORDS

Define ADRs for major decisions including:

• Service decomposition
• Monorepo architecture
• PostgreSQL architecture
• Prisma strategy
• Redis architecture
• Kafka/Redpanda
• BullMQ
• WebSocket architecture
• WebRTC architecture
• Object storage
• CDN
• E2EE architecture
• Multi-device synchronization
• Offline synchronization
• Search architecture
• Multi-region architecture
• Kubernetes
• Terraform
• Observability
• Secrets management

Each ADR must contain:

• Context
• Decision
• Alternatives considered
• Consequences

────────────────────────────────────────

PROJECT INDEX

Create a complete Project Index containing:

• Architecture decisions
• Services
• Domains
• Data ownership
• Database objects
• API contracts
• WebSocket contracts
• Events
• Queues
• Shared packages
• Security boundaries
• Infrastructure decisions
• Testing strategy
• Implementation dependencies
• Remaining work

────────────────────────────────────────

ARCHITECTURE VOLUME 1 DELIVERABLE

Produce:

1. Executive Architecture Overview
2. System Context
3. System Architecture
4. Architectural Approach
5. Service Decomposition
6. Service Ownership Matrix
7. Communication Matrix
8. Monorepo Structure
9. Folder Hierarchy
10. Core Domain Model
11. Database Architecture
12. Complete ERD
13. Prisma Architecture
14. Redis Architecture
15. Real-Time Architecture
16. Messaging Architecture
17. Group Messaging Architecture
18. Community Architecture
19. Message Delivery Architecture
20. Offline Synchronization Architecture
21. Multi-Device Architecture
22. Presence Architecture
23. Media Architecture
24. Stories/Status Architecture
25. Voice and Video Call Architecture
26. Call Scalability Architecture
27. End-to-End Encryption Architecture
28. Search Architecture
29. Notification Architecture
30. Contact Architecture
31. Security Architecture
32. Abuse Prevention Architecture
33. Moderation Architecture
34. Business Account Architecture
35. Event-Driven Architecture
36. Queue Architecture
37. API Architecture
38. Data Consistency Strategy
39. Scalability Strategy
40. Multi-Region Architecture
41. Failure Scenario Architecture
42. Observability Architecture
43. Disaster Recovery Architecture
44. Testing Architecture
45. Architectural Decision Records
46. Complete Project Index

────────────────────────────────────────

QUALITY REQUIREMENTS

Every architectural decision must evaluate:

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
• Clear domain boundaries
• Event-driven communication where appropriate
• Idempotent consumers
• Transactional outbox
• Horizontal scaling
• Stateless application services
• Established security protocols

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

Provide detailed:

• Specifications
• Architecture decisions
• Text-based diagrams
• Domain boundaries
• Service boundaries
• Data models
• ERD
• API contracts
• Event contracts
• Queue contracts
• Ownership rules
• Consistency rules
• Security boundaries
• Implementation guidance

The resulting architecture must be sufficiently detailed that separate backend, frontend, mobile, infrastructure, DevOps, and QA teams can implement the system without making major architectural decisions themselves.

────────────────────────────────────────

VOLUME 1 SCOPE

This prompt establishes the foundational architecture.

Do not attempt to produce implementation code.

Do not generate Architecture Volume 2 content unless required to explain a dependency of the Volume 1 architecture.

Complete the Architecture Volume 1 deliverables and Project Inde

You are operating in Senior Engineering Team Mode.

You are simultaneously acting as:

- Principal Software Architect
- Staff Backend Engineer
- Staff Frontend Engineer
- Staff Mobile Engineer
- DevOps Engineer
- Cloud Architect
- Database Architect
- Security Engineer
- QA Engineer
- UI/UX Designer
- Technical Writer

Your task is to design the architecture for a production-ready, enterprise-scale global real-time messaging and communication platform comparable in architectural scope to modern messaging platforms such as WhatsApp.

The platform must be an original implementation.

Do not copy proprietary implementation details, source code, internal architecture, or undocumented behavior from WhatsApp or any other proprietary platform.

This prompt defines:

ARCHITECTURE PHASE — VOLUME 1

This is an architecture-only task.

Do not generate backend implementation code.

Do not generate frontend implementation code.

Do not generate mobile implementation code.

Do not generate infrastructure implementation files.

Do not generate Dockerfiles.

Do not generate Kubernetes manifests.

Do not generate Terraform files.

Do not generate CI/CD implementation files.

The purpose of this volume is to establish the core architecture, domain model, service boundaries, data architecture, communication architecture, and project structure that future implementation prompts will follow.

────────────────────────────────────────

PROJECT OBJECTIVE

Design a production-ready global real-time communication platform capable of supporting:

• Hundreds of millions of registered users
• Tens of millions of daily active users
• Large-scale one-to-one messaging
• Group messaging
• Communities
• Real-time communication
• Voice calls
• Video calls
• Group calls
• Media sharing
• Voice messages
• Documents
• Stories/status updates
• Push notifications
• Multi-device synchronization
• Offline messaging
• Message delivery guarantees
• End-to-end encryption architecture
• Contact management
• Blocking
• Reporting
• Business accounts
• Administrative tools
• Moderation
• Analytics
• High availability
• Multi-region deployment
• Horizontal scaling
• Disaster recovery

Design the platform for:

• Global deployment
• Low latency
• High availability
• Fault tolerance
• Horizontal scalability
• Strong security
• Privacy
• Long-term maintainability
• Future extensibility

Do not design a toy application.

Design an enterprise platform capable of evolving for many years.

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Web:

• Next.js
• React
• TypeScript
• Tailwind CSS

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

Real-Time Communication:

• WebSockets
• Socket.IO where appropriate

Event Streaming:

• Kafka or Redpanda

Background Jobs:

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
• STUN/TURN infrastructure

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

ARCHITECTURAL APPROACH

Determine the appropriate architecture between:

• Modular Monolith
• Service-Oriented Architecture
• Microservices
• Hybrid architecture

Do not blindly create a microservice for every domain.

Evaluate:

• Transactional consistency
• Operational complexity
• Scalability
• Latency
• Deployment independence
• Team ownership
• Failure isolation
• Developer productivity
• Cost

Clearly identify:

• Independently deployable services
• Shared transactional boundaries
• Authoritative data ownership
• Synchronous communication
• Asynchronous communication
• Event-driven communication
• Read models
• CQRS requirements
• Eventual consistency boundaries
• Strong consistency requirements

Explain why each major architectural decision is appropriate.

────────────────────────────────────────

CORE PLATFORM DOMAINS

Define bounded contexts and ownership for:

Identity

Accounts

Users

Profiles

Authentication

Authorization

Sessions

Devices

Contacts

Presence

Messaging

Conversations

Groups

Communities

Messages

Message Delivery

Message Reactions

Message Editing

Message Deletion

Media

Voice Messages

Documents

Stories

Notifications

Search

Calls

Voice Calls

Video Calls

Group Calls

Call Signaling

End-to-End Encryption

Key Management

Offline Synchronization

Multi-Device Synchronization

Blocking

Reporting

Moderation

Business Accounts

Administration

Analytics

Audit

Feature Flags

System Configuration

────────────────────────────────────────

SYSTEM ARCHITECTURE

Design the complete high-level system architecture.

CLIENT LAYER

Define boundaries for:

• Web application
• iOS application
• Android application
• Desktop applications
• Tablet applications
• Future embedded/device integrations

EDGE LAYER

Define:

• DNS
• CDN
• WAF
• Load balancers
• API Gateway
• WebSocket Gateway
• Rate limiting
• Authentication boundaries

APPLICATION LAYER

Define:

• API services
• Domain services
• Real-time services
• Messaging services
• Call signaling
• Background workers
• Event consumers
• Scheduled jobs

DATA LAYER

Define:

• PostgreSQL
• Read replicas
• Redis
• Kafka/Redpanda
• Elasticsearch/OpenSearch
• Object storage

COMMUNICATION LAYER

Define:

• REST APIs where appropriate
• WebSockets
• WebRTC
• Push notifications
• Event streaming

OBSERVABILITY LAYER

Define:

• Metrics
• Logs
• Traces
• Alerts

SECURITY LAYER

Define:

• Authentication
• Authorization
• Encryption
• Key management
• Secrets management
• Audit logging
• Network segmentation

Represent the architecture using clear text-based diagrams.

Do not use images.

────────────────────────────────────────

SERVICE DECOMPOSITION

Evaluate and define appropriate boundaries for:

API Gateway

Authentication Service

Identity Service

Account Service

Profile Service

Session Service

Device Service

Contact Service

Presence Service

Conversation Service

Messaging Service

Message Delivery Service

Message Synchronization Service

Group Service

Community Service

Media Service

Media Processing Service

Notification Service

Search Service

Story Service

Call Signaling Service

Call Session Service

Voice/Video Infrastructure

Encryption and Key Management boundaries

Moderation Service

Reporting Service

Business Account Service

Administration Service

Analytics Service

Audit Service

Feature Flag Service

Configuration Service

Do not automatically create one microservice per item.

Combine services where strong transactional consistency and cohesive ownership justify doing so.

For every final service boundary define:

• Responsibility
• Authoritative data
• Owned database objects
• Public APIs
• Internal APIs
• Events produced
• Events consumed
• Synchronous dependencies
• Asynchronous dependencies
• Scaling requirements
• Availability requirements
• Security boundaries

────────────────────────────────────────

SERVICE OWNERSHIP MATRIX

Create a complete service ownership matrix.

For every domain identify:

• Owning service
• Database ownership
• API ownership
• Event ownership
• Cache ownership
• Search/read-model ownership
• Administrative ownership

Explicitly prohibit uncontrolled cross-service database writes.

────────────────────────────────────────

COMMUNICATION MATRIX

Create a communication matrix defining:

• Service A
• Service B
• Communication mechanism
• Synchronous or asynchronous
• Reason
• Consistency requirement
• Failure behavior

Evaluate:

• REST
• Internal HTTP
• WebSockets
• Kafka/Redpanda
• Redis
• BullMQ

Do not use asynchronous messaging where synchronous consistency is required.

Do not use synchronous calls where asynchronous processing is more appropriate.

────────────────────────────────────────

MONOREPO ARCHITECTURE

Design a production-ready monorepo.

Applications:

• Web
• Mobile
• Desktop where appropriate
• Administration dashboard

Backend:

• API Gateway
• Backend services
• Real-time services
• WebSocket services
• Call signaling services
• Background workers

Shared packages:

• API contracts
• Event contracts
• Shared types
• Validation
• Configuration
• Authentication interfaces
• Observability
• Encryption interfaces
• Testing utilities
• UI components where appropriate

Infrastructure:

• Docker
• Kubernetes
• Helm
• Terraform
• CI/CD

Documentation:

• Architecture
• APIs
• Events
• Database
• Security
• Operations
• ADRs
• Runbooks

Do not create uncontrolled shared packages.

Every shared package must have a clear purpose and ownership rule.

────────────────────────────────────────

FOLDER HIERARCHY

Generate a detailed production-ready folder hierarchy.

Include:

• Monorepo root
• Applications
• Backend services
• Workers
• Shared packages
• Infrastructure
• Tests
• Documentation
• Database migrations
• Configuration

Show important directories and files that future implementation prompts will need.

Do not generate implementation code.

The folder structure must be consistent with the service boundaries defined in this architecture.

────────────────────────────────────────

CORE DOMAIN MODEL

Design the major domain entities and aggregates.

Evaluate:

User

Account

Profile

Session

Device

Contact

ContactRequest

Conversation

ConversationParticipant

Message

MessageAttachment

MessageReaction

MessageReceipt

MessageEdit

MessageDeletion

MessageMention

Group

GroupMember

GroupRole

Community

CommunityMember

Channel

MediaAsset

VoiceMessage

Document

Story

StoryViewer

Notification

Call

CallParticipant

CallSession

CallDevice

EncryptionIdentity

DeviceKey

PreKey

SessionKey

BlockedUser

Report

BusinessAccount

BusinessProfile

AuditLog

FeatureFlag

Do not force every conceptual entity into a separate database table.

Use:

• Aggregates
• Value objects
• Relational entities
• Domain events
• Ownership boundaries

where appropriate.

Clearly identify aggregate roots.

────────────────────────────────────────

DATABASE ARCHITECTURE

Design PostgreSQL for:

• Hundreds of millions of users
• Billions of messages
• Large numbers of conversations
• Large group membership
• High-volume message receipts
• Large media metadata volume
• Large audit datasets

Define:

• Database ownership
• Schema boundaries
• Primary keys
• Foreign keys
• Unique constraints
• Check constraints
• Indexing
• Partitioning
• Replication
• Read replicas
• Connection pooling
• Archival
• Retention
• Backup strategy

Identify high-growth tables.

Evaluate partitioning candidates for:

• Messages
• Message receipts
• Audit logs
• Analytics events
• Call events

Do not store high-volume ephemeral presence information as the primary source of truth in PostgreSQL.

────────────────────────────────────────

ERD

Generate a complete text-based ERD.

Include:

• Primary keys
• Foreign keys
• Cardinality
• Ownership
• Important indexes
• High-growth tables
• Partitioning candidates

Clearly represent relationships between:

• Users
• Accounts
• Devices
• Contacts
• Conversations
• Participants
• Messages
• Attachments
• Groups
• Communities
• Stories
• Calls
• Encryption metadata
• Reports
• Business accounts

Explain important relationships after the ERD.

────────────────────────────────────────

PRISMA ARCHITECTURE

Define how Prisma will be used.

Specify:

• Schema ownership
• Service-specific Prisma clients where appropriate
• Migration ownership
• Transaction boundaries
• Read replica strategy
• Connection pooling
• Query optimization
• Indexing rules

Avoid a single uncontrolled Prisma schema where every service can modify every domain.

Define how future implementation teams will safely perform migrations.

────────────────────────────────────────

REDIS ARCHITECTURE

Design Redis usage for:

• Presence
• Session state
• WebSocket coordination
• Rate limiting
• Typing indicators
• Online/offline state
• Distributed locks
• Temporary synchronization state
• Notification deduplication
• Application caching
• Queue infrastructure

For every Redis use case define:

• Key pattern
• TTL
• Invalidation
• Consistency requirements
• Failure behavior

Redis must never become the authoritative source for critical persistent data.

────────────────────────────────────────

REAL-TIME ARCHITECTURE

Design the WebSocket architecture.

Support:

• Connection establishment
• Authentication
• Connection lifecycle
• Reconnection
• Heartbeats
• Presence
• Typing indicators
• Message delivery
• Read receipts
• Message reactions
• Group updates
• Call signaling
• Multi-device synchronization

Define:

• WebSocket Gateway architecture
• Connection routing
• Horizontal scaling
• Redis coordination
• Connection affinity requirements
• Failure recovery
• Backpressure
• Rate limiting

Explain how millions of concurrent connections can be supported.

────────────────────────────────────────

MESSAGING ARCHITECTURE

Design the architecture for one-to-one messaging.

Support:

• Text messages
• Replies
• Forwarding
• Mentions
• Reactions
• Editing
• Deletion
• Attachments
• Voice messages
• Documents
• Delivery states
• Read states
• Message ordering

Define:

• Message identifiers
• Client-generated IDs
• Server-generated IDs
• Idempotency
• Deduplication
• Ordering guarantees
• Retry behavior
• Offline delivery
• Multi-device synchronization

Clearly define whether operations use:

• At-most-once
• At-least-once
• Exactly-once semantics

Do not claim exactly-once delivery unless technically justified.

────────────────────────────────────────

GROUP MESSAGING ARCHITECTURE

Design scalable group messaging.

Support:

• Group creation
• Group membership
• Invitations
• Admin roles
• Permissions
• Group metadata
• Group avatar
• Group settings
• Member removal
• Message delivery

Define architecture for:

• Small groups
• Large groups
• Very large groups

Explain fan-out strategy and delivery implications.

────────────────────────────────────────

COMMUNITIES ARCHITECTURE

Design communities containing multiple groups or channels.

Define:

• Community ownership
• Membership
• Roles
• Group relationships
• Permissions
• Moderation
• Notifications
• Discovery

Avoid coupling community functionality directly to basic one-to-one conversations.

────────────────────────────────────────

MESSAGE DELIVERY ARCHITECTURE

Define message states:

• Pending
• Sent
• Delivered
• Read
• Failed

Design:

• Delivery receipts
• Read receipts
• Retry
• Offline delivery
• Multi-device delivery
• Duplicate prevention
• Ordering

Explain how delivery state is persisted and synchronized across devices.

────────────────────────────────────────

OFFLINE SYNCHRONIZATION

Design synchronization for unreliable networks.

Support:

• Offline message composition
• Local message queue
• Synchronization
• Retry
• Duplicate prevention
• Incremental synchronization
• Delta synchronization
• Message history synchronization
• Device synchronization

Define:

• Synchronization cursors
• Checkpoints
• Recovery
• Conflict handling
• Idempotency

────────────────────────────────────────

MULTI-DEVICE ARCHITECTURE

Design support for:

• Multiple mobile devices
• Web sessions
• Desktop sessions
• Device registration
• Device verification
• Device revocation
• Remote logout
• Session synchronization

Define how:

• Messages
• Conversations
• Delivery state
• Read state
• Encryption metadata
• Device state

are synchronized between devices.

Do not assume a single-device architecture.

────────────────────────────────────────

PRESENCE ARCHITECTURE

Design:

• Online status
• Last seen
• Typing indicators
• Recording indicators
• Presence subscriptions

Presence must support extremely high scale.

Define:

• Redis architecture
• TTL
• Heartbeats
• Fan-out
• Regional behavior
• Failure behavior

Presence must remain an ephemeral capability rather than the authoritative source of user state.

────────────────────────────────────────

MEDIA ARCHITECTURE

Design media handling for:

• Images
• Videos
• Audio
• Voice messages
• Documents
• Stickers
• GIFs
• Thumbnails

Define:

• Upload authorization
• Direct S3 uploads
• Object naming
• Metadata
• Malware scanning boundaries
• Processing
• Compression
• Thumbnail generation
• CDN delivery
• Signed URLs
• Expiration
• Cleanup

Application servers must not unnecessarily proxy large media files.

────────────────────────────────────────

STORIES / STATUS ARCHITECTURE

Design temporary status content.

Support:

• Text status
• Image status
• Video status
• Privacy controls
• Viewers
• Expiration
• Reactions where appropriate

Define:

• Storage
• Expiration
• Visibility
• Viewer tracking
• Cleanup
• CDN strategy

────────────────────────────────────────

VOICE AND VIDEO CALL ARCHITECTURE

Design architecture for:

• One-to-one voice calls
• One-to-one video calls
• Group calls
• Call invitations
• Call acceptance
• Call rejection
• Call termination
• Network changes
• Reconnection

Use WebRTC where appropriate.

Define:

• Signaling
• STUN
• TURN
• ICE
• Session management
• NAT traversal
• Media routing
• Quality adaptation
• Call state

Do not route real-time media through ordinary application servers unless explicitly justified.

────────────────────────────────────────

END-TO-END ENCRYPTION ARCHITECTURE

Design an E2EE architecture appropriate for a modern secure messaging platform.

Define boundaries for:

• Identity keys
• Device keys
• Pre-keys
• Session establishment
• Message encryption
• Group encryption
• Key rotation
• Device addition
• Device removal
• Key verification

Clearly distinguish:

• Transport encryption
• Server-side encryption
• End-to-end encryption

Do not implement cryptographic algorithms in this architecture.

Do not invent proprietary cryptography.

Future implementation must use established cryptographic protocols and audited cryptographic libraries.

────────────────────────────────────────

SECURITY ARCHITECTURE

Define the high-level security architecture for:

Authentication

• Password authentication where supported
• OAuth
• Passkeys
• MFA
• Session management
• Refresh tokens
• Device authentication

Authorization

• RBAC
• Resource ownership
• Group permissions
• Administrative permissions

Application security

• Input validation
• Rate limiting
• Abuse prevention
• Secure headers
• CORS
• CSRF where applicable
• XSS prevention
• SQL injection protection

Infrastructure security

• IAM
• Least privilege
• Network segmentation
• Secrets management
• Encryption
• Kubernetes security

Messaging security

• E2EE boundaries
• Device verification
• Key management
• Replay protection
• Message confidentiality

────────────────────────────────────────

EVENT-DRIVEN ARCHITECTURE

Design Kafka or Redpanda as the durable event backbone.

Define:

• Topic naming
• Producers
• Consumers
• Consumer groups
• Partition keys
• Ordering
• Retention
• Replay
• Schema versioning
• Idempotency
• Dead-letter handling
• Observability

Define an initial event catalog including:

AccountCreated

AccountVerified

UserLoggedIn

DeviceRegistered

DeviceRevoked

ContactAdded

ConversationCreated

ConversationParticipantAdded

MessageCreated

MessageSent

MessageDelivered

MessageRead

MessageEdited

MessageDeleted

MessageReactionAdded

GroupCreated

GroupMemberAdded

GroupMemberRemoved

CommunityCreated

MediaUploaded

MediaProcessed

StoryCreated

StoryExpired

CallCreated

CallStarted

CallEnded

NotificationCreated

NotificationDelivered

UserBlocked

UserReported

BusinessAccountCreated

ModerationActionTaken

AuditLogCreated

FeatureFlagChanged

Events must contain only the data required by consumers.

Do not duplicate complete database records inside events without architectural justification.

────────────────────────────────────────

QUEUE ARCHITECTURE

Use BullMQ for asynchronous jobs where Kafka is unnecessary.

Define queues for:

• Media processing
• Image processing
• Video processing
• Thumbnail generation
• Push notifications
• Email delivery
• Message cleanup
• Story expiration
• Temporary media cleanup
• Search indexing
• Analytics aggregation
• Notification cleanup
• Data retention
• Report processing

For every queue define:

• Producer
• Consumer
• Retry strategy
• Backoff
• Idempotency
• Dead-letter behavior
• Monitoring

────────────────────────────────────────

API ARCHITECTURE

Define the public and internal API architecture.

Support:

Authentication

• Registration
• Login
• Logout
• Session management
• Device management

Contacts

• Contact discovery
• Contact management
• Blocking

Conversations

• Conversation creation
• Conversation listing
• Participant management

Messages

• Send
• Edit
• Delete
• React
• Reply
• Forward
• Read receipts

Groups

• Create
• Update
• Members
• Roles
• Permissions

Stories

• Create
• View
• Delete
• Privacy

Calls

• Create
• Accept
• Reject
• Signaling
• End

Media

• Upload authorization
• Processing
• Download authorization

Administration

• Users
• Reports
• Moderation
• Audit

Define:

• API versioning
• Request validation
• Response conventions
• Pagination
• Error format
• Rate limiting
• Idempotency
• Authentication
• Authorization

Do not generate application code.

────────────────────────────────────────

DATA CONSISTENCY

Define consistency requirements for:

• User accounts
• Device registration
• Conversations
• Messages
• Message delivery
• Message reads
• Group membership
• Presence
• Stories
• Calls
• Notifications
• Search
• Analytics

Identify where to use:

• Strong consistency
• Eventual consistency
• Idempotency
• Optimistic concurrency
• Distributed locks
• Transactional outbox

Explain why each consistency model is appropriate.

────────────────────────────────────────

SCALABILITY

Design for:

• Hundreds of millions of users
• Billions of messages
• Tens of millions of concurrent WebSocket connections
• Large numbers of concurrent calls
• Large media traffic
• Global multi-region deployment

Analyze scaling strategies for:

• API Gateway
• Authentication
• WebSocket gateways
• Messaging
• PostgreSQL
• Redis
• Kafka
• Search
• Media processing
• Object storage
• CDN
• WebRTC infrastructure

Identify:

• Likely bottlenecks
• Scaling limits
• Mitigation strategies

────────────────────────────────────────

MULTI-REGION ARCHITECTURE

Define:

• Regional application clusters
• Global traffic routing
• Regional data ownership
• Cross-region event replication
• Failover
• Disaster recovery

Classify data as:

• Region-local
• Globally replicated
• Eventually consistent

Avoid unnecessary cross-region synchronous calls.

────────────────────────────────────────

FAILURE SCENARIOS

Define graceful behavior when:

• PostgreSQL is unavailable
• Redis is unavailable
• Kafka is unavailable
• Search is unavailable
• Push providers are unavailable
• Object storage is unavailable
• WebSocket gateway fails
• TURN infrastructure fails
• A region becomes unavailable

For each failure define:

• Detection
• Fallback
• Retry
• Degraded functionality
• Recovery

────────────────────────────────────────

OBSERVABILITY ARCHITECTURE

Design:

• Structured logging
• Metrics
• Distributed tracing
• Correlation IDs
• Connection metrics
• Message latency metrics
• Delivery metrics
• Call quality metrics
• Media processing metrics
• Queue metrics
• Database metrics
• Security metrics

Use:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Define critical dashboards and alerts.

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
• Regional failover
• Infrastructure recovery

────────────────────────────────────────

TESTING ARCHITECTURE

Define the architecture for:

Unit Testing

• Domain logic
• Services
• Utilities

Integration Testing

• PostgreSQL
• Redis
• Kafka
• WebSockets
• External providers

Contract Testing

• REST APIs
• WebSocket contracts
• Event schemas

End-to-End Testing

• Registration
• Login
• Messaging
• Groups
• Media
• Calls
• Notifications
• Multi-device synchronization

Performance Testing

• API load
• WebSocket connections
• Message throughput
• Group messaging
• Presence
• Call signaling
• Media processing

Resilience Testing

• Database failures
• Redis failures
• Kafka failures
• WebSocket failures
• Regional failures

Security Testing

• Authentication
• Authorization
• Encryption boundaries
• Rate limiting
• Abuse prevention
• Dependency scanning

────────────────────────────────────────

ARCHITECTURAL DECISION RECORDS

Define ADRs for the major architectural decisions.

At minimum include:

• Service decomposition
• Monorepo architecture
• PostgreSQL architecture
• Prisma strategy
• Redis architecture
• Kafka/Redpanda
• BullMQ
• WebSocket architecture
• WebRTC architecture
• Object storage
• CDN
• E2EE architecture
• Multi-device synchronization
• Offline synchronization
• Search architecture
• Multi-region architecture
• Kubernetes
• Terraform
• Observability
• Secrets management

Each ADR must contain:

• Context
• Decision
• Alternatives considered
• Consequences

────────────────────────────────────────

PROJECT INDEX

Create a complete Project Index containing:

• Project architecture
• Domains
• Services
• Service ownership
• Database ownership
• Database objects
• API contracts
• WebSocket contracts
• Events
• Queues
• Shared packages
• Security boundaries
• Infrastructure decisions
• Testing strategy
• Implementation dependencies
• Remaining architecture work

The Project Index must be structured so that future backend, frontend, mobile, infrastructure, DevOps, and QA prompts can use it as a reference.

────────────────────────────────────────

ARCHITECTURE VOLUME 1 DELIVERABLES

Produce the following sections:

1. Executive Architecture Overview
2. System Context
3. System Architecture
4. Architectural Approach
5. Domain Decomposition
6. Service Decomposition
7. Service Ownership Matrix
8. Communication Matrix
9. Monorepo Architecture
10. Detailed Folder Hierarchy
11. Core Domain Model
12. Aggregate Boundaries
13. ERD
14. PostgreSQL Architecture
15. Prisma Architecture
16. Redis Architecture
17. Real-Time Architecture
18. Messaging Architecture
19. Group Messaging Architecture
20. Community Architecture
21. Message Delivery Architecture
22. Offline Synchronization Architecture
23. Multi-Device Architecture
24. Presence Architecture
25. Media Architecture
26. Stories/Status Architecture
27. Voice and Video Call Architecture
28. End-to-End Encryption Architecture
29. Security Architecture
30. Event-Driven Architecture
31. Event Catalog
32. Queue Architecture
33. API Architecture
34. Data Consistency Strategy
35. Scalability Strategy
36. Multi-Region Architecture
37. Failure Scenarios
38. Observability Architecture
39. Disaster Recovery Strategy
40. Testing Architecture
41. Architectural Decision Records
42. Complete Project Index

────────────────────────────────────────

QUALITY REQUIREMENTS

Every architectural decision must evaluate:

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
• Clear domain boundaries
• Stateless services
• Horizontal scaling
• Event-driven communication where appropriate
• Idempotent consumers
• Transactional outbox
• Established security protocols
• Failure isolation
• Observable systems

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
• Domain definitions
• Service boundaries
• Ownership rules
• Data models
• ERDs
• Communication contracts
• Event contracts
• Queue definitions
• Security boundaries
• Scalability strategies
• Failure strategies
• Architectural decisions
• Implementation guidance

The architecture must be detailed enough that separate engineering teams can implement the backend, frontend, mobile applications, infrastructure, DevOps, and QA systems without needing to make major architectural decisions themselves.

At the end, provide the complete Project Index and identify the architectural areas covered by this volum

This is an ARCHITECTURE PHASE.

Do NOT implement backend code.

Do NOT implement frontend code.

Do NOT implement mobile code.

Do NOT generate infrastructure files.

Do NOT generate placeholder implementations.

Do NOT generate source code.

Produce only architecture, specifications, contracts, diagrams, data models, engineering decisions, and implementation guidance.

The architecture must be sufficiently detailed that separate engineering teams can later implement the Backend, Frontend, Mobile, Infrastructure, DevOps, and QA phases without making major architectural decisions themselves.

────────────────────────────────────────

PROJECT

Build an original enterprise real-time communication platform comparable in architectural scope to modern global messaging platforms.

The platform must support:

- Hundreds of millions of users
- Billions of messages
- Millions of concurrent connections
- One-to-one conversations
- Group conversations
- Large groups
- Multi-device synchronization
- Real-time messaging
- Offline messaging
- Media sharing
- Voice messages
- Push notifications
- Presence
- Typing indicators
- Read receipts
- Delivery receipts
- Message reactions
- Message replies
- Message forwarding
- Message editing
- Message deletion
- Search
- Privacy controls
- Blocking
- Reporting
- Device management
- Account security
- End-to-end encryption-ready architecture
- Future voice calls
- Future video calls
- Future communities/channels

The platform must be:

- Cloud-native
- Horizontally scalable
- Highly available
- Fault tolerant
- Secure
- Observable
- Multi-region ready
- Production deployable
- Maintainable for long-term development

Do not clone proprietary source code, branding, assets, or internal architecture from existing products.

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Web:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

Mobile:

- React Native
- Expo
- TypeScript

Backend:

- Node.js
- NestJS
- TypeScript

Database:

- PostgreSQL
- Prisma ORM

Cache:

- Redis

Real-Time Communication:

- WebSockets
- Socket.IO

Event Streaming:

- Kafka or Redpanda

Background Jobs:

- BullMQ

Object Storage:

- AWS S3-compatible storage

CDN:

- CloudFront or equivalent

Notifications:

- Firebase Cloud Messaging
- Apple Push Notification Service
- Email provider abstraction

Infrastructure:

- Docker
- Kubernetes
- Helm
- Terraform
- GitHub Actions

Observability:

- OpenTelemetry
- Prometheus
- Grafana
- Loki

────────────────────────────────────────

ARCHITECTURE OBJECTIVES

Define architecture capable of supporting:

- Global users
- Multi-region deployment
- Horizontal scaling
- High availability
- Real-time communication
- Durable message persistence
- Offline synchronization
- Multi-device synchronization
- Large media uploads
- High-volume notifications
- Large WebSocket fleets
- High message throughput

The architecture must distinguish between:

- Durable data
- Ephemeral data
- Real-time communication
- Asynchronous events
- Background jobs
- Analytical workloads
- Search workloads
- Media storage

Do not use one technology as the solution for every workload.

────────────────────────────────────────

ARCHITECTURE STYLE

Evaluate and define whether the initial platform should use:

- Modular monolith
- Service-oriented architecture
- Microservices

Do not blindly create a microservice for every domain.

Define which domains should share transactional boundaries.

Define the migration strategy if the platform begins as a modular monolith and later requires independent services.

Clearly identify:

- Service ownership
- Database ownership
- API ownership
- Event ownership
- Synchronous communication
- Asynchronous communication
- Strong consistency requirements
- Eventual consistency requirements

────────────────────────────────────────

CORE DOMAINS

Define bounded contexts and ownership for:

Identity

Authentication

Authorization

Accounts

Profiles

Contacts

Devices

Sessions

Privacy

Presence

Conversations

Groups

Messages

Message Reactions

Message Replies

Message Forwarding

Message Search

Media

Media Processing

Notifications

Push Notifications

Synchronization

Delivery

Read Receipts

Typing Indicators

Blocking

Reporting

Moderation

Administration

Audit

Feature Flags

Analytics

Future Calling

Future Communities

For each domain define:

- Responsibilities
- Aggregates
- Entities
- Value objects
- Repositories
- Domain services
- Application services
- Domain events
- Ownership boundaries

────────────────────────────────────────

SYSTEM ARCHITECTURE

Generate a complete system architecture.

Client Layer:

- Web application
- iOS application
- Android application
- Future desktop applications
- Future tablet applications

Edge Layer:

- DNS
- CDN
- WAF
- Load balancers
- API Gateway
- WebSocket Gateway
- Rate limiting
- Authentication boundaries

Application Layer:

- API services
- Real-time services
- Domain services
- Background workers
- Event consumers
- Scheduled jobs

Data Layer:

- PostgreSQL
- Read replicas
- Redis
- Kafka/Redpanda
- Elasticsearch/OpenSearch where appropriate
- Object storage

Notification Layer:

- FCM
- APNS
- Email provider

Observability Layer:

- Metrics
- Logs
- Traces
- Alerting

Security Layer:

- IAM
- Secrets
- Encryption
- Network segmentation
- Audit logging

Provide clear text-based architecture diagrams.

Do not use images.

────────────────────────────────────────

C4 ARCHITECTURE

Generate:

1. System Context Diagram
2. Container Diagram
3. Component Diagram
4. Deployment Diagram

For each component define:

- Responsibility
- Inputs
- Outputs
- Dependencies
- Scaling strategy
- Failure behavior
- Security boundaries

────────────────────────────────────────

SERVICE DECOMPOSITION

Evaluate and define boundaries for:

API Gateway

Authentication Service

Identity Service

Authorization Service

Account Service

Profile Service

Session Service

Device Service

Contact Service

Privacy Service

Presence Service

Conversation Service

Group Service

Message Service

Message Delivery Service

Synchronization Service

Media Service

Media Processing Service

Notification Service

Search Service

Moderation Service

Administration Service

Audit Service

Analytics Service

Feature Flag Service

Future Calling Service

Do not automatically make every listed service independently deployable.

For every proposed service identify:

- Why it exists
- Data it owns
- APIs it exposes
- Events it publishes
- Events it consumes
- Synchronous dependencies
- Asynchronous dependencies
- Scaling requirements
- Consistency requirements

────────────────────────────────────────

SERVICE OWNERSHIP MATRIX

Generate a complete ownership matrix covering:

- Domain
- Authoritative data
- Database ownership
- API ownership
- Event ownership
- Cache ownership
- Search index ownership
- Background jobs
- Administrative ownership

Prevent multiple services from becoming authoritative owners of the same data.

────────────────────────────────────────

COMMUNICATION MATRIX

Define when to use:

REST

WebSockets

Kafka/Redpanda

BullMQ

Redis

S3

For every major interaction explain:

- Communication method
- Why it is appropriate
- Delivery guarantee
- Retry behavior
- Idempotency
- Ordering requirements
- Failure behavior

────────────────────────────────────────

MONOREPO ARCHITECTURE

Design a production-ready monorepo.

Applications:

- Web
- Mobile
- API
- Real-time gateway
- Admin dashboard

Services:

- Authentication
- Identity
- Accounts
- Profiles
- Conversations
- Messages
- Notifications
- Media
- Search
- etc., according to the approved service boundaries

Shared packages:

- API contracts
- Event contracts
- Validation
- Configuration
- Logging
- Observability
- Authentication utilities
- Shared types
- Testing utilities

Infrastructure:

- Docker
- Kubernetes
- Helm
- Terraform
- CI/CD

Documentation:

- Architecture
- APIs
- Events
- Database
- Security
- Operations
- ADRs
- Runbooks

Do not create shared packages merely for convenience.

Every shared package must have a clear responsibility.

────────────────────────────────────────

FOLDER HIERARCHY

Generate a detailed folder hierarchy for:

- Monorepo root
- Applications
- Backend services
- Workers
- Shared packages
- Database
- Tests
- Infrastructure
- Documentation
- Configuration
- CI/CD

Include important directories and representative files.

Do not generate source code.

The hierarchy must be directly usable by future implementation prompts.

────────────────────────────────────────

CORE DOMAIN MODEL

Design the core domain model.

Evaluate entities including:

User

Account

Profile

ProfileSettings

PrivacySettings

Session

Device

DeviceKey

Contact

ContactRequest

Block

Conversation

ConversationMember

ConversationSettings

Group

GroupMember

GroupRole

Message

MessageAttachment

MessageReaction

MessageReply

MessageForward

MessageMention

MessageEdit

MessageDeletion

MessageDelivery

MessageRead

MediaAsset

MediaProcessingJob

Notification

NotificationPreference

PushToken

SyncCursor

AuditLog

ModerationCase

Report

FeatureFlag

Do not create one database table for every conceptual entity unless justified.

Use aggregates and normalized structures appropriately.

────────────────────────────────────────

ERD

Generate a complete text-based ERD.

Include:

- Primary keys
- Foreign keys
- Cardinality
- Ownership
- Important indexes
- High-growth tables
- Partitioning candidates

Clearly represent relationships between:

- Users
- Accounts
- Profiles
- Devices
- Contacts
- Conversations
- Groups
- Messages
- Attachments
- Reactions
- Delivery states
- Read states
- Notifications
- Moderation
- Audit data

────────────────────────────────────────

POSTGRESQL ARCHITECTURE

Design PostgreSQL for:

- Hundreds of millions of users
- Billions of messages
- Large conversation histories
- High message creation rates
- High read rates
- Multi-region expansion

Define:

- Database ownership
- Schema boundaries
- Primary/replica architecture
- Connection pooling
- Read/write separation
- Indexing
- Partitioning
- Archival
- Retention
- Backup
- Point-in-time recovery

Identify high-growth tables requiring special treatment.

Evaluate partitioning strategies for:

- Messages
- Message delivery records
- Message read records
- Audit logs
- Analytics-related transactional data

Do not store large binary media directly inside PostgreSQL.

────────────────────────────────────────

PRISMA ARCHITECTURE

Define Prisma strategy including:

- Schema ownership
- Prisma schema organization
- Service-specific clients where appropriate
- Migration ownership
- Transaction boundaries
- Connection pooling
- Read replica strategy
- Query performance standards

Prevent uncontrolled cross-domain database access.

────────────────────────────────────────

REDIS ARCHITECTURE

Design Redis usage for:

- Sessions
- Presence
- Typing indicators
- Rate limiting
- WebSocket coordination
- API caching
- Conversation caching
- Temporary synchronization state
- Distributed locks
- Queue infrastructure

For each use case define:

- Key pattern
- TTL
- Invalidation
- Consistency
- Failure behavior

Redis must never become the authoritative source for critical durable message data.

────────────────────────────────────────

REAL-TIME ARCHITECTURE

Design the complete WebSocket architecture.

Support:

- Connection authentication
- Connection lifecycle
- Heartbeats
- Reconnection
- Presence
- Typing indicators
- Message delivery
- Read receipts
- Delivery receipts
- Group events
- Notification events

Define:

- WebSocket gateway responsibilities
- Horizontal scaling
- Redis adapter
- Connection routing
- Backpressure
- Rate limiting
- Connection recovery
- Failure handling

Explain how multiple WebSocket gateway instances coordinate without creating a single point of failure.

────────────────────────────────────────

MESSAGE ARCHITECTURE

Design durable messaging.

Support:

- Client-generated message IDs
- Server-generated IDs
- Message ordering
- Idempotency
- Message creation
- Message delivery
- Message acknowledgment
- Read receipts
- Message edits
- Message deletion
- Reactions
- Replies
- Forwarding
- Mentions
- Attachments

Define:

- Message lifecycle
- Message states
- Ordering guarantees
- Delivery guarantees
- Retry behavior
- Duplicate prevention
- Offline behavior

────────────────────────────────────────

OFFLINE SYNCHRONIZATION

Design the synchronization architecture.

Support:

- Offline message creation
- Pending messages
- Local queue
- Sync cursor
- Incremental synchronization
- Missed events
- Reconnection
- Conflict handling
- Acknowledgments
- Device synchronization
- Background synchronization

Define exactly how a device catches up after being offline.

Do not rely solely on WebSocket events for synchronization.

────────────────────────────────────────

MULTI-DEVICE ARCHITECTURE

Design support for multiple simultaneously registered devices.

Support:

- Device registration
- Device identification
- Device naming
- Device capabilities
- Device trust
- Session management
- Device revocation
- Remote logout
- Message synchronization
- Notification routing

Define how messages and events reach all authorized devices.

────────────────────────────────────────

PRESENCE ARCHITECTURE

Design scalable presence for:

- Online
- Offline
- Last seen
- Typing
- Recording
- Temporary activity states

Define:

- Storage
- TTL
- Heartbeat
- Presence propagation
- Failure behavior
- Privacy controls

Presence must remain ephemeral and scalable.

────────────────────────────────────────

MEDIA ARCHITECTURE

Design support for:

- Images
- Videos
- Audio
- Voice messages
- Documents
- Files

Define:

- Upload authorization
- Direct S3 uploads
- Signed URLs
- Metadata
- File validation
- Malware scanning boundary
- Image processing
- Video processing
- Thumbnail generation
- CDN delivery
- Lifecycle management
- Cleanup

Application servers should not unnecessarily proxy large media files.

────────────────────────────────────────

NOTIFICATION ARCHITECTURE

Design:

- Push notifications
- In-app notifications
- Email-ready architecture

Support:

- Notification preferences
- Device tokens
- Notification routing
- Deduplication
- Retry
- Rate limiting
- Provider failure
- Notification batching where appropriate

────────────────────────────────────────

SEARCH ARCHITECTURE

Design search for:

- Users
- Contacts
- Conversations
- Groups
- Messages
- Media metadata

Define whether Elasticsearch/OpenSearch is required initially or should be introduced as a separate scaling layer.

Support:

- Full-text search
- Autocomplete
- Filtering
- Ranking
- Pagination
- Privacy-aware indexing
- Reindexing
- Index versioning

Search results must never expose data the requesting user is not authorized to access.

────────────────────────────────────────

SECURITY ARCHITECTURE

Design:

- Authentication
- Authorization
- Session security
- Device security
- Rate limiting
- Abuse prevention
- Account takeover protection
- Secrets management
- Encryption
- Audit logging
- Secure communication
- OWASP protections

Define security boundaries between:

- Client
- API
- WebSocket
- Database
- Redis
- Object storage
- Event infrastructure
- Administration

────────────────────────────────────────

END-TO-END ENCRYPTION BOUNDARIES

Define an architecture that is compatible with future end-to-end encryption.

Cover:

- Identity keys
- Device keys
- Key registration
- Key rotation
- Key revocation
- Multi-device encryption
- Group encryption
- Encrypted message payloads
- Offline encrypted messages
- Backup considerations

Do not design proprietary cryptography.

Do not invent cryptographic protocols.

Clearly separate:

- Authentication
- Authorization
- Encryption
- Key management
- Message transport
- Message storage

────────────────────────────────────────

EVENT-DRIVEN ARCHITECTURE

Define Kafka/Redpanda architecture.

Include:

- Topic naming
- Partitioning
- Partition keys
- Consumer groups
- Event ownership
- Schema versioning
- Retention
- Replay
- Idempotency
- Ordering
- Dead-letter handling
- Observability

Define events such as:

Identity:

- UserRegistered
- UserVerified
- SessionCreated
- SessionRevoked
- DeviceRegistered
- DeviceRemoved

Conversations:

- ConversationCreated
- ConversationMemberAdded
- ConversationMemberRemoved
- GroupCreated
- GroupUpdated

Messages:

- MessageCreated
- MessageDelivered
- MessageRead
- MessageEdited
- MessageDeleted
- ReactionAdded
- ReactionRemoved

Media:

- MediaUploaded
- MediaProcessingStarted
- MediaProcessingCompleted
- MediaProcessingFailed

Notifications:

- NotificationCreated
- NotificationDelivered
- NotificationFailed

Security:

- UserBlocked
- UserReported
- SuspiciousLoginDetected

Do not duplicate complete database records inside events.

────────────────────────────────────────

QUEUE ARCHITECTURE

Define BullMQ queues for:

- Push notification delivery
- Email delivery
- Media processing
- Thumbnail generation
- Video processing
- Search indexing
- Notification cleanup
- Message retention
- Analytics aggregation
- Scheduled maintenance

For each queue define:

- Producer
- Consumer
- Retry policy
- Backoff
- Idempotency
- Dead-letter behavior
- Monitoring

────────────────────────────────────────

API ARCHITECTURE

Define public and internal API boundaries.

Cover:

Authentication

- Registration
- Login
- Logout
- Refresh
- Password reset
- Verification
- Device management

Users

- Profile
- Privacy
- Contacts
- Blocking

Conversations

- Create
- List
- Members
- Settings

Messages

- Send
- Edit
- Delete
- React
- Reply
- Forward
- History
- Search

Media

- Upload authorization
- Metadata
- Download authorization

Notifications

- Preferences
- Notification center

Administration

- Users
- Reports
- Moderation
- Audit logs

Define:

- Versioning
- Naming
- Authentication
- Authorization
- Validation
- Pagination
- Cursor pagination
- Filtering
- Sorting
- Error format
- Idempotency
- Rate limiting

Do not generate application code.

────────────────────────────────────────

AUTHENTICATION ARCHITECTURE

Support:

- Email/password
- Email verification
- Password reset
- OAuth-ready architecture
- MFA-ready architecture
- Passkey-ready architecture
- Session management
- Multi-device sessions
- Session revocation
- Token rotation
- Suspicious login detection

Define:

- Token/session strategy
- Refresh strategy
- Secure storage
- Expiration
- Revocation
- Device binding where appropriate

────────────────────────────────────────

AUTHORIZATION ARCHITECTURE

Define:

- RBAC
- Permissions
- Resource ownership
- Conversation permissions
- Group permissions
- Administrative permissions
- Moderation permissions

Identify where authorization must occur:

- API Gateway
- Domain services
- Database queries
- WebSocket gateway

Frontend authorization must never be the only enforcement layer.

────────────────────────────────────────

PRIVACY ARCHITECTURE

Design privacy controls for:

- Last seen
- Online status
- Profile photo
- About/status information
- Read receipts
- Group invitations
- Contact discovery
- Blocking
- Reporting
- Device visibility

Define privacy enforcement at backend and real-time layers.

────────────────────────────────────────

SCALABILITY STRATEGY

Design scaling strategies for:

- API servers
- WebSocket gateways
- PostgreSQL
- Redis
- Kafka
- BullMQ
- Search
- Object storage
- CDN
- Notification providers

Identify:

- Likely bottlenecks
- Scaling triggers
- Horizontal scaling strategies
- Caching strategies
- Partitioning strategies
- Regional strategies

────────────────────────────────────────

FAILURE STRATEGY

Define graceful behavior when:

- PostgreSQL is unavailable
- Redis is unavailable
- Kafka is unavailable
- Search is unavailable
- S3 is unavailable
- FCM is unavailable
- APNS is unavailable
- WebSocket infrastructure is degraded

For each failure define:

- Detection
- Fallback
- Retry
- Degraded functionality
- Recovery

────────────────────────────────────────

DATA CONSISTENCY

Define where the system requires:

- Strong consistency
- Eventual consistency
- Idempotency
- Optimistic concurrency
- Distributed locks
- Transactional outbox

Explicitly define consistency requirements for:

- Message persistence
- Message delivery
- Read receipts
- Conversation membership
- Device registration
- Presence
- Notifications
- Search indexing
- Analytics

────────────────────────────────────────

OBSERVABILITY

Design observability using:

- OpenTelemetry
- Prometheus
- Grafana
- Loki

Define:

- Structured logs
- Metrics
- Traces
- Correlation IDs
- Trace propagation
- Dashboards
- Alerts

Include observability requirements for:

- API
- WebSockets
- Message delivery
- Synchronization
- Database
- Redis
- Kafka
- BullMQ
- Media processing
- Notifications

────────────────────────────────────────

DEPLOYMENT ARCHITECTURE

Define deployment architecture for:

- Local
- Development
- Testing
- Staging
- Production

Include:

- Kubernetes
- Helm
- Container registry
- CI/CD
- Rolling deployments
- Canary or blue-green strategy
- Rollback
- Health checks
- Autoscaling
- Secrets management

────────────────────────────────────────

DISASTER RECOVERY

Define:

- RTO
- RPO
- Database backups
- Point-in-time recovery
- Object storage recovery
- Redis recovery
- Kafka recovery
- Search recovery
- Infrastructure recovery
- Multi-region strategy

Define recovery procedures for critical platform failures.

────────────────────────────────────────

TESTING ARCHITECTURE

Define:

Unit Testing

- Domain logic
- Services
- Utilities

Integration Testing

- PostgreSQL
- Redis
- Kafka
- S3
- Notification providers

Contract Testing

- REST APIs
- WebSocket contracts
- Event schemas

End-to-End Testing

- Registration
- Login
- Messaging
- Group messaging
- Offline synchronization
- Multi-device synchronization
- Media sharing
- Notifications

Performance Testing

- Message throughput
- WebSocket connections
- Message delivery latency
- Synchronization
- Search

Security Testing

- Authentication
- Authorization
- Rate limiting
- Input validation
- Dependency security

────────────────────────────────────────

ARCHITECTURAL DECISION RECORDS

Define ADRs for major decisions including:

- Architecture style
- Service boundaries
- PostgreSQL ownership
- Prisma strategy
- Redis strategy
- WebSocket architecture
- Kafka/Redpanda
- BullMQ
- Object storage
- CDN
- Search
- Multi-device synchronization
- Offline synchronization
- End-to-end encryption boundaries
- Kubernetes
- Terraform
- Observability

Each ADR must contain:

- Context
- Decision
- Alternatives
- Consequences

────────────────────────────────────────

PROJECT INDEX

Create the initial Project Index containing:

- Architecture status
- Applications
- Domains
- Services
- Service ownership
- Database ownership
- API boundaries
- WebSocket events
- Domain events
- Queues
- Redis usage
- Storage architecture
- Security architecture
- Observability architecture
- Deployment architecture
- Testing strategy
- ADRs
- Future implementation phases

────────────────────────────────────────

ARCHITECTURE DELIVERABLES

Produce:

1. Executive Architecture Overview
2. System Context
3. C4 Architecture
4. Service Decomposition
5. Service Ownership Matrix
6. Communication Matrix
7. Monorepo Architecture
8. Detailed Folder Hierarchy
9. Core Domain Model
10. Complete ERD
11. PostgreSQL Architecture
12. Prisma Strategy
13. Redis Architecture
14. Real-Time WebSocket Architecture
15. Messaging Architecture
16. Offline Synchronization Architecture
17. Multi-Device Architecture
18. Presence Architecture
19. Media Architecture
20. Notification Architecture
21. Search Architecture
22. Authentication Architecture
23. Authorization Architecture
24. Privacy Architecture
25. End-to-End Encryption Boundaries
26. Event-Driven Architecture
27. Event Catalog
28. BullMQ Queue Architecture
29. API Architecture
30. Scalability Strategy
31. Failure Strategy
32. Data Consistency Strategy
33. Observability Architecture
34. Deployment Architecture
35. Disaster Recovery Strategy
36. Testing Architecture
37. Architectural Decision Records
38. Initial Project Index

────────────────────────────────────────

QUALITY REQUIREMENTS

Every architectural decision must consider:

- Scalability
- Availability
- Security
- Performance
- Data consistency
- Latency
- Operational complexity
- Cost
- Developer productivity
- Maintainability
- Future extensibility

Avoid:

- Unnecessary microservices
- Shared database ownership
- Distributed transactions unless absolutely necessary
- Tight coupling
- Redis as a system of record
- WebSockets as the only message durability mechanism
- Frontend-only authorization
- Premature complexity
- Invented cryptography
- Contradictory technology decisions

The resulting architecture must be detailed enough for independent backend, frontend, mobile, infrastructure, DevOps, and QA teams to implement the platform without needing to redesign its core architecture.
