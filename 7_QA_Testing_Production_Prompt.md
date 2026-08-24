You are operating in Senior Engineering Team Mode.

Build the complete production-grade QA, testing, security validation, performance validation, resilience validation, and production-readiness validation strategy for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The testing and quality strategy must validate the established backend, web frontend, mobile applications, infrastructure, real-time systems, messaging systems, media systems, notification systems, calling systems, and security architecture.

Do not redesign the application architecture.

Do not implement unrelated application features.

────────────────────────────────────────

MISSION

Create and implement the complete QA and production-readiness system covering:

• Unit testing
• Integration testing
• API testing
• Contract testing
• WebSocket testing
• Event testing
• Queue testing
• Database testing
• Redis testing
• Media testing
• Notification testing
• Call testing
• Mobile testing
• Web testing
• End-to-end testing
• Accessibility testing
• Security testing
• Performance testing
• Load testing
• Stress testing
• Soak testing
• Resilience testing
• Disaster-recovery testing
• Backup restoration testing
• Infrastructure testing
• CI/CD validation
• Production smoke testing
• Release validation
• Regression testing
• Observability validation
• Production-readiness review

The quality system must validate:

• Correctness
• Reliability
• Security
• Privacy
• Performance
• Scalability
• Availability
• Recoverability
• Accessibility
• Maintainability

────────────────────────────────────────

TECHNOLOGY STACK

Backend:

• Node.js
• NestJS
• TypeScript

Frontend:

• Next.js
• React
• TypeScript

Mobile:

• React Native
• Expo
• TypeScript

Database:

• PostgreSQL
• Prisma ORM

Cache:

• Redis

Event Streaming:

• Kafka or Redpanda

Background Processing:

• BullMQ

Search:

• Elasticsearch or OpenSearch

Object Storage:

• AWS S3-compatible object storage

Real-Time:

• WebSockets
• Socket.IO
• WebRTC

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

Testing:

• Jest
• Supertest
• React Testing Library
• Playwright
• Mobile testing tools appropriate for React Native
• Load-testing tools appropriate for high-scale distributed systems

────────────────────────────────────────

TESTING PRINCIPLES

Every critical feature must have multiple layers of validation.

Do not rely solely on end-to-end tests.

Use:

• Unit tests for deterministic domain logic
• Integration tests for infrastructure interactions
• Contract tests for service boundaries
• End-to-end tests for user journeys
• Performance tests for scale
• Security tests for attack resistance
• Resilience tests for failure behavior

Tests must be deterministic whenever possible.

Avoid:

• Flaky tests
• Arbitrary timeouts
• Shared mutable test state
• Production dependencies in ordinary test suites
• Tests that depend on execution order

────────────────────────────────────────

TEST PYRAMID

Define and implement the testing pyramid.

Unit tests should provide broad coverage for:

• Domain logic
• Validation
• Authorization
• State transitions
• Idempotency
• Synchronization logic
• Utility functions
• Feature-flag evaluation
• Privacy rules

Integration tests should validate:

• PostgreSQL
• Prisma
• Redis
• Kafka
• BullMQ
• Search
• S3
• Push providers
• WebSocket infrastructure
• WebRTC signaling

End-to-end tests should validate critical user workflows.

────────────────────────────────────────

BACKEND UNIT TESTING

Create tests for:

Identity:

• Registration
• Authentication
• Password handling
• Session logic
• Device logic
• Authorization
• Privacy

Messaging:

• Message validation
• Ordering
• Idempotency
• Delivery states
• Read states
• Reactions
• Replies
• Editing
• Deletion
• Synchronization

Groups:

• Membership
• Roles
• Permissions
• Group lifecycle

Presence:

• Online state
• Offline state
• TTL
• Privacy

Media:

• Validation
• Processing state
• Authorization

Calls:

• State transitions
• Signaling validation
• Permissions

Moderation:

• Reports
• Actions
• Permissions

Business:

• Business permissions
• Business roles

Feature flags:

• Evaluation
• Targeting
• Rollout logic

────────────────────────────────────────

BACKEND INTEGRATION TESTING

Validate real integrations with controlled test infrastructure.

Test:

• PostgreSQL
• Prisma migrations
• Transactions
• Foreign keys
• Unique constraints
• Index behavior
• Redis
• Kafka
• BullMQ
• Elasticsearch/OpenSearch
• S3-compatible storage
• WebSockets

Verify:

• Retry behavior
• Failure behavior
• Idempotency
• Transaction rollback
• Event publishing
• Consumer processing
• Dead-letter handling

────────────────────────────────────────

DATABASE TESTING

Validate:

• Migrations
• Schema compatibility
• Constraints
• Indexes
• Foreign keys
• Transactions
• Isolation
• Concurrent writes
• Optimistic concurrency
• Partition behavior
• Read replicas where applicable

Test high-volume tables such as:

• Messages
• Message receipts
• Audit logs
• Call events
• Analytics-related persistence

Validate query performance for critical access patterns.

────────────────────────────────────────

EVENT TESTING

Test every important Kafka/Redpanda event.

Validate:

• Event schema
• Version
• Required fields
• Producer ownership
• Consumer compatibility
• Serialization
• Deserialization
• Ordering
• Partition keys
• Idempotency
• Replay
• Retry
• Dead-letter behavior

Test backward-compatible event evolution.

Verify consumers tolerate duplicate delivery.

────────────────────────────────────────

QUEUE TESTING

Test every BullMQ queue.

Validate:

• Job creation
• Job payload
• Idempotency
• Retry
• Backoff
• Timeout
• Concurrency
• Failure
• Dead-letter behavior
• Recovery after worker restart

Test:

• Media jobs
• Notifications
• Search indexing
• Story expiration
• Analytics
• Report processing
• Cleanup jobs

────────────────────────────────────────

API CONTRACT TESTING

Test every public and internal API contract.

Validate:

• HTTP method
• Path
• Authentication
• Authorization
• Request schema
• Response schema
• Error schema
• Pagination
• Cursor pagination
• Filtering
• Sorting
• Idempotency

Use OpenAPI specifications as contract references.

Detect breaking changes automatically.

────────────────────────────────────────

WEBSOCKET CONTRACT TESTING

Validate:

• Connection authentication
• Authorization
• Connection lifecycle
• Heartbeats
• Reconnection
• Message events
• Delivery events
• Read receipts
• Presence
• Typing
• Group events
• Community events
• Notifications
• Call signaling

Test:

• Duplicate events
• Missed events
• Reconnection
• Out-of-order events
• Authentication expiry
• Rate limits
• Backpressure

────────────────────────────────────────

MESSAGING END-TO-END TESTING

Create complete workflows for:

• User registration
• Login
• Device registration
• Contact discovery
• Direct conversation creation
• Send message
• Receive message
• Delivery receipt
• Read receipt
• Reply
• Reaction
• Edit
• Delete
• Forward
• Offline message
• Reconnect
• Synchronization
• Multi-device delivery

Validate the same workflow on:

• Web
• Android
• iOS

where applicable.

────────────────────────────────────────

GROUP TESTING

Test:

• Group creation
• Member addition
• Member removal
• Roles
• Permissions
• Group settings
• Message delivery
• Large membership
• Admin changes
• Permission escalation attempts

Test concurrency where multiple administrators perform actions simultaneously.

────────────────────────────────────────

COMMUNITY TESTING

Test:

• Community creation
• Membership
• Group linking
• Channel behavior
• Permissions
• Administrative actions
• Notifications
• Moderation
• Discovery

Validate unauthorized access.

────────────────────────────────────────

OFFLINE SYNCHRONIZATION TESTING

Test:

• Offline message composition
• App restart while offline
• Network interruption
• Network restoration
• Duplicate submission
• Missed WebSocket events
• Cursor recovery
• Long disconnection
• Partial synchronization
• Conflict scenarios
• Multi-device synchronization

Verify eventual convergence with authoritative server state.

────────────────────────────────────────

MULTI-DEVICE TESTING

Test combinations of:

• Android + Web
• iOS + Web
• Android + Desktop where supported
• iOS + Desktop where supported
• Multiple mobile devices

Validate:

• Login
• Device registration
• Device revocation
• Message synchronization
• Read states
• Reactions
• Message edits
• Message deletions
• Push notifications
• Remote logout

────────────────────────────────────────

MEDIA TESTING

Test:

• Upload
• Large files
• Small files
• Invalid MIME types
• Malicious files
• Interrupted uploads
• Retry
• Processing failures
• Thumbnail failures
• Signed URL expiration
• Unauthorized downloads
• CDN delivery
• Cleanup

Test media types:

• Images
• Videos
• Audio
• Voice messages
• Documents
• Stickers
• GIFs

────────────────────────────────────────

STORIES TESTING

Test:

• Story creation
• Text
• Image
• Video
• Privacy
• Viewer tracking
• Expiration
• Deletion
• Notifications
• CDN access
• Unauthorized access

Verify expired stories cannot be returned by APIs.

────────────────────────────────────────

NOTIFICATION TESTING

Test:

• FCM
• APNS
• Token registration
• Token rotation
• Notification preferences
• Foreground notifications
• Background notifications
• Terminated-app notifications
• Deep links
• Deduplication
• Retry
• Provider failures

Test notification privacy.

Do not expose E2EE message content unnecessarily.

────────────────────────────────────────

CALL TESTING

Test:

• One-to-one voice call
• One-to-one video call
• Group calls
• Call invitation
• Accept
• Reject
• Busy
• End
• Reconnect
• Network change
• Device switch
• Microphone failure
• Camera failure
• TURN fallback
• Media-server failure

Test different network conditions:

• Good network
• High latency
• Packet loss
• Low bandwidth
• Network switching
• Temporary disconnect

────────────────────────────────────────

WEBRTC TESTING

Validate:

• Signaling
• SDP negotiation
• ICE
• STUN
• TURN
• Connection establishment
• Media tracks
• Reconnection
• ICE restart
• Call termination

Test NAT environments where feasible.

────────────────────────────────────────

SECURITY TESTING

Create a complete security testing program.

Test:

Authentication:

• Credential stuffing
• Brute force
• Password reset abuse
• Session theft
• Refresh-token replay
• Device takeover

Authorization:

• Privilege escalation
• Horizontal access
• Vertical access
• Group permission bypass
• Business permission bypass
• Admin permission bypass

Application:

• SQL injection
• XSS
• CSRF
• Request forgery
• Path traversal
• Malicious uploads
• API abuse

Real-time:

• WebSocket authentication bypass
• Subscription abuse
• Message spoofing
• Replay
• Flooding

Media:

• Unauthorized access
• Signed URL reuse
• Malicious files
• Content-type bypass

────────────────────────────────────────

E2EE SECURITY VALIDATION

Validate E2EE implementation boundaries without attempting to break established cryptographic protocols.

Test:

• Device registration
• Key distribution
• Device revocation
• Key rotation
• Session establishment
• Group membership changes
• Key verification

Verify:

• Plaintext is not unnecessarily transmitted to servers
• Secrets are not logged
• Keys are not exposed in inappropriate storage
• Unauthorized devices cannot access protected content

Do not implement custom cryptography as part of testing.

────────────────────────────────────────

ABUSE TESTING

Test:

• Spam
• Mass messaging
• Account creation abuse
• Contact discovery abuse
• Credential stuffing
• Bot behavior
• Malicious links
• Malicious media
• Harassment reporting
• Block bypass
• Rate-limit bypass

Validate:

• Rate limiting
• Reputation systems
• Automated controls
• Reporting
• Blocking
• Moderation
• Escalation

────────────────────────────────────────

PERFORMANCE TESTING

Create performance tests for:

• REST APIs
• Authentication
• Messaging
• WebSockets
• Synchronization
• Presence
• Search
• Media processing
• Notifications
• Call signaling

Measure:

• Latency
• Throughput
• CPU
• Memory
• Database load
• Redis load
• Kafka throughput
• Queue latency
• Error rate

Define performance budgets for critical flows.

────────────────────────────────────────

LOAD TESTING

Design load tests for:

• Login
• Conversation listing
• Message sending
• Message delivery
• Synchronization
• Presence
• WebSocket connections
• Search
• Media upload
• Notifications
• Call signaling

Test:

• Normal load
• Peak load
• Burst load
• Sustained load

Scale tests toward the architecture's target capacity.

────────────────────────────────────────

STRESS TESTING

Push systems beyond expected operating limits.

Identify:

• Failure thresholds
• Resource exhaustion
• Backpressure behavior
• Queue buildup
• Database saturation
• Redis saturation
• Kafka saturation
• WebSocket capacity
• Worker capacity

Verify the system fails gracefully rather than corrupting data.

────────────────────────────────────────

SOAK TESTING

Run long-duration tests.

Validate:

• Memory leaks
• Connection leaks
• Queue growth
• Database connection leaks
• WebSocket stability
• Worker stability
• Cache behavior
• Log growth
• Resource exhaustion

Test for hours or longer according to operational needs.

────────────────────────────────────────

RESILIENCE TESTING

Inject failures into:

• PostgreSQL
• Redis
• Kafka
• BullMQ workers
• Elasticsearch/OpenSearch
• S3
• Push providers
• WebSocket gateways
• TURN
• SFU/media servers
• Kubernetes nodes
• Availability zones
• Regions

Verify:

• Detection
• Retry
• Fallback
• Degraded operation
• Recovery
• Reconciliation

────────────────────────────────────────

CHAOS TESTING

Design controlled chaos experiments for:

• Pod termination
• Node termination
• Network latency
• Packet loss
• Service unavailability
• Database failover
• Redis failover
• Kafka broker loss
• Worker failure
• Region failure

Run chaos testing in controlled environments before production adoption.

────────────────────────────────────────

DISASTER RECOVERY TESTING

Validate:

• Database restoration
• Point-in-time recovery
• S3 recovery
• Kafka recovery
• Search recovery
• Kubernetes reconstruction
• Terraform reconstruction
• Regional failover

Measure actual:

• Recovery Time
• Recovery Point

Compare results with defined RTO/RPO objectives.

────────────────────────────────────────

BACKUP RESTORATION TESTING

Automate verification of:

• Database backups
• Object storage backups
• Infrastructure state
• Critical configuration

A backup is only considered reliable when restoration has been successfully validated.

────────────────────────────────────────

INFRASTRUCTURE TESTING

Test:

• Terraform
• Helm
• Kubernetes manifests
• Docker images
• IAM
• Security groups
• NetworkPolicies
• Secrets integration
• Autoscaling
• Health probes
• Load balancing

Validate infrastructure before production deployment.

────────────────────────────────────────

ACCESSIBILITY TESTING

Test web and mobile accessibility.

Validate:

• Keyboard navigation
• Screen readers
• VoiceOver
• TalkBack
• Dynamic text sizing
• Focus management
• Contrast
• Reduced motion
• Touch targets
• Forms
• Dialogs
• Navigation

Target WCAG 2.2 AA for the web.

────────────────────────────────────────

COMPATIBILITY TESTING

Validate supported environments.

WEB:

• Chromium-based browsers
• Firefox
• Safari

MOBILE:

• Supported Android versions
• Supported iOS versions
• Different screen sizes
• Different performance classes

NETWORK:

• Wi-Fi
• Cellular
• High latency
• Low bandwidth
• Intermittent connectivity

────────────────────────────────────────

REGRESSION TESTING

Create a regression suite covering all critical workflows.

Every release must validate:

• Authentication
• Messaging
• Groups
• Communities
• Synchronization
• Media
• Stories
• Notifications
• Calls
• Search
• Business accounts
• Moderation
• Administration
• Security

Prevent known defects from reappearing.

────────────────────────────────────────

CI/CD QUALITY GATES

Define mandatory release gates.

Pull requests should validate:

• Formatting
• Linting
• Type checking
• Unit tests
• Relevant integration tests
• Security scanning
• Dependency scanning
• Secret scanning

Release pipelines should validate:

• Build
• Integration tests
• Contract tests
• E2E smoke tests
• Container security
• Infrastructure validation
• Deployment health

Production deployments must require appropriate approvals and health verification.

────────────────────────────────────────

PRODUCTION SMOKE TESTS

Create post-deployment smoke tests for:

• Health
• Authentication
• API availability
• Messaging
• WebSocket connectivity
• Database connectivity
• Redis connectivity
• Kafka processing
• Queue processing
• Media authorization
• Search
• Notifications

Do not run destructive tests against production.

────────────────────────────────────────

OBSERVABILITY VALIDATION

Validate that monitoring itself works.

Test:

• Metrics collection
• Log collection
• Trace collection
• Alert firing
• Dashboard visibility
• Correlation IDs
• Trace propagation
• Error detection
• SLO calculations

Inject controlled failures and confirm alerts fire correctly.

────────────────────────────────────────

SLO / SLI VALIDATION

Define SLIs and SLOs for:

• API availability
• API latency
• Message submission
• Message delivery
• Synchronization
• WebSocket connectivity
• Call setup
• Media processing
• Search
• Notifications

Define:

• Measurement source
• Calculation
• Threshold
• Alerting
• Error budget

────────────────────────────────────────

SECURITY SCANNING

Automate:

• Dependency scanning
• Container scanning
• Secret scanning
• Static analysis
• Infrastructure scanning
• Terraform scanning
• Kubernetes security scanning

Define severity thresholds.

Critical vulnerabilities must block releases according to policy.

────────────────────────────────────────

PERFORMANCE BENCHMARKING

Create repeatable benchmarks for:

• API throughput
• Message throughput
• WebSocket connections
• Synchronization throughput
• Search latency
• Media processing throughput
• Notification throughput
• Call signaling

Track performance over time.

Detect regressions automatically.

────────────────────────────────────────

DATA QUALITY

Validate:

• Referential integrity
• Duplicate prevention
• Event consistency
• Synchronization convergence
• Search index consistency
• Analytics consistency
• Audit integrity

Create reconciliation tools or jobs where appropriate.

────────────────────────────────────────

PRODUCTION READINESS CHECKLIST

Create a complete readiness checklist covering:

Application:

• Build
• Tests
• Error handling
• Logging
• Metrics
• Tracing
• Health checks

Security:

• Authentication
• Authorization
• Secrets
• TLS
• Vulnerability scanning
• Audit logging

Data:

• Backups
• Restore tests
• Migrations
• Replication
• Retention

Infrastructure:

• Autoscaling
• Failover
• Monitoring
• Alerts
• Capacity

Operations:

• Runbooks
• On-call
• Incident response
• Rollback
• Disaster recovery

User experience:

• Accessibility
• Performance
• Offline behavior
• Error handling

────────────────────────────────────────

RELEASE CERTIFICATION

Define release criteria.

A release must not be considered production-ready until:

• Required tests pass
• Critical security checks pass
• Performance budgets pass
• Infrastructure validation passes
• Smoke tests pass
• Backup validation passes
• Monitoring is operational
• Rollback is available
• Required documentation exists

────────────────────────────────────────

DOCUMENTATION

Generate:

• QA strategy
• Test strategy
• Test matrix
• E2E scenarios
• Performance testing guide
• Security testing guide
• Resilience testing guide
• Disaster recovery testing guide
• Accessibility testing guide
• CI/CD quality-gate guide
• Production-readiness checklist
• Release certification guide
• Incident validation guide
• Test data strategy
• Environment strategy

────────────────────────────────────────

PROJECT INDEX

Maintain the QA Project Index.

Track:

• Test suites
• Unit tests
• Integration tests
• Contract tests
• E2E tests
• Performance tests
• Security tests
• Resilience tests
• Infrastructure tests
• Accessibility tests
• Load tests
• Chaos tests
• Disaster-recovery tests
• Production smoke tests
• Quality gates
• SLOs
• SLIs
• Coverage
• Known failures
• Known risks
• Production-readiness status
• Generated files
• Remaining work

────────────────────────────────────────

IMPLEMENTATION MILESTONES

QA MILESTONE 1

Testing infrastructure, test configuration, fixtures, factories, shared test utilities, and coverage configuration.

QA MILESTONE 2

Backend unit, integration, API, repository, service, and controller testing.

QA MILESTONE 3

Event, queue, WebSocket, synchronization, and real-time testing.

QA MILESTONE 4

Frontend component, integration, accessibility, and E2E testing.

QA MILESTONE 5

Mobile component, integration, offline, synchronization, notification, and E2E testing.

QA MILESTONE 6

Security testing, vulnerability scanning, abuse testing, and authorization testing.

QA MILESTONE 7

Performance, load, stress, soak, and capacity testing.

QA MILESTONE 8

Resilience, chaos, backup restoration, and disaster-recovery testing.

QA MILESTONE 9

Infrastructure validation, CI/CD quality gates, production smoke testing, and observability validation.

QA MILESTONE 10

Final production-readiness review, release certification, risk register, and operational sign-off.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must produce measurable and verifiable results.

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never truncate code.

Never summarize implementation instead of generating it.

Never generate pseudo-code.

Never generate placeholder files.

Never generate TODO implementations.

When modifying an existing file:

1. Provide the exact file path.
2. State why it must change.
3. Provide the complete updated file.

Never regenerate unchanged files.

────────────────────────────────────────

SCOPE RESTRICTION

This prompt is dedicated to:

• QA
• Testing
• Security validation
• Performance validation
• Resilience validation
• Infrastructure validation
• Accessibility validation
• Disaster recovery validation
• CI/CD quality gates
• Production smoke testing
• Production readiness
• Release certification

Do not redesign application architecture.

Do not replace established technologies without documented justification.

Do not implement unrelated application features.

────────────────────────────────────────

FINAL QUALITY BAR

The completed platform must be capable of demonstrating production readiness for:

• Hundreds of millions of users
• Billions of messages
• Tens of millions of concurrent connections
• Large-scale media
• Large-scale notifications
• High call concurrency
• Multi-device synchronization
• Global multi-region deployment
• High availability
• Disaster recovery
• Strong security
• Strict privacy

The final output must provide objective evidence that the platform is:

• Correct
• Secure
• Performant
• Resilient
• Observable
• Recoverable
• Accessible
• Scalable
• Maintainable
• Production-ready
