# INFRASTRUCTURE IMPLEMENTATION PROMPT — VOLUME 2

## Production Operations, Observability, Scaling, Security, Disaster Recovery, and Final Hardening

You are the senior infrastructure, cloud, DevOps, SRE, security, and platform engineering team responsible for taking a production-grade real-time communication platform to final operational readiness.

This is an implementation task against the existing repository.

Do not provide a tutorial, pseudo-code, conceptual-only recommendations, placeholder infrastructure, fake production configurations, TODO lists, or incomplete operational scaffolding.

Inspect the actual repository and existing infrastructure first.

Implement the required production operations directly in the repository.

The actual repository is the source of truth.

---

# 1. SYSTEM CONTEXT

The platform is a production-grade real-time communication system consisting of:

* web application
* React Native mobile application
* NestJS/Node.js backend
* PostgreSQL
* Prisma
* Redis
* Kafka/Redpanda
* BullMQ
* WebSockets/Socket.IO
* S3
* CloudFront
* Elasticsearch/OpenSearch where implemented
* media processing
* push notifications
* WebRTC calling where implemented
* Docker
* Kubernetes or the repository's selected orchestration platform
* CI/CD
* OpenTelemetry-compatible observability

The infrastructure must operate all components as one coherent distributed system.

---

# 2. REPOSITORY-FIRST REQUIREMENT

Before making changes, inspect:

* all infrastructure directories
* Terraform/OpenTofu/Pulumi files
* Kubernetes manifests
* Helm charts
* Dockerfiles
* CI/CD workflows
* environment configuration
* backend deployment configuration
* worker configuration
* database configuration
* Redis configuration
* Kafka/Redpanda configuration
* S3/CloudFront configuration
* search configuration
* monitoring configuration
* logging configuration
* tracing configuration
* security configuration
* backup configuration
* existing operational documentation

Determine what Infrastructure Volume 1 already implemented in the actual repository.

Do not assume a file exists because this prompt describes it.

Do not recreate existing resources.

Do not create competing infrastructure.

---

# 3. OBJECTIVE

Complete the production operations layer.

Implement and harden:

1. observability
2. metrics
3. logs
4. distributed tracing
5. dashboards
6. alerting
7. SLOs
8. autoscaling
9. capacity management
10. deployment safety
11. rollback
12. resilience
13. disaster recovery
14. backup validation
15. security hardening
16. network hardening
17. IAM hardening
18. secret rotation
19. container security
20. dependency security
21. cost controls
22. operational runbooks
23. incident response
24. production readiness validation

---

# 4. PRODUCTION OPERATING PRINCIPLE

The platform must be designed around:

* reliability
* observability
* recoverability
* least privilege
* controlled change
* graceful degradation
* horizontal scalability
* predictable failure behavior
* measurable service objectives

Do not optimize only for successful deployments.

A production system must remain diagnosable and recoverable when dependencies fail.

---

# 5. OBSERVABILITY ARCHITECTURE

Complete the observability stack using the actual technologies in the repository.

Where appropriate:

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo
* cloud-native monitoring services

Do not deploy duplicate observability systems unnecessarily.

Define clear ownership between:

* application telemetry
* infrastructure telemetry
* database telemetry
* queue telemetry
* event-stream telemetry
* load-balancer telemetry
* cloud-provider telemetry

---

# 6. METRICS

Implement useful metrics for:

## API

* request count
* error count
* error rate
* latency
* status-code distribution
* route-level latency

## WebSockets

* active connections
* connection attempts
* connection failures
* disconnects
* reconnects
* event throughput
* event failures
* connection duration

## Messaging

* messages created
* message processing latency
* delivery latency
* read latency
* synchronization latency
* failed operations

## Kafka/Redpanda

* consumer lag
* throughput
* partition health
* producer failures
* consumer failures

## BullMQ

* queue depth
* active jobs
* failed jobs
* retry count
* job latency
* processing duration

## Media

* upload failures
* upload latency
* processing latency
* processing failures
* queue depth
* CDN errors

## PostgreSQL

* connections
* query latency
* errors
* locks
* replication health where applicable
* storage
* CPU
* memory

## Redis

* memory
* hit/miss ratio where meaningful
* commands
* latency
* connections
* evictions
* availability

---

# 7. METRIC CARDINALITY

Avoid high-cardinality metrics.

Never create unbounded labels from:

* user IDs
* message IDs
* conversation IDs
* request IDs
* arbitrary URLs
* media IDs

Use controlled dimensions such as:

* service
* environment
* route template
* operation
* status class
* dependency

---

# 8. DISTRIBUTED TRACING

Implement end-to-end tracing where supported.

Trace important flows such as:

```text
Mobile/Web
→ API
→ PostgreSQL
→ Outbox
→ Kafka/Redpanda
→ Consumer
→ Redis
→ WebSocket
→ Notification
```

and:

```text
Client
→ Media Authorization
→ S3
→ Processing Queue
→ Media Worker
→ S3
→ CDN
```

and:

```text
Client
→ Call Signaling
→ WebSocket
→ WebRTC infrastructure
```

Propagate:

* trace ID
* span ID
* correlation ID

where technically appropriate.

Do not put sensitive user content into traces.

---

# 9. LOGGING

Standardize structured logging.

Each service should produce logs containing useful metadata such as:

* timestamp
* severity
* service
* environment
* instance
* operation
* request ID
* correlation ID
* trace ID
* duration
* outcome

Errors should contain actionable information.

Never log:

* passwords
* access tokens
* refresh tokens
* API keys
* private keys
* secrets
* signed URLs
* raw notification tokens
* unnecessary private message content

---

# 10. LOG RETENTION

Define retention appropriate to:

* operational troubleshooting
* security investigations
* cost
* privacy

Separate:

* application logs
* audit/security logs
* infrastructure logs

Do not retain private data indefinitely.

---

# 11. AUDIT LOGGING

Ensure security-sensitive operations are auditable.

Where supported by the application architecture, record events such as:

* authentication changes
* account security changes
* administrative group changes
* blocking/reporting
* privileged actions
* secret/configuration changes
* deployment changes

Audit logs should contain sufficient metadata to investigate an event without unnecessarily storing private content.

---

# 12. DASHBOARDS

Create production dashboards for:

## Platform overview

* availability
* request rate
* error rate
* latency
* active users/connections
* infrastructure health

## Backend

* API traffic
* errors
* latency
* WebSocket connections
* event throughput

## Messaging

* message throughput
* delivery latency
* event processing
* queue backlog
* synchronization

## Media

* uploads
* processing
* failures
* storage
* CDN

## Infrastructure

* nodes
* pods
* CPU
* memory
* disk
* network

## Database

* connections
* CPU
* storage
* latency
* locks
* replication

---

# 13. ALERTING

Create actionable alerts.

Alerts should cover:

* service unavailable
* elevated error rate
* elevated latency
* failed deployments
* crash loops
* database failure
* Redis failure
* Kafka consumer lag
* queue backlog
* worker failure
* storage failure
* certificate expiration
* resource exhaustion
* backup failure
* replication failure

Every alert should identify:

* severity
* affected component
* condition
* likely impact
* useful diagnostic information

Avoid noisy alerts.

---

# 14. SLOs AND SLIs

Define practical initial SLOs.

Examples:

### API availability

Measure successful API requests.

### API latency

Measure important API operations.

### Messaging

Measure message acceptance and processing latency.

### WebSocket

Measure connection availability and event delivery behavior.

### Media

Measure successful upload and processing completion.

### Notifications

Measure notification processing where measurable.

### Calling

Measure call setup success where measurable.

Do not invent unrealistic guarantees.

Document the measurement methodology.

---

# 15. ERROR BUDGETS

Where the observability platform supports them, establish error-budget concepts.

Operational changes should become more conservative when reliability objectives are being consumed rapidly.

Do not create an elaborate SRE process without actual measurable metrics.

---

# 16. AUTOSCALING

Review all scalable workloads.

Configure autoscaling for:

* API
* WebSocket workloads
* workers
* media processors
* web application

Use appropriate signals.

Examples:

* CPU
* memory
* request rate
* active connections
* queue depth
* processing latency

Avoid scaling stateful services without architectural justification.

---

# 17. WEBSOCKET SCALING

Validate multi-instance real-time behavior.

Ensure:

* connection routing works
* Redis adapter/shared state works where required
* events reach the correct devices
* authorization remains correct
* connection draining works
* reconnect synchronization works

Test scale-out and scale-in.

A WebSocket connection must not depend on a permanently fixed application instance.

---

# 18. QUEUE AUTOSCALING

Workers must scale based on actual workload.

Monitor:

* waiting jobs
* active jobs
* job duration
* failure rate
* retry rate

Avoid excessive concurrency that overloads:

* PostgreSQL
* Redis
* S3
* FFmpeg
* external providers

Scaling must respect downstream capacity.

---

# 19. BACKPRESSURE

Implement operational protection against overload.

Examples:

* API rate limits
* queue limits
* connection limits
* worker concurrency
* database pool limits
* upload limits
* Kafka consumer controls

When overloaded, noncritical operations should degrade before critical messaging/authentication paths.

---

# 20. GRACEFUL DEGRADATION

Define behavior when dependencies become unavailable.

Examples:

### Search unavailable

Messaging should continue.

### Notification provider unavailable

Message persistence should continue.

### CDN unavailable

Secure origin/media fallback should behave according to the actual architecture.

### Redis unavailable

Only functionality truly dependent on Redis should fail; durable operations should not silently lose data.

### Kafka temporarily unavailable

Use the actual outbox/retry strategy.

### Search unavailable

Do not make the transactional database dependent on search availability.

---

# 21. FAILURE DOMAINS

Review infrastructure for failure-domain isolation.

Avoid placing all critical workloads on:

* one node
* one availability zone
* one instance
* one worker
* one broker

where the selected infrastructure supports redundancy.

---

# 22. POD DISRUPTION

Where Kubernetes is used, configure:

* PodDisruptionBudgets
* anti-affinity/topology spread
* rolling update limits
* termination grace periods

Ensure voluntary infrastructure maintenance does not unnecessarily take down the service.

---

# 23. DEPLOYMENT SAFETY

Production deployment must include:

1. validation
2. artifact creation
3. security scanning
4. staging deployment
5. smoke tests
6. controlled production rollout
7. health verification
8. monitoring
9. rollback capability

Do not deploy broken images directly to production.

---

# 24. ROLLING DEPLOYMENTS

Ensure rolling deployments preserve compatibility.

For backend changes:

* old and new instances may coexist
* database migrations must be compatible
* event schemas must remain compatible
* WebSocket clients must reconnect safely
* synchronization must handle mixed versions where necessary

Do not require every client to upgrade simultaneously.

---

# 25. CANARY / PROGRESSIVE DELIVERY

If the repository's deployment platform supports progressive delivery and it is justified by the system's scale, implement an appropriate strategy.

Possible stages:

```text
small percentage
→ health validation
→ increased percentage
→ full rollout
```

Do not add complicated canary tooling without a practical reason.

---

# 26. ROLLBACK

Implement reliable rollback.

Rollback must account for:

* application image
* configuration
* infrastructure
* database migrations
* event schema changes

Never assume a database rollback is as simple as reverting application code.

Prefer forward-compatible migrations.

---

# 27. DATABASE MIGRATION SAFETY

Audit production migrations.

Use expand/contract patterns when required.

Example:

```text
add new field
→ deploy compatible application
→ backfill
→ switch reads/writes
→ remove old field later
```

Do not perform destructive schema changes during a deployment where older instances still depend on the removed schema.

---

# 28. SECRET ROTATION

Implement or document secret rotation.

Secrets should be rotatable without requiring unnecessary downtime.

Consider:

* database credentials
* Redis credentials
* Kafka credentials
* cloud credentials
* provider keys
* signing secrets
* TURN credentials

Use short-lived credentials where supported.

---

# 29. CERTIFICATE MANAGEMENT

Ensure TLS certificates:

* renew automatically
* are monitored
* are not manually copied into containers
* are stored securely
* are not committed to Git

Alert before expiration.

---

# 30. IAM REVIEW

Perform a least-privilege audit.

For each workload determine:

* what it can read
* what it can write
* what secrets it can access
* what cloud resources it can modify

Remove unnecessary permissions.

Do not use wildcard administrative permissions unless technically unavoidable and explicitly justified.

---

# 31. NETWORK SECURITY REVIEW

Audit:

* security groups
* firewall rules
* public IPs
* load balancers
* private endpoints
* database access
* Redis access
* Kafka access
* search access

Every publicly reachable resource must have a documented purpose.

---

# 32. CONTAINER SECURITY

Harden images.

Check for:

* root execution
* unnecessary packages
* known vulnerabilities
* exposed secrets
* writable filesystem requirements
* unnecessary Linux capabilities

Use:

* non-root users
* minimal images
* read-only filesystem where practical
* dropped capabilities
* security contexts

Do not break applications merely to satisfy generic hardening rules; validate actual runtime requirements.

---

# 33. KUBERNETES SECURITY

Where Kubernetes is used, review:

* RBAC
* service accounts
* namespaces
* pod security
* network policies
* secret access
* container privileges
* host networking
* host filesystem mounts

Applications should not have cluster-admin access.

---

# 34. NETWORK POLICIES

Where supported, restrict service-to-service communication.

Examples:

* API → PostgreSQL
* API → Redis
* API → Kafka
* workers → Redis
* workers → S3
* search consumers → search
* observability agents → telemetry endpoints

Do not allow unrestricted pod-to-pod communication when network policies can safely restrict it.

---

# 35. WAF / EDGE PROTECTION REVIEW

Review public endpoints for:

* rate limits
* common attack patterns
* malicious traffic
* oversized requests
* abusive clients

WAF configuration must complement, not replace:

* authentication
* authorization
* application validation
* rate limiting

---

# 36. DDoS / ABUSE RESILIENCE

Review edge protections for:

* authentication abuse
* API floods
* WebSocket connection floods
* upload abuse
* search abuse

Protect expensive operations more aggressively.

Do not allow unauthenticated clients to consume unlimited compute.

---

# 37. BACKUP VALIDATION

Backups must be tested.

Validate:

* backup creation
* backup retention
* backup accessibility
* restoration
* application connectivity after restore

A backup that has never been restored should not be treated as fully validated.

---

# 38. DATABASE DISASTER RECOVERY

Document and validate:

* database failure
* replica promotion where supported
* point-in-time recovery
* restore to a new environment
* application reconnection
* migration compatibility

Clearly identify the authoritative database.

---

# 39. REDIS DISASTER RECOVERY

Determine which Redis workloads require persistence.

Differentiate:

### Reconstructable

* cache
* presence
* typing
* ephemeral state

### Operationally important

* BullMQ state
* coordination state

Do not apply one persistence policy blindly to every Redis use case.

---

# 40. KAFKA / REDPANDA DISASTER RECOVERY

Define:

* replication
* retention
* consumer recovery
* replay
* offset recovery
* topic recreation
* backup strategy where appropriate

The system must be able to recover consumers without silently losing required durable events.

---

# 41. SEARCH RECOVERY

Search is derived data.

Ensure indexes can be recreated from authoritative sources/events.

Document:

* index creation
* versioning
* alias switching
* reindexing
* failure recovery

Do not make search restoration dependent on manually rebuilding data.

---

# 42. MEDIA RECOVERY

Media storage must be recoverable according to its durability requirements.

Validate:

* S3 durability assumptions
* object retention
* deleted-object behavior
* lifecycle rules
* processing recovery
* orphan cleanup

Do not delete objects simply because a worker temporarily failed.

---

# 43. INCIDENT RESPONSE

Create practical operational procedures for:

* API outage
* database outage
* Redis outage
* Kafka outage
* queue backlog
* media processing outage
* notification outage
* search outage
* security incident
* credential compromise
* failed deployment
* certificate failure

Each runbook should contain:

* symptoms
* impact
* immediate mitigation
* diagnostics
* recovery
* validation
* escalation
* post-incident steps

---

# 44. ON-CALL READINESS

Document:

* critical dashboards
* alerts
* service dependencies
* common failure modes
* deployment procedures
* rollback procedures
* backup recovery
* escalation contacts/process where applicable

Do not invent personal contact information.

---

# 45. HEALTH AND DEPENDENCY CHECKS

Review readiness checks carefully.

Do not make a service permanently unready because an optional dependency is unavailable.

Classify dependencies:

### Critical

Required for correct core operation.

### Degraded

Allows partial operation.

### Optional

Should not prevent normal service.

Use this classification when designing readiness behavior.

---

# 46. SERVICE DEPENDENCY MAP

Document the real dependency graph.

Example:

```text
Web / Mobile
      ↓
Load Balancer
      ↓
API / WebSocket
 ┌────┼─────┬────────┐
 ↓    ↓     ↓        ↓
DB   Redis Kafka    S3
            ↓
         Workers
       ┌────┼────┐
       ↓    ↓    ↓
    Media Search Notifications
```

Adjust this diagram to match the actual repository.

Do not document imaginary dependencies.

---

# 47. CAPACITY PLANNING

Estimate initial production capacity for:

* API instances
* WebSocket connections
* database connections
* Redis memory
* Kafka partitions
* worker concurrency
* media processing
* object storage
* search

Document assumptions.

Identify which values must be load-tested before major production scale.

---

# 48. LOAD TESTING

Where infrastructure and tooling support it, create realistic load tests for:

* authentication
* conversation retrieval
* message sending
* message synchronization
* WebSocket connections
* message fanout
* media upload
* search
* notification processing

Measure:

* throughput
* latency
* error rate
* resource utilization
* queue growth
* database behavior

Do not generate meaningless synthetic benchmarks.

---

# 49. REAL-TIME LOAD TESTING

Test:

* many simultaneous WebSocket connections
* reconnect storms
* group fanout
* message bursts
* multiple devices
* event duplication
* consumer lag

Verify the platform remains correct under load, not merely available.

---

# 50. RECONNECT STORM PROTECTION

The infrastructure must handle scenarios where many clients reconnect simultaneously.

Protect:

* load balancer
* authentication
* WebSocket service
* Redis
* database
* Kafka

Use:

* exponential backoff
* jitter
* connection limits
* rate limiting
* autoscaling
* graceful degradation

where appropriate.

---

# 51. COST OPTIMIZATION

Review infrastructure cost.

Look for:

* oversized instances
* unnecessary NAT usage
* excessive logging
* excessive metrics
* oversized Kafka retention
* unused search capacity
* excessive S3 storage
* unnecessary CDN invalidations
* idle development resources

Do not sacrifice production reliability for small cost reductions.

---

# 52. RESOURCE TAGGING

Where supported, consistently tag cloud resources.

Useful tags include:

* project
* environment
* service
* owner/team
* managed-by
* cost-center where applicable

Do not invent organizational identifiers.

---

# 53. ENVIRONMENT ISOLATION

Ensure staging cannot accidentally access production resources.

Review:

* IAM
* network routing
* credentials
* secrets
* databases
* buckets
* Kafka
* Redis
* search

A staging compromise must not automatically become a production compromise.

---

# 54. PRODUCTION DATA PROTECTION

Never use production data in development or tests unless explicitly authorized and appropriately sanitized.

Operational tooling must avoid accidental exposure of private user data.

---

# 55. PRIVACY REVIEW

Infrastructure must respect application privacy.

Audit:

* logs
* traces
* backups
* search indexes
* object storage
* metrics
* notification systems
* analytics

Avoid retaining personal/private content where unnecessary.

Ensure deletion/retention behavior is compatible with the application's privacy model.

---

# 56. SECURITY MONITORING

Where appropriate, monitor:

* unusual authentication activity
* privilege changes
* unexpected network traffic
* unusual API usage
* abnormal upload activity
* excessive WebSocket connections
* suspicious worker behavior
* secret access
* administrative actions

Do not collect unnecessary personal information merely for monitoring.

---

# 57. SUPPLY-CHAIN SECURITY

Review:

* npm dependencies
* Docker base images
* GitHub Actions or CI actions
* infrastructure providers/modules
* container images

Use version pinning or controlled version ranges where appropriate.

Enable dependency and container scanning.

Avoid untrusted build dependencies.

---

# 58. CI/CD HARDENING

CI/CD must:

* use least-privilege credentials
* prefer OIDC/short-lived credentials
* protect production environments
* prevent secret leakage
* scan artifacts
* validate infrastructure
* support rollback
* record deployment metadata

Production deployments should require appropriate controls for the project's maturity.

---

# 59. DEPLOYMENT AUDITABILITY

Every production deployment should identify:

* application version
* container image
* commit
* deployment time
* environment
* migration version
* deployment result

This information must be observable without exposing secrets.

---

# 60. CONFIGURATION DRIFT

Prevent or detect infrastructure drift.

Where infrastructure-as-code is used:

* define authoritative configuration
* validate changes through code review/CI
* detect unexpected changes where practical

Do not make production infrastructure dependent on undocumented manual changes.

---

# 61. OPERATIONAL DOCUMENTATION

Update documentation for:

* deployment
* rollback
* scaling
* incident response
* backups
* restoration
* secret rotation
* certificate management
* monitoring
* alerts
* infrastructure recreation
* database migrations
* queue recovery
* Kafka recovery
* search reindexing
* media recovery

Documentation must describe the actual implementation.

---

# 62. FINAL SECURITY AUDIT

Perform a final infrastructure security audit covering:

* public resources
* IAM
* secrets
* encryption
* TLS
* networking
* containers
* Kubernetes
* CI/CD
* S3
* database
* Redis
* Kafka
* search
* observability
* backups

Fix issues directly where possible.

Do not merely report obvious security defects.

---

# 63. FINAL RESILIENCE AUDIT

Verify behavior during:

* API instance failure
* worker failure
* database failover
* Redis failure
* Kafka broker failure
* search failure
* S3 temporary failure
* notification provider failure
* WebSocket instance termination
* node failure
* availability-zone failure where supported
* deployment failure
* migration failure
* network interruption

For every critical dependency determine:

* what fails
* what continues
* how recovery occurs

---

# 64. PRODUCTION READINESS GATES

Do not consider the infrastructure production-ready until these categories have been validated:

## Security

* least privilege
* secret protection
* network isolation
* encryption
* TLS
* container security
* CI/CD security

## Reliability

* redundancy
* health checks
* graceful shutdown
* autoscaling
* failure recovery

## Observability

* logs
* metrics
* traces
* dashboards
* alerts
* SLOs

## Data

* backups
* restore
* migration safety
* replication where applicable

## Deployment

* CI/CD
* staged deployment
* rollback
* configuration management

## Operations

* runbooks
* incident response
* capacity planning
* disaster recovery

---

# 65. FINAL VALIDATION

Run every relevant validation available in the repository.

At minimum:

1. infrastructure syntax validation
2. infrastructure formatting validation
3. Terraform/OpenTofu validation where applicable
4. Kubernetes validation where applicable
5. Helm validation where applicable
6. Docker builds
7. CI configuration validation
8. security scanning
9. secret scanning
10. dependency scanning
11. application build
12. application tests
13. infrastructure tests
14. deployment smoke tests
15. health checks
16. observability validation
17. backup validation
18. restore validation where environment permits
19. load testing where available
20. failure/recovery validation

Fix failures instead of simply documenting them.

---

# 66. NO FALSE COMPLETION

Do not claim:

* production deployment succeeded unless it actually succeeded
* backups were restored unless restoration was actually tested
* infrastructure is highly available unless the deployed configuration provides it
* autoscaling works unless configured and validated
* monitoring works unless telemetry is actually produced
* disaster recovery works unless the recovery process has been tested or its untested status is explicitly stated

Report actual repository and environment state.

---

# 67. NO PLACEHOLDERS

Do not leave:

* TODO infrastructure
* fake dashboards
* fake alerts
* dummy production resources
* empty runbooks
* placeholder Terraform
* imaginary metrics
* fake recovery procedures
* commented-out security controls presented as implemented

Every committed artifact must have a real purpose.

---

# 68. CROSS-SYSTEM CONSISTENCY

Verify infrastructure compatibility with the actual application.

Do not accidentally change:

* API URLs
* WebSocket URLs
* database connection formats
* Redis configuration
* Kafka topics
* BullMQ queue names
* S3 paths
* CloudFront paths
* search endpoints
* notification configuration
* WebRTC configuration
* environment variable names

unless the actual repository requires it.

If a change is required, update every affected consumer.

---

# 69. IMPLEMENTATION ORDER

Use this implementation sequence unless repository dependencies require another safe order:

### Phase 1

Audit current infrastructure.

### Phase 2

Complete observability.

### Phase 3

Complete dashboards and alerts.

### Phase 4

Implement SLO/SLI monitoring.

### Phase 5

Harden autoscaling and capacity.

### Phase 6

Harden deployments and rollback.

### Phase 7

Validate backups and disaster recovery.

### Phase 8

Perform IAM/security hardening.

### Phase 9

Perform network/container/Kubernetes hardening.

### Phase 10

Implement operational runbooks.

### Phase 11

Perform load and failure testing.

### Phase 12

Perform final production-readiness audit.

---

# 70. FINAL DELIVERABLE

The repository must contain a complete operational foundation capable of supporting the real-time communication platform in production.

At completion report:

* files created
* files modified
* infrastructure hardened
* observability implemented
* dashboards implemented
* alerts implemented
* SLOs/SLIs implemented
* scaling configuration
* deployment improvements
* rollback capability
* security improvements
* backup/restore validation
* disaster-recovery procedures
* incident-response runbooks
* load/failure tests
* CI/CD changes
* dependencies added
* validation commands
* validation results
* actual limitations
* any items that could not be validated because of unavailable external infrastructure

Do not provide a conceptual answer instead of implementation.

Inspect the repository first.

Then implement the complete production-operations and final-hardening scope described above.
