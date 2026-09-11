# WHATSAPP — FRONTEND VOLUME 1

## ROLE

Act as a Principal Frontend Architect, Staff Frontend Engineer, Staff UI/UX Engineer, Staff TypeScript Engineer, Staff Accessibility Engineer, Staff Security Engineer, Staff Performance Engineer, and Senior QA Engineer working as one production engineering team.

Your responsibility is to implement the **WhatsApp web application foundation and core user experience** as production-grade software.

Do not act as a teacher. Do not provide tutorials instead of implementation. Inspect the repository, understand its current state, and directly implement the required scope.

The implementation must be suitable for a globally deployed communication platform serving hundreds of millions of registered users and very large concurrent traffic.

---

# PROJECT

Build the web application for a production-grade global real-time communication platform comparable in breadth and usability to WhatsApp, Telegram, Signal, Messenger, Discord, and Teams.

The web application must provide a polished, responsive, accessible, secure, high-performance communication experience.

The current frontend scope covers the **web application foundation, authentication experience, application shell, account/profile experience, responsive navigation, conversation workspace foundation, client state architecture, API integration foundation, real-time integration foundation, error handling, loading states, accessibility, testing, and production frontend hardening**.

The implementation must integrate with the existing repository without redesigning backend contracts unnecessarily.

The repository is the source of truth for existing code, package configuration, API contracts, generated clients, database-backed behavior exposed by APIs, environment configuration, and established conventions.

---

# TECHNOLOGY DIRECTION

Use the technology already established by the repository where compatible with this project.

The intended web stack is:

* Next.js
* React
* TypeScript
* Tailwind CSS
* TanStack Query
* Zustand
* React Hook Form
* Zod
* React Navigation only where shared client abstractions require it; do not introduce mobile-only patterns into the web application
* WebSocket / Socket.IO client
* REST APIs
* OpenAPI-generated or strongly typed API clients where appropriate
* Vitest or Jest according to repository conventions
* React Testing Library
* Playwright for browser-level testing where infrastructure exists
* ESLint
* Prettier
* modern browser APIs
* accessible semantic HTML
* responsive layouts
* secure browser storage practices

Do not introduce unnecessary dependencies.

Before adding a dependency, verify whether the repository already provides equivalent functionality.

---

# SOURCE OF TRUTH

The repository is the authoritative source for:

* existing frontend structure
* package manager
* installed dependencies
* TypeScript configuration
* Next.js configuration
* Tailwind configuration
* linting
* formatting
* testing
* environment handling
* existing API contracts
* authentication behavior
* WebSocket contracts
* shared types
* generated clients
* naming conventions
* routing
* existing UI components
* existing design tokens
* existing backend capabilities

Inspect the repository before changing anything.

Do not assume that a file, endpoint, package, component, route, or contract exists merely because it is described in this prompt.

If the repository already contains a compatible implementation, extend it rather than replacing it.

Do not regenerate unchanged files.

Do not introduce duplicate architecture.

Do not create parallel implementations of the same concern.

---

# 1. FRONTEND ENGINEERING OBJECTIVES

Implement the web frontend with the following priorities:

1. correctness
2. maintainability
3. accessibility
4. security
5. responsive UX
6. performance
7. real-time reliability
8. testability
9. observability
10. scalability

The frontend must behave correctly under:

* slow networks
* intermittent networks
* reconnects
* expired sessions
* concurrent updates
* stale cached data
* browser refreshes
* multiple browser tabs
* large conversation lists
* large message histories
* large contact lists
* large group membership
* high-frequency real-time events

Do not build a static mockup.

Every implemented screen must be connected to real application state and real API contracts available in the repository.

---

# 2. FRONTEND ARCHITECTURE

Establish a clear frontend architecture separating:

* application shell
* routing
* authentication
* API clients
* WebSocket client
* server state
* client state
* UI state
* domain models
* shared components
* feature components
* forms
* validation
* utilities
* accessibility
* error handling
* telemetry
* testing

Use a feature-oriented structure where appropriate.

Prevent:

* giant components
* duplicated API calls
* duplicated state
* circular dependencies
* business logic inside presentation-only components
* network calls directly scattered throughout UI components
* uncontrolled global state
* unnecessary client-side rendering
* unsafe browser persistence

Clearly distinguish:

* server state
* durable client state
* ephemeral UI state
* derived state
* real-time event state

Use TanStack Query for server-state concerns where appropriate.

Use Zustand only for genuinely client-owned state such as:

* UI preferences
* selected conversation
* navigation state
* connection state
* temporary client interaction state
* other state that should not be treated as server cache

Do not duplicate the same server data in both TanStack Query and Zustand without a documented reason.

---

# 3. NEXT.JS APPLICATION FOUNDATION

Implement the production web application foundation.

Establish:

* application entry points
* route structure
* layout structure
* metadata handling
* error boundaries
* loading boundaries
* not-found handling
* environment configuration
* client/server component boundaries
* shared providers
* query provider
* authentication provider/state integration where required
* WebSocket provider/service integration where appropriate
* global styles
* design tokens
* responsive breakpoints
* accessibility foundations

Follow the repository's existing Next.js version and routing architecture.

Do not migrate routing architecture unless required by the existing repository.

Avoid turning the entire application into client-rendered code.

Use server components where beneficial and client components where interactive behavior requires them.

---

# 4. DESIGN SYSTEM FOUNDATION

Implement or extend a consistent design system.

Establish reusable primitives for:

* buttons
* icon buttons
* inputs
* text areas
* selects
* checkboxes
* radio controls
* switches
* dialogs
* drawers
* sheets
* dropdown menus
* popovers
* tooltips
* avatars
* badges
* separators
* skeletons
* spinners
* alerts
* toasts
* empty states
* error states
* confirmation dialogs

Ensure components provide:

* keyboard support
* focus management
* visible focus states
* semantic markup
* screen-reader labels
* correct ARIA usage
* disabled/loading states
* responsive behavior

Do not add ARIA attributes when native semantic HTML already provides the required behavior.

Use accessible color contrast and do not communicate state through color alone.

---

# 5. APPLICATION SHELL

Implement the primary WhatsApp web application shell.

The shell must support:

* desktop layout
* tablet layout
* narrow viewport layout
* responsive navigation
* authenticated and unauthenticated states
* global loading states
* global error handling
* connection status
* account menu
* profile access
* settings access
* logout
* conversation navigation

The desktop experience should support a communication-oriented layout with:

* conversation/navigation panel
* active conversation workspace
* contextual controls

The mobile-width web experience must adapt the navigation so the interface remains usable rather than simply compressing desktop content.

Do not create fixed-width layouts that become unusable on smaller screens.

---

# 6. AUTHENTICATION EXPERIENCE

Implement the complete frontend authentication experience supported by the backend contracts available in the repository.

Support applicable flows such as:

* sign in
* sign out
* session restoration
* authentication loading
* authentication failure
* expired session
* unauthorized response handling
* account access errors
* protected routes
* redirect behavior

Do not expose access tokens unnecessarily to JavaScript.

Follow the repository's established authentication model.

If secure HTTP-only cookies are used, integrate with them correctly.

If a token-based mechanism exists, follow its security contract and avoid storing sensitive credentials in insecure persistent storage.

Never log:

* passwords
* access tokens
* refresh tokens
* authentication secrets
* sensitive personal data

Prevent redirect loops.

Handle authentication state transitions deterministically.

---

# 7. SESSION AND DEVICE EXPERIENCE

Implement the frontend behavior necessary for session and device management supported by the backend.

The interface must correctly represent:

* active session
* session restoration
* session expiration
* device/session metadata
* logout
* forced logout
* revoked session
* authentication invalidation

When the backend reports that the current session is invalid, clear appropriate client state and transition the application to the authentication experience without leaving stale private data visible.

---

# 8. PROFILE EXPERIENCE

Implement the user's core profile experience.

Support the backend capabilities available for:

* display name
* username or identifier
* profile photo/avatar
* profile information
* profile editing
* profile loading
* profile update
* validation errors
* optimistic UI only where safe
* upload progress where supported
* update failure recovery

Provide a polished profile interface.

Profile updates must invalidate or update the correct cached data without causing unrelated application state to become stale.

Do not duplicate user records across unrelated stores.

---

# 9. ACCOUNT MENU AND SETTINGS ENTRY POINT

Implement the authenticated account menu.

Provide access to:

* profile
* settings
* privacy-related controls exposed by the application
* notification-related settings where supported
* device/session management where supported
* logout

The menu must work with:

* keyboard navigation
* mouse/touch interaction
* screen readers
* narrow screens

Ensure destructive actions require appropriate confirmation.

---

# 10. CONTACTS FOUNDATION

Implement the web frontend foundation for contacts.

Support available backend capabilities for:

* contact list retrieval
* searching contacts
* contact loading states
* empty states
* contact selection
* contact avatar
* contact display name
* starting a conversation
* blocked-user presentation where applicable

Use efficient server-state caching.

Do not load an unbounded contact dataset into browser memory.

Use pagination or incremental retrieval according to the available API contract.

Debounce appropriate search requests.

Cancel stale requests when supported by the HTTP client.

---

# 11. CONVERSATION LIST FOUNDATION

Implement the conversation list interface.

Support:

* conversation retrieval
* pagination/infinite scrolling where supported
* conversation selection
* unread counts
* last-message preview
* timestamps
* participant/group avatar
* muted state where supported
* pinned state where supported
* draft state where supported
* loading states
* empty state
* error state
* retry
* real-time list updates

The conversation list must remain performant with very large numbers of conversations.

Do not render thousands of complex conversation rows simultaneously.

Use virtualization when required by the expected dataset size and repository architecture.

Ensure updates to one conversation do not cause unnecessary rerendering of the entire list.

---

# 12. CONVERSATION WORKSPACE FOUNDATION

Implement the core conversation workspace.

The workspace must provide the structural foundation for:

* conversation header
* participant/group information
* message timeline
* message composer area
* connection state
* loading history
* empty conversation state
* message loading errors
* retry
* scroll behavior
* unread boundary
* date separators
* message grouping foundation

The workspace must be designed so later features can integrate without rewriting the entire component tree.

Separate:

* message rendering
* timeline state
* message composer
* conversation metadata
* real-time events
* network synchronization

Do not place all conversation logic in one component.

---

# 13. MESSAGE TIMELINE FOUNDATION

Implement a scalable message timeline architecture.

Support:

* chronological rendering
* stable message identifiers
* message grouping
* date separators
* loading older messages
* pagination
* empty state
* message insertion
* message updates
* message deletion state
* read state integration points
* delivery state integration points

The timeline must support very large histories without attempting to render the entire history at once.

Preserve scroll position when loading older messages.

Prevent unexpected jumps when real-time messages arrive.

Handle the distinction between:

* historical messages
* newly received messages
* locally pending messages
* failed messages
* updated messages
* deleted messages

---

# 14. MESSAGE COMPOSER FOUNDATION

Implement the reusable message composer foundation.

Support the capabilities exposed by current backend contracts, including:

* text input
* send action
* Enter/Shift+Enter behavior
* disabled state
* loading state
* validation
* character/message limits where applicable
* draft preservation
* keyboard accessibility
* mobile-width behavior

Prepare the composer architecture for later support of:

* media
* documents
* voice messages
* replies
* reactions
* stickers
* GIFs
* link previews
* editing
* forwarding

Do not implement unsupported backend functionality through fake client behavior.

---

# 15. API CLIENT ARCHITECTURE

Implement a centralized frontend API layer.

Requirements:

* typed requests
* typed responses
* consistent headers
* authentication integration
* timeout handling where appropriate
* abort/cancellation support
* normalized error handling
* retry policy appropriate to operation type
* request correlation support
* safe logging
* environment-aware base URLs

Do not scatter raw `fetch` calls throughout components.

Separate API transport from feature-level data access.

Never automatically retry non-idempotent mutations unless the operation explicitly supports safe idempotency.

Correctly handle:

* 400
* 401
* 403
* 404
* 409
* 422
* 429
* 5xx
* network failures
* timeout
* aborted requests

---

# 16. TANSTACK QUERY ARCHITECTURE

Establish consistent TanStack Query usage.

Define conventions for:

* query keys
* mutation keys
* stale times
* garbage collection
* retry behavior
* invalidation
* optimistic updates
* cancellation
* pagination
* infinite queries
* mutation error handling

Query keys must be deterministic and domain-oriented.

Do not invalidate the entire application cache after every mutation.

Invalidate or update only affected resources.

Use optimistic updates only when rollback behavior is deterministic and safe.

---

# 17. ZUSTAND CLIENT STATE

Establish narrowly scoped Zustand stores.

Potential state domains include:

* selected conversation
* navigation
* connection status
* UI preferences
* modal/dialog state
* temporary composer state
* local interaction state

Do not store large server datasets in Zustand when TanStack Query is the appropriate owner.

Avoid creating a single global store containing the entire application.

State updates must be granular to avoid unnecessary rerenders.

---

# 18. WEBSOCKET / SOCKET.IO CLIENT FOUNDATION

Implement the real-time client architecture according to the repository's available WebSocket contract.

Support:

* authenticated connection
* connection lifecycle
* reconnect behavior
* connection state
* heartbeat behavior if required by protocol
* event parsing
* event validation
* event dispatch
* subscription lifecycle
* duplicate event protection
* graceful disconnect
* session invalidation
* server errors

Do not create a second WebSocket connection for every component.

Use an application-level connection manager or equivalent architecture.

The implementation must remain stable across:

* route changes
* component remounts
* browser tab visibility changes
* temporary network loss
* reconnects
* authentication changes

---

# 19. REAL-TIME CACHE INTEGRATION

Real-time events must integrate with server state predictably.

For applicable events:

* update affected conversation state
* update message state
* update unread counts
* update delivery/read indicators
* update presence
* update typing state
* reconcile pending messages
* prevent duplicate insertion
* preserve ordering guarantees

Do not blindly invalidate every query whenever a WebSocket event arrives.

Prefer targeted cache updates where event semantics allow deterministic updates.

Validate event payloads before applying them to application state.

Unknown event versions must fail safely without corrupting client state.

---

# 20. OFFLINE AND RECONNECT FOUNDATION

Implement the frontend foundation required for intermittent connectivity.

Represent:

* online
* offline
* reconnecting
* connected
* authentication-invalid
* degraded connection where supported

The interface must provide appropriate user feedback without overwhelming the user.

Do not treat browser online status as proof that the backend WebSocket is connected.

Use actual connection state for real-time status.

Prepare the message composer and synchronization architecture for safe offline behavior.

Never silently discard user-entered message content.

---

# 21. ERROR HANDLING

Implement consistent user-facing error handling.

Provide appropriate:

* inline errors
* toast errors
* page-level errors
* retry actions
* network error handling
* authorization errors
* validation errors
* server errors
* unavailable service states

Do not expose internal stack traces or sensitive backend information.

Error messages must be actionable without revealing security-sensitive details.

Centralize error normalization where possible.

---

# 22. LOADING AND EMPTY STATES

Every asynchronous user-facing feature implemented in this volume must provide intentional:

* initial loading
* incremental loading
* refresh/loading
* empty
* error
* retry
* disabled
* success feedback

Do not leave blank screens while data loads.

Use skeletons where they improve perceived performance.

Do not animate every loading state unnecessarily.

Respect reduced-motion preferences.

---

# 23. RESPONSIVE DESIGN

Implement responsive behavior across:

* desktop
* laptop
* tablet
* mobile-width browser windows

The layout must remain usable at narrow widths.

Ensure:

* navigation remains accessible
* composer remains usable
* buttons remain tappable
* dialogs fit viewport constraints
* long names do not break layouts
* message bubbles handle long text
* images/media cannot overflow
* timestamps remain readable
* keyboard navigation remains functional

Do not rely solely on hover interactions.

---

# 24. ACCESSIBILITY

Target WCAG 2.2 AA quality.

Implement:

* semantic HTML
* keyboard navigation
* focus management
* accessible labels
* accessible descriptions
* dialog semantics
* screen-reader announcements where appropriate
* logical tab order
* visible focus
* reduced motion
* sufficient contrast
* accessible status messages
* accessible error messages

The conversation experience must remain usable without a mouse.

Do not trap focus incorrectly.

Do not create inaccessible custom controls when native controls are sufficient.

---

# 25. PERFORMANCE

Optimize the frontend for large-scale communication workloads.

Address:

* code splitting
* route-level loading
* lazy loading
* memoization where justified
* list virtualization
* stable component boundaries
* selective subscriptions
* image optimization
* network request deduplication
* cache efficiency
* bundle size
* unnecessary rerenders
* WebSocket event processing
* large message histories

Do not add memoization blindly.

Measure or reason about expensive rendering paths before optimizing.

Avoid expensive computations during every message render.

---

# 26. SECURITY

Apply frontend security practices including:

* XSS prevention
* safe rendering of user-generated content
* URL validation
* safe external links
* secure authentication handling
* CSRF-aware behavior according to backend authentication model
* sensitive data minimization
* secure error handling
* safe file upload integration
* protection against malicious link previews
* protection against unsafe HTML injection
* safe iframe behavior where applicable

Never render arbitrary user content using unsafe HTML APIs unless it has been rigorously sanitized by an appropriate trusted mechanism.

Never trust client-side authorization.

The backend remains authoritative for authorization.

---

# 27. OBSERVABILITY

Integrate frontend observability according to the repository's existing monitoring architecture.

Support where applicable:

* structured client errors
* route performance
* API failure telemetry
* WebSocket connection failures
* reconnect counts
* frontend performance metrics
* correlation/request identifiers
* release/version information

Do not collect unnecessary personal message content.

Do not send passwords, tokens, private messages, media contents, or other sensitive user data to telemetry systems.

Respect privacy requirements.

---

# 28. TESTING

Implement automated tests for the functionality introduced by this volume.

Cover at minimum:

* authentication state transitions
* protected routing
* profile loading/editing
* contact retrieval
* conversation list
* conversation selection
* message timeline rendering
* pagination
* composer behavior
* API error handling
* WebSocket lifecycle
* real-time cache updates
* reconnect behavior
* loading states
* empty states
* accessibility-critical interactions

Use:

* unit tests
* component tests
* integration tests
* browser tests where the repository supports Playwright

Tests must be deterministic.

Do not rely on arbitrary sleeps.

Mock external systems only at appropriate boundaries.

---

# 29. TYPESCRIPT AND CODE QUALITY

Maintain strict TypeScript correctness.

Avoid:

* `any`
* unsafe type assertions
* duplicated domain types
* inconsistent nullability
* implicit API shapes
* unreachable branches
* dead code
* circular imports

Prefer shared domain contracts where the repository provides them.

If frontend-specific transformations are required, make them explicit and typed.

Run:

* typecheck
* lint
* formatting validation
* relevant tests
* production build validation

Fix all introduced errors.

---

# 30. INTERNATIONALIZATION AND USER INPUT

Design the frontend so it can support:

* long translated strings
* right-to-left layouts where applicable
* Unicode names
* emoji
* international phone identifiers where applicable
* locale-aware dates/times
* locale-aware number formatting

Do not hard-code assumptions that users have short Latin-character names.

Do not truncate critical communication content merely because it is longer in another language.

Use the project's existing internationalization approach if one exists.

---

# 31. DATA PRIVACY

Frontend code must minimize exposure of sensitive communication data.

Do not:

* persist message bodies unnecessarily
* log private messages
* place tokens in analytics payloads
* expose private data through URLs
* retain stale account data after logout
* leak conversation information through error messages
* cache private information beyond necessary lifecycle requirements

When logging out or invalidating authentication, clear all private client state that must no longer be accessible.

Prevent browser back/forward navigation from exposing authenticated information where the application's security model requires additional handling.

---

# 32. BROWSER AND MULTI-TAB BEHAVIOR

Design the application for multiple browser tabs.

Prevent:

* duplicate destructive actions
* unnecessary duplicate WebSocket connections when architecture allows coordination
* inconsistent authentication state
* stale logout state
* conflicting client state

Use browser coordination mechanisms only when justified by the architecture.

Ensure authentication changes propagate safely across tabs when required.

---

# 33. DOCUMENTATION

Update frontend documentation for:

* application structure
* state management
* routing
* API integration
* WebSocket integration
* environment variables
* local development
* testing
* build commands
* frontend architectural conventions

Documentation must describe the implementation that actually exists.

Do not document features that were not implemented.

---

# 34. IMPLEMENTATION AND INTEGRATION RULES

Before implementing anything:

1. inspect the repository
2. identify the existing frontend application
3. inspect package configuration
4. inspect existing routes
5. inspect API clients and contracts
6. inspect authentication implementation
7. inspect existing shared components
8. inspect TypeScript configuration
9. inspect testing configuration
10. identify reusable existing infrastructure

Then implement only the scope defined by this prompt.

Preserve compatible behavior.

Do not rewrite unrelated modules.

Do not redesign backend APIs.

Do not modify database architecture unless a frontend contract defect makes it strictly necessary and the repository already establishes the appropriate integration path.

When backend functionality required by the UI already exists, consume it.

When a required capability does not exist, do not fabricate an API. Implement the frontend boundary cleanly and document the exact missing repository capability in the final report.

Do not leave fake implementations behind.

---

# 35. FINAL IMPLEMENTATION REPORT

Before finishing, verify the implementation.

Run all applicable:

* typecheck
* lint
* unit tests
* integration tests
* accessibility tests
* browser tests
* production build
* dependency validation

Resolve all errors introduced by the implementation.

Then provide a concise engineering report containing:

* exact files created
* exact files modified
* major frontend architecture decisions
* routes implemented
* components implemented
* API integrations implemented
* WebSocket integrations implemented
* state-management changes
* authentication behavior
* accessibility work
* performance work
* security work
* tests added
* validation commands executed
* validation results
* known repository limitations
* any required backend contract gaps
* any follow-up work that belongs outside this volume

Do not claim a test passed unless it was actually executed.

Do not claim a feature exists unless it was actually implemented.

---

# FRONTEND VOLUME 1 COMPLETION STANDARD

This volume is complete only when the repository contains a production-quality web application foundation with:

* functional application shell
* authenticated application flow
* session handling
* profile experience
* contacts foundation
* conversation list
* conversation workspace foundation
* message timeline foundation
* message composer foundation
* API client architecture
* TanStack Query architecture
* Zustand architecture where justified
* WebSocket foundation
* real-time state integration
* reconnect/offline foundation
* responsive UI
* accessible UI
* loading/empty/error states
* frontend security controls
* observability foundations
* automated tests
* strict TypeScript correctness
* successful production build
* documentation reflecting the actual implementation

The implementation must be real, integrated, maintainable, scalable, and production-oriented.

Do not leave placeholders, pseudo-code, TODO/FIXME markers, fake endpoints, incomplete handlers, intentionally omitted files, or unfinished implementations.

Do not use phrases such as:

* “implement similarly”
* “left as an exercise”
* “for brevity”
* “remaining code omitted”
* “placeholder”
* “TODO”

Every implemented file must contain complete production-quality code appropriate for its responsibility.

# IMPLEMENTATION REPORT FORMAT

At completion, report:

1. **Implementation Summary**
2. **Files Created**
3. **Files Modified**
4. **Frontend Architecture**
5. **Routes and User Flows**
6. **API Integrations**
7. **Real-Time Integrations**
8. **State Management**
9. **Security and Privacy**
10. **Accessibility**
11. **Performance**
12. **Testing**
13. **Validation Commands**
14. **Validation Results**
15. **Repository Limitations**
16. **Remaining Scope Outside This Volume**

Stop only after the implementation and validation are complete.
