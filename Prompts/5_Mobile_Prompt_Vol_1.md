# WhatsApp-Style Messaging Platform — Mobile Prompt — Volume 1

## ROLE

You are the **Staff Mobile Engineer, Mobile Architect, React Native Engineer, Security Engineer, Performance Engineer, Accessibility Engineer, Offline-Synchronization Engineer, and QA Engineer** responsible for implementing the foundational mobile applications for the **WhatsApp-style messaging platform**.

This is a **bounded mobile implementation milestone**.

Operate with the combined responsibilities of:

* Staff Mobile Engineer
* Mobile Architect
* React Native Engineer
* Expo Engineer
* Realtime Client Engineer
* Offline-Synchronization Engineer
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
* production-grade navigation;
* secure credential/session storage;
* typed API integration;
* authenticated WebSocket communication;
* persistent client state only where appropriate;
* offline/network resilience;
* push-notification integration boundaries;
* automated testing.

The completed mobile applications are intended to support:

* account creation and authentication;
* profiles;
* devices and sessions;
* direct conversations;
* group conversations;
* messaging;
* message synchronization;
* replies;
* reactions;
* delivery/read state;
* typing indicators;
* presence;
* attachments;
* media;
* notifications;
* search;
* blocking;
* reporting;
* privacy settings;
* group management;
* responsive and accessible mobile interactions.

This prompt implements the **mobile application foundation, navigation, authentication, secure session handling, account/profile foundation, conversation discovery, and foundational chat architecture**.

---

# CURRENT MOBILE SCOPE

Implement:

* Expo/React Native application foundation;
* TypeScript configuration;
* navigation architecture;
* application bootstrap;
* environment/configuration handling;
* secure authentication/session management;
* secure token/session storage;
* account/profile foundation;
* conversation list;
* direct conversation entry;
* group conversation entry;
* foundational chat screen;
* message timeline foundation;
* message composer foundation;
* API client;
* server-state management;
* client-state boundaries;
* authenticated WebSocket foundation;
* reconnect behavior;
* synchronization foundation;
* network-state detection;
* mobile loading/error/empty states;
* accessibility foundation;
* iOS/Android behavior appropriate to scope;
* test infrastructure;
* mobile development documentation.

This milestone establishes the mobile foundation for later volumes implementing advanced media, realtime messaging, offline synchronization, notifications, search, settings, and group-management experiences.

---

# OUT-OF-SCOPE

Do not implement:

* backend logic;
* backend schema changes;
* web application;
* production cloud infrastructure;
* Kubernetes/Terraform;
* complete media upload workflows;
* complete push notification handling;
* advanced search;
* complete moderation/admin features;
* advanced offline message queueing beyond the synchronization foundation;
* end-to-end encryption;
* unsupported native functionality.

Do not fabricate APIs or backend behavior that the repository does not actually provide.

---

# SOURCE-OF-TRUTH MODEL

Inspect the actual mobile repository before modifying it.

Treat the repository and available backend contracts as authoritative.

Inspect:

* Expo configuration;
* React Native configuration;
* package manager;
* navigation;
* API client;
* authentication;
* secure storage;
* state management;
* realtime integration;
* existing screens;
* existing components;
* tests;
* environment configuration;
* platform configuration.

Do not assume another AI conversation exists.

Do not assume a previous mobile or backend prompt was executed merely because it appears earlier in the prompt sequence.

Use actual repository state and available project contracts.

---

# IMPLEMENTATION DISCIPLINE

Before changing code:

1. Inspect the repository.
2. Identify existing mobile architecture.
3. Identify navigation.
4. Identify authentication/session handling.
5. Identify secure storage.
6. Identify API contracts.
7. Identify realtime contracts.
8. Identify available conversation/message endpoints.
9. Identify current tests.
10. Implement only this prompt's scope.

Preserve compatible functionality.

Do not replace working native configuration without a concrete reason.

---

# MOBILE ARCHITECTURE

Establish clear boundaries between:

* application bootstrap;
* navigation;
* authentication;
* account/profile;
* conversations;
* chat;
* API;
* realtime;
* server state;
* client state;
* persistent storage;
* platform services;
* shared UI;
* validation;
* error handling.

Do not put server-authoritative business state into arbitrary component-local state.

Do not create separate competing API clients.

---

# APPLICATION BOOTSTRAP

Implement the mobile application bootstrap.

Handle:

* initialization;
* configuration validation;
* persistent storage initialization;
* authentication restoration;
* navigation readiness;
* network-state initialization;
* global error boundaries;
* safe startup failure states.

Do not display authenticated screens before the authentication state has been resolved.

---

# ENVIRONMENT CONFIGURATION

Implement typed mobile configuration.

Clearly separate:

* public client configuration;
* environment-specific values;
* server-only secrets that must never enter the mobile bundle.

Never embed:

* private API keys;
* signing secrets;
* database credentials;
* cloud credentials;
* private provider credentials.

Remember that anything bundled into a mobile application should be treated as potentially discoverable by an attacker.

---

# NAVIGATION ARCHITECTURE

Implement navigation separating:

* authentication stack;
* authenticated application stack;
* conversation screens;
* settings/account areas that belong to this milestone.

Support:

* startup/authentication routing;
* deep navigation into conversations;
* back behavior;
* Android back handling;
* safe navigation after logout/session expiration.

Do not allow stale authenticated screens to remain accessible after session invalidation.

---

# AUTHENTICATION EXPERIENCE

Implement the authentication flows supported by the backend.

Support appropriate:

* registration;
* login;
* logout;
* session restoration;
* authentication failure;
* disabled account;
* expired session;
* retry.

Do not invent authentication factors or verification flows not supported by the backend.

---

# SECURE SESSION STORAGE

Use platform-appropriate secure storage for sensitive session material.

Do not store:

* access tokens;
* refresh tokens;
* passwords;
* private keys;

in ordinary unencrypted application storage when secure platform storage is available.

Use the project's selected secure-storage mechanism.

Handle storage failures safely.

---

# SESSION RESTORATION

On application startup:

1. initialize secure storage;
2. determine whether a valid session exists;
3. validate/refresh according to the backend contract;
4. establish authenticated application state;
5. only then expose the authenticated navigation tree.

Avoid infinite refresh loops.

On permanent authentication failure:

* clear invalid credentials;
* close realtime connections;
* clear private client state;
* return to authentication.

---

# ACCOUNT AND PROFILE FOUNDATION

Implement the mobile profile/account foundation supported by the backend.

Support:

* current profile;
* profile display;
* profile editing where available;
* logout;
* basic account state.

Use typed forms and server validation.

Do not display internal identifiers as user-editable fields.

---

# API CLIENT

Implement or extend the mobile API client.

It must support:

* typed requests;
* typed responses;
* standardized errors;
* authentication;
* cancellation where practical;
* timeouts;
* safe retry;
* request correlation;
* pagination.

Do not blindly retry non-idempotent message mutations.

---

# SERVER STATE

Use a coherent server-state architecture supporting:

* caching;
* stale data;
* loading;
* errors;
* mutations;
* invalidation;
* refetch.

Avoid multiple independent caches for the same server resource.

---

# CLIENT STATE

Use client state for:

* selected conversation;
* navigation;
* composer state;
* realtime connection state;
* ephemeral UI state;
* device-local preferences.

Do not treat client state as authoritative for account permissions or message persistence.

---

# NETWORK STATE

Implement network-awareness.

The application should distinguish:

* online;
* offline;
* reconnecting;
* degraded;
* synchronized;
* synchronization pending.

Use platform/network capabilities appropriate to React Native/Expo.

Do not equate "device has a network interface" with successful backend connectivity.

---

# CONVERSATION LIST

Implement the foundational mobile conversation list.

Support:

* direct conversations;
* group conversations;
* participant/group information;
* latest-message summary;
* unread indicator;
* timestamp;
* selected/open state where relevant;
* loading;
* empty state;
* error state;
* pagination where backend contracts require it.

Do not fabricate message previews.

---

# CONVERSATION DISCOVERY

Implement flows for:

* creating/opening a direct conversation;
* opening an existing conversation;
* accessing group conversations according to available backend APIs.

Prevent duplicate direct-conversation assumptions on the client.

Use the server as the authority.

---

# CHAT SCREEN

Implement the foundational mobile chat screen.

Include:

* conversation header;
* participant/group identity;
* message list;
* composer;
* connection/synchronization indicator where useful;
* appropriate navigation actions.

The screen must work across:

* iOS;
* Android;
* different screen sizes;
* keyboard-open state;
* poor network conditions.

---

# MESSAGE TIMELINE

Implement a production-grade initial message timeline.

Support:

* chronological ordering;
* sender grouping;
* timestamps;
* date separators;
* pending state;
* server-confirmed state;
* delivery/read status where available;
* edited/deleted representation;
* reply references where backend support exists.

Use performant list rendering suitable for large message histories.

Prefer React Native's optimized list mechanisms or a well-supported alternative when measurement justifies it.

---

# MESSAGE LIST PERFORMANCE

Design the message list to avoid unnecessary rendering.

Use:

* stable message IDs as keys;
* memoized row components where appropriate;
* bounded render windows;
* efficient data selectors;
* incremental pagination.

Avoid rerendering the entire conversation because one message changed.

---

# MESSAGE COMPOSER FOUNDATION

Implement:

* text input;
* send action;
* validation;
* pending state;
* error state;
* retry where safe;
* keyboard management.

Support appropriate iOS and Android input behavior.

Do not implement advanced attachment workflows in this milestone.

---

# MESSAGE SEND INTEGRATION

Integrate with the backend's message contract.

Support:

* client message identity;
* submission;
* pending state;
* server acknowledgement;
* reconciliation;
* failure state.

Do not create permanent local messages without server confirmation unless the architecture explicitly requires optimistic messaging.

---

# REALTIME MOBILE CLIENT

Implement the authenticated WebSocket client foundation.

Support:

* connection;
* authentication;
* heartbeat;
* disconnect;
* reconnect;
* backoff;
* connection-state management;
* protocol validation;
* event routing.

Do not create a mobile-specific protocol incompatible with the backend.

---

# REALTIME EVENT FOUNDATION

Consume relevant message events:

* message_created;
* message_updated;
* message_deleted;
* message_delivered;
* message_read;
* synchronization_required where applicable.

Apply events idempotently.

Use server-authoritative identifiers and ordering.

---

# RECONNECT BEHAVIOR

When a connection is lost:

* mark the client as disconnected/reconnecting;
* retry with bounded backoff;
* re-authenticate if required;
* request synchronization;
* reconcile server state;
* resume realtime event processing.

Do not create uncontrolled reconnect loops that can overload the backend.

---

# SYNCHRONIZATION FOUNDATION

Track a durable client synchronization checkpoint where required.

On reconnect or startup:

1. restore local session;
2. establish realtime connection;
3. provide the last known checkpoint;
4. receive missed state;
5. reconcile local state;
6. resume normal realtime delivery.

Do not silently discard missed messages.

---

# LOCAL CACHE BOUNDARY

Where local caching is used, define:

* what data is cached;
* persistence lifetime;
* invalidation;
* account ownership;
* logout cleanup.

Do not persist sensitive conversation content indefinitely without explicit architectural justification.

---

# ACCOUNT ISOLATION

When:

* logging out;
* switching accounts;
* changing session;
* receiving an account-disabled response;

the app must:

* close WebSocket connections;
* clear account-specific caches;
* clear selected conversation;
* clear pending account-specific UI;
* remove sensitive persisted data as appropriate.

Never allow account A's private state to appear briefly after account B signs in.

---

# ERROR HANDLING

Implement mobile-specific error states for:

* authentication failure;
* network unavailable;
* request timeout;
* API failure;
* authorization failure;
* synchronization failure;
* WebSocket failure;
* invalid session;
* unsupported backend capability.

Provide retry actions where safe.

Avoid dumping raw backend errors to users.

---

# LOADING AND EMPTY STATES

Provide appropriate:

* loading;
* empty;
* error;
* retry;
* offline;

states for primary screens.

Do not leave blank white/empty screens during asynchronous initialization.

---

# ACCESSIBILITY

Implement mobile accessibility using platform semantics.

Support:

* accessible labels;
* meaningful roles;
* dynamic content announcements where appropriate;
* adequate touch targets;
* screen-reader navigation;
* focus behavior;
* sufficient contrast;
* reduced motion where supported.

Do not make important state distinctions dependent only on color.

---

# IOS ENGINEERING

Ensure the application foundation behaves correctly on iOS.

Review:

* safe areas;
* keyboard behavior;
* navigation gestures;
* status bar behavior;
* secure storage;
* lifecycle transitions;
* background/foreground transitions.

Do not assume Android behavior maps directly to iOS.

---

# ANDROID ENGINEERING

Ensure the application foundation behaves correctly on Android.

Review:

* hardware back behavior;
* keyboard behavior;
* system bars;
* lifecycle transitions;
* secure storage;
* activity recreation;
* deep-link behavior where applicable.

---

# APP LIFECYCLE

Handle:

* foreground;
* background;
* app resume;
* app reload;
* network restoration.

Do not keep unnecessary realtime resources active while the application is fully backgrounded if the architecture does not require them.

Coordinate lifecycle changes with synchronization.

---

# DEEP LINKS

Implement the foundational navigation behavior required for conversation deep links if supported by the project.

A deep link must:

* verify authentication;
* resolve the destination safely;
* avoid exposing unauthorized conversations;
* recover gracefully if the conversation no longer exists.

Do not accept arbitrary internal state from deep-link parameters without validation.

---

# SECURITY

Protect against:

* token leakage;
* insecure local storage;
* malicious deep links;
* unauthorized local cache access;
* unsafe WebSocket commands;
* untrusted message rendering;
* screenshot/content leakage where platform controls are appropriate to the product requirements.

Do not treat mobile UI controls as authorization boundaries.

---

# PRIVATE DATA

Avoid placing private conversation content in:

* logs;
* crash reports;
* analytics;
* notification debugging;
* URL parameters.

Redact sensitive fields from telemetry.

---

# PERFORMANCE

Optimize:

* startup;
* navigation;
* conversation list;
* message list;
* realtime event processing;
* memory use;
* image rendering where already applicable;
* state updates.

Do not add heavy global providers or libraries without a demonstrated need.

---

# TESTING

Implement automated tests appropriate to this milestone.

## Authentication

Test:

* login;
* registration;
* restoration;
* expiration;
* logout;
* secure-storage failure.

## Navigation

Test:

* auth stack;
* authenticated stack;
* protected routes;
* logout transition;
* deep-link behavior where implemented.

## Conversations

Test:

* list loading;
* empty state;
* pagination;
* direct conversation access;
* group conversation access.

## Chat

Test:

* message rendering;
* composer;
* sending;
* failed send;
* reconciliation;
* delivery/read state.

## Realtime

Test:

* connection;
* authentication;
* reconnect;
* event routing;
* duplicate events;
* synchronization.

## Account isolation

Test:

* logout cleanup;
* account switching;
* cache clearing;
* WebSocket teardown.

## Accessibility

Test:

* accessible labels;
* touch targets;
* screen-reader semantics;
* major navigation flows.

---

# NETWORK FAILURE TESTING

Test scenarios including:

* offline during app startup;
* offline during message composition;
* connection lost while message is sending;
* reconnect after prolonged offline period;
* authentication expiration while offline;
* synchronization failure;
* backend timeout.

The application must degrade predictably and recover without duplicating state.

---

# DOCUMENTATION

Update mobile documentation covering:

* project structure;
* navigation;
* authentication;
* secure storage;
* API client;
* realtime client;
* synchronization;
* local-state boundaries;
* environment configuration;
* iOS development;
* Android development;
* test execution.

Documentation must match actual implementation.

---

# FUTURE COMPATIBILITY

The foundation must support future mobile volumes implementing:

* rich media;
* push notifications;
* advanced offline operation;
* search;
* reactions;
* typing;
* presence;
* privacy/settings;
* group management;
* reporting/blocking.

Do not create architectural constraints that require replacing the navigation, state, networking, or synchronization foundations.

---

# NO FAKE FUNCTIONALITY

Do not create:

* fake API responses;
* fake authentication;
* fake WebSocket events;
* fake message persistence;
* fake push notifications;
* fake media processing.

Represent unavailable capabilities explicitly.

---

# NO HARDCODED SECRETS

Never hardcode:

* API secrets;
* authentication secrets;
* private keys;
* cloud credentials;
* push credentials;
* provider tokens.

Treat the mobile bundle as public to an attacker.

---

# VALIDATION

Before completion:

* run TypeScript checks;
* run linting;
* run formatting;
* run unit/component tests;
* run integration tests where configured;
* validate Expo bundling/build;
* validate navigation;
* validate authentication;
* validate secure storage;
* validate realtime behavior;
* validate Android behavior where available;
* validate iOS behavior where available;
* inspect the final diff.

Where platform-specific validation cannot be executed in the available environment, report exactly what could and could not be verified.

---

# COMPLETION REPORT

After implementation, report:

* files created;
* files modified;
* files deleted, if any;
* Expo/project foundation;
* navigation changes;
* authentication;
* secure storage;
* API client;
* state management;
* conversation list;
* chat foundation;
* realtime client;
* synchronization;
* network handling;
* accessibility;
* iOS-specific work;
* Android-specific work;
* tests added;
* tests executed;
* validation performed;
* documentation changes;
* compatibility considerations;
* unresolved issues;
* platform/external blockers.

Do not claim an iOS or Android build was verified if the required platform tooling was unavailable.

---

# DEFINITION OF DONE

This mobile milestone is complete only when:

* the Expo/React Native application foundation is operational;
* navigation is implemented;
* authentication flows work against the real backend contract;
* secure session storage is implemented;
* session restoration is implemented;
* logout/session invalidation is safe;
* API integration is typed and robust;
* server-state management is coherent;
* conversation list is implemented;
* conversation navigation is implemented;
* foundational chat UI is implemented;
* message rendering is performant;
* message composition is implemented;
* realtime connection foundation is implemented;
* reconnect behavior is implemented;
* synchronization foundation is implemented;
* network-state handling is implemented;
* account-specific cache isolation is implemented;
* accessibility foundations are implemented;
* iOS and Android lifecycle behavior is addressed;
* relevant automated tests exist and pass;
* documentation reflects actual behavior;
* no intentional implementation gaps remain within scope;
* the foundation is compatible with later media, notifications, offline, search, presence, and group-management work.

This Definition of Done applies only to **Mobile Prompt — Volume 1**.

It does not require implementation of the complete mobile applications.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as **Mobile Prompt — Volume 1 only**.

Inspect the repository before making changes.

Implement only the mobile application foundation, navigation, authentication, secure session handling, account/profile foundation, conversation discovery, chat foundation, API integration, realtime foundation, and synchronization scope defined here.

Do not implement the web frontend.

Do not redesign the backend.

Do not implement final production infrastructure.

Do not implement advanced media, push notifications, search, or full offline functionality beyond this prompt's synchronization foundation.

Do not invent another mobile volume or project phase.

Do not depend on previous AI responses.

Use the repository and actually available backend contracts as the source of truth.

Preserve compatible existing behavior.

Implement real production-grade functionality within scope.

Run appropriate validation.

Inspect the final diff.

Provide the required completion report and accurately report what was implemented and verified.
