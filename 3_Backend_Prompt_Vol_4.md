# BACKEND IMPLEMENTATION PROMPT — VOLUME 4

## Production-Grade Real-Time Communication Platform

### WebSockets, Socket.IO, Presence, Typing Indicators, Multi-Device Synchronization, Kafka/Redpanda Consumers, BullMQ Workers, Offline Recovery, and Reliable Event Delivery

You are implementing **Volume 4 of the backend** for a production-grade, globally scalable, WhatsApp-like real-time communication platform.

This is an original communication platform inspired by modern real-time messaging products. It is not an implementation of proprietary WhatsApp source code, private infrastructure, undocumented protocols, or proprietary algorithms.

This prompt is **fully standalone**. It must be executable without requiring another prompt, previous conversation, architecture document, or previously generated prompt to be present.

The actual repository is the source of truth for existing implementation.

This volume is an implementation unit of **one coherent backend system**. It must integrate with the repository's actual identity, authentication, users, devices, sessions, contacts, conversations, memberships, messaging, database, Redis, event, error, security, observability, and testing systems.

Do not create competing implementations.

Do not duplicate existing functionality.

---

# 1. PRIMARY OBJECTIVE

Implement the production-grade distributed real-time backend layer.

This volume must provide real functionality for:

* authenticated WebSocket connections;
* Socket.IO integration where appropriate;
* connection lifecycle;
* device/session association;
* real-time message delivery;
* conversation event delivery;
* presence;
* typing indicators;
* multi-device synchronization;
* reconnect recovery;
* synchronization cursors;
* event consumption;
* Kafka/Redpanda consumers;
* BullMQ background processing where required;
* delivery acknowledgement integration;
* offline-device handling;
* event retries;
* idempotent consumers;
* dead-letter handling;
* graceful degradation;
* real-time observability;
* abuse protection.

The system must continue functioning correctly when users are offline, connections drop, events are duplicated, workers restart, or downstream infrastructure temporarily fails.

---

# 2. PRODUCT CONTEXT

The platform supports:

* accounts;
* multiple devices per user;
* direct conversations;
* groups;
* messages;
* delivery receipts;
* read receipts;
* typing indicators;
* presence;
* reactions;
* replies;
* forwarding;
* edits;
* deletions;
* media;
* notifications;
* search;
* privacy controls;
* blocking/reporting;
* voice/video calling.

The messaging engine persists authoritative state.

This volume is responsible for moving relevant state changes reliably to connected devices and maintaining ephemeral real-time state.

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
* BullMQ;
* WebSockets;
* Socket.IO where appropriate;
* OpenTelemetry;
* Prometheus;
* structured logging.

Do not replace working infrastructure.

Do not introduce a second event broker.

Do not introduce a second queue system.

---

# 4. FIRST ACTION — INSPECT THE ACTUAL REPOSITORY

Before changing anything:

1. Inspect the backend.
2. Inspect identity/authentication.
3. Inspect devices/sessions.
4. Inspect conversations/membership.
5. Inspect messaging.
6. Inspect Prisma models/migrations.
7. Inspect Redis integration.
8. Inspect Kafka/Redpanda integration.
9. Inspect transactional outbox.
10. Inspect BullMQ.
11. Inspect existing WebSocket/Socket.IO code.
12. Inspect event schemas.
13. Inspect API error contracts.
14. Inspect observability.
15. Inspect tests.

If any of these already exist:

* extend them;
* preserve compatible behavior;
* consolidate duplicates;
* repair incomplete functionality.

Never create parallel infrastructure merely because the current implementation is imperfect.

---

# 5. ARCHITECTURAL RESPONSIBILITIES

Maintain clear boundaries.

## PostgreSQL

Authoritative source for durable:

* users;
* devices;
* sessions;
* conversations;
* memberships;
* messages;
* durable read/delivery state;
* durable domain state.

## Redis

Use for:

* presence;
* typing state;
* connection/device routing metadata;
* ephemeral coordination;
* short-lived synchronization state;
* rate limiting;
* distributed locks where justified.

Redis must not become the sole durable source for messages.

## Kafka/Redpanda

Use for durable asynchronous domain/event distribution.

## BullMQ

Use for background jobs requiring:

* delayed execution;
* retries;
* controlled concurrency;
* worker processing;
* scheduled processing.

## WebSocket/Socket.IO

Use for real-time transport.

Transport must not become the authoritative message store.

---

# 6. WEBSOCKET AUTHENTICATION

Implement secure authenticated WebSocket connections.

A connection must be associated with:

* authenticated user;
* authenticated device;
* authenticated session.

Validate credentials during connection establishment.

Do not trust:

* client-provided user ID;
* client-provided device ID;
* arbitrary conversation membership;
* client-provided role.

Reuse the repository's authentication/session validation system.

---

# 7. CONNECTION LIFECYCLE

Implement:

* connection;
* authentication;
* authorization;
* registration;
* heartbeat;
* disconnect;
* reconnect;
* session invalidation;
* device revocation;
* graceful server shutdown.

When a session/device is revoked, active real-time connections associated with it must eventually be disconnected or rendered unauthorized.

Do not allow revoked sessions to remain indefinitely active.

---

# 8. CONNECTION IDENTIFICATION

Maintain a reliable mapping between:

* user;
* device;
* session;
* socket connection.

A single user may have:

* multiple devices;
* multiple connections where the platform permits it.

Do not assume:

```text
one user = one socket
```

The routing layer must support multiple active devices.

---

# 9. SOCKET ROOM MODEL

Use a consistent room/channel strategy.

Potential logical scopes include:

* user scope;
* device scope;
* conversation scope.

Do not allow clients to join arbitrary rooms by submitting arbitrary room IDs.

Room membership must be authorized server-side.

A user must not receive events for conversations they cannot access.

---

# 10. MESSAGE REAL-TIME DELIVERY

When a canonical `message.created` event is available:

1. identify the conversation;
2. resolve eligible recipients;
3. identify eligible devices;
4. determine online connections;
5. deliver through the WebSocket transport;
6. record appropriate delivery state;
7. allow offline recipients to recover through synchronization/push systems.

Do not make message persistence depend on immediate WebSocket delivery.

If all recipients are offline, the message must remain safely persisted.

---

# 11. EVENT-DRIVEN TRANSPORT

The message service must not directly depend on individual sockets.

Instead:

```text
Database mutation
→ transactional outbox
→ Kafka/Redpanda
→ realtime consumer
→ connection/device routing
→ WebSocket delivery
```

Use the actual repository's event infrastructure.

Do not introduce a second path that creates inconsistent message events.

---

# 12. EVENT CONSUMERS

Implement consumers for relevant events such as:

* message.created;
* message.edited;
* message.deleted;
* message.reaction.added;
* message.reaction.removed;
* conversation.created;
* conversation.updated;
* member.added;
* member.removed;
* member.role.changed;
* read-state changes;
* delivery-state changes.

Only consume events that actually exist.

Do not fabricate event types without integrating them into the producer side.

---

# 13. CONSUMER IDEMPOTENCY

Kafka/Redpanda delivery is at-least-once.

Consumers must tolerate duplicate events.

Use:

* event ID;
* aggregate ID;
* version;
* durable/ephemeral deduplication where appropriate.

Do not assume exactly-once delivery.

Repeated processing must not:

* send uncontrolled duplicate notifications;
* regress read state;
* corrupt presence;
* duplicate durable records.

---

# 14. EVENT ORDERING

Respect ordering where the domain requires it.

For conversation message events, preserve canonical message sequence.

Kafka/Redpanda partitioning should be compatible with the desired ordering key, such as:

* conversation ID.

Do not rely on global event ordering.

Do not assume events from unrelated conversations need to be globally ordered.

---

# 15. EVENT REPLAY

Design consumers to tolerate:

* replay;
* delayed events;
* duplicate events;
* consumer restart.

A consumer must not corrupt state when an older valid event is replayed after newer state.

Use versions/sequences where appropriate.

---

# 16. DEAD-LETTER HANDLING

Implement real failure handling for events that repeatedly fail processing.

Support:

* bounded retries;
* retry backoff;
* dead-letter queue/topic;
* failure metadata;
* observability;
* operational recovery.

Do not silently discard failed events.

Do not endlessly retry poison messages.

---

# 17. EVENT CORRELATION

Preserve:

* event ID;
* correlation ID;
* causation ID where available;
* trace context.

Trace a message through:

```text
API
→ database
→ outbox
→ Kafka/Redpanda
→ consumer
→ routing
→ WebSocket
```

This must be observable in production.

---

# 18. PRESENCE

Implement ephemeral user presence.

Support states appropriate to the product, such as:

* online;
* offline;
* away/idle if implemented.

Presence must account for multiple devices.

A user should not become offline merely because one device disconnects while another remains active.

---

# 19. PRESENCE SOURCE OF TRUTH

Presence is ephemeral.

Redis may be the authoritative operational store for current presence.

It must include:

* user/device identity;
* last heartbeat;
* connection information;
* expiration/TTL.

Use TTLs so crashed servers/connections do not leave users permanently online.

---

# 20. PRESENCE HEARTBEATS

Implement bounded heartbeat behavior.

A connected device should periodically refresh its presence state.

When heartbeats stop:

* expire the device connection state;
* recompute user presence;
* emit the appropriate state transition.

Do not require a persistent database write for every heartbeat.

Avoid excessive Redis traffic.

---

# 21. MULTI-DEVICE PRESENCE

User presence should be derived from the set of active devices/connections.

For example:

```text
Device A online
Device B offline
→ user online
```

When the last active device disappears:

```text
Device A offline
Device B offline
→ user offline
```

Do not overwrite user-level presence independently from device state in a way that creates contradictions.

---

# 22. PRESENCE PRIVACY

Presence visibility must eventually respect privacy settings.

If the repository already implements privacy controls:

* reuse them.

If privacy settings are not yet available, design presence authorization so visibility decisions can later be enforced without rewriting the presence system.

Do not expose presence universally by default if the product's privacy model does not permit it.

---

# 23. TYPING INDICATORS

Implement ephemeral typing state.

Support:

* start typing;
* stop typing;
* automatic expiration;
* conversation authorization.

Typing indicators must never be stored as durable message data.

Use Redis with short TTLs where appropriate.

---

# 24. TYPING AUTHORIZATION

A user may only publish typing state to conversations they are authorized to access.

A client must not be able to:

* impersonate another user;
* publish typing into arbitrary conversations;
* observe typing state from unauthorized conversations.

Do not trust client-provided sender identity.

---

# 25. TYPING EXPIRATION

Typing state must expire automatically.

This protects against:

* crashed clients;
* lost disconnect events;
* network failures;
* application suspension.

Do not require the client to always send a stop event.

---

# 26. REAL-TIME EVENT SCHEMA

Define stable WebSocket event envelopes.

Events should contain appropriate fields such as:

* event ID;
* event type;
* version;
* timestamp;
* conversation ID where relevant;
* sender/user/device context where appropriate;
* sequence/version;
* payload.

Do not expose internal database fields unnecessarily.

Do not send secrets.

---

# 27. WEBSOCKET EVENT CATEGORIES

Support appropriate events such as:

### Messaging

* message.created;
* message.updated;
* message.deleted;
* message.reaction.updated;
* message.delivery.updated;
* message.read.updated.

### Conversations

* conversation.created;
* conversation.updated;
* member.added;
* member.removed;
* member.role.changed.

### Presence

* presence.updated.

### Typing

* typing.started;
* typing.stopped.

### Synchronization

* sync.available;
* sync.required;
* synchronization state events where appropriate.

Only expose events to authorized clients.

---

# 28. CLIENT ACKNOWLEDGEMENTS

Implement explicit acknowledgement behavior where appropriate.

Distinguish:

* WebSocket transport delivered;
* client acknowledged receipt;
* durable message delivery state.

Do not interpret a TCP/socket write as equivalent to a user/device delivery receipt.

---

# 29. DELIVERY STATE INTEGRATION

Integrate WebSocket delivery with the durable messaging system.

When the platform defines a message as delivered after a recipient device/client acknowledges it:

1. validate the authenticated device;
2. validate the conversation;
3. validate message sequence/identity;
4. update durable delivery state;
5. publish the appropriate event.

The client must never be able to acknowledge delivery for another device/user.

---

# 30. READ STATE INTEGRATION

When a client marks messages as read:

* validate conversation access;
* validate the read cursor;
* enforce monotonicity;
* persist authoritative state;
* publish the read-state event.

Do not allow arbitrary future sequence numbers.

---

# 31. MULTI-DEVICE SYNCHRONIZATION

Implement the foundation for syncing account state across devices.

A newly connected device must be able to determine what durable state it has missed.

Synchronization must support:

* messages;
* edits;
* deletions;
* reactions;
* read state;
* conversation changes;
* membership changes.

Do not rely solely on transient WebSocket events.

---

# 32. SYNCHRONIZATION CURSOR

Implement a durable synchronization cursor strategy appropriate to the repository.

The cursor must allow a client to communicate:

```text
I have processed events/state through position X.
```

The server must be able to determine what comes after X.

Do not use only wall-clock time if it can cause ambiguity.

---

# 33. GAP DETECTION

Detect situations where:

* the client missed events;
* the connection was interrupted;
* events are no longer available in the transient layer;
* the client's cursor is stale.

In such cases, instruct the client to perform durable synchronization rather than assuming the transient event stream is complete.

---

# 34. RECONNECT RECOVERY

On reconnect:

1. authenticate the device;
2. validate session;
3. establish connection;
4. receive synchronization state;
5. determine whether a gap exists;
6. replay/recover durable changes where possible;
7. restore subscriptions;
8. resume real-time delivery.

Do not simply reconnect the socket and assume no events were lost.

---

# 35. OFFLINE DEVICES

Do not attempt to maintain an unbounded WebSocket queue for offline devices.

Offline devices should recover durable state through:

* synchronization;
* message history;
* push notifications where appropriate.

Transient Redis queues must not become the only copy of an event.

---

# 36. USER-SPECIFIC SYNCHRONIZATION

Multi-device synchronization must distinguish:

* user-level state;
* device-specific acknowledgement state.

A message may need to be synchronized to multiple devices belonging to the same user.

Do not incorrectly suppress delivery to one device because another device already received the event unless the canonical synchronization model explicitly allows that.

---

# 37. EVENT RETENTION

Determine an appropriate retention window for transient event/synchronization data.

If events are no longer available:

* fall back to authoritative database synchronization.

Do not guarantee indefinite replay from Kafka/Redis unless the infrastructure actually provides it.

---

# 38. REDIS KEY DESIGN

Every real-time Redis key must use a consistent namespace.

Examples of logical categories:

```text
presence:user:{userId}
presence:device:{deviceId}
typing:conversation:{conversationId}:user:{userId}
connection:user:{userId}
connection:device:{deviceId}
sync:{deviceId}
```

Adapt the exact convention to the repository.

Every key must define:

* purpose;
* TTL;
* owner;
* serialization;
* cleanup;
* failure behavior.

Do not create arbitrary undocumented keys.

---

# 39. DISTRIBUTED CONNECTION ROUTING

The platform may run multiple backend instances.

A WebSocket connection may exist on any instance.

Design routing so a Kafka event received by one instance can reach a client connected to another instance.

Use a shared coordination mechanism appropriate to the repository, such as:

* Socket.IO Redis adapter;
* Redis pub/sub;
* another explicitly justified mechanism.

Do not assume all connections exist inside one process.

---

# 40. HORIZONTAL SCALING

The real-time layer must support multiple replicas.

Do not store authoritative connection state only in local process memory.

Local memory may be used as a performance optimization, but the architecture must remain correct when:

* multiple pods exist;
* a pod restarts;
* traffic is load balanced;
* clients reconnect to another pod.

---

# 41. REDIS PUB/SUB

If Redis pub/sub is used:

* keep messages ephemeral;
* do not treat pub/sub as durable;
* handle subscriber reconnect;
* handle duplicate delivery;
* handle missed publications.

Durable state must come from PostgreSQL/event infrastructure.

---

# 42. BULLMQ

Use BullMQ for tasks that genuinely require asynchronous job processing.

Potential jobs include:

* stale presence cleanup where appropriate;
* synchronization maintenance;
* event retry processing where appropriate;
* cleanup;
* deferred processing.

Each job must define:

* queue;
* job name;
* payload;
* priority;
* timeout;
* retry count;
* backoff;
* concurrency;
* idempotency;
* dead-letter/failure handling.

Do not create BullMQ jobs for operations that must be synchronous and transactional.

---

# 43. WORKER IMPLEMENTATION

Every worker must:

* validate input;
* process idempotently;
* emit useful logs/metrics;
* handle retries;
* handle permanent failures;
* respect shutdown;
* avoid duplicate side effects.

Do not let workers silently swallow exceptions.

---

# 44. WORKER CONCURRENCY

Configure worker concurrency deliberately.

Do not assume unlimited concurrency.

Consider:

* database connection limits;
* Redis capacity;
* Kafka throughput;
* WebSocket routing;
* CPU/memory;
* downstream provider limits.

---

# 45. JOB TIMEOUTS

Every long-running job must have bounded execution.

A worker stuck indefinitely must not consume capacity forever.

Use:

* job-level timeout;
* provider timeout;
* database timeout where applicable;
* cancellation/shutdown handling.

---

# 46. RETRIES

Retries must use:

* bounded attempts;
* exponential/backoff strategy where appropriate;
* jitter where appropriate;
* distinction between transient and permanent failures.

Do not retry:

* malformed payloads;
* authorization failures;
* permanent validation failures;

indefinitely.

---

# 47. DEAD-LETTER QUEUES

Failed jobs requiring manual investigation must be recoverable.

Capture:

* job ID;
* job type;
* failure reason;
* retry count;
* timestamps;
* correlation ID;
* safe metadata.

Do not store sensitive tokens or private message content unnecessarily.

---

# 48. REAL-TIME RATE LIMITING

Protect WebSocket operations against abuse.

Apply appropriate limits to:

* connection attempts;
* authentication attempts;
* typing events;
* read acknowledgements;
* delivery acknowledgements;
* subscription changes;
* synchronization requests;
* arbitrary event submissions.

Do not allow a malicious client to flood a conversation or server.

---

# 49. WEBSOCKET INPUT VALIDATION

Validate every inbound event.

Reject:

* malformed event names;
* invalid IDs;
* unauthorized conversation IDs;
* oversized payloads;
* invalid sequences;
* invalid cursors;
* unexpected fields.

Do not trust WebSocket payloads merely because they bypass HTTP.

---

# 50. WEBSOCKET AUTHORIZATION

Authorization must occur for every resource-sensitive operation.

Examples:

* joining a conversation;
* requesting synchronization;
* marking read;
* acknowledging delivery;
* publishing typing;
* requesting presence;
* receiving private events.

Do not assume that authentication at socket connection time grants access to every future resource.

Membership can change after connection.

---

# 51. MEMBERSHIP REVOCATION

If a user is:

* removed from a group;
* leaves a group;
* banned;
* loses authorization;

the real-time layer must stop delivering protected conversation events to that user.

Do not depend solely on a socket reconnect.

Authorization state must be refreshed or invalidated appropriately.

---

# 52. BLOCKING INTEGRATION

Real-time delivery must respect blocking/privacy rules.

If user A blocks user B:

* future event delivery must follow the product's blocking semantics;
* presence visibility must respect privacy;
* typing visibility must respect privacy;
* direct conversation events must not bypass the block.

Do not implement a second blocking subsystem.

Use authoritative privacy/security decisions.

---

# 53. SECURITY

Defend the real-time system against:

* connection flooding;
* authentication brute force;
* token replay;
* unauthorized subscriptions;
* room enumeration;
* event spoofing;
* user impersonation;
* message acknowledgement spoofing;
* oversized payloads;
* event amplification;
* Redis abuse;
* synchronization abuse.

Do not trust client identity fields.

---

# 54. CONNECTION LIMITS

Define configurable limits for:

* connections per user;
* connections per device;
* subscriptions;
* event frequency;
* payload size.

Handle excess connections deterministically.

Do not allow one compromised account to consume unlimited socket resources.

---

# 55. HEARTBEAT AND DEAD CONNECTIONS

Implement appropriate heartbeat/ping behavior.

Clean up:

* dead sockets;
* stale connection metadata;
* stale presence;
* expired typing state.

Do not rely on application-level disconnect callbacks alone.

Network failures may prevent graceful disconnect events.

---

# 56. BACKPRESSURE

The real-time system must handle slow consumers.

Do not allow one slow client to block a server worker or event consumer indefinitely.

Use appropriate:

* bounded buffers;
* disconnect thresholds;
* batching;
* event coalescing for ephemeral events.

Never drop durable message state.

Transient events such as typing may safely expire/coalesce according to product semantics.

---

# 57. MESSAGE BURSTS

The system must remain stable when a conversation experiences bursts of messages.

Avoid:

* one database query per socket unnecessarily;
* unbounded in-memory queues;
* synchronous push to every device inside the database transaction.

Use asynchronous event processing where appropriate.

---

# 58. EVENT FANOUT

For group conversations:

* identify eligible recipients efficiently;
* avoid loading unnecessary user data;
* handle large groups without quadratic behavior;
* separate durable persistence from transport fanout.

Do not perform massive synchronous database work inside the message creation request merely to deliver WebSocket events.

---

# 59. PUSH NOTIFICATION HANDOFF

Offline recipients may eventually require push notifications.

This volume should publish sufficient message/conversation events for a future notification service.

Do not make message persistence depend on FCM/APNs availability.

Do not implement fake push delivery.

---

# 60. OBSERVABILITY

Instrument the entire real-time path.

Track:

* active connections;
* connection attempts;
* authentication failures;
* disconnects;
* reconnects;
* event throughput;
* event delivery latency;
* delivery failures;
* consumer lag;
* retry counts;
* dead-letter counts;
* Redis latency;
* synchronization latency;
* presence updates;
* typing events;
* worker execution.

Use low-cardinality metrics.

Do not use:

* user ID;
* device ID;
* conversation ID;

as unrestricted metric labels.

---

# 61. DISTRIBUTED TRACING

Propagate tracing across:

```text
HTTP/WebSocket
→ domain service
→ PostgreSQL
→ outbox
→ Kafka/Redpanda
→ consumer
→ Redis
→ WebSocket
```

Preserve trace context through asynchronous boundaries where supported.

Do not break tracing when events cross processes.

---

# 62. LOGGING

Log structured operational information such as:

* event type;
* event ID;
* connection state;
* worker state;
* latency;
* retry count;
* error category;
* correlation ID.

Never log:

* passwords;
* access tokens;
* refresh tokens;
* private keys;
* push credentials;
* unnecessary message contents;
* sensitive personal data.

---

# 63. HEALTH CHECKS

Extend health/readiness infrastructure for:

* Redis;
* Kafka/Redpanda;
* BullMQ workers;
* WebSocket subsystem where appropriate.

Do not make liveness dependent on every downstream service.

Readiness should reflect whether the instance can safely accept traffic.

---

# 64. GRACEFUL SHUTDOWN

On shutdown:

1. stop accepting new WebSocket connections;
2. stop accepting new jobs;
3. stop Kafka consumers;
4. allow in-flight processing to finish within a bounded deadline;
5. disconnect sockets cleanly;
6. release Redis resources;
7. close database connections;
8. flush telemetry;
9. exit.

Do not lose acknowledged durable state.

---

# 65. FAILURE MATRIX

Implement explicit behavior for:

| Failure                 | Required behavior                      |
| ----------------------- | -------------------------------------- |
| WebSocket disconnect    | Client reconnect/sync                  |
| Redis unavailable       | Fail/recover ephemeral features safely |
| Kafka unavailable       | Preserve durable DB state/outbox       |
| Consumer crash          | Restart/reprocess safely               |
| Duplicate event         | Idempotent processing                  |
| Slow client             | Apply bounded backpressure             |
| Worker crash            | Retry job                              |
| Poison event            | Retry then DLQ                         |
| Session revoked         | Terminate/deny connection              |
| Membership revoked      | Stop protected delivery                |
| Presence heartbeat lost | TTL-based expiry                       |
| Typing stop event lost  | TTL-based expiry                       |

Do not allow transient infrastructure failure to corrupt durable messaging state.

---

# 66. SYNCHRONIZATION API

Provide an appropriate synchronization endpoint/service.

It should allow an authenticated device to request changes after a known cursor.

The response must support:

* events/changes;
* cursor advancement;
* pagination/batching;
* gap detection;
* resynchronization.

Do not return unbounded histories in one response.

---

# 67. SYNC AUTHORIZATION

Synchronization must be scoped to the authenticated account/device.

A device must never request arbitrary users' synchronization streams.

The server must determine the correct state from authenticated identity.

---

# 68. SYNC BATCHING

Large synchronization operations must be bounded.

Use:

* batch size;
* cursor;
* continuation token where needed.

Do not allocate massive memory for a device with months of missed activity.

---

# 69. SYNC ORDERING

Synchronization must return changes in a deterministic order appropriate to the canonical event model.

If multiple domains produce events, define a consistent synchronization strategy.

Do not mix unrelated timestamps without a clear ordering contract.

---

# 70. EVENT SCHEMA EVOLUTION

Consumers must tolerate supported event versions.

Implement:

* explicit versions;
* compatibility handling;
* validation;
* safe rejection of unsupported versions;
* observability for schema mismatches.

Do not silently interpret unknown event schemas.

---

# 71. SECURITY EVENT HANDLING

Real-time security events may include:

* suspicious connection attempts;
* invalid authentication;
* repeated authorization failures;
* session revocation;
* device revocation;
* abnormal event rates.

Integrate with the existing security/audit mechanism.

Do not expose internal security signals to ordinary users.

---

# 72. TESTING — UNIT

Test:

* WebSocket authentication;
* authorization;
* connection lifecycle;
* presence;
* typing;
* synchronization;
* event routing;
* event idempotency;
* retry logic;
* worker logic;
* backpressure rules.

---

# 73. TESTING — INTEGRATION

Test against realistic infrastructure where possible:

* PostgreSQL;
* Redis;
* Kafka/Redpanda;
* BullMQ;
* Socket.IO/WebSocket.

Verify:

* event publication;
* event consumption;
* duplicate events;
* retry;
* DLQ;
* presence TTL;
* multi-device routing;
* reconnect recovery.

---

# 74. TESTING — MULTI-INSTANCE

Where the repository supports integration environments, run multiple backend instances.

Verify:

* user connects to instance A;
* event consumed by instance B;
* event reaches the user;
* Redis/shared routing bridges the instances.

This is critical.

Do not declare horizontal scaling correct based only on a single-process test.

---

# 75. TESTING — RECONNECT

Test:

1. device connects;
2. receives events;
3. connection drops;
4. messages/events occur while offline;
5. device reconnects;
6. synchronization detects missed state;
7. device recovers all required durable changes;
8. real-time delivery resumes.

---

# 76. TESTING — SECURITY

Test:

* invalid WebSocket credentials;
* revoked sessions;
* unauthorized room subscription;
* unauthorized synchronization;
* unauthorized read acknowledgement;
* unauthorized delivery acknowledgement;
* blocked users;
* removed group members;
* event spoofing;
* payload flooding;
* connection flooding.

---

# 77. TESTING — FAILURE

Test:

* Redis outage;
* Kafka outage;
* worker restart;
* consumer restart;
* duplicate events;
* delayed events;
* DLQ behavior;
* slow clients;
* dropped connections;
* database outage.

The system must fail safely.

---

# 78. PERFORMANCE

Measure:

* WebSocket connection capacity;
* event throughput;
* fanout latency;
* Redis operations;
* Kafka consumer lag;
* synchronization throughput;
* worker throughput.

Identify bottlenecks.

Do not optimize based solely on theoretical assumptions.

---

# 79. NO PLACEHOLDERS

Do not leave:

* TODO;
* FIXME;
* fake event consumers;
* fake WebSocket handlers;
* fake presence;
* in-memory-only production state;
* fake synchronization;
* fake workers;
* silently swallowed failures.

Every implemented path must work.

---

# 80. BACKWARD COMPATIBILITY

Preserve existing:

* authentication;
* messaging APIs;
* event schemas;
* Redis conventions;
* database behavior;
* WebSocket contracts.

If incompatible behavior must change:

1. inspect actual clients/contracts;
2. design migration;
3. preserve compatibility where possible;
4. document unavoidable changes.

Do not break existing functionality simply to simplify implementation.

---

# 81. CROSS-SYSTEM CONTRACTS

Preserve canonical:

* User ID;
* Device ID;
* Session ID;
* Conversation ID;
* Message ID;
* message sequence;
* event ID;
* event type/version;
* cursor;
* timestamp;
* correlation ID;
* trace context;
* error codes.

These contracts must remain consistent across:

* REST;
* WebSocket;
* Kafka/Redpanda;
* Redis;
* BullMQ;
* PostgreSQL;
* web;
* mobile.

Do not introduce parallel representations.

---

# 82. FINAL VALIDATION

Before considering this volume complete, actually run applicable:

* TypeScript type checking;
* linting;
* formatting;
* unit tests;
* integration tests;
* API/E2E tests;
* WebSocket tests;
* Redis tests;
* Kafka/Redpanda tests;
* BullMQ tests;
* synchronization tests;
* reconnect tests;
* multi-instance tests where available;
* security tests;
* application startup;
* health/readiness checks.

Fix failures.

Do not claim successful validation without actually running it.

---

# 83. IMPLEMENTATION ORDER

Use this sequence unless repository constraints require a safer alternative:

1. inspect repository;
2. inspect existing messaging/event contracts;
3. establish WebSocket authentication;
4. establish connection/device mapping;
5. implement distributed socket routing;
6. implement Kafka/Redpanda consumers;
7. implement real-time message delivery;
8. implement conversation event delivery;
9. implement delivery acknowledgements;
10. implement read-state real-time updates;
11. implement presence;
12. implement typing;
13. implement synchronization cursor;
14. implement synchronization API/service;
15. implement reconnect recovery;
16. implement event deduplication;
17. implement retries/DLQ;
18. implement BullMQ workers where justified;
19. implement rate limiting/backpressure;
20. implement membership/privacy revocation handling;
21. implement observability;
22. implement tests;
23. validate multi-instance behavior;
24. validate failure scenarios;
25. run complete backend validation;
26. fix all discovered issues.

---

# 84. FINAL ENGINEERING REQUIREMENT

The completed implementation must leave the repository with a real distributed real-time backend.

It must be:

* horizontally scalable;
* authenticated;
* authorization-aware;
* multi-device capable;
* reconnect-safe;
* event-driven;
* idempotent;
* observable;
* resilient to infrastructure failures;
* resistant to abuse;
* compatible with offline clients;
* compatible with future push notifications;
* compatible with future media processing;
* compatible with future search;
* compatible with future calling.

The critical architectural guarantee is:

```text
Durable state
    ↓
Transactional event
    ↓
Kafka/Redpanda
    ↓
Real-time consumers
    ↓
Distributed connection routing
    ↓
WebSocket/Socket.IO
    ↓
Client
```

And when the client is offline:

```text
Durable state
    ↓
Synchronization
    ↓
Client recovery
```

The WebSocket layer must never become the authoritative source of message state.

Redis must never become the only durable copy of messages.

Kafka/Redpanda must not be treated as an exactly-once transport.

Every consumer and worker must be safe under retries and duplicate delivery.

Do not merely describe what should be implemented.

**Inspect the actual repository and implement this backend volume completely.**
