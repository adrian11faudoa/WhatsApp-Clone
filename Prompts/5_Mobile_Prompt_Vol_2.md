# WhatsApp-Style Messaging Platform — Mobile Prompt — Volume 2

## ROLE

You are the **Staff Mobile Engineer, Realtime Client Engineer, Media Systems Engineer, Offline-Synchronization Engineer, Push Notification Engineer, Accessibility Engineer, Security Engineer, Performance Engineer, and QA Engineer** responsible for implementing the advanced mobile messaging experience for the **WhatsApp-style messaging platform**.

This is a **bounded mobile implementation milestone**.

Operate with the combined responsibilities of:

* Staff Mobile Engineer
* Mobile Architect
* React Native Engineer
* Expo Engineer
* Realtime Client Engineer
* Offline-Synchronization Engineer
* Media Systems Engineer
* Push Notification Engineer
* Security Engineer
* Performance Engineer
* Accessibility Engineer
* QA Engineer
* Technical Writer

Implement real, production-grade mobile functionality within the scope of this prompt.

Do not implement unrelated web, backend, infrastructure, or future mobile functionality.

---

# PROJECT

The project is an independently engineered **production-grade, globally scalable, WhatsApp-style real-time communications platform**.

The mobile client technology direction is:

* React Native;
* Expo;
* TypeScript;
* secure platform storage;
* authenticated REST communication;
* authenticated WebSocket communication;
* durable client synchronization;
* offline-aware state management;
* push-notification integration;
* production-grade media handling;
* automated testing.

The completed mobile applications are intended to support:

* direct messaging;
* group messaging;
* replies;
* reactions;
* editing;
* deletion;
* delivery/read state;
* typing indicators;
* presence;
* images;
* video;
* audio;
* documents;
* media upload and processing;
* push notifications;
* notification preferences;
* multi-device synchronization;
* offline operation;
* search;
* blocking;
* reporting;
* privacy;
* group management.

This prompt implements the **advanced mobile messaging experience**, including rich messaging, media handling, push notifications, presence, typing indicators, reactions, message editing/deletion, and robust offline/reconnect reconciliation.

---

# CURRENT MOBILE SCOPE

Implement:

* production-grade message timeline;
* efficient large-history rendering;
* replies;
* reactions;
* message editing;
* message deletion;
* delivery/read state;
* typing indicators;
* presence;
* rich message composer;
* image/media selection;
* upload lifecycle;
* image/video/audio/document presentation;
* media processing states;
* push-notification registration foundation;
* notification handling;
* foreground/background notification behavior;
* notification navigation;
* advanced realtime event reconciliation;
* offline message state;
* pending-message retry;
* synchronization after reconnect;
* multi-device state reconciliation;
* account/device isolation;
* advanced accessibility;
* performance hardening;
* automated tests;
* documentation.

This milestone extends the mobile foundation without redesigning backend contracts.

---

# OUT-OF-SCOPE

Do not implement:

* backend message/media/notification logic;
* backend schema redesign;
* web application;
* production cloud infrastructure;
* complete search;
* complete moderation/admin interfaces;
* final infrastructure-as-code;
* end-to-end encryption;
* unsupported native capabilities;
* fabricated push-provider behavior.

Use the actual backend contracts available in the repository or provided project artifacts.

---

# SOURCE-OF-TRUTH MODEL

Inspect the actual repository before modifying it.

Treat the repository and available backend contracts as authoritative.

Inspect:

* message APIs;
* realtime protocol;
* synchronization contract;
* reaction APIs;
* media-upload contract;
* media lifecycle;
* push-token registration;
* notification contract;
* presence contract;
* typing events;
* device/session model;
* existing navigation;
* existing secure storage;
* state-management infrastructure;
* native project configuration.

Do not assume another AI conversation exists.

Do not assume Mobile Prompt — Volume 1 was executed merely because this prompt follows it in the planned sequence.

Use actual repository state.

If a capability is unavailable, implement an accurate unavailable/error state rather than fake success.

---

# IMPLEMENTATION DISCIPLINE

Before making changes:

1. Inspect the current mobile application.
2. Identify the existing message model and rendering system.
3. Identify the realtime event handling.
4. Identify synchronization behavior.
5. Identify media APIs.
6. Identify push-notification APIs.
7. Identify current secure storage.
8. Identify platform-specific configuration.
9. Identify test infrastructure.
10. Implement only this prompt's scope.

Preserve compatible behavior.

Do not replace working native integrations unnecessarily.

---

# MESSAGE TIMELINE ARCHITECTURE

Upgrade the message list into a production-grade messaging experience.

Support:

* chronological ordering;
* server sequence;
* sender grouping;
* date separators;
* pending;
* sending;
* accepted;
* delivered;
* read;
* failed;
* edited;
* deleted;
* replies;
* reactions;
* attachments.

The timeline must reconcile:

* local optimistic messages;
* server acknowledgements;
* realtime events;
* synchronization responses;
* edits;
* deletions.

Server state is authoritative.

---

# LARGE HISTORY PERFORMANCE

Use an efficient list architecture suitable for long conversations.

Consider:

* FlatList or the project's selected optimized list mechanism;
* stable message IDs;
* memoized rows;
* bounded rendering;
* incremental pagination;
* viewport-based media loading.

When loading older messages, preserve the user's visual position.

Do not cause a visible jump to the newest message when the user is reading history.

---

# SCROLL BEHAVIOR

Implement:

* initial positioning;
* automatic scroll when appropriate;
* "new messages" indicator;
* jump-to-latest;
* scroll preservation;
* loading older history;
* target-message navigation.

Do not automatically scroll when the user is intentionally reading older messages.

---

# REPLIES

Implement message replies.

Support:

* selecting a message;
* entering reply mode;
* reply preview;
* sending;
* rendering referenced content;
* navigation to referenced message;
* unavailable/deleted reference handling.

Ensure reply state survives reconnect and synchronization.

---

# REACTIONS

Implement reactions according to the backend contract.

Support:

* reaction picker;
* adding;
* removing;
* selected state;
* counts;
* realtime updates;
* optimistic interaction;
* rollback;
* multiple devices.

Do not create duplicate local reaction state when the server event arrives.

---

# MESSAGE EDITING

Implement edit functionality where authorized.

Support:

* enter edit mode;
* prefill current content;
* save;
* cancel;
* validation;
* pending state;
* failure;
* server reconciliation;
* realtime propagation.

Do not expose editing controls for messages the user is not authorized to edit.

The backend remains authoritative.

---

# MESSAGE DELETION

Implement deletion flows supported by the backend.

Support:

* deletion action;
* confirmation where appropriate;
* self-delete/everyone-delete semantics where available;
* pending state;
* failure;
* realtime propagation;
* synchronization after reconnect.

Do not permanently remove local data before destructive confirmation unless the UX deliberately supports reversible optimistic behavior.

---

# DELIVERY AND READ STATE

Render server-authoritative:

* accepted;
* delivered;
* read;
* pending;
* failed.

For multiple devices, reconcile state rather than assuming the current device is the sole source of truth.

---

# TYPING INDICATORS

Implement:

* typing start;
* typing stop;
* debounce;
* throttle;
* expiration;
* disconnect cleanup;
* conversation scoping;
* accessible presentation.

Do not send a network event for every keystroke.

Stop typing state reliably when:

* message is sent;
* composer loses focus where appropriate;
* conversation changes;
* connection is lost.

---

# PRESENCE

Implement presence UI according to backend privacy rules.

Support:

* online;
* offline;
* last-seen where permitted;
* stale/unknown;
* multiple-device aggregation as provided by the backend.

Do not infer authoritative online status solely from the mobile device's network state.

---

# MESSAGE EVENT RECONCILIATION

Process:

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

Event processing must be:

* idempotent;
* sequence-aware;
* safe against duplication;
* safe against stale events.

Do not blindly mutate local state based solely on arrival order.

---

# OUT-OF-ORDER EVENTS

Handle scenarios such as:

* update before creation;
* delete before hydration;
* read before message query completion;
* reaction before message rendering;
* synchronization overlapping realtime events.

When required:

* queue the event;
* reconcile later;
* fetch authoritative state;
* trigger synchronization.

Do not silently discard important state transitions.

---

# OFFLINE MESSAGE MODEL

Implement explicit local states for messages that are created or modified while connectivity is unavailable or interrupted, within the capabilities supported by the backend contract.

A local message may be:

* draft;
* pending;
* sending;
* accepted;
* failed;
* retryable.

Do not present an unconfirmed local message as permanently delivered.

---

# MESSAGE RETRY

Implement safe retry behavior.

Retry must reuse the backend's client-message identity/idempotency mechanism so a transient failure cannot create duplicate messages.

Do not create a new logical message merely because the previous network attempt failed.

---

# OFFLINE SYNCHRONIZATION

When network connectivity returns:

1. restore authenticated state;
2. reconnect realtime;
3. establish synchronization checkpoint;
4. reconcile server state;
5. retry only explicitly retryable pending operations;
6. reconcile resulting server messages;
7. update local state;
8. resume realtime event processing.

Do not retry indefinitely.

Do not send operations that the backend has already acknowledged.

---

# LOCAL PERSISTENCE

Persist only data required to provide the intended user experience.

Where local persistence is used, define:

* schema/version;
* expiration;
* account ownership;
* migration;
* invalidation;
* logout cleanup.

Do not store sensitive information in plaintext storage where secure platform storage is required.

---

# MEDIA COMPOSER

Extend the composer to support:

* camera/photo library selection where the project permits;
* document selection;
* media preview;
* media removal;
* text plus attachment composition;
* upload progress;
* cancellation;
* retry;
* processing state.

Use platform capabilities through appropriate Expo/React Native APIs.

---

# MEDIA VALIDATION

Perform client-side validation for:

* file size;
* supported media type;
* obvious invalid selections;
* maximum attachment count where applicable.

Client validation improves UX but does not replace backend validation.

Do not assume a file is safe because the OS picker allowed selecting it.

---

# MEDIA UPLOAD

Implement the real backend-defined upload flow.

Support:

```text
Select media
  ↓
Local validation
  ↓
Create upload intent
  ↓
Obtain authorized upload access
  ↓
Upload
  ↓
Display progress
  ↓
Wait for processing
  ↓
Attach media to message
  ↓
Reconcile final message
```

Do not embed cloud-storage credentials in the mobile application.

---

# UPLOAD RESILIENCE

Handle:

* upload cancellation;
* app backgrounding where feasible;
* connection loss;
* signed URL expiry;
* retryable failure;
* permanent failure;
* processing delay.

Do not create a message claiming media is ready when the backend reports processing is still pending.

---

# MEDIA PRESENTATION

Implement accessible mobile presentation for:

* images;
* videos;
* audio;
* documents.

Support:

* loading;
* progress;
* unavailable;
* processing;
* failed;
* deleted/expired.

Use appropriate native/media components.

Do not automatically load full-resolution media for every item in a long conversation.

---

# IMAGE EXPERIENCE

Implement:

* thumbnails;
* responsive sizing;
* full-screen preview where appropriate;
* pinch-to-zoom if supported by selected components;
* loading placeholders;
* error fallback;
* accessible descriptions.

Release unnecessary image resources appropriately.

---

# VIDEO EXPERIENCE

Implement:

* playback;
* pause/resume;
* buffering;
* failure state;
* full-screen where appropriate;
* accessible controls.

Do not autoplay media unexpectedly.

Respect application and device lifecycle.

---

# AUDIO EXPERIENCE

Implement:

* play/pause;
* progress;
* duration;
* buffering/loading;
* failure state;
* lifecycle cleanup.

Ensure one audio item does not unexpectedly interfere with unrelated application state.

---

# DOCUMENT EXPERIENCE

Display:

* filename;
* size;
* document type where safe;
* download/open action;
* loading;
* unavailable.

Do not open arbitrary untrusted files in an unsafe embedded renderer.

---

# PUSH NOTIFICATION FOUNDATION

Implement device push-token registration according to the backend contract.

Support:

* permission state;
* token registration;
* token refresh;
* device association;
* logout/unregistration where required;
* invalid-token handling.

Do not assume notification permission is always granted.

---

# NOTIFICATION PERMISSIONS

Implement appropriate user-facing permission flows.

The application must:

* request permissions at an appropriate point;
* explain the value before asking where UX requires it;
* handle denial;
* handle restricted state;
* provide a path to system settings when appropriate.

Do not continuously prompt users who have denied permission.

---

# PUSH NOTIFICATION HANDLING

Handle notifications in:

* foreground;
* background;
* terminated/app-launch state.

Support safe navigation to:

* a conversation;
* a message;
* an appropriate notification surface.

Validate all notification navigation data before using it.

Do not trust notification payloads as authorization.

---

# NOTIFICATION PRIVACY

Never display sensitive notification content when user preferences or platform privacy requirements prohibit it.

Support generic notification presentation where required.

Do not place:

* access tokens;
* session secrets;
* private cryptographic material

in notification payloads.

---

# NOTIFICATION DEDUPLICATION

Prevent duplicated handling when the same notification is processed through multiple application lifecycle paths.

Use stable notification identifiers where available.

Do not open the same conversation multiple times because multiple notification callbacks fire.

---

# DEEP LINK / NOTIFICATION NAVIGATION

When a notification targets a conversation:

1. authenticate;
2. validate the target;
3. confirm authorization through normal server state;
4. navigate;
5. synchronize required conversation state;
6. focus the relevant message where possible.

Do not trust a notification payload to prove conversation access.

---

# ACCOUNT/DEVICE ISOLATION

When logging out:

* unregister or deactivate the device token according to backend semantics;
* close realtime connection;
* clear account-specific caches;
* clear pending account-specific operations;
* clear private local state as appropriate.

When another account signs in, no previous account state may remain visible.

---

# APP LIFECYCLE

Handle:

* foreground;
* background;
* suspended;
* resumed;
* process restart.

Coordinate:

* realtime connections;
* uploads;
* synchronization;
* push notifications;
* local persistence.

Avoid holding unnecessary network resources while the application is suspended.

---

# BACKGROUND OPERATIONS

For operations that must continue beyond the active UI, use supported platform mechanisms rather than relying on a permanently running JavaScript context.

Do not claim guaranteed background execution where the target platform does not provide that guarantee.

When an operation cannot continue reliably in the background, persist enough state to resume or recover later.

---

# ACCESSIBILITY

Advanced mobile interactions must support:

* screen readers;
* accessible labels;
* logical focus;
* sufficiently large touch targets;
* understandable message-state announcements;
* accessible media controls;
* accessible reaction pickers;
* accessible upload progress;
* accessible error messages.

Avoid announcing every low-value realtime event to assistive technologies.

Use appropriate priorities.

---

# SECURITY

Protect against:

* token leakage;
* malicious deep links;
* unauthorized local cache access;
* unsafe file handling;
* insecure notification navigation;
* WebSocket spoofing;
* private-data telemetry;
* account-switch leakage.

Treat all notification and deep-link data as untrusted.

---

# PERFORMANCE

Optimize:

* message-list rendering;
* media decoding;
* image memory;
* notification handling;
* realtime event processing;
* synchronization;
* offline persistence;
* startup.

Avoid loading every historical attachment into memory.

Use stable IDs and efficient selectors.

---

# MEMORY MANAGEMENT

Monitor for:

* unbounded message history in memory;
* large image retention;
* abandoned media objects;
* stale event queues;
* duplicate caches.

Release resources when leaving large media viewers or conversations where appropriate.

---

# TESTING

Implement comprehensive automated testing for this milestone.

## Messaging

Test:

* send;
* retry;
* optimistic state;
* reconciliation;
* edit;
* delete;
* reply;
* reactions;
* delivery/read state.

## Realtime

Test:

* connection;
* reconnect;
* authentication;
* duplicate events;
* out-of-order events;
* synchronization;
* sequence gaps.

## Offline

Test:

* offline startup;
* pending messages;
* retry;
* reconnect;
* duplicate prevention;
* synchronization recovery.

## Media

Test:

* selection;
* validation;
* upload;
* cancellation;
* retry;
* signed URL expiration;
* processing;
* rendering;
* failure.

## Notifications

Test:

* permission flow;
* token registration;
* token refresh;
* foreground handling;
* background handling;
* launch navigation;
* deduplication;
* privacy behavior.

## Security

Test:

* logout cleanup;
* account isolation;
* deep-link validation;
* notification navigation authorization;
* secure storage access boundaries.

## Accessibility

Test:

* message actions;
* media controls;
* reaction controls;
* upload progress;
* screen-reader labels;
* touch targets.

---

# FAILURE TESTING

Test:

* network loss during message submission;
* network loss during media upload;
* token expiration during synchronization;
* WebSocket failure;
* push-token registration failure;
* notification permission denial;
* signed upload URL expiration;
* media processing failure;
* local persistence failure where practical.

The application must fail predictably and provide recovery behavior where possible.

---

# DOCUMENTATION

Update mobile documentation covering:

* message state;
* offline behavior;
* synchronization;
* media architecture;
* push-token lifecycle;
* notification handling;
* background/foreground behavior;
* platform-specific considerations;
* account isolation;
* testing.

Documentation must match actual implementation.

---

# FUTURE COMPATIBILITY

The implementation must remain compatible with later mobile functionality including:

* search;
* blocking;
* reporting;
* privacy/settings;
* group management;
* advanced notification preferences;
* administrative or support experiences where applicable.

Do not create incompatible native navigation or state structures.

---

# NO FAKE FUNCTIONALITY

Do not create:

* fake upload completion;
* fake push delivery;
* fake notification provider responses;
* fake media processing;
* fake offline synchronization;
* fake presence.

Represent unavailable capabilities honestly.

---

# NO HARDCODED SECRETS

Never hardcode:

* push credentials;
* storage credentials;
* API keys;
* authentication secrets;
* private keys;
* cloud credentials.

Anything inside the mobile bundle must be assumed discoverable.

---

# VALIDATION

Before completion:

* run unit tests;
* run component tests;
* run integration tests where configured;
* run TypeScript checks;
* run linting;
* run formatting;
* validate Expo build/bundling;
* validate navigation;
* validate realtime;
* validate synchronization;
* validate media flows;
* validate notifications;
* validate account isolation;
* validate accessibility where tooling permits;
* inspect the final diff.

Where iOS or Android validation cannot be executed in the available environment, report exactly what remains unverified.

---

# COMPLETION REPORT

After implementation, report:

* files created;
* files modified;
* files deleted, if any;
* advanced message UI;
* replies;
* reactions;
* edit/delete;
* delivery/read state;
* typing/presence;
* offline/reconnect behavior;
* synchronization;
* media composer;
* upload flow;
* media rendering;
* push-token registration;
* notification handling;
* notification navigation;
* lifecycle behavior;
* accessibility improvements;
* performance improvements;
* tests added;
* tests executed;
* validation performed;
* documentation changes;
* compatibility considerations;
* unresolved issues;
* platform/external blockers.

Do not claim that push-provider or cloud-storage functionality was verified if the required external environment was unavailable.

---

# DEFINITION OF DONE

This mobile milestone is complete only when:

* advanced message rendering is implemented;
* replies are implemented;
* reactions are implemented;
* edit/delete is implemented;
* delivery/read state is implemented;
* typing indicators are implemented;
* presence is implemented;
* offline/pending message handling is implemented;
* safe message retry is implemented;
* reconnect synchronization is implemented;
* media selection is implemented;
* secure media upload is integrated;
* media processing states are represented;
* image/video/audio/document presentation is implemented;
* push-token registration is implemented;
* notification permissions are handled;
* notification lifecycle handling is implemented;
* notification navigation is secure;
* account/device isolation is implemented;
* advanced accessibility requirements are satisfied;
* performance and memory behavior are addressed;
* relevant automated tests exist and pass;
* documentation reflects actual behavior;
* no intentional implementation gaps remain within scope;
* the implementation remains compatible with later search, privacy, group-management, and reporting work.

This Definition of Done applies only to **Mobile Prompt — Volume 2**.

It does not require implementation of the complete mobile application.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as **Mobile Prompt — Volume 2 only**.

Inspect the repository before making changes.

Implement only the advanced messaging, offline/reconnect, synchronization, media, presence, typing, reactions, push-token, notification, and mobile lifecycle scope defined here.

Do not implement the web frontend.

Do not redesign the backend.

Do not implement final production infrastructure.

Do not implement complete search, moderation, administration, or analytics interfaces.

Do not invent another mobile volume or project phase.

Do not depend on previous AI responses.

Use the repository and actually available backend contracts as the source of truth.

Preserve compatible existing behavior.

Implement real production-grade functionality within scope.

Run appropriate validation.

Inspect the final diff.

Provide the required completion report and accurately report what was implemented and verified.
