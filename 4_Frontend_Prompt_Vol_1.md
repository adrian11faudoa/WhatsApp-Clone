# Frontend Prompt — Volume 1 — Application Foundation, Authentication, Navigation, Conversations, and Messaging

## ROLE

You are the senior frontend engineering team responsible for implementing the production-grade web application for an enterprise real-time communication platform.

Work directly against the existing repository.

This is one implementation phase of one coherent system. The repository is the source of truth for all existing implementation, backend contracts, API contracts, WebSocket contracts, authentication behavior, domain models, design conventions, and infrastructure assumptions.

Do not create a separate application.

Do not create a competing frontend architecture.

Inspect the repository before modifying anything and integrate with the actual implementation that exists.

---

# 1. PLATFORM CONTEXT

The application is an original enterprise-grade real-time communication platform inspired by modern messaging products.

The web application must support:

* authentication;
* user identity;
* device/session awareness;
* conversation list;
* direct conversations;
* group conversations;
* message history;
* text messaging;
* message delivery state;
* read state;
* reactions;
* replies;
* forwarding;
* editing;
* deletion;
* presence;
* typing indicators;
* real-time updates;
* multi-device synchronization;
* media attachments;
* notifications;
* search;
* settings;
* privacy controls;
* responsive desktop/tablet/mobile web experiences.

The frontend must consume the actual backend APIs and real-time contracts already present in the repository.

Do not invent APIs.

---

# 2. FRONTEND STACK

Use the repository's established frontend stack.

Where not already established, use:

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* Zustand
* WebSocket/Socket.IO client
* React Hook Form where appropriate
* Zod or the repository's established runtime validation solution

Follow existing package versions and conventions instead of blindly upgrading dependencies.

---

# 3. PRIMARY OBJECTIVE

Build the complete production frontend foundation and core messaging experience.

This volume must establish:

1. application architecture;
2. routing;
3. authentication flow;
4. session handling;
5. API client;
6. server-state management;
7. client-state management;
8. WebSocket lifecycle;
9. normalized real-time updates;
10. conversation list;
11. conversation screen;
12. message rendering;
13. message composer;
14. message actions;
15. unread state;
16. delivery/read state;
17. presence;
18. typing indicators;
19. responsive layouts;
20. loading/error/empty states;
21. accessibility;
22. testing foundations.

---

# 4. REPOSITORY INSPECTION

Before implementing:

* inspect all existing frontend files;
* inspect package configuration;
* inspect Next.js configuration;
* inspect routing;
* inspect global styles;
* inspect Tailwind configuration;
* inspect shadcn/ui components;
* inspect API clients;
* inspect generated API types if present;
* inspect authentication implementation;
* inspect state management;
* inspect existing hooks;
* inspect WebSocket implementation;
* inspect environment configuration;
* inspect testing configuration;
* inspect linting and formatting;
* inspect backend contracts;
* inspect OpenAPI-generated types if available.

Reuse existing architecture where compatible.

Do not replace working implementations unnecessarily.

---

# 5. APPLICATION ARCHITECTURE

Establish a clear scalable frontend architecture.

Organize code around meaningful boundaries such as:

* app;
* routes;
* features;
* entities;
* components;
* hooks;
* services;
* API;
* state;
* realtime;
* utilities;
* validation;
* types;
* tests.

Do not create arbitrary folders merely to satisfy an architecture diagram.

Feature boundaries should reflect actual domain ownership.

Avoid:

* giant components;
* global state for server data;
* duplicated API calls;
* duplicated WebSocket logic;
* circular dependencies;
* business logic inside presentational components.

---

# 6. ROUTING

Implement the application's primary authenticated and unauthenticated routes.

At minimum establish routes equivalent to:

* authentication;
* main application shell;
* conversations;
* conversation detail;
* settings;
* profile/account;
* search.

Use the repository's actual routing conventions.

Protected routes must require authenticated application state.

Unauthenticated users must not receive protected application data.

Do not depend only on client-side route hiding for authorization.

---

# 7. AUTHENTICATION

Integrate with the backend authentication system already implemented.

Support:

* login;
* registration where applicable;
* logout;
* session restoration;
* access-token handling;
* refresh-token/session renewal where supported;
* expired-session handling;
* authentication failures;
* device/session state.

Never store sensitive credentials insecurely.

Do not expose server secrets.

Do not duplicate authentication logic in the frontend if the backend already owns it.

---

# 8. AUTHENTICATION STATE

Create a reliable authentication state model.

Represent states such as:

* initializing;
* unauthenticated;
* authenticated;
* refreshing;
* session-expired;
* authentication-error.

Prevent application content from rendering using an incorrectly assumed authentication state.

Avoid UI flashes where practical.

Handle expired sessions consistently.

When authentication becomes invalid:

* stop authenticated WebSocket connections;
* clear protected server state where necessary;
* redirect appropriately;
* prevent unauthorized requests.

---

# 9. API CLIENT

Create or extend a centralized API client.

It must provide:

* consistent base URL handling;
* authentication;
* request headers;
* JSON serialization;
* error normalization;
* timeout behavior;
* cancellation;
* retry policy where appropriate;
* response parsing;
* request correlation where supported.

Do not scatter raw `fetch` calls throughout components.

---

# 10. API TYPES

Use the actual backend contracts.

Prefer generated types from OpenAPI if the repository provides them.

If generated types do not exist, define strongly typed client contracts matching the backend.

Do not duplicate backend domain definitions unnecessarily.

Avoid `any`.

Do not silently cast unknown API responses into trusted application objects.

Validate untrusted responses where appropriate.

---

# 11. SERVER STATE

Use TanStack Query for server-owned state where appropriate.

Manage:

* conversations;
* messages;
* profiles;
* membership;
* unread state;
* search;
* media metadata;
* notification settings.

Define stable query keys.

Avoid multiple incompatible cache representations of the same resource.

Use:

* query invalidation;
* targeted cache updates;
* optimistic updates only where safe;
* mutation rollback;
* stale-time policies;
* pagination;
* cancellation.

---

# 12. CLIENT STATE

Use Zustand only for client-owned state.

Examples:

* selected conversation;
* UI layout;
* composer state where appropriate;
* modal state;
* active reply target;
* active message action;
* sidebar state;
* connection UI state;
* transient interaction state.

Do not copy the entire server database into Zustand.

Do not duplicate TanStack Query data unnecessarily.

---

# 13. REAL-TIME ARCHITECTURE

Integrate the actual backend WebSocket/Socket.IO protocol.

Create one coherent real-time client layer.

It must manage:

* authentication;
* connection lifecycle;
* reconnection;
* disconnect;
* connection status;
* event parsing;
* event routing;
* acknowledgements;
* duplicate events;
* out-of-order events;
* synchronization;
* device/session identity.

Do not create one independent WebSocket connection per component.

---

# 14. WEBSOCKET LIFECYCLE

Handle:

* connecting;
* connected;
* reconnecting;
* disconnected;
* authentication failure;
* server errors;
* network changes;
* browser backgrounding;
* tab restoration.

When disconnected:

* show appropriate connection state;
* do not pretend messages were delivered;
* preserve unsent composer content;
* recover state after reconnection.

Do not create infinite reconnect loops.

Use bounded/exponential reconnection behavior compatible with the backend.

---

# 15. REAL-TIME EVENT NORMALIZATION

Create a central event dispatcher.

Handle existing event types for:

* new message;
* message update;
* message deletion;
* reaction update;
* delivery receipt;
* read receipt;
* conversation update;
* membership update;
* presence;
* typing;
* notification;
* synchronization events.

Each event must update the appropriate TanStack Query cache or client state.

Do not duplicate event handling across unrelated components.

---

# 16. EVENT IDEMPOTENCY

The frontend must tolerate duplicate events.

Use:

* message IDs;
* event IDs;
* server sequence numbers;
* conversation sequence;
* timestamps only where appropriate.

Never blindly append a message every time a real-time event arrives.

Prevent:

* duplicate messages;
* duplicate reactions;
* receipt regression;
* stale updates overwriting newer state.

---

# 17. MULTI-DEVICE SYNCHRONIZATION

Integrate with the backend synchronization model.

On:

* initial login;
* application startup;
* reconnect;
* WebSocket recovery;
* detected event gap;

the client must synchronize missing state.

Do not depend on WebSocket delivery as the only source of truth.

Implement appropriate:

* sync cursor;
* last-known sequence;
* gap detection;
* recovery;
* cache reconciliation.

---

# 18. APPLICATION SHELL

Build the main authenticated application shell.

Desktop layout should support:

* navigation/sidebar;
* conversation list;
* active conversation;
* contextual panels where required.

The shell must be responsive.

Do not create a desktop-only fixed-width experience.

Support narrow screens with an appropriate navigation model.

---

# 19. CONVERSATION LIST

Implement a production-quality conversation list.

Each conversation item should support:

* avatar;
* display name;
* latest message preview;
* timestamp;
* unread count;
* muted state;
* pinned state where supported;
* message status where appropriate;
* typing indicator;
* presence indication where appropriate.

Sort according to backend-authoritative conversation ordering.

Do not derive authoritative ordering solely from client timestamps.

---

# 20. CONVERSATION LIST REAL-TIME UPDATES

When a message arrives:

* update the appropriate conversation preview;
* update ordering;
* increment unread state where appropriate;
* respect currently active conversation;
* respect muted conversations;
* avoid duplicate updates.

When a conversation is deleted, archived, muted, pinned, or otherwise updated:

* update the list without requiring a full page reload.

---

# 21. CONVERSATION SCREEN

Implement the primary conversation experience.

Include:

* conversation header;
* participant information;
* presence;
* message timeline;
* message composer;
* scrolling;
* pagination;
* unread marker;
* typing indicator;
* connection status where appropriate.

The conversation view must support both direct and group conversations.

---

# 22. MESSAGE HISTORY

Load messages using backend cursor pagination.

Do not use arbitrary page-number assumptions if the backend uses cursors.

Support:

* initial history;
* older-message pagination;
* loading indicators;
* empty conversations;
* retry;
* synchronization;
* deleted messages;
* edited messages.

Preserve scroll position when loading older messages.

Do not jump the user unexpectedly to the bottom.

---

# 23. MESSAGE TIMELINE

Render messages according to their canonical server ordering.

Support:

* sender identity;
* timestamp;
* message content;
* edited state;
* deleted state;
* delivery state;
* read state;
* reactions;
* replies;
* forwarded state;
* media preview;
* system messages.

Do not trust client ordering when server sequence information exists.

---

# 24. MESSAGE GROUPING

Provide sensible visual grouping by:

* sender;
* temporal proximity;
* conversation context.

Do not change actual message ordering.

System messages should be visually distinct.

Group messages should clearly identify senders.

---

# 25. TEXT MESSAGE COMPOSER

Implement a robust message composer.

Support:

* text entry;
* send;
* Enter behavior;
* Shift+Enter where appropriate;
* multiline input;
* disabled/loading state;
* empty-message prevention;
* message length limits;
* draft preservation;
* reply mode;
* edit mode.

Respect backend validation limits.

Do not rely only on frontend limits.

---

# 26. SEND MESSAGE FLOW

When sending:

1. validate locally;
2. create client message ID/idempotency key where required;
3. submit to backend;
4. represent pending state;
5. reconcile with canonical server message;
6. handle success;
7. handle failure;
8. preserve retry capability where appropriate.

If the backend supports optimistic messaging, implement it according to the actual contract.

Never fabricate server-authoritative message IDs or timestamps.

---

# 27. FAILED MESSAGES

Represent failed sends clearly.

Support:

* retry;
* delete failed draft;
* inspect error;
* preserve content.

Do not silently lose user-written messages.

Do not falsely display failed messages as delivered.

---

# 28. DELIVERY AND READ STATES

Render server-authoritative state such as:

* sending;
* sent;
* delivered;
* read;
* failed.

Use monotonic updates.

A stale WebSocket event must not visually regress a message from READ to DELIVERED.

Integrate with the backend's multi-device receipt semantics.

---

# 29. READ RECEIPTS

Implement read behavior according to backend semantics.

Do not mark messages read merely because they exist in the DOM.

Consider:

* active conversation;
* visibility;
* scroll position;
* focus;
* application state.

Batch read updates when appropriate.

Do not generate excessive network traffic.

---

# 30. TYPING INDICATORS

Integrate with the backend typing protocol.

Support:

* start typing;
* stop typing;
* automatic timeout;
* cleanup on unmount;
* connection loss;
* multiple participants.

Do not send typing events on every keystroke.

Throttle/debounce appropriately.

Typing indicators are ephemeral and must never be treated as durable message state.

---

# 31. PRESENCE

Display presence according to backend-provided information.

Support:

* online;
* offline;
* last seen where permitted;
* unknown/unavailable.

Respect privacy settings.

Do not infer online status from unreliable client assumptions.

---

# 32. MESSAGE ACTIONS

Implement UI for supported message actions:

* reply;
* react;
* forward;
* edit;
* delete;
* copy;
* retry;
* select.

Only expose actions allowed by the backend and current authorization state.

Do not assume that the sender can perform an action indefinitely.

---

# 33. REPLIES

Implement reply UI.

Display:

* referenced message preview;
* sender;
* content/media summary;
* navigation to original message.

If the original message is deleted:

* render the appropriate deleted/unavailable state;
* do not expose unauthorized content.

---

# 34. REACTIONS

Implement reaction UI.

Support:

* adding;
* removing;
* viewing counts;
* displaying users where permitted.

Use server-authoritative reaction state.

Handle real-time reaction changes without duplicating reactions.

---

# 35. EDITING

Implement message editing according to backend rules.

Support:

* entering edit mode;
* loading existing content;
* canceling;
* submitting;
* displaying edited state;
* handling conflicts/failures.

Do not allow editing messages that backend authorization rejects.

---

# 36. MESSAGE DELETION

Implement:

* delete for self;
* delete for everyone;

where supported by backend.

Display the correct state after deletion.

Do not merely remove the DOM element if the backend represents deletion as a tombstone/event.

Maintain reply/search/realtime consistency.

---

# 37. GROUP CONVERSATIONS

The core UI must support group conversations.

Display:

* group name;
* group avatar;
* participant context;
* sender names;
* membership changes;
* system messages.

Respect membership changes in real time.

If the current user loses access:

* remove protected conversation data;
* close or redirect the conversation view;
* prevent further access.

---

# 38. ACCESSIBILITY

Build accessible UI from the beginning.

Support:

* keyboard navigation;
* focus management;
* semantic HTML;
* ARIA only where needed;
* screen-reader-friendly message state;
* accessible dialogs;
* accessible menus;
* accessible buttons;
* sufficient focus visibility;
* reduced-motion preferences.

Do not make an interaction accessible only through mouse events.

---

# 39. RESPONSIVE DESIGN

Support:

### Desktop

* multi-column messaging workspace.

### Tablet

* adaptive sidebar and conversation layout.

### Mobile web

* conversation list and conversation view transition;
* touch-friendly actions;
* appropriate keyboard handling;
* viewport-safe composer;
* no horizontal overflow.

Do not simply shrink desktop UI.

---

# 40. DESIGN SYSTEM

Use the existing design system if one exists.

Otherwise establish reusable components for:

* buttons;
* inputs;
* avatars;
* dialogs;
* dropdown menus;
* tooltips;
* badges;
* tabs;
* loading states;
* skeletons;
* alerts;
* message bubbles;
* conversation items.

Use shadcn/ui consistently where appropriate.

Do not create dozens of visually inconsistent one-off components.

---

# 41. THEMING

Support a coherent theme architecture.

Where applicable:

* light mode;
* dark mode;
* system preference.

Ensure messaging surfaces remain readable in every supported theme.

Do not hardcode colors throughout components.

Use design tokens/theme variables.

---

# 42. LOADING STATES

Every asynchronous surface must have an intentional loading state.

Examples:

* authentication;
* conversation list;
* message history;
* message send;
* message actions;
* search;
* profile;
* settings.

Avoid blank screens.

Avoid indefinite spinners without recovery.

---

# 43. ERROR STATES

Implement user-friendly errors for:

* network failure;
* authentication expiration;
* server error;
* message send failure;
* conversation loading failure;
* synchronization failure;
* media failure;
* permission denial.

Provide retry where meaningful.

Do not expose stack traces or infrastructure errors.

---

# 44. EMPTY STATES

Design intentional empty states for:

* no conversations;
* no messages;
* no search results;
* no notifications;
* no media;
* no matching users.

Empty states must not be confused with loading or error states.

---

# 45. PERFORMANCE

Optimize for large conversations.

Avoid rendering thousands of messages unnecessarily.

Use appropriate virtualization/windowing when required.

Avoid:

* unnecessary global rerenders;
* unstable callback chains;
* excessive WebSocket subscriptions;
* duplicated queries;
* large state copies.

Keep message interactions responsive.

Do not prematurely optimize at the expense of correctness.

---

# 46. MESSAGE CACHE MANAGEMENT

Implement predictable cache updates.

When a message is:

* created;
* edited;
* deleted;
* reacted to;
* delivered;
* read;

update the relevant cached conversation and message data.

Do not invalidate the entire application after every event.

Prefer targeted updates.

---

# 47. OFFLINE AND RECONNECT BEHAVIOR

Provide graceful behavior when the browser temporarily loses connectivity.

Support:

* connection indicator;
* preserved drafts;
* reconnect;
* state synchronization;
* failed-message recovery.

Do not claim full offline messaging unless the backend and client architecture actually supports durable offline queues.

---

# 48. SECURITY

Treat all backend data as untrusted input.

Protect against:

* XSS;
* unsafe HTML rendering;
* malicious URLs;
* unsafe filenames;
* injected message content;
* unauthorized client-side routes;
* token leakage;
* sensitive data in local storage;
* unsafe third-party content.

Never render message HTML directly unless it is sanitized through a proven safe mechanism.

Prefer plain text rendering for ordinary messages.

---

# 49. PRIVACY

Do not expose private data through:

* browser logs;
* analytics;
* error messages;
* URLs;
* query parameters unnecessarily;
* local persistence;
* debugging panels.

Do not log:

* access tokens;
* refresh tokens;
* private message content;
* private media URLs;
* credentials.

Respect backend privacy decisions.

The frontend must not override server-side privacy.

---

# 50. MEDIA FOUNDATION

Integrate the media contracts produced by the backend.

This volume should establish the frontend attachment architecture without attempting to implement every advanced media feature.

Support the foundation for:

* selecting files;
* validating basic client constraints;
* requesting upload initialization;
* uploading;
* tracking upload progress;
* handling upload errors;
* associating media with messages;
* rendering media message placeholders.

Server-side validation remains authoritative.

---

# 51. NOTIFICATIONS FOUNDATION

Integrate notification-related frontend state where required.

Support the UI foundation for:

* notification preferences;
* conversation mute state;
* notification settings;
* browser/device notification permission where supported.

Do not bypass backend notification preferences.

---

# 52. SEARCH FOUNDATION

Create the frontend architecture for the backend search API.

Support:

* search input;
* query state;
* loading;
* results;
* pagination;
* empty state;
* errors;
* navigation to matching messages.

Do not implement client-side full-text search as a replacement for the backend search system.

---

# 53. TESTING

Create a comprehensive frontend test foundation.

### Unit tests

Test:

* state transitions;
* utility functions;
* message formatting;
* event normalization;
* pagination;
* cache updates;
* validation.

### Component tests

Test:

* conversation list;
* message list;
* composer;
* message actions;
* reply UI;
* reactions;
* loading/error states.

### Integration tests

Test:

* authentication;
* API interaction;
* WebSocket event handling;
* cache synchronization;
* reconnect behavior.

### Accessibility tests

Test:

* keyboard navigation;
* labels;
* focus;
* dialogs;
* menus;
* message interactions.

### E2E tests

At minimum cover:

1. login;
2. conversation loading;
3. send message;
4. receive real-time message;
5. read message;
6. edit message;
7. delete message;
8. react;
9. reply;
10. reconnect and synchronize.

Use the repository's established testing framework.

---

# 54. ERROR BOUNDARIES

Add appropriate React error boundaries around major application surfaces.

A failure in one noncritical UI component must not necessarily destroy the entire application.

Provide recovery actions.

Never expose stack traces to users.

---

# 55. OBSERVABILITY

Integrate frontend observability according to the repository architecture.

Track appropriate technical signals such as:

* API latency;
* WebSocket connection failures;
* reconnect frequency;
* synchronization failures;
* message send failures;
* client-side exceptions;
* route performance;
* rendering performance where useful.

Do not capture private message content or sensitive credentials.

Respect privacy and consent requirements.

---

# 56. BROWSER SECURITY

Configure the application consistently with secure browser behavior.

Where controlled by the application:

* secure cookies;
* appropriate SameSite behavior;
* CSP-compatible rendering;
* safe external links;
* iframe restrictions;
* secure headers;
* no unsafe inline script patterns unless explicitly justified.

Coordinate with the infrastructure phase rather than duplicating infrastructure configuration.

---

# 57. IMPLEMENTATION ORDER

Unless repository dependencies require a safer sequence:

1. inspect repository;
2. establish frontend architecture;
3. configure API client;
4. configure authentication state;
5. implement protected routing;
6. implement TanStack Query foundation;
7. implement Zustand client state;
8. implement WebSocket layer;
9. implement realtime event dispatcher;
10. implement application shell;
11. implement conversation list;
12. implement conversation screen;
13. implement message history;
14. implement message rendering;
15. implement composer;
16. implement send/retry;
17. implement delivery/read states;
18. implement typing/presence;
19. implement message actions;
20. implement replies/reactions/edit/delete;
21. implement group support;
22. implement responsive layouts;
23. implement accessibility;
24. establish media integration foundation;
25. establish notification settings foundation;
26. establish search foundation;
27. add tests;
28. validate performance;
29. validate security;
30. run complete build/test/type validation.

---

# 58. VALIDATION

Before declaring this phase complete:

* run formatting;
* run lint;
* run TypeScript type checking;
* run unit tests;
* run component tests;
* run integration tests;
* run E2E tests where configured;
* run accessibility tests;
* run production build;
* verify routes;
* verify authentication;
* verify WebSocket behavior;
* verify API contracts;
* verify responsive layouts.

Fix all errors.

Do not claim successful validation if commands actually fail.

---

# 59. FINAL REPORT

At completion provide:

### Implemented

Actual frontend functionality implemented.

### Modified

Actual files modified.

### Created

Actual new files.

### API Integration

Endpoints consumed.

### WebSocket Integration

Events consumed and emitted.

### State

TanStack Query and Zustand responsibilities.

### UI

Major screens/components implemented.

### Tests

Tests actually added and executed.

### Validation

Commands actually executed and their results.

### Remaining

Only genuine remaining work belonging to later phases.

Do not claim functionality that does not exist.

---

# 60. NON-NEGOTIABLE RULES

Never:

* invent backend endpoints;
* invent WebSocket events;
* invent data fields;
* duplicate backend business logic;
* treat frontend state as authoritative;
* store secrets in source code;
* expose tokens unnecessarily;
* render unsafe HTML;
* trust client authorization;
* fake successful API operations;
* create placeholder UI for functionality claimed as implemented;
* use TODO/FIXME placeholders;
* use pseudo-code;
* silently swallow errors;
* create duplicate WebSocket connections;
* duplicate server state across unrelated stores;
* break existing routes or contracts unnecessarily;
* regenerate unchanged files.

The frontend must be a production-grade client of the actual backend.

All contracts must remain consistent across:

* REST APIs;
* WebSockets;
* authentication;
* messages;
* conversations;
* receipts;
* presence;
* synchronization;
* media;
* notifications;
* search;
* error handling;
* pagination;
* IDs;
* timestamps;
* authorization.

The result must remain one coherent enterprise real-time communication platfor

You are operating in Senior Engineering Team Mode.

Build the production-ready web frontend foundation for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The frontend must consume the established backend API, WebSocket, authentication, authorization, media, notification, and synchronization contracts defined for the project.

Do not redesign backend APIs.

Do not redesign the database.

Do not implement backend code.

Do not implement mobile code.

Do not implement infrastructure implementation code.

Do not generate Terraform.

Do not generate Kubernetes manifests.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Build the production-ready web application foundation for the global real-time communication platform.

The web application must support:

• User authentication
• User onboarding
• Profiles
• Contacts
• Conversations
• Real-time messaging
• Message history
• Message delivery states
• Read receipts
• Typing indicators
• Presence
• Groups
• Communities
• Media sharing
• Stories/status
• Notifications
• Search
• Voice/video call interfaces
• Device/session management
• Privacy settings
• Security settings

The web application must be:

• Fast
• Responsive
• Accessible
• Secure
• Real-time capable
• Maintainable
• Scalable
• Production-ready

────────────────────────────────────────

TECHNOLOGY STACK

Framework:

• Next.js
• React
• TypeScript

Styling:

• Tailwind CSS
• shadcn/ui
• CSS variables

State Management:

• Zustand

Server State:

• TanStack Query

Forms:

• React Hook Form
• Zod

Real-Time:

• WebSocket
• Socket.IO client where appropriate

Validation:

• Zod

Utilities:

• date-fns

Icons:

• Lucide React

Animation:

• Framer Motion

Testing:

• Jest
• React Testing Library
• Playwright
• Accessibility testing tools where appropriate

────────────────────────────────────────

FRONTEND ARCHITECTURE

Use:

• Feature-first architecture
• Strict TypeScript
• Reusable components
• Separation of presentation and business logic
• Clean Architecture principles where appropriate
• Domain-oriented feature modules
• Dependency inversion where useful

Do not place business logic directly inside presentation components.

Do not duplicate backend business rules unnecessarily.

The frontend must consume backend contracts instead of recreating server-side authorization logic.

────────────────────────────────────────

APPLICATION STRUCTURE

Build the web application around:

• Authentication
• Conversations
• Messaging
• Contacts
• Groups
• Communities
• Presence
• Media
• Stories
• Notifications
• Search
• Calls
• Settings
• Privacy
• Security
• Device management

Provide reusable shared infrastructure for:

• API client
• WebSocket client
• Authentication state
• Query management
• Error handling
• Notifications
• Theme
• Internationalization
• Accessibility

────────────────────────────────────────

FOLDER STRUCTURE

Create a scalable feature-first structure including appropriate areas for:

app/

features/

components/

layouts/

hooks/

providers/

services/

stores/

lib/

styles/

types/

utils/

config/

public/

tests/

Use Next.js App Router.

Keep domain features isolated.

Do not create unnecessary abstraction layers.

────────────────────────────────────────

NEXT.JS ARCHITECTURE

Implement:

• App Router
• Layouts
• Route groups
• Loading states
• Error boundaries
• Not-found pages
• Suspense boundaries
• Server Components where appropriate
• Client Components only where required
• Middleware where appropriate
• Metadata
• SEO foundations for public pages

Do not turn the entire application into Client Components.

Use Server Components for suitable static/server-rendered areas.

Use Client Components for interactive and real-time functionality.

────────────────────────────────────────

AUTHENTICATION UI

Implement interfaces for:

• Registration
• Login
• Logout
• Verification
• Password reset
• Password change
• Session management
• Device management
• Suspicious-login handling

Support secure authentication flows according to the backend contracts.

Do not expose tokens unnecessarily to JavaScript.

Follow the approved authentication architecture.

────────────────────────────────────────

AUTHENTICATION STATE

Implement a centralized authentication state.

Track:

• Authenticated user
• Account state
• Active session
• Device state
• Loading state
• Authentication errors

Support:

• Initial session restoration
• Logout
• Session expiration
• Authentication failure
• Refresh handling
• Protected route behavior

────────────────────────────────────────

API CLIENT

Implement a typed API client.

Support:

• Base URL configuration
• Request headers
• Authentication
• Request IDs
• Correlation IDs
• Error handling
• Retry where appropriate
• Cancellation
• Timeouts
• Pagination
• Cursor pagination
• File uploads

Do not duplicate server-side business logic.

Generate typed request and response models based on backend contracts.

────────────────────────────────────────

WEBSOCKET CLIENT

Implement the web real-time client.

Support:

• Connection
• Authentication
• Reconnection
• Heartbeats
• Connection state
• Event subscription
• Event unsubscription
• Event acknowledgment
• Error handling
• Backoff
• Offline/online transitions

Support real-time events for:

• Messages
• Delivery receipts
• Read receipts
• Typing
• Presence
• Reactions
• Conversation changes
• Group changes
• Community updates
• Call signaling
• Notifications

Do not assume a WebSocket connection is permanently available.

────────────────────────────────────────

SERVER STATE

Implement TanStack Query.

Support:

• Query caching
• Infinite queries
• Cursor pagination
• Background refetching
• Cache invalidation
• Optimistic updates
• Retry
• Error handling
• Request cancellation

Use query keys consistently.

Do not duplicate server state into unnecessary Zustand stores.

────────────────────────────────────────

CLIENT STATE

Use Zustand for genuinely client-owned state.

Create appropriate stores for:

• Authentication UI state
• Conversation UI state
• Message composition state
• Active conversation
• UI preferences
• Theme
• Search state
• Notification state
• Call UI state
• Device/UI settings

Do not use Zustand as a replacement for TanStack Query server state.

────────────────────────────────────────

ROUTING

Implement routing for:

Public:

• Landing
• Login
• Registration
• Verification
• Password reset

Authenticated:

• Inbox
• Conversations
• Contacts
• Groups
• Communities
• Stories
• Calls
• Search
• Settings
• Devices
• Privacy
• Security
• Notifications

Administrative routes where applicable:

• Administration
• Moderation

Implement route protection based on authenticated session and backend authorization.

Frontend route protection must never replace backend authorization.

────────────────────────────────────────

LAYOUT ARCHITECTURE

Design responsive layouts for:

• Desktop
• Tablet
• Narrow browser windows

Support:

• Sidebar
• Conversation list
• Active conversation
• Details panel where appropriate
• Modal/drawer layouts
• Mobile-width responsive behavior

Ensure navigation remains usable at different viewport sizes.

────────────────────────────────────────

DESIGN SYSTEM

Implement reusable components using shadcn/ui and the project's design tokens.

Include:

• Button
• Input
• Textarea
• Select
• Checkbox
• Radio
• Switch
• Dialog
• Drawer
• Dropdown
• Popover
• Tooltip
• Tabs
• Accordion
• Avatar
• Badge
• Card
• Table
• Pagination
• Skeleton
• Alert
• Toast
• Progress
• Context menu
• Command palette
• Empty state
• Error state
• Loading state

All reusable components must be accessible.

────────────────────────────────────────

THEMING

Support:

• Light theme
• Dark theme
• System theme
• Theme persistence

Respect:

• Reduced motion
• High contrast
• Browser preferences

Use CSS variables for theme tokens.

────────────────────────────────────────

ACCESSIBILITY

Target WCAG 2.2 AA.

Implement:

• Semantic HTML
• Keyboard navigation
• Focus management
• Screen-reader support
• ARIA labels
• Accessible dialogs
• Accessible menus
• Accessible notifications
• Focus restoration
• Reduced motion
• Color contrast
• Visible focus states

Never rely solely on color to communicate state.

────────────────────────────────────────

RESPONSIVE DESIGN

Support:

• Desktop
• Tablet
• Mobile browser widths
• Narrow displays
• Large displays

The messaging experience must remain usable at all supported sizes.

────────────────────────────────────────

CONVERSATIONS UI

Implement the foundation for:

• Conversation list
• Active conversation
• Conversation header
• Participant information
• Search within conversations
• Conversation settings
• Conversation actions
• Unread counts
• Last-message previews
• Timestamps
• Presence state

Support large conversation lists efficiently.

Use virtualization where appropriate.

────────────────────────────────────────

MESSAGING UI

Implement:

• Message list
• Message bubble
• Incoming/outgoing states
• Sending state
• Sent state
• Delivered state
• Read state
• Failed state
• Message timestamps
• Reply preview
• Mention presentation
• Reaction presentation
• Edited indicator
• Deleted-message state
• Context actions

Support long conversations with virtualization.

────────────────────────────────────────

MESSAGE COMPOSER

Implement the message composer foundation.

Support:

• Text input
• Emoji
• Reply mode
• Mention selection
• Attachment selection
• Send
• Retry failed message
• Cancel reply
• Draft state

Handle:

• Empty messages
• Maximum length
• Network failures
• Sending state
• Keyboard shortcuts

────────────────────────────────────────

OPTIMISTIC MESSAGING

Implement appropriate optimistic behavior.

Support:

• Temporary client message IDs
• Pending states
• Retry
• Failure states
• Server reconciliation
• Duplicate prevention

Do not allow optimistic UI to permanently diverge from backend state.

────────────────────────────────────────

PRESENCE AND TYPING

Display:

• Online
• Offline
• Last seen where permitted
• Typing
• Recording where applicable

Respect backend privacy settings.

Do not expose presence when the backend denies access.

────────────────────────────────────────

CONTACTS UI

Implement:

• Contact list
• Contact search
• Contact profile
• Add/contact action
• Block
• Unblock
• Contact discovery
• Privacy-aware results

Do not expose backend data that the current user is not authorized to view.

────────────────────────────────────────

GROUP UI

Implement:

• Group creation
• Group details
• Member list
• Member roles
• Add members
• Remove members
• Group permissions
• Group settings
• Group avatar
• Group description
• Admin actions

Conditionally show controls based on server-provided authorization state.

────────────────────────────────────────

COMMUNITY UI

Implement foundation for:

• Community list
• Community details
• Community groups
• Community membership
• Community administration
• Community settings
• Announcements

Keep community navigation separate from direct conversation navigation where appropriate.

────────────────────────────────────────

MEDIA UI

Implement frontend support for:

• Image selection
• Video selection
• Audio selection
• Document selection
• Drag and drop
• Upload progress
• Preview
• Cancellation
• Retry
• Error states

Use backend-issued upload authorization.

Do not upload large media through application API routes when direct object-storage upload is supported.

────────────────────────────────────────

STORIES / STATUS UI

Implement:

• Story list
• Story viewer
• Story creation
• Story deletion
• Viewer list where authorized
• Story privacy
• Story expiration state

Support:

• Text
• Images
• Videos

────────────────────────────────────────

NOTIFICATIONS UI

Implement:

• Toasts
• In-app notification center
• Unread count
• Notification list
• Notification preferences
• Security notifications
• System notifications

Respect notification privacy.

────────────────────────────────────────

SEARCH UI

Implement search foundations for:

• Users
• Contacts
• Groups
• Communities
• Conversations
• Business accounts
• Messages where supported

Support:

• Search input
• Autocomplete
• Recent searches
• Results
• Loading
• Empty state
• Error state
• Keyboard navigation

Respect backend authorization and privacy.

────────────────────────────────────────

CALL UI

Implement interfaces for:

• Incoming call
• Outgoing call
• Ringing
• Connecting
• Active call
• Reconnecting
• Ended call
• Failed call
• Call controls

Support:

• Microphone toggle
• Camera toggle
• Speaker/device selection where available
• Screen layout
• Participant display
• End call

Use backend/WebRTC signaling contracts.

Do not implement media signaling independently from the approved backend architecture.

────────────────────────────────────────

SETTINGS

Implement settings sections for:

• Account
• Profile
• Privacy
• Security
• Notifications
• Devices
• Appearance
• Language
• Accessibility

Support appropriate loading, validation, saving, and error states.

────────────────────────────────────────

DEVICE MANAGEMENT

Implement UI for:

• Registered devices
• Active sessions
• Device information
• Remote logout
• Device revocation
• Security notifications

Do not expose unnecessary device metadata.

────────────────────────────────────────

FORMS

Use:

• React Hook Form
• Zod

Support:

• Synchronous validation
• Asynchronous validation where needed
• Server validation errors
• Loading states
• Submission errors
• Disabled states
• Accessible form feedback

────────────────────────────────────────

ERROR HANDLING

Implement:

• Global error boundary
• Route-level error boundaries
• Network errors
• Authentication errors
• Authorization errors
• Validation errors
• WebSocket failures
• Offline states
• Upload failures
• Retry UI

Provide useful recovery actions.

Never expose internal backend errors directly.

────────────────────────────────────────

OFFLINE EXPERIENCE

Implement web behavior for temporary network loss.

Support:

• Offline indicator
• Pending message display
• Reconnect indicator
• Retry failed operations
• Cache-backed conversation viewing where appropriate
• Synchronization after reconnect

Do not falsely claim complete offline support if browser limitations prevent it.

────────────────────────────────────────

PERFORMANCE

Optimize:

• Server Components
• Client Components
• Suspense
• Streaming where useful
• Code splitting
• Lazy loading
• Image optimization
• Virtualized message lists
• Query caching
• Prefetching
• Memoization
• Event batching
• WebSocket efficiency

Avoid unnecessary rerenders.

Do not make the entire application a single large client component.

────────────────────────────────────────

SECURITY

Implement:

• Secure authentication handling
• Protected routes
• Server-side authorization assumptions
• Safe rendering
• Input sanitization where appropriate
• Content Security Policy compatibility
• Secure file handling
• Safe URL handling
• XSS prevention
• CSRF-safe request patterns where applicable

Do not place secrets in frontend bundles.

Never expose private backend credentials.

────────────────────────────────────────

TESTING

Generate:

UNIT TESTS

• State logic
• Utilities
• Validation
• Formatting
• Permission-aware UI logic

COMPONENT TESTS

• Message components
• Conversation list
• Composer
• Forms
• Dialogs
• Notifications
• Settings

INTEGRATION TESTS

• API client
• Authentication flow
• Query integration
• WebSocket events

ACCESSIBILITY TESTS

• Keyboard navigation
• Dialogs
• Forms
• Navigation
• Screen readers where tooling permits

END-TO-END TESTS

• Registration
• Login
• Conversation navigation
• Send message
• Receive message
• Reply
• React
• Edit
• Delete
• Group creation
• Media upload
• Story creation
• Notifications
• Device management

PERFORMANCE TESTS

• Large conversation lists
• Large message histories
• Rapid real-time updates
• WebSocket reconnection
• Media upload UI

────────────────────────────────────────

DOCUMENTATION

Generate:

• Frontend architecture documentation
• Folder structure documentation
• Component standards
• Design system documentation
• API client documentation
• WebSocket client documentation
• State management standards
• Accessibility standards
• Testing standards
• Development workflow

────────────────────────────────────────

PROJECT INDEX

Maintain the frontend Project Index.

Track:

• Generated pages
• Generated layouts
• Generated components
• Feature modules
• Zustand stores
• TanStack Query integrations
• API integrations
• WebSocket integrations
• Forms
• Tests
• Dependencies
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

Implement incrementally.

FRONTEND MILESTONE 1

Next.js foundation, design system, global providers, routing, layouts, configuration, API client, and error handling.

FRONTEND MILESTONE 2

Authentication and account flows.

FRONTEND MILESTONE 3

Conversation list, conversation layout, messaging UI, and composer.

FRONTEND MILESTONE 4

Real-time WebSocket integration, delivery states, receipts, presence, and typing.

FRONTEND MILESTONE 5

Contacts, blocking, groups, and communities.

FRONTEND MILESTONE 6

Media, uploads, stories, and notifications.

FRONTEND MILESTONE 7

Search, device management, settings, privacy, and security.

FRONTEND MILESTONE 8

Call UI and WebRTC integration boundaries.

FRONTEND MILESTONE 9

Performance, accessibility, testing, and production hardening.

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

• Web frontend foundation
• Routing
• Layouts
• Design system
• Authentication UI
• API client
• WebSocket client foundation
• Conversation UI
• Messaging UI
• Composer
• Presence
• Contacts
• Groups
• Communities
• Media UI
• Stories
• Notifications
• Search
• Calls UI
• Settings
• Device management
• Accessibility
• Responsive design
• Frontend testing

Do not implement:

• Backend business logic
• Mobile applications
• Kubernetes
• Terraform
• CI/CD infrastructure

────────────────────────────────────────

QUALITY BAR

Treat the web frontend as a production application serving a global communication platform.

Assume:

• Large conversation histories
• High-frequency real-time events
• Multiple active sessions
• Unreliable networks
• Large media
• Accessibility requirements
• Strong security requirements
• Desktop and tablet usage

Prioritize:

• Performance
• Accessibility
• Security
• Real-time responsiveness
• Maintainability
• Correct state synchronization
• Excellent UX
• Production readine

You are operating in Senior Engineering Team Mode.

Build the production-ready web frontend foundation for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The frontend must consume the established backend API, WebSocket, authentication, authorization, media, notification, and synchronization contracts defined for the project.

Do not redesign backend APIs.

Do not redesign the database.

Do not implement backend code.

Do not implement mobile code.

Do not implement infrastructure implementation code.

Do not generate Terraform.

Do not generate Kubernetes manifests.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Build the production-ready web application foundation for the global real-time communication platform.

The web application must support:

• User authentication
• User onboarding
• Profiles
• Contacts
• Conversations
• Real-time messaging
• Message history
• Message delivery states
• Read receipts
• Typing indicators
• Presence
• Groups
• Communities
• Media sharing
• Stories/status
• Notifications
• Search
• Voice/video call interfaces
• Device/session management
• Privacy settings
• Security settings

The web application must be:

• Fast
• Responsive
• Accessible
• Secure
• Real-time capable
• Maintainable
• Scalable
• Production-ready

────────────────────────────────────────

TECHNOLOGY STACK

Framework:

• Next.js
• React
• TypeScript

Styling:

• Tailwind CSS
• shadcn/ui
• CSS variables

State Management:

• Zustand

Server State:

• TanStack Query

Forms:

• React Hook Form
• Zod

Real-Time:

• WebSocket
• Socket.IO client where appropriate

Validation:

• Zod

Utilities:

• date-fns

Icons:

• Lucide React

Animation:

• Framer Motion

Testing:

• Jest
• React Testing Library
• Playwright
• Accessibility testing tools where appropriate

────────────────────────────────────────

FRONTEND ARCHITECTURE

Use:

• Feature-first architecture
• Strict TypeScript
• Reusable components
• Separation of presentation and business logic
• Clean Architecture principles where appropriate
• Domain-oriented feature modules
• Dependency inversion where useful

Do not place business logic directly inside presentation components.

Do not duplicate backend business rules unnecessarily.

The frontend must consume backend contracts instead of recreating server-side authorization logic.

────────────────────────────────────────

APPLICATION STRUCTURE

Build the web application around:

• Authentication
• Conversations
• Messaging
• Contacts
• Groups
• Communities
• Presence
• Media
• Stories
• Notifications
• Search
• Calls
• Settings
• Privacy
• Security
• Device management

Provide reusable shared infrastructure for:

• API client
• WebSocket client
• Authentication state
• Query management
• Error handling
• Notifications
• Theme
• Internationalization
• Accessibility

────────────────────────────────────────

FOLDER STRUCTURE

Create a scalable feature-first structure including appropriate areas for:

app/

features/

components/

layouts/

hooks/

providers/

services/

stores/

lib/

styles/

types/

utils/

config/

public/

tests/

Use Next.js App Router.

Keep domain features isolated.

Do not create unnecessary abstraction layers.

────────────────────────────────────────

NEXT.JS ARCHITECTURE

Implement:

• App Router
• Layouts
• Route groups
• Loading states
• Error boundaries
• Not-found pages
• Suspense boundaries
• Server Components where appropriate
• Client Components only where required
• Middleware where appropriate
• Metadata
• SEO foundations for public pages

Do not turn the entire application into Client Components.

Use Server Components for suitable static/server-rendered areas.

Use Client Components for interactive and real-time functionality.

────────────────────────────────────────

AUTHENTICATION UI

Implement interfaces for:

• Registration
• Login
• Logout
• Verification
• Password reset
• Password change
• Session management
• Device management
• Suspicious-login handling

Support secure authentication flows according to the backend contracts.

Do not expose tokens unnecessarily to JavaScript.

Follow the approved authentication architecture.

────────────────────────────────────────

AUTHENTICATION STATE

Implement a centralized authentication state.

Track:

• Authenticated user
• Account state
• Active session
• Device state
• Loading state
• Authentication errors

Support:

• Initial session restoration
• Logout
• Session expiration
• Authentication failure
• Refresh handling
• Protected route behavior

────────────────────────────────────────

API CLIENT

Implement a typed API client.

Support:

• Base URL configuration
• Request headers
• Authentication
• Request IDs
• Correlation IDs
• Error handling
• Retry where appropriate
• Cancellation
• Timeouts
• Pagination
• Cursor pagination
• File uploads

Do not duplicate server-side business logic.

Generate typed request and response models based on backend contracts.

────────────────────────────────────────

WEBSOCKET CLIENT

Implement the web real-time client.

Support:

• Connection
• Authentication
• Reconnection
• Heartbeats
• Connection state
• Event subscription
• Event unsubscription
• Event acknowledgment
• Error handling
• Backoff
• Offline/online transitions

Support real-time events for:

• Messages
• Delivery receipts
• Read receipts
• Typing
• Presence
• Reactions
• Conversation changes
• Group changes
• Community updates
• Call signaling
• Notifications

Do not assume a WebSocket connection is permanently available.

────────────────────────────────────────

SERVER STATE

Implement TanStack Query.

Support:

• Query caching
• Infinite queries
• Cursor pagination
• Background refetching
• Cache invalidation
• Optimistic updates
• Retry
• Error handling
• Request cancellation

Use query keys consistently.

Do not duplicate server state into unnecessary Zustand stores.

────────────────────────────────────────

CLIENT STATE

Use Zustand for genuinely client-owned state.

Create appropriate stores for:

• Authentication UI state
• Conversation UI state
• Message composition state
• Active conversation
• UI preferences
• Theme
• Search state
• Notification state
• Call UI state
• Device/UI settings

Do not use Zustand as a replacement for TanStack Query server state.

────────────────────────────────────────

ROUTING

Implement routing for:

Public:

• Landing
• Login
• Registration
• Verification
• Password reset

Authenticated:

• Inbox
• Conversations
• Contacts
• Groups
• Communities
• Stories
• Calls
• Search
• Settings
• Devices
• Privacy
• Security
• Notifications

Administrative routes where applicable:

• Administration
• Moderation

Implement route protection based on authenticated session and backend authorization.

Frontend route protection must never replace backend authorization.

────────────────────────────────────────

LAYOUT ARCHITECTURE

Design responsive layouts for:

• Desktop
• Tablet
• Narrow browser windows

Support:

• Sidebar
• Conversation list
• Active conversation
• Details panel where appropriate
• Modal/drawer layouts
• Mobile-width responsive behavior

Ensure navigation remains usable at different viewport sizes.

────────────────────────────────────────

DESIGN SYSTEM

Implement reusable components using shadcn/ui and the project's design tokens.

Include:

• Button
• Input
• Textarea
• Select
• Checkbox
• Radio
• Switch
• Dialog
• Drawer
• Dropdown
• Popover
• Tooltip
• Tabs
• Accordion
• Avatar
• Badge
• Card
• Table
• Pagination
• Skeleton
• Alert
• Toast
• Progress
• Context menu
• Command palette
• Empty state
• Error state
• Loading state

All reusable components must be accessible.

────────────────────────────────────────

THEMING

Support:

• Light theme
• Dark theme
• System theme
• Theme persistence

Respect:

• Reduced motion
• High contrast
• Browser preferences

Use CSS variables for theme tokens.

────────────────────────────────────────

ACCESSIBILITY

Target WCAG 2.2 AA.

Implement:

• Semantic HTML
• Keyboard navigation
• Focus management
• Screen-reader support
• ARIA labels
• Accessible dialogs
• Accessible menus
• Accessible notifications
• Focus restoration
• Reduced motion
• Color contrast
• Visible focus states

Never rely solely on color to communicate state.

────────────────────────────────────────

RESPONSIVE DESIGN

Support:

• Desktop
• Tablet
• Mobile browser widths
• Narrow displays
• Large displays

The messaging experience must remain usable at all supported sizes.

────────────────────────────────────────

CONVERSATIONS UI

Implement the foundation for:

• Conversation list
• Active conversation
• Conversation header
• Participant information
• Search within conversations
• Conversation settings
• Conversation actions
• Unread counts
• Last-message previews
• Timestamps
• Presence state

Support large conversation lists efficiently.

Use virtualization where appropriate.

────────────────────────────────────────

MESSAGING UI

Implement:

• Message list
• Message bubble
• Incoming/outgoing states
• Sending state
• Sent state
• Delivered state
• Read state
• Failed state
• Message timestamps
• Reply preview
• Mention presentation
• Reaction presentation
• Edited indicator
• Deleted-message state
• Context actions

Support long conversations with virtualization.

────────────────────────────────────────

MESSAGE COMPOSER

Implement the message composer foundation.

Support:

• Text input
• Emoji
• Reply mode
• Mention selection
• Attachment selection
• Send
• Retry failed message
• Cancel reply
• Draft state

Handle:

• Empty messages
• Maximum length
• Network failures
• Sending state
• Keyboard shortcuts

────────────────────────────────────────

OPTIMISTIC MESSAGING

Implement appropriate optimistic behavior.

Support:

• Temporary client message IDs
• Pending states
• Retry
• Failure states
• Server reconciliation
• Duplicate prevention

Do not allow optimistic UI to permanently diverge from backend state.

────────────────────────────────────────

PRESENCE AND TYPING

Display:

• Online
• Offline
• Last seen where permitted
• Typing
• Recording where applicable

Respect backend privacy settings.

Do not expose presence when the backend denies access.

────────────────────────────────────────

CONTACTS UI

Implement:

• Contact list
• Contact search
• Contact profile
• Add/contact action
• Block
• Unblock
• Contact discovery
• Privacy-aware results

Do not expose backend data that the current user is not authorized to view.

────────────────────────────────────────

GROUP UI

Implement:

• Group creation
• Group details
• Member list
• Member roles
• Add members
• Remove members
• Group permissions
• Group settings
• Group avatar
• Group description
• Admin actions

Conditionally show controls based on server-provided authorization state.

────────────────────────────────────────

COMMUNITY UI

Implement foundation for:

• Community list
• Community details
• Community groups
• Community membership
• Community administration
• Community settings
• Announcements

Keep community navigation separate from direct conversation navigation where appropriate.

────────────────────────────────────────

MEDIA UI

Implement frontend support for:

• Image selection
• Video selection
• Audio selection
• Document selection
• Drag and drop
• Upload progress
• Preview
• Cancellation
• Retry
• Error states

Use backend-issued upload authorization.

Do not upload large media through application API routes when direct object-storage upload is supported.

────────────────────────────────────────

STORIES / STATUS UI

Implement:

• Story list
• Story viewer
• Story creation
• Story deletion
• Viewer list where authorized
• Story privacy
• Story expiration state

Support:

• Text
• Images
• Videos

────────────────────────────────────────

NOTIFICATIONS UI

Implement:

• Toasts
• In-app notification center
• Unread count
• Notification list
• Notification preferences
• Security notifications
• System notifications

Respect notification privacy.

────────────────────────────────────────

SEARCH UI

Implement search foundations for:

• Users
• Contacts
• Groups
• Communities
• Conversations
• Business accounts
• Messages where supported

Support:

• Search input
• Autocomplete
• Recent searches
• Results
• Loading
• Empty state
• Error state
• Keyboard navigation

Respect backend authorization and privacy.

────────────────────────────────────────

CALL UI

Implement interfaces for:

• Incoming call
• Outgoing call
• Ringing
• Connecting
• Active call
• Reconnecting
• Ended call
• Failed call
• Call controls

Support:

• Microphone toggle
• Camera toggle
• Speaker/device selection where available
• Screen layout
• Participant display
• End call

Use backend/WebRTC signaling contracts.

Do not implement media signaling independently from the approved backend architecture.

────────────────────────────────────────

SETTINGS

Implement settings sections for:

• Account
• Profile
• Privacy
• Security
• Notifications
• Devices
• Appearance
• Language
• Accessibility

Support appropriate loading, validation, saving, and error states.

────────────────────────────────────────

DEVICE MANAGEMENT

Implement UI for:

• Registered devices
• Active sessions
• Device information
• Remote logout
• Device revocation
• Security notifications

Do not expose unnecessary device metadata.

────────────────────────────────────────

FORMS

Use:

• React Hook Form
• Zod

Support:

• Synchronous validation
• Asynchronous validation where needed
• Server validation errors
• Loading states
• Submission errors
• Disabled states
• Accessible form feedback

────────────────────────────────────────

ERROR HANDLING

Implement:

• Global error boundary
• Route-level error boundaries
• Network errors
• Authentication errors
• Authorization errors
• Validation errors
• WebSocket failures
• Offline states
• Upload failures
• Retry UI

Provide useful recovery actions.

Never expose internal backend errors directly.

────────────────────────────────────────

OFFLINE EXPERIENCE

Implement web behavior for temporary network loss.

Support:

• Offline indicator
• Pending message display
• Reconnect indicator
• Retry failed operations
• Cache-backed conversation viewing where appropriate
• Synchronization after reconnect

Do not falsely claim complete offline support if browser limitations prevent it.

────────────────────────────────────────

PERFORMANCE

Optimize:

• Server Components
• Client Components
• Suspense
• Streaming where useful
• Code splitting
• Lazy loading
• Image optimization
• Virtualized message lists
• Query caching
• Prefetching
• Memoization
• Event batching
• WebSocket efficiency

Avoid unnecessary rerenders.

Do not make the entire application a single large client component.

────────────────────────────────────────

SECURITY

Implement:

• Secure authentication handling
• Protected routes
• Server-side authorization assumptions
• Safe rendering
• Input sanitization where appropriate
• Content Security Policy compatibility
• Secure file handling
• Safe URL handling
• XSS prevention
• CSRF-safe request patterns where applicable

Do not place secrets in frontend bundles.

Never expose private backend credentials.

────────────────────────────────────────

TESTING

Generate:

UNIT TESTS

• State logic
• Utilities
• Validation
• Formatting
• Permission-aware UI logic

COMPONENT TESTS

• Message components
• Conversation list
• Composer
• Forms
• Dialogs
• Notifications
• Settings

INTEGRATION TESTS

• API client
• Authentication flow
• Query integration
• WebSocket events

ACCESSIBILITY TESTS

• Keyboard navigation
• Dialogs
• Forms
• Navigation
• Screen readers where tooling permits

END-TO-END TESTS

• Registration
• Login
• Conversation navigation
• Send message
• Receive message
• Reply
• React
• Edit
• Delete
• Group creation
• Media upload
• Story creation
• Notifications
• Device management

PERFORMANCE TESTS

• Large conversation lists
• Large message histories
• Rapid real-time updates
• WebSocket reconnection
• Media upload UI

────────────────────────────────────────

DOCUMENTATION

Generate:

• Frontend architecture documentation
• Folder structure documentation
• Component standards
• Design system documentation
• API client documentation
• WebSocket client documentation
• State management standards
• Accessibility standards
• Testing standards
• Development workflow

────────────────────────────────────────

PROJECT INDEX

Maintain the frontend Project Index.

Track:

• Generated pages
• Generated layouts
• Generated components
• Feature modules
• Zustand stores
• TanStack Query integrations
• API integrations
• WebSocket integrations
• Forms
• Tests
• Dependencies
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

Implement incrementally.

FRONTEND MILESTONE 1

Next.js foundation, design system, global providers, routing, layouts, configuration, API client, and error handling.

FRONTEND MILESTONE 2

Authentication and account flows.

FRONTEND MILESTONE 3

Conversation list, conversation layout, messaging UI, and composer.

FRONTEND MILESTONE 4

Real-time WebSocket integration, delivery states, receipts, presence, and typing.

FRONTEND MILESTONE 5

Contacts, blocking, groups, and communities.

FRONTEND MILESTONE 6

Media, uploads, stories, and notifications.

FRONTEND MILESTONE 7

Search, device management, settings, privacy, and security.

FRONTEND MILESTONE 8

Call UI and WebRTC integration boundaries.

FRONTEND MILESTONE 9

Performance, accessibility, testing, and production hardening.

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

• Web frontend foundation
• Routing
• Layouts
• Design system
• Authentication UI
• API client
• WebSocket client foundation
• Conversation UI
• Messaging UI
• Composer
• Presence
• Contacts
• Groups
• Communities
• Media UI
• Stories
• Notifications
• Search
• Calls UI
• Settings
• Device management
• Accessibility
• Responsive design
• Frontend testing

Do not implement:

• Backend business logic
• Mobile applications
• Kubernetes
• Terraform
• CI/CD infrastructure

────────────────────────────────────────

QUALITY BAR

Treat the web frontend as a production application serving a global communication platform.

Assume:

• Large conversation histories
• High-frequency real-time events
• Multiple active sessions
• Unreliable networks
• Large media
• Accessibility requirements
• Strong security requirements
• Desktop and tablet usage

Prioritize:

• Performance
• Accessibility
• Security
• Real-time responsiveness
• Maintainability
• Correct state synchronization
• Excellent UX
• Production readiness
