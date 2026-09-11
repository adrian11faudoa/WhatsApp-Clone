# WHATSAPP — MOBILE VOLUME 3

## ROLE

Act as a senior production engineering team responsible for implementing the advanced account, privacy, security, media, search, notification, moderation-aware, and production-quality mobile experience of a globally scaled real-time communication platform.

Operate as:

* Staff Mobile Engineer
* Senior React Native Engineer
* Senior TypeScript Engineer
* Mobile Architecture Engineer
* Security Engineer
* Privacy Engineer
* Mobile Performance Engineer
* QA Engineer
* Accessibility Engineer
* UX Engineer
* Reliability Engineer

Implement real production software directly in the repository.

Do not teach or provide pseudo-code.

Do not create placeholders, TODO/FIXME gaps, fake integrations, mock production implementations, incomplete handlers, or omitted implementations.

Every implementation must be fully typed, integrated, testable, maintainable, secure, and production-ready.

# PROJECT

Build the advanced mobile application experience for a global real-time communication platform comparable in capability to WhatsApp, Telegram, Signal, Messenger, Discord, and Teams.

The mobile application must support:

* accounts
* profiles
* devices
* conversations
* groups
* messaging
* media
* notifications
* search
* privacy
* security
* blocking
* reporting
* disappearing messages
* multi-device synchronization
* offline operation
* accessibility
* internationalization
* production observability

The system must support very large global user populations, high message throughput, large media volumes, and continuously connected mobile clients.

# TECHNOLOGY DIRECTION

Use the repository's established implementation where compatible.

The mobile application is based on:

* React Native
* Expo
* TypeScript
* React Navigation
* TanStack Query where appropriate
* Zustand where appropriate
* Socket.IO or the established real-time transport
* Secure platform storage
* APNs
* FCM
* Platform-native capabilities through Expo or the repository's existing native configuration

Follow existing dependency versions and project conventions.

Do not replace established technology without a concrete compatibility or production-readiness reason.

# SOURCE OF TRUTH

The repository is the source of truth.

Before modifying anything:

1. Inspect the repository.
2. Locate the mobile application.
3. Inspect existing screens and navigation.
4. Inspect account and profile functionality.
5. Inspect settings architecture.
6. Inspect privacy and security models exposed to clients.
7. Inspect notification handling.
8. Inspect media infrastructure.
9. Inspect search APIs and types.
10. Inspect blocking/reporting APIs.
11. Inspect device/session APIs.
12. Inspect local persistence.
13. Inspect synchronization behavior.
14. Inspect existing tests.
15. Inspect TypeScript and Expo configuration.
16. Identify existing reusable components and services.
17. Preserve compatible behavior.
18. Implement only this prompt's scope.
19. Avoid unnecessary rewrites.

Never assume an API, type, screen, service, or file exists without inspecting the repository.

# 1. ADVANCED MOBILE SETTINGS ARCHITECTURE

Implement a scalable mobile settings architecture.

Organize settings into clear categories such as:

* account
* profile
* privacy
* security
* notifications
* chats
* media/data
* devices
* accessibility
* appearance
* language
* storage

Use reusable setting primitives for:

* toggles
* selectors
* navigation rows
* destructive actions
* informational rows
* account actions
* permission controls

Settings must be driven by authoritative application state.

Do not duplicate server-owned values in multiple unrelated stores.

# 2. ACCOUNT SETTINGS

Implement mobile account-management UX for supported backend capabilities.

Support:

* account information
* profile information
* phone/account identifier presentation where applicable
* account security
* connected devices
* account deletion
* data export
* session management

Clearly distinguish:

* local preferences
* server-side account settings
* security-sensitive settings

Do not expose sensitive server information unnecessarily.

# 3. PROFILE EXPERIENCE

Implement production-grade profile screens.

Support:

* profile photo
* display name
* status/about text
* profile editing
* profile preview
* profile visibility
* contact profile view
* group participant profile view

Respect privacy controls.

Handle:

* missing profile data
* deleted accounts
* blocked users
* unavailable profile media
* stale profile data

Use appropriate image loading and caching.

# 4. PRIVACY SETTINGS

Implement mobile privacy controls for backend-supported settings.

Potential controls include:

* last seen
* online visibility
* profile photo visibility
* about/status visibility
* read receipts
* typing visibility
* group invitation permissions
* message-related privacy
* blocked users
* disappearing-message defaults

The UI must represent the actual server-supported values.

Do not invent privacy options that do not exist in the backend contract.

Ensure privacy changes have:

* loading state
* optimistic behavior only where safe
* authoritative confirmation
* failure recovery
* clear user feedback

# 5. PRIVACY VALUE MODEL

Create a consistent client representation for privacy values.

Where supported, handle values such as:

* everyone
* contacts
* contacts except
* nobody

Represent exclusions safely.

Do not leak excluded-user information through UI state.

Ensure privacy settings remain consistent after:

* app restart
* device synchronization
* account changes
* session changes
* backend updates

# 6. BLOCKED USERS

Implement the complete blocked-users experience.

Support:

* viewing blocked users
* blocking a user
* unblocking a user
* confirming destructive actions
* profile navigation
* handling blocked conversations
* handling stale blocked-user data

When blocking affects existing conversations, update local UI consistently with backend behavior.

Do not infer authorization solely from local state.

# 7. SECURITY SETTINGS

Implement mobile security settings for supported capabilities.

Support where available:

* active devices
* active sessions
* session termination
* security notifications
* login/session activity
* authentication-related controls
* account security status

Security-sensitive operations must require appropriate authentication according to the backend contract.

Do not expose session credentials or tokens in the UI.

# 8. DEVICE MANAGEMENT

Implement the mobile device/session management interface.

Display safe metadata such as:

* device type
* operating system
* approximate activity
* session status
* current-device designation

Support:

* viewing active devices
* revoking a device/session
* handling revoked current sessions
* refreshing device state
* stale-device handling

When the current device is revoked, transition safely into the appropriate authentication state.

# 9. ACCOUNT DELETION

Implement a safe account-deletion flow.

Requirements:

* clearly explain destructive consequences
* require explicit confirmation
* respect backend authentication requirements
* prevent accidental activation
* show processing state
* handle failure
* handle successful completion
* clear sensitive local state after confirmed deletion
* navigate safely after account deletion

Do not delete local data before the server confirms the operation unless required for security.

Do not expose an irreversible action through a single accidental tap.

# 10. DATA EXPORT

Implement mobile UX for data-export workflows supported by the backend.

Support:

* requesting export
* displaying processing state
* polling or synchronization through established mechanisms
* displaying completion state
* opening/downloading the export securely
* failure recovery

Do not store exported sensitive data indefinitely.

Do not expose private export URLs through logs.

# 11. DISAPPEARING MESSAGE SETTINGS

Implement conversation and global controls for disappearing messages.

Support:

* viewing current duration
* selecting supported durations
* enabling/disabling where supported
* displaying active state
* handling server-confirmed changes
* reflecting remote changes
* displaying expiration state in conversations

Do not calculate authoritative expiration exclusively from local device time.

Gracefully handle clock skew.

# 12. NOTIFICATION SETTINGS

Implement comprehensive mobile notification settings.

Support appropriate controls for:

* global notifications
* message notifications
* group notifications
* conversation-specific notifications
* muted conversations
* notification sounds
* vibration
* previews
* lock-screen visibility
* notification badges

Separate:

* application preferences
* operating-system permissions
* server notification settings

Do not represent an OS permission as granted simply because the application preference is enabled.

# 13. PLATFORM NOTIFICATION PERMISSIONS

Implement robust permission handling for:

* iOS notification permissions
* Android notification permissions where applicable
* notification settings redirects
* permission denial
* restricted permissions
* permission changes outside the app

When returning from system settings:

* re-evaluate the actual permission state
* update UI
* do not assume the user changed anything

# 14. NOTIFICATION CATEGORIES

Implement notification categories/actions where supported by the project's platform strategy.

Ensure categories are:

* deterministic
* registered safely
* localized
* privacy-aware
* compatible with navigation

Do not expose message content through notification actions unnecessarily.

# 15. MEDIA SETTINGS

Implement mobile controls for:

* automatic media download
* Wi-Fi behavior
* cellular behavior
* media quality preferences
* storage behavior
* upload quality where supported
* playback preferences

Do not cause background downloads that violate user-selected settings.

Respect platform data constraints.

# 16. STORAGE MANAGEMENT

Implement a mobile storage-management experience.

Display meaningful categories such as:

* cached media
* downloaded media
* temporary files
* application cache where measurable

Support safe cleanup operations.

Do not delete user-generated content that exists only locally without explicit confirmation.

Differentiate:

* server-owned data
* cached data
* downloaded data
* pending upload data
* synchronization state

# 17. MEDIA GALLERY

Implement advanced in-app media browsing.

Support:

* images
* videos
* documents where appropriate
* conversation-specific media
* chronological browsing
* loading
* pagination
* full-screen viewing
* safe navigation back to conversation context

Use efficient rendering.

Do not load an entire media library into memory.

# 18. MEDIA VIEWER

Implement a production-grade full-screen media viewer.

Support:

* zoom where appropriate
* swipe/navigation
* image viewing
* video playback
* loading states
* unavailable media
* retry
* metadata where appropriate
* closing and returning to conversation location

Respect accessibility.

Handle device orientation according to application capabilities.

# 19. MEDIA PERFORMANCE

Optimize:

* image decoding
* thumbnail loading
* image caching
* video loading
* memory usage
* list virtualization
* prefetching
* network bandwidth

Do not cache unlimited high-resolution media.

Ensure cache eviction does not remove required synchronization metadata.

# 20. SEARCH SETTINGS AND EXPERIENCE

Implement advanced mobile search.

Support:

* global search
* message search
* conversation search
* user/contact search
* filtering where supported
* pagination
* result grouping
* result navigation
* empty state
* loading state
* failure state

Search results must respect:

* authorization
* blocking
* privacy
* conversation membership
* deleted content

# 21. SEARCH RESULT NAVIGATION

When a user selects a message result:

1. Open the correct conversation.
2. Determine whether the target message is loaded.
3. Fetch or synchronize the required history when necessary.
4. Navigate to the message.
5. Highlight it temporarily where appropriate.
6. Preserve normal conversation behavior afterward.

Handle unavailable or deleted messages gracefully.

# 22. SEARCH SECURITY

Treat search results as server-authoritative.

Do not:

* search unauthorized local data
* expose blocked content
* expose deleted content
* leak hidden group membership
* expose private metadata through search suggestions

Sanitize search inputs according to the established API contract.

Avoid logging sensitive search terms.

# 23. PROFILE PHOTO AND MEDIA UPDATES

Implement profile-media editing where supported.

Support:

* selecting media
* cropping where appropriate
* previewing
* uploading
* progress
* failure recovery
* cancellation where supported
* successful update
* cache invalidation

Avoid stale profile images after updates.

Use cache-busting or authoritative media identifiers rather than arbitrary timestamp hacks when the backend provides stable versioning.

# 24. REPORTING EXPERIENCE

Implement user/message reporting UX.

Support:

* report user
* report message
* selecting supported reason categories
* optional description where supported
* confirmation
* submission state
* success state
* failure state

Do not expose internal moderation workflows.

Do not reveal whether a report produced a particular moderation action.

# 25. MODERATION-AWARE UX

Handle backend-provided moderation restrictions such as:

* account restricted
* conversation restricted
* messaging disabled
* media upload disabled
* temporary limits

Clearly explain user-facing restrictions without exposing sensitive internal enforcement data.

Do not attempt to circumvent restrictions client-side.

# 26. SAFETY UX

Implement user-facing safety behavior for suspicious interactions where supported.

Potential experiences include:

* blocked-user warnings
* report shortcuts
* suspicious-link handling
* privacy warnings
* restricted-content presentation

Do not create alarmist UI without backend-supported signals.

# 27. DEEP LINKING

Implement secure deep-link handling for:

* conversations
* profiles
* messages
* shared media
* notification destinations
* account flows

Validate deep-link parameters.

Do not trust arbitrary IDs, URLs, or embedded data from external applications.

A deep link must not bypass:

* authentication
* authorization
* blocking
* privacy
* conversation membership

Handle unauthenticated deep links through a safe pending-navigation flow.

# 28. NAVIGATION SECURITY

Review all navigation paths for authorization assumptions.

A screen must not assume that because a user reached it through navigation they are authorized to access its content.

Revalidate access through the appropriate application state and backend APIs.

Prevent stale navigation state from exposing:

* deleted conversations
* revoked memberships
* blocked profiles
* private content
* restricted account information

# 29. ACCESSIBILITY SETTINGS

Implement accessibility-aware application preferences where supported.

Support:

* dynamic text scaling
* reduced motion
* screen reader compatibility
* accessible touch targets
* accessible status descriptions
* meaningful focus order
* high-contrast-compatible UI
* non-color-only state communication

Verify advanced messaging actions remain discoverable with assistive technologies.

# 30. THEME AND APPEARANCE

Implement production-grade appearance settings.

Support where the application design requires:

* light mode
* dark mode
* system mode

Ensure:

* navigation
* message bubbles
* media viewers
* dialogs
* settings
* notifications
* loading states
* error states

remain visually consistent.

Do not hardcode colors independently inside components.

Use the application's centralized design tokens.

# 31. INTERNATIONALIZATION

Ensure all new mobile experiences support:

* localization
* pluralization
* locale-aware dates
* locale-aware times
* RTL layouts
* long strings
* Unicode
* emoji
* translated accessibility labels

Do not concatenate user-facing strings in ways that prevent proper localization.

# 32. TIME AND DATE DISPLAY

Implement consistent display for:

* message timestamps
* relative dates
* last-seen information
* device activity
* media dates
* search result dates

Use the project's established date/time utilities.

Do not rely on server timestamps being in local time.

Respect timezone changes while the application is running.

# 33. FEATURE FLAGS

Integrate mobile feature flags where supported.

Feature flags must:

* fail safely
* have typed values
* avoid security decisions
* avoid exposing hidden server capabilities
* update predictably
* be observable where appropriate

Do not embed permanent experimental branches throughout the UI.

# 34. ANALYTICS AND TELEMETRY

Implement appropriate mobile instrumentation for the new experiences.

Track operationally useful events such as:

* message send failure
* synchronization failure
* media upload failure
* notification open
* deep-link failure
* search failure
* authentication/session failure

Do not send message content, private conversations, credentials, or unnecessary personal data to analytics systems.

Apply privacy-aware event naming and metadata.

# 35. CRASH AND ERROR OBSERVABILITY

Ensure production errors contain useful diagnostic context without leaking sensitive information.

Where the repository has crash/error reporting:

* integrate relevant mobile errors
* include safe operation identifiers
* include app version
* include platform
* include feature context
* avoid sensitive payloads

Do not log:

* access tokens
* refresh tokens
* message bodies
* private media URLs
* passwords
* encryption secrets

# 36. NETWORK RESILIENCE

Harden all newly implemented network interactions.

Handle:

* timeouts
* offline state
* transient errors
* authentication expiration
* rate limits
* server maintenance
* malformed responses
* partial responses
* duplicate responses

Use the application's centralized network layer.

Do not implement inconsistent retry logic independently in every screen.

# 37. AUTHENTICATION EXPIRATION

Ensure sensitive settings and account flows correctly handle expired authentication.

When authentication expires:

* stop unauthorized requests
* refresh credentials through the established mechanism where possible
* retry only safe/idempotent operations
* transition to reauthentication when required
* preserve safe pending navigation where appropriate
* clear sensitive state when the session is definitively invalid

Never retry destructive operations blindly after authentication failure.

# 38. LOCAL DATA SECURITY

Audit all newly persisted data.

Sensitive information must use appropriate platform protection.

Review:

* secure storage
* database persistence
* cached responses
* notification payloads
* analytics
* logs
* crash reports
* temporary files
* downloaded media

Do not persist data merely because it is convenient.

Implement cleanup for sensitive temporary data.

# 39. APP LOCK AND PRIVACY BOUNDARIES

If the backend/product architecture supports an application-lock or privacy boundary, implement the mobile-facing architecture without bypassing the established security model.

Ensure private application content is not accidentally shown through:

* recent-app previews
* notification previews
* screenshots where platform restrictions are supported
* background snapshots
* logs
* debugging output

Use platform capabilities appropriately without claiming guarantees that the operating system cannot provide.

# 40. PERFORMANCE HARDENING

Profile or reason about:

* settings rendering
* profile rendering
* search result rendering
* media gallery rendering
* navigation transitions
* image memory
* cache size
* synchronization work
* background processing
* notification processing

Avoid unnecessary global state updates.

Avoid mounting large screens when they are not needed.

Use virtualization for large result sets.

# 41. BATTERY AND NETWORK EFFICIENCY

Minimize unnecessary:

* polling
* background network traffic
* WebSocket reconnect loops
* media prefetching
* search requests
* location-independent background activity
* repeated cache refreshes

Use event-driven updates when possible.

Respect mobile operating-system background execution constraints.

# 42. TESTING

Add or extend tests covering:

* privacy settings
* blocked users
* device management
* account deletion
* data export
* notification settings
* permission states
* search
* deep links
* media viewer
* media settings
* reporting
* disappearing messages
* theme
* localization-sensitive layouts
* authentication expiration
* offline behavior
* network failures
* authorization failures
* accessibility-critical interactions

Include regression tests for affected existing functionality.

Do not use arbitrary timeouts to make asynchronous tests pass.

# 43. SECURITY TESTING

Test for:

* unauthorized deep links
* stale navigation access
* blocked-user bypasses
* private-data exposure
* sensitive logging
* unsafe URL handling
* token exposure
* notification privacy leaks
* local-storage exposure
* malformed server responses
* invalid search parameters
* unauthorized device actions

Client-side security checks must complement, not replace, server authorization.

# 44. FAILURE RECOVERY

Explicitly validate:

* account deletion failure
* export request failure
* notification permission denial
* search timeout
* media loading failure
* profile upload failure
* device revocation failure
* blocked-user action failure
* deep-link to deleted content
* session expiration
* server unavailable
* malformed response
* local persistence failure

Every flow must recover to a consistent UI state.

# 45. CODE QUALITY

Maintain:

* strict TypeScript
* reusable components
* reusable hooks
* centralized services
* typed API contracts
* predictable state ownership
* clear navigation contracts
* controlled side effects
* consistent error handling
* repository linting
* repository formatting

Do not suppress compiler errors without a justified reason.

Do not leave dead code.

Do not duplicate existing utilities.

# 46. DOCUMENTATION

Update relevant documentation for:

* settings architecture
* privacy behavior
* device management
* notification behavior
* deep links
* search
* media management
* storage behavior
* accessibility
* analytics/privacy boundaries
* testing

Document actual implemented behavior only.

# 47. VALIDATION

Before declaring completion:

1. Run mobile typecheck.
2. Run linting.
3. Run relevant tests.
4. Validate navigation.
5. Validate settings flows.
6. Validate privacy controls.
7. Validate device/session flows.
8. Validate search.
9. Validate deep links.
10. Validate notification settings.
11. Validate media flows.
12. Validate blocking/reporting.
13. Validate authentication expiration.
14. Validate accessibility-critical flows.
15. Validate iOS configuration where available.
16. Validate Android configuration where available.
17. Verify no secrets were introduced.
18. Verify no debug bypasses remain.
19. Inspect the final git diff.
20. Verify all changed files compile.

If a validation step cannot be executed because of the environment, report the exact limitation.

Never claim a command passed if it was not executed.

# 48. IMPLEMENTATION BOUNDARIES

This prompt focuses on advanced mobile account, privacy, security, search, media, notification, moderation-aware, and production UX.

Do not redesign backend architecture.

Do not redesign the web frontend.

Do not replace existing mobile foundations unnecessarily.

If a narrow compatibility change is required, make the smallest safe change and document it.

Do not modify unrelated files.

# 49. REPOSITORY INTEGRATION

After implementation:

* inspect every changed file
* remove unused imports
* remove unused dependencies
* verify navigation registration
* verify route parameters
* verify API types
* verify environment configuration
* verify platform configuration
* verify tests
* verify documentation
* verify no accidental generated files were committed
* verify no unrelated refactors were introduced

The implementation must integrate with the repository's actual current state.

# 50. FINAL IMPLEMENTATION REPORT

Provide:

### A. Implemented Scope

List all completed mobile functionality.

### B. Files Created

List every created file and purpose.

### C. Files Modified

List every modified file and reason.

### D. Settings

Describe account, privacy, notification, security, storage, and appearance functionality.

### E. Search and Deep Links

Describe search and secure navigation behavior.

### F. Media

Describe media gallery, viewer, storage, upload, and caching behavior.

### G. Security and Privacy

Describe security-sensitive implementation decisions.

### H. Analytics and Observability

Describe instrumentation and privacy boundaries.

### I. Testing

List tests and commands executed.

### J. Validation

Report exact typecheck, lint, test, and build results.

### K. Known Limitations

List only genuine remaining limitations.

# MOBILE COMPLETION STANDARD

This volume is complete only when the defined advanced mobile experience is implemented as real production-grade code.

The implementation must:

* compile
* typecheck
* integrate with the repository
* preserve existing compatible behavior
* provide production-grade settings
* implement privacy controls
* implement device/session management
* implement notification controls
* implement secure search
* implement deep links safely
* implement advanced media UX
* implement blocking/reporting
* handle authentication expiration
* respect accessibility
* respect internationalization
* provide privacy-safe observability
* include meaningful tests
* contain no placeholders
* contain no TODO/FIXME gaps
* contain no fake production implementations
* contain no knowingly broken imports
* contain no knowingly unresolved TypeScript errors
* contain no unnecessary rewrites

Do not stop after creating scaffolding.

Implement the complete scope.

# IMPLEMENTATION REPORT FORMAT

End with exactly:

```text
IMPLEMENTATION STATUS
- Status: COMPLETE / BLOCKED
- Scope: WHATSAPP MOBILE VOLUME 3

IMPLEMENTED
- ...

FILES CREATED
- ...

FILES MODIFIED
- ...

SETTINGS / PRIVACY
- ...

SEARCH / DEEP LINKS
- ...

MEDIA
- ...

SECURITY
- ...

ANALYTICS / OBSERVABILITY
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
