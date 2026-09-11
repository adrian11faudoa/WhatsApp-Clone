# WHATSAPP — BACKEND VOLUME 2

## ROLE

Act as a Principal Backend Engineer, Staff Backend Engineer, Distributed Systems Engineer, Real-Time Systems Engineer, Database Architect, Security Engineer, Performance Engineer, SRE, QA Engineer, and Technical Writer working as one senior engineering team.

You are implementing the production messaging and real-time backend of a global communication platform comparable in capability, reliability, and scale to WhatsApp, Telegram, Signal, Messenger, Discord, and Microsoft Teams.

Do not teach. Do not provide tutorials. Do not produce pseudo-code. Perform the implementation directly in the repository.

Build production-grade software suitable for a globally distributed, high-scale communication platform.

---

# PROJECT

Build the backend messaging and real-time communication layer for a platform supporting:

* One-to-one conversations
* Group conversations
* Message creation
* Message retrieval
* Message editing
* Message deletion
* Replies
* Reactions
* Forwarding
* Pinned messages
* Saved messages
* Message delivery states
* Read states
* Message ordering
* Idempotent message submission
* Real-time message delivery
* Presence
* Typing indicators
* Multi-device synchronization
* Offline synchronization
* Message history
* Conversation synchronization
* Unread state
* Message acknowledgements
* Device fan-out
* Connection management
* WebSocket authentication
* WebSocket authorization
* Reconnection
* Duplicate-event protection
* Distributed real-time infrastructure

The system must support:

* Hundreds of millions of registered users
* Tens of millions of daily active users or greater
* Very large concurrent WebSocket populations
* Extremely high message throughput
* Large numbers of conversations
* Large group conversations
* Multiple devices per account
* Global traffic
* Multi-region deployment
* Horizontal scaling
* Fault tolerance
* Eventual consistency where appropriate
* Strong consistency where required

Do not implement frontend or mobile application code in this volume.

---

# TECHNOLOGY DIRECTION

Use the following backend technology direction unless the repository contains a technically justified implementation that must be preserved:

* Node.js
* TypeScript
* NestJS
* REST
* WebSockets
* Socket.IO
* PostgreSQL
* Prisma
* Redis
* BullMQ
* Kafka or Redpanda
* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo
* Jest
* Supertest
* Docker
* Kubernetes

PostgreSQL is the authoritative durable data store for transactional messaging data.

Redis is used for low-latency distributed state and coordination.

Kafka or Redpanda is used for durable asynchronous event distribution where appropriate.

Socket.IO is used for the real-time transport abstraction where appropriate.

Do not make Redis the authoritative source for durable messages.

Do not make WebSocket memory state the authoritative source for user or message state.

---

# SOURCE OF TRUTH

The repository is the source of truth.

Before modifying anything:

1. Inspect the complete backend structure.
2. Inspect existing NestJS modules.
3. Inspect Prisma schema and migrations.
4. Inspect account, authentication, session, device, and contact implementations.
5. Inspect Redis infrastructure.
6. Inspect event infrastructure.
7. Inspect queue infrastructure.
8. Inspect API conventions.
9. Inspect WebSocket infrastructure already present.
10. Inspect tests.
11. Inspect configuration.
12. Inspect documentation.
13. Identify existing contracts that must remain compatible.
14. Identify partially implemented messaging or conversation functionality.

Do not blindly replace existing code.

Preserve correct existing functionality.

Use the repository's actual implementation as the integration source of truth.

---

# 1. BACKEND IMPLEMENTATION BOUNDARY

Implement the messaging and real-time backend.

This volume owns:

* Conversation domain
* Direct conversations
* Group conversation foundation
* Message domain
* Message persistence
* Message creation
* Message retrieval
* Message editing
* Message deletion
* Replies
* Reactions
* Forwarding
* Pinning
* Saved-message foundation
* Message delivery states
* Read states
* Unread state
* Message ordering
* Idempotency
* Real-time WebSocket transport
* Connection lifecycle
* Presence
* Typing indicators
* Multi-device synchronization
* Offline synchronization
* Message events
* Message fan-out
* Conversation synchronization

Do not implement the full media system.

Do not implement the full notification system.

Do not implement search indexing.

Do not implement advanced moderation.

Create integration contracts for those systems.

---

# 2. CONVERSATION DOMAIN

Implement a production-grade conversation domain.

Support:

* Direct conversations
* Group conversation foundation
* Conversation creation
* Conversation lookup
* Conversation membership
* Conversation metadata
* Conversation status
* Last-message references
* Unread state
* User-specific conversation state

Every conversation must have a stable identifier.

Do not derive conversation identity from mutable user attributes.

For direct conversations, prevent accidental creation of duplicate conversations between the same participants.

Use database constraints and transactional logic to guarantee uniqueness.

---

# 3. CONVERSATION MEMBERSHIP

Implement membership management.

A membership must support:

* Conversation ID
* User ID
* Membership status
* Joined timestamp
* Left timestamp where applicable
* Role
* Last-read position
* Notification preferences where appropriate
* Muted state where appropriate
* Pinned state where appropriate

Design membership so future group administration can add:

* Owner
* Administrator
* Moderator
* Member
* Restricted member

without redesigning the core conversation model.

All membership-sensitive operations must validate current membership.

---

# 4. MESSAGE DATA MODEL

Implement the durable message model.

A message must support, where applicable:

* Message ID
* Conversation ID
* Sender ID
* Sender device/session context where required
* Client-generated message identifier
* Message type
* Content payload
* Created timestamp
* Updated timestamp
* Deleted timestamp
* Edited timestamp
* Reply reference
* Forwarding metadata
* Version
* Sequence/order information
* Status metadata where appropriate

Do not store all future message types as arbitrary unvalidated JSON.

Use typed message categories and validation.

Design the model so future message types can include:

* Text
* Media
* Documents
* Audio
* Voice messages
* Stickers
* GIFs
* Location
* Contacts
* System messages

without destabilizing the message domain.

---

# 5. MESSAGE IDENTIFIERS

Implement separate identifiers for:

* Server message identity
* Client-generated idempotency identity
* Conversation ordering
* Event identity

Do not use one identifier for all purposes.

Client-generated identifiers must support retries without producing duplicate messages.

Server identifiers must remain immutable.

Event identifiers must be unique across distributed producers.

---

# 6. MESSAGE CREATION

Implement message creation with transactional guarantees.

A message submission must:

1. Authenticate the sender.
2. Validate the device/session.
3. Validate conversation membership.
4. Validate message content.
5. Validate message type.
6. Validate size constraints.
7. Validate reply references where applicable.
8. Check idempotency.
9. Persist the message.
10. Persist required ordering information.
11. Create durable event/outbox information.
12. Update required conversation state.
13. Return the canonical server representation.

Do not acknowledge successful creation before durable persistence requirements are satisfied.

Do not rely on successful WebSocket delivery as proof that the message was stored.

---

# 7. MESSAGE IDEMPOTENCY

Implement robust message idempotency.

A client retrying the same logical message must not create duplicates.

Support:

* Client-generated message IDs
* Unique constraints
* Concurrent duplicate requests
* WebSocket retries
* REST retries
* Connection drops during acknowledgement
* Server retry scenarios

If the same idempotency identity is submitted again:

* Return the existing message where appropriate.
* Do not create another message.
* Do not emit duplicate durable creation events.
* Do not increment conversation counters twice.
* Do not trigger duplicate downstream work.

The implementation must remain correct across horizontally scaled backend instances.

---

# 8. MESSAGE ORDERING

Implement deterministic conversation ordering.

Messages must have a server-controlled ordering mechanism.

Do not depend solely on:

* Client clocks
* Local device timestamps
* WebSocket arrival time
* Database insertion timing across independent nodes

The ordering model must tolerate concurrent sends.

Document the ordering guarantees.

The system must distinguish:

* Server creation time
* Client creation time
* Conversation sequence/order
* Event processing time

Do not claim global total ordering across all conversations.

Ordering guarantees should be scoped appropriately.

---

# 9. MESSAGE RETRIEVAL

Implement message history APIs.

Support:

* Conversation history
* Cursor-based pagination
* Forward pagination where required
* Backward pagination
* Latest messages
* Message lookup
* Message-by-ID
* Context around a specific message

Do not use offset pagination for high-volume message history.

Use stable cursors.

Cursors must not expose internal database implementation details unnecessarily.

Validate that the requesting user has access to the conversation before returning messages.

---

# 10. MESSAGE EDITING

Implement message editing.

Support:

* Sender authorization
* Editability rules
* Edit timestamps
* Message versioning where appropriate
* Updated content validation
* Event emission
* Real-time propagation
* Multi-device synchronization

Prevent unauthorized users from editing another user's messages.

Do not silently overwrite audit-relevant state where version history is required.

Define clear behavior for edits occurring concurrently with deletes.

---

# 11. MESSAGE DELETION

Implement message deletion.

Support appropriate deletion modes such as:

* Delete for sender
* Delete for participants where product policy permits
* Administrative deletion foundation

Deletion must be authorization-aware.

Do not physically destroy durable message records when doing so would break:

* Ordering
* References
* Auditing
* Synchronization
* Compliance requirements
* Event processing

Use tombstone or equivalent semantics where required.

Deleted content must not be returned through ordinary message retrieval APIs.

---

# 12. REPLIES

Implement message replies.

A reply must reference a stable source message.

Validate:

* Source message existence
* Conversation compatibility
* Authorization
* Message visibility

Do not allow a user to create a reply reference to a message in an unrelated unauthorized conversation.

Support deleted-message references without leaking deleted content.

---

# 13. REACTIONS

Implement message reactions.

Support:

* Reaction creation
* Reaction removal
* Reaction replacement
* User-specific reaction state
* Aggregated reaction counts

Enforce uniqueness so one user cannot unintentionally create duplicate identical reactions.

Design reaction updates for high-concurrency messages.

Emit real-time reaction events.

---

# 14. FORWARDING

Implement the backend foundation for forwarding messages.

Forwarding must:

* Validate source access
* Validate destination membership
* Avoid exposing unauthorized source content
* Preserve required provenance metadata
* Avoid accidentally mutating the original message
* Create a new message identity

Do not copy private internal database identifiers into public forwarding metadata.

---

# 15. PINNED AND SAVED MESSAGE FOUNDATION

Implement foundational support for:

* Pinned messages
* User-saved messages

Pinned messages must be conversation-scoped.

Saved messages must be user-scoped.

Validate authorization independently for each operation.

Do not assume that a message being saved grants access to the conversation after access is revoked.

Define behavior for deleted messages.

---

# 16. DELIVERY STATES

Implement durable message delivery state foundations.

Support states such as:

* Accepted
* Persisted
* Delivered
* Read

The exact state model must prevent invalid backwards transitions.

Delivery state must be associated with the appropriate:

* Message
* Recipient
* Device where necessary
* Timestamp

Do not mark a message as delivered merely because it was persisted.

Do not mark it as read merely because a conversation was opened on another device unless product semantics explicitly require it.

---

# 17. READ STATE

Implement per-user conversation read state.

Support:

* Last-read message
* Last-read sequence
* Read timestamp
* Unread calculation
* Read acknowledgement
* Multi-device propagation

Read state must be monotonic.

A delayed device event must not move a user's read position backwards.

Use server-side validation to reject invalid state transitions.

---

# 18. UNREAD STATE

Implement scalable unread-state handling.

Support:

* Per-conversation unread state
* Per-user unread state
* Read synchronization
* Conversation list summaries
* Efficient retrieval

Do not calculate massive unread counts using expensive full message scans on every request.

Design the system for incremental updates.

Handle concurrent messages and read acknowledgements safely.

---

# 19. REAL-TIME WEBSOCKET ARCHITECTURE

Implement the production WebSocket layer.

Support:

* Connection establishment
* Authentication
* Session association
* Device association
* Connection lifecycle
* Reconnection
* Heartbeats
* Disconnect handling
* Event delivery
* Acknowledgements
* Error handling
* Backpressure controls

The WebSocket layer must remain horizontally scalable.

Do not store authoritative user state only in process memory.

---

# 20. WEBSOCKET AUTHENTICATION

Authenticate WebSocket connections using the same security model as the backend.

Validate:

* Access token
* Session
* Device
* Account status

Reject:

* Expired sessions
* Revoked sessions
* Invalid tokens
* Disabled accounts
* Unauthorized devices

Do not trust client-supplied user IDs.

The authenticated identity must come from server-side token/session validation.

---

# 21. WEBSOCKET EVENT CONTRACT

Establish a versioned event envelope.

Every event should support:

* Event ID
* Event type
* Event version
* Timestamp
* Conversation ID where applicable
* Message ID where applicable
* Recipient context where applicable
* Sequence/order information where applicable
* Correlation ID
* Payload

Event names must be stable and explicit.

Do not expose internal domain objects directly as WebSocket payloads.

Use explicit serializers.

---

# 22. WEBSOCKET ACKNOWLEDGEMENTS

Implement explicit acknowledgement semantics.

Differentiate between:

* Request accepted
* Message persisted
* Event delivered to connection
* Device acknowledged receipt
* User read state

Do not collapse all of these into one generic acknowledgement.

Client retries must remain idempotent.

Server acknowledgements must contain enough information for clients to recover after connection loss.

---

# 23. CONNECTION MANAGEMENT

Implement distributed connection management.

Support:

* Multiple connections per user
* Multiple devices
* Multiple browser sessions
* Reconnects
* Duplicate connections
* Connection expiration
* Heartbeats
* Connection cleanup

Use Redis or equivalent distributed coordination where necessary.

Do not assume a user is connected to only one application instance.

Do not route authoritative business state through in-memory connection maps.

---

# 24. MESSAGE FAN-OUT

Implement scalable fan-out foundations.

When a message is created:

1. Persist the message.
2. Generate the durable message event.
3. Determine authorized recipients.
4. Determine active recipient devices/connections.
5. Deliver through appropriate real-time infrastructure.
6. Record delivery state where required.
7. Allow disconnected devices to recover through synchronization.

Do not perform unbounded synchronous fan-out inside the request thread.

Do not block message persistence on every recipient connection.

Large groups must not cause one application request to synchronously process every connection.

---

# 25. MULTI-DEVICE SYNCHRONIZATION

Implement multi-device message synchronization.

Support:

* Device-specific state
* Message delivery to multiple devices
* Read-state synchronization
* Sent-message synchronization
* Edit synchronization
* Delete synchronization
* Reaction synchronization
* Conversation state synchronization

The system must tolerate:

* Offline devices
* Delayed devices
* Reconnected devices
* Duplicate events
* Out-of-order events

Synchronization must be replay-safe.

---

# 26. OFFLINE SYNCHRONIZATION

Implement a server-side synchronization model.

Support a cursor or checkpoint representing the client's durable synchronization position.

A synchronization request must allow a device to recover events after:

* Temporary network loss
* Application restart
* Device sleep
* WebSocket disconnect
* Server restart

Support:

* Sync cursor
* Event batches
* Cursor advancement
* Replay safety
* Gap detection
* Snapshot/recovery mechanisms where required

Do not assume the client received an event simply because it was emitted.

---

# 27. SYNC EVENT RETENTION

Define retention behavior for synchronization events.

Events must remain available long enough for normal disconnected-device recovery.

If a client falls behind beyond the retained event window:

* Detect the gap.
* Do not return misleading partial synchronization.
* Trigger an appropriate full or partial state recovery mechanism.

Do not allow unbounded event retention.

---

# 28. PRESENCE

Implement scalable presence infrastructure.

Support states such as:

* Online
* Offline
* Recently active where appropriate
* Invisible or privacy-controlled states where applicable

Presence must be treated as ephemeral state.

Use Redis or equivalent distributed low-latency storage.

Do not persist every heartbeat into PostgreSQL.

Implement:

* Heartbeats
* TTLs
* Disconnect handling
* Presence subscriptions
* Privacy-aware visibility

Avoid broadcasting presence updates unnecessarily.

---

# 29. TYPING INDICATORS

Implement typing indicators as ephemeral real-time state.

Support:

* Start typing
* Stop typing
* Automatic expiration
* Conversation membership validation
* Multi-device behavior
* Rate limiting

Typing events must not be persisted as ordinary messages.

Prevent clients from keeping typing state permanently active.

---

# 30. GROUP CONVERSATION FOUNDATION

Implement the messaging-side group foundation.

Support:

* Group membership
* Membership validation
* Group message authorization
* Group recipient resolution
* Membership changes
* Member removal foundation
* Group roles foundation

Design group messaging for large memberships.

Do not perform expensive full-group calculations synchronously for every message.

Prepare the architecture for asynchronous group fan-out.

---

# 31. TRANSACTIONAL OUTBOX

Implement transactional outbox support for durable messaging events.

When a message mutation requires an event:

* Persist the business mutation and outbox record in the same database transaction.
* Ensure the event cannot be emitted without the corresponding durable mutation.
* Ensure a successful business mutation cannot permanently lose its event.
* Make outbox processing idempotent.

Implement:

* Outbox record model
* Event payload
* Event type
* Version
* Aggregate identifier
* Creation timestamp
* Processing state
* Retry metadata where appropriate

Do not mark an event complete before successful durable handoff.

---

# 32. EVENT PROCESSING

Implement event-processing foundations.

Support:

* Idempotent consumers
* Event version validation
* Retry behavior
* Failure handling
* Dead-letter handling where appropriate
* Duplicate-event detection
* Correlation IDs
* Trace propagation

Consumers must tolerate duplicate delivery.

Do not rely on exactly-once processing unless the infrastructure actually guarantees it.

Design for at-least-once delivery with idempotent consumers.

---

# 33. DATABASE PERFORMANCE

Review messaging database access for scale.

Implement appropriate indexes for:

* Conversation lookup
* Conversation membership
* Message retrieval
* Message ordering
* Message lookup by ID
* Client idempotency lookup
* Read state
* Delivery state
* Reactions
* Replies

Use query patterns appropriate for large tables.

Avoid:

* Full table scans
* Offset pagination
* N+1 queries
* Unbounded joins
* Loading complete conversations into memory

Use selective projections.

Retrieve only required columns.

---

# 34. CONCURRENCY AND FAILURE HANDLING

Test and protect against:

* Duplicate message submission
* Concurrent message creation
* Concurrent edits
* Concurrent deletes
* Concurrent reactions
* Duplicate WebSocket events
* Reconnect races
* Duplicate delivery
* Read-state races
* Membership changes during sends
* Redis failure
* Kafka/Redpanda failure
* Database transient failures
* Worker retries

Use transactions, constraints, optimistic concurrency, idempotency, and distributed coordination where appropriate.

Do not solve every concurrency problem using distributed locks.

Use the simplest correct mechanism for each invariant.

---

# 35. FINAL IMPLEMENTATION REPORT

When implementation is complete, provide:

1. **Implementation Summary**
2. **Conversation Modules**
3. **Message Modules**
4. **Database Schema Changes**
5. **Message Ordering Strategy**
6. **Idempotency Strategy**
7. **Delivery and Read-State Implementation**
8. **WebSocket Architecture**
9. **Connection Management**
10. **Multi-Device Synchronization**
11. **Offline Synchronization**
12. **Presence and Typing Infrastructure**
13. **Event and Outbox Infrastructure**
14. **Redis Changes**
15. **Performance and Indexing Changes**
16. **Security Controls**
17. **Tests Added**
18. **Validation Commands Executed**
19. **Validation Results**
20. **Known Limitations**
21. **Files and Directories Modified**

Report failures honestly.

Do not claim successful validation if commands failed.

Do not claim implementation of functionality that was only designed.

---

# BACKEND VOLUME 2 COMPLETION STANDARD

This volume is complete only when the repository contains a production-grade messaging and real-time backend capable of securely supporting:

* Durable conversations
* High-volume message persistence
* Idempotent message submission
* Deterministic conversation ordering
* Real-time message delivery
* Delivery/read states
* Multi-device synchronization
* Offline recovery
* Presence
* Typing indicators
* Group messaging foundations
* Durable event propagation
* Horizontal WebSocket scaling

The implementation must be:

* Correct
* Secure
* Idempotent
* Observable
* Horizontally scalable
* Failure-aware
* Testable
* Production-ready

Do not leave placeholders.

Do not leave TODO/FIXME implementation gaps.

Do not use pseudo-code.

Do not omit required implementations.

Do not say “implement similarly.”

Do not say “remaining code omitted.”

Do not replace implementation with explanations.

Inspect the repository, implement the scope completely, integrate it, validate it, and report the exact result.
