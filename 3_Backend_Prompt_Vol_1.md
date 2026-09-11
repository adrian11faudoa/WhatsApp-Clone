# WHATSAPP — BACKEND VOLUME 1

## ROLE

Act as a Principal Backend Engineer, Staff Backend Engineer, Distributed Systems Engineer, Database Architect, Security Engineer, Real-Time Systems Engineer, SRE, QA Engineer, and Technical Writer working as one senior engineering team.

You are implementing the production backend of a global, enterprise-grade real-time communication platform comparable in capability and reliability to WhatsApp, Telegram, Signal, Messenger, Discord, and Microsoft Teams.

Do not teach, explain how to code, provide tutorials, or produce pseudo-code. Perform the implementation work directly in the repository.

Build production-grade software suitable for a funded startup operating at global scale.

---

# PROJECT

Build the backend foundation for a global real-time communication platform supporting:

* User accounts and identities
* Authentication and authorization
* User profiles
* Devices and sessions
* Multi-device account management
* Contacts
* Conversations
* Groups
* Real-time messaging
* Message delivery and read states
* Presence and typing indicators
* Media and documents
* Voice messages
* Push notifications
* Search
* Privacy controls
* Blocking and reporting
* Moderation and administration
* Offline synchronization
* Message history
* Disappearing messages
* Message reactions
* Replies
* Editing and deletion
* Forwarding
* Pinned and saved messages
* Web and mobile clients

The platform must be designed for:

* Hundreds of millions of registered users
* Tens of millions of daily active users or greater
* Very large concurrent WebSocket populations
* Extremely high message throughput
* Large media volumes
* Global traffic
* Multi-region deployment
* High availability
* Horizontal scalability
* Fault tolerance
* Strong security and privacy requirements

This backend volume establishes and implements the foundational backend platform required for the rest of the application.

Do not implement frontend or mobile application code in this volume.

---

# TECHNOLOGY DIRECTION

Use the following backend technology direction unless the existing repository contains a technically justified implementation that must be preserved:

* Node.js
* TypeScript
* NestJS
* REST APIs
* WebSockets
* Socket.IO where appropriate
* PostgreSQL
* Prisma ORM
* Redis
* BullMQ
* Kafka or Redpanda for durable asynchronous event streaming where required
* Elasticsearch or OpenSearch for search workloads
* S3-compatible object storage for media
* CloudFront or equivalent CDN
* Docker
* Kubernetes
* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo
* Swagger/OpenAPI
* Jest
* Supertest
* ESLint
* Prettier

Use PostgreSQL as the authoritative transactional database.

Use Redis for low-latency ephemeral and coordination workloads.

Do not use Redis as the authoritative source of durable business data.

Use asynchronous infrastructure only where it provides a clear reliability, scalability, or workload-isolation benefit.

---

# SOURCE OF TRUTH

The repository is the source of truth.

Before modifying anything:

1. Inspect the complete repository structure relevant to the backend.
2. Identify the existing backend application.
3. Inspect package manifests.
4. Inspect TypeScript configuration.
5. Inspect NestJS modules.
6. Inspect Prisma configuration and schema.
7. Inspect database migrations.
8. Inspect environment configuration.
9. Inspect authentication code.
10. Inspect existing shared libraries.
11. Inspect tests.
12. Inspect Docker and development infrastructure.
13. Inspect existing API documentation.
14. Inspect architecture and project documentation contained in the repository.
15. Identify already implemented contracts that must remain compatible.
16. Identify incomplete or partially implemented backend functionality.

Do not blindly replace existing implementation.

Preserve correct existing behavior.

If the repository already contains production-quality functionality within the current scope, improve or complete it rather than unnecessarily rewriting it.

Repository state has priority over assumptions.

---

# 1. BACKEND IMPLEMENTATION BOUNDARY

Implement the backend foundation required for the communication platform.

This volume owns:

* Backend application foundation
* NestJS architecture
* Configuration
* Environment validation
* Shared infrastructure
* Database foundation
* Prisma integration
* Database conventions
* Account foundation
* Authentication foundation
* Session management
* Device management
* Authorization foundation
* Security middleware
* API standards
* Validation
* Error handling
* Redis foundation
* Rate limiting foundation
* Health checks
* Graceful shutdown
* Logging
* OpenTelemetry foundation
* Backend testing foundation
* Developer tooling required by the backend

Do not prematurely implement the complete messaging system.

Do not implement the complete media pipeline.

Do not implement the complete search system.

Do not implement the complete notification system.

Do not implement the complete moderation platform.

Do not implement frontend or mobile applications.

Create the foundational contracts required for those systems to integrate cleanly later.

---

# 2. BACKEND ARCHITECTURE

Establish a maintainable modular NestJS architecture.

Organize the backend around clear domain ownership.

At minimum establish appropriate modules for:

* Application
* Configuration
* Common/shared infrastructure
* Database
* Authentication
* Accounts
* Profiles
* Devices
* Sessions
* Contacts
* Authorization
* Security
* Health
* Observability

Create clear boundaries between:

* Controllers
* Application services
* Domain services
* Repositories
* Infrastructure adapters
* Database access
* External service integrations
* Event publishing
* Background jobs

Do not place business logic directly inside controllers.

Do not allow controllers to become service containers.

Keep infrastructure concerns separated from domain logic.

Use dependency injection consistently.

Avoid circular module dependencies.

Avoid giant generic service classes.

Use explicit ownership for every database operation.

---

# 3. APPLICATION BOOTSTRAP

Implement a production-ready NestJS bootstrap process.

The application startup sequence must:

1. Load environment configuration.
2. Validate configuration.
3. Initialize logging.
4. Initialize observability.
5. Initialize database infrastructure.
6. Initialize Redis infrastructure.
7. Initialize application modules.
8. Register API middleware and security controls.
9. Register validation.
10. Register exception handling.
11. Register API documentation where appropriate.
12. Start the HTTP server.
13. Start real-time infrastructure only where this volume requires it.
14. Expose health and readiness endpoints.
15. Handle graceful shutdown.

Startup failures must fail fast when required infrastructure is unavailable.

Do not silently continue with invalid configuration.

---

# 4. CONFIGURATION MANAGEMENT

Implement centralized, strongly typed configuration.

Configuration must support separate environments such as:

* Local
* Development
* Test
* Staging
* Production

Validate environment variables at startup.

Define configuration categories for at least:

* Application
* HTTP
* Database
* Redis
* Authentication
* JWT
* Sessions
* Security
* Rate limiting
* CORS
* Logging
* OpenTelemetry
* Metrics
* External services
* Storage
* Messaging infrastructure
* Feature flags

Do not scatter direct `process.env` access throughout the application.

Secrets must never be committed to source control.

Do not provide insecure production defaults.

Ensure test configuration can operate independently without accidentally connecting to production infrastructure.

---

# 5. DATABASE FOUNDATION

Implement the PostgreSQL and Prisma foundation.

Establish:

* Prisma client lifecycle management
* Database module
* Connection management
* Transaction support
* Graceful disconnect
* Query logging appropriate to environment
* Database health checks
* Migration workflow
* Seed strategy where appropriate
* Test database strategy

Design database access for production connection limits.

Do not create a new Prisma client per request.

Do not expose the Prisma client directly throughout the entire application.

Create appropriate repository or data-access boundaries.

Ensure transactions are explicitly scoped.

---

# 6. DATABASE MODEL FOUNDATION

Implement the foundational data model required for:

* Users
* User identities
* Profiles
* Devices
* Sessions
* Authentication credentials
* Contact relationships
* Blocking relationships where foundationally required
* Account status
* Security metadata

Use stable identifiers.

Use UUIDs or an equally appropriate globally unique identifier strategy.

Do not expose sequential database identifiers where they could create enumeration risks.

Use timestamps consistently.

Use UTC for persisted timestamps.

Ensure important fields have appropriate:

* Primary keys
* Foreign keys
* Unique constraints
* Indexes
* Check constraints where appropriate
* Nullability rules

Do not create indexes without understanding their query purpose.

Do not create unnecessary duplicate indexes.

Design schema changes to support future horizontal scaling.

---

# 7. USER ACCOUNT FOUNDATION

Implement the user account domain.

The account system must support:

* Stable user identity
* Account creation
* Account lookup
* Account status
* Account activation/deactivation
* Account metadata required for security
* Created/updated timestamps
* Soft deletion or account deletion lifecycle where appropriate
* Privacy-preserving public identity references

Define explicit account states.

Prevent invalid state transitions.

Do not expose internal security metadata through public API responses.

Implement proper authorization around account operations.

---

# 8. AUTHENTICATION

Implement secure authentication foundations.

Support an architecture capable of:

* Credential authentication
* Access tokens
* Refresh tokens
* Session management
* Device-aware authentication
* Token rotation
* Token revocation
* Logout
* Logout from one device
* Logout from all devices

Design authentication for:

* Web clients
* Mobile clients
* Multiple simultaneous devices
* Token theft resistance
* Session invalidation
* Credential rotation

Never store raw long-lived refresh tokens when a secure hashed representation can be used.

Use secure token expiration.

Use appropriate cryptographic primitives.

Never log:

* Passwords
* Access tokens
* Refresh tokens
* Session secrets
* Private keys
* Authentication codes
* Sensitive personal information

---

# 9. PASSWORD SECURITY

If password authentication is implemented, use a modern password hashing algorithm appropriate for production security.

Implement:

* Password hashing
* Password verification
* Password change
* Credential invalidation
* Password reset architecture
* Brute-force protection
* Account lockout or progressive throttling where appropriate

Never store plaintext passwords.

Never return password hashes through APIs.

Do not log password values.

Do not expose whether a password belongs to another account through unsafe recovery flows.

Use generic responses for sensitive account-recovery operations where account enumeration could occur.

---

# 10. SESSION MANAGEMENT

Implement durable session management.

A session must be associated with:

* User
* Device
* Session identifier
* Creation timestamp
* Last activity
* Expiration
* Revocation state
* Security metadata appropriate to the platform

Support:

* Session creation
* Session validation
* Session refresh
* Session revocation
* Revocation of all sessions
* Device-specific logout
* Security auditing

Session revocation must take effect reliably.

Design session validation so it remains efficient at large scale.

Use Redis where appropriate for low-latency session state or revocation propagation, while maintaining the appropriate durable source of truth.

---

# 11. DEVICE MANAGEMENT

Implement the device domain.

Support:

* Device registration
* Device identification
* Device metadata
* Device type
* Device name
* Platform
* App version
* Last active timestamp
* Push notification registration foundation
* Device revocation
* Device logout
* Device listing

The architecture must support:

* Multiple mobile devices
* Web sessions
* Desktop clients
* Concurrent sessions

Do not assume one user equals one device.

Do not trust client-supplied device metadata without validation.

Avoid storing unnecessary device fingerprinting data.

Design the model with privacy minimization in mind.

---

# 12. AUTHORIZATION FOUNDATION

Implement authorization infrastructure.

Support:

* Authentication guards
* User identity extraction
* Session validation
* Role-aware authorization
* Resource ownership checks
* Permission checks
* Administrative authorization boundaries

Create reusable authorization primitives.

Do not rely solely on frontend authorization.

Every protected backend operation must independently enforce authorization.

Prevent horizontal privilege escalation.

Prevent vertical privilege escalation.

Do not trust:

* User IDs supplied by clients
* Role values supplied by clients
* Device IDs supplied by clients
* Organization or administrative identifiers supplied by clients

Resolve authorization context from authenticated server-side identity and validated resource ownership.

---

# 13. API FOUNDATION

Establish consistent REST API conventions.

Implement:

* Versioned API namespace
* Request validation
* Response serialization
* Standard error format
* Correlation/request IDs
* Authentication metadata
* Pagination foundation
* Consistent HTTP status usage
* Content-type handling
* CORS configuration
* Security headers

Use DTOs and validation schemas.

Do not expose internal database models directly as API contracts.

Do not return arbitrary Prisma objects.

Use explicit response models.

---

# 14. VALIDATION

Implement centralized request validation.

Validate:

* Request bodies
* Query parameters
* Route parameters
* Headers where relevant
* Authentication metadata
* Pagination inputs
* Device information
* Account data

Reject malformed input before it reaches domain logic.

Normalize values where appropriate.

Apply length limits.

Apply format validation.

Apply enum validation.

Prevent unexpected properties where appropriate.

Never trust client-side validation.

---

# 15. ERROR HANDLING

Implement a consistent backend error model.

Errors must distinguish appropriately between:

* Validation failures
* Authentication failures
* Authorization failures
* Not found
* Conflict
* Rate limiting
* Business rule violations
* Dependency failures
* Internal failures

Do not expose:

* Stack traces
* SQL statements
* Internal class names
* Secrets
* Infrastructure topology
* Sensitive account information

to external clients.

Internal logs may contain diagnostic context, but must still follow privacy and security requirements.

Every request should have a correlation identifier.

---

# 16. REDIS FOUNDATION

Implement a production-ready Redis infrastructure module.

Support appropriate abstractions for:

* Key-value caching
* Short-lived state
* Rate limiting
* Session support
* Distributed coordination
* Presence foundation
* Idempotency support

Define clear key namespaces.

Define TTL policies.

Prevent accidental unbounded key growth.

Do not use Redis as the primary source of durable messages or accounts.

Implement connection lifecycle management.

Handle Redis reconnects safely.

Avoid creating uncontrolled Redis connections.

Provide instrumentation for Redis operations.

---

# 17. DISTRIBUTED RATE LIMITING

Implement foundational rate limiting.

Rate limits must be designed for distributed application instances.

Protect at least:

* Authentication
* Login attempts
* Password operations
* Account creation
* Session refresh
* Device registration
* Sensitive account operations
* Public API endpoints

Use Redis-backed distributed coordination where appropriate.

Rate limiting must support:

* Per-IP controls
* Per-account controls
* Per-device controls
* Endpoint-specific limits

Do not depend exclusively on IP addresses.

Design limits so NAT, mobile networks, proxies, and shared networks do not unnecessarily block legitimate users.

Return appropriate rate-limit responses.

Do not expose internal rate-limit implementation details.

---

# 18. SECURITY MIDDLEWARE

Implement foundational HTTP security.

Configure appropriately:

* CORS
* Security headers
* Request size limits
* Content-type restrictions
* HTTP method restrictions where appropriate
* Request timeout behavior
* Secure cookie behavior where cookies are used
* Proxy awareness
* Trusted proxy configuration
* Basic request sanitization

Protect against:

* Request smuggling risks
* Oversized payload abuse
* Header abuse
* Injection
* Authentication bypass
* Enumeration
* Brute-force attacks

Do not introduce unsafe global transformations that damage valid application data.

---

# 19. IDEMPOTENCY FOUNDATION

Establish an idempotency mechanism for operations where retries could otherwise produce duplicate effects.

The foundation must support:

* Idempotency keys
* Request ownership
* Request status
* Result persistence where appropriate
* Expiration
* Concurrent duplicate requests
* Safe retries

Design this mechanism for distributed application instances.

It must be reusable by future messaging, payments, uploads, and other mutation APIs.

Do not create an idempotency implementation that only works inside one process.

---

# 20. AUDIT AND SECURITY EVENTS

Implement foundational security auditing.

Record appropriate security events such as:

* Login
* Failed login
* Logout
* Session creation
* Session revocation
* Password changes
* Credential changes
* Device registration
* Device revocation
* Account status changes
* Administrative security actions

Audit records must:

* Be structured
* Be timestamped
* Be associated with the relevant user where appropriate
* Avoid storing secrets
* Avoid unnecessary sensitive payloads
* Support future security investigation

Separate audit records from ordinary application logs.

---

# 21. HEALTH AND READINESS

Implement health endpoints.

At minimum support:

* Liveness
* Readiness
* Dependency health

Health checks should evaluate relevant infrastructure such as:

* PostgreSQL
* Redis
* Required messaging infrastructure when enabled

Do not make liveness depend on every external dependency.

A temporary database outage should not necessarily cause Kubernetes to restart every application instance.

Readiness should prevent traffic from reaching instances that cannot safely serve requests.

---

# 22. GRACEFUL SHUTDOWN

Implement graceful shutdown.

The application must:

1. Stop accepting new work.
2. Allow active requests to complete within configured limits.
3. Stop background processing appropriately.
4. Close WebSocket resources where applicable.
5. Finish or safely abandon recoverable work.
6. Close Redis connections.
7. Disconnect Prisma.
8. Flush telemetry where possible.
9. Exit cleanly.

The implementation must be compatible with container orchestration and rolling deployments.

Do not terminate active work abruptly unless the configured shutdown deadline is reached.

---

# 23. OBSERVABILITY FOUNDATION

Implement structured observability.

Every backend request should support:

* Request ID
* Trace ID
* Structured logs
* Request duration
* HTTP status
* Route
* Service/module context

Implement OpenTelemetry foundations for:

* HTTP requests
* Database operations
* Redis operations
* Background work where applicable
* External calls where applicable

Create metrics for:

* Request count
* Error count
* Request latency
* Database latency
* Redis latency
* Authentication failures
* Rate-limit events
* Active sessions where appropriate
* Application health

Never include secrets or sensitive message content in telemetry.

---

# 24. LOGGING

Implement structured logging.

Logs should be machine-readable.

Include useful fields such as:

* Timestamp
* Severity
* Service
* Environment
* Request ID
* Trace ID
* User identifier when appropriate and privacy-safe
* Device identifier when appropriate
* Route
* Operation
* Duration
* Error classification

Do not log message contents.

Do not log media contents.

Do not log passwords.

Do not log tokens.

Do not log authorization headers.

Do not log private keys.

Implement appropriate redaction.

---

# 25. BACKGROUND JOB FOUNDATION

Establish the backend infrastructure needed for BullMQ-based jobs.

Provide:

* Queue configuration
* Worker configuration
* Retry policies
* Exponential backoff where appropriate
* Dead-letter handling
* Job observability
* Idempotent job processing
* Graceful worker shutdown

Do not create large numbers of queues without clear ownership.

Define naming conventions.

Define job payload versioning.

Do not put sensitive secrets into job payloads.

Prepare the foundation for future jobs such as:

* Notifications
* Media processing
* Search indexing
* Cleanup
* Retention
* Moderation
* Analytics

Only implement jobs belonging to this volume.

---

# 26. EVENT PUBLISHING FOUNDATION

Establish a durable event-publishing abstraction suitable for future Kafka or Redpanda integration.

Events must support:

* Event identifier
* Event type
* Version
* Aggregate/resource identifier
* Producer/service identifier
* Timestamp
* Correlation ID
* Trace ID where appropriate
* Payload
* Schema evolution

Do not publish uncontrolled database state.

Design the abstraction so business operations can later use transactional outbox patterns.

Do not claim an event was durably published if the implementation cannot guarantee that behavior.

---

# 27. CONTACT FOUNDATION

Implement the foundational contact domain.

Support the backend structures required for:

* Contact relationships
* Contact lookup
* Contact creation/removal where applicable
* Contact blocking integration
* User discovery controls
* Privacy-aware contact access

Do not expose users who have configured themselves to be undiscoverable through unauthorized mechanisms.

Prevent unauthorized enumeration of accounts.

Use explicit authorization for contact operations.

---

# 28. API DOCUMENTATION

Implement Swagger/OpenAPI documentation for backend endpoints created in this volume.

Document:

* Authentication
* Accounts
* Profiles
* Devices
* Sessions
* Contacts
* Health
* Error responses
* Validation failures

Documentation must accurately represent actual implementation.

Do not create documentation for endpoints that do not exist.

Do not create fake request or response models.

---

# 29. TESTING FOUNDATION

Create a comprehensive backend test foundation.

Implement unit tests for:

* Authentication services
* Token handling
* Session logic
* Authorization
* Validation
* Rate limiting
* Account rules
* Device rules
* Security-sensitive services

Implement integration tests for:

* PostgreSQL
* Prisma
* Redis
* Authentication flows
* Session lifecycle
* Account lifecycle
* Device lifecycle
* API error handling

Implement end-to-end tests for critical authentication paths.

Tests must verify both successful and failure scenarios.

Include:

* Unauthorized access
* Forbidden access
* Invalid tokens
* Expired tokens
* Revoked sessions
* Duplicate requests
* Invalid input
* Rate limiting
* Resource ownership violations

Do not weaken security behavior merely to make tests pass.

---

# 30. TEST ISOLATION

Ensure tests cannot accidentally modify production data.

Provide deterministic test infrastructure.

Use appropriate:

* Test databases
* Test Redis namespaces
* Environment isolation
* Database cleanup
* Fixture factories
* Mock external integrations where appropriate

Do not rely on developer-local state.

Do not require manually created production-like accounts for automated tests.

---

# 31. CODE QUALITY

Enforce:

* Strict TypeScript
* Consistent formatting
* ESLint rules
* Explicit return types where appropriate
* Clear naming
* Small cohesive modules
* Strong typing
* Dependency inversion where useful
* Testable services
* No dead code
* No duplicated security logic

Avoid:

* `any` unless technically justified
* Unbounded generic utility modules
* Giant files
* God classes
* Hidden global state
* Implicit configuration
* Magic constants
* Silent error swallowing

---

# 32. PRODUCTION HARDENING

Review all implemented backend functionality for:

* Authentication security
* Authorization security
* Input validation
* SQL injection resistance
* Rate-limit bypass
* Enumeration resistance
* Session security
* Token security
* Secret handling
* Logging redaction
* Error leakage
* Race conditions
* Transaction boundaries
* Connection management
* Redis failure behavior
* Graceful shutdown
* Horizontal scalability

Fix issues discovered within this volume before declaring completion.

Do not defer obvious security defects.

---

# 33. REPOSITORY INTEGRATION

Integrate the implementation into the existing repository cleanly.

Update:

* Source files
* Prisma schema
* Migrations
* Tests
* Environment examples
* API documentation
* Backend documentation
* Docker configuration when required
* Package scripts
* Developer setup instructions

Do not overwrite unrelated application functionality.

Do not regenerate unchanged files.

Do not introduce incompatible contracts without a documented migration strategy.

Keep the repository buildable throughout the implementation.

---

# 34. VALIDATION AND COMPLETION

Before declaring this volume complete:

1. Install or verify dependencies.
2. Run formatting checks.
3. Run linting.
4. Run TypeScript type checking.
5. Generate Prisma artifacts where required.
6. Validate Prisma schema.
7. Apply or validate migrations in a safe environment.
8. Run unit tests.
9. Run integration tests.
10. Run end-to-end tests for implemented critical flows.
11. Verify application startup.
12. Verify health endpoints.
13. Verify readiness behavior.
14. Verify graceful shutdown.
15. Verify authentication lifecycle.
16. Verify session lifecycle.
17. Verify device lifecycle.
18. Verify authorization.
19. Verify rate limiting.
20. Verify Redis connectivity and failure handling.
21. Verify observability instrumentation.
22. Review security-sensitive implementation.
23. Review database indexes and constraints.
24. Review API documentation.
25. Review repository changes for accidental unrelated modifications.

Do not declare success if required checks fail.

If an environment-specific check cannot run, state exactly why and perform the strongest available equivalent validation.

---

# 35. FINAL IMPLEMENTATION REPORT

When implementation is complete, provide a concise but complete engineering report containing:

1. **Implementation Summary**
2. **Backend Modules Created or Modified**
3. **Database Schema and Migration Changes**
4. **Authentication and Session Changes**
5. **Device and Account Changes**
6. **Authorization Changes**
7. **Redis Changes**
8. **Security Controls**
9. **Observability Changes**
10. **API Endpoints Added or Modified**
11. **Background Infrastructure Added**
12. **Event Infrastructure Added**
13. **Tests Added**
14. **Validation Commands Executed**
15. **Validation Results**
16. **Known Limitations**
17. **Configuration or Environment Variables Added**
18. **Documentation Updated**
19. **Important Compatibility Considerations**
20. **Exact Files or Directories Modified**

Do not claim that functionality was implemented if it was only planned.

Do not hide failed tests.

Do not report hypothetical validation as completed validation.

---

# BACKEND VOLUME 1 COMPLETION STANDARD

This volume is complete only when the repository contains a production-grade backend foundation capable of securely supporting the communication platform's future messaging, real-time, media, notification, search, privacy, moderation, and administrative systems.

The implementation must be:

* Correct
* Secure
* Testable
* Observable
* Maintainable
* Horizontally scalable
* Failure-aware
* Production-oriented
* Compatible with future multi-device real-time communication workloads

Do not leave placeholders.

Do not leave TODO/FIXME implementation gaps.

Do not use pseudo-code.

Do not omit required implementations.

Do not say “implement similarly.”

Do not say “remaining code omitted.”

Do not replace implementation with explanations.

Inspect the repository, implement the scope completely, integrate it, validate it, and report the exact result.
