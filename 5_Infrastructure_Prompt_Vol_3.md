# WHATSAPP — INFRASTRUCTURE VOLUME 3

## ROLE

Act as a Principal Cloud Architect, Staff DevOps Engineer, Staff SRE, Staff Platform Engineer, Security Engineer, Network Architect, Kubernetes Engineer, Observability Engineer, Disaster Recovery Engineer, FinOps Engineer, Release Engineer, and Production Operations Engineer working as one senior engineering team.

You are implementing the final advanced infrastructure and operational hardening layer of a global, enterprise-grade real-time communication platform comparable in capability and operational complexity to WhatsApp, Telegram, Signal, Messenger, Discord, and Microsoft Teams.

You are not writing a tutorial, proof of concept, demonstration, or simplified deployment.

You are implementing production-grade infrastructure suitable for a funded global technology company operating at very large scale.

---

# PROJECT

Build and harden the infrastructure required to operate a global real-time communication platform with:

* Hundreds of millions of registered users
* Tens of millions of daily active users or greater
* Very large concurrent WebSocket populations
* Extremely high message throughput
* Large media volumes
* Global traffic
* Multi-region operation
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

This prompt focuses on final infrastructure hardening, operational maturity, production validation, security, resilience, release engineering, disaster recovery execution, capacity engineering, and long-term maintainability.

---

# TECHNOLOGY DIRECTION

Use the repository's existing implementation as the source of truth for exact versions and established conventions.

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
* FFmpeg
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

Support:

* Local development
* Development
* Test
* Staging
* Production
* Disaster recovery

The implementation must be compatible with the existing repository regardless of whether some components already exist in a partially implemented form.

Do not replace established technologies without a concrete repository-driven reason.

---

# SOURCE OF TRUTH

Before modifying anything:

1. Inspect the entire repository.
2. Inspect the current Terraform implementation.
3. Inspect all Kubernetes manifests.
4. Inspect all Helm charts.
5. Inspect Dockerfiles.
6. Inspect GitHub Actions workflows.
7. Inspect environment configuration.
8. Inspect AWS infrastructure definitions.
9. Inspect database infrastructure.
10. Inspect Redis infrastructure.
11. Inspect Kafka/Redpanda infrastructure.
12. Inspect search infrastructure.
13. Inspect S3 and CDN infrastructure.
14. Inspect observability configuration.
15. Inspect secrets and IAM configuration.
16. Inspect deployment and rollback workflows.
17. Inspect infrastructure documentation.
18. Identify current production gaps.
19. Identify duplicate or conflicting infrastructure.
20. Identify security, reliability, scaling, observability, and disaster-recovery gaps.

The repository is the source of truth for integration.

Do not assume infrastructure is empty.

Do not regenerate correct existing files.

Modify only files necessary to implement this scope or repair an actual production issue discovered during validation.

---

# 1. INFRASTRUCTURE HARDENING OBJECTIVE

Complete the infrastructure hardening required for production operation.

Focus on:

* Production readiness
* Reliability
* Security
* Disaster recovery
* Failure handling
* Operational automation
* Release safety
* Capacity management
* Cost control
* Observability
* Compliance-oriented controls
* Infrastructure lifecycle management

The result must be an infrastructure platform that can be operated by an experienced SRE/platform team without relying on undocumented manual configuration.

---

# 2. GLOBAL ARCHITECTURE VALIDATION

Review the complete deployed topology.

Validate relationships between:

* Global DNS
* CDN
* WAF
* Load balancers
* API services
* WebSocket services
* Worker services
* EKS
* PostgreSQL
* Redis
* Kafka/Redpanda
* OpenSearch/Elasticsearch
* S3
* Media processing
* Notification infrastructure
* Observability
* IAM
* Secrets
* CI/CD

Verify that:

* Every dependency is reachable only where required.
* No unintended public exposure exists.
* No unnecessary cross-region dependency exists.
* Critical workloads have sufficient redundancy.
* Stateful services have appropriate recovery paths.
* Scaling boundaries are explicit.
* Failure domains are separated.

Correct architecture defects discovered within this scope.

---

# 3. PRODUCTION ENVIRONMENT ISOLATION

Harden environment isolation.

Ensure:

* Development cannot accidentally access production resources.
* Test cannot mutate production data.
* Staging credentials cannot access production secrets.
* Production IAM roles are separate.
* Terraform state is isolated.
* Kubernetes namespaces and clusters are appropriately isolated.
* S3 buckets have environment boundaries.
* Database credentials are environment-specific.
* Redis credentials are environment-specific.
* Broker credentials are environment-specific.
* Search credentials are environment-specific.

Prevent accidental cross-environment deployment.

---

# 4. AWS ACCOUNT AND ORGANIZATION BOUNDARIES

Where repository architecture supports multiple AWS accounts, implement or harden separation for:

* Security
* Logging
* Shared services
* Development
* Staging
* Production
* Disaster recovery

Use appropriate:

* IAM roles
* Organization policies
* Service control policies where applicable
* Cross-account access
* Centralized logging

Do not grant broad administrator permissions when narrower permissions are sufficient.

If the repository uses a single-account model, implement strong logical isolation and document the limitations.

---

# 5. IAM HARDENING

Perform a complete IAM review.

Identify:

* Overly broad policies
* Unused permissions
* Wildcard resource access
* Long-lived credentials
* Unnecessary administrator roles
* Cross-service privilege escalation paths

Implement:

* Least privilege
* Workload identity
* Short-lived credentials
* Role separation
* Deployment roles
* Runtime roles
* Read-only operational roles
* Break-glass access

Break-glass access must be tightly controlled and auditable.

---

# 6. KMS AND ENCRYPTION HARDENING

Review encryption throughout the platform.

Ensure encryption at rest for:

* PostgreSQL
* Redis
* Kafka/Redpanda storage
* Search storage
* S3
* EBS
* Terraform state
* Backups
* Logs
* Sensitive configuration

Ensure encryption in transit for:

* Client-to-edge traffic
* Service-to-service traffic where required
* Database connections
* Redis connections
* Broker connections
* Search connections
* Administrative access

Implement KMS key policies that avoid unnecessary access.

Document key ownership and rotation expectations.

---

# 7. CERTIFICATE MANAGEMENT

Implement automated certificate lifecycle management.

Support:

* TLS certificate provisioning
* Renewal
* Validation
* Monitoring
* Expiration alerts
* Regional certificates where required
* Internal certificate requirements where applicable

Prevent production certificates from approaching expiration without alerting.

---

# 8. DNS RESILIENCE

Harden DNS infrastructure.

Implement:

* Health checks
* Failover records
* Appropriate TTLs
* Regional routing
* Disaster recovery routing
* DNSSEC where appropriate
* Controlled changes

Avoid excessively long TTLs that prevent emergency traffic changes.

Avoid excessively short TTLs that create unnecessary DNS load.

---

# 9. EDGE FAILURE MANAGEMENT

Design and implement protection against:

* CDN failures
* WAF failures
* Load balancer failures
* Regional edge failures
* Origin failures
* DNS propagation delays

Where practical, provide origin failover.

Ensure origin failover does not bypass:

* Authentication
* Authorization
* Media access controls
* Security policies

---

# 10. API RESILIENCE

Harden infrastructure supporting API services.

Implement support for:

* Rate limiting
* Request timeouts
* Connection limits
* Circuit breakers where applicable
* Graceful degradation
* Load shedding
* Autoscaling
* Resource isolation

Define safe limits for:

* Request body size
* Header size
* Connection count
* Request duration
* Upstream connections

Prevent malformed or abusive traffic from exhausting infrastructure.

---

# 11. WEBSOCKET RESILIENCE

Perform a dedicated WebSocket infrastructure review.

Validate:

* Load balancing
* Connection persistence
* Connection draining
* Pod disruption budgets
* Pod distribution
* Autoscaling
* Regional routing
* Failure recovery
* Reconnection behavior
* Connection metrics

Design explicitly for reconnect storms.

Implement protective controls for:

* Mass reconnects
* Connection floods
* Regional failover
* Rolling deployments
* Node replacement

Do not allow reconnect storms to overload authentication, Redis, databases, or message services.

---

# 12. RATE LIMITING INFRASTRUCTURE

Review rate limiting at multiple layers.

Implement appropriate controls at:

* CDN
* WAF
* Load balancer
* API gateway or API layer
* Application
* Redis
* Authentication
* WebSocket connection establishment

Distinguish between:

* Anonymous traffic
* Authenticated users
* Trusted internal services
* Administrative operations

Rate limits must account for legitimate high-volume messaging behavior.

---

# 13. KUBERNETES SECURITY HARDENING

Harden EKS workloads.

Implement where appropriate:

* Pod Security Standards
* NetworkPolicies
* SecurityContexts
* Non-root containers
* Read-only filesystems
* Dropped capabilities
* Seccomp
* Resource limits
* Resource requests
* Admission policies
* Image verification
* Restricted service accounts

Prevent containers from obtaining unnecessary host-level privileges.

---

# 14. EKS NODE SECURITY

Harden worker nodes.

Implement:

* Minimal operating system configuration
* Automatic security updates where safe
* Node replacement
* Instance metadata restrictions
* IMDSv2 where supported
* Encrypted EBS
* Private node networking
* Security groups
* Controlled SSH access

Prefer managed operational access mechanisms over persistent SSH access.

---

# 15. KUBERNETES SECRET SECURITY

Review all Kubernetes secrets.

Ensure:

* Secrets are not hardcoded.
* Secrets are not committed unnecessarily.
* Production secrets are externally managed where possible.
* Secret access is namespace-scoped.
* Secret rotation is supported.
* Secret values never appear in logs.
* CI/CD does not expose secret values.

Remove accidental credential exposure discovered during repository review.

---

# 16. POLICY AS CODE

Implement infrastructure policy validation where practical.

Validate:

* Public resource exposure
* Encryption
* IAM privilege
* Network security
* Kubernetes security
* Container security
* Required tags
* Required backups
* Environment isolation

Use policy tooling already present in the repository or add a mature tool only when justified.

Integrate policy checks into CI/CD.

---

# 17. SUPPLY-CHAIN SECURITY

Harden the software supply chain.

Implement where practical:

* Dependency scanning
* Container scanning
* SBOM generation
* Image signing
* Provenance
* Protected branches
* Required CI checks
* Artifact immutability
* Deployment verification

Production deployments must use verified artifacts.

Do not build different application binaries for the same release solely because the target environment changed.

---

# 18. RELEASE MANAGEMENT

Implement production release controls.

Each release must be traceable to:

* Git commit
* Build
* Container image
* Infrastructure version
* Helm release
* Deployment
* Environment
* Timestamp

Provide rollback paths.

Avoid deployments where operators cannot determine exactly what version is running.

---

# 19. ROLLBACK AUTOMATION

Implement safe rollback behavior.

Support rollback for:

* Application deployments
* Helm releases
* Container images
* Configuration
* Infrastructure where safe

Do not automatically roll back database schema changes that cannot safely be reversed.

Use forward-compatible migrations.

Rollback decisions must account for:

* Application health
* Database compatibility
* Event schema compatibility
* Queue compatibility
* WebSocket compatibility

---

# 20. DATABASE FAILOVER OPERATIONS

Implement operational automation and documentation for PostgreSQL failover.

Cover:

* Detection
* Promotion
* Application connection behavior
* Connection draining
* DNS/endpoint updates
* Replica validation
* Recovery
* Failback

Verify that applications do not continue using stale primary connections after failover.

Monitor:

* Replica lag
* Replication health
* Connection failures
* Promotion events

---

# 21. REDIS FAILOVER OPERATIONS

Implement and validate Redis failover.

Cover:

* Detection
* Automatic failover
* Application reconnection
* Connection pool recovery
* Cache warm-up
* Presence recovery
* Rate limiter recovery
* BullMQ recovery

Identify data that must be reconstructed after Redis failure.

Do not treat Redis recovery as equivalent to PostgreSQL recovery.

---

# 22. EVENT BROKER FAILURE OPERATIONS

Implement recovery procedures for Kafka/Redpanda.

Cover:

* Broker failure
* Partition failure
* Replica failure
* Consumer lag
* Consumer restart
* Rebalancing
* Storage exhaustion
* Regional failure

Ensure consumers recover without producing duplicate business effects where idempotency is required.

---

# 23. QUEUE FAILURE OPERATIONS

Harden BullMQ failure handling.

Support:

* Worker crash recovery
* Retry
* Dead-letter handling
* Poison-job detection
* Queue backlog detection
* Queue isolation
* Worker autoscaling

Prevent repeated failing jobs from creating infinite retry storms.

---

# 24. OBSERVABILITY DATA RETENTION

Define and implement retention policies for:

* Metrics
* Logs
* Traces
* Audit events
* Security events

Balance:

* Operational requirements
* Incident investigation
* Storage cost
* Privacy
* Compliance requirements

Sensitive logs must not be retained unnecessarily.

---

# 25. OBSERVABILITY FAILURE RESILIENCE

Ensure the application does not fail because observability systems are unavailable.

Observability pipelines must support:

* Bounded buffering
* Sampling
* Backpressure
* Local buffering where appropriate
* Dropping non-critical telemetry under pressure

Telemetry failures must not block:

* Message delivery
* Authentication
* API requests
* WebSocket operation
* Media processing

---

# 26. SLO DASHBOARDS

Create or update production dashboards for:

* Global availability
* Regional availability
* API latency
* API errors
* WebSocket connections
* WebSocket failures
* Message throughput
* Message latency
* Delivery latency
* Queue backlog
* Kafka/Redpanda lag
* Database health
* Redis health
* Media processing
* CDN performance
* Push notification processing
* Search health
* Infrastructure capacity

Dashboards must expose actionable signals rather than raw infrastructure metrics only.

---

# 27. INCIDENT RESPONSE

Create production incident-response infrastructure.

Define:

* Severity levels
* Alert routing
* Escalation
* Incident ownership
* Regional incident handling
* Security incident handling
* Database incident handling
* Deployment incident handling

Ensure incident metadata can identify:

* Region
* Service
* Deployment version
* Dependency
* Customer impact
* Current mitigation

---

# 28. RUNBOOK AUTOMATION

Automate repetitive operational procedures where safe.

Examples:

* Scaling
* Pod restart
* Queue inspection
* Deployment rollback
* Region evacuation
* Backup verification
* Certificate checks
* Health verification

Do not automate destructive operations without appropriate safety controls.

---

# 29. REGIONAL EVACUATION

Implement a controlled regional evacuation procedure.

Support:

1. Detect regional degradation.
2. Confirm customer impact.
3. Stop or reduce new traffic.
4. Shift traffic to healthy regions.
5. Protect remaining infrastructure.
6. Preserve data consistency.
7. Monitor recovery.
8. Restore traffic only after validation.

The procedure must account for:

* WebSocket reconnections
* Authentication load
* Database capacity
* Redis capacity
* Event broker capacity
* Media traffic
* Push notifications

---

# 30. REGIONAL FAILBACK

Implement controlled failback.

Never immediately restore traffic to a recovered region without validation.

Validate:

* Infrastructure health
* Application health
* Database state
* Replication status
* Cache health
* Broker health
* Search health
* Media access
* Observability
* Capacity

Gradually restore traffic.

---

# 31. LOAD TESTING INFRASTRUCTURE

Implement infrastructure support for realistic load testing.

Tests should model:

* API traffic
* WebSocket connections
* Message throughput
* Group messaging
* Presence
* Typing indicators
* Media uploads
* Media downloads
* Search
* Notifications
* Background jobs

Support controlled load testing against non-production environments.

Never direct uncontrolled load tests toward production.

---

# 32. CAPACITY TESTING

Define capacity testing for:

* Kubernetes
* WebSocket services
* PostgreSQL
* Redis
* Kafka/Redpanda
* Search
* S3
* CDN
* Network
* Workers

Record:

* Throughput
* Latency
* Saturation
* Failure threshold
* Scaling behavior
* Recovery behavior

Use results to tune autoscaling and resource limits.

---

# 33. CHAOS AND FAILURE TESTING

Where practical, implement controlled resilience tests.

Test:

* Pod termination
* Node termination
* AZ failure simulation
* Dependency unavailability
* Broker failure
* Redis failover
* Database failover
* Queue backlog
* Network degradation
* CDN origin failure
* Regional traffic shifting

Tests must have:

* Explicit scope
* Safety controls
* Monitoring
* Abort conditions
* Recovery procedures

Never run uncontrolled destructive experiments.

---

# 34. BACKUP VERIFICATION AUTOMATION

Automate verification that backups actually exist and are usable.

Check:

* Backup freshness
* Backup completion
* Backup encryption
* Cross-region copy
* Retention
* Restore availability

Alert when backup guarantees are violated.

---

# 35. RESTORE DRILLS

Implement scheduled recovery drills.

At minimum verify:

* Database restoration
* Infrastructure recreation
* Application startup
* Secret restoration
* Media accessibility
* Critical service health
* Observability availability

Record drill results.

Do not treat a successful backup job as proof of recoverability.

---

# 36. S3 DATA PROTECTION

Harden media storage.

Implement:

* Versioning where appropriate
* Encryption
* Bucket policies
* Block public access
* Lifecycle rules
* Replication where required
* Access logging or equivalent auditing
* Object ownership controls
* Retention policies where required

Ensure application-generated media cannot become publicly readable accidentally.

---

# 37. MEDIA LIFECYCLE MANAGEMENT

Implement lifecycle policies for:

* Temporary uploads
* Failed processing artifacts
* Thumbnails
* Transcoded files
* Deleted content
* Expired disappearing-message media
* Orphaned objects

Lifecycle operations must respect application retention and deletion requirements.

---

# 38. SEARCH INFRASTRUCTURE RESILIENCE

Harden OpenSearch/Elasticsearch.

Support:

* Multi-node deployment
* Availability zones
* Snapshot strategy
* Storage scaling
* Index lifecycle management
* Shard planning
* Replica configuration
* Monitoring
* Recovery

Search must be treated as a derived system where possible.

Application correctness must not depend on search being perfectly synchronized at every moment.

---

# 39. PUSH NOTIFICATION INFRASTRUCTURE

Harden infrastructure supporting:

* FCM
* APNs

Support:

* Credential rotation
* Failure handling
* Rate control
* Retry
* Token cleanup
* Provider outages
* Monitoring

Provider outages must not block core message persistence and synchronization.

---

# 40. COST AND FINOPS CONTROLS

Implement infrastructure cost visibility.

Track cost by:

* Environment
* Region
* Service
* Workload
* Storage
* Network
* Media
* Observability

Implement:

* Required resource tags
* Budget alerts
* Cost anomaly detection where appropriate
* Storage lifecycle policies
* Log retention controls
* Autoscaling policies

Do not reduce reliability merely to meet a cost target.

---

# 41. RESOURCE GOVERNANCE

Enforce:

* Required tags
* Naming conventions
* Environment labels
* Owner metadata
* Cost-center metadata where applicable
* Backup classification
* Data classification

Prevent creation of unowned production resources.

---

# 42. INFRASTRUCTURE LIFECYCLE

Implement safe lifecycle management.

Cover:

* Resource creation
* Updates
* Deprecation
* Replacement
* Destruction
* Migration
* Version upgrades

Prevent accidental destruction of production stateful resources.

Use explicit safeguards for critical resources.

---

# 43. KUBERNETES UPGRADE STRATEGY

Document and automate safe EKS upgrades where practical.

Cover:

* Kubernetes version
* Node upgrades
* Add-on compatibility
* CNI
* CoreDNS
* kube-proxy
* Storage drivers
* Admission policies
* Workload compatibility

Use staged upgrades.

Never upgrade production Kubernetes infrastructure blindly.

---

# 44. DATABASE AND CACHE VERSION MANAGEMENT

Define safe upgrade strategies for:

* PostgreSQL
* Redis
* Kafka/Redpanda
* OpenSearch/Elasticsearch

Support:

* Compatibility validation
* Backup
* Staging validation
* Rollback or recovery
* Monitoring

---

# 45. INFRASTRUCTURE DOCUMENTATION

Ensure documentation accurately describes:

* Global architecture
* Regions
* Environments
* Networking
* Security
* Deployment
* Scaling
* Failover
* Disaster recovery
* Backup
* Observability
* Incident response
* Operational procedures
* Upgrade procedures

Documentation must match actual infrastructure.

---

# 46. FINAL SECURITY AUDIT

Perform a final infrastructure security review.

Check:

* Public exposure
* IAM
* Network security
* Secrets
* Encryption
* Kubernetes security
* Container security
* CI/CD security
* Supply chain
* WAF
* DNS
* TLS
* Logging
* Auditability
* Backup security
* Disaster recovery access

Fix all issues within this prompt's scope.

---

# 47. FINAL RELIABILITY AUDIT

Perform a final reliability review.

Check:

* Single points of failure
* AZ redundancy
* Regional redundancy
* Autoscaling
* Capacity
* Deployment safety
* Failover
* Recovery
* Backup
* Restore
* Observability
* Alerting
* Operational procedures

Fix all issues within scope.

---

# 48. FINAL PERFORMANCE AUDIT

Review infrastructure for:

* API latency
* WebSocket scale
* Database connection pressure
* Redis latency
* Broker throughput
* Queue throughput
* Search latency
* Media throughput
* CDN performance
* Network saturation

Tune infrastructure where the repository and available configuration support safe improvements.

Do not perform premature micro-optimization that makes infrastructure harder to operate.

---

# 49. FINAL PRODUCTION VALIDATION

Before completion:

1. Validate Terraform formatting.
2. Validate Terraform configuration.
3. Validate Terraform modules.
4. Validate Terraform plans where credentials permit.
5. Validate Helm charts.
6. Validate Kubernetes manifests.
7. Validate Dockerfiles.
8. Validate GitHub Actions workflows.
9. Validate IAM.
10. Validate networking.
11. Validate security policies.
12. Validate autoscaling.
13. Validate health probes.
14. Validate deployment behavior.
15. Validate rollback behavior.
16. Validate backup configuration.
17. Validate restore procedures.
18. Validate disaster recovery configuration.
19. Validate observability.
20. Validate alerting.
21. Validate secrets handling.
22. Validate environment isolation.
23. Validate production resource protection.
24. Validate repository integration.
25. Run all relevant tests.
26. Fix all issues within scope.

Do not claim production readiness if critical validation fails.

---

# 50. HARD IMPLEMENTATION RULES

You MUST:

* Inspect the repository first.
* Implement actual infrastructure.
* Preserve correct existing infrastructure.
* Modify only what is necessary.
* Use production-grade configuration.
* Use secure defaults.
* Design for failure.
* Design for recovery.
* Design for observability.
* Design for scale.
* Keep infrastructure reproducible.
* Keep production access controlled.
* Automate safe operational procedures.
* Validate every meaningful change.

You MUST NOT:

* Use pseudo-code.
* Use placeholders.
* Use fake credentials.
* Use fake infrastructure identifiers.
* Leave TODO/FIXME implementation gaps.
* Leave incomplete Terraform.
* Leave incomplete Helm charts.
* Leave invalid Kubernetes manifests.
* Leave broken CI/CD workflows.
* Disable security controls for convenience.
* Expose private infrastructure unnecessarily.
* Use mutable production artifacts.
* Ignore disaster recovery.
* Ignore capacity limits.
* Ignore operational failures.
* Claim implementation without validation.

Never use phrases such as:

* “implement similarly”
* “left as an exercise”
* “for brevity”
* “remaining code omitted”
* “placeholder”
* “TODO”
* “etc.” as a substitute for implementation

---

# 51. REPOSITORY INTEGRATION

Integrate all changes into the existing repository.

Requirements:

* Preserve compatible infrastructure.
* Do not regenerate unchanged files.
* Do not create duplicate resources.
* Preserve established naming.
* Preserve established environment structure.
* Preserve Terraform conventions.
* Preserve Helm conventions.
* Preserve Kubernetes conventions.
* Preserve CI/CD conventions.
* Preserve application contracts.
* Preserve infrastructure dependencies.
* Update documentation when behavior changes.
* Ensure all references resolve.
* Ensure configuration is internally consistent.

If conflicting infrastructure exists, consolidate it rather than creating parallel implementations.

---

# 52. FINAL IMPLEMENTATION REPORT

At completion provide:

## IMPLEMENTED

List all major infrastructure capabilities implemented.

## SECURITY

Describe:

* IAM
* Encryption
* Secrets
* Network security
* Kubernetes security
* Supply-chain security
* WAF
* TLS

## RELIABILITY

Describe:

* High availability
* Multi-AZ
* Multi-region
* Failover
* Autoscaling
* Rollback
* Resilience

## DISASTER RECOVERY

Describe:

* Backups
* Restore
* RPO
* RTO
* Regional recovery
* Recovery drills

## OBSERVABILITY

Describe:

* Metrics
* Logs
* Traces
* Dashboards
* Alerts
* SLOs

## OPERATIONS

Describe:

* Incident response
* Runbooks
* Regional evacuation
* Failback
* Database operations
* Cache operations
* Broker operations

## CI/CD

Describe:

* Validation
* Build
* Security scanning
* Artifact management
* Deployment
* Promotion
* Rollback

## TESTING

List:

* Infrastructure tests
* Security tests
* Deployment tests
* Load tests
* Failure tests
* Backup/restore tests

## FILES CHANGED

List every created, modified, or deleted file with a concise explanation.

## REMAINING ISSUES

Only list genuine unresolved issues that are outside this prompt's scope or require unavailable external infrastructure access.

Do not claim unresolved work that was actually completed.

---

# INFRASTRUCTURE VOLUME 3 COMPLETION STANDARD

This prompt is complete only when the repository contains a hardened production infrastructure implementation with:

* Global operational readiness
* Strong multi-region resilience
* Secure production environments
* Hardened IAM
* Hardened Kubernetes
* Secure supply chain
* Safe releases
* Automated rollback support
* Database recovery procedures
* Redis recovery procedures
* Broker recovery procedures
* Resilient media infrastructure
* Reliable observability
* Incident-response capabilities
* Capacity-management capabilities
* Cost governance
* Backup verification
* Restore testing
* Disaster recovery procedures
* Infrastructure lifecycle controls
* Production validation

The resulting infrastructure must be reproducible, secure, observable, scalable, recoverable, and maintainable.

Every production-critical dependency must have a failure strategy.

Every stateful system must have an appropriate recovery path.

Every deployment must be traceable.

Every critical operational procedure must be documented or automated.

Do not stop at architectural recommendations.

Implement the infrastructure, validate it, integrate it into the repository, and report the exact result.
