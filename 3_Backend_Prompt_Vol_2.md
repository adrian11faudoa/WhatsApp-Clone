# BACKEND IMPLEMENTATION PROMPT — VOLUME 2

## Production-Grade Real-Time Communication Platform

### Contacts, Conversations, Direct Chats, Groups, Membership, Permissions, and Conversation Lifecycle

You are implementing **Volume 2 of the backend** for a production-grade, globally scalable, WhatsApp-like real-time communication platform.

This is an original communication platform inspired by modern real-time messaging products. It is not an implementation of proprietary WhatsApp source code, private infrastructure, undocumented protocols, or proprietary algorithms.

This prompt is **fully standalone**. It must be executable without requiring another prompt, previous conversation, architecture document, or previously generated prompt to be present.

The actual repository is the source of truth for existing implementation.

This volume is an implementation unit of **one coherent backend system**. It must integrate with the existing repository and must preserve the identity, authentication, user, device, session, security, error, configuration, database, Redis, observability, and testing conventions already implemented in the repository.

Do not create a competing architecture.

Do not duplicate existing modules.

Do not assume that a previous prompt exists.

---

# 1. PRIMARY OBJECTIVE

Implement the production-grade backend domain for:

* contacts;
* contact discovery;
* direct conversations;
* group conversations;
* conversation membership;
* group roles;
* group permissions;
* conversation metadata;
* participant lifecycle;
* conversation settings;
* conversation deletion/archival behavior where appropriate;
* conversation-level authorization;
* blocking/privacy enforcement where required for conversation access;
* conversation-related persistence;
* conversation domain events.

The result must provide a stable foundation for the messaging backend that will be implemented later.

Do not implement the actual message delivery system in this volume.

Do not create fake message endpoints.

Do not create placeholder messaging services.

---

# 2. PRODUCT CONTEXT

The overall platform supports:

* user accounts;
* multiple authenticated devices;
* contacts;
* direct conversations;
* group conversations;
* messages;
* message delivery;
* read receipts;
* typing indicators;
* presence;
* reactions;
* replies;
* forwarding;
* editing;
* deletion;
* media;
* push notifications;
* search;
* privacy;
* blocking/reporting;
* multi-device synchronization;
* voice/video calls.

This volume focuses specifically on the **relationship between users and conversations**.

The resulting conversation domain must be suitable for high-volume messaging and must provide authoritative authorization information for later message operations.

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

Do not introduce a new framework or database abstraction when the repository already contains a compatible implementation.

---

# 4. FIRST ACTION — INSPECT THE ACTUAL REPOSITORY

Before making changes:

1. Inspect the complete relevant backend structure.
2. Inspect the existing identity/user/device/session implementation.
3. Inspect Prisma schema and migrations.
4. Inspect existing API conventions.
5. Inspect authentication and authorization guards.
6. Inspect error handling.
7. Inspect Redis conventions.
8. Inspect event infrastructure.
9. Inspect logging/tracing.
10. Inspect existing tests.
11. Identify any existing contact or conversation functionality.
12. Identify any existing WebSocket infrastructure.
13. Identify any existing privacy/blocking functionality.

Use existing implementations wherever compatible.

If the repository already contains part of this functionality:

* extend it;
* repair it if necessary;
* preserve compatible behavior;
* migrate it safely where required.

Do not create duplicate `Conversation`, `Contact`, or membership systems.

---

# 5. DOMAIN BOUNDARIES

Keep these responsibilities clearly separated.

## Contacts

Responsible for:

* discovering users;
* representing user relationships where applicable;
* contact metadata;
* contact visibility/privacy rules.

## Conversations

Responsible for:

* direct conversations;
* groups;
* conversation metadata;
* membership;
* roles;
* permissions;
* lifecycle.

## Messaging

Not implemented here.

Messaging will consume the conversation authorization and membership contracts established by this volume.

## Identity

Remains responsible for:

* users;
* devices;
* sessions;
* authentication.

Do not move authentication responsibility into conversations.

---

# 6. CONTACT MODEL

Implement a production-grade contact model appropriate to the product.

A contact relationship may contain concepts such as:

* owner user;
* target user;
* local nickname;
* favorite/pinned state if product requirements justify it;
* relationship state;
* created timestamp;
* updated timestamp.

Determine whether contacts should represent:

1. a server-side relationship;
2. locally imported contacts;
3. both.

Do not store unnecessary copies of a user's entire profile.

The authoritative user identity remains in the identity domain.

---

# 7. CONTACT DISCOVERY

Implement secure user discovery mechanisms appropriate to the product.

Potential discovery identifiers include:

* username/handle;
* normalized phone number;
* normalized email where applicable.

Apply privacy controls.

Do not allow unrestricted enumeration of the entire user database.

Protect discovery endpoints against:

* brute force;
* automated enumeration;
* high-volume probing;
* identifier harvesting.

Use appropriate:

* rate limits;
* authorization;
* normalization;
* response minimization.

Do not reveal whether a private identifier belongs to a user when product privacy rules prohibit that disclosure.

---

# 8. CONTACT OPERATIONS

Implement real functionality for appropriate operations such as:

* add contact;
* update contact metadata;
* remove contact;
* list contacts;
* retrieve contact;
* search contacts;
* discover eligible users.

Only implement operations supported by the actual product model.

Do not create meaningless endpoints.

Enforce ownership server-side.

A user must never be able to modify another user's contact records by manipulating an ID.

---

# 9. DIRECT CONVERSATION MODEL

Implement a canonical direct conversation model.

A direct conversation represents communication between two users.

The system must guarantee that the same pair of users cannot accidentally create multiple canonical direct conversations unless the product explicitly supports multiple independent threads.

For a standard direct-message model:

```text
User A + User B = one canonical direct conversation
```

This uniqueness must be enforced at the database level, not only through application checks.

---

# 10. DIRECT CONVERSATION CREATION

Implement an idempotent direct-conversation creation/retrieval operation.

When a user requests a direct conversation with another eligible user:

1. validate the target;
2. verify privacy/blocking restrictions;
3. normalize the participant pair;
4. resolve an existing conversation;
5. otherwise create it atomically;
6. return the canonical conversation.

Concurrent requests must not produce duplicate direct conversations.

Use:

* database uniqueness constraints;
* transactions;
* conflict handling;

as appropriate.

Do not rely only on:

```text
find → if absent → create
```

because concurrent requests can race.

---

# 11. DIRECT CONVERSATION AUTHORIZATION

Every direct conversation operation must verify that the authenticated user is one of the participants.

Never trust a client-provided:

* user ID;
* participant ID;
* ownership flag;
* membership flag.

Resolve authorization from authoritative database state.

Prepare reusable authorization services/guards for future messaging operations.

---

# 12. GROUP CONVERSATION MODEL

Implement groups with persistent concepts equivalent to:

## Group/Conversation

Contains:

* conversation ID;
* type;
* title/name;
* description where supported;
* avatar/media reference where supported;
* creator/owner;
* status;
* timestamps.

## ConversationMember

Contains concepts such as:

* conversation ID;
* user ID;
* role;
* membership status;
* joined timestamp;
* left timestamp;
* mute/settings state where appropriate;
* permissions metadata where required.

The exact schema must follow repository conventions.

---

# 13. GROUP ROLES

Implement a clear role model.

At minimum support appropriate equivalents of:

* owner;
* administrator;
* member.

Do not use arbitrary strings throughout the application.

Roles should be represented through a stable enum/domain type.

Future group-management operations must be able to determine whether a member can:

* add members;
* remove members;
* change group metadata;
* manage administrators;
* change group settings;
* delete/close the group where authorized.

---

# 14. GROUP PERMISSIONS

Authorization must be evaluated server-side.

Create explicit permission rules for operations such as:

* view conversation;
* update group metadata;
* add members;
* remove members;
* promote member;
* demote administrator;
* leave group;
* transfer ownership;
* manage group settings.

Do not encode permission decisions only in controllers.

Keep business authorization reusable for:

* REST;
* WebSocket;
* background workers;
* future message operations.

---

# 15. GROUP CREATION

Implement real group creation.

Requirements:

* authenticated creator required;
* valid group metadata;
* valid initial members;
* creator automatically becomes owner;
* appropriate administrator state;
* duplicate member elimination;
* membership validation;
* transactional creation.

Group creation must either fully succeed or leave no partially-created group state.

---

# 16. GROUP MEMBER ADDITION

Implement authorized member addition.

Validate:

* target user exists;
* target is eligible;
* target is not already an active member;
* requester has permission;
* group is active;
* membership limits where applicable.

Do not silently create duplicate memberships.

Use database constraints to reinforce uniqueness.

---

# 17. GROUP MEMBER REMOVAL

Implement authorized removal.

Consider:

* owner;
* administrator;
* ordinary member;
* removing self;
* removing another member;
* removing an administrator;
* removing the owner;
* ownership transfer.

Do not permit privilege escalation through malformed requests.

A user must not be able to remove a higher-privileged member unless the product's role rules explicitly allow it.

---

# 18. LEAVING GROUPS

Implement self-service group leaving.

When a member leaves:

* mark membership appropriately;
* preserve historical membership where needed;
* prevent future authorization as an active member;
* preserve referential integrity;
* generate the appropriate domain event.

If the leaving user is the owner, enforce a deterministic ownership rule.

Do not leave a group with an invalid ownership state.

---

# 19. OWNERSHIP TRANSFER

If group ownership transfer is supported, implement it transactionally.

The operation must:

1. verify current owner;
2. verify target is an eligible active member;
3. update ownership;
4. update roles;
5. preserve membership;
6. emit the appropriate event.

Do not allow a non-owner to transfer ownership.

---

# 20. CONVERSATION METADATA

Implement editable conversation metadata appropriate to the product.

Potential fields:

* name/title;
* description;
* avatar/media reference;
* group settings;
* privacy-related settings.

Only authorized users may modify group-level metadata.

Direct conversation metadata must not allow one participant to impersonate or modify the other participant's identity.

---

# 21. CONVERSATION LISTING

Implement authenticated conversation listing.

The API must support efficient retrieval suitable for a messaging client.

Return appropriate information such as:

* conversation ID;
* conversation type;
* participant/group summary;
* membership state;
* metadata;
* timestamps;
* muted/pinned/archive state if implemented;
* relevant synchronization metadata.

Do not include message history in the conversation-list endpoint.

Message retrieval belongs to the messaging domain.

---

# 22. PAGINATION

Conversation and contact lists must use a stable pagination strategy.

Prefer cursor-based pagination for high-volume collections.

The cursor must be:

* opaque;
* validated;
* stable;
* tied to the ordering strategy.

Avoid offset pagination for large, continuously changing conversation lists when it would cause unacceptable performance or duplicate/skipped results.

The pagination contract must be consistent with the existing backend.

---

# 23. CONVERSATION ORDERING

Conversation listing must use deterministic ordering.

Use an appropriate server-authoritative field, such as:

* last activity timestamp;
* conversation update sequence;
* another canonical ordering value.

Do not depend solely on client clocks.

Prepare the model for later message activity updates.

Do not implement fake message activity merely to populate a field.

---

# 24. CONVERSATION SETTINGS

Where supported, implement user-specific conversation settings separately from shared conversation metadata.

Examples:

* muted;
* archived;
* pinned;
* notification preferences.

These are generally **per-user state**, not global conversation state.

Do not store per-user settings directly on the shared conversation record.

---

# 25. CONVERSATION MEMBER STATE

Distinguish:

* active member;
* invited/pending member if invitations are supported;
* left member;
* removed member;
* banned member where moderation requires it.

Do not overload one boolean to represent all membership states.

Design the state model so future synchronization and moderation features can distinguish transitions.

---

# 26. DATABASE MODELING

Implement appropriate PostgreSQL/Prisma models.

At minimum the domain should support concepts equivalent to:

* Contact;
* Conversation;
* ConversationMember;
* GroupRole;
* ConversationType;
* MembershipStatus;
* user-specific conversation settings if required.

Use:

* foreign keys;
* uniqueness constraints;
* indexes;
* appropriate cascading behavior;
* timestamps.

---

# 27. CRITICAL DATABASE CONSTRAINTS

Enforce database-level uniqueness for:

## Contacts

Appropriate unique owner/target relationship.

## Direct conversations

Canonical participant-pair uniqueness.

## Group memberships

One active membership per user/conversation according to the selected state model.

Do not rely solely on application logic.

---

# 28. INDEXING

Design indexes for actual access patterns.

At minimum consider:

* conversations by member;
* active memberships by user;
* members by conversation;
* contacts by owner;
* contact lookup by normalized identifier where applicable;
* direct conversation uniqueness;
* conversation activity ordering.

Avoid redundant indexes.

Verify query plans for high-frequency operations where practical.

---

# 29. TRANSACTIONS

Use database transactions for operations requiring atomicity.

Examples:

* direct conversation creation;
* group creation;
* group membership changes;
* role changes;
* ownership transfer;
* member removal;
* account-related cleanup.

A group membership change must not leave role/ownership state inconsistent.

---

# 30. IDEMPOTENCY

Conversation operations must safely handle repeated requests where appropriate.

Examples:

* create/get direct conversation;
* add contact;
* remove contact;
* add group member;
* leave group.

Repeated requests must produce deterministic outcomes.

Do not treat a harmless retry as an internal server error.

---

# 31. PRIVACY AND BLOCKING INTEGRATION

Conversation creation and access must respect privacy and blocking rules.

If the repository already contains blocking/privacy functionality:

* reuse it;
* do not duplicate it.

If blocking is not yet implemented, create the minimal domain interface required to enforce conversation-access decisions without implementing a second blocking subsystem.

Conversation authorization must be able to answer questions such as:

* Can user A start a direct conversation with user B?
* Can user A access this conversation?
* Can user A add user B to this group?

Do not bypass privacy controls merely because the endpoint is authenticated.

---

# 32. ACCOUNT STATE INTEGRATION

Conversation operations must respect user account state.

For example:

* suspended users may not be permitted to create conversations;
* deleted accounts must not be treated as normal active users;
* inactive users may require special handling.

Use the identity domain's authoritative account state.

Do not duplicate account status inside conversations unless there is a clear domain reason.

---

# 33. EVENT ARCHITECTURE

Implement durable conversation domain events where asynchronous consumers will need them.

Potential events include:

* conversation.created;
* conversation.updated;
* conversation.member.added;
* conversation.member.removed;
* conversation.member.left;
* conversation.role.changed;
* conversation.owner.transferred;
* contact.created;
* contact.updated;
* contact.removed.

Use the repository's canonical event envelope.

Events must contain appropriate:

* event ID;
* event type;
* event version;
* aggregate ID;
* producer;
* timestamp;
* correlation ID;
* causation ID where applicable;
* trace context;
* versioned payload.

Do not publish events containing unnecessary private data.

---

# 34. TRANSACTIONAL EVENT DELIVERY

When a database mutation must reliably produce a domain event:

* use the existing transactional outbox infrastructure if present;
* otherwise implement the smallest correct outbox mechanism required.

The database state and outbox record must be committed atomically.

Do not publish directly to Kafka and then assume the database transaction succeeded.

Do not implement an outbox without a real delivery mechanism.

---

# 35. EVENT IDEMPOTENCY

Design downstream consumers to tolerate duplicate events.

Conversation events may be delivered more than once.

Do not make later messaging/realtime services depend on exactly-once delivery.

Use:

* event IDs;
* aggregate versions where appropriate;
* idempotent handlers.

---

# 36. REDIS

Use Redis only for appropriate ephemeral/high-performance state.

Potential uses:

* conversation access caching;
* membership caching;
* rate limiting;
* short-lived discovery state;
* distributed coordination.

Do not make Redis the authoritative source for conversation membership.

PostgreSQL remains authoritative.

Every cache must define:

* key;
* purpose;
* TTL;
* invalidation;
* stale behavior;
* failure behavior.

A Redis outage must not corrupt conversation state.

---

# 37. CACHE INVALIDATION

If conversation or membership data is cached:

Invalidate/update the cache whenever authoritative data changes.

Consider:

* membership changes;
* role changes;
* ownership transfer;
* conversation metadata updates;
* account deactivation.

Never allow stale authorization cache state to grant access after revocation.

Security-sensitive authorization should fail closed when cache correctness cannot be guaranteed.

---

# 38. API DESIGN

Implement versioned REST endpoints following the existing API conventions.

Appropriate endpoints may include:

## Contacts

* list contacts;
* search contacts;
* discover users;
* create contact;
* update contact;
* remove contact.

## Conversations

* list conversations;
* create/retrieve direct conversation;
* create group;
* retrieve conversation;
* update conversation metadata;
* leave conversation.

## Membership

* list members;
* add member;
* remove member;
* update member role;
* transfer ownership.

Only implement endpoints justified by the actual domain.

---

# 39. AUTHORIZATION

Every endpoint must explicitly enforce:

* authenticated user;
* conversation membership;
* role/permission;
* ownership;
* account state;
* privacy/blocking restrictions.

Never use a generic `authenticated = true` check as a substitute for resource authorization.

Test authorization independently.

---

# 40. IDOR PROTECTION

Explicitly test for insecure direct object references.

Examples:

User A must not be able to:

* retrieve User B's private contact records;
* modify User B's contact relationship;
* retrieve a private conversation where A is not a member;
* modify another group's metadata;
* add/remove members from another user's group;
* transfer ownership of a group they do not own.

Changing an ID in a request must never bypass authorization.

---

# 41. INPUT VALIDATION

Validate:

* user IDs;
* conversation IDs;
* contact IDs;
* member IDs;
* role values;
* conversation types;
* membership states;
* names;
* descriptions;
* pagination cursors;
* metadata sizes.

Apply maximum lengths and payload limits.

Reject malformed requests before database operations where possible.

---

# 42. SECURITY AGAINST MASS ASSIGNMENT

Do not allow clients to submit arbitrary model fields.

Explicitly map writable fields.

Never accept objects such as:

```text
{
  "role": "OWNER",
  "isAdmin": true,
  "ownerId": "..."
}
```

unless the operation specifically authorizes and validates those fields.

Client DTOs must not map directly into unrestricted Prisma updates.

---

# 43. GROUP SIZE AND RESOURCE LIMITS

Define configurable group limits appropriate to the platform.

The exact limit should be configurable rather than hardcoded throughout business logic.

Enforce limits transactionally.

Protect against requests attempting to add extremely large numbers of members in one operation.

Apply appropriate request-size and operation-rate limits.

---

# 44. ABUSE PREVENTION

Protect against:

* mass contact creation;
* user enumeration;
* mass group creation;
* mass member addition;
* group invitation abuse;
* repeated direct-conversation creation;
* automated discovery;
* authorization probing.

Use:

* rate limiting;
* request validation;
* server-side authorization;
* audit/security events;
* configurable thresholds.

Do not block legitimate users through excessively aggressive hardcoded limits.

---

# 45. PRIVACY-AWARE RESPONSES

API responses must contain only information the requester is authorized to see.

Do not return:

* private phone numbers;
* email addresses;
* internal identifiers;
* security state;
* device credentials;
* private moderation data;

unless the specific operation requires it and authorization permits it.

Use dedicated response DTOs.

Never return Prisma entities directly.

---

# 46. ERROR CONTRACT

Use the backend's canonical error system.

Examples:

* `CONTACT_NOT_FOUND`
* `USER_NOT_DISCOVERABLE`
* `CONVERSATION_NOT_FOUND`
* `NOT_CONVERSATION_MEMBER`
* `INSUFFICIENT_GROUP_PERMISSION`
* `GROUP_MEMBER_ALREADY_EXISTS`
* `GROUP_MEMBER_NOT_FOUND`
* `GROUP_LIMIT_REACHED`
* `DIRECT_CONVERSATION_CONFLICT`
* `CONVERSATION_ACCESS_DENIED`
* `USER_BLOCKED`

Use stable machine-readable codes.

Do not leak whether a private user exists when privacy rules prohibit disclosure.

---

# 47. OBSERVABILITY

Instrument important operations.

At minimum measure/log:

* contact creation/removal;
* discovery requests;
* direct conversation creation;
* group creation;
* membership changes;
* role changes;
* authorization failures;
* rate-limit violations;
* database conflicts;
* event publication failures.

Use correlation and trace IDs.

Do not log private conversation content.

Do not log unnecessary personal data.

---

# 48. METRICS

Where appropriate expose metrics for:

* conversation creation rate;
* group creation rate;
* membership changes;
* contact operations;
* authorization failures;
* discovery requests;
* rate-limit rejections;
* database conflict rates;
* event publication latency/failure.

Metrics should be low-cardinality.

Do not use user IDs or conversation IDs as unbounded metric labels.

---

# 49. TESTING REQUIREMENTS

Implement meaningful tests.

## Unit tests

Cover:

* direct conversation authorization;
* group permissions;
* ownership;
* role transitions;
* membership state transitions;
* contact rules;
* privacy/blocking decisions;
* validation;
* idempotency behavior.

## Integration tests

Cover:

* Prisma persistence;
* uniqueness constraints;
* concurrent direct conversation creation;
* group creation;
* membership transactions;
* ownership transfer;
* Redis cache behavior if implemented;
* event/outbox behavior.

## API/E2E tests

Cover:

* unauthorized access;
* authorized access;
* IDOR attempts;
* direct conversation creation;
* duplicate direct conversation requests;
* group creation;
* member addition/removal;
* role changes;
* owner transfer;
* leaving a group;
* contact management;
* pagination;
* invalid input;
* rate limiting.

---

# 50. CONCURRENCY TESTING

Explicitly test race conditions around:

* simultaneous direct conversation creation;
* simultaneous member addition;
* simultaneous member removal;
* simultaneous role changes;
* simultaneous ownership transfer;
* concurrent leave/remove operations.

Database constraints must remain the final protection against inconsistent state.

---

# 51. FAILURE HANDLING

Handle:

* PostgreSQL unavailable;
* Redis unavailable;
* event broker unavailable;
* duplicate constraints;
* transaction conflicts;
* stale membership;
* revoked account;
* deleted account;
* invalid conversation IDs;
* authorization failures;
* event publication failures.

Never return a successful mutation if the authoritative transaction failed.

If asynchronous event delivery fails after the database transaction, rely on the outbox/retry mechanism rather than falsely reporting the domain mutation as failed.

---

# 52. PERFORMANCE

Conversation operations must be designed for scale.

Avoid:

* N+1 member queries;
* loading entire groups unnecessarily;
* unbounded contact searches;
* offset pagination over massive tables;
* repeated authorization queries that can be efficiently batched;
* unnecessary Redis round trips.

Use:

* appropriate indexes;
* selective projections;
* cursor pagination;
* batching;
* transactions;
* caching where justified.

---

# 53. DATABASE MIGRATIONS

Create proper Prisma migrations for all schema changes.

Validate:

* clean installation;
* existing database migration;
* unique constraints;
* foreign keys;
* indexes;
* nullable transitions;
* deletion behavior.

Do not use destructive schema changes without a safe migration plan.

---

# 54. API DOCUMENTATION

Update OpenAPI documentation for all implemented functionality.

Document:

* request DTOs;
* response DTOs;
* authorization requirements;
* error codes;
* pagination;
* role/permission behavior;
* validation constraints.

Documentation must match the actual API.

---

# 55. FUTURE MESSAGE COMPATIBILITY

The conversation domain must provide stable contracts for the future messaging system.

Future message operations must be able to ask:

```text
Is user U an active member of conversation C?
```

and:

```text
Is device D associated with authenticated user U?
```

and:

```text
Is user U authorized to perform operation X in conversation C?
```

These checks must have clear service/domain interfaces.

Do not force the future messaging module to duplicate membership logic.

---

# 56. REAL-TIME COMPATIBILITY

The future WebSocket layer will need to notify clients when:

* conversations are created;
* group metadata changes;
* members join;
* members leave;
* roles change.

Create appropriate domain events/contracts without implementing the entire real-time notification subsystem in this volume.

The event model must support later delivery to:

* connected devices;
* offline devices through push notifications;
* multi-device synchronization.

---

# 57. MULTI-DEVICE COMPATIBILITY

Conversation state is user/account-level domain state.

A user may have multiple authenticated devices.

Do not incorrectly model a conversation as belonging to a single device.

Later synchronization services must be able to distribute conversation changes to all eligible devices.

Device-specific delivery belongs to the real-time/synchronization layer, not the core conversation authorization model.

---

# 58. ACCOUNT DELETION COMPATIBILITY

Design conversation relationships so account deletion can later be handled safely.

Do not use destructive cascades that would unexpectedly delete entire conversation histories merely because one user is deleted.

Conversation/member historical integrity must be considered.

The exact retention/anonymization strategy must remain compatible with the platform's privacy requirements.

---

# 59. NO MESSAGE IMPLEMENTATION

Do not implement:

* sending messages;
* message retrieval;
* delivery receipts;
* read receipts;
* typing indicators;
* reactions;
* replies;
* forwarding;
* message editing;
* message deletion.

The conversation domain only establishes the authorization and persistence foundation those features will use.

---

# 60. NO PLACEHOLDERS

Do not leave:

* TODO;
* FIXME;
* pseudo-code;
* empty services;
* fake repositories;
* fake events;
* fake API responses;
* unimplemented permission checks;
* pretend database migrations;
* placeholder authorization.

Every implemented path must be functional.

---

# 61. BACKWARD COMPATIBILITY

Preserve existing behavior wherever possible.

If existing repository functionality conflicts with this implementation:

1. inspect the actual behavior;
2. determine compatibility requirements;
3. make the smallest safe change;
4. migrate data when necessary;
5. preserve API compatibility where practical;
6. document unavoidable breaking changes.

Never replace working identity/session functionality merely for stylistic reasons.

---

# 62. REQUIRED VALIDATION

Before considering this volume complete, actually run the applicable validation.

At minimum:

* TypeScript type checking;
* linting;
* formatting checks;
* Prisma generation;
* Prisma migration validation;
* unit tests;
* integration tests;
* API/E2E tests;
* application startup;
* health checks;
* relevant performance/query validation.

Fix discovered failures.

Do not claim success without actual validation.

---

# 63. IMPLEMENTATION ORDER

Use this implementation sequence unless repository constraints require a different safe order:

1. inspect repository;
2. inspect existing identity/security contracts;
3. inspect existing database/event infrastructure;
4. implement contact domain;
5. implement secure discovery;
6. implement conversation schema;
7. implement membership schema;
8. implement direct-conversation uniqueness;
9. implement direct conversation creation;
10. implement group creation;
11. implement membership operations;
12. implement roles and permissions;
13. implement ownership transfer;
14. implement conversation settings;
15. implement conversation listing;
16. implement authorization;
17. implement privacy/blocking enforcement;
18. implement domain events/outbox integration;
19. implement Redis caching only where justified;
20. implement API documentation;
21. implement tests;
22. execute complete validation;
23. fix all failures.

---

# 64. FINAL ENGINEERING REQUIREMENT

The completed implementation must leave the repository with a real, production-quality conversation and contact backend.

It must be:

* secure;
* transactional;
* concurrency-safe;
* privacy-aware;
* observable;
* scalable;
* testable;
* multi-device compatible;
* ready for real-time integration;
* ready for message authorization;
* compatible with the identity layer;
* compatible with future messaging, notification, synchronization, and moderation domains.

Do not merely describe the implementation.

**Inspect the actual repository and implement this backend volume completely.**
