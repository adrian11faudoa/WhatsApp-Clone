# MOBILE IMPLEMENTATION PROMPT — VOLUME 2

## Advanced Media, Notifications, Search, Settings, Calling, and Production Hardening

You are the senior mobile engineering team responsible for implementing the mobile application of a production-grade, enterprise real-time communication platform.

This is an implementation task.

Do not respond with a tutorial, conceptual proposal, pseudo-code, placeholder implementation, TODO list, or incomplete scaffold.

You must inspect the existing repository first, understand the actual implementation and contracts, and then implement the required functionality directly in the repository.

---

# 1. PRODUCT CONTEXT

Build and maintain a production-grade mobile real-time communication platform comparable in capability to modern messaging applications.

The mobile application must support:

* authenticated user accounts
* multi-device sessions
* one-to-one conversations
* group conversations
* real-time messaging
* message synchronization
* delivery and read states
* typing indicators
* presence
* replies
* reactions
* message editing
* message deletion
* media messaging
* push notifications
* search
* privacy controls
* group administration
* reporting and blocking
* disappearing messages where supported by the backend
* voice/video calling where supported by the backend
* reliable offline and reconnect behavior

The mobile application is part of one coherent distributed system.

It must integrate with the actual backend APIs, WebSocket contracts, authentication model, synchronization model, media system, notification system, search system, and calling/signaling system already implemented in the repository.

Do not invent competing contracts.

---

# 2. TECHNOLOGY REQUIREMENTS

Use the technologies actually established by the repository.

The expected mobile stack is:

* React Native
* Expo
* TypeScript
* Zustand
* TanStack Query
* React Navigation

Supporting platform capabilities may include:

* Expo-compatible camera/gallery/file APIs
* secure credential/session storage
* native push notifications
* FCM
* APNs
* WebRTC
* platform-native call integration where supported
* local notifications
* background/foreground lifecycle APIs

Do not introduce unnecessary libraries.

Before adding a dependency:

1. inspect package.json
2. inspect the current Expo SDK/version
3. inspect existing native configuration
4. determine whether the functionality already exists
5. use an existing dependency when possible
6. introduce a new dependency only when technically justified

Do not assume that Expo Go supports functionality that requires a development build or native configuration.

If the repository already uses Expo modules or a native implementation, integrate with it instead of creating another implementation.

---

# 3. NON-NEGOTIABLE ENGINEERING RULES

## Repository-first development

Before changing code:

* inspect the repository
* inspect package.json
* inspect Expo configuration
* inspect TypeScript configuration
* inspect navigation
* inspect authentication
* inspect API clients
* inspect TanStack Query configuration
* inspect Zustand stores
* inspect persistence
* inspect WebSocket implementation
* inspect synchronization
* inspect message models
* inspect media contracts
* inspect notification contracts
* inspect search contracts
* inspect group contracts
* inspect calling/signaling contracts
* inspect tests
* inspect environment configuration

Determine what is already implemented.

Reuse compatible code.

Do not regenerate unchanged files.

Do not create duplicate abstractions.

Do not create a second API client, WebSocket client, authentication system, storage system, media system, notification system, or state architecture when one already exists.

The actual repository is the source of truth for implementation details.

---

# 4. INTEGRATION RULE

This implementation is part of one coherent application.

Every new feature must integrate with existing:

* TypeScript types
* API contracts
* DTOs
* authentication
* authorization assumptions
* user/device IDs
* message IDs
* conversation IDs
* media IDs
* notification tokens
* WebSocket events
* synchronization cursors
* pagination
* timestamps
* error contracts
* loading states
* offline state
* query keys
* Zustand stores
* navigation routes
* analytics/observability
* environment configuration

If the existing implementation differs from an expected contract:

1. inspect the actual implementation
2. determine the correct integration point
3. make the smallest safe change
4. preserve backward compatibility
5. do not create competing implementations

Do not fabricate backend functionality.

If a capability is not supported by the actual backend, do not fake it in the mobile application.

---

# 5. OBJECTIVE

Implement the complete second-stage mobile experience covering:

1. advanced media messaging
2. media upload lifecycle
3. media playback and rendering
4. camera/gallery/file integration
5. permissions
6. push notifications
7. deep linking
8. notification preferences
9. search
10. profile/settings
11. privacy controls
12. blocking/reporting
13. group administration
14. disappearing messages where supported
15. storage/data-management interfaces where supported
16. mobile calling foundation
17. WebRTC integration where supported
18. offline/reconnect hardening
19. background/foreground behavior
20. secure local data handling
21. accessibility
22. performance
23. production hardening
24. comprehensive testing

---

# 6. ADVANCED MEDIA ARCHITECTURE

Implement a complete mobile media workflow.

Supported media types should match the actual backend contract, including where applicable:

* images
* videos
* audio
* voice messages
* documents
* other explicitly supported attachment types

Do not assume every MIME type is supported.

Use the backend's actual media constraints.

The mobile application must distinguish:

* local media selection
* upload preparation
* upload authorization
* upload progress
* upload
* upload cancellation
* upload retry
* processing
* processing completion
* processing failure
* message creation
* message delivery
* media availability
* media playback/download

Do not treat a locally selected file as successfully uploaded media.

---

# 7. IMAGE WORKFLOW

Implement image attachment support.

The workflow should support, where compatible with the repository:

* gallery selection
* camera capture
* image preview
* image metadata
* MIME validation
* file-size validation
* dimension validation
* compression/resizing
* upload progress
* cancellation
* retry
* processing state
* thumbnail/preview
* full-resolution access
* secure media retrieval

Compression must be appropriate for the media type.

Do not unnecessarily destroy image quality.

Respect backend limits.

Do not trust the client-provided MIME type alone.

---

# 8. VIDEO WORKFLOW

Implement video attachment support.

Support:

* gallery selection
* camera capture where supported
* preview
* duration information
* file-size validation
* supported-format validation
* optional client-side optimization when appropriate
* upload progress
* cancellation
* retry
* processing state
* thumbnail
* playback
* secure media access

Large videos must not freeze the UI.

Use streaming/playback mechanisms appropriate for React Native and the repository's actual media delivery architecture.

Do not load unnecessarily large media files entirely into JavaScript memory.

---

# 9. AUDIO AND VOICE MESSAGES

Implement audio messaging according to the backend contract.

Support:

* recording
* permission handling
* recording start
* recording pause where supported
* recording stop
* cancellation
* duration
* local preview
* upload
* progress
* retry
* playback
* playback pause/resume
* seek where supported
* cleanup

Voice recording must correctly handle:

* microphone permission denial
* interruptions
* application backgrounding
* incoming calls
* navigation away
* recording failures
* storage failures
* upload failures

Never leave microphones or audio resources active after the recording lifecycle ends.

Clean up native resources.

---

# 10. DOCUMENT ATTACHMENTS

Implement document attachment support where supported.

Support:

* native file picker
* supported MIME validation
* file-size validation
* filename handling
* upload progress
* cancellation
* retry
* download/open behavior
* secure access
* upload state
* processing state where applicable

Do not execute downloaded files automatically.

Use the operating system's secure document/open mechanisms.

---

# 11. MEDIA UPLOAD MANAGER

Implement a centralized media upload manager instead of scattering upload logic throughout screens.

It must provide:

* upload identification
* conversation association
* message association where applicable
* progress
* current state
* cancellation
* retry
* failure reason
* cleanup
* duplicate prevention
* lifecycle handling

Possible state machine:

```text
SELECTED
→ PREPARING
→ AUTHORIZING
→ UPLOADING
→ UPLOADED
→ PROCESSING
→ READY
```

Failure paths must be explicit.

For example:

```text
PREPARING → FAILED
AUTHORIZING → FAILED
UPLOADING → FAILED
PROCESSING → FAILED
```

Do not use arbitrary booleans when a state machine is more appropriate.

Persist enough state to safely recover interrupted operations where the repository architecture supports it.

Do not persist sensitive media unnecessarily.

---

# 12. UPLOAD RETRY

Implement reliable retry behavior.

Retries must:

* avoid duplicate messages
* reuse idempotency mechanisms
* avoid corrupting state
* preserve the conversation association
* preserve attachment metadata
* respect server-side idempotency
* distinguish retryable from permanent failures

Examples of retryable failures:

* temporary network outage
* timeout
* transient provider failure
* temporary server error

Examples of non-retryable failures:

* invalid media
* authorization failure
* unsupported format
* permanent size violation
* revoked access

Do not blindly retry all failures.

---

# 13. BACKGROUND AND FOREGROUND MEDIA BEHAVIOR

Handle application lifecycle correctly.

When the application transitions:

* active → background
* background → active
* active → inactive
* inactive → active

media operations must transition safely.

Where background upload is supported by the actual Expo/native architecture:

* configure it correctly
* persist required metadata
* recover state after process suspension
* prevent duplicate uploads
* reconcile completion with backend state

If true background upload is not supported by the existing architecture, do not fake it.

Instead implement reliable pause/recovery behavior.

---

# 14. MEDIA ACCESS SECURITY

Never expose media through insecure permanent URLs when the backend requires protected access.

Use the backend's actual media access mechanism.

Handle:

* authorization
* expired URLs
* refresh
* denied access
* deleted media
* unavailable media
* conversation access revocation
* blocked users
* expired media

Do not log:

* signed URLs
* authorization tokens
* private media metadata unnecessarily
* credentials

Do not place sensitive credentials in query strings unless required by the existing contract.

---

# 15. MEDIA CACHE

Implement controlled media caching.

Cache behavior must define:

* what is cached
* where it is cached
* maximum size
* eviction strategy
* expiration
* privacy implications
* cleanup behavior

Do not store private media indefinitely.

Provide storage cleanup where supported.

Avoid loading entire media files into memory unnecessarily.

Use streaming and filesystem-backed approaches when appropriate.

---

# 16. CAMERA AND GALLERY

Integrate camera/gallery capabilities using the repository's supported Expo/native APIs.

Handle:

* permission request
* permission denial
* limited photo access where applicable
* camera unavailable
* simulator/device differences
* cancellation
* malformed assets
* unsupported formats

The UI must explain permission failures clearly without exposing technical internals.

Do not request permissions before they are necessary.

---

# 17. PUSH NOTIFICATIONS

Implement the complete mobile push notification lifecycle.

Support the actual notification architecture used by the backend, including where applicable:

* FCM
* APNs
* Expo-compatible push infrastructure

The mobile application must:

1. request notification permission
2. obtain the correct push token
3. associate the token with the authenticated device
4. register it with the backend
5. handle token rotation
6. update the backend when tokens change
7. unregister/deactivate stale tokens where required
8. handle logout correctly
9. handle multiple devices

Never assume a push token remains permanently valid.

---

# 18. NOTIFICATION PERMISSIONS

Implement platform-specific permission behavior.

Handle:

* first-time request
* permission granted
* permission denied
* provisional/limited permission where applicable
* revoked permission
* notification settings changed outside the app

The app must not repeatedly annoy users with permission prompts.

Provide a path to system settings when permission was permanently denied and the platform requires it.

---

# 19. PUSH NOTIFICATION PRIVACY

Respect notification privacy settings.

Depending on backend support, support options such as:

* show message preview
* hide message preview
* hide sender
* show generic notification
* mute conversation
* mute group
* disable notifications

Never put sensitive content into notifications when the user's privacy configuration says not to.

Avoid logging notification payloads containing private message content.

---

# 20. NOTIFICATION ROUTING

Notification taps must route correctly.

Examples:

* direct message → conversation
* group message → group conversation
* reaction → relevant message
* mention → relevant conversation/message
* call → call interface
* system notification → appropriate screen

Routing must validate authorization before displaying protected content.

A notification payload must never bypass authentication or access control.

If the user is logged out:

* do not open protected content
* route to authentication
* preserve only safe navigation intent if appropriate

---

# 21. DEEP LINKS

Implement production-grade deep linking.

Support the routes actually defined by the repository.

Examples may include:

* conversation
* message
* profile
* group
* call

Validate route parameters.

Do not trust IDs merely because they came from a deep link.

Always re-check authorization through the application/backend.

Handle:

* cold start
* warm start
* authenticated state
* unauthenticated state
* invalid route
* deleted target
* unauthorized target

Avoid duplicate navigation caused by repeated notification/deep-link events.

---

# 22. SEARCH

Implement mobile search using the actual backend search API.

Support:

* search entry point
* debounced queries
* loading
* results
* pagination
* empty results
* errors
* retry
* result selection
* navigation to conversation
* navigation to the relevant message where supported
* search state restoration where useful

Do not implement client-side searching over data the user has not already legitimately loaded.

Respect backend authorization and privacy filtering.

---

# 23. SEARCH PERFORMANCE

Search must:

* debounce requests
* cancel obsolete requests where supported
* avoid duplicate requests
* cache appropriate results
* paginate large result sets
* preserve responsive UI

Do not issue a network request for every keystroke.

Avoid keeping unlimited search history in local storage.

---

# 24. PROFILE

Implement the production profile experience according to actual backend support.

Support where available:

* avatar
* display name
* username
* about/status
* profile visibility
* account information

Media selection for avatars must use the secure media workflow.

Validate profile image size/type.

Provide loading, saving, success, and failure states.

Prevent accidental duplicate updates.

---

# 25. PRIVACY SETTINGS

Implement the mobile privacy/settings UI for capabilities actually supported by the backend.

Potential controls include:

* profile visibility
* presence visibility
* last-seen visibility
* read receipts
* typing indicators
* group invitation/privacy controls
* blocked users
* notification privacy
* media auto-download
* data usage preferences

Every privacy setting must have a server-authoritative counterpart when the behavior affects protected data.

Do not implement privacy controls only in the client when the backend must enforce them.

---

# 26. BLOCKING

Implement blocking functionality where supported.

Support:

* block user
* unblock user
* display blocked state
* prevent inappropriate interaction from the UI
* reconcile existing conversations
* update cached state
* update real-time behavior
* handle backend rejection

Blocking must not be treated as merely a UI filter.

The mobile client must respect server-authoritative access control.

---

# 27. REPORTING

Implement user/message/conversation reporting where supported.

Support:

* report action
* reason selection
* optional supported context
* confirmation
* submission state
* success
* failure
* duplicate submission prevention

Do not expose internal moderation systems.

Do not allow arbitrary sensitive data to be attached to reports.

---

# 28. GROUP ADMINISTRATION

Implement group-management screens and actions supported by the backend.

Potential functionality:

* group information
* participant list
* add participant
* remove participant
* leave group
* promote/demote administrators
* group name
* group avatar
* group description
* permissions
* invite controls
* mute settings
* disappearing-message settings

Every administrative action must respect backend authorization.

Do not rely on locally cached administrator status as the security boundary.

---

# 29. GROUP MEMBER MANAGEMENT

Member-management UI must handle concurrent changes.

For example:

* another administrator removes a member
* another administrator changes roles
* group is deleted
* current user's privileges are revoked
* invitation becomes invalid

The client must reconcile real-time events and refresh authoritative state when required.

Avoid stale administrator controls.

---

# 30. DISAPPEARING MESSAGES

If the backend supports disappearing messages, implement the mobile UI and behavior.

Support:

* conversation setting
* available durations
* current setting
* confirmation
* server update
* expiration indicators where supported
* message removal/reconciliation
* synchronization after reconnect

Do not implement client-only deletion timers.

Server-authoritative expiration must remain authoritative.

---

# 31. STORAGE AND DATA SETTINGS

Where supported, provide data/storage settings.

Potential functionality:

* media cache size
* clear cache
* clear downloaded media
* auto-download preferences
* mobile-data behavior
* Wi-Fi-only media behavior
* storage usage summary

Never delete durable server data when the user only requested local cache cleanup.

Clearly distinguish:

* local cache
* downloaded media
* server data
* account data

---

# 32. CALLING ARCHITECTURE

Implement the mobile calling foundation if calling is supported by the actual backend architecture.

Support:

* outgoing call
* incoming call
* connecting
* ringing
* connected
* reconnecting
* ended
* declined
* missed
* failed

Use the existing signaling contract.

Do not invent a new signaling protocol.

---

# 33. WEBRTC

Where WebRTC is supported by the repository, integrate the mobile client with the existing architecture.

Support:

* peer connection lifecycle
* offer/answer
* ICE candidates
* STUN/TURN configuration
* microphone
* camera
* mute
* camera enable/disable
* speaker routing where supported
* connection state
* reconnection
* call termination
* cleanup

Never expose TURN credentials or other sensitive configuration unnecessarily.

Use short-lived credentials where the backend provides them.

---

# 34. CALL PERMISSIONS

Handle:

* microphone permission
* camera permission
* permission denial
* revoked permission
* permission changes during call setup

Do not start media capture before the required permissions are granted.

Explain failures clearly.

---

# 35. CALL LIFECYCLE

Calling must have deterministic cleanup.

On:

* hang up
* remote hang up
* failure
* navigation away
* application termination
* backgrounding
* permission failure
* signaling disconnect

clean up:

* peer connections
* media tracks
* listeners
* timers
* signaling subscriptions
* audio routes
* camera resources

No call must leave microphone/camera resources active after termination.

---

# 36. NATIVE CALL INTEGRATION

If the repository's architecture supports native call integration, implement the appropriate platform integration.

Potential technologies include:

* CallKit
* Android Telecom
* CallKeep-compatible integrations

Do not add native call frameworks merely for appearance.

Verify compatibility with:

* current Expo SDK
* development builds
* iOS configuration
* Android configuration
* permissions
* background behavior

If native integration is not supported by the current architecture, implement the best supported in-app calling experience without fabricating native capabilities.

---

# 37. OFFLINE-FIRST RESILIENCE

Harden the application for unreliable mobile connectivity.

Handle:

* no network
* slow network
* intermittent network
* network switching
* Wi-Fi → cellular
* cellular → Wi-Fi
* temporary DNS failure
* server timeout
* WebSocket disconnect
* authentication expiration

The UI must distinguish:

* local state
* pending synchronization
* confirmed server state
* failed operations

Do not claim an operation succeeded when the server has not confirmed it.

---

# 38. MESSAGE AND MEDIA RECOVERY

After reconnect:

1. reconnect authentication/session
2. re-establish WebSocket
3. detect synchronization gaps
4. request authoritative synchronization
5. reconcile local state
6. reconcile pending operations
7. reconcile media uploads
8. refresh affected queries
9. restore presence/typing state as appropriate

Do not replay arbitrary stale WebSocket events as a substitute for synchronization.

---

# 39. BACKGROUND/FOREGROUND SYNCHRONIZATION

Implement correct lifecycle handling.

When returning to foreground:

* determine whether the session remains valid
* reconnect if necessary
* synchronize missed events
* refresh stale queries
* reconcile notifications
* update presence
* update unread counts

Do not blindly refetch every query.

Use targeted invalidation and synchronization.

---

# 40. LOCAL DATA SECURITY

Protect locally stored data.

Inspect all persistent storage.

Sensitive data must not be stored in insecure plain-text storage when secure storage is required.

Do not persist:

* access tokens insecurely
* refresh tokens insecurely
* passwords
* secrets
* unnecessary private message content

Use the appropriate secure storage mechanism already established by the application.

Respect logout semantics.

Clear sensitive local session state when required.

---

# 41. APP LOCK / BIOMETRICS

If the repository architecture and product requirements support app locking, implement it using the platform capabilities appropriate to the current Expo/native setup.

Support:

* enable/disable
* biometric availability
* authentication
* fallback behavior
* app background lock
* sensitive-screen protection

Do not implement a fake security boundary.

The app lock must complement, not replace, server authentication.

If this capability is not part of the existing product architecture, do not introduce it merely as a cosmetic feature.

---

# 42. ACCESSIBILITY

All new screens and interactions must support accessibility.

Implement:

* accessible labels
* accessible roles
* readable focus order
* sufficient touch targets
* screen-reader compatibility
* dynamic text sizing where appropriate
* accessible error messages
* accessible loading states
* accessible media controls

Do not rely solely on color or icons to communicate state.

---

# 43. PERFORMANCE

Optimize for real mobile devices.

Pay particular attention to:

* large conversation lists
* large message histories
* media-heavy conversations
* image decoding
* video playback
* audio playback
* search results
* group member lists
* notification routing
* WebSocket events
* Zustand updates
* TanStack Query cache updates
* navigation transitions

Avoid unnecessary re-renders.

Use memoization where it provides measurable benefit.

Use virtualization for large lists.

Do not sacrifice correctness for premature optimization.

---

# 44. MEMORY MANAGEMENT

Prevent memory leaks.

Audit:

* WebSocket listeners
* event subscriptions
* navigation listeners
* timers
* intervals
* media listeners
* audio resources
* video resources
* camera resources
* WebRTC peer connections
* push notification listeners
* AppState listeners

Every subscription must have a deterministic cleanup path.

---

# 45. STATE MANAGEMENT

Use the existing state architecture consistently.

TanStack Query should manage appropriate server state.

Zustand should manage appropriate client/application state.

Do not duplicate server state unnecessarily into global stores.

Avoid storing derived data when it can safely be derived.

Ensure query invalidation and real-time updates remain consistent.

---

# 46. ERROR HANDLING

Every new feature must have explicit handling for:

* validation errors
* authentication errors
* authorization errors
* network failures
* timeouts
* rate limits
* server errors
* media failures
* permission failures
* provider failures
* synchronization conflicts
* stale data
* resource deletion

Map backend errors into useful user-facing states without exposing internal details.

Do not swallow errors silently.

---

# 47. OBSERVABILITY

Instrument important mobile operations using the repository's existing observability architecture.

Track appropriate events/metrics for:

* API failures
* WebSocket disconnects
* synchronization failures
* message send failures
* media upload failures
* notification registration failures
* deep-link failures
* search failures
* call setup failures
* WebRTC failures
* crashes or fatal errors where the project supports crash reporting
* performance bottlenecks

Never log:

* passwords
* tokens
* credentials
* private keys
* signed URLs
* unnecessary private message content
* sensitive media contents

Use correlation/request identifiers where the backend provides them.

---

# 48. SECURITY AUDIT

Review every new feature for:

* broken authorization assumptions
* IDOR
* malicious deep links
* malicious notification payloads
* insecure local storage
* token leakage
* signed URL leakage
* malicious files
* oversized files
* MIME spoofing
* path traversal
* unsafe document handling
* WebRTC credential leakage
* unauthorized group administration
* blocked-user bypass
* privacy-setting bypass
* replayed operations
* duplicate operations
* stale cached authorization

The client must never be treated as the security authority.

---

# 49. TESTING REQUIREMENTS

Implement comprehensive tests.

At minimum include:

## Unit tests

Test:

* media state machines
* upload manager
* retry classification
* notification routing
* deep-link parsing
* permission state handling
* search state
* settings state
* call state transitions
* cleanup behavior

## Integration tests

Test:

* media selection → upload → message
* upload failure → retry
* upload cancellation
* notification registration
* token rotation
* notification → conversation navigation
* deep link → authenticated route
* deep link → unauthenticated route
* search → message navigation
* group administration
* block/unblock
* privacy settings
* reconnect synchronization
* call signaling
* call cleanup

## E2E tests

Where the existing E2E framework supports them, test critical flows on appropriate mobile targets.

At minimum:

* login
* open conversation
* send text
* receive text
* send image
* send document
* receive media
* notification tap
* search
* group administration
* logout
* reconnect
* call setup where supported

---

# 50. FAILURE TESTING

Explicitly test:

* airplane mode
* intermittent connectivity
* WebSocket disconnect
* expired session
* expired media URL
* failed upload
* failed processing
* notification permission denial
* camera permission denial
* microphone permission denial
* invalid deep link
* unauthorized conversation
* deleted conversation
* removed group member
* revoked administrator role
* call signaling failure
* WebRTC failure
* app backgrounding during upload
* app backgrounding during call
* process restart during pending operations

---

# 51. TYPESCRIPT QUALITY

Maintain strict TypeScript correctness.

Do not use:

* `any` as a shortcut
* unsafe casts without justification
* duplicated API models
* inconsistent IDs
* implicit nullable assumptions

Prefer shared/generated contracts if the repository already uses them.

Every new public type should have a clear purpose.

---

# 52. NAVIGATION QUALITY

Review the navigation tree after adding new screens.

Ensure:

* routes are strongly typed
* nested navigation remains type-safe
* notification navigation does not duplicate screens
* deep links resolve correctly
* back behavior is correct
* modal screens behave correctly
* authentication guards remain correct
* protected routes cannot be opened without authorization

---

# 53. UI/UX REQUIREMENTS

All new screens must be production-quality.

Provide:

* loading states
* empty states
* error states
* retry actions
* disabled states
* optimistic states only where safe
* success feedback
* confirmation for destructive operations
* consistent typography
* consistent spacing
* consistent components
* safe-area handling
* keyboard handling
* platform-specific behavior where appropriate

Do not create isolated visual systems.

Use the existing design system.

---

# 54. PRODUCTION CONFIGURATION

Review:

* app.json/app.config
* Expo configuration
* iOS configuration
* Android configuration
* permissions
* notification configuration
* deep-link configuration
* universal links/app links where supported
* build profiles
* environment variables
* development builds
* production builds

Do not hardcode production credentials.

Ensure environment-specific configuration is safe.

---

# 55. OTA AND RELEASE READINESS

Review compatibility with the repository's release strategy.

If Expo Updates/EAS or another OTA mechanism is already used:

* ensure changes are compatible with native/runtime versions
* do not ship JavaScript that requires unavailable native modules
* respect runtime version boundaries
* document native-build requirements when needed

Do not introduce an OTA strategy if the repository does not use one.

---

# 56. DATA MIGRATION AND BACKWARD COMPATIBILITY

If new persistent local state is introduced:

* define its schema/version
* implement migration
* handle corrupted state
* handle missing fields
* handle older application versions where appropriate

Do not crash because an old persisted state object is missing newly introduced properties.

---

# 57. IMPLEMENTATION QUALITY

Do not stop after creating UI.

Every feature must include the complete necessary chain:

```text
UI
→ State
→ API/WebSocket
→ Backend contract
→ Persistence/cache
→ Error handling
→ Loading state
→ Recovery
→ Tests
```

Where media is involved:

```text
Picker/Camera
→ Validation
→ Preparation
→ Upload authorization
→ Upload
→ Processing
→ Message
→ Synchronization
→ Rendering
```

Where notifications are involved:

```text
Permission
→ Token
→ Registration
→ Token rotation
→ Backend association
→ Notification
→ Tap
→ Authorization
→ Navigation
```

Where calling is involved:

```text
Call request
→ Signaling
→ Permission
→ WebRTC
→ Connection
→ Media
→ Reconnect
→ Termination
→ Cleanup
```

---

# 58. DO NOT FAKE FEATURES

Never create:

* fake upload progress
* fake push notifications
* fake search results
* fake WebRTC calls
* mock production APIs
* simulated backend responses
* placeholder media URLs
* hardcoded notification tokens
* hardcoded users
* fake permissions
* fake authorization
* fake call states presented as real functionality

If an external integration is unavailable in the current environment, implement the real integration boundary and handle unavailable configuration correctly rather than pretending it works.

---

# 59. REQUIRED REPOSITORY INSPECTION

Before implementation, inspect at minimum:

* package.json
* Expo configuration
* app entry points
* navigation
* authentication
* API client
* WebSocket client
* synchronization
* message components
* conversation components
* state stores
* query configuration
* local persistence
* environment configuration
* existing media code
* existing notification code
* existing deep-link code
* existing search code
* existing group code
* existing calling code
* tests

Use the repository's actual architecture.

---

# 60. IMPLEMENTATION ORDER

Implement in a dependency-safe order:

### Phase 1 — Existing Architecture Audit

Understand and document internally:

* existing contracts
* existing abstractions
* missing functionality
* integration points
* risks

Do not create a competing architecture.

### Phase 2 — Media Infrastructure

Implement:

* media selection
* camera/gallery/file integration
* validation
* media preparation
* upload manager
* progress
* cancellation
* retry
* processing states
* secure media access
* media caching

### Phase 3 — Media UI

Implement:

* attachment composer
* previews
* media message rendering
* playback
* download/open
* upload states
* retry states
* failed states

### Phase 4 — Notifications

Implement:

* permissions
* token registration
* token rotation
* notification handling
* notification privacy
* local notification behavior
* notification routing

### Phase 5 — Deep Linking

Implement:

* route parsing
* authentication-aware navigation
* authorization validation
* cold/warm start handling
* duplicate-event prevention

### Phase 6 — Search

Implement:

* search UI
* query state
* debounce
* pagination
* result navigation
* error/retry behavior

### Phase 7 — Settings and Privacy

Implement:

* profile
* privacy
* notification preferences
* media/data preferences
* blocked users
* reporting

### Phase 8 — Group Administration

Implement:

* member management
* roles
* group settings
* permissions
* participant changes
* group avatar/details

### Phase 9 — Disappearing Messages

Implement the feature only if supported by the actual backend.

### Phase 10 — Calling

Implement the actual supported calling architecture:

* signaling
* permissions
* WebRTC
* call state
* media controls
* cleanup
* native integration where supported

### Phase 11 — Offline/Background Hardening

Implement:

* reconnect
* synchronization
* pending-operation recovery
* lifecycle handling
* background/foreground reconciliation

### Phase 12 — Production Hardening

Complete:

* accessibility
* performance
* security review
* observability
* tests
* configuration
* release validation

---

# 61. VALIDATION

Before considering the implementation complete:

1. run TypeScript checks
2. run linting
3. run formatting validation
4. run unit tests
5. run integration tests
6. run available E2E tests
7. validate Expo configuration
8. validate iOS configuration where available
9. validate Android configuration where available
10. inspect navigation
11. inspect state persistence
12. inspect media lifecycle cleanup
13. inspect notification lifecycle
14. inspect deep-link behavior
15. inspect WebSocket cleanup
16. inspect WebRTC cleanup
17. inspect offline recovery
18. inspect security-sensitive storage
19. inspect environment configuration
20. verify no secrets were introduced
21. verify no placeholders remain
22. verify no fake integrations were introduced

Fix implementation errors instead of merely reporting them.

---

# 62. FINAL CODE QUALITY REQUIREMENTS

The final repository must contain:

* production-quality implementation
* strongly typed code
* maintainable architecture
* reusable components
* centralized infrastructure where appropriate
* consistent error handling
* secure storage
* correct lifecycle management
* robust offline behavior
* reliable synchronization
* complete media lifecycle
* complete notification lifecycle
* correct navigation
* correct permission handling
* calling integration where supported
* comprehensive tests
* no TODO placeholders
* no fake implementations
* no unnecessary duplicate abstractions
* no hardcoded production secrets
* no unrelated rewrites

Do not claim that something works unless the repository actually implements and validates it.

At the end, report:

* files created
* files modified
* major functionality implemented
* dependencies added, if any
* configuration changes
* tests added
* validation commands executed
* validation results
* known limitations caused by actual external/environment constraints

The implementation itself is the primary deliverable.

Do not stop at an architectural explanation.
Do not provide pseudo-code instead of implementation.
Do not ask the user to manually implement missing pieces that are within the repository's scope.

Begin by inspecting the repository and then implement the complete production-ready mobile functionality described abov

You are operating in Senior Engineering Team Mode.

Complete the remaining production-ready mobile application for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The mobile application must consume the established backend API, WebSocket, authentication, authorization, synchronization, notification, media, and calling contracts.

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

Complete the production-ready React Native applications for:

• Android
• iOS

Complete the advanced mobile functionality for:

• Advanced messaging
• Message synchronization
• Multi-device synchronization
• Groups
• Communities
• Media
• Voice messages
• Stories/status
• Push notifications
• Voice calls
• Video calls
• Group calls
• Contact discovery
• Privacy
• Security
• Device management
• Background tasks
• Deep linking
• Business accounts
• Administration where applicable
• Accessibility
• Performance
• Battery optimization
• Offline reliability
• Production hardening

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

Local Persistence:

• SQLite or approved local database

Notifications:

• Firebase Cloud Messaging
• Apple Push Notification Service

Background:

• Expo-compatible background tasks
• Native platform capabilities where required

Calls:

• WebRTC-compatible React Native implementation

────────────────────────────────────────

ADVANCED MESSAGE EXPERIENCE

Complete the messaging experience.

Support:

• Replies
• Forwarding
• Mentions
• Reactions
• Editing
• Deletion
• Multi-select
• Copy
• Share
• Retry
• Message information
• Delivery information
• Read information
• Context menus
• Long-press actions
• Message search
• Jump to message
• Unread separators
• Date separators

Optimize long message histories using virtualization.

────────────────────────────────────────

MESSAGE RECONCILIATION

Implement robust reconciliation between:

• Local database
• Pending queue
• WebSocket events
• REST synchronization
• Server acknowledgements

Support:

• Temporary local IDs
• Server ID replacement
• Duplicate detection
• Ordering correction
• Failed operations
• Retried operations
• Deleted messages
• Edited messages
• Delivery state reconciliation
• Read-state reconciliation

The local UI must eventually converge with authoritative backend state.

────────────────────────────────────────

ADVANCED OFFLINE SYNCHRONIZATION

Complete offline synchronization.

Support:

• Offline composition
• Offline conversation viewing
• Pending operations
• Batched synchronization
• Delta synchronization
• Cursor recovery
• Missed events
• Retry
• Conflict resolution
• Duplicate prevention
• Long-disconnection recovery

Define behavior for:

• Application termination while offline
• Device restart
• Network switching
• Partial synchronization
• Failed synchronization
• Invalid cursors

Never silently discard user-created messages.

────────────────────────────────────────

MULTI-DEVICE SYNCHRONIZATION

Complete synchronization across:

• Multiple phones
• Web sessions
• Desktop sessions

Synchronize:

• Conversations
• Messages
• Message edits
• Message deletions
• Reactions
• Delivery states
• Read states
• Conversation settings
• Device/session state

Respect the established E2EE architecture.

Do not expose encryption keys through insecure application state.

────────────────────────────────────────

GROUP EXPERIENCE

Complete:

• Group creation
• Group editing
• Member management
• Roles
• Permissions
• Invitations
• Group settings
• Group notifications
• Group media
• Group information
• Group search
• Leave group
• Administrative actions

Support large groups without loading entire membership lists unnecessarily.

Use pagination and incremental loading.

────────────────────────────────────────

COMMUNITY EXPERIENCE

Implement:

• Community discovery
• Community details
• Community membership
• Community groups
• Community channels where applicable
• Announcements
• Community notifications
• Community administration
• Community settings

Provide clear navigation among:

• Direct conversations
• Groups
• Communities
• Channels

────────────────────────────────────────

CONTACT DISCOVERY

Complete:

• Contact synchronization
• Contact discovery
• Search
• Invitations
• Block
• Unblock
• Privacy-aware matching

Respect backend privacy controls.

Do not expose information that the backend does not authorize.

────────────────────────────────────────

MEDIA EXPERIENCE

Complete mobile media workflows for:

• Images
• Videos
• Audio
• Voice messages
• Documents
• Stickers
• GIFs

Support:

• Camera
• Camera switching
• Photo library
• File selection
• Preview
• Compression
• Upload progress
• Upload cancellation
• Upload retry
• Download progress
• Local caching
• Media viewer

Use backend-issued authorization for private media.

────────────────────────────────────────

MEDIA CACHING

Implement an appropriate local media cache.

Support:

• Cache size management
• Expiration
• Disk-space awareness
• Cache invalidation
• Offline viewing of permitted cached assets
• Cleanup

Do not cache sensitive content indefinitely.

Do not treat local cache as the source of truth.

────────────────────────────────────────

VOICE MESSAGE EXPERIENCE

Complete:

• Recording
• Pause/resume where supported
• Cancel
• Playback
• Playback progress
• Speed controls where appropriate
• Upload
• Retry
• Download
• Local caching

Handle:

• Microphone permissions
• Audio interruptions
• Headphone/Bluetooth changes
• Background transitions
• Incoming calls

────────────────────────────────────────

STORIES / STATUS

Complete:

• Stories tray
• Story viewer
• Story navigation
• Story creation
• Text stories
• Image stories
• Video stories
• Viewer list
• Reactions
• Story privacy
• Story deletion
• Expiration

Support smooth media playback and efficient caching.

────────────────────────────────────────

PUSH NOTIFICATIONS

Complete push notification handling.

Support:

• FCM
• APNS
• Token registration
• Token refresh
• Permission handling
• Foreground notifications
• Background notifications
• Terminated-app notifications
• Notification actions
• Badge counts
• Deep-link navigation

Support privacy-preserving notification content.

Do not expose plaintext E2EE message content unnecessarily.

────────────────────────────────────────

NOTIFICATION ROUTING

Handle notifications for:

• New messages
• Missed calls
• Group activity
• Community activity
• Security events
• Account events
• Business events
• System notifications

Support multiple registered devices.

Avoid duplicate notifications when device state allows deduplication.

────────────────────────────────────────

BACKGROUND PROCESSING

Implement mobile-compatible background workflows for:

• Synchronization
• Push notification processing
• Upload completion
• Download continuation where permitted
• Cleanup
• State refresh

Respect platform limitations.

Do not assume unlimited background execution.

Avoid battery-intensive continuous processing.

────────────────────────────────────────

DEEP LINKING

Complete deep linking for:

• Conversations
• Users
• Groups
• Communities
• Stories
• Calls
• Notifications
• Authentication
• Device activation

Validate authorization after navigation.

Do not trust data encoded in the deep link.

────────────────────────────────────────

VOICE AND VIDEO CALL EXPERIENCE

Complete the mobile calling experience.

Support:

• Incoming calls
• Outgoing calls
• Ringing
• Connecting
• Active calls
• Reconnecting
• Failed calls
• Ended calls
• Missed calls

Voice calls:

• Microphone
• Speaker
• Bluetooth/audio-route handling where supported
• Mute
• Hold/state transitions where appropriate

Video calls:

• Camera
• Front/back camera
• Camera preview
• Remote video
• Participant layout
• Video enable/disable
• Reconnection

────────────────────────────────────────

GROUP CALL EXPERIENCE

Support:

• Participant list
• Participant states
• Participant grid
• Active speaker
• Join/leave events
• Mute state
• Video state
• Connection state
• End-call behavior

Optimize rendering for larger participant counts.

────────────────────────────────────────

WEBRTC INTEGRATION

Integrate with the approved WebRTC signaling architecture.

Support:

• Offer
• Answer
• ICE candidates
• Connection state
• ICE restart where appropriate
• Reconnection
• Media permissions
• Track lifecycle
• Network changes

Do not create a separate signaling system in the mobile application.

────────────────────────────────────────

CALL QUALITY

Display appropriate state for:

• Poor network
• High latency
• Packet-loss-related degradation where available
• Reconnecting
• Microphone failure
• Camera failure
• Permission denial
• Bluetooth/audio-route changes
• Call failure

Do not expose unnecessary technical diagnostics to ordinary users.

────────────────────────────────────────

DEVICE MANAGEMENT

Complete:

• Device list
• Device details
• Device naming
• Device activity
• Remote logout
• Device revocation
• Security alerts

Support device synchronization with backend state.

────────────────────────────────────────

PRIVACY AND SECURITY

Complete mobile interfaces for:

• Privacy settings
• Last seen
• Online state
• Profile visibility
• Read receipts
• Group invitations
• Contact discovery
• Story privacy
• Blocking
• Notification privacy

Security settings:

• Password change
• MFA
• Passkeys where supported
• Active sessions
• Devices
• Account recovery
• Security notifications

Use secure confirmation flows for sensitive operations.

────────────────────────────────────────

MOBILE SECURITY HARDENING

Implement where appropriate:

• Secure token storage
• Secure local database strategy
• Sensitive-screen protections
• Secure deep links
• Secure clipboard behavior where appropriate
• Screenshot protection where appropriate
• Root/jailbreak risk signals where appropriate
• Network security configuration
• Sensitive logging prevention

Do not implement custom cryptography.

────────────────────────────────────────

BUSINESS ACCOUNT EXPERIENCE

Implement mobile support for:

• Business profiles
• Business information
• Business hours
• Business users
• Business roles
• Business permissions
• Business conversations
• Business catalog foundations
• Automated responses where supported

Respect backend authorization.

────────────────────────────────────────

ACCESSIBILITY

Complete accessibility support for:

• VoiceOver
• TalkBack
• Dynamic type/font scaling
• Screen readers
• Accessible labels
• Accessible actions
• Focus behavior
• Sufficient contrast
• Reduced motion
• Large touch targets

Ensure message state is not conveyed through color alone.

────────────────────────────────────────

LOCALIZATION

Implement support for:

• Multiple languages
• Locale detection
• Locale persistence
• Date formatting
• Time formatting
• Number formatting
• Relative timestamps
• RTL layouts
• Localized notifications

Do not hard-code user-facing strings throughout feature modules.

────────────────────────────────────────

PERFORMANCE

Optimize:

• Message list rendering
• Conversation list rendering
• Image loading
• Video loading
• Local database queries
• Synchronization batches
• WebSocket event handling
• Navigation
• Startup
• Memory usage
• Call rendering

Avoid unnecessary React renders.

────────────────────────────────────────

BATTERY OPTIMIZATION

Optimize:

• WebSocket behavior
• Background synchronization
• Push notifications
• Media downloads
• Media uploads
• Presence updates
• Retry loops
• Local database writes

Prefer event-driven updates over polling.

Avoid continuous background work.

────────────────────────────────────────

DATA USAGE

Support efficient behavior for cellular connections.

Consider:

• Media quality selection
• Auto-download preferences
• Background download preferences
• Upload compression
• Cache policies
• Retry bandwidth
• Synchronization batch sizes

Provide user-configurable media/data preferences where appropriate.

────────────────────────────────────────

ERROR HANDLING

Provide recovery UI for:

• Authentication failures
• Network failures
• Synchronization failures
• Database/local-storage failures
• Upload failures
• Download failures
• Push-notification failures
• WebSocket failures
• WebRTC failures
• Permission failures

Do not silently lose user-created content.

────────────────────────────────────────

TESTING

UNIT TESTS

Test:

• Synchronization
• Offline queues
• Message reconciliation
• State transitions
• Validation
• Device handling
• Notification routing

COMPONENT TESTS

Test:

• Messaging
• Groups
• Communities
• Stories
• Notifications
• Calls
• Settings
• Device management

INTEGRATION TESTS

Test:

• API client
• WebSocket client
• Local database
• Synchronization
• Push notifications
• Media processing flows

END-TO-END TESTS

Test:

• Registration
• Login
• Device registration
• Offline messaging
• Synchronization
• Multi-device
• Groups
• Communities
• Media
• Stories
• Notifications
• Voice calls
• Video calls
• Group calls

PERFORMANCE TESTS

Test:

• Large conversations
• Large message lists
• High event rates
• Media operations
• Synchronization
• Startup time
• Memory usage

SECURITY TESTS

Test:

• Secure storage
• Authentication
• Authorization
• Deep links
• Device revocation
• Privacy controls
• Unauthorized resource access

────────────────────────────────────────

DOCUMENTATION

Generate:

• Mobile architecture documentation
• Synchronization documentation
• Offline strategy
• Push notification documentation
• Background-task documentation
• WebRTC integration documentation
• Deep-link documentation
• Secure-storage documentation
• Media documentation
• Accessibility standards
• Localization standards
• Performance standards
• Testing standards

────────────────────────────────────────

PROJECT INDEX

Maintain the mobile Project Index.

Track:

• Screens
• Navigation
• Features
• Components
• Stores
• Queries
• API integrations
• WebSocket integrations
• Local database models
• Synchronization modules
• Push notifications
• Background tasks
• Media modules
• Call modules
• Business modules
• Tests
• Generated files
• Modified files
• Dependencies
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

MOBILE MILESTONE 1

Advanced messaging, offline reconciliation, synchronization, and multi-device support.

MOBILE MILESTONE 2

Groups, communities, contact discovery, and privacy.

MOBILE MILESTONE 3

Media, voice messages, stories, and media caching.

MOBILE MILESTONE 4

Push notifications, background tasks, and deep linking.

MOBILE MILESTONE 5

Voice calls, video calls, group calls, and WebRTC.

MOBILE MILESTONE 6

Business accounts, advanced privacy, device security, and account security.

MOBILE MILESTONE 7

Accessibility, localization, performance, battery, and data optimization.

MOBILE MILESTONE 8

Integration testing, E2E testing, resilience testing, security hardening, and production readiness.

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

This volume completes the advanced mobile implementation.

Do not implement:

• Backend code
• Web frontend code
• Kubernetes
• Terraform
• CI/CD infrastructure

Consume the established backend contracts exactly.

Do not redesign the backend architecture.

────────────────────────────────────────

QUALITY BAR

Treat the mobile applications as globally deployed production communication clients.

Assume:

• Large message histories
• Unreliable networks
• Multiple devices
• Background execution limits
• Large media volumes
• High notification traffic
• High call concurrency
• Android and iOS platform differences
• Strict privacy requirements
• Strict security requirements

Prioritize:

• Reliability
• Synchronization correctness
• Offline correctness
• Performance
• Battery efficiency
• Security
• Accessibility
• Maintainability
• Excellent UX
• Production readiness
