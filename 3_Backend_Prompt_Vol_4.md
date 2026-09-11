# WHATSAPP — BACKEND VOLUME 4

## ROLE

Act as a Principal Backend Engineer, Staff Backend Engineer, Distributed Systems Engineer, Security Engineer, Privacy Engineer, Compliance Engineer, Database Architect, SRE, QA Engineer, Performance Engineer, Abuse Prevention Engineer, and Technical Writer working as one senior engineering team.

You are implementing the production security, privacy, moderation, administration, compliance, analytics, retention, reliability, and backend hardening layer of a global communication platform comparable in capability and reliability to WhatsApp, Telegram, Signal, Messenger, Discord, and Microsoft Teams.

Do not teach. Do not provide tutorials. Do not produce pseudo-code. Perform the implementation directly in the repository.

Build production-grade software suitable for a globally distributed communication platform operating at very large scale.

---

# PROJECT

Implement the backend systems responsible for:

* Privacy controls
* User blocking
* Reporting
* Abuse prevention
* Moderation
* Administrative operations
* Administrative authorization
* Security administration
* Account lifecycle controls
* Data retention
* Data deletion
* Data export foundations
* Privacy-preserving analytics
* Platform analytics
* Operational analytics
* Audit systems
* Compliance-oriented controls
* Abuse detection foundations
* Fraud and spam prevention foundations
* Account restrictions
* Rate-limit escalation
* Feature flags
* Backend operational controls
* Data lifecycle management
* Disaster-recovery-aware backend behavior
* Production hardening
* Performance hardening
* Reliability hardening

The platform must support:

* Hundreds of millions of registered users
* Tens of millions of daily active users or greater
* Large global traffic volumes
* Very large concurrent sessions
* High message throughput
* Large media volumes
* Multiple devices per user
* Multi-region operation
* Strict privacy requirements
* High security requirements
* Abuse resistance
* Administrative controls
* Auditable operational behavior

Do not implement frontend or mobile application code in this volume.

---

# TECHNOLOGY DIRECTION

Use the following backend technology direction unless the existing repository contains a technically justified implementation that must be preserved:

* Node.js
* TypeScript
* NestJS
* PostgreSQL
* Prisma
* Redis
* BullMQ
* Kafka or Redpanda
* Elasticsearch or OpenSearch
* S3-compatible object storage
* Docker
* Kubernetes
* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo
* Jest
* Supertest

PostgreSQL remains authoritative for durable transactional data.

Redis is used for ephemeral distributed state and coordination.

Kafka or Redpanda is used for durable event distribution where appropriate.

Analytics must not interfere with transactional workloads.

Search remains a derived data system.

Object storage remains authoritative for binary media.

---

# SOURCE OF TRUTH

The repository is the source of truth.

Before modifying anything:

1. Inspect the complete backend.
2. Inspect account and authentication systems.
3. Inspect sessions and devices.
4. Inspect conversations and messaging.
5. Inspect groups.
6. Inspect media.
7. Inspect notifications.
8. Inspect search.
9. Inspect Redis.
10. Inspect event and queue infrastructure.
11. Inspect database schema and migrations.
12. Inspect API contracts.
13. Inspect authorization.
14. Inspect existing security controls.
15. Inspect tests.
16. Inspect observability.
17. Inspect infrastructure configuration.
18. Inspect documentation.

Preserve correct existing behavior.

Do not blindly rewrite existing modules.

Do not redesign unrelated domains.

---

# 1. BACKEND IMPLEMENTATION BOUNDARY

Implement the production hardening and platform-control layer.

This volume owns:

* Privacy
* Blocking
* Reporting
* Moderation
* Abuse prevention
* Spam prevention
* Administrative APIs
* Administrative authorization
* Security auditing
* Data retention
* Data deletion
* Data export foundations
* Account restrictions
* Abuse signals
* Privacy-preserving analytics
* Operational analytics
* Feature flags
* Platform configuration
* Compliance-oriented workflows
* Performance hardening
* Reliability hardening
* Operational safeguards

Do not redesign the messaging system.

Do not redesign media storage.

Do not redesign authentication unless security defects require changes.

Do not implement frontend or mobile applications.

---

# 2. PRIVACY DOMAIN

Implement a comprehensive privacy domain.

Support configurable controls for areas such as:

* Profile visibility
* Last-seen visibility
* Online presence visibility
* Read receipts
* Typing visibility
* Profile photo visibility
* Group invitation permissions
* Contact discoverability
* Message preview preferences
* Notification privacy
* Search discoverability

Privacy settings must be:

* Persisted
* Validated
* Authorized
* Versionable where appropriate
* Consistently enforced across APIs
* Consistently enforced across WebSockets
* Consistently enforced across notifications
* Consistently enforced across search

Do not enforce privacy only on clients.

---

# 3. PRIVACY POLICY EVALUATION

Create reusable server-side privacy evaluation mechanisms.

Privacy checks must support:

* Requesting user
* Target user
* Relationship
* Block status
* Conversation membership
* Target privacy setting
* Resource sensitivity
* Administrative privileges where legitimately applicable

Avoid duplicating privacy logic independently in every controller.

Do not allow one API to expose information that another API correctly hides.

---

# 4. BLOCKING

Implement user blocking.

Support:

* Block
* Unblock
* Block status lookup
* Blocked-user listing
* Message interaction restrictions
* Conversation interaction restrictions
* Search restrictions
* Presence restrictions
* Contact restrictions
* Notification restrictions

Blocking must take effect consistently across the platform.

A blocked relationship must be respected by:

* REST APIs
* WebSockets
* Search
* Notifications
* Presence
* Contact discovery
* Messaging
* Group interactions where applicable

Do not allow blocked users to bypass restrictions by changing clients or transport protocols.

---

# 5. REPORTING

Implement abuse-reporting infrastructure.

Support reports for:

* Users
* Messages
* Groups
* Media
* Profiles
* Spam
* Harassment
* Impersonation
* Illegal or prohibited content categories supported by product policy

A report should include only the minimum information required for investigation.

Support:

* Report creation
* Report categorization
* Report status
* Reporter identity
* Target identity
* Related resource
* Creation timestamp
* Investigation metadata
* Resolution metadata

Do not expose internal moderation information to ordinary users.

---

# 6. MODERATION CASES

Implement a moderation-case domain.

Support:

* Case creation
* Case assignment
* Case status
* Priority
* Evidence references
* Moderator notes
* Actions
* Resolution
* Escalation

Do not copy large media payloads into moderation records.

Store references to authoritative resources.

Protect moderation data with strict authorization.

---

# 7. MODERATION ACTIONS

Support administrative actions such as:

* Warning
* Temporary restriction
* Messaging restriction
* Account suspension
* Account disablement
* Account termination
* Content removal
* Group restriction
* Device/session revocation

Every action must:

* Validate authorization
* Record the acting administrator
* Record target
* Record reason
* Record timestamp
* Produce an audit event
* Be idempotent where appropriate

Do not permit irreversible actions through ambiguous endpoints.

---

# 8. ADMINISTRATIVE AUTHORIZATION

Implement strict administrative access control.

Separate permissions for:

* Support
* Moderation
* Security
* Operations
* System administration
* Platform administration

Use least privilege.

Do not rely on a single `isAdmin` boolean for sensitive production operations.

Administrative actions must require explicit permissions.

High-risk operations should support stronger authorization requirements where appropriate.

---

# 9. ADMINISTRATIVE AUDITING

Every sensitive administrative operation must produce an immutable audit record.

Audit:

* Actor
* Action
* Target
* Reason
* Timestamp
* Request ID
* Trace ID
* Relevant resource identifiers
* Result
* Security context where appropriate

Never store:

* Passwords
* Tokens
* Private keys
* Full private message contents unnecessarily

Audit records must be protected against ordinary administrative modification.

---

# 10. ACCOUNT RESTRICTIONS

Implement account restriction state.

Support:

* Active
* Restricted
* Suspended
* Disabled
* Deleted
* Security-locked

Restrictions must be enforceable by backend authorization.

An account restriction must be checked during:

* Authentication
* Session refresh
* WebSocket connection
* Message creation
* Conversation operations
* Media operations
* Group operations
* Search
* Administrative actions

Do not rely on a client receiving a restriction notice.

---

# 11. SESSION AND DEVICE SECURITY RESPONSE

Integrate security controls with sessions and devices.

Support:

* Revoke suspicious sessions
* Revoke devices
* Force credential refresh
* Force logout
* Security lock
* Risk-triggered session invalidation

Administrative and automated security actions must be auditable.

Do not silently invalidate security state without recording the appropriate event.

---

# 12. SPAM PREVENTION

Implement scalable spam-prevention foundations.

Use signals such as:

* Request velocity
* Message velocity
* Account age
* Device activity
* Authentication anomalies
* Repeated recipient patterns
* Failed operations
* Abuse reports
* Previous restrictions

Do not rely on a single heuristic.

Design the system so detection rules can evolve without rewriting the messaging system.

---

# 13. ABUSE RATE CONTROLS

Implement adaptive rate-control foundations.

Support:

* Endpoint limits
* Account limits
* Device limits
* Conversation limits
* IP/network limits
* Action-specific limits
* Escalating restrictions

Rate controls must be distributed.

Avoid permanently blocking legitimate users based on one transient signal.

Ensure abuse controls cannot be trivially bypassed through multiple devices or application instances.

---

# 14. ABUSE SIGNAL PIPELINE

Create an asynchronous abuse-signal architecture.

Signals may include:

* Excessive account creation
* Repeated failed authentication
* High message velocity
* Repeated reports
* Rapid contact discovery
* Suspicious device churn
* Unusual session behavior
* Repeated blocked interactions

Signals should be:

* Structured
* Versioned
* Privacy-conscious
* Correlatable
* Retainable according to policy

Do not place raw message contents into generic abuse telemetry unless explicitly required and appropriately protected.

---

# 15. SECURITY EVENT PROCESSING

Create a security-event pipeline supporting:

* Authentication events
* Session events
* Device events
* Account restrictions
* Abuse signals
* Administrative actions
* Privacy changes
* Report activity

Use durable asynchronous processing where appropriate.

Consumers must be idempotent.

Failures must not silently discard security events.

---

# 16. DATA RETENTION

Implement explicit data-retention policies.

Define retention behavior for:

* Messages
* Media metadata
* Media objects
* Sessions
* Security events
* Audit events
* Reports
* Moderation cases
* Search indexes
* Analytics data
* Temporary processing artifacts

Retention must be:

* Configurable
* Auditable
* Automated where appropriate
* Safe
* Idempotent

Do not delete data merely because it is old without a defined retention policy.

---

# 17. DATA DELETION

Implement secure deletion workflows.

Support deletion of:

* User accounts
* Sessions
* Devices
* Profile data
* User-created resources
* User-owned media
* Search-derived data

Where immediate physical deletion is unsafe or operationally expensive, use asynchronous deletion workflows.

Deletion must propagate to derived systems.

Do not leave deleted user information indefinitely inside search indexes, caches, queues, or analytics stores.

---

# 18. ACCOUNT DELETION WORKFLOW

Implement an account-deletion state machine.

Support:

* Deletion request
* Verification
* Grace period where appropriate
* Account disablement
* Session revocation
* Device revocation
* Data cleanup
* Derived-data cleanup
* Object-storage cleanup
* Search cleanup
* Completion state

Deletion jobs must be retryable.

A failed cleanup step must not incorrectly report complete deletion.

---

# 19. DATA EXPORT FOUNDATION

Implement a privacy-oriented data-export foundation.

Support:

* Export request
* Authorization
* Job creation
* Progress state
* Secure artifact generation
* Expiration
* Secure download access
* Cleanup

Exports must not be generated synchronously inside API requests.

Do not expose export artifacts indefinitely.

Protect exports with short-lived authorization.

---

# 20. PRIVACY DATA MINIMIZATION

Review all implemented domains for unnecessary data collection.

Minimize:

* Device metadata
* IP retention
* Location-related metadata
* Analytics identifiers
* Security telemetry
* Search-indexed fields
* Notification metadata

Do not collect information merely because it could be useful later.

Document legitimate operational reasons for retained sensitive metadata.

---

# 21. ANALYTICS ARCHITECTURE

Implement analytics foundations that do not overload transactional databases.

Support event-based analytics.

Analytics events should contain:

* Event ID
* Event type
* Version
* Timestamp
* Anonymous or controlled identity reference where appropriate
* Platform context
* Application version where appropriate
* Aggregatable properties

Avoid sending private message contents to analytics.

Avoid storing unnecessary personally identifying information.

---

# 22. PRODUCT METRICS

Implement metrics for areas such as:

* Active users
* Active devices
* Message throughput
* Conversation creation
* Message delivery latency
* Read latency
* Media processing
* Notification delivery
* Search latency
* Search indexing lag
* Connection counts
* Error rates

Prefer aggregated metrics over raw event storage when raw events are unnecessary.

---

# 23. OPERATIONAL ANALYTICS

Create observability for:

* API performance
* Database performance
* Redis performance
* Queue depth
* Worker latency
* Event processing
* WebSocket connections
* Message throughput
* Media workers
* Search cluster behavior
* Notification providers

Metrics must support operational troubleshooting.

Do not put sensitive user content into operational metrics.

---

# 24. FEATURE FLAGS

Implement a backend feature-flag foundation.

Support:

* Global flags
* Environment-specific flags
* Controlled rollout
* User targeting where justified
* Percentage rollout
* Emergency disablement

Feature flags must be evaluated server-side for security-sensitive behavior.

Do not use feature flags as authorization.

Ensure disabled functionality cannot accidentally remain reachable through alternate API paths.

---

# 25. PLATFORM CONFIGURATION

Implement safe runtime configuration for operational settings such as:

* Rate limits
* Upload limits
* Notification policies
* Search limits
* Processing concurrency
* Retention parameters
* Abuse thresholds

Configuration changes must be:

* Authenticated
* Authorized
* Audited
* Validated

Do not allow arbitrary runtime configuration values to crash production services.

---

# 26. COMPLIANCE-ORIENTED FOUNDATIONS

Implement technical foundations that support:

* Data access requests
* Data deletion requests
* Auditability
* Retention enforcement
* Consent/preference state where required
* Administrative traceability

Do not claim legal compliance with any jurisdiction merely because technical controls exist.

Design the backend so jurisdiction-specific policies can be layered onto the platform.

---

# 27. SECURITY THREAT REVIEW

Perform a backend threat review covering:

* Authentication bypass
* Authorization bypass
* Privilege escalation
* Session theft
* Device compromise
* Token replay
* API enumeration
* Object enumeration
* SSRF
* Injection
* DoS
* Queue abuse
* WebSocket abuse
* Search abuse
* Media abuse
* Administrative abuse
* Insider threats
* Audit tampering
* Privacy leakage

Fix issues within scope.

Document residual risks honestly.

---

# 28. DATABASE SECURITY AND PERFORMANCE

Review all database changes for:

* Index quality
* Constraint integrity
* Transaction boundaries
* Lock contention
* Hot rows
* High-cardinality indexes
* Retention cleanup performance
* Partitioning opportunities
* Query plans

Do not perform large deletion operations in a single unbounded transaction.

Use controlled batch processing for large datasets.

Do not run expensive analytics queries against production transactional tables when an asynchronous derived system is more appropriate.

---

# 29. CACHE AND REDIS HARDENING

Review Redis usage for:

* TTL correctness
* Memory growth
* Key namespaces
* Eviction behavior
* Sensitive data
* Connection limits
* Failure behavior
* Stampede protection

Do not store durable business state exclusively in Redis.

Do not allow unbounded user-controlled Redis keys.

Avoid caching private information without authorization-aware invalidation.

---

# 30. EVENT AND QUEUE HARDENING

Review all asynchronous infrastructure for:

* Duplicate events
* Lost events
* Retry storms
* Poison messages
* Dead-letter handling
* Ordering assumptions
* Consumer lag
* Backpressure
* Idempotency

Every consumer must safely tolerate duplicate delivery.

Do not create infinite retry loops.

Do not acknowledge jobs before durable processing requirements are satisfied.

---

# 31. DISASTER RECOVERY READINESS

Ensure backend behavior supports:

* Database backups
* Point-in-time recovery
* Redis recovery
* Event-stream recovery
* Search reindexing
* Object-storage recovery
* Queue recovery
* Multi-region failover

Define which data is:

* Authoritative
* Derived
* Reconstructable
* Replicated
* Disposable

Do not treat derived systems as irreplaceable sources of truth.

---

# 32. FAILURE INJECTION AND RESILIENCE

Test or prepare controlled failure scenarios for:

* PostgreSQL outage
* Redis outage
* Kafka/Redpanda outage
* Search outage
* Object-storage outage
* Notification-provider outage
* Worker crash
* Network timeout
* Dependency latency
* Partial region failure

Verify that:

* Durable data is protected.
* Retries are bounded.
* Backpressure works.
* Health checks remain meaningful.
* Recovery is possible.
* Operators can identify the failure.

---

# 33. PERFORMANCE HARDENING

Review backend performance at scale.

Measure and optimize:

* API latency
* Database latency
* Redis latency
* Queue throughput
* Event throughput
* WebSocket handling
* Search latency
* Media job throughput
* Notification throughput

Do not optimize based only on assumptions.

Use metrics and profiling where available.

Avoid premature micro-optimizations that reduce maintainability.

---

# 34. SECURITY TESTING

Add tests for:

* Privilege escalation
* Unauthorized admin access
* Block bypass
* Privacy bypass
* Deleted-account access
* Session revocation
* Data export authorization
* Report access
* Moderation access
* Object access
* Search leakage
* Rate-limit bypass
* Administrative audit integrity

Test both positive and negative authorization paths.

---

# 35. FINAL VALIDATION

Before declaring completion:

1. Run formatting.
2. Run linting.
3. Run TypeScript type checking.
4. Validate Prisma schema.
5. Validate migrations.
6. Run unit tests.
7. Run integration tests.
8. Run end-to-end tests.
9. Validate privacy enforcement.
10. Validate blocking.
11. Validate reporting.
12. Validate moderation authorization.
13. Validate administrative authorization.
14. Validate account restrictions.
15. Validate deletion workflows.
16. Validate export workflows.
17. Validate retention jobs.
18. Validate queue failure handling.
19. Validate security auditing.
20. Validate feature flags.
21. Validate observability.
22. Review database performance.
23. Review Redis behavior.
24. Review asynchronous processing.
25. Review repository changes for unrelated modifications.

Do not declare success if required checks fail.

---

# 36. FINAL IMPLEMENTATION REPORT

When implementation is complete, provide:

1. **Implementation Summary**
2. **Privacy Architecture**
3. **Blocking and Reporting**
4. **Moderation System**
5. **Administrative Authorization**
6. **Security Auditing**
7. **Account Restriction System**
8. **Abuse and Spam Prevention**
9. **Retention and Deletion**
10. **Data Export**
11. **Analytics**
12. **Feature Flags**
13. **Operational Configuration**
14. **Disaster Recovery Improvements**
15. **Security Hardening**
16. **Performance Improvements**
17. **Tests Added**
18. **Validation Commands**
19. **Validation Results**
20. **Known Limitations**
21. **Configuration Changes**
22. **Files and Directories Modified**

Report only actual implementation.

Do not claim legal compliance without legal validation.

Do not claim production-scale testing if only local tests were executed.

---

# BACKEND VOLUME 4 COMPLETION STANDARD

This volume is complete only when the backend has production-grade foundations for:

* Privacy enforcement
* Blocking
* Reporting
* Moderation
* Administrative operations
* Abuse prevention
* Spam prevention
* Account restrictions
* Data retention
* Data deletion
* Data export
* Security auditing
* Analytics
* Feature flags
* Operational controls
* Reliability hardening
* Performance hardening
* Disaster recovery readiness

The implementation must be:

* Secure
* Privacy-conscious
* Auditable
* Scalable
* Resilient
* Observable
* Testable
* Maintainable
* Production-ready

Do not leave placeholders.

Do not leave TODO/FIXME implementation gaps.

Do not use pseudo-code.

Do not omit required implementations.

Do not say “implement similarly.”

Do not say “remaining code omitted.”

Do not replace implementation with explanations.

Inspect the repository, implement the scope completely, integrate it, validate it, and report the exact result.
