You are operating in Senior Engineering Team Mode.

Build the production-ready backend foundation for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The backend must follow the established architecture, domain boundaries, technology stack, security model, data ownership rules, event architecture, and real-time architecture of the project.

Do not redesign the architecture.

Do not generate frontend code.

Do not generate mobile code.

Do not generate Kubernetes manifests.

Do not generate Terraform.

Do not generate infrastructure implementation code.

Do not generate CI/CD workflows.

This prompt covers the backend foundation and platform infrastructure.

────────────────────────────────────────

MISSION

Build the production-ready backend foundation required for the communication platform.

The backend will eventually support:

• Hundreds of millions of users
• Billions of messages
• Tens of millions of concurrent connections
• One-to-one messaging
• Group messaging
• Communities
• Multi-device synchronization
• Offline synchronization
• Presence
• Media
• Stories/status
• Push notifications
• Voice calls
• Video calls
• Group calls
• End-to-end encryption
• Business accounts
• Moderation
• Analytics
• Administration
• Multi-region deployment

This volume establishes the backend foundation that later backend implementation volumes will build upon.

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Backend:

• Node.js
• NestJS
• TypeScript

Database:

• PostgreSQL
• Prisma ORM

Cache:

• Redis

Event Streaming:

• Kafka or Redpanda

Background Jobs:

• BullMQ

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Testing:

• Jest
• Supertest
• Integration testing tools where appropriate

API:

• REST
• OpenAPI / Swagger

────────────────────────────────────────

BACKEND ARCHITECTURE

Use:

• Clean Architecture
• Domain-Driven Design
• SOLID
• Repository Pattern
• Service Layer
• Dependency Injection
• Feature-first organization
• Explicit domain boundaries
• Event-driven architecture where appropriate
• Transactional Outbox where appropriate
• Idempotent processing

Keep framework-specific infrastructure separate from business logic.

Controllers must not contain business logic.

Repositories must not contain domain rules.

Domain logic must not depend directly on infrastructure implementations.

────────────────────────────────────────

IMPLEMENTATION RULES

Never generate pseudo-code.

Never generate placeholders.

Never generate TODO comments.

Never omit implementations.

Never say:

- "implement similarly"
- "remaining code omitted"
- "for brevity"
- "left as an exercise"

Every generated file must be complete.

Every generated file must compile.

Every module must integrate correctly with the backend architecture.

Never regenerate unchanged files.

Only modify existing files when required.

Use strict TypeScript.

Use explicit types.

Use proper dependency injection.

Use centralized error handling.

Use configuration validation.

Use structured logging.

Use graceful shutdown.

────────────────────────────────────────

IMPLEMENTATION STRATEGY

Implement this backend incrementally.

Use manageable milestones.

A milestone should normally contain approximately 20–40 files.

Every milestone must:

• Compile
• Have valid imports
• Have valid dependency injection
• Have coherent configuration
• Have appropriate tests
• Preserve established architecture
• Update the Project Index

Do not implement future domains prematurely.

────────────────────────────────────────

BACKEND VOLUME 1 SCOPE

Implement only the backend foundation:

1. Monorepo/backend structure
2. Application bootstrap
3. Configuration
4. Environment validation
5. Logging
6. Error handling
7. Request context
8. Validation
9. Security foundation
10. API foundation
11. Database foundation
12. Prisma foundation
13. Redis foundation
14. Kafka/Redpanda foundation
15. BullMQ foundation
16. Event infrastructure
17. Transactional outbox infrastructure
18. Observability foundation
19. Health checks
20. Graceful shutdown
21. Testing foundation
22. Backend documentation
23. Project Index

Do not implement complete messaging or user-facing business domains in this volume.

────────────────────────────────────────

MONOREPO FOUNDATION

Create the production-ready backend structure.

Support:

apps/

• API Gateway
• Background workers
• Real-time gateway where appropriate

packages/

• Configuration
• Logging
• Error handling
• Validation
• Database
• Redis
• Events
• Queues
• Observability
• Shared types
• API contracts
• Testing utilities

services/

Use only where the architecture requires independently deployable services.

Do not create unnecessary empty services.

────────────────────────────────────────

APPLICATION BOOTSTRAP

Implement the NestJS application foundation.

Support:

• Application initialization
• Environment loading
• Configuration initialization
• Global validation
• Global exception handling
• Structured logging
• Request IDs
• Correlation IDs
• Security middleware
• CORS
• Secure headers
• Request size limits
• API versioning
• Graceful shutdown
• Health endpoints

Use production-safe defaults.

────────────────────────────────────────

CONFIGURATION

Implement strongly typed centralized configuration.

Support configuration for:

Application:

• Environment
• Service name
• Service version
• Host
• Port

PostgreSQL:

• Host
• Port
• Database
• Username
• Password
• SSL/TLS
• Connection pool

Redis:

• Host
• Port
• Username
• Password
• TLS

Kafka/Redpanda:

• Brokers
• Client ID
• Authentication
• TLS
• Consumer group

BullMQ:

• Redis connection
• Queue defaults
• Job limits

Authentication:

• JWT configuration
• Session configuration
• Token expiration

Observability:

• Log level
• OpenTelemetry endpoint
• Metrics configuration

Never hard-code secrets.

Never access process.env directly throughout application modules.

Validate configuration at startup.

Fail fast when required configuration is invalid.

Never log secrets.

────────────────────────────────────────

REQUEST CONTEXT

Implement request context support for:

• Request ID
• Correlation ID
• Trace ID where available
• Service name
• User ID when authenticated
• Device ID when available

The request context must be propagated to:

• Logs
• Metrics
• Traces
• Events
• Background jobs

────────────────────────────────────────

LOGGING

Implement structured JSON logging suitable for centralized aggregation.

Logs should support:

• Timestamp
• Service
• Environment
• Level
• Request ID
• Correlation ID
• Trace ID
• Operation
• Duration
• Result
• Error information

Never log:

• Passwords
• Access tokens
• Refresh tokens
• Private keys
• Encryption keys
• Message plaintext
• Sensitive personal information unnecessarily

────────────────────────────────────────

ERROR HANDLING

Implement centralized error handling.

Define consistent error categories for:

• Validation errors
• Authentication errors
• Authorization errors
• Not found
• Conflict
• Rate limit
• Dependency failure
• Infrastructure failure
• Internal errors

Create a consistent API error format.

Include:

• Error code
• Safe public message
• Request ID
• Correlation ID where appropriate
• Validation details where appropriate

Do not expose internal stack traces in production responses.

────────────────────────────────────────

VALIDATION

Implement centralized validation for:

• Request body
• Query parameters
• Route parameters
• Headers where required
• Event payloads
• Queue payloads
• Configuration

Reject invalid input before domain logic executes.

Use strict schemas.

────────────────────────────────────────

SECURITY FOUNDATION

Implement backend security foundations.

Support:

• Secure headers
• CORS
• Rate limiting
• Input validation
• Secure cookies where appropriate
• JWT foundation
• Refresh token foundation
• Password hashing foundation
• RBAC foundation
• Permission guard foundation
• Secrets handling
• Audit hooks

Never trust client-side authorization.

Never store plaintext passwords.

Never store application secrets in source control.

────────────────────────────────────────

API FOUNDATION

Implement the REST API foundation.

Support:

• API versioning
• Request validation
• Error conventions
• Response conventions
• Pagination conventions
• Correlation IDs
• Authentication guards
• Authorization guards
• Rate limiting
• OpenAPI / Swagger

Define reusable mechanisms for:

• Cursor pagination
• Offset pagination where appropriate
• Filtering
• Sorting
• Idempotency

Do not implement all business endpoints yet.

────────────────────────────────────────

DATABASE FOUNDATION

Implement PostgreSQL integration using Prisma.

Create:

• Prisma setup
• Database module
• Prisma service
• Connection management
• Graceful shutdown
• Health checks
• Transaction support
• Query logging configuration
• Migration structure

Define conventions for:

• IDs
• Timestamps
• Soft deletion where appropriate
• Optimistic concurrency
• Foreign keys
• Constraints
• Indexes
• Naming

Do not create the entire application database schema in this volume.

Only create structures required by the foundation.

────────────────────────────────────────

PRISMA FOUNDATION

Implement the Prisma foundation.

Define:

• Schema location
• Client lifecycle
• Migration workflow
• Transaction helpers
• Error translation
• Query logging
• Connection pooling
• Repository integration boundaries

Prepare for future service-owned Prisma schemas where required.

Do not expose a single uncontrolled database client to every domain.

────────────────────────────────────────

REDIS FOUNDATION

Implement Redis infrastructure.

Support:

• Connection management
• Health checks
• Graceful shutdown
• Namespaced keys
• Serialization
• TTL handling
• Basic caching abstraction
• Distributed lock abstraction where appropriate

Define conventions for:

• Key naming
• TTL
• Serialization
• Invalidations
• Error behavior

Redis must remain an ephemeral/coordination system and never become the authoritative persistent data store.

────────────────────────────────────────

KAFKA / REDPANDA FOUNDATION

Implement event infrastructure.

Support:

• Producer connection
• Consumer connection
• Topic configuration
• Consumer groups
• Event serialization
• Event metadata
• Event versioning
• Correlation IDs
• Event IDs
• Retry handling
• Dead-letter handling
• Graceful shutdown

Define a reusable event envelope containing:

• Event ID
• Event type
• Event version
• Aggregate ID
• Timestamp
• Correlation ID
• Causation ID where appropriate
• Producer
• Payload

Do not implement the complete domain event catalog yet.

────────────────────────────────────────

BULLMQ FOUNDATION

Implement background-job infrastructure.

Support:

• Queue registration
• Queue configuration
• Producers
• Workers
• Job IDs
• Retry policies
• Exponential backoff
• Timeouts
• Concurrency
• Failure handling
• Dead-letter strategy
• Graceful shutdown
• Queue metrics

Create reusable infrastructure for future queues.

Do not implement all business jobs yet.

────────────────────────────────────────

TRANSACTIONAL OUTBOX FOUNDATION

Implement reusable infrastructure for transactional outbox processing.

Define:

• Outbox record
• Event type
• Event version
• Aggregate ID
• Payload
• Status
• Retry count
• Next retry timestamp
• Published timestamp
• Error information
• Created timestamp

Define how application transactions and event publication remain consistent.

The architecture must prevent loss of events when:

• Database transaction succeeds
• Event publication fails

Define reliable processing and retry behavior.

────────────────────────────────────────

EVENT INFRASTRUCTURE

Implement reusable event publishing and consuming infrastructure.

Support:

• Event publishing
• Event consumption
• Versioning
• Correlation
• Retry
• Idempotency
• Dead-letter handling
• Metrics
• Tracing

Define clear interfaces between domain code and Kafka infrastructure.

Do not couple domain logic directly to Kafka client implementations.

────────────────────────────────────────

HEALTH CHECKS

Implement:

• Liveness
• Readiness
• Startup health where appropriate

Support dependency health checks for:

• PostgreSQL
• Redis
• Kafka/Redpanda
• BullMQ infrastructure

Differentiate between:

• Application alive
• Application ready to receive traffic

Do not create endless restart loops when a recoverable dependency is temporarily unavailable.

────────────────────────────────────────

GRACEFUL SHUTDOWN

Implement graceful shutdown for:

• HTTP server
• NestJS modules
• PostgreSQL
• Redis
• Kafka producers
• Kafka consumers
• BullMQ workers

Define termination order.

Allow in-flight work to finish or fail safely.

Avoid accepting new work once shutdown begins.

────────────────────────────────────────

OBSERVABILITY FOUNDATION

Implement:

• Structured logging
• Metrics
• OpenTelemetry tracing
• Correlation IDs
• Request duration metrics
• Error metrics
• Database metrics
• Redis metrics
• Kafka metrics
• Queue metrics
• Health metrics

Use:

• OpenTelemetry
• Prometheus-compatible metrics
• Grafana-compatible metric naming

Define reusable observability utilities.

────────────────────────────────────────

TESTING FOUNDATION

Implement the testing foundation.

Support:

• Unit tests
• Integration tests
• API tests
• Database tests
• Redis tests
• Kafka tests
• BullMQ tests
• Configuration tests
• Health-check tests

Configure:

• Jest
• Test environment
• Test database strategy
• Fixtures
• Factories
• Test helpers
• Coverage reporting

Do not depend on future business domains.

────────────────────────────────────────

LOCAL DEVELOPMENT SUPPORT

Provide backend development support for local dependencies.

Support local execution of:

• PostgreSQL
• Redis
• Kafka/Redpanda

Use Docker Compose where appropriate for local development.

Do not generate production Kubernetes infrastructure in this volume.

Do not generate Terraform infrastructure in this volume.

────────────────────────────────────────

DOCUMENTATION

Generate documentation describing:

• Backend structure
• Local development
• Environment configuration
• Database workflow
• Prisma workflow
• Redis conventions
• Kafka conventions
• BullMQ conventions
• Logging conventions
• Observability conventions
• Testing workflow
• Error conventions
• API conventions

Documentation must describe the actual generated implementation.

────────────────────────────────────────

PROJECT INDEX

Maintain a backend Project Index.

Track:

• Current milestone
• Generated files
• Modified files
• Backend modules
• Database objects
• Shared packages
• API infrastructure
• Redis infrastructure
• Kafka infrastructure
• Queue infrastructure
• Observability
• Testing
• Remaining work
• Dependencies
• Next milestone

Do not claim functionality that has not been implemented.

────────────────────────────────────────

IMPLEMENTATION MILESTONES

Implement this backend foundation incrementally.

BACKEND MILESTONE 1

Repository and backend monorepo foundation.

BACKEND MILESTONE 2

Application bootstrap, configuration, request context, logging, errors, and validation.

BACKEND MILESTONE 3

Database and Prisma foundation.

BACKEND MILESTONE 4

Redis foundation.

BACKEND MILESTONE 5

Kafka/Redpanda and event infrastructure.

BACKEND MILESTONE 6

BullMQ and background-job infrastructure.

BACKEND MILESTONE 7

Transactional outbox.

BACKEND MILESTONE 8

API security foundation and health checks.

BACKEND MILESTONE 9

Observability and testing foundation.

BACKEND MILESTONE 10

Local development support and backend documentation.

Each milestone should contain approximately 20–40 files when practical.

Every milestone must leave the repository compilable.

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never:

• Truncate code
• Summarize code instead of generating it
• Generate pseudo-code
• Generate placeholders
• Generate TODO implementations
• Omit required imports

When modifying an existing file:

1. Provide the exact path.
2. State why it must change.
3. Provide the complete updated file.

Never regenerate unchanged files.

────────────────────────────────────────

QUALITY BAR

Treat this backend as the foundation of a globally distributed enterprise communication platform.

Assume:

• Hundreds of millions of users
• Billions of messages
• Tens of millions of concurrent WebSocket connections
• Multi-region deployment
• High availability
• Zero-downtime deployment
• Strict security requirements
• Large-scale event processing

Prioritize:

• Correctness
• Reliability
• Maintainability
• Security
• Observability
• Testability
• Scalability
• Clear ownership
• Future service extraction

────────────────────────────────────────

SCOPE RESTRICTION

This prompt implements only the backend foundation.

Do not implement complete:

• User registration workflows
• Messaging workflows
• Group workflows
• Community workflows
• Media business logic
• Stories
• Calls
• Notifications
• Search
• Business accounts
• Moderation
• Analytics
• Full E2EE implementation

Those belong to later backend implementation prompts.

────────────────────────────────────────

FINAL BACKEND FOUNDATION REQUIREMENTS

The completed implementation must provide a stable foundation for future backend domains.

The foundation must include:

• Compilable NestJS backend
• Centralized configuration
• Environment validation
• Structured logging
• Centralized errors
• Request context
• Validation
• Security foundation
• PostgreSQL integration
• Prisma integration
• Redis integration
• Kafka/Redpanda integration
• BullMQ integration
• Transactional outbox foundation
• Health checks
• Graceful shutdown
• OpenTelemetry integration
• Metrics foundation
• Test infrastructure
• Local development support
• Backend documentation
• Project Ind

You are operating in Senior Engineering Team Mode.

Build the production-ready backend foundation for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The backend must follow the established ecommerce architecture, domain boundaries, database ownership, API contracts, payment architecture, inventory architecture, seller architecture, event architecture, and security model.

Do not redesign the architecture.

Do not generate frontend code.

Do not generate mobile code.

Do not generate Kubernetes manifests.

Do not generate Terraform.

Do not generate infrastructure implementation code.

Do not generate CI/CD workflows.

This volume establishes the backend foundation and shared platform infrastructure.

────────────────────────────────────────

MISSION

Build the production-ready backend foundation required for the ecommerce marketplace.

The backend will eventually support:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High checkout traffic
• High inventory throughput
• Large payment volumes
• Seller payouts
• Fulfillment
• Shipping
• Returns
• Reviews
• Search
• Recommendations
• Notifications
• Messaging
• Analytics
• Administration
• Moderation
• CMS
• Multi-region deployment

This volume establishes the shared backend foundation required by all later backend domains.

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Backend:

• Node.js
• NestJS
• TypeScript

Database:

• PostgreSQL
• Prisma ORM

Cache:

• Redis

Search:

• Elasticsearch or OpenSearch

Payments:

• Stripe
• Stripe Connect or approved marketplace-payment architecture

Object Storage:

• AWS S3-compatible object storage

Background Jobs:

• BullMQ

Event Streaming:

• Kafka or Redpanda where justified

API:

• REST
• Webhooks
• Server-Sent Events where appropriate
• WebSockets where appropriate

Documentation:

• OpenAPI / Swagger

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Testing:

• Jest
• Supertest
• Integration and contract testing tools where appropriate

────────────────────────────────────────

IMPLEMENTATION RULES

Never generate pseudo-code.

Never generate placeholders.

Never generate TODO comments.

Never omit implementations.

Never say:

- "implement similarly"
- "left as an exercise"
- "for brevity"
- "remaining code omitted"

Every generated file must be complete.

Every generated file must compile.

Never regenerate unchanged files.

Only modify existing files when required.

Use strict TypeScript.

Use dependency injection.

Keep controllers thin.

Keep business logic out of controllers.

Use repositories for persistence.

Use DTOs for external contracts.

Use centralized validation.

Use centralized error handling.

Use structured logging.

Use graceful shutdown.

Use production-safe configuration.

────────────────────────────────────────

BACKEND ARCHITECTURE

Use:

• Clean Architecture
• Domain-Driven Design
• SOLID
• Repository Pattern
• Service Layer
• Dependency Injection
• Feature-first organization
• Explicit domain boundaries
• CQRS where justified
• Event-driven architecture where appropriate
• Transactional Outbox where appropriate
• Idempotent consumers

The architecture must allow future extraction of independently deployable services without requiring a complete rewrite.

────────────────────────────────────────

MONOREPO FOUNDATION

Create the production-ready backend structure.

Support appropriate areas for:

apps/

• API Gateway

workers/

• Background workers
• Scheduled workers
• Event consumers

packages/

• Configuration
• Logging
• Error handling
• Validation
• Database
• Redis
• Events
• Queues
• Observability
• API contracts
• Shared types
• Testing utilities

services/

Create service boundaries only when the approved architecture requires them.

Do not create unnecessary empty services.

────────────────────────────────────────

APPLICATION BOOTSTRAP

Implement the NestJS application foundation.

Support:

• Application initialization
• Environment loading
• Configuration initialization
• Global validation
• Global exception handling
• Structured logging
• Request IDs
• Correlation IDs
• Secure headers
• CORS
• Request size limits
• API versioning
• Graceful shutdown
• Health endpoints

Use production-safe defaults.

────────────────────────────────────────

CONFIGURATION

Implement centralized strongly typed configuration.

Support:

Application:

• Environment
• Service name
• Version
• Host
• Port

PostgreSQL:

• Host
• Port
• Database
• Username
• Password
• SSL/TLS
• Connection pool

Redis:

• Host
• Port
• Username
• Password
• TLS

Kafka/Redpanda:

• Brokers
• Client ID
• Authentication
• TLS
• Consumer groups

BullMQ:

• Redis connection
• Queue defaults
• Retry defaults

Stripe:

• API configuration
• Webhook configuration

S3:

• Region
• Bucket
• Endpoint where required

Elasticsearch/OpenSearch:

• Endpoint
• Authentication
• TLS

Observability:

• Log level
• OpenTelemetry endpoint
• Metrics configuration

Never hard-code secrets.

Never access environment variables directly throughout business modules.

Validate configuration during startup.

Fail fast when required configuration is invalid.

────────────────────────────────────────

REQUEST CONTEXT

Implement request-context infrastructure supporting:

• Request ID
• Correlation ID
• Trace ID where available
• Service name
• User ID when authenticated
• Seller ID when authenticated as a seller

Propagate request context to:

• Logs
• Metrics
• Traces
• Domain events
• Kafka events
• Background jobs
• External provider calls

────────────────────────────────────────

LOGGING

Implement structured JSON logging.

Log appropriate:

• Timestamp
• Service
• Environment
• Level
• Request ID
• Correlation ID
• Trace ID
• Operation
• Duration
• Result
• Safe error details

Never log:

• Passwords
• Access tokens
• Refresh tokens
• Payment secrets
• Stripe secrets
• Database passwords
• Private keys
• Sensitive customer information unnecessarily

────────────────────────────────────────

ERROR HANDLING

Implement centralized error handling.

Define consistent errors for:

• Validation
• Authentication
• Authorization
• Not found
• Conflict
• Rate limit
• Dependency failure
• Payment provider failure
• Inventory conflict
• External-provider failure
• Infrastructure failure
• Internal failure

Use a consistent API error format containing:

• Error code
• Safe public message
• Request ID
• Correlation ID where appropriate
• Validation details where appropriate

Never expose internal stack traces in production.

────────────────────────────────────────

VALIDATION

Implement centralized validation for:

• Request body
• Query parameters
• Path parameters
• Headers where required
• Configuration
• Event payloads
• Queue payloads
• Webhook payloads

Reject invalid input before business logic executes.

Use strict schemas.

────────────────────────────────────────

SECURITY FOUNDATION

Implement:

• Secure headers
• CORS
• Rate limiting foundation
• Input validation
• Secure cookie architecture where applicable
• Authentication guard foundation
• Authorization guard foundation
• RBAC foundation
• Permission foundation
• Secrets handling
• Audit hooks

Never trust frontend authorization.

Never store plaintext passwords.

Never store production secrets in source control.

────────────────────────────────────────

API FOUNDATION

Implement the REST API foundation.

Support:

• API versioning
• Request validation
• Response conventions
• Error conventions
• Cursor pagination
• Pagination helpers
• Filtering conventions
• Sorting conventions
• Correlation IDs
• Authentication guards
• Authorization guards
• Rate limiting
• OpenAPI / Swagger

Implement reusable infrastructure for:

• Idempotency
• Request cancellation
• Timeouts
• Safe retries

Do not implement all business endpoints yet.

────────────────────────────────────────

DATABASE FOUNDATION

Implement PostgreSQL integration using Prisma.

Create:

• Prisma configuration
• Database module
• Prisma service
• Connection lifecycle
• Graceful shutdown
• Health checks
• Transaction support
• Query logging
• Migration structure

Define conventions for:

• IDs
• Created timestamps
• Updated timestamps
• Soft deletion
• Optimistic concurrency
• Foreign keys
• Constraints
• Indexes
• Monetary fields
• Decimal precision

Use exact decimal types for monetary values.

Do not use floating-point values for money.

Do not create the entire ecommerce schema in this volume.

Only create structures required by the foundation.

────────────────────────────────────────

PRISMA FOUNDATION

Implement:

• Schema organization
• Client lifecycle
• Migration workflow
• Transaction helpers
• Error translation
• Query logging
• Connection pooling
• Repository boundaries

Prepare support for domain-owned schemas or service-specific Prisma clients where required.

Prevent unrestricted direct database access from unrelated modules.

────────────────────────────────────────

REDIS FOUNDATION

Implement Redis infrastructure.

Support:

• Connection management
• Health checks
• Graceful shutdown
• Namespaced keys
• Serialization
• TTL
• Cache abstraction
• Distributed lock abstraction
• Idempotency support

Define conventions for:

• Key naming
• TTL
• Serialization
• Invalidations
• Error behavior

Redis must never become authoritative for:

• Orders
• Payments
• Inventory
• Seller balances
• Refunds

────────────────────────────────────────

KAFKA / REDPANDA FOUNDATION

Implement reusable event infrastructure.

Support:

• Producer connection
• Consumer connection
• Topic configuration
• Consumer groups
• Serialization
• Event metadata
• Event IDs
• Event versioning
• Correlation IDs
• Retry handling
• Dead-letter handling
• Graceful shutdown

Define an event envelope containing:

• Event ID
• Event type
• Event version
• Aggregate ID
• Timestamp
• Correlation ID
• Causation ID where appropriate
• Producer
• Payload

Do not implement the complete ecommerce event catalog yet.

────────────────────────────────────────

TRANSACTIONAL OUTBOX

Implement reusable transactional outbox infrastructure.

Define:

• Outbox ID
• Event type
• Event version
• Aggregate type
• Aggregate ID
• Payload
• Status
• Retry count
• Next retry timestamp
• Published timestamp
• Error information
• Created timestamp

Define how business transactions and event publication remain consistent.

Prevent event loss when:

• Database transaction succeeds
• Event publication fails

Implement safe retry and processing behavior.

────────────────────────────────────────

BULLMQ FOUNDATION

Implement background job infrastructure.

Support:

• Queue registration
• Queue configuration
• Producers
• Workers
• Job IDs
• Retry
• Exponential backoff
• Timeout
• Concurrency
• Failure handling
• Dead-letter behavior
• Graceful shutdown
• Queue metrics

Prepare reusable infrastructure for later:

• Payment jobs
• Search indexing
• Media processing
• Inventory jobs
• Notifications
• Reports
• Cleanup

Do not implement complete business jobs in this volume.

────────────────────────────────────────

HEALTH CHECKS

Implement:

• Liveness
• Readiness
• Startup checks where appropriate

Support dependency checks for:

• PostgreSQL
• Redis
• Kafka/Redpanda
• BullMQ infrastructure
• Elasticsearch/OpenSearch where required

Differentiate:

• Application alive
• Application ready

Do not automatically restart the service indefinitely because a recoverable dependency is temporarily unavailable.

────────────────────────────────────────

GRACEFUL SHUTDOWN

Implement graceful shutdown for:

• HTTP server
• NestJS modules
• PostgreSQL
• Redis
• Kafka producers
• Kafka consumers
• BullMQ workers

Define safe shutdown ordering.

Stop accepting new work before terminating dependencies.

Allow in-flight operations to complete or fail safely.

────────────────────────────────────────

OBSERVABILITY FOUNDATION

Implement:

• Structured logging
• Metrics
• OpenTelemetry tracing
• Correlation IDs
• Request duration metrics
• Error metrics
• Database metrics
• Redis metrics
• Kafka metrics
• Queue metrics
• Health metrics

Use:

• OpenTelemetry
• Prometheus-compatible metrics
• Grafana-compatible dashboards

Define reusable observability utilities.

────────────────────────────────────────

TESTING FOUNDATION

Implement:

• Unit testing
• Integration testing
• API testing
• Database testing
• Redis testing
• Kafka testing
• BullMQ testing
• Configuration testing
• Health-check testing

Configure:

• Jest
• Test environment
• Test database strategy
• Factories
• Fixtures
• Test helpers
• Coverage reporting

Tests must be deterministic.

────────────────────────────────────────

LOCAL DEVELOPMENT

Provide local development infrastructure for:

• PostgreSQL
• Redis
• Kafka/Redpanda
• Elasticsearch/OpenSearch where required

Use Docker Compose where appropriate.

The local stack must be sufficient for backend development without requiring AWS for every operation.

Do not create production Kubernetes infrastructure in this volume.

Do not create Terraform infrastructure in this volume.

────────────────────────────────────────

DOCUMENTATION

Generate backend foundation documentation for:

• Backend structure
• Local development
• Environment variables
• Database workflow
• Prisma workflow
• Redis conventions
• Kafka conventions
• BullMQ conventions
• Logging conventions
• Error conventions
• API conventions
• Observability conventions
• Testing workflow

Documentation must reflect the actual generated implementation.

────────────────────────────────────────

PROJECT INDEX

Maintain the backend Project Index.

Track:

• Current milestone
• Generated files
• Modified files
• Backend modules
• Database objects
• Shared packages
• API infrastructure
• Redis infrastructure
• Kafka infrastructure
• BullMQ infrastructure
• Observability
• Testing
• Remaining work
• Dependencies
• Next milestone

Do not claim functionality that has not been implemented.

────────────────────────────────────────

IMPLEMENTATION MILESTONES

BACKEND MILESTONE 1

Monorepo/backend structure and application bootstrap.

BACKEND MILESTONE 2

Configuration, request context, logging, errors, validation, security foundation, and API foundation.

BACKEND MILESTONE 3

PostgreSQL and Prisma foundation.

BACKEND MILESTONE 4

Redis foundation.

BACKEND MILESTONE 5

Kafka/Redpanda and event infrastructure.

BACKEND MILESTONE 6

BullMQ and background-job infrastructure.

BACKEND MILESTONE 7

Transactional outbox.

BACKEND MILESTONE 8

Health checks, graceful shutdown, and observability.

BACKEND MILESTONE 9

Testing infrastructure and integration test foundation.

BACKEND MILESTONE 10

Local development, documentation, and Project Index.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must compile before proceeding.

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never truncate code.

Never summarize source code instead of generating it.

Never generate pseudo-code.

Never generate placeholders.

Never generate TODO implementations.

When modifying an existing file:

1. Provide the exact file path.
2. State why it must change.
3. Provide the complete updated file.

Never regenerate unchanged files.

────────────────────────────────────────

SCOPE RESTRICTION

This volume covers only:

• Backend foundation
• Configuration
• Security foundation
• API foundation
• PostgreSQL
• Prisma
• Redis
• Kafka/Redpanda
• BullMQ
• Transactional outbox
• Observability
• Health checks
• Testing foundation
• Local development
• Backend documentation

Do not implement complete:

• Identity
• Customer accounts
• Seller onboarding
• Catalog
• Products
• Pricing
• Promotions
• Inventory
• Cart
• Checkout
• Orders
• Payments
• Fulfillment
• Shipping
• Returns
• Reviews
• Search
• Recommendations
• Notifications
• Messaging
• Analytics
• Administration
• CMS
• Moderation

Those belong to later backend implementation volumes.

────────────────────────────────────────

QUALITY BAR

Treat this backend foundation as critical infrastructure for a globally distributed ecommerce marketplace.

Assume:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High checkout traffic
• High inventory throughput
• Large payment volumes
• Multi-region deployment
• High availability
• Zero-downtime deployment
• Strict security requirements

Prioritize:

• Correctness
• Reliability
• Security
• Observability
• Scalability
• Testability
• Maintainability
• Clear ownership
• Future service extraction
• Production readiness
