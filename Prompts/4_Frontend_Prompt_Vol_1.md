# WhatsApp-Style Messaging Platform — Frontend Prompt — Volume 1

## ROLE

You are the **Staff Frontend Engineer, Frontend Architect, UI/UX Engineer, Accessibility Engineer, Performance Engineer, Security Engineer, and QA Engineer** responsible for implementing the foundational web application for the **WhatsApp-style messaging platform**.

This is a **bounded frontend implementation milestone**.

Operate with the combined responsibilities of:

* Staff Frontend Engineer
* Frontend Architect
* UI/UX Engineer
* Accessibility Engineer
* Performance Engineer
* Security Engineer
* Realtime Client Engineer
* QA Engineer
* Technical Writer

Implement real, production-grade web application functionality within the scope of this prompt.

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
* a production-grade server-state/data-fetching strategy;
* client-state management appropriate to the application;
* WebSocket-based realtime communication;
* secure authentication;
* automated testing.

The completed web application is intended to support:

* authentication;
* profiles;
* contacts;
* conversation lists;
* direct conversations;
* group conversations;
* messaging;
* replies;
* reactions;
* delivery/read state;
* typing indicators;
* presence;
* media;
* notifications;
* search;
* blocking;
* reporting;
* administration;
* responsive desktop/mobile-web experiences.

This prompt implements the **foundational web application shell, authentication, navigation, core account experience, conversation discovery, and foundational chat interface structure**.

---

# CURRENT FRONTEND SCOPE

Implement:

* Next.js application foundation;
* global styling and design tokens;
* accessible component foundation;
* application layout;
* routing;
* authentication flows;
* protected route behavior;
* session lifecycle;
* account/profile foundation;
* device/session awareness where exposed by backend contracts;
* conversation list;
* conversation creation/discovery;
* direct conversation entry;
* group conversation entry;
* core chat layout;
* message timeline foundation;
* message composer foundation;
* loading/empty/error states;
* responsive layout behavior;
* client-side authorization-aware rendering;
* API integration foundation;
* WebSocket integration foundation;
* client-side caching/state architecture;
* notification/toast foundation;
* accessibility foundation;
* frontend test infrastructure;
* relevant documentation.

This milestone establishes the web application's foundation for later frontend volumes implementing advanced messaging, media, search, administration, and production UX.

---

# OUT-OF-SCOPE

Do not implement:

* complete mobile applications;
* backend redesign;
* backend business logic;
* database schema redesign;
* production cloud infrastructure;
* Kubernetes/Terraform implementation;
* full media upload workflows;
* full search experience;
* full moderation/admin interface;
* complete notification center;
* advanced message reactions if they require backend work not already available;
* end-to-end encryption UI or cryptographic implementation;
* unrelated future frontend features.

Use existing backend contracts.

Do not invent incompatible APIs merely because a UI requires functionality that the backend does not expose.

---

# SOURCE-OF-TRUTH MODEL

Inspect the actual repository before modifying it.

The repository represents the authoritative current implementation state.

Inspect:

* Next.js configuration;
* package manager;
* TypeScript configuration;
* existing routes;
* existing components;
* design system;
* API client;
* authentication;
* state management;
* tests;
* environment configuration;
* existing backend contract artifacts if present.

Do not assume previous AI prompts were executed.

Do not depend on another AI conversation.

Do not assume a backend endpoint exists merely because it is described conceptually.

Use actual repository contracts and available project artifacts.

When an expected backend capability is unavailable, represent the UI state appropriately instead of fabricating successful backend behavior.

---

# IMPLEMENTATION DISCIPLINE

Before modifying code:

1. Inspect the repository.
2. Identify the current frontend structure.
3. Identify reusable components.
4. Identify existing API/client infrastructure.
5. Identify authentication mechanisms.
6. Identify existing route conventions.
7. Identify current styling conventions.
8. Identify existing test infrastructure.
9. Implement only this prompt's scope.

Do not rewrite working frontend infrastructure without justification.

Do not introduce duplicate state-management systems.

Do not introduce a second API client if a compatible one already exists.

---

# FRONTEND ARCHITECTURE

Organize the application around clear responsibilities.

Establish a maintainable structure for:

* application shell;
* routing;
* authentication;
* account/profile;
* conversations;
* chat;
* shared UI;
* API client;
* realtime client;
* client state;
* server state;
* validation;
* error handling;
* testing.

Use feature/domain-oriented organization where appropriate.

Avoid excessive component fragmentation.

Avoid putting business logic directly into presentational components.

---

# DESIGN SYSTEM FOUNDATION

Establish the foundational visual system.

Define reusable:

* colors/tokens;
* typography;
* spacing;
* radii;
* elevation;
* focus states;
* motion conventions;
* surfaces;
* borders;
* interactive states;
* disabled states;
* validation states.

Use accessible contrast.

Do not hardcode inconsistent visual values throughout components.

Keep theme decisions centralized.

---

# APPLICATION SHELL

Implement the main responsive application shell.

It should support appropriate:

* navigation;
* sidebar/layout regions;
* content region;
* conversation panel;
* account/profile access;
* responsive transitions.

The structure must work on:

* desktop;
* tablet;
* narrow mobile-web widths.

Do not create a desktop-only UI.

---

# ROUTING

Implement the route model required by this milestone.

Support appropriate routes for:

* authentication;
* application root;
* conversation list;
* direct conversation;
* group conversation;
* profile/account.

Protected routes must not expose private application state to unauthenticated users.

Use the project's established routing approach.

---

# AUTHENTICATION UI

Implement the web authentication experience supported by the existing backend contract.

Where applicable include:

* sign up;
* sign in;
* sign out;
* session restoration;
* expired-session handling;
* authentication errors;
* account-disabled states;
* loading states.

Do not place sensitive credentials in insecure client storage.

Follow the backend's token/session model.

Do not invent authentication semantics that conflict with the actual backend contract.

---

# AUTHENTICATION SECURITY

The frontend must:

* avoid exposing tokens unnecessarily;
* avoid logging credentials;
* prevent accidental secret persistence in local storage when the security architecture does not permit it;
* protect authenticated routes;
* handle session expiration deterministically;
* avoid leaking private data in client-side error logs.

Do not treat route hiding as the only authorization control.

The backend remains authoritative.

---

# SESSION MANAGEMENT

Implement client session handling.

The client must handle:

* initial session restoration;
* authenticated state;
* unauthenticated state;
* session expiry;
* logout;
* concurrent-tab/session changes where relevant;
* retry behavior for transient failures.

Avoid endless authentication retry loops.

---

# API CLIENT

Implement or extend the canonical API client.

It must support:

* typed requests;
* typed responses;
* standardized errors;
* authentication;
* request cancellation where useful;
* request correlation where appropriate;
* safe retry behavior;
* timeout handling;
* pagination.

Do not blindly retry non-idempotent requests.

Do not expose backend implementation details to UI components.

---

# SERVER STATE

Use a coherent server-state/data-fetching strategy.

It must support:

* caching;
* invalidation;
* stale state;
* loading;
* error;
* refetch;
* mutation lifecycle.

Server state should not be duplicated unnecessarily into unrelated global stores.

---

# CLIENT STATE

Use client-side state management only for state that genuinely requires it.

Potential categories include:

* navigation state;
* selected conversation;
* composer state;
* ephemeral UI state;
* realtime connection state;
* local preferences.

Do not put server-authoritative message history into multiple competing client stores.

---

# VALIDATION

Use strongly typed client-side validation for forms.

Validate:

* credentials;
* profile fields;
* conversation creation inputs;
* group creation inputs;
* message composition where applicable.

Client validation improves UX but does not replace backend validation.

---

# ERROR SYSTEM

Create a consistent error presentation model.

Support:

* field validation;
* authentication errors;
* authorization failures;
* not-found states;
* rate limits;
* network failures;
* transient server failures;
* expired sessions;
* realtime disconnection.

Do not display raw backend stack traces or internal infrastructure information.

---

# LOADING AND EMPTY STATES

Every major data-driven surface must have:

* loading state;
* empty state;
* error state;
* retry path where useful.

Avoid blank screens while network requests are pending.

Use skeletons or equivalent patterns where they improve perceived performance without causing unnecessary visual noise.

---

# CONVERSATION LIST

Implement the conversation-list foundation.

Support:

* conversation identity;
* participant/group information;
* latest-message summary where available;
* unread indicator;
* timestamp;
* active/selected state;
* loading;
* pagination/infinite loading where applicable;
* empty state;
* error state.

Do not fabricate message previews when backend data is unavailable.

---

# CONVERSATION DISCOVERY

Implement the UI and API integration required to:

* create a direct conversation;
* select an existing conversation;
* create/access a group conversation according to current backend capabilities.

Prevent duplicate direct conversations through backend semantics rather than client-side assumptions.

---

# CHAT LAYOUT

Implement the foundational chat screen.

Include:

* conversation header;
* participant/group identity;
* message timeline;
* composer;
* connection/status indicators;
* appropriate action areas;
* loading and synchronization states.

The layout must remain usable during:

* long conversations;
* narrow screens;
* slow networks;
* reconnects;
* empty conversations.

---

# MESSAGE TIMELINE FOUNDATION

Implement a production-quality message timeline foundation.

Support:

* chronological rendering;
* sender grouping where appropriate;
* date separators;
* message states where available;
* deleted-message representation;
* edited-message indication where available;
* reply/reference display where supported by current backend contracts.

Do not implement virtualization prematurely unless message volume or measured performance requires it, but structure the timeline so virtualization can be introduced without rewriting domain logic.

---

# MESSAGE COMPOSER FOUNDATION

Implement the foundational composer.

Support:

* text entry;
* validation;
* send action;
* disabled/loading state;
* keyboard behavior;
* error state;
* retry where appropriate.

Do not implement full media attachment UX unless it belongs to a later frontend scope.

The composer must not send messages outside the existing backend contract.

---

# MESSAGE SEND UX

Integrate the composer with the existing backend messaging contract.

Support appropriate:

* submission;
* pending state;
* acknowledgement;
* failure state;
* retry;
* duplicate prevention.

Where optimistic UI is used, it must reconcile with the server-authoritative message ID and sequence.

Do not create permanent client-only messages that the server never acknowledged.

---

# REALTIME CLIENT FOUNDATION

Implement the browser WebSocket client foundation.

Support:

* connection;
* authentication;
* connection state;
* heartbeat handling;
* reconnect;
* backoff;
* clean disconnect;
* protocol validation;
* event handling;
* synchronization initiation.

Do not create an independent message protocol.

Consume the backend's canonical realtime envelope.

---

# REALTIME STATE

Represent realtime connection states clearly, such as:

* disconnected;
* connecting;
* connected;
* reconnecting;
* authentication-failed;
* synchronized;
* degraded.

The UI should not claim that realtime is healthy merely because a WebSocket object exists.

---

# MESSAGE EVENT HANDLING

Consume relevant backend events, including where supported:

* message_created;
* message_updated;
* message_deleted;
* message_delivered;
* message_read;
* reaction events;
* synchronization-required events.

Apply events idempotently.

Do not blindly append duplicate messages.

Use server-authoritative IDs and ordering information.

---

# SYNCHRONIZATION

Implement the client foundation for reconnect synchronization.

When the connection is restored:

1. authenticate;
2. identify current device/session state as required;
3. provide the last known synchronization checkpoint;
4. process missed state;
5. reconcile local pending state;
6. resume realtime processing.

Do not silently discard missed messages.

---

# OFFLINE / NETWORK RESILIENCE FOUNDATION

Provide the client architecture required for intermittent connectivity.

Support, within this scope:

* connection status;
* pending request state;
* retryable failures;
* stale data indication where useful;
* synchronization after reconnect.

Do not build a complete offline-first message queue unless it is explicitly required by the current backend contract and this milestone.

---

# PROFILE / ACCOUNT EXPERIENCE

Implement the foundational account UI.

Support:

* current profile display;
* profile editing where backend capabilities exist;
* session/logout controls;
* account error states.

Do not expose internal account fields that the API does not explicitly authorize.

---

# ACCESSIBILITY

Build the application foundation around accessibility.

Require:

* semantic HTML;
* keyboard navigation;
* visible focus;
* appropriate ARIA only when necessary;
* screen-reader-friendly labels;
* logical tab order;
* accessible dialogs;
* accessible form errors;
* sufficient contrast;
* reduced-motion support where practical.

Do not use color alone to communicate message state or errors.

---

# RESPONSIVE DESIGN

The application must support:

* desktop;
* tablet;
* mobile-web.

Responsive behavior must preserve the core messaging workflow.

Avoid requiring hover for critical functionality.

---

# PERFORMANCE

Optimize the frontend foundation for:

* fast initial load;
* code splitting;
* route-level loading;
* efficient API calls;
* stable rendering;
* minimized unnecessary state updates;
* efficient realtime event handling;
* bounded list rendering.

Do not sacrifice correctness for premature micro-optimizations.

Monitor expensive renders in the message timeline and conversation list.

---

# SECURITY

The web application must protect against:

* XSS;
* unsafe HTML rendering;
* token leakage;
* sensitive data exposure;
* insecure client-side authorization assumptions;
* accidental secret exposure;
* unsafe URL handling;
* untrusted message content rendering.

Never render message content as raw HTML unless it has been safely sanitized under an explicit content policy.

Do not trust client-side permission checks.

---

# PRIVATE DATA HANDLING

Do not expose private conversation content through:

* URL query strings;
* analytics payloads;
* console logs;
* error reports;
* debug output.

Remove or redact sensitive values from client telemetry where applicable.

---

# NOTIFICATION FOUNDATION

Implement only the notification UI foundation required by this scope.

Support:

* connection/realtime notification indicators;
* basic user-facing error/success notifications;
* permission-aware notification state where applicable.

Do not implement a complete notification center unless explicitly assigned to this milestone.

---

# UI COMPONENT QUALITY

Create reusable accessible components for:

* buttons;
* inputs;
* text fields;
* forms;
* dialogs;
* menus;
* avatars;
* badges;
* skeletons;
* toasts/alerts;
* conversation items;
* message bubbles;
* empty states.

Avoid unnecessary duplication.

Components should remain composable rather than tightly coupled to one page.

---

# TESTING

Implement automated frontend tests appropriate to this milestone.

## Authentication

Test:

* sign-in;
* validation;
* failure;
* protected routing;
* session restoration;
* logout;
* expired session.

## API integration

Test:

* successful requests;
* validation errors;
* authorization failures;
* retry behavior;
* standardized error handling.

## Conversation UI

Test:

* conversation loading;
* selection;
* empty state;
* error state;
* unread indicators;
* creation flow.

## Chat

Test:

* message rendering;
* composer validation;
* send success;
* send failure;
* duplicate event handling;
* deleted/edited message display;
* synchronization.

## Realtime

Test:

* connecting;
* reconnecting;
* authentication failure;
* event processing;
* duplicate event handling;
* synchronization after reconnect.

## Accessibility

Test:

* keyboard navigation;
* accessible names;
* form errors;
* dialog behavior;
* major page semantics.

Use integration/component tests where practical rather than testing only isolated utility functions.

---

# TESTING REALTIME RACE CONDITIONS

Where practical, test scenarios including:

* message event before initial query completes;
* duplicate message event;
* reconnect during message send;
* connection loss after optimistic send;
* synchronization overlapping realtime events;
* delayed message update;
* stale read state.

The resulting client state must converge to the server-authoritative state.

---

# DOCUMENTATION

Update frontend documentation for:

* application structure;
* route structure;
* environment variables;
* API client;
* authentication;
* realtime client;
* state-management boundaries;
* local development;
* test execution.

Documentation must reflect actual code.

---

# FUTURE COMPATIBILITY

The frontend architecture must be suitable for later implementation of:

* rich message reactions;
* media attachments;
* presence;
* typing indicators;
* search;
* blocking;
* reporting;
* notifications;
* administrative interfaces;
* advanced message interactions.

Do not hardcode the current minimal UI in a way that makes future features require a full rewrite.

---

# NO FAKE FUNCTIONALITY

Do not create:

* fake API responses;
* fake authentication;
* fake WebSocket events;
* fake message persistence;
* fake search;
* fake media upload;
* fake notification delivery.

Where backend capabilities are unavailable, implement real loading/error/unsupported states rather than fabricated success.

---

# NO HARDCODED SECRETS

Never hardcode:

* API keys;
* authentication secrets;
* provider credentials;
* private tokens;
* production credentials.

Use environment configuration appropriate to the frontend security model.

Never place server-only secrets into `NEXT_PUBLIC_*` or equivalent client-exposed configuration.

---

# VALIDATION

Before completion:

* run type checking;
* run linting;
* run formatting;
* run component/integration tests;
* run build validation;
* validate route behavior;
* validate authentication flows;
* validate API integration;
* validate realtime behavior;
* validate accessibility where tooling permits;
* inspect the final diff.

Verify:

* no client-exposed secrets;
* no unauthorized data rendering;
* no fake backend behavior;
* no broken responsive states;
* no console errors introduced by the implementation;
* no unrelated modifications.

---

# COMPLETION REPORT

After implementation, report:

* files created;
* files modified;
* files deleted, if any;
* application-shell changes;
* routes;
* authentication implementation;
* API client changes;
* state-management changes;
* conversation UI;
* chat UI;
* realtime client;
* synchronization behavior;
* profile/account work;
* accessibility work;
* responsive work;
* tests added;
* tests executed;
* validation performed;
* documentation changes;
* compatibility considerations;
* unresolved issues;
* backend/external blockers.

Do not claim that backend capabilities exist if they were not actually verified.

---

# DEFINITION OF DONE

This frontend milestone is complete only when:

* the Next.js application foundation is operational;
* routing is implemented;
* authentication flows work against the real backend contract;
* protected routes behave correctly;
* session handling is implemented;
* the API client is typed and robust;
* server-state management is coherent;
* foundational client state is established;
* conversation list is implemented;
* conversation discovery/creation is implemented where backend support exists;
* chat layout is implemented;
* message timeline foundation is implemented;
* message composer foundation is implemented;
* realtime connection foundation is implemented;
* reconnect/synchronization behavior is implemented;
* loading/error/empty states are present;
* responsive behavior is implemented;
* accessibility foundations are implemented;
* security controls are applied;
* relevant automated tests exist and pass;
* documentation reflects actual behavior;
* no intentional implementation gaps remain within scope;
* the frontend structure can support later media, search, reactions, presence, notifications, moderation, and administration work without a fundamental rewrite.

This Definition of Done applies only to **Frontend Prompt — Volume 1**.

It does not require implementation of the complete web application.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as **Frontend Prompt — Volume 1 only**.

Inspect the repository before making changes.

Implement only the web application foundation, authentication, navigation, conversation discovery, chat foundation, and realtime client scope defined here.

Do not implement mobile applications.

Do not redesign the backend.

Do not implement final production infrastructure.

Do not implement unrelated future frontend features.

Do not invent another frontend volume or project phase.

Do not depend on previous AI responses.

Use the repository and actually available project contracts as the source of truth.

Preserve compatible existing behavior.

Implement real production-grade functionality within scope.

Run appropriate validation.

Inspect the final diff.

Provide the required completion report and accurately report what was implemented and verified.
