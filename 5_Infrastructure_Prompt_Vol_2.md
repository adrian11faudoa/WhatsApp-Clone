# WHATSAPP — INFRASTRUCTURE VOLUME 2

## ROLE

Act as a Principal Cloud Architect, Staff DevOps Engineer, Staff SRE, Staff Platform Engineer, Database Reliability Engineer, Security Engineer, Network Architect, Kubernetes Engineer, Observability Engineer, Disaster Recovery Engineer, and Production Operations Engineer working as one senior engineering team.

You are implementing the advanced production infrastructure of a global, enterprise-grade real-time communication platform comparable in capability and operational scale to WhatsApp, Telegram, Signal, Messenger, Discord, and Microsoft Teams.

You are not writing a tutorial, proof of concept, demonstration, or simplified deployment.

You are implementing production-grade infrastructure suitable for a funded global technology company operating at very large scale.

---

# PROJECT

Build the infrastructure required to operate a global real-time communication platform with:

* Hundreds of millions of registered users
* Tens of millions of daily active users or greater
* Very large concurrent WebSocket populations
* Extremely high message throughput
* Large media volumes
* Global traffic
* Multi-region requirements
* High availability
* Horizontal scalability
* Fault tolerance
* Disaster recovery
* Secure media delivery
* Production observability
* Automated deployment
* Zero-downtime operational practices

Core product capabilities include:

* Individual messaging
* Group messaging
* Profiles
* Contacts
* Presence
* Typing indicators
* Delivery/read states
* Replies
* Reactions
* Editing
* Deletion
* Forwarding
* Pinned messages
* Saved messages
* Media
* Documents
* Voice messages
* Stickers
* GIFs
* Link previews
* Search
* Push notifications
* Multi-device synchronization
* Offline synchronization
* Blocking
* Reporting
* Privacy controls
* Disappearing messages
* Moderation
* Administration
* Analytics
* Media storage and delivery

The infrastructure must support web clients, mobile clients, backend APIs, WebSocket services, asynchronous workers, media processing, search, notifications, databases, event streaming, observability, and administrative systems.

---

# TECHNOLOGY DIRECTION

Use the repository's existing implementation as the source of truth for exact versions and already-established conventions.

The infrastructure direction includes:

* AWS
* Terraform
* Kubernetes
* Amazon EKS
* Docker
* Helm
* GitHub Actions
* Amazon ECR
* PostgreSQL
* Prisma
* Redis
* BullMQ
* Kafka or Redpanda
* OpenSearch or Elasticsearch
* Amazon S3 or compatible object storage
* CloudFront or equivalent CDN
* FFmpeg media workers
* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo
* AWS WAF
* Route 53 or equivalent DNS
* TLS
* IAM
* KMS
* Secrets Manager or equivalent secure secret management

The infrastructure must support:

* Local development
* Development
* Testing
* Staging
* Production
* Disaster recovery

Production architecture must be capable of evolving toward multi-region active-active or active-passive operation according to the repository's architecture and data consistency requirements.

Do not replace existing technology choices without a concrete repository-driven reason.

---

# SOURCE OF TRUTH

Before modifying anything:

1. Inspect the entire repository.
2. Identify the existing application structure.
3. Identify all existing Terraform modules.
4. Identify all Kubernetes manifests.
5. Identify all Helm charts.
6. Identify Dockerfiles and container configurations.
7. Identify GitHub Actions workflows.
8. Identify existing AWS resources and environment definitions.
9. Identify database infrastructure configuration.
10. Identify Redis infrastructure configuration.
11. Identify Kafka/Redpanda infrastructure configuration.
12. Identify OpenSearch/Elasticsearch infrastructure configuration.
13. Identify S3/media/CDN infrastructure.
14. Identify observability infrastructure.
15. Identify secrets and IAM configuration.
16. Identify current deployment strategies.
17. Identify existing naming, tagging, labels, namespaces, variables, outputs, modules, and conventions.
18. Identify incomplete infrastructure and implementation gaps.
19. Preserve compatible infrastructure that is already correct.
20. Modify existing files only when required by this scope.

The repository is the source of truth for integration.

Do not assume that infrastructure is empty.

Do not recreate working infrastructure unnecessarily.

Do not generate duplicate Terraform modules, Kubernetes resources, Helm charts, workflows, or configuration files when an existing implementation can be extended safely.

All infrastructure introduced by this prompt must integrate with the existing repository.

---

# 1. ADVANCED INFRASTRUCTURE OBJECTIVE

Implement the advanced production infrastructure required to operate the platform reliably at global scale.

The implementation must address:

* Multi-region architecture
* Global traffic management
* Regional failure handling
* Database high availability
* Database replication and failover
* Redis resilience
* Event broker resilience
* Kubernetes high availability
* Advanced autoscaling
* Zero-downtime deployments
* Progressive delivery
* Media delivery at global scale
* CDN behavior
* Observability hardening
* Backup and restoration
* Disaster recovery
* Security hardening
* Operational readiness
* Capacity planning
* Failure recovery
* Infrastructure testing

Do not implement theoretical architecture without deployable infrastructure.

---

# 2. MULTI-REGION AWS ARCHITECTURE

Implement the infrastructure required for multiple production regions.

Define:

* Primary regions
* Secondary regions
* Region-specific Terraform configuration
* Shared global resources
* Regional resources
* Region-independent resources
* Resource naming
* Resource tagging
* Environment isolation
* Account boundaries where applicable

Design infrastructure so that regional failure does not require manual recreation of the entire platform.

Implement appropriate support for:

* Regional EKS clusters
* Regional networking
* Regional load balancing
* Regional application services
* Regional workers
* Regional Redis
* Regional event infrastructure
* Regional observability ingestion
* Regional media processing
* Regional database capabilities
* Regional failover

Clearly separate:

* Global control-plane resources
* Regional data-plane resources
* Shared services
* Region-local services

Do not incorrectly centralize latency-sensitive or failure-sensitive infrastructure.

---

# 3. GLOBAL TRAFFIC MANAGEMENT

Implement production-grade global traffic routing.

Support:

* Global DNS
* Health-based routing
* Region selection
* Failover routing
* Weighted routing
* Controlled traffic shifting
* Regional evacuation
* Disaster recovery routing

Use AWS-native global traffic capabilities where appropriate.

Implement health checks that verify actual application availability rather than only infrastructure reachability.

Health checks must distinguish between:

* DNS availability
* Load balancer availability
* API availability
* WebSocket availability
* Dependency health
* Regional application readiness

Do not route traffic into a region whose infrastructure exists but whose application dependencies are unhealthy.

Document traffic failover behavior.

---

# 4. MULTI-REGION NETWORKING

Implement secure networking for regional environments.

Each region must provide appropriate:

* VPCs
* Public subnets
* Private subnets
* Availability zones
* Route tables
* Security groups
* Network ACLs where justified
* NAT strategy
* VPC endpoints
* Private service connectivity
* DNS resolution
* Egress controls

Minimize unnecessary public exposure.

Prefer private communication for:

* Databases
* Redis
* Kafka/Redpanda
* OpenSearch
* Internal services
* Kubernetes control paths
* Worker infrastructure

Implement cross-region connectivity where required.

Avoid creating unnecessary cross-region dependencies for latency-sensitive message delivery.

---

# 5. DATABASE HIGH AVAILABILITY

Harden PostgreSQL infrastructure for production.

Implement appropriate:

* Multi-AZ deployment
* Automated backups
* Point-in-time recovery
* Encryption at rest
* Encryption in transit
* Parameter configuration
* Connection management
* Monitoring
* Failover
* Replica strategy
* Read scaling where appropriate
* Maintenance configuration
* Storage scaling
* Performance monitoring

The implementation must account for:

* Large connection counts
* Connection pooling
* Long-running queries
* Lock contention
* Transaction pressure
* Migration safety
* Replica lag
* Failover behavior
* Recovery time

Do not expose PostgreSQL directly to the public internet.

Implement appropriate network and IAM boundaries.

---

# 6. DATABASE REPLICATION AND DISASTER RECOVERY

Implement the infrastructure required for cross-region database recovery.

Define:

* Primary database region
* Disaster recovery database region
* Replication strategy
* Backup replication
* Recovery procedures
* Failover process
* Failback process
* RPO
* RTO

The infrastructure must distinguish between:

* Automatic failover
* Operator-assisted failover
* Disaster recovery restoration

Do not claim zero data loss unless the actual infrastructure guarantees it.

Document the consistency and data-loss implications of regional database failure.

Implement restoration procedures that can be executed and tested.

---

# 7. DATABASE MIGRATION SAFETY

Harden database deployment workflows.

Implement infrastructure and CI/CD controls that prevent unsafe migrations.

Support:

* Migration validation
* Migration ordering
* Backup verification
* Expand-and-contract patterns
* Backward-compatible application deployment
* Rollback-aware deployment
* Production migration safeguards

Prevent destructive schema changes from being silently applied during normal deployments.

Where migrations require operator approval, make that requirement explicit in the deployment workflow.

---

# 8. REDIS HIGH AVAILABILITY

Harden Redis infrastructure for production-scale workloads.

Support:

* Multi-AZ deployment
* Replication
* Automatic failover
* Encryption
* Authentication
* Private networking
* Monitoring
* Memory policies
* Connection limits
* Failover detection
* Backup where applicable

Separate Redis responsibilities when required.

Account for workloads including:

* Sessions
* Presence
* WebSocket coordination
* Rate limiting
* Distributed locks
* Caching
* Idempotency
* Temporary state
* BullMQ

Do not assume every Redis dataset can be safely lost.

Classify Redis data into:

* Reconstructable
* Ephemeral
* Operationally important
* Persistent-equivalent state

Configure infrastructure accordingly.

---

# 9. KAFKA OR REDPANDA PRODUCTION SCALING

Harden the event streaming platform.

Implement infrastructure for:

* High availability
* Broker distribution
* Persistent storage
* Replication
* Availability-zone awareness
* Capacity scaling
* Partition planning
* Monitoring
* Retention
* Network security
* Encryption
* Authentication
* Failure recovery

Account for high-throughput domains including:

* Message events
* Delivery events
* Presence events
* Notification events
* Media processing events
* Search indexing events
* Analytics events
* Security events
* Audit events

Prevent a single overloaded partition or broker from becoming a systemic bottleneck.

Define operational monitoring for:

* Consumer lag
* Partition imbalance
* Broker health
* Disk pressure
* Throughput
* Replication health
* Under-replicated partitions

---

# 10. BULLMQ WORKER INFRASTRUCTURE

Harden background job infrastructure.

Implement scalable worker deployment for:

* Notifications
* Media processing
* Search indexing
* Link previews
* Cleanup
* Retention
* Analytics
* Security processing
* Data export
* Account deletion
* Other asynchronous workloads already present in the repository

Each worker class must support:

* Horizontal scaling
* Graceful shutdown
* Retry behavior
* Dead-letter handling where appropriate
* Concurrency control
* Resource limits
* Autoscaling
* Observability

Prevent a single workload category from exhausting the entire worker cluster.

Use queue-specific resource isolation where required.

---

# 11. KUBERNETES HIGH AVAILABILITY

Harden EKS workloads for production.

Implement:

* Multiple availability zones
* Pod anti-affinity
* Topology spread constraints
* Pod disruption budgets
* Resource requests
* Resource limits
* Readiness probes
* Liveness probes
* Startup probes
* Graceful termination
* Termination grace periods
* Security contexts
* Non-root execution
* Network policies

Critical services must not depend on a single pod or node.

Ensure WebSocket services are distributed across zones.

Ensure worker workloads can scale independently from API workloads.

---

# 12. ADVANCED AUTOSCALING

Implement production-grade autoscaling.

Use appropriate Kubernetes and AWS capabilities for:

* CPU scaling
* Memory scaling
* Request-rate scaling
* Queue-depth scaling
* Kafka consumer-lag scaling
* WebSocket connection scaling
* Worker concurrency scaling
* Node scaling

Where appropriate, implement:

* Horizontal Pod Autoscaler
* KEDA
* Cluster Autoscaler or Karpenter
* Scheduled scaling
* Predictive scaling where justified

Do not rely solely on CPU utilization for real-time workloads.

Autoscaling must account for:

* Connection counts
* Message throughput
* Queue depth
* Event lag
* Request latency
* Media workload
* Regional capacity

Prevent autoscaling feedback loops and uncontrolled cost growth.

---

# 13. WEBSOCKET PRODUCTION INFRASTRUCTURE

Harden infrastructure for very large concurrent WebSocket populations.

Account for:

* Long-lived connections
* Connection draining
* Load balancer behavior
* Idle timeouts
* Connection distribution
* Pod termination
* Rolling deployments
* Regional routing
* Reconnection storms
* Health checks
* Capacity limits

Implement graceful connection draining.

When a pod or node is terminated:

1. Stop accepting new connections.
2. Mark the instance unavailable for new traffic.
3. Allow active sessions to drain where possible.
4. Notify clients appropriately when required.
5. Preserve synchronization semantics.
6. Terminate within bounded time.
7. Allow clients to reconnect safely.

Design for reconnect storms after:

* Regional failures
* Deployments
* Network outages
* Mobile network changes
* Load balancer failures

---

# 14. ZERO-DOWNTIME DEPLOYMENTS

Implement production deployment strategies that minimize service disruption.

Support:

* Rolling deployments
* Readiness-based rollout
* Graceful shutdown
* Connection draining
* Backward-compatible API deployment
* Backward-compatible event schemas
* Database migration safety

For critical services, support progressive delivery such as:

* Canary deployment
* Weighted traffic
* Automated health verification
* Rollback

Deployment systems must not send production traffic to unhealthy instances.

---

# 15. BLUE/GREEN AND CANARY CAPABILITIES

Where the repository architecture supports it, implement production-safe progressive delivery.

Support:

* Versioned deployments
* Immutable container images
* Canary traffic
* Health evaluation
* Error-rate comparison
* Latency comparison
* Rollback
* Deployment annotations
* Release tracking

Define automated rollback conditions using measurable signals such as:

* HTTP error rate
* WebSocket connection failure rate
* Message processing failure rate
* Queue backlog
* Consumer lag
* Database error rate
* Dependency failures
* Crash loops

Do not rely exclusively on deployment completion status.

---

# 16. CONTAINER AND IMAGE SUPPLY CHAIN HARDENING

Harden the container supply chain.

Implement:

* Immutable image tags or digests
* ECR repositories
* Image scanning
* Dependency scanning
* Minimal runtime images
* Non-root containers
* Read-only filesystems where practical
* Dropped Linux capabilities
* Resource limits
* Provenance where supported
* SBOM generation where practical

CI must fail on appropriately severe security findings according to repository policy.

Do not allow mutable `latest`-style production deployment behavior.

---

# 17. MEDIA DELIVERY AT GLOBAL SCALE

Harden the media infrastructure.

Support:

* S3 origin architecture
* CloudFront delivery
* Origin access controls
* Signed URLs or signed cookies where appropriate
* Media authorization
* Cache policies
* Cache invalidation strategy
* Range requests
* Large object delivery
* Thumbnail delivery
* Video delivery
* Audio delivery
* Document delivery

Separate public cacheability from private user content.

Prevent unauthorized media enumeration.

Ensure expired authorization cannot continue granting access indefinitely.

---

# 18. MEDIA PROCESSING SCALABILITY

Harden FFmpeg and media worker infrastructure.

Support independent scaling for:

* Image processing
* Video transcoding
* Audio processing
* Thumbnail generation
* Metadata extraction
* Preview generation

Implement:

* Queue isolation
* Resource requests
* Resource limits
* Temporary storage sizing
* CPU-intensive worker node pools
* GPU support only where justified
* Job timeout
* Retry behavior
* Dead-letter handling
* Cleanup

Prevent a single oversized media job from exhausting worker capacity.

---

# 19. CDN AND CACHE STRATEGY

Implement appropriate CDN policies for:

* Static web assets
* Public application assets
* User media
* Thumbnails
* Transcoded media
* Downloadable documents where authorized

Define:

* Cache keys
* TTLs
* Cache-control
* Compression
* Origin failover
* Signed access
* Invalidation
* Regional behavior

Do not cache private data in a way that can cross authorization boundaries.

---

# 20. OBSERVABILITY HARDENING

Implement production-grade observability infrastructure.

Ensure:

* Metrics
* Logs
* Distributed traces
* Correlation IDs
* Request IDs
* WebSocket connection metrics
* Message processing metrics
* Queue metrics
* Kafka/Redpanda metrics
* Database metrics
* Redis metrics
* Kubernetes metrics
* CDN metrics
* Load balancer metrics
* Infrastructure metrics

Use:

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo

where already established by the repository.

---

# 21. SERVICE LEVEL OBJECTIVES

Define infrastructure support for measurable SLOs.

At minimum monitor:

* API availability
* API latency
* WebSocket connection success
* WebSocket stability
* Message acceptance latency
* Message delivery latency
* Event processing latency
* Queue latency
* Consumer lag
* Media upload success
* Media processing latency
* Media download success
* Push notification processing
* Search availability

Define:

* SLIs
* SLOs
* Error budgets
* Alert thresholds

Avoid alerts based only on infrastructure utilization.

---

# 22. ALERTING

Implement actionable production alerts.

Alert on:

* Regional outages
* Kubernetes control-plane issues
* Pod crash loops
* Node pressure
* Autoscaling failures
* API error spikes
* WebSocket failure spikes
* Message processing failures
* Database failover
* Replica lag
* Redis failover
* Kafka/Redpanda replication failures
* Consumer lag
* Queue backlog
* Media processing failures
* CDN origin failures
* Certificate expiration
* Security events
* Backup failures
* Recovery failures

Every critical alert must identify:

* What failed
* Impact
* Relevant service
* Region
* Severity
* Suggested investigation path

Avoid noisy alerts that cannot lead to action.

---

# 23. BACKUP INFRASTRUCTURE

Implement comprehensive backups for all stateful systems where required.

Include:

* PostgreSQL
* Object storage metadata where required
* Kubernetes critical configuration
* Terraform state
* Infrastructure configuration
* Search indexes where required
* Event-stream configuration
* Application configuration
* Security configuration

Backups must support:

* Encryption
* Retention
* Cross-region storage
* Integrity verification
* Restore testing

Do not consider an untested backup to be a reliable backup.

---

# 24. DISASTER RECOVERY

Implement a complete disaster recovery infrastructure strategy.

Cover:

* Region failure
* Availability-zone failure
* Database failure
* Redis failure
* Broker failure
* Kubernetes cluster failure
* S3 dependency failure
* CDN origin failure
* Secret-management failure
* CI/CD failure
* DNS failure

Define:

* RPO
* RTO
* Recovery sequence
* Failover sequence
* Failback sequence
* Validation sequence

Document which components recover automatically and which require operator intervention.

---

# 25. RESTORE TESTING

Implement automated or scheduled infrastructure validation for recovery procedures where practical.

Test:

* Database restore
* Backup integrity
* Replica recovery
* Infrastructure recreation
* Kubernetes recovery
* Critical secret restoration
* Media accessibility
* Application startup after restoration

Recovery tests must verify actual application functionality rather than only infrastructure creation.

---

# 26. SECURITY HARDENING

Harden production infrastructure.

Implement:

* Least-privilege IAM
* KMS encryption
* Secrets Manager
* Security groups
* Network policies
* Private subnets
* Private endpoints
* TLS
* Certificate management
* WAF
* DDoS protection where appropriate
* Audit logging
* CloudTrail
* EKS audit visibility
* Security event monitoring

Avoid long-lived static credentials.

Prefer:

* IAM roles
* Workload identity
* Short-lived credentials

where supported.

---

# 27. WAF AND EDGE SECURITY

Harden the public edge.

Protect:

* Web application
* API endpoints
* Authentication endpoints
* Media endpoints
* WebSocket entry points

Implement appropriate controls for:

* IP reputation
* Rate limiting
* Request size
* Malicious payloads
* Automated abuse
* Credential attacks
* HTTP floods
* Common application-layer attacks

Do not configure generic blocking rules that break legitimate messaging traffic.

Monitor false positives.

---

# 28. NETWORK SECURITY

Implement internal segmentation.

Separate appropriately:

* Public edge
* API workloads
* WebSocket workloads
* Worker workloads
* Databases
* Redis
* Brokers
* Search
* Observability
* Administration

Use Kubernetes NetworkPolicies where supported.

Default toward deny-by-default internal communication where practical, then explicitly allow required traffic.

---

# 29. SECRETS AND KEY MANAGEMENT

Harden secret handling.

Implement:

* AWS KMS
* Secrets Manager
* Kubernetes secret integration
* Secret rotation
* Encryption
* Access auditing
* Environment isolation

Do not commit:

* API keys
* Passwords
* Tokens
* Private keys
* Database credentials
* Cloud credentials

to the repository.

Do not print secrets into logs.

---

# 30. INFRASTRUCTURE STATE SECURITY

Harden Terraform state management.

Ensure:

* Remote state
* Encryption
* State locking
* Restricted access
* Versioning
* Recovery
* Environment isolation

Terraform state must never be publicly accessible.

CI/CD must use secure credentials for Terraform operations.

---

# 31. CI/CD ADVANCED PIPELINES

Extend GitHub Actions for production infrastructure.

Implement pipelines for:

* Terraform validation
* Terraform plan
* Terraform apply
* Container build
* Image scan
* Image push
* Helm validation
* Kubernetes validation
* Deployment
* Smoke tests
* Progressive rollout
* Rollback

Separate:

* Pull request validation
* Non-production deployment
* Production deployment

Production deployment must include appropriate approval and protection controls.

---

# 32. ENVIRONMENT PROMOTION

Implement predictable promotion across:

* Development
* Test
* Staging
* Production

Artifacts should be promoted rather than rebuilt differently for every environment.

Ensure:

* Immutable artifacts
* Version tracking
* Configuration separation
* Secret separation
* Environment-specific infrastructure
* Deployment traceability

---

# 33. CAPACITY MANAGEMENT

Implement infrastructure capacity planning support.

Monitor and document capacity for:

* Kubernetes nodes
* API pods
* WebSocket pods
* Worker pods
* Database connections
* Database storage
* Redis memory
* Broker partitions
* Broker storage
* Search nodes
* S3 storage
* CDN throughput
* Network throughput

Define scaling thresholds and operational limits.

Do not allow services to reach hard capacity limits before scaling begins.

---

# 34. COST CONTROL

Implement production cost controls without sacrificing reliability.

Use:

* Appropriate instance types
* Autoscaling
* Storage lifecycle policies
* S3 lifecycle rules
* Log retention
* Metrics retention
* Right-sized environments
* Spot capacity for appropriate non-critical workloads
* Reserved capacity where justified

Never use cost optimization that compromises:

* Security
* Availability
* Data durability
* Disaster recovery
* Production SLOs

---

# 35. INFRASTRUCTURE DRIFT DETECTION

Implement controls against configuration drift.

Detect:

* Terraform drift
* Kubernetes drift
* Unauthorized AWS changes
* Configuration changes
* IAM changes
* Security-group changes

Where practical, integrate drift detection into scheduled CI/CD or operational workflows.

---

# 36. PRODUCTION OPERATIONS

Implement operational readiness for:

* Deployments
* Rollbacks
* Regional evacuation
* Database failover
* Redis failover
* Broker recovery
* Kubernetes node replacement
* Certificate rotation
* Secret rotation
* Backup restoration
* Media pipeline recovery

Create operational documentation and runbooks where required.

Runbooks must contain actual actionable procedures.

Do not create placeholder runbooks.

---

# 37. FAILURE AND RESILIENCE ENGINEERING

Design infrastructure to tolerate:

* Pod failures
* Node failures
* Availability-zone failures
* Region failures
* Network partitions
* Dependency failures
* Database failovers
* Redis failovers
* Broker failures
* Queue backlogs
* CDN origin failures
* Deployment failures
* Reconnect storms
* Traffic spikes

Implement bounded retries, backoff, circuit-breaking support, and load-shedding mechanisms where appropriate to the infrastructure layer.

Avoid retry storms.

---

# 38. SECURITY AND COMPLIANCE EVIDENCE

Ensure infrastructure produces auditable evidence for:

* Authentication
* Authorization
* Infrastructure changes
* IAM changes
* Secret access
* Administrative actions
* Deployment events
* Security events
* Backup status
* Recovery testing

Use centralized audit logging.

Ensure logs have appropriate retention and access restrictions.

---

# 39. INFRASTRUCTURE TESTING

Implement meaningful infrastructure tests.

Include where applicable:

* Terraform validation
* Terraform formatting
* Terraform plan validation
* Terraform module tests
* Helm linting
* Kubernetes manifest validation
* Policy validation
* Security scanning
* Container scanning
* Infrastructure integration tests
* Deployment smoke tests
* Backup validation
* Recovery validation

Do not consider syntax validation sufficient.

---

# 40. PRODUCTION READINESS REVIEW

Perform a full production infrastructure review.

Verify:

* Multi-region strategy
* High availability
* Network isolation
* Database resilience
* Redis resilience
* Broker resilience
* Kubernetes resilience
* Autoscaling
* WebSocket scaling
* Media delivery
* CDN
* Observability
* Alerting
* Backup
* Disaster recovery
* Security
* IAM
* Secrets
* CI/CD
* Rollback
* Capacity
* Cost controls
* Operational runbooks

Identify and correct implementation gaps that fall within this prompt's scope.

---

# 41. REPOSITORY INTEGRATION

Integrate the implementation into the existing repository.

Requirements:

* Preserve existing working infrastructure.
* Do not regenerate unchanged files.
* Do not create duplicate infrastructure.
* Maintain naming consistency.
* Maintain environment consistency.
* Maintain Terraform module boundaries.
* Maintain Helm conventions.
* Maintain Kubernetes conventions.
* Maintain CI/CD conventions.
* Maintain existing application contracts.
* Maintain compatibility with the backend, frontend, mobile, database, messaging, media, and observability systems already represented in the repository.
* Update documentation when infrastructure behavior changes.
* Ensure all infrastructure references resolve correctly.

If an existing implementation conflicts with a production requirement, correct it rather than creating a parallel competing implementation.

---

# 42. VALIDATION REQUIREMENTS

Before declaring this prompt complete:

1. Validate Terraform formatting.
2. Validate Terraform configuration.
3. Validate Terraform modules.
4. Validate Terraform plans where credentials and environment access permit.
5. Validate Kubernetes manifests.
6. Validate Helm charts.
7. Validate Docker configurations.
8. Validate CI/CD workflows.
9. Validate IAM configuration.
10. Validate networking.
11. Validate security boundaries.
12. Validate autoscaling configuration.
13. Validate health probes.
14. Validate deployment strategies.
15. Validate backup configuration.
16. Validate disaster recovery configuration.
17. Validate observability.
18. Validate alerting.
19. Validate secrets handling.
20. Validate production configuration consistency.
21. Validate repository integration.
22. Run all relevant infrastructure and application tests available in the repository.
23. Fix all issues discovered within the scope of this prompt.

Do not declare success merely because configuration files exist.

---

# 43. HARD IMPLEMENTATION RULES

You MUST:

* Inspect the repository before changing anything.
* Implement actual infrastructure.
* Use production-grade configuration.
* Preserve compatibility.
* Prefer secure defaults.
* Prefer immutable infrastructure.
* Prefer automation over manual configuration.
* Prefer horizontal scaling.
* Design for failure.
* Design for observability.
* Design for recovery.
* Keep infrastructure reproducible.
* Keep environments isolated.
* Keep production access restricted.
* Validate every meaningful infrastructure change.

You MUST NOT:

* Use pseudo-code.
* Use placeholders.
* Use fake resource identifiers.
* Use fake secrets.
* Add TODO comments instead of implementation.
* Leave incomplete Terraform modules.
* Leave incomplete Helm charts.
* Leave broken Kubernetes manifests.
* Invent unavailable AWS features.
* Expose private services publicly without justification.
* Commit credentials.
* Disable security controls merely to simplify deployment.
* Replace production infrastructure with toy examples.
* Rebuild working infrastructure unnecessarily.
* Use mutable production artifacts.
* Ignore failure recovery.
* Ignore observability.
* Ignore backup and restoration.
* Claim high availability without implementing it.

Never use phrases such as:

* “implement similarly”
* “left as an exercise”
* “for brevity”
* “remaining code omitted”
* “placeholder”
* “TODO”
* “etc.” as a substitute for required implementation

---

# 44. DOCUMENTATION REQUIREMENTS

Update or create infrastructure documentation covering:

* Multi-region architecture
* Traffic routing
* Deployment strategy
* Scaling
* Database failover
* Redis failover
* Broker recovery
* Backup
* Disaster recovery
* Security
* Secrets
* Monitoring
* Alerting
* Incident response
* Operational runbooks
* Environment management

Documentation must describe the actual implementation.

Do not document infrastructure that does not exist.

---

# 45. FINAL IMPLEMENTATION REPORT

At completion, provide a concise but technically complete report containing:

## IMPLEMENTED

List the major infrastructure capabilities implemented.

## MULTI-REGION

Describe:

* Regions
* Traffic routing
* Failover
* Regional isolation

## DATA SERVICES

Describe:

* PostgreSQL
* Replication
* Redis
* Kafka/Redpanda
* OpenSearch/Elasticsearch
* S3

## KUBERNETES

Describe:

* EKS
* Node strategy
* Autoscaling
* Pod distribution
* Deployment strategy

## MEDIA

Describe:

* S3
* CloudFront
* Authorization
* Processing
* CDN strategy

## OBSERVABILITY

Describe:

* Metrics
* Logs
* Traces
* Dashboards
* Alerts

## SECURITY

Describe:

* IAM
* KMS
* Secrets
* Network security
* WAF
* Container security

## DISASTER RECOVERY

Describe:

* Backups
* RPO
* RTO
* Failover
* Restore procedures

## CI/CD

Describe:

* Build
* Scan
* Deployment
* Promotion
* Rollback

## TESTING

List the validation and infrastructure tests executed.

## FILES CHANGED

List every created, modified, or deleted file with a short explanation.

## REMAINING ISSUES

Only list genuine unresolved issues that are outside the current implementation scope or require unavailable external infrastructure access.

Do not claim an issue is resolved if it was not actually resolved.

---

# INFRASTRUCTURE VOLUME 2 COMPLETION STANDARD

This prompt is complete only when the repository contains a coherent advanced production infrastructure implementation capable of supporting global operation with:

* Multi-region deployment
* Regional failover
* Highly available data services
* Scalable Kubernetes workloads
* Large-scale WebSocket infrastructure
* Advanced autoscaling
* Production-safe deployments
* Global media delivery
* Strong observability
* Secure infrastructure
* Tested backups
* Disaster recovery readiness
* Production CI/CD
* Failure-aware operational procedures

Every implemented configuration must be syntactically valid, internally consistent, secure, reproducible, and integrated with the repository.

Every infrastructure component must have a clear ownership boundary.

Every production-critical dependency must have a documented failure strategy.

Every deployment must be observable and reversible.

Every stateful production system must have an appropriate recovery strategy.

Do not stop at architectural descriptions. Implement the infrastructure.
