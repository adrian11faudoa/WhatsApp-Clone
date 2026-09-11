# WHATSAPP — MOBILE VOLUME 4

## ROLE

Act as a senior production engineering team responsible for completing the mobile application's final production-hardening layer for a globally scaled real-time communication platform.

Operate as:

* Staff Mobile Engineer
* Senior React Native Engineer
* Senior TypeScript Engineer
* Mobile Architecture Engineer
* Distributed Systems Engineer
* Offline Systems Engineer
* Mobile Security Engineer
* Privacy Engineer
* Performance Engineer
* Reliability Engineer
* QA Engineer
* Accessibility Engineer
* Release Engineer

Implement production-grade software directly in the repository.

Do not teach.

Do not provide pseudo-code.

Do not create placeholders, TODO/FIXME gaps, fake production integrations, incomplete handlers, or omitted implementations.

Every implementation must be fully integrated, typed, testable, observable, secure, resilient, and deployable.

# PROJECT

Build and harden the mobile application for a globally scaled real-time communication platform comparable in capability to WhatsApp, Telegram, Signal, Messenger, Discord, and Teams.

The mobile platform must support:

* individual messaging
* group messaging
* real-time communication
* multi-device synchronization
* offline operation
* message delivery/read states
* replies
* editing
* deletion
* reactions
* forwarding
* pinned messages
* saved messages
* media
* documents
* voice messages
* stickers
* GIFs
* link previews
* push notifications
* presence
* typing indicators
* search
* privacy
* blocking
* reporting
* disappearing messages
* account management
* device management
* security controls
* large-scale mobile usage

This volume focuses on final mobile integration, reliability, resilience, performance, platform behavior, release readiness, and production hardening.

# TECHNOLOGY DIRECTION

Use the repository's established mobile stack.

Expected technologies include:

* React Native
* Expo
* TypeScript
* React Navigation
* TanStack Query
* Zustand
* Socket.IO or the established real-time transport
* APNs
* FCM
* Secure platform storage
* Mobile persistence
* Platform-native capabilities through Expo or existing native modules

Follow the repository's actual dependency versions and configuration.

Do not introduce replacements merely for stylistic preference.

# SOURCE OF TRUTH

The repository is the source of truth.

Before implementation:

1. Inspect the complete mobile application.
2. Inspect navigation.
3. Inspect authentication.
4. Inspect conversation and messaging flows.
5. Inspect real-time synchronization.
6. Inspect offline persistence.
7. Inspect media handling.
8. Inspect notifications.
9. Inspect settings and privacy.
10. Inspect search.
11. Inspect device/session management.
12. Inspect analytics and observability.
13. Inspect tests.
14. Inspect Expo configuration.
15. Inspect native platform configuration.
16. Inspect build scripts.
17. Inspect environment configuration.
18. Identify current production risks.
19. Preserve compatible behavior.
20. Implement only this volume's scope.

Never assume that a previous implementation is correct merely because it exists.

Verify actual behavior in the repository.

# 1. MOBILE SYSTEM AUDIT

Perform a systematic audit of the mobile implementation.

Inspect:

* architecture
* dependency graph
* state ownership
* navigation
* network layer
* WebSocket layer
* synchronization
* persistence
* media
* notifications
* authentication
* security
* observability
* testing
* performance

Identify concrete defects that prevent production readiness.

Do not perform unrelated refactoring.

Fix defects that are directly relevant to this volume.

# 2. STATE OWNERSHIP HARDENING

Ensure every important entity has a clear state owner.

Review:

* user
* profile
* conversation
* membership
* message
* reaction
* presence
* typing
* notification
* device
* session
* media
* search result
* synchronization state

Prevent conflicting copies of authoritative state.

Ensure server-authoritative data can reconcile correctly with:

* optimistic state
* local persistence
* TanStack Query
* Zustand
* WebSocket events
* push notifications

# 3. REAL-TIME CONNECTION MANAGER

Harden the mobile real-time connection manager.

Support:

* authentication
* connection
* disconnection
* reconnect
* backoff
* network changes
* app lifecycle
* heartbeat
* stale connection detection
* subscription restoration
* synchronization after reconnect

Prevent:

* duplicate connections
* reconnect storms
* event listener leaks
* duplicate subscriptions
* stale handlers
* memory leaks

Use deterministic lifecycle management.

# 4. RECONNECT STRATEGY

Implement production-grade reconnect behavior.

Use controlled backoff.

Respect:

* offline state
* operating-system lifecycle
* authentication state
* server errors
* rate limits
* network transitions

Do not continuously reconnect while the device is offline.

After successful reconnect:

1. validate authentication
2. restore required subscriptions
3. determine synchronization state
4. retrieve missing events
5. reconcile local state
6. process pending operations
7. restore normal real-time behavior

# 5. EVENT DEDUPLICATION

Harden real-time event deduplication.

Events must be safely handled when:

* delivered twice
* received after REST data
* received before REST data
* delayed
* reordered where ordering is not guaranteed
* replayed after reconnect

Use stable identifiers and sequence/cursor information defined by the actual repository contracts.

Do not deduplicate solely by timestamps.

# 6. SYNCHRONIZATION RECOVERY

Harden synchronization.

Handle:

* expired cursors
* invalid cursors
* missing event ranges
* partial synchronization
* interrupted synchronization
* duplicate synchronization
* authentication changes
* device changes
* large event batches

Synchronization must be resumable and idempotent.

Do not silently discard synchronization failures.

# 7. OFFLINE DATABASE HARDENING

Review mobile local persistence.

Ensure:

* writes are atomic where necessary
* migrations are safe
* corruption is handled
* schema versions are tracked
* cleanup is controlled
* sensitive data is protected
* indexes are appropriate
* large datasets do not cause excessive startup time

Implement safe migration behavior.

Do not destroy local user data merely because a migration fails.

Provide an appropriate recovery strategy.

# 8. LOCAL QUEUE HARDENING

Harden all persisted pending operations.

Each operation must have sufficient information for:

* identity
* idempotency
* ordering
* retry state
* failure state
* destination
* operation type

Implement:

* bounded retries
* exponential backoff
* permanent failure state
* user-visible recovery
* duplicate protection
* queue cleanup

Prevent infinite retries.

# 9. CONFLICT RESOLUTION

Implement deterministic conflict handling for client/server divergence.

Cover:

* message edits
* deletions
* reactions
* conversation changes
* membership changes
* profile updates
* privacy settings
* device/session state

The client must not overwrite authoritative server changes with stale local state.

# 10. MESSAGE ORDERING

Audit message ordering across:

* local creation
* REST history
* WebSocket events
* synchronization
* retries
* multi-device events

Ensure:

* stable ordering
* deterministic reconciliation
* no duplicate visible messages
* no permanent temporary identifiers
* no message jumps caused by reconciliation

Respect server-provided ordering information.

# 11. LARGE CONVERSATION PERFORMANCE

Optimize conversations containing:

* thousands of messages
* large media histories
* frequent real-time activity
* large groups

Review:

* list virtualization
* item measurement
* memoization
* image loading
* state subscriptions
* database queries
* pagination
* scroll calculations

Do not trade correctness for superficial rendering improvements.

# 12. LARGE GROUP PERFORMANCE

Harden group conversation behavior.

Optimize:

* participant metadata
* message rendering
* reaction updates
* typing indicators
* presence
* membership updates
* unread calculations

Avoid rerendering every visible message when a single participant changes state.

# 13. BACKGROUND BEHAVIOR

Review behavior when the application enters the background.

Ensure:

* real-time transport is handled according to platform rules
* push notifications remain functional
* synchronization resumes correctly
* pending operations recover
* sensitive UI state is handled appropriately
* resources are released where necessary

Do not assume arbitrary background execution.

# 14. APP RESUME

On application resume:

* validate session
* check connectivity
* restore subscriptions
* synchronize missed events
* reconcile local state
* update notifications
* process pending operations
* refresh stale security-sensitive information

Avoid refreshing the entire application unnecessarily.

# 15. COLD START

Optimize and harden cold-start behavior.

The app must:

* initialize safely
* restore secure credentials
* load essential configuration
* restore navigation
* initialize persistence
* avoid blocking the UI unnecessarily
* recover pending synchronization
* handle corrupt or stale local state

Prioritize time-to-interactive.

Do not perform expensive noncritical work before the initial interface becomes usable.

# 16. WARM START

Ensure warm starts do not:

* duplicate listeners
* duplicate network requests
* duplicate subscriptions
* reset navigation unexpectedly
* duplicate queued operations
* reset message state incorrectly

Lifecycle initialization must be idempotent.

# 17. PUSH AND REAL-TIME RECONCILIATION

Harden the relationship between:

* push notifications
* real-time events
* REST responses
* local persistence

A notification may arrive:

* before a WebSocket event
* after a WebSocket event
* while offline
* after the message was already read
* for a deleted message

Ensure notification handling never creates duplicate messages.

# 18. NOTIFICATION DEEP-LINK RECOVERY

Handle notification navigation when:

* app is terminated
* app is backgrounded
* app is foregrounded
* authentication is expired
* conversation is unavailable
* message was deleted
* user was removed from a group
* content is blocked

Queue safe navigation until authentication and required data are ready.

# 19. PLATFORM-SPECIFIC BEHAVIOR

Review iOS and Android differences.

Handle platform differences for:

* notification permissions
* background execution
* keyboard
* safe areas
* navigation
* media permissions
* file access
* audio
* vibration
* screen behavior
* system theme
* app lifecycle

Do not hide platform-specific behavior behind misleading abstractions.

# 20. PERMISSIONS

Audit all mobile permissions.

Permissions must be:

* requested only when needed
* explained through appropriate UX
* handled when denied
* rechecked after returning from system settings
* gracefully degraded when unavailable

Review:

* notifications
* camera
* microphone
* photos/media
* files
* audio
* any other permission actually used by the application

Never request permissions unrelated to functionality.

# 21. MEDIA PIPELINE RESILIENCE

Harden mobile media operations.

Handle:

* large files
* interrupted uploads
* interrupted downloads
* low storage
* revoked access
* expired signed URLs
* media processing delays
* invalid metadata
* unsupported formats
* network changes

Provide clear retry behavior.

Do not retain failed temporary files indefinitely.

# 22. UPLOAD RESUME AND RETRY

Where supported by the backend contract, implement resumable or restart-safe media uploads.

Ensure:

* stable upload identity
* idempotent retry
* progress restoration
* cancellation
* failure recovery
* cleanup

If the backend does not support resumable uploads, implement the safest restart behavior compatible with the existing contract rather than inventing a new protocol.

# 23. MEDIA CACHE

Implement controlled media caching.

Define:

* cache limits
* eviction behavior
* temporary file cleanup
* failed-download cleanup
* disk-space handling

Never allow unbounded media cache growth.

Do not delete media that the application treats as user-owned local downloads without explicit user action.

# 24. SECURITY HARDENING

Perform a mobile security review covering:

* authentication
* tokens
* secure storage
* local persistence
* network traffic
* deep links
* notifications
* logs
* analytics
* media files
* temporary files
* debug configuration
* environment variables
* build configuration

Remove any accidental secret exposure.

Do not embed server credentials or private keys.

# 25. NETWORK SECURITY

Verify:

* HTTPS usage
* secure WebSocket transport
* certificate validation
* secure API configuration
* environment separation

Do not weaken TLS validation for development convenience in production configurations.

Do not introduce insecure fallback endpoints.

# 26. LOGGING SECURITY

Audit all mobile logs.

Remove or redact:

* authentication tokens
* refresh tokens
* passwords
* message bodies
* private media URLs
* sensitive profile information
* security credentials
* private identifiers when unnecessary

Development diagnostics must not accidentally become production data leakage.

# 27. BUILD CONFIGURATION SECURITY

Review:

* Expo configuration
* native configuration
* environment variables
* build profiles
* application identifiers
* bundle identifiers
* Android configuration
* iOS configuration
* permissions
* signing-related configuration

Ensure secrets are not committed to source control.

Do not expose private configuration through client-accessible environment variables.

# 28. APP VERSIONING

Implement or verify application version handling.

Ensure the app can safely identify:

* application version
* build number
* platform
* environment

Use this information for:

* diagnostics
* telemetry
* support
* compatibility decisions

Do not hardcode environment-specific production behavior into application logic.

# 29. FEATURE COMPATIBILITY

Harden behavior when backend capabilities differ from client capabilities.

Handle:

* unsupported features
* older server responses
* new event types
* unknown fields
* unavailable media
* unsupported message types

The mobile client must ignore unknown noncritical data safely.

Do not crash when the server introduces an additive event or field.

# 30. DATA MIGRATION

Review all local schema/data migrations.

Ensure migrations are:

* versioned
* deterministic
* tested
* recoverable
* compatible with existing installations

Test upgrades from representative older local states where practical.

Never assume every user starts from an empty database.

# 31. ERROR BOUNDARIES

Introduce appropriate error boundaries around high-risk UI areas.

Prevent failures in:

* media viewer
* message renderer
* search
* settings
* notification routing

from crashing the entire application.

Provide recoverable fallback UI.

Do not hide errors silently.

# 32. CRASH PREVENTION

Audit for:

* null/undefined assumptions
* invalid navigation parameters
* malformed server payloads
* stale entity references
* missing media
* race conditions
* asynchronous state updates after unmount
* invalid native-module states

Add defensive handling where appropriate.

Do not mask programming errors with broad empty catches.

# 33. MEMORY LEAK AUDIT

Review:

* event listeners
* timers
* intervals
* subscriptions
* navigation listeners
* WebSocket handlers
* media playback
* audio recording
* upload callbacks
* database listeners

Ensure all resources have deterministic cleanup.

# 34. BATTERY OPTIMIZATION

Audit:

* timers
* polling
* reconnect loops
* location-independent background tasks
* media prefetch
* notification processing
* synchronization

Do not perform unnecessary periodic work.

Prefer event-driven mechanisms.

# 35. NETWORK EFFICIENCY

Reduce unnecessary network traffic through:

* caching
* request deduplication
* pagination
* selective invalidation
* event-driven updates
* controlled retries
* conditional refresh

Do not aggressively refetch every screen when the application resumes.

# 36. ACCESSIBILITY AUDIT

Perform a full accessibility review of:

* authentication
* conversation list
* conversation screen
* composer
* message actions
* reactions
* settings
* search
* media viewer
* notification navigation
* dialogs
* destructive actions

Verify:

* labels
* roles
* state announcements
* touch targets
* focus behavior
* dynamic type
* reduced motion

# 37. INTERNATIONALIZATION AUDIT

Test for:

* long text
* short text
* RTL
* translated labels
* date/time variations
* pluralization
* Unicode
* emoji
* mixed scripts

Do not rely on fixed-width assumptions.

# 38. PERFORMANCE INSTRUMENTATION

Where the repository already provides observability, instrument meaningful mobile performance indicators.

Examples:

* cold start
* warm start
* conversation open time
* message send latency
* synchronization duration
* media upload duration
* media load duration
* search latency
* reconnect duration

Do not capture message content.

# 39. USER-FACING PERFORMANCE

Optimize the most important user journeys:

1. launch application
2. authenticate
3. open conversation
4. view messages
5. send message
6. receive message
7. attach media
8. open notification
9. search message
10. resume after offline state

Ensure loading states are intentional.

Avoid blocking the entire interface for background operations.

# 40. TEST MATRIX

Create or extend a meaningful mobile test matrix.

Cover:

* authenticated state
* unauthenticated state
* first launch
* existing installation
* offline startup
* online startup
* network transition
* WebSocket disconnect
* reconnect
* background/foreground
* notification launch
* deep link
* media upload
* media download
* large conversation
* large group
* session expiration
* account deletion
* device revocation
* permission denial

# 41. AUTOMATED TESTING

Add or improve:

* unit tests
* component tests
* integration tests
* navigation tests
* synchronization tests
* persistence tests
* error recovery tests
* security-sensitive tests

Use deterministic mocks and fixtures.

Do not create tests that simply assert mocked implementation details.

Test user-visible behavior and important state transitions.

# 42. END-TO-END VALIDATION

Where the repository supports E2E testing, validate critical flows:

* login
* open conversation
* send message
* receive message
* reply
* reaction
* media attachment
* search
* notification navigation
* privacy setting change
* device management
* logout

If E2E infrastructure is unavailable, document the exact limitation.

# 43. RELEASE CONFIGURATION

Audit release configurations for:

* development
* test
* staging
* production

Ensure environment-specific values are correctly separated.

Verify:

* API endpoints
* WebSocket endpoints
* notification configuration
* application identifiers
* bundle/version configuration
* logging level
* feature flags
* crash reporting
* analytics

Production must not accidentally use development infrastructure.

# 44. BUILD VALIDATION

Validate the mobile application using the repository's actual build commands.

Run where supported:

* TypeScript compilation
* lint
* unit tests
* integration tests
* E2E tests
* Expo validation
* Android build validation
* iOS build validation

Do not claim a platform build succeeded if the required platform tooling is unavailable.

# 45. DEPENDENCY AUDIT

Review dependencies introduced or modified during the implementation.

Check for:

* unused packages
* duplicate packages
* incompatible versions
* unnecessary native dependencies
* security-sensitive packages

Do not upgrade unrelated dependencies simply because newer versions exist.

If a security-critical dependency issue is found, address it only when compatible with the repository.

# 46. FINAL MOBILE ARCHITECTURE REVIEW

Perform a final architecture review of:

* navigation
* state
* network
* real-time
* persistence
* synchronization
* media
* notifications
* security
* observability
* testing

Ensure responsibilities remain clear.

Remove accidental coupling introduced during implementation.

Do not create circular dependencies.

# 47. DOCUMENTATION

Update documentation for:

* mobile architecture
* lifecycle handling
* synchronization
* offline behavior
* local persistence
* media caching
* notifications
* release configuration
* testing
* troubleshooting
* security assumptions

Documentation must reflect actual implementation.

# 48. FINAL REPOSITORY REVIEW

Before completion:

1. Inspect the complete git diff.
2. Verify every modified file is intentional.
3. Remove debug code.
4. Remove temporary files.
5. Remove unused imports.
6. Remove unused dependencies.
7. Verify no secrets exist.
8. Verify no TODO/FIXME placeholders were introduced.
9. Verify no fake implementations remain.
10. Verify no broken imports exist.
11. Verify TypeScript errors are resolved.
12. Verify tests are meaningful.
13. Verify documentation is accurate.
14. Verify build configuration.
15. Verify mobile source structure.

# 49. IMPLEMENTATION BOUNDARIES

This volume is the mobile production-hardening and final mobile integration scope.

Do not redesign:

* backend architecture
* database architecture
* web frontend
* infrastructure

Do not rewrite working mobile features without a concrete production-readiness reason.

Make only changes required to achieve the defined mobile production standard.

# 50. VALIDATION STANDARD

The implementation is complete only when:

* mobile source compiles
* TypeScript passes
* lint passes
* relevant tests pass
* critical flows are validated
* synchronization is resilient
* offline behavior is safe
* push notification handling is reliable
* media behavior is resilient
* authentication is secure
* local data handling is secure
* lifecycle behavior is correct
* performance risks are addressed
* accessibility is reviewed
* release configuration is validated
* no known critical mobile defects remain

If a validation step cannot be executed, clearly report why.

Never fabricate validation results.

# 51. FINAL IMPLEMENTATION REPORT

Provide:

### A. Mobile Production Audit

Summarize major issues found and fixed.

### B. Reliability

Describe:

* reconnect
* synchronization
* offline queue
* conflict resolution
* lifecycle recovery

### C. Performance

Describe:

* rendering
* startup
* memory
* battery
* network
* media

### D. Security

Describe:

* secure storage
* network security
* logging
* build security
* local data protection

### E. Platform Behavior

Describe iOS and Android handling.

### F. Testing

List all tests added or modified.

### G. Validation

Report exact commands and results.

### H. Files Created

List every new file.

### I. Files Modified

List every modified file.

### J. Known Limitations

List only real limitations.

# MOBILE COMPLETION STANDARD

This volume is complete only when the mobile application has received its final production-hardening implementation for the defined scope.

Do not stop at an audit.

Fix the identified production issues.

Do not leave:

* placeholders
* TODO/FIXME gaps
* fake services
* broken imports
* unresolved TypeScript errors
* knowingly broken lifecycle behavior
* knowingly broken synchronization
* insecure logging
* committed secrets
* unnecessary debug behavior

All changes must integrate with the existing repository.

# IMPLEMENTATION REPORT FORMAT

End with exactly:

```text
IMPLEMENTATION STATUS
- Status: COMPLETE / BLOCKED
- Scope: WHATSAPP MOBILE VOLUME 4

PRODUCTION AUDIT
- ...

RELIABILITY
- ...

PERFORMANCE
- ...

SECURITY
- ...

PLATFORM BEHAVIOR
- ...

FILES CREATED
- ...

FILES MODIFIED
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

If blocked, identify the exact blocker, affected functionality, completed work, and remaining work.

Never claim completion when required implementation or validation remains unfinished.
