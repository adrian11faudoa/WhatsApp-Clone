Using the Master Prompt above, build a production-ready global real-time communication platform comparable in architecture to WhatsApp, Telegram, Signal, Discord, Microsoft Teams, and Messenger.

The goal is not to clone any existing platform but to build a scalable, secure, cloud-native messaging ecosystem capable of supporting hundreds of millions of users, billions of messages, voice communication, media sharing, communities, bots, and future collaboration features.

──────────────────────────────

PRIMARY TECHNOLOGY STACK

Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

Mobile

- React Native
- Expo
- TypeScript

Backend

- Node.js
- NestJS
- TypeScript

Database

- PostgreSQL
- Prisma ORM

Caching

- Redis

Realtime

- Socket.IO
- WebSockets

Event Streaming

- Kafka (or Redpanda)

Queues

- BullMQ

Object Storage

- AWS S3-compatible Storage

CDN

- CloudFront

Search

- Elasticsearch

Notifications

- Firebase Cloud Messaging
- Apple Push Notification Service

Voice & Video

- WebRTC

Infrastructure

- Docker
- Kubernetes
- Helm
- GitHub Actions
- Terraform

Monitoring

- Prometheus
- Grafana
- Loki
- Tempo
- OpenTelemetry

Secrets

- HashiCorp Vault

──────────────────────────────

PLATFORM DOMAINS

Identity

Messaging

Social Graph

Media

Presence

Notifications

Communities

Calls

Synchronization

Search

Moderation

Administration

Analytics

Developer Platform

──────────────────────────────

MICROSERVICES

Generate independent services for:

API Gateway

Authentication Service

Authorization Service

Identity Service

User Service

Profile Service

Session Service

Device Service

Contact Service

Messaging Service

Conversation Service

Group Service

Channel Service

Community Service

Presence Service

Typing Indicator Service

Read Receipt Service

Message Delivery Service

Message Synchronization Service

Media Service

Media Processing Service

Voice Message Service

Video Processing Service

Search Service

Notification Service

Push Notification Service

Voice Call Service

Video Call Service

WebRTC Signaling Service

Bot Platform Service

Webhook Service

Moderation Service

Spam Detection Service

Trust & Safety Service

Analytics Service

Feature Flag Service

Administration Service

Audit Service

──────────────────────────────

AUTHENTICATION

Registration

Email Verification

Phone Verification

OAuth

JWT Authentication

Refresh Tokens

Session Management

Device Management

Password Reset

Passkeys

Multi-factor Authentication

RBAC

──────────────────────────────

USER FEATURES

Profiles

Avatar

Status

Bio

Username

Phone Number

Privacy Settings

Blocked Users

Muted Users

Favorite Contacts

Last Seen

Online Status

Multiple Devices

──────────────────────────────

CONTACTS

Contact Discovery

Address Book Sync

Friend Requests

Contact Invitations

Favorite Contacts

Blocked Contacts

Suggested Contacts

──────────────────────────────

CONVERSATIONS

One-to-One Chats

Group Chats

Communities

Channels

Private Channels

Broadcast Lists

Threaded Replies

Pinned Messages

Pinned Chats

Archived Chats

Folders

Draft Messages

Scheduled Messages

──────────────────────────────

MESSAGING

Real-time Messaging

Offline Queue

Delivery Confirmation

Read Receipts

Typing Indicators

Message Editing

Message Deletion

Message Recall

Quoted Replies

Forward Messages

Message Reactions

Emoji Support

Rich Text

Markdown

Code Blocks

Mentions

──────────────────────────────

MEDIA

Images

Videos

Voice Messages

Audio Files

Documents

PDF

Location Sharing

Contacts

GIFs

Stickers

Animated Emojis

Preview Generation

Compression

Metadata Extraction

Virus Scanning

──────────────────────────────

VOICE & VIDEO

Voice Calls

Video Calls

Group Voice Calls

Group Video Calls

Screen Sharing

Call Recording (optional)

Call History

Missed Calls

Call Notifications

──────────────────────────────

REAL-TIME FEATURES

Presence

Online Status

Last Seen

Typing Indicators

Live Message Delivery

Message Synchronization

Connection Recovery

Offline Synchronization

Heartbeat Monitoring

──────────────────────────────

SEARCH

Messages

Conversations

Users

Groups

Communities

Media

Documents

Autocomplete

Full-text Search

Advanced Filters

──────────────────────────────

NOTIFICATIONS

Push Notifications

In-app Notifications

Desktop Notifications

Email Notifications

Notification Preferences

Mute Conversations

Scheduled Notifications

──────────────────────────────

COMMUNITIES

Communities

Channels

Roles

Permissions

Announcements

Invitations

Moderation

Member Management

──────────────────────────────

BOT PLATFORM

Bot Accounts

Slash Commands

Webhook Integrations

Automation

Bot Permissions

Bot API

──────────────────────────────

SECURITY

End-to-End Encryption Architecture

Encrypted Media

Encrypted Backups

Key Management

Session Validation

Device Verification

Rate Limiting

Abuse Detection

Spam Detection

Fraud Detection

Audit Logging

──────────────────────────────

MODERATION

User Reporting

Spam Detection

Automated Moderation

Content Filtering

Community Moderation

Appeals

Moderator Dashboard

──────────────────────────────

ANALYTICS

Daily Active Users

Message Volume

Media Usage

Call Statistics

Delivery Latency

Connection Metrics

Platform Health

──────────────────────────────

DATABASE

Design for:

500M+ users

100B+ messages

10B+ media files

Global deployment

Read replicas

Partitioning

Sharding strategy

Efficient message indexing

──────────────────────────────

MEDIA STORAGE

Generate architecture supporting:

Images

Videos

Voice Messages

Documents

Profile Photos

Group Photos

Video Thumbnails

Signed URLs

CDN Caching

Lifecycle Policies

──────────────────────────────

EVENT-DRIVEN ARCHITECTURE

Use Kafka or Redpanda as the event backbone.

Generate events for:

User Registered

User Logged In

Conversation Created

Message Sent

Message Delivered

Message Read

Message Edited

Message Deleted

Media Uploaded

Call Started

Call Ended

Notification Sent

Presence Changed

Group Created

Member Added

Bot Invoked

──────────────────────────────

PHASE 1 REQUIREMENTS

Generate only:

1. Complete enterprise system architecture
2. Domain decomposition
3. Service boundaries
4. Monorepo structure
5. Folder hierarchy
6. ERD
7. PostgreSQL schema
8. Prisma schema
9. Redis architecture
10. Kafka event catalog
11. Elasticsearch mappings
12. Queue architecture
13. API contracts
14. WebSocket architecture
15. Authentication architecture
16. Authorization model
17. End-to-End Encryption architecture
18. Voice & Video architecture
19. Media processing pipeline
20. Push notification architecture
21. Deployment architecture
22. Kubernetes topology
23. Infrastructure overview
24. Security architecture
25. Disaster recovery strategy
26. Project index

Do not implement backend code yet.

Stop after Phase 1 and wait for confirmation.

──────────────────────────────

ARCHITECTURAL DECISIONS

Unless there is a compelling technical reason otherwise, assume:

• NestJS for all backend services.
• PostgreSQL + Prisma for transactional data.
• Redis for caching, distributed locks, sessions, and presence.
• Kafka (or Redpanda) as the event backbone.
• BullMQ for asynchronous processing.
• Socket.IO for real-time messaging.
• WebRTC for voice and video calling.
• Elasticsearch for message search.
• AWS S3-compatible object storage for media.
• CloudFront as the CDN.
• Firebase Cloud Messaging and Apple Push Notification Service for push notifications.
• Kubernetes for orchestration.
• Terraform for infrastructure provisioning.
• OpenTelemetry for observability.
• Vault for secrets management.
• Event-driven communication between services where appropriate.
• CQRS where appropriate.
• Clean Architecture.
• Domain-Driven Design.
• Repository Pattern.
• Dependency Injection.

Design every architectural decision as if this platform will eventually support hundreds of millions of users, billions of messages, global real-time communication, multi-device synchronization, enterprise-grade reliability, and future expansion into collaboration, productivity, and communication services.
