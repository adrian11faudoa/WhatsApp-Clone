# WhatsApp-Style Messaging Platform — Backend Prompt — Volume 3

## ROLE

You are the **Staff Backend Engineer, Realtime Systems Engineer, Media Systems Engineer, and Notification Systems Engineer** responsible for implementing the next bounded backend milestone for the **WhatsApp-style messaging platform**.

This is a **bounded backend implementation milestone**.

Operate with the combined responsibilities of:

* Staff Backend Engineer
* Distributed Systems Engineer
* Media Systems Engineer
* Realtime Systems Engineer
* Database Architect
* Security Engineer
* Performance Engineer
* Reliability Engineer
* QA Engineer
* Technical Writer

Implement real production-grade backend functionality within the scope of this prompt.

Do not implement unrelated frontend, mobile, infrastructure, or future backend functionality.

---

# PROJECT

The project is an independently engineered **production-grade, globally scalable, WhatsApp-style real-time communications platform**.

The backend technology direction is:

* NestJS;
* TypeScript;
* PostgreSQL;
* Prisma or equivalent strongly typed data-access tooling;
* Redis;
* authenticated WebSocket communication;
* BullMQ or equivalent durable background-job infrastructure where required;
* S3-compatible object storage;
* structured logging;
* OpenTelemetry-compatible observability;
* automated testing.

The completed backend is intended to support:

* messaging;
* delivery and read state;
* reactions;
* typing indicators;
* presence;
* media;
* notifications;
* multi-device synchronization;
* search;
* moderation;
* administration;
* analytics;
* background processing.

This prompt implements the **media, reactions, ephemeral realtime state, and notification orchestration foundations** required by the next phase of the backend.

---

# CURRENT BACKEND SCOPE

Implement:

* message reactions;
* reaction persistence and authorization;
* reaction realtime events;
* ephemeral typing indicators;
* presence architecture and implementation;
* device heartbeat handling;
* Redis-backed presence state;
* media-asset domain;
* secure media-upload initiation;
* media metadata persistence;
* media-processing job contracts;
* media lifecycle state;
* secure media authorization;
* signed object-storage access where applicable;
* media processing orchestration foundation;
* notification domain;
* push-token registration;
* notification intent creation;
* notification preference checks;
* notification deduplication;
* notification delivery-job orchestration;
* multi-device notification targeting;
* relevant background jobs;
* relevant Redis infrastructure;
* related observability;
* related security controls;
* automated tests;
* API and realtime documentation.

This milestone must integrate cleanly with the existing messaging backend.

---

# OUT-OF-SCOPE

Do not implement:

* complete push-provider production deployment;
* complete media transcoding infrastructure;
* complete FFmpeg worker fleet;
* full search;
* full moderation system;
* full analytics pipeline;
* complete administrative UI;
* web UI;
* mobile UI;
* complete Kubernetes infrastructure;
* complete Terraform infrastructure;
* final multi-region deployment;
* advanced end-to-end encryption.

Where external provider or infrastructure integration is required, implement a realistic adapter boundary and configuration model without fabricating credentials or claiming an unavailable external service has been provisioned.

---

# SOURCE-OF-TRUTH MODEL

Inspect the actual repository before changing it.

Treat the repository as the authoritative representation of the currently implemented backend.

Inspect:

* authentication;
* authorization;
* user/device/session modules;
* conversation and membership modules;
* message model;
* message APIs;
* realtime gateway;
* synchronization;
* Redis integration;
* outbox/event mechanisms;
* queue infrastructure;
* configuration;
* database migrations;
* existing tests;
* documentation.

Do not assume another AI response exists.

Do not assume a previous backend prompt was executed merely because it appears earlier in the prompt sequence.

Integrate with actual repository state.

If a required foundation is missing, implement only the minimum compatible foundation necessary for this prompt.

---

# IMPLEMENTATION DISCIPLINE

Before implementation:

1. Inspect the current repository.
2. Identify the existing canonical message model.
3. Identify the realtime protocol already implemented.
4. Identify existing Redis and queue abstractions.
5. Identify database conventions.
6. Identify configuration conventions.
7. Identify observability conventions.
8. Identify existing media or notification code.
9. Determine the smallest safe change set.
10. Implement only this prompt's scope.

Do not rewrite the messaging subsystem unnecessarily.

Do not introduce parallel domain models for messages, devices, or conversations.

---

# REACTION DOMAIN

Implement durable message reactions.

A reaction must support, as applicable:

* reaction ID or deterministic compound identity;
* message ID;
* conversation ID where useful for authorization/indexing;
* user ID;
* reaction value;
* created timestamp;
* updated timestamp where required.

Use database constraints to prevent duplicate reactions by the same user for the same message/reaction type where the product rules require uniqueness.

---

# REACTION AUTHORIZATION

Before creating, changing, or removing a reaction:

* authenticate the user;
* verify account state;
* verify conversation membership;
* verify message accessibility;
* validate the reaction value.

A user must not be able to react to a message they are not authorized to access.

Protect against IDOR and cross-conversation manipulation.

---

# REACTION API

Implement APIs appropriate to the existing backend API conventions for:

* adding a reaction;
* removing a reaction;
* retrieving reaction state where required.

Use the existing standardized validation and error model.

Do not create a second API contract for reactions.

---

# REACTION REALTIME EVENTS

Publish and deliver realtime events for:

* reaction_added;
* reaction_removed.

Events must:

* use the existing realtime envelope;
* identify the message;
* identify the conversation;
* identify the reaction actor;
* carry the reaction value;
* be authorized for each recipient;
* remain idempotent.

Do not leak reactions from private conversations to unauthorized connections.

---

# REACTION CONCURRENCY

Handle concurrent reaction operations safely.

Examples:

* duplicate add requests;
* concurrent add/remove;
* simultaneous operations from multiple devices;
* retry after network failure.

Final durable state must converge deterministically.

---

# TYPING INDICATORS

Implement typing indicators as ephemeral realtime state.

Support:

* typing_start;
* typing_stop;
* expiration;
* disconnect cleanup;
* authorization;
* rate limiting;
* fan-out.

Typing state must not become durable message history.

---

# TYPING INDICATOR RATE CONTROL

Typing indicators can generate high-frequency traffic.

Implement appropriate:

* debounce expectations;
* server-side rate limiting;
* maximum update frequency;
* automatic expiration;
* stale-state cleanup.

Do not allow typing events to become an uncontrolled source of realtime load.

---

# PRESENCE DOMAIN

Implement presence as ephemeral state.

Support:

* online;
* offline;
* active connection;
* last activity where product privacy rules permit;
* device-level presence;
* account-level derived presence.

Use Redis or the project's selected ephemeral-state system.

Do not write a durable database row for every heartbeat.

---

# PRESENCE HEARTBEAT

Implement a server-controlled heartbeat mechanism.

A heartbeat must:

* authenticate the connection;
* refresh appropriate ephemeral state;
* update last-active information;
* have a bounded TTL;
* support connection cleanup.

The server must not trust a client to declare itself permanently online.

---

# PRESENCE PRIVACY

Presence visibility must respect account privacy settings.

Do not reveal:

* online state;
* last-seen state;
* activity information

when the relevant privacy configuration prohibits it.

Authorization and privacy checks must be server-side.

---

# PRESENCE FAN-OUT

Publish presence changes only to authorized observers.

Define appropriate aggregation so a user with multiple devices does not create unnecessary contradictory presence events.

Account-level presence should reflect active device state according to the product's defined semantics.

---

# PRESENCE FAILURE BEHAVIOR

If Redis or the ephemeral presence mechanism becomes unavailable:

* do not corrupt durable messaging state;
* fail gracefully;
* avoid claiming stale online state indefinitely;
* preserve application availability for durable operations where possible;
* expose the degradation through observability.

Presence is non-authoritative ephemeral state.

---

# MEDIA DOMAIN

Implement the backend media-asset foundation.

The media domain must distinguish:

* media asset;
* upload attempt;
* processing state;
* media variant;
* storage object;
* message attachment reference.

The durable database must own media metadata.

Object storage must own binary content.

---

# MEDIA ASSET MODEL

Support the metadata needed for secure media handling, including as applicable:

* media asset ID;
* owner;
* message association;
* content type;
* size;
* checksum;
* original filename where appropriate;
* storage key;
* processing status;
* created timestamp;
* updated timestamp;
* deletion state;
* media category;
* duration/dimensions where applicable.

Do not expose internal object-storage keys directly when the product does not require it.

---

# MEDIA LIFECYCLE

Implement explicit media states such as:

* initiated;
* uploading;
* uploaded;
* validating;
* processing;
* ready;
* failed;
* deleted.

State transitions must be server-controlled.

Do not allow clients to mark arbitrary media as processed or safe.

---

# SECURE UPLOAD INITIATION

Implement a secure upload-initiation API.

The flow should be conceptually:

```text
Authenticated client
  ↓
Upload intent request
  ↓
Authorization / quota checks
  ↓
Media metadata validation
  ↓
Media asset creation
  ↓
Short-lived authorized upload access
  ↓
Client uploads to object storage
  ↓
Server/provider processing lifecycle
```

Do not route large media files unnecessarily through the application server.

Use short-lived signed upload access where appropriate.

---

# MEDIA VALIDATION

Treat every uploaded object as untrusted.

Validate as applicable:

* declared content type;
* actual content type;
* size;
* checksum;
* supported format;
* ownership;
* upload state;
* object existence.

Do not trust a client-provided MIME type as authoritative.

---

# MEDIA PROCESSING JOBS

Create the background-job contracts required for media processing.

Jobs may include:

* validation;
* metadata extraction;
* thumbnail generation;
* transcoding;
* optimization;
* virus/malware scanning where integrated;
* variant creation;
* cleanup.

Each job must define:

* payload;
* idempotency key;
* retries;
* timeout;
* backoff;
* concurrency;
* failure behavior;
* observability.

Do not fabricate successful media processing when no processor is available.

---

# MEDIA VARIANTS

Define a durable representation for derived variants where needed.

Examples:

* original;
* thumbnail;
* preview;
* optimized image;
* mobile video;
* streaming-compatible media.

The model must allow future variants without changing the fundamental media ownership model.

---

# MEDIA ACCESS AUTHORIZATION

Media access must be authorized independently of UI visibility.

Before issuing read access:

* authenticate the user;
* verify conversation/message authorization;
* verify media ownership/reference;
* verify deletion state.

Do not expose unrestricted object-storage buckets.

---

# SIGNED MEDIA ACCESS

Where appropriate, implement short-lived signed access for object retrieval.

Access tokens or signed URLs must:

* be short-lived;
* reference authorized resources;
* avoid embedding sensitive information;
* not grant unrestricted bucket access.

Do not store reusable unrestricted object-storage credentials in the application.

---

# MEDIA DELETION

When a message or media asset is deleted, define the lifecycle of:

* database metadata;
* object storage;
* derived variants;
* caches;
* future search index entries.

Deletion must be idempotent.

Cleanup may be asynchronous where immediate physical deletion is not necessary.

---

# MEDIA QUOTAS

Implement appropriate size/count validation and quota hooks.

Prevent:

* arbitrarily large uploads;
* excessive concurrent uploads;
* resource exhaustion.

Do not create a fake billing/quota system if billing is outside the current scope.

A well-defined enforceable limit and extensible quota abstraction is sufficient.

---

# MESSAGE/MEDIA INTEGRATION

Extend the existing message system to support attachment references without breaking existing text messages.

A message may contain:

* text;
* attachments;
* both;

according to the product rules.

Attachment metadata must remain separate from raw binary storage.

Do not duplicate large binary data into PostgreSQL.

---

# NOTIFICATION DOMAIN

Implement the notification orchestration foundation.

Separate:

* notification intent;
* notification eligibility;
* notification targeting;
* provider delivery;
* delivery result.

The notification subsystem must not place provider-specific logic throughout messaging services.

---

# PUSH TOKEN DOMAIN

Implement push-token registration and lifecycle.

Support, as appropriate:

* token registration;
* device association;
* platform;
* application version;
* last-used timestamp;
* active/inactive state;
* token invalidation.

Users may have multiple devices.

Do not assume one push token per account.

---

# NOTIFICATION PREFERENCES

Implement the backend foundation for notification preferences needed by this milestone.

Support categories such as:

* message notifications;
* group notifications;
* mention notifications;
* administrative notifications;

only where relevant to the current product model.

Privacy-sensitive notification settings must be evaluated server-side.

---

# NOTIFICATION ELIGIBILITY

Before scheduling a notification:

* verify the recipient;
* verify account state;
* verify device eligibility;
* verify notification preferences;
* prevent blocked or unauthorized recipients;
* avoid notifications caused by the user's own action when the product semantics exclude them.

Do not place private message content in notification payloads unless explicitly authorized by product and privacy requirements.

---

# NOTIFICATION DEDUPLICATION

Implement deduplication for notifications generated by retried events or multiple delivery paths.

Use:

* notification identity;
* source event ID;
* recipient ID;
* device ID where appropriate.

Duplicate event delivery must not create uncontrolled duplicate notifications.

---

# NOTIFICATION JOBS

Create background job contracts for notification delivery.

A notification job must support:

* notification ID;
* recipient;
* device;
* provider;
* payload reference;
* attempt number;
* retry state;
* correlation ID.

Implement retry and backoff behavior appropriate to provider failures.

Do not retry permanent token failures indefinitely.

---

# PUSH PROVIDER ABSTRACTION

Create a provider abstraction that allows the repository to integrate with the selected push provider without coupling the messaging domain to provider-specific APIs.

The abstraction must define:

* send;
* response normalization;
* retryable errors;
* permanent errors;
* invalid-token handling.

Do not implement fake provider success responses.

---

# NOTIFICATION PRIVACY

Notification payloads must be privacy-aware.

Where settings require generic notifications, send generic content rather than private message bodies.

Never log complete notification payloads if they contain private content.

---

# NOTIFICATION AND MESSAGE INTEGRATION

When an appropriate message event occurs:

1. determine whether notification generation is required;
2. determine eligible recipients;
3. determine eligible devices;
4. apply preferences and privacy controls;
5. create durable notification intent;
6. enqueue delivery;
7. process asynchronously.

The message transaction must not depend unnecessarily on successful external push-provider delivery.

A notification-provider outage must not prevent message persistence.

---

# EVENT-DRIVEN NOTIFICATION ORCHESTRATION

Use the existing message/event architecture to trigger notification work.

Do not directly call third-party push providers from the message transaction.

Use the existing outbox/event or queue mechanism to provide reliable asynchronous execution.

---

# REDIS USAGE

Redis may be used for:

* presence;
* typing;
* transient realtime coordination;
* rate limiting;
* short-lived media upload state where appropriate;
* notification deduplication where durable state is insufficient.

For every Redis use:

* define key strategy;
* define TTL;
* define invalidation;
* define failure behavior;
* avoid unbounded growth.

Do not move durable notification, media, or reaction state into Redis.

---

# BACKGROUND WORKER FOUNDATION

Extend the queue/worker infrastructure for:

* media processing;
* notification delivery;
* cleanup;
* ephemeral-state cleanup where needed.

Workers must:

* validate jobs;
* enforce idempotency;
* handle retries;
* emit metrics;
* log safely;
* shut down gracefully.

Do not create one-off worker implementations disconnected from the existing queue abstraction.

---

# SECURITY

Protect the new domains against:

* unauthorized reactions;
* unauthorized media access;
* object-storage abuse;
* malicious uploads;
* upload enumeration;
* oversized uploads;
* forged push tokens;
* notification abuse;
* presence scraping;
* typing-indicator flooding;
* Redis key manipulation;
* job payload tampering;
* privilege escalation.

Validate every externally supplied identifier against authenticated authority.

---

# PRIVACY

Protect:

* presence visibility;
* last-seen information;
* notification content;
* media metadata;
* uploaded filenames;
* device push tokens;
* internal media-storage identifiers.

Do not leak sensitive information through:

* error messages;
* logs;
* URLs;
* telemetry;
* analytics;
* unauthorized realtime events.

---

# OBSERVABILITY

Instrument:

## Reactions

* reaction creation;
* reaction removal;
* authorization failures;
* duplicate attempts.

## Presence

* active connections;
* heartbeats;
* stale expiration;
* presence transitions.

## Media

* upload initiation;
* processing duration;
* processing failures;
* media state transitions;
* storage-access failures;
* cleanup failures.

## Notifications

* intent creation;
* queued notifications;
* delivery attempts;
* provider failures;
* invalid tokens;
* retry count;
* delivery latency.

## Workers

* queue depth;
* job latency;
* job failure;
* retry count;
* dead-letter activity.

Do not log message bodies, private notification payloads, access tokens, or secrets.

---

# RELIABILITY

The new subsystems must tolerate:

* Redis outage;
* object-storage outage;
* worker restart;
* duplicate jobs;
* provider outage;
* invalid push tokens;
* duplicate reactions;
* repeated upload-initiation requests;
* duplicate notification events;
* disconnected realtime clients.

Durable application state must remain authoritative.

Ephemeral functionality may degrade without corrupting durable messaging state.

---

# PERFORMANCE

Optimize appropriately for:

* reaction updates;
* presence heartbeats;
* typing indicators;
* upload initiation;
* notification scheduling;
* worker throughput.

Avoid:

* database writes for every presence heartbeat;
* unbounded realtime fan-out;
* synchronous media processing;
* synchronous push-provider calls in message transactions;
* uncontrolled notification retries.

---

# TESTING

Implement automated tests for this milestone.

## Reactions

Test:

* add;
* remove;
* duplicate requests;
* concurrent operations;
* unauthorized access;
* realtime propagation.

## Presence

Test:

* connection heartbeat;
* expiration;
* online/offline transition;
* multiple devices;
* privacy filtering;
* Redis failure behavior where practical.

## Typing

Test:

* start;
* stop;
* expiration;
* rate limits;
* unauthorized conversation;
* disconnect cleanup.

## Media

Test:

* upload initiation;
* authorization;
* invalid metadata;
* size limits;
* signed-access generation;
* lifecycle transitions;
* duplicate jobs;
* processing failure;
* deletion;
* unauthorized media access.

## Notifications

Test:

* push-token registration;
* invalid-token handling;
* preference filtering;
* privacy filtering;
* deduplication;
* retryable provider failure;
* permanent provider failure;
* multi-device targeting.

## Workers

Test:

* valid jobs;
* invalid jobs;
* retries;
* backoff;
* idempotency;
* graceful failure.

Use integration tests with realistic Redis/queue/storage abstractions where practical.

---

# DOCUMENTATION

Document the actual implementations added by this milestone.

Include:

* reaction APIs;
* presence protocol;
* typing protocol;
* media lifecycle;
* upload flow;
* media authorization;
* media-processing jobs;
* notification lifecycle;
* push-token lifecycle;
* provider abstraction;
* worker behavior;
* environment configuration;
* relevant operational metrics.

Do not document future features as implemented.

---

# FUTURE COMPATIBILITY

Ensure compatibility with later implementation of:

* full search;
* moderation;
* analytics;
* administration;
* advanced notification preferences;
* richer media processing;
* CDN optimization;
* production push-provider integrations;
* multi-region deployment;
* infrastructure automation.

Do not introduce domain models that require redesign of the existing message and conversation contracts.

---

# NO FAKE FUNCTIONALITY

Do not create:

* fake media processing;
* fake malware scanning;
* fake push delivery;
* fake notification-provider responses;
* fake presence persistence;
* fake queue completion.

Where external dependencies are unavailable, implement real repository-level adapters and accurately report what could and could not be validated.

---

# NO HARDCODED SECRETS

Never hardcode:

* push credentials;
* object-storage credentials;
* signing secrets;
* access keys;
* Redis passwords;
* provider tokens;
* API keys.

Use environment configuration and the project's secret-management model.

---

# VALIDATION

Before completion:

* run unit tests;
* run integration tests;
* validate migrations;
* validate APIs;
* validate WebSocket behavior;
* validate queue behavior;
* validate Redis integration;
* validate type checking;
* validate linting;
* validate formatting;
* validate build;
* inspect the final diff.

Verify:

* no unauthorized media access;
* no secret leakage;
* no fake provider success;
* no unbounded presence storage;
* no synchronous provider dependencies in critical message transactions;
* no unrelated modifications.

---

# COMPLETION REPORT

After implementation, report:

* files created;
* files modified;
* files deleted, if any;
* reaction changes;
* presence changes;
* typing changes;
* media models;
* media APIs;
* upload flow;
* media-processing jobs;
* notification models;
* push-token changes;
* notification jobs;
* Redis changes;
* queue changes;
* database migrations;
* API changes;
* realtime changes;
* security changes;
* observability changes;
* tests added;
* tests executed;
* validation performed;
* documentation changes;
* compatibility considerations;
* unresolved issues;
* external blockers.

Do not claim that a cloud storage service, push provider, or media-processing cluster was provisioned unless it was actually provisioned and verified.

---

# DEFINITION OF DONE

This backend milestone is complete only when:

* reactions are implemented;
* reaction authorization is implemented;
* reaction realtime events are implemented;
* typing indicators are implemented;
* presence is implemented;
* presence privacy is enforced;
* Redis-backed ephemeral state is implemented where required;
* media assets are modeled;
* secure upload initiation is implemented;
* media lifecycle is implemented;
* media authorization is implemented;
* processing-job contracts are implemented;
* notification intent is implemented;
* push-token management is implemented;
* notification preferences required by scope are implemented;
* notification eligibility is implemented;
* notification deduplication is implemented;
* notification jobs are implemented;
* provider abstraction is implemented;
* worker failure handling is implemented;
* security controls are implemented;
* observability is implemented;
* relevant automated tests exist and pass;
* documentation reflects actual behavior;
* no intentional implementation gaps remain within scope;
* the implementation remains compatible with later search, moderation, analytics, administration, infrastructure, and QA work.

This Definition of Done applies only to **Backend Prompt — Volume 3**.

It does not require implementation of the complete backend platform.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as **Backend Prompt — Volume 3 only**.

Inspect the repository before making changes.

Implement only the reactions, ephemeral realtime state, media, notifications, and supporting worker functionality defined here.

Do not implement the web frontend.

Do not implement mobile applications.

Do not implement final production infrastructure.

Do not implement unrelated search, moderation, analytics, or administration systems.

Do not invent another backend volume or project phase.

Do not depend on previous AI responses.

Use the repository as the authoritative representation of actual implementation state.

Preserve compatible existing behavior.

Implement real production-grade functionality within scope.

Run appropriate validation.

Inspect the final diff.

Provide the required completion report and accurately report what was implemented and verified.
