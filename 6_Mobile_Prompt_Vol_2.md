# WHATSAPP — MOBILE VOLUME 2

## ROLE

Act as a senior production engineering team responsible for implementing the advanced mobile communication experience of a global real-time messaging platform.

Operate as:

* Staff Mobile Engineer
* Senior React Native Engineer
* Senior TypeScript Engineer
* Mobile Architecture Engineer
* Real-Time Systems Engineer
* Offline Systems Engineer
* Mobile Performance Engineer
* Mobile Security Engineer
* QA Engineer
* Accessibility Engineer
* UX Engineer

You are implementing production-grade software suitable for a globally scaled communication platform.

Do not teach, provide tutorials, or merely describe what should be implemented. Inspect the repository and implement the required functionality directly.

Do not produce pseudo-code, placeholders, TODO/FIXME comments, fake implementations, incomplete handlers, mock production services, or omitted implementations.

Every implementation must be real, integrated, typed, testable, maintainable, and production-ready.

# PROJECT

Build the advanced mobile messaging experience for a global real-time communication platform comparable in capability to WhatsApp, Telegram, Signal, Messenger, Discord, and Teams.

The mobile application must support:

* Individual conversations
* Group conversations
* Real-time messaging
* Message delivery states
* Read states
* Replies
* Editing
* Deletion
* Reactions
* Forwarding
* Pinned messages
* Saved messages
* Typing indicators
* Presence
* Offline messaging
* Background synchronization
* Media messaging
* Voice messages
* Documents
* Images
* Video
* Stickers
* GIFs
* Link previews
* Push notifications
* Multi-device synchronization
* Conversation search
* Message search
* Privacy controls
* Blocking
* Reporting
* Disappearing messages
* Notification controls
* Reliable reconnect behavior

The platform must be capable of operating at global scale with very large concurrent user populations and high message throughput.

The mobile implementation must integrate with the repository's existing backend contracts and existing application architecture without redesigning backend APIs unnecessarily.

# TECHNOLOGY DIRECTION

Use the repository's established implementation when compatible with this scope.

The mobile application is based on:

* React Native
* Expo
* TypeScript
* React Navigation
* TanStack Query where appropriate
* Zustand where appropriate
* Socket.IO or the repository's established real-time transport
* Secure platform storage for sensitive credentials
* Local persistence appropriate for mobile offline operation
* APNs for iOS push notifications
* FCM for Android push notifications

Follow the repository's existing dependency versions and conventions when they already exist.

Do not replace established technologies without a concrete compatibility or production-readiness reason.

# SOURCE OF TRUTH

The repository is the source of truth.

Before modifying anything:

1. Inspect the repository structure.
2. Identify the mobile application.
3. Inspect the existing mobile architecture.
4. Inspect navigation and screen organization.
5. Inspect API clients and generated types.
6. Inspect authentication/session handling.
7. Inspect WebSocket/Socket.IO implementation.
8. Inspect state management.
9. Inspect local persistence.
10. Inspect push-notification infrastructure.
11. Inspect existing message and conversation models.
12. Inspect existing tests.
13. Inspect package configuration and scripts.
14. Inspect TypeScript configuration.
15. Inspect Expo configuration.
16. Inspect platform-specific configuration.
17. Determine which functionality already exists.
18. Preserve compatible behavior.
19. Implement only the scope of this prompt.
20. Do not regenerate files unnecessarily.

Repository state is authoritative for integration.

Do not assume that a file exists merely because a conventional project would normally contain it.

Do not create duplicate implementations when an existing abstraction can be extended safely.

# 1. MOBILE ARCHITECTURE INTEGRATION

Implement the advanced mobile messaging layer on top of the repository's existing mobile foundation.

Ensure clear separation between:

* navigation
* screens
* presentation components
* domain models
* API clients
* real-time transport
* state management
* local persistence
* synchronization
* media handling
* notification handling
* platform services
* security-sensitive storage

Do not place networking, persistence, synchronization, or business logic directly inside large presentation components.

Keep components focused and composable.

Create reusable hooks and services where they provide clear architectural value.

Maintain strict TypeScript typing throughout the implementation.

# 2. CONVERSATION EXPERIENCE

Implement the complete advanced mobile conversation experience.

Support:

* direct conversations
* group conversations
* conversation headers
* participant information
* conversation status
* message history
* unread state
* message composer
* attachment actions
* keyboard-aware layouts
* scrolling behavior
* message grouping
* date separators
* contextual message actions
* conversation-level actions

Ensure the UI behaves correctly across:

* small phones
* large phones
* portrait orientation
* landscape where supported
* different safe-area configurations
* iOS
* Android
* keyboard-open states
* accessibility font scaling

Avoid hardcoded dimensions that break on different devices.

# 3. ADVANCED MESSAGE TIMELINE

Implement a production-grade message timeline.

The timeline must support:

* large message histories
* efficient virtualization
* incremental rendering
* stable message keys
* chronological ordering
* grouped messages
* date separators
* unread markers
* newest-message navigation
* jump-to-message behavior
* scroll-to-reply behavior
* preserved scroll position
* pagination
* loading older messages
* synchronization of newly received messages
* reconciliation of locally created messages

Do not render an entire large conversation history unnecessarily.

Use an appropriate virtualized list architecture.

Prevent:

* unnecessary rerenders
* duplicate messages
* unstable list keys
* scroll jumps
* repeated pagination requests
* excessive state updates

# 4. MESSAGE COMPOSER

Implement an advanced mobile message composer.

Support:

* text entry
* multiline messages
* send action
* keyboard-aware behavior
* reply mode
* edit mode
* attachment entry points
* emoji interaction
* disabled/loading states
* failed-send recovery
* draft preservation where appropriate
* message length validation
* accessibility labels

The composer must remain responsive while network operations occur.

Do not block the UI unnecessarily while sending a message.

# 5. OPTIMISTIC MESSAGE SENDING

Implement reliable optimistic sending.

When a user sends a message:

1. Create a client-side message representation.
2. Generate or consume the appropriate client idempotency identifier.
3. Insert the pending message into the local conversation state.
4. Attempt transmission through the established API/real-time transport.
5. Reconcile the server response with the local message.
6. Replace temporary identifiers with authoritative identifiers when required.
7. Preserve message ordering.
8. Update delivery state.
9. Handle retries safely.
10. Prevent duplicate messages.

The implementation must survive:

* network loss
* app backgrounding
* app termination where persistence is supported
* WebSocket disconnects
* request timeouts
* duplicate acknowledgements
* delayed server responses
* reconnect races

Never create duplicate user-visible messages because of a retry.

# 6. MESSAGE STATUS UI

Implement mobile presentation for:

* pending
* sending
* sent
* delivered
* read
* failed
* retrying

The UI must reflect authoritative server state after synchronization.

Do not treat a local optimistic state as permanent truth.

Ensure state reconciliation works when delivery events arrive before or after message fetches.

# 7. REPLIES

Implement message replies.

Support:

* replying to messages
* reply preview in composer
* reply metadata in message bubbles
* tapping a reply to navigate to the referenced message
* missing/deleted referenced messages
* media-message replies
* group replies
* accessibility semantics

Prevent navigation failures when the referenced message is not currently loaded.

When necessary, fetch or synchronize the target message before attempting to scroll to it.

# 8. EDITING MESSAGES

Implement mobile message editing.

Support:

* entering edit mode
* loading existing message content
* editing text
* canceling edits
* submitting edits
* optimistic UI where safe
* authoritative reconciliation
* edited indicators
* failed-edit recovery
* synchronization of edits from other devices

Respect server authorization and message-edit constraints.

Do not allow the client to bypass backend rules.

# 9. MESSAGE DELETION

Implement:

* delete for self
* delete for everyone where supported by the backend contract
* deletion confirmation
* optimistic deletion where appropriate
* synchronization of remote deletions
* deleted-message presentation
* failed deletion recovery

Do not expose deletion controls when the current user is not authorized.

# 10. REACTIONS

Implement message reactions.

Support:

* adding reactions
* removing reactions
* changing reactions
* displaying reaction counts
* displaying the current user's reaction
* reaction updates from other devices
* real-time reaction events
* group conversations

Prevent stale reaction counts when multiple updates arrive rapidly.

Use efficient state updates rather than unnecessarily refetching entire conversations.

# 11. MESSAGE CONTEXT ACTIONS

Implement a mobile message action surface appropriate for touch interaction.

Actions should include only actions allowed by the current message state and user permissions.

Potential actions include:

* reply
* react
* edit
* delete
* forward
* copy
* pin
* save
* report

Ensure destructive actions require appropriate confirmation.

Do not expose actions that the backend would reject due to permissions.

# 12. FORWARDING

Implement message forwarding UX.

Support:

* selecting one or multiple messages where supported
* selecting destination conversations
* previewing selected messages
* confirming forwarding
* progress/loading state
* success state
* failure recovery
* duplicate prevention

Respect privacy and forwarding restrictions defined by the backend contract.

Do not duplicate large media payloads unnecessarily on the client.

# 13. PINNED AND SAVED MESSAGES

Implement mobile experiences for:

* pinned messages
* unpinning
* viewing pinned messages
* navigating from pinned messages to their conversation location
* saved messages
* removing saved messages
* navigating from saved messages

Handle messages that have subsequently been deleted or become unavailable.

# 14. TYPING INDICATORS

Implement real-time typing indicators.

Requirements:

* debounce typing events
* avoid sending an event for every keystroke
* stop typing after inactivity
* stop typing when the composer is cleared
* stop typing when leaving the conversation
* stop typing when the app transitions away where appropriate
* expire stale remote typing indicators
* support direct and group conversations
* avoid excessive socket traffic

Typing indicators must never become persistent stale state.

# 15. PRESENCE

Implement mobile presentation of presence information.

Support backend-provided presence states such as:

* online
* recently active
* last seen
* unavailable where applicable

Respect privacy settings.

Do not expose presence information that the current user is not authorized to view.

Avoid unnecessary polling when real-time events are available.

# 16. OFFLINE MESSAGE QUEUE

Implement robust mobile offline message handling.

The client must support composing and sending messages while temporarily offline where the product contract permits.

Persist the minimum required information to recover queued messages safely.

Queue entries must include sufficient metadata to:

* identify the destination conversation
* identify the client-generated message
* preserve message content
* preserve idempotency information
* track retry state
* track synchronization state

Implement controlled retries.

Avoid infinite retry loops.

Use exponential backoff where appropriate.

Respect network connectivity.

Do not aggressively retry while the device has no usable network.

# 17. OFFLINE RECONCILIATION

Implement synchronization when connectivity returns.

The synchronization process must:

* detect connectivity recovery
* reconnect real-time transport
* synchronize missing server events
* reconcile pending local messages
* reconcile message status
* remove duplicate local records
* recover missed reactions
* recover edits
* recover deletions
* recover membership changes
* update unread state
* preserve conversation ordering

Synchronization must be idempotent.

Handle partial synchronization failures without corrupting local state.

# 18. BACKGROUND AND FOREGROUND LIFECYCLE

Handle mobile lifecycle transitions correctly.

Implement appropriate behavior for:

* foreground
* background
* inactive
* app resume
* network changes
* device sleep
* terminated application restart

When returning to foreground:

* validate session state
* restore required subscriptions
* reconnect real-time transport when necessary
* synchronize missed events
* refresh stale data
* reconcile pending operations
* update notification state

Do not assume that a WebSocket remains alive while the application is backgrounded.

# 19. REAL-TIME EVENT PROCESSING

Extend the mobile real-time client to correctly process:

* new messages
* message updates
* message deletions
* reactions
* delivery updates
* read updates
* typing events
* presence events
* conversation updates
* membership changes
* pin updates
* synchronization events

Ensure events are:

* validated
* deduplicated
* ordered where required
* applied idempotently
* reconciled with local cache
* safely ignored when obsolete

Never allow malformed real-time payloads to crash the application.

# 20. GROUP CONVERSATION UX

Implement advanced mobile group conversation behavior.

Support:

* group participant display
* sender identification
* participant profile access
* group metadata
* membership updates
* participant additions/removals
* group permission changes
* group-specific message actions
* admin-only controls where applicable

Handle rapidly changing group membership without corrupting the conversation UI.

# 21. MEDIA ATTACHMENT EXPERIENCE

Implement the mobile attachment experience for supported media.

Support appropriate flows for:

* image selection
* video selection
* camera capture where the application already supports camera access
* documents
* audio
* voice messages
* stickers
* GIFs

Respect the existing backend media contract.

Do not upload media directly to arbitrary application endpoints when signed upload/storage flows are already established.

# 22. MEDIA UPLOAD UX

Implement resilient upload behavior.

Support:

* upload preparation
* progress
* cancellation where supported
* retry
* failure state
* successful attachment reconciliation
* background-safe behavior where supported
* large-file handling
* network changes

Avoid loading entire large media files into JavaScript memory unnecessarily.

Use platform-appropriate file APIs.

Prevent accidental duplicate uploads.

# 23. IMAGE AND VIDEO MESSAGE EXPERIENCE

Implement mobile presentation for image and video messages.

Support:

* thumbnails
* progressive loading where available
* full-screen viewer
* playback controls
* loading states
* failed-media states
* retry
* download/open behavior where applicable
* safe handling of unavailable media

Optimize memory usage.

Avoid retaining unnecessary high-resolution image objects.

# 24. VOICE MESSAGE EXPERIENCE

Implement voice-message UX using the repository's established audio architecture.

Support where backend contracts permit:

* recording
* canceling
* sending
* playback
* pause/resume
* progress
* duration
* failure recovery
* permissions
* interruption handling
* output-device behavior
* background/foreground transitions

Handle:

* incoming calls or audio interruptions
* permission denial
* recording failure
* insufficient storage
* lifecycle changes

Do not expose a broken recording state after an interrupted session.

# 25. DOCUMENT MESSAGES

Implement document-message UX.

Support:

* document attachment
* document metadata
* upload state
* download/open state
* failure recovery
* secure file access
* platform file integration

Do not trust client-provided MIME type or filename for authorization or security decisions.

# 26. STICKERS AND GIFS

Implement the mobile interaction layer for:

* stickers
* sticker selection
* recent stickers
* GIF search
* GIF previews
* GIF sending
* failed GIF sends

Use provider abstractions already established by the application.

Do not expose third-party provider credentials in the mobile bundle.

# 27. LINK PREVIEWS

Implement mobile rendering for server-generated link previews.

Treat preview metadata as untrusted content.

Support:

* preview loading
* preview display
* missing preview
* failed preview
* safe URL display
* navigation through a controlled browser/web-view strategy where appropriate

Do not allow arbitrary remote content to execute inside the application's privileged context.

# 28. PUSH NOTIFICATION INTERACTION

Implement advanced notification handling.

Support:

* opening a conversation from a notification
* deep-link navigation
* message notification routing
* group notification routing
* notification grouping where platform capabilities permit
* read-state reconciliation after opening
* notification-driven synchronization
* privacy-aware notification content

Ensure a notification does not navigate to a stale or deleted message without graceful handling.

# 29. NOTIFICATION PRIVACY

Respect user preferences for:

* message previews
* sender display
* lock-screen visibility
* conversation-specific notifications
* muted conversations
* notification categories

Never place sensitive message content in logs.

Do not persist notification payloads unnecessarily.

# 30. SEARCH EXPERIENCE

Implement mobile search UX for:

* conversation search
* global message search
* contact/user search
* search result navigation
* loading
* pagination
* empty results
* failed searches
* stale results
* message highlighting where appropriate

Search results must respect server authorization and privacy controls.

Do not implement client-side search over data the user is not authorized to access.

# 31. DISAPPEARING MESSAGES

Implement mobile UI for disappearing-message configuration and state.

Support:

* displaying active disappearing-message settings
* selecting supported durations
* changing settings
* showing appropriate message expiration information
* handling expiration updates from the server
* removing expired messages from visible local state when required

Do not rely solely on client clocks for authoritative expiration behavior.

# 32. BLOCKING AND REPORTING

Implement mobile UX for:

* blocking users
* unblocking users
* reporting users
* reporting messages
* confirmation dialogs
* success/failure states
* blocked-user UI
* restricted interaction states

Respect backend privacy and authorization decisions.

Do not expose internal moderation data to ordinary users.

# 33. LOCAL DATA MANAGEMENT

Review all mobile-persisted data.

Ensure the application does not persist more sensitive data than necessary.

Classify local data into:

* credentials/tokens
* conversation metadata
* message data
* media references
* preferences
* synchronization state
* temporary data
* telemetry/debug information

Sensitive authentication material must use secure platform storage.

Do not store secrets in ordinary unencrypted application storage.

# 34. CACHE CONSISTENCY

Ensure consistency between:

* local persistence
* Zustand state
* TanStack Query cache
* real-time events
* optimistic state
* server responses
* push-triggered synchronization

Define clear ownership for mutable state.

Prevent two stores from independently becoming authoritative for the same entity.

Avoid cache invalidation strategies that cause unnecessary full-conversation refetches.

# 35. MEMORY AND PERFORMANCE

Optimize the application for long-running sessions.

Measure and address:

* message-list rerenders
* image memory
* video memory
* large conversation histories
* navigation transitions
* state updates
* WebSocket event processing
* local database operations
* synchronization work
* upload/download operations
* battery usage

Do not sacrifice correctness for premature micro-optimizations.

Use profiling or measurable reasoning where appropriate.

# 36. ACCESSIBILITY

Ensure advanced messaging functionality is accessible.

Support:

* screen readers
* accessible message actions
* accessible reaction controls
* accessible attachment controls
* accessible status indicators
* dynamic font scaling
* sufficient touch targets
* meaningful accessibility labels
* logical focus behavior
* reduced-motion considerations where appropriate

Do not communicate important state exclusively through color.

# 37. INTERNATIONALIZATION

Ensure mobile UI is compatible with:

* long translations
* right-to-left layouts where supported
* locale-aware dates
* locale-aware times
* pluralization
* Unicode text
* emoji
* mixed-language messages

Do not hardcode English assumptions into layout logic.

# 38. ERROR HANDLING

Every advanced messaging flow must provide controlled error states.

Handle:

* network unavailable
* authentication expiration
* server errors
* rate limiting
* permission denial
* upload failure
* media processing failure
* synchronization failure
* WebSocket failure
* local persistence failure
* invalid payloads
* unavailable messages
* deleted conversations
* revoked membership
* blocked users

Errors must be actionable where possible.

Do not expose internal stack traces or sensitive implementation details to users.

# 39. SECURITY

Review all newly implemented mobile functionality for:

* token leakage
* insecure local storage
* unauthorized data access
* malicious deep links
* untrusted media metadata
* unsafe URLs
* notification data exposure
* log leakage
* WebSocket payload abuse
* replayed operations
* duplicate submissions
* excessive local persistence
* debug-only security bypasses

Never embed:

* private API keys
* server secrets
* signing credentials
* cloud credentials
* third-party secret keys

in the mobile application.

Treat every server response as untrusted until validated against expected types and invariants.

# 40. TESTING

Add or extend automated tests for the implemented functionality.

Cover at minimum:

* message rendering
* optimistic send
* failed send
* retry
* duplicate reconciliation
* delivery updates
* read updates
* replies
* editing
* deletion
* reactions
* forwarding
* offline queue
* reconnect synchronization
* real-time event handling
* typing indicators
* presence
* media states
* notification navigation
* blocking/reporting
* disappearing-message UI
* permission failures
* authentication expiration
* accessibility behavior where practical

Include regression coverage for existing functionality affected by the implementation.

Do not write brittle tests that depend on arbitrary timing.

# 41. MOBILE FAILURE SCENARIOS

Explicitly test and handle:

* WebSocket disconnect during send
* network loss after optimistic insertion
* app backgrounded during send
* app terminated with pending messages
* duplicate server acknowledgement
* duplicate real-time event
* event received before REST response
* REST response received before event
* stale synchronization cursor
* expired authentication
* revoked conversation membership
* deleted referenced message
* failed media upload
* interrupted voice recording
* notification opening a missing message
* local database failure
* low-memory conditions
* rapid navigation between conversations

The application must fail safely and recover without corrupting user-visible state.

# 42. CODE QUALITY

Maintain:

* strict TypeScript
* clear naming
* small focused components
* reusable hooks
* deterministic state transitions
* explicit domain types
* minimal duplication
* controlled side effects
* clear error boundaries
* consistent import structure
* consistent formatting
* repository lint rules
* repository test conventions

Do not introduce unnecessary architectural complexity.

Do not leave dead code from replaced implementations.

Do not suppress TypeScript errors without a justified and documented reason.

# 43. DOCUMENTATION

Update relevant documentation for:

* mobile architecture
* synchronization behavior
* offline message handling
* real-time event handling
* notification navigation
* media behavior
* local persistence
* testing
* development setup
* operational assumptions

Documentation must describe the implementation that actually exists.

Do not document nonexistent behavior.

# 44. VALIDATION

Before considering the work complete:

1. Run the repository's mobile typecheck.
2. Run linting.
3. Run relevant unit tests.
4. Run integration tests where available.
5. Validate the mobile build configuration.
6. Validate iOS-related configuration where available.
7. Validate Android-related configuration where available.
8. Verify navigation flows.
9. Verify authentication flows.
10. Verify message synchronization.
11. Verify offline behavior.
12. Verify media flows.
13. Verify notification navigation.
14. Verify accessibility-critical interactions.
15. Verify no secrets were introduced.
16. Verify no debug-only bypasses remain.
17. Verify no duplicate abstractions were introduced.
18. Verify all changed files compile.
19. Verify existing functionality remains compatible.

If an environment prevents a validation step, document exactly what could not be executed and why.

Do not falsely claim a test passed if it was not executed.

# 45. IMPLEMENTATION BOUNDARIES

This prompt is specifically for the advanced mobile communication experience.

Do not redesign:

* backend domain architecture
* backend database architecture
* backend infrastructure
* web frontend architecture

unless a narrowly scoped compatibility change is absolutely required for mobile integration.

If an existing backend or shared contract is insufficient, adapt the mobile implementation to the actual repository contract whenever possible.

If a compatibility change is genuinely required, make the smallest safe change and document it.

Do not rewrite unrelated files.

# 46. REPOSITORY INTEGRATION

After implementation:

* inspect all changed files
* remove obsolete imports
* remove unused dependencies
* verify package configuration
* verify navigation registration
* verify environment handling
* verify platform-specific configuration
* verify generated types
* verify tests
* verify documentation
* verify git diff for accidental changes

Do not regenerate unchanged files.

Do not replace working architecture simply because another implementation would be stylistically preferable.

Preserve compatibility with the existing project.

# 47. FINAL IMPLEMENTATION REPORT

When implementation is complete, provide a concise engineering report containing:

### A. Implemented Scope

List the concrete mobile functionality implemented.

### B. Files Created

List every newly created file and its purpose.

### C. Files Modified

List every modified file and explain why it changed.

### D. Architecture Changes

Describe any mobile architectural changes.

### E. State and Synchronization

Explain:

* local state
* persistence
* optimistic updates
* reconciliation
* offline queue
* real-time events

### F. Media

Describe implemented:

* image
* video
* audio
* voice
* documents
* stickers
* GIF
* link-preview

behavior.

### G. Notifications

Describe:

* APNs
* FCM
* notification routing
* deep links
* privacy handling

as actually implemented.

### H. Security

Describe security-sensitive implementation decisions.

### I. Testing

List tests added or modified and commands executed.

### J. Validation

Report:

* typecheck
* lint
* tests
* build validation
* platform validation

with exact results.

### K. Known Limitations

Only list genuine limitations that remain after this implementation.

Do not use vague statements.

# MOBILE COMPLETION STANDARD

This volume is complete only when the advanced mobile messaging experience is implemented as real production-grade code.

The implementation must:

* compile
* typecheck
* integrate with the repository
* preserve existing compatible functionality
* handle real-time communication correctly
* support reliable optimistic messaging
* handle offline/reconnect scenarios
* support advanced message interactions
* support media interaction flows
* support notifications
* respect privacy and security boundaries
* remain performant on mobile devices
* include meaningful automated tests
* avoid fake implementations
* avoid placeholders
* avoid TODO/FIXME gaps
* avoid omitted implementations
* avoid unnecessary rewrites
* contain no known unresolved TypeScript errors
* contain no knowingly broken imports
* contain no knowingly broken navigation routes

Do not stop after creating scaffolding.

Implement the complete scope defined in this prompt.

# IMPLEMENTATION REPORT FORMAT

End the implementation with exactly this structure:

```text
IMPLEMENTATION STATUS
- Status: COMPLETE / BLOCKED
- Scope: WHATSAPP MOBILE VOLUME 2

IMPLEMENTED
- ...

FILES CREATED
- ...

FILES MODIFIED
- ...

ARCHITECTURE
- ...

REAL-TIME / OFFLINE
- ...

MEDIA
- ...

NOTIFICATIONS
- ...

SECURITY
- ...

TESTS
- ...

VALIDATION
- ...

KNOWN LIMITATIONS
- ...

FINAL RESULT
- ...
```

If blocked, identify the exact technical blocker, the affected scope, what was successfully implemented, and what remains incomplete.

Do not claim completion when required implementation or validation remains unfinished.
