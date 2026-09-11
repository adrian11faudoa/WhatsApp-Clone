# WHATSAPP — QA VOLUME 2

## ROLE

Act as a Principal QA Engineer, Staff SDET, Distributed Systems Test Engineer, Security Test Engineer, Performance Engineer, Reliability Engineer, Chaos Engineer, Mobile Test Engineer, Frontend Test Engineer, Backend Test Engineer, Accessibility Engineer, and Release Validation Engineer working as one senior engineering team.

You are performing the final quality, resilience, security, performance, and release validation of a global, production-grade real-time communication platform comparable in capability to WhatsApp, Telegram, Signal, Messenger, Discord, and Microsoft Teams.

You are not writing a testing tutorial or a superficial test suite.

You are implementing the advanced validation system required to determine whether the repository is genuinely production-ready.

---

# PROJECT

The platform supports:

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

Target operating characteristics include:

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

Use the repository's actual implementation and dependency versions as the source of truth.

The technology direction includes:

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

Before modifying or adding tests:

1. Inspect the entire repository.
2. Inspect all existing tests.
3. Inspect test utilities and fixtures.
4. Inspect backend modules.
5. Inspect frontend applications.
6. Inspect mobile applications.
7. Inspect API contracts.
8. Inspect WebSocket contracts.
9. Inspect event schemas.
10. Inspect database schemas.
11. Inspect queues.
12. Inspect Redis usage.
13. Inspect media workflows.
14. Inspect search workflows.
15. Inspect notification workflows.
16. Inspect infrastructure.
17. Inspect CI/CD.
18. Identify critical test gaps.
19. Identify flaky tests.
20. Identify tests that provide false confidence.
21. Identify production risks not covered by automation.

The repository is the source of truth.

Do not invent functionality that does not exist.

Do not rewrite correct existing tests unnecessarily.

---

# 1. QA OBJECTIVE

Complete the advanced QA and production validation system.

Focus on:

* Distributed-system correctness
* End-to-end consistency
* Concurrency
* Resilience
* Chaos testing
* Performance
* Scalability
* Security regression
* Privacy
* Accessibility
* Mobile reliability
* Browser compatibility
* Disaster recovery validation
* Deployment validation
* Release gates
* Production-readiness verification

The objective is to find failures that unit and basic integration tests cannot detect.

---

# 2. DISTRIBUTED SYSTEM TESTING

Validate interactions between:

* API services
* WebSocket services
* PostgreSQL
* Redis
* Kafka/Redpanda
* BullMQ
* Search
* Object storage
* Media processors
* Notification providers

Test:

* Delayed dependencies
* Duplicate events
* Missing events
* Reordered events
* Consumer restarts
* Partial failures
* Network failures
* Dependency recovery

Verify the system converges toward the correct state.

---

# 3. CROSS-SERVICE CONTRACT TESTING

Implement contract tests for critical service boundaries.

Validate:

* REST request/response schemas
* WebSocket event schemas
* Event-stream schemas
* Queue payloads
* Database-facing contracts
* Media-processing contracts
* Notification contracts

Detect incompatible changes before deployment.

Test backward and forward compatibility where required.

---

# 4. EVENT SCHEMA COMPATIBILITY

Test event evolution.

Verify:

* New consumers can process older events.
* Older consumers fail safely when encountering supported newer versions.
* Required fields remain compatible.
* Optional fields evolve safely.
* Version identifiers are honored.
* Unknown fields do not break consumers.

Test representative event replay.

---

# 5. MESSAGE CONSISTENCY TESTING

Build end-to-end consistency scenarios.

For a single message verify:

* Database persistence
* Outbox creation
* Event publication
* Recipient delivery
* Delivery state
* Read state
* Multi-device synchronization
* Search indexing where applicable
* Notification behavior
* Cache updates

Introduce controlled delays and failures at each stage.

Verify eventual convergence.

---

# 6. CONCURRENCY STRESS TESTING

Create tests for high-concurrency operations.

Test simultaneous:

* Message sends
* Reactions
* Edits
* Deletes
* Reads
* Group membership changes
* Device synchronization
* Authentication attempts
* Media uploads

Verify:

* No duplicate business effects
* No lost updates
* No invalid states
* No authorization bypass
* Correct idempotency

---

# 7. RACE CONDITION TESTING

Explicitly test races such as:

* Delete vs edit
* Edit vs reaction
* Membership removal vs message send
* Block vs message send
* Device revoke vs synchronization
* Account deletion vs message processing
* Media deletion vs download
* Session expiration vs API request

Validate the repository's defined precedence and consistency semantics.

---

# 8. IDEMPOTENCY STRESS TESTING

Repeatedly execute identical operations.

Cover:

* Message submission
* Reactions
* Read receipts
* Delivery receipts
* Group membership changes
* Media processing
* Notifications
* Account deletion
* Data export
* Queue jobs
* Event consumption

Verify retries do not multiply business effects.

---

# 9. OFFLINE/RECONNECT STRESS TESTING

Simulate:

* Intermittent network
* Long offline periods
* Rapid reconnects
* Multiple reconnects
* Connection loss during send
* Connection loss during synchronization
* Connection loss during media upload
* Application backgrounding during synchronization

Verify:

* No message duplication
* No missing messages
* Correct reconciliation
* Correct ordering semantics
* Correct read/delivery state
* Correct local state

---

# 10. MULTI-DEVICE CONSISTENCY TESTING

Create scenarios with:

* Multiple web sessions
* Multiple mobile devices
* Simultaneous activity
* One device offline
* Device revocation
* Session expiration
* New-device login

Verify synchronization of:

* Messages
* Delivery
* Read state
* Reactions
* Edits
* Deletes
* Conversation metadata
* Privacy settings
* Account state

---

# 11. GROUP CONSISTENCY STRESS TESTING

Test groups with representative large membership populations.

Validate:

* Membership propagation
* Permission changes
* Message delivery
* Fan-out
* Read state
* Presence
* Group metadata
* Member removal
* Concurrent membership changes

Verify removed members cannot continue receiving unauthorized private group events.

---

# 12. WEBSOCKET SCALE TESTING

Build scalable WebSocket load tests.

Support configurable:

* Connection count
* Message rate
* Subscription count
* Group membership
* Connection lifetime
* Reconnection rate
* Geographic distribution

Measure:

* Connection success rate
* Connection establishment latency
* Event latency
* Message delivery latency
* Disconnect rate
* Reconnect success
* Server resource utilization

---

# 13. RECONNECT STORM TESTING

Simulate:

* Regional outage recovery
* Load balancer restart
* Pod rollout
* Network restoration
* Mobile network recovery

Generate large populations reconnecting simultaneously.

Verify:

* Authentication remains available.
* Redis remains stable.
* Database connection pools remain healthy.
* WebSocket servers recover.
* Message synchronization remains correct.
* Rate limiting prevents overload.
* The system does not enter a cascading failure.

---

# 14. API LOAD TESTING

Test critical APIs under sustained load.

Include:

* Authentication
* Conversation retrieval
* Message history
* Message creation
* Read state
* Search
* Profile operations
* Group operations
* Media operations

Measure:

* P50
* P95
* P99
* Throughput
* Error rate
* Saturation

---

# 15. DATABASE LOAD TESTING

Test PostgreSQL under representative workloads.

Include:

* Message writes
* Message reads
* Conversation history
* Delivery state updates
* Read state updates
* Group membership
* Search-related queries
* Account operations

Measure:

* Query latency
* Connection usage
* Lock contention
* CPU
* Memory
* Storage
* I/O
* Replica lag

Identify problematic queries.

---

# 16. REDIS LOAD TESTING

Test:

* Presence
* Typing
* Sessions
* Rate limiting
* Caching
* Idempotency
* Distributed coordination

Measure:

* Latency
* Memory
* Throughput
* Connection usage
* Evictions
* Failover behavior

Verify Redis degradation does not cause catastrophic application failure.

---

# 17. EVENT BROKER LOAD TESTING

Test Kafka/Redpanda under representative workloads.

Measure:

* Publish throughput
* Consumer throughput
* Consumer lag
* Partition distribution
* Broker utilization
* Disk usage
* Replication health

Test scaling and consumer recovery.

---

# 18. QUEUE LOAD TESTING

Stress BullMQ workloads.

Test:

* Notification jobs
* Media jobs
* Search jobs
* Cleanup jobs
* Export jobs
* Deletion jobs

Measure:

* Queue depth
* Job latency
* Worker utilization
* Retry rate
* Failure rate

Verify autoscaling behavior.

---

# 19. MEDIA LOAD TESTING

Test realistic:

* Image uploads
* Video uploads
* Audio uploads
* Voice messages
* Document uploads
* Thumbnail generation
* Transcoding

Measure:

* Upload throughput
* Processing time
* Queue latency
* Worker utilization
* Storage throughput
* CDN delivery

Test large files and concurrent uploads.

---

# 20. SEARCH LOAD TESTING

Test:

* User search
* Message search
* Conversation search
* High query concurrency
* Large result sets
* Index lag
* Reindexing

Measure:

* Search latency
* Throughput
* CPU
* Memory
* Disk
* Shard health

---

# 21. NOTIFICATION LOAD TESTING

Test high-volume notification generation.

Verify:

* Deduplication
* Provider throttling
* Retry
* Token cleanup
* Multi-device behavior

Simulate FCM/APNs degradation.

---

# 22. CHAOS TESTING FOUNDATION

Create controlled resilience tests.

Support failure injection for:

* Pod termination
* Node termination
* Redis failure
* Database failure
* Broker failure
* Queue worker failure
* Search failure
* Object storage failure
* Notification-provider failure
* Network latency
* Network packet loss
* Dependency timeout

Every chaos test must define:

* Target
* Expected behavior
* Abort condition
* Recovery procedure
* Validation criteria

---

# 23. KUBERNETES FAILURE TESTING

Test:

* Pod eviction
* Pod crash
* Node drain
* Node termination
* Deployment rollback
* Autoscaling failure
* Readiness failure
* Liveness failure

Verify service continuity.

---

# 24. DATABASE FAILURE TESTING

Test controlled database failures.

Verify:

* Detection
* Connection recovery
* Failover
* Application behavior
* Error handling
* Retry behavior
* Data integrity

Ensure failed database operations do not create duplicate messages.

---

# 25. REDIS FAILURE TESTING

Test Redis:

* Restart
* Failover
* Network interruption
* High latency
* Memory pressure

Verify:

* Sessions recover appropriately.
* Presence recovers.
* Rate limiting degrades safely.
* Idempotency behavior remains correct.
* BullMQ recovers where applicable.

---

# 26. BROKER FAILURE TESTING

Test:

* Broker restart
* Partition disruption
* Consumer restart
* Consumer lag
* Replica failure

Verify:

* Events are not silently lost.
* Consumers recover.
* Duplicate events are handled safely.
* Business state remains correct.

---

# 27. SEARCH FAILURE TESTING

Disable or degrade search.

Verify:

* Messaging remains functional.
* Search failures are isolated.
* Indexing catches up after recovery.
* No unauthorized fallback query path is introduced.

---

# 28. MEDIA FAILURE TESTING

Test:

* Object-storage errors
* Processing worker failure
* Transcoding failure
* CDN origin failure
* Signed URL expiration
* Partial upload
* Interrupted download

Verify:

* Retry behavior
* Cleanup
* Recovery
* User-visible errors
* Authorization

---

# 29. SECURITY PENETRATION-STYLE TESTING

Implement automated security regression scenarios for:

* Authentication bypass
* Authorization bypass
* IDOR
* Privilege escalation
* Session abuse
* Token replay
* Rate-limit bypass
* SSRF
* Path traversal
* Injection
* Unsafe file upload
* Malicious media
* Sensitive data leakage

Do not introduce destructive exploitation against production systems.

---

# 30. PRIVACY REGRESSION TESTING

Verify private information never crosses authorization boundaries.

Test:

* Conversations
* Messages
* Profiles
* Presence
* Last seen
* Media
* Search
* Notifications
* Reports
* Account exports

Test with multiple users, devices, and authorization states.

---

# 31. DATA RETENTION TESTING

Test:

* Message retention
* Disappearing messages
* Deleted messages
* Media expiration
* Account deletion
* Export expiration
* Audit retention

Verify cleanup jobs actually remove or anonymize data according to implemented policies.

---

# 32. CACHE CONSISTENCY TESTING

Test:

* Cache hit
* Cache miss
* Stale cache
* Cache invalidation
* Cache rebuild
* Redis restart

Verify stale cache cannot override authoritative database state.

---

# 33. SEARCH EVENTUAL CONSISTENCY TESTING

Test:

1. Create message.
2. Verify database.
3. Delay indexing.
4. Verify search does not incorrectly expose unauthorized data.
5. Allow indexing.
6. Verify search converges.
7. Delete message.
8. Delay deletion indexing.
9. Verify authorization and deletion behavior remain correct.

---

# 34. NOTIFICATION PRIVACY TESTING

Verify notification payloads respect:

* Privacy settings
* Muted conversations
* Locked/private states where implemented
* Device settings
* Notification preferences

Test notifications across:

* Web
* iOS
* Android

---

# 35. ACCESSIBILITY REGRESSION TESTING

Perform automated accessibility testing for critical web and mobile flows.

Cover:

* Authentication
* Conversation list
* Messaging
* Search
* Settings
* Profile
* Media viewer
* Group management

Validate:

* Focus
* Labels
* Semantics
* Contrast
* Keyboard access
* Screen-reader compatibility
* Reduced motion

---

# 36. BROWSER COMPATIBILITY TESTING

Where supported by the project:

Test critical web flows across current supported browsers.

Validate:

* Authentication
* Messaging
* WebSocket behavior
* Media
* Notifications
* Search
* Settings

Do not claim support for browsers not actually tested or supported by project policy.

---

# 37. MOBILE DEVICE MATRIX

Define a realistic mobile validation matrix.

Cover:

* iOS
* Android
* Different screen sizes
* Different OS versions supported by the application
* Low-memory devices where practical
* Slow networks
* Background restrictions

Test critical messaging flows across the matrix.

---

# 38. MOBILE RESOURCE TESTING

Measure:

* Memory
* CPU
* Battery
* Network usage
* Startup time
* Message rendering
* Large conversation scrolling
* Media playback
* Media upload

Identify:

* Memory leaks
* Excessive rerenders
* Unbounded caches
* Battery-intensive polling
* Network waste

---

# 39. LARGE-CONVERSATION TESTING

Test conversations containing:

* Large message counts
* Large media counts
* Long histories
* Many reactions
* Many replies

Verify:

* Timeline virtualization
* Pagination
* Search
* Scrolling
* Memory
* Synchronization
* Rendering performance

---

# 40. LARGE-MEDIA TESTING

Test:

* Large images
* Long videos
* Long audio
* Large documents

Verify:

* Upload limits
* Processing limits
* Timeouts
* Memory usage
* Storage behavior
* CDN delivery
* Client handling

---

# 41. ACCESS CONTROL MATRIX TESTING

Create a test matrix covering:

* Anonymous
* Authenticated user
* Conversation member
* Non-member
* Group administrator
* Moderator
* Platform administrator
* Blocked user
* Restricted user
* Revoked device
* Deleted account

Verify each sensitive operation against each applicable role.

---

# 42. RELEASE CANDIDATE VALIDATION

Create a release validation workflow that verifies:

* Build succeeds
* Tests pass
* Security checks pass
* Contracts remain compatible
* Database migrations are safe
* Images are valid
* Infrastructure is valid
* Deployment succeeds
* Smoke tests pass
* Rollback is available

A release must not be considered production-ready merely because compilation succeeds.

---

# 43. SMOKE TEST SUITE

Create a fast post-deployment smoke suite.

Cover:

* Health
* Authentication
* User retrieval
* Conversation retrieval
* Message send
* Message receive
* WebSocket connection
* Database connectivity
* Redis connectivity
* Queue processing
* Search
* Media authorization

Keep smoke tests deterministic and fast enough for deployment gates.

---

# 44. POST-DEPLOYMENT VALIDATION

After deployment, validate:

* Application health
* Error rates
* Latency
* WebSocket connections
* Message throughput
* Database health
* Redis health
* Queue depth
* Broker lag
* Search health
* Media health
* Notification health

Use automated checks where practical.

---

# 45. CANARY VALIDATION

For canary deployments, validate:

* Error rate
* Latency
* Crash rate
* WebSocket stability
* Message delivery
* Queue behavior
* Database behavior

Compare canary behavior against the stable version.

Automatically block promotion when defined thresholds are exceeded.

---

# 46. REGRESSION AFTER MIGRATIONS

When database migrations are introduced:

1. Validate schema.
2. Validate backward compatibility.
3. Run application tests.
4. Run integration tests.
5. Run migration tests.
6. Verify rollback/recovery strategy.
7. Validate production deployment ordering.

Prevent schema changes from breaking older application instances during rolling deployments.

---

# 47. TEST DATA PRIVACY

Ensure test data does not contain:

* Real user information
* Real credentials
* Production tokens
* Production media
* Sensitive personal information

Use synthetic data.

---

# 48. TEST SECURITY

Protect:

* Test credentials
* CI secrets
* Test databases
* Test storage
* Test logs
* Test artifacts

Do not expose credentials through:

* Logs
* Screenshots
* CI artifacts
* Failure messages
* Reports

---

# 49. TEST OBSERVABILITY

Ensure failed tests provide actionable diagnostics.

Capture where appropriate:

* Logs
* Traces
* HTTP requests
* WebSocket events
* Database diagnostics
* Screenshots
* Videos
* Device logs
* Performance metrics

Avoid storing sensitive payloads unnecessarily.

---

# 50. TEST FLAKINESS GOVERNANCE

Identify flaky tests.

Track:

* Failure frequency
* Retry frequency
* Runtime
* Ownership
* Root cause

Do not permanently hide flaky tests with retries.

Retries may be used diagnostically, but underlying flakiness must be corrected.

---

# 51. TEST EXECUTION OPTIMIZATION

Optimize test execution without reducing meaningful coverage.

Use:

* Parallel execution
* Test sharding
* Targeted test selection
* Dependency-aware execution
* Reusable fixtures
* Cached dependencies where safe

Maintain deterministic behavior.

---

# 52. PRODUCTION READINESS TEST MATRIX

Create a final matrix covering:

| Area              | Validation                     |
| ----------------- | ------------------------------ |
| Authentication    | Functional + Security          |
| Authorization     | Functional + Security          |
| Messaging         | Functional + Concurrency       |
| WebSocket         | Functional + Load              |
| Groups            | Functional + Scale             |
| Multi-device      | Synchronization                |
| Offline           | Recovery                       |
| Media             | Functional + Security + Load   |
| Search            | Functional + Security + Load   |
| Notifications     | Functional + Privacy + Failure |
| Privacy           | Security                       |
| Moderation        | Authorization                  |
| Database          | Integrity + Failure            |
| Redis             | Failure + Load                 |
| Broker            | Failure + Load                 |
| Queues            | Failure + Load                 |
| Infrastructure    | Deployment + Recovery          |
| Mobile            | Lifecycle + Performance        |
| Web               | Compatibility + Accessibility  |
| Security          | Regression                     |
| Disaster Recovery | Restore + Failover             |

Implement actual automated coverage for applicable rows.

---

# 53. FINAL SYSTEM VALIDATION

Perform an end-to-end production-readiness validation.

Verify:

* Critical user journeys work.
* Security boundaries hold.
* Data remains consistent.
* Real-time behavior is correct.
* Offline synchronization converges.
* Multi-device behavior is correct.
* Infrastructure failures are handled.
* Deployment failures are recoverable.
* Backups are usable.
* Monitoring detects major failures.
* CI/CD prevents unacceptable regressions.

---

# 54. DEFECT TRIAGE

For every discovered defect:

1. Reproduce it.
2. Identify root cause.
3. Determine affected systems.
4. Implement the correct fix if within scope.
5. Add a regression test.
6. Re-run related tests.
7. Verify no regression elsewhere.

Do not patch symptoms without understanding the underlying failure.

---

# 55. FINAL CODE AND TEST QUALITY REVIEW

Review all newly created and modified tests.

Verify:

* Clear names
* Deterministic behavior
* Correct assertions
* Useful failure messages
* Proper cleanup
* Correct isolation
* No unnecessary mocking
* No duplicated fixtures
* No dead tests
* No disabled tests
* No hidden retries
* No production dependencies

---

# 56. HARD IMPLEMENTATION RULES

You MUST:

* Inspect the repository first.
* Test actual behavior.
* Test distributed interactions.
* Test concurrency.
* Test failures.
* Test recovery.
* Test security.
* Test privacy.
* Test scalability.
* Test deployment.
* Test production-critical workflows.
* Add regression tests for discovered defects.
* Integrate advanced validation into CI/CD.

You MUST NOT:

* Use pseudo-tests.
* Fake passing results.
* Disable failing tests to obtain green CI.
* Depend on production data.
* Use arbitrary sleeps.
* Ignore race conditions.
* Ignore flaky tests.
* Ignore security failures.
* Ignore data consistency failures.
* Create destructive production tests.
* Claim scalability without measurement.
* Claim disaster recovery without exercising recovery.

Never use:

* “implement similarly”
* “left as an exercise”
* “for brevity”
* “remaining tests omitted”
* “TODO”
* “placeholder”

---

# 57. REPOSITORY INTEGRATION

Integrate all QA improvements into the existing repository.

Requirements:

* Preserve correct tests.
* Modify only necessary files.
* Maintain test conventions.
* Maintain dependency compatibility.
* Maintain CI/CD compatibility.
* Maintain environment isolation.
* Maintain reproducibility.
* Maintain existing application behavior.
* Update documentation where testing behavior changes.

Every test must compile.

Every test must use actual repository contracts.

---

# 58. VALIDATION REQUIREMENTS

Before completion:

1. Run formatting.
2. Run type checking.
3. Run unit tests.
4. Run integration tests.
5. Run API tests.
6. Run contract tests.
7. Run WebSocket tests.
8. Run database tests.
9. Run Redis tests.
10. Run queue tests.
11. Run event tests.
12. Run frontend tests.
13. Run mobile tests where environment permits.
14. Run accessibility tests.
15. Run security tests.
16. Run smoke tests.
17. Run critical end-to-end tests.
18. Run relevant load tests.
19. Run relevant resilience tests.
20. Validate CI/CD integration.
21. Review failures.
22. Fix all issues within scope.
23. Re-run affected suites.
24. Confirm repository remains clean and consistent.

---

# 59. FINAL IMPLEMENTATION REPORT

At completion provide:

## IMPLEMENTED

List all advanced QA capabilities implemented.

## DISTRIBUTED SYSTEMS

Describe:

* Concurrency
* Idempotency
* Ordering
* Event consistency
* Multi-device synchronization
* Offline synchronization

## PERFORMANCE

Describe:

* API load
* WebSocket load
* Database load
* Redis load
* Broker load
* Queue load
* Media load
* Search load

## RESILIENCE

Describe:

* Failure injection
* Recovery tests
* Chaos scenarios
* Regional/failure validation

## SECURITY

Describe:

* Authorization
* Authentication
* Privacy
* SSRF
* Media security
* Access-control testing
* Security regression

## CLIENTS

Describe:

* Web
* Mobile
* Accessibility
* Browser compatibility
* Device validation

## RELEASE VALIDATION

Describe:

* Smoke tests
* Canary validation
* Post-deployment validation
* Rollback validation
* Migration validation

## TEST RESULTS

Report:

* Tests executed
* Tests passed
* Tests failed
* Tests skipped
* Coverage
* Performance results
* Known limitations

## FILES CHANGED

List every created, modified, or deleted file with a concise explanation.

## REMAINING ISSUES

Only list genuine unresolved issues that are outside this prompt's scope or require unavailable external infrastructure, device, or provider access.

---

# QA VOLUME 2 COMPLETION STANDARD

This prompt is complete only when the repository contains an advanced production validation system capable of testing:

* Distributed-system correctness
* Concurrency
* Idempotency
* Event consistency
* Multi-device synchronization
* Offline synchronization
* WebSocket scale
* API scale
* Database scale
* Redis scale
* Event-broker scale
* Queue scale
* Media scale
* Search scale
* Notification reliability
* Security boundaries
* Privacy boundaries
* Accessibility
* Browser compatibility
* Mobile reliability
* Chaos scenarios
* Infrastructure failures
* Deployment safety
* Recovery behavior
* Production release readiness

The test system must provide meaningful evidence about whether the platform is production-ready.

Tests must be deterministic, isolated, secure, maintainable, observable, and CI-compatible.

Critical defects discovered during validation must be fixed and protected with regression tests whenever they fall within the scope of this prompt.

Do not stop at test creation.

Execute the validation, analyze failures, fix defects within scope, rerun affected suites, and report the actual result.
