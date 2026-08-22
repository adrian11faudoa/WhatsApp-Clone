You are operating in Senior Engineering Team Mode.

Build the production-ready identity, authentication, account, profile, device, authorization, contact, privacy, and session backend domains for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The backend foundation and shared infrastructure are assumed to follow the project's established architecture.

Do not redesign the architecture.

Do not generate frontend code.

Do not generate mobile code.

Do not generate Kubernetes manifests.

Do not generate Terraform.

Do not generate infrastructure implementation code.

Do not generate CI/CD workflows.

This volume focuses exclusively on identity and access-related backend domains.

────────────────────────────────────────

MISSION

Implement the production-ready backend required for:

• Identity
• Accounts
• Users
• Profiles
• Authentication
• Authorization
• Sessions
• Devices
• Device management
• Contacts
• Contact discovery
• Blocking
• Privacy settings
• Security settings
• Account recovery
• Login security
• Audit events related to identity

The implementation must be:

• Secure
• Horizontally scalable
• Observable
• Testable
• Maintainable
• Multi-device capable
• Multi-region ready

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

Events:

• Kafka or Redpanda

Background Jobs:

• BullMQ

Authentication:

• JWT or secure session architecture according to the established design

Password Security:

• Industry-standard password hashing library

Testing:

• Jest
• Supertest
• Integration testing tools where appropriate

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

Generate complete production-ready files.

Every generated file must compile.

Never regenerate unchanged files.

Only modify existing files when required.

Use strict TypeScript.

Use dependency injection.

Use centralized validation.

Use centralized error handling.

Use structured logging.

Use the existing configuration and observability foundations.

────────────────────────────────────────

DOMAIN OWNERSHIP

Implement clear boundaries between:

Identity

Authentication

Accounts

Users

Profiles

Sessions

Devices

Authorization

Contacts

Privacy

Security

Do not place all identity functionality into one uncontrolled service.

Define clear application-service and repository boundaries.

────────────────────────────────────────

IDENTITY DOMAIN

Implement:

• User identity creation
• User identity retrieval
• User identity status
• Identity lifecycle
• Account association
• Identity lookup
• Identity deactivation
• Identity deletion workflows where appropriate

Use stable public identifiers.

Do not expose internal database identifiers unnecessarily.

Define identity states where required, such as:

• Active
• Suspended
• Disabled
• Pending verification
• Deactivated
• Deleted

────────────────────────────────────────

ACCOUNT DOMAIN

Implement:

• Account creation
• Account status
• Account lifecycle
• Account settings
• Account security settings
• Account recovery state
• Account deletion initiation
• Account deletion processing
• Account suspension
• Account reactivation where allowed

Separate:

• Account-level data
• User-level identity
• Profile-level data
• Device-level data
• Session-level data

Account operations must be audited where appropriate.

────────────────────────────────────────

USER DOMAIN

Implement:

• User creation
• User retrieval
• User updates
• Public user representation
• Private user representation
• User status
• User metadata required by the domain

Prevent accidental exposure of:

• Private settings
• Security information
• Device details
• Session information
• Sensitive identifiers

Define explicit DTOs for public and private user responses.

────────────────────────────────────────

PROFILE DOMAIN

Implement:

• Profile creation
• Profile updates
• Display name
• Username where applicable
• Avatar metadata
• About/status information
• Profile visibility
• Profile settings

Do not store large binary profile media directly in PostgreSQL.

Use object-storage references where appropriate.

Define profile privacy boundaries.

────────────────────────────────────────

PRIVACY DOMAIN

Implement privacy settings supporting:

• Last seen visibility
• Online status visibility
• Profile photo visibility
• About/status visibility
• Read receipts
• Contact discovery preferences
• Group invitation controls
• Blocking-related privacy behavior

Define defaults.

Define validation rules.

Define how privacy rules are enforced by backend services.

Do not rely on frontend filtering.

────────────────────────────────────────

AUTHENTICATION

Implement production authentication foundations.

Support:

• Registration
• Login
• Logout
• Refresh
• Credential verification
• Account verification
• Session creation
• Session revocation

Prepare architecture for:

• MFA
• OAuth
• Passkeys
• Phone verification
• Suspicious login detection

Do not implement unsupported authentication methods merely as placeholders.

For features that require external providers, establish real provider integration boundaries where appropriate.

────────────────────────────────────────

PASSWORD AUTHENTICATION

Where password authentication is enabled, implement:

• Password hashing
• Password verification
• Password change
• Password reset
• Password reset token generation
• Password reset token expiration
• Password reset token invalidation
• Password history or reuse protection where appropriate
• Login attempt protection

Never store plaintext passwords.

Never log passwords.

Do not return password hashes through APIs.

────────────────────────────────────────

ACCOUNT VERIFICATION

Implement appropriate verification architecture for:

• Email verification
• Phone verification where the project uses phone-based identity

Define:

• Verification tokens
• Verification expiration
• Single-use semantics
• Resend limits
• Rate limiting
• Verification state
• Replay prevention

Verification tokens must be stored securely.

────────────────────────────────────────

SESSION MANAGEMENT

Implement production session management.

Support:

• Session creation
• Session lookup
• Session refresh
• Session expiration
• Session revocation
• Logout
• Logout-all-devices
• Session listing
• Session metadata

Track appropriate session metadata such as:

• Device
• Platform
• Application version
• Last activity
• Created time
• Expiration
• Revocation state

Do not store sensitive secrets unnecessarily.

────────────────────────────────────────

TOKEN ARCHITECTURE

Implement the established authentication token strategy.

Support as appropriate:

• Access tokens
• Refresh tokens
• Token rotation
• Token expiration
• Token revocation
• Token-family invalidation
• Replay detection

Refresh tokens must be protected against theft and replay.

Define secure storage expectations for each client type.

────────────────────────────────────────

DEVICE DOMAIN

Implement device management.

Support:

• Device registration
• Device identification
• Device metadata
• Device capabilities
• Device naming
• Device status
• Device revocation
• Remote logout
• Device listing
• Last-seen information
• Push token association

Track:

• Device ID
• Platform
• OS version
• Application version
• Device capabilities
• Registration time
• Last activity
• Revocation status

Do not collect unnecessary device information.

────────────────────────────────────────

DEVICE LIMITS

Implement configurable device limits.

Support:

• Maximum registered devices
• Maximum active sessions
• Device replacement
• Device revocation
• Administrative device revocation where authorized

Define behavior when the maximum device count is reached.

Device limits must be enforced server-side.

────────────────────────────────────────

DEVICE SECURITY

Implement architecture for:

• Device verification
• Device trust state
• Device revocation
• Suspicious-device detection
• Security notifications
• Remote logout

Prepare integration boundaries for future E2EE device-key management.

Do not implement cryptographic protocols in this volume.

────────────────────────────────────────

AUTHORIZATION

Implement production RBAC and permission infrastructure.

Support roles such as:

• User
• Group Member
• Group Administrator
• Community Administrator
• Moderator
• Support Agent
• Administrator
• Super Administrator
• System Service

Implement:

• Permissions
• Roles
• Role assignment
• Permission guards
• Policy checks
• Resource ownership checks
• Administrative permission checks

Do not rely solely on role names.

Use explicit permissions for sensitive operations.

────────────────────────────────────────

PERMISSION MODEL

Define permission categories for:

• Account
• Profile
• Device
• Conversation
• Group
• Community
• Business
• Moderation
• Administration
• Audit
• System configuration

Permissions must be enforceable by backend services.

Do not encode permissions only in frontend navigation.

────────────────────────────────────────

POLICY ENGINE

Implement a reusable authorization-policy foundation.

Policies should support checks based on:

• Actor
• Resource
• Action
• Ownership
• Role
• Permission
• Account status
• Resource status
• Privacy settings

Keep policy logic separate from controllers.

────────────────────────────────────────

CONTACT DOMAIN

Implement:

• Contact creation
• Contact removal
• Contact listing
• Contact state
• Contact synchronization boundaries
• Contact discovery boundaries

Where the platform uses phone-based contact discovery, define secure matching behavior.

Do not expose full contact information unnecessarily.

────────────────────────────────────────

CONTACT DISCOVERY

Implement the backend architecture for privacy-preserving contact discovery.

Support:

• User discovery
• Contact matching
• Search by approved identifiers
• Rate limiting
• Enumeration protection

Do not expose:

• Private contact information
• Unrelated account metadata
• Internal identifiers

Add appropriate abuse controls.

────────────────────────────────────────

BLOCKING

Implement:

• Block user
• Unblock user
• List blocked users
• Block state lookup

Blocking must affect:

• Contact discovery
• Messaging authorization
• Presence visibility
• Profile visibility where appropriate
• Notifications
• Group interactions where appropriate

Enforce blocking server-side.

────────────────────────────────────────

SECURITY EVENTS

Generate security-domain events such as:

• UserLoggedIn
• LoginFailed
• SuspiciousLoginDetected
• SessionCreated
• SessionRevoked
• DeviceRegistered
• DeviceRevoked
• PasswordChanged
• PasswordResetRequested
• PasswordResetCompleted
• AccountVerified
• AccountSuspended
• UserBlocked

Events must contain only required information.

Never publish sensitive credentials or tokens.

────────────────────────────────────────

AUDIT LOGGING

Implement audit logging for sensitive identity operations.

Audit:

• Login
• Logout
• Password changes
• Password reset
• Device registration
• Device revocation
• Session revocation
• Role changes
• Permission changes
• Account suspension
• Administrative account actions
• Security setting changes

Audit records should contain:

• Actor
• Action
• Resource
• Timestamp
• Request ID
• Correlation ID
• Result
• Relevant metadata

Do not store secrets in audit logs.

────────────────────────────────────────

RATE LIMITING

Implement rate limits for sensitive operations.

At minimum cover:

• Registration
• Login
• Password reset
• Verification
• Contact discovery
• Device registration
• Session refresh
• Account recovery

Support rate limiting by appropriate dimensions such as:

• IP
• Account
• Device
• Identifier
• Operation

Prevent distributed abuse without creating unnecessary false positives.

────────────────────────────────────────

ACCOUNT RECOVERY

Implement secure recovery workflows.

Support:

• Password reset
• Verification recovery where applicable
• Session invalidation after credential recovery
• Device/session review
• Security notifications

Recovery must invalidate compromised authentication state where appropriate.

────────────────────────────────────────

DATABASE

Implement Prisma models and migrations for the domains covered by this volume.

Include appropriate entities for:

• User
• Account
• Profile
• ProfileSettings
• PrivacySettings
• Session
• Device
• DeviceCapability
• Contact
• ContactRequest where required
• BlockedUser
• VerificationToken
• PasswordResetToken
• Role
• Permission
• RolePermission
• UserRole or equivalent
• AuditLog
• SecurityEvent where appropriate

Use:

• Primary keys
• Foreign keys
• Unique constraints
• Check constraints
• Appropriate indexes
• Timestamps
• Soft deletion where justified

Do not create tables for future domains unless required by the current implementation.

────────────────────────────────────────

API

Implement production-ready APIs for:

Authentication

• Registration
• Login
• Logout
• Refresh
• Verification
• Password reset
• Password change

Accounts

• Account retrieval
• Account settings
• Account deletion initiation
• Account security

Profiles

• Profile retrieval
• Profile update
• Privacy settings

Sessions

• Session list
• Session revoke
• Revoke all sessions

Devices

• Device registration
• Device listing
• Device update
• Device revoke
• Remote logout

Contacts

• Contact list
• Contact create
• Contact remove
• Contact discovery

Blocking

• Block
• Unblock
• List blocked users

Administration

• Role management where authorized
• Permission management where authorized
• Audit access where authorized

Every endpoint must include:

• DTO validation
• Authentication
• Authorization
• Rate limiting
• OpenAPI documentation
• Consistent errors
• Structured logging

────────────────────────────────────────

SECURITY REQUIREMENTS

Implement:

• Password hashing
• Secure token handling
• Refresh-token protection
• Rate limiting
• Brute-force protection
• Secure headers
• Input validation
• Authorization guards
• Permission checks
• Audit logging
• Secret protection
• Session revocation

Follow OWASP security principles.

Do not expose internal security implementation details through public APIs.

────────────────────────────────────────

EVENTS

Publish appropriate events using the established event infrastructure.

At minimum consider:

• AccountCreated
• AccountVerified
• UserLoggedIn
• LoginFailed
• SessionCreated
• SessionRevoked
• DeviceRegistered
• DeviceRevoked
• ContactAdded
• ContactRemoved
• UserBlocked
• UserUnblocked
• PasswordChanged
• PasswordResetCompleted
• PrivacySettingsChanged
• RoleAssigned
• RoleRevoked

Use transactional outbox where events are associated with database transactions.

────────────────────────────────────────

BACKGROUND JOBS

Implement background jobs where appropriate for:

• Verification cleanup
• Password reset token cleanup
• Session cleanup
• Device cleanup
• Security notification delivery
• Audit retention processing
• Account deletion processing

Every job must define:

• Retry
• Backoff
• Idempotency
• Failure handling
• Monitoring

────────────────────────────────────────

OBSERVABILITY

Instrument:

• Authentication attempts
• Authentication failures
• Registration
• Token refresh
• Session operations
• Device operations
• Contact discovery
• Blocking
• Permission checks
• Administrative actions

Measure:

• Latency
• Error rate
• Authentication failure rate
• Rate-limit events
• Suspicious activity
• Database performance

Do not log passwords, tokens, encryption keys, or private message data.

────────────────────────────────────────

TESTING

Generate:

UNIT TESTS

• Password hashing
• Token services
• Authentication services
• Permission policies
• Privacy policies
• Device policies
• Account policies

INTEGRATION TESTS

• Registration
• Login
• Refresh
• Logout
• Password reset
• Session revocation
• Device registration
• Device revocation
• Contact operations
• Blocking
• Role/permission operations

API TESTS

• Authentication endpoints
• Account endpoints
• Profile endpoints
• Session endpoints
• Device endpoints
• Contact endpoints
• Blocking endpoints

SECURITY TESTS

• Brute-force protection
• Token replay
• Session revocation
• Authorization bypass
• Privilege escalation
• User enumeration
• Rate-limit bypass

────────────────────────────────────────

DOCUMENTATION

Document:

• Identity architecture
• Authentication flow
• Token lifecycle
• Session lifecycle
• Device lifecycle
• Authorization model
• Permission model
• Privacy model
• Contact discovery
• Blocking behavior
• Security events
• Audit logging
• API contracts
• Database objects
• Testing strategy

────────────────────────────────────────

PROJECT INDEX

Update the backend Project Index with:

• Completed identity modules
• Completed authentication modules
• Completed account modules
• Completed profile modules
• Completed device modules
• Completed session modules
• Completed authorization modules
• Completed contact modules
• Completed privacy modules
• Completed security modules
• Database objects
• Migrations
• APIs
• Events
• Queues
• Tests
• Generated files
• Remaining work
• Dependencies
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

Implement this volume incrementally.

MILESTONE 1

Identity, users, accounts, and database models.

MILESTONE 2

Authentication, password handling, verification, and sessions.

MILESTONE 3

Devices, device lifecycle, and device security.

MILESTONE 4

Authorization, roles, permissions, and policies.

MILESTONE 5

Profiles, privacy, contacts, discovery, and blocking.

MILESTONE 6

Security events, audit logging, recovery workflows, and cleanup jobs.

MILESTONE 7

API integration, observability, security testing, and integration testing.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must compile before moving to the next.

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
2. Explain why it must change.
3. Provide the complete updated file.

Never regenerate unchanged files.

────────────────────────────────────────

SCOPE RESTRICTION

This volume covers only:

• Identity
• Users
• Accounts
• Profiles
• Authentication
• Authorization
• Sessions
• Devices
• Contacts
• Privacy
• Blocking
• Security events
• Audit foundations
• Account recovery

Do not implement complete:

• Messaging
• Groups
• Communities
• Media processing
• Stories
• Calls
• Search
• Business messaging
• Full moderation
• Full analytics
• Full E2EE implementation

Those belong to later backend implementation volumes.

────────────────────────────────────────

QUALITY BAR

Treat identity and access management as critical production infrastructure.

Assume:

• Hundreds of millions of accounts
• Millions of concurrent sessions
• Multiple devices per account
• High authentication traffic
• Global deployment
• Account takeover attempts
• Automated abuse
• Strict privacy requirements

Prioritize:

• Security
• Correctness
• Reliability
• Scalability
• Auditability
• Maintainability
• Clear domain ownership
• Strong test coverage
