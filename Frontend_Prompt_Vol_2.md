You are operating in Senior Engineering Team Mode.

Build the remaining production-ready web frontend for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The frontend must consume the established backend APIs, WebSocket contracts, authentication model, authorization model, media architecture, notification architecture, search architecture, call architecture, and synchronization contracts.

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

Complete the production-ready web frontend for:

• Advanced messaging
• Groups
• Communities
• Stories/status
• Media
• Notifications
• Search
• Voice calls
• Video calls
• Group calls
• Device management
• Privacy
• Security
• Business accounts
• Administration
• Moderation
• Real-time synchronization
• Offline synchronization
• Accessibility
• Performance
• Production hardening

The frontend must remain consistent with the established architecture and backend contracts.

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

State:

• Zustand

Server State:

• TanStack Query

Forms:

• React Hook Form
• Zod

Real-Time:

• WebSockets
• Socket.IO client where appropriate

Animation:

• Framer Motion

Icons:

• Lucide React

Testing:

• Jest
• React Testing Library
• Playwright
• Accessibility testing tools

────────────────────────────────────────

ADVANCED MESSAGING EXPERIENCE

Complete the messaging experience.

Implement:

• Replies
• Forwarding
• Mentions
• Reactions
• Editing
• Deletion
• Message selection
• Multi-select actions
• Copy
• Retry failed messages
• Message information
• Delivery details
• Read details
• Context menus
• Keyboard shortcuts
• Message search
• Jump to message
• Scroll-to-referenced-message
• Unread separators
• Date separators

Support efficient rendering of large message histories.

Use virtualization where appropriate.

────────────────────────────────────────

MESSAGE COMPOSER

Complete the composer.

Support:

• Rich message composition where appropriate
• Emoji picker
• Mentions
• Reply mode
• Attachment picker
• Drag and drop
• Paste handling
• Voice-message preparation where browser capabilities permit
• Draft persistence
• Character limits
• Keyboard shortcuts
• Send state
• Retry state
• Upload state

The composer must behave correctly during:

• Offline mode
• Reconnection
• Slow uploads
• Failed requests
• WebSocket interruptions

────────────────────────────────────────

MESSAGE SYNCHRONIZATION

Integrate the frontend with backend synchronization.

Support:

• Initial conversation synchronization
• Incremental synchronization
• Delta updates
• Synchronization cursors
• Missed events
• Reconnection
• Message reconciliation
• Duplicate prevention
• Delivery-state reconciliation
• Read-state reconciliation

The frontend must not assume every WebSocket event arrives exactly once.

────────────────────────────────────────

OPTIMISTIC MESSAGE STATE

Implement:

• Temporary message IDs
• Pending messages
• Server reconciliation
• Failed messages
• Retry
• Duplicate prevention
• Ordering correction

Ensure optimistic state does not permanently diverge from server state.

────────────────────────────────────────

GROUP EXPERIENCE

Complete group interfaces.

Support:

• Group creation
• Group details
• Group avatar
• Group description
• Group settings
• Member management
• Member roles
• Add members
• Remove members
• Leave group
• Admin controls
• Group permissions
• Group notifications
• Group media

Conditionally display actions based on backend authorization.

Frontend visibility must never replace backend authorization.

────────────────────────────────────────

COMMUNITY EXPERIENCE

Implement:

• Community list
• Community overview
• Community groups
• Community channels where appropriate
• Community membership
• Community administrators
• Community settings
• Community announcements
• Community notifications

Provide clear navigation between:

• Direct conversations
• Groups
• Communities
• Channels

────────────────────────────────────────

STORIES / STATUS EXPERIENCE

Implement:

• Stories tray
• Story creation
• Story composer
• Text story
• Image story
• Video story
• Story viewer
• Story navigation
• Viewer list where authorized
• Story reactions where supported
• Story deletion
• Story privacy settings
• Expiration states

Support efficient story media loading.

Do not request content the backend does not authorize.

────────────────────────────────────────

MEDIA EXPERIENCE

Complete media interfaces for:

• Images
• Videos
• Audio
• Voice messages
• Documents
• Stickers
• GIFs
• Thumbnails

Implement:

• Upload progress
• Upload cancellation
• Upload retry
• Preview
• Media validation feedback
• Failed uploads
• Download states
• Media viewer
• Image zoom
• Video controls
• Audio controls
• Document preview where supported

Use direct object-storage upload contracts where provided by the backend.

────────────────────────────────────────

MEDIA VIEWER

Implement a production media viewer supporting:

• Images
• Videos
• Audio
• Documents where supported
• Gallery navigation
• Zoom
• Fullscreen
• Download where authorized
• Loading states
• Failure states
• Keyboard controls
• Accessible controls

Ensure private media does not become permanently exposed through frontend state.

────────────────────────────────────────

NOTIFICATION EXPERIENCE

Complete:

• Notification center
• Unread counts
• Notification grouping
• Notification preferences
• Security notifications
• Message notifications
• Call notifications
• Group notifications
• Community notifications
• Business notifications

Support:

• Read/unread
• Navigation to related resources
• Loading states
• Empty states
• Error states

────────────────────────────────────────

SEARCH EXPERIENCE

Complete search for:

• Users
• Contacts
• Groups
• Communities
• Conversations
• Business accounts
• Messages where permitted

Support:

• Instant search
• Autocomplete
• Search suggestions
• Recent searches
• Search history management
• Filters
• Result grouping
• Loading states
• Empty states
• Error states
• Keyboard navigation

Do not display search results the backend has not authorized.

────────────────────────────────────────

CALL EXPERIENCE

Implement production-ready call interfaces.

Support:

• Incoming call screen
• Outgoing call screen
• Ringing
• Connecting
• Active call
• Reconnecting
• Call failure
• Call ended
• Missed call

Voice:

• Microphone control
• Speaker/device selection
• Mute
• End call

Video:

• Camera toggle
• Camera preview
• Participant video
• Video layout
• Screen layout
• End call

Group calls:

• Participant grid
• Active speaker
• Participant states
• Call controls
• Reconnection states

Use the established WebRTC/signaling architecture.

Do not implement a parallel signaling protocol.

────────────────────────────────────────

CALL QUALITY UI

Reflect backend/client call state where appropriate.

Support graceful UI for:

• Poor network
• Reconnecting
• Microphone unavailable
• Camera unavailable
• Permission denied
• Device unavailable
• Connection failure

Do not expose sensitive diagnostics unnecessarily.

────────────────────────────────────────

DEVICE MANAGEMENT

Complete the device-management experience.

Support:

• Device list
• Device details
• Device platform
• Last activity
• Device naming
• Remote logout
• Device revocation
• Security alerts

Protect sensitive device information.

────────────────────────────────────────

PRIVACY SETTINGS

Complete privacy controls.

Support UI for:

• Last seen
• Online status
• Profile visibility
• Read receipts
• Group invitations
• Contact discovery
• Blocking
• Story privacy
• Notification privacy

Use backend-provided state as the source of truth.

────────────────────────────────────────

SECURITY SETTINGS

Implement:

• Password change
• Password reset
• MFA settings where supported
• Passkey management where supported
• Active sessions
• Devices
• Security notifications
• Account recovery

Provide strong confirmation flows for sensitive actions.

────────────────────────────────────────

OFFLINE EXPERIENCE

Complete browser offline handling.

Support:

• Offline indicator
• Pending messages
• Reconnection state
• Retry controls
• Cached conversations where appropriate
• Synchronization progress
• Network error recovery

Do not claim capabilities that browser APIs cannot reliably provide.

────────────────────────────────────────

REAL-TIME RESILIENCE

Implement robust WebSocket behavior.

Support:

• Automatic reconnection
• Exponential backoff
• Connection state
• Event replay/reconciliation
• Duplicate-event handling
• Missed-event synchronization
• Clean disconnect
• Authentication renewal

The UI must remain functional during temporary WebSocket outages.

────────────────────────────────────────

BUSINESS ACCOUNT EXPERIENCE

Implement frontend foundations for:

• Business profiles
• Business information
• Business hours
• Business users
• Business roles
• Business permissions
• Business conversations
• Business catalog foundations
• Automated-response configuration where supported

Keep business interfaces isolated from consumer account UI where appropriate.

────────────────────────────────────────

ADMINISTRATION EXPERIENCE

Implement administration frontend foundations.

Support:

• User management
• Account management
• Device investigation
• Group investigation
• Business management
• Reports
• Moderation
• Feature flags
• System settings
• Audit logs

Administrative routes must have frontend protections while relying on backend authorization as the final security boundary.

────────────────────────────────────────

MODERATION EXPERIENCE

Implement:

• Report queues
• Report details
• Moderation cases
• Case status
• Evidence references where permitted
• Administrative actions
• Appeals
• Audit history

Respect E2EE limitations.

Do not expose protected message content that the backend does not provide.

────────────────────────────────────────

FEATURE FLAGS

Integrate the frontend feature-flag system.

Support:

• Global flags
• Percentage rollout
• User targeting
• Region targeting
• Platform targeting
• Kill switches
• Experiments where appropriate

Sensitive flags must be evaluated server-side.

Frontend flags must not be treated as security controls.

────────────────────────────────────────

INTERNATIONALIZATION

Implement frontend localization architecture supporting:

• Multiple languages
• Locale detection
• Locale persistence
• Date formatting
• Time formatting
• Number formatting
• Relative timestamps
• RTL layouts
• Localized notifications
• Accessibility-friendly translations

Do not hard-code user-visible strings throughout feature modules.

────────────────────────────────────────

ACCESSIBILITY

Complete accessibility support targeting WCAG 2.2 AA.

Implement:

• Keyboard navigation
• Screen-reader support
• ARIA
• Focus management
• Focus restoration
• Accessible dialogs
• Accessible context menus
• Accessible message actions
• Accessible call controls
• Reduced motion
• High contrast
• Sufficient color contrast

Test accessibility continuously.

────────────────────────────────────────

RESPONSIVE DESIGN

Optimize for:

• Desktop
• Tablet
• Mobile browser
• Narrow windows
• Large displays

Ensure the core messaging experience remains usable across supported viewport sizes.

────────────────────────────────────────

PERFORMANCE

Optimize:

• Message virtualization
• Conversation virtualization
• Lazy loading
• Code splitting
• Dynamic imports
• Image optimization
• Media loading
• Query caching
• Prefetching
• Memoization
• Event batching
• WebSocket processing
• Rendering performance

Avoid unnecessary client-side state duplication.

────────────────────────────────────────

ERROR HANDLING

Provide UI for:

• Authentication errors
• Authorization errors
• Network errors
• WebSocket errors
• Upload failures
• Call failures
• Search failures
• Synchronization failures
• Server errors
• Offline state

Provide recovery actions where appropriate.

────────────────────────────────────────

STATE MANAGEMENT

Use TanStack Query for server state.

Use Zustand for client-owned state.

Maintain clear boundaries.

Do not duplicate the same server state in multiple independent stores.

Synchronize:

• Messages
• Conversations
• Notifications
• Groups
• Communities
• Stories
• Devices
• Search
• Calls

through appropriate query/cache mechanisms.

────────────────────────────────────────

API CLIENT

Complete the typed API client.

Support:

• Authentication
• Requests
• Responses
• Error normalization
• Request cancellation
• Retry
• Pagination
• Cursor pagination
• File uploads
• Download authorization
• Request correlation IDs

────────────────────────────────────────

WEBSOCKET CLIENT

Complete the WebSocket client architecture.

Support:

• Authentication
• Connection state
• Reconnection
• Subscriptions
• Message events
• Delivery events
• Read events
• Presence
• Typing
• Group events
• Community events
• Notification events
• Call signaling

Ensure cleanup of subscriptions to prevent memory leaks.

────────────────────────────────────────

THEMING

Complete:

• Light theme
• Dark theme
• System theme
• Theme persistence
• Accessible contrast
• Reduced motion

Use centralized design tokens.

────────────────────────────────────────

ANIMATION

Use Framer Motion where it improves UX.

Support:

• Page transitions
• Conversation transitions
• Drawers
• Dialogs
• Message interactions
• Story transitions
• Notifications
• Micro-interactions

Animations must respect reduced-motion preferences.

Do not animate excessively.

────────────────────────────────────────

TESTING

Generate comprehensive frontend tests.

UNIT TESTS

• Utilities
• State logic
• Validation
• Formatting
• Feature-flag behavior

COMPONENT TESTS

• Message components
• Composer
• Conversation list
• Group controls
• Story viewer
• Notifications
• Search
• Call controls
• Settings

INTEGRATION TESTS

• Authentication
• API client
• TanStack Query
• WebSocket client
• Media upload
• Synchronization

END-TO-END TESTS

• Registration
• Login
• Messaging
• Reactions
• Replies
• Editing
• Deletion
• Groups
• Communities
• Media
• Stories
• Calls
• Search
• Notifications
• Device management
• Privacy settings

ACCESSIBILITY TESTS

• Keyboard navigation
• Focus management
• Dialogs
• Forms
• Navigation
• Screen-reader semantics

PERFORMANCE TESTS

• Large conversation lists
• Large message histories
• High-frequency WebSocket events
• Large media uploads
• Reconnection
• Rendering performance

────────────────────────────────────────

DOCUMENTATION

Generate:

• Frontend architecture documentation
• Feature documentation
• Component documentation
• Design system documentation
• API usage documentation
• WebSocket usage documentation
• State management standards
• Accessibility standards
• Responsive design standards
• Testing standards
• Performance standards
• Internationalization standards

────────────────────────────────────────

PROJECT INDEX

Update the frontend Project Index with:

• Completed features
• Generated pages
• Generated layouts
• Components
• Hooks
• Stores
• Query integrations
• API integrations
• WebSocket integrations
• Media integrations
• Call integrations
• Tests
• Dependencies
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

Implement incrementally.

FRONTEND MILESTONE 1

Advanced messaging, message actions, synchronization, and reconciliation.

FRONTEND MILESTONE 2

Groups, communities, and membership management.

FRONTEND MILESTONE 3

Media, stories/status, and notification experience.

FRONTEND MILESTONE 4

Search, device management, privacy, and security settings.

FRONTEND MILESTONE 5

Voice calls, video calls, group calls, and WebRTC integration.

FRONTEND MILESTONE 6

Business accounts, administration, moderation, and feature flags.

FRONTEND MILESTONE 7

Internationalization, accessibility, offline behavior, and responsive hardening.

FRONTEND MILESTONE 8

Performance optimization, automated testing, security testing, and production readiness.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must compile before proceeding.

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never truncate code.

Never summarize code instead of generating it.

Never generate pseudo-code.

Never generate placeholder files.

Never generate TODO implementations.

When modifying an existing file:

1. Provide the exact file path.
2. Explain why it must change.
3. Provide the complete updated file.

Never regenerate unchanged files.

────────────────────────────────────────

SCOPE RESTRICTION

This volume completes the remaining web frontend.

Do not implement:

• Backend code
• Mobile code
• Kubernetes
• Terraform
• CI/CD infrastructure

Consume the established backend contracts exactly.

Do not redesign APIs or database structures.

────────────────────────────────────────

QUALITY BAR

Treat the frontend as a globally used production communication application.

Assume:

• Large conversation histories
• High-frequency real-time events
• Multiple active devices
• Unreliable networks
• Large media
• High notification volume
• Voice/video calls
• Strict accessibility requirements
• Strong privacy requirements
• Strict security requirements

Prioritize:

• Performance
• Accessibility
• Security
• Correct state synchronization
• Real-time responsiveness
• Resilience
• Maintainability
• Excellent user experience
• Production readiness
