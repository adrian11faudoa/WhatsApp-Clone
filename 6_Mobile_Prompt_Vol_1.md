# Mobile Prompt — Volume 1 — React Native Foundation, Authentication, Navigation, Conversations, and Real-Time Messaging

## ROLE

You are the senior mobile engineering team responsible for implementing the production-grade mobile application for an enterprise real-time communication platform.

Work directly against the existing repository.

This is one implementation phase of one coherent system. The repository is the source of truth for all existing mobile implementation, backend contracts, REST APIs, WebSocket/Socket.IO contracts, authentication behavior, synchronization semantics, domain models, design system, and infrastructure assumptions.

Do not create a separate application.

Do not create a competing architecture.

Inspect the repository before modifying anything.

Reuse compatible existing implementation and make the smallest safe changes required.

---

# 1. PLATFORM CONTEXT

The application is an original enterprise-grade real-time communication platform inspired by modern messaging applications.

The mobile application must support:

* authentication;
* user identity;
* device registration;
* direct conversations;
* group conversations;
* message history;
* text messaging;
* delivery receipts;
* read receipts;
* reactions;
* replies;
* editing;
* deletion;
* forwarding;
* presence;
* typing indicators;
* real-time messaging;
* multi-device synchronization;
* push notifications;
* media attachments;
* responsive native mobile UX;
* secure session handling.

Advanced media, notifications, calling, and production hardening will be completed in subsequent mobile work.

Do not invent backend functionality.

---

# 2. MOBILE STACK

Use the repository's established mobile stack.

Where not already established, use:

* React Native;
* Expo;
* TypeScript;
* Zustand;
* TanStack Query;
* React Navigation;
* Socket.IO client or the repository's established WebSocket client;
* Expo-compatible native modules where appropriate.

Follow the versions already present in the repository.

Do not blindly upgrade dependencies.

Do not introduce a second navigation/state/API architecture.

---

# 3. PRIMARY OBJECTIVE

Build the complete production mobile foundation and core messaging experience.

This volume must establish:

1. React Native architecture;
2. Expo configuration;
3. navigation;
4. authentication;
5. secure session handling;
6. API client;
7. TanStack Query;
8. Zustand;
9. device identity;
10. push-token registration foundation;
11. WebSocket lifecycle;
12. real-time event handling;
13. synchronization;
14. conversation list;
15. conversation screen;
16. message history;
17. message rendering;
18. composer;
19. delivery/read state;
20. typing indicators;
21. presence;
22. reactions/replies/edit/delete;
23. group conversations;
24. mobile-specific UX;
25. accessibility;
26. testing foundations.

---

# 4. REPOSITORY-FIRST REQUIREMENT

Before implementing:

* inspect the complete repository;
* locate the mobile application;
* inspect package configuration;
* inspect Expo configuration;
* inspect TypeScript configuration;
* inspect navigation;
* inspect existing screens;
* inspect API clients;
* inspect generated types;
* inspect authentication;
* inspect storage;
* inspect Zustand stores;
* inspect TanStack Query configuration;
* inspect WebSocket implementation;
* inspect push notification registration;
* inspect backend contracts;
* inspect OpenAPI definitions;
* inspect mobile tests;
* inspect linting and formatting;
* inspect environment configuration.

If mobile code already exists:

* extend it;
* preserve compatible functionality;
* do not rewrite working code without reason.

---

# 5. MOBILE ARCHITECTURE

Establish scalable feature boundaries.

Use meaningful organization such as:

* app;
* navigation;
* features;
* screens;
* components;
* entities;
* hooks;
* services;
* API;
* realtime;
* state;
* storage;
* utilities;
* types;
* tests.

Avoid arbitrary folder proliferation.

Keep domain logic separate from presentation.

Do not place network/business logic directly inside screen components.

---

# 6. NAVIGATION

Implement the application's navigation hierarchy.

Support appropriate navigators for:

* authentication;
* authenticated application;
* conversation list;
* conversation detail;
* profile;
* settings;
* search.

Use React Navigation according to the repository architecture.

Handle:

* deep links;
* authentication transitions;
* nested navigation;
* back behavior;
* Android back button;
* iOS navigation expectations.

---

# 7. AUTHENTICATION

Integrate with the existing backend authentication system.

Support:

* login;
* registration where supported;
* logout;
* session restoration;
* token/session refresh;
* authentication errors;
* expired sessions;
* device/session association.

Do not implement authentication independently from the backend.

---

# 8. SECURE SESSION STORAGE

Use secure platform storage for sensitive authentication state.

On supported platforms, use the repository's secure storage mechanism.

Do not store long-lived sensitive tokens in plain AsyncStorage.

Do not log tokens.

Do not include credentials in navigation parameters.

---

# 9. AUTHENTICATION LIFECYCLE

Represent states such as:

* bootstrapping;
* unauthenticated;
* authenticated;
* refreshing;
* expired;
* error.

During authentication loss:

* disconnect WebSocket;
* clear protected query state where required;
* clear protected client state;
* remove sensitive cached data;
* navigate to authentication;
* prevent unauthorized requests.

Do not leave private conversation data visible after logout.

---

# 10. DEVICE IDENTITY

Integrate with the backend's device/session model.

A mobile installation must be distinguishable from other user devices according to the backend contract.

Support:

* device registration;
* device/session identification;
* device logout/revocation where supported;
* token rotation;
* push-token association.

Do not generate identities that conflict with backend ownership.

---

# 11. API CLIENT

Implement or extend a centralized API client.

Support:

* base URL;
* authentication;
* refresh/session handling;
* request timeout;
* cancellation;
* error normalization;
* response parsing;
* request correlation where supported;
* retry only when safe.

Do not scatter raw HTTP calls throughout screens.

---

# 12. API CONTRACTS

Use actual backend contracts.

Prefer generated API types where available.

Otherwise define strongly typed interfaces matching the backend.

Avoid:

* `any`;
* unsafe casts;
* guessed fields;
* duplicated incompatible models.

The backend remains authoritative.

---

# 13. TANSTACK QUERY

Use TanStack Query for server-owned state.

Manage:

* conversations;
* messages;
* profiles;
* membership;
* unread counts;
* search data;
* settings;
* media metadata where required.

Define stable query keys.

Do not duplicate all server state inside Zustand.

---

# 14. ZUSTAND

Use Zustand for client-owned state.

Examples:

* selected conversation;
* UI state;
* composer state;
* active reply;
* active edit;
* message selection;
* navigation-related transient state;
* connection state.

Do not make Zustand the authoritative messaging database.

---

# 15. MOBILE STORAGE

Define clear storage ownership.

Persistent local storage may contain appropriate non-sensitive application preferences such as:

* theme;
* UI preferences;
* draft state where safe;
* last selected UI state where appropriate.

Sensitive credentials must use secure storage.

Private message persistence must follow the application's actual privacy/security architecture.

Do not create an insecure offline database merely for convenience.

---

# 16. REAL-TIME CLIENT

Integrate the backend WebSocket/Socket.IO contract.

Create a centralized real-time service.

Support:

* authenticated connection;
* device association;
* connection lifecycle;
* reconnection;
* event validation;
* event routing;
* acknowledgements;
* synchronization;
* duplicate events;
* stale events.

Do not create one WebSocket connection per screen.

---

# 17. MOBILE CONNECTION LIFECYCLE

Mobile applications frequently transition through:

* foreground;
* background;
* inactive;
* suspended;
* network changes.

Handle AppState transitions.

When entering background:

* follow the backend/platform push architecture;
* avoid unnecessary persistent socket activity if the platform does not support it reliably.

When returning to foreground:

* reconnect if needed;
* synchronize missed events;
* reconcile state.

Do not assume a mobile WebSocket remains connected indefinitely.

---

# 18. REAL-TIME EVENT HANDLER

Create a centralized event dispatcher.

Handle actual backend events for:

* message creation;
* message update;
* message deletion;
* reaction;
* delivery;
* read;
* conversation updates;
* membership;
* presence;
* typing;
* synchronization.

Update TanStack Query cache or client state appropriately.

---

# 19. EVENT IDEMPOTENCY

Mobile clients must tolerate:

* duplicate events;
* delayed events;
* out-of-order events;
* reconnect replay.

Use:

* event IDs;
* message IDs;
* server sequence;
* conversation sequence;
* synchronization cursor.

Never append a message blindly because an event arrived.

Prevent receipt regression.

---

# 20. SYNCHRONIZATION

Integrate with the backend multi-device synchronization protocol.

Trigger synchronization on:

* application startup;
* authentication;
* foreground;
* reconnect;
* detected event gap;
* device/session recovery.

Use the backend's actual sync cursor/sequence contracts.

Do not treat WebSocket delivery as durable storage.

---

# 21. CONVERSATION LIST

Implement the main conversation list.

Each item should support:

* avatar;
* display name;
* latest message;
* timestamp;
* unread count;
* muted state;
* pinned state where supported;
* typing state;
* message state where appropriate.

Use backend-authoritative ordering.

---

# 22. CONVERSATION LIST UPDATES

When a new message arrives:

* update preview;
* update timestamp;
* update ordering;
* update unread state;
* avoid duplicate entries.

Respect the active conversation.

Do not create notification-like behavior inside the conversation list that conflicts with push notifications.

---

# 23. CONVERSATION SCREEN

Implement the primary mobile conversation experience.

Include:

* header;
* participant/group information;
* presence;
* message list;
* composer;
* typing indicator;
* connection state where useful;
* unread marker.

The interface must feel native to mobile.

---

# 24. MESSAGE HISTORY

Load messages using backend cursor pagination.

Support:

* initial history;
* older messages;
* loading;
* retry;
* empty state;
* deleted messages;
* edited messages;
* synchronization.

Maintain scroll position when loading older messages.

Do not unexpectedly jump the user.

---

# 25. MESSAGE LIST PERFORMANCE

Optimize message rendering.

Use:

* `FlatList`;
* `FlashList` if already adopted and appropriate;
* stable keys;
* memoized message components;
* efficient item rendering.

Do not render huge conversations as one giant React tree.

Avoid unnecessary rerenders when typing or presence changes.

---

# 26. MESSAGE RENDERING

Support:

* text;
* system messages;
* edited state;
* deleted state;
* delivery state;
* read state;
* reactions;
* replies;
* forwarded state;
* media placeholders.

Use server ordering.

---

# 27. MESSAGE COMPOSER

Implement a mobile-optimized composer.

Support:

* multiline text;
* send;
* keyboard handling;
* reply mode;
* edit mode;
* draft preservation;
* message length validation;
* disabled/loading state.

Ensure the composer behaves correctly with:

* iOS keyboard;
* Android keyboard;
* safe areas;
* screen resizing;
* navigation transitions.

---

# 28. SEND MESSAGE

Implement:

1. local validation;
2. client idempotency identifier where required;
3. backend submission;
4. pending state;
5. canonical server reconciliation;
6. success;
7. failure;
8. retry.

Never invent server IDs or timestamps.

---

# 29. FAILED SENDS

Display failed messages clearly.

Allow:

* retry;
* remove failed item;
* preserve text;
* recover after reconnection.

Do not silently discard user content.

---

# 30. DELIVERY AND READ STATES

Display actual server-authoritative states:

* sending;
* sent;
* delivered;
* read;
* failed.

Ensure stale events cannot regress state.

Integrate with multi-device semantics.

---

# 31. READ RECEIPTS

Implement read behavior using the backend contract.

Consider:

* active conversation;
* visible messages;
* app foreground state;
* scroll position.

Batch receipts where appropriate.

Do not send read events continuously while scrolling.

---

# 32. TYPING INDICATORS

Integrate with backend typing events.

Support:

* start;
* stop;
* debounce/throttle;
* timeout;
* cleanup;
* disconnect handling;
* multiple participants.

Typing is ephemeral.

Never persist typing state as a durable message.

---

# 33. PRESENCE

Display backend-provided presence.

Support:

* online;
* offline;
* last seen where allowed;
* unavailable.

Respect privacy settings.

Do not infer presence merely from recent local activity.

---

# 34. REPLIES

Implement reply interactions.

Support:

* selecting a message to reply;
* displaying referenced-message preview;
* canceling reply;
* rendering reply metadata;
* navigating to original message.

Handle deleted/unavailable referenced messages.

---

# 35. REACTIONS

Implement reaction UI.

Support:

* add;
* remove;
* display counts;
* real-time updates.

Prevent duplicate reactions.

Use server-authoritative state.

---

# 36. MESSAGE EDITING

Implement editing.

Support:

* enter edit mode;
* populate composer;
* cancel;
* submit;
* display edited state;
* failure handling.

Respect backend authorization.

---

# 37. MESSAGE DELETION

Support backend-defined:

* delete for self;
* delete for everyone.

Represent deleted messages correctly.

Do not simply erase them if backend uses tombstones.

Ensure replies and real-time state remain consistent.

---

# 38. MESSAGE ACTION SHEET

Use mobile-native interaction patterns such as:

* action sheet;
* contextual menu;
* bottom sheet;
* long press.

Support available actions:

* reply;
* react;
* forward;
* edit;
* delete;
* copy;
* retry;
* select.

Only expose actions supported by backend authorization.

---

# 39. GROUP CONVERSATIONS

Support direct and group conversations.

For groups display:

* group avatar;
* group name;
* sender names;
* participant information;
* system membership messages.

React to membership changes in real time.

---

# 40. MEMBERSHIP REVOCATION

If the current user loses access:

* remove protected conversation state;
* close the conversation;
* navigate appropriately;
* invalidate cached data;
* prevent additional requests.

Do not rely on hiding the screen.

---

# 41. MOBILE UX

Follow platform conventions.

Use:

* safe-area handling;
* touch targets of appropriate size;
* native-feeling gestures;
* appropriate keyboard avoidance;
* pull-to-refresh where useful;
* platform-specific interaction patterns when justified.

Avoid blindly reproducing desktop web layouts.

---

# 42. LOADING STATES

Implement intentional states for:

* application bootstrap;
* authentication;
* conversation list;
* message history;
* message send;
* profile;
* settings;
* synchronization.

Use skeletons/placeholders where they improve perceived performance.

Do not leave blank screens.

---

# 43. ERROR STATES

Provide recovery for:

* network failure;
* session expiration;
* API failure;
* WebSocket failure;
* synchronization failure;
* message send failure;
* conversation loading failure.

Use retry where appropriate.

Do not expose technical stack traces.

---

# 44. EMPTY STATES

Provide intentional states for:

* no conversations;
* empty conversation;
* no search results;
* no available content.

Do not confuse empty with loading or error.

---

# 45. OFFLINE BEHAVIOR

Provide graceful network-loss behavior.

At minimum:

* show connection status;
* preserve drafts;
* preserve unsent message content;
* recover state on reconnect;
* synchronize missed messages.

Do not claim fully offline-capable messaging unless the repository actually implements a durable offline queue.

---

# 46. PUSH NOTIFICATION FOUNDATION

Integrate with the backend push-token system.

Establish the foundation for:

* device push token acquisition;
* token registration;
* token rotation;
* logout/unregistration;
* permission state.

Use Expo-compatible notification APIs where appropriate.

Do not hardcode provider credentials.

---

# 47. NOTIFICATION PRIVACY

Respect backend notification preferences.

Do not display private message content in local UI notifications if the user's privacy settings prohibit previews.

The backend remains authoritative for push payload policy.

---

# 48. DEEP LINK FOUNDATION

Prepare navigation for notification/deep-link targets.

Support safe navigation to:

* conversation;
* message;
* profile;
* settings where appropriate.

After navigation, synchronize data.

Do not trust arbitrary external routes.

---

# 49. SECURITY

Perform a mobile security review.

Protect against:

* token leakage;
* insecure local storage;
* unauthorized API access;
* unsafe deep links;
* malicious URLs;
* untrusted message rendering;
* sensitive logs;
* stale private cache;
* improper logout;
* WebSocket authentication issues.

Never trust client-side authorization.

---

# 50. PRIVACY

Do not unnecessarily persist:

* private message content;
* tokens;
* private media URLs;
* notification payloads;
* credentials.

Review:

* AsyncStorage;
* SecureStore;
* logs;
* crash reporting;
* analytics;
* screenshots/sensitive app state where applicable.

Respect platform privacy requirements.

---

# 51. ACCESSIBILITY

Implement mobile accessibility.

Support:

* VoiceOver;
* TalkBack;
* accessible labels;
* meaningful message state;
* accessible action sheets;
* accessible buttons;
* adequate touch targets;
* dynamic text sizing where practical;
* reduced motion where supported.

Do not make important functionality gesture-only.

---

# 52. THEMING

Implement a reusable theme system.

Support where required:

* light;
* dark;
* system.

Use theme tokens instead of hardcoded colors throughout screens.

Ensure message bubbles, text, icons, inputs, dialogs, and status indicators remain readable.

---

# 53. PERFORMANCE

Optimize:

* conversation list;
* message list;
* real-time updates;
* navigation;
* image rendering;
* state updates.

Avoid:

* unnecessary global state;
* full list rerenders;
* repeated API requests;
* duplicate sockets;
* expensive work on the JS thread.

Do not sacrifice correctness for premature optimization.

---

# 54. BACKGROUND/FOREGROUND

Handle mobile lifecycle correctly.

When backgrounded:

* clean up resources that should not remain active;
* rely on push infrastructure where appropriate;
* preserve required state.

When foregrounded:

* reconnect;
* synchronize;
* refresh stale state;
* restore UI.

Do not assume the process remains alive in background.

---

# 55. TESTING

Create comprehensive mobile tests.

## Unit tests

Test:

* state transitions;
* message formatting;
* event normalization;
* pagination;
* cache updates;
* validation;
* synchronization logic.

## Component tests

Test:

* conversation list;
* message item;
* composer;
* action sheet;
* replies;
* reactions;
* loading/error states.

## Integration tests

Test:

* authentication;
* API client;
* WebSocket event handling;
* cache reconciliation;
* reconnect;
* foreground/background transitions.

---

# 56. E2E TESTS

Where the repository supports mobile E2E testing, cover:

1. application launch;
2. authentication;
3. session restoration;
4. conversation list;
5. open conversation;
6. send message;
7. receive real-time message;
8. reply;
9. react;
10. edit;
11. delete;
12. read receipt;
13. reconnect;
14. synchronize;
15. logout.

Use the actual mobile test framework already established by the repository.

---

# 57. ERROR BOUNDARIES

Implement appropriate React Native error recovery.

A failure in a noncritical screen/component should not unnecessarily crash the entire application.

Provide recovery where possible.

Do not display raw stack traces.

---

# 58. OBSERVABILITY

Integrate mobile observability according to the existing project architecture.

Track technical signals such as:

* crash/error rate;
* API failures;
* WebSocket failures;
* synchronization failures;
* message-send failures;
* app startup performance;
* notification registration failures.

Do not capture private message contents or authentication secrets.

---

# 59. CONFIGURATION

Use environment/configuration mechanisms appropriate for Expo.

Separate:

* development;
* testing;
* staging;
* production.

Do not commit secrets.

Do not embed backend credentials.

Validate required configuration.

---

# 60. IMPLEMENTATION ORDER

Unless repository dependencies require a safer sequence:

1. inspect repository;
2. establish mobile architecture;
3. establish Expo configuration;
4. implement navigation;
5. implement secure authentication;
6. implement API client;
7. configure TanStack Query;
8. configure Zustand;
9. implement device identity;
10. implement push-token foundation;
11. implement WebSocket service;
12. implement connection lifecycle;
13. implement event dispatcher;
14. implement synchronization;
15. implement application shell;
16. implement conversation list;
17. implement conversation screen;
18. implement message history;
19. implement message rendering;
20. implement composer;
21. implement send/retry;
22. implement delivery/read state;
23. implement typing;
24. implement presence;
25. implement replies;
26. implement reactions;
27. implement editing;
28. implement deletion;
29. implement group conversations;
30. implement membership updates;
31. implement offline/reconnect behavior;
32. implement accessibility;
33. implement security/privacy review;
34. add tests;
35. run production validation.

---

# 61. VALIDATION

Before declaring this phase complete:

* run formatting;
* run lint;
* run TypeScript checking;
* run unit tests;
* run component tests;
* run integration tests;
* run E2E tests where available;
* validate Expo configuration;
* validate development build;
* validate production build where available;
* verify authentication;
* verify API contracts;
* verify WebSocket behavior;
* verify synchronization;
* verify push-token registration;
* verify foreground/background transitions;
* verify accessibility.

Fix all actual failures.

Do not claim tests passed if they were not executed.

---

# 62. FINAL REPOSITORY REVIEW

Inspect the final diff.

Verify:

* no duplicate architecture;
* no duplicate API clients;
* no duplicate WebSocket connections;
* no fake backend calls;
* no placeholder screens;
* no TODO/FIXME implementation gaps;
* no secrets;
* no debug logging;
* no unnecessary dependency upgrades;
* no accidental unrelated changes.

Preserve existing work.

---

# 63. FINAL COMPLETION REPORT

At completion report:

### Implemented

Actual mobile functionality implemented.

### Modified

Actual files modified.

### Created

Actual files created.

### Navigation

Routes/navigators implemented.

### Authentication

Actual authentication/session behavior.

### API

Endpoints integrated.

### Realtime

WebSocket events and synchronization implemented.

### Messaging

Messaging functionality implemented.

### Push

Actual push-token foundation implemented.

### Testing

Tests actually added and executed.

### Validation

Commands actually executed and results.

### Remaining

Only genuine later-phase work.

Do not claim features that only have UI without functional backend integration.

---

# 64. NON-NEGOTIABLE RULES

Never:

* invent backend endpoints;
* invent WebSocket events;
* invent synchronization semantics;
* invent device contracts;
* fake push notifications;
* create fake messages;
* bypass server authorization;
* store sensitive credentials insecurely;
* expose tokens;
* trust client-side permissions;
* use placeholder implementations;
* use pseudo-code;
* leave TODO/FIXME implementation gaps;
* silently swallow errors;
* duplicate existing architecture;
* create multiple competing WebSocket connections;
* make Zustand the authoritative server database;
* claim tests passed without running them;
* claim functionality exists when it is only mocked.

Every mobile feature must integrate with the actual backend.

The mobile application must remain one coherent part of the same production-grade platform.

All contracts must remain consistent across:

* REST;
* WebSockets;
* authentication;
* device identity;
* conversations;
* messages;
* receipts;
* presence;
* synchronization;
* notifications;
* errors;
* pagination;
* IDs;
* timestamps;
* authorization.

The result must be production-ready, secure, accessible, responsive to mobile lifecycle behavior, observable, testable, and maintainabl

# Mobile Prompt — Volume 1 — React Native Foundation, Authentication, Navigation, Conversations, and Real-Time Messaging

## ROLE

You are the senior mobile engineering team responsible for implementing the production-grade mobile application for an enterprise real-time communication platform.

Work directly against the existing repository.

This is one implementation phase of one coherent system. The repository is the source of truth for all existing mobile implementation, backend contracts, REST APIs, WebSocket/Socket.IO contracts, authentication behavior, synchronization semantics, domain models, design system, and infrastructure assumptions.

Do not create a separate application.

Do not create a competing architecture.

Inspect the repository before modifying anything.

Reuse compatible existing implementation and make the smallest safe changes required.

---

# 1. PLATFORM CONTEXT

The application is an original enterprise-grade real-time communication platform inspired by modern messaging applications.

The mobile application must support:

* authentication;
* user identity;
* device registration;
* direct conversations;
* group conversations;
* message history;
* text messaging;
* delivery receipts;
* read receipts;
* reactions;
* replies;
* editing;
* deletion;
* forwarding;
* presence;
* typing indicators;
* real-time messaging;
* multi-device synchronization;
* push notifications;
* media attachments;
* responsive native mobile UX;
* secure session handling.

Advanced media, notifications, calling, and production hardening will be completed in subsequent mobile work.

Do not invent backend functionality.

---

# 2. MOBILE STACK

Use the repository's established mobile stack.

Where not already established, use:

* React Native;
* Expo;
* TypeScript;
* Zustand;
* TanStack Query;
* React Navigation;
* Socket.IO client or the repository's established WebSocket client;
* Expo-compatible native modules where appropriate.

Follow the versions already present in the repository.

Do not blindly upgrade dependencies.

Do not introduce a second navigation/state/API architecture.

---

# 3. PRIMARY OBJECTIVE

Build the complete production mobile foundation and core messaging experience.

This volume must establish:

1. React Native architecture;
2. Expo configuration;
3. navigation;
4. authentication;
5. secure session handling;
6. API client;
7. TanStack Query;
8. Zustand;
9. device identity;
10. push-token registration foundation;
11. WebSocket lifecycle;
12. real-time event handling;
13. synchronization;
14. conversation list;
15. conversation screen;
16. message history;
17. message rendering;
18. composer;
19. delivery/read state;
20. typing indicators;
21. presence;
22. reactions/replies/edit/delete;
23. group conversations;
24. mobile-specific UX;
25. accessibility;
26. testing foundations.

---

# 4. REPOSITORY-FIRST REQUIREMENT

Before implementing:

* inspect the complete repository;
* locate the mobile application;
* inspect package configuration;
* inspect Expo configuration;
* inspect TypeScript configuration;
* inspect navigation;
* inspect existing screens;
* inspect API clients;
* inspect generated types;
* inspect authentication;
* inspect storage;
* inspect Zustand stores;
* inspect TanStack Query configuration;
* inspect WebSocket implementation;
* inspect push notification registration;
* inspect backend contracts;
* inspect OpenAPI definitions;
* inspect mobile tests;
* inspect linting and formatting;
* inspect environment configuration.

If mobile code already exists:

* extend it;
* preserve compatible functionality;
* do not rewrite working code without reason.

---

# 5. MOBILE ARCHITECTURE

Establish scalable feature boundaries.

Use meaningful organization such as:

* app;
* navigation;
* features;
* screens;
* components;
* entities;
* hooks;
* services;
* API;
* realtime;
* state;
* storage;
* utilities;
* types;
* tests.

Avoid arbitrary folder proliferation.

Keep domain logic separate from presentation.

Do not place network/business logic directly inside screen components.

---

# 6. NAVIGATION

Implement the application's navigation hierarchy.

Support appropriate navigators for:

* authentication;
* authenticated application;
* conversation list;
* conversation detail;
* profile;
* settings;
* search.

Use React Navigation according to the repository architecture.

Handle:

* deep links;
* authentication transitions;
* nested navigation;
* back behavior;
* Android back button;
* iOS navigation expectations.

---

# 7. AUTHENTICATION

Integrate with the existing backend authentication system.

Support:

* login;
* registration where supported;
* logout;
* session restoration;
* token/session refresh;
* authentication errors;
* expired sessions;
* device/session association.

Do not implement authentication independently from the backend.

---

# 8. SECURE SESSION STORAGE

Use secure platform storage for sensitive authentication state.

On supported platforms, use the repository's secure storage mechanism.

Do not store long-lived sensitive tokens in plain AsyncStorage.

Do not log tokens.

Do not include credentials in navigation parameters.

---

# 9. AUTHENTICATION LIFECYCLE

Represent states such as:

* bootstrapping;
* unauthenticated;
* authenticated;
* refreshing;
* expired;
* error.

During authentication loss:

* disconnect WebSocket;
* clear protected query state where required;
* clear protected client state;
* remove sensitive cached data;
* navigate to authentication;
* prevent unauthorized requests.

Do not leave private conversation data visible after logout.

---

# 10. DEVICE IDENTITY

Integrate with the backend's device/session model.

A mobile installation must be distinguishable from other user devices according to the backend contract.

Support:

* device registration;
* device/session identification;
* device logout/revocation where supported;
* token rotation;
* push-token association.

Do not generate identities that conflict with backend ownership.

---

# 11. API CLIENT

Implement or extend a centralized API client.

Support:

* base URL;
* authentication;
* refresh/session handling;
* request timeout;
* cancellation;
* error normalization;
* response parsing;
* request correlation where supported;
* retry only when safe.

Do not scatter raw HTTP calls throughout screens.

---

# 12. API CONTRACTS

Use actual backend contracts.

Prefer generated API types where available.

Otherwise define strongly typed interfaces matching the backend.

Avoid:

* `any`;
* unsafe casts;
* guessed fields;
* duplicated incompatible models.

The backend remains authoritative.

---

# 13. TANSTACK QUERY

Use TanStack Query for server-owned state.

Manage:

* conversations;
* messages;
* profiles;
* membership;
* unread counts;
* search data;
* settings;
* media metadata where required.

Define stable query keys.

Do not duplicate all server state inside Zustand.

---

# 14. ZUSTAND

Use Zustand for client-owned state.

Examples:

* selected conversation;
* UI state;
* composer state;
* active reply;
* active edit;
* message selection;
* navigation-related transient state;
* connection state.

Do not make Zustand the authoritative messaging database.

---

# 15. MOBILE STORAGE

Define clear storage ownership.

Persistent local storage may contain appropriate non-sensitive application preferences such as:

* theme;
* UI preferences;
* draft state where safe;
* last selected UI state where appropriate.

Sensitive credentials must use secure storage.

Private message persistence must follow the application's actual privacy/security architecture.

Do not create an insecure offline database merely for convenience.

---

# 16. REAL-TIME CLIENT

Integrate the backend WebSocket/Socket.IO contract.

Create a centralized real-time service.

Support:

* authenticated connection;
* device association;
* connection lifecycle;
* reconnection;
* event validation;
* event routing;
* acknowledgements;
* synchronization;
* duplicate events;
* stale events.

Do not create one WebSocket connection per screen.

---

# 17. MOBILE CONNECTION LIFECYCLE

Mobile applications frequently transition through:

* foreground;
* background;
* inactive;
* suspended;
* network changes.

Handle AppState transitions.

When entering background:

* follow the backend/platform push architecture;
* avoid unnecessary persistent socket activity if the platform does not support it reliably.

When returning to foreground:

* reconnect if needed;
* synchronize missed events;
* reconcile state.

Do not assume a mobile WebSocket remains connected indefinitely.

---

# 18. REAL-TIME EVENT HANDLER

Create a centralized event dispatcher.

Handle actual backend events for:

* message creation;
* message update;
* message deletion;
* reaction;
* delivery;
* read;
* conversation updates;
* membership;
* presence;
* typing;
* synchronization.

Update TanStack Query cache or client state appropriately.

---

# 19. EVENT IDEMPOTENCY

Mobile clients must tolerate:

* duplicate events;
* delayed events;
* out-of-order events;
* reconnect replay.

Use:

* event IDs;
* message IDs;
* server sequence;
* conversation sequence;
* synchronization cursor.

Never append a message blindly because an event arrived.

Prevent receipt regression.

---

# 20. SYNCHRONIZATION

Integrate with the backend multi-device synchronization protocol.

Trigger synchronization on:

* application startup;
* authentication;
* foreground;
* reconnect;
* detected event gap;
* device/session recovery.

Use the backend's actual sync cursor/sequence contracts.

Do not treat WebSocket delivery as durable storage.

---

# 21. CONVERSATION LIST

Implement the main conversation list.

Each item should support:

* avatar;
* display name;
* latest message;
* timestamp;
* unread count;
* muted state;
* pinned state where supported;
* typing state;
* message state where appropriate.

Use backend-authoritative ordering.

---

# 22. CONVERSATION LIST UPDATES

When a new message arrives:

* update preview;
* update timestamp;
* update ordering;
* update unread state;
* avoid duplicate entries.

Respect the active conversation.

Do not create notification-like behavior inside the conversation list that conflicts with push notifications.

---

# 23. CONVERSATION SCREEN

Implement the primary mobile conversation experience.

Include:

* header;
* participant/group information;
* presence;
* message list;
* composer;
* typing indicator;
* connection state where useful;
* unread marker.

The interface must feel native to mobile.

---

# 24. MESSAGE HISTORY

Load messages using backend cursor pagination.

Support:

* initial history;
* older messages;
* loading;
* retry;
* empty state;
* deleted messages;
* edited messages;
* synchronization.

Maintain scroll position when loading older messages.

Do not unexpectedly jump the user.

---

# 25. MESSAGE LIST PERFORMANCE

Optimize message rendering.

Use:

* `FlatList`;
* `FlashList` if already adopted and appropriate;
* stable keys;
* memoized message components;
* efficient item rendering.

Do not render huge conversations as one giant React tree.

Avoid unnecessary rerenders when typing or presence changes.

---

# 26. MESSAGE RENDERING

Support:

* text;
* system messages;
* edited state;
* deleted state;
* delivery state;
* read state;
* reactions;
* replies;
* forwarded state;
* media placeholders.

Use server ordering.

---

# 27. MESSAGE COMPOSER

Implement a mobile-optimized composer.

Support:

* multiline text;
* send;
* keyboard handling;
* reply mode;
* edit mode;
* draft preservation;
* message length validation;
* disabled/loading state.

Ensure the composer behaves correctly with:

* iOS keyboard;
* Android keyboard;
* safe areas;
* screen resizing;
* navigation transitions.

---

# 28. SEND MESSAGE

Implement:

1. local validation;
2. client idempotency identifier where required;
3. backend submission;
4. pending state;
5. canonical server reconciliation;
6. success;
7. failure;
8. retry.

Never invent server IDs or timestamps.

---

# 29. FAILED SENDS

Display failed messages clearly.

Allow:

* retry;
* remove failed item;
* preserve text;
* recover after reconnection.

Do not silently discard user content.

---

# 30. DELIVERY AND READ STATES

Display actual server-authoritative states:

* sending;
* sent;
* delivered;
* read;
* failed.

Ensure stale events cannot regress state.

Integrate with multi-device semantics.

---

# 31. READ RECEIPTS

Implement read behavior using the backend contract.

Consider:

* active conversation;
* visible messages;
* app foreground state;
* scroll position.

Batch receipts where appropriate.

Do not send read events continuously while scrolling.

---

# 32. TYPING INDICATORS

Integrate with backend typing events.

Support:

* start;
* stop;
* debounce/throttle;
* timeout;
* cleanup;
* disconnect handling;
* multiple participants.

Typing is ephemeral.

Never persist typing state as a durable message.

---

# 33. PRESENCE

Display backend-provided presence.

Support:

* online;
* offline;
* last seen where allowed;
* unavailable.

Respect privacy settings.

Do not infer presence merely from recent local activity.

---

# 34. REPLIES

Implement reply interactions.

Support:

* selecting a message to reply;
* displaying referenced-message preview;
* canceling reply;
* rendering reply metadata;
* navigating to original message.

Handle deleted/unavailable referenced messages.

---

# 35. REACTIONS

Implement reaction UI.

Support:

* add;
* remove;
* display counts;
* real-time updates.

Prevent duplicate reactions.

Use server-authoritative state.

---

# 36. MESSAGE EDITING

Implement editing.

Support:

* enter edit mode;
* populate composer;
* cancel;
* submit;
* display edited state;
* failure handling.

Respect backend authorization.

---

# 37. MESSAGE DELETION

Support backend-defined:

* delete for self;
* delete for everyone.

Represent deleted messages correctly.

Do not simply erase them if backend uses tombstones.

Ensure replies and real-time state remain consistent.

---

# 38. MESSAGE ACTION SHEET

Use mobile-native interaction patterns such as:

* action sheet;
* contextual menu;
* bottom sheet;
* long press.

Support available actions:

* reply;
* react;
* forward;
* edit;
* delete;
* copy;
* retry;
* select.

Only expose actions supported by backend authorization.

---

# 39. GROUP CONVERSATIONS

Support direct and group conversations.

For groups display:

* group avatar;
* group name;
* sender names;
* participant information;
* system membership messages.

React to membership changes in real time.

---

# 40. MEMBERSHIP REVOCATION

If the current user loses access:

* remove protected conversation state;
* close the conversation;
* navigate appropriately;
* invalidate cached data;
* prevent additional requests.

Do not rely on hiding the screen.

---

# 41. MOBILE UX

Follow platform conventions.

Use:

* safe-area handling;
* touch targets of appropriate size;
* native-feeling gestures;
* appropriate keyboard avoidance;
* pull-to-refresh where useful;
* platform-specific interaction patterns when justified.

Avoid blindly reproducing desktop web layouts.

---

# 42. LOADING STATES

Implement intentional states for:

* application bootstrap;
* authentication;
* conversation list;
* message history;
* message send;
* profile;
* settings;
* synchronization.

Use skeletons/placeholders where they improve perceived performance.

Do not leave blank screens.

---

# 43. ERROR STATES

Provide recovery for:

* network failure;
* session expiration;
* API failure;
* WebSocket failure;
* synchronization failure;
* message send failure;
* conversation loading failure.

Use retry where appropriate.

Do not expose technical stack traces.

---

# 44. EMPTY STATES

Provide intentional states for:

* no conversations;
* empty conversation;
* no search results;
* no available content.

Do not confuse empty with loading or error.

---

# 45. OFFLINE BEHAVIOR

Provide graceful network-loss behavior.

At minimum:

* show connection status;
* preserve drafts;
* preserve unsent message content;
* recover state on reconnect;
* synchronize missed messages.

Do not claim fully offline-capable messaging unless the repository actually implements a durable offline queue.

---

# 46. PUSH NOTIFICATION FOUNDATION

Integrate with the backend push-token system.

Establish the foundation for:

* device push token acquisition;
* token registration;
* token rotation;
* logout/unregistration;
* permission state.

Use Expo-compatible notification APIs where appropriate.

Do not hardcode provider credentials.

---

# 47. NOTIFICATION PRIVACY

Respect backend notification preferences.

Do not display private message content in local UI notifications if the user's privacy settings prohibit previews.

The backend remains authoritative for push payload policy.

---

# 48. DEEP LINK FOUNDATION

Prepare navigation for notification/deep-link targets.

Support safe navigation to:

* conversation;
* message;
* profile;
* settings where appropriate.

After navigation, synchronize data.

Do not trust arbitrary external routes.

---

# 49. SECURITY

Perform a mobile security review.

Protect against:

* token leakage;
* insecure local storage;
* unauthorized API access;
* unsafe deep links;
* malicious URLs;
* untrusted message rendering;
* sensitive logs;
* stale private cache;
* improper logout;
* WebSocket authentication issues.

Never trust client-side authorization.

---

# 50. PRIVACY

Do not unnecessarily persist:

* private message content;
* tokens;
* private media URLs;
* notification payloads;
* credentials.

Review:

* AsyncStorage;
* SecureStore;
* logs;
* crash reporting;
* analytics;
* screenshots/sensitive app state where applicable.

Respect platform privacy requirements.

---

# 51. ACCESSIBILITY

Implement mobile accessibility.

Support:

* VoiceOver;
* TalkBack;
* accessible labels;
* meaningful message state;
* accessible action sheets;
* accessible buttons;
* adequate touch targets;
* dynamic text sizing where practical;
* reduced motion where supported.

Do not make important functionality gesture-only.

---

# 52. THEMING

Implement a reusable theme system.

Support where required:

* light;
* dark;
* system.

Use theme tokens instead of hardcoded colors throughout screens.

Ensure message bubbles, text, icons, inputs, dialogs, and status indicators remain readable.

---

# 53. PERFORMANCE

Optimize:

* conversation list;
* message list;
* real-time updates;
* navigation;
* image rendering;
* state updates.

Avoid:

* unnecessary global state;
* full list rerenders;
* repeated API requests;
* duplicate sockets;
* expensive work on the JS thread.

Do not sacrifice correctness for premature optimization.

---

# 54. BACKGROUND/FOREGROUND

Handle mobile lifecycle correctly.

When backgrounded:

* clean up resources that should not remain active;
* rely on push infrastructure where appropriate;
* preserve required state.

When foregrounded:

* reconnect;
* synchronize;
* refresh stale state;
* restore UI.

Do not assume the process remains alive in background.

---

# 55. TESTING

Create comprehensive mobile tests.

## Unit tests

Test:

* state transitions;
* message formatting;
* event normalization;
* pagination;
* cache updates;
* validation;
* synchronization logic.

## Component tests

Test:

* conversation list;
* message item;
* composer;
* action sheet;
* replies;
* reactions;
* loading/error states.

## Integration tests

Test:

* authentication;
* API client;
* WebSocket event handling;
* cache reconciliation;
* reconnect;
* foreground/background transitions.

---

# 56. E2E TESTS

Where the repository supports mobile E2E testing, cover:

1. application launch;
2. authentication;
3. session restoration;
4. conversation list;
5. open conversation;
6. send message;
7. receive real-time message;
8. reply;
9. react;
10. edit;
11. delete;
12. read receipt;
13. reconnect;
14. synchronize;
15. logout.

Use the actual mobile test framework already established by the repository.

---

# 57. ERROR BOUNDARIES

Implement appropriate React Native error recovery.

A failure in a noncritical screen/component should not unnecessarily crash the entire application.

Provide recovery where possible.

Do not display raw stack traces.

---

# 58. OBSERVABILITY

Integrate mobile observability according to the existing project architecture.

Track technical signals such as:

* crash/error rate;
* API failures;
* WebSocket failures;
* synchronization failures;
* message-send failures;
* app startup performance;
* notification registration failures.

Do not capture private message contents or authentication secrets.

---

# 59. CONFIGURATION

Use environment/configuration mechanisms appropriate for Expo.

Separate:

* development;
* testing;
* staging;
* production.

Do not commit secrets.

Do not embed backend credentials.

Validate required configuration.

---

# 60. IMPLEMENTATION ORDER

Unless repository dependencies require a safer sequence:

1. inspect repository;
2. establish mobile architecture;
3. establish Expo configuration;
4. implement navigation;
5. implement secure authentication;
6. implement API client;
7. configure TanStack Query;
8. configure Zustand;
9. implement device identity;
10. implement push-token foundation;
11. implement WebSocket service;
12. implement connection lifecycle;
13. implement event dispatcher;
14. implement synchronization;
15. implement application shell;
16. implement conversation list;
17. implement conversation screen;
18. implement message history;
19. implement message rendering;
20. implement composer;
21. implement send/retry;
22. implement delivery/read state;
23. implement typing;
24. implement presence;
25. implement replies;
26. implement reactions;
27. implement editing;
28. implement deletion;
29. implement group conversations;
30. implement membership updates;
31. implement offline/reconnect behavior;
32. implement accessibility;
33. implement security/privacy review;
34. add tests;
35. run production validation.

---

# 61. VALIDATION

Before declaring this phase complete:

* run formatting;
* run lint;
* run TypeScript checking;
* run unit tests;
* run component tests;
* run integration tests;
* run E2E tests where available;
* validate Expo configuration;
* validate development build;
* validate production build where available;
* verify authentication;
* verify API contracts;
* verify WebSocket behavior;
* verify synchronization;
* verify push-token registration;
* verify foreground/background transitions;
* verify accessibility.

Fix all actual failures.

Do not claim tests passed if they were not executed.

---

# 62. FINAL REPOSITORY REVIEW

Inspect the final diff.

Verify:

* no duplicate architecture;
* no duplicate API clients;
* no duplicate WebSocket connections;
* no fake backend calls;
* no placeholder screens;
* no TODO/FIXME implementation gaps;
* no secrets;
* no debug logging;
* no unnecessary dependency upgrades;
* no accidental unrelated changes.

Preserve existing work.

---

# 63. FINAL COMPLETION REPORT

At completion report:

### Implemented

Actual mobile functionality implemented.

### Modified

Actual files modified.

### Created

Actual files created.

### Navigation

Routes/navigators implemented.

### Authentication

Actual authentication/session behavior.

### API

Endpoints integrated.

### Realtime

WebSocket events and synchronization implemented.

### Messaging

Messaging functionality implemented.

### Push

Actual push-token foundation implemented.

### Testing

Tests actually added and executed.

### Validation

Commands actually executed and results.

### Remaining

Only genuine later-phase work.

Do not claim features that only have UI without functional backend integration.

---

# 64. NON-NEGOTIABLE RULES

Never:

* invent backend endpoints;
* invent WebSocket events;
* invent synchronization semantics;
* invent device contracts;
* fake push notifications;
* create fake messages;
* bypass server authorization;
* store sensitive credentials insecurely;
* expose tokens;
* trust client-side permissions;
* use placeholder implementations;
* use pseudo-code;
* leave TODO/FIXME implementation gaps;
* silently swallow errors;
* duplicate existing architecture;
* create multiple competing WebSocket connections;
* make Zustand the authoritative server database;
* claim tests passed without running them;
* claim functionality exists when it is only mocked.

Every mobile feature must integrate with the actual backend.

The mobile application must remain one coherent part of the same production-grade platform.

All contracts must remain consistent across:

* REST;
* WebSockets;
* authentication;
* device identity;
* conversations;
* messages;
* receipts;
* presence;
* synchronization;
* notifications;
* errors;
* pagination;
* IDs;
* timestamps;
* authorization.

The result must be production-ready, secure, accessible, responsive to mobile lifecycle behavior, observable, testable, and maintainabl

# Mobile Prompt — Volume 1 — React Native Foundation, Authentication, Navigation, Conversations, and Real-Time Messaging

## ROLE

You are the senior mobile engineering team responsible for implementing the production-grade mobile application for an enterprise real-time communication platform.

Work directly against the existing repository.

This is one implementation phase of one coherent system. The repository is the source of truth for all existing mobile implementation, backend contracts, REST APIs, WebSocket/Socket.IO contracts, authentication behavior, synchronization semantics, domain models, design system, and infrastructure assumptions.

Do not create a separate application.

Do not create a competing architecture.

Inspect the repository before modifying anything.

Reuse compatible existing implementation and make the smallest safe changes required.

---

# 1. PLATFORM CONTEXT

The application is an original enterprise-grade real-time communication platform inspired by modern messaging applications.

The mobile application must support:

* authentication;
* user identity;
* device registration;
* direct conversations;
* group conversations;
* message history;
* text messaging;
* delivery receipts;
* read receipts;
* reactions;
* replies;
* editing;
* deletion;
* forwarding;
* presence;
* typing indicators;
* real-time messaging;
* multi-device synchronization;
* push notifications;
* media attachments;
* responsive native mobile UX;
* secure session handling.

Advanced media, notifications, calling, and production hardening will be completed in subsequent mobile work.

Do not invent backend functionality.

---

# 2. MOBILE STACK

Use the repository's established mobile stack.

Where not already established, use:

* React Native;
* Expo;
* TypeScript;
* Zustand;
* TanStack Query;
* React Navigation;
* Socket.IO client or the repository's established WebSocket client;
* Expo-compatible native modules where appropriate.

Follow the versions already present in the repository.

Do not blindly upgrade dependencies.

Do not introduce a second navigation/state/API architecture.

---

# 3. PRIMARY OBJECTIVE

Build the complete production mobile foundation and core messaging experience.

This volume must establish:

1. React Native architecture;
2. Expo configuration;
3. navigation;
4. authentication;
5. secure session handling;
6. API client;
7. TanStack Query;
8. Zustand;
9. device identity;
10. push-token registration foundation;
11. WebSocket lifecycle;
12. real-time event handling;
13. synchronization;
14. conversation list;
15. conversation screen;
16. message history;
17. message rendering;
18. composer;
19. delivery/read state;
20. typing indicators;
21. presence;
22. reactions/replies/edit/delete;
23. group conversations;
24. mobile-specific UX;
25. accessibility;
26. testing foundations.

---

# 4. REPOSITORY-FIRST REQUIREMENT

Before implementing:

* inspect the complete repository;
* locate the mobile application;
* inspect package configuration;
* inspect Expo configuration;
* inspect TypeScript configuration;
* inspect navigation;
* inspect existing screens;
* inspect API clients;
* inspect generated types;
* inspect authentication;
* inspect storage;
* inspect Zustand stores;
* inspect TanStack Query configuration;
* inspect WebSocket implementation;
* inspect push notification registration;
* inspect backend contracts;
* inspect OpenAPI definitions;
* inspect mobile tests;
* inspect linting and formatting;
* inspect environment configuration.

If mobile code already exists:

* extend it;
* preserve compatible functionality;
* do not rewrite working code without reason.

---

# 5. MOBILE ARCHITECTURE

Establish scalable feature boundaries.

Use meaningful organization such as:

* app;
* navigation;
* features;
* screens;
* components;
* entities;
* hooks;
* services;
* API;
* realtime;
* state;
* storage;
* utilities;
* types;
* tests.

Avoid arbitrary folder proliferation.

Keep domain logic separate from presentation.

Do not place network/business logic directly inside screen components.

---

# 6. NAVIGATION

Implement the application's navigation hierarchy.

Support appropriate navigators for:

* authentication;
* authenticated application;
* conversation list;
* conversation detail;
* profile;
* settings;
* search.

Use React Navigation according to the repository architecture.

Handle:

* deep links;
* authentication transitions;
* nested navigation;
* back behavior;
* Android back button;
* iOS navigation expectations.

---

# 7. AUTHENTICATION

Integrate with the existing backend authentication system.

Support:

* login;
* registration where supported;
* logout;
* session restoration;
* token/session refresh;
* authentication errors;
* expired sessions;
* device/session association.

Do not implement authentication independently from the backend.

---

# 8. SECURE SESSION STORAGE

Use secure platform storage for sensitive authentication state.

On supported platforms, use the repository's secure storage mechanism.

Do not store long-lived sensitive tokens in plain AsyncStorage.

Do not log tokens.

Do not include credentials in navigation parameters.

---

# 9. AUTHENTICATION LIFECYCLE

Represent states such as:

* bootstrapping;
* unauthenticated;
* authenticated;
* refreshing;
* expired;
* error.

During authentication loss:

* disconnect WebSocket;
* clear protected query state where required;
* clear protected client state;
* remove sensitive cached data;
* navigate to authentication;
* prevent unauthorized requests.

Do not leave private conversation data visible after logout.

---

# 10. DEVICE IDENTITY

Integrate with the backend's device/session model.

A mobile installation must be distinguishable from other user devices according to the backend contract.

Support:

* device registration;
* device/session identification;
* device logout/revocation where supported;
* token rotation;
* push-token association.

Do not generate identities that conflict with backend ownership.

---

# 11. API CLIENT

Implement or extend a centralized API client.

Support:

* base URL;
* authentication;
* refresh/session handling;
* request timeout;
* cancellation;
* error normalization;
* response parsing;
* request correlation where supported;
* retry only when safe.

Do not scatter raw HTTP calls throughout screens.

---

# 12. API CONTRACTS

Use actual backend contracts.

Prefer generated API types where available.

Otherwise define strongly typed interfaces matching the backend.

Avoid:

* `any`;
* unsafe casts;
* guessed fields;
* duplicated incompatible models.

The backend remains authoritative.

---

# 13. TANSTACK QUERY

Use TanStack Query for server-owned state.

Manage:

* conversations;
* messages;
* profiles;
* membership;
* unread counts;
* search data;
* settings;
* media metadata where required.

Define stable query keys.

Do not duplicate all server state inside Zustand.

---

# 14. ZUSTAND

Use Zustand for client-owned state.

Examples:

* selected conversation;
* UI state;
* composer state;
* active reply;
* active edit;
* message selection;
* navigation-related transient state;
* connection state.

Do not make Zustand the authoritative messaging database.

---

# 15. MOBILE STORAGE

Define clear storage ownership.

Persistent local storage may contain appropriate non-sensitive application preferences such as:

* theme;
* UI preferences;
* draft state where safe;
* last selected UI state where appropriate.

Sensitive credentials must use secure storage.

Private message persistence must follow the application's actual privacy/security architecture.

Do not create an insecure offline database merely for convenience.

---

# 16. REAL-TIME CLIENT

Integrate the backend WebSocket/Socket.IO contract.

Create a centralized real-time service.

Support:

* authenticated connection;
* device association;
* connection lifecycle;
* reconnection;
* event validation;
* event routing;
* acknowledgements;
* synchronization;
* duplicate events;
* stale events.

Do not create one WebSocket connection per screen.

---

# 17. MOBILE CONNECTION LIFECYCLE

Mobile applications frequently transition through:

* foreground;
* background;
* inactive;
* suspended;
* network changes.

Handle AppState transitions.

When entering background:

* follow the backend/platform push architecture;
* avoid unnecessary persistent socket activity if the platform does not support it reliably.

When returning to foreground:

* reconnect if needed;
* synchronize missed events;
* reconcile state.

Do not assume a mobile WebSocket remains connected indefinitely.

---

# 18. REAL-TIME EVENT HANDLER

Create a centralized event dispatcher.

Handle actual backend events for:

* message creation;
* message update;
* message deletion;
* reaction;
* delivery;
* read;
* conversation updates;
* membership;
* presence;
* typing;
* synchronization.

Update TanStack Query cache or client state appropriately.

---

# 19. EVENT IDEMPOTENCY

Mobile clients must tolerate:

* duplicate events;
* delayed events;
* out-of-order events;
* reconnect replay.

Use:

* event IDs;
* message IDs;
* server sequence;
* conversation sequence;
* synchronization cursor.

Never append a message blindly because an event arrived.

Prevent receipt regression.

---

# 20. SYNCHRONIZATION

Integrate with the backend multi-device synchronization protocol.

Trigger synchronization on:

* application startup;
* authentication;
* foreground;
* reconnect;
* detected event gap;
* device/session recovery.

Use the backend's actual sync cursor/sequence contracts.

Do not treat WebSocket delivery as durable storage.

---

# 21. CONVERSATION LIST

Implement the main conversation list.

Each item should support:

* avatar;
* display name;
* latest message;
* timestamp;
* unread count;
* muted state;
* pinned state where supported;
* typing state;
* message state where appropriate.

Use backend-authoritative ordering.

---

# 22. CONVERSATION LIST UPDATES

When a new message arrives:

* update preview;
* update timestamp;
* update ordering;
* update unread state;
* avoid duplicate entries.

Respect the active conversation.

Do not create notification-like behavior inside the conversation list that conflicts with push notifications.

---

# 23. CONVERSATION SCREEN

Implement the primary mobile conversation experience.

Include:

* header;
* participant/group information;
* presence;
* message list;
* composer;
* typing indicator;
* connection state where useful;
* unread marker.

The interface must feel native to mobile.

---

# 24. MESSAGE HISTORY

Load messages using backend cursor pagination.

Support:

* initial history;
* older messages;
* loading;
* retry;
* empty state;
* deleted messages;
* edited messages;
* synchronization.

Maintain scroll position when loading older messages.

Do not unexpectedly jump the user.

---

# 25. MESSAGE LIST PERFORMANCE

Optimize message rendering.

Use:

* `FlatList`;
* `FlashList` if already adopted and appropriate;
* stable keys;
* memoized message components;
* efficient item rendering.

Do not render huge conversations as one giant React tree.

Avoid unnecessary rerenders when typing or presence changes.

---

# 26. MESSAGE RENDERING

Support:

* text;
* system messages;
* edited state;
* deleted state;
* delivery state;
* read state;
* reactions;
* replies;
* forwarded state;
* media placeholders.

Use server ordering.

---

# 27. MESSAGE COMPOSER

Implement a mobile-optimized composer.

Support:

* multiline text;
* send;
* keyboard handling;
* reply mode;
* edit mode;
* draft preservation;
* message length validation;
* disabled/loading state.

Ensure the composer behaves correctly with:

* iOS keyboard;
* Android keyboard;
* safe areas;
* screen resizing;
* navigation transitions.

---

# 28. SEND MESSAGE

Implement:

1. local validation;
2. client idempotency identifier where required;
3. backend submission;
4. pending state;
5. canonical server reconciliation;
6. success;
7. failure;
8. retry.

Never invent server IDs or timestamps.

---

# 29. FAILED SENDS

Display failed messages clearly.

Allow:

* retry;
* remove failed item;
* preserve text;
* recover after reconnection.

Do not silently discard user content.

---

# 30. DELIVERY AND READ STATES

Display actual server-authoritative states:

* sending;
* sent;
* delivered;
* read;
* failed.

Ensure stale events cannot regress state.

Integrate with multi-device semantics.

---

# 31. READ RECEIPTS

Implement read behavior using the backend contract.

Consider:

* active conversation;
* visible messages;
* app foreground state;
* scroll position.

Batch receipts where appropriate.

Do not send read events continuously while scrolling.

---

# 32. TYPING INDICATORS

Integrate with backend typing events.

Support:

* start;
* stop;
* debounce/throttle;
* timeout;
* cleanup;
* disconnect handling;
* multiple participants.

Typing is ephemeral.

Never persist typing state as a durable message.

---

# 33. PRESENCE

Display backend-provided presence.

Support:

* online;
* offline;
* last seen where allowed;
* unavailable.

Respect privacy settings.

Do not infer presence merely from recent local activity.

---

# 34. REPLIES

Implement reply interactions.

Support:

* selecting a message to reply;
* displaying referenced-message preview;
* canceling reply;
* rendering reply metadata;
* navigating to original message.

Handle deleted/unavailable referenced messages.

---

# 35. REACTIONS

Implement reaction UI.

Support:

* add;
* remove;
* display counts;
* real-time updates.

Prevent duplicate reactions.

Use server-authoritative state.

---

# 36. MESSAGE EDITING

Implement editing.

Support:

* enter edit mode;
* populate composer;
* cancel;
* submit;
* display edited state;
* failure handling.

Respect backend authorization.

---

# 37. MESSAGE DELETION

Support backend-defined:

* delete for self;
* delete for everyone.

Represent deleted messages correctly.

Do not simply erase them if backend uses tombstones.

Ensure replies and real-time state remain consistent.

---

# 38. MESSAGE ACTION SHEET

Use mobile-native interaction patterns such as:

* action sheet;
* contextual menu;
* bottom sheet;
* long press.

Support available actions:

* reply;
* react;
* forward;
* edit;
* delete;
* copy;
* retry;
* select.

Only expose actions supported by backend authorization.

---

# 39. GROUP CONVERSATIONS

Support direct and group conversations.

For groups display:

* group avatar;
* group name;
* sender names;
* participant information;
* system membership messages.

React to membership changes in real time.

---

# 40. MEMBERSHIP REVOCATION

If the current user loses access:

* remove protected conversation state;
* close the conversation;
* navigate appropriately;
* invalidate cached data;
* prevent additional requests.

Do not rely on hiding the screen.

---

# 41. MOBILE UX

Follow platform conventions.

Use:

* safe-area handling;
* touch targets of appropriate size;
* native-feeling gestures;
* appropriate keyboard avoidance;
* pull-to-refresh where useful;
* platform-specific interaction patterns when justified.

Avoid blindly reproducing desktop web layouts.

---

# 42. LOADING STATES

Implement intentional states for:

* application bootstrap;
* authentication;
* conversation list;
* message history;
* message send;
* profile;
* settings;
* synchronization.

Use skeletons/placeholders where they improve perceived performance.

Do not leave blank screens.

---

# 43. ERROR STATES

Provide recovery for:

* network failure;
* session expiration;
* API failure;
* WebSocket failure;
* synchronization failure;
* message send failure;
* conversation loading failure.

Use retry where appropriate.

Do not expose technical stack traces.

---

# 44. EMPTY STATES

Provide intentional states for:

* no conversations;
* empty conversation;
* no search results;
* no available content.

Do not confuse empty with loading or error.

---

# 45. OFFLINE BEHAVIOR

Provide graceful network-loss behavior.

At minimum:

* show connection status;
* preserve drafts;
* preserve unsent message content;
* recover state on reconnect;
* synchronize missed messages.

Do not claim fully offline-capable messaging unless the repository actually implements a durable offline queue.

---

# 46. PUSH NOTIFICATION FOUNDATION

Integrate with the backend push-token system.

Establish the foundation for:

* device push token acquisition;
* token registration;
* token rotation;
* logout/unregistration;
* permission state.

Use Expo-compatible notification APIs where appropriate.

Do not hardcode provider credentials.

---

# 47. NOTIFICATION PRIVACY

Respect backend notification preferences.

Do not display private message content in local UI notifications if the user's privacy settings prohibit previews.

The backend remains authoritative for push payload policy.

---

# 48. DEEP LINK FOUNDATION

Prepare navigation for notification/deep-link targets.

Support safe navigation to:

* conversation;
* message;
* profile;
* settings where appropriate.

After navigation, synchronize data.

Do not trust arbitrary external routes.

---

# 49. SECURITY

Perform a mobile security review.

Protect against:

* token leakage;
* insecure local storage;
* unauthorized API access;
* unsafe deep links;
* malicious URLs;
* untrusted message rendering;
* sensitive logs;
* stale private cache;
* improper logout;
* WebSocket authentication issues.

Never trust client-side authorization.

---

# 50. PRIVACY

Do not unnecessarily persist:

* private message content;
* tokens;
* private media URLs;
* notification payloads;
* credentials.

Review:

* AsyncStorage;
* SecureStore;
* logs;
* crash reporting;
* analytics;
* screenshots/sensitive app state where applicable.

Respect platform privacy requirements.

---

# 51. ACCESSIBILITY

Implement mobile accessibility.

Support:

* VoiceOver;
* TalkBack;
* accessible labels;
* meaningful message state;
* accessible action sheets;
* accessible buttons;
* adequate touch targets;
* dynamic text sizing where practical;
* reduced motion where supported.

Do not make important functionality gesture-only.

---

# 52. THEMING

Implement a reusable theme system.

Support where required:

* light;
* dark;
* system.

Use theme tokens instead of hardcoded colors throughout screens.

Ensure message bubbles, text, icons, inputs, dialogs, and status indicators remain readable.

---

# 53. PERFORMANCE

Optimize:

* conversation list;
* message list;
* real-time updates;
* navigation;
* image rendering;
* state updates.

Avoid:

* unnecessary global state;
* full list rerenders;
* repeated API requests;
* duplicate sockets;
* expensive work on the JS thread.

Do not sacrifice correctness for premature optimization.

---

# 54. BACKGROUND/FOREGROUND

Handle mobile lifecycle correctly.

When backgrounded:

* clean up resources that should not remain active;
* rely on push infrastructure where appropriate;
* preserve required state.

When foregrounded:

* reconnect;
* synchronize;
* refresh stale state;
* restore UI.

Do not assume the process remains alive in background.

---

# 55. TESTING

Create comprehensive mobile tests.

## Unit tests

Test:

* state transitions;
* message formatting;
* event normalization;
* pagination;
* cache updates;
* validation;
* synchronization logic.

## Component tests

Test:

* conversation list;
* message item;
* composer;
* action sheet;
* replies;
* reactions;
* loading/error states.

## Integration tests

Test:

* authentication;
* API client;
* WebSocket event handling;
* cache reconciliation;
* reconnect;
* foreground/background transitions.

---

# 56. E2E TESTS

Where the repository supports mobile E2E testing, cover:

1. application launch;
2. authentication;
3. session restoration;
4. conversation list;
5. open conversation;
6. send message;
7. receive real-time message;
8. reply;
9. react;
10. edit;
11. delete;
12. read receipt;
13. reconnect;
14. synchronize;
15. logout.

Use the actual mobile test framework already established by the repository.

---

# 57. ERROR BOUNDARIES

Implement appropriate React Native error recovery.

A failure in a noncritical screen/component should not unnecessarily crash the entire application.

Provide recovery where possible.

Do not display raw stack traces.

---

# 58. OBSERVABILITY

Integrate mobile observability according to the existing project architecture.

Track technical signals such as:

* crash/error rate;
* API failures;
* WebSocket failures;
* synchronization failures;
* message-send failures;
* app startup performance;
* notification registration failures.

Do not capture private message contents or authentication secrets.

---

# 59. CONFIGURATION

Use environment/configuration mechanisms appropriate for Expo.

Separate:

* development;
* testing;
* staging;
* production.

Do not commit secrets.

Do not embed backend credentials.

Validate required configuration.

---

# 60. IMPLEMENTATION ORDER

Unless repository dependencies require a safer sequence:

1. inspect repository;
2. establish mobile architecture;
3. establish Expo configuration;
4. implement navigation;
5. implement secure authentication;
6. implement API client;
7. configure TanStack Query;
8. configure Zustand;
9. implement device identity;
10. implement push-token foundation;
11. implement WebSocket service;
12. implement connection lifecycle;
13. implement event dispatcher;
14. implement synchronization;
15. implement application shell;
16. implement conversation list;
17. implement conversation screen;
18. implement message history;
19. implement message rendering;
20. implement composer;
21. implement send/retry;
22. implement delivery/read state;
23. implement typing;
24. implement presence;
25. implement replies;
26. implement reactions;
27. implement editing;
28. implement deletion;
29. implement group conversations;
30. implement membership updates;
31. implement offline/reconnect behavior;
32. implement accessibility;
33. implement security/privacy review;
34. add tests;
35. run production validation.

---

# 61. VALIDATION

Before declaring this phase complete:

* run formatting;
* run lint;
* run TypeScript checking;
* run unit tests;
* run component tests;
* run integration tests;
* run E2E tests where available;
* validate Expo configuration;
* validate development build;
* validate production build where available;
* verify authentication;
* verify API contracts;
* verify WebSocket behavior;
* verify synchronization;
* verify push-token registration;
* verify foreground/background transitions;
* verify accessibility.

Fix all actual failures.

Do not claim tests passed if they were not executed.

---

# 62. FINAL REPOSITORY REVIEW

Inspect the final diff.

Verify:

* no duplicate architecture;
* no duplicate API clients;
* no duplicate WebSocket connections;
* no fake backend calls;
* no placeholder screens;
* no TODO/FIXME implementation gaps;
* no secrets;
* no debug logging;
* no unnecessary dependency upgrades;
* no accidental unrelated changes.

Preserve existing work.

---

# 63. FINAL COMPLETION REPORT

At completion report:

### Implemented

Actual mobile functionality implemented.

### Modified

Actual files modified.

### Created

Actual files created.

### Navigation

Routes/navigators implemented.

### Authentication

Actual authentication/session behavior.

### API

Endpoints integrated.

### Realtime

WebSocket events and synchronization implemented.

### Messaging

Messaging functionality implemented.

### Push

Actual push-token foundation implemented.

### Testing

Tests actually added and executed.

### Validation

Commands actually executed and results.

### Remaining

Only genuine later-phase work.

Do not claim features that only have UI without functional backend integration.

---

# 64. NON-NEGOTIABLE RULES

Never:

* invent backend endpoints;
* invent WebSocket events;
* invent synchronization semantics;
* invent device contracts;
* fake push notifications;
* create fake messages;
* bypass server authorization;
* store sensitive credentials insecurely;
* expose tokens;
* trust client-side permissions;
* use placeholder implementations;
* use pseudo-code;
* leave TODO/FIXME implementation gaps;
* silently swallow errors;
* duplicate existing architecture;
* create multiple competing WebSocket connections;
* make Zustand the authoritative server database;
* claim tests passed without running them;
* claim functionality exists when it is only mocked.

Every mobile feature must integrate with the actual backend.

The mobile application must remain one coherent part of the same production-grade platform.

All contracts must remain consistent across:

* REST;
* WebSockets;
* authentication;
* device identity;
* conversations;
* messages;
* receipts;
* presence;
* synchronization;
* notifications;
* errors;
* pagination;
* IDs;
* timestamps;
* authorization.

The result must be production-ready, secure, accessible, responsive to mobile lifecycle behavior, observable, testable, and maintainable.

You are operating in Senior Engineering Team Mode.

Build the production-ready mobile application foundation for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The mobile application must consume the established backend API, WebSocket, authentication, authorization, synchronization, notification, media, and call contracts.

Do not redesign backend APIs.

Do not redesign the database.

Do not implement backend code.

Do not implement web frontend code.

Do not implement infrastructure implementation code.

Do not generate Terraform.

Do not generate Kubernetes manifests.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Build the production-ready React Native mobile application foundation for:

• Android
• iOS

The application must support:

• Authentication
• Account management
• Profiles
• Contacts
• Conversations
• Real-time messaging
• Offline messaging
• Message synchronization
• Multi-device synchronization
• Push notifications
• Presence
• Groups
• Communities
• Media sharing
• Voice messages
• Stories/status
• Voice calls
• Video calls
• Device management
• Privacy settings
• Security settings

The mobile application must be:

• Performant
• Secure
• Accessible
• Offline-capable
• Reliable on unreliable networks
• Battery-conscious
• Maintainable
• Scalable
• Production-ready

────────────────────────────────────────

TECHNOLOGY STACK

Framework:

• React Native
• Expo
• TypeScript

Navigation:

• React Navigation

State Management:

• Zustand

Server State:

• TanStack Query

Forms:

• React Hook Form
• Zod

Networking:

• Typed API client
• WebSockets
• Socket.IO client where appropriate

Secure Storage:

• Expo Secure Store or approved secure platform storage

Push Notifications:

• Firebase Cloud Messaging
• Apple Push Notification Service through the approved notification abstraction

Local Persistence:

• SQLite or approved persistent local database

Background Processing:

• Expo-compatible background tasks
• Platform-specific background capabilities where required

Media:

• Expo image/media APIs
• Approved native modules where required

Calls:

• WebRTC-compatible React Native implementation

────────────────────────────────────────

MOBILE ARCHITECTURE

Use:

• Feature-first organization
• Strict TypeScript
• Reusable components
• Clean Architecture principles where appropriate
• Separation of UI and business logic
• Explicit synchronization boundaries
• Dependency inversion where useful

Do not put business logic directly inside screen components.

Do not duplicate backend authorization logic.

Do not assume permanent network connectivity.

────────────────────────────────────────

APPLICATION STRUCTURE

Organize the application around:

• Authentication
• Onboarding
• Conversations
• Messaging
• Contacts
• Groups
• Communities
• Presence
• Media
• Stories
• Notifications
• Calls
• Devices
• Privacy
• Security
• Settings

Shared infrastructure must include:

• API client
• WebSocket client
• Authentication
• Local database
• Synchronization engine
• Push notifications
• Secure storage
• Background tasks
• Connectivity detection
• Error handling
• Logging
• Analytics interfaces

────────────────────────────────────────

FOLDER STRUCTURE

Create a scalable mobile structure including appropriate areas for:

app/

src/

features/

components/

navigation/

screens/

hooks/

providers/

services/

stores/

database/

sync/

notifications/

storage/

media/

calls/

lib/

config/

types/

utils/

assets/

tests/

Keep features isolated.

Do not create unnecessary abstraction layers.

────────────────────────────────────────

EXPO FOUNDATION

Implement:

• Expo configuration
• Application entry point
• Environment configuration
• App metadata
• App versioning
• Platform configuration
• Development configuration
• Production configuration

Support:

• Android
• iOS

Define platform-specific configuration only where required.

────────────────────────────────────────

NAVIGATION

Implement React Navigation architecture.

Support:

• Authentication stack
• Onboarding
• Main application navigation
• Conversation navigation
• Group navigation
• Community navigation
• Story navigation
• Call navigation
• Settings
• Devices
• Privacy
• Security

Support:

• Deep linking
• Authenticated navigation
• Protected screens
• Nested navigation
• Modal screens where appropriate
• Call overlays where appropriate

Never rely only on frontend navigation for authorization.

────────────────────────────────────────

AUTHENTICATION

Implement mobile authentication flows.

Support:

• Registration
• Login
• Logout
• Verification
• Password reset
• Password change
• Session restoration
• Session expiration
• Refresh
• Device registration

Use secure storage for sensitive authentication state.

Do not store tokens in plain AsyncStorage or equivalent insecure storage.

────────────────────────────────────────

SECURE STORAGE

Implement secure storage for:

• Authentication credentials/tokens
• Device identifiers where appropriate
• Encryption-related metadata where applicable
• Security settings

Separate:

• Secure secrets
• Cached application data
• Non-sensitive preferences

Do not store sensitive secrets in normal application storage.

────────────────────────────────────────

DEVICE REGISTRATION

Implement:

• Device registration
• Device identification
• Device capabilities
• Push token association
• Device name
• Device metadata
• Device revocation handling
• Remote logout

Send only necessary device information to the backend.

────────────────────────────────────────

LOCAL DATABASE

Implement a persistent local database for mobile synchronization.

Store appropriate local data such as:

• Conversations
• Messages
• Message states
• Drafts
• Contacts/cache where appropriate
• Synchronization cursors
• Pending outgoing operations
• Notification state
• Local preferences

Define:

• Schema version
• Migrations
• Indexes
• Transactions
• Cleanup
• Retention

The local database must never replace the server as the authoritative source.

────────────────────────────────────────

OFFLINE-FIRST ARCHITECTURE

Implement offline support.

Support:

• Offline conversation viewing
• Offline message composition
• Pending outgoing messages
• Local message queue
• Retry
• Reconciliation
• Conflict handling
• Synchronization after reconnect
• Duplicate prevention

Display clear message states:

• Pending
• Sending
• Sent
• Delivered
• Read
• Failed

Do not silently lose locally composed messages.

────────────────────────────────────────

SYNCHRONIZATION ENGINE

Implement the mobile synchronization layer.

Support:

• Initial sync
• Incremental sync
• Delta synchronization
• Synchronization cursors
• Missed-event recovery
• Message reconciliation
• Conversation reconciliation
• Delivery-state synchronization
• Read-state synchronization
• Multi-device reconciliation

Define:

• Sync batches
• Cursor storage
• Retry behavior
• Backoff
• Deduplication
• Conflict handling
• Recovery

The client must not assume WebSocket events are received exactly once.

────────────────────────────────────────

NETWORK CONNECTIVITY

Implement connectivity detection.

Handle:

• Online
• Offline
• Weak connection
• Connection restoration
• Wi-Fi/cellular changes

When connectivity changes:

• Pause or defer unsuitable operations
• Retry appropriate operations
• Trigger synchronization
• Reconnect WebSockets
• Resume pending uploads

Avoid aggressive retry loops that consume battery and bandwidth.

────────────────────────────────────────

API CLIENT

Implement a typed API client.

Support:

• Authentication
• Request IDs
• Correlation IDs
• Error normalization
• Retry
• Timeout
• Cancellation
• Pagination
• Cursor pagination
• File uploads
• Download authorization

The client must integrate with TanStack Query.

────────────────────────────────────────

WEBSOCKET CLIENT

Implement mobile WebSocket infrastructure.

Support:

• Authentication
• Connection lifecycle
• Reconnection
• Heartbeats
• Backoff
• Network awareness
• Event subscriptions
• Event acknowledgments
• Duplicate handling
• Missed-event synchronization

Support real-time events for:

• Messages
• Delivery receipts
• Read receipts
• Reactions
• Typing
• Presence
• Groups
• Communities
• Notifications
• Calls

Do not keep unnecessary WebSocket connections active when the platform does not permit them.

────────────────────────────────────────

STATE MANAGEMENT

Use Zustand for client-owned state.

Use TanStack Query for server state.

Use the local database for durable offline state.

Maintain clear boundaries between:

• UI state
• Server state
• Persistent local state
• Synchronization state
• Secure state

Do not duplicate the same state unnecessarily across systems.

────────────────────────────────────────

CONVERSATION EXPERIENCE

Implement:

• Conversation list
• Active conversation
• Unread counts
• Last message preview
• Timestamps
• Muting
• Archive where supported
• Conversation settings
• Search within conversation

Optimize large conversation lists.

Use efficient list virtualization.

────────────────────────────────────────

MESSAGING EXPERIENCE

Implement:

• Text messages
• Replies
• Reactions
• Mentions
• Forwarding
• Editing
• Deletion
• Attachments
• Voice messages
• Documents

Support:

• Optimistic messages
• Pending state
• Retry
• Failure
• Server reconciliation
• Delivery states
• Read states

────────────────────────────────────────

MESSAGE COMPOSER

Implement:

• Text input
• Emoji
• Reply mode
• Mention selection
• Attachment selection
• Draft persistence
• Send
• Retry
• Cancel
• Message length validation

Handle:

• Keyboard behavior
• Safe areas
• Orientation changes where appropriate
• Offline operation
• Slow networks

────────────────────────────────────────

MESSAGE LIST PERFORMANCE

Optimize:

• Virtualized rendering
• Pagination
• Incremental loading
• Message grouping
• Image loading
• Media previews
• Re-render prevention

Support very long conversations without excessive memory consumption.

────────────────────────────────────────

PRESENCE AND TYPING

Display:

• Online
• Offline
• Last seen where permitted
• Typing
• Recording where applicable

Respect backend privacy rules.

Do not expose presence when access is denied.

────────────────────────────────────────

CONTACTS

Implement:

• Contact list
• Contact search
• Contact discovery
• Contact profile
• Block
• Unblock
• Invite flows where appropriate

Respect backend privacy and authorization.

────────────────────────────────────────

GROUPS

Implement:

• Group creation
• Group details
• Members
• Roles
• Add members
• Remove members
• Group settings
• Group avatar
• Group description
• Leave group
• Administrative actions

Only display controls permitted by the backend authorization model.

────────────────────────────────────────

COMMUNITIES

Implement:

• Community list
• Community details
• Community groups
• Community channels where appropriate
• Membership
• Announcements
• Community settings

Maintain clear navigation between direct conversations, groups, and communities.

────────────────────────────────────────

MEDIA

Implement mobile media workflows for:

• Images
• Videos
• Audio
• Voice messages
• Documents
• Stickers
• GIFs

Support:

• Camera
• Photo library
• File selection
• Preview
• Compression
• Upload progress
• Cancellation
• Retry
• Download
• Local caching

Use backend-issued upload authorization.

Do not route large files through unnecessary application servers.

────────────────────────────────────────

VOICE MESSAGES

Implement:

• Recording
• Permission handling
• Recording indicator
• Cancel
• Preview where appropriate
• Upload
• Retry
• Playback
• Progress
• Pause/resume where supported

Handle:

• Microphone permissions
• Interruptions
• Background transitions
• Storage limitations

────────────────────────────────────────

STORIES / STATUS

Implement:

• Story list
• Story viewer
• Story creation
• Text story
• Image story
• Video story
• Viewer list where authorized
• Story privacy
• Story deletion
• Expiration

Use efficient media loading.

────────────────────────────────────────

PUSH NOTIFICATIONS

Implement mobile push notification support.

Support:

• FCM
• APNS
• Device token registration
• Token refresh
• Notification permissions
• Notification handling
• Deep linking
• Notification categories
• Badge counts

Handle notifications when:

• App is foreground
• App is background
• App is terminated

Respect notification privacy.

────────────────────────────────────────

BACKGROUND TASKS

Implement appropriate background capabilities for:

• Synchronization
• Notification processing
• Upload completion
• Cleanup
• Refresh

Respect iOS and Android background execution constraints.

Do not assume unlimited background execution.

────────────────────────────────────────

DEEP LINKING

Implement deep links for:

• Conversations
• User profiles
• Groups
• Communities
• Stories
• Calls
• Notifications
• Authentication flows

Validate deep-link authorization server-side.

────────────────────────────────────────

CALL FOUNDATION

Implement mobile call UI and WebRTC integration boundaries.

Support:

• Incoming calls
• Outgoing calls
• Ringing
• Connecting
• Active call
• Reconnecting
• Ended call
• Failed call

Voice:

• Microphone
• Speaker
• Bluetooth where supported
• Mute

Video:

• Camera
• Front/back camera
• Video preview
• Participant display
• Camera permissions

Group:

• Participant grid
• Active speaker
• Participant states

Use the established backend signaling architecture.

────────────────────────────────────────

MOBILE PERMISSIONS

Implement proper permission flows for:

• Camera
• Microphone
• Notifications
• Photos/media
• File access where required
• Contacts where applicable

Request permissions contextually.

Handle:

• Denied
• Restricted
• Permanently denied
• Re-enable in settings

Never assume permissions are granted.

────────────────────────────────────────

PRIVACY

Implement mobile interfaces for:

• Last seen
• Online status
• Profile visibility
• Read receipts
• Contact discovery
• Group invitations
• Story privacy
• Blocking
• Notification privacy

Use backend state as the source of truth.

────────────────────────────────────────

SECURITY

Implement:

• Secure token storage
• Secure device registration
• App lock architecture where appropriate
• Secure deep links
• Safe URL handling
• Sensitive-data protection
• Secure local database strategy
• Screenshot/privacy boundaries where appropriate
• Certificate/security hardening where justified

Do not store secrets in plaintext.

────────────────────────────────────────

ACCESSIBILITY

Support:

• Screen readers
• Dynamic font sizes
• VoiceOver
• TalkBack
• Accessible labels
• Accessible navigation
• Focus management
• Sufficient contrast
• Reduced motion
• Touch target requirements

Do not rely only on color to communicate state.

────────────────────────────────────────

PERFORMANCE

Optimize:

• FlatList/FlashList or equivalent virtualization
• Memory usage
• Image caching
• Media caching
• Database queries
• WebSocket processing
• Synchronization batches
• Re-render frequency
• Startup time
• Navigation performance

Avoid unnecessary background processing.

────────────────────────────────────────

BATTERY AND DATA USAGE

Optimize:

• WebSocket reconnects
• Presence updates
• Background synchronization
• Push notifications
• Media downloads
• Uploads
• Polling

Prefer push/event-driven behavior over continuous polling.

Support cellular-data-conscious behavior where appropriate.

────────────────────────────────────────

ERROR HANDLING

Provide UI and recovery behavior for:

• Authentication failures
• Network failures
• Synchronization failures
• Upload failures
• Download failures
• WebSocket failures
• Call failures
• Permission failures
• Storage failures

Never silently discard user-created messages.

────────────────────────────────────────

TESTING

Generate:

UNIT TESTS

• Synchronization logic
• Message state transitions
• Offline queue
• Validation
• Utility functions

COMPONENT TESTS

• Messaging
• Composer
• Conversation list
• Stories
• Notifications
• Groups
• Calls
• Settings

INTEGRATION TESTS

• Local database
• API client
• WebSocket client
• Synchronization
• Push notifications

END-TO-END TESTS

• Registration
• Login
• Device registration
• Messaging
• Offline messaging
• Synchronization
• Groups
• Communities
• Media
• Stories
• Push notifications
• Calls

PERFORMANCE TESTS

• Large conversation histories
• Large message lists
• High event frequency
• Media operations
• Synchronization
• App startup

SECURITY TESTS

• Secure storage
• Authentication
• Deep links
• Permission boundaries
• Unauthorized resource access

────────────────────────────────────────

DOCUMENTATION

Generate:

• Mobile architecture
• Navigation architecture
• Local database architecture
• Synchronization architecture
• Offline strategy
• Push notification strategy
• Background-task strategy
• Deep-link strategy
• Secure-storage strategy
• Media strategy
• Call integration strategy
• Testing standards
• Accessibility standards
• Performance standards

────────────────────────────────────────

PROJECT INDEX

Maintain the mobile Project Index.

Track:

• Screens
• Navigation
• Components
• Stores
• Queries
• API integrations
• WebSocket integrations
• Local database models
• Synchronization modules
• Push notification modules
• Background tasks
• Media modules
• Call modules
• Tests
• Generated files
• Dependencies
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

MOBILE MILESTONE 1

Expo foundation, configuration, navigation, theme, API client, secure storage, error handling, and local database foundation.

MOBILE MILESTONE 2

Authentication, onboarding, account, profile, sessions, and device registration.

MOBILE MILESTONE 3

Conversation list, messaging, composer, local message persistence, and offline queues.

MOBILE MILESTONE 4

WebSockets, synchronization, delivery states, read states, presence, and typing.

MOBILE MILESTONE 5

Contacts, blocking, groups, and communities.

MOBILE MILESTONE 6

Media, voice messages, stories, and push notifications.

MOBILE MILESTONE 7

Voice/video calls and WebRTC integration.

MOBILE MILESTONE 8

Privacy, security, deep linking, background tasks, and device management.

MOBILE MILESTONE 9

Accessibility, performance, battery/data optimization, testing, and production hardening.

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

This volume covers the mobile application foundation and core communication experience.

Do not implement:

• Backend services
• Web frontend
• Kubernetes
• Terraform
• CI/CD infrastructure

Consume the established backend contracts exactly.

────────────────────────────────────────

QUALITY BAR

Treat the mobile application as a globally deployed production communication platform.

Assume:

• Large conversation histories
• Unreliable networks
• Background execution limitations
• Multiple devices
• High message volume
• Push notification traffic
• Large media
• Voice/video calls
• Strict privacy requirements
• Strict security requirements
• Android and iOS production deployment

Prioritize:

• Reliability
• Offline correctness
• Synchronization correctness
• Performance
• Battery efficiency
• Security
• Accessibility
• Maintainability
• Excellent mobile UX
• Production readiness
