Using the Master Prompt above.

Continue the Enterprise Real-Time Communication Platform Architecture.

This section completes the Architecture Blueprint.

Do NOT generate source code.

Generate architecture only.

────────────────────────────────────────

END-TO-END ENCRYPTION

Design a Signal Protocol–compatible architecture supporting:

• End-to-End Encryption
• One-to-One Chats
• Group Chats
• Future Multi-device Encryption
• Perfect Forward Secrecy
• Double Ratchet
• X3DH Key Exchange
• Pre-Key Bundles
• Session Recovery
• Device Verification
• Device Revocation
• Identity Keys
• Signed PreKeys
• One-Time PreKeys
• Key Rotation
• Secure Backup Architecture
• Recovery Keys
• Encrypted Attachments
• Encrypted Metadata where possible

Generate complete trust model.

────────────────────────────────────────

REAL-TIME ARCHITECTURE

Design complete Socket.IO/WebSocket architecture.

Include:

Global Gateway Layer

Regional Gateway Layer

Connection Manager

Heartbeat Service

Presence Service

Typing Service

Delivery Confirmation

Read Receipts

Connection Recovery

Offline Queue

Reconnect Strategy

Regional Failover

Sticky Sessions

Gateway Scaling

Load Balancing

Millions of Concurrent Connections

Generate scaling strategy.

────────────────────────────────────────

MESSAGE DELIVERY

Design architecture supporting:

Exactly-once semantics where possible

At-least-once delivery

Offline delivery

Queued delivery

Retry policies

Priority queues

Ordering guarantees

Conversation ordering

Cross-device synchronization

Message acknowledgements

Conflict resolution

Idempotency

────────────────────────────────────────

VOICE & VIDEO

Design complete WebRTC architecture.

Generate:

Signaling Service

STUN

TURN

ICE

Peer Connection Flow

Media Servers

Selective Forwarding Unit (SFU)

Future MCU Support

Voice Calls

Video Calls

Group Calls

Screen Sharing

Adaptive Bitrate

Network Recovery

Call Recording Architecture

Call Analytics

Call Quality Metrics

────────────────────────────────────────

MEDIA PIPELINE

Generate architecture for:

Image Upload

Video Upload

Voice Messages

Audio Files

Documents

PDF

GIF

Stickers

Animated Emoji

Metadata Extraction

Virus Scanning

Thumbnail Generation

Compression

Video Transcoding

Voice Compression

Image Optimization

Signed Upload URLs

Signed Download URLs

CDN Distribution

Lifecycle Policies

Cold Storage Strategy

────────────────────────────────────────

SEARCH

Design Elasticsearch/OpenSearch architecture.

Support:

Message Search

Conversation Search

User Search

Group Search

Community Search

Media Search

Document Search

Autocomplete

Ranking

Synonyms

Language Detection

Spell Correction

Search Analytics

Reindex Strategy

Hot/Warm Indices

────────────────────────────────────────

CACHE STRATEGY

Design Redis architecture for:

Sessions

Presence

Typing

Rate Limiting

Distributed Locks

Recent Messages

Conversation Cache

Notification Cache

Media Metadata Cache

API Cache

Search Cache

Feature Flags

────────────────────────────────────────

EVENT-DRIVEN ARCHITECTURE

Use Kafka or Redpanda.

Generate complete event catalog.

Include events such as:

User Registered

User Verified

User Logged In

User Logged Out

Device Registered

Conversation Created

Conversation Archived

Message Sent

Message Delivered

Message Read

Message Edited

Message Deleted

Media Uploaded

Media Processed

Voice Message Created

Call Started

Call Ended

Call Missed

Presence Changed

Typing Started

Typing Stopped

Group Created

Member Joined

Member Removed

Role Changed

Community Created

Notification Sent

Bot Invoked

Webhook Triggered

Feature Flag Updated

Report Submitted

Moderation Decision

Analytics Updated

For every event define:

Producer

Consumers

Payload

Ordering

Retry Strategy

Dead Letter Queue Policy

────────────────────────────────────────

API ARCHITECTURE

Generate REST API contracts.

Generate WebSocket contracts.

Generate API versioning strategy.

Generate:

Authentication APIs

Messaging APIs

Media APIs

Calls APIs

Communities APIs

Groups APIs

Users APIs

Search APIs

Bot APIs

Webhook APIs

Administration APIs

Analytics APIs

Generate OpenAPI organization.

────────────────────────────────────────

AUTHENTICATION

Design complete authentication architecture.

Support:

Registration

Email Verification

Phone Verification

OAuth

Passkeys

MFA

JWT

Refresh Tokens

Device Sessions

Session Revocation

Password Reset

Account Recovery

Trusted Devices

────────────────────────────────────────

AUTHORIZATION

Generate complete RBAC model.

Support:

Users

Moderators

Community Owners

Organizations

Bots

Administrators

Super Administrators

System Services

Generate permission inheritance.

────────────────────────────────────────

SECURITY

Design:

OWASP Top 10 Compliance

Rate Limiting

CSRF

XSS

SQL Injection Protection

Secrets Management

Vault Integration

Secure Headers

CORS

Session Validation

Device Verification

Fraud Detection

Spam Detection

Abuse Prevention

Audit Logging

Encryption at Rest

Encryption in Transit

Threat Modeling

SOC 2 Readiness

ISO 27001 Readiness

GDPR Compliance

CCPA Compliance

────────────────────────────────────────

OBSERVABILITY

Design:

Prometheus

Grafana

Loki

Tempo

OpenTelemetry

Distributed Tracing

Business Metrics

Connection Metrics

Latency Metrics

Voice Metrics

Video Metrics

Message Metrics

Delivery Metrics

Regional Metrics

Alert Strategy

────────────────────────────────────────

DEPLOYMENT ARCHITECTURE

Design:

Global Multi-Region

Regional Clusters

Kubernetes Topology

Service Mesh

Ingress

Load Balancers

API Gateway

CDN

Secrets Management

Blue-Green Deployment

Canary Deployment

Automatic Rollback

Autoscaling

Disaster Recovery

Backup Strategy

Regional Failover

────────────────────────────────────────

DEVOPS

Generate architecture for:

GitHub Actions

Terraform

Helm

Docker

Kubernetes

Environment Strategy

Development

Testing

Staging

Production

Infrastructure as Code

────────────────────────────────────────

AI PLATFORM

Design future-ready architecture supporting:

AI Chat Assistant

Message Summaries

Smart Replies

Conversation Search

Semantic Search

Translation

Moderation AI

Spam Detection AI

Voice Transcription

Meeting Assistant

Knowledge Retrieval

RAG Architecture

LLM Gateway

AI Safety Layer

AI Usage Analytics

────────────────────────────────────────

TESTING STRATEGY

Generate architecture for:

Unit Tests

Integration Tests

Contract Tests

E2E Tests

Load Tests

Chaos Engineering

Security Tests

Penetration Tests

Voice Tests

Video Tests

Performance Benchmarks

────────────────────────────────────────

DOCUMENTATION

Generate:

Architecture Overview

Architecture Decision Records (ADRs)

Coding Standards

API Standards

Database Standards

Security Standards

Infrastructure Standards

Deployment Guide

Operations Guide

Incident Response Guide

Disaster Recovery Guide

Capacity Planning Guide

Engineering Handbook

Developer Onboarding Guide

────────────────────────────────────────

PROJECT INDEX

Generate and maintain:

Current Phase

Architecture Decisions

Bounded Contexts

Microservices

Events

Database Objects

Infrastructure Components

External Integrations

Generated Documents

Implementation Order

Dependencies

Remaining Work

────────────────────────────────────────

DELIVERABLE

Produce a complete enterprise architecture blueprint detailed enough that independent engineering teams can implement:

• Backend
• Web Frontend
• Mobile Applications
• DevOps
• Infrastructure
• QA
• AI Services

without making additional architectural decisions.

STOP after completing the architecture.

Wait for approval before beginning Backend implementation.
