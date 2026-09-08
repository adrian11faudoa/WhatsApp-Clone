# Backend Prompt — Volume 5 — Media, Notifications, Search, and External Platform Integrations

## ROLE

You are the backend engineering team for a production-grade, enterprise real-time communication platform.

Work directly against the existing repository.

This is one implementation phase of one coherent system. The repository is the source of truth for all existing implementation, contracts, schemas, modules, configuration, and conventions.

Do not treat this prompt as a standalone application or create a competing implementation.

Your task is to inspect the repository, understand the existing backend implementation, and implement the complete backend functionality described below while preserving and integrating with everything already implemented.

---

# 1. PLATFORM CONTEXT

The platform is an original enterprise-grade real-time communication application inspired by modern messaging platforms.

It supports:

* individual conversations
* group conversations
* text messages
* media messages
* documents
* voice messages
* message editing and deletion
* reactions
* replies
* forwarding
* delivery and read receipts
* multi-device synchronization
* real-time messaging
* presence
* typing indicators
* push notifications
* media storage and processing
* full-text search
* future voice/video calling
* strong privacy and security requirements

The backend stack is:

* Node.js
* NestJS
* TypeScript
* PostgreSQL
* Prisma ORM
* Redis
* Kafka or Redpanda
* BullMQ
* WebSockets / Socket.IO
* AWS S3
* AWS CloudFront
* FFmpeg
* Elasticsearch or OpenSearch
* FCM
* APNs
* WebRTC-compatible signaling infrastructure where required

Use the technologies already established in the repository. Do not replace existing infrastructure without a concrete compatibility reason.

---

# 2. EXISTING BACKEND CONTRACT

Before modifying anything:

1. Inspect the complete repository.
2. Identify the existing backend architecture.
3. Identify implemented modules.
4. Identify Prisma models and migrations.
5. Identify authentication and authorization mechanisms.
6. Identify conversation and membership models.
7. Identify message models and message state.
8. Identify WebSocket contracts.
9. Identify Kafka/Redpanda events.
10. Identify transactional outbox implementation.
11. Identify Redis namespaces and conventions.
12. Identify BullMQ queues and worker conventions.
13. Identify environment configuration.
14. Identify error handling.
15. Identify logging and observability.
16. Identify test conventions.
17. Identify API documentation/OpenAPI conventions.

Do not assume that an expected file exists.

Do not recreate functionality that already exists.

If existing implementation differs from this specification:

* preserve compatible existing behavior;
* extend it where necessary;
* migrate it safely where required;
* make the smallest coherent architectural change;
* never create duplicate services, models, queues, event systems, or competing contracts.

All new functionality must integrate with the existing repository.

---

# 3. OBJECTIVES OF THIS VOLUME

Implement the backend systems responsible for:

1. Media asset lifecycle.
2. Secure file upload.
3. Secure media download/access.
4. S3 integration.
5. CloudFront/CDN delivery.
6. Media validation.
7. Media processing.
8. FFmpeg processing.
9. Image transformation and thumbnails.
10. Media processing state management.
11. Media cleanup and lifecycle management.
12. Push notifications.
13. FCM integration.
14. APNs integration.
15. Notification preferences.
16. Notification device/token management.
17. Notification fanout.
18. Search indexing.
19. Elasticsearch/OpenSearch integration.
20. Asynchronous indexing.
21. Search authorization.
22. Search consistency.
23. Search deletion/update propagation.
24. Index versioning and migrations.
25. Remaining external-platform integration contracts.
26. Operational reliability for all of the above.

Everything must integrate with the existing messaging, conversation, authentication, authorization, synchronization, WebSocket, event, and worker systems.

---

# 4. MEDIA DOMAIN

Create or extend the media domain according to the repository architecture.

A media asset must have a durable lifecycle.

At minimum, support concepts equivalent to:

* media ID
* owner/user ID
* conversation ID where applicable
* message ID where applicable
* original filename
* media type
* declared MIME type
* detected MIME type
* file extension where appropriate
* file size
* checksum/hash
* storage provider
* storage bucket
* object key
* processing status
* processing version
* width
* height
* duration
* bitrate where applicable
* codec information where applicable
* thumbnail references
* generated variants
* scan status
* moderation/security status where supported
* created timestamp
* updated timestamp
* expiration/deletion state

Do not duplicate information that already belongs authoritatively to the message domain.

Messages should reference media assets rather than embedding storage implementation details into every message record.

---

# 5. MEDIA OWNERSHIP

Every media object must have a clear ownership and authorization relationship.

Support authorization based on:

* authenticated user
* message ownership
* conversation membership
* group membership
* sender permissions
* message visibility
* deleted messages
* blocked users where applicable
* revoked memberships
* administrative rules

Never authorize media access merely because the caller knows an object key, media ID, filename, or URL.

Prevent:

* IDOR
* object enumeration
* unauthorized downloads
* cross-conversation access
* cross-user access
* access after membership revocation where policy prohibits it
* access to deleted/private content

Authorization must be enforced server-side.

---

# 6. SECURE UPLOAD PIPELINE

Implement a secure upload lifecycle.

A recommended lifecycle is:

1. authenticated client requests media upload;
2. backend validates authorization;
3. backend creates a media upload record;
4. backend validates metadata and limits;
5. backend generates a secure upload mechanism;
6. client uploads directly to object storage when appropriate;
7. storage completion is confirmed;
8. backend validates the uploaded object;
9. security scanning/validation is performed;
10. media processing job is scheduled;
11. processing generates required derivatives;
12. media becomes available;
13. message attachment can reference the finalized media asset.

Do not trust client-provided:

* MIME types
* file extensions
* dimensions
* duration
* checksums
* metadata
* filenames

Perform server-side validation.

---

# 7. PRESIGNED STORAGE OPERATIONS

Use secure presigned upload/download mechanisms where appropriate.

Implement:

* short-lived upload URLs
* short-lived download URLs where appropriate
* restricted object keys
* restricted HTTP methods
* content-type constraints
* content-length constraints
* ownership binding
* expiration
* replay considerations
* upload completion validation

Never expose unrestricted buckets or permanent public media URLs for private user content.

Do not place long-lived AWS credentials in clients.

Do not expose storage credentials.

---

# 8. S3 OBJECT KEY DESIGN

Define a deterministic and secure object-key strategy.

Object keys must:

* avoid predictable user enumeration where practical;
* avoid trusting filenames;
* separate original objects from generated derivatives;
* support multiple processing versions;
* support cleanup;
* support lifecycle management;
* support migration;
* prevent collisions.

Use canonical IDs generated by the backend.

Do not use raw user-controlled filenames as object keys.

---

# 9. MEDIA VALIDATION

Implement server-side validation for uploads.

Validate:

* file size
* allowed media category
* detected MIME type
* magic bytes/file signature
* extension consistency
* malformed files
* decompression bombs where relevant
* image dimensions
* video duration
* audio duration
* document limits
* archive restrictions
* executable content
* suspicious content

Define configurable limits.

Do not rely exclusively on frontend validation.

Reject invalid files with explicit, stable API errors.

---

# 10. SECURITY SCANNING

If the existing architecture provides a malware/security scanning integration, implement the complete integration.

If an external scanner is not currently available:

* create a clean provider abstraction;
* implement the real repository-compatible integration point;
* do not fake scan results;
* do not mark files as safe without actual validation.

Media must not become downloadable as trusted content before required security checks have completed.

Represent scan states explicitly, for example:

* pending
* scanning
* clean
* rejected
* failed

Do not expose rejected or unsafe objects.

---

# 11. MEDIA PROCESSING

Implement asynchronous media processing using the existing BullMQ architecture.

Support processing appropriate to the media type.

### Images

Generate required variants such as:

* thumbnail
* preview
* standard display
* optionally optimized versions

Preserve correct orientation.

Strip unnecessary sensitive metadata when required.

Validate dimensions.

### Video

Use FFmpeg for supported video processing.

Support, where required:

* metadata extraction
* duration extraction
* codec detection
* thumbnail generation
* preview generation
* transcoding
* resolution variants
* bitrate variants
* format normalization

### Audio

Support:

* metadata extraction
* duration
* codec detection
* normalization/transcoding where required
* waveform/preview generation if part of the existing contract

### Voice messages

Support the existing voice-message contract.

Do not assume a codec or container unless the architecture specifies it.

---

# 12. FFmpeg SECURITY

Treat FFmpeg processing as execution of untrusted input.

Implement:

* restricted execution environment;
* safe argument construction;
* no shell interpolation;
* timeouts;
* resource limits;
* temporary workspace isolation;
* cleanup;
* process termination;
* output validation;
* disk-space protection;
* concurrency limits.

Never construct shell commands from raw user-controlled values.

Prevent command injection.

Do not execute arbitrary uploaded files as programs.

---

# 13. MEDIA PROCESSING STATE MACHINE

Implement a durable processing state machine.

A media asset should have explicit states equivalent to:

* CREATED
* UPLOADING
* UPLOADED
* VALIDATING
* SCANNING
* PROCESSING
* READY
* FAILED
* REJECTED
* DELETED

Use the repository's naming conventions if equivalent states already exist.

State transitions must be validated.

Do not allow invalid transitions.

Processing must be idempotent.

Retries must not create duplicate media records or corrupt existing derivatives.

---

# 14. MEDIA JOB DESIGN

Every media-processing job must define:

* job ID
* media ID
* processing version
* job type
* priority
* timeout
* retry policy
* exponential backoff where appropriate
* concurrency
* idempotency
* failure behavior
* cleanup behavior
* observability metadata

Jobs must safely tolerate:

* duplicate execution
* worker crashes
* process termination
* network failure
* storage failure
* FFmpeg failure
* partial output
* retry
* worker restart

Never rely on exactly-once execution.

---

# 15. MEDIA DERIVATIVES

Generated media derivatives must be associated with the canonical media asset.

Do not scatter derivative references throughout unrelated tables.

Each derivative should have enough information to identify:

* variant
* storage object
* processing version
* dimensions
* size
* MIME type
* checksum
* creation time

Processing a new version must not silently overwrite incompatible existing variants.

---

# 16. MEDIA AVAILABILITY

Do not expose a media asset as READY until:

* the original object exists;
* required validation passed;
* security checks passed;
* required processing completed;
* required metadata is available;
* generated objects are verified.

If optional derivatives fail, distinguish that from failure of required processing.

Do not block the entire messaging system because an optional derivative failed.

---

# 17. MEDIA DOWNLOADS

Implement secure media access.

The backend must determine whether a user can access the media before granting access.

Support:

* authorization;
* expiration;
* deleted media behavior;
* revoked membership;
* private conversations;
* group conversations;
* message deletion;
* media ownership;
* CDN delivery.

Prefer CDN delivery for large media where appropriate.

Never allow users to bypass application authorization through permanent public S3 URLs.

---

# 18. CLOUDFRONT/CDN

Integrate private media delivery with the existing CloudFront architecture.

Support an appropriate secure mechanism such as:

* signed URLs;
* signed cookies;
* origin access controls;
* private S3 origin.

Do not expose private S3 buckets publicly.

Use cache policies appropriate to immutable media.

Generated derivatives should be safely cacheable when their object identity includes processing/version information.

---

# 19. MEDIA DELETION AND RETENTION

Implement media lifecycle management.

Handle:

* message deletion;
* delete-for-everyone;
* account deletion;
* orphaned uploads;
* failed uploads;
* failed processing;
* expired temporary objects;
* abandoned uploads;
* derivative cleanup;
* storage lifecycle policies.

Do not immediately destroy objects when delayed deletion is required for consistency, recovery, legal retention, or other explicitly configured policies.

Ensure database and object-storage state eventually converge.

Implement cleanup jobs with:

* batching
* retries
* idempotency
* rate limits
* observability

---

# 20. MEDIA AND MESSAGE INTEGRATION

Integrate media with the existing message system.

A media message must not reference an untrusted or unauthorized object.

Message creation should validate:

* media ownership;
* media readiness;
* permitted media type;
* conversation access;
* attachment count;
* attachment size;
* message-level limits.

Deleting a message must correctly affect media visibility according to the platform's privacy policy.

Do not make media deletion logic bypass the message authorization model.

---

# 21. PUSH NOTIFICATION DOMAIN

Implement or extend the notification domain.

Support:

* device registration;
* push-token registration;
* token rotation;
* token invalidation;
* platform detection;
* application/device identity;
* notification preferences;
* delivery attempts;
* provider response handling;
* invalid-token cleanup.

Never treat a push token as a permanent identity.

Associate push tokens with authenticated devices/sessions using the existing identity model.

---

# 22. FCM AND APNs

Implement provider abstractions for:

* Firebase Cloud Messaging
* Apple Push Notification service

Do not scatter provider-specific code throughout domain services.

Use a provider interface.

Support:

* platform-specific payloads;
* provider-specific authentication;
* expiration;
* collapse/group behavior;
* priority;
* badge/count;
* sound;
* notification category;
* deep-link metadata;
* silent/background notifications where supported.

Never hardcode credentials.

Load provider configuration through the existing secure environment/configuration system.

---

# 23. PUSH NOTIFICATION PRIVACY

Never expose sensitive message content to push notifications when the user's privacy settings or platform requirements prohibit it.

Support configurable notification modes such as:

* full preview;
* sender only;
* generic notification;
* disabled.

Notification generation must respect:

* user preferences;
* conversation mute;
* blocked users;
* notification permissions;
* device settings;
* privacy configuration.

Do not depend on frontend filtering to protect notification content.

---

# 24. NOTIFICATION FANOUT

When a new message arrives:

1. persist the authoritative message;
2. emit the canonical domain event;
3. determine eligible recipients;
4. exclude the sender's relevant devices where appropriate;
5. respect conversation state and preferences;
6. determine active WebSocket devices;
7. determine offline/push-eligible devices;
8. generate notification payloads;
9. enqueue provider delivery;
10. process provider responses;
11. invalidate dead tokens.

Do not make push delivery part of the critical database transaction.

A push provider outage must not prevent message persistence.

---

# 25. NOTIFICATION QUEUES

Use BullMQ for asynchronous push delivery where appropriate.

Define queues with:

* retry policy
* exponential backoff
* timeout
* concurrency
* priority
* deduplication/idempotency
* dead-letter handling
* provider-specific throttling
* graceful shutdown

Do not retry permanent provider errors indefinitely.

Classify provider responses into:

* transient;
* permanent;
* invalid token;
* authentication/configuration;
* rate limited;
* unknown.

---

# 26. NOTIFICATION COLLAPSING AND DUPLICATION

Prevent notification storms.

Support appropriate:

* collapse keys;
* conversation grouping;
* notification deduplication;
* batching where appropriate;
* rate limits.

A burst of messages must not produce uncontrolled duplicate notifications.

Do not sacrifice message durability for notification optimization.

---

# 27. SEARCH DOMAIN

Integrate the message/conversation system with Elasticsearch or OpenSearch according to the repository's architecture.

Search must never become the authoritative data store.

PostgreSQL remains authoritative.

Search indexes are derived state.

---

# 28. SEARCH INDEXING

Index searchable content asynchronously.

The indexing pipeline should follow the existing event architecture:

Database transaction
→ transactional outbox
→ Kafka/Redpanda event
→ search consumer
→ index/update/delete operation.

Do not synchronously block message creation on search indexing.

Index appropriate fields such as:

* message ID
* conversation ID
* sender ID
* message type
* timestamp
* searchable text where permitted
* searchable metadata
* media metadata where appropriate
* edit/delete state
* indexing version

Do not index information that violates privacy or encryption requirements.

---

# 29. PRIVACY AND ENCRYPTION COMPATIBILITY

Search must respect the platform's privacy architecture.

If message content is end-to-end encrypted and the server does not possess plaintext:

* do not invent server-side plaintext indexing;
* do not weaken encryption to enable search;
* implement only search capabilities that are compatible with the actual cryptographic architecture.

If server-side searchable content is explicitly supported, clearly separate it from encrypted content and apply authorization accordingly.

Never silently undermine the platform's privacy model for search convenience.

---

# 30. SEARCH AUTHORIZATION

Search results must be authorized.

Never return a message simply because it exists in the search index.

For every result, enforce current access rules.

Handle:

* conversation membership;
* revoked membership;
* deleted messages;
* blocked users where applicable;
* private conversations;
* group access;
* retention rules.

The search index must be treated as potentially stale.

Current authorization remains authoritative.

---

# 31. SEARCH CONSISTENCY

Handle:

* indexing delay;
* duplicate events;
* out-of-order events;
* consumer retries;
* consumer restarts;
* index failures;
* database changes;
* message edits;
* message deletion;
* conversation deletion.

Consumers must be idempotent.

An older event must not overwrite newer state.

Use versioning or authoritative timestamps/sequences where appropriate.

---

# 32. SEARCH INDEX VERSIONING

Implement explicit index-version management.

Support:

* index naming/versioning;
* aliases where appropriate;
* mappings;
* analyzers;
* migration strategy;
* reindexing;
* rollback;
* replay from durable events or authoritative database data.

Never change production mappings destructively without a migration strategy.

Search index rebuilds must not require downtime for messaging.

---

# 33. SEARCH DELETE PROPAGATION

When a message is deleted:

* emit the canonical event;
* remove or tombstone it from search;
* ensure deleted content cannot continue appearing;
* handle eventual consistency;
* handle consumer retries.

If deletion-for-everyone differs from deletion-for-self, implement the correct visibility semantics.

Never rely solely on eventual search deletion for authorization.

---

# 34. SEARCH API

Implement the repository-compatible API for:

* message search;
* conversation-scoped search;
* sender filters where supported;
* date filters;
* message-type filters where supported;
* cursor pagination;
* relevance ordering where appropriate.

Validate all query parameters.

Prevent:

* unrestricted wildcard abuse;
* regex abuse;
* pathological queries;
* excessive result sizes;
* unauthorized conversation filters.

Apply rate limiting and query complexity limits.

---

# 35. SEARCH PAGINATION

Do not use unsafe deep-offset pagination for large indexes.

Use an appropriate cursor/search-after strategy.

Pagination must remain stable enough for the platform's expected user experience.

Return consistent pagination metadata according to existing API conventions.

---

# 36. EXTERNAL INTEGRATION BOUNDARIES

External providers must be isolated behind infrastructure/provider interfaces.

At minimum, keep provider-specific implementations separate for:

* AWS S3
* CloudFront
* FCM
* APNs
* Elasticsearch/OpenSearch
* FFmpeg execution

Domain services must not contain provider-specific implementation details unnecessarily.

This makes providers replaceable and testing deterministic.

---

# 37. CONFIGURATION

Add all required configuration through the repository's existing configuration system.

Examples include:

* S3 bucket configuration
* AWS region
* CloudFront distribution configuration
* CDN signing configuration
* FCM credentials/configuration
* APNs credentials/configuration
* search cluster configuration
* index names
* media limits
* FFmpeg configuration
* processing concurrency
* notification limits
* retention policies

Validate required configuration at startup.

Never silently continue with invalid production configuration.

Never hardcode secrets.

Never commit credentials.

---

# 38. DATABASE DESIGN

Extend Prisma/PostgreSQL only where necessary.

Use:

* foreign keys;
* unique constraints;
* indexes;
* transactions;
* appropriate cascading behavior;
* timestamps;
* state constraints where practical.

Index important access paths for:

* media ownership;
* media state;
* processing jobs;
* message attachments;
* notification devices;
* push tokens;
* notification preferences;
* cleanup queries.

Avoid excessive indexes that unnecessarily increase write cost.

Create safe migrations.

Do not destroy existing production data.

---

# 39. REDIS

Use Redis only for appropriate ephemeral/distributed state.

Potential uses include:

* notification rate limiting;
* media job coordination;
* temporary upload state where appropriate;
* distributed locks where justified;
* provider throttling;
* short-lived deduplication.

Every Redis key must have:

* stable namespace;
* documented purpose;
* TTL where appropriate;
* invalidation behavior;
* failure behavior.

Do not make Redis the sole durable source of media, notification, or search state.

---

# 40. KAFKA/REDPANDA EVENTS

Extend existing event contracts rather than creating parallel event systems.

Media-related events may include concepts such as:

* media.created
* media.uploaded
* media.processing.started
* media.processing.completed
* media.processing.failed
* media.deleted

Notification-related events may include:

* notification.requested
* notification.delivered
* notification.failed
* device.token.invalidated

Search-related events may include:

* search.index.requested
* search.indexed
* search.delete.requested

Use the repository's established naming conventions.

Every event must include the existing standard envelope and appropriate:

* event ID
* event type
* version
* aggregate ID
* producer
* timestamp
* correlation ID
* trace context
* payload

Consumers must be idempotent.

---

# 41. OUTBOX INTEGRATION

All domain events that originate from durable state changes must use the existing transactional outbox pattern where appropriate.

Do not publish Kafka events directly from a database transaction and assume atomicity.

The system must tolerate:

* transaction success + publish failure;
* publish success + consumer failure;
* duplicate publish;
* consumer restart;
* delayed events.

---

# 42. API ERROR CONTRACTS

Use the repository's established error envelope.

Define explicit errors for conditions such as:

* invalid media;
* unsupported media;
* upload expired;
* media not ready;
* media rejected;
* media unavailable;
* unauthorized media access;
* notification registration failure;
* invalid push token;
* search unavailable;
* search query invalid;
* search rate limit;
* processing failure.

Do not leak:

* storage internals;
* provider credentials;
* infrastructure details;
* stack traces;
* sensitive user information.

---

# 43. RATE LIMITING AND ABUSE PREVENTION

Apply rate limits to:

* upload initialization;
* upload completion;
* media access URL generation;
* search;
* push-token registration;
* notification operations;
* expensive processing requests.

Use user/device/IP dimensions where appropriate.

Prevent abuse through:

* upload size limits;
* frequency limits;
* concurrent processing limits;
* search complexity limits;
* provider throttling;
* queue backpressure.

Do not allow a single user/device to exhaust shared infrastructure.

---

# 44. OBSERVABILITY

Instrument all new functionality.

At minimum monitor:

### Media

* upload initialization count;
* upload failures;
* validation failures;
* scan failures;
* processing duration;
* processing failures;
* FFmpeg failures;
* queue depth;
* retry count;
* orphaned objects;
* cleanup failures;
* CDN access failures.

### Notifications

* notification requests;
* provider latency;
* delivery success;
* delivery failure;
* invalid tokens;
* retries;
* provider throttling;
* queue depth.

### Search

* indexing latency;
* indexing failures;
* search latency;
* search errors;
* queue lag;
* stale index conditions;
* reindex progress.

Use the repository's OpenTelemetry/metrics/logging conventions.

Never log:

* push credentials;
* AWS secrets;
* access tokens;
* signed URLs;
* private message contents unnecessarily;
* raw uploaded data.

---

# 45. FAILURE AND RECOVERY

Explicitly handle:

### S3 unavailable

Message persistence must continue where possible.

Media processing may retry asynchronously.

### CloudFront unavailable

Do not corrupt media state.

### FFmpeg crashes

Mark processing appropriately and retry according to policy.

### Search unavailable

Messaging must continue.

Indexing retries asynchronously.

### FCM/APNs unavailable

Message delivery must continue through the durable messaging system.

Push notifications retry asynchronously.

### Kafka unavailable

Transactional outbox retains events until publication succeeds.

### Redis unavailable

Critical durable operations must not become permanently dependent on Redis.

### Worker crash

Jobs must safely retry.

### Duplicate job

Processing must be idempotent.

---

# 46. SECURITY REQUIREMENTS

Perform a dedicated security review of this implementation.

Test and protect against:

* IDOR;
* object-key enumeration;
* malicious uploads;
* MIME spoofing;
* path traversal;
* filename injection;
* command injection;
* FFmpeg exploitation;
* decompression bombs;
* resource exhaustion;
* storage abuse;
* signed URL abuse;
* notification token theft;
* push notification data leakage;
* search authorization bypass;
* search injection;
* regex/wildcard abuse;
* queue poisoning;
* privilege escalation;
* provider credential leakage;
* SSRF through media processing;
* unauthorized CDN access.

All security-sensitive authorization must happen server-side.

---

# 47. TESTING

Add comprehensive tests.

## Unit tests

Test:

* media validation;
* state transitions;
* ownership;
* authorization;
* media URL generation;
* notification preference resolution;
* push payload generation;
* token handling;
* search query construction;
* index event processing;
* job idempotency.

## Integration tests

Test:

* PostgreSQL + Prisma;
* S3-compatible storage integration;
* media lifecycle;
* queue processing;
* notification persistence;
* search indexing;
* search deletion;
* event consumption.

## API tests

Test:

* upload initialization;
* upload completion;
* media access;
* notification registration;
* notification preferences;
* search;
* unauthorized access;
* invalid input;
* rate limiting.

## Worker tests

Test:

* successful processing;
* retries;
* duplicate jobs;
* timeout;
* dead-letter behavior;
* partial output cleanup;
* provider failure.

## Security tests

Test:

* IDOR;
* unauthorized media access;
* malicious MIME;
* path traversal;
* command injection;
* search authorization;
* token abuse;
* rate-limit bypass;
* private notification leakage.

## Failure tests

Simulate:

* S3 failure;
* CDN failure;
* search outage;
* FCM/APNs failure;
* Kafka outage;
* Redis outage;
* worker crash;
* duplicate events;
* out-of-order events.

---

# 48. PERFORMANCE

Design for large-scale operation.

Avoid:

* loading entire files into application memory;
* synchronous FFmpeg execution inside HTTP requests;
* synchronous search indexing;
* synchronous push delivery;
* N+1 authorization queries;
* unbounded queue concurrency;
* unbounded search result sizes.

Prefer:

* streaming/direct uploads;
* asynchronous processing;
* CDN delivery;
* batched cleanup;
* efficient indexes;
* cursor pagination;
* bounded worker concurrency;
* provider-specific rate limits.

---

# 49. DATA CONSISTENCY

Maintain clear ownership:

PostgreSQL:

* authoritative durable state.

S3:

* binary media objects.

CloudFront:

* media delivery/cache layer.

Redis:

* ephemeral/distributed state.

Kafka/Redpanda:

* durable event transport.

BullMQ:

* asynchronous job execution.

Elasticsearch/OpenSearch:

* derived search index.

FCM/APNs:

* external notification delivery.

Do not allow any derived system to become an accidental source of truth.

---

# 50. API DOCUMENTATION

Update OpenAPI/Swagger documentation for all new endpoints.

Document:

* request schemas;
* response schemas;
* authentication;
* authorization;
* errors;
* pagination;
* upload workflow;
* media lifecycle;
* search behavior;
* notification registration.

Do not document functionality that is not actually implemented.

---

# 51. BACKWARD COMPATIBILITY

Preserve all existing APIs and events unless a breaking change is genuinely required.

If a breaking change is unavoidable:

1. identify all consumers;
2. introduce a migration path;
3. maintain compatibility during transition where possible;
4. update tests;
5. document the migration.

Never silently change an existing contract.

---

# 52. IMPLEMENTATION ORDER

Work in this order unless repository dependencies require a safer variation:

1. Inspect repository and existing contracts.
2. Extend database schema.
3. Implement media domain.
4. Implement secure storage abstraction.
5. Implement S3 integration.
6. Implement upload lifecycle.
7. Implement media validation/security.
8. Implement processing state machine.
9. Implement BullMQ media workers.
10. Implement FFmpeg/image processing.
11. Implement derivatives.
12. Implement secure media access.
13. Implement CloudFront integration.
14. Implement media cleanup/lifecycle.
15. Implement notification device/token domain.
16. Implement notification preferences.
17. Implement FCM/APNs providers.
18. Implement notification fanout.
19. Implement notification queues.
20. Implement search abstraction.
21. Implement Elasticsearch/OpenSearch integration.
22. Implement asynchronous indexing.
23. Implement search authorization.
24. Implement search update/delete propagation.
25. Implement index versioning/reindexing.
26. Integrate Kafka/Redpanda events.
27. Integrate observability.
28. Add failure handling.
29. Add comprehensive tests.
30. Run validation and fix all issues.

---

# 53. FINAL VALIDATION

Before declaring this volume complete:

* run formatting;
* run linting;
* run TypeScript compilation;
* run unit tests;
* run integration tests where available;
* run API tests;
* run Prisma validation;
* validate migrations;
* validate OpenAPI;
* validate worker startup;
* validate application startup;
* validate environment configuration;
* verify no secrets were committed;
* verify no TODOs/placeholders remain;
* verify no fake provider integrations exist;
* verify no duplicate domain implementations exist;
* verify existing functionality remains intact.

Inspect the final git diff.

Remove accidental changes.

Do not regenerate unchanged files.

---

# 54. REQUIRED COMPLETION REPORT

At the end, report:

### Implemented

List the functionality actually implemented.

### Modified

List the actual files modified.

### Created

List newly created files.

### Database

Describe migrations/schema changes.

### APIs

List new or changed endpoints.

### Events

List new or changed events.

### Queues

List new or changed queues/workers.

### Storage

Describe S3/CloudFront integration.

### Notifications

Describe FCM/APNs integration.

### Search

Describe Elasticsearch/OpenSearch integration.

### Security

Summarize security controls implemented.

### Tests

List tests added and validation executed.

### Remaining

Only list genuine remaining work that belongs to later implementation phases or requires external credentials/infrastructure.

Do not claim anything is implemented unless it exists and has been validated in the repository.

---

# 55. NON-NEGOTIABLE RULES

Never:

* create placeholder implementations;
* create fake S3/CloudFront behavior;
* create fake FCM/APNs behavior;
* pretend FFmpeg processing exists when it does not;
* invent provider capabilities;
* bypass authorization;
* expose private S3 objects;
* trust client MIME types;
* execute shell commands using unsanitized input;
* store secrets in source code;
* index encrypted plaintext that the server should not possess;
* make search authoritative;
* make push notifications part of the message transaction;
* make media processing synchronous inside HTTP requests;
* use Redis as durable source of truth;
* assume exactly-once event processing;
* assume exactly-once queue execution;
* silently break existing contracts;
* duplicate existing modules;
* leave TODOs;
* leave FIXME markers;
* use pseudo-code;
* use fake data in production paths.

Every implementation must be production-ready.

Every new subsystem must integrate with the existing repository architecture.

Every contract must remain consistent across:

* PostgreSQL;
* Prisma;
* REST;
* WebSockets;
* Kafka/Redpanda;
* Redis;
* BullMQ;
* S3;
* CloudFront;
* FCM;
* APNs;
* Elasticsearch/OpenSearch;
* authentication;
* authorization;
* synchronization;
* observability;
* testing.

The result must remain one coherent production-grade real-time communication platform.
