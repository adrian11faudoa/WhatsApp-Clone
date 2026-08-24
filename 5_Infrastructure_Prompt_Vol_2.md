You are operating in Senior Engineering Team Mode.

Complete the remaining production infrastructure, DevOps, deployment, observability, security, scalability, disaster-recovery, CI/CD, and operational platform for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The infrastructure must support the established backend, web frontend, mobile applications, real-time systems, media systems, notification systems, and calling systems.

Do not redesign the application architecture.

Do not implement backend business logic.

Do not implement frontend code.

Do not implement mobile code.

Do not generate application business logic.

────────────────────────────────────────

MISSION

Complete the production infrastructure required for:

• Global multi-region deployment
• Zero-downtime releases
• Horizontal autoscaling
• WebSocket infrastructure
• Media-processing workloads
• Voice/video infrastructure
• TURN infrastructure
• Search infrastructure
• Kafka/Redpanda operations
• Redis high availability
• PostgreSQL production operations
• CI/CD
• Security automation
• Monitoring
• Alerting
• Centralized logging
• Distributed tracing
• Backups
• Disaster recovery
• Incident response
• Operational runbooks
• Cost optimization
• Infrastructure testing
• Production readiness

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Cloud:

• AWS

Orchestration:

• Kubernetes
• Amazon EKS
• Helm

Infrastructure as Code:

• Terraform

Containers:

• Docker
• Amazon ECR

CI/CD:

• GitHub Actions

Database:

• PostgreSQL

Cache:

• Redis

Event Streaming:

• Kafka or Redpanda

Search:

• Elasticsearch or OpenSearch

Object Storage:

• Amazon S3

CDN:

• CloudFront

DNS:

• Route 53

Certificates:

• AWS Certificate Manager

Secrets:

• AWS Secrets Manager
• Kubernetes secret integration
• Approved secret-management architecture

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Security:

• IAM
• KMS
• WAF
• NetworkPolicies
• Pod security controls
• Image scanning

────────────────────────────────────────

MULTI-REGION ARCHITECTURE

Implement production infrastructure supporting multiple AWS regions.

Define:

• Regional EKS clusters
• Regional VPCs
• Regional application workloads
• Regional WebSocket gateways
• Regional workers
• Regional media workers
• Regional call infrastructure
• Global DNS routing
• Cross-region failover

Use appropriate Route 53 routing such as:

• Latency-based routing
• Failover routing
• Weighted routing
• Health-based routing

Avoid unnecessary cross-region synchronous application dependencies.

────────────────────────────────────────

MULTI-REGION DATA STRATEGY

Infrastructure must support:

• PostgreSQL replication/recovery
• Redis regional isolation
• Kafka replication where required
• Search index recovery
• S3 replication
• CloudFront global distribution
• Regional backup storage

Define which systems are:

• Primary regional
• Multi-region
• Replicated
• Rebuilt during disaster recovery

Do not create active-active complexity where it provides little operational value.

────────────────────────────────────────

KUBERNETES PRODUCTION TOPOLOGY

Complete the Kubernetes production architecture.

Implement support for workload classes:

• API services
• WebSocket gateways
• Background workers
• Media workers
• Notification workers
• Search workers
• Analytics workers
• Call signaling
• Administration services

Create appropriate:

• Namespaces
• ResourceQuotas
• LimitRanges
• NetworkPolicies
• ServiceAccounts
• RBAC
• PodDisruptionBudgets
• HorizontalPodAutoscalers
• Cluster autoscaling
• Pod topology spread
• Affinity rules
• Anti-affinity rules
• Readiness probes
• Liveness probes
• Startup probes

────────────────────────────────────────

WEBSOCKET INFRASTRUCTURE

Design Kubernetes infrastructure specifically for large-scale WebSocket workloads.

Support:

• Long-lived connections
• Horizontal scaling
• Connection draining
• Graceful termination
• Connection-aware load balancing
• Health checks
• Autoscaling
• Regional routing

Define:

• Idle timeout strategy
• Load-balancer settings
• Pod termination behavior
• Connection draining
• Reconnection behavior
• Capacity thresholds

Infrastructure must avoid terminating large numbers of active connections unnecessarily during deployments.

────────────────────────────────────────

MEDIA PROCESSING INFRASTRUCTURE

Create infrastructure for:

• Image processing
• Video transcoding
• Audio processing
• Thumbnail generation
• Metadata extraction
• Malware scanning boundaries

Support:

• Dedicated node pools
• CPU-intensive workloads
• GPU-capable workloads where justified
• Queue-driven autoscaling
• Job isolation
• Temporary storage
• Worker autoscaling

Define policies for:

• Resource limits
• Job timeouts
• Failed jobs
• Queue backlogs
• Capacity scaling

────────────────────────────────────────

CALL INFRASTRUCTURE

Design production infrastructure for:

• WebRTC signaling
• TURN
• SFU/media servers where required

Support:

• Regional deployment
• Autoscaling
• Bandwidth management
• Health checks
• Network optimization
• Failover
• Capacity monitoring

TURN infrastructure must not depend on application API pods for media transport.

Define secure short-lived credential issuance architecture.

────────────────────────────────────────

REDIS HIGH AVAILABILITY

Complete production Redis infrastructure.

Support:

• Replication
• Automatic failover
• Multi-AZ deployment
• Encryption in transit
• Encryption at rest
• Authentication
• Monitoring
• Failover testing

Define capacity and scaling for:

• Presence
• WebSocket coordination
• Rate limiting
• Distributed locks
• Cache
• BullMQ

Do not use Redis as persistent business data.

────────────────────────────────────────

KAFKA / REDPANDA PRODUCTION OPERATIONS

Complete event-streaming infrastructure.

Support:

• Multi-broker deployment
• Multi-AZ replication
• Persistent storage
• Topic management
• Partition management
• Consumer groups
• Monitoring
• Authentication
• TLS
• Retention
• Capacity planning

Define operational procedures for:

• Broker failure
• Consumer lag
• Partition imbalance
• Disk pressure
• Rebalancing
• Event replay
• Disaster recovery

────────────────────────────────────────

SEARCH INFRASTRUCTURE

Implement production Elasticsearch/OpenSearch infrastructure.

Support:

• Multi-node cluster
• Availability zones
• Index templates
• Aliases
• Index versioning
• Shard strategy
• Replica strategy
• Snapshots
• Restore
• Monitoring
• Scaling

Define recovery behavior if search becomes completely unavailable.

Search must remain a derived system and must not become the transactional source of truth.

────────────────────────────────────────

HELM ARCHITECTURE

Create reusable Helm charts.

Support:

• Shared chart patterns
• Environment values
• Production overrides
• Resource configuration
• Autoscaling
• Secrets references
• ConfigMaps
• ServiceAccounts
• Ingress
• NetworkPolicies
• PodDisruptionBudgets
• Health probes

Separate:

• Development values
• Staging values
• Production values

Do not hard-code environment-specific secrets.

────────────────────────────────────────

CI/CD ARCHITECTURE

Implement GitHub Actions pipelines for:

• Formatting
• Linting
• Type checking
• Unit tests
• Integration tests
• Contract tests
• E2E tests
• Security scanning
• Dependency scanning
• Secret scanning
• Docker builds
• Container scanning
• Image publishing
• Helm validation
• Terraform validation
• Terraform planning
• Deployment

Support:

• Pull-request validation
• Development deployment
• Staging deployment
• Production deployment

────────────────────────────────────────

CONTAINER SECURITY

Implement:

• Minimal images
• Non-root execution
• Dependency scanning
• Image scanning
• SBOM generation
• Image signing where appropriate
• Immutable image tags
• Registry lifecycle policies

Reject deployments when critical image-security requirements are violated.

────────────────────────────────────────

DEPLOYMENT STRATEGIES

Support:

• Rolling deployments
• Canary deployments
• Blue/green deployments where appropriate
• Automatic rollback
• Health verification
• Smoke testing
• Deployment pause/abort

Define which deployment strategy is appropriate for:

• API services
• WebSocket gateways
• Workers
• Media workers
• Call services
• Administrative services

Avoid draining large numbers of WebSocket connections unnecessarily.

────────────────────────────────────────

ZERO-DOWNTIME DEPLOYMENTS

Implement production release protections.

Support:

• Readiness gates
• Startup probes
• Graceful shutdown
• PodDisruptionBudgets
• Connection draining
• Database compatibility checks
• Migration safety
• Backward-compatible API changes
• Rollback validation

Database migrations must be designed to avoid breaking currently running application versions.

────────────────────────────────────────

DATABASE OPERATIONS

Complete production PostgreSQL operations.

Support:

• Automated backups
• Point-in-time recovery
• Read replicas
• Monitoring
• Connection pooling
• Failover
• Maintenance
• Upgrade procedures
• Migration deployment
• Restore testing

Define:

• Backup frequency
• Retention
• Recovery testing
• Replica lag monitoring
• Connection limits
• Storage scaling
• Disk alerts

────────────────────────────────────────

DATABASE MIGRATION PIPELINE

Create a safe migration process.

Support:

• Schema validation
• Migration generation
• Migration testing
• Staging verification
• Production deployment
• Compatibility checks
• Rollback strategy where technically possible

Do not assume all database migrations are safely reversible.

Use expand-and-contract strategies for breaking schema changes.

────────────────────────────────────────

OBJECT STORAGE OPERATIONS

Complete S3 production operations.

Support:

• Versioning
• Lifecycle policies
• Encryption
• Replication
• Access policies
• Backup
• Recovery
• Storage classes
• Cleanup

Define lifecycle rules for:

• Temporary uploads
• Processed media
• Deleted media
• Backups
• Logs where applicable

────────────────────────────────────────

CDN OPERATIONS

Complete CloudFront operations.

Support:

• Cache policies
• Origin policies
• Signed URLs
• Signed cookies
• WAF integration
• TLS
• Cache invalidation
• Regional resilience

Optimize cache behavior for:

• Static assets
• Immutable media
• Protected media
• Short-lived resources

────────────────────────────────────────

OBSERVABILITY

Complete the production observability platform.

Use:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Create dashboards for:

APPLICATION

• Request rate
• Error rate
• Latency
• Saturation

REAL-TIME

• WebSocket connections
• Connection churn
• Reconnection rate
• Message latency
• Delivery latency

MESSAGING

• Messages/sec
• Failed messages
• Queue depth
• Consumer lag

MEDIA

• Processing backlog
• Processing latency
• Worker utilization

CALLS

• Call attempts
• Active calls
• TURN usage
• SFU usage
• Connection failures
• Quality metrics

DATABASE

• CPU
• Memory
• Connections
• Latency
• Replication lag
• Storage

REDIS

• Memory
• Connections
• Commands
• Evictions
• Failover

KAFKA

• Broker health
• Throughput
• Consumer lag
• Disk usage

INFRASTRUCTURE

• Node health
• Pod health
• Cluster capacity

────────────────────────────────────────

ALERTING

Create production alerts for:

• API latency
• API error rate
• WebSocket connection failures
• Message delivery degradation
• Consumer lag
• Queue backlog
• PostgreSQL failures
• Replica lag
• Redis failures
• Search failures
• Media-processing backlog
• TURN saturation
• SFU saturation
• Pod failures
• Node failures
• Certificate expiration
• Backup failures
• Storage failures
• Regional failures

Define:

• Warning
• Critical
• Emergency

severity levels.

────────────────────────────────────────

LOGGING

Complete centralized logging.

Use:

• Structured JSON
• Loki
• Correlation IDs
• Trace IDs
• Request IDs

Implement:

• Retention
• Sampling where appropriate
• Sensitive-data filtering
• Access control
• Log shipping

Never collect:

• Passwords
• Access tokens
• Refresh tokens
• Private keys
• Encryption keys
• Plaintext E2EE messages
• Unnecessary personal information

────────────────────────────────────────

SECURITY OPERATIONS

Implement infrastructure security.

Support:

• IAM least privilege
• KMS
• Secret rotation
• Network policies
• Security groups
• WAF
• DDoS protection
• Container scanning
• Dependency scanning
• Image signing
• Kubernetes RBAC
• Pod security
• Audit logging

Define:

• Access-review procedures
• Privileged access
• Break-glass access
• Security incident response

────────────────────────────────────────

CI/CD SECURITY

GitHub Actions must use secure identity federation where possible.

Avoid long-lived cloud access keys.

Support:

• OIDC
• Short-lived credentials
• Protected environments
• Required approvals
• Branch protection
• Security checks
• Secret scanning

Separate production deployment privileges from normal development privileges.

────────────────────────────────────────

DISASTER RECOVERY

Define complete infrastructure recovery.

Include:

• Region failure
• Availability-zone failure
• Kubernetes cluster failure
• Database failure
• Redis failure
• Kafka failure
• Search failure
• S3 failure
• CDN degradation
• CI/CD failure
• Terraform state failure

Define:

• Detection
• Failover
• Recovery
• Validation
• Reconciliation
• Rollback
• Communication

────────────────────────────────────────

RTO / RPO

Define measurable objectives for major systems.

Specify RTO/RPO targets for:

• PostgreSQL
• Object storage
• Redis
• Kafka
• Search
• Kubernetes
• Application services
• Global platform

Clearly distinguish:

• Critical transactional systems
• Derived systems
• Ephemeral systems

────────────────────────────────────────

BACKUP RESTORATION

Implement backup verification.

Support automated tests for:

• PostgreSQL restore
• Point-in-time recovery
• S3 object recovery
• Infrastructure reconstruction
• Kafka recovery
• Search snapshot restoration

Backups must periodically be restored in controlled environments.

Do not consider a backup successful merely because the backup job completed.

────────────────────────────────────────

COST OPTIMIZATION

Implement production cost controls.

Evaluate:

• Right-sizing
• Autoscaling
• Reserved capacity
• Savings Plans
• Spot workloads for safe batch jobs
• Storage tiering
• S3 lifecycle
• CDN caching
• Log retention
• Search shard sizing
• Kafka capacity
• NAT gateway usage
• Data transfer costs

Never compromise critical reliability or security to reduce costs.

────────────────────────────────────────

CAPACITY MANAGEMENT

Create infrastructure capacity models for:

• API requests
• WebSocket connections
• Messages/sec
• Kafka throughput
• Redis operations
• PostgreSQL connections
• Media processing
• Storage
• CDN traffic
• TURN bandwidth
• SFU bandwidth

Define:

• Scaling triggers
• Safety margins
• Alert thresholds
• Capacity-review processes

────────────────────────────────────────

INFRASTRUCTURE TESTING

Implement testing for:

• Terraform
• Helm
• Kubernetes
• Docker
• Networking
• Security groups
• IAM
• Backup restoration
• Disaster recovery
• Deployment
• Rollback
• Smoke tests

Support:

• Static validation
• Integration testing
• Staging validation
• Production smoke testing

────────────────────────────────────────

OPERATIONAL RUNBOOKS

Create runbooks for:

• Application outage
• WebSocket outage
• Database outage
• Redis outage
• Kafka outage
• Search outage
• Media backlog
• TURN saturation
• SFU outage
• Region failure
• Certificate failure
• Backup failure
• Deployment rollback
• Security incident

Each runbook should contain:

• Detection
• Initial diagnosis
• Mitigation
• Recovery
• Validation
• Escalation
• Post-incident actions

────────────────────────────────────────

INCIDENT RESPONSE

Define:

• Incident severity
• On-call responsibilities
• Escalation
• Communication
• Containment
• Recovery
• Postmortem
• Follow-up actions

Support auditability.

────────────────────────────────────────

PRODUCTION HARDENING

Complete production hardening for:

• Kubernetes
• Containers
• IAM
• Network
• Secrets
• Database
• Redis
• Kafka
• Search
• S3
• CDN
• CI/CD
• Monitoring

Perform an architecture-level production readiness review.

────────────────────────────────────────

DOCUMENTATION

Generate:

• Production deployment guide
• Multi-region guide
• CI/CD guide
• Kubernetes guide
• Helm guide
• Terraform guide
• Secrets guide
• Database operations guide
• Redis operations guide
• Kafka operations guide
• Search operations guide
• Media infrastructure guide
• Call infrastructure guide
• Observability guide
• Disaster recovery guide
• Backup guide
• Security operations guide
• Incident response guide
• Operational runbooks

────────────────────────────────────────

PROJECT INDEX

Maintain the infrastructure Project Index.

Track:

• Terraform modules
• AWS resources
• Regions
• VPCs
• EKS clusters
• Namespaces
• Node pools
• Helm charts
• Docker images
• ECR repositories
• PostgreSQL
• Redis
• Kafka/Redpanda
• Search
• S3
• CloudFront
• Route 53
• ACM
• WAF
• IAM
• KMS
• Secrets
• CI/CD
• Monitoring
• Logging
• Alerting
• Backups
• Disaster recovery
• Runbooks
• Generated files
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

INFRASTRUCTURE MILESTONE 11

Production Helm charts and application deployment templates.

INFRASTRUCTURE MILESTONE 12

WebSocket infrastructure, media-processing infrastructure, and worker autoscaling.

INFRASTRUCTURE MILESTONE 13

Voice/video, TURN, and SFU infrastructure.

INFRASTRUCTURE MILESTONE 14

Multi-region deployment, global routing, and regional failover.

INFRASTRUCTURE MILESTONE 15

Complete CI/CD, security automation, image signing, scanning, and release management.

INFRASTRUCTURE MILESTONE 16

Production observability, dashboards, alerting, logging, and tracing.

INFRASTRUCTURE MILESTONE 17

Backups, disaster recovery, restore testing, RTO/RPO validation, and failover procedures.

INFRASTRUCTURE MILESTONE 18

Capacity planning, cost optimization, performance tuning, and resource optimization.

INFRASTRUCTURE MILESTONE 19

Operational runbooks, incident response, security hardening, and compliance preparation.

INFRASTRUCTURE MILESTONE 20

Complete infrastructure testing and final production-readiness review.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must be validated before proceeding.

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never truncate files.

Never summarize files instead of generating them.

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

This volume completes:

• Production Kubernetes
• Helm
• CI/CD
• GitHub Actions
• Multi-region deployment
• WebSocket infrastructure
• Media-processing infrastructure
• Voice/video infrastructure
• TURN
• SFU
• Search infrastructure
• Redis HA
• Kafka production operations
• PostgreSQL operations
• S3 operations
• CloudFront operations
• Security automation
• Observability
• Monitoring
• Alerting
• Logging
• Backups
• Disaster recovery
• Cost optimization
• Capacity planning
• Incident response
• Operational runbooks
• Infrastructure testing
• Production readiness

Do not implement backend business logic.

Do not implement frontend code.

Do not implement mobile code.

────────────────────────────────────────

QUALITY BAR

Treat this as infrastructure for a globally distributed enterprise communication platform.

Assume:

• Hundreds of millions of users
• Billions of messages
• Tens of millions of WebSocket connections
• Large-scale media traffic
• High call concurrency
• Multi-region deployment
• Zero-downtime releases
• Strict security requirements
• Disaster recovery requirements

Prioritize:

• Availability
• Security
• Scalability
• Reliability
• Recoverability
• Observability
• Operational simplicity
• Cost efficiency
• Production readiness
