Using the approved Architecture Blueprint and the Master Prompt above.

Begin backend implementation ONLY.

Do NOT generate frontend code.

Do NOT generate mobile code.

Do NOT generate infrastructure code unless required for backend execution.

Assume the Architecture Blueprint has been approved.

Follow it exactly.

Never redesign APIs.

Never redesign the database.

Never modify architectural decisions unless explicitly requested.

Generate code incrementally according to the Master Prompt milestone strategy.

────────────────────────────────────────

MISSION

Build the complete production-ready backend for a global real-time communication platform capable of supporting hundreds of millions of users.

The platform must support:

• Private Messaging
• Group Messaging
• Communities
• Channels
• Enterprise Organizations
• Voice Calls
• Video Calls
• Screen Sharing
• Presence
• Multi-device Synchronization
• Bots
• Webhooks
• Future AI Assistants
• Enterprise Collaboration
• Developer Platform

Design for:

• 500M+ registered users
• 100M+ daily active users
• 100B+ messages
• Millions of simultaneous WebSocket connections
• Millions of concurrent voice/video sessions
• Multi-region deployment
• Active-Active architecture
• Zero-downtime deployments

Every milestone must compile successfully before continuing.

────────────────────────────────────────

TECH STACK

Language

• TypeScript

Framework

• NestJS

Runtime

• Node.js

Database

• PostgreSQL
• Prisma ORM

Cache

• Redis

Realtime

• Socket.IO
• WebSockets

Streaming

• Kafka (or Redpanda)

Queues

• BullMQ

Search

• Elasticsearch / OpenSearch

Storage

• AWS S3-compatible Storage

Voice & Video

• WebRTC

Documentation

• OpenAPI / Swagger

────────────────────────────────────────

ARCHITECTURE

Strictly follow:

• Clean Architecture
• Domain-Driven Design (DDD)
• SOLID
• Repository Pattern
• Service Layer
• Dependency Injection
• CQRS where appropriate
• Event-Driven Architecture
• Feature-first organization

Never violate architectural boundaries.

────────────────────────────────────────

IMPLEMENT THE FOLLOWING DOMAINS

Identity

Authentication

Authorization

Users

Profiles

Devices

Sessions

Contacts

Social Graph

Presence

Messaging

Conversations

Groups

Communities

Channels

Threads

Media

Attachments

Voice Messages

Notifications

Search

Synchronization

Message Delivery

Read Receipts

Typing Indicators

Administration

Moderation

Trust & Safety

Spam Detection

Fraud Detection

Audit

Analytics

Feature Flags

Bot Platform

Webhook Platform

Developer Platform

Future AI Platform

────────────────────────────────────────

MICROSERVICES

Generate complete implementations for:

API Gateway

Authentication Service

Authorization Service

Identity Service

User Service

Profile Service

Session Service

Device Service

Contact Service

Conversation Service

Messaging Service

Group Service

Community Service

Channel Service

Presence Service

Typing Indicator Service

Read Receipt Service

Synchronization Service

Media Service

Media Processing Service

Voice Message Service

Notification Service

Push Notification Service

Search Service

Moderation Service

Spam Detection Service

Trust & Safety Service

Bot Platform Service

Webhook Service

Analytics Service

Feature Flag Service

Administration Service

Audit Service

────────────────────────────────────────

AUTHENTICATION

Implement:

• Registration

• Email Verification

• Phone Verification

• Login

• Logout

• JWT

• Refresh Tokens

• OAuth

• Passkeys-ready Architecture

• MFA-ready Architecture

• Device Sessions

• Trusted Devices

• Password Reset

• Session Revocation

• Device Revocation

────────────────────────────────────────

AUTHORIZATION

Implement complete RBAC.

Support:

Guest

Registered User

Verified User

Premium User

Community Moderator

Community Owner

Organization Administrator

Support

Trust & Safety

Administrator

Super Administrator

Bot

Internal Services

Generate:

Permission Guards

Permission Matrix

Decorators

Policies

Role Hierarchies

────────────────────────────────────────

DATABASE

Generate:

• Prisma Schema

• Migrations

• Indexes

• Constraints

• Foreign Keys

• Optimized Queries

• Transactions

• Read Models

• Seeders

• Partitioning Strategy

• Sharding Preparation

Optimize for:

500M+ users

100B+ messages

10B+ media files

Global replication

────────────────────────────────────────

IDENTITY

Implement:

Profiles

Usernames

Phone Numbers

Email Addresses

Profile Photos

Status

Biography

Privacy Settings

Blocked Users

Muted Users

Favorite Contacts

Verification Status

Device Registration
