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
