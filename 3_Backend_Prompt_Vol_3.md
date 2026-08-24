You are operating in Senior Engineering Team Mode.

Build the production-ready backend for conversations, messaging, message delivery, synchronization, presence, groups, and communities for an enterprise-scale global real-time communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The backend must follow the established architecture, domain boundaries, security model, database ownership rules, API conventions, event architecture, queue architecture, and real-time architecture of the project.

Do not redesign the architecture.

Do not generate frontend code.

Do not generate mobile code.

Do not generate Kubernetes manifests.

Do not generate Terraform.

Do not generate infrastructure implementation code.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Implement the production-ready backend required for:

• Conversations
• One-to-one messaging
• Group messaging
• Communities
• Channels where appropriate
• Messages
• Message attachments
• Replies
• Forwarding
• Mentions
• Reactions
• Message editing
• Message deletion
• Message delivery
• Read receipts
• Typing indicators
• Presence
• Offline synchronization
• Multi-device message synchronization
• Message ordering
• Idempotency
• Deduplication
• Message history
• Conversation membership
• Group administration
• Community membership
• Conversation permissions

The implementation must support:

• Hundreds of millions of users
• Billions of messages
• Large conversation histories
• Large groups
• High message throughput
• Tens of millions of concurrent connections
• Multi-region deployment
• Horizontal scaling
• High availability

────────────────────────────────────────

TECHNOLOGY STACK

Backend:

• Node.js
• NestJS
• TypeScript

Database:

• PostgreSQL
• Prisma ORM

Cache:

• Redis

Real-Time:

• WebSockets
• Socket.IO where appropriate

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

Keep persistence concerns inside repositories/data-access layers.

Enforce authorization server-side.

Use centralized validation and error handling.

────────────────────────────────────────

DOMAIN OWNERSHIP

Implement clear boundaries between:

• Conversation domain
• Messaging domain
• Message delivery domain
• Synchronization domain
• Group domain
• Community domain
• Presence domain

Do not place all messaging functionality into one uncontrolled module.

Do not allow unrelated services to directly modify authoritative conversation or message data.

────────────────────────────────────────

CONVERSATION DOMAIN

Implement:

• Conversation creation
• Conversation retrieval
• Conversation listing
• Conversation membership
• Conversation settings
• Conversation archival where appropriate
• Conversation state
• Conversation participant management

Support conversation types:

• Direct
• Group
• Community-linked
• Channel where appropriate

Define conversation lifecycle.

────────────────────────────────────────

DIRECT CONVERSATIONS

Implement one-to-one conversations.

Support:

• Conversation creation
• Existing-conversation lookup
• Participant validation
• Blocking checks
• Privacy checks
• Conversation metadata
• Conversation listing

Prevent duplicate direct conversations between the same two users.

Use appropriate unique constraints and transactional logic.

────────────────────────────────────────

CONVERSATION MEMBERS

Implement:

• Add participant
• Remove participant
• Leave conversation
• Membership status
• Membership timestamps
• Role where applicable
• Muting
• Notification preferences
• Last-read position

Protect membership operations through authorization policies.

────────────────────────────────────────

MESSAGE DOMAIN

Implement:

• Message creation
• Message retrieval
• Message history
• Message metadata
• Message type
• Message status
• Message deletion
• Message editing

Support message types including:

• Text
• Reply
• Image reference
• Video reference
• Audio reference
• Voice message reference
• Document reference
• Sticker reference
• GIF reference
• System message

Do not store large binary media inside PostgreSQL.

────────────────────────────────────────

MESSAGE IDENTIFIERS

Implement the identifier strategy.

Support:

• Client-generated message ID
• Server-generated message ID
• Conversation sequence number
• Idempotency key

Use them to prevent:

• Duplicate messages
• Retry-generated duplicates
• Replayed requests
• Duplicate event consumption

Define uniqueness constraints that safely enforce idempotency.

────────────────────────────────────────

MESSAGE ORDERING

Implement the established ordering model.

Support authoritative server-side ordering.

Do not use client clocks as the sole ordering mechanism.

Define behavior for:

• Concurrent messages
• Retried messages
• Offline messages
• Multi-device messages
• Delayed messages
• Replayed events

Maintain deterministic ordering within a conversation.

────────────────────────────────────────

MESSAGE PERSISTENCE

Implement transactional message persistence.

A successful message submission must not produce a message that exists only in ephemeral infrastructure.

Use:

• PostgreSQL
• Transactions
• Idempotency
• Appropriate indexes

Persist all fields required for future synchronization.

────────────────────────────────────────

MESSAGE DELIVERY

Implement message delivery state tracking.

Support:

• Pending
• Accepted
• Sent
• Delivered
• Read
• Failed

Implement the appropriate persistence model for delivery state.

Prevent excessive write amplification for high-volume conversations.

Use optimized indexes and data-access patterns.

────────────────────────────────────────

DELIVERY RECEIPTS

Implement:

• Delivery acknowledgment
• Read acknowledgment
• Delivery state queries
• Receipt propagation
• Multi-device receipt synchronization

Support idempotent receipt processing.

Repeated delivery/read events must not corrupt state.

────────────────────────────────────────

MESSAGE RETRIEVAL

Implement efficient message retrieval.

Support:

• Conversation history
• Cursor pagination
• Fetch before cursor
• Fetch after cursor
• Latest messages
• Synchronization batches

Prefer cursor-based pagination for high-volume message histories.

Design indexes specifically for the expected access patterns.

────────────────────────────────────────

MESSAGE EDITING

Implement:

• Edit authorization
• Edit validation
• Edit timestamps
• Edit history strategy
• Edit event generation
• Multi-device propagation

Respect configured editing rules.

Ensure an edited message remains auditable where required by the platform's architecture.

────────────────────────────────────────

MESSAGE DELETION

Support:

• Delete for sender
• Delete for authorized participants where applicable
• Logical deletion
• Event propagation
• Synchronization

Clearly distinguish:

• User-visible deletion
• Logical deletion
• Physical deletion

Never expose deleted message content after the applicable deletion policy.

────────────────────────────────────────

REPLIES

Implement:

• Reply-to-message references
• Reply validation
• Reply authorization
• Reply metadata
• Synchronization
• Deletion behavior

A reply must not expose deleted or unauthorized message content.

────────────────────────────────────────

FORWARDING

Implement message forwarding where supported.

Support:

• Forward to direct conversation
• Forward to group
• Authorization
• Idempotency
• Forward metadata
• Privacy rules

Do not copy large message payloads unnecessarily.

────────────────────────────────────────

MENTIONS

Implement:

• Mention parsing contract
• Mention references
• Mention validation
• Mention notification integration
• Synchronization

Do not implement frontend parsing logic in backend controllers.

Store structured mention references.

────────────────────────────────────────

REACTIONS

Implement:

• Add reaction
• Remove reaction
• Reaction validation
• Duplicate prevention
• Reaction aggregation
• Reaction events
• Synchronization

Use appropriate unique constraints to prevent duplicate reactions from the same user where required.

────────────────────────────────────────

GROUP DOMAIN

Implement:

• Group creation
• Group updates
• Group membership
• Group roles
• Group permissions
• Group invitations
• Member removal
• Member promotion
• Member demotion
• Group settings
• Group avatar metadata
• Group description
• Group lifecycle

Support roles such as:

• Member
• Administrator
• Owner where applicable

────────────────────────────────────────

GROUP AUTHORIZATION

Implement policies for:

• Send messages
• Add members
• Remove members
• Change group settings
• Change group administrators
• Delete messages
• Update group metadata

Do not trust client-provided roles.

Load authoritative membership and permission state server-side.

────────────────────────────────────────

LARGE GROUP ARCHITECTURE

Implement data-access and event structures compatible with large groups.

Avoid loading entire group membership into application memory.

Avoid synchronous fan-out loops inside HTTP requests.

Use appropriate asynchronous event and queue infrastructure for large operations.

────────────────────────────────────────

COMMUNITY DOMAIN

Implement:

• Community creation
• Community updates
• Community membership
• Community administrators
• Community-linked groups
• Community-linked channels where appropriate
• Community settings
• Community discovery boundaries

Define authorization for community administration.

────────────────────────────────────────

CHANNEL SUPPORT

Where the architecture includes channels, implement the backend foundation for:

• Channel creation
• Channel metadata
• Channel membership/subscription
• Channel permissions
• Publisher roles
• Subscriber behavior

Do not force channel semantics into ordinary direct conversations.

────────────────────────────────────────

PRESENCE

Implement the backend presence system.

Support:

• Online
• Offline
• Last seen
• Typing
• Recording where applicable
• Presence subscriptions

Use Redis for ephemeral presence state.

Implement:

• Heartbeats
• TTL
• Connection registration
• Presence updates
• Disconnect handling
• Privacy checks

Do not write every presence event directly into PostgreSQL.

────────────────────────────────────────

TYPING INDICATORS

Implement real-time typing state.

Support:

• Typing started
• Typing stopped
• Recording started where appropriate
• Recording stopped where appropriate

Use ephemeral infrastructure.

Do not persist typing indicators as durable message records.

Apply privacy and authorization rules.

────────────────────────────────────────

WEBSOCKET GATEWAY

Implement production WebSocket infrastructure for the domains covered by this volume.

Support:

• Connection authentication
• Connection authorization
• Connection lifecycle
• Heartbeats
• Reconnection
• Presence
• Typing
• Message delivery
• Message acknowledgments
• Read receipts
• Reactions
• Group updates
• Community updates

Implement horizontal scaling compatibility.

Use Redis coordination where required by the established architecture.

────────────────────────────────────────

WEBSOCKET EVENTS

Define and implement contracts for events such as:

• conversation.created
• conversation.updated
• conversation.member_added
• conversation.member_removed
• message.created
• message.sent
• message.delivered
• message.read
• message.edited
• message.deleted
• message.reaction_added
• message.reaction_removed
• message.typing_started
• message.typing_stopped
• presence.updated
• group.created
• group.updated
• group.member_added
• group.member_removed
• community.updated

Use versioned event contracts.

Do not expose internal database structures directly.

────────────────────────────────────────

OFFLINE SYNCHRONIZATION

Implement backend synchronization support.

Support:

• Sync cursor
• Initial synchronization
• Incremental synchronization
• Missed-event recovery
• Message history
• Pending messages
• Delivery-state synchronization
• Read-state synchronization
• Conversation metadata synchronization

Define:

• Cursor format
• Cursor validation
• Cursor expiration
• Replay behavior
• Recovery behavior

────────────────────────────────────────

MULTI-DEVICE MESSAGE SYNCHRONIZATION

Support message synchronization across:

• Mobile devices
• Web sessions
• Desktop sessions

Define how:

• New messages
• Delivery state
• Read state
• Reaction state
• Conversation membership
• Message edits
• Message deletions

are synchronized between authorized devices.

Do not weaken E2EE boundaries.

────────────────────────────────────────

DATABASE

Implement Prisma models and migrations for the domains covered by this volume.

Include appropriate models for:

• Conversation
• ConversationParticipant
• ConversationSettings
• Message
• MessageAttachmentReference
• MessageReaction
• MessageMention
• MessageReceipt
• MessageEdit where required
• Group
• GroupMember
• GroupRole
• Community
• CommunityMember
• Channel where applicable
• SyncCursor or synchronization state where justified

Use:

• Primary keys
• Foreign keys
• Unique constraints
• Check constraints
• Composite indexes
• Time-based indexes
• Partitioning where justified

Design indexes for:

• Latest conversation messages
• Conversation history
• Delivery state
• Read state
• Group membership
• Membership lookup
• Synchronization

────────────────────────────────────────

DATABASE TRANSACTIONS

Use transactions when operations require strong consistency.

Examples:

• Creating a conversation and its initial membership
• Creating a message and its authoritative sequence
• Adding/removing group membership
• Applying permission-sensitive membership changes

Do not use transactions across unrelated databases/services.

────────────────────────────────────────

EVENTS

Publish appropriate domain/integration events.

Implement events including:

• ConversationCreated
• ConversationParticipantAdded
• ConversationParticipantRemoved
• MessageCreated
• MessageSent
• MessageDelivered
• MessageRead
• MessageEdited
• MessageDeleted
• MessageReactionAdded
• MessageReactionRemoved
• GroupCreated
• GroupUpdated
• GroupMemberAdded
• GroupMemberRemoved
• CommunityCreated
• CommunityUpdated
• PresenceChanged where appropriate

Use the established event envelope.

Use transactional outbox for events associated with database transactions.

Consumers must be idempotent.

────────────────────────────────────────

BACKGROUND JOBS

Implement background processing where required for:

• Large-group membership operations
• Conversation cleanup
• Message retention
• Message archival
• Delivery retry
• Synchronization maintenance
• Expired cursor cleanup

Do not move latency-sensitive real-time operations into slow background jobs unnecessarily.

────────────────────────────────────────

API

Implement REST APIs for:

Conversations

• Create
• List
• Get
• Update
• Archive where supported

Participants

• Add
• Remove
• Leave
• List

Messages

• Send
• List
• Get
• Edit
• Delete
• Reply
• Forward
• React
• Unreact
• Read

Groups

• Create
• Get
• Update
• Members
• Roles
• Invitations

Communities

• Create
• Get
• Update
• Membership
• Linked groups

Synchronization

• Initial sync
• Incremental sync
• Cursor recovery

Every endpoint must implement:

• Validation
• Authentication
• Authorization
• Rate limiting
• Consistent errors
• OpenAPI documentation
• Idempotency where appropriate
• Cursor pagination where appropriate

────────────────────────────────────────

RATE LIMITING

Apply rate limits to:

• Message creation
• Conversation creation
• Group creation
• Membership operations
• Reactions
• Message editing
• Message deletion
• Synchronization
• Search-related messaging operations where applicable

Design limits that protect infrastructure while accommodating legitimate high-volume groups.

────────────────────────────────────────

SECURITY

Enforce:

• Authorization
• Conversation membership
• Group permissions
• Community permissions
• Blocking
• Privacy settings
• Rate limits
• Input validation
• Secure media references

Never trust:

• Client-provided role
• Client-provided ownership
• Client timestamps
• Client delivery state

────────────────────────────────────────

BLOCKING AND PRIVACY INTEGRATION

Messaging authorization must consider:

• User blocking
• Privacy settings
• Conversation membership
• Account status
• Group membership
• Administrative restrictions

Do not implement messaging authorization independently from the established identity/authorization system.

────────────────────────────────────────

OBSERVABILITY

Instrument:

• Message creation
• Message persistence
• Message delivery
• Delivery latency
• Read receipts
• Synchronization
• WebSocket connections
• Presence
• Group membership
• Community operations

Measure:

• Messages per second
• Message creation latency
• Delivery latency
• WebSocket connection count
• Reconnection rate
• Synchronization latency
• Group operation latency
• Error rates

Never log plaintext E2EE message content.

────────────────────────────────────────

TESTING

UNIT TESTS

Test:

• Message validation
• Ordering logic
• Idempotency
• Delivery transitions
• Read transitions
• Group policies
• Community policies
• Privacy rules
• Blocking rules
• Synchronization logic
• Pagination logic

INTEGRATION TESTS

Test:

• PostgreSQL persistence
• Transactions
• Redis presence
• Kafka events
• BullMQ jobs
• WebSockets

API TESTS

Test:

• Conversation endpoints
• Message endpoints
• Group endpoints
• Community endpoints
• Synchronization endpoints

WEBSOCKET TESTS

Test:

• Authentication
• Connection lifecycle
• Message delivery
• Read receipts
• Typing
• Presence
• Group events
• Reconnection

PERFORMANCE TESTS

Test:

• Message throughput
• Concurrent message creation
• Large conversation history
• Large groups
• WebSocket connections
• Synchronization throughput

SECURITY TESTS

Test:

• Unauthorized messaging
• Group privilege escalation
• Block bypass
• Duplicate message attacks
• Replay attacks
• Rate-limit bypass
• Unauthorized synchronization

────────────────────────────────────────

DOCUMENTATION

Document:

• Conversation model
• Message model
• Message lifecycle
• Delivery states
• Ordering strategy
• Idempotency strategy
• Group permissions
• Community permissions
• Presence architecture
• WebSocket events
• Synchronization protocol
• API contracts
• Database indexes
• Event contracts
• Operational considerations

────────────────────────────────────────

PROJECT INDEX

Update the backend Project Index with:

• Completed conversation modules
• Completed messaging modules
• Completed delivery modules
• Completed synchronization modules
• Completed group modules
• Completed community modules
• Completed presence modules
• WebSocket modules
• Database models
• Migrations
• APIs
• WebSocket events
• Kafka events
• BullMQ jobs
• Tests
• Generated files
• Remaining work
• Current milestone
• Dependencies

────────────────────────────────────────

IMPLEMENTATION MILESTONES

Implement this volume incrementally.

MILESTONE 1

Conversation domain and database models.

MILESTONE 2

Message persistence, identifiers, ordering, and idempotency.

MILESTONE 3

Message APIs, history, editing, deletion, replies, forwarding, and reactions.

MILESTONE 4

Message delivery, read receipts, and synchronization.

MILESTONE 5

Groups, membership, roles, and permissions.

MILESTONE 6

Communities and channels where applicable.

MILESTONE 7

Presence, typing indicators, and WebSocket messaging.

MILESTONE 8

Multi-device synchronization integration.

MILESTONE 9

Events, queues, observability, and retention jobs.

MILESTONE 10

Integration, performance, security, and end-to-end testing.

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

Never generate placeholder files.

Never generate TODO implementations.

When modifying an existing file:

1. Provide the exact file path.
2. State why it must change.
3. Provide the complete updated file.

Never regenerate unchanged files.

────────────────────────────────────────

SCOPE RESTRICTION

This volume covers:

• Conversations
• Messaging
• Messages
• Delivery
• Receipts
• Ordering
• Idempotency
• Synchronization
• Groups
• Communities
• Channels where applicable
• Presence
• Typing indicators
• WebSocket messaging
• Multi-device message synchronization

Do not implement complete:

• Media processing
• Stories
• Push notification providers
• Voice/video calls
• Full E2EE cryptography
• Search
• Business accounts
• Full moderation
• Analytics
• Infrastructure

Those belong to later backend implementation volumes.

────────────────────────────────────────

QUALITY BAR

Treat messaging as mission-critical infrastructure.

Assume:

• Billions of messages
• Very large groups
• Tens of millions of concurrent connections
• Unreliable networks
• Multi-device users
• Global traffic
• High message throughput

Prioritize:

• Durable persistence
• Correct ordering
• Idempotency
• Delivery reliability
• Synchronization correctness
• Authorization
• Horizontal scalability
• Observability
• Fault tolerance
• Security
• Maintainabili

You are operating in Senior Engineering Team Mode.

Build the production-ready backend for conversations, messaging, message delivery, synchronization, presence, groups, and communities for an enterprise-scale global real-time communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The backend must follow the established architecture, domain boundaries, security model, database ownership rules, API conventions, event architecture, queue architecture, and real-time architecture of the project.

Do not redesign the architecture.

Do not generate frontend code.

Do not generate mobile code.

Do not generate Kubernetes manifests.

Do not generate Terraform.

Do not generate infrastructure implementation code.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Implement the production-ready backend required for:

• Conversations
• One-to-one messaging
• Group messaging
• Communities
• Channels where appropriate
• Messages
• Message attachments
• Replies
• Forwarding
• Mentions
• Reactions
• Message editing
• Message deletion
• Message delivery
• Read receipts
• Typing indicators
• Presence
• Offline synchronization
• Multi-device message synchronization
• Message ordering
• Idempotency
• Deduplication
• Message history
• Conversation membership
• Group administration
• Community membership
• Conversation permissions

The implementation must support:

• Hundreds of millions of users
• Billions of messages
• Large conversation histories
• Large groups
• High message throughput
• Tens of millions of concurrent connections
• Multi-region deployment
• Horizontal scaling
• High availability

────────────────────────────────────────

TECHNOLOGY STACK

Backend:

• Node.js
• NestJS
• TypeScript

Database:

• PostgreSQL
• Prisma ORM

Cache:

• Redis

Real-Time:

• WebSockets
• Socket.IO where appropriate

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

Keep persistence concerns inside repositories/data-access layers.

Enforce authorization server-side.

Use centralized validation and error handling.

────────────────────────────────────────

DOMAIN OWNERSHIP

Implement clear boundaries between:

• Conversation domain
• Messaging domain
• Message delivery domain
• Synchronization domain
• Group domain
• Community domain
• Presence domain

Do not place all messaging functionality into one uncontrolled module.

Do not allow unrelated services to directly modify authoritative conversation or message data.

────────────────────────────────────────

CONVERSATION DOMAIN

Implement:

• Conversation creation
• Conversation retrieval
• Conversation listing
• Conversation membership
• Conversation settings
• Conversation archival where appropriate
• Conversation state
• Conversation participant management

Support conversation types:

• Direct
• Group
• Community-linked
• Channel where appropriate

Define conversation lifecycle.

────────────────────────────────────────

DIRECT CONVERSATIONS

Implement one-to-one conversations.

Support:

• Conversation creation
• Existing-conversation lookup
• Participant validation
• Blocking checks
• Privacy checks
• Conversation metadata
• Conversation listing

Prevent duplicate direct conversations between the same two users.

Use appropriate unique constraints and transactional logic.

────────────────────────────────────────

CONVERSATION MEMBERS

Implement:

• Add participant
• Remove participant
• Leave conversation
• Membership status
• Membership timestamps
• Role where applicable
• Muting
• Notification preferences
• Last-read position

Protect membership operations through authorization policies.

────────────────────────────────────────

MESSAGE DOMAIN

Implement:

• Message creation
• Message retrieval
• Message history
• Message metadata
• Message type
• Message status
• Message deletion
• Message editing

Support message types including:

• Text
• Reply
• Image reference
• Video reference
• Audio reference
• Voice message reference
• Document reference
• Sticker reference
• GIF reference
• System message

Do not store large binary media inside PostgreSQL.

────────────────────────────────────────

MESSAGE IDENTIFIERS

Implement the identifier strategy.

Support:

• Client-generated message ID
• Server-generated message ID
• Conversation sequence number
• Idempotency key

Use them to prevent:

• Duplicate messages
• Retry-generated duplicates
• Replayed requests
• Duplicate event consumption

Define uniqueness constraints that safely enforce idempotency.

────────────────────────────────────────

MESSAGE ORDERING

Implement the established ordering model.

Support authoritative server-side ordering.

Do not use client clocks as the sole ordering mechanism.

Define behavior for:

• Concurrent messages
• Retried messages
• Offline messages
• Multi-device messages
• Delayed messages
• Replayed events

Maintain deterministic ordering within a conversation.

────────────────────────────────────────

MESSAGE PERSISTENCE

Implement transactional message persistence.

A successful message submission must not produce a message that exists only in ephemeral infrastructure.

Use:

• PostgreSQL
• Transactions
• Idempotency
• Appropriate indexes

Persist all fields required for future synchronization.

────────────────────────────────────────

MESSAGE DELIVERY

Implement message delivery state tracking.

Support:

• Pending
• Accepted
• Sent
• Delivered
• Read
• Failed

Implement the appropriate persistence model for delivery state.

Prevent excessive write amplification for high-volume conversations.

Use optimized indexes and data-access patterns.

────────────────────────────────────────

DELIVERY RECEIPTS

Implement:

• Delivery acknowledgment
• Read acknowledgment
• Delivery state queries
• Receipt propagation
• Multi-device receipt synchronization

Support idempotent receipt processing.

Repeated delivery/read events must not corrupt state.

────────────────────────────────────────

MESSAGE RETRIEVAL

Implement efficient message retrieval.

Support:

• Conversation history
• Cursor pagination
• Fetch before cursor
• Fetch after cursor
• Latest messages
• Synchronization batches

Prefer cursor-based pagination for high-volume message histories.

Design indexes specifically for the expected access patterns.

────────────────────────────────────────

MESSAGE EDITING

Implement:

• Edit authorization
• Edit validation
• Edit timestamps
• Edit history strategy
• Edit event generation
• Multi-device propagation

Respect configured editing rules.

Ensure an edited message remains auditable where required by the platform's architecture.

────────────────────────────────────────

MESSAGE DELETION

Support:

• Delete for sender
• Delete for authorized participants where applicable
• Logical deletion
• Event propagation
• Synchronization

Clearly distinguish:

• User-visible deletion
• Logical deletion
• Physical deletion

Never expose deleted message content after the applicable deletion policy.

────────────────────────────────────────

REPLIES

Implement:

• Reply-to-message references
• Reply validation
• Reply authorization
• Reply metadata
• Synchronization
• Deletion behavior

A reply must not expose deleted or unauthorized message content.

────────────────────────────────────────

FORWARDING

Implement message forwarding where supported.

Support:

• Forward to direct conversation
• Forward to group
• Authorization
• Idempotency
• Forward metadata
• Privacy rules

Do not copy large message payloads unnecessarily.

────────────────────────────────────────

MENTIONS

Implement:

• Mention parsing contract
• Mention references
• Mention validation
• Mention notification integration
• Synchronization

Do not implement frontend parsing logic in backend controllers.

Store structured mention references.

────────────────────────────────────────

REACTIONS

Implement:

• Add reaction
• Remove reaction
• Reaction validation
• Duplicate prevention
• Reaction aggregation
• Reaction events
• Synchronization

Use appropriate unique constraints to prevent duplicate reactions from the same user where required.

────────────────────────────────────────

GROUP DOMAIN

Implement:

• Group creation
• Group updates
• Group membership
• Group roles
• Group permissions
• Group invitations
• Member removal
• Member promotion
• Member demotion
• Group settings
• Group avatar metadata
• Group description
• Group lifecycle

Support roles such as:

• Member
• Administrator
• Owner where applicable

────────────────────────────────────────

GROUP AUTHORIZATION

Implement policies for:

• Send messages
• Add members
• Remove members
• Change group settings
• Change group administrators
• Delete messages
• Update group metadata

Do not trust client-provided roles.

Load authoritative membership and permission state server-side.

────────────────────────────────────────

LARGE GROUP ARCHITECTURE

Implement data-access and event structures compatible with large groups.

Avoid loading entire group membership into application memory.

Avoid synchronous fan-out loops inside HTTP requests.

Use appropriate asynchronous event and queue infrastructure for large operations.

────────────────────────────────────────

COMMUNITY DOMAIN

Implement:

• Community creation
• Community updates
• Community membership
• Community administrators
• Community-linked groups
• Community-linked channels where appropriate
• Community settings
• Community discovery boundaries

Define authorization for community administration.

────────────────────────────────────────

CHANNEL SUPPORT

Where the architecture includes channels, implement the backend foundation for:

• Channel creation
• Channel metadata
• Channel membership/subscription
• Channel permissions
• Publisher roles
• Subscriber behavior

Do not force channel semantics into ordinary direct conversations.

────────────────────────────────────────

PRESENCE

Implement the backend presence system.

Support:

• Online
• Offline
• Last seen
• Typing
• Recording where applicable
• Presence subscriptions

Use Redis for ephemeral presence state.

Implement:

• Heartbeats
• TTL
• Connection registration
• Presence updates
• Disconnect handling
• Privacy checks

Do not write every presence event directly into PostgreSQL.

────────────────────────────────────────

TYPING INDICATORS

Implement real-time typing state.

Support:

• Typing started
• Typing stopped
• Recording started where appropriate
• Recording stopped where appropriate

Use ephemeral infrastructure.

Do not persist typing indicators as durable message records.

Apply privacy and authorization rules.

────────────────────────────────────────

WEBSOCKET GATEWAY

Implement production WebSocket infrastructure for the domains covered by this volume.

Support:

• Connection authentication
• Connection authorization
• Connection lifecycle
• Heartbeats
• Reconnection
• Presence
• Typing
• Message delivery
• Message acknowledgments
• Read receipts
• Reactions
• Group updates
• Community updates

Implement horizontal scaling compatibility.

Use Redis coordination where required by the established architecture.

────────────────────────────────────────

WEBSOCKET EVENTS

Define and implement contracts for events such as:

• conversation.created
• conversation.updated
• conversation.member_added
• conversation.member_removed
• message.created
• message.sent
• message.delivered
• message.read
• message.edited
• message.deleted
• message.reaction_added
• message.reaction_removed
• message.typing_started
• message.typing_stopped
• presence.updated
• group.created
• group.updated
• group.member_added
• group.member_removed
• community.updated

Use versioned event contracts.

Do not expose internal database structures directly.

────────────────────────────────────────

OFFLINE SYNCHRONIZATION

Implement backend synchronization support.

Support:

• Sync cursor
• Initial synchronization
• Incremental synchronization
• Missed-event recovery
• Message history
• Pending messages
• Delivery-state synchronization
• Read-state synchronization
• Conversation metadata synchronization

Define:

• Cursor format
• Cursor validation
• Cursor expiration
• Replay behavior
• Recovery behavior

────────────────────────────────────────

MULTI-DEVICE MESSAGE SYNCHRONIZATION

Support message synchronization across:

• Mobile devices
• Web sessions
• Desktop sessions

Define how:

• New messages
• Delivery state
• Read state
• Reaction state
• Conversation membership
• Message edits
• Message deletions

are synchronized between authorized devices.

Do not weaken E2EE boundaries.

────────────────────────────────────────

DATABASE

Implement Prisma models and migrations for the domains covered by this volume.

Include appropriate models for:

• Conversation
• ConversationParticipant
• ConversationSettings
• Message
• MessageAttachmentReference
• MessageReaction
• MessageMention
• MessageReceipt
• MessageEdit where required
• Group
• GroupMember
• GroupRole
• Community
• CommunityMember
• Channel where applicable
• SyncCursor or synchronization state where justified

Use:

• Primary keys
• Foreign keys
• Unique constraints
• Check constraints
• Composite indexes
• Time-based indexes
• Partitioning where justified

Design indexes for:

• Latest conversation messages
• Conversation history
• Delivery state
• Read state
• Group membership
• Membership lookup
• Synchronization

────────────────────────────────────────

DATABASE TRANSACTIONS

Use transactions when operations require strong consistency.

Examples:

• Creating a conversation and its initial membership
• Creating a message and its authoritative sequence
• Adding/removing group membership
• Applying permission-sensitive membership changes

Do not use transactions across unrelated databases/services.

────────────────────────────────────────

EVENTS

Publish appropriate domain/integration events.

Implement events including:

• ConversationCreated
• ConversationParticipantAdded
• ConversationParticipantRemoved
• MessageCreated
• MessageSent
• MessageDelivered
• MessageRead
• MessageEdited
• MessageDeleted
• MessageReactionAdded
• MessageReactionRemoved
• GroupCreated
• GroupUpdated
• GroupMemberAdded
• GroupMemberRemoved
• CommunityCreated
• CommunityUpdated
• PresenceChanged where appropriate

Use the established event envelope.

Use transactional outbox for events associated with database transactions.

Consumers must be idempotent.

────────────────────────────────────────

BACKGROUND JOBS

Implement background processing where required for:

• Large-group membership operations
• Conversation cleanup
• Message retention
• Message archival
• Delivery retry
• Synchronization maintenance
• Expired cursor cleanup

Do not move latency-sensitive real-time operations into slow background jobs unnecessarily.

────────────────────────────────────────

API

Implement REST APIs for:

Conversations

• Create
• List
• Get
• Update
• Archive where supported

Participants

• Add
• Remove
• Leave
• List

Messages

• Send
• List
• Get
• Edit
• Delete
• Reply
• Forward
• React
• Unreact
• Read

Groups

• Create
• Get
• Update
• Members
• Roles
• Invitations

Communities

• Create
• Get
• Update
• Membership
• Linked groups

Synchronization

• Initial sync
• Incremental sync
• Cursor recovery

Every endpoint must implement:

• Validation
• Authentication
• Authorization
• Rate limiting
• Consistent errors
• OpenAPI documentation
• Idempotency where appropriate
• Cursor pagination where appropriate

────────────────────────────────────────

RATE LIMITING

Apply rate limits to:

• Message creation
• Conversation creation
• Group creation
• Membership operations
• Reactions
• Message editing
• Message deletion
• Synchronization
• Search-related messaging operations where applicable

Design limits that protect infrastructure while accommodating legitimate high-volume groups.

────────────────────────────────────────

SECURITY

Enforce:

• Authorization
• Conversation membership
• Group permissions
• Community permissions
• Blocking
• Privacy settings
• Rate limits
• Input validation
• Secure media references

Never trust:

• Client-provided role
• Client-provided ownership
• Client timestamps
• Client delivery state

────────────────────────────────────────

BLOCKING AND PRIVACY INTEGRATION

Messaging authorization must consider:

• User blocking
• Privacy settings
• Conversation membership
• Account status
• Group membership
• Administrative restrictions

Do not implement messaging authorization independently from the established identity/authorization system.

────────────────────────────────────────

OBSERVABILITY

Instrument:

• Message creation
• Message persistence
• Message delivery
• Delivery latency
• Read receipts
• Synchronization
• WebSocket connections
• Presence
• Group membership
• Community operations

Measure:

• Messages per second
• Message creation latency
• Delivery latency
• WebSocket connection count
• Reconnection rate
• Synchronization latency
• Group operation latency
• Error rates

Never log plaintext E2EE message content.

────────────────────────────────────────

TESTING

UNIT TESTS

Test:

• Message validation
• Ordering logic
• Idempotency
• Delivery transitions
• Read transitions
• Group policies
• Community policies
• Privacy rules
• Blocking rules
• Synchronization logic
• Pagination logic

INTEGRATION TESTS

Test:

• PostgreSQL persistence
• Transactions
• Redis presence
• Kafka events
• BullMQ jobs
• WebSockets

API TESTS

Test:

• Conversation endpoints
• Message endpoints
• Group endpoints
• Community endpoints
• Synchronization endpoints

WEBSOCKET TESTS

Test:

• Authentication
• Connection lifecycle
• Message delivery
• Read receipts
• Typing
• Presence
• Group events
• Reconnection

PERFORMANCE TESTS

Test:

• Message throughput
• Concurrent message creation
• Large conversation history
• Large groups
• WebSocket connections
• Synchronization throughput

SECURITY TESTS

Test:

• Unauthorized messaging
• Group privilege escalation
• Block bypass
• Duplicate message attacks
• Replay attacks
• Rate-limit bypass
• Unauthorized synchronization

────────────────────────────────────────

DOCUMENTATION

Document:

• Conversation model
• Message model
• Message lifecycle
• Delivery states
• Ordering strategy
• Idempotency strategy
• Group permissions
• Community permissions
• Presence architecture
• WebSocket events
• Synchronization protocol
• API contracts
• Database indexes
• Event contracts
• Operational considerations

────────────────────────────────────────

PROJECT INDEX

Update the backend Project Index with:

• Completed conversation modules
• Completed messaging modules
• Completed delivery modules
• Completed synchronization modules
• Completed group modules
• Completed community modules
• Completed presence modules
• WebSocket modules
• Database models
• Migrations
• APIs
• WebSocket events
• Kafka events
• BullMQ jobs
• Tests
• Generated files
• Remaining work
• Current milestone
• Dependencies

────────────────────────────────────────

IMPLEMENTATION MILESTONES

Implement this volume incrementally.

MILESTONE 1

Conversation domain and database models.

MILESTONE 2

Message persistence, identifiers, ordering, and idempotency.

MILESTONE 3

Message APIs, history, editing, deletion, replies, forwarding, and reactions.

MILESTONE 4

Message delivery, read receipts, and synchronization.

MILESTONE 5

Groups, membership, roles, and permissions.

MILESTONE 6

Communities and channels where applicable.

MILESTONE 7

Presence, typing indicators, and WebSocket messaging.

MILESTONE 8

Multi-device synchronization integration.

MILESTONE 9

Events, queues, observability, and retention jobs.

MILESTONE 10

Integration, performance, security, and end-to-end testing.

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

Never generate placeholder files.

Never generate TODO implementations.

When modifying an existing file:

1. Provide the exact file path.
2. State why it must change.
3. Provide the complete updated file.

Never regenerate unchanged files.

────────────────────────────────────────

SCOPE RESTRICTION

This volume covers:

• Conversations
• Messaging
• Messages
• Delivery
• Receipts
• Ordering
• Idempotency
• Synchronization
• Groups
• Communities
• Channels where applicable
• Presence
• Typing indicators
• WebSocket messaging
• Multi-device message synchronization

Do not implement complete:

• Media processing
• Stories
• Push notification providers
• Voice/video calls
• Full E2EE cryptography
• Search
• Business accounts
• Full moderation
• Analytics
• Infrastructure

Those belong to later backend implementation volumes.

────────────────────────────────────────

QUALITY BAR

Treat messaging as mission-critical infrastructure.

Assume:

• Billions of messages
• Very large groups
• Tens of millions of concurrent connections
• Unreliable networks
• Multi-device users
• Global traffic
• High message throughput

Prioritize:

• Durable persistence
• Correct ordering
• Idempotency
• Delivery reliability
• Synchronization correctness
• Authorization
• Horizontal scalability
• Observability
• Fault tolerance
• Security
• Maintainability
