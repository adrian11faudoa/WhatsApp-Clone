# WHATSAPP — QA VOLUME 1

## ROLE

Act as a Principal QA Engineer, Staff Test Engineer, SDET, Backend Test Engineer, Frontend Test Engineer, Mobile Test Engineer, Distributed Systems Test Engineer, Security Test Engineer, Performance Engineer, Reliability Engineer, and Release Validation Engineer working as one senior engineering team.

You are validating a production-grade global real-time communication platform comparable in capability to WhatsApp, Telegram, Signal, Messenger, Discord, and Microsoft Teams.

You are not writing a testing tutorial or a superficial test suite.

You are implementing a comprehensive production-grade automated quality system that verifies correctness, compatibility, reliability, security, performance, and integration across the entire repository.

---

# PROJECT

The project is a global real-time communication platform supporting:

* Individual messaging
* Group messaging
* Profiles
* Contacts
* Presence
* Typing indicators
* Delivery/read states
* Replies
* Reactions
* Editing
* Deletion
* Forwarding
* Pinned messages
* Saved messages
* Media
* Documents
* Voice messages
* Stickers
* GIFs
* Link previews
* Search
* Notifications
* Push notifications
* Multi-device synchronization
* Offline synchronization
* Blocking
* Reporting
* Privacy controls
* Disappearing messages
* Moderation
* Administration
* Analytics
* Media storage and delivery

The platform is designed for:

* Hundreds of millions of registered users
* Tens of millions of daily active users or greater
* Very large concurrent WebSocket populations
* High message throughput
* Large media volumes
* Global traffic
* Multi-region deployment
* High availability
* Horizontal scalability
* Fault tolerance
* Disaster recovery

---

# TECHNOLOGY DIRECTION

Use the repository's existing implementation and exact dependency versions as the source of truth.

The project direction includes:

* Next.js
* React
* TypeScript
* Tailwind
* TanStack Query
* Zustand
* React Native
* Expo
* React Navigation
* NestJS
* Node.js
* REST
* WebSockets
* Socket.IO
* PostgreSQL
* Prisma
* Redis
* BullMQ
* Kafka or Redpanda
* OpenSearch or Elasticsearch
* S3-compatible object storage
* CloudFront or equivalent CDN
* FFmpeg
* FCM
* APNs
* Docker
* Kubernetes
* Helm
* Terraform
* GitHub Actions
* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo
* Jest
* Supertest
* Swagger/OpenAPI

---

# SOURCE OF TRUTH

Before implementing or modifying tests:

1. Inspect the entire repository.
2. Identify backend modules.
3. Identify API contracts.
4. Identify database schemas.
5. Identify WebSocket contracts.
6. Identify event schemas.
7. Identify Redis usage.
8. Identify queues and workers.
9. Identify media processing.
10. Identify search behavior.
11. Identify notification behavior.
12. Identify web applications.
13. Identify mobile applications.
14. Identify infrastructure.
15. Identify existing tests.
16. Identify test utilities.
17. Identify fixtures.
18. Identify factories.
19. Identify mocks.
20. Identify integration environments.
21. Identify CI/CD test workflows.
22. Identify existing coverage configuration.
23. Identify missing critical test coverage.
24. Identify broken or unreliable tests.

The repository is the source of truth.

Do not invent APIs, modules, database fields, event names, routes, screens, or infrastructure components that do not exist.

Tests must validate actual implementation.

Do not rewrite correct existing tests unnecessarily.

---

# 1. QA OBJECTIVE

Build a comprehensive automated quality foundation covering:

* Unit testing
* Integration testing
* API testing
* Database testing
* Redis testing
* Queue testing
* Event testing
* WebSocket testing
* Authentication testing
* Authorization testing
* Security testing
* Contract testing
* Frontend testing
* Mobile testing
* End-to-end testing
* Failure testing
* Concurrency testing
* Data consistency testing
* Regression testing

The test system must be deterministic, maintainable, isolated, parallelizable, and suitable for CI/CD.

---

# 2. TESTING ARCHITECTURE

Create or improve a clear testing architecture.

Separate appropriately:

* Unit tests
* Integration tests
* Contract tests
* Component tests
* API tests
* WebSocket tests
* End-to-end tests
* Security tests
* Performance tests

Define:

* Test ownership
* Test locations
* Naming conventions
* Fixtures
* Factories
* Test helpers
* Environment configuration
* Test database strategy
* Test Redis strategy
* Test broker strategy
* Test storage strategy

Do not create one monolithic test suite.

---

# 3. TEST ENVIRONMENT ISOLATION

Ensure tests never accidentally access production resources.

Test environments must use dedicated:

* Databases
* Redis instances
* Queues
* Brokers
* Object-storage locations
* Search indexes
* Notification credentials where applicable

Prevent production credentials from being loaded by test commands.

Fail safely when required test configuration is missing.

---

# 4. TEST DATA FACTORIES

Create reusable factories for important domain entities.

Include, where applicable:

* Users
* Profiles
* Devices
* Sessions
* Contacts
* Conversations
* Group memberships
* Messages
* Reactions
* Attachments
* Media records
* Delivery states
* Read states
* Notifications
* Reports
* Blocks
* Privacy settings
* Saved messages
* Pinned messages

Factories must:

* Produce valid data
* Support overrides
* Avoid unnecessary coupling
* Be deterministic where required
* Clean up after tests
* Respect database constraints

---

# 5. DATABASE TESTING

Implement comprehensive PostgreSQL and Prisma testing.

Verify:

* Schema constraints
* Foreign keys
* Unique constraints
* Indexes
* Transactions
* Rollbacks
* Concurrent operations
* Referential integrity
* Soft deletion where applicable
* Retention behavior
* Pagination
* Query correctness

Test important race conditions.

Verify transaction boundaries for:

* Message creation
* Membership changes
* Delivery state updates
* Read state updates
* Reactions
* Editing
* Deletion
* Blocking
* Account deletion
* Moderation actions

---

# 6. DATABASE CONCURRENCY TESTS

Explicitly test concurrent operations.

Include scenarios such as:

* Two clients sending messages simultaneously.
* Duplicate message submissions.
* Concurrent message edits.
* Concurrent message deletion.
* Concurrent reactions.
* Concurrent read receipts.
* Concurrent membership changes.
* Concurrent device synchronization.
* Concurrent account operations.

Verify:

* No invalid state
* No duplicate business records
* No lost updates
* Correct idempotency
* Correct ordering semantics
* Correct transaction behavior

---

# 7. AUTHENTICATION TESTING

Test:

* Registration
* Login
* Logout
* Session creation
* Session expiration
* Refresh
* Device registration
* Device revocation
* Password handling
* Authentication failures
* Account lockout or abuse controls
* Token validation
* Invalid tokens
* Expired tokens
* Revoked sessions

Verify that authentication failures do not leak sensitive information.

---

# 8. AUTHORIZATION TESTING

Test every security-sensitive resource boundary.

Verify:

* Users cannot access another user's private data.
* Users cannot access unauthorized conversations.
* Non-members cannot access group content.
* Removed members lose appropriate access.
* Blocked users cannot perform prohibited operations.
* Administrators have only intended privileges.
* Moderators cannot perform unauthorized administrative actions.
* Device-scoped operations respect device ownership.

Test both positive and negative authorization cases.

---

# 9. API CONTRACT TESTING

Validate REST APIs against actual OpenAPI contracts.

Test:

* Request validation
* Response schemas
* HTTP status codes
* Error structures
* Authentication
* Authorization
* Pagination
* Filtering
* Sorting
* Idempotency
* Rate limiting
* Content types

Ensure API behavior is backward-compatible where required.

---

# 10. API ERROR TESTING

Test:

* Invalid payloads
* Missing fields
* Invalid identifiers
* Invalid pagination
* Unauthorized requests
* Forbidden requests
* Missing resources
* Conflicts
* Rate limits
* Dependency failures
* Database failures
* Redis failures
* Queue failures

Verify consistent error handling.

Do not expose:

* Stack traces
* Database errors
* Internal hostnames
* Credentials
* Tokens
* Sensitive metadata

---

# 11. MESSAGE LIFECYCLE TESTING

Test the complete message lifecycle:

1. Client creates message.
2. Server validates it.
3. Server persists it.
4. Server emits the appropriate event.
5. Recipient receives it.
6. Delivery state changes.
7. Read state changes.
8. Sender receives state updates.
9. Other devices synchronize.
10. Offline devices catch up.

Verify correctness under:

* Online clients
* Offline clients
* Multiple devices
* Reconnects
* Duplicate requests
* Concurrent sends
* Partial failures

---

# 12. MESSAGE IDEMPOTENCY TESTING

Test duplicate message submissions.

Verify that retries do not create duplicate business messages when the same idempotency identity is reused.

Test:

* Client retry
* Network timeout
* Server timeout
* Duplicate HTTP request
* Duplicate WebSocket submission
* Worker retry

Verify correct reconciliation.

---

# 13. MESSAGE ORDERING TESTING

Test message ordering under:

* Concurrent sends
* Multiple devices
* Reconnect
* Delayed packets
* Retry
* Worker delays
* Regional routing
* Event replay

Verify the repository's defined ordering semantics.

Do not impose stronger ordering guarantees than the architecture provides.

---

# 14. DELIVERY AND READ RECEIPT TESTING

Test:

* Sent
* Delivered
* Read
* Offline recipient
* Multi-device recipient
* Reconnect
* Duplicate delivery events
* Duplicate read events
* Delayed state updates

Verify state transitions are valid and idempotent.

---

# 15. EDIT AND DELETE TESTING

Test:

* Editing own messages
* Unauthorized edits
* Editing after restrictions
* Deleting own messages
* Deleting messages according to defined permissions
* Repeated edits
* Concurrent edits
* Concurrent deletion
* Deleted message synchronization
* Offline reconciliation

Verify that deleted or restricted content cannot accidentally reappear through stale caches.

---

# 16. REACTION TESTING

Test:

* Add reaction
* Remove reaction
* Replace reaction
* Duplicate reaction
* Concurrent reaction
* Unauthorized reaction
* Reaction synchronization
* Reaction count consistency

Verify idempotency and concurrency behavior.

---

# 17. REPLY, FORWARD, PIN, AND SAVE TESTING

Test:

* Replies
* Forwarding
* Pinned messages
* Saved messages

Verify:

* Authorization
* Referential integrity
* Deleted source behavior
* Cross-conversation behavior
* Multi-device synchronization
* Offline synchronization
* Duplicate operations

---

# 18. GROUP TESTING

Test group operations including:

* Create group
* Add members
* Remove members
* Leave group
* Promote/demote administrators
* Group metadata changes
* Group permissions
* Group messaging
* Group message delivery
* Group read states
* Large membership sets

Test concurrent membership changes.

Verify removed users cannot access content they are no longer authorized to access.

---

# 19. LARGE-GROUP TESTING

Test groups with large membership populations.

Validate:

* Membership operations
* Message fan-out
* Event processing
* Database performance
* Redis behavior
* Queue behavior
* WebSocket delivery

Do not use unrealistically small test groups for every group-related scenario.

Use representative synthetic large-group fixtures for scalability tests.

---

# 20. WEBSOCKET TESTING

Implement comprehensive Socket.IO/WebSocket tests.

Test:

* Connection
* Authentication
* Authentication failure
* Reconnection
* Disconnect
* Heartbeat
* Event delivery
* Acknowledgements
* Invalid events
* Unauthorized events
* Duplicate events
* Out-of-order events
* Connection recovery
* Multiple devices
* Multiple connections
* Connection termination

Verify server behavior when clients reconnect rapidly.

---

# 21. WEBSOCKET CONNECTION ISOLATION

Test:

* User A cannot receive User B's private events.
* Group members receive only authorized group events.
* Blocked users receive no prohibited events.
* Revoked devices lose access.
* Logged-out sessions cannot continue receiving private events.

Test authorization at the event level, not only during initial connection.

---

# 22. REAL-TIME EVENT TESTING

Validate events for:

* New messages
* Delivery
* Read
* Typing
* Presence
* Reactions
* Edits
* Deletes
* Group changes
* Notifications
* Device synchronization

Verify:

* Schema
* Authorization
* Ordering semantics
* Idempotency
* Version compatibility

---

# 23. REDIS TESTING

Test Redis-dependent functionality:

* Sessions
* Presence
* Typing
* Rate limiting
* Idempotency
* Distributed locks
* Caching
* Queue state

Test behavior when Redis is:

* Slow
* Temporarily unavailable
* Restarted
* Empty
* Partially populated

Verify graceful degradation.

---

# 24. QUEUE TESTING

Test BullMQ workloads.

Verify:

* Job creation
* Job execution
* Retry
* Backoff
* Failure
* Dead-letter handling
* Duplicate jobs
* Idempotency
* Worker restart
* Queue backlog

Test poison jobs.

Verify failed jobs do not cause infinite processing loops.

---

# 25. EVENT STREAM TESTING

Test Kafka/Redpanda behavior.

Verify:

* Event publication
* Consumption
* Partition behavior
* Consumer restart
* Duplicate events
* Replay
* Consumer lag
* Ordering within defined partitions
* Schema compatibility

Consumers must be idempotent where required.

---

# 26. OUTBOX TESTING

Test transactional outbox behavior.

Verify:

* Database transaction succeeds and event is eventually published.
* Database transaction fails and event is not published.
* Event publishing fails and event remains recoverable.
* Worker retries safely.
* Duplicate processing does not create duplicate business effects.
* Outbox cleanup does not remove unprocessed events.

---

# 27. OFFLINE SYNCHRONIZATION TESTING

Test:

* Offline message creation
* Offline message queueing
* Reconnection
* Synchronization
* Duplicate reconciliation
* Missing event recovery
* Multiple device synchronization
* Stale client state
* Partial synchronization
* Network interruption during sync

Verify convergence toward the correct server state.

---

# 28. MULTI-DEVICE TESTING

Test one account across:

* Web
* iOS
* Android
* Multiple simultaneous devices

Verify:

* Session behavior
* Message synchronization
* Read state
* Delivery state
* Settings synchronization
* Device revocation
* Push behavior
* Offline recovery

---

# 29. PRESENCE TESTING

Test:

* Online
* Offline
* Last seen
* Connection changes
* Multiple devices
* Reconnect
* Rapid connect/disconnect

Verify that presence does not become stuck indefinitely.

Test stale presence expiration.

---

# 30. TYPING INDICATOR TESTING

Test:

* Start typing
* Stop typing
* Timeout
* Disconnect
* Reconnect
* Multiple devices
* Multiple participants

Typing events must not be persisted as permanent message state unless explicitly required.

---

# 31. MEDIA TESTING

Test:

* Upload
* Authorization
* Metadata
* Processing
* Thumbnail generation
* Download
* Expiration
* Deletion
* Media replacement
* Failed processing
* Retry

Test:

* Images
* Video
* Audio
* Voice messages
* Documents
* Stickers

---

# 32. MEDIA SECURITY TESTING

Test:

* Unauthorized downloads
* Expired signed URLs
* Cross-user access
* Cross-conversation access
* Object enumeration
* Invalid MIME types
* Oversized files
* Malicious files
* Filename attacks
* Metadata attacks

Verify media authorization independently from frontend behavior.

---

# 33. LINK PREVIEW SECURITY TESTING

Test SSRF protections.

Verify the system rejects or safely handles:

* Private IP addresses
* Loopback
* Link-local addresses
* Internal DNS
* Cloud metadata endpoints
* Dangerous redirects
* Unsupported protocols
* Oversized responses
* Slow responses

Do not allow link-preview functionality to become an internal network access mechanism.

---

# 34. SEARCH TESTING

Test:

* User search
* Message search
* Conversation search
* Filters
* Pagination
* Authorization
* Deleted messages
* Blocked users
* Index lag
* Reindexing
* Search failures

Search must never return data the requesting user is not authorized to see.

---

# 35. NOTIFICATION TESTING

Test:

* Push registration
* Device tokens
* Notification creation
* Notification deduplication
* Privacy settings
* Muted conversations
* Blocked users
* Multiple devices
* Provider failure
* Retry

Verify notification content does not leak private message content when privacy settings prohibit it.

---

# 36. PRIVACY TESTING

Test:

* Profile visibility
* Last-seen visibility
* Read receipts
* Presence visibility
* Group permissions
* Media access
* Blocking
* Privacy settings
* Data deletion
* Data export
* Disappearing messages

Test privacy boundaries across all clients and APIs.

---

# 37. BLOCKING TESTING

Test:

* Block
* Unblock
* Messaging restrictions
* Presence restrictions
* Profile visibility
* Group interactions
* Notifications
* Existing conversations
* Multi-device propagation

Verify blocking cannot be bypassed through another API or WebSocket event.

---

# 38. REPORTING AND MODERATION TESTING

Test:

* User reports
* Message reports
* Media reports
* Group reports
* Administrative review
* Moderation actions
* Restrictions
* Appeals where implemented
* Audit logging

Verify users cannot access administrative functionality through manipulated requests.

---

# 39. DISAPPEARING MESSAGE TESTING

Test:

* Timer configuration
* Message expiration
* Multi-device behavior
* Offline devices
* Media expiration
* Search behavior
* Notifications
* Caches
* Database cleanup
* Event propagation

Verify expired content does not remain accessible through stale infrastructure paths.

---

# 40. ACCOUNT DELETION TESTING

Test complete deletion workflows.

Verify:

* Authentication invalidation
* Device revocation
* Session termination
* Data deletion
* Media deletion
* Search removal
* Cache cleanup
* Queue cleanup
* Event processing
* Audit requirements
* Recovery behavior

Ensure deletion is idempotent.

---

# 41. DATA EXPORT TESTING

Test:

* Export request
* Authorization
* Background processing
* Export generation
* Secure delivery
* Expiration
* Cleanup
* Retry
* Failure handling

Exports must not expose another user's data.

---

# 42. SECURITY REGRESSION TESTING

Create automated tests for known classes of vulnerabilities:

* Broken access control
* IDOR
* Authentication bypass
* Session abuse
* Rate-limit bypass
* Injection
* SSRF
* Path traversal
* Unsafe file handling
* Sensitive-data leakage
* Privilege escalation

Security tests must be executable in CI where safe.

---

# 43. FRONTEND COMPONENT TESTING

Test important web components including:

* Authentication
* Navigation
* Conversation list
* Message timeline
* Message composer
* Message actions
* Reply UI
* Reaction UI
* Search
* Settings
* Profile
* Privacy controls
* Media viewer
* Notifications

Verify:

* Correct rendering
* User interactions
* Loading states
* Error states
* Empty states
* Accessibility
* Keyboard behavior

---

# 44. FRONTEND STATE TESTING

Test:

* TanStack Query cache behavior
* Zustand state
* Optimistic updates
* Rollback
* Reconciliation
* WebSocket updates
* Offline state
* Authentication expiration
* Cache invalidation

Ensure stale data does not overwrite newer server state.

---

# 45. FRONTEND ACCESSIBILITY TESTING

Validate:

* Keyboard navigation
* Focus management
* Screen-reader labels
* Semantic structure
* Dialog behavior
* Error announcements
* Color-independent status communication
* Reduced motion behavior

Test critical user flows with accessibility tooling where available.

---

# 46. MOBILE COMPONENT TESTING

Test React Native screens and components including:

* Authentication
* Conversation list
* Conversation screen
* Composer
* Media picker
* Media viewer
* Settings
* Profile
* Search
* Notifications
* Privacy
* Device management

Verify:

* Loading
* Empty
* Error
* Offline
* Permission-denied
* Background
* Foreground
* Navigation states

---

# 47. MOBILE LIFECYCLE TESTING

Test:

* Cold start
* Warm start
* Background
* Foreground
* Network loss
* Network restoration
* Push notification launch
* Deep links
* Authentication expiration
* App termination
* OS permission changes

Verify synchronization after lifecycle transitions.

---

# 48. END-TO-END TESTING

Implement critical cross-system flows.

At minimum cover:

1. Registration → authentication → profile.
2. User A → User B messaging.
3. Message delivery and read state.
4. Multi-device synchronization.
5. Group creation → messaging.
6. Media upload → processing → delivery.
7. Search.
8. Push notification.
9. Blocking.
10. Reporting.
11. Privacy settings.
12. Account deletion.
13. Offline → reconnect → synchronization.

Use realistic test data.

---

# 49. CROSS-CLIENT TESTING

Verify critical behavior across:

* Web → Web
* Web → Mobile
* Mobile → Web
* Mobile → Mobile

Test combinations of:

* Online
* Offline
* Background
* Multiple devices
* Slow network
* Reconnect

---

# 50. TEST RELIABILITY

Eliminate flaky tests.

Tests must not rely on:

* Arbitrary sleeps
* Timing assumptions
* Shared mutable global state
* Test ordering
* Production services
* Uncontrolled external APIs

Use deterministic synchronization and explicit readiness checks.

If a test is flaky, identify and correct the underlying cause rather than increasing arbitrary timeouts.

---

# 51. TEST PARALLELIZATION

Ensure tests can execute safely in parallel.

Avoid:

* Shared mutable records
* Shared user identities
* Shared conversations
* Shared queues
* Shared object names
* Global database state

Use isolated identifiers and resources.

---

# 52. TEST CLEANUP

Every test must clean up resources it creates.

Cover:

* Database records
* Redis keys
* Queues
* Object-storage artifacts
* Search indexes/documents
* Temporary files
* WebSocket connections

Cleanup must execute even after failures.

---

# 53. CI QUALITY GATES

Integrate tests into CI/CD.

Define appropriate gates for:

* Type checking
* Unit tests
* Integration tests
* API tests
* Contract tests
* Security tests
* Frontend tests
* Mobile tests
* End-to-end tests

Do not make expensive tests run on every trivial change if repository structure supports intelligent test selection.

Critical security and regression tests must remain enforced.

---

# 54. TEST REPORTING

Produce useful CI results including:

* Passed tests
* Failed tests
* Skipped tests
* Duration
* Coverage
* Failure details
* Test artifacts

Where practical preserve:

* Screenshots
* Logs
* Traces
* Videos
* Network diagnostics

for failed end-to-end tests.

---

# 55. COVERAGE STRATEGY

Measure meaningful coverage.

Do not optimize solely for a percentage.

Prioritize coverage of:

* Authentication
* Authorization
* Messaging
* Synchronization
* Multi-device behavior
* Privacy
* Security
* Data consistency
* Media authorization
* Real-time behavior
* Failure handling

Identify untested critical paths.

---

# 56. PERFORMANCE TEST FOUNDATION

Create a performance-testing foundation for:

* API
* WebSockets
* Messaging
* Presence
* Search
* Media upload
* Media download
* Queue processing

Tests must support configurable:

* Users
* Connections
* Requests
* Message rates
* Group sizes
* Payload sizes
* Duration

Do not hardcode unrealistic limits.

---

# 57. PERFORMANCE BASELINES

Establish measurable baselines for critical operations.

Track:

* P50
* P95
* P99
* Throughput
* Error rate
* Resource utilization

Compare against defined service objectives.

Do not declare performance acceptable without measurable evidence.

---

# 58. FAILURE TESTING

Test controlled failures such as:

* Database unavailable
* Redis unavailable
* Broker unavailable
* Search unavailable
* Queue worker unavailable
* Object storage failure
* Notification provider failure
* Network interruption
* WebSocket disconnect
* Pod termination

Verify the application degrades safely.

---

# 59. DATA CONSISTENCY TESTING

Verify eventual consistency where intentionally designed.

Test:

* Database → event
* Event → cache
* Event → search
* Message → notification
* Message → multiple devices
* Media → processing
* Moderation → client visibility

Verify systems converge to the correct state.

---

# 60. REGRESSION SUITE

Create a stable regression suite containing the highest-risk product behavior.

Prioritize:

* Authentication
* Messaging
* Real-time delivery
* Synchronization
* Group membership
* Media
* Privacy
* Security
* Notifications
* Search
* Account lifecycle

Regression tests must execute consistently in CI.

---

# 61. HARD IMPLEMENTATION RULES

You MUST:

* Inspect the repository first.
* Test actual implementation.
* Use deterministic tests.
* Isolate test environments.
* Test positive and negative behavior.
* Test authorization explicitly.
* Test concurrency explicitly.
* Test failure behavior.
* Test real-time behavior.
* Test multi-device behavior.
* Test offline behavior.
* Integrate tests into CI.
* Fix defects discovered within scope.

You MUST NOT:

* Use pseudo-tests.
* Create fake endpoints solely to satisfy coverage.
* Mock the system under test so heavily that behavior is no longer validated.
* Use arbitrary sleeps as synchronization.
* Depend on production services.
* Commit credentials.
* Ignore flaky tests.
* Disable failing tests without a real reason.
* Lower security assertions to make tests pass.
* Treat coverage percentage as the only quality metric.

Never use:

* “implement similarly”
* “left as an exercise”
* “for brevity”
* “remaining tests omitted”
* “TODO”
* “placeholder”

---

# 62. REPOSITORY INTEGRATION

Integrate the test implementation into the existing repository.

Requirements:

* Preserve existing working tests.
* Do not regenerate unchanged files.
* Maintain existing test conventions.
* Maintain dependency compatibility.
* Maintain CI compatibility.
* Update scripts only when necessary.
* Keep test execution reproducible.
* Keep test environments isolated.
* Ensure tests compile and execute.

If an existing test is incorrect, fix it rather than duplicating it.

---

# 63. VALIDATION REQUIREMENTS

Before completion:

1. Run formatting checks.
2. Run type checking.
3. Run unit tests.
4. Run integration tests.
5. Run API tests.
6. Run WebSocket tests.
7. Run database tests.
8. Run Redis tests.
9. Run queue tests.
10. Run event tests.
11. Run frontend tests.
12. Run mobile tests where the environment permits.
13. Run security tests.
14. Run critical end-to-end tests.
15. Generate coverage.
16. Review failures.
17. Fix failures within scope.
18. Remove flaky behavior.
19. Validate CI execution.
20. Verify repository integration.

If an external dependency prevents execution, report the exact limitation and validate everything else that can be executed locally or in CI.

---

# 64. FINAL IMPLEMENTATION REPORT

At completion provide:

## IMPLEMENTED

List the testing systems and suites implemented.

## BACKEND

Describe:

* Unit tests
* Integration tests
* API tests
* Database tests
* Redis tests
* Queue tests
* Event tests
* WebSocket tests

## FRONTEND

Describe:

* Component tests
* State tests
* Accessibility tests
* Integration tests
* End-to-end tests

## MOBILE

Describe:

* Component tests
* Navigation tests
* Lifecycle tests
* Offline tests
* Push/deep-link tests
* End-to-end tests

## SECURITY

Describe:

* Authentication
* Authorization
* Privacy
* Access control
* SSRF
* File/media security
* Abuse controls

## REAL-TIME

Describe:

* WebSocket
* Ordering
* Delivery
* Read state
* Presence
* Typing
* Multi-device
* Offline synchronization

## PERFORMANCE

Describe:

* Performance test foundation
* Baselines
* Load scenarios
* Concurrency scenarios

## CI/CD

Describe:

* Quality gates
* Test execution
* Reporting
* Artifacts

## TEST RESULTS

Report:

* Tests executed
* Tests passed
* Tests failed
* Tests skipped
* Coverage
* Known limitations

## FILES CHANGED

List every created, modified, or deleted file with a concise explanation.

## REMAINING ISSUES

Only list genuine unresolved issues that are outside this prompt's scope or require unavailable external infrastructure/device access.

---

# QA VOLUME 1 COMPLETION STANDARD

This prompt is complete only when the repository contains a comprehensive automated QA foundation capable of validating:

* Backend correctness
* API correctness
* Database integrity
* Redis behavior
* Queue behavior
* Event behavior
* WebSocket behavior
* Message lifecycle
* Multi-device synchronization
* Offline synchronization
* Group messaging
* Media behavior
* Notifications
* Search
* Privacy
* Security
* Web application behavior
* Mobile application behavior
* Critical end-to-end flows
* Failure scenarios
* Concurrency
* Performance foundations

The test suite must be:

* Deterministic
* Isolated
* Maintainable
* Parallelizable
* CI-compatible
* Security-aware
* Production-oriented

Do not stop at unit tests.

Validate the complete system behavior where practical.
