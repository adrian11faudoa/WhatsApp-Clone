Using the approved Architecture Blueprint, the approved Backend Blueprint, the approved Frontend Blueprint, and the Master Prompt above.

Begin infrastructure and DevOps implementation ONLY.

Do NOT generate backend business logic.

Do NOT generate frontend or mobile code.

Do NOT redesign the architecture.

Assume all architectural decisions have been approved.

Your responsibility is to build the complete enterprise cloud platform capable of operating one of the world's largest real-time communication ecosystems.

Generate infrastructure incrementally according to the Master Prompt milestone strategy.

────────────────────────────────────────

MISSION

Build a production-ready cloud infrastructure capable of supporting:

• 500M+ registered users

• 100M+ daily active users

• Billions of messages

• Millions of simultaneous WebSocket connections

• Millions of concurrent voice/video sessions

• Multi-region active-active deployments

• Zero-downtime deployments

• High availability

• Disaster recovery

• Global scalability

The infrastructure must be cloud-native, secure, observable, resilient, and cost-efficient.

────────────────────────────────────────

TARGET ENVIRONMENTS

Generate complete infrastructure for:

• Local Development

• Development

• QA

• Staging

• Production

• Disaster Recovery

────────────────────────────────────────

CLOUD PLATFORM

Target AWS.

Generate infrastructure for:

Networking

• VPC

• Public Subnets

• Private Subnets

• Multi-AZ Architecture

• NAT Gateways

• Internet Gateway

• Route Tables

• Security Groups

• Network ACLs

Compute

• Amazon EKS

• Managed Node Groups

• Karpenter

• Cluster Autoscaler

• Horizontal Pod Autoscaler

• Vertical Pod Autoscaler

Load Balancing

• Application Load Balancers

• Network Load Balancers

• Internal Load Balancers

Storage

• Amazon S3

• Amazon EBS

• Amazon EFS

Database

• PostgreSQL

• Read Replicas

• PITR

• Automated Backups

Cache

• Redis

Search

• OpenSearch / Elasticsearch

Streaming

• Kafka / Redpanda

Queues

• BullMQ

Registry

• Amazon ECR

DNS

• Route53

Certificates

• AWS Certificate Manager

Secrets

• HashiCorp Vault

CDN

• CloudFront

────────────────────────────────────────

REAL-TIME INFRASTRUCTURE

Generate infrastructure supporting:

Global WebSocket Gateways

Regional Gateway Clusters

Socket Load Balancing

Connection Affinity

Gateway Autoscaling

Presence Clusters

Session Replication

Regional Failover

Low-Latency Routing

Millions of Persistent Connections

────────────────────────────────────────

VOICE & VIDEO INFRASTRUCTURE

Generate:

WebRTC Signaling Clusters

TURN Servers

STUN Servers

SFU Deployment

Media Relay Infrastructure

Bandwidth Monitoring

Adaptive Bitrate Support

QoS Monitoring

Regional Call Routing

Call Failover

────────────────────────────────────────

MEDIA INFRASTRUCTURE

Support:

Image Storage

Video Storage

Voice Message Storage

Document Storage

Profile Photos

Community Assets

Video Thumbnails

Compression Workers

Virus Scanning Workers

Metadata Extraction

Signed URLs

CloudFront Distribution

Lifecycle Policies

Cross-Region Replication

────────────────────────────────────────

EVENT STREAMING

Configure:

Kafka / Redpanda Clusters

Topic Design

Replication

Retention Policies

Dead Letter Topics

Consumer Groups

Schema Registry-ready Architecture

Monitoring

Autoscaling

────────────────────────────────────────

CONTAINERIZATION

Generate:

Development Dockerfiles

Production Dockerfiles

Multi-stage Builds

Docker Compose

Container Optimization

Image Signing

Container Security

────────────────────────────────────────

KUBERNETES

Generate manifests for:

Namespaces

Deployments

StatefulSets

DaemonSets

Jobs

CronJobs

Services

Ingress

Gateway API (future-ready)

ConfigMaps

Secrets

Persistent Volumes

Persistent Volume Claims

Network Policies

Pod Security Standards

Service Accounts

RBAC

Resource Quotas

Limit Ranges

Pod Disruption Budgets

HPA

VPA

────────────────────────────────────────

HELM

Generate:

Reusable Helm Charts

Environment Overrides

Secrets Integration

Values Files

Chart Documentation

────────────────────────────────────────

INFRASTRUCTURE AS CODE

Generate Terraform modules for:

Networking

IAM

EKS

PostgreSQL

Redis

Kafka / Redpanda

OpenSearch

S3

CloudFront

ECR

Load Balancers

DNS

Certificates

Vault

Monitoring

Logging

Backups

Disaster Recovery

────────────────────────────────────────

CI/CD

Generate GitHub Actions workflows for:

Formatting

Linting

Unit Tests

Integration Tests

Security Scanning

Dependency Scanning

Container Builds

Container Scanning

Artifact Publishing

Preview Environments

Development Deployment

Staging Deployment

Production Deployment

Blue-Green Deployments

Canary Releases

Automatic Rollbacks

Semantic Versioning

Release Automation

────────────────────────────────────────

OBSERVABILITY

Generate:

Prometheus

Grafana

Loki

Tempo

OpenTelemetry

Distributed Tracing

Structured Logging

Business Dashboards

Infrastructure Dashboards

Realtime Metrics

Voice Metrics

Video Metrics

Message Delivery Metrics

Connection Metrics

Kafka Metrics

Redis Metrics

Database Metrics

────────────────────────────────────────

ALERTING

Generate alerts for:

CPU

Memory

Disk

Node Health

Cluster Health

Database Health

Redis Health

Kafka Health

OpenSearch Health

Gateway Health

Message Latency

Call Latency

API Latency

WebSocket Failures

Queue Backlogs

SSL Expiration

Backup Failures

────────────────────────────────────────

SECURITY

Implement:

TLS Everywhere

IAM Least Privilege

Kubernetes RBAC

Network Policies

Vault Integration

Secrets Rotation

Container Scanning

Image Signing

Runtime Security

Encryption at Rest

Encryption in Transit

DDoS Protection

WAF-ready Architecture

OWASP Best Practices

SOC 2 Readiness

ISO 27001 Readiness

GDPR Compliance

CCPA Compliance

────────────────────────────────────────

BACKUPS

Generate:

Database Backups

Redis Backups

Kafka Snapshots

OpenSearch Snapshots

S3 Replication

Retention Policies

Restore Automation

Backup Verification

────────────────────────────────────────

DISASTER RECOVERY

Design:

Recovery Time Objective (RTO)

Recovery Point Objective (RPO)

Cross-Region Failover

Database Recovery

Redis Recovery

Kafka Recovery

Search Recovery

Application Recovery

Traffic Failover

Operational Runbooks

────────────────────────────────────────

PERFORMANCE

Optimize:

Autoscaling

Connection Pooling

CloudFront Edge Caching

Gateway Throughput

Compression

Worker Scaling

Resource Requests

Resource Limits

────────────────────────────────────────

COST OPTIMIZATION

Generate strategies for:

Spot Instances

Reserved Capacity

Autoscaling Policies

Storage Tiering

CloudFront Optimization

Lifecycle Rules

Cost Monitoring

FinOps Dashboards

────────────────────────────────────────

COMPLIANCE

Prepare infrastructure for:

SOC 2

ISO 27001

GDPR

CCPA

PCI DSS (future payments)

Audit Logging

Retention Policies

────────────────────────────────────────

TESTING

Generate infrastructure testing for:

Terraform Validation

Helm Validation

Kubernetes Validation

Disaster Recovery Drills

Backup Restoration

WebSocket Load Testing

Kafka Stress Testing

Voice/Video Stress Testing

Chaos Engineering

Smoke Tests

────────────────────────────────────────

DOCUMENTATION

Generate:

Infrastructure Overview

Deployment Guide

Operations Guide

Secrets Management Guide

Monitoring Guide

Incident Response Guide

Disaster Recovery Guide

Runbooks

Capacity Planning Guide

Maintenance Guide

Cost Optimization Guide

────────────────────────────────────────

PROJECT ORGANIZATION

Maintain throughout development:

Current Milestone

Generated Infrastructure Files

Terraform Modules

Helm Charts

Docker Images

GitHub Actions

Monitoring Components

Networking Components

Security Components

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

Generate the infrastructure incrementally according to the Master Prompt.

Each milestone should contain approximately 20–40 files.

At the end of every milestone:

• Verify the infrastructure is deployable.

• Update the project index.

• List completed infrastructure components.

• Identify the next file to generate.

STOP and wait for approval before generating the next milestone.
