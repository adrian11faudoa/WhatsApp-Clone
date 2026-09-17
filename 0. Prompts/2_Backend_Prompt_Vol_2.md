# WhatsApp-Style Messaging Platform — Backend Prompt — Volume 2

## ROLE

You are the **Staff Backend Engineer, Distributed Systems Engineer, and Realtime Systems Engineer** responsible for implementing the core messaging backend for the **WhatsApp-style messaging platform**.

This is a **bounded backend implementation milestone**.

Operate with the combined responsibilities of:

* Staff Backend Engineer
* Principal Software Architect
* Distributed Systems Engineer
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
* durable event/message processing where required by the architecture;
* structured logging;
* OpenTelemetry-compatible observability;
* automated testing.

The completed backend is intended to support:

* one-to-one messaging;
* group messaging;
* message persistence;
* reliable message acceptance;
* realtime message delivery;
* delivery receipts;
* read receipts;
* typing indicators;
* message editing;
* message deletion;
* replies;
* reactions;
* multi-device synchronization;
* offline synchronization;
* presence;
* media;
* notifications;
* search;
* moderation;
* administration.

This prompt implements the **core durable messaging and realtime communication subsystem**.

---

# CURRENT BACKEND SCOPE

Implement:

* message data model;
* message persistence;
* client-message idempotency;
* conversation-scoped sequencing;
* message creation;
* message retrieval;
* message pagination;
* message authorization;
* message editing;
* message deletion;
* message replies/references;
* message lifecycle states required by the architecture;
* WebSocket gateway foundation;
* authenticated realtime connections;
* realtime event envelopes;
* message-send realtime command;
* realtime message delivery;
* reconnect handling;
* synchronization checkpoints;
* missed-event synchronization;
* basic delivery and read state;
* delivery/read acknowledgements;
* reliable asynchronous event publication where required;
* transactional outbox or equivalent mechanism where required;
* Redis-backed coordination required by realtime delivery;
* relevant observability;
* automated tests;
* API and realtime documentation.

This is the foundational messaging milestone.

---

# OUT-OF-SCOPE

Do not implement:

* media upload or media processing;
* push notification provider integration;
* advanced presence infrastructure;
* search indexing;
* moderation workflows;
* analytics pipelines;
* full administrative tooling;
* mobile UI;
* web UI;
* complete infrastructure-as-code;
* full Kafka/Redpanda production deployment;
* complete notification delivery;
* advanced reaction aggregation beyond what is strictly required for the current message model;
* final global multi-region deployment.

Do not create fake implementations of these systems.

---

# SOURCE-OF-TRUTH MODEL

Inspect the actual repository before modifying it.

The repository is authoritative for currently implemented code.

Verify:

* existing authentication;
* user/account modules;
* session implementation;
* conversation modules;
* membership model;
* Prisma schema;
* migrations;
* Redis integration;
* configuration;
* error handling;
* logging;
* observability;
* testing setup.

Preserve compatible existing behavior.

Do not assume that Backend Prompt — Volume 1 was executed merely because this prompt follows it in the prompt sequence.

If the required foundational functionality already exists in the repository, integrate with it.

If expected functionality is missing, implement the minimum compatible foundation necessary within this prompt's scope rather than inventing an unrelated architecture.

---

# IMPLEMENTATION DISCIPLINE

Before changing code:

1. Inspect the repository.
2. Identify the actual current state.
3. Verify the domain and API conventions in use.
4. Identify the authoritative conversation and membership models.
5. Identify existing database and transaction infrastructure.
6. Identify existing authentication and authorization mechanisms.
7. Identify existing Redis infrastructure.
8. Implement only the messaging and realtime scope of this prompt.

Do not rewrite unrelated foundational modules.

---

# MESSAGE DATA MODEL

Implement the canonical durable message model.

The model must support, as applicable:

* message ID;
* client message ID;
* conversation ID;
* sender ID;
* message type;
* text/content payload;
* creation timestamp;
* update timestamp;
* conversation sequence;
* reply/reference information;
* edited state;
* deleted state;
* deletion timestamp;
* delivery/read state where architecturally stored;
* metadata required for synchronization.

Use appropriate database constraints.

Define explicit relationships to:

* conversation;
* sender;
* reply target;
* attachment abstraction if required for future compatibility.

Do not implement media storage in this milestone.

---

# CLIENT MESSAGE IDEMPOTENCY

Clients may retry a message submission when the network fails.

Implement an idempotency mechanism preventing one logical client message from becoming multiple durable messages.

The mechanism must:

* accept a client-generated message identifier;
* associate it with the authenticated sender and conversation;
* enforce uniqueness;
* return the existing message for an equivalent retry;
* reject conflicting reuse;
* remain correct under concurrent requests.

Do not rely only on an application-level lookup followed by insert.

Use database constraints and transactional logic where appropriate.

---

# MESSAGE SEQUENCING

Implement conversation-scoped message ordering.

The system must establish a server-authoritative ordering mechanism appropriate for the project architecture.

Do not use client clocks as the authoritative ordering mechanism.

Define behavior when:

* messages are created concurrently;
* transactions commit in different orders;
* realtime delivery occurs out of order;
* a client reconnects;
* historical messages are fetched.

The ordering mechanism must be stable enough for clients to reconstruct conversation history consistently.

---

# MESSAGE CREATION FLOW

Implement the complete in-scope message creation flow:

```text
Client
  ↓
Authenticated request/realtime command
  ↓
Authentication verification
  ↓
Conversation authorization
  ↓
Payload validation
  ↓
Idempotency verification
  ↓
Transactional persistence
  ↓
Authoritative sequence assignment
  ↓
Event/outbox creation where required
  ↓
Acknowledgement
  ↓
Realtime fan-out
```

The durable database state must remain authoritative.

Realtime transport must not create a message that does not have durable persistence.

---

# MESSAGE AUTHORIZATION

Before creating, retrieving, editing, deleting, or acknowledging a message, enforce server-side authorization.

Verify:

* authenticated user;
* account state;
* conversation membership;
* relevant message ownership;
* group permissions;
* message operation permissions.

Prevent:

* IDOR;
* cross-conversation access;
* removed-member access;
* unauthorized message mutation;
* unauthorized receipt updates.

---

# MESSAGE RETRIEVAL

Implement message retrieval for authorized conversation members.

Support:

* conversation-scoped retrieval;
* cursor pagination;
* stable ordering;
* bounded page sizes;
* historical retrieval;
* deterministic continuation.

Do not permit arbitrary message-table scans.

Use appropriate indexes for:

* conversation ID;
* conversation ordering;
* sender where required;
* client message ID where required.

---

# CURSOR PAGINATION

Implement cursor pagination for conversation messages.

The cursor must encode enough information to preserve deterministic ordering.

Handle:

* invalid cursor;
* expired/unsupported cursor where applicable;
* duplicate records;
* records inserted between page requests;
* deleted messages;
* concurrent message creation.

Do not use offset pagination for the high-volume message history path unless there is a documented reason.

---

# MESSAGE EDITING

Implement message editing within the product's defined semantics.

At minimum:

* authenticate the actor;
* verify conversation access;
* verify edit authorization;
* validate replacement content;
* persist the edit atomically;
* preserve appropriate timestamps/version information;
* publish the corresponding realtime event;
* ensure connected and reconnecting devices converge on the same state.

Do not allow a user to edit another user's message unless the product's explicit authorization model permits it.

---

# MESSAGE DELETION

Implement message deletion according to the product's server-side rules.

Support the appropriate distinction between:

* deletion for the requesting user/device where applicable;
* deletion for everyone where applicable;
* logical deletion state.

Ensure deletion propagates to:

* message retrieval;
* realtime events;
* synchronization;
* caches;
* future search indexing;
* future notification processing.

Do not physically destroy records when durable state is required for authorization, auditability, synchronization, or derived-system consistency.

---

# REPLY / MESSAGE REFERENCE

Implement message reply/reference semantics.

A reply must:

* reference a message within the same authorized conversation unless the architecture explicitly supports another relationship;
* remain valid under message editing;
* behave deterministically when the referenced message is deleted;
* synchronize across devices.

Do not duplicate entire historical message payloads into the reply record.

---

# MESSAGE TYPES

Implement the initial message types required by this milestone.

At minimum support:

* text;
* system-compatible representation where required by the architecture.

Create an extensible message-type model for future:

* image;
* video;
* audio;
* document.

Do not pretend future media types are already implemented.

Unknown message types must be handled safely by clients and APIs rather than causing uncontrolled failures.

---

# MESSAGE STATE

Define and persist only the durable state required by the architecture.

Distinguish:

* accepted/persisted;
* delivered;
* read;
* edited;
* deleted.

Do not treat WebSocket transmission as equivalent to durable delivery.

The message database record is authoritative for persistent state.

---

# TRANSACTIONAL MESSAGE PERSISTENCE

Use a database transaction for message creation when the operation requires atomic persistence of:

* the message;
* sequence information;
* idempotency state;
* outbox/event record.

The transaction must prevent partially persisted messages.

If event publication happens after the transaction, use a reliable publication mechanism.

Do not perform a fragile:

```text
database write
→ publish event
```

sequence without a recovery strategy.

---

# TRANSACTIONAL OUTBOX

Where the architecture requires reliable event publication, implement a transactional outbox.

The outbox must:

* persist in the same transaction as the message;
* include event identity;
* include event type/version;
* include aggregate/entity identity;
* include payload;
* include timestamps;
* support publication status;
* support retry;
* support idempotent publication/processing;
* support observability.

Do not mark an event permanently successful merely because a delivery attempt started.

---

# OUTBOX PROCESSING

Implement the bounded outbox-processing foundation required for this milestone.

It must support:

* polling or event-driven pickup;
* bounded batches;
* retries;
* backoff;
* failure handling;
* duplicate-safe publication;
* graceful shutdown;
* operational metrics.

Do not turn this prompt into a complete production Kafka infrastructure deployment.

Use the repository's actual event transport when available, or create a clean adapter boundary for the later event infrastructure.

Do not fake successful external publication.

---

# REALTIME GATEWAY

Implement the authenticated WebSocket gateway required for messaging.

The gateway must support:

* connection;
* authentication;
* authorization;
* connection identity;
* device/session association;
* heartbeat;
* disconnect;
* reconnect;
* protocol validation;
* rate limiting;
* safe error handling.

WebSocket connections must not bypass normal authorization rules.

---

# REALTIME ENVELOPE

Implement the project's canonical realtime envelope.

Each message should contain the fields necessary to support:

* event ID;
* event type;
* event version;
* timestamp;
* entity/conversation identifier;
* correlation ID where appropriate;
* payload.

Commands, events, acknowledgements, and errors must use predictable structures.

Do not create incompatible per-feature envelopes.

---

# REALTIME COMMANDS

Implement the commands required for this milestone:

* send_message;
* acknowledge_delivery;
* acknowledge_read;
* synchronize;
* reconnect/resume behavior where applicable.

Each command must have:

* schema;
* validation;
* authentication;
* authorization;
* idempotency where relevant;
* acknowledgement behavior;
* error behavior.

---

# REALTIME EVENTS

Implement events required for this milestone, including:

* message_created;
* message_updated;
* message_deleted;
* message_delivered;
* message_read;
* synchronization_required where applicable.

Each event must be versioned.

Events must be scoped so users receive only information they are authorized to receive.

---

# CONNECTION AUTHENTICATION

WebSocket authentication must bind the connection to the authenticated account and device/session.

Do not permit clients to claim arbitrary:

* user IDs;
* device IDs;
* conversation memberships;
* session identities.

The server must derive authoritative identity from authenticated credentials.

---

# CONNECTION LIFECYCLE

Handle:

* normal connection;
* authentication failure;
* heartbeat timeout;
* duplicate connection;
* temporary network failure;
* server restart;
* graceful shutdown;
* reconnect.

Do not assume one user has only one active connection.

Design for multiple simultaneous devices and connections.

---

# MULTI-CONNECTION DELIVERY

A single account may have multiple active devices.

Implement the routing model needed to deliver a message to appropriate active connections while preserving authorization.

Avoid duplicate delivery to the same logical connection.

Do not assume Redis is the durable source of message state.

---

# REDIS REALTIME COORDINATION

Use Redis only for realtime coordination that cannot be handled safely by PostgreSQL alone.

Potential responsibilities include:

* connection presence registry;
* connection-to-device mapping;
* pub/sub or fan-out coordination;
* short-lived synchronization state;
* distributed coordination required for realtime gateways.

Define:

* key naming;
* TTL;
* invalidation;
* stale connection cleanup;
* Redis failure behavior.

Do not silently lose durable messages because Redis is unavailable.

The system must distinguish temporary realtime disruption from message persistence failure.

---

# MESSAGE FAN-OUT

Implement a reliable fan-out mechanism appropriate to the current architecture.

For each new message:

* persist first;
* identify authorized recipients;
* distribute to active relevant connections;
* avoid leaking the message to unauthorized connections;
* support multiple devices;
* tolerate connection failure;
* rely on synchronization to recover missed events.

Do not require every recipient to be actively connected for message persistence to succeed.

---

# DELIVERY RECEIPTS

Implement delivery receipt semantics appropriate to this milestone.

A delivery acknowledgement must:

* identify the message;
* identify the authenticated device/session when the architecture requires device-level delivery;
* verify conversation authorization;
* be idempotent;
* update durable state according to the architecture;
* produce the required event for other authorized participants.

Multiple devices must not corrupt receipt state.

---

# READ RECEIPTS

Implement read acknowledgements.

A read acknowledgement must:

* identify the relevant message or ordered range;
* verify conversation membership;
* prevent moving a read pointer backwards unless explicitly allowed by the model;
* remain idempotent;
* synchronize with other active devices.

Prefer an efficient conversation read checkpoint or equivalent representation over writing redundant records for every read operation when the architecture supports that optimization.

---

# RECEIPT CONCURRENCY

Handle concurrent delivery/read acknowledgements correctly.

Examples:

* multiple devices acknowledge the same message;
* a later message is marked read before an earlier acknowledgement arrives;
* duplicate acknowledgements;
* reconnect after a local acknowledgement was made.

The resulting state must converge deterministically.

---

# SYNCHRONIZATION PROTOCOL

Implement the server-side synchronization foundation.

A client must be able to provide its last known checkpoint and request missed conversation state.

The server must support:

* checkpoint validation;
* bounded synchronization;
* event/message replay;
* pagination;
* deleted-message propagation;
* edited-message propagation;
* receipt synchronization.

Do not return unbounded historical data in a single synchronization response.

---

# RECONNECT / RESUME

When a realtime connection is lost:

1. the client reconnects;
2. authentication is re-established;
3. the client provides its last known synchronization checkpoint;
4. the server determines what state is missing;
5. missing state is returned through the synchronization protocol;
6. realtime delivery resumes.

Define the behavior when the checkpoint is too old, invalid, or no longer available.

---

# SEQUENCE GAPS

Clients must be able to detect a gap in conversation or synchronization sequence state.

The server must provide a recovery path rather than requiring clients to guess missing messages.

Do not silently continue after an unrecoverable sequence gap.

---

# ORDERING AND DELIVERY

A realtime message may arrive:

* before another message;
* after another message;
* duplicated;
* after a reconnect.

Clients must be able to reconcile the durable server sequence.

The backend must expose enough ordering information for deterministic convergence.

---

# RATE LIMITING

Apply rate limits to realtime operations appropriate to their risk.

At minimum consider:

* connection creation;
* authentication;
* send_message;
* synchronize;
* typing indicators;
* delivery/read acknowledgements.

Rate limiting must be scoped intelligently.

Do not allow typing indicators to consume the same unrestricted capacity as durable message creation.

---

# MESSAGE VALIDATION

Validate:

* message type;
* content size;
* encoding;
* control characters where relevant;
* allowed formatting;
* referenced message existence;
* conversation membership.

Reject malformed payloads before persistence.

Do not trust client-provided ownership or sequencing values.

---

# MESSAGE SIZE LIMITS

Define enforceable server-side limits.

Use limits appropriate for:

* text payload;
* metadata;
* reply references;
* WebSocket frames;
* synchronization requests.

Do not use arbitrary values without considering operational consequences.

Reject oversized payloads before they create excessive memory or database pressure.

---

# DATABASE INDEXING

Create indexes appropriate to the message access patterns.

At minimum evaluate indexes for:

* conversation + sequence;
* conversation + created time;
* sender + created time where useful;
* client message ID + sender/conversation;
* unread/read checkpoint access;
* outbox processing.

Do not create unnecessary overlapping indexes that significantly increase write cost without query value.

---

# CACHE INVALIDATION

If message/conversation metadata is cached during this milestone:

* define ownership;
* define TTL;
* invalidate or update consistently after mutations;
* handle stale cache;
* fail safely when Redis is unavailable.

Never allow cached authorization state to silently override authoritative membership state.

---

# ERROR HANDLING

Implement consistent errors for:

* unauthorized conversation access;
* invalid message;
* duplicate client message;
* stale synchronization checkpoint;
* invalid cursor;
* invalid realtime command;
* invalid receipt;
* message not found;
* forbidden modification;
* rate limit exceeded;
* temporary backend failure.

Do not reveal whether unauthorized users can infer the existence of private messages through error differences.

---

# SECURITY

Protect against:

* IDOR;
* unauthorized realtime subscription;
* unauthorized message retrieval;
* message spoofing;
* fake sender identity;
* duplicate-send abuse;
* WebSocket flooding;
* oversized frames;
* sequence manipulation;
* replay of unauthorized acknowledgements.

Never trust:

* client user ID;
* client device ownership;
* client conversation membership;
* client sender ID;
* client timestamps as server authority;
* client message sequence.

---

# OBSERVABILITY

Instrument:

* message creation latency;
* message persistence failures;
* realtime connection count;
* realtime authentication failures;
* connection duration;
* message fan-out;
* synchronization requests;
* sequence-gap recovery;
* delivery acknowledgements;
* read acknowledgements;
* outbox lag;
* event publication failures;
* Redis coordination failures.

Use correlation and trace identifiers to connect:

* HTTP/API request;
* database transaction;
* outbox event;
* realtime event;
* client acknowledgement.

Do not record private message bodies in ordinary telemetry.

---

# RELIABILITY

The subsystem must tolerate:

* duplicate message submission;
* duplicate acknowledgements;
* database transaction rollback;
* event publication retry;
* realtime disconnects;
* Redis interruption;
* worker restart;
* server restart;
* multiple simultaneous devices;
* out-of-order realtime events.

Durable message state must survive temporary realtime failures.

---

# PERFORMANCE

Implement efficient access patterns for:

* recent conversation messages;
* historical message pagination;
* unread state;
* delivery state;
* synchronization;
* outbox processing.

Avoid:

* N+1 queries;
* full-conversation scans;
* unbounded synchronization;
* repeated authorization queries when safe caching can be used;
* excessive per-message Redis operations when batching is possible.

Do not optimize by weakening correctness.

---

# TESTING

Implement comprehensive automated testing for this milestone.

## Message persistence

Test:

* valid message creation;
* invalid content;
* unauthorized conversation;
* duplicate client-message submission;
* concurrent duplicate submission;
* ordering;
* transaction rollback.

## Retrieval

Test:

* authorized history access;
* unauthorized access;
* cursor pagination;
* stable ordering;
* deleted messages;
* concurrent inserts during pagination.

## Editing

Test:

* authorized edit;
* unauthorized edit;
* invalid content;
* realtime propagation;
* synchronization after reconnect.

## Deletion

Test:

* authorized delete;
* unauthorized delete;
* duplicate delete;
* realtime propagation;
* synchronization propagation.

## Receipts

Test:

* delivery acknowledgement;
* read acknowledgement;
* duplicate acknowledgement;
* out-of-order acknowledgement;
* multi-device convergence;
* authorization failures.

## WebSockets

Test:

* authentication;
* unauthorized connection;
* connection lifecycle;
* heartbeat;
* valid commands;
* invalid commands;
* rate limiting;
* duplicate connections;
* reconnect/resume.

## Synchronization

Test:

* initial synchronization;
* incremental synchronization;
* valid checkpoint;
* invalid checkpoint;
* stale checkpoint;
* sequence gaps;
* deleted messages;
* edited messages.

## Reliability

Test appropriate failure scenarios involving:

* database transaction failure;
* outbox retry;
* Redis interruption;
* disconnected recipients;
* duplicate events;
* worker restart.

Use real integration infrastructure where practical rather than mocking every distributed component.

---

# DOCUMENTATION

Document the actual messaging implementation.

Include:

* message API;
* WebSocket protocol;
* commands;
* events;
* message lifecycle;
* receipt semantics;
* synchronization protocol;
* cursor format;
* idempotency behavior;
* relevant environment variables;
* local testing;
* operational metrics.

Keep documentation consistent with the implementation.

---

# FUTURE COMPATIBILITY

The implementation must remain compatible with future:

* media attachments;
* reactions;
* presence;
* push notifications;
* search;
* moderation;
* analytics;
* Kafka/Redpanda event transport;
* distributed worker infrastructure;
* multi-region deployment.

Do not create an incompatible message schema merely because those features are implemented later.

The message model must have a clean extension point for attachment references without pretending attachments already work.

---

# NO FAKE FUNCTIONALITY

Do not create:

* fake delivery acknowledgements;
* fake realtime connections;
* fake synchronization;
* fake outbox success;
* fake event publication;
* fake media attachments;
* fake push notification delivery.

Every implemented feature within this milestone must have real behavior.

Where external infrastructure is unavailable, implement the repository-level integration boundary and report the validation limitation accurately.

---

# NO HARDCODED SECRETS

Never hardcode:

* WebSocket authentication secrets;
* Redis credentials;
* broker credentials;
* database credentials;
* signing keys;
* API tokens.

Use the project's configuration and secret-management model.

---

# VALIDATION

Before completion, run appropriate:

* unit tests;
* integration tests;
* database tests;
* WebSocket tests;
* API tests;
* type checking;
* linting;
* formatting;
* build validation;
* migration validation.

Inspect:

* database migrations;
* schema changes;
* API docs;
* WebSocket protocol docs;
* generated types;
* final diff.

Verify there are no:

* accidental secrets;
* debugging statements;
* fake implementations;
* unrelated modifications;
* inconsistent contracts.

---

# COMPLETION REPORT

After implementation, report:

* files created;
* files modified;
* files deleted, if any;
* database models added or changed;
* migrations;
* message APIs;
* WebSocket commands;
* WebSocket events;
* synchronization behavior;
* idempotency implementation;
* message ordering implementation;
* outbox implementation;
* Redis changes;
* observability changes;
* security changes;
* tests added;
* tests executed;
* validation performed;
* documentation changes;
* compatibility considerations;
* unresolved issues;
* external blockers.

Do not claim success for validation that was not actually performed.

---

# DEFINITION OF DONE

This backend milestone is complete only when:

* message persistence is implemented;
* message idempotency is implemented;
* conversation-scoped ordering is implemented;
* message retrieval and cursor pagination are implemented;
* message authorization is enforced;
* editing is implemented;
* deletion is implemented;
* reply/reference support is implemented;
* authenticated WebSocket communication is implemented;
* realtime commands and events are implemented;
* delivery acknowledgements are implemented;
* read acknowledgements are implemented;
* reconnect behavior is implemented;
* synchronization checkpoints are implemented;
* sequence-gap recovery is implemented;
* reliable event/outbox handling required by the architecture is implemented;
* Redis realtime coordination is implemented where required;
* security controls are implemented;
* observability is implemented;
* relevant automated tests exist and pass;
* APIs and realtime behavior are documented;
* migrations are valid;
* no intentional implementation gaps remain within scope;
* the implementation is compatible with later media, presence, notification, search, moderation, infrastructure, and QA work.

This Definition of Done applies only to **Backend Prompt — Volume 2**.

It does not require implementation of the complete backend platform.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as **Backend Prompt — Volume 2 only**.

Inspect the repository before making changes.

Implement only the core messaging and realtime scope defined here.

Do not implement unrelated future backend domains.

Do not implement the web frontend.

Do not implement mobile applications.

Do not implement final production infrastructure.

Do not implement unrelated QA systems.

Do not invent another project phase.

Do not depend on a previous AI response.

Use the repository as the authoritative representation of actual implementation state.

Preserve compatible existing behavior.

Implement real production-grade functionality within scope.

Run appropriate validation.

Inspect the final diff.

Provide the required completion report and accurately report what was implemented and verified.
