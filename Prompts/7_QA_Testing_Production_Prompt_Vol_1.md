# WhatsApp-Style Messaging Platform — QA Prompt — Volume 1

## ROLE

You are the **Staff QA Engineer, Test Architect, Security Test Engineer, Performance Test Engineer, Reliability Test Engineer, Distributed Systems Test Engineer, Accessibility Test Engineer, and Quality Automation Engineer** responsible for establishing the comprehensive automated testing foundation for the **WhatsApp-style messaging platform**.

This is a **bounded QA implementation milestone**.

Operate with the combined responsibilities of:

* Staff QA Engineer
* Test Architect
* QA Automation Engineer
* Backend Test Engineer
* Frontend Test Engineer
* Mobile Test Engineer
* Distributed Systems Test Engineer
* Security Test Engineer
* Performance Test Engineer
* Reliability Test Engineer
* Accessibility Test Engineer
* Technical Writer

Implement real, production-grade QA infrastructure, automated tests, contract validation, and quality gates within the scope of this prompt.

Do not redesign application functionality.

Do not implement unrelated product features merely to make tests pass.

---

# PROJECT

The project is an independently engineered **production-grade, globally scalable, WhatsApp-style real-time communications platform**.

The completed system includes, where applicable:

* authentication and account management;
* profiles;
* devices and sessions;
* direct conversations;
* groups;
* messaging;
* message synchronization;
* reactions;
* delivery/read state;
* typing indicators;
* presence;
* media;
* notifications;
* search;
* blocking;
* reporting;
* moderation;
* administration;
* analytics;
* background processing;
* realtime communication;
* web client;
* mobile clients;
* cloud infrastructure;
* observability;
* disaster recovery.

The technology direction includes:

* NestJS;
* TypeScript;
* PostgreSQL;
* Prisma or equivalent;
* Redis;
* WebSockets;
* queues;
* event infrastructure where selected;
* object storage;
* search where selected;
* Next.js/React;
* React Native/Expo;
* Docker;
* Kubernetes where selected;
* Terraform or equivalent;
* OpenTelemetry;
* Prometheus/Grafana and centralized logging where selected.

The test architecture must validate actual behavior across these components.

---

# CURRENT QA SCOPE

This milestone establishes the **core automated quality foundation and backend contract/integration testing layer**.

Implement:

* QA repository/test structure;
* shared test configuration;
* deterministic test environments;
* backend unit-test coverage for critical domains;
* backend integration tests;
* database integration tests;
* migration tests;
* API contract tests;
* authentication/authorization tests;
* messaging tests;
* realtime protocol tests;
* event contract tests where event infrastructure exists;
* queue/job tests;
* Redis behavior tests;
* media-contract tests;
* notification-contract tests;
* search-contract tests;
* blocking/reporting/moderation authorization tests;
* security regression tests for critical backend attack surfaces;
* test fixtures/factories;
* isolated test data management;
* deterministic test cleanup;
* CI quality gates for the covered tests;
* test reporting;
* QA documentation.

This milestone establishes the backend-centered quality foundation.

---

# OUT-OF-SCOPE

Do not implement:

* production application features solely to satisfy tests;
* full browser E2E coverage;
* full mobile E2E coverage;
* full-scale load testing;
* disaster-recovery drills;
* chaos testing;
* penetration testing engagement;
* production cloud testing;
* final accessibility audit of every client;
* complete visual regression infrastructure.

Those responsibilities belong to later planned QA work where applicable.

Do not weaken production code merely to make tests pass.

Do not replace real integrations with excessive mocks when an integration test is appropriate.

---

# SOURCE-OF-TRUTH MODEL

Inspect the actual repository before creating or modifying tests.

The repository is authoritative for:

* application structure;
* APIs;
* database schemas;
* migrations;
* WebSocket protocol;
* event contracts;
* queues;
* Redis usage;
* media contracts;
* notifications;
* search;
* moderation;
* authentication;
* authorization.

Do not assume previous prompts were executed.

Do not rely on another AI conversation.

Tests must target the actual implementation that exists.

Where functionality described by this prompt is absent from the repository, do not create fictional passing tests for nonexistent behavior.

Instead, implement tests for the actual in-scope behavior and accurately report missing prerequisites.

---

# TEST ARCHITECTURE

Establish a clear hierarchy among:

* unit tests;
* integration tests;
* contract tests;
* database tests;
* realtime tests;
* queue tests;
* security regression tests;
* higher-level E2E tests where later prompts will own them.

Every test suite must have clear ownership.

Avoid testing the same behavior at every layer without a reason.

---

# TEST ENVIRONMENT

Create deterministic test configuration supporting:

* isolated database;
* isolated Redis;
* isolated queues;
* event infrastructure where practical;
* object-storage emulator or test adapter where appropriate;
* search test instance or contract adapter where appropriate.

Test environments must never use production data or production credentials.

---

# TEST DATA ISOLATION

Test data must be isolated.

Implement:

* factories;
* fixtures;
* deterministic identifiers where helpful;
* test cleanup;
* transaction rollback strategies where appropriate;
* database reset strategy appropriate to test type.

Tests must not depend on execution order.

Do not share mutable state between unrelated test cases.

---

# TEST FACTORIES

Create reusable test factories for major entities such as:

* User;
* Profile;
* Device;
* Session;
* Conversation;
* ConversationMember;
* Group;
* Message;
* Reaction;
* MediaAsset;
* Notification;
* Report;
* AuditEvent.

Factories must produce valid domain data according to actual schema constraints.

Do not create unrealistic fixtures that bypass important validation.

---

# UNIT TESTS

Implement unit tests for critical domain behavior.

At minimum cover appropriate:

* authentication logic;
* session logic;
* authorization;
* conversation rules;
* membership permissions;
* message validation;
* idempotency logic;
* message ordering;
* reaction rules;
* presence rules;
* media lifecycle transitions;
* notification eligibility;
* blocking;
* reporting;
* moderation authorization.

Unit tests must test business behavior rather than only getters or trivial wrappers.

---

# AUTHENTICATION TESTING

Test:

* registration;
* valid authentication;
* invalid credentials;
* disabled accounts;
* revoked sessions;
* expired sessions;
* refresh behavior;
* logout;
* multi-device sessions;
* repeated failures;
* rate limiting where implemented.

Verify that secrets are never returned by APIs.

Verify that security-sensitive errors do not create unintended account enumeration.

---

# AUTHORIZATION TESTING

Create systematic authorization tests for:

* user-owned resources;
* conversation membership;
* group administration;
* message operations;
* media access;
* reports;
* moderation;
* administrative operations.

Explicitly test IDOR-style attacks.

For protected resources, test:

* owner access;
* authorized member access;
* unauthorized user access;
* removed member access;
* privileged role access;
* insufficient role access.

---

# DATABASE TESTING

Test critical database guarantees:

* uniqueness;
* foreign keys;
* constraints;
* transactions;
* concurrent writes;
* migration correctness;
* indexes for important access patterns where practical.

Do not treat ORM-level validation as a substitute for database constraints.

---

# MIGRATION TESTING

Validate:

* clean migration from an empty database;
* migration ordering;
* migration reproducibility;
* compatibility with representative existing data;
* safe handling of important schema changes.

Where migrations are intentionally irreversible, document that behavior.

Do not silently rewrite historical migrations that may already have been deployed.

---

# MESSAGE TESTING

Create integration tests for:

* message creation;
* client-message idempotency;
* concurrent duplicate submissions;
* ordering;
* message retrieval;
* cursor pagination;
* editing;
* deletion;
* replies;
* reactions;
* delivery receipts;
* read receipts.

Verify that unauthorized users cannot:

* read;
* edit;
* delete;
* react to

messages outside their permitted scope.

---

# REALTIME TESTING

Test the WebSocket protocol as an actual protocol.

Cover:

* handshake;
* authentication;
* connection lifecycle;
* heartbeat;
* disconnect;
* reconnect;
* send_message;
* acknowledgements;
* event delivery;
* duplicate events;
* ordering;
* sequence gaps;
* synchronization;
* authorization.

Do not test only the underlying service methods while ignoring the actual transport contract.

---

# REALTIME SECURITY TESTING

Attempt unauthorized operations through the realtime interface.

Test:

* forged user IDs;
* forged device IDs;
* unauthorized conversation subscriptions;
* unauthorized message sends;
* unauthorized acknowledgements;
* malformed event envelopes;
* oversized frames;
* connection flooding;
* rate-limit bypass attempts.

The realtime gateway must enforce server-side authorization just like HTTP APIs.

---

# SYNCHRONIZATION TESTING

Test:

* first synchronization;
* incremental synchronization;
* reconnect;
* missed events;
* stale checkpoint;
* invalid checkpoint;
* sequence gap;
* overlapping synchronization and realtime events;
* deletion propagation;
* edit propagation;
* receipt synchronization.

The resulting server state must be deterministic.

---

# REDIS TESTING

Test Redis-backed functionality such as:

* rate limiting;
* presence;
* typing state;
* realtime coordination;
* cache invalidation where applicable.

Test Redis failure behavior.

Determine whether each operation:

* fails closed;
* degrades gracefully;
* retries;
* falls back;
* remains available without Redis.

Do not permit Redis failure to corrupt authoritative durable state.

---

# QUEUE TESTING

Test background jobs for:

* valid payload;
* invalid payload;
* idempotency;
* retries;
* backoff;
* timeout;
* duplicate delivery;
* dead-letter behavior;
* graceful worker shutdown.

Critical jobs must not silently disappear.

---

# EVENT CONTRACT TESTING

Where event infrastructure exists, validate:

* event envelope;
* event type;
* event version;
* payload schema;
* required metadata;
* producer behavior;
* consumer compatibility.

Test duplicate events.

Test unknown future-compatible fields where appropriate.

Test that breaking changes are versioned instead of silently introduced.

---

# OUTBOX TESTING

If the repository contains a transactional outbox, test:

* database commit and outbox creation atomicity;
* publication retry;
* duplicate publication;
* failed publication;
* recovery after worker restart;
* idempotent consumer behavior.

Verify that application state is not falsely reported as externally propagated when publication has not succeeded.

---

# MEDIA CONTRACT TESTING

Test:

* upload-intent authorization;
* invalid metadata;
* size limits;
* ownership;
* lifecycle transitions;
* signed-access generation;
* deletion;
* duplicate processing jobs;
* processing failure.

Do not require a real production object-storage account for every test.

Use a realistic local/emulated/integration environment where appropriate.

---

# NOTIFICATION CONTRACT TESTING

Test:

* push-token registration;
* token invalidation;
* notification eligibility;
* privacy preferences;
* deduplication;
* retryable provider failure;
* permanent provider failure;
* multi-device targeting.

Do not treat provider mocks as evidence that the external provider itself behaves correctly.

Separate provider-adapter tests from end-to-end provider validation.

---

# SEARCH CONTRACT TESTING

Test:

* indexing;
* updates;
* deletion;
* authorization filtering;
* query limits;
* pagination;
* reindex jobs;
* stale index behavior;
* provider timeout.

Search failures must not break core message persistence.

---

# BLOCKING AND REPORTING TESTING

Test:

* block;
* unblock;
* duplicate block;
* concurrent block/unblock;
* message restrictions;
* presence restrictions;
* notification restrictions;
* report creation;
* report authorization;
* report rate limiting;
* workflow transitions.

Verify that blocking enforcement is applied consistently across the relevant domains.

---

# MODERATION TESTING

Test:

* privileged action;
* unauthorized action;
* invalid transitions;
* idempotent actions;
* audit creation;
* realtime propagation where required;
* search propagation where required.

Test privilege escalation attempts.

---

# AUDIT TESTING

Verify that privileged actions generate the expected audit records.

Test:

* actor;
* target;
* action;
* timestamp;
* correlation ID;
* reason/context where applicable.

Verify that ordinary application flows cannot arbitrarily modify historical audit records.

---

# SECURITY REGRESSION SUITE

Create reusable security regression tests for high-risk backend vulnerabilities.

Include where relevant:

* IDOR;
* broken authorization;
* privilege escalation;
* injection;
* malformed input;
* oversized payloads;
* rate-limit bypass;
* authentication bypass;
* token leakage;
* unsafe error disclosure;
* malicious upload handling;
* unauthorized WebSocket operations.

These tests should be easy to run in CI.

---

# API CONTRACT TESTS

Validate actual HTTP API behavior:

* routes;
* methods;
* status codes;
* request validation;
* response structure;
* error structure;
* authentication;
* authorization;
* pagination;
* idempotency.

Do not test undocumented behavior as though it were a stable contract.

---

# API COMPATIBILITY TESTING

Where web and mobile clients consume the same APIs, create contract validation that detects incompatible server changes.

At minimum validate:

* field names;
* required fields;
* enum values;
* error codes;
* pagination shape;
* authentication behavior.

The purpose is to catch breaking changes before client deployment.

---

# OBSERVABILITY TESTING

Verify that critical operations emit useful:

* logs;
* metrics;
* traces;
* correlation IDs;
* error information.

Also verify that sensitive information is not emitted.

Test that:

* passwords;
* access tokens;
* refresh tokens;
* private cryptographic material;
* message bodies where inappropriate

do not appear in ordinary telemetry.

---

# FAILURE TESTING

Build integration tests for important failure conditions:

* database outage;
* Redis outage;
* queue outage;
* event broker outage where applicable;
* object storage failure;
* search outage;
* notification provider outage.

Verify the documented degraded behavior.

Do not require every subsystem to remain fully available under every dependency failure.

---

# CONCURRENCY TESTING

Test concurrent behavior for:

* duplicate message submission;
* conversation creation;
* membership changes;
* reactions;
* message editing;
* deletion;
* receipt updates;
* notification deduplication;
* moderation actions.

The tests should expose race conditions rather than merely repeating single-threaded happy paths.

---

# TEST TIME DETERMINISM

Avoid flaky time-based assertions.

Use:

* controlled clocks;
* injectable time providers;
* deterministic test timestamps;

where appropriate.

Do not rely on arbitrary sleeps as synchronization mechanisms when deterministic signals are available.

---

# RANDOMNESS CONTROL

Where random IDs, retry jitter, or probabilistic behavior affects testing, make it controllable.

Tests should be reproducible.

Do not make correctness depend on random timing.

---

# TEST PARALLELIZATION

Tests must be safe to run in parallel where practical.

Do not share:

* global mutable database state;
* global Redis keys;
* static ports;
* mutable filesystem directories

without isolation.

---

# CI QUALITY GATES

Integrate appropriate QA gates into CI.

At minimum include:

* lint;
* type checking;
* unit tests;
* integration tests;
* API contract tests;
* security regression tests;
* build validation.

The CI system must fail when critical tests fail.

Do not silently continue after a failed test suite and report success.

---

# TEST REPORTING

Produce machine-readable and human-readable test results where supported.

CI should preserve:

* failed test names;
* stack traces;
* test duration;
* artifacts;
* coverage where configured.

Coverage is a diagnostic signal, not the sole definition of quality.

---

# COVERAGE POLICY

Measure meaningful coverage for critical domains.

Prioritize behavior coverage in:

* authentication;
* authorization;
* messaging;
* realtime;
* synchronization;
* media security;
* notifications;
* moderation;
* data integrity.

Do not chase arbitrary global percentages at the expense of high-value tests.

---

# TEST FIXTURES AND PRIVACY

Test fixtures must contain synthetic data only.

Never use:

* production messages;
* real access tokens;
* real user credentials;
* real phone numbers;
* production media;
* production secrets.

---

# QA DOCUMENTATION

Create QA documentation covering:

* test architecture;
* running unit tests;
* running integration tests;
* starting test dependencies;
* database reset strategy;
* fixtures/factories;
* CI gates;
* debugging failures;
* test isolation;
* security regression tests;
* contract tests.

Documentation must match the repository.

---

# VALIDATION

Before completion:

* run unit tests;
* run integration tests;
* run database tests;
* run API contract tests;
* run realtime tests;
* run queue/event tests where available;
* run security regression tests;
* run linting;
* run type checking;
* validate CI workflows;
* inspect test output.

Identify and fix flaky or nondeterministic tests within this scope.

Do not simply disable failing tests.

---

# NO FALSE TEST COMPLETENESS

Do not create tests that only assert mocked behavior while leaving the actual critical path untested.

Do not claim a feature is validated merely because a controller test passes.

Use appropriate integration depth for critical behavior.

Do not create tests that intentionally bypass the production authorization logic.

---

# NO FAKE TEST INFRASTRUCTURE

Do not create fake test suites that never execute meaningful assertions.

Do not create placeholder test files with empty test bodies.

Do not use "TODO" tests to represent missing coverage within this scope.

Where a dependency genuinely cannot be tested in the current environment, document the limitation rather than creating a fake passing substitute.

---

# COMPLETION REPORT

After implementation, report:

* files created;
* files modified;
* files deleted, if any;
* test infrastructure changes;
* factories/fixtures;
* unit-test coverage;
* integration-test coverage;
* database tests;
* API contract tests;
* realtime tests;
* synchronization tests;
* Redis tests;
* queue/event tests;
* media tests;
* notification tests;
* search tests;
* blocking/reporting/moderation tests;
* security regression tests;
* CI changes;
* tests executed;
* tests passed;
* tests failed;
* validation performed;
* flaky tests identified and resolved;
* known gaps;
* environmental blockers.

Do not claim a test passed if it was not actually executed.

---

# DEFINITION OF DONE

This QA milestone is complete only when:

* a coherent QA test structure exists;
* deterministic test configuration exists;
* test data is isolated;
* reusable factories/fixtures exist;
* critical backend domain behavior is covered;
* authentication and authorization are tested;
* database constraints and migrations are tested;
* API contracts are tested;
* realtime protocol is tested;
* synchronization is tested;
* Redis failure behavior is tested where applicable;
* queue and event behavior is tested where applicable;
* media/security contracts are tested;
* notification contracts are tested;
* search contracts are tested;
* blocking/reporting/moderation behavior is tested;
* audit behavior is tested;
* security regressions have automated coverage;
* CI quality gates execute relevant tests;
* test reporting is available;
* no critical tests are placeholders;
* no intentional implementation gaps remain within scope.

This Definition of Done applies only to **QA Prompt — Volume 1**.

It does not require full browser/mobile E2E, load, chaos, disaster-recovery, or comprehensive visual testing.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as **QA Prompt — Volume 1 only**.

Inspect the repository before making changes.

Implement only the QA foundation, backend integration/contract testing, security regression testing, deterministic fixtures, and CI quality-gate scope defined here.

Do not implement new product functionality merely to satisfy tests.

Do not redesign backend, frontend, mobile, or infrastructure behavior.

Do not invent another QA volume or project phase.

Do not depend on previous AI responses.

Use the repository and actual implementation as the source of truth.

Preserve compatible existing behavior.

Implement real production-grade QA infrastructure and tests within scope.

Run the appropriate test suites.

Inspect the final diff and test results.

Provide the required completion report and accurately report what was implemented, executed, passed, failed, and could not be validated.
