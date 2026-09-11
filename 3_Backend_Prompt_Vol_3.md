# WHATSAPP — BACKEND VOLUME 3

## ROLE

Act as a Principal Backend Engineer, Staff Backend Engineer, Distributed Systems Engineer, Media Infrastructure Engineer, Search Engineer, Notification Engineer, Security Engineer, Database Architect, SRE, QA Engineer, Performance Engineer, and Technical Writer working as one senior engineering team.

You are implementing the production media, notification, search, and advanced communication backend of a global real-time communication platform comparable in capability and reliability to WhatsApp, Telegram, Signal, Messenger, Discord, and Microsoft Teams.

Do not teach. Do not provide tutorials. Do not produce pseudo-code. Perform the implementation directly in the repository.

Build production-grade software suitable for a globally distributed communication platform operating at very large scale.

---

# PROJECT

Implement the backend systems responsible for:

* Media uploads
* Media metadata
* Media processing
* Image processing
* Video processing
* Audio processing
* Voice-message processing
* Document uploads
* Thumbnail generation
* Media validation
* Media storage
* CDN delivery
* Signed URLs
* Media access authorization
* Media lifecycle management
* Push notifications
* Notification preferences
* Notification fan-out
* Device notification registration
* Search
* Message search
* Conversation search
* User search
* Search indexing
* Search consistency
* Group management foundations
* Group administration foundations
* Stickers
* GIF integration foundations
* Link preview foundations

The platform must support:

* Hundreds of millions of users
* Tens of millions of daily active users or greater
* Very large media volumes
* Large concurrent upload/download workloads
* Global CDN traffic
* Large search indexes
* High notification throughput
* Multiple devices per account
* Multi-region deployment
* Horizontal scaling
* Failure recovery
* Strict authorization and privacy controls

Do not implement frontend or mobile application code in this volume.

---

# TECHNOLOGY DIRECTION

Use the following backend technology direction unless the existing repository contains a technically justified implementation that must be preserved:

* Node.js
* TypeScript
* NestJS
* REST
* WebSockets
* PostgreSQL
* Prisma
* Redis
* BullMQ
* Kafka or Redpanda
* Elasticsearch or OpenSearch
* S3-compatible object storage
* CloudFront or equivalent CDN
* FFmpeg
* Sharp or an equivalent production image-processing library
* FCM
* APNs
* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo
* Jest
* Supertest
* Docker
* Kubernetes

PostgreSQL remains the authoritative transactional source for durable application metadata.

Object storage is authoritative for binary media objects.

Redis is used for low-latency ephemeral state and coordination.

Kafka or Redpanda is used for durable asynchronous event distribution where appropriate.

BullMQ is used for background processing where job semantics are appropriate.

Elasticsearch/OpenSearch is used as a derived search index and is never the authoritative source of application data.

---

# SOURCE OF TRUTH

The repository is the source of truth.

Before modifying anything:

1. Inspect the existing backend.
2. Inspect messaging implementation.
3. Inspect conversation and group modules.
4. Inspect Prisma schema and migrations.
5. Inspect Redis infrastructure.
6. Inspect queue infrastructure.
7. Inspect event infrastructure.
8. Inspect storage integrations.
9. Inspect authentication and authorization.
10. Inspect WebSocket infrastructure.
11. Inspect configuration.
12. Inspect tests.
13. Inspect API documentation.
14. Inspect infrastructure configuration relevant to media, search, and notifications.
15. Identify existing implementation that must remain compatible.

Do not blindly replace existing functionality.

Preserve correct existing contracts.

---

# 1. BACKEND IMPLEMENTATION BOUNDARY

Implement the backend systems for:

* Media
* Media uploads
* Media processing
* Media access
* Media delivery
* Notifications
* Push notifications
* Notification preferences
* Search
* Search indexing
* Groups
* Group administration foundations
* Stickers
* GIFs
* Link previews

This volume must integrate with existing account, device, conversation, and messaging functionality.

Do not redesign authentication.

Do not redesign the core message model unnecessarily.

Do not rewrite unrelated backend modules.

Do not implement frontend or mobile code.

---

# 2. MEDIA DOMAIN

Create a production-grade media domain.

Support media categories including:

* Images
* Videos
* Audio
* Voice messages
* Documents
* Stickers
* Thumbnails
* Preview images

Media metadata must include appropriate information such as:

* Media ID
* Owner
* Message association
* Media type
* MIME type
* Size
* Storage key
* Processing state
* Upload state
* Hash/checksum where appropriate
* Width
* Height
* Duration
* Created timestamp
* Processing timestamps
* Availability state

Do not trust client-supplied metadata without server validation.

---

# 3. MEDIA UPLOAD ARCHITECTURE

Implement secure upload workflows.

Prefer direct-to-object-storage uploads using short-lived signed upload URLs where appropriate.

The workflow should support:

1. Authenticated upload initialization.
2. Authorization validation.
3. Media metadata creation.
4. Signed upload generation.
5. Direct object upload.
6. Upload completion confirmation.
7. Object validation.
8. Asynchronous processing.
9. Processing status updates.
10. Final media availability.

Do not route large media files unnecessarily through the application server.

Do not trust a client claiming that an object exists.

Verify uploaded objects through storage APIs and validated metadata.

---

# 4. MEDIA SECURITY

Protect media against:

* Unauthorized access
* Object enumeration
* MIME spoofing
* Malicious file uploads
* Oversized files
* Path traversal
* Executable uploads
* Content-type confusion
* Public bucket exposure
* Long-lived access URLs

Use opaque storage keys.

Do not derive storage keys directly from user-controlled filenames.

Validate MIME type using server-side inspection where practical.

Apply per-media-type size limits.

Use malware-scanning integration points where required.

Do not expose object-storage credentials to clients.

---

# 5. MEDIA STORAGE

Implement an object-storage abstraction.

Support:

* Upload
* Multipart upload where appropriate
* Object existence verification
* Object metadata
* Signed URLs
* Signed download access
* Delete
* Lifecycle metadata
* Storage key generation

Do not hard-code S3 implementation throughout domain services.

Create a storage abstraction so compatible object storage can be used for testing and future infrastructure changes.

---

# 6. MEDIA PROCESSING PIPELINE

Implement asynchronous media processing.

Use BullMQ or the durable event infrastructure as appropriate.

Processing must support:

* Image transformation
* Thumbnail generation
* Video metadata extraction
* Video transcoding
* Audio metadata extraction
* Audio normalization where required
* Voice-message processing
* Preview generation

Jobs must be:

* Idempotent
* Retryable
* Observable
* Versioned
* Recoverable

Do not perform CPU-intensive processing inside HTTP request handlers.

---

# 7. IMAGE PROCESSING

Implement secure image processing.

Support:

* Dimension extraction
* Orientation normalization
* Thumbnail generation
* Preview generation
* Appropriate format conversion
* Metadata stripping where privacy requires it
* Size validation

Protect against decompression bombs and pathological image dimensions.

Do not process untrusted images without resource limits.

Do not allow arbitrary image-processing parameters to exhaust CPU or memory.

---

# 8. VIDEO PROCESSING

Implement a scalable video-processing foundation using FFmpeg or an equivalent production-grade media pipeline.

Support:

* Metadata extraction
* Duration extraction
* Resolution detection
* Thumbnail generation
* Preview generation
* Transcoding architecture
* Processing status
* Failure handling

Configure:

* CPU limits
* Memory limits
* Execution timeouts
* Input validation
* Output validation

Never execute arbitrary shell commands constructed from user input.

Use safe process invocation.

---

# 9. AUDIO AND VOICE MESSAGES

Implement audio processing foundations.

Support:

* Audio metadata
* Duration
* MIME validation
* Voice-message metadata
* Transcoding where required
* Normalization where appropriate
* Preview metadata

Protect processing workers from malicious media.

Ensure failed jobs do not leave media permanently marked as processing.

---

# 10. MEDIA THUMBNAILS AND PREVIEWS

Generate thumbnails and previews asynchronously.

Thumbnails must:

* Have deterministic dimensions
* Have validated formats
* Use safe processing limits
* Be stored independently
* Have authorization-aware delivery

Do not expose original media merely because a thumbnail exists.

Do not assume a thumbnail grants access to the original object.

---

# 11. MEDIA DOWNLOAD AUTHORIZATION

Implement secure media access.

Before issuing a signed download URL:

1. Authenticate the requester.
2. Resolve the media.
3. Resolve its owning message.
4. Resolve the conversation.
5. Validate user authorization.
6. Validate message/media visibility.
7. Generate a short-lived signed URL.

Do not allow users to retrieve arbitrary objects by storage key.

Do not expose permanent public URLs for private media.

---

# 12. MEDIA LIFECYCLE

Implement media states such as:

* Uploading
* Uploaded
* Processing
* Available
* Failed
* Deleted
* Expired where applicable

Ensure state transitions are validated.

Media cleanup must be asynchronous and idempotent.

Deleted messages must not automatically imply immediate physical object deletion if retention, legal, or operational requirements require delayed cleanup.

---

# 13. MEDIA DEDUPLICATION

Implement media deduplication only where technically and privacy-wise appropriate.

If hashes are used:

* Generate them securely.
* Avoid exposing whether another user has uploaded identical private content.
* Do not create cross-user privacy leaks.
* Preserve authorization boundaries.

Do not use global content deduplication as an excuse to reveal media existence.

---

# 14. CDN DELIVERY

Integrate media delivery with a CDN.

Support:

* Short-lived signed access
* Cache-aware object delivery
* Appropriate cache headers
* Regional edge delivery
* Origin protection

Private media must not become publicly accessible through CDN configuration.

Do not cache personalized authorization responses incorrectly.

---

# 15. PUSH NOTIFICATION DOMAIN

Implement a notification domain supporting:

* Notification creation
* Notification preferences
* Device registration
* Push delivery
* Notification status
* Notification retries
* Notification deduplication
* Notification collapse/grouping where appropriate

Notifications must be generated asynchronously.

Do not block message creation waiting for push delivery.

---

# 16. DEVICE PUSH REGISTRATION

Support:

* FCM tokens
* APNs tokens
* Platform
* Device association
* Token lifecycle
* Token invalidation
* Last-used timestamp

Do not treat push tokens as permanent.

Handle provider responses indicating expired or invalid tokens.

Never expose push tokens through ordinary user APIs.

---

# 17. PUSH NOTIFICATION CONTENT

Notification payloads must respect privacy settings.

Support different notification visibility modes.

Avoid placing sensitive message content into push payloads when the user has disabled previews.

Never include:

* Authentication tokens
* Private credentials
* Internal database identifiers
* Sensitive metadata unnecessary for notification display

Design payloads for both Android and iOS constraints.

---

# 18. NOTIFICATION FAN-OUT

Implement asynchronous notification fan-out.

A message notification workflow must:

1. Confirm the message is durable.
2. Resolve eligible recipients.
3. Resolve eligible devices.
4. Apply notification preferences.
5. Apply mute settings.
6. Apply privacy rules.
7. Create notification jobs.
8. Deliver through the correct provider.
9. Process provider responses.
10. Retry transient failures.
11. Invalidate permanently invalid tokens.

Do not create notification jobs for users who should not receive the notification.

---

# 19. NOTIFICATION DEDUPLICATION

Prevent duplicate notifications caused by:

* Message retries
* Worker retries
* Provider retries
* Multiple backend instances
* Replayed events

Use deterministic notification identities where appropriate.

Notification delivery must be idempotent.

---

# 20. NOTIFICATION RATE CONTROL

Protect users from notification floods.

Support:

* Per-user throttling
* Per-conversation grouping
* Message burst collapsing
* Provider rate limits
* Retry backoff
* Queue backpressure

Do not allow a high-volume conversation to create unbounded notification work.

---

# 21. SEARCH DOMAIN

Implement a production search domain.

Support search for:

* Users
* Conversations
* Messages
* Groups
* Media metadata where appropriate

Search must respect authorization.

Never return a result solely because it exists in Elasticsearch/OpenSearch.

Always enforce application-level access rules.

---

# 22. SEARCH INDEXING

Implement derived search indexing.

Index data must contain only information necessary for supported search functionality.

Support:

* Index creation
* Index updates
* Index deletion
* Reindexing
* Retry
* Dead-letter handling
* Versioning
* Schema evolution

Search indexing must be asynchronous.

Do not make search-index availability a prerequisite for storing a message.

---

# 23. SEARCH CONSISTENCY

Treat search as eventually consistent.

A message may become searchable after durable message creation.

Do not claim search results are transactionally synchronized with PostgreSQL.

Provide mechanisms for:

* Index lag monitoring
* Failed indexing detection
* Reindexing
* Recovery after search cluster outages

If search is unavailable, message creation and retrieval must continue.

---

# 24. MESSAGE SEARCH

Implement message search with:

* Conversation scoping
* User authorization
* Pagination
* Query validation
* Search-term normalization
* Result ranking
* Highlighting where appropriate

Do not return messages from conversations the user can no longer access.

Do not rely on search index ACLs as the sole authorization mechanism.

---

# 25. USER SEARCH

Implement privacy-aware user discovery.

Support:

* Username/search identifier lookup
* Optional display-name search
* Search restrictions
* Block filtering
* Discoverability preferences

Prevent mass account enumeration.

Apply rate limits.

Do not expose hidden users through search.

---

# 26. GROUP FOUNDATION

Implement group-management foundations.

Support:

* Group creation
* Group metadata
* Group avatar metadata
* Member listing
* Member addition
* Member removal
* Role foundation
* Group ownership
* Group administrators
* Group settings

All membership changes must be transactional.

All group operations must validate authorization.

---

# 27. GROUP AUTHORIZATION

Implement explicit group permissions.

Support permissions for:

* Add members
* Remove members
* Edit group information
* Manage administrators
* Send messages
* Restrict members
* Delete messages where permitted

Do not implement group permissions only on the client.

Every operation must be authorized server-side.

---

# 28. LARGE GROUP SCALABILITY

Design group operations for large memberships.

Avoid:

* Loading every member into memory unnecessarily
* Synchronous notification fan-out
* Synchronous presence broadcasting to every member
* Full membership scans for every message

Use asynchronous processing and pagination where required.

---

# 29. STICKER FOUNDATION

Implement a sticker domain foundation.

Support:

* Sticker packs
* Stickers
* Metadata
* Ordering
* Availability
* Ownership or publisher metadata where applicable

Validate uploaded sticker assets.

Do not trust client-provided MIME types.

Prepare the system for future sticker marketplace or catalog functionality without coupling it to messaging.

---

# 30. GIF INTEGRATION FOUNDATION

Implement a provider abstraction for GIF search.

Do not hard-code one external GIF provider throughout the application.

The abstraction should support:

* Search
* Trending
* Result metadata
* Provider attribution
* Provider failures
* Rate limiting
* Caching where appropriate

Do not store external provider secrets in source code.

---

# 31. LINK PREVIEW FOUNDATION

Implement secure link-preview infrastructure.

Support:

* URL validation
* Domain restrictions where appropriate
* Fetch timeout
* Redirect limits
* Response-size limits
* Content-type validation
* Metadata extraction
* Cache behavior

Protect against:

* SSRF
* Internal network access
* Cloud metadata access
* DNS rebinding
* Infinite redirects
* Oversized responses
* Malicious HTML

Never allow arbitrary internal URLs to be fetched by backend infrastructure.

---

# 32. BACKGROUND JOB ARCHITECTURE

Create queues for workloads belonging to this volume, such as:

* Media processing
* Thumbnail generation
* Video processing
* Notification delivery
* Search indexing
* Search cleanup
* Media cleanup
* Link preview processing

Every queue must define:

* Ownership
* Job payload
* Retry policy
* Backoff
* Timeout
* Concurrency
* Failure handling
* Observability
* Idempotency

Do not create unbounded worker concurrency.

---

# 33. SECURITY AND PRIVACY REVIEW

Review all new functionality for:

* Unauthorized media access
* Object enumeration
* Search leakage
* Group membership leakage
* Notification leakage
* Push-token exposure
* SSRF
* Malicious uploads
* Resource exhaustion
* Queue abuse
* Search abuse
* Provider credential exposure
* CDN misconfiguration
* Signed URL misuse
* Cross-user data leakage

Fix discovered issues before completion.

---

# 34. OBSERVABILITY AND PERFORMANCE

Instrument:

* Upload initialization
* Upload completion
* Media processing
* Media processing latency
* Media failures
* Queue depth
* Job latency
* Push delivery
* Push failures
* Search latency
* Search failures
* Search indexing lag
* Group operations
* Link-preview processing
* CDN-related operations where observable

Create metrics and traces that allow operators to identify bottlenecks.

Do not place private message contents into telemetry.

---

# 35. TESTING

Implement tests for:

### Media

* Upload authorization
* Invalid MIME types
* Oversized uploads
* Missing objects
* Processing failures
* Signed URL authorization
* Deleted media
* Unauthorized media access

### Notifications

* Device registration
* Invalid tokens
* Notification preferences
* Mute behavior
* Deduplication
* Retry behavior
* Provider failures

### Search

* Authorization
* Pagination
* Index lag
* Failed indexing
* Reindexing
* Deleted content
* Blocked users
* Conversation access

### Groups

* Membership authorization
* Role authorization
* Member addition/removal
* Large membership behavior

### Link previews

* SSRF protection
* Redirect limits
* Timeout
* Oversized response
* Invalid content
* Private IP blocking

Use integration and end-to-end tests where behavior crosses infrastructure boundaries.

---

# 36. DATABASE AND INDEX VALIDATION

Review all schema changes.

Verify:

* Foreign keys
* Unique constraints
* Indexes
* Query performance
* Cascading behavior
* Soft deletion behavior
* Retention behavior

Verify Elasticsearch/OpenSearch mappings.

Ensure indexes support actual query patterns.

Do not create mappings that expose unnecessary private information.

---

# 37. FAILURE AND RECOVERY

Test failure scenarios including:

* Object storage unavailable
* Upload interrupted
* Media worker crash
* FFmpeg failure
* Redis unavailable
* Queue unavailable
* Search unavailable
* Search indexing failure
* FCM failure
* APNs failure
* Provider throttling
* Database transient failure
* CDN failure
* Link-preview target timeout

The system must degrade safely.

Message persistence must not depend on search availability.

Message persistence must not depend on push-provider availability.

Media upload must not require synchronous media processing.

---

# 38. REPOSITORY INTEGRATION

Integrate all implementation into the existing repository.

Update where necessary:

* Source code
* Prisma schema
* Migrations
* Queue configuration
* Event configuration
* Storage configuration
* Search configuration
* Notification configuration
* Environment examples
* Tests
* API documentation
* Backend documentation
* Docker configuration
* Package scripts

Do not overwrite unrelated implementation.

Do not regenerate unchanged files.

Preserve existing API compatibility unless a migration is technically required and documented.

---

# 39. VALIDATION AND COMPLETION

Before declaring completion:

1. Run formatting checks.
2. Run linting.
3. Run TypeScript compilation/type checking.
4. Validate Prisma schema.
5. Validate migrations.
6. Run unit tests.
7. Run integration tests.
8. Run relevant end-to-end tests.
9. Verify object-storage integration or safe test equivalent.
10. Verify media processing workers.
11. Verify notification workers.
12. Verify search indexing.
13. Verify search authorization.
14. Verify group authorization.
15. Verify SSRF protection.
16. Verify signed media access.
17. Verify queue retry behavior.
18. Verify failure recovery.
19. Verify telemetry.
20. Review security controls.
21. Review database indexes.
22. Review API documentation.
23. Review repository changes for unrelated modifications.

Do not declare successful validation if checks failed.

---

# 40. FINAL IMPLEMENTATION REPORT

When implementation is complete, provide:

1. **Implementation Summary**
2. **Media Architecture**
3. **Storage Changes**
4. **Media Processing Pipeline**
5. **CDN and Signed URL Implementation**
6. **Notification Architecture**
7. **FCM/APNs Integration**
8. **Search Architecture**
9. **Search Indexing**
10. **Group Management Changes**
11. **Sticker/GIF/Link Preview Changes**
12. **Queues and Workers**
13. **Database Changes**
14. **Security and Privacy Controls**
15. **Observability**
16. **Tests Added**
17. **Validation Commands**
18. **Validation Results**
19. **Known Limitations**
20. **Configuration Changes**
21. **Files and Directories Modified**

Report actual implementation only.

Do not claim that external services were successfully tested if credentials or infrastructure were unavailable.

Clearly distinguish implemented functionality from infrastructure-dependent validation.

---

# BACKEND VOLUME 3 COMPLETION STANDARD

This volume is complete only when the backend provides production-grade foundations for:

* Secure media handling
* Scalable media processing
* CDN-based media delivery
* Push notifications
* Notification preferences
* Search
* Search indexing
* Group administration
* Stickers
* GIF integration
* Secure link previews

The implementation must be:

* Secure
* Privacy-preserving
* Horizontally scalable
* Asynchronous where appropriate
* Idempotent
* Observable
* Failure-aware
* Testable
* Production-ready

Do not leave placeholders.

Do not leave TODO/FIXME implementation gaps.

Do not use pseudo-code.

Do not omit required implementations.

Do not say “implement similarly.”

Do not say “remaining code omitted.”

Do not replace implementation with explanations.

Inspect the repository, implement the scope completely, integrate it, validate it, and report the exact result.
