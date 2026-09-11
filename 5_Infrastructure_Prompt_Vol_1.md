# WHATSAPP — INFRASTRUCTURE VOLUME 1

## ROLE

Act as a senior production infrastructure and cloud engineering team responsible for implementing the foundational infrastructure platform for a globally scaled real-time communication system.

Operate as:

* Principal Cloud Architect
* Staff DevOps Engineer
* Staff Site Reliability Engineer
* Kubernetes Platform Engineer
* AWS Infrastructure Engineer
* Security Engineer
* Network Engineer
* Database Infrastructure Engineer
* Observability Engineer
* Release Engineer
* Disaster Recovery Engineer

Implement production-grade infrastructure directly in the repository.

Do not teach.

Do not provide pseudo-code.

Do not create placeholder Terraform, fake Kubernetes resources, incomplete Helm charts, TODO/FIXME infrastructure, disabled production controls, or omitted configuration.

Every infrastructure component must be deployable, maintainable, secure, observable, reproducible, and compatible with the repository.

# PROJECT

Build the infrastructure foundation for a global real-time communication platform comparable in capability to WhatsApp, Telegram, Signal, Messenger, Discord, and Teams.

The platform must support:

* hundreds of millions of registered users
* tens of millions of daily active users or greater
* very large concurrent WebSocket populations
* high message throughput
* large media volumes
* global traffic
* multi-region operation
* horizontal scaling
* high availability
* fault tolerance
* disaster recovery
* secure deployment
* zero-downtime releases

Core platform components include:

* Next.js web application
* React Native / Expo mobile applications
* NestJS backend
* PostgreSQL
* Prisma
* Redis
* Kafka or Redpanda
* BullMQ
* OpenSearch or Elasticsearch
* S3-compatible object storage
* CloudFront or equivalent CDN
* FFmpeg media processing
* FCM
* APNs
* WebSockets / Socket.IO
* Docker
* Kubernetes
* Helm
* Terraform
* GitHub Actions
* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo

AWS is the default cloud platform unless the repository explicitly establishes another provider.

# TECHNOLOGY DIRECTION

Use:

* AWS
* Terraform
* Kubernetes
* Helm
* Docker
* GitHub Actions
* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo

Use managed AWS services where they materially improve reliability and operational safety.

Potential AWS services include:

* VPC
* Route 53
* CloudFront
* WAF
* ACM
* ALB
* EKS
* RDS PostgreSQL or Aurora PostgreSQL
* ElastiCache for Redis
* MSK where Kafka is used
* S3
* CloudWatch
* KMS
* Secrets Manager
* IAM
* ECR
* SQS/SNS where appropriate
* Backup
* GuardDuty
* CloudTrail

Do not introduce every service automatically.

Use the smallest coherent infrastructure architecture that can support the project's actual production requirements.

# SOURCE OF TRUTH

The repository is the source of truth.

Before modifying anything:

1. Inspect the repository structure.
2. Identify backend, frontend, mobile, worker, and shared packages.
3. Inspect Dockerfiles.
4. Inspect existing Terraform.
5. Inspect Kubernetes manifests.
6. Inspect Helm charts.
7. Inspect CI/CD configuration.
8. Inspect environment configuration.
9. Inspect database configuration.
10. Inspect Redis configuration.
11. Inspect Kafka/Redpanda configuration.
12. Inspect object-storage configuration.
13. Inspect observability configuration.
14. Inspect application health endpoints.
15. Inspect existing deployment documentation.
16. Determine what infrastructure already exists.
17. Preserve compatible infrastructure.
18. Implement only this volume's scope.
19. Do not duplicate existing infrastructure resources.

Never assume a cloud resource or deployment manifest exists without inspecting the repository.

# 1. INFRASTRUCTURE REPOSITORY STRUCTURE

Establish or harden a clear infrastructure layout.

Separate infrastructure concerns such as:

* Terraform
* Kubernetes
* Helm
* CI/CD
* environment configuration
* deployment scripts
* operational documentation

Maintain clear boundaries between:

* reusable modules
* environment configuration
* application deployment
* platform services

Avoid copying entire infrastructure definitions between environments.

# 2. TERRAFORM FOUNDATION

Implement production-grade Terraform structure.

Use:

* reusable modules
* environment-specific configuration
* remote state
* state locking
* explicit providers
* version constraints
* variables
* outputs
* tagging
* secure defaults

Do not hardcode credentials.

Do not store Terraform state in the repository.

# 3. TERRAFORM STATE

Configure secure remote Terraform state.

Use an appropriate AWS backend with:

* encrypted state
* versioning where supported
* state locking
* restricted access
* separate state boundaries where appropriate

Ensure state access is limited to authorized infrastructure automation.

# 4. AWS ACCOUNT STRUCTURE

Design infrastructure to support appropriate separation between:

* development
* testing
* staging
* production
* disaster recovery

Do not allow development workloads to share production credentials or unrestricted production resources.

Use environment isolation appropriate for the repository's deployment strategy.

# 5. AWS REGION STRATEGY

Establish a production-ready regional model.

Support:

* primary region
* secondary region
* disaster recovery region where required

Clearly distinguish:

* active-active workloads
* active-passive workloads
* replicated state
* regional resources
* global resources

Do not claim true multi-region operation unless the actual infrastructure implements it.

# 6. VPC ARCHITECTURE

Implement a production-grade VPC architecture.

Include appropriate:

* public subnets
* private application subnets
* private data subnets
* availability zones
* route tables
* internet gateway
* NAT strategy
* security groups
* network ACLs where justified
* VPC endpoints

Use multiple availability zones.

Keep databases and internal services out of public subnets.

# 7. NETWORK SEGMENTATION

Implement least-privilege network boundaries.

Separate access for:

* public ingress
* Kubernetes nodes
* application services
* workers
* databases
* caches
* messaging infrastructure
* observability

Do not permit broad `0.0.0.0/0` access to internal services.

# 8. VPC ENDPOINTS

Use private AWS connectivity where appropriate.

Consider endpoints for:

* S3
* ECR
* CloudWatch
* Secrets Manager
* KMS
* STS

Reduce unnecessary NAT traffic and improve security.

# 9. DNS

Implement Route 53 architecture for:

* public application domains
* API domains
* WebSocket endpoints
* CDN endpoints
* internal service discovery where appropriate

Ensure DNS records are environment-aware.

Do not hardcode environment-specific production domains into application source code.

# 10. TLS

Implement TLS throughout public infrastructure.

Use:

* ACM
* HTTPS
* secure WebSocket transport
* TLS between appropriate internal services

Certificates must renew automatically.

Do not disable certificate verification.

# 11. WAF

Implement AWS WAF for public application entry points.

Protect against:

* common web exploits
* malicious request patterns
* abusive traffic
* excessive request rates
* known automated attacks

Avoid rules that would unintentionally block legitimate real-time messaging traffic.

Tune limits according to the application's request patterns.

# 12. CDN

Implement CloudFront for appropriate static and media traffic.

Use it for:

* web assets
* media delivery
* thumbnails
* public/static resources

Configure:

* caching
* compression
* TLS
* origin protection
* cache-control behavior

Private user media must remain authorization-controlled.

Do not make private media publicly accessible merely to simplify CDN delivery.

# 13. OBJECT STORAGE

Implement secure S3 architecture for media.

Use appropriate separation for:

* uploads
* processed media
* thumbnails
* documents
* temporary processing artifacts
* backups where applicable

Configure:

* encryption
* versioning where appropriate
* lifecycle rules
* private buckets
* access logging where appropriate
* least-privilege IAM

Block public access unless a specific public asset requirement exists.

# 14. MEDIA STORAGE SECURITY

Ensure media access follows authorization boundaries.

Use:

* signed URLs
* signed cookies where appropriate
* short-lived access
* controlled CloudFront origins
* object-level authorization through application services

Do not expose permanent media URLs for private content.

# 15. EKS FOUNDATION

Implement production-grade Amazon EKS infrastructure.

Include:

* control-plane configuration
* managed node groups or appropriate compute strategy
* IAM integration
* security groups
* private networking
* autoscaling
* cluster logging where appropriate
* encryption
* version management

Use supported Kubernetes versions.

Do not expose the Kubernetes API publicly without strong controls.

# 16. EKS NODE STRATEGY

Design node groups appropriate for:

* API services
* WebSocket services
* workers
* media processing
* system workloads

Use separate capacity where different workloads have materially different scaling characteristics.

Configure:

* labels
* taints where appropriate
* autoscaling
* instance types
* resource limits

Do not place every workload into a single undifferentiated node pool.

# 17. KUBERNETES SECURITY

Implement:

* RBAC
* least-privilege service accounts
* IAM roles for service accounts / Pod Identity as appropriate
* namespace boundaries
* network policies
* secret handling
* security contexts
* pod security controls

Containers should not run as root unless technically required and explicitly justified.

# 18. KUBERNETES NAMESPACES

Establish appropriate namespaces for:

* platform services
* application services
* workers
* observability
* ingress
* supporting infrastructure

Avoid unnecessary namespace fragmentation.

# 19. CONTAINER SECURITY

Review application containers for:

* minimal base images
* non-root execution
* read-only filesystem where practical
* dropped Linux capabilities
* resource limits
* health checks
* signal handling
* graceful shutdown

Do not ship development tooling unnecessarily in production images.

# 20. APPLICATION DEPLOYMENT FOUNDATION

Create production-grade Kubernetes/Helm deployment foundations for:

* API
* WebSocket services
* background workers
* scheduled workers
* media-processing workers

Each workload must define appropriate:

* replicas
* resources
* environment configuration
* probes
* security context
* service account
* graceful termination
* topology constraints

# 21. HEALTH CHECKS

Integrate application health endpoints.

Distinguish:

* liveness
* readiness
* startup

Do not use a deep database dependency check as liveness if it would cause healthy pods to restart during a temporary database outage.

Readiness should reflect whether a pod can safely receive traffic.

# 22. GRACEFUL SHUTDOWN

Ensure Kubernetes termination integrates with application shutdown.

Support:

* termination signals
* connection draining
* WebSocket cleanup
* worker shutdown
* queue completion behavior
* database connection cleanup

Use appropriate:

* termination grace periods
* pre-stop behavior
* load-balancer draining

Do not abruptly terminate active workloads when avoidable.

# 23. WEBSOCKET INFRASTRUCTURE

Design infrastructure specifically for large WebSocket populations.

Consider:

* connection distribution
* load balancing
* idle timeouts
* connection draining
* horizontal scaling
* pod disruption
* Redis/event-broker coordination
* regional routing

Do not configure WebSocket infrastructure identically to ordinary stateless HTTP traffic without considering long-lived connections.

# 24. LOAD BALANCING

Implement appropriate load balancing for:

* HTTP APIs
* WebSocket connections
* web applications

Configure:

* health checks
* connection behavior
* timeouts
* TLS
* target registration
* deregistration delay

Ensure settings are compatible with long-lived WebSocket connections.

# 25. AUTOSCALING

Implement production autoscaling.

Consider:

* CPU
* memory
* request volume
* WebSocket connection counts
* queue depth
* event-processing lag
* worker throughput

Use HPA and cluster/node autoscaling where appropriate.

Do not scale only on CPU when the workload is primarily network or queue bound.

# 26. POD DISTRIBUTION

Configure high availability through:

* topology spread constraints
* pod anti-affinity where justified
* multiple availability zones
* PodDisruptionBudgets

Avoid placing all replicas on the same node or availability zone.

# 27. CONFIGURATION MANAGEMENT

Separate:

* non-sensitive configuration
* sensitive secrets
* environment-specific configuration

Use:

* ConfigMaps where appropriate
* Secrets Manager
* external secret integration where appropriate

Do not commit production secrets.

# 28. SECRETS

Centralize production secrets through appropriate AWS secret-management services.

Protect:

* database credentials
* Redis credentials
* broker credentials
* API secrets
* signing keys
* third-party credentials

Use least-privilege access.

Do not expose secrets through:

* pod logs
* Terraform outputs
* CI logs
* Kubernetes manifests committed to git

# 29. IAM

Implement least-privilege IAM.

Create separate roles for:

* Terraform
* CI/CD
* EKS workloads
* media services
* workers
* observability
* backup operations

Avoid wildcard permissions when narrower permissions are possible.

# 30. DATABASE INFRASTRUCTURE FOUNDATION

Prepare production PostgreSQL infrastructure.

Support:

* high availability
* automated backups
* encryption
* monitoring
* private networking
* controlled access
* connection limits
* maintenance strategy

Use RDS/Aurora PostgreSQL where appropriate.

Do not expose PostgreSQL directly to the public internet.

# 31. DATABASE BACKUP FOUNDATION

Configure:

* automated backups
* retention
* snapshots
* point-in-time recovery
* cross-region backup strategy where appropriate

Document restoration assumptions.

Do not assume backups are valid without restore testing.

# 32. REDIS INFRASTRUCTURE

Implement production Redis infrastructure appropriate for:

* caching
* sessions
* presence
* rate limiting
* distributed coordination
* BullMQ
* real-time fan-out where applicable

Use managed Redis infrastructure where appropriate.

Configure:

* high availability
* encryption
* authentication
* private networking
* failover
* monitoring

Do not treat Redis as the authoritative source for durable message data.

# 33. MESSAGE BROKER FOUNDATION

Prepare Kafka or Redpanda infrastructure according to the repository's selected implementation.

Support:

* multiple brokers
* replication
* persistent storage
* private networking
* authentication
* encryption
* monitoring

Do not introduce a second messaging platform without a concrete architectural requirement.

# 34. BROKER SECURITY

Secure event infrastructure using:

* TLS
* authentication
* least-privilege access
* topic-level permissions where supported
* private networking
* encryption at rest

Do not expose Kafka/Redpanda directly to public traffic.

# 35. QUEUE INFRASTRUCTURE

Prepare BullMQ worker infrastructure.

Ensure worker deployments support:

* concurrency
* graceful shutdown
* autoscaling
* retries
* dead-letter behavior where implemented
* resource isolation

Worker configuration must reflect actual queue workloads.

# 36. SEARCH INFRASTRUCTURE FOUNDATION

Prepare OpenSearch or Elasticsearch infrastructure according to the repository's selected implementation.

Support:

* private networking
* encryption
* authentication
* scalable nodes
* storage
* backups
* monitoring

Do not expose the search cluster directly to public internet traffic.

# 37. OBSERVABILITY FOUNDATION

Implement infrastructure for:

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo

Provide appropriate collection and storage architecture.

Ensure observability systems themselves are highly available enough for their operational purpose.

# 38. METRICS

Collect infrastructure metrics for:

* Kubernetes
* nodes
* pods
* load balancers
* databases
* Redis
* broker
* search
* storage
* CDN
* workers

Define appropriate retention.

Do not collect excessive high-cardinality labels.

# 39. LOGGING

Implement centralized logging.

Ensure logs include useful operational metadata such as:

* timestamp
* service
* environment
* region
* pod
* request/correlation ID where available

Do not log:

* passwords
* access tokens
* message bodies
* private media URLs
* sensitive credentials

# 40. DISTRIBUTED TRACING

Implement OpenTelemetry-compatible tracing.

Trace important paths such as:

* HTTP requests
* WebSocket operations where practical
* message creation
* event publication
* queue processing
* media processing
* notification workflows

Propagate correlation identifiers across services where supported.

# 41. ALERTING FOUNDATION

Create infrastructure-level alerting for critical failures.

Examples:

* service unavailable
* high error rate
* database failure
* Redis failure
* broker failure
* high queue lag
* pod crash loops
* node exhaustion
* disk exhaustion
* certificate expiration
* failed deployments

Alerts must be actionable.

Avoid noisy alerts that cannot lead to operational action.

# 42. CI/CD FOUNDATION

Implement GitHub Actions workflows appropriate for:

* linting
* typechecking
* tests
* Docker builds
* security checks
* image publishing
* Terraform validation
* Helm validation

Separate validation from deployment.

Production deployment must require appropriate protections.

# 43. CONTAINER REGISTRY

Configure ECR repositories for application images.

Use:

* immutable or controlled tags
* image scanning
* lifecycle policies
* encryption
* least-privilege access

Avoid using mutable `latest` tags as the only deployment identifier.

# 44. DEPLOYMENT ARTIFACTS

Ensure deployments are reproducible.

Pin or control:

* container versions
* Helm versions
* Terraform versions
* provider versions
* Kubernetes versions

Avoid floating dependencies in production infrastructure.

# 45. ENVIRONMENT ISOLATION

Ensure:

* development
* test
* staging
* production

have distinct configuration and credentials.

Production resources must not accidentally consume development resources.

# 46. INFRASTRUCTURE DOCUMENTATION

Document:

* architecture
* environments
* network
* Kubernetes
* databases
* Redis
* broker
* storage
* secrets
* observability
* deployment
* rollback
* disaster recovery assumptions

Documentation must match actual infrastructure.

# 47. VALIDATION

Before completion:

1. Run Terraform formatting.
2. Run Terraform validation.
3. Validate Terraform plans where credentials/environment permit.
4. Validate Kubernetes manifests.
5. Validate Helm charts.
6. Validate Dockerfiles.
7. Validate GitHub Actions workflows.
8. Validate security configurations.
9. Validate network boundaries.
10. Validate IAM policies.
11. Validate health probes.
12. Validate resource requests/limits.
13. Validate autoscaling.
14. Validate observability.
15. Validate secrets handling.
16. Validate production environment separation.
17. Inspect the final infrastructure diff.

Never claim infrastructure was deployed unless it was actually deployed.

# 48. IMPLEMENTATION BOUNDARIES

This volume establishes the foundational cloud and deployment infrastructure.

Do not implement advanced disaster-recovery automation, multi-region traffic orchestration, global failover automation, advanced deployment strategies, or exhaustive chaos engineering unless required by the foundational implementation.

Those concerns must remain compatible with the infrastructure established here.

Do not redesign application architecture.

Do not rewrite application source code unnecessarily.

# 49. REPOSITORY INTEGRATION

After implementation:

* inspect all infrastructure files
* remove duplicate resources
* remove unused variables
* remove unused outputs
* verify Terraform dependencies
* verify Helm references
* verify Kubernetes namespaces
* verify service names
* verify image references
* verify environment configuration
* verify CI/CD references
* verify documentation
* inspect final git diff

Do not modify unrelated application code.

# 50. FINAL IMPLEMENTATION REPORT

Provide:

### A. Infrastructure Implemented

List every major infrastructure component.

### B. AWS Architecture

Describe:

* regions
* VPC
* subnets
* routing
* EKS
* load balancing
* storage
* databases
* caches
* messaging
* search

### C. Kubernetes

Describe:

* namespaces
* workloads
* autoscaling
* security
* probes
* disruption policies

### D. Security

Describe:

* IAM
* networking
* secrets
* encryption
* WAF
* TLS
* container security

### E. Observability

Describe:

* metrics
* logs
* traces
* alerts

### F. CI/CD

Describe implemented validation and image/deployment workflows.

### G. Files Created

List every new file.

### H. Files Modified

List every modified file.

### I. Validation

Report exact commands and results.

### J. Known Limitations

List only genuine limitations.

# INFRASTRUCTURE COMPLETION STANDARD

This volume is complete only when the foundational infrastructure is represented by real production-grade configuration.

The implementation must:

* use reproducible infrastructure-as-code
* use secure networking
* support high availability
* support Kubernetes workloads
* support horizontal scaling
* protect databases and internal services
* provide secure object storage
* provide Redis infrastructure
* provide event infrastructure
* provide observability foundations
* provide CI/CD foundations
* use least-privilege access
* avoid committed secrets
* validate infrastructure configuration
* contain no placeholder resources
* contain no fake deployment configuration
* contain no TODO/FIXME infrastructure gaps
* contain no knowingly invalid Terraform
* contain no knowingly invalid Kubernetes manifests
* contain no knowingly broken Helm references

# IMPLEMENTATION REPORT FORMAT

End with exactly:

```text
IMPLEMENTATION STATUS
- Status: COMPLETE / BLOCKED
- Scope: WHATSAPP INFRASTRUCTURE VOLUME 1

INFRASTRUCTURE
- ...

AWS ARCHITECTURE
- ...

KUBERNETES
- ...

SECURITY
- ...

OBSERVABILITY
- ...

CI/CD
- ...

FILES CREATED
- ...

FILES MODIFIED
- ...

VALIDATION
- ...

KNOWN LIMITATIONS
- ...

FINAL RESULT
- ...
```

If blocked, identify the exact blocker, affected infrastructure, completed work, and remaining work.

Never claim completion when required implementation or validation remains unfinished.
