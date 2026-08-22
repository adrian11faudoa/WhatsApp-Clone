You are operating in Senior Engineering Team Mode.

Build the production-ready backend domains for media, stories/status, notifications, voice/video calls, search, business accounts, moderation, administration, analytics, audit logging, and feature flags for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The backend must follow the established architecture, domain boundaries, security model, database ownership rules, API conventions, event architecture, queue architecture, and real-time architecture of the project.

Do not redesign the architecture.

Do not generate frontend code.

Do not generate mobile code.

Do not generate Kubernetes manifests.

Do not generate Terraform.

Do not generate infrastructure implementation code.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Implement the production-ready backend required for:

• Media uploads
• Media metadata
• Media processing
• Image processing
• Video processing
• Audio processing
• Voice messages
• Documents
• Stickers
• GIFs
• Thumbnails
• CDN delivery
• Stories/status
• Push notifications
• In-app notifications
• Email notifications where appropriate
• Voice calls
• Video calls
• Group calls
• Call signaling
• Call sessions
• Search
• Business accounts
• Business profiles
• Business messaging
• Reporting
• Moderation
• Administration
• Audit logging
• Analytics
• Feature flags

The implementation must support:

• Hundreds of millions of users
• Billions of messages
• Large media volumes
• Large notification volumes
• Large numbers of calls
• Multi-region deployment
• High availability
• Horizontal scaling
• Fault tolerance

────────────────────────────────────────

TECHNOLOGY STACK

Backend:

• Node.js
• NestJS
• TypeScript

Database:

• PostgreSQL
• Prisma ORM

Cache:

• Redis

Event Streaming:

• Kafka or Redpanda

Background Jobs:

• BullMQ

Search:

• Elasticsearch or OpenSearch

Object Storage:

• AWS S3-compatible object storage

CDN:

• CloudFront or equivalent CDN

Push Notifications:

• Firebase Cloud Messaging
• Apple Push Notification Service

Voice/Video:

• WebRTC
• STUN
• TURN
• Media infrastructure where required

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Testing:

• Jest
• Supertest
• Integration and contract testing tools where appropriate

────────────────────────────────────────

IMPLEMENTATION RULES

Never generate pseudo-code.

Never generate placeholders.

Never generate TODO comments.

Never omit implementations.

Never say:

- "implement similarly"
- "left as an exercise"
- "for brevity"
- "remaining code omitted"

Every generated file must be complete.

Every generated file must compile.

Never regenerate unchanged files.

Only modify existing files when required.

Use strict TypeScript.

Use dependency injection.

Keep controllers thin.

Keep domain logic inside appropriate services/domain modules.

Use repositories for persistence.

Use centralized validation.

Use centralized error handling.

Use structured logging.

Use the established observability infrastructure.

────────────────────────────────────────

MEDIA DOMAIN

Implement media management.

Support:

• Media asset creation
• Media metadata
• Media ownership
• Media type
• MIME type
• File size
• Duration
• Dimensions
• Processing state
• Storage state
• Access state
• Lifecycle state

Media types:

• Image
• Video
• Audio
• Voice
• Document
• Sticker
• GIF
• Thumbnail

Do not store large binary files directly in PostgreSQL.

Store object-storage references and metadata.

────────────────────────────────────────

MEDIA UPLOADS

Implement secure upload authorization.

Support:

• Upload initialization
• Signed upload URLs
• Multipart upload where appropriate
• Upload completion
• Upload verification
• Content-type validation
• File-size validation
• Ownership validation
• Expiration

Do not trust client-supplied MIME type or file metadata.

Validate uploaded objects server-side.

────────────────────────────────────────

MEDIA PROCESSING

Implement asynchronous processing architecture.

Support:

• Image processing
• Video processing
• Audio processing
• Thumbnail generation
• Preview generation
• Metadata extraction
• Compression
• Format validation

Use BullMQ for processing jobs where appropriate.

Every processing job must support:

• Job ID
• Retry
• Exponential backoff
• Idempotency
• Timeout
• Failure state
• Dead-letter handling
• Monitoring

────────────────────────────────────────

MEDIA SECURITY

Implement:

• MIME validation
• File-size restrictions
• Malware scanning integration boundary
• Extension validation
• Storage isolation
• Access authorization
• Signed URLs
• URL expiration
• Media ownership validation

Never assume a file is safe because its extension is valid.

────────────────────────────────────────

MEDIA ACCESS

Implement secure media authorization.

Support:

• Download authorization
• Signed access
• Expiration
• Ownership checks
• Conversation-membership checks
• Block/privacy checks where required

Do not expose permanent public URLs for private media.

────────────────────────────────────────

CDN INTEGRATION

Implement backend integration for CDN delivery.

Support:

• Signed URLs
• Signed cookies where appropriate
• Cache invalidation where required
• Expiration
• Origin references
• Protected asset access

Do not make CDN access bypass backend authorization.

────────────────────────────────────────

VOICE MESSAGE DOMAIN

Implement voice-message metadata and lifecycle.

Support:

• Voice message creation
• Duration
• Audio format
• Processing state
• Storage reference
• Download authorization
• Delivery through existing messaging infrastructure

Do not implement audio capture in backend.

────────────────────────────────────────

STORIES / STATUS

Implement stories/status backend functionality.

Support:

• Story creation
• Story retrieval
• Story deletion
• Story expiration
• Story visibility
• Audience selection
• Viewer tracking
• Reactions where appropriate

Story types:

• Text
• Image
• Video

Define privacy rules for:

• Public/allowed audience
• Contacts
• Excluded users
• Blocked users

────────────────────────────────────────

STORY EXPIRATION

Implement automated story expiration.

Use BullMQ or scheduled infrastructure for:

• Expiration
• Viewer cleanup
• Temporary media cleanup
• Metadata cleanup

Ensure expired content is no longer returned by APIs.

Distinguish:

• Logical expiration
• CDN/object-storage cleanup
• Physical deletion

────────────────────────────────────────

STORY VIEWERS

Implement:

• Mark viewed
• List viewers where authorized
• Viewer counts
• Idempotent viewer records
• Privacy checks

Avoid excessive duplicate viewer writes.

────────────────────────────────────────

NOTIFICATION DOMAIN

Implement notification infrastructure.

Support:

• Push notifications
• In-app notifications
• Email-ready architecture

Notification types:

• New message
• Missed call
• Group activity
• Community activity
• Security alert
• Account event
• Business event
• Administrative event

────────────────────────────────────────

PUSH NOTIFICATIONS

Implement integrations for:

• Firebase Cloud Messaging
• Apple Push Notification Service

Support:

• Device token registration
• Token rotation
• Invalid token handling
• Notification preferences
• Notification deduplication
• Retry
• Backoff
• Provider failure handling
• Multi-device routing

Never include sensitive plaintext message content unnecessarily in notification payloads.

Respect privacy requirements.

────────────────────────────────────────

NOTIFICATION PREFERENCES

Implement preferences for:

• Messages
• Calls
• Groups
• Communities
• Business notifications
• Security notifications
• Marketing notifications where applicable

Support:

• Global defaults
• Per-category preferences
• Per-conversation overrides where appropriate
• Device-specific preferences where needed

────────────────────────────────────────

NOTIFICATION QUEUES

Implement BullMQ queues for:

• Push delivery
• Email delivery
• Notification retries
• Notification cleanup
• Invalid token cleanup

Each worker must be:

• Idempotent
• Retryable
• Observable
• Rate-limited where appropriate

────────────────────────────────────────

CALL DOMAIN

Implement call-management backend functionality.

Support:

• Call creation
• Call invitation
• Call acceptance
• Call rejection
• Call cancellation
• Call termination
• Call state
• Participant management
• Device selection
• Call history metadata

Call states may include:

• Initiating
• Ringing
• Accepted
• Active
• Reconnecting
• Ended
• Failed
• Rejected
• Missed

────────────────────────────────────────

CALL SIGNALING

Implement backend signaling infrastructure for WebRTC.

Support:

• Offer
• Answer
• ICE candidates
• Session negotiation
• Call invitations
• Call acceptance
• Call rejection
• Call termination
• Reconnection

Use WebSocket signaling.

Do not route audio/video payloads through NestJS APIs.

────────────────────────────────────────

CALL AUTHORIZATION

Before allowing call actions, validate:

• User authentication
• Conversation relationship
• Blocking
• Privacy
• Device authorization
• Call permissions
• Account status

Do not trust client-provided call participant information.

────────────────────────────────────────

GROUP CALLS

Implement backend foundations for:

• Group call creation
• Participant admission
• Participant removal
• Call state
• Participant state
• Signaling events

Design for future SFU/media-server integration.

Do not embed media transport into the application API.

────────────────────────────────────────

TURN / MEDIA SERVER INTEGRATION

Implement backend integration boundaries for:

• TURN credentials
• Short-lived access
• Region selection
• Media server selection where appropriate
• Session authorization

Never expose long-lived TURN credentials.

────────────────────────────────────────

SEARCH DOMAIN

Implement search architecture for:

• Users
• Contacts
• Groups
• Communities
• Conversations
• Business accounts

Support message search only where it is compatible with the encryption/privacy architecture.

Do not index E2EE-protected message plaintext server-side.

────────────────────────────────────────

SEARCH INDEXING

Implement Elasticsearch/OpenSearch integration.

Support:

• Index creation
• Document serialization
• Indexing
• Updates
• Deletes
• Bulk indexing
• Reindexing
• Aliases
• Index versioning
• Retry
• Failure handling

Search documents must contain only data appropriate for indexing.

────────────────────────────────────────

SEARCH AUTHORIZATION

Search must respect:

• User permissions
• Conversation membership
• Group membership
• Community membership
• Blocking
• Privacy
• Business permissions

Never return documents the requesting user cannot access.

────────────────────────────────────────

BUSINESS ACCOUNT DOMAIN

Implement:

• Business account creation
• Business profiles
• Business verification state
• Business users
• Business roles
• Business permissions
• Business hours
• Business metadata

Keep business functionality separate from consumer account state where appropriate.

────────────────────────────────────────

BUSINESS MESSAGING

Implement backend support for:

• Business conversations
• Business participants
• Business roles
• Automated responses foundation
• Business catalogs foundation
• Business messaging permissions

Do not implement frontend business UI.

────────────────────────────────────────

REPORTING

Implement reporting functionality.

Support reports for:

• Users
• Messages where reportable
• Groups
• Communities
• Businesses
• Media
• Abuse

Implement:

• Report creation
• Report status
• Report categories
• Evidence references where permitted
• Report assignment
• Resolution state

Respect E2EE boundaries.

────────────────────────────────────────

MODERATION

Implement moderation foundations.

Support:

• Moderation cases
• Administrative actions
• Suspensions
• Restrictions
• Warnings
• Content takedown references
• Appeals
• Case history

Do not create a hidden system for inspecting E2EE-protected content.

────────────────────────────────────────

MODERATION POLICIES

Implement policy/version structures for:

• Abuse
• Spam
• Account restrictions
• Media policies
• Business policies

Administrative decisions must be auditable.

────────────────────────────────────────

ADMINISTRATION

Implement backend administration capabilities.

Support:

• User investigation
• Account status management
• Device investigation
• Group investigation
• Business management
• Reports
• Moderation
• Feature flags
• System configuration
• Audit access

Administrative operations must require explicit authorization.

────────────────────────────────────────

AUDIT LOGGING

Implement comprehensive audit logging for sensitive operations.

Track:

• Actor
• Action
• Resource
• Timestamp
• Result
• Request ID
• Correlation ID
• Relevant metadata

Audit:

• Administrative actions
• Moderation actions
• Business verification
• Feature flag changes
• System configuration changes
• Security changes

Never store secrets or message plaintext unnecessarily.

────────────────────────────────────────

ANALYTICS DOMAIN

Implement analytics event generation and aggregation foundations.

Support metrics for:

• User activity
• Messaging
• Delivery
• Groups
• Communities
• Stories
• Calls
• Media processing
• Notifications
• Business activity
• Security events

Do not run analytical workloads directly against transactional tables where avoidable.

────────────────────────────────────────

ANALYTICS PIPELINE

Use Kafka and appropriate background processing.

Support:

• Event ingestion
• Aggregation
• Batch processing
• Real-time metrics where appropriate
• Retention
• Privacy controls

Define analytics event schemas separately from domain events where necessary.

────────────────────────────────────────

FEATURE FLAGS

Implement feature flag backend.

Support:

• Global flags
• Percentage rollout
• User targeting
• Region targeting
• Device/platform targeting
• Kill switches
• Experiment assignments

Implement:

• Flag creation
• Flag update
• Flag deletion
• Evaluation
• Caching
• Audit history

────────────────────────────────────────

FEATURE FLAG EVALUATION

Flag evaluation must support deterministic results.

Do not allow clients to bypass server-side feature controls.

Sensitive feature flags must be evaluated server-side.

────────────────────────────────────────

EVENTS

Implement and publish relevant events including:

MEDIA

• MediaUploaded
• MediaProcessingStarted
• MediaProcessingCompleted
• MediaProcessingFailed

STORIES

• StoryCreated
• StoryExpired
• StoryViewed

NOTIFICATIONS

• NotificationCreated
• NotificationDelivered
• NotificationFailed

CALLS

• CallCreated
• CallStarted
• CallEnded
• CallParticipantJoined
• CallParticipantLeft

SEARCH

• SearchIndexed
• SearchIndexFailed

BUSINESS

• BusinessAccountCreated
• BusinessAccountVerified
• BusinessUserAdded

MODERATION

• ReportCreated
• ModerationCaseOpened
• ModerationActionTaken

ADMINISTRATION

• AdministrativeActionTaken

ANALYTICS

• AnalyticsEventRecorded

FEATURE FLAGS

• FeatureFlagCreated
• FeatureFlagChanged
• FeatureFlagDeleted

Use the established event envelope and transactional outbox where appropriate.

────────────────────────────────────────

BACKGROUND JOBS

Implement queues/workers for:

• Image processing
• Video processing
• Audio processing
• Thumbnail generation
• Media cleanup
• Story expiration
• Story cleanup
• Push notifications
• Email notifications
• Search indexing
• Search reindexing
• Analytics aggregation
• Report processing
• Moderation workflows
• Audit retention
• Feature flag cleanup

Every worker must support:

• Retry
• Backoff
• Idempotency
• Concurrency
• Failure handling
• Dead-letter behavior
• Metrics

────────────────────────────────────────

DATABASE

Implement Prisma models and migrations for the domains in this volume.

Include appropriate models for:

• MediaAsset
• MediaProcessingJob
• MediaVariant
• Story
• StoryAudience
• StoryViewer
• Notification
• NotificationPreference
• PushToken
• Call
• CallParticipant
• CallSession
• BusinessAccount
• BusinessProfile
• BusinessUser
• Report
• ModerationCase
• ModerationAction
• AuditLog extensions
• Analytics event references where appropriate
• FeatureFlag
• FeatureFlagRule
• FeatureFlagEvaluation where appropriate

Use:

• Primary keys
• Foreign keys
• Unique constraints
• Composite indexes
• Status constraints
• Timestamps
• Retention fields
• Partitioning where justified

Do not create unnecessary transactional tables for analytics data.

────────────────────────────────────────

API

Implement production-ready APIs for:

MEDIA

• Upload initialization
• Upload completion
• Media metadata
• Media authorization
• Media deletion

STORIES

• Create
• List
• Get
• View
• Delete

NOTIFICATIONS

• Preferences
• Notification center
• Device token registration

CALLS

• Create
• Accept
• Reject
• End
• Participants
• Signaling

SEARCH

• User search
• Group search
• Conversation search
• Business search
• Message search where allowed

BUSINESS

• Business profile
• Business users
• Business permissions

REPORTING

• Create report
• Get report status

ADMINISTRATION

• Users
• Accounts
• Reports
• Moderation
• Feature flags
• Audit logs

Every endpoint must include:

• Validation
• Authentication
• Authorization
• Rate limiting
• OpenAPI documentation
• Consistent errors
• Idempotency where appropriate

────────────────────────────────────────

SECURITY

Enforce:

• Authorization
• Ownership
• Conversation membership
• Group membership
• Privacy settings
• Signed media access
• Short-lived call credentials
• Rate limits
• Administrative permissions
• Business permissions

Never trust:

• Client-provided media ownership
• Client-provided call participants
• Client-provided administrative roles
• Client-provided moderation status
• Client-provided feature evaluation for sensitive features

────────────────────────────────────────

OBSERVABILITY

Instrument:

• Media processing
• Upload failures
• Download authorization
• Story creation
• Story views
• Notification delivery
• Push provider errors
• Call signaling
• Search latency
• Search errors
• Business operations
• Moderation
• Administration
• Analytics processing

Track:

• Latency
• Throughput
• Error rates
• Queue depth
• Retry counts
• Dead-letter counts
• External provider failures

Never log sensitive message content or encryption keys.

────────────────────────────────────────

TESTING

UNIT TESTS

Test:

• Media validation
• Story visibility
• Notification routing
• Call state transitions
• Search authorization
• Business permissions
• Moderation policies
• Feature-flag evaluation

INTEGRATION TESTS

Test:

• S3 integration
• Redis
• Kafka
• BullMQ
• PostgreSQL
• Search
• Push providers
• WebSocket signaling

API TESTS

Test:

• Media APIs
• Story APIs
• Notification APIs
• Call APIs
• Search APIs
• Business APIs
• Moderation APIs
• Administration APIs

SECURITY TESTS

Test:

• Unauthorized media access
• Notification privacy
• Call authorization
• Search authorization
• Business privilege escalation
• Administrative privilege escalation
• Report manipulation
• Feature-flag bypass

PERFORMANCE TESTS

Test:

• Media processing queues
• Notification throughput
• Search throughput
• Call signaling
• Story traffic
• Analytics ingestion

────────────────────────────────────────

DOCUMENTATION

Document:

• Media architecture
• S3 integration
• CDN integration
• Processing pipeline
• Story lifecycle
• Notification system
• Call signaling
• Search architecture
• Business account model
• Moderation model
• Reporting
• Administration
• Analytics
• Feature flags
• API contracts
• Event contracts
• Queue architecture
• Security requirements

────────────────────────────────────────

PROJECT INDEX

Update the backend Project Index with:

• Completed media modules
• Completed story modules
• Completed notification modules
• Completed call modules
• Completed search modules
• Completed business-account modules
• Completed moderation modules
• Completed administration modules
• Completed analytics modules
• Completed feature-flag modules
• Database models
• Migrations
• APIs
• WebSocket contracts
• Events
• Queues
• Workers
• Tests
• Generated files
• Remaining work
• Current milestone
• Dependencies

────────────────────────────────────────

IMPLEMENTATION MILESTONES

Implement incrementally.

MILESTONE 1

Media metadata, upload authorization, and object-storage integration.

MILESTONE 2

Media processing workers and media lifecycle.

MILESTONE 3

Stories/status and expiration.

MILESTONE 4

Notifications, push tokens, preferences, and workers.

MILESTONE 5

Call sessions, signaling, and WebRTC integration boundaries.

MILESTONE 6

Search and indexing.

MILESTONE 7

Business accounts and business permissions.

MILESTONE 8

Reporting and moderation.

MILESTONE 9

Administration and audit functionality.

MILESTONE 10

Analytics and feature flags.

MILESTONE 11

Cross-domain events, observability, security hardening, and integration testing.

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

• Media
• Media processing
• Stories/status
• Notifications
• Voice/video calls
• Call signaling
• Search
• Business accounts
• Reporting
• Moderation
• Administration
• Audit
• Analytics
• Feature flags

Do not implement infrastructure deployment.

Do not implement frontend UI.

Do not implement mobile UI.

Do not implement Terraform.

Do not implement Kubernetes.

Do not implement CI/CD.

Do not replace established E2EE cryptographic architecture with custom cryptography.

────────────────────────────────────────

QUALITY BAR

Treat these systems as enterprise production infrastructure.

Assume:

• Massive media traffic
• Millions of notifications
• High call concurrency
• Global search traffic
• Large business workloads
• Large moderation workloads
• High-volume analytics
• Multi-region operation

Prioritize:

• Security
• Privacy
• Reliability
• Scalability
• Idempotency
• Observability
• Fault tolerance
• Maintainability
• Clear domain ownership
• Production readiness
