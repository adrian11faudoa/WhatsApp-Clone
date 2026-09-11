# WHATSAPP — FRONTEND VOLUME 3

## ROLE

Act as a Principal Frontend Architect, Staff Frontend Engineer, Staff TypeScript Engineer, Staff UI/UX Engineer, Staff Accessibility Engineer, Staff Performance Engineer, Staff Security Engineer, Staff Privacy Engineer, and Senior QA Engineer working as one production engineering team.

Your responsibility is to implement the **advanced account, privacy, notification, search, settings, administration-aware, media-aware, and production UX capabilities** of the WhatsApp web application.

Do not act as a teacher. Do not provide tutorials instead of implementation. Inspect the repository, understand its current implementation, and directly implement the required production functionality.

---

# PROJECT

Build the production web experience for a global real-time communication platform comparable in capability to WhatsApp, Telegram, Signal, Messenger, Discord, and Teams.

The web application must support hundreds of millions of registered users, tens of millions of daily active users or greater, large concurrent WebSocket populations, high message throughput, large media volumes, and global traffic.

This volume focuses on the advanced application experience surrounding:

* account settings
* privacy controls
* security controls
* device/session management
* notifications
* search
* media/document experiences
* disappearing messages
* blocked users
* reporting
* moderation-aware UX
* account deletion
* data export
* profile/privacy configuration
* application preferences
* feature flags
* accessibility
* internationalization
* performance
* observability
* resilience
* production hardening

All functionality must consume the actual repository contracts.

Do not fabricate backend functionality.

---

# TECHNOLOGY DIRECTION

Use the technology established by the repository.

Expected web technologies include:

* Next.js
* React
* TypeScript
* Tailwind CSS
* TanStack Query
* Zustand
* React Hook Form
* Zod
* Socket.IO/WebSocket client
* REST/OpenAPI APIs
* accessible semantic HTML
* modern browser APIs
* Playwright where available
* Jest/Vitest and React Testing Library according to repository conventions

Use existing dependencies before introducing new ones.

Do not introduce redundant libraries.

---

# SOURCE OF TRUTH

The repository is the authoritative source for:

* API contracts
* frontend routes
* authentication
* privacy endpoints
* account settings
* device/session APIs
* notification APIs
* search APIs
* media APIs
* moderation/reporting contracts
* design system
* state management
* feature flags
* testing
* environment configuration
* existing UI components

Inspect the repository before modifying anything.

Do not assume an endpoint exists.

Do not assume a feature is implemented merely because this prompt describes it.

Do not redesign backend APIs.

Do not regenerate unchanged files.

---

# 1. IMPLEMENTATION OBJECTIVES

Prioritize:

1. privacy
2. security
3. correctness
4. user control
5. accessibility
6. reliability
7. performance
8. maintainability
9. observability
10. scalability

Every settings and privacy control must clearly communicate its current state and resulting behavior.

Avoid ambiguous toggles.

Do not silently modify security-sensitive settings.

---

# 2. SETTINGS ARCHITECTURE

Implement a scalable settings architecture.

Organize settings into logical categories such as:

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
* advanced settings

Only expose categories supported by the repository.

Use reusable settings primitives.

Support:

* loading state
* current value
* editing
* saving
* validation
* optimistic behavior only where safe
* server confirmation
* rollback
* failure state
* retry

Avoid placing settings logic directly inside presentation components.

---

# 3. PRIVACY SETTINGS

Implement the privacy settings UI exposed by the backend.

Potential controls include:

* last seen
* online status
* profile photo visibility
* about/status visibility
* read receipts
* typing visibility
* group invitation permissions
* calls/privacy controls
* blocked users
* disappearing-message defaults

Only implement controls that have corresponding repository capabilities.

Every privacy setting must:

* load from server state
* validate user permissions
* display current state
* update safely
* reconcile server response
* handle failure
* remain consistent after refresh

Never trust client-side state as proof that a privacy restriction is active.

---

# 4. PRIVACY VALUE MODEL

Use strongly typed privacy values.

Support the repository's actual semantics, including potentially:

* everyone
* contacts
* contacts except selected users
* nobody
* custom lists

Do not represent complex privacy configuration as a boolean if the backend supports multiple states.

Create reusable UI controls for these policies.

Clearly explain consequences where needed.

---

# 5. BLOCKED USERS

Implement the blocked-user management experience.

Support where available:

* blocked-user list
* search
* unblock
* block from profile/context
* loading
* empty state
* confirmation
* server errors
* real-time consistency

When a user is blocked:

* update relevant cached state
* remove or alter inappropriate UI actions
* respect privacy restrictions
* avoid exposing private information

Do not assume blocking is purely local.

---

# 6. SECURITY SETTINGS

Implement the security settings available in the repository.

Support applicable functionality such as:

* active sessions/devices
* session revocation
* logout from other devices
* security notifications
* authentication changes
* account protection
* security-related confirmation flows

Sensitive actions must require appropriate confirmation.

Never expose session secrets.

Do not display raw tokens.

Do not log authentication information.

---

# 7. DEVICE AND SESSION MANAGEMENT

Implement a complete device/session management interface.

Display safe metadata such as:

* device type
* browser/platform
* approximate activity information when provided
* current-device indicator
* last active information
* session status

Support:

* revoke individual session
* revoke other sessions
* refresh session list
* empty state
* failure recovery

Do not expose unnecessary IP addresses, authentication secrets, or internal infrastructure information.

---

# 8. ACCOUNT SETTINGS

Implement account management functionality exposed by the backend.

Support applicable flows such as:

* account identifier
* username
* profile
* password/authentication settings where supported
* account status
* security settings
* account deletion
* data export

Use explicit confirmation for destructive actions.

Do not create client-only account mutations.

---

# 9. ACCOUNT DELETION

Implement the account deletion UX if supported.

The flow must include:

* clear explanation
* consequences
* confirmation
* authentication/re-authentication if required
* mutation state
* cancellation
* failure handling
* successful completion
* local private-state cleanup

Do not delete client state before the server confirms the deletion request unless required for security.

After successful account deletion:

* invalidate private caches
* clear authenticated state
* remove sensitive local state
* redirect appropriately
* prevent stale authenticated screens from remaining accessible

---

# 10. DATA EXPORT

Implement the frontend for data-export functionality if supported.

Support:

* export request
* progress/status
* completion
* secure download
* expiration handling
* failure
* retry

Never expose export URLs to analytics.

Do not permanently store exported private data in browser persistence unless explicitly required.

---

# 11. DISAPPEARING MESSAGES UX

Implement disappearing-message controls where supported.

Support:

* default disappearing-message setting
* conversation-level setting
* duration selection
* enabled/disabled state
* informational explanation
* server confirmation
* real-time updates

The UI must not imply that disappearing messages guarantee deletion from every device, screenshot, backup, cache, or external copy unless the product contract explicitly guarantees that behavior.

Represent the actual server semantics accurately.

---

# 12. NOTIFICATION SETTINGS

Implement notification settings.

Support available controls for:

* message notifications
* group notifications
* mention notifications
* call notifications
* notification sound
* desktop/browser notifications
* preview visibility
* muted conversations

Use the backend's notification model where applicable.

Distinguish:

* application notification preferences
* browser permission
* operating-system notification settings

Do not claim that the web application can control operating-system settings it cannot control.

---

# 13. BROWSER NOTIFICATION PERMISSIONS

Implement a safe browser notification permission flow.

Support:

* permission status
* request permission only after meaningful user interaction
* denied state
* blocked state
* unsupported browser state
* enabled state

Do not repeatedly prompt after denial.

Provide instructions or links to appropriate browser settings only when necessary and accurate.

---

# 14. CHAT NOTIFICATION CONTROLS

Implement conversation-specific notification settings where supported.

Support:

* mute
* mute duration
* unmute
* notification preference
* server synchronization
* real-time updates

Update conversation list indicators after notification changes.

Do not create separate local state that can diverge from server state.

---

# 15. SEARCH EXPERIENCE

Implement the global search experience supported by the backend.

Support:

* users
* contacts
* conversations
* messages
* groups
* supported media/documents where searchable

Provide:

* search input
* debounce
* result categories
* loading state
* empty state
* error state
* keyboard navigation
* result selection
* query cancellation

Do not fetch every category independently on every keystroke unless required.

Use the repository's search architecture efficiently.

---

# 16. SEARCH RESULT SECURITY

Search results must respect server authorization.

Never:

* filter unauthorized data into visibility
* infer private users from hidden results
* expose blocked accounts improperly
* cache sensitive results indefinitely
* put sensitive result content into URLs

The backend remains authoritative.

The frontend must fail closed when authorization information is missing.

---

# 17. SEARCH RESULT NAVIGATION

When a result references:

* a user
* a conversation
* a message
* a group
* media

navigate using stable identifiers.

For message results:

* open the correct conversation
* retrieve the relevant history range
* position the timeline
* highlight the target
* preserve existing conversation state

Handle deleted or inaccessible targets gracefully.

---

# 18. MEDIA GALLERY

Implement the conversation media/document gallery where backend capabilities exist.

Support categories such as:

* photos
* videos
* documents
* links
* audio
* other supported media

Provide:

* pagination
* lazy loading
* thumbnails
* full-screen preview
* loading
* failed media
* authorization failure
* download/open behavior

Do not preload large media files unnecessarily.

---

# 19. MEDIA VIEWER

Implement an accessible media viewer.

Support:

* image viewing
* video playback where supported
* navigation between media
* close
* keyboard controls
* loading
* error
* download where authorized
* responsive sizing

Respect browser autoplay restrictions.

Do not autoplay private media with sound unexpectedly.

Provide accessible controls.

---

# 20. DOCUMENT EXPERIENCE

Implement document message presentation.

Support:

* filename
* file type
* file size
* upload/download state
* authorization state
* safe opening/downloading
* unavailable file handling

Do not assume a document is safe merely because it has a recognized extension.

Do not execute downloaded documents inside the application.

---

# 21. MEDIA BANDWIDTH AND PERFORMANCE

Implement media loading behavior appropriate for global users.

Use:

* thumbnails
* lazy loading
* responsive image sizing
* CDN URLs provided by backend
* progressive loading where supported
* browser caching where safe

Avoid downloading full-resolution media when a preview is sufficient.

Do not bypass authorization to obtain CDN URLs.

---

# 22. PROFILE VIEW EXPERIENCE

Implement a reusable user profile view.

Support:

* avatar
* display name
* identifier
* about/status
* presence where allowed
* privacy-aware information
* common actions
* block/report
* start conversation
* group membership information where appropriate

The profile view must adapt based on:

* current user
* contact
* blocked user
* unavailable user
* group participant

Do not expose information prohibited by privacy settings.

---

# 23. REPORTING UX

Implement user/message/group reporting flows where supported.

Support:

* report target selection
* reason selection
* optional additional context
* confirmation
* submission
* success
* failure
* cancellation

Do not expose internal moderation systems.

Do not display whether a report resulted in a particular enforcement action unless the backend explicitly provides that information.

Avoid collecting unnecessary free-form personal information.

---

# 24. MODERATION-AWARE UI

Integrate frontend behavior for backend-enforced moderation states.

Support applicable states such as:

* temporarily restricted account
* permanently restricted account
* messaging restriction
* media restriction
* suspended account
* removed group membership

The frontend must display authoritative server state.

Do not attempt to bypass restrictions through hidden routes or client-side mutations.

---

# 25. FEATURE FLAGS

Implement frontend feature-flag integration where supported.

Feature flags must:

* be typed
* have deterministic defaults
* fail safely
* avoid exposing secrets
* support gradual rollout
* avoid rendering inaccessible experimental functionality accidentally

Do not embed server secrets into client bundles.

Do not assume a feature is enabled merely because the frontend code exists.

---

# 26. APPLICATION PREFERENCES

Implement appropriate local application preferences such as:

* theme
* appearance
* compact/dense UI if supported
* language
* accessibility preferences
* reduced motion
* sidebar behavior

Use local persistence only for non-sensitive preferences.

Do not persist private messages or authentication secrets merely to preserve UI preferences.

---

# 27. THEME AND APPEARANCE

Implement the repository's supported appearance system.

Support where appropriate:

* light mode
* dark mode
* system preference
* theme persistence
* flash prevention during initial load

Ensure:

* sufficient contrast
* readable message bubbles
* accessible controls
* media overlays
* focus indicators
* dialogs
* disabled states

Do not hard-code colors into individual components when design tokens exist.

---

# 28. INTERNATIONALIZATION

Prepare and integrate internationalization.

Support:

* translated UI strings
* pluralization
* locale-aware dates
* locale-aware times
* right-to-left layouts where supported
* Unicode
* long translated strings

Avoid:

* hard-coded English strings inside reusable components
* assumptions about string length
* layouts that break when text expands
* left-to-right-only positioning logic

Use the repository's existing internationalization solution.

---

# 29. TIME AND DATE DISPLAY

Implement consistent time formatting.

Support:

* relative time where appropriate
* message timestamps
* conversation timestamps
* last-seen timestamps
* device activity timestamps
* locale-specific formatting

Use server timestamps for server-authoritative events.

Avoid relying on the client clock for message ordering or security decisions.

---

# 30. ACCESSIBILITY SETTINGS

Integrate accessibility preferences into the application.

Support where appropriate:

* reduced motion
* increased text readability
* keyboard-first interaction
* accessible notification behavior
* screen-reader-compatible status indicators

Never override an explicit system reduced-motion preference with unnecessary animation.

---

# 31. ERROR RECOVERY

Every advanced settings feature must have intentional recovery behavior.

Handle:

* network failure
* authorization failure
* validation failure
* conflict
* rate limiting
* server error
* timeout
* stale state
* session expiration

Provide:

* retry
* refresh
* cancellation
* clear error explanation

Do not leave settings controls visually changed when the server rejected the mutation.

---

# 32. OBSERVABILITY

Add appropriate frontend telemetry for:

* settings mutation failures
* search failures
* notification failures
* media loading failures
* WebSocket failures
* account/session failures
* critical UI errors
* performance metrics

Do not collect:

* passwords
* access tokens
* private message content
* private media
* unnecessary personal data

Ensure errors contain enough technical context for debugging without exposing sensitive information.

---

# 33. PERFORMANCE

Optimize advanced application surfaces for large-scale use.

Address:

* search result rendering
* settings page loading
* media galleries
* media viewers
* profile lists
* device/session lists
* blocked-user lists
* large groups
* notification updates
* feature-flag evaluation

Use:

* pagination
* virtualization
* lazy loading
* cache reuse
* request cancellation
* targeted invalidation
* code splitting

Avoid loading entire datasets merely to display counts or summary information.

---

# 34. SECURITY

Apply strict frontend security practices.

Protect against:

* XSS
* unsafe URLs
* malicious file names
* unsafe downloads
* CSRF where relevant
* sensitive-data leakage
* unauthorized navigation
* stale authenticated state
* insecure local storage
* accidental telemetry leakage

Do not rely on frontend authorization.

Do not expose internal API credentials.

Do not embed privileged service credentials in client bundles.

---

# 35. TESTING

Implement automated tests covering:

* privacy settings
* security settings
* session/device management
* blocked users
* account deletion
* data export
* notification settings
* browser notification permission states
* search
* search navigation
* media gallery
* media viewer
* document rendering
* disappearing-message settings
* reporting
* moderation states
* feature flags
* theme/preferences
* internationalization
* accessibility
* error recovery

Test both successful and failed mutations.

Test unauthorized and restricted states.

Test mobile-width responsive behavior.

---

# 36. SECURITY AND PRIVACY TESTING

Add tests ensuring:

* private data is not exposed in URLs
* sensitive data is not logged
* blocked users do not receive inappropriate UI access
* unauthorized actions are hidden or safely rejected
* deleted accounts cannot access stale authenticated state
* restricted accounts cannot bypass UI restrictions
* unsafe URLs are rejected
* unsafe HTML is not rendered
* sensitive telemetry fields are excluded

---

# 37. BROWSER TESTING

Where Playwright or equivalent browser testing exists, add critical end-to-end coverage for:

* login → application shell
* settings navigation
* privacy change
* device revocation
* blocked-user management
* search
* profile interaction
* notification settings
* account deletion confirmation
* responsive layout
* dark mode
* keyboard navigation

Tests must be deterministic and independent.

Do not rely on arbitrary timing sleeps.

---

# 38. TYPESCRIPT AND ARCHITECTURAL QUALITY

Maintain strict typing across all advanced features.

Avoid:

* `any`
* unsafe casts
* duplicated API models
* duplicated settings models
* implicit authorization assumptions
* giant settings components
* giant search components
* business logic embedded in UI primitives

Use reusable hooks/services for domain operations.

Keep presentation and data-access responsibilities separated.

---

# 39. DOCUMENTATION

Update frontend documentation covering:

* settings architecture
* privacy controls
* session/device management
* notification behavior
* search
* media
* account deletion
* data export
* reporting
* feature flags
* internationalization
* accessibility
* testing

Documentation must describe the actual implementation.

---

# 40. IMPLEMENTATION AND INTEGRATION RULES

Before coding:

1. inspect the repository
2. inspect existing settings routes
3. inspect privacy APIs
4. inspect device/session APIs
5. inspect notification APIs
6. inspect search APIs
7. inspect media APIs
8. inspect moderation/reporting contracts
9. inspect feature-flag infrastructure
10. inspect internationalization and accessibility infrastructure

Then implement only the scope defined here.

Preserve compatible existing functionality.

Do not create fake endpoints.

Do not invent response shapes.

Do not leave mock production paths.

If the repository lacks a backend capability required for a requested UI feature, do not fabricate it. Integrate with what actually exists and explicitly report the missing capability.

---

# 41. FINAL IMPLEMENTATION REPORT

Before finishing, run all applicable:

* typecheck
* lint
* formatting validation
* unit tests
* integration tests
* accessibility tests
* browser tests
* production build

Fix all introduced failures.

Report:

* exact files created
* exact files modified
* settings architecture
* privacy implementation
* security implementation
* session/device implementation
* notification implementation
* search implementation
* media implementation
* reporting/moderation implementation
* feature flags
* internationalization
* accessibility
* performance
* security/privacy
* tests
* validation commands
* validation results
* repository limitations
* backend capabilities not available

Do not claim a test passed unless it was actually executed.

# FRONTEND VOLUME 3 COMPLETION STANDARD

This volume is complete only when the web application provides production-quality:

* account settings
* privacy controls
* blocked-user management
* security controls
* device/session management
* account deletion
* data export
* disappearing-message settings
* notification settings
* browser notification integration
* global search
* message search integration
* profile views
* media gallery
* media viewer
* document experience
* reporting
* moderation-aware UI
* feature-flag support
* application preferences
* theme support
* internationalization
* accessibility support
* observability
* security hardening
* automated tests
* production build validation
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
4. **Settings and Account Architecture**
5. **Privacy and Security**
6. **Search and Media**
7. **Notifications**
8. **Moderation and Reporting**
9. **Internationalization and Accessibility**
10. **Performance**
11. **Testing**
12. **Validation Commands**
13. **Validation Results**
14. **Repository Limitations**
15. **Remaining Scope Outside This Volume**

Stop only after the implementation and validation are complete.
