# WhatsApp-Style Messaging Platform — Frontend Prompt — Volume 2

## ROLE

You are the **Staff Frontend Engineer, Realtime Client Engineer, Media UX Engineer, Accessibility Engineer, Performance Engineer, Security Engineer, and QA Engineer** responsible for implementing the advanced messaging experience for the **WhatsApp-style messaging platform**.

This is a **bounded frontend implementation milestone**.

Operate with the combined responsibilities of:

* Staff Frontend Engineer
* Frontend Architect
* Realtime Client Engineer
* Media UX Engineer
* Accessibility Engineer
* Performance Engineer
* Security Engineer
* QA Engineer
* Technical Writer

Implement real, production-grade web functionality within the scope of this prompt.

Do not implement unrelated mobile, backend, infrastructure, or future frontend functionality.

---

# PROJECT

The project is an independently engineered **production-grade, globally scalable, WhatsApp-style real-time communications platform**.

The web client technology direction is:

* Next.js;
* React;
* TypeScript;
* Tailwind CSS;
* accessible reusable UI components;
* production-grade server-state/data-fetching;
* client-state management appropriate to the application;
* authenticated WebSocket communication;
* secure media access;
* automated testing.

The completed web application is intended to support:

* direct conversations;
* group conversations;
* text messaging;
* message replies;
* reactions;
* editing;
* deletion;
* delivery and read state;
* typing indicators;
* presence;
* attachments;
* images;
* video;
* audio;
* documents;
* message search;
* blocking;
* reporting;
* notifications;
* multi-device synchronization;
* responsive and accessible messaging.

This prompt implements the **advanced messaging experience**, including rich message interactions, realtime state, media attachments, presence, typing indicators, message search, and client-side synchronization behavior.

---

# CURRENT FRONTEND SCOPE

Implement:

* production-grade message timeline behavior;
* efficient message rendering;
* message grouping;
* message status indicators;
* replies;
* reactions;
* edit flows;
* deletion flows;
* typing indicators;
* online/offline presence;
* read/delivery state presentation;
* rich composer behavior;
* media attachment selection;
* upload lifecycle UI;
* image/video/audio/document presentation;
* media previews;
* retry/cancel behavior for uploads;
* message search;
* search result navigation;
* realtime synchronization;
* reconnect reconciliation;
* optimistic-update reconciliation;
* offline-aware pending message behavior;
* conversation-specific notification behavior;
* blocking/reporting user experiences where backend contracts exist;
* responsive messaging interactions;
* accessibility for advanced chat controls;
* advanced frontend tests;
* performance validation;
* documentation.

This volume extends the existing web foundation without redesigning the backend contracts.

---

# OUT-OF-SCOPE

Do not implement:

* backend message/media/search logic;
* backend schema redesign;
* push notification provider infrastructure;
* complete administration dashboard;
* mobile applications;
* production Kubernetes/Terraform;
* analytics infrastructure;
* end-to-end encryption;
* unsupported backend functionality.

Do not invent frontend-only substitutes for backend behavior that does not exist.

If a backend capability is unavailable, implement correct loading, unsupported, retry, or error states rather than fake success.

---

# SOURCE-OF-TRUTH MODEL

Inspect the actual repository before modifying it.

Treat the repository and the currently implemented backend contracts as authoritative.

Inspect:

* message APIs;
* WebSocket protocol;
* synchronization behavior;
* reaction endpoints;
* media APIs;
* notification contracts;
* search APIs;
* blocking/reporting endpoints;
* existing components;
* state-management architecture;
* API client;
* realtime client;
* tests.

Do not assume an earlier frontend or backend prompt was executed.

Do not refer to another AI conversation.

Do not create a second incompatible representation of the backend contracts.

---

# IMPLEMENTATION DISCIPLINE

Before making changes:

1. Inspect the current frontend implementation.
2. Identify existing message components.
3. Identify current message state management.
4. Identify existing realtime event handling.
5. Identify current API hooks/services.
6. Identify the media-upload contract.
7. Identify the search contract.
8. Identify blocking/reporting contracts.
9. Identify existing design-system components.
10. Implement only this prompt's scope.

Preserve compatible existing behavior.

Do not rewrite the entire chat interface simply to add one advanced interaction.

---

# MESSAGE TIMELINE ARCHITECTURE

Upgrade the message timeline into a production messaging interface.

Support:

* chronological ordering;
* server sequence ordering;
* grouped messages;
* date separators;
* sender identity;
* timestamps;
* pending state;
* sent/accepted state;
* delivered state;
* read state;
* edited state;
* deleted state;
* failed state;
* replies;
* reactions;
* attachments.

The timeline must reconcile server events with locally pending messages.

Never assume local optimistic state is authoritative.

---

# MESSAGE RENDERING MODEL

Create a composable message-rendering system that can safely render:

* text;
* reply references;
* image attachments;
* video attachments;
* audio attachments;
* document attachments;
* deleted messages;
* system messages where supported.

Unknown or unsupported message types must render safely without breaking the conversation.

Do not use unsafe raw HTML rendering for untrusted message content.

---

# MESSAGE GROUPING

Implement visually coherent sender/time grouping.

Grouping must remain stable when:

* older history is loaded;
* a realtime message arrives;
* a message is edited;
* a message is deleted;
* a message is reconciled after reconnect.

Do not allow local rendering heuristics to change message identity or ordering.

---

# VIRTUALIZATION AND LARGE HISTORY

Determine whether the current message volume and repository architecture justify virtualization.

If virtualization is required, implement it without compromising:

* scroll position;
* message ordering;
* keyboard accessibility;
* reply navigation;
* media loading;
* synchronization;
* date separators.

When older history is loaded, preserve the user's visual position rather than abruptly jumping to a different part of the conversation.

---

# SCROLL MANAGEMENT

Implement production chat scrolling behavior.

Support:

* initial scroll to the latest relevant position;
* preserving position while loading older messages;
* new-message arrival while user is reading history;
* "jump to latest" behavior;
* unread/new-message indicators;
* automatic scrolling only when the user is already near the bottom.

Do not force-scroll users away from content they are reading.

---

# REPLIES

Implement message replies.

Support:

* initiating a reply;
* previewing the referenced message;
* sending the reply;
* rendering the referenced message;
* navigating to the original message;
* handling deleted referenced messages;
* handling unavailable historical references.

Reply state must remain synchronized with server-authoritative message data.

---

# REACTIONS

Implement message reactions using the backend contract.

Support:

* reaction picker;
* adding;
* removing;
* selected state;
* counts;
* realtime reaction updates;
* optimistic interaction where safe;
* rollback after failure.

Do not allow duplicate optimistic reactions.

Reconcile a failed optimistic mutation with the server state.

---

# MESSAGE EDITING

Implement message-edit UI where supported.

Support:

* entering edit mode;
* pre-populating existing content;
* canceling;
* validation;
* saving;
* pending state;
* failure state;
* updated rendering;
* realtime reconciliation.

Clearly indicate edited state without exposing internal backend metadata.

Do not allow the UI to offer editing for unauthorized messages.

The backend remains authoritative for authorization.

---

# MESSAGE DELETION

Implement message deletion UI where supported.

Support:

* action menu;
* confirmation where appropriate;
* deleting for self/everyone according to backend capability;
* pending state;
* failure state;
* realtime update;
* synchronization after reconnect.

Do not make a deleted message permanently disappear locally before the server confirms a destructive operation unless the UX explicitly supports reversible optimistic behavior.

---

# DELIVERY AND READ STATE

Render delivery/read indicators based on backend-authoritative state.

Support:

* accepted/sent;
* delivered;
* read;
* pending;
* failed where applicable.

For multi-device state, do not assume a single local device event is sufficient to declare the account-level state complete.

---

# TYPING INDICATORS

Implement typing indicators.

Support:

* start;
* stop;
* debouncing;
* throttling;
* automatic expiration;
* connection loss cleanup;
* conversation scoping;
* accessible presentation.

Do not transmit typing events continuously on every keystroke.

Use the backend's realtime protocol.

---

# PRESENCE

Implement presence UI based on the backend contract.

Support:

* online;
* offline;
* recently active/last-seen where permitted;
* unknown/stale state;
* privacy-aware rendering.

Do not reveal presence when backend authorization/privacy rules prohibit it.

Do not infer presence solely from browser connectivity.

---

# REALTIME EVENT RECONCILIATION

Implement robust processing for:

* message_created;
* message_updated;
* message_deleted;
* message_delivered;
* message_read;
* reaction_added;
* reaction_removed;
* typing_started;
* typing_stopped;
* presence_changed;
* synchronization_required.

All event handlers must be idempotent.

Do not append duplicate messages.

Do not apply stale updates over newer server state.

Use server IDs and sequence/version metadata.

---

# EVENT ORDERING

Handle out-of-order events.

Examples:

* message update arrives before the original event;
* read state arrives before a local query finishes;
* deletion arrives before an older message page;
* reaction event arrives before the message is locally present.

Where required, defer, queue, reconcile, or trigger synchronization.

Do not silently discard events that can affect durable state.

---

# SYNCHRONIZATION ENGINE

Implement a client synchronization layer that can:

* track the last confirmed synchronization checkpoint;
* request missed state;
* merge server state;
* reconcile local pending operations;
* deduplicate events;
* update caches;
* resume realtime processing.

The synchronization engine must be deterministic.

Do not duplicate reconciliation logic independently inside individual React components.

---

# OPTIMISTIC MESSAGE SEND

Where the product UX uses optimistic sending:

1. generate a client-side message identity;
2. create pending local state;
3. submit using the backend idempotency contract;
4. reconcile with the server message;
5. update the canonical server ID and sequence;
6. remove/replace the temporary representation;
7. show a retryable error if the operation fails.

Do not create permanent duplicate messages when a request is retried.

---

# PENDING MESSAGE STATE

Support explicit pending states such as:

* pending;
* sending;
* accepted;
* failed;
* retrying.

Do not silently lose failed messages.

Allow retry only for operations the backend contract identifies as safe to retry.

---

# OFFLINE BEHAVIOR

Implement appropriate web offline awareness.

At minimum:

* identify network availability;
* preserve visible pending state;
* avoid destructive assumptions;
* trigger synchronization after reconnect;
* display appropriate degraded-state messaging.

Where durable local queues are not part of the current product scope, do not pretend that every offline message will automatically send later.

---

# MEDIA COMPOSER

Extend the composer to support attachments according to the backend media contract.

Support:

* selecting files;
* client-side size checks;
* supported-type checks;
* image preview;
* video preview where appropriate;
* audio/document representation;
* upload progress;
* cancellation;
* failure;
* retry;
* removal before send.

Client-side checks are for UX.

The backend remains authoritative.

---

# MEDIA UPLOAD FLOW

Implement the real upload flow exposed by the backend:

```text
Select file
  ↓
Validate locally
  ↓
Request upload authorization
  ↓
Upload to authorized storage target
  ↓
Track progress
  ↓
Wait for processing state
  ↓
Associate media with message
  ↓
Reconcile server message
```

Do not upload through arbitrary endpoints that bypass the backend's security model.

Do not store permanent unrestricted storage credentials in the browser.

---

# MEDIA UPLOAD SECURITY

Treat selected files as untrusted.

The client must:

* enforce size limits;
* reject obviously unsupported types;
* not trust filename extension alone;
* avoid executing uploaded content;
* avoid rendering untrusted HTML documents inline;
* respect signed URL expiration.

The backend remains responsible for authoritative validation.

---

# MEDIA PRESENTATION

Implement accessible presentation for:

* images;
* video;
* audio;
* documents.

Support:

* loading;
* error;
* unavailable;
* deleted;
* processing;
* expired access.

Do not assume media is always immediately ready.

---

# IMAGE EXPERIENCE

Implement appropriate image behavior:

* thumbnails;
* lazy loading;
* responsive sizing;
* lightbox/modal where appropriate;
* keyboard navigation;
* alt text or meaningful accessible descriptions;
* failure fallback.

Do not load original high-resolution assets unnecessarily in the message timeline.

---

# VIDEO AND AUDIO EXPERIENCE

Implement efficient playback behavior.

Support:

* play/pause;
* loading;
* playback failure;
* accessible controls;
* reasonable preload behavior.

Do not autoplay media unexpectedly.

Do not expose media controls that bypass access authorization.

---

# DOCUMENT EXPERIENCE

Represent documents with:

* filename;
* size;
* type where safe;
* download/open action;
* loading state;
* unavailable state.

Do not attempt to render potentially unsafe document formats inline without an explicit secure strategy.

---

# MEDIA PERFORMANCE

Optimize media rendering through:

* lazy loading;
* responsive media sizing;
* controlled preloading;
* thumbnail usage;
* viewport-aware loading;
* cleanup of unneeded object URLs;
* avoiding duplicate downloads.

Do not preload every image/video in a long conversation.

---

# SEARCH EXPERIENCE

Implement the web search interface against the backend search contract.

Support:

* search input;
* debounce where appropriate;
* loading state;
* result pagination;
* empty state;
* errors;
* result highlighting where safe;
* navigation to matching conversation/message;
* authorization-aware results.

Do not implement search filtering purely in the browser for server-side private data.

---

# SEARCH NAVIGATION

When a user selects a search result:

* navigate to the correct conversation;
* identify the target message;
* load the necessary history if not already present;
* scroll/focus the relevant message;
* preserve normal message ordering.

Do not assume the target message is present in the current page of history.

---

# SEARCH QUERY SAFETY

The client must enforce reasonable UX limits for:

* query length;
* request frequency;
* concurrent searches;
* cancellation of stale requests.

Do not send a search request on every keystroke without debounce/cancellation.

---

# BLOCKING UI

Implement user blocking controls where backend contracts exist.

Support:

* block;
* unblock;
* confirmation;
* resulting UI state;
* conversation behavior;
* privacy-aware messaging;
* error handling.

Do not assume blocking is purely a client-side visual state.

Refresh authoritative server state after the mutation.

---

# REPORTING UI

Implement reporting flows where backend contracts exist.

Support:

* report action;
* report category;
* optional reason;
* validation;
* submission state;
* success;
* failure;
* duplicate/report-limit errors.

Do not expose internal moderation workflow or evidence to ordinary users.

---

# NOTIFICATION UX

Integrate the notification-related UI required for this messaging experience.

Support, where appropriate:

* unread notifications;
* notification permissions/settings;
* notification-related banners;
* message notification preferences.

Do not create provider-specific client logic for server-controlled push delivery.

---

# RESPONSIVE MESSAGING UX

Advanced messaging must remain usable across:

* desktop;
* tablet;
* narrow mobile-web.

Ensure:

* composer remains accessible;
* attachment menus fit the viewport;
* message action menus are reachable;
* media previews are usable;
* search results remain navigable;
* reply/edit states do not break layout.

Avoid hover-only controls for essential actions.

---

# ACCESSIBILITY

All advanced messaging features must remain accessible.

Support:

* keyboard operation;
* focus management;
* screen-reader announcements for important realtime updates where appropriate;
* accessible reaction controls;
* accessible message action menus;
* accessible attachment pickers;
* accessible upload progress;
* accessible errors;
* reduced motion;
* logical tab order.

Do not use visual color changes as the only indication of message state.

---

# SECURITY

Protect against:

* XSS through message content;
* unsafe URL handling;
* malicious filenames;
* untrusted media previews;
* token leakage;
* signed URL leakage;
* private data appearing in browser logs;
* unauthorized client-side data caching;
* insecure local persistence.

Use safe URL parsing and rendering.

Do not inject arbitrary HTML from message content.

---

# CLIENT CACHE AND PRIVACY

Client-side cached conversation content must respect the security model.

Consider:

* logout clearing sensitive state;
* account switching;
* stale private content;
* browser persistence;
* shared-device risk.

Do not persist sensitive conversation data to long-lived browser storage without an explicit security justification.

---

# PERFORMANCE

Optimize advanced chat behavior for large histories and active conversations.

Measure and manage:

* message render cost;
* attachment render cost;
* realtime event processing;
* search requests;
* state updates;
* memory use;
* scroll performance.

Avoid unnecessary re-renders of the entire conversation when one message changes.

Use stable keys based on authoritative IDs.

---

# TESTING

Implement comprehensive automated tests for this milestone.

## Messages

Test:

* rendering;
* grouping;
* send;
* optimistic state;
* reconciliation;
* edit;
* delete;
* retry;
* delivery/read state.

## Replies and Reactions

Test:

* reply creation;
* navigation to referenced message;
* reaction add/remove;
* realtime reaction updates;
* optimistic rollback.

## Realtime

Test:

* connection;
* reconnect;
* event ordering;
* duplicate events;
* synchronization;
* sequence gaps;
* stale updates;
* concurrent query/realtime races.

## Presence and Typing

Test:

* typing start/stop;
* expiration;
* presence transitions;
* privacy handling.

## Media

Test:

* file validation;
* upload initiation;
* progress;
* cancellation;
* retry;
* processing state;
* media rendering;
* signed URL failure;
* deleted media.

## Search

Test:

* debounce;
* result loading;
* pagination;
* navigation;
* empty state;
* errors.

## Blocking and Reporting

Test:

* block;
* unblock;
* reporting;
* confirmation;
* authoritative state refresh.

## Accessibility

Test:

* keyboard behavior;
* focus management;
* accessible labels;
* live-region behavior;
* dialogs;
* menus;
* upload progress;
* media controls.

---

# REALTIME RACE-CONDITION TESTING

Explicitly test cases such as:

* realtime message arrives before the initial conversation request;
* duplicate message event;
* message send succeeds but acknowledgement arrives after reconnect;
* reaction event arrives before message hydration;
* deletion arrives while older history is loading;
* read event arrives while local state is stale;
* synchronization overlaps with realtime delivery.

The client must converge to the authoritative backend state.

---

# DOCUMENTATION

Update documentation covering:

* advanced message components;
* message state model;
* realtime reconciliation;
* synchronization;
* media upload flow;
* media rendering;
* search navigation;
* blocking/reporting;
* relevant client configuration;
* testing.

Documentation must reflect actual implementation.

---

# FUTURE COMPATIBILITY

The architecture and implementation must remain compatible with later:

* advanced notification UX;
* administration interfaces;
* richer profile settings;
* additional media capabilities;
* mobile clients;
* infrastructure changes;
* analytics integration.

Do not hardcode assumptions that prevent those features.

---

# NO FAKE FUNCTIONALITY

Do not create:

* fake search results;
* fake media processing;
* fake upload completion;
* fake realtime state;
* fake push delivery;
* fake moderation responses.

Use explicit unavailable/error/loading states where backend functionality is not available.

---

# NO HARDCODED SECRETS

Never hardcode:

* API keys;
* push credentials;
* storage credentials;
* tokens;
* private keys;
* production secrets.

Never expose server-only credentials through client-exposed environment variables.

---

# VALIDATION

Before completion:

* run unit/component tests;
* run integration tests where configured;
* run type checking;
* run linting;
* run formatting;
* run production build validation;
* validate WebSocket flows;
* validate media upload flows;
* validate search flows;
* validate responsive behavior;
* validate accessibility where tooling permits;
* inspect the final diff.

Verify:

* no unauthorized data rendering;
* no unsafe HTML rendering;
* no credential leakage;
* no fake backend functionality;
* no significant unbounded rendering costs;
* no unrelated modifications.

---

# COMPLETION REPORT

After implementation, report:

* files created;
* files modified;
* files deleted, if any;
* message timeline changes;
* reply implementation;
* reaction implementation;
* edit/delete implementation;
* realtime reconciliation;
* synchronization changes;
* typing/presence UI;
* media upload and rendering;
* search UI;
* blocking/reporting UI;
* notification UX changes;
* accessibility work;
* performance work;
* tests added;
* tests executed;
* validation performed;
* documentation changes;
* compatibility considerations;
* unresolved issues;
* backend/external blockers.

Do not claim backend functionality was verified if it was not accessible in the execution environment.

---

# DEFINITION OF DONE

This frontend milestone is complete only when:

* the production message timeline is implemented;
* large-history behavior is performant and stable;
* message send/reconciliation is implemented;
* replies are implemented;
* reactions are implemented;
* edit/delete behavior is implemented;
* delivery/read state is rendered;
* typing indicators are implemented;
* presence is implemented;
* realtime event reconciliation is robust;
* synchronization and reconnect behavior are implemented;
* pending/failed message states are implemented;
* media selection/upload/rendering is implemented against real backend contracts;
* media failures are handled;
* search is implemented;
* search navigation is implemented;
* blocking UI is implemented where supported;
* reporting UI is implemented where supported;
* advanced accessibility requirements are satisfied;
* security controls are applied;
* relevant automated tests exist and pass;
* documentation reflects actual behavior;
* no intentional implementation gaps remain within scope;
* the UI remains compatible with the existing backend architecture and future client capabilities.

This Definition of Done applies only to **Frontend Prompt — Volume 2**.

It does not require implementation of the complete web application.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as **Frontend Prompt — Volume 2 only**.

Inspect the repository before making changes.

Implement only the advanced messaging, realtime reconciliation, media UX, search, blocking/reporting, presence, typing, and synchronization scope defined here.

Do not implement mobile applications.

Do not redesign the backend.

Do not implement final production infrastructure.

Do not implement unrelated administration or analytics interfaces.

Do not invent another frontend volume or project phase.

Do not depend on previous AI responses.

Use the repository and actually available backend contracts as the source of truth.

Preserve compatible existing behavior.

Implement real production-grade functionality within scope.

Run appropriate validation.

Inspect the final diff.

Provide the required completion report and accurately report what was implemented and verified.
