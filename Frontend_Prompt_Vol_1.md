You are operating in Senior Engineering Team Mode.

Build the production-ready web frontend foundation for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The frontend must consume the established backend API, WebSocket, authentication, authorization, media, notification, and synchronization contracts defined for the project.

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

Build the production-ready web application foundation for the global real-time communication platform.

The web application must support:

• User authentication
• User onboarding
• Profiles
• Contacts
• Conversations
• Real-time messaging
• Message history
• Message delivery states
• Read receipts
• Typing indicators
• Presence
• Groups
• Communities
• Media sharing
• Stories/status
• Notifications
• Search
• Voice/video call interfaces
• Device/session management
• Privacy settings
• Security settings

The web application must be:

• Fast
• Responsive
• Accessible
• Secure
• Real-time capable
• Maintainable
• Scalable
• Production-ready

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

State Management:

• Zustand

Server State:

• TanStack Query

Forms:

• React Hook Form
• Zod

Real-Time:

• WebSocket
• Socket.IO client where appropriate

Validation:

• Zod

Utilities:

• date-fns

Icons:

• Lucide React

Animation:

• Framer Motion

Testing:

• Jest
• React Testing Library
• Playwright
• Accessibility testing tools where appropriate

────────────────────────────────────────

FRONTEND ARCHITECTURE

Use:

• Feature-first architecture
• Strict TypeScript
• Reusable components
• Separation of presentation and business logic
• Clean Architecture principles where appropriate
• Domain-oriented feature modules
• Dependency inversion where useful

Do not place business logic directly inside presentation components.

Do not duplicate backend business rules unnecessarily.

The frontend must consume backend contracts instead of recreating server-side authorization logic.

────────────────────────────────────────

APPLICATION STRUCTURE

Build the web application around:

• Authentication
• Conversations
• Messaging
• Contacts
• Groups
• Communities
• Presence
• Media
• Stories
• Notifications
• Search
• Calls
• Settings
• Privacy
• Security
• Device management

Provide reusable shared infrastructure for:

• API client
• WebSocket client
• Authentication state
• Query management
• Error handling
• Notifications
• Theme
• Internationalization
• Accessibility

────────────────────────────────────────

FOLDER STRUCTURE

Create a scalable feature-first structure including appropriate areas for:

app/

features/

components/

layouts/

hooks/

providers/

services/

stores/

lib/

styles/

types/

utils/

config/

public/

tests/

Use Next.js App Router.

Keep domain features isolated.

Do not create unnecessary abstraction layers.

────────────────────────────────────────

NEXT.JS ARCHITECTURE

Implement:

• App Router
• Layouts
• Route groups
• Loading states
• Error boundaries
• Not-found pages
• Suspense boundaries
• Server Components where appropriate
• Client Components only where required
• Middleware where appropriate
• Metadata
• SEO foundations for public pages

Do not turn the entire application into Client Components.

Use Server Components for suitable static/server-rendered areas.

Use Client Components for interactive and real-time functionality.

────────────────────────────────────────

AUTHENTICATION UI

Implement interfaces for:

• Registration
• Login
• Logout
• Verification
• Password reset
• Password change
• Session management
• Device management
• Suspicious-login handling

Support secure authentication flows according to the backend contracts.

Do not expose tokens unnecessarily to JavaScript.

Follow the approved authentication architecture.

────────────────────────────────────────

AUTHENTICATION STATE

Implement a centralized authentication state.

Track:

• Authenticated user
• Account state
• Active session
• Device state
• Loading state
• Authentication errors

Support:

• Initial session restoration
• Logout
• Session expiration
• Authentication failure
• Refresh handling
• Protected route behavior

────────────────────────────────────────

API CLIENT

Implement a typed API client.

Support:

• Base URL configuration
• Request headers
• Authentication
• Request IDs
• Correlation IDs
• Error handling
• Retry where appropriate
• Cancellation
• Timeouts
• Pagination
• Cursor pagination
• File uploads

Do not duplicate server-side business logic.

Generate typed request and response models based on backend contracts.

────────────────────────────────────────

WEBSOCKET CLIENT

Implement the web real-time client.

Support:

• Connection
• Authentication
• Reconnection
• Heartbeats
• Connection state
• Event subscription
• Event unsubscription
• Event acknowledgment
• Error handling
• Backoff
• Offline/online transitions

Support real-time events for:

• Messages
• Delivery receipts
• Read receipts
• Typing
• Presence
• Reactions
• Conversation changes
• Group changes
• Community updates
• Call signaling
• Notifications

Do not assume a WebSocket connection is permanently available.

────────────────────────────────────────

SERVER STATE

Implement TanStack Query.

Support:

• Query caching
• Infinite queries
• Cursor pagination
• Background refetching
• Cache invalidation
• Optimistic updates
• Retry
• Error handling
• Request cancellation

Use query keys consistently.

Do not duplicate server state into unnecessary Zustand stores.

────────────────────────────────────────

CLIENT STATE

Use Zustand for genuinely client-owned state.

Create appropriate stores for:

• Authentication UI state
• Conversation UI state
• Message composition state
• Active conversation
• UI preferences
• Theme
• Search state
• Notification state
• Call UI state
• Device/UI settings

Do not use Zustand as a replacement for TanStack Query server state.

────────────────────────────────────────

ROUTING

Implement routing for:

Public:

• Landing
• Login
• Registration
• Verification
• Password reset

Authenticated:

• Inbox
• Conversations
• Contacts
• Groups
• Communities
• Stories
• Calls
• Search
• Settings
• Devices
• Privacy
• Security
• Notifications

Administrative routes where applicable:

• Administration
• Moderation

Implement route protection based on authenticated session and backend authorization.

Frontend route protection must never replace backend authorization.

────────────────────────────────────────

LAYOUT ARCHITECTURE

Design responsive layouts for:

• Desktop
• Tablet
• Narrow browser windows

Support:

• Sidebar
• Conversation list
• Active conversation
• Details panel where appropriate
• Modal/drawer layouts
• Mobile-width responsive behavior

Ensure navigation remains usable at different viewport sizes.

────────────────────────────────────────

DESIGN SYSTEM

Implement reusable components using shadcn/ui and the project's design tokens.

Include:

• Button
• Input
• Textarea
• Select
• Checkbox
• Radio
• Switch
• Dialog
• Drawer
• Dropdown
• Popover
• Tooltip
• Tabs
• Accordion
• Avatar
• Badge
• Card
• Table
• Pagination
• Skeleton
• Alert
• Toast
• Progress
• Context menu
• Command palette
• Empty state
• Error state
• Loading state

All reusable components must be accessible.

────────────────────────────────────────

THEMING

Support:

• Light theme
• Dark theme
• System theme
• Theme persistence

Respect:

• Reduced motion
• High contrast
• Browser preferences

Use CSS variables for theme tokens.

────────────────────────────────────────

ACCESSIBILITY

Target WCAG 2.2 AA.

Implement:

• Semantic HTML
• Keyboard navigation
• Focus management
• Screen-reader support
• ARIA labels
• Accessible dialogs
• Accessible menus
• Accessible notifications
• Focus restoration
• Reduced motion
• Color contrast
• Visible focus states

Never rely solely on color to communicate state.

────────────────────────────────────────

RESPONSIVE DESIGN

Support:

• Desktop
• Tablet
• Mobile browser widths
• Narrow displays
• Large displays

The messaging experience must remain usable at all supported sizes.

────────────────────────────────────────

CONVERSATIONS UI

Implement the foundation for:

• Conversation list
• Active conversation
• Conversation header
• Participant information
• Search within conversations
• Conversation settings
• Conversation actions
• Unread counts
• Last-message previews
• Timestamps
• Presence state

Support large conversation lists efficiently.

Use virtualization where appropriate.

────────────────────────────────────────

MESSAGING UI

Implement:

• Message list
• Message bubble
• Incoming/outgoing states
• Sending state
• Sent state
• Delivered state
• Read state
• Failed state
• Message timestamps
• Reply preview
• Mention presentation
• Reaction presentation
• Edited indicator
• Deleted-message state
• Context actions

Support long conversations with virtualization.

────────────────────────────────────────

MESSAGE COMPOSER

Implement the message composer foundation.

Support:

• Text input
• Emoji
• Reply mode
• Mention selection
• Attachment selection
• Send
• Retry failed message
• Cancel reply
• Draft state

Handle:

• Empty messages
• Maximum length
• Network failures
• Sending state
• Keyboard shortcuts

────────────────────────────────────────

OPTIMISTIC MESSAGING

Implement appropriate optimistic behavior.

Support:

• Temporary client message IDs
• Pending states
• Retry
• Failure states
• Server reconciliation
• Duplicate prevention

Do not allow optimistic UI to permanently diverge from backend state.

────────────────────────────────────────

PRESENCE AND TYPING

Display:

• Online
• Offline
• Last seen where permitted
• Typing
• Recording where applicable

Respect backend privacy settings.

Do not expose presence when the backend denies access.

────────────────────────────────────────

CONTACTS UI

Implement:

• Contact list
• Contact search
• Contact profile
• Add/contact action
• Block
• Unblock
• Contact discovery
• Privacy-aware results

Do not expose backend data that the current user is not authorized to view.

────────────────────────────────────────

GROUP UI

Implement:

• Group creation
• Group details
• Member list
• Member roles
• Add members
• Remove members
• Group permissions
• Group settings
• Group avatar
• Group description
• Admin actions

Conditionally show controls based on server-provided authorization state.

────────────────────────────────────────

COMMUNITY UI

Implement foundation for:

• Community list
• Community details
• Community groups
• Community membership
• Community administration
• Community settings
• Announcements

Keep community navigation separate from direct conversation navigation where appropriate.

────────────────────────────────────────

MEDIA UI

Implement frontend support for:

• Image selection
• Video selection
• Audio selection
• Document selection
• Drag and drop
• Upload progress
• Preview
• Cancellation
• Retry
• Error states

Use backend-issued upload authorization.

Do not upload large media through application API routes when direct object-storage upload is supported.

────────────────────────────────────────

STORIES / STATUS UI

Implement:

• Story list
• Story viewer
• Story creation
• Story deletion
• Viewer list where authorized
• Story privacy
• Story expiration state

Support:

• Text
• Images
• Videos

────────────────────────────────────────

NOTIFICATIONS UI

Implement:

• Toasts
• In-app notification center
• Unread count
• Notification list
• Notification preferences
• Security notifications
• System notifications

Respect notification privacy.

────────────────────────────────────────

SEARCH UI

Implement search foundations for:

• Users
• Contacts
• Groups
• Communities
• Conversations
• Business accounts
• Messages where supported

Support:

• Search input
• Autocomplete
• Recent searches
• Results
• Loading
• Empty state
• Error state
• Keyboard navigation

Respect backend authorization and privacy.

────────────────────────────────────────

CALL UI

Implement interfaces for:

• Incoming call
• Outgoing call
• Ringing
• Connecting
• Active call
• Reconnecting
• Ended call
• Failed call
• Call controls

Support:

• Microphone toggle
• Camera toggle
• Speaker/device selection where available
• Screen layout
• Participant display
• End call

Use backend/WebRTC signaling contracts.

Do not implement media signaling independently from the approved backend architecture.

────────────────────────────────────────

SETTINGS

Implement settings sections for:

• Account
• Profile
• Privacy
• Security
• Notifications
• Devices
• Appearance
• Language
• Accessibility

Support appropriate loading, validation, saving, and error states.

────────────────────────────────────────

DEVICE MANAGEMENT

Implement UI for:

• Registered devices
• Active sessions
• Device information
• Remote logout
• Device revocation
• Security notifications

Do not expose unnecessary device metadata.

────────────────────────────────────────

FORMS

Use:

• React Hook Form
• Zod

Support:

• Synchronous validation
• Asynchronous validation where needed
• Server validation errors
• Loading states
• Submission errors
• Disabled states
• Accessible form feedback

────────────────────────────────────────

ERROR HANDLING

Implement:

• Global error boundary
• Route-level error boundaries
• Network errors
• Authentication errors
• Authorization errors
• Validation errors
• WebSocket failures
• Offline states
• Upload failures
• Retry UI

Provide useful recovery actions.

Never expose internal backend errors directly.

────────────────────────────────────────

OFFLINE EXPERIENCE

Implement web behavior for temporary network loss.

Support:

• Offline indicator
• Pending message display
• Reconnect indicator
• Retry failed operations
• Cache-backed conversation viewing where appropriate
• Synchronization after reconnect

Do not falsely claim complete offline support if browser limitations prevent it.

────────────────────────────────────────

PERFORMANCE

Optimize:

• Server Components
• Client Components
• Suspense
• Streaming where useful
• Code splitting
• Lazy loading
• Image optimization
• Virtualized message lists
• Query caching
• Prefetching
• Memoization
• Event batching
• WebSocket efficiency

Avoid unnecessary rerenders.

Do not make the entire application a single large client component.

────────────────────────────────────────

SECURITY

Implement:

• Secure authentication handling
• Protected routes
• Server-side authorization assumptions
• Safe rendering
• Input sanitization where appropriate
• Content Security Policy compatibility
• Secure file handling
• Safe URL handling
• XSS prevention
• CSRF-safe request patterns where applicable

Do not place secrets in frontend bundles.

Never expose private backend credentials.

────────────────────────────────────────

TESTING

Generate:

UNIT TESTS

• State logic
• Utilities
• Validation
• Formatting
• Permission-aware UI logic

COMPONENT TESTS

• Message components
• Conversation list
• Composer
• Forms
• Dialogs
• Notifications
• Settings

INTEGRATION TESTS

• API client
• Authentication flow
• Query integration
• WebSocket events

ACCESSIBILITY TESTS

• Keyboard navigation
• Dialogs
• Forms
• Navigation
• Screen readers where tooling permits

END-TO-END TESTS

• Registration
• Login
• Conversation navigation
• Send message
• Receive message
• Reply
• React
• Edit
• Delete
• Group creation
• Media upload
• Story creation
• Notifications
• Device management

PERFORMANCE TESTS

• Large conversation lists
• Large message histories
• Rapid real-time updates
• WebSocket reconnection
• Media upload UI

────────────────────────────────────────

DOCUMENTATION

Generate:

• Frontend architecture documentation
• Folder structure documentation
• Component standards
• Design system documentation
• API client documentation
• WebSocket client documentation
• State management standards
• Accessibility standards
• Testing standards
• Development workflow

────────────────────────────────────────

PROJECT INDEX

Maintain the frontend Project Index.

Track:

• Generated pages
• Generated layouts
• Generated components
• Feature modules
• Zustand stores
• TanStack Query integrations
• API integrations
• WebSocket integrations
• Forms
• Tests
• Dependencies
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

Implement incrementally.

FRONTEND MILESTONE 1

Next.js foundation, design system, global providers, routing, layouts, configuration, API client, and error handling.

FRONTEND MILESTONE 2

Authentication and account flows.

FRONTEND MILESTONE 3

Conversation list, conversation layout, messaging UI, and composer.

FRONTEND MILESTONE 4

Real-time WebSocket integration, delivery states, receipts, presence, and typing.

FRONTEND MILESTONE 5

Contacts, blocking, groups, and communities.

FRONTEND MILESTONE 6

Media, uploads, stories, and notifications.

FRONTEND MILESTONE 7

Search, device management, settings, privacy, and security.

FRONTEND MILESTONE 8

Call UI and WebRTC integration boundaries.

FRONTEND MILESTONE 9

Performance, accessibility, testing, and production hardening.

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

This volume covers:

• Web frontend foundation
• Routing
• Layouts
• Design system
• Authentication UI
• API client
• WebSocket client foundation
• Conversation UI
• Messaging UI
• Composer
• Presence
• Contacts
• Groups
• Communities
• Media UI
• Stories
• Notifications
• Search
• Calls UI
• Settings
• Device management
• Accessibility
• Responsive design
• Frontend testing

Do not implement:

• Backend business logic
• Mobile applications
• Kubernetes
• Terraform
• CI/CD infrastructure

────────────────────────────────────────

QUALITY BAR

Treat the web frontend as a production application serving a global communication platform.

Assume:

• Large conversation histories
• High-frequency real-time events
• Multiple active sessions
• Unreliable networks
• Large media
• Accessibility requirements
• Strong security requirements
• Desktop and tablet usage

Prioritize:

• Performance
• Accessibility
• Security
• Real-time responsiveness
• Maintainability
• Correct state synchronization
• Excellent UX
• Production readiness
