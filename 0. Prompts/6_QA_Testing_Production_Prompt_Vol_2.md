# WhatsApp-Style Messaging Platform — QA Prompt — Volume 2

## ROLE

You are the **Staff QA Engineer, Test Architect, End-to-End Test Engineer, Performance Test Engineer, Security Test Engineer, Reliability Test Engineer, Accessibility Test Engineer, Mobile Test Engineer, Web Test Engineer, and Release Validation Engineer** responsible for implementing the advanced cross-platform quality and production-validation layer for the **WhatsApp-style messaging platform**.

This is a **bounded QA implementation milestone**.

Operate with the combined responsibilities of:

* Staff QA Engineer
* QA Architect
* Web E2E Engineer
* Mobile E2E Engineer
* Performance Test Engineer
* Load Test Engineer
* Security Test Engineer
* Reliability Test Engineer
* Distributed Systems Test Engineer
* Accessibility Test Engineer
* Release Validation Engineer
* Technical Writer

Implement real, production-grade QA functionality within the scope of this prompt.

Do not implement unrelated application features merely to satisfy tests.

---

# PROJECT

The project is an independently engineered **production-grade, globally scalable, WhatsApp-style real-time communications platform**.

The completed system includes, where applicable:

* authentication;
* accounts and profiles;
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
* web client;
* mobile clients;
* background workers;
* realtime infrastructure;
* cloud infrastructure;
* observability;
* backup and recovery capabilities.

The technology direction includes:

* Next.js;
* React;
* TypeScript;
* React Native;
* Expo;
* NestJS;
* PostgreSQL;
* Redis;
* WebSockets;
* queues;
* event infrastructure where selected;
* object storage;
* search infrastructure where selected;
* Docker;
* Kubernetes where selected;
* Terraform or equivalent;
* OpenTelemetry;
* metrics/logging/tracing infrastructure.

This milestone validates the **cross-platform user journeys, production-critical system behavior, performance characteristics, accessibility, resilience, and release readiness** of the implemented system.

---

# CURRENT QA SCOPE

Implement:

* web end-to-end test foundation;
* mobile end-to-end test foundation;
* cross-client authentication validation;
* cross-client messaging validation;
* realtime integration validation;
* multi-device synchronization tests;
* media end-to-end validation;
* notification flow validation where testable;
* search flow validation;
* blocking/reporting flow validation;
* group-management flow validation;
* accessibility testing;
* performance testing;
* load testing;
* WebSocket concurrency testing;
* message throughput testing;
* API latency testing;
* failure/recovery testing;
* resilience testing;
* deployment smoke tests;
* environment validation;
* backup/restore validation hooks where applicable;
* release regression suite;
* security-focused end-to-end regression;
* CI/CD quality gates for these suites;
* QA reporting;
* release-readiness documentation.

This is the advanced cross-system QA milestone.

---

# OUT-OF-SCOPE

Do not implement:

* new product capabilities unrelated to testing;
* backend redesign;
* frontend redesign;
* mobile redesign;
* infrastructure redesign solely to make a test easier;
* penetration-testing claims that require an external security engagement;
* production load testing against live users or production data;
* fabricated cloud-provider validation;
* fabricated external notification-provider validation.

Where a test requires infrastructure unavailable in the execution environment, implement the test harness and document the exact environment dependency.

---

# SOURCE-OF-TRUTH MODEL

Inspect the actual repository before changing anything.

Use the repository as the authoritative implementation state for:

* web;
* mobile;
* backend;
* realtime;
* database;
* Redis;
* queues/events;
* media;
* notifications;
* search;
* infrastructure.

Do not assume previous prompts were executed merely because they exist in the prompt sequence.

Do not depend on another AI conversation.

Tests must target actual available behavior.

Do not fabricate endpoints, screens, workflows, or infrastructure solely to make an E2E scenario pass.

---

# IMPLEMENTATION DISCIPLINE

Before implementation:

1. Inspect existing test frameworks.
2. Inspect web application routes and authentication.
3. Inspect mobile navigation and test configuration.
4. Inspect backend APIs.
5. Inspect realtime protocols.
6. Inspect database/test-environment setup.
7. Inspect media and notification test adapters.
8. Inspect existing CI pipelines.
9. Identify which environments support E2E and performance testing.
10. Implement only this QA milestone.

Preserve existing application behavior.

Do not weaken security or production configuration for test convenience.

---

# TEST ENVIRONMENT ARCHITECTURE

Establish a deterministic environment for full-system tests.

Where practical, the environment should include:

* web application;
* mobile test target or emulator/simulator;
* backend;
* PostgreSQL;
* Redis;
* queues/event infrastructure where selected;
* object storage/test adapter;
* search;
* notification test adapter;
* observability components required for validation.

Tests must use synthetic data.

Production credentials and production data are prohibited.

---

# END-TO-END TEST ARCHITECTURE

Establish separate but complementary suites for:

* web E2E;
* mobile E2E;
* API integration;
* realtime integration;
* cross-device workflows;
* system regression.

Use stable test selectors.

Avoid selectors that depend on:

* fragile CSS structure;
* incidental text;
* DOM nesting;
* visual styling classes;

when stable semantic identifiers can be used.

---

# TEST ACCOUNT STRATEGY

Create deterministic synthetic accounts representing:

* normal user;
* second user;
* group administrator;
* group member;
* blocked user;
* moderator/admin where applicable.

Accounts must be created/reset through supported test mechanisms.

Do not hardcode production credentials.

---

# WEB END-TO-END TESTS

Implement critical web journeys including:

## Authentication

Test:

* registration;
* login;
* session restoration;
* logout;
* expired session;
* protected-route enforcement.

## Conversations

Test:

* conversation discovery;
* direct conversation creation;
* group conversation access;
* unread state.

## Messaging

Test:

* send text message;
* receive text message;
* message ordering;
* reply;
* edit;
* delete;
* reaction;
* delivery/read state.

## Realtime

Test:

* WebSocket connection;
* reconnect;
* message delivery;
* synchronization after connection loss.

## Media

Test supported media flows:

* initiate upload;
* upload;
* processing state;
* display;
* failure.

## Search

Test:

* query;
* results;
* result navigation;
* authorization filtering.

## Blocking/reporting

Test:

* block;
* unblock;
* report.

## Groups

Test:

* create group;
* add member;
* role changes;
* remove member;
* leave group where supported.

---

# MOBILE END-TO-END TESTS

Implement equivalent critical journeys for the supported mobile platforms/test environment.

Cover:

* authentication;
* navigation;
* conversation access;
* messaging;
* realtime;
* reconnect;
* synchronization;
* replies;
* reactions;
* editing;
* deletion;
* media;
* notifications;
* search;
* blocking;
* reporting;
* group management;
* logout/account isolation.

Platform-specific behavior must be tested where it materially differs.

---

# CROSS-CLIENT SYNCHRONIZATION TESTS

Validate scenarios such as:

1. Web sends a message.
2. Mobile receives it.
3. Mobile replies.
4. Web receives the reply.
5. One device marks a message read.
6. Another device reflects the read state.
7. One client edits/deletes a message.
8. Other clients converge.

Also test:

* simultaneous operations;
* reconnect during synchronization;
* delayed events;
* duplicate events;
* account logout on one device.

The system must converge to consistent server-authoritative state.

---

# MULTI-DEVICE TESTING

Use at least two simultaneous authenticated client contexts where practical.

Test:

* message creation;
* receipt synchronization;
* read state;
* edits;
* deletion;
* reactions;
* presence;
* logout/session revocation;
* reconnect.

A failure on one device must not corrupt another device's durable state.

---

# REALTIME E2E TESTING

Test the actual WebSocket protocol rather than mocking the transport.

Cover:

* authentication;
* connection;
* heartbeat;
* event delivery;
* command acknowledgement;
* reconnect;
* synchronization;
* sequence gaps;
* duplicate events;
* unauthorized commands;
* rate limiting.

Measure relevant latencies where practical.

---

# MEDIA END-TO-END TESTING

Test real repository-level media flows against a test object-storage implementation or isolated cloud environment.

Verify:

* authorization;
* upload;
* progress;
* processing;
* message association;
* retrieval;
* deletion;
* unauthorized access rejection.

Do not use unrestricted public storage merely to make tests simpler.

---

# NOTIFICATION E2E TESTING

Where the project provides a test notification provider or suitable isolated environment, validate:

* token registration;
* notification generation;
* device targeting;
* deduplication;
* navigation;
* privacy behavior;
* token invalidation.

Separate internal notification-pipeline tests from external provider validation.

Do not claim real Apple/Google provider delivery without actually validating it.

---

# SEARCH E2E TESTING

Validate:

* indexability;
* search;
* pagination;
* conversation/message navigation;
* deletion propagation;
* blocking/privacy filtering;
* unauthorized-result exclusion.

Search may be eventually consistent.

Tests must allow the documented indexing behavior rather than relying on arbitrary sleeps.

---

# GROUP E2E TESTING

Test complete group flows:

* create;
* add member;
* remove member;
* role changes;
* send message;
* message visibility;
* leave group;
* membership loss;
* concurrent administration changes.

Ensure the UI and backend converge after permission changes.

---

# BLOCKING E2E TESTING

Test:

* block;
* attempt interaction after block;
* presence visibility;
* notification suppression where applicable;
* search/privacy effects;
* unblock;
* restored interaction behavior according to the product rules.

Do not assume blocking affects historical state unless the backend defines that behavior.

---

# REPORTING AND MODERATION E2E

Where administration interfaces exist, test:

* report submission;
* moderation queue;
* review;
* action;
* state propagation;
* audit creation.

Test unauthorized administrative access.

---

# ACCESSIBILITY TESTING

Implement automated accessibility testing for applicable web and mobile surfaces.

Validate:

* semantic roles;
* labels;
* focus management;
* keyboard navigation on web;
* touch targets on mobile;
* form errors;
* dialog behavior;
* color contrast where automated tooling supports it;
* live-region behavior;
* screen-reader-oriented semantics.

Accessibility tests should focus on meaningful user workflows rather than every decorative component.

---

# PERFORMANCE TESTING

Establish performance tests for:

* API latency;
* message creation latency;
* message retrieval;
* conversation loading;
* realtime delivery;
* synchronization;
* search;
* media-upload initiation;
* notification scheduling.

Measure:

* p50;
* p95;
* p99 where meaningful;
* error rates;
* throughput.

Do not invent target values without an engineering basis.

Use configured performance objectives from the architecture and environment where available.

---

# LOAD TESTING

Create controlled load-test scenarios for:

* HTTP API;
* message submission;
* message retrieval;
* WebSocket connection concurrency;
* realtime fan-out;
* synchronization;
* queue processing.

Test representative traffic patterns:

* steady state;
* bursts;
* reconnect storms;
* fan-out bursts;
* queue backlog.

Do not point load tests at production unless the environment has explicit authorization and isolation.

---

# WEBSOCKET CONCURRENCY TESTING

Test:

* high connection counts appropriate to the test environment;
* connection churn;
* reconnect storms;
* simultaneous message delivery;
* heartbeat load;
* synchronization after mass reconnect.

Measure:

* connection success;
* connection latency;
* error rate;
* memory;
* CPU;
* event latency;
* dropped connections.

Do not equate test-environment capacity directly with global production capacity.

---

# MESSAGE THROUGHPUT TESTING

Measure message throughput under:

* single conversation load;
* many independent conversations;
* fan-out;
* large groups;
* burst traffic.

Observe:

* API latency;
* PostgreSQL utilization;
* Redis;
* event/queue lag;
* worker utilization;
* WebSocket delivery latency.

---

# DATABASE PERFORMANCE TESTING

Validate important high-volume access patterns:

* recent message retrieval;
* historical pagination;
* conversation listing;
* membership lookup;
* receipt operations;
* search-related transactional queries.

Check:

* query plans;
* index usage;
* connection saturation;
* lock contention;
* slow queries.

Do not change production indexes merely because a benchmark is slow without understanding the workload.

---

# QUEUE PERFORMANCE TESTING

Measure:

* queue depth;
* throughput;
* job latency;
* retry volume;
* worker utilization;
* dead-letter growth.

Exercise:

* media jobs;
* notification jobs;
* indexing jobs;
* analytics jobs.

---

# FAILURE AND RESILIENCE TESTING

Create controlled tests for:

* database failure;
* Redis failure;
* queue failure;
* event-broker failure;
* search failure;
* object-storage failure;
* notification-provider failure;
* WebSocket gateway restart.

Validate documented degraded behavior.

The objective is not to make every feature work normally during every outage.

---

# DEPLOYMENT SMOKE TESTS

After deployment to a test/staging environment, validate:

* application health;
* authentication;
* API reachability;
* WebSocket reachability;
* database connectivity;
* Redis connectivity;
* queue processing;
* media storage;
* search;
* notification pipeline where available;
* basic messaging workflow.

Smoke tests must be fast enough for release pipelines.

---

# RELEASE REGRESSION SUITE

Create a targeted release suite containing the highest-value workflows.

At minimum:

* login;
* conversation load;
* send message;
* receive message;
* reconnect;
* synchronization;
* media upload;
* search;
* group operation;
* block/report;
* logout.

The release suite must be deterministic enough for CI/staging use.

---

# SECURITY E2E REGRESSION

Validate end-to-end protections against:

* unauthorized conversation access;
* unauthorized message operations;
* broken group permissions;
* unauthorized media access;
* blocked-user interaction;
* privileged endpoint access;
* malicious deep links;
* token leakage;
* unsafe notification navigation.

Do not claim a full penetration test from automated regression tests.

---

# DATA INTEGRITY TESTING

Validate that critical user workflows preserve durable consistency.

Examples:

* no duplicate logical message after retry;
* no orphaned attachment relation where prohibited;
* no unauthorized membership after concurrent changes;
* no inconsistent receipt progression;
* no notification duplication beyond defined semantics;
* no stale search exposure after deletion beyond documented eventual-consistency bounds.

---

# BACKUP AND RESTORE VALIDATION

Where the infrastructure supports a test restore environment, validate:

* database backup restore;
* critical schema availability;
* representative data integrity;
* application connectivity;
* required dependent service recovery.

Where restore requires external cloud permissions unavailable in the current environment, provide the executable validation procedure and accurately report the blocker.

Do not claim the restore was successful without actually performing it.

---

# DISASTER-RECOVERY TESTING HOOKS

Implement repeatable test procedures for:

* application-region failure;
* database failover;
* Redis failover;
* object-storage recovery;
* event infrastructure recovery.

The actual disaster drill may be environment-dependent.

The repository should contain the tests/runbooks necessary to execute the drill safely.

---

# TEST DATA PRIVACY

All automated cross-system testing must use synthetic data.

Never:

* copy production messages into tests;
* use real user credentials;
* use real notification tokens;
* store production secrets;
* expose real private media.

---

# TEST FLAKINESS MANAGEMENT

Detect and eliminate flaky tests.

Do not "fix" flakes by:

* adding arbitrary long sleeps;
* increasing retries indefinitely;
* disabling assertions;
* marking tests as skipped;
* widening timeouts without understanding the cause.

Prefer deterministic synchronization signals.

Track known environmental flakes separately from product defects.

---

# TEST PARALLELIZATION

Ensure parallel E2E and integration suites isolate:

* accounts;
* conversations;
* database state;
* files/media;
* queues;
* Redis keys;
* ports;
* test environments.

Do not allow one test to modify another test's user/account state.

---

# CI/CD QUALITY GATES

Integrate the appropriate layers into CI/CD:

* fast unit/contract tests on pull requests;
* integration tests on pull requests or merge pipelines;
* release E2E tests before deployment;
* performance tests on scheduled or dedicated environments;
* security regression tests continuously;
* deployment smoke tests after staging deployment.

Do not run extremely expensive load tests on every pull request unless the project explicitly supports the cost and execution time.

---

# QUALITY REPORTING

Generate meaningful QA reports containing:

* test suite;
* environment;
* commit/version;
* tests executed;
* pass/fail;
* duration;
* performance metrics;
* known failures;
* environmental blockers;
* regression status.

Reports must distinguish:

* product defect;
* infrastructure failure;
* unavailable external dependency;
* test harness failure.

---

# RELEASE READINESS

Create a release-validation checklist based on actual project requirements.

It should verify:

* tests;
* security;
* migrations;
* configuration;
* observability;
* deployment health;
* rollback;
* realtime;
* database;
* queues;
* media;
* notifications;
* client compatibility.

Do not mark a release ready merely because a build succeeded.

---

# DOCUMENTATION

Create/update QA documentation covering:

* E2E setup;
* browser test execution;
* mobile test execution;
* synthetic test accounts;
* environment setup;
* load testing;
* performance testing;
* WebSocket load;
* resilience testing;
* accessibility testing;
* release smoke tests;
* backup/restore validation;
* test reporting;
* flaky-test policy;
* CI quality gates.

Documentation must reflect actual tooling.

---

# NO FALSE VALIDATION

Never claim:

* production-scale capacity;
* real provider delivery;
* disaster recovery success;
* zero downtime;
* security certification;
* penetration-test completion;

unless that validation actually occurred.

Automated tests are evidence for the behavior they cover, not proof of properties they did not measure.

---

# VALIDATION

Before completion:

* execute the relevant E2E suites;
* execute critical release regression tests;
* execute accessibility tests;
* execute applicable performance tests;
* execute security regression tests;
* validate CI pipelines;
* validate staging smoke tests where an environment is available;
* validate backup/restore where permitted;
* inspect generated QA reports.

Fix defects discovered within this prompt's scope when they are caused by the test infrastructure or clearly attributable to a testable application defect that must be corrected for the planned QA milestone.

Do not silently modify unrelated functionality.

---

# COMPLETION REPORT

After implementation, report:

* files created;
* files modified;
* files deleted, if any;
* web E2E suites;
* mobile E2E suites;
* cross-client tests;
* realtime tests;
* synchronization tests;
* media tests;
* notification tests;
* search tests;
* group tests;
* blocking/reporting tests;
* accessibility tests;
* security regression tests;
* performance tests;
* load-test scenarios;
* resilience/failure tests;
* deployment smoke tests;
* release regression suite;
* backup/restore validation;
* CI/CD changes;
* reports generated;
* tests actually executed;
* tests passed;
* tests failed;
* environmental blockers;
* known limitations.

Do not claim validation that could not actually be performed.

---

# DEFINITION OF DONE

This QA milestone is complete only when:

* web E2E coverage exists for critical user journeys;
* mobile E2E coverage exists for critical user journeys;
* cross-client synchronization is tested;
* realtime behavior is tested end-to-end;
* media flows are tested;
* notification flows are tested where the environment permits;
* search flows are tested;
* group-management flows are tested;
* blocking/reporting flows are tested;
* accessibility validation exists;
* performance tests exist;
* load tests exist for the major scalability dimensions;
* resilience/failure tests exist;
* deployment smoke tests exist;
* release regression suite exists;
* security E2E regression exists;
* backup/restore validation is executable where infrastructure permits;
* CI/CD integrates appropriate quality gates;
* QA reporting is implemented;
* test data is synthetic and isolated;
* no critical QA test is a placeholder;
* no false validation claims are made;
* the final project can be evaluated systematically before release.

This Definition of Done applies only to **QA Prompt — Volume 2**.

It is the final planned QA milestone and does not authorize creation of an additional unplanned QA volume.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as **QA Prompt — Volume 2 only**.

Inspect the repository before making changes.

Implement only the cross-platform E2E, realtime, synchronization, media, notification, search, group, blocking/reporting, accessibility, performance, load, resilience, release-validation, and QA-gate scope defined here.

Do not implement unrelated product features merely to satisfy tests.

Do not redesign backend, frontend, mobile, or infrastructure functionality unless a concrete defect discovered within this QA scope requires a narrowly bounded correction.

Do not invent another QA volume or project phase.

Do not depend on previous AI responses.

Use the repository and actual implementation as the source of truth.

Preserve compatible behavior.

Implement real production-grade QA infrastructure and tests within scope.

Run appropriate validation.

Inspect the final diff and test results.

Clearly distinguish executed validation from tests that require unavailable external infrastructure.

Provide the required completion report and accurately report what was implemented, executed, passed, failed, and could not be validated.
