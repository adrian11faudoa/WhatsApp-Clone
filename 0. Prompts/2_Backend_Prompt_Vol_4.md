# WhatsApp-Style Messaging Platform — Backend Prompt — Volume 4

## ROLE

You are the **Staff Backend Engineer, Search Systems Engineer, Moderation Systems Engineer, Analytics Engineer, and Administrative Platform Engineer** responsible for implementing the next bounded backend milestone for the **WhatsApp-style messaging platform**.

This is a **bounded backend implementation milestone**.

Operate with the combined responsibilities of:

* Staff Backend Engineer
* Distributed Systems Engineer
* Search Engineer
* Security Engineer
* Moderation Systems Engineer
* Analytics Engineer
* Database Architect
* Reliability Engineer
* Performance Engineer
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
* BullMQ or equivalent durable background-job infrastructure;
* Elasticsearch or OpenSearch where search is required;
* object storage for media;
* structured logging;
* OpenTelemetry-compatible observability;
* automated testing.

The completed backend is intended to support:

* private and group conversations;
* reliable messaging;
* reactions;
* presence;
* media;
* notifications;
* search;
* moderation;
* blocking;
* reporting;
* administrative operations;
* auditability;
* analytics;
* background processing;
* operational observability.

This prompt implements the **search, blocking/reporting, moderation, audit, and backend analytics foundations**.

---

# CURRENT BACKEND SCOPE

Implement:

* conversation/message search;
* authorization-aware search filtering;
* search indexing pipeline;
* search document lifecycle;
* index rebuild/reindex support;
* blocking;
* unblocking;
* blocked-user enforcement;
* abuse reporting;
* report persistence and lifecycle;
* moderation workflow foundation;
* moderation actions;
* administrative authorization foundation;
* security-sensitive audit events;
* moderation/admin audit trail;
* backend operational/product analytics event foundation;
* analytics event contracts;
* asynchronous analytics processing foundation;
* retention-aware event handling;
* relevant APIs;
* relevant realtime events where required;
* relevant background jobs;
* relevant Redis/queue integration;
* security controls;
* observability;
* automated tests;
* documentation.

This milestone must integrate with the existing:

* account;
* user;
* device/session;
* conversation;
* membership;
* message;
* reaction;
* media;
* notification;
* event;
* queue

models already present in the repository.

---

# OUT-OF-SCOPE

Do not implement:

* frontend moderation dashboards;
* mobile moderation UI;
* complete administrative web UI;
* machine-learning content classification;
* proprietary anti-spam models;
* full fraud-detection infrastructure;
* full business-intelligence dashboards;
* data warehouse provisioning;
* final Kubernetes/Terraform infrastructure;
* cross-region analytics infrastructure;
* advanced recommendation systems;
* unrelated billing or payments;
* end-to-end encryption.

Where an external search or analytics platform is unavailable, implement the real repository-level integration and adapter boundaries without fabricating successful external execution.

---

# SOURCE-OF-TRUTH MODEL

Inspect the actual repository before changing anything.

Treat the repository as authoritative for:

* message schema;
* conversation schema;
* user/account schema;
* membership;
* reactions;
* media;
* notification infrastructure;
* queues;
* events;
* Redis;
* authentication;
* authorization;
* configuration;
* observability.

Do not assume any previous AI prompt was executed merely because this prompt appears later in the planned sequence.

Integrate with what actually exists.

Preserve compatible behavior.

Do not create parallel implementations for an existing domain.

---

# IMPLEMENTATION DISCIPLINE

Before implementation:

1. Inspect the repository.
2. Identify existing search contracts.
3. Identify existing message and conversation authorization.
4. Identify current event and outbox infrastructure.
5. Identify current worker/queue infrastructure.
6. Identify existing Redis abstractions.
7. Identify existing security and authorization primitives.
8. Identify audit mechanisms.
9. Identify configuration conventions.
10. Implement only this prompt's scope.

Do not rewrite the messaging subsystem simply to support search.

Do not redesign authentication merely to add administration.

---

# SEARCH DOMAIN

Implement the backend search foundation for authorized conversation content and users where appropriate.

Search must remain a derived representation.

PostgreSQL or another authoritative transactional store remains the source of truth.

---

# SEARCH SCOPE

Support search functionality appropriate to the current product domain, including where applicable:

* message text;
* conversation metadata;
* user/profile lookup;
* group metadata.

Do not expose content a user is not authorized to access.

Search must not become an independent authorization system.

---

# SEARCH DOCUMENT MODEL

Define a search document representation that contains only searchable information.

A message search document should contain, where appropriate:

* message ID;
* conversation ID;
* sender ID;
* message type;
* searchable text;
* created timestamp;
* updated timestamp;
* deletion state;
* indexing version.

Do not index private or sensitive fields merely because they exist in PostgreSQL.

---

# SEARCH AUTHORIZATION

Every search request must evaluate authorization.

For message search, enforce:

* authenticated identity;
* conversation membership;
* blocking/privacy constraints where applicable;
* message visibility;
* deletion state.

Use authorization-aware filtering strategies.

Do not return a result merely because it exists in the search index.

---

# SEARCH INDEXING PIPELINE

Implement asynchronous indexing.

Index updates should be triggered by durable domain events such as:

* message_created;
* message_updated;
* message_deleted;
* conversation_updated;
* user_profile_updated.

The indexing process must be:

* retryable;
* idempotent;
* observable;
* version-aware.

Search indexing must not be required for the successful persistence of a normal message.

---

# SEARCH STALENESS

Define and implement the expected consistency behavior.

Search may be eventually consistent.

The API must not falsely guarantee that a just-created message is immediately searchable.

Document expected indexing latency behavior.

---

# SEARCH DELETION PROPAGATION

When a message becomes deleted or otherwise no longer searchable:

* update or remove the search document;
* prevent stale search results from exposing deleted content;
* support retry if indexing deletion fails.

Where eventual deletion is unavoidable, the primary search query must still apply current authorization and deletion-state checks where possible.

---

# SEARCH REINDEXING

Implement a controlled reindexing mechanism.

It must support:

* index creation;
* index versioning;
* controlled rebuild;
* batch processing;
* progress tracking;
* retry;
* resumability;
* failure reporting.

Do not perform a full production reindex from an HTTP request.

Use background jobs.

---

# SEARCH INDEX VERSIONING

Define an index-version strategy.

A schema change must allow:

* new index creation;
* dual-writing or controlled backfill where required;
* validation;
* cutover;
* cleanup of old index versions.

Do not require destructive in-place changes that prevent rollback.

---

# SEARCH QUERIES

Implement bounded search APIs.

Support:

* query validation;
* maximum query length;
* pagination;
* sorting;
* relevant filters;
* result limits;
* authorization;
* deleted-content exclusion.

Prevent expensive unrestricted wildcard or regex queries where the selected search platform makes those dangerous.

---

# SEARCH PERFORMANCE

Protect the backend against search abuse.

Apply:

* rate limiting;
* query length limits;
* result-size limits;
* timeouts;
* cancellation;
* provider-failure handling.

Search failures must not compromise message persistence.

---

# BLOCKING DOMAIN

Implement user blocking.

Support:

* block;
* unblock;
* list blocked users.

A block relationship must have a clear durable representation.

The implementation must be idempotent.

---

# BLOCKING SEMANTICS

Enforce blocking across applicable operations.

At minimum evaluate:

* direct message sending;
* conversation creation;
* presence visibility;
* last-seen visibility;
* typing indicators;
* profile access;
* notification generation;
* search.

Do not automatically delete historical messages solely because a user is blocked unless the product explicitly defines that behavior.

---

# BLOCKING CONCURRENCY

Handle:

* simultaneous block/unblock requests;
* requests while a block is being created;
* messages sent concurrently with a block;
* notification generation during block transitions.

Use authoritative database state.

Avoid race-prone application-only checks.

---

# REPORTING DOMAIN

Implement abuse/content reporting.

Support, as appropriate:

* reporting a user;
* reporting a message;
* reporting a conversation;
* reporting other supported content.

A report should capture:

* report ID;
* reporter;
* target type;
* target ID;
* category;
* description/reason where permitted;
* created time;
* status;
* moderation assignment metadata where required.

Do not expose internal moderation details to the reporter unless explicitly authorized.

---

# REPORT SECURITY

Prevent:

* anonymous unauthorized report manipulation where authentication is required;
* duplicate report flooding;
* report access by unauthorized users;
* report tampering;
* privilege escalation.

Apply rate limits and abuse controls to reporting.

---

# REPORT WORKFLOW

Implement a durable report state machine appropriate to the product.

Possible states may include:

* submitted;
* triaged;
* under_review;
* actioned;
* dismissed;
* closed.

Only include states actually needed.

Transitions must be permission-controlled and auditable.

---

# MODERATION DOMAIN

Implement the backend moderation foundation.

Support administrative moderation actions appropriate to the current product, such as:

* content removal;
* message visibility restriction;
* account restriction;
* account suspension;
* conversation restriction;
* user warning;
* report dismissal.

Do not implement arbitrary administrator powers.

Every moderation action must have:

* actor;
* target;
* action;
* timestamp;
* reason;
* audit reference.

---

# MODERATION AUTHORIZATION

Separate normal user authorization from moderation privileges.

Define appropriate roles and permissions.

Do not expose moderation endpoints to ordinary users.

Privilege checks must be server-side.

Do not trust role claims supplied directly by clients.

---

# MODERATION IDEMPOTENCY

Moderation actions must tolerate retries.

For destructive or restrictive actions:

* prevent unintended duplicate state;
* preserve audit history;
* reject conflicting stale updates appropriately.

---

# MODERATION AND MESSAGE VISIBILITY

Where moderation affects messages:

* persist the authoritative state;
* propagate changes through existing message/realtime mechanisms;
* update search indexing;
* invalidate relevant cache;
* preserve synchronization correctness.

Do not modify message data independently of the canonical message domain without a defined contract.

---

# ADMINISTRATION FOUNDATION

Implement backend primitives for administrative access.

Support:

* privileged authentication checks;
* role/permission checks;
* administrative audit context;
* scoped administrative queries;
* safe pagination;
* explicit operation authorization.

Do not implement the full administrator UI.

---

# ADMINISTRATIVE AUDIT

Audit administrative and moderation actions.

At minimum capture:

* actor;
* action;
* target;
* target type;
* timestamp;
* request/correlation ID;
* reason where required;
* relevant state transition;
* source information appropriate to operational needs.

Audit records must not contain unnecessary private message bodies.

---

# AUDIT IMMUTABILITY

Ordinary application code must not permit unauthorized modification of historical audit records.

Where physical immutability is not available, enforce strong append-oriented semantics and restricted administrative access.

Do not treat ordinary mutable business tables as sufficient audit evidence for privileged actions.

---

# ANALYTICS EVENT FOUNDATION

Implement a backend analytics event abstraction.

Analytics events must be separate from:

* operational logs;
* audit events;
* private message bodies.

An analytics event should contain, where appropriate:

* event ID;
* event type;
* actor/account ID where permitted;
* device context where necessary;
* timestamp;
* correlation ID;
* anonymized/aggregated metadata where appropriate;
* schema version;
* properties.

Do not collect sensitive content unnecessarily.

---

# ANALYTICS EVENT CATEGORIES

Support useful categories such as:

* account lifecycle;
* conversation lifecycle;
* messaging behavior metadata;
* media lifecycle metadata;
* notification lifecycle;
* search usage;
* security events;
* moderation metrics.

Do not send raw private message bodies into product analytics.

---

# ANALYTICS PRIVACY

Analytics collection must follow data minimization.

Do not collect:

* message bodies;
* raw notification contents;
* passwords;
* access tokens;
* private cryptographic material;
* unnecessary precise user data.

Where possible, prefer event IDs, aggregate identifiers, coarse metadata, or derived metrics.

---

# ANALYTICS PIPELINE

Create asynchronous analytics processing where justified.

The application should not depend on analytics processing for successful completion of critical user operations.

Analytics publication may use:

* event broker;
* queue;
* background worker;

according to the repository's current architecture.

Failures in analytics consumers must not block messaging.

---

# ANALYTICS EVENT VERSIONING

Define stable event names and explicit versions.

Consumers must be able to handle compatible schema evolution.

Do not silently rename analytics events.

---

# RETENTION

Define reasonable retention handling for:

* search documents;
* reports;
* audit records;
* analytics events.

Do not implement arbitrary indefinite retention.

Where retention periods depend on operational, contractual, or jurisdiction-specific policies not specified by the project, represent the policy as configuration rather than inventing legal requirements.

---

# SECURITY

Protect this milestone against:

* search authorization bypass;
* search scraping;
* unauthorized block manipulation;
* report flooding;
* report tampering;
* moderation privilege escalation;
* unauthorized audit access;
* analytics data leakage;
* search index exposure;
* stale deleted-content exposure.

All privileged operations must be explicitly authorized.

---

# PRIVACY

Protect:

* search results;
* blocked-user relationships;
* reports;
* moderation records;
* audit records;
* analytics events.

Do not expose reports or moderation evidence to unauthorized users.

Do not include private conversation content in ordinary analytics.

---

# EVENT AND QUEUE INTEGRATION

Use the existing event/outbox/queue architecture.

Where a new event is needed:

* define its name;
* version;
* producer;
* consumer;
* payload;
* idempotency behavior;
* retry behavior.

Do not bypass established event contracts with ad-hoc worker communication.

---

# REDIS USAGE

Redis may support:

* search query rate limiting;
* report flood protection;
* moderation operation rate limiting;
* temporary reindex coordination;
* short-lived administrative locks where genuinely necessary.

Every key must have:

* defined namespace;
* TTL where appropriate;
* cleanup strategy;
* failure behavior.

Redis must not become authoritative for moderation, reporting, audit, or analytics records.

---

# BACKGROUND JOBS

Implement jobs for:

* message indexing;
* profile indexing where appropriate;
* search document deletion;
* reindexing;
* analytics processing;
* report-related asynchronous work where needed;
* moderation propagation;
* retention cleanup where appropriate.

Each job must define:

* payload;
* retries;
* idempotency;
* timeout;
* backoff;
* concurrency;
* observability;
* dead-letter behavior.

---

# API SURFACE

Implement APIs appropriate to this milestone for:

* search;
* blocking;
* unblocking;
* blocked-user listing;
* report creation;
* report retrieval where authorized;
* moderation operations;
* administrative audit access where authorized.

Use the existing API conventions.

Do not expose internal search or moderation infrastructure directly.

---

# SEARCH API AUTHORIZATION

Search APIs must ensure that the authenticated user can only receive:

* conversations they can access;
* messages they can access;
* user information permitted by profile/privacy rules.

Do not rely solely on search-engine-side filters.

Use application-level authorization as a second boundary.

---

# ADMIN QUERY SAFETY

Administrative endpoints must use:

* bounded pagination;
* explicit filters;
* authorization;
* audit logging;
* rate limiting where appropriate.

Do not create arbitrary "run any database query" administrative functionality.

---

# MODERATION REALTIME EVENTS

Where moderation changes visible user state, integrate with the existing realtime event system.

Examples:

* message_moderated;
* conversation_restricted;
* account_restricted.

Only send events to users authorized to receive them.

---

# SEARCH AND DELETION CONSISTENCY

When:

* a message is deleted;
* a user is blocked;
* an account is disabled;
* content is moderated;

evaluate whether the search representation must be updated.

Search must not become a stale privacy bypass.

---

# ANALYTICS AND AUDIT SEPARATION

Keep these concerns distinct:

**Audit**

Answers:

> Who performed a privileged action, on what target, and when?

**Analytics**

Answers:

> What product or operational behavior occurred at aggregate/appropriate metadata level?

**Logs**

Answer:

> What happened operationally during system execution?

Do not merge these into one indiscriminate event stream.

---

# OBSERVABILITY

Instrument:

## Search

* query count;
* latency;
* zero-result rate;
* provider failures;
* indexing lag;
* indexing errors;
* reindex progress.

## Blocking

* block/unblock operations;
* authorization failures;
* conflict rates.

## Reporting

* report creation;
* duplicate reports;
* abuse-rate-limit events;
* workflow latency.

## Moderation

* action counts;
* authorization failures;
* workflow latency;
* action failures.

## Analytics

* event publication;
* processing latency;
* queue lag;
* failed consumers.

Do not log sensitive search queries or private content unnecessarily.

---

# PERFORMANCE

Protect high-risk paths.

Search:

* must be bounded;
* must have timeouts;
* must have result limits.

Moderation:

* must avoid unbounded admin queries.

Analytics:

* must not add synchronous latency to critical user actions.

Audit:

* must remain efficient enough not to create unacceptable latency for administrative operations.

---

# TESTING

Implement automated tests for this milestone.

## Search

Test:

* authorized search;
* unauthorized conversation exclusion;
* deleted-message exclusion;
* pagination;
* query limits;
* provider timeout;
* indexing retry;
* reindex recovery.

## Blocking

Test:

* block;
* unblock;
* duplicate block;
* concurrent block/unblock;
* message-send enforcement;
* presence enforcement;
* notification enforcement;
* search/privacy enforcement.

## Reporting

Test:

* valid report;
* invalid report;
* authorization;
* rate limiting;
* duplicate handling;
* workflow transitions.

## Moderation

Test:

* privileged action;
* unauthorized action;
* invalid transition;
* idempotent action;
* audit creation;
* realtime propagation where applicable.

## Administration

Test:

* role/permission checks;
* safe pagination;
* auditability;
* data-access restrictions.

## Analytics

Test:

* event creation;
* schema validation;
* asynchronous processing;
* retry;
* duplicate handling;
* privacy filtering.

---

# FAILURE TESTING

Test important failure conditions such as:

* search provider unavailable;
* indexing queue unavailable;
* analytics consumer failure;
* duplicate moderation request;
* report persistence failure;
* stale moderation state;
* audit write failure.

Critical user operations must degrade safely.

Analytics failure must not block messaging.

Search failure must not block durable message creation.

---

# DOCUMENTATION

Document:

* search API;
* search indexing lifecycle;
* blocking semantics;
* report lifecycle;
* moderation permissions;
* administrative API;
* audit model;
* analytics event model;
* retention configuration;
* relevant environment variables;
* operational metrics;
* reindex procedures.

Documentation must match actual implementation.

---

# FUTURE COMPATIBILITY

The implementation must remain compatible with:

* web administration interfaces;
* mobile privacy interfaces;
* infrastructure automation;
* data warehouse integration;
* advanced moderation systems;
* search scaling;
* multi-region deployment;
* QA automation.

Do not hardcode assumptions that make later administrative or operational tooling impossible.

---

# NO FAKE FUNCTIONALITY

Do not create:

* fake search results;
* fake moderation actions;
* fake analytics delivery;
* fake audit storage;
* fake search indexing;
* fake provider responses.

Where an external search or analytics platform cannot be exercised, report the limitation accurately.

---

# NO HARDCODED SECRETS

Do not hardcode:

* search credentials;
* analytics credentials;
* provider secrets;
* admin credentials;
* signing keys;
* API tokens.

Use configuration and secure secret management.

---

# VALIDATION

Before completion:

* run migrations;
* run unit tests;
* run integration tests;
* validate search contracts;
* validate authorization;
* validate moderation permissions;
* validate block enforcement;
* validate queue behavior;
* validate event behavior;
* run type checking;
* run linting;
* run formatting;
* run build validation;
* inspect the final diff.

Verify:

* unauthorized search access is impossible;
* blocked-user rules are enforced;
* privileged operations are audited;
* analytics do not contain private content;
* deleted content does not remain unintentionally searchable;
* no external provider success is fabricated;
* no unrelated code was changed.

---

# COMPLETION REPORT

After implementation, report:

* files created;
* files modified;
* files deleted, if any;
* search models and APIs;
* search indexing pipeline;
* reindexing mechanism;
* blocking implementation;
* reporting implementation;
* moderation implementation;
* administration/security changes;
* audit changes;
* analytics changes;
* background jobs;
* Redis/queue changes;
* database migrations;
* event changes;
* observability changes;
* tests added;
* tests executed;
* validation performed;
* documentation changes;
* compatibility considerations;
* unresolved issues;
* external blockers.

Do not claim that a search cluster, analytics warehouse, or external moderation provider was provisioned unless it was actually provisioned and verified.

---

# DEFINITION OF DONE

This backend milestone is complete only when:

* authorized search is implemented;
* search indexing is implemented;
* search deletion propagation is implemented;
* controlled reindexing is implemented;
* block/unblock is implemented;
* blocked-user enforcement is implemented across applicable backend behavior;
* reporting is implemented;
* report workflow is implemented;
* moderation authorization is implemented;
* moderation actions are implemented;
* administrative backend authorization is implemented;
* privileged actions are audited;
* analytics event infrastructure is implemented;
* analytics processing is asynchronous where required;
* retention behavior is configurable;
* relevant background jobs are implemented;
* security controls are implemented;
* privacy controls are implemented;
* observability is implemented;
* relevant automated tests exist and pass;
* documentation reflects actual behavior;
* no intentional implementation gaps remain within scope;
* the implementation remains compatible with later frontend, mobile, infrastructure, and QA work.

This Definition of Done applies only to **Backend Prompt — Volume 4**.

It does not require implementation of the complete backend platform.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as **Backend Prompt — Volume 4 only**.

Inspect the repository before making changes.

Implement only the search, blocking, reporting, moderation, administration, audit, and analytics scope defined here.

Do not implement the web frontend.

Do not implement mobile applications.

Do not implement final production infrastructure.

Do not invent another backend volume or project phase.

Do not depend on previous AI responses.

Use the repository as the authoritative representation of actual implementation state.

Preserve compatible existing behavior.

Implement real production-grade functionality within scope.

Run appropriate validation.

Inspect the final diff.

Provide the required completion report and accurately report what was implemented and verified.
