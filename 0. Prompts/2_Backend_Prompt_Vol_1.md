# WhatsApp-Style Messaging Platform — Backend Prompt — Volume 1

## ROLE

You are the **Staff Backend Engineer and Distributed Systems Engineer** responsible for implementing the foundational backend platform for the **WhatsApp-style messaging platform**.

This is a **bounded backend implementation milestone**.

Operate with the combined responsibilities of:

* Staff Backend Engineer
* Principal Software Architect
* Database Architect
* Distributed Systems Engineer
* Security Engineer
* Performance Engineer
* Reliability Engineer
* QA Engineer
* DevOps Engineer
* Technical Writer

Implement real, production-grade backend functionality within the scope of this prompt.

Do not implement unrelated frontend, mobile, infrastructure, or future backend functionality.

---

# PROJECT

The project is an independently engineered **production-grade, globally scalable, WhatsApp-style real-time communications platform**.

The backend technology direction is:

* NestJS;
* TypeScript;
* PostgreSQL;
* Prisma or an equivalent strongly typed data-access layer;
* Redis where required by this milestone;
* REST APIs;
* authenticated WebSocket infrastructure where required by this milestone;
* structured logging;
* OpenTelemetry-compatible observability;
* automated testing.

The completed backend is intended to support:

* accounts;
* authentication;
* profiles;
* devices;
* sessions;
* conversations;
* groups;
* members;
* messaging;
* receipts;
* reactions;
* presence;
* media;
* notifications;
* realtime synchronization;
* search;
* moderation;
* administration;
* analytics;
* background processing.

This prompt implements only the **foundational backend platform and identity/conversation foundations** required for subsequent backend milestones.

---

# CURRENT BACKEND SCOPE

This volume implements the backend foundation required before the higher-level messaging, media, notification, search, and moderation domains are added.

Implement:

* backend project structure;
* application bootstrap;
* configuration system;
* environment validation;
* global error handling;
* request correlation;
* structured logging foundation;
* health/readiness endpoints;
* database integration;
* Prisma/data-access foundation;
* core database conventions;
* migration foundation;
* account domain;
* user/profile domain;
* device domain;
* session domain;
* authentication foundation;
* authorization foundation;
* conversation domain foundation;
* conversation membership;
* group foundation;
* REST API foundation for these domains;
* validation;
* rate-limiting foundation where appropriate;
* security middleware/guards required by this scope;
* foundational Redis integration where required;
* foundational test infrastructure;
* API documentation foundation;
* observability foundation for the implemented backend components.

The architecture must be modular so later backend milestones can add:

* message persistence and delivery;
* realtime messaging;
* message receipts;
* reactions;
* presence;
* media;
* notifications;
* search;
* moderation;
* analytics;
* background workers.

Do not implement those future domains merely because they appear in the global product specification.

---

# OUT-OF-SCOPE

This milestone does not implement:

* full message sending and delivery;
* message persistence beyond structures strictly necessary for the currently implemented conversation model;
* message reactions;
* delivery receipts;
* read receipts;
* typing indicators;
* production presence;
* media upload/processing;
* push notification delivery;
* search indexing;
* moderation workflows;
* analytics pipelines;
* Kafka/Redpanda event infrastructure unless a minimal abstraction is required by the current foundation;
* complete BullMQ worker infrastructure;
* complete WebSocket messaging protocol;
* complete production Kubernetes deployment;
* complete Terraform infrastructure;
* complete frontend;
* complete mobile applications;
* complete end-to-end test suites spanning the entire future platform.

Do not create fake implementations of those systems.

Create only the abstractions and extension points genuinely needed by the current scope.

---

# SOURCE-OF-TRUTH MODEL

Inspect the actual repository before modifying it.

The repository represents the current implementation state.

Determine:

* existing application structure;
* existing package manager;
* existing TypeScript configuration;
* existing NestJS modules;
* existing database configuration;
* existing Prisma schema and migrations;
* existing environment files;
* existing tests;
* existing API conventions;
* existing documentation;
* existing compatible infrastructure.

Preserve compatible existing functionality.

Do not rewrite unrelated working code merely to impose a preferred structure.

Do not assume that a previous AI prompt was executed.

Do not refer to an earlier AI conversation as a source of truth.

If a required foundational component does not exist, implement it within this prompt's scope.

If the repository already contains a compatible implementation, extend it rather than creating competing implementations.

---

# IMPLEMENTATION DISCIPLINE

Before changing code:

1. Inspect the repository.
2. Determine the actual current state.
3. Identify reusable compatible infrastructure.
4. Identify conflicts with the backend architecture required by this prompt.
5. Establish the smallest safe change set.
6. Implement only this prompt's scope.

Do not regenerate unrelated files.

Do not replace working infrastructure without a concrete reason.

Do not create duplicate configuration systems.

Do not create duplicate database access layers.

Do not create duplicate authentication systems.

---

# BACKEND ARCHITECTURE

Use a modular NestJS architecture organized around domain ownership rather than arbitrary technical layers.

The exact module names must remain consistent throughout the project.

The foundational domain structure should include appropriate modules for:

* configuration;
* health;
* database;
* authentication;
* accounts;
* users/profiles;
* devices;
* sessions;
* conversations;
* groups/memberships.

The implementation should maintain strong separation between:

* controllers;
* application/use-case logic;
* domain logic;
* persistence;
* infrastructure adapters;
* security concerns.

Do not turn every small function into a separate service or abstraction without justification.

---

# APPLICATION BOOTSTRAP

Implement the production backend bootstrap.

It must establish, where applicable:

* NestJS application creation;
* global validation;
* global exception handling;
* structured logging;
* request/correlation ID handling;
* security middleware;
* API prefixing;
* API documentation setup;
* graceful shutdown;
* configuration loading;
* database lifecycle integration;
* health integration.

The bootstrap must fail safely when required configuration is invalid.

Do not silently start with missing security-critical configuration.

---

# CONFIGURATION SYSTEM

Implement typed configuration management.

Configuration must support separate values for:

* application environment;
* HTTP configuration;
* database;
* Redis where used;
* authentication;
* CORS;
* rate limiting;
* logging;
* observability;
* API documentation;
* cryptographic/security settings.

Validate required variables at startup.

Do not hardcode:

* credentials;
* secrets;
* signing keys;
* production URLs;
* database passwords;
* provider credentials.

Provide safe development defaults only where doing so does not weaken production security.

---

# ENVIRONMENT CONTRACT

Establish a consistent naming convention for backend configuration.

The configuration layer must:

* validate types;
* reject invalid values;
* distinguish required and optional variables;
* avoid exposing secrets through logs;
* expose only explicitly required configuration to each module.

Do not allow arbitrary direct reads of `process.env` throughout the application.

Centralize configuration access.

---

# DATABASE FOUNDATION

Implement the PostgreSQL integration.

Establish:

* Prisma or the selected typed data-access layer;
* a centralized database module/service;
* startup connection behavior;
* shutdown behavior;
* transaction support;
* error translation strategy;
* migration support;
* test-database strategy where practical.

Do not spread raw database client initialization throughout modules.

Database access must be explicit and testable.

---

# DATABASE SCHEMA — FOUNDATIONAL DOMAINS

Implement the foundational database models required by this milestone.

At minimum support the conceptual entities:

* User/Account;
* Profile;
* Device;
* Session;
* Conversation;
* ConversationMember;
* Group metadata where group conversations are represented.

Use the architecture's canonical identifiers and naming conventions.

The schema must enforce appropriate:

* primary keys;
* uniqueness;
* foreign keys;
* indexes;
* nullability;
* timestamps;
* status constraints.

Do not create fields merely because they might be useful in a future feature.

Add future-compatible fields only when they are necessary for the established architecture.

---

# USER AND ACCOUNT MODEL

Implement the account/user foundation.

The system must distinguish appropriately between:

* account identity;
* user profile;
* authentication credentials;
* device/session state.

Implement account lifecycle states appropriate to the product, such as an active/disabled/deleted model if required by the architecture.

Do not store authentication credentials in profile data.

Do not expose sensitive credential fields through API responses.

---

# PROFILE MODEL

Implement the profile foundation.

Support the fields required for the current product foundation, such as:

* display name;
* username or equivalent unique public identifier where applicable;
* profile image reference where architecture requires it;
* privacy-relevant profile state where necessary.

The profile model must not become a dumping ground for future messaging or media metadata.

---

# DEVICE MODEL

Implement device registration and identification.

A device record should support, as appropriate:

* device ID;
* owning account;
* platform;
* application metadata;
* last activity;
* status;
* creation/update timestamps.

Do not store secrets in plaintext merely because they are associated with a device.

Device metadata must be minimized to what the product actually needs.

---

# SESSION MODEL

Implement durable session tracking appropriate to the authentication architecture.

Support:

* session identity;
* account association;
* device association;
* creation;
* expiration;
* revocation;
* last activity where appropriate.

The system must support multi-device accounts.

Session revocation must be enforceable server-side.

---

# AUTHENTICATION FOUNDATION

Implement the authentication foundation defined by the project architecture.

The implementation must include the relevant authentication flow for the current product scope, such as:

* registration/account creation;
* credential-based authentication where applicable;
* session creation;
* access-token or session-token issuance according to the established architecture;
* refresh/reissue behavior where applicable;
* logout;
* session revocation.

Do not invent a competing authentication model.

Use established, secure cryptographic libraries.

Passwords must never be stored in plaintext.

Never log credentials, tokens, or secrets.

---

# PASSWORD SECURITY

Where password authentication is part of the product:

* use a modern password hashing algorithm appropriate for production;
* use per-password salts;
* configure work factors appropriately;
* perform verification in constant-time-safe library operations where applicable;
* reject obviously unsafe configurations;
* avoid password enumeration through distinguishable responses where appropriate.

Do not implement custom password hashing.

---

# TOKEN AND SESSION SECURITY

Where access and refresh tokens are used:

* sign them using secure server-side configuration;
* validate issuer/audience claims where applicable;
* enforce expiration;
* implement revocation where required;
* protect refresh operations;
* avoid exposing secrets in URLs;
* do not log token contents.

For web clients, use a storage model appropriate to the chosen web security architecture.

For mobile clients, the backend must provide the session semantics required for secure platform storage.

---

# AUTHORIZATION FOUNDATION

Implement centralized authorization primitives for the currently implemented domains.

Authorization must verify:

* authenticated identity;
* account state;
* resource ownership;
* conversation membership;
* group membership;
* group administrative privilege where applicable.

Do not trust user IDs supplied by clients merely because they are syntactically valid.

Prevent IDOR vulnerabilities by checking ownership/membership against authoritative database state.

---

# ACCOUNT SECURITY

Implement appropriate protections for:

* repeated authentication failures;
* excessive registration attempts;
* session abuse;
* disabled accounts;
* revoked sessions.

Use rate limiting where appropriate.

Do not allow a security control to create an easy denial-of-service vector against legitimate accounts without considering the tradeoff.

---

# CONVERSATION DOMAIN

Implement the foundational conversation model.

Support:

* one-to-one conversations;
* group conversations;
* creation;
* retrieval;
* membership;
* membership status;
* basic metadata required by the current scope.

The conversation service must own conversation state rather than duplicating it across unrelated modules.

---

# DIRECT CONVERSATION UNIQUENESS

The backend must prevent creation of multiple unintended one-to-one conversation records for the same pair of participating users.

Define and implement an appropriate uniqueness or deterministic lookup strategy.

It must remain correct under concurrent requests.

Do not rely only on application-level prechecks.

Use database constraints or transactional mechanisms where appropriate.

---

# GROUP FOUNDATION

Implement the foundational group model.

Support:

* group creation;
* group identity;
* group metadata necessary for the current scope;
* member membership;
* membership role;
* membership status;
* initial owner/administrator semantics.

Do not implement the entire future group-administration product in this milestone.

However, the membership model must be strong enough for future:

* role changes;
* invitations;
* removals;
* ownership transfer;
* moderation.

---

# CONVERSATION MEMBERSHIP

Implement membership persistence and authorization.

Membership operations must be safe under concurrent changes.

Define appropriate statuses, such as:

* active;
* removed;
* left;
* pending,

only where they are required by the current functionality.

Do not create speculative state machines.

The membership model must make future authorization checks deterministic.

---

# CONVERSATION ACCESS CONTROL

All conversation reads and mutations must verify membership or ownership.

A user must not be able to access a conversation solely by knowing its ID.

Protect against:

* IDOR;
* membership race conditions;
* removed-member access;
* cross-account access.

Authorization checks must occur server-side.

---

# REST API FOUNDATION

Implement the foundational REST APIs for the domains in scope.

At minimum provide appropriate endpoints for:

* authentication;
* session lifecycle;
* current-user/profile retrieval;
* device registration where required;
* conversation creation/listing/retrieval;
* conversation membership retrieval;
* group creation;
* basic group retrieval.

Use resource-oriented routes.

Use consistent HTTP status semantics.

Do not create routes for future functionality merely because the corresponding domain exists in the global product description.

---

# REQUEST VALIDATION

All external API inputs must be validated.

Use strongly typed DTO/schema validation.

Reject:

* malformed identifiers;
* invalid enum values;
* invalid strings;
* excessive payload sizes;
* invalid pagination parameters;
* unauthorized nested resources.

Do not trust client-provided timestamps for authoritative state.

Do not allow clients to submit server-controlled ownership fields.

---

# ERROR MODEL

Implement a consistent backend error model.

Errors should provide:

* stable error code;
* appropriate HTTP status;
* safe client-facing message;
* optional field validation information;
* request/correlation identifier where appropriate;
* retryability semantics where useful.

Do not expose:

* stack traces;
* SQL details;
* internal service names;
* secrets;
* infrastructure topology.

---

# API PAGINATION

For list operations that may scale, establish the canonical pagination implementation defined by the architecture.

Prefer cursor-based pagination where appropriate.

Ensure:

* stable ordering;
* bounded page size;
* invalid-cursor handling;
* duplicate avoidance;
* deterministic results.

Do not allow clients to request unbounded result sets.

---

# API DOCUMENTATION

Document the APIs implemented in this prompt using the project's selected API documentation mechanism, such as OpenAPI/Swagger.

The documentation must reflect the actual implementation.

Document:

* authentication;
* request schemas;
* response schemas;
* error responses;
* pagination;
* authorization requirements.

Do not document future endpoints as though they exist.

---

# REDIS FOUNDATION

If Redis is required by the architecture for this backend foundation, implement the shared Redis integration in a reusable way.

The foundation must support future use for:

* rate limiting;
* ephemeral session state where applicable;
* presence;
* distributed coordination.

Do not treat Redis as the authoritative store for users, sessions, conversations, or other durable application state unless the architecture explicitly requires that behavior.

Define connection lifecycle and failure behavior.

---

# RATE LIMITING FOUNDATION

Implement rate-limiting primitives for appropriate authentication and high-risk endpoints.

Consider limiting:

* registration;
* login;
* refresh/recovery operations;
* conversation creation;
* sensitive membership operations.

Use dimensions appropriate to the operation, such as:

* IP;
* account;
* device;
* endpoint.

Do not make all endpoints share one simplistic global limit.

---

# SECURITY MIDDLEWARE

Implement security protections appropriate to the backend stack and this milestone.

Include, as applicable:

* secure HTTP headers;
* CORS configuration;
* request size limits;
* validation;
* authentication guards;
* authorization guards;
* rate limiting;
* safe error serialization;
* structured security logging.

Do not enable unsafe wildcard production configurations by default.

---

# REQUEST CORRELATION

Every relevant HTTP request must have a correlation/request ID.

Support propagation into:

* application logs;
* database-related diagnostics where appropriate;
* asynchronous work metadata where later infrastructure adopts it;
* outbound integrations where applicable.

Do not trust arbitrary client-supplied correlation identifiers without validation.

---

# LOGGING

Implement structured logs.

Logs must contain enough contextual information for operations without exposing sensitive data.

Where applicable record:

* timestamp;
* level;
* service;
* environment;
* request ID;
* route;
* status;
* latency;
* actor ID when safe;
* error code.

Never log:

* passwords;
* access tokens;
* refresh tokens;
* secret values;
* private cryptographic material.

---

# OBSERVABILITY FOUNDATION

Instrument the current backend components for:

* HTTP latency;
* request counts;
* error counts;
* database connectivity;
* database query failures;
* authentication failures;
* authorization failures;
* rate-limit events;
* session lifecycle;
* conversation operations.

Use the project's observability direction.

Do not add meaningless metrics merely to increase metric count.

---

# HEALTH AND READINESS

Implement:

* liveness endpoint;
* readiness endpoint;
* dependency health checks appropriate to the current scope.

Readiness should reflect whether the application can safely serve traffic.

Do not use a health endpoint that always returns success regardless of critical dependency state.

Do not expose sensitive infrastructure information through health endpoints.

---

# DATABASE TRANSACTIONS

Use transactions for operations requiring atomicity.

At minimum consider transactional behavior for:

* account/session creation flows;
* conversation creation;
* group creation;
* membership changes;
* direct-conversation uniqueness;
* session revocation where multiple state changes occur.

Do not wrap every operation in unnecessarily broad transactions.

Keep transaction boundaries explicit.

---

# CONCURRENCY

Handle concurrent requests correctly for:

* direct conversation creation;
* membership modifications;
* session revocation;
* account-state changes.

Use database constraints and transactional logic rather than relying only on race-prone in-memory checks.

Do not use distributed locks when a database constraint or transaction can safely solve the problem.

---

# DATA PRIVACY

API responses must return only data appropriate to the authenticated user and endpoint.

Never expose:

* password hashes;
* refresh secrets;
* internal authorization metadata;
* private device credentials;
* internal audit metadata unless explicitly authorized.

Implement serialization boundaries so internal database models are not accidentally returned directly.

---

# AUDITABLE SECURITY EVENTS

Within this milestone, record security-sensitive application events where appropriate, such as:

* authentication success/failure;
* session creation;
* session revocation;
* account disabling;
* privileged membership operation.

Use an extensible audit mechanism that later administrative infrastructure can expand.

Do not create a full analytics pipeline in this milestone.

---

# DATABASE MIGRATIONS

Create safe migration files for all schema changes.

Migrations must:

* be deterministic;
* preserve existing compatible data;
* include appropriate indexes;
* avoid destructive changes without explicit scope;
* support the deployment strategy;
* be reviewable.

Do not make manual database edits part of the normal installation path.

---

# SEEDING AND LOCAL DEVELOPMENT

Where appropriate, provide deterministic development/test seed support for:

* representative users;
* direct conversation;
* group conversation;
* memberships;
* development-safe session data.

Never seed real credentials or production secrets.

Test data must be clearly separate from production data.

---

# TESTING

Implement automated tests appropriate to this milestone.

At minimum cover:

## Authentication

* registration success;
* invalid credentials;
* account state restrictions;
* session issuance;
* token/session validation;
* logout;
* revocation;
* multi-device sessions where applicable;
* rate limiting behavior.

## Authorization

* authenticated access;
* unauthenticated rejection;
* conversation membership enforcement;
* unauthorized group access;
* IDOR protection.

## Conversations

* direct conversation creation;
* duplicate concurrent creation;
* conversation retrieval;
* membership enforcement;
* group creation;
* membership persistence.

## Database

* migrations;
* constraints;
* uniqueness;
* transaction behavior;
* important indexes where practical.

## API

* request validation;
* status codes;
* error schema;
* pagination;
* safe response serialization.

## Security

* credential secrecy;
* secret non-logging;
* authorization boundaries;
* abuse controls.

Prefer integration tests that exercise real application modules and a test database over tests that merely mock the entire persistence layer.

---

# FAILURE TESTING

Where practical, test failure cases for:

* database connection failure;
* invalid configuration;
* Redis unavailability if Redis is required in this milestone;
* transaction rollback;
* duplicate concurrent operations;
* revoked sessions;
* invalid membership access.

The objective is to verify safe behavior rather than merely happy paths.

---

# PERFORMANCE

Avoid obvious backend performance failures.

At minimum verify:

* conversation listing does not produce unbounded queries;
* membership checks are indexed;
* direct-conversation lookup is indexed;
* session lookups are indexed;
* authentication queries use appropriate indexes;
* pagination is bounded;
* API responses do not trigger avoidable N+1 queries.

Do not optimize prematurely without measurements, but do establish correct access patterns.

---

# FUTURE COMPATIBILITY

The implementation must leave stable extension points for later milestones involving:

* message persistence;
* message delivery;
* WebSocket messaging;
* message receipts;
* reactions;
* presence;
* media;
* notifications;
* search;
* event streaming;
* background workers;
* moderation;
* administration.

Do not create APIs or database structures that make these later domains impossible or require unnecessary redesign.

Do not implement those future features in this milestone unless directly required by the current foundation.

---

# API AND DOMAIN COMPATIBILITY

Use terminology consistently:

* User;
* Profile;
* Device;
* Session;
* Conversation;
* ConversationMember;
* Group;
* Message.

Do not rename these concepts casually.

Use stable IDs.

Use consistent timestamps.

Use the project's standardized error structure.

Use the canonical authentication and authorization terminology.

---

# DOCUMENTATION

Update the project's documentation where this implementation changes operational or developer-facing behavior.

Document:

* backend setup;
* required environment variables;
* database initialization;
* migrations;
* local test execution;
* authentication API;
* conversation API;
* configuration;
* development seed behavior;
* health endpoints.

Documentation must describe only functionality actually implemented in this milestone.

---

# NO FAKE COMPLETENESS

Do not create:

* fake message delivery;
* fake WebSocket behavior;
* fake notification systems;
* fake media systems;
* fake search;
* fake event consumers;
* fake production infrastructure.

Create only the real backend foundation within scope.

Where future extension points are needed, define real interfaces or module boundaries rather than pretending future functionality already exists.

---

# NO HARDCODED SECRETS

Never hardcode:

* JWT secrets;
* signing keys;
* passwords;
* database credentials;
* Redis credentials;
* API keys;
* production URLs containing secrets;
* private keys.

Use environment-driven configuration and secure secret-management conventions.

---

# VALIDATION

Before declaring the milestone complete, perform all applicable validation:

* type checking;
* linting;
* formatting;
* unit tests;
* integration tests;
* database migration validation;
* API validation;
* authentication validation;
* authorization validation;
* security validation;
* build validation;
* startup validation;
* health/readiness validation.

Inspect the final diff.

Ensure no unrelated files were changed unnecessarily.

Ensure no debugging code or temporary credentials remain.

Ensure generated documentation matches actual behavior.

---

# COMPLETION REPORT

After implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* backend modules created or extended;
* database schema changes;
* migrations;
* API endpoints added;
* authentication changes;
* authorization changes;
* conversation/group changes;
* Redis changes;
* configuration changes;
* security changes;
* observability changes;
* tests created;
* tests executed;
* validation performed;
* documentation updated;
* compatibility considerations;
* unresolved issues;
* external blockers, if any.

Do not claim tests were executed if they were not.

Do not claim external services were verified if they were unavailable.

Do not claim future messaging functionality has been implemented.

---

# DEFINITION OF DONE

This backend milestone is complete only when:

* the backend foundation starts correctly;
* configuration is validated;
* database integration is operational;
* migrations are present and valid;
* account/user/profile foundations are implemented;
* device/session foundations are implemented;
* authentication is functional within scope;
* authorization is enforced server-side;
* conversation foundations are implemented;
* group foundations are implemented;
* membership authorization is enforced;
* APIs are documented;
* request validation is enforced;
* standardized errors are implemented;
* rate limiting is implemented where required;
* security middleware is configured;
* structured logging is operational;
* request correlation is operational;
* health/readiness behavior is implemented;
* required observability is present;
* relevant automated tests pass;
* concurrency-sensitive operations are safe;
* no secrets are hardcoded;
* no intentional implementation gaps exist within scope;
* the implementation remains compatible with the later messaging, realtime, media, notification, search, infrastructure, and QA milestones.

This Definition of Done applies only to **Backend Prompt — Volume 1**.

It does not require implementation of the complete backend platform.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as **Backend Prompt — Volume 1 only**.

Inspect the repository first.

Implement only the foundational backend scope defined here.

Do not implement unrelated future backend domains.

Do not implement the frontend.

Do not implement mobile applications.

Do not implement complete production infrastructure.

Do not implement the complete QA system.

Do not invent another backend volume or project phase.

Do not depend on any previous AI response.

Use the repository as the authoritative representation of what currently exists.

Preserve compatible functionality.

Implement real production-grade behavior within scope.

Run appropriate validation.

Inspect the final changes.

Provide the required completion report and accurately report what was implemented and verified.
