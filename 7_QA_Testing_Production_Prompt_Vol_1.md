# QA PROMPT — VOLUME 1

## Comprehensive Testing, Quality Engineering, Security, Contracts, and CI Validation

You are operating as the **Staff QA Engineer, Principal Test Architect, Security Test Engineer, Reliability Engineer, and Automation Engineer** for an enterprise-grade real-time communication platform.

Your task is to inspect the **actual repository** and implement the complete automated quality-engineering foundation required to validate the application as production-grade software.

This is an implementation task.

Do not merely describe a testing strategy.

Do not produce a report instead of implementation.

Do not create pseudo-tests, placeholder suites, empty test files, TODOs, FIXME markers, fake assertions, mocked behavior that does not reflect real contracts, or superficial tests whose only purpose is increasing coverage numbers.

Everything you implement must execute against the actual repository and its actual architecture.

---

# 1. OPERATING MODE

Treat the existing repository as the authoritative source of truth.

Before modifying anything:

1. Inspect the entire repository structure.
2. Identify all applications, packages, services, workers, libraries, infrastructure components, and shared modules.
3. Identify the actual frontend, mobile, backend, worker, database, messaging, storage, search, notification, and calling implementations.
4. Identify the existing testing frameworks and configuration.
5. Identify existing unit, integration, API, E2E, component, mobile, WebSocket, event, queue, and infrastructure tests.
6. Inspect package manifests and scripts.
7. Inspect TypeScript configuration.
8. Inspect build configuration.
9. Inspect environment/configuration handling.
10. Inspect Prisma schema and migrations where present.
11. Inspect REST/OpenAPI contracts.
12. Inspect WebSocket/Socket.IO contracts.
13. Inspect Kafka/Redpanda event contracts.
14. Inspect BullMQ job definitions.
15. Inspect authentication and authorization.
16. Inspect Redis usage.
17. Inspect media workflows.
18. Inspect notification workflows.
19. Inspect search integration.
20. Inspect calling/signaling implementation.
21. Inspect frontend and mobile state-management boundaries.
22. Inspect CI/CD configuration.
23. Inspect Docker/container configuration.
24. Inspect infrastructure testability.
25. Determine what is actually implemented versus merely documented.

Do not assume that the architecture described elsewhere exists in the repository.

Do not assume technology is installed merely because it is mentioned in documentation.

Do not replace working infrastructure with a competing testing architecture.

If an existing testing system is sound, extend it.

If it is incomplete, improve it incrementally.

If the repository differs from expected architecture, adapt the tests to the actual implementation and preserve consistency.

---

# 2. PRIMARY OBJECTIVE

Build a complete, maintainable automated QA foundation capable of validating:

* backend correctness
* frontend correctness
* mobile correctness
* database behavior
* authentication
* authorization
* REST APIs
* WebSockets
* real-time messaging
* multi-device synchronization
* Kafka/Redpanda events
* BullMQ workers
* Redis behavior
* media workflows
* notifications
* search
* calling/signaling
* security boundaries
* privacy boundaries
* accessibility
* error handling
* concurrency
* idempotency
* retries
* failure recovery
* observability behavior
* configuration correctness
* CI quality gates

Testing must validate behavior, not implementation details wherever possible.

---

# 3. TESTING ARCHITECTURE

Establish a coherent testing pyramid appropriate for the actual repository.

Use the existing test ecosystem when practical.

Where the repository lacks a suitable framework, select a mature framework compatible with the current stack.

The testing architecture should distinguish clearly between:

## 3.1 Unit Tests

Validate isolated:

* domain logic
* services
* validators
* authorization policies
* state transitions
* parsers
* serializers
* mappers
* utility functions
* reducers/stores
* business rules
* retry policies
* idempotency logic
* event transformation
* pagination logic
* synchronization logic

Unit tests must be deterministic and fast.

Do not over-mock internal implementation details.

---

# 4. INTEGRATION TESTS

Implement integration tests for meaningful subsystem boundaries.

Include where applicable:

* NestJS modules
* Prisma/PostgreSQL
* Redis
* Kafka/Redpanda
* BullMQ
* object storage adapters
* search adapters
* notification adapters
* WebSocket infrastructure
* authentication/session infrastructure

Integration tests must validate actual contracts between components.

Do not replace every external dependency with mocks.

Use disposable test infrastructure where practical.

---

# 5. DATABASE TESTING

Create a reliable database testing strategy.

Validate:

* Prisma schema behavior
* migrations
* constraints
* foreign keys
* unique constraints
* indexes where behaviorally relevant
* transaction boundaries
* cascading behavior
* deletion semantics
* soft deletion where used
* timestamps
* ordering
* pagination
* optimistic/concurrency behavior
* idempotency constraints
* message uniqueness
* membership uniqueness
* unread state
* receipts
* reactions
* media ownership
* device/session persistence
* notification tokens
* search metadata
* audit records where implemented

Test transaction rollback behavior.

Test concurrent operations where race conditions are possible.

Ensure test isolation.

Tests must not accidentally depend on execution order.

---

# 6. AUTHENTICATION TESTING

Implement comprehensive authentication tests.

Cover:

* registration
* login
* logout
* session creation
* session expiration
* refresh behavior
* invalid credentials
* credential brute-force protection
* account enumeration protections where applicable
* device registration
* device revocation
* session revocation
* token validation
* expired tokens
* malformed tokens
* revoked credentials
* concurrent sessions
* multi-device sessions
* password/security credential changes where implemented
* recovery flows where implemented

Verify that authentication failures return safe, consistent errors.

Ensure sensitive credentials never appear in logs or test output.

---

# 7. AUTHORIZATION AND ACCESS CONTROL

Authorization testing is mandatory.

Test:

* user-to-user access
* conversation membership
* group membership
* administrator permissions
* owner permissions
* moderator permissions where implemented
* blocked users
* removed members
* revoked devices
* deleted conversations
* deleted messages
* private media
* search authorization
* notification privacy
* administrative endpoints
* internal endpoints
* WebSocket authorization

Explicitly test IDOR/BOLA scenarios.

For every resource-access API, attempt access using:

* owner
* legitimate member
* unrelated user
* removed member
* blocked user
* expired session
* revoked device

No authorization decision may rely solely on client-side state.

---

# 8. REST API TESTING

Build API-level tests around the actual HTTP contracts.

Validate:

* request validation
* authentication
* authorization
* success responses
* error responses
* status codes
* response schemas
* pagination
* cursors
* filtering
* sorting
* idempotency
* rate limits
* malformed input
* oversized payloads
* missing parameters
* unknown parameters where relevant
* content-type handling
* concurrency
* retry behavior

Validate OpenAPI contracts against actual implementation when OpenAPI exists.

Prevent accidental breaking API changes.

Test backward-compatible behavior where compatibility contracts exist.

---

# 9. ERROR CONTRACT TESTING

Establish and test the application's standardized error model.

Verify:

* stable error codes
* safe user-facing messages
* appropriate HTTP status
* validation details
* correlation/request identifiers
* no stack traces in production responses
* no secret leakage
* no internal database details
* no infrastructure credentials
* no private message content unnecessarily exposed

Test errors across:

* API
* WebSocket
* workers
* synchronization
* media
* search
* notification
* authentication

---

# 10. MESSAGING TESTING

Messaging is a critical system.

Implement tests for:

### Sending

* text messages
* media messages
* audio/voice messages
* documents
* system messages
* replies
* forwarded messages
* reactions

where those features exist.

### Ordering

Validate:

* server-authoritative ordering
* sequence generation
* concurrent sends
* duplicate submissions
* delayed requests
* retries
* reconnects

### Idempotency

Test:

* repeated client request
* same idempotency key
* concurrent duplicate requests
* retry after timeout
* retry after connection failure

The same logical message must not be unintentionally duplicated.

### Message state

Test:

* sent
* delivered
* read
* edited
* deleted
* deleted-for-self
* deleted-for-everyone

Validate legal and illegal state transitions.

---

# 11. RECEIPTS AND UNREAD STATE

Test:

* delivery receipts
* read receipts
* monotonic advancement
* duplicate receipts
* out-of-order receipts
* multi-device receipt updates
* unread counters
* unread synchronization
* conversation activity
* read position persistence

Ensure stale events cannot move state backwards.

---

# 12. REAL-TIME WEBSOCKET TESTING

Implement actual WebSocket/Socket.IO integration tests where applicable.

Test:

* authentication during connection
* connection rejection
* reconnection
* disconnect
* reconnect after network loss
* multiple connections
* multiple devices
* room membership
* authorization
* message delivery
* receipts
* typing indicators
* presence
* conversation events
* synchronization events
* server acknowledgements
* duplicate events
* malformed events
* unauthorized events
* revoked sessions
* blocked users
* removed group members

Validate that WebSocket authorization cannot be bypassed through crafted events.

---

# 13. MULTI-DEVICE SYNCHRONIZATION TESTING

Build explicit multi-device scenarios.

Examples:

1. User has Device A and Device B.
2. Device A sends a message.
3. Device B must receive/synchronize the message correctly.

Also test:

* Device A offline
* Device B sends/receives messages
* Device A reconnects
* synchronization catches up
* duplicate event delivery
* event replay
* missing event detection
* cursor advancement
* stale cursor
* invalid cursor
* concurrent synchronization
* device revocation

Verify that durable synchronization does not depend on maintaining an unbounded WebSocket queue.

---

# 14. PRESENCE AND TYPING TESTING

Test Redis-backed ephemeral state where applicable.

Presence:

* online
* offline
* reconnect
* multiple devices
* TTL expiration
* stale connection cleanup
* privacy settings
* blocked users

Typing:

* start
* stop
* timeout
* disconnect cleanup
* duplicate typing events
* unauthorized conversation
* rate limiting

Ensure ephemeral state does not become a false durable source of truth.

---

# 15. KAFKA / REDPANDA EVENT TESTING

If Kafka/Redpanda exists in the repository, test the actual event contracts.

Validate:

* event envelope
* event ID
* event type
* schema version
* aggregate/resource ID
* producer identity
* timestamp
* correlation ID
* trace information where implemented
* payload validation

Test:

* valid events
* malformed events
* unknown versions
* duplicate events
* replay
* out-of-order events where applicable
* consumer retry
* consumer failure
* dead-letter handling
* idempotent consumers
* partitioning assumptions
* ordering guarantees
* offset behavior

Verify consumers do not produce duplicate side effects when receiving duplicate events.

---

# 16. TRANSACTIONAL OUTBOX TESTING

Where transactional outbox is implemented, test:

* domain mutation + outbox record success
* domain mutation rollback
* outbox failure
* publisher retry
* duplicate publication
* consumer idempotency
* ordering
* unpublished record recovery
* malformed outbox payload
* worker crash during publication

Validate that business state cannot be committed while the corresponding required event is silently lost.

---

# 17. BULLMQ / WORKER TESTING

For every meaningful queue/job:

Test:

* enqueue
* execution
* success
* failure
* retry
* backoff
* timeout
* concurrency
* duplicate jobs
* idempotency
* malformed payload
* dead-letter behavior
* permanent failure
* graceful shutdown
* restart recovery

Include workers for:

* media processing
* notification delivery
* search indexing
* event processing
* cleanup
* other actual repository jobs

Do not create tests for jobs that do not exist merely because they are listed in architecture documentation.

---

# 18. MEDIA TESTING

Where media functionality exists, validate:

* upload authorization
* object ownership
* MIME validation
* file-size limits
* content validation
* malicious file rejection
* unsupported formats
* processing failures
* retry behavior
* thumbnail generation
* transcoding
* media status transitions
* cleanup
* expired objects
* secure download
* signed URL expiration
* unauthorized media access

Treat uploaded files as untrusted input.

Test path traversal and metadata/content mismatches where relevant.

---

# 19. NOTIFICATION TESTING

Test:

* device token registration
* token rotation
* invalid token handling
* notification preferences
* privacy behavior
* notification suppression
* notification grouping/collapse
* multiple devices
* logout/session revocation
* push failure
* provider timeout
* retry
* duplicate notification prevention where applicable

Provider integrations should be tested through stable adapters.

Do not send uncontrolled real production notifications from automated tests.

---

# 20. SEARCH TESTING

If Elasticsearch/OpenSearch/search functionality exists:

Test:

* indexing
* update
* deletion
* reindexing
* search query validation
* pagination
* ranking behavior where contractually important
* authorization
* deleted content
* edited content
* private conversation boundaries
* blocked users
* removed members
* eventual consistency
* index failures
* retry
* duplicate indexing
* index version migration

Search must never expose content the authenticated user is not authorized to access.

---

# 21. CALLING AND SIGNALING TESTING

If calling/WebRTC exists:

Test signaling state transitions including:

* call initiation
* ringing
* acceptance
* rejection
* cancellation
* timeout
* busy state
* participant disconnect
* reconnection
* call termination
* unauthorized signaling
* revoked sessions
* invalid participant IDs

Test signaling independently from the actual media transport when appropriate.

Do not fake successful WebRTC media connectivity as if it were real unless the test explicitly targets signaling only.

---

# 22. FRONTEND TESTING

Test the actual web application.

Cover:

* routing
* authentication
* protected routes
* conversation list
* conversation screen
* message rendering
* message composer
* send/retry
* optimistic state
* delivery/read state
* reactions
* replies
* editing
* deletion
* media states
* search
* notifications
* settings
* privacy controls
* blocking/reporting
* groups
* calling UI where implemented
* offline behavior
* reconnect behavior
* stale data recovery
* loading states
* error states
* empty states

Do not test only snapshots.

Prefer behavior-oriented tests.

---

# 23. MOBILE TESTING

If a React Native/Expo application exists, establish comprehensive mobile tests.

Cover:

* app launch
* authentication
* secure session restoration
* navigation
* conversation list
* message screen
* sending
* retries
* offline mode
* reconnect
* push notifications
* deep links
* permissions
* media selection
* camera integration where applicable
* file selection
* upload progress
* background/foreground transitions
* WebSocket lifecycle
* synchronization
* settings
* privacy
* group administration
* calling where implemented

Test platform-specific behavior where practical.

Do not make tests dependent on real personal devices or production services.

---

# 24. COMPONENT AND UI TESTING

For meaningful UI components, test:

* user interaction
* accessibility
* keyboard navigation where applicable
* focus management
* loading states
* disabled states
* error states
* validation
* responsive behavior where testable
* destructive-action confirmation
* privacy-sensitive rendering

Do not create massive brittle snapshot suites.

---

# 25. ACCESSIBILITY TESTING

Introduce automated accessibility validation appropriate to the actual frontend/mobile stack.

Validate:

* semantic controls
* labels
* accessible names
* keyboard navigation
* focus visibility
* form labels
* error announcements
* modal behavior
* dialogs
* touch target usability where measurable
* color-independent information
* reduced-motion behavior where implemented
* screen-reader semantics

Fix accessibility defects discovered during implementation when practical.

---

# 26. SECURITY TESTING

Build automated security regression tests for:

* IDOR/BOLA
* privilege escalation
* authentication bypass
* authorization bypass
* injection
* SQL injection
* XSS
* CSRF where applicable
* SSRF
* command injection
* malicious uploads
* path traversal
* credential stuffing
* brute force
* replay
* WebSocket abuse
* rate-limit bypass
* mass assignment
* unsafe deserialization
* secret leakage
* sensitive data exposure

Do not introduce intentionally exploitable production code simply to make a security test pass.

Where a vulnerability exists, fix the underlying implementation.

---

# 27. RATE LIMITING AND ABUSE TESTING

Validate rate limits for security-sensitive and abuse-prone operations.

Test:

* login
* registration
* message sending
* conversation creation
* group operations
* search
* uploads
* WebSocket events
* typing
* presence
* notification registration
* password/security operations
* other actual sensitive endpoints

Test:

* per-user limits
* per-IP limits
* per-device limits
* distributed behavior where applicable
* Redis failures
* boundary conditions
* reset behavior

Do not make rate limits so aggressive that legitimate integration tests become unreliable.

---

# 28. PRIVACY TESTING

Explicitly validate privacy boundaries.

Ensure private information does not leak through:

* REST APIs
* WebSockets
* logs
* errors
* search
* notifications
* media URLs
* analytics
* caches
* event payloads
* audit records
* client state
* browser storage
* mobile storage

Test deleted/blocked/removed users and conversations.

Verify server-side enforcement.

---

# 29. CACHE TESTING

For Redis-backed functionality test:

* cache hit
* cache miss
* invalidation
* TTL
* stale state
* concurrent access
* Redis unavailable
* Redis recovery
* namespace isolation
* authorization-sensitive cache keys

A cache failure must not silently cause unauthorized access.

---

# 30. IDEMPOTENCY TESTING

Identify every operation requiring idempotency.

Examples:

* message creation
* media processing
* event consumption
* notifications
* search indexing
* queue jobs
* synchronization
* payment/provider operations if present

Test repeated and concurrent execution.

Prove that retrying an operation does not unintentionally duplicate durable side effects.

---

# 31. CONCURRENCY TESTING

Implement targeted concurrency tests for high-risk operations.

At minimum investigate:

* simultaneous message sends
* duplicate sends
* concurrent edits
* concurrent deletes
* concurrent reactions
* concurrent receipts
* concurrent membership changes
* concurrent device registration
* concurrent session revocation
* concurrent queue execution
* concurrent event consumption

Use deterministic synchronization mechanisms rather than unreliable timing sleeps wherever possible.

---

# 32. TEST DATA AND FIXTURES

Create reusable test factories/fixtures.

They must support realistic creation of:

* users
* devices
* sessions
* conversations
* groups
* memberships
* messages
* receipts
* reactions
* media
* notifications
* search documents
* events
* jobs

Test factories must:

* avoid hidden global state
* generate valid domain data
* support overrides
* respect database constraints
* clean up correctly
* remain deterministic where required

Never hardcode real credentials or personal information.

---

# 33. TEST ENVIRONMENT

Create a deterministic test environment.

Where appropriate:

* PostgreSQL test database
* Redis test instance
* Kafka/Redpanda test instance
* BullMQ test infrastructure
* search test infrastructure
* local object storage or safe storage emulator
* mock notification provider
* controlled WebSocket server
* controlled external service adapters

Use containers where that is compatible with the repository.

Tests must not accidentally target production.

Fail fast when required test configuration is missing.

---

# 34. EXTERNAL SERVICE BOUNDARIES

Create proper adapter-level testing.

External services may include:

* AWS S3
* CloudFront
* FCM
* APNs
* Stripe if actually present
* Google Maps if actually present
* Elasticsearch/OpenSearch
* STUN/TURN
* WebRTC infrastructure

Do not call real production resources during normal CI tests.

Use contract-compatible mocks, emulators, local services, or test environments as appropriate.

For critical providers, include integration tests that can be executed explicitly against safe non-production environments.

---

# 35. CONTRACT TESTING

Where contracts exist, establish automated validation between:

* frontend ↔ backend
* mobile ↔ backend
* API ↔ OpenAPI
* WebSocket client ↔ server
* event producers ↔ consumers
* queue producers ↔ workers
* backend ↔ search
* backend ↔ notification adapters
* backend ↔ media processing

Detect incompatible contract changes early.

Contract tests must reflect actual repository schemas.

---

# 36. SCHEMA AND MIGRATION TESTING

Ensure CI can detect:

* invalid Prisma schema
* failed migrations
* migration ordering problems
* destructive migrations
* missing indexes where required by actual constraints
* incompatible schema changes
* generated-client mismatch

Test migrations against a clean database.

Test migrations against a representative existing schema when practical.

Never silently reset a production-like database during validation.

---

# 37. CONFIGURATION TESTING

Validate configuration at startup/test time.

Check:

* required environment variables
* valid URLs
* valid ports
* database configuration
* Redis configuration
* Kafka configuration
* storage configuration
* authentication secrets
* provider configuration
* environment separation

Never require production secrets for ordinary unit tests.

Ensure test configuration cannot accidentally point at production.

---

# 38. OBSERVABILITY TESTING

Where observability exists, validate that critical operations produce the expected telemetry.

Test:

* request correlation
* trace propagation
* structured logging
* important domain metrics
* worker metrics
* WebSocket metrics
* event-processing metrics
* error classification

Ensure tests detect accidental logging of:

* passwords
* access tokens
* refresh tokens
* API keys
* secrets
* private message content
* private media URLs
* unnecessary personal data

---

# 39. FAILURE-PATH TESTING

Do not focus only on successful flows.

For every critical workflow identify:

* dependency timeout
* dependency unavailable
* malformed response
* duplicate request
* retry
* partial failure
* process restart
* connection loss
* stale state
* concurrent mutation
* authorization change during operation
* worker failure
* database failure

Verify graceful and secure behavior.

---

# 40. TESTING ASYNC AND EVENTUAL CONSISTENCY

Where the system is asynchronous, tests must correctly distinguish:

* immediate transactional state
* eventual event publication
* eventual search indexing
* eventual notification delivery
* eventual cache invalidation
* eventual synchronization

Do not use arbitrary long sleeps.

Use deterministic polling with bounded timeouts and clear failure diagnostics.

Tests must fail quickly when an expected state cannot be reached.

---

# 41. CI QUALITY GATES

Integrate the testing architecture into the repository's CI/CD system.

Establish appropriate gates for:

* formatting
* linting
* TypeScript/type checking
* unit tests
* integration tests
* API tests
* contract tests
* database validation
* security tests
* accessibility tests
* frontend tests
* mobile tests where CI-compatible
* build validation

Do not make every expensive test mandatory on every developer commit if that would make the repository impractical.

Instead establish sensible layers such as:

* fast pull-request validation
* full integration validation
* scheduled deeper validation
* release validation

Use the repository's existing CI system if one exists.

---

# 42. TEST REPORTING

Make failures diagnosable.

CI output should provide:

* failing test
* test suite
* useful assertion
* relevant request/response information where safe
* correlation ID where applicable
* database failure context where safe
* worker/event context
* screenshots or traces for UI E2E failures where supported

Never expose secrets in test reports.

---

# 43. FLAKY TEST PREVENTION

Identify and eliminate sources of flakiness:

* uncontrolled timing
* shared state
* random data without reproducibility
* external network dependencies
* test-order dependence
* leaked processes
* leaked sockets
* unfinished workers
* unclosed database connections
* stale Redis state
* stale queues
* asynchronous race conditions

Do not solve flakiness by simply increasing timeouts indefinitely.

If retries are used for infrastructure instability, distinguish test retries from application retries and report them clearly.

---

# 44. COVERAGE

Configure meaningful coverage reporting.

Measure coverage by:

* statements
* branches
* functions
* lines

Do not pursue arbitrary 100% coverage.

Prioritize critical business/security paths.

Identify untested critical logic.

Use coverage thresholds where they provide real protection.

Coverage must not become a substitute for meaningful behavioral tests.

---

# 45. E2E FOUNDATION

Establish the foundation for end-to-end testing across the actual system.

At minimum prepare reliable scenarios for:

### Authentication

Register/login → session → authenticated application.

### Messaging

Login → create/open conversation → send message → receive message → receipt.

### Multi-device

Device A → send → Device B receives/synchronizes.

### Group

Create group → add member → send → member receives → permission enforcement.

### Media

Authorize upload → upload → process → display/download securely.

### Search

Create message → index → search → enforce authorization.

### Notifications

Trigger event → notification pipeline → safe notification behavior.

### Calling

Where implemented, validate signaling lifecycle.

Do not claim E2E coverage for functionality that does not exist.

---

# 46. TEST NAMING AND ORGANIZATION

Organize tests so engineers can locate them quickly.

Use clear naming based on behavior/domain.

Prefer structures such as:

* unit
* integration
* api
* websocket
* events
* queues
* security
* contract
* frontend
* mobile
* e2e
* performance

Adapt this structure to the actual repository rather than blindly imposing it.

---

# 47. TEST DOCUMENTATION

Document:

* how to run unit tests
* how to run integration tests
* how to start test infrastructure
* how to run API tests
* how to run WebSocket tests
* how to run E2E tests
* how to run mobile tests
* how to run security tests
* how to run coverage
* how to debug failures
* required environment variables
* test data cleanup
* CI behavior

Documentation must describe commands that actually work.

---

# 48. IMPLEMENTATION QUALITY

While implementing:

* preserve existing architecture
* avoid unnecessary dependencies
* avoid duplicating utilities
* reuse existing factories
* reuse existing API clients
* reuse shared types
* reuse existing configuration
* preserve backward compatibility
* keep tests maintainable
* keep tests deterministic
* avoid brittle implementation-specific assertions
* use realistic fixtures
* make failure diagnostics useful

If a production defect is discovered while writing tests, fix the underlying defect rather than weakening the test.

---

# 49. TEST SECURITY BOUNDARY

Testing infrastructure itself must be secure.

Never:

* commit secrets
* commit production credentials
* connect automated tests to production
* expose test databases publicly
* store real user data in fixtures
* upload private user data to third-party test services
* print tokens
* print credentials
* log private conversations unnecessarily

Use synthetic data.

---

# 50. ACTUAL REPOSITORY INTEGRATION

All testing must integrate with the actual project.

Before adding new frameworks, determine whether equivalent infrastructure already exists.

Before creating a new test helper, search for an existing compatible helper.

Before creating a new fixture factory, inspect existing factories.

Before changing scripts, preserve existing commands where possible.

Before changing CI, understand the existing pipeline.

Do not create a parallel testing ecosystem merely because it is easier.

---

# 51. REQUIRED IMPLEMENTATION ORDER

Execute the work in this order:

1. Repository and testing audit.
2. Existing framework/configuration analysis.
3. Test environment stabilization.
4. Shared test utilities and factories.
5. Unit testing foundation.
6. Database integration testing.
7. Authentication and authorization tests.
8. REST API tests.
9. Messaging tests.
10. WebSocket tests.
11. Event/transactional-outbox tests.
12. BullMQ worker tests.
13. Redis behavior tests.
14. Media tests.
15. Notification tests.
16. Search tests.
17. Frontend tests.
18. Mobile tests where applicable.
19. Security regression tests.
20. Contract tests.
21. Accessibility tests.
22. CI quality gates.
23. Coverage/reporting.
24. Test documentation.
25. Full validation.

Adapt this order if repository dependencies require a different sequence.

---

# 52. VALIDATION REQUIREMENTS

Before considering this implementation complete:

Run the strongest practical validation available in the repository.

At minimum perform:

* dependency validation
* formatting validation
* lint validation
* TypeScript/type checking
* unit tests
* relevant integration tests
* database tests
* API tests
* WebSocket tests
* event tests
* queue tests
* security regression tests
* frontend tests
* mobile tests where applicable
* contract validation
* production build validation where practical

Fix failures rather than hiding them.

If a test cannot run because of an external dependency or missing environment, document the exact blocker and ensure the test infrastructure fails clearly rather than falsely passing.

---

# 53. FINAL QA AUDIT

After implementation, perform a final audit against the actual repository.

Verify:

* tests are discoverable
* tests execute
* test fixtures are isolated
* test environments are safe
* critical authentication paths are covered
* authorization boundaries are covered
* messaging is covered
* real-time behavior is covered
* synchronization is covered
* asynchronous workflows are covered
* security regressions are covered
* frontend behavior is covered
* mobile behavior is covered where applicable
* contracts are validated
* CI gates are functional
* failures are diagnosable
* no production secrets are present
* no fake tests exist
* no placeholder tests exist
* no tests merely assert that functions exist
* no false completion claims are made

---

# 54. CROSS-SYSTEM CONSISTENCY REQUIREMENT

The QA implementation must remain consistent with the actual repository contracts across:

* PostgreSQL
* Prisma
* Redis
* Kafka/Redpanda
* BullMQ
* REST APIs
* OpenAPI
* WebSockets/Socket.IO
* authentication
* authorization
* synchronization
* media
* S3/CDN
* notifications
* search
* calling
* frontend
* mobile
* configuration
* infrastructure
* observability

If any inconsistency is discovered, determine whether the implementation or test is incorrect by inspecting the actual repository.

Do not invent a third competing contract.

---

# 55. NO FALSE COMPLETION

Do not state that a test suite, feature, security control, integration, or environment is complete unless it actually exists and has been validated in the repository.

Do not report tests as passing if they were not executed.

Do not report coverage percentages that were not generated.

Do not claim external provider validation unless it actually occurred.

Clearly distinguish:

* implemented
* validated
* blocked
* unavailable
* intentionally excluded

---

# 56. FINAL RESPONSE

After completing the implementation, provide a concise engineering summary containing:

1. Testing architecture implemented.
2. Major test suites added or expanded.
3. Security coverage added.
4. Integration infrastructure added.
5. CI changes.
6. Important defects discovered and fixed.
7. Validation commands executed.
8. Actual validation results.
9. Any genuine environmental blockers.
10. Remaining risks that cannot responsibly be validated in the current environment.

Do not substitute the summary for implementation.

The repository itself must contain the completed QA implementation.

# END OF QA VOLUME

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
