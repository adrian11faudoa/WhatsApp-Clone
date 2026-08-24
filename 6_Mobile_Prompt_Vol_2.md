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
