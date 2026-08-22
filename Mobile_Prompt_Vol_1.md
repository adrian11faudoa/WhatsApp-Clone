You are operating in Senior Engineering Team Mode.

Build the production-ready mobile application foundation for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The mobile application must consume the established backend API, WebSocket, authentication, authorization, synchronization, notification, media, and call contracts.

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

Build the production-ready React Native mobile application foundation for:

• Android
• iOS

The application must support:

• Authentication
• Account management
• Profiles
• Contacts
• Conversations
• Real-time messaging
• Offline messaging
• Message synchronization
• Multi-device synchronization
• Push notifications
• Presence
• Groups
• Communities
• Media sharing
• Voice messages
• Stories/status
• Voice calls
• Video calls
• Device management
• Privacy settings
• Security settings

The mobile application must be:

• Performant
• Secure
• Accessible
• Offline-capable
• Reliable on unreliable networks
• Battery-conscious
• Maintainable
• Scalable
• Production-ready

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

Push Notifications:

• Firebase Cloud Messaging
• Apple Push Notification Service through the approved notification abstraction

Local Persistence:

• SQLite or approved persistent local database

Background Processing:

• Expo-compatible background tasks
• Platform-specific background capabilities where required

Media:

• Expo image/media APIs
• Approved native modules where required

Calls:

• WebRTC-compatible React Native implementation

────────────────────────────────────────

MOBILE ARCHITECTURE

Use:

• Feature-first organization
• Strict TypeScript
• Reusable components
• Clean Architecture principles where appropriate
• Separation of UI and business logic
• Explicit synchronization boundaries
• Dependency inversion where useful

Do not put business logic directly inside screen components.

Do not duplicate backend authorization logic.

Do not assume permanent network connectivity.

────────────────────────────────────────

APPLICATION STRUCTURE

Organize the application around:

• Authentication
• Onboarding
• Conversations
• Messaging
• Contacts
• Groups
• Communities
• Presence
• Media
• Stories
• Notifications
• Calls
• Devices
• Privacy
• Security
• Settings

Shared infrastructure must include:

• API client
• WebSocket client
• Authentication
• Local database
• Synchronization engine
• Push notifications
• Secure storage
• Background tasks
• Connectivity detection
• Error handling
• Logging
• Analytics interfaces

────────────────────────────────────────

FOLDER STRUCTURE

Create a scalable mobile structure including appropriate areas for:

app/

src/

features/

components/

navigation/

screens/

hooks/

providers/

services/

stores/

database/

sync/

notifications/

storage/

media/

calls/

lib/

config/

types/

utils/

assets/

tests/

Keep features isolated.

Do not create unnecessary abstraction layers.

────────────────────────────────────────

EXPO FOUNDATION

Implement:

• Expo configuration
• Application entry point
• Environment configuration
• App metadata
• App versioning
• Platform configuration
• Development configuration
• Production configuration

Support:

• Android
• iOS

Define platform-specific configuration only where required.

────────────────────────────────────────

NAVIGATION

Implement React Navigation architecture.

Support:

• Authentication stack
• Onboarding
• Main application navigation
• Conversation navigation
• Group navigation
• Community navigation
• Story navigation
• Call navigation
• Settings
• Devices
• Privacy
• Security

Support:

• Deep linking
• Authenticated navigation
• Protected screens
• Nested navigation
• Modal screens where appropriate
• Call overlays where appropriate

Never rely only on frontend navigation for authorization.

────────────────────────────────────────

AUTHENTICATION

Implement mobile authentication flows.

Support:

• Registration
• Login
• Logout
• Verification
• Password reset
• Password change
• Session restoration
• Session expiration
• Refresh
• Device registration

Use secure storage for sensitive authentication state.

Do not store tokens in plain AsyncStorage or equivalent insecure storage.

────────────────────────────────────────

SECURE STORAGE

Implement secure storage for:

• Authentication credentials/tokens
• Device identifiers where appropriate
• Encryption-related metadata where applicable
• Security settings

Separate:

• Secure secrets
• Cached application data
• Non-sensitive preferences

Do not store sensitive secrets in normal application storage.

────────────────────────────────────────

DEVICE REGISTRATION

Implement:

• Device registration
• Device identification
• Device capabilities
• Push token association
• Device name
• Device metadata
• Device revocation handling
• Remote logout

Send only necessary device information to the backend.

────────────────────────────────────────

LOCAL DATABASE

Implement a persistent local database for mobile synchronization.

Store appropriate local data such as:

• Conversations
• Messages
• Message states
• Drafts
• Contacts/cache where appropriate
• Synchronization cursors
• Pending outgoing operations
• Notification state
• Local preferences

Define:

• Schema version
• Migrations
• Indexes
• Transactions
• Cleanup
• Retention

The local database must never replace the server as the authoritative source.

────────────────────────────────────────

OFFLINE-FIRST ARCHITECTURE

Implement offline support.

Support:

• Offline conversation viewing
• Offline message composition
• Pending outgoing messages
• Local message queue
• Retry
• Reconciliation
• Conflict handling
• Synchronization after reconnect
• Duplicate prevention

Display clear message states:

• Pending
• Sending
• Sent
• Delivered
• Read
• Failed

Do not silently lose locally composed messages.

────────────────────────────────────────

SYNCHRONIZATION ENGINE

Implement the mobile synchronization layer.

Support:

• Initial sync
• Incremental sync
• Delta synchronization
• Synchronization cursors
• Missed-event recovery
• Message reconciliation
• Conversation reconciliation
• Delivery-state synchronization
• Read-state synchronization
• Multi-device reconciliation

Define:

• Sync batches
• Cursor storage
• Retry behavior
• Backoff
• Deduplication
• Conflict handling
• Recovery

The client must not assume WebSocket events are received exactly once.

────────────────────────────────────────

NETWORK CONNECTIVITY

Implement connectivity detection.

Handle:

• Online
• Offline
• Weak connection
• Connection restoration
• Wi-Fi/cellular changes

When connectivity changes:

• Pause or defer unsuitable operations
• Retry appropriate operations
• Trigger synchronization
• Reconnect WebSockets
• Resume pending uploads

Avoid aggressive retry loops that consume battery and bandwidth.

────────────────────────────────────────

API CLIENT

Implement a typed API client.

Support:

• Authentication
• Request IDs
• Correlation IDs
• Error normalization
• Retry
• Timeout
• Cancellation
• Pagination
• Cursor pagination
• File uploads
• Download authorization

The client must integrate with TanStack Query.

────────────────────────────────────────

WEBSOCKET CLIENT

Implement mobile WebSocket infrastructure.

Support:

• Authentication
• Connection lifecycle
• Reconnection
• Heartbeats
• Backoff
• Network awareness
• Event subscriptions
• Event acknowledgments
• Duplicate handling
• Missed-event synchronization

Support real-time events for:

• Messages
• Delivery receipts
• Read receipts
• Reactions
• Typing
• Presence
• Groups
• Communities
• Notifications
• Calls

Do not keep unnecessary WebSocket connections active when the platform does not permit them.

────────────────────────────────────────

STATE MANAGEMENT

Use Zustand for client-owned state.

Use TanStack Query for server state.

Use the local database for durable offline state.

Maintain clear boundaries between:

• UI state
• Server state
• Persistent local state
• Synchronization state
• Secure state

Do not duplicate the same state unnecessarily across systems.

────────────────────────────────────────

CONVERSATION EXPERIENCE

Implement:

• Conversation list
• Active conversation
• Unread counts
• Last message preview
• Timestamps
• Muting
• Archive where supported
• Conversation settings
• Search within conversation

Optimize large conversation lists.

Use efficient list virtualization.

────────────────────────────────────────

MESSAGING EXPERIENCE

Implement:

• Text messages
• Replies
• Reactions
• Mentions
• Forwarding
• Editing
• Deletion
• Attachments
• Voice messages
• Documents

Support:

• Optimistic messages
• Pending state
• Retry
• Failure
• Server reconciliation
• Delivery states
• Read states

────────────────────────────────────────

MESSAGE COMPOSER

Implement:

• Text input
• Emoji
• Reply mode
• Mention selection
• Attachment selection
• Draft persistence
• Send
• Retry
• Cancel
• Message length validation

Handle:

• Keyboard behavior
• Safe areas
• Orientation changes where appropriate
• Offline operation
• Slow networks

────────────────────────────────────────

MESSAGE LIST PERFORMANCE

Optimize:

• Virtualized rendering
• Pagination
• Incremental loading
• Message grouping
• Image loading
• Media previews
• Re-render prevention

Support very long conversations without excessive memory consumption.

────────────────────────────────────────

PRESENCE AND TYPING

Display:

• Online
• Offline
• Last seen where permitted
• Typing
• Recording where applicable

Respect backend privacy rules.

Do not expose presence when access is denied.

────────────────────────────────────────

CONTACTS

Implement:

• Contact list
• Contact search
• Contact discovery
• Contact profile
• Block
• Unblock
• Invite flows where appropriate

Respect backend privacy and authorization.

────────────────────────────────────────

GROUPS

Implement:

• Group creation
• Group details
• Members
• Roles
• Add members
• Remove members
• Group settings
• Group avatar
• Group description
• Leave group
• Administrative actions

Only display controls permitted by the backend authorization model.

────────────────────────────────────────

COMMUNITIES

Implement:

• Community list
• Community details
• Community groups
• Community channels where appropriate
• Membership
• Announcements
• Community settings

Maintain clear navigation between direct conversations, groups, and communities.

────────────────────────────────────────

MEDIA

Implement mobile media workflows for:

• Images
• Videos
• Audio
• Voice messages
• Documents
• Stickers
• GIFs

Support:

• Camera
• Photo library
• File selection
• Preview
• Compression
• Upload progress
• Cancellation
• Retry
• Download
• Local caching

Use backend-issued upload authorization.

Do not route large files through unnecessary application servers.

────────────────────────────────────────

VOICE MESSAGES

Implement:

• Recording
• Permission handling
• Recording indicator
• Cancel
• Preview where appropriate
• Upload
• Retry
• Playback
• Progress
• Pause/resume where supported

Handle:

• Microphone permissions
• Interruptions
• Background transitions
• Storage limitations

────────────────────────────────────────

STORIES / STATUS

Implement:

• Story list
• Story viewer
• Story creation
• Text story
• Image story
• Video story
• Viewer list where authorized
• Story privacy
• Story deletion
• Expiration

Use efficient media loading.

────────────────────────────────────────

PUSH NOTIFICATIONS

Implement mobile push notification support.

Support:

• FCM
• APNS
• Device token registration
• Token refresh
• Notification permissions
• Notification handling
• Deep linking
• Notification categories
• Badge counts

Handle notifications when:

• App is foreground
• App is background
• App is terminated

Respect notification privacy.

────────────────────────────────────────

BACKGROUND TASKS

Implement appropriate background capabilities for:

• Synchronization
• Notification processing
• Upload completion
• Cleanup
• Refresh

Respect iOS and Android background execution constraints.

Do not assume unlimited background execution.

────────────────────────────────────────

DEEP LINKING

Implement deep links for:

• Conversations
• User profiles
• Groups
• Communities
• Stories
• Calls
• Notifications
• Authentication flows

Validate deep-link authorization server-side.

────────────────────────────────────────

CALL FOUNDATION

Implement mobile call UI and WebRTC integration boundaries.

Support:

• Incoming calls
• Outgoing calls
• Ringing
• Connecting
• Active call
• Reconnecting
• Ended call
• Failed call

Voice:

• Microphone
• Speaker
• Bluetooth where supported
• Mute

Video:

• Camera
• Front/back camera
• Video preview
• Participant display
• Camera permissions

Group:

• Participant grid
• Active speaker
• Participant states

Use the established backend signaling architecture.

────────────────────────────────────────

MOBILE PERMISSIONS

Implement proper permission flows for:

• Camera
• Microphone
• Notifications
• Photos/media
• File access where required
• Contacts where applicable

Request permissions contextually.

Handle:

• Denied
• Restricted
• Permanently denied
• Re-enable in settings

Never assume permissions are granted.

────────────────────────────────────────

PRIVACY

Implement mobile interfaces for:

• Last seen
• Online status
• Profile visibility
• Read receipts
• Contact discovery
• Group invitations
• Story privacy
• Blocking
• Notification privacy

Use backend state as the source of truth.

────────────────────────────────────────

SECURITY

Implement:

• Secure token storage
• Secure device registration
• App lock architecture where appropriate
• Secure deep links
• Safe URL handling
• Sensitive-data protection
• Secure local database strategy
• Screenshot/privacy boundaries where appropriate
• Certificate/security hardening where justified

Do not store secrets in plaintext.

────────────────────────────────────────

ACCESSIBILITY

Support:

• Screen readers
• Dynamic font sizes
• VoiceOver
• TalkBack
• Accessible labels
• Accessible navigation
• Focus management
• Sufficient contrast
• Reduced motion
• Touch target requirements

Do not rely only on color to communicate state.

────────────────────────────────────────

PERFORMANCE

Optimize:

• FlatList/FlashList or equivalent virtualization
• Memory usage
• Image caching
• Media caching
• Database queries
• WebSocket processing
• Synchronization batches
• Re-render frequency
• Startup time
• Navigation performance

Avoid unnecessary background processing.

────────────────────────────────────────

BATTERY AND DATA USAGE

Optimize:

• WebSocket reconnects
• Presence updates
• Background synchronization
• Push notifications
• Media downloads
• Uploads
• Polling

Prefer push/event-driven behavior over continuous polling.

Support cellular-data-conscious behavior where appropriate.

────────────────────────────────────────

ERROR HANDLING

Provide UI and recovery behavior for:

• Authentication failures
• Network failures
• Synchronization failures
• Upload failures
• Download failures
• WebSocket failures
• Call failures
• Permission failures
• Storage failures

Never silently discard user-created messages.

────────────────────────────────────────

TESTING

Generate:

UNIT TESTS

• Synchronization logic
• Message state transitions
• Offline queue
• Validation
• Utility functions

COMPONENT TESTS

• Messaging
• Composer
• Conversation list
• Stories
• Notifications
• Groups
• Calls
• Settings

INTEGRATION TESTS

• Local database
• API client
• WebSocket client
• Synchronization
• Push notifications

END-TO-END TESTS

• Registration
• Login
• Device registration
• Messaging
• Offline messaging
• Synchronization
• Groups
• Communities
• Media
• Stories
• Push notifications
• Calls

PERFORMANCE TESTS

• Large conversation histories
• Large message lists
• High event frequency
• Media operations
• Synchronization
• App startup

SECURITY TESTS

• Secure storage
• Authentication
• Deep links
• Permission boundaries
• Unauthorized resource access

────────────────────────────────────────

DOCUMENTATION

Generate:

• Mobile architecture
• Navigation architecture
• Local database architecture
• Synchronization architecture
• Offline strategy
• Push notification strategy
• Background-task strategy
• Deep-link strategy
• Secure-storage strategy
• Media strategy
• Call integration strategy
• Testing standards
• Accessibility standards
• Performance standards

────────────────────────────────────────

PROJECT INDEX

Maintain the mobile Project Index.

Track:

• Screens
• Navigation
• Components
• Stores
• Queries
• API integrations
• WebSocket integrations
• Local database models
• Synchronization modules
• Push notification modules
• Background tasks
• Media modules
• Call modules
• Tests
• Generated files
• Dependencies
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

MOBILE MILESTONE 1

Expo foundation, configuration, navigation, theme, API client, secure storage, error handling, and local database foundation.

MOBILE MILESTONE 2

Authentication, onboarding, account, profile, sessions, and device registration.

MOBILE MILESTONE 3

Conversation list, messaging, composer, local message persistence, and offline queues.

MOBILE MILESTONE 4

WebSockets, synchronization, delivery states, read states, presence, and typing.

MOBILE MILESTONE 5

Contacts, blocking, groups, and communities.

MOBILE MILESTONE 6

Media, voice messages, stories, and push notifications.

MOBILE MILESTONE 7

Voice/video calls and WebRTC integration.

MOBILE MILESTONE 8

Privacy, security, deep linking, background tasks, and device management.

MOBILE MILESTONE 9

Accessibility, performance, battery/data optimization, testing, and production hardening.

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

This volume covers the mobile application foundation and core communication experience.

Do not implement:

• Backend services
• Web frontend
• Kubernetes
• Terraform
• CI/CD infrastructure

Consume the established backend contracts exactly.

────────────────────────────────────────

QUALITY BAR

Treat the mobile application as a globally deployed production communication platform.

Assume:

• Large conversation histories
• Unreliable networks
• Background execution limitations
• Multiple devices
• High message volume
• Push notification traffic
• Large media
• Voice/video calls
• Strict privacy requirements
• Strict security requirements
• Android and iOS production deployment

Prioritize:

• Reliability
• Offline correctness
• Synchronization correctness
• Performance
• Battery efficiency
• Security
• Accessibility
• Maintainability
• Excellent mobile UX
• Production readiness
