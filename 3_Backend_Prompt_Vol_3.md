# BACKEND IMPLEMENTATION PROMPT — VOLUME 3

## Production-Grade Real-Time Communication Platform

### Messaging Engine, Message Persistence, Ordering, Idempotency, Delivery, Read State, Reactions, Replies, Forwarding, Editing, Deletion, and Synchronization Foundations

You are implementing **Volume 3 of the backend** for a production-grade, globally scalable, WhatsApp-like real-time communication platform.

This is an original communication platform inspired by modern real-time messaging products. It is not an implementation of proprietary WhatsApp source code, private infrastructure, undocumented protocols, or proprietary algorithms.

This prompt is **fully standalone**. It must be executable without requiring another prompt, previous conversation, architecture document, or previously generated prompt to be present.

The actual repository is the source of truth for existing implementation.

This volume is an implementation unit of **one coherent backend system**. It must integrate with the actual repository's existing identity, authentication, users, devices, sessions, contacts, conversations, memberships, authorization, database, Redis, event, error, observability, and testing systems.

Do not create competing implementations.

Do not duplicate existing models or infrastructure.

Do not assume another prompt exists.

---

# 1. PRIMARY OBJECTIVE

Implement the production-grade messaging engine.

This volume must establish real backend functionality for:

* message creation;
* message persistence;
* message retrieval;
* message pagination;
* message types;
* message ordering;
* client idempotency;
* message sequence/versioning;
* delivery state;
* read state;
* message edits;
* message deletion;
* reactions;
* replies;
* forwarding;
* conversation activity updates;
* message authorization;
* message domain events;
* multi-device synchronization foundations;
* reliable event publication;
* message-related caching where justified.

The implementation must be production-ready.

Do not create a CRUD demonstration.

Do not use an in-memory message store.

Do not return fake messages.

Do not implement message delivery through frontend-only logic.

---

# 2. PRODUCT CONTEXT

The platform supports:

* individual accounts;
* multiple devices per account;
* direct conversations;
* group conversations;
* text messages;
* media messages;
* audio/voice messages;
* document messages;
* replies;
* forwarding;
* editing;
* deletion;
* reactions;
* delivery receipts;
* read receipts;
* typing indicators;
* presence;
* push notifications;
* real-time synchronization;
* multi-device synchronization;
* search;
* privacy and blocking;
* voice/video calls.

This volume owns the durable messaging domain.

It does not implement the complete WebSocket gateway, push-notification system, media processing pipeline, or calling system.

It must, however, expose the contracts those systems will consume.

---

# 3. REQUIRED TECHNOLOGY STACK

Use the repository's existing compatible implementation of:

* Node.js;
* NestJS;
* TypeScript;
* PostgreSQL;
* Prisma;
* Redis;
* Kafka or Redpanda;
* BullMQ where genuinely required;
* WebSockets/Socket.IO where integration requires it;
* OpenTelemetry;
* Prometheus;
* structured logging.

Do not replace compatible existing infrastructure.

---

# 4. FIRST ACTION — INSPECT THE ACTUAL REPOSITORY

Before making changes:

1. Inspect the backend repository.
2. Inspect the identity implementation.
3. Inspect users/devices/sessions.
4. Inspect contacts.
5. Inspect conversations.
6. Inspect conversation membership and authorization.
7. Inspect Prisma schema and migrations.
8. Inspect event infrastructure.
9. Inspect outbox implementation.
10. Inspect Redis conventions.
11. Inspect API/error conventions.
12. Inspect logging/tracing.
13. Inspect tests.
14. Inspect any existing messaging implementation.

If messaging already exists:

* extend it;
* repair it;
* migrate it safely;
* preserve compatible behavior.

Do not create a second message model or second message service.

---

# 5. MESSAGE DOMAIN RESPONSIBILITY

The messaging domain owns:

* canonical message persistence;
* message identity;
* conversation association;
* sender association;
* message content metadata;
* ordering;
* client idempotency;
* message lifecycle;
* delivery/read state;
* reactions;
* replies;
* forwarding;
* edit/delete state;
* message events.

The following remain separate domains:

## Identity

Owns:

* users;
* devices;
* sessions;
* authentication.

## Conversations

Owns:

* conversation existence;
* membership;
* group roles;
* conversation authorization.

## Media

Will own:

* uploads;
* object storage;
* transcoding;
* thumbnails;
* media scanning;
* CDN delivery.

## Notifications

Will own:

* push notifications;
* delivery policies.

## Realtime

Will own:

* WebSocket connections;
* connected-device delivery.

This volume must integrate with those domains through stable contracts rather than duplicating them.

---

# 6. MESSAGE IDENTIFIERS

Implement a canonical message ID.

It must be:

* globally unique;
* safe to expose through APIs;
* consistent across REST, WebSocket, database, events, and clients.

Do not use database auto-increment IDs as publicly exposed message identifiers unless the repository already has an explicit secure strategy.

Where internal database sequence values are useful, keep them separate from public identifiers.

---

# 7. CLIENT IDEMPOTENCY

Message sending must support client-generated idempotency.

A client may retry the same send request because of:

* network failure;
* timeout;
* connection loss;
* app suspension;
* device transition.

The server must not create duplicate messages for a retried logical send.

Support a stable client-generated idempotency key/request ID associated with:

* authenticated user;
* authenticated device;
* conversation;
* logical message submission.

Enforce uniqueness at the database level.

Do not rely solely on Redis for durable idempotency.

---

# 8. IDEMPOTENT MESSAGE CREATION

The message creation operation must behave deterministically.

If a client repeats the same valid request:

* return the existing canonical message;
* do not create a second message;
* do not emit duplicate logical domain events;
* do not increment conversation activity twice.

If the same idempotency key is reused with materially different message content, reject it with a stable conflict error.

Do not silently associate an idempotency key with a different message.

---

# 9. MESSAGE MODEL

Implement a durable message model capable of representing at minimum:

* message ID;
* conversation ID;
* sender user ID;
* sender device ID where useful;
* message type;
* textual content where applicable;
* reply reference;
* forwarded reference/metadata;
* edit state;
* deletion state;
* client idempotency key;
* server creation timestamp;
* update timestamp;
* ordering information;
* version/state metadata.

Do not place all possible message types into one unstructured JSON blob.

Use typed relational fields for data that requires:

* indexing;
* constraints;
* authorization;
* filtering;
* querying.

Use structured JSON only for genuinely variable metadata.

---

# 10. MESSAGE TYPES

Define stable message types.

At minimum support the architecture's required categories such as:

* text;
* image;
* video;
* audio;
* voice;
* document;
* system/event message where appropriate.

Media-specific persistence must remain compatible with the future media domain.

Do not implement fake media storage in this volume.

A media message may reference a canonical media asset ID even if the media asset service is implemented later.

---

# 11. MESSAGE CONTENT

For text messages:

* validate content;
* enforce maximum size;
* normalize where appropriate;
* preserve user-visible content semantics;
* reject malformed payloads.

Do not perform destructive normalization that unexpectedly changes user content.

Do not trust client-provided rendered HTML.

Messages must not become an XSS vector for web clients.

---

# 12. EMPTY MESSAGE PROTECTION

Reject messages that contain no valid content.

For example, a message must not be accepted if it contains:

* empty text;
* missing media reference;
* invalid message type;
* malformed structured payload.

Do not use a frontend-only validation check.

The backend must validate semantic message completeness.

---

# 13. MESSAGE AUTHORIZATION

Before creating or modifying a message:

1. authenticate the requester;
2. resolve the authenticated user/device;
3. verify conversation membership;
4. verify membership is active;
5. verify account state;
6. enforce conversation/privacy/blocking rules where applicable.

Never trust client-provided membership.

Never accept a client-provided sender ID as authoritative.

The sender is derived from authenticated server-side identity.

---

# 14. GROUP MESSAGE AUTHORIZATION

For groups:

* only active members may send;
* group permissions must be respected;
* restricted groups must prevent unauthorized posting;
* removed/left members must not be able to continue sending.

Reuse the repository's conversation permission system.

Do not duplicate group role logic inside messaging.

---

# 15. MESSAGE ORDERING

Implement a server-authoritative ordering strategy.

Messages must have a deterministic order within a conversation.

Do not rely exclusively on:

* client timestamps;
* device clocks;
* arrival order at individual WebSocket servers.

The ordering strategy must remain correct when:

* multiple devices send concurrently;
* users send from different geographic regions;
* requests are retried;
* network latency differs;
* messages arrive out of order.

Use an appropriate database-backed sequence/version/ordering mechanism.

---

# 16. CONVERSATION SEQUENCE

Where the architecture requires a conversation-local sequence, implement it atomically.

A valid message creation must receive a unique ordering position within its conversation.

The allocation mechanism must handle concurrent sends.

Do not implement:

```text
read current sequence
increment in application code
write sequence
```

without concurrency protection.

Use a transactional/atomic strategy appropriate for PostgreSQL.

---

# 17. MESSAGE TIMESTAMPS

Persist:

* server-created timestamp;
* appropriate update timestamp.

Client timestamps may be retained as metadata if product behavior requires them, but they must never override the authoritative server ordering.

Use UTC.

Do not allow clients to fabricate authoritative creation times.

---

# 18. MESSAGE RETRIEVAL

Implement authenticated message retrieval.

The API must:

* verify conversation membership;
* return only authorized messages;
* use efficient queries;
* support pagination;
* avoid loading unbounded message history;
* return stable ordering.

Do not allow a user to retrieve messages from a conversation they cannot access.

---

# 19. MESSAGE PAGINATION

Use cursor-based pagination.

Support navigation such as:

* newest messages;
* older messages;
* newer messages when synchronization requires it.

The cursor must encode enough information to provide deterministic pagination without exposing internal database implementation details.

Avoid offset pagination for large message histories.

---

# 20. PAGINATION CONSISTENCY

Pagination must tolerate concurrent message creation.

A user retrieving older messages should not experience uncontrolled duplication or omission merely because new messages arrive.

Use the canonical message ordering strategy.

Do not depend on timestamps alone if timestamp collisions are possible.

---

# 21. MESSAGE DELIVERY STATE

Implement durable delivery state.

At minimum distinguish:

* sent/accepted;
* delivered;
* read.

Where necessary support:

* failed;
* deleted.

Do not confuse:

* server accepted;
* delivered to a device;
* delivered to all required recipient devices;
* read by a recipient.

The data model must permit future multi-device semantics.

---

# 22. DELIVERY RECEIPTS

Implement authenticated delivery-receipt operations.

A receipt must:

* identify the relevant conversation/message;
* identify the receiving user/device where required;
* be validated against actual membership;
* be monotonic where appropriate;
* be idempotent.

A client must not be able to mark another user's messages as delivered.

---

# 23. READ RECEIPTS

Implement authenticated read-state updates.

Support an efficient representation.

For high-volume conversations, consider storing a per-user conversation read position rather than inserting one row for every message if the product semantics allow it.

Where per-message state is required, implement it with appropriate indexes and constraints.

The design must support efficient:

* unread counts;
* read position;
* synchronization;
* multi-device propagation.

---

# 24. MONOTONIC RECEIPTS

Read and delivery state must not move backward.

For example:

```text
READ(sequence 100)
```

must not later become:

```text
READ(sequence 80)
```

Use server-side comparison/atomicity.

Do not trust client ordering.

---

# 25. MULTI-DEVICE RECEIPTS

The system supports multiple devices.

Determine receipt semantics explicitly.

A device-level receipt must not accidentally imply that every device has received the message unless the product's canonical delivery definition says so.

The backend must be able to distinguish:

* user-level state;
* device-level state;

where necessary.

Do not collapse them prematurely if doing so would make later multi-device synchronization impossible.

---

# 26. MESSAGE EDITING

Implement message editing where supported.

Rules must include:

* only authorized sender may edit;
* message must be editable;
* appropriate time/content restrictions;
* deleted messages cannot be edited;
* edits must be persisted;
* edit history/version information must be retained where required;
* an edit must generate an appropriate domain event.

Do not allow a client to modify:

* sender;
* conversation;
* original message identity;
* authoritative timestamps.

---

# 27. EDIT HISTORY

If the product requires edit history, preserve prior versions in a dedicated structure.

Do not overwrite historical data if the product requires auditability.

Each edit should have:

* edit ID;
* message ID;
* editor;
* prior/current version relationship;
* timestamp;
* appropriate content representation.

Respect privacy and retention rules.

---

# 28. MESSAGE DELETION

Implement authorized message deletion.

Support the product's intended semantics, such as:

* delete for self;
* delete for everyone.

These must be modeled as different operations.

Do not physically destroy authoritative message data immediately when doing so would break:

* synchronization;
* auditability;
* receipts;
* moderation;
* legal retention requirements;
* event propagation.

Use explicit deletion state where appropriate.

---

# 29. DELETE-FOR-EVERYONE AUTHORIZATION

If supported:

* only eligible senders or authorized roles may perform it;
* enforce time/policy restrictions;
* verify the message belongs to the conversation;
* make the operation idempotent;
* emit a domain event.

Never trust the client to determine whether a message is deletable.

---

# 30. REACTIONS

Implement message reactions.

Support:

* authenticated user;
* message existence;
* conversation membership;
* valid reaction type;
* one reaction per user per supported reaction type/semantic;
* add/remove/update behavior.

Use database uniqueness constraints.

Do not allow reactions to messages the user cannot access.

---

# 31. REACTION CONCURRENCY

Concurrent reaction operations must remain consistent.

For example:

* two requests to add the same reaction must not create duplicates;
* removing an already removed reaction should be idempotent;
* updating a reaction must not accidentally affect another user.

Use database constraints and transactions where appropriate.

---

# 32. REPLIES

Implement message replies.

A reply must:

* reference a valid message;
* reference a message in an authorized conversation;
* preserve conversation consistency;
* support deleted/original-unavailable messages gracefully.

Do not permit cross-conversation message references.

A user must not be able to infer or retrieve an inaccessible message through a reply reference.

---

# 33. FORWARDING

Implement message forwarding where supported.

A forwarded message must preserve appropriate provenance without exposing private/internal information that should not be shared.

Determine whether forwarding creates:

* a new message containing copied content/metadata;
* a reference to the original;
* a hybrid representation.

The chosen model must remain compatible with:

* deletion;
* privacy;
* search;
* media;
* synchronization.

Do not make a forwarded message depend on the continued accessibility of the source conversation unless explicitly required.

---

# 34. SYSTEM MESSAGES

If the product uses system messages, implement them as an explicit message type.

Examples:

* group created;
* member joined;
* member left;
* member removed;
* role changed;
* group metadata changed.

System messages must not be forgeable by ordinary clients.

Only authorized domain operations may create them.

---

# 35. CONVERSATION ACTIVITY

A successful message mutation must update the conversation's appropriate activity metadata atomically where required.

For example:

* last activity sequence;
* last activity timestamp.

Do not update activity before message persistence succeeds.

Do not increment activity twice because of an idempotent retry.

---

# 36. TRANSACTIONS

Message creation must use transactions for all state that must change atomically.

A successful send may require atomic updates to:

* message row;
* conversation sequence;
* idempotency record;
* conversation activity;
* outbox event.

These must be coordinated so the system cannot report a message as successfully persisted while losing its canonical event/order state.

---

# 37. OUTBOX INTEGRATION

Use the repository's transactional outbox infrastructure.

For message mutations that require downstream processing, create durable events in the same transaction as the authoritative database change.

Potential events include:

* message.created;
* message.edited;
* message.deleted;
* message.reaction.added;
* message.reaction.removed;
* message.delivered;
* message.read;
* conversation.read-state.updated.

Do not publish a critical event outside the transaction and assume it cannot be lost.

---

# 38. MESSAGE EVENT CONTRACT

Every event must use the repository's canonical event envelope.

Include appropriate:

* event ID;
* event type;
* version;
* aggregate/message ID;
* conversation ID;
* producer;
* occurred-at;
* correlation ID;
* causation ID where appropriate;
* trace context;
* versioned payload.

Payloads must contain only information required by consumers.

Do not include:

* passwords;
* tokens;
* unnecessary personal data;
* private infrastructure information.

---

# 39. EVENT VERSIONING

Messages and events evolve over time.

Implement explicit event versions.

Consumers must be able to identify the event schema version.

Do not silently change the meaning of an existing event payload.

If the event contract changes incompatibly, create a new version.

---

# 40. EVENT IDEMPOTENCY

Assume at-least-once delivery.

Downstream consumers must be able to process duplicate events safely.

Use event IDs and/or aggregate versions where appropriate.

Do not design the system around exactly-once event delivery.

---

# 41. REDIS USAGE

Use Redis only for appropriate high-performance ephemeral state.

Potential uses:

* short-lived message request coordination;
* rate limiting;
* hot conversation metadata;
* unread counters;
* ephemeral synchronization state.

PostgreSQL remains authoritative.

Do not use Redis as the only durable message store.

---

# 42. MESSAGE CACHE

If message/conversation data is cached:

* define exact cache keys;
* define TTL;
* define invalidation;
* define stale behavior;
* define failure behavior.

Never allow stale cache state to grant access to unauthorized messages.

Authorization must remain authoritative.

---

# 43. UNREAD COUNTERS

If unread counts are implemented:

* define canonical semantics;
* avoid unbounded per-message calculations on every request;
* support efficient incremental updates;
* keep state consistent with read positions.

Unread counts may be derived or materialized, but the authoritative read state must remain recoverable.

Do not let Redis-only counters become the sole source of truth.

---

# 44. MESSAGE SEARCH COMPATIBILITY

The message model must support future indexing into Elasticsearch/OpenSearch.

Provide stable:

* message ID;
* conversation ID;
* sender ID;
* type;
* timestamps;
* edit/delete state;
* searchable content where policy permits.

Do not implement the full search engine here.

Do not index deleted/private content incorrectly.

---

# 45. MEDIA COMPATIBILITY

Media messages must be compatible with a later media subsystem.

Use references to canonical media assets rather than embedding large binary data in PostgreSQL.

Do not accept arbitrary client-supplied S3 URLs as authoritative media ownership.

Media authorization must eventually verify:

* asset ownership;
* conversation access;
* processing state;
* deletion state.

---

# 46. MESSAGE SIZE LIMITS

Define configurable limits for:

* text content;
* metadata;
* reply references;
* reaction payloads;
* forwarding metadata;
* batch operations.

Do not allow unbounded JSON payloads.

Reject oversized requests before expensive database work where possible.

---

# 47. BATCH OPERATIONS

If implementing batch operations such as:

* mark read through message X;
* acknowledge delivery through message X;

prefer compact state transitions over sending thousands of individual database mutations.

Validate that the referenced sequence belongs to the requested conversation.

Do not allow a client to use an arbitrary high sequence number to manipulate unrelated state.

---

# 48. MESSAGE ACCESS CONTROL

Every message query must be scoped to an authorized conversation.

Avoid patterns where the backend:

1. retrieves message by ID;
2. returns it;
3. checks conversation authorization later.

Authorization must be part of the effective query/service boundary.

This reduces IDOR risk.

---

# 49. DELETED MESSAGE REPRESENTATION

Define deterministic API behavior for deleted messages.

Depending on product semantics, return:

* deletion marker;
* message metadata without private content;
* restricted tombstone representation.

Do not expose deleted content through:

* normal retrieval;
* replies;
* search;
* forwarded references;

unless explicitly permitted.

---

# 50. MESSAGE EDIT REPRESENTATION

API clients must be able to distinguish:

* original message;
* edited message;
* deleted message;
* forwarded message;
* reply;
* system message.

Do not require clients to infer state from missing fields.

Use explicit flags/types/version metadata.

---

# 51. API ENDPOINTS

Implement real endpoints appropriate to the product.

At minimum support equivalents of:

## Messages

* create/send message;
* retrieve message;
* list messages;
* edit message;
* delete message.

## Delivery/read state

* acknowledge delivery;
* mark read;
* retrieve/read synchronization state where needed.

## Reactions

* add reaction;
* remove/update reaction.

## Replies

* create reply through message creation;
* retrieve reply metadata where required.

## Forwarding

* forward messages where supported.

Do not implement redundant endpoint variants.

---

# 52. MESSAGE SEND CONTRACT

The send request must contain only client-controlled fields that are genuinely required.

The server must derive:

* sender identity;
* authenticated device;
* authoritative timestamp;
* conversation authorization;
* message ordering.

The client must not control:

* sender ID;
* sequence number;
* authoritative creation timestamp;
* delivery state;
* read state;
* moderation state.

---

# 53. RESPONSE CONTRACT

Successful message creation should return enough information for the sender to reconcile local optimistic state.

Include appropriate:

* canonical message ID;
* conversation ID;
* authoritative sequence;
* server timestamp;
* message state;
* canonical content representation;
* relevant version metadata.

Do not return unnecessary internal database fields.

---

# 54. ERROR CONTRACT

Use stable machine-readable errors.

Examples:

* `MESSAGE_NOT_FOUND`
* `MESSAGE_ACCESS_DENIED`
* `CONVERSATION_ACCESS_DENIED`
* `MESSAGE_ALREADY_EXISTS`
* `IDEMPOTENCY_KEY_REUSED`
* `MESSAGE_EDIT_NOT_ALLOWED`
* `MESSAGE_DELETE_NOT_ALLOWED`
* `MESSAGE_ALREADY_DELETED`
* `INVALID_REPLY_TARGET`
* `INVALID_FORWARD_TARGET`
* `INVALID_REACTION`
* `MESSAGE_CONTENT_TOO_LARGE`
* `MESSAGE_TYPE_INVALID`

Do not expose database internals.

---

# 55. RATE LIMITING

Protect messaging operations against abuse.

Consider limits by:

* user;
* device;
* conversation;
* IP where appropriate;
* endpoint;
* account state.

Protect against:

* message floods;
* reaction floods;
* automated read-state manipulation;
* repeated edits/deletions;
* forwarding abuse;
* expensive retrieval requests.

Rate limiting must be configurable.

Do not make the system unusable for legitimate high-volume conversations.

---

# 56. ABUSE PROTECTION

The messaging engine must be resistant to:

* spam;
* message flooding;
* oversized content;
* malicious payloads;
* repeated retries;
* idempotency-key abuse;
* authorization probing;
* high-cardinality query abuse.

Security events should be observable without logging private message content unnecessarily.

---

# 57. PRIVACY

Respect conversation and account privacy.

Do not expose:

* private messages outside authorized conversations;
* private sender metadata unnecessarily;
* device information unnecessarily;
* deleted content;
* hidden moderation metadata.

If end-to-end encryption is part of the product's eventual design, keep the backend contracts compatible with ciphertext-oriented message storage.

Do not falsely claim that the current implementation provides end-to-end encryption unless the cryptographic system is actually implemented and validated.

---

# 58. ENCRYPTION COMPATIBILITY

If encrypted message payloads are part of the selected product architecture:

* do not invent cryptographic primitives;
* do not implement custom cryptography;
* use established cryptographic libraries/protocols;
* separate encrypted payloads from server-readable metadata;
* avoid storing plaintext unnecessarily.

If true end-to-end encryption is deferred, keep message APIs structurally capable of supporting encrypted payloads later without falsely advertising encryption guarantees.

---

# 59. MULTI-DEVICE SYNCHRONIZATION FOUNDATION

The messaging domain must support synchronization across a user's devices.

The backend must be able to represent:

* message creation;
* message updates;
* message deletion;
* reactions;
* read state;
* membership changes;
* conversation changes.

Later real-time infrastructure can consume these events.

Do not implement device delivery by directly querying every WebSocket connection from the message service.

Keep domain mutation separate from transport delivery.

---

# 60. SYNCHRONIZATION CURSORS

Design the message/event model so clients can eventually synchronize from a durable cursor.

A synchronization cursor must be:

* monotonic within its defined scope;
* opaque where exposed externally;
* durable enough to recover after reconnect;
* compatible with event ordering.

Do not rely solely on wall-clock timestamps for synchronization.

---

# 61. REAL-TIME INTEGRATION

The message service must publish canonical events.

The future WebSocket layer can then:

1. consume the domain event;
2. identify eligible devices;
3. deliver the event;
4. track delivery;
5. recover missed events.

Do not make PostgreSQL writes dependent on a WebSocket client being online.

A message must persist successfully even if all recipient clients are offline.

---

# 62. OFFLINE-FIRST COMPATIBILITY

Clients may send messages while experiencing unreliable connectivity.

The backend must safely support:

* retries;
* duplicate requests;
* delayed delivery;
* reconnect;
* out-of-order network arrival.

The server must remain authoritative.

Do not reject a valid retried request merely because the first response was lost.

---

# 63. MESSAGE HISTORY CONSISTENCY

A message must not appear in conversation history unless it has been durably accepted by the authoritative database.

Do not emit a successful message-created event before the transaction is committed.

Do not show a message as server-confirmed merely because it was accepted into an in-memory queue.

---

# 64. CONCURRENCY

Explicitly handle concurrent:

* sends;
* edits;
* deletes;
* reactions;
* reads;
* delivery acknowledgements.

Use database constraints and transactions.

For conflicting updates, define deterministic behavior.

Do not silently overwrite newer state with older requests.

---

# 65. OPTIMISTIC CONCURRENCY

Where messages can be edited/deleted concurrently, use an appropriate version or state check.

A stale client must not overwrite a newer message state.

Return a deterministic conflict/error when necessary.

---

# 66. DATABASE INDEXING

Design indexes around real queries.

At minimum consider:

* messages by conversation and sequence;
* messages by conversation and creation time;
* messages by sender;
* idempotency key lookup;
* replies by target message;
* reactions by message/user;
* read state by user/conversation;
* delivery state by user/device/message where required.

Avoid creating excessive indexes that make high-volume inserts unnecessarily expensive.

---

# 67. HIGH-VOLUME MESSAGE STORAGE

Design the schema for very large message tables.

Consider:

* efficient composite indexes;
* narrow rows where possible;
* avoiding large repeated JSON;
* partitioning readiness if required;
* archival/retention readiness;
* deletion/tombstone strategy.

Do not prematurely introduce database sharding unless repository requirements justify it.

The schema must not prevent future horizontal scaling.

---

# 68. RETENTION COMPATIBILITY

Message data may eventually require:

* retention policies;
* user deletion;
* conversation deletion;
* media lifecycle cleanup;
* legal/compliance handling.

Do not hardwire indefinite retention into application logic.

Do not permanently delete records merely because the user interface no longer displays them.

---

# 69. OBSERVABILITY

Instrument:

* message creation;
* message retrieval;
* edits;
* deletes;
* reactions;
* delivery updates;
* read updates;
* idempotency conflicts;
* authorization failures;
* database conflicts;
* event publication;
* outbox processing.

Capture:

* latency;
* error rates;
* throughput;
* dependency failures.

Do not log message content by default.

Do not log encrypted payloads unnecessarily.

---

# 70. METRICS

Expose useful low-cardinality metrics such as:

* messages accepted/sec;
* message creation latency;
* message retrieval latency;
* message mutation error rate;
* authorization failure rate;
* idempotency conflict rate;
* receipt processing rate;
* outbox publication latency;
* event failure/retry counts.

Never use:

* message IDs;
* user IDs;
* conversation IDs;

as unrestricted metric labels.

---

# 71. TESTING — UNIT

Create unit tests for:

* message validation;
* authorization;
* message type rules;
* idempotency;
* ordering;
* edit rules;
* delete rules;
* reaction rules;
* reply validation;
* forwarding;
* receipt monotonicity;
* unread/read state logic.

Test failure paths as seriously as successful paths.

---

# 72. TESTING — DATABASE/INTEGRATION

Use realistic database integration tests.

Test:

* message persistence;
* uniqueness constraints;
* conversation sequence allocation;
* concurrent sends;
* idempotent retries;
* edits;
* deletes;
* reactions;
* replies;
* forwarding;
* receipt updates;
* transaction rollback;
* outbox atomicity.

Do not rely exclusively on mocks.

---

# 73. TESTING — API/E2E

Test:

* sending as authorized member;
* sending as non-member;
* sending after leaving;
* duplicate send retry;
* conflicting idempotency key;
* message pagination;
* editing own message;
* editing another user's message;
* deleting own message;
* unauthorized deletion;
* reaction add/remove;
* invalid reply;
* invalid forwarding;
* delivery receipt authorization;
* read receipt authorization;
* rate limiting;
* malformed input;
* oversized input.

---

# 74. CONCURRENCY TESTING

Explicitly verify that simultaneous sends:

* do not duplicate idempotent requests;
* receive unique ordering positions;
* preserve conversation sequence;
* do not lose outbox events.

Verify concurrent state mutations do not move receipts backward.

---

# 75. FAILURE TESTING

Test behavior when:

* PostgreSQL becomes unavailable;
* Redis becomes unavailable;
* Kafka/Redpanda becomes unavailable;
* outbox publishing fails;
* transaction conflicts occur;
* requests time out;
* clients retry;
* consumers process duplicate events.

A database commit must remain authoritative even if downstream event delivery is temporarily unavailable.

---

# 76. PERFORMANCE TESTING

Where the repository has performance infrastructure, test:

* message insertion throughput;
* conversation history retrieval;
* concurrent sends;
* read-state updates;
* reaction operations;
* pagination under large datasets.

Identify:

* slow queries;
* excessive database round trips;
* N+1 queries;
* lock contention;
* unnecessary serialization.

Fix real bottlenecks found during validation.

---

# 77. API DOCUMENTATION

Update OpenAPI documentation for:

* message creation;
* message retrieval;
* pagination;
* edit;
* delete;
* reactions;
* delivery;
* read state;
* replies;
* forwarding.

Document:

* authentication;
* authorization;
* request constraints;
* response schemas;
* errors;
* cursor semantics.

Documentation must reflect actual behavior.

---

# 78. BACKWARD COMPATIBILITY

If messaging functionality already exists:

* preserve compatible APIs;
* migrate schemas safely;
* preserve existing clients where practical;
* avoid deleting working endpoints without migration;
* reconcile duplicate implementations.

The actual repository remains the source of truth.

---

# 79. FUTURE MEDIA COMPATIBILITY

Message creation must be designed so a later media service can provide:

* media asset IDs;
* processing state;
* secure download authorization;
* thumbnails;
* transcoded variants.

Do not store media binaries in PostgreSQL.

Do not generate permanent public media URLs from arbitrary client input.

---

# 80. FUTURE NOTIFICATION COMPATIBILITY

Message-created events must contain enough safe metadata for a future notification subsystem to determine:

* conversation;
* sender;
* message type;
* eligible recipients;
* whether notification should be generated.

Do not make push notification delivery part of the message database transaction.

A push provider outage must not cause message creation to fail.

---

# 81. FUTURE SEARCH COMPATIBILITY

Search indexing must be asynchronous.

Message creation must not synchronously depend on Elasticsearch/OpenSearch availability.

A search outage must not prevent valid messages from being stored.

The message event/outbox architecture must permit later indexing and replay.

---

# 82. FUTURE MODERATION COMPATIBILITY

The message architecture must permit later moderation workflows without allowing moderation services to corrupt authoritative message ordering.

Potential moderation state may include:

* pending;
* allowed;
* restricted;
* removed.

Do not invent a moderation engine in this volume.

---

# 83. FUTURE REAL-TIME COMPATIBILITY

The backend must remain transport-independent.

Message persistence should not require:

* a WebSocket;
* a Socket.IO connection;
* a particular frontend;
* a mobile device being online.

The domain service owns state.

Transport services consume canonical events.

---

# 84. NO CALLING IMPLEMENTATION

Do not implement:

* WebRTC signaling;
* voice calls;
* video calls;
* TURN allocation;
* call sessions.

Only preserve identity/conversation contracts needed for future calling.

---

# 85. NO FULL MEDIA IMPLEMENTATION

Do not implement:

* S3 upload pipeline;
* FFmpeg processing;
* thumbnails;
* malware scanning;
* media CDN.

Only establish message references compatible with the later media subsystem.

---

# 86. SECURITY REQUIREMENTS

Explicitly defend against:

* IDOR;
* privilege escalation;
* mass assignment;
* message enumeration;
* unauthorized conversation access;
* replayed requests;
* idempotency abuse;
* oversized payloads;
* SQL injection;
* malicious structured payloads;
* XSS through message content;
* rate-limit bypass.

All authorization must happen server-side.

---

# 87. PRIVACY REQUIREMENTS

Do not expose message content through:

* logs;
* metrics;
* error messages;
* unauthorized APIs;
* event payloads unnecessarily;
* debugging endpoints.

When errors occur, return safe machine-readable codes rather than private message content.

---

# 88. NO PLACEHOLDERS

Do not leave:

* TODO;
* FIXME;
* pseudocode;
* fake message persistence;
* fake events;
* mock production behavior;
* empty handlers;
* incomplete authorization;
* pretend transactions;
* fake sequence allocation.

Every implemented path must be real.

---

# 89. REQUIRED VALIDATION

Before considering this volume complete, actually run applicable validation:

* TypeScript type checking;
* linting;
* formatting;
* Prisma generation;
* Prisma migration validation;
* unit tests;
* integration tests;
* API/E2E tests;
* concurrency tests where available;
* application startup;
* health/readiness checks;
* relevant performance/query validation.

Fix failures instead of merely reporting them.

Do not claim tests passed unless they actually passed.

---

# 90. IMPLEMENTATION ORDER

Use this order unless the repository requires a different safe sequence:

1. inspect repository;
2. inspect conversation/authorization contracts;
3. inspect database/event infrastructure;
4. design message persistence;
5. implement message IDs;
6. implement message types/content validation;
7. implement idempotency;
8. implement conversation ordering;
9. implement message creation transaction;
10. implement message retrieval;
11. implement cursor pagination;
12. implement delivery state;
13. implement read state;
14. implement edit/delete;
15. implement reactions;
16. implement replies;
17. implement forwarding;
18. implement conversation activity updates;
19. integrate transactional outbox;
20. integrate appropriate Redis state;
21. implement APIs;
22. implement tests;
23. validate concurrency;
24. validate performance;
25. run complete project validation;
26. fix all failures.

---

# 91. REPOSITORY INTEGRATION CONTRACT

This backend volume is part of a single coherent system.

Therefore:

* inspect actual repository state first;
* use existing identity contracts;
* use existing conversation authorization;
* use existing error contracts;
* use existing IDs;
* use existing timestamps;
* use existing event envelope;
* use existing outbox if available;
* use existing Redis conventions;
* use existing observability;
* use existing testing conventions.

If existing implementation differs:

* analyze actual behavior;
* preserve compatible functionality;
* make the smallest safe change;
* do not create competing implementations.

Do not assume that another prompt or document is available to Claude.

---

# 92. CROSS-SYSTEM CONTRACTS

The implementation must preserve stable contracts for:

* User ID;
* Device ID;
* Conversation ID;
* Message ID;
* message sequence;
* timestamps;
* idempotency keys;
* API errors;
* pagination;
* authorization;
* message state;
* event envelopes;
* event versions;
* correlation IDs;
* trace context.

These contracts will be consumed by:

* WebSocket infrastructure;
* multi-device synchronization;
* push notifications;
* search;
* media;
* frontend;
* mobile;
* infrastructure;
* QA.

Do not introduce one-off conventions.

---

# 93. FINAL ENGINEERING REQUIREMENT

The completed implementation must leave the repository with a real production-grade messaging engine.

It must be:

* durable;
* transactional;
* idempotent;
* concurrency-safe;
* ordered;
* scalable;
* privacy-aware;
* secure;
* observable;
* testable;
* multi-device compatible;
* event-driven where appropriate;
* ready for WebSocket delivery;
* ready for push notifications;
* ready for search indexing;
* ready for media integration;
* ready for later synchronization infrastructure.

The backend must continue to function correctly when:

* recipients are offline;
* clients retry requests;
* Redis is temporarily unavailable;
* Kafka/Redpanda is temporarily unavailable;
* WebSocket connections are unavailable;
* downstream consumers fail;
* messages arrive concurrently.

The database must remain the authoritative source for durable message state.

Do not merely describe what should be implemented.

**Inspect the actual repository and implement this backend volume completely.**
