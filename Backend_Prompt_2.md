Continue the backend implementation using the approved Architecture Blueprint and the previous Backend Prompt.

Do NOT redesign any architecture.

Do NOT generate frontend, mobile, or infrastructure code.

Continue incrementally according to the Master Prompt milestone strategy.

────────────────────────────────────────

MESSAGING DOMAIN

Implement complete production-ready messaging services supporting:

• One-to-One Conversations
• Group Conversations
• Communities
• Channels
• Broadcast Lists
• Threaded Replies
• Message Threads
• Saved Messages
• Archived Conversations
• Conversation Folders
• Scheduled Messages
• Draft Messages
• Cross-device Synchronization

Generate:

Conversation Aggregate

Message Aggregate

Conversation Repository

Message Repository

Conversation Service

Message Service

Conversation Policies

Conversation Events

Conversation DTOs

Conversation Validation

────────────────────────────────────────

MESSAGE FEATURES

Implement:

Real-time Messaging

Offline Messaging

Message Queueing

Guaranteed Delivery

Read Receipts

Typing Indicators

Message Editing

Message Deletion

Message Recall

Quoted Replies

Forwarding

Message Reactions

Emoji Support

Markdown

Rich Text

Code Blocks

Mentions

Replies

Pinned Messages

Bookmarks

Expiration-ready Architecture

Self-destruct Messages (future-ready)

────────────────────────────────────────

MESSAGE STORAGE

Design for:

Append-only storage where appropriate

Conversation partitioning

Time-based partitioning

Read optimization

Write optimization

Hot conversations

Cold storage

Archive strategy

Soft deletes

Retention policies

────────────────────────────────────────

MESSAGE DELIVERY

Implement:

Delivery Pipeline

Retry Policies

Dead Letter Queues

Priority Queues

Delivery Acknowledgements

Ordering Guarantees

Idempotency

Duplicate Detection

Offline Queue

Synchronization Queue

Connection Recovery

Conflict Resolution

────────────────────────────────────────

PRESENCE

Implement:

Online Status

Last Seen

Away

Busy

Invisible

Heartbeat Monitoring

Presence Expiration

Distributed Presence Cache

Presence Synchronization

────────────────────────────────────────

MEDIA DOMAIN

Support:

Images

Videos

Voice Messages

Audio

Documents

PDF

GIF

Stickers

Animated Emoji

Contacts

Location Sharing

Generate:

Signed Upload URLs

Signed Download URLs

Virus Scanning

Metadata Extraction

Compression

Thumbnail Generation

Preview Generation

Media Validation

Lifecycle Policies

────────────────────────────────────────

VOICE MESSAGES

Implement:

Recording Upload

Waveform Generation

Compression

Streaming Playback

Metadata Extraction

Playback Analytics

────────────────────────────────────────

VOICE & VIDEO

Implement backend services for:

Voice Calls

Video Calls

Group Calls

Screen Sharing

Call Invitations

Call History

Call Notifications

Missed Calls

WebRTC Signaling

STUN/TURN Integration

ICE Candidate Exchange

Session Recovery

Adaptive Bitrate Support

Quality Metrics

Future Recording Support

────────────────────────────────────────

SEARCH

Implement Elasticsearch/OpenSearch.

Generate:

Message Search

Conversation Search

User Search

Group Search

Community Search

Media Search

Document Search

Autocomplete

Search Ranking

Synonyms

Language Detection

Search Analytics

Background Reindex Workers

────────────────────────────────────────

NOTIFICATIONS

Generate queue-based notification services.

Support:

Push Notifications

Email Notifications

In-App Notifications

Desktop Notifications

Scheduled Notifications

Notification Preferences

Conversation Mute

Mention Notifications

Retry Policies

Priority Queues

────────────────────────────────────────

SYNCHRONIZATION

Implement:

Multi-device Synchronization

Offline Synchronization

Pending Actions

Conflict Resolution

Message Replay

Session Recovery

Incremental Sync

Snapshot Sync

────────────────────────────────────────

BOT PLATFORM

Implement architecture supporting:

Bot Accounts

Slash Commands

Bot Permissions

Webhook Integration

Automation

Command Routing

Rate Limiting

Future AI Bots

────────────────────────────────────────

WEBHOOK PLATFORM

Generate:

Outgoing Webhooks

Incoming Webhooks

Retry Policies

Signature Verification

Secret Rotation

Event Filtering

Delivery Monitoring

────────────────────────────────────────

EVENT BUS

Use Kafka or Redpanda.

Generate producers and consumers for events including:

UserRegistered

UserLoggedIn

ConversationCreated

ConversationArchived

MessageSent

MessageDelivered

MessageRead

MessageEdited

MessageDeleted

TypingStarted

TypingStopped

PresenceChanged

MediaUploaded

MediaProcessed

VoiceMessageCreated

CallStarted

CallEnded

GroupCreated

MemberJoined

MemberRemoved

CommunityCreated

NotificationQueued

WebhookTriggered

BotInvoked

ModerationDecision

AnalyticsUpdated

FeatureFlagUpdated

AuditEventCreated

────────────────────────────────────────

BACKGROUND WORKERS

Implement BullMQ workers for:

Media Processing

Thumbnail Generation

Virus Scanning

Search Indexing

Notification Delivery

Analytics Aggregation

Cache Invalidation

Scheduled Messages

Synchronization

Data Cleanup

Retention Policies

────────────────────────────────────────

CACHE

Implement Redis for:

Sessions

Presence

Typing

Conversation Cache

Recent Messages

Search Cache

Notification Cache

Rate Limiting

Distributed Locks

Feature Flags

API Response Cache

────────────────────────────────────────

AI-READY ARCHITECTURE

Prepare backend interfaces for:

Conversation Summaries

Smart Replies

Semantic Search

Translation

Voice Transcription

Meeting Assistant

Knowledge Retrieval (RAG)

Content Moderation AI

Spam Detection AI

LLM Gateway

Prompt Management

AI Audit Logs

Usage Metering

────────────────────────────────────────

OBSERVABILITY

Generate:

Structured Logging

Distributed Tracing

Metrics

Health Checks

Readiness Checks

Liveness Checks

Message Delivery Metrics

Connection Metrics

Presence Metrics

Call Metrics

Search Metrics

Queue Metrics

────────────────────────────────────────

SECURITY

Implement:

OWASP Top 10

JWT

Refresh Tokens

RBAC

Rate Limiting

Input Validation

Secrets Management

Audit Logging

Encryption at Rest

Encryption in Transit

Session Validation

Device Verification

Spam Detection

Fraud Detection

Abuse Prevention

────────────────────────────────────────

TESTING

Generate:

Unit Tests

Integration Tests

Repository Tests

Controller Tests

Contract Tests

WebSocket Tests

Load Tests

Performance Tests

Security Tests

────────────────────────────────────────

PROJECT ORGANIZATION

Maintain:

Current Milestone

Generated Files

Completed Services

API Endpoints

Database Objects

Workers

Events

Dependencies

Remaining Work

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never generate pseudo-code.

Never generate placeholders.

Never omit implementations.

Never regenerate unchanged files.

Only modify files when required.

────────────────────────────────────────

STOP CONDITIONS

Generate the backend incrementally according to the Master Prompt.

Each milestone should contain approximately 20–40 files.

At the end of every milestone:

• Verify the backend compiles successfully.

• Update the project index.

• List completed services.

• Identify the next file to generate.

STOP and wait for approval before generating the next milestone.
