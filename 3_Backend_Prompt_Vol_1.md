# BACKEND IMPLEMENTATION PROMPT — VOLUME 1

## Production-Grade Real-Time Communication Platform

### Backend Foundation, Identity, Authentication, Users, Devices, Sessions, Security, and Core Infrastructure

You are implementing **Volume 1 of the backend** for a production-grade, globally scalable, WhatsApp-like real-time communication platform.

This is an original communication platform inspired by the capabilities users expect from modern messaging applications. It is not an implementation of proprietary WhatsApp source code, internal infrastructure, private protocols, or undocumented behavior.

This prompt is **fully standalone**. It must contain everything required to execute this implementation task without requiring another prompt, architecture document, previous conversation, or previously generated prompt to be present.

The actual repository is the source of truth for existing implementation. This backend volume is one implementation unit of a single coherent system. It must integrate cleanly with functionality that already exists or will be implemented later in the same repository.

---

# 1. PRIMARY OBJECTIVE

Implement the production-grade backend foundation and identity layer of the platform.

The implementation must establish a reliable foundation for:

* application bootstrap;
* configuration management;
* environment validation;
* PostgreSQL;
* Prisma;
* Redis;
* NestJS modular architecture;
* authentication;
* accounts;
* users;
* profiles;
* devices;
* sessions;
* refresh-token/session lifecycle;
* password/security credential handling where applicable;
* authentication rate limiting;
* authorization foundations;
* request validation;
* API error contracts;
* structured logging;
* tracing;
* health/readiness checks;
* security middleware;
* audit/security events;
* database migrations;
* automated backend tests.

The implementation must be production-ready.

Do not merely create a NestJS skeleton.

Do not create placeholder modules.

Do not generate TODO/FIXME implementations.

Every implemented feature must contain its real business logic, persistence behavior, validation, security controls, error handling, observability, and tests appropriate to its scope.

---

# 2. PRODUCT CONTEXT

The overall platform is a globally scalable real-time communication system supporting:

* user accounts;
* profiles;
* multiple devices per account;
* authentication and sessions;
* contacts;
* direct conversations;
* group conversations;
* text messaging;
* media messages;
* replies;
* forwarding;
* editing;
* deletion;
* reactions;
* delivery receipts;
* read receipts;
* typing indicators;
* online/offline presence;
* push notifications;
* real-time synchronization;
* multi-device synchronization;
* media uploads and processing;
* search;
* privacy controls;
* blocking;
* reporting;
* abuse prevention;
* voice/video calling;
* WebRTC;
* background processing.

This backend volume does **not** attempt to implement all of those domains.

It establishes the foundational backend capabilities upon which the remaining domains can safely build.

---

# 3. REQUIRED TECHNOLOGY STACK

Use the following technologies unless the existing repository contains a compatible implementation that should be preserved and extended:

## Backend

* Node.js
* NestJS
* TypeScript

## Database

* PostgreSQL
* Prisma ORM

## Distributed infrastructure

* Redis
* Kafka or Redpanda
* BullMQ

## Real-time

* WebSockets
* Socket.IO where appropriate

## Storage and media

* AWS S3
* CloudFront
* FFmpeg
* image-processing tooling where required

## Notifications

* Firebase Cloud Messaging
* Apple Push Notification service

## Calling

* WebRTC
* STUN/TURN

## Search

* Elasticsearch or OpenSearch

## Frontend ecosystem

The backend must expose stable contracts suitable for:

* Next.js;
* React;
* TypeScript;
* TanStack Query;
* Zustand.

## Mobile ecosystem

The backend must expose stable contracts suitable for:

* React Native;
* Expo;
* TypeScript;
* React Navigation.

## Infrastructure

The backend must remain deployable through:

* Docker;
* Kubernetes;
* Helm;
* Terraform;
* GitHub Actions.

## Observability

Use appropriate support for:

* OpenTelemetry;
* Prometheus;
* Grafana;
* Loki;
* Tempo.

Do not invent provider capabilities.

---

# 4. FIRST ACTION — INSPECT THE REPOSITORY

Before changing anything:

1. Inspect the complete repository structure relevant to the backend.
2. Determine whether a backend already exists.
3. Identify:

   * package manager;
   * Node version;
   * NestJS version;
   * TypeScript configuration;
   * existing modules;
   * Prisma configuration;
   * existing database schema;
   * migrations;
   * environment configuration;
   * Redis integration;
   * Kafka/Redpanda integration;
   * BullMQ integration;
   * logging;
   * testing;
   * Docker configuration;
   * CI configuration.
4. Identify existing conventions.
5. Identify existing API conventions.
6. Identify existing error structures.
7. Identify existing authentication code.
8. Identify existing database models.
9. Identify existing observability infrastructure.
10. Identify incompatible or duplicated implementations.

Do not blindly replace existing infrastructure.

If compatible functionality already exists, extend it.

If the repository differs from the requirements, make the smallest safe architectural change necessary to bring it into alignment.

Do not create competing implementations of the same responsibility.

---

# 5. IMPLEMENTATION PRINCIPLES

The backend must follow:

* Clean Architecture;
* Domain-Driven Design;
* SOLID;
* separation of concerns;
* modular design;
* repository pattern where appropriate;
* service/application layer;
* explicit domain/business rules;
* strong typing;
* dependency inversion;
* transactional integrity;
* secure-by-default behavior;
* observable operations;
* deterministic error handling;
* idempotent operations where required;
* backward-compatible evolution.

Do not over-engineer abstractions that provide no practical value.

Do not create generic frameworks inside the application merely for architectural appearance.

---

# 6. BACKEND MODULE STRUCTURE

Establish a coherent modular structure capable of growing into the complete platform.

At minimum, establish appropriate modules for:

* Application/Core
* Configuration
* Database
* Redis
* Health
* Observability
* Security
* Identity
* Users
* Devices
* Sessions

The exact folder structure must follow the repository's existing conventions when reasonable.

Future modules will include domains such as:

* Contacts
* Conversations
* Messaging
* Message State
* Presence
* Media
* Notifications
* Search
* Privacy/Safety
* Calling
* Administration

Do not implement fake versions of these future modules merely to create empty scaffolding.

Only create integration interfaces when they are genuinely required by implemented functionality.

---

# 7. APPLICATION BOOTSTRAP

Implement production-grade NestJS bootstrap behavior.

Include appropriate handling for:

* environment configuration;
* startup validation;
* graceful shutdown;
* uncaught errors;
* unhandled promise rejections;
* HTTP server configuration;
* request IDs;
* correlation IDs;
* security headers;
* body limits;
* CORS;
* API versioning;
* global validation;
* global exception handling;
* structured logging;
* OpenTelemetry initialization where appropriate.

The application must fail fast when required configuration is invalid.

Do not allow silently missing critical environment variables.

---

# 8. CONFIGURATION SYSTEM

Implement strongly typed configuration.

Separate configuration into logical domains such as:

* application;
* HTTP;
* database;
* Redis;
* authentication;
* security;
* rate limiting;
* observability;
* messaging;
* storage;
* notifications;
* external services.

Validate configuration at startup.

Never hardcode:

* passwords;
* JWT secrets;
* encryption keys;
* API credentials;
* database credentials;
* cloud credentials;
* provider secrets.

Provide safe development/test configuration mechanisms without introducing production secrets.

Ensure configuration can be supplied through environment variables in Docker/Kubernetes deployments.

---

# 9. DATABASE FOUNDATION

Implement the PostgreSQL + Prisma foundation.

Requirements:

* Prisma configured correctly;
* connection lifecycle handled safely;
* migrations tracked in the repository;
* production migration workflow supported;
* transactions supported;
* database errors mapped appropriately;
* graceful shutdown;
* connection configuration suitable for production;
* query logging controlled to avoid sensitive-data leakage.

Do not use Prisma's development-only schema synchronization as the production migration strategy.

Use explicit migrations.

---

# 10. CORE IDENTITY DATA MODEL

Implement the foundational persistent models required for identity.

At minimum support concepts equivalent to:

## User

Represents the platform identity.

Possible fields include:

* id;
* username/handle where applicable;
* display name;
* profile information;
* account status;
* created timestamp;
* updated timestamp;
* deleted/deactivation state where required.

Do not add fields merely because they are common in other applications. Every field must have a clear purpose.

## Account/Auth Identity

Represent authentication-related identity separately where useful.

Support:

* account state;
* authentication credentials;
* credential metadata;
* security timestamps;
* verification state where applicable.

Never store raw passwords.

## Device

Represent individual authenticated client devices.

Support:

* device ID;
* user ownership;
* device type;
* platform;
* application version;
* device metadata;
* public/device keys where the broader protocol requires them;
* last activity;
* status;
* creation/update timestamps.

Do not store unnecessary device-identifying information.

## Session

Represent authenticated sessions.

Support:

* session ID;
* user ID;
* device ID;
* session status;
* creation time;
* last-used time;
* expiration;
* revocation;
* token/session rotation metadata where applicable.

## Push Token

Where required by the identity/device foundation, support device push-token registration without exposing tokens through inappropriate API responses or logs.

---

# 11. DATABASE INTEGRITY

Implement:

* foreign keys;
* uniqueness constraints;
* appropriate indexes;
* nullability rules;
* cascading behavior only where safe;
* deletion semantics;
* timestamps;
* optimistic/concurrency considerations where applicable.

Design indexes according to actual query patterns.

Do not create indexes indiscriminately.

Ensure account deletion/deactivation does not accidentally orphan security-sensitive records.

---

# 12. IDENTIFIER STRATEGY

Use a consistent identifier strategy throughout the backend.

Identifiers must be:

* globally unique;
* non-sequential where enumeration risk matters;
* safe to expose through APIs;
* consistently serialized.

Use one canonical representation.

Do not mix incompatible ID strategies without an explicit reason.

The same identity strategy must remain compatible with:

* users;
* devices;
* sessions;
* conversations;
* messages;
* events;
* media;
* notifications;
* calls.

---

# 13. TIME HANDLING

Use UTC for persisted timestamps.

Use a consistent timestamp representation throughout:

* database;
* API;
* events;
* logs;
* Redis values where relevant.

Never depend on local server time zones for business logic.

Use server-generated authoritative timestamps for security-sensitive and ordering-sensitive operations.

---

# 14. AUTHENTICATION

Implement secure authentication appropriate for the application.

Support the authentication mechanism selected by the repository and implementation constraints, including where appropriate:

* credential authentication;
* access tokens;
* refresh/session tokens;
* token rotation;
* logout;
* session revocation;
* device-specific sessions.

Do not implement insecure token handling simply because it is easier.

Authentication must distinguish:

* unauthenticated;
* authenticated;
* disabled/suspended;
* revoked;
* expired sessions.

---

# 15. PASSWORD SECURITY

If password authentication is supported:

* use a modern password hashing algorithm such as Argon2id;
* never store plaintext passwords;
* never log passwords;
* never return password hashes through APIs;
* enforce appropriate password requirements;
* protect authentication endpoints against brute-force attacks;
* avoid user enumeration where appropriate.

Credential verification failures must return safe errors without exposing sensitive account state.

---

# 16. TOKEN AND SESSION SECURITY

Implement:

* short-lived access credentials where applicable;
* refresh/session token rotation;
* token revocation;
* replay detection where applicable;
* session expiration;
* device-specific session management;
* logout from one device;
* logout from all devices;
* invalidation after security-sensitive account changes where appropriate.

Refresh/session secrets must not be stored in plaintext if the architecture allows secure hashing.

Never place long-lived credentials into logs.

Avoid exposing refresh tokens to browser-accessible JavaScript when a safer architecture is applicable.

---

# 17. DEVICE MANAGEMENT

Implement APIs and services for:

* registering a device;
* authenticating a device;
* listing a user's devices;
* viewing appropriate device metadata;
* updating device metadata;
* revoking a device;
* revoking sessions associated with a device;
* registering push notification tokens;
* removing invalid push tokens.

Authorization must ensure users can only manage their own devices unless an explicit administrative capability exists.

Do not expose sensitive device secrets.

---

# 18. USER MANAGEMENT

Implement foundational user operations required by the platform.

At minimum:

* retrieve authenticated user's profile;
* update editable profile fields;
* enforce field validation;
* enforce ownership;
* support account state;
* support account deactivation/deletion workflows appropriate to this phase.

Do not expose internal security fields.

Do not permit arbitrary users to modify privileged fields.

Fields such as:

* account status;
* security state;
* roles;
* verification state;

must never be client-controlled unless an explicit authorized administrative workflow exists.

---

# 19. USERNAME / PHONE / EMAIL IDENTIFIERS

If the product requires phone-number, email, username, or equivalent account identifiers, implement them with:

* normalization;
* canonical storage;
* uniqueness rules;
* privacy-aware lookup;
* anti-enumeration protections;
* appropriate indexing.

Do not assume that a user identifier should always be publicly searchable.

If phone-number authentication is implemented, treat phone numbers as sensitive account identifiers and design storage/API behavior accordingly.

---

# 20. AUTHORIZATION FOUNDATION

Implement a reusable authorization foundation.

It must distinguish:

* authenticated user;
* authenticated device;
* session;
* ownership;
* roles;
* administrative privileges.

Authorization must be enforced server-side.

Never rely on:

* hidden frontend controls;
* client-provided user IDs;
* client-provided roles;
* client-provided ownership claims.

Prepare authorization primitives that later conversation, message, media, call, and moderation modules can reuse.

---

# 21. API CONTRACT

Implement a consistent REST API foundation.

Use:

* versioned API routes;
* DTOs;
* validation;
* typed responses;
* consistent errors;
* authentication guards;
* authorization guards;
* pagination conventions where applicable.

Use OpenAPI/Swagger documentation.

Document implemented endpoints accurately.

Do not document endpoints that do not exist.

---

# 22. VALIDATION

Implement global request validation.

Validate:

* body;
* query parameters;
* route parameters;
* headers where appropriate.

Reject malformed input before business logic executes.

Validation must protect against:

* invalid IDs;
* oversized strings;
* invalid enum values;
* malformed timestamps;
* invalid pagination;
* unexpected structures;
* malicious payloads.

Do not trust client-provided types merely because TypeScript exists on the frontend.

---

# 23. ERROR CONTRACT

Create a stable error model.

Errors should provide enough information for clients to behave correctly without leaking sensitive internal details.

Support categories such as:

* validation error;
* authentication failure;
* authorization failure;
* resource not found;
* conflict;
* rate limit;
* expired session;
* revoked session;
* dependency failure;
* internal error.

Use stable machine-readable error codes.

Do not expose:

* stack traces;
* SQL statements;
* secrets;
* internal infrastructure details;
* credentials;
* sensitive account information.

Ensure the frontend and mobile clients can reliably interpret errors.

---

# 24. REDIS FOUNDATION

Implement a production-safe Redis integration.

Redis may be used for:

* rate limiting;
* ephemeral authentication/session state where justified;
* temporary security state;
* counters;
* distributed coordination;
* short-lived caches.

Redis must not become the authoritative durable source for user/account/session data when PostgreSQL is the source of truth.

Every Redis key introduced must have:

* naming convention;
* purpose;
* TTL where appropriate;
* serialization format;
* invalidation behavior;
* failure behavior.

Redis outages must not silently corrupt PostgreSQL state.

---

# 25. RATE LIMITING

Implement foundational rate limiting.

At minimum protect:

* login/authentication;
* refresh/session operations;
* account creation;
* credential changes;
* device registration;
* security-sensitive account actions.

Use Redis-backed distributed rate limiting where appropriate.

Rate limits must account for:

* IP;
* account/user where available;
* device/session;
* endpoint;
* authentication state.

Prevent trivial bypasses through alternate identifiers.

Return an appropriate rate-limit error.

Do not reveal sensitive information through rate-limit behavior.

---

# 26. SECURITY CONTROLS

Harden the backend against:

* SQL injection;
* command injection;
* XSS through stored content;
* CSRF where applicable;
* SSRF;
* brute force;
* credential stuffing;
* session theft;
* token replay;
* privilege escalation;
* IDOR;
* user enumeration;
* mass assignment;
* malicious headers;
* oversized payloads;
* denial-of-service through expensive requests.

Validate all authorization server-side.

Use least privilege.

---

# 27. SECURITY AND AUDIT EVENTS

Implement a foundational security/audit mechanism for security-sensitive operations.

At minimum consider events for:

* successful authentication;
* failed authentication;
* session creation;
* session revocation;
* logout;
* logout-all;
* device registration;
* device revocation;
* credential changes;
* account state changes;
* suspicious authentication activity.

Audit records/events must not contain:

* passwords;
* access tokens;
* refresh tokens;
* private keys;
* secrets.

Include useful metadata such as:

* event ID;
* user ID when known;
* device/session ID where appropriate;
* event type;
* timestamp;
* correlation ID;
* request ID;
* safe network/security metadata where justified.

Respect privacy and retention requirements.

---

# 28. EVENT ARCHITECTURE FOUNDATION

The larger system uses Kafka/Redpanda for durable asynchronous domain events.

Establish the foundational event infrastructure only where it is genuinely needed by this volume.

Events must support a consistent envelope containing concepts such as:

* event ID;
* event type;
* event version;
* aggregate/entity ID;
* producer;
* occurred-at timestamp;
* correlation ID;
* causation ID where applicable;
* trace context;
* versioned payload.

Design for:

* at-least-once delivery;
* duplicate events;
* idempotent consumers;
* retries;
* ordering requirements;
* schema evolution.

Do not introduce Kafka merely for CRUD operations that do not require asynchronous distribution.

---

# 29. OUTBOX CONSIDERATIONS

For database state changes that must reliably result in durable domain events, implement an appropriate transactional outbox pattern where required.

The authoritative database transaction must not succeed while silently losing the corresponding event.

Do not publish an event first and assume the database transaction will always succeed.

Do not implement a fake outbox that is never processed.

If an outbox worker is introduced in this volume, implement its real:

* polling;
* locking;
* publishing;
* retry;
* failure handling;
* idempotency;
* observability;
* shutdown behavior.

---

# 30. OBSERVABILITY

Implement production-grade observability foundations.

Include:

* structured logs;
* request IDs;
* correlation IDs;
* distributed tracing;
* metrics;
* health checks;
* readiness checks;
* dependency status where appropriate.

Instrument:

* HTTP requests;
* database operations where practical;
* Redis operations where practical;
* authentication operations;
* security-sensitive actions;
* significant errors.

Do not log:

* passwords;
* access tokens;
* refresh tokens;
* API secrets;
* private keys;
* payment credentials;
* unnecessary private message content;
* sensitive personal data unless explicitly justified.

---

# 31. HEALTH AND READINESS

Implement health endpoints suitable for Kubernetes.

Distinguish:

## Liveness

Indicates whether the process is alive.

## Readiness

Indicates whether the service can safely receive traffic.

Readiness should evaluate required dependencies appropriate to the deployment architecture, including PostgreSQL and Redis when they are mandatory.

Do not make liveness fail merely because a temporary external dependency is unavailable.

Avoid creating health checks that generate excessive database or Redis traffic.

---

# 32. GRACEFUL SHUTDOWN

Implement graceful shutdown.

The service must:

1. stop accepting new work;
2. allow active requests to complete within a bounded timeout;
3. close WebSocket infrastructure when applicable;
4. stop background workers;
5. close Redis connections;
6. close database connections;
7. flush telemetry/logging where appropriate;
8. exit cleanly.

Do not terminate abruptly while processing security-sensitive state transitions.

---

# 33. TESTING

Create meaningful automated tests.

At minimum include:

## Unit tests

Test:

* authentication services;
* password verification;
* token/session logic;
* device management;
* user profile rules;
* authorization;
* validation;
* rate limiting behavior;
* security-sensitive business rules.

## Integration tests

Test against real or appropriately isolated infrastructure for:

* PostgreSQL;
* Prisma;
* Redis;
* authentication persistence;
* session lifecycle;
* device lifecycle;
* transactions.

## API/E2E tests

Test:

* registration/authentication;
* login;
* refresh;
* logout;
* logout-all;
* user profile retrieval/update;
* device registration;
* device listing;
* device revocation;
* push token lifecycle;
* unauthorized access;
* forbidden access;
* malformed requests;
* rate limits.

Tests must cover both successful and failure paths.

Do not write tests that merely assert that a mocked function was called while leaving the actual business behavior unverified.

---

# 34. FAILURE HANDLING

Explicitly handle:

* database unavailable;
* Redis unavailable;
* invalid credentials;
* expired sessions;
* revoked sessions;
* duplicate account identifiers;
* duplicate devices;
* malformed tokens;
* token replay;
* transaction conflicts;
* rate-limit exhaustion;
* dependency timeouts;
* unexpected internal exceptions.

The backend must return deterministic safe errors.

Do not leak infrastructure details.

---

# 35. TRANSACTIONAL REQUIREMENTS

Use database transactions when operations require atomicity.

Examples:

* account creation;
* security credential changes;
* session rotation;
* device revocation with related state changes;
* account deletion/deactivation state transitions;
* security audit persistence where atomicity is required.

Avoid unnecessarily long transactions.

Do not perform slow external network operations inside database transactions unless there is a compelling and safe reason.

---

# 36. CONCURRENCY

Design authentication and session logic against race conditions.

Specifically consider:

* simultaneous refresh requests;
* concurrent logout;
* simultaneous device revocation;
* repeated registration;
* duplicate requests;
* concurrent credential changes.

Use:

* unique constraints;
* transactions;
* locking;
* atomic Redis operations;
* idempotency mechanisms;

where appropriate.

Do not depend solely on application-level checks such as:

```text
if (!exists) create
```

when concurrent requests can violate the assumption.

---

# 37. PRIVACY

Implement privacy-aware behavior throughout the identity layer.

Do not unnecessarily expose:

* email addresses;
* phone numbers;
* IP addresses;
* device identifiers;
* push tokens;
* session metadata;
* authentication history.

Implement appropriate data minimization.

Ensure deleted/deactivated accounts follow deterministic data-handling rules.

Prepare the identity system for later privacy controls without exposing private information through default APIs.

---

# 38. API ENDPOINTS

Implement the endpoints genuinely required by the functionality in this volume.

Depending on the chosen authentication model, this should include appropriate equivalents of:

### Authentication

* account registration;
* login;
* refresh;
* logout;
* logout all sessions;
* current authenticated session/user;
* credential/security changes where applicable.

### Users

* retrieve current user;
* update current user;
* account state operations appropriate to this phase.

### Devices

* register device;
* list devices;
* update permitted device metadata;
* revoke device;
* register/remove push token.

Do not blindly implement every endpoint listed if the actual authentication model makes one redundant.

Do not implement endpoint shells with fake responses.

---

# 39. API DOCUMENTATION

Generate accurate OpenAPI documentation for all implemented endpoints.

Document:

* authentication;
* request schemas;
* response schemas;
* validation constraints;
* error responses;
* authentication requirements;
* authorization requirements;
* pagination where used.

Keep OpenAPI definitions synchronized with actual implementation.

---

# 40. SECURITY-SENSITIVE API BEHAVIOR

Authentication endpoints must be designed to prevent account enumeration where appropriate.

For example, do not expose unnecessary distinctions between:

* unknown account;
* disabled account;
* incorrect password;

when such distinctions would enable attackers to enumerate accounts.

Security decisions belong on the server.

Never accept client-provided:

* user ownership;
* privilege;
* account status;
* role;
* security state.

---

# 41. BACKWARD COMPATIBILITY

If the repository already has:

* API endpoints;
* database models;
* environment variables;
* authentication behavior;
* shared libraries;

preserve compatible behavior unless a migration is required.

If a breaking change is necessary:

1. identify the existing behavior;
2. determine migration requirements;
3. implement the safest transition;
4. document the compatibility impact;
5. avoid silently breaking existing clients.

Do not delete existing functionality merely because a cleaner implementation is possible.

---

# 42. FUTURE DOMAIN COMPATIBILITY

The implementation must be prepared for later integration with:

* contacts;
* conversations;
* messaging;
* presence;
* media;
* notifications;
* search;
* calling;
* moderation.

Identity objects must therefore provide stable references for:

* user;
* device;
* session;
* account.

Do not couple identity to future domains unnecessarily.

For example:

* messaging must be able to reference users/devices;
* WebSocket connections must be able to authenticate devices;
* push notifications must be associated with devices;
* conversation authorization must be able to resolve the authenticated user;
* calling must be able to identify authenticated devices.

---

# 43. MULTI-DEVICE COMPATIBILITY

The platform supports multiple active devices per user.

Do not model a user as having only one active session/device.

The identity layer must support:

* multiple devices;
* multiple sessions;
* independent device revocation;
* global logout;
* per-device push tokens;
* device-specific authentication state.

Do not destroy every device/session merely because one device logs out unless the operation explicitly means global logout.

---

# 44. SECURITY TOKEN STORAGE

Where browser clients are supported, choose token storage and transport mechanisms that minimize XSS/session theft risk.

Where mobile clients are supported, the eventual mobile implementation must be compatible with secure platform storage.

Do not require the frontend to store highly sensitive long-lived credentials in unsafe persistent storage.

Keep token handling consistent with the chosen authentication architecture.

---

# 45. PERFORMANCE

The identity system must support high request volume.

Optimize:

* authentication lookups;
* session validation;
* device lookups;
* user retrieval;
* token/session rotation;
* rate limiting.

Use appropriate indexes.

Avoid unnecessary joins.

Avoid loading entire user/device/session records when only a subset is required.

Do not prematurely introduce distributed complexity without measurable need.

---

# 46. DATABASE MIGRATION QUALITY

Every schema change must be represented through Prisma migrations.

Verify migrations for:

* clean database;
* existing database;
* rollback/recovery strategy where appropriate;
* production deployment ordering;
* index creation;
* unique constraint conflicts;
* nullable-to-required transitions;
* large-table implications.

Do not make destructive migrations without a safe migration strategy.

---

# 47. DEVELOPMENT EXPERIENCE

Provide enough project tooling for developers to reliably:

* install dependencies;
* validate environment configuration;
* run the backend;
* run migrations;
* generate Prisma client;
* execute tests;
* run linting;
* run formatting;
* perform type checking.

Do not add unnecessary tooling.

All scripts must actually work.

---

# 48. DOCKER COMPATIBILITY

If Docker infrastructure already exists, integrate with it.

If backend containerization is part of the repository's current implementation, ensure the backend image:

* uses an appropriate production Node image;
* installs only required production dependencies where appropriate;
* does not contain secrets;
* runs as a non-root user where practical;
* handles signals correctly;
* exposes the correct port;
* supports health/readiness checks.

Do not create duplicate Docker architectures.

---

# 49. CODE QUALITY

All implementation must:

* compile;
* type-check;
* follow project lint rules;
* use strict TypeScript where practical;
* avoid unsafe `any`;
* avoid duplicated business logic;
* use meaningful names;
* contain appropriate comments only where they clarify non-obvious decisions;
* avoid speculative abstractions.

Do not leave:

* TODO;
* FIXME;
* placeholder;
* fake repository methods;
* empty services;
* mock production behavior;

in implemented production paths.

---

# 50. REQUIRED VALIDATION BEFORE COMPLETION

Before declaring this backend volume complete, actually execute the repository's applicable validation commands.

At minimum verify:

* dependency installation where required;
* TypeScript compilation/type checking;
* linting;
* formatting checks where configured;
* Prisma generation;
* Prisma migration validation;
* unit tests;
* integration tests;
* API/E2E tests where configured;
* application startup;
* health endpoint;
* readiness endpoint.

Fix failures instead of merely reporting them.

Do not claim tests passed unless they actually passed.

---

# 51. IMPLEMENTATION ORDER

Use this practical order while implementing:

1. inspect repository;
2. preserve existing compatible architecture;
3. establish configuration;
4. establish database/Prisma;
5. implement core identity schema;
6. create migrations;
7. establish Redis integration;
8. establish security primitives;
9. implement authentication;
10. implement sessions;
11. implement devices;
12. implement user/profile operations;
13. implement push-token lifecycle;
14. implement authorization;
15. implement rate limiting;
16. implement error handling;
17. implement observability;
18. implement health/readiness;
19. implement graceful shutdown;
20. implement security/audit behavior;
21. implement OpenAPI;
22. implement tests;
23. run complete validation;
24. fix all discovered issues.

The order may be adjusted when the repository's existing architecture requires it.

---

# 52. REPOSITORY INTEGRATION CONTRACT

This implementation is one part of a single production system.

Therefore:

* use the actual repository as the source of truth;
* reuse existing compatible contracts;
* preserve existing working functionality;
* integrate with existing database models;
* integrate with existing configuration;
* integrate with existing logging;
* integrate with existing authentication if present;
* avoid duplicate modules;
* avoid duplicate database models;
* avoid duplicate API contracts;
* avoid competing error systems;
* avoid incompatible identifier systems.

If an existing implementation conflicts with this specification, inspect its actual behavior and make the smallest safe change necessary.

Do not assume an earlier prompt, architecture document, or conversation exists in the current context.

---

# 53. CROSS-SYSTEM CONTRACTS THAT MUST REMAIN STABLE

The implementation must establish or preserve canonical conventions for:

* IDs;
* timestamps;
* API errors;
* authentication context;
* user identity;
* device identity;
* session identity;
* validation;
* pagination;
* authorization;
* request IDs;
* correlation IDs;
* tracing;
* database transactions;
* Redis key naming;
* security events.

These conventions will be consumed by future backend modules and by web/mobile clients.

Do not introduce one-off conventions that future modules would have to translate.

---

# 54. DO NOT IMPLEMENT OUTSIDE SCOPE

Do not use this volume as an excuse to partially implement:

* conversations;
* messaging;
* message delivery;
* read receipts;
* typing;
* presence;
* media processing;
* search;
* push delivery workers;
* WebRTC calls;
* group management;
* reactions;
* replies;
* forwarding.

Only implement foundational interfaces required by the identity system.

Those domains should later integrate with the actual identity contracts established here.

---

# 55. NO PLACEHOLDERS

Do not generate:

* pseudocode;
* TODOs;
* FIXME markers;
* fake APIs;
* fake authentication;
* fake database persistence;
* mocked production services;
* hardcoded credentials;
* invented provider APIs;
* empty implementation classes;
* pretend migrations;
* incomplete error handlers.

If a requirement cannot be safely implemented in this repository, inspect the repository and resolve the issue through a real implementation or make a clearly justified architectural adjustment.

---

# 56. FINAL ENGINEERING REQUIREMENT

The resulting backend must be a real implementation, not a demonstration.

A successful implementation of this volume must leave the repository with a production-quality foundation capable of supporting the next backend domains without requiring the identity system to be rewritten.

The implementation must be:

* secure;
* testable;
* observable;
* transactional;
* scalable;
* maintainable;
* deployable;
* backward-compatible where possible;
* ready for multi-device operation;
* ready for real-time authentication;
* ready for future messaging and conversation domains.

Do not merely tell me what should be implemented.

**Inspect the repository and implement it**

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
