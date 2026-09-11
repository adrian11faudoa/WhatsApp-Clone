# WHATSAPP — MOBILE VOLUME 1

## ROLE

Act as a Principal Mobile Architect, Staff React Native Engineer, Staff TypeScript Engineer, Staff Mobile UI/UX Engineer, Staff Accessibility Engineer, Staff Security Engineer, Staff Performance Engineer, Staff Offline Systems Engineer, Staff Real-Time Systems Engineer, and Senior QA Engineer working as one production engineering team.

Your responsibility is to implement the **production mobile application foundation and core communication experience** for the WhatsApp platform.

Do not act as a teacher. Do not provide tutorials instead of implementation. Inspect the repository, understand its current implementation, and directly implement the required functionality.

The mobile application must be suitable for a globally deployed communication platform serving hundreds of millions of registered users, tens of millions of daily active users or greater, very large concurrent real-time traffic, high message throughput, and large media volumes.

---

# PROJECT

Build the mobile application for a production-grade global real-time communication platform comparable in capability and usability to WhatsApp, Telegram, Signal, Messenger, Discord, and Teams.

The mobile application must support:

* individual messaging
* group messaging
* profiles
* contacts
* presence
* typing indicators
* delivery/read states
* replies
* reactions
* editing
* deletion
* forwarding
* pinned messages
* saved messages
* search
* notifications
* push notifications
* multi-device synchronization
* offline behavior
* privacy controls
* blocking/reporting
* disappearing messages
* media
* documents
* voice messages
* stickers/GIFs
* link previews

This volume establishes the **React Native/Expo mobile foundation, navigation, authentication, session handling, application shell, core messaging UI, local state architecture, API integration, real-time foundation, push-notification foundation, offline foundation, accessibility, and mobile production hardening**.

Do not implement fake backend functionality.

---

# TECHNOLOGY DIRECTION

Use the repository's established mobile stack where compatible.

Expected technologies include:

* React Native
* Expo
* TypeScript
* React Navigation
* TanStack Query
* Zustand
* React Hook Form
* Zod
* Socket.IO/WebSocket client
* REST/OpenAPI APIs
* Expo Notifications or the repository's push infrastructure
* secure native storage
* platform APIs
* Jest/Vitest
* React Native Testing Library
* Detox or equivalent end-to-end tooling where available

Use existing dependencies before introducing new ones.

Do not introduce redundant state-management, navigation, networking, or storage libraries.

---

# SOURCE OF TRUTH

The repository is authoritative for:

* mobile application structure
* package manager
* Expo configuration
* React Native version
* navigation
* API contracts
* WebSocket contracts
* authentication
* shared domain types
* backend capabilities
* push notification infrastructure
* design system
* environment configuration
* testing
* build configuration

Inspect the repository before modifying anything.

Do not assume an endpoint, event, native capability, or package exists.

Do not regenerate unchanged files.

Do not replace working infrastructure without a technical reason.

---

# 1. MOBILE ENGINEERING OBJECTIVES

Prioritize:

1. correctness
2. reliability
3. offline resilience
4. security
5. accessibility
6. performance
7. battery efficiency
8. maintainability
9. real-time responsiveness
10. scalability

The application must behave correctly under:

* weak cellular networks
* Wi-Fi changes
* airplane mode
* background/foreground transitions
* terminated application restart
* push notification launches
* authentication expiration
* WebSocket reconnects
* duplicate events
* large conversation histories
* large groups
* large media messages
* memory pressure

---

# 2. MOBILE APPLICATION ARCHITECTURE

Establish clear boundaries between:

* navigation
* screens
* feature modules
* domain models
* API services
* WebSocket services
* server state
* local state
* persistent state
* secure state
* offline state
* UI components
* native integrations
* push notifications
* analytics/telemetry
* error handling

Use feature-oriented organization where appropriate.

Keep business logic outside presentation components where practical.

Do not create a single global store containing the entire application.

Clearly distinguish:

* server state
* durable local state
* secure credentials
* ephemeral UI state
* offline queue state
* derived state

---

# 3. EXPO AND REACT NATIVE FOUNDATION

Establish the production mobile foundation.

Implement or extend:

* Expo configuration
* application entry point
* environment configuration
* platform configuration
* asset loading
* safe-area handling
* status-bar behavior
* keyboard handling
* splash-screen behavior
* error boundaries
* global providers
* query provider
* navigation provider
* theme provider
* authentication state
* real-time service
* push notification integration points

Respect the repository's current Expo architecture.

Do not migrate managed/bare workflow unless required.

---

# 4. NAVIGATION ARCHITECTURE

Implement a scalable navigation architecture.

Support appropriate navigation layers for:

* unauthenticated flow
* authenticated application
* conversation screens
* profile screens
* settings
* contacts
* search
* media
* device/session management
* modal flows

Use nested navigators where appropriate.

Navigation must correctly handle:

* authentication changes
* deep links
* push notification navigation
* logout
* session expiration
* app cold start
* app warm start
* background return

Prevent navigation loops.

Do not duplicate route definitions across unrelated modules.

---

# 5. DEEP LINKING

Implement typed deep-link handling.

Support routes for applicable destinations such as:

* conversation
* profile
* message
* settings
* search
* notification target

Validate identifiers before navigation.

Handle links when:

* application is terminated
* application is backgrounded
* application is active
* authentication is unavailable
* target resource no longer exists

Do not expose private resource information in unsafe URLs.

---

# 6. AUTHENTICATION FOUNDATION

Implement the mobile authentication experience supported by the repository.

Support:

* sign in
* sign out
* session restoration
* authentication loading
* authentication failure
* expired session
* unauthorized responses
* protected navigation
* forced logout

Securely store credentials according to the repository's authentication architecture.

Use secure native storage for sensitive credentials.

Do not store:

* access tokens
* refresh tokens
* passwords
* session secrets

in ordinary unencrypted application storage unless the authentication architecture explicitly requires a non-sensitive identifier there.

---

# 7. SESSION RESTORATION

On application startup:

* initialize secure storage
* restore authentication state
* validate session where required
* initialize server-state cache
* establish real-time connection when authenticated
* register push capabilities
* restore safe UI preferences
* route deterministically

Avoid displaying authenticated screens before authentication state is known.

Prevent flashing private application content during session initialization.

---

# 8. AUTHENTICATION EXPIRATION

Handle expired authentication globally.

When authentication becomes invalid:

1. stop authenticated requests
2. close real-time connections
3. clear sensitive client state
4. preserve only safe non-sensitive preferences
5. transition to authentication
6. prevent stale private screens from remaining accessible

Do not require every screen to independently implement authentication expiration.

---

# 9. DESIGN SYSTEM

Implement or extend reusable mobile UI primitives.

Provide appropriate components for:

* buttons
* icon buttons
* text inputs
* text areas
* avatars
* cards
* list rows
* badges
* chips
* menus
* dialogs
* bottom sheets
* action sheets
* switches
* radio controls
* checkboxes
* tabs
* separators
* skeletons
* loading indicators
* empty states
* error states
* toast/banner notifications

All components must support:

* accessibility
* dynamic text where appropriate
* dark mode where supported
* safe-area behavior
* touch targets
* disabled/loading states

Do not duplicate UI primitives inside individual screens.

---

# 10. RESPONSIVE MOBILE LAYOUT

The mobile interface must support:

* small phones
* large phones
* portrait
* landscape where appropriate
* different safe-area configurations
* devices with display cutouts
* software keyboards

Avoid hard-coded dimensions that break across devices.

Respect:

* safe areas
* keyboard insets
* dynamic status bars
* navigation bars
* platform-specific behavior

---

# 11. AUTHENTICATED APPLICATION SHELL

Implement the primary authenticated shell.

Support:

* conversation navigation
* contacts
* search
* settings
* profile
* notification indicators
* connection status
* account actions

Use platform-appropriate navigation patterns.

Do not force desktop-style layouts onto mobile devices.

---

# 12. PROFILE FOUNDATION

Implement the mobile profile experience.

Support:

* avatar
* display name
* identifier
* about/status
* profile editing
* loading
* validation
* update
* failure recovery

Use the existing profile APIs.

When profile data changes:

* update affected caches
* update visible UI
* reconcile real-time updates
* avoid unnecessary full-screen reloads

---

# 13. CONTACTS FOUNDATION

Implement mobile contacts functionality.

Support:

* contact list
* search
* pagination/incremental loading
* contact profile
* start conversation
* blocked-user state
* loading
* empty state
* retry

Use virtualized native lists for large datasets.

Do not render an unbounded contact list using ordinary nested views.

---

# 14. CONVERSATION LIST

Implement the mobile conversation list.

Support:

* conversation title
* avatar
* last-message preview
* timestamp
* unread count
* mute state
* pinned state
* draft state where supported
* presence where appropriate
* loading
* empty
* error
* pull-to-refresh where appropriate
* pagination/incremental loading

Use efficient list virtualization.

Ensure conversation updates do not cause the entire list to rerender unnecessarily.

---

# 15. CONVERSATION WORKSPACE

Implement the core mobile conversation screen.

Provide:

* conversation header
* participant/group information
* message timeline
* message composer
* attachment entry point
* connection status
* loading state
* empty state
* error state
* unread state
* scroll controls

The screen must adapt correctly to the keyboard.

Do not allow the keyboard to cover the composer.

---

# 16. MESSAGE TIMELINE

Implement a scalable native message list.

Support:

* chronological rendering
* message grouping
* date separators
* historical pagination
* new-message insertion
* message state updates
* deleted messages
* delivery/read states
* replies
* reactions
* long messages

Use an appropriate virtualized list implementation.

Avoid rendering thousands of message components simultaneously.

Preserve scroll position when loading older messages.

---

# 17. MESSAGE COMPOSER

Implement the mobile message composer.

Support:

* text input
* send
* keyboard behavior
* multiline messages
* character limits where applicable
* draft preservation
* disabled state
* sending state
* failed message recovery

Prepare the architecture for:

* media attachments
* camera
* document picker
* voice messages
* stickers
* GIFs
* replies
* editing

Do not implement fake attachment behavior.

---

# 18. MESSAGE SEND FOUNDATION

Implement the mobile send lifecycle.

Support:

* local pending state
* server acknowledgement
* delivery state
* failure
* retry
* idempotency
* reconciliation

Prevent duplicate messages from:

* HTTP acknowledgement
* WebSocket acknowledgement
* replayed events
* reconnect synchronization

The user must never silently lose an entered message.

---

# 19. REAL-TIME CONNECTION

Implement a mobile real-time connection manager.

Support:

* authenticated connection
* reconnect
* backoff
* connection state
* heartbeat where required
* event validation
* event dispatch
* disconnect cleanup
* authentication invalidation

The connection manager must be application-scoped.

Do not create a new socket for every screen.

---

# 20. MOBILE CONNECTION LIFECYCLE

Handle:

* foreground
* background
* app termination
* network changes
* Wi-Fi → cellular
* cellular → Wi-Fi
* temporary offline
* server disconnect
* authentication expiration

Use appropriate platform lifecycle APIs.

Do not maintain unnecessary active real-time connections while the application is backgrounded if the architecture does not require them.

Coordinate with push notifications for background delivery.

---

# 21. REAL-TIME CACHE INTEGRATION

Integrate WebSocket events into TanStack Query and local state.

Support events for:

* new messages
* message updates
* deletions
* reactions
* delivery states
* read states
* typing
* presence
* conversation updates
* group updates

Validate events before applying them.

Deduplicate repeated events.

Perform targeted cache updates.

Avoid invalidating the entire cache for individual events.

---

# 22. OFFLINE FOUNDATION

Implement the mobile offline foundation.

Represent:

* online
* offline
* reconnecting
* connected
* degraded
* authentication-invalid

Use network state as a signal, not as proof of backend availability.

Prepare the architecture for:

* offline message queue
* cached conversation data
* pending operations
* synchronization
* conflict resolution

Do not silently discard offline-created user content.

---

# 23. LOCAL PERSISTENCE

Define safe local persistence boundaries.

Persist only data that should survive application restarts.

Potentially persist:

* safe UI preferences
* navigation preferences
* non-sensitive cached state where appropriate
* offline operation metadata

Sensitive credentials must use secure storage.

Do not persist private message data indefinitely without an explicit product requirement.

Implement expiration/cleanup where persistent cached data exists.

---

# 24. PUSH NOTIFICATION FOUNDATION

Implement push notification registration and handling.

Support:

* permission state
* registration
* token retrieval
* token synchronization
* token refresh
* logout cleanup
* notification receipt
* notification interaction
* deep-link navigation

Support both:

* iOS/APNs
* Android/FCM

through the repository's existing notification architecture.

Never expose push credentials or server secrets in the application bundle.

---

# 25. PUSH NOTIFICATION PRIVACY

Notification content must respect privacy settings.

Support appropriate behavior for:

* hidden message previews
* visible previews
* muted conversations
* blocked users
* logged-out state
* multiple devices

Do not place sensitive message contents into analytics.

Do not assume the client can always prevent the operating system from displaying a notification.

---

# 26. ACCESSIBILITY FOUNDATION

Target high accessibility quality.

Implement:

* accessible labels
* hints where useful
* roles
* state announcements
* minimum touch targets
* screen-reader navigation
* accessible message status
* accessible buttons
* accessible menus
* accessible dialogs
* accessible input errors

Do not rely solely on color.

Ensure screen readers can understand:

* sender
* message
* time
* delivery/read state
* reply relationship
* selected state
* disabled state

---

# 27. DARK MODE AND APPEARANCE

Implement supported appearance modes.

Support:

* light
* dark
* system preference

Ensure correct appearance across:

* navigation
* messages
* composer
* dialogs
* media
* settings
* loading states
* errors
* system bars

Avoid hard-coded colors where theme tokens exist.

---

# 28. MOBILE PERFORMANCE

Optimize for real mobile hardware.

Address:

* memory usage
* list rendering
* image rendering
* unnecessary rerenders
* navigation performance
* startup time
* bundle size
* network requests
* battery consumption
* background activity

Use:

* native virtualized lists
* memoized rows where justified
* selective state subscriptions
* lazy screen loading
* image thumbnails
* targeted cache updates

Do not optimize by sacrificing correctness.

---

# 29. MOBILE SECURITY

Implement secure mobile behavior.

Protect:

* authentication credentials
* local sensitive data
* deep links
* notification payloads
* cached private information
* logs
* screenshots where the product/security model requires controls

Never log:

* passwords
* tokens
* private message contents
* private media
* authentication secrets

Do not rely on client-side authorization.

---

# 30. ERROR HANDLING

Provide consistent mobile error behavior.

Handle:

* network errors
* server errors
* validation failures
* authorization failures
* expired sessions
* rate limits
* unavailable conversations
* failed messages
* failed profile updates
* push registration failures
* WebSocket failures

Use platform-appropriate:

* banners
* alerts
* inline errors
* retry controls
* loading states

Avoid disruptive modal alerts for every transient network failure.

---

# 31. TESTING

Implement tests for:

* navigation
* authentication
* session restoration
* session expiration
* profile
* contacts
* conversation list
* conversation screen
* message rendering
* message sending
* failed sends
* retry
* WebSocket lifecycle
* reconnect
* offline state
* push notification handling
* deep links
* accessibility
* dark mode
* responsive behavior

Use:

* unit tests
* React Native component tests
* integration tests
* end-to-end tests where available

Tests must be deterministic.

Do not rely on arbitrary sleeps.

---

# 32. FAILURE AND RECOVERY TESTING

Explicitly test:

* network transition during send
* backgrounding during send
* app termination and restart
* WebSocket disconnect
* reconnect
* duplicate events
* authentication expiration
* push notification tap
* invalid deep link
* unavailable message
* unavailable conversation
* failed profile update
* failed contact request

The application must recover without corrupting local state.

---

# 33. TYPESCRIPT AND CODE QUALITY

Maintain strict TypeScript correctness.

Avoid:

* `any`
* unsafe assertions
* duplicated domain models
* untyped navigation parameters
* untyped WebSocket events
* duplicated API clients
* giant screens
* business logic inside presentational components

Use typed navigation parameters.

Use discriminated unions where appropriate.

Validate external API/event data at boundaries.

---

# 34. DOCUMENTATION

Update mobile documentation covering:

* application structure
* navigation
* authentication
* secure storage
* API integration
* WebSocket lifecycle
* offline architecture
* push notifications
* deep linking
* accessibility
* testing
* local development
* build configuration

Documentation must match actual implementation.

---

# 35. IMPLEMENTATION AND INTEGRATION RULES

Before coding:

1. inspect the repository
2. inspect the mobile application structure
3. inspect Expo configuration
4. inspect navigation
5. inspect authentication
6. inspect API clients
7. inspect WebSocket implementation
8. inspect push notification infrastructure
9. inspect shared types
10. inspect existing mobile components
11. inspect testing configuration

Then implement only the scope defined by this prompt.

Preserve compatible behavior.

Do not redesign backend APIs.

Do not fabricate native capabilities.

Do not introduce mock production behavior.

If a required backend capability is absent, integrate only with actual repository capabilities and report the limitation.

---

# 36. FINAL IMPLEMENTATION REPORT

Before finishing:

* run TypeScript validation
* run lint
* run formatting validation
* run unit tests
* run component tests
* run integration tests
* run end-to-end tests where available
* validate Expo/native configuration
* validate production build where available

Fix introduced failures.

Report:

* exact files created
* exact files modified
* mobile architecture
* navigation architecture
* authentication
* secure storage
* real-time behavior
* offline foundation
* push notifications
* deep links
* accessibility
* performance
* security
* tests
* validation commands
* validation results
* repository limitations
* native capabilities requiring later implementation

Do not claim a test or build passed unless it was actually executed.

# MOBILE VOLUME 1 COMPLETION STANDARD

This volume is complete only when the repository contains a production-quality mobile foundation with:

* React Native/Expo architecture
* typed navigation
* authentication
* secure session restoration
* profile foundation
* contacts
* conversation list
* conversation workspace
* scalable message timeline
* message composer
* message send lifecycle
* WebSocket foundation
* mobile lifecycle handling
* offline foundation
* safe local persistence
* push notification foundation
* deep linking
* accessibility
* dark mode
* mobile performance optimization
* security hardening
* automated tests
* build validation
* accurate documentation

No pseudo-code, placeholders, fake APIs, TODO/FIXME markers, omitted implementations, or unfinished production paths are permitted.

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
4. **Mobile Architecture**
5. **Navigation and Authentication**
6. **Messaging Foundation**
7. **Real-Time and Offline Behavior**
8. **Push Notifications and Deep Links**
9. **Security and Privacy**
10. **Accessibility**
11. **Performance**
12. **Testing**
13. **Validation Commands**
14. **Validation Results**
15. **Repository Limitations**
16. **Remaining Scope Outside This Volume**

Stop only after the implementation and validation are complete.
