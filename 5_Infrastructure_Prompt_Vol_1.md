# INFRASTRUCTURE IMPLEMENTATION PROMPT — VOLUME 1

## Production Cloud Foundation, Networking, Data, Messaging, Storage, and Deployment

You are the senior infrastructure, cloud, DevOps, security, and platform engineering team responsible for deploying a production-grade real-time communication platform.

This is an implementation task against the existing repository.

Do not provide a tutorial, pseudo-code, conceptual-only architecture, placeholder Terraform, fake infrastructure, TODO list, or incomplete deployment scaffold.

Inspect the actual repository first and implement the infrastructure directly.

The final system must be deployable, reproducible, secure, observable, scalable, and maintainable.

---

# 1. PRODUCT CONTEXT

The repository contains a production-grade real-time communication platform with:

* web application
* mobile application
* backend APIs
* WebSocket/Socket.IO real-time communication
* PostgreSQL
* Prisma
* Redis
* Kafka or Redpanda
* BullMQ
* object storage
* CDN
* media processing
* search
* push notifications
* WebRTC-based calling where supported

The infrastructure must support the complete application as one coherent distributed system.

The expected technology ecosystem includes:

* Node.js
* NestJS
* TypeScript
* PostgreSQL
* Prisma
* Redis
* Kafka/Redpanda
* BullMQ
* AWS S3
* CloudFront
* Elasticsearch/OpenSearch where actually used
* Docker
* Kubernetes or an equivalent production orchestration platform
* CI/CD
* OpenTelemetry-compatible observability
* Prometheus
* Grafana
* centralized logs
* distributed tracing

Inspect the repository and use the technologies actually present.

Do not introduce infrastructure that conflicts with the existing implementation.

---

# 2. REPOSITORY-FIRST REQUIREMENT

Before modifying anything, inspect:

* repository structure
* backend applications
* frontend applications
* mobile configuration
* package.json files
* Dockerfiles
* docker-compose files
* Kubernetes manifests
* Helm charts
* Terraform/OpenTofu/Pulumi configuration
* CI/CD workflows
* environment files
* Prisma configuration
* database migrations
* Redis configuration
* Kafka/Redpanda configuration
* BullMQ workers
* S3/media configuration
* CloudFront configuration
* search configuration
* WebSocket configuration
* notification configuration
* WebRTC configuration
* observability configuration
* existing deployment documentation

Determine what already exists.

Reuse compatible infrastructure.

Do not create duplicate deployment systems.

Do not replace a working infrastructure stack without a compelling technical reason.

The actual repository is the source of truth.

---

# 3. PRIMARY OBJECTIVE

Implement the production infrastructure foundation for:

1. local development
2. automated testing
3. staging
4. production
5. secure networking
6. PostgreSQL
7. Redis
8. Kafka/Redpanda
9. BullMQ workers
10. S3
11. CloudFront
12. search
13. backend deployment
14. WebSocket scaling
15. media processing
16. secrets/configuration
17. observability foundation
18. backups
19. disaster recovery foundations
20. CI/CD integration
21. horizontal scaling
22. graceful deployments

---

# 4. ENVIRONMENT STRATEGY

Define clear environment boundaries.

At minimum support:

```text
local
test
staging
production
```

Each environment must have:

* separate configuration
* separate secrets
* separate databases or logically isolated database resources
* separate Redis resources where required
* separate Kafka/Redpanda resources where required
* separate S3 namespaces/buckets where appropriate
* separate search indexes/resources
* environment-specific domains
* environment-specific observability

Production credentials must never be reused in development.

Do not commit secrets.

---

# 5. INFRASTRUCTURE AS CODE

Use the infrastructure-as-code technology already present in the repository.

If none exists, choose an appropriate production-capable approach, preferably:

* Terraform/OpenTofu

Organize infrastructure into reusable modules/components.

Avoid a single enormous infrastructure file.

Infrastructure should clearly separate:

* networking
* compute
* databases
* cache
* messaging
* storage
* CDN
* search
* security
* observability
* secrets
* IAM
* environments

Do not duplicate environment configuration unnecessarily.

---

# 6. CLOUD PROVIDER

Use the cloud provider established by the repository.

If AWS is already selected, implement AWS infrastructure using appropriate managed services.

Potential AWS components include:

* VPC
* public/private subnets
* NAT
* security groups
* IAM
* EKS/ECS
* RDS PostgreSQL
* ElastiCache Redis
* MSK or managed Kafka-compatible infrastructure
* S3
* CloudFront
* OpenSearch
* CloudWatch
* Secrets Manager
* KMS
* Route 53
* ACM
* ECR
* WAF

Do not deploy every service automatically.

Only provision services actually required by the application.

---

# 7. NETWORK ARCHITECTURE

Implement a secure production network.

Use:

* VPC
* multiple availability zones
* private subnets
* public subnets only where necessary
* route tables
* security groups
* controlled ingress
* controlled egress

Databases and internal services must not be directly exposed to the public Internet.

Public access should generally terminate at:

* load balancer
* API gateway
* CDN
* ingress controller

depending on the actual architecture.

---

# 8. AVAILABILITY ZONES

Production stateful infrastructure must support high availability where the selected managed service provides it.

Prefer:

* multi-AZ PostgreSQL
* highly available Redis where required
* replicated Kafka/Redpanda
* multi-AZ application workloads
* redundant ingress/load balancing

Avoid single points of failure.

Document any deliberate single-AZ component and explain why it is acceptable.

---

# 9. DOMAIN AND TLS

Configure production domains using the repository's actual domain configuration.

Use:

* managed DNS
* TLS certificates
* HTTPS
* secure WebSocket connections

WebSocket traffic must use secure transport in production.

Ensure:

* HTTP → HTTPS redirect where applicable
* certificate renewal
* correct certificate attachment
* correct DNS records
* correct CORS configuration
* secure cookie configuration where cookies are used

Do not disable TLS verification.

---

# 10. CONTAINERIZATION

Review and harden Dockerfiles.

Production containers should:

* use appropriate minimal base images
* run as non-root where possible
* use multi-stage builds
* contain only required runtime dependencies
* avoid development tooling in production images
* pin or appropriately constrain dependency versions
* expose only required ports
* use health checks where appropriate
* handle SIGTERM correctly
* terminate gracefully

Do not bake secrets into images.

---

# 11. BACKEND CONTAINER

The backend container must support:

* REST API
* WebSocket/Socket.IO
* health endpoints
* graceful shutdown
* environment configuration
* database connectivity
* Redis connectivity
* Kafka/Redpanda connectivity
* worker integration where appropriate

Do not run unrelated workloads in the same process merely for convenience.

If workers are separate applications in the repository, deploy them separately.

---

# 12. WEB APPLICATION

Deploy the web application according to its actual framework and repository configuration.

Support:

* production build
* runtime configuration
* secure environment variables
* health checks
* horizontal scaling where appropriate
* CDN integration where appropriate

Never expose server-only secrets to browser bundles.

---

# 13. WORKER DEPLOYMENT

Deploy BullMQ workers independently where the repository architecture separates them.

Workers must support:

* concurrency
* graceful shutdown
* retries
* backoff
* timeout
* dead-letter handling
* metrics
* health monitoring

Do not run high-volume workers inside API containers if that conflicts with the repository's architecture.

Worker scaling must account for:

* CPU
* memory
* queue depth
* processing latency
* downstream rate limits

---

# 14. KUBERNETES

If Kubernetes is the repository's orchestration platform, implement production-ready manifests or Helm configuration.

Support:

* namespaces
* deployments
* services
* ingress
* config maps
* secrets integration
* service accounts
* pod security
* resource requests
* resource limits
* readiness probes
* liveness probes
* startup probes where necessary
* horizontal scaling
* disruption budgets
* rolling deployments
* graceful termination

Do not deploy everything with default Kubernetes settings.

---

# 15. POD RESOURCE MANAGEMENT

Every production workload must have appropriate:

* CPU requests
* CPU limits where appropriate
* memory requests
* memory limits

Avoid arbitrary values.

Use repository/application characteristics to choose sensible initial resources.

Document tunable values.

Prevent one workload from consuming all cluster resources.

---

# 16. HEALTH CHECKS

Implement health endpoints and infrastructure probes.

Separate:

### Liveness

Answers:

> Is the process alive?

### Readiness

Answers:

> Can this instance safely receive traffic?

### Startup

Where required:

> Has this process completed initialization?

Readiness should account for critical dependencies without creating cascading failures.

Do not make every external dependency a mandatory liveness dependency.

---

# 17. GRACEFUL SHUTDOWN

Infrastructure must allow graceful termination.

The application must:

1. stop accepting new work
2. stop new connections where appropriate
3. drain HTTP/WebSocket connections where supported
4. stop consuming new queue jobs
5. finish safe in-flight work
6. close Kafka/Redpanda consumers
7. close Redis connections
8. close database connections
9. release resources
10. exit cleanly

Configure appropriate termination grace periods.

---

# 18. POSTGRESQL

Provision production PostgreSQL using the selected architecture.

Support:

* high availability where appropriate
* automated backups
* point-in-time recovery where supported
* encryption at rest
* encryption in transit
* controlled network access
* monitoring
* connection management
* maintenance strategy

The application database remains the authoritative transactional data store.

Do not replace PostgreSQL with Redis or search.

---

# 19. DATABASE CONNECTION MANAGEMENT

Configure application database access for production.

Account for:

* connection limits
* horizontal scaling
* connection pooling
* worker connections
* migrations
* long-running operations
* timeouts

Do not allow uncontrolled connection growth when scaling replicas.

If a connection pooler is appropriate, integrate it safely.

---

# 20. DATABASE MIGRATIONS

Production migrations must be explicit and safe.

Use the repository's Prisma migration system.

Deployment must distinguish:

* schema migration
* application deployment

Migrations must:

* be version controlled
* run deterministically
* avoid destructive changes without safe migration planning
* preserve backward compatibility during rolling deployments where necessary

Do not use destructive database resets in staging/production deployment workflows.

---

# 21. DATABASE BACKUPS

Implement automated backups.

Define:

* backup frequency
* retention
* encryption
* recovery procedure
* restore testing
* RPO
* RTO

Backups are not considered valid merely because they exist.

Provide a practical restore verification strategy.

---

# 22. REDIS

Provision Redis for the roles actually used by the application.

Redis may support:

* caching
* presence
* typing indicators
* rate limiting
* distributed coordination
* Socket.IO scaling
* BullMQ
* ephemeral state

Do not treat Redis as the authoritative permanent database for durable messages.

Configure:

* authentication
* TLS where supported
* network restrictions
* memory policies
* monitoring
* high availability where appropriate

---

# 23. REDIS KEY SAFETY

Infrastructure must preserve clear Redis namespace isolation.

Separate logical workloads where appropriate.

For example:

```text
cache:*
presence:*
typing:*
rate-limit:*
socket:*
bullmq:*
sync:*
```

Use the actual repository key conventions.

Do not invent duplicate namespaces if the application already defines them.

---

# 24. KAFKA / REDPANDA

Provision the event streaming platform used by the repository.

Support:

* brokers
* replication
* authentication
* encryption
* topic management
* partitions
* retention
* consumer groups
* monitoring

Topics must correspond to actual application event contracts.

Do not create arbitrary topics merely for infrastructure completeness.

---

# 25. EVENT RETENTION

Configure retention according to actual system requirements.

Account for:

* replay
* debugging
* synchronization
* consumer recovery
* storage cost
* privacy
* regulatory requirements where applicable

Do not retain sensitive data indefinitely without justification.

---

# 26. KAFKA SECURITY

Production Kafka/Redpanda must use appropriate:

* authentication
* authorization
* TLS
* restricted network access

Applications should have only the permissions they require.

Do not give every workload administrator access.

---

# 27. BULLMQ

Ensure infrastructure correctly supports BullMQ.

Queues must have:

* Redis connectivity
* appropriate persistence behavior
* monitoring
* failure handling
* worker scaling
* graceful shutdown

Infrastructure must not accidentally evict queue state needed for reliable processing.

---

# 28. OBJECT STORAGE

Provision secure S3 storage for media.

Separate media environments appropriately.

Support:

* encryption
* private buckets
* lifecycle rules
* versioning where appropriate
* access logging where useful
* CORS only where required
* restricted IAM permissions

Do not make private media buckets publicly readable.

---

# 29. S3 ACCESS

Application workloads should use IAM roles or equivalent workload identities.

Do not embed long-lived AWS access keys in:

* source code
* Docker images
* environment files committed to Git
* mobile applications
* frontend bundles

Use temporary credentials or workload identity where supported.

---

# 30. MEDIA LIFECYCLE

Configure lifecycle policies appropriate to the media architecture.

Consider:

* incomplete multipart uploads
* abandoned uploads
* temporary processing files
* deleted media
* old variants
* backups
* retention requirements

Do not automatically delete objects that may still be referenced by authoritative application records.

---

# 31. CLOUDFRONT / CDN

If CloudFront is part of the repository architecture, configure it for secure media delivery.

Support:

* HTTPS
* private origin
* signed URLs/cookies where required
* cache policies
* origin access controls
* appropriate cache invalidation
* compression where useful

Do not make private user media globally public merely to simplify CDN delivery.

---

# 32. MEDIA PROCESSING INFRASTRUCTURE

Provision infrastructure required for media processing.

Workers must be able to process:

* images
* videos
* audio
* thumbnails
* transcoding
* metadata

where supported.

Processing workloads should be isolated from latency-sensitive API workloads when practical.

Configure:

* queueing
* retries
* concurrency
* resource limits
* temporary storage
* cleanup
* failure handling

---

# 33. SEARCH INFRASTRUCTURE

If Elasticsearch/OpenSearch is used by the actual repository, provision it appropriately.

Support:

* authentication
* TLS
* private networking
* index lifecycle
* monitoring
* capacity management
* backups where supported
* versioned indexes

Search must not become the authoritative source for messages.

---

# 34. SEARCH PRIVACY

Infrastructure must prevent unauthorized access to search infrastructure.

Search indexes containing private user data must not be publicly accessible.

Use:

* private networking
* IAM/authentication
* encryption
* application-level authorization
* appropriate retention

---

# 35. SECRETS MANAGEMENT

Use a managed secrets system where supported.

Potential AWS service:

* Secrets Manager

Secrets may include:

* database credentials
* Redis credentials
* Kafka credentials
* provider credentials
* notification credentials
* TURN credentials
* encryption material

Never commit secrets.

Never print secrets in CI logs.

Never expose server secrets to mobile or browser clients.

---

# 36. CONFIGURATION MANAGEMENT

Separate:

### Configuration

Non-sensitive values such as:

* URLs
* feature flags
* timeouts
* queue names
* environment identifiers

from:

### Secrets

Such as:

* passwords
* API keys
* private keys
* credentials
* signing secrets

Use the repository's existing configuration conventions.

---

# 37. IAM

Implement least-privilege IAM.

Create separate roles for:

* API
* workers
* media processors
* deployment
* CI/CD
* observability

Do not use one administrator role for the entire application.

Examples:

API may need:

* S3 access to specific buckets
* secrets access to specific secrets
* metrics/log permissions

Media worker may need:

* S3 read/write to media paths
* queue access
* required secrets

CI/CD should have deployment permissions without unnecessary production administration privileges.

---

# 38. CONTAINER REGISTRY

If containerized deployment is used, provision/configure the appropriate container registry.

For AWS:

* ECR

Support:

* image repositories
* immutable tags where practical
* vulnerability scanning
* lifecycle policies
* controlled access

Avoid relying solely on mutable `latest` tags for production deployments.

---

# 39. CI/CD FOUNDATION

Implement production CI/CD using the repository's existing CI provider.

The pipeline should support:

```text
commit
→ validation
→ tests
→ build
→ security checks
→ container build
→ image scan
→ publish
→ deploy staging
→ validation
→ production deployment
```

Production deployment must not occur merely because code compiled.

---

# 40. CI SECURITY

CI must protect:

* cloud credentials
* deployment credentials
* signing keys
* provider secrets

Prefer:

* OIDC
* short-lived credentials
* workload identity

over long-lived static cloud credentials.

Do not print environment variables indiscriminately.

---

# 41. DEPLOYMENT STRATEGY

Use safe deployment behavior.

Support:

* rolling deployment
* readiness checks
* graceful termination
* rollback
* migration compatibility

Avoid downtime where the architecture permits it.

Real-time WebSocket deployments must account for:

* active connections
* reconnect behavior
* session validity
* event replay
* synchronization after disconnect

---

# 42. WEBSOCKET SCALING

Infrastructure must support multiple backend instances.

Ensure:

* shared connection state where required
* Redis adapter/pubsub if used by the repository
* load balancing
* sticky sessions only if actually required
* correct upgrade handling
* connection draining
* reconnect behavior

Do not assume a single API instance.

---

# 43. LOAD BALANCING

Configure load balancing for:

* HTTP
* HTTPS
* WebSocket upgrades

Support:

* health checks
* connection timeouts
* idle timeouts
* appropriate forwarding headers
* TLS termination
* security policies

Timeouts must be compatible with real-time communication behavior.

---

# 44. AUTOSCALING

Configure autoscaling where appropriate.

Scale based on meaningful signals such as:

* CPU
* memory
* request rate
* latency
* WebSocket connection count
* queue depth
* processing latency

Workers may require queue-based scaling rather than HTTP metrics.

Do not blindly scale stateful systems horizontally.

---

# 45. RATE-LIMITING INFRASTRUCTURE

Ensure the infrastructure supports application-level rate limiting.

Protect:

* authentication
* messaging
* media uploads
* search
* WebSocket connections
* calls
* notification registration
* administrative operations

Use distributed Redis-backed mechanisms where required.

Infrastructure should also protect public endpoints against volumetric abuse where appropriate.

---

# 46. WAF AND EDGE PROTECTION

If supported by the selected cloud architecture, configure edge protection for public endpoints.

Potential protections include:

* malicious request filtering
* IP-based controls
* rate limits
* bot protection
* common exploit protection

Do not rely on WAF alone for application authorization.

---

# 47. OBSERVABILITY FOUNDATION

Implement production observability.

Support:

### Metrics

* Prometheus-compatible metrics where appropriate
* application metrics
* infrastructure metrics
* queue metrics
* database metrics
* Redis metrics
* Kafka metrics

### Logs

Centralized structured logs.

### Traces

OpenTelemetry-compatible distributed tracing.

### Dashboards

Grafana or the repository's selected platform.

---

# 48. LOGGING

Logs must be:

* structured
* searchable
* timestamped
* correlated
* environment-aware

Include useful fields such as:

* service
* environment
* request ID
* correlation ID
* trace ID
* severity
* operation
* duration

Never log:

* passwords
* access tokens
* refresh tokens
* secrets
* private keys
* unnecessary message content
* signed media URLs

---

# 49. ALERTING

Configure alerts for meaningful failures.

Examples:

* API error-rate increase
* high latency
* unhealthy pods
* database availability problems
* Redis failure
* Kafka consumer lag
* queue backlog
* worker failures
* storage failures
* certificate expiration
* insufficient disk
* high memory
* crash loops

Avoid alerting on every minor transient event.

---

# 50. DISASTER RECOVERY

Define infrastructure-level recovery procedures.

Document:

* database restoration
* infrastructure recreation
* secrets recovery
* object storage recovery
* Kafka recovery
* Redis recovery
* search reconstruction
* application redeployment

Differentiate:

### Authoritative data

* PostgreSQL
* durable media objects where applicable

from:

### Reconstructable data

* Redis cache
* search indexes
* derived analytics
* some event projections

Do not waste recovery effort treating every cache as authoritative.

---

# 51. RPO / RTO

Define reasonable initial targets for:

* PostgreSQL
* media storage
* event streaming
* search
* application services

The targets must be consistent with the product architecture and available cloud services.

Document tradeoffs.

---

# 52. SECURITY BASELINE

Harden production infrastructure against:

* public database exposure
* public Redis exposure
* unauthorized Kafka access
* overprivileged IAM
* secret leakage
* insecure containers
* vulnerable dependencies
* open security groups
* unrestricted S3 buckets
* unencrypted traffic
* missing TLS
* weak CI credentials
* unprotected administrative interfaces

Use least privilege everywhere.

---

# 53. ENCRYPTION

Enable encryption where supported for:

* PostgreSQL
* Redis
* Kafka/Redpanda
* S3
* backups
* secrets
* logs where appropriate

Use TLS for service-to-service communication when required.

Do not invent custom cryptography.

---

# 54. NETWORK SECURITY

Audit all ingress and egress.

Publicly accessible resources should be intentional.

Prefer:

```text
Internet
   ↓
CDN / Load Balancer / WAF
   ↓
Application
   ↓
Private Services
   ↓
Databases
```

Do not expose databases directly to users.

---

# 55. MOBILE AND WEB CONFIGURATION

Infrastructure configuration must support:

* web production URL
* API URL
* WebSocket URL
* CDN URL
* push notification environment
* media configuration
* search configuration
* calling configuration

Never expose server-side credentials through:

* Next.js public environment variables
* React Native bundles
* Expo public configuration

Only intentionally public configuration may be shipped to clients.

---

# 56. ENVIRONMENT VALIDATION

Add configuration validation where appropriate.

Applications should fail fast when required configuration is missing.

Do not silently substitute production-sensitive values.

Provide safe local defaults only for non-sensitive development infrastructure.

---

# 57. LOCAL DEVELOPMENT

Maintain a practical local development environment.

Where appropriate, provide Docker Compose or equivalent for:

* PostgreSQL
* Redis
* Kafka/Redpanda
* search
* application dependencies

Local development must not require production credentials.

Avoid making local infrastructure unnecessarily complex.

---

# 58. TEST ENVIRONMENT

Provide infrastructure suitable for automated tests.

Tests should be isolated from development/production data.

Support:

* disposable databases
* isolated Redis
* isolated event streams
* deterministic configuration

Do not run tests against production infrastructure.

---

# 59. SECURITY SCANNING

Integrate appropriate automated checks.

Potential checks:

* dependency vulnerability scanning
* container scanning
* IaC scanning
* secret scanning
* linting
* SAST where already supported

Do not add excessive tooling without value.

Fix critical security findings rather than merely reporting them.

---

# 60. INFRASTRUCTURE TESTING

Test infrastructure where practical.

Validate:

* Terraform/OpenTofu configuration
* Kubernetes manifests
* Helm templates
* Docker builds
* health checks
* deployment configuration
* IAM policies
* networking assumptions
* secret references
* environment configuration

Use validation tools actually available in the repository.

---

# 61. COST AWARENESS

Infrastructure should be production-ready without unnecessary waste.

Identify major cost drivers:

* compute
* database
* Redis
* Kafka
* search
* S3
* CloudFront
* NAT
* observability
* data transfer

Do not reduce reliability merely to reduce cost.

Use appropriate scaling and lifecycle policies.

---

# 62. INFRASTRUCTURE DOCUMENTATION

Create or update operational documentation covering:

* local setup
* environment setup
* cloud prerequisites
* deployment
* rollback
* migrations
* secrets
* DNS
* TLS
* database backup
* database restore
* worker deployment
* scaling
* monitoring
* alerting
* disaster recovery

Documentation must reflect the actual implemented infrastructure.

Do not document resources that were not actually created.

---

# 63. IMPLEMENTATION ORDER

Implement in this order unless the actual repository requires a safer dependency order.

## Phase 1 — Infrastructure Audit

Inspect all existing infrastructure and determine:

* current deployment model
* missing resources
* duplicated resources
* security gaps
* configuration gaps

## Phase 2 — Infrastructure as Code

Implement or complete:

* environment structure
* modules
* variables
* outputs
* state configuration

## Phase 3 — Networking

Implement:

* VPC
* subnets
* routing
* security groups
* load-balancing foundation
* private networking

## Phase 4 — Identity and Secrets

Implement:

* IAM
* workload identities
* secret management
* encryption keys

## Phase 5 — Data Layer

Implement:

* PostgreSQL
* Redis
* backups
* encryption
* monitoring

## Phase 6 — Messaging

Implement:

* Kafka/Redpanda
* topics
* access control
* retention
* monitoring

## Phase 7 — Storage

Implement:

* S3
* lifecycle policies
* media security
* CloudFront

## Phase 8 — Search

Implement the actual Elasticsearch/OpenSearch infrastructure if present in the repository.

## Phase 9 — Compute

Implement:

* backend deployment
* web deployment
* workers
* services
* ingress
* health checks

## Phase 10 — Scaling

Implement:

* autoscaling
* WebSocket scaling
* worker scaling
* resource limits
* disruption policies

## Phase 11 — Observability

Implement:

* logs
* metrics
* traces
* dashboards
* alerts

## Phase 12 — CI/CD

Implement:

* validation
* builds
* image publishing
* staging deployment
* production deployment
* rollback

## Phase 13 — Recovery and Security

Validate:

* backups
* restore
* IAM
* network isolation
* secret management
* container security
* infrastructure security

---

# 64. VALIDATION

Before considering the infrastructure implementation complete:

1. validate all infrastructure-as-code
2. validate Docker builds
3. validate Kubernetes/Helm configuration where applicable
4. validate CI/CD configuration
5. validate environment configuration
6. validate networking
7. validate security groups
8. validate IAM
9. validate secret references
10. validate database connectivity
11. validate Redis connectivity
12. validate Kafka/Redpanda connectivity
13. validate S3 access
14. validate CDN configuration
15. validate search connectivity
16. validate health checks
17. validate graceful shutdown
18. validate autoscaling configuration
19. validate backup configuration
20. validate monitoring
21. validate alerting
22. validate deployment rollback
23. run available security scans
24. verify no secrets are committed
25. verify no placeholder infrastructure remains

Do not claim successful deployment unless deployment was actually executed and validated.

---

# 65. FAILURE SCENARIOS

Test or validate the infrastructure response to:

* application container crash
* worker crash
* database restart
* Redis restart
* Kafka broker failure
* pod eviction
* node failure
* WebSocket instance termination
* network interruption
* failed deployment
* failed migration
* expired secret
* certificate renewal
* unavailable search
* S3 failure
* queue backlog
* high traffic
* sudden worker backlog

The system must fail safely and recover predictably.

---

# 66. PRODUCTION READINESS CHECKLIST

Before completion verify:

### Networking

* private databases
* restricted ingress
* restricted egress
* multi-AZ where appropriate
* TLS

### Compute

* production containers
* resource limits
* health probes
* graceful shutdown
* horizontal scaling

### Database

* high availability where appropriate
* backups
* encryption
* migrations
* monitoring

### Redis

* authentication
* private networking
* persistence behavior appropriate to workload
* monitoring

### Kafka/Redpanda

* replication
* authentication
* TLS
* topic configuration
* consumer monitoring

### Storage

* private S3
* encryption
* lifecycle
* secure CDN

### Security

* least privilege
* secrets management
* no hardcoded credentials
* security scanning

### CI/CD

* automated validation
* secure credentials
* image scanning
* staging
* controlled production deployment
* rollback

### Observability

* logs
* metrics
* traces
* dashboards
* alerts

### Recovery

* backups
* restore procedure
* documented RPO/RTO
* disaster-recovery procedure

---

# 67. CROSS-SYSTEM CONSISTENCY

Infrastructure must preserve the application's actual contracts.

Do not change:

* database connection assumptions
* Redis key semantics
* Kafka topic/event semantics
* BullMQ queue names
* S3 object structure
* CDN paths
* WebSocket routing
* API URLs
* environment variable names

unless the repository requires the change.

If a change is necessary, update every affected consumer in the same implementation.

Do not leave infrastructure and application configuration inconsistent.

---

# 68. NO PLACEHOLDERS

Do not create:

* fake Terraform resources
* empty Kubernetes manifests
* placeholder Dockerfiles
* fake secrets
* dummy cloud resources
* simulated deployment success
* TODO infrastructure
* commented-out production configuration
* imaginary service names

Every committed infrastructure resource must have a real purpose.

---

# 69. FINAL DELIVERABLE

The repository must contain a production-ready infrastructure foundation that can actually support the application.

At completion, report:

* infrastructure files created
* infrastructure files modified
* cloud resources implemented
* environment configuration
* networking
* database
* Redis
* Kafka/Redpanda
* storage/CDN
* search
* compute
* workers
* CI/CD
* observability
* security controls
* backups
* disaster-recovery configuration
* tests and validation commands
* validation results
* dependencies added
* actual external limitations, if any

Do not claim that infrastructure is deployed if it was only configured.

Do not claim that cloud resources exist unless they were actually provisioned.

Do not hide failures.

Begin by inspecting the repository and then implement the complete infrastructure foundation described abov

You are operating in Senior Engineering Team Mode.

Build the production-ready infrastructure foundation for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The infrastructure must support the established backend, web frontend, and mobile applications.

Do not redesign the application architecture.

Do not implement backend business logic.

Do not implement frontend code.

Do not implement mobile code.

Do not generate application business logic.

This volume establishes the foundational cloud, container, networking, infrastructure-as-code, and deployment platform.

────────────────────────────────────────

MISSION

Build production-grade infrastructure supporting:

• Hundreds of millions of users
• Billions of messages
• Tens of millions of concurrent WebSocket connections
• Large media traffic
• Large notification traffic
• Voice/video infrastructure
• Multi-region deployment
• High availability
• Horizontal scaling
• Zero-downtime deployment
• Disaster recovery
• Secure operations

Infrastructure must support:

• Local development
• Development
• Testing
• Staging
• Production
• Disaster recovery

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Cloud:

• AWS

Containers:

• Docker

Orchestration:

• Kubernetes

Package management:

• Helm

Infrastructure as Code:

• Terraform

CI/CD:

• GitHub Actions

Container Registry:

• Amazon ECR

Networking:

• AWS VPC
• Public subnets
• Private subnets
• NAT gateways
• Internet Gateway
• Route tables
• Security groups
• Network ACLs

Load Balancing:

• AWS Load Balancer
• Kubernetes ingress

Database:

• PostgreSQL
• AWS managed PostgreSQL where appropriate

Caching:

• Redis
• AWS managed Redis where appropriate

Object Storage:

• Amazon S3

CDN:

• CloudFront

DNS:

• Route 53

Certificates:

• AWS Certificate Manager

Secrets:

• AWS Secrets Manager and/or approved secret-management architecture

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

────────────────────────────────────────

INFRASTRUCTURE ARCHITECTURE

Design infrastructure for:

• Multiple availability zones
• Multiple AWS regions
• Horizontal scaling
• Automatic recovery
• Network isolation
• Secure private workloads
• Public edge services only where required

Clearly separate:

• Public traffic
• Application traffic
• Database traffic
• Internal service traffic
• Management traffic
• Observability traffic

Do not expose databases or internal infrastructure directly to the public internet.

────────────────────────────────────────

ENVIRONMENT ARCHITECTURE

Define environments for:

• Local
• Development
• Testing
• Staging
• Production
• Disaster Recovery

Define:

• Environment boundaries
• AWS account strategy where appropriate
• VPC strategy
• Namespace strategy
• Secrets strategy
• Deployment strategy
• Configuration isolation

Production credentials and infrastructure must never be reused across lower environments.

────────────────────────────────────────

TERRAFORM ARCHITECTURE

Create a scalable Terraform structure.

Organize infrastructure into reusable modules for:

• Networking
• IAM
• EKS
• Node groups
• PostgreSQL
• Redis
• S3
• CloudFront
• Route 53
• ACM
• ECR
• Load balancers
• Secrets
• Monitoring
• Logging
• Backup
• Disaster recovery

Use environment-specific configuration without duplicating entire modules.

Implement:

• Remote state
• State locking
• Variable validation
• Outputs
• Module versioning
• Provider configuration
• Region configuration
• Tags
• Naming conventions

Never hard-code secrets into Terraform.

────────────────────────────────────────

NETWORKING

Design AWS networking.

Include:

• VPC
• CIDR strategy
• Public subnets
• Private application subnets
• Private data subnets
• Internet Gateway
• NAT Gateways
• Route tables
• Security groups
• Network ACLs
• VPC endpoints where appropriate

Define traffic rules between:

• Internet
• CDN
• Load balancers
• Kubernetes
• PostgreSQL
• Redis
• Kafka
• Search
• Object storage

Use least-privilege network access.

────────────────────────────────────────

AWS IAM

Implement IAM using least privilege.

Define roles for:

• Terraform
• Kubernetes
• Applications
• Workers
• Media processors
• CI/CD
• Monitoring
• Backup systems

Avoid long-lived static access keys where possible.

Use workload identity mechanisms such as:

• IAM Roles for Service Accounts
• OIDC federation

where appropriate.

────────────────────────────────────────

KUBERNETES FOUNDATION

Create the infrastructure foundation for Kubernetes.

Support:

• AWS EKS
• Multiple node groups
• Cluster autoscaling
• Pod scheduling
• Namespaces
• Resource quotas
• Network policies
• Service accounts
• RBAC

Separate workload categories such as:

• API services
• WebSocket services
• Workers
• Media workers
• Call signaling
• Administration
• Observability

Do not generate all application-specific manifests in this volume.

────────────────────────────────────────

KUBERNETES NAMESPACES

Define namespaces for appropriate workload isolation.

Possible categories include:

• system
• application
• realtime
• workers
• media
• calls
• observability
• ingress
• security

Avoid creating excessive namespaces without operational value.

────────────────────────────────────────

NODE GROUP ARCHITECTURE

Design node groups for different workloads.

Include strategies for:

• General application workloads
• WebSocket-heavy workloads
• CPU-intensive media workers
• Memory-intensive workloads
• Observability workloads
• Specialized infrastructure

Define:

• Instance families
• Scaling behavior
• Taints
• Tolerations
• Node labels
• Availability zones

Use workload-specific autoscaling where appropriate.

────────────────────────────────────────

CONTAINERIZATION

Create production-ready Docker strategy.

Support:

• Multi-stage builds
• Minimal runtime images
• Non-root users
• Dependency caching
• Security scanning compatibility
• Health checks
• Environment injection
• Graceful shutdown

Create reusable patterns for:

• Backend services
• Workers
• Web frontend
• Media workers

Do not embed secrets in images.

────────────────────────────────────────

DOCKER COMPOSE

Provide local-development infrastructure using Docker Compose.

Support:

• PostgreSQL
• Redis
• Kafka/Redpanda
• Elasticsearch/OpenSearch where needed
• Supporting services

The local environment must make it possible to run the core project infrastructure without AWS.

Do not attempt to perfectly emulate all production infrastructure locally.

────────────────────────────────────────

CONTAINER REGISTRY

Configure Amazon ECR architecture.

Support:

• Separate repositories where appropriate
• Image versioning
• Immutable tags where appropriate
• Lifecycle policies
• Image scanning
• Access control

Define tagging strategy for:

• Development
• Staging
• Production
• Release versions
• Commit SHA

────────────────────────────────────────

LOAD BALANCING

Design load balancing for:

• Web traffic
• REST APIs
• WebSocket connections
• Administrative traffic

Support:

• Health checks
• TLS termination
• Connection timeouts
• Idle timeouts
• WebSocket support
• Cross-zone load balancing

Do not route high-bandwidth media traffic through application load balancers when direct CDN delivery is appropriate.

────────────────────────────────────────

INGRESS

Design Kubernetes ingress architecture.

Support:

• TLS
• HTTP routing
• WebSocket upgrades
• Health checks
• Rate limiting integration
• Security headers where appropriate
• Service routing

Separate public routes from internal services.

────────────────────────────────────────

POSTGRESQL INFRASTRUCTURE

Configure production PostgreSQL architecture.

Support:

• Multi-AZ deployment
• Automated backups
• Point-in-time recovery
• Read replicas
• Connection pooling
• Monitoring
• Encryption
• Parameter groups
• Maintenance windows
• Failover

Define:

• Backup retention
• Restore strategy
• Replica strategy
• Connection limits
• Monitoring thresholds

Do not expose PostgreSQL publicly.

────────────────────────────────────────

REDIS INFRASTRUCTURE

Configure managed Redis architecture.

Support:

• High availability
• Replication
• Automatic failover
• Encryption in transit
• Encryption at rest
• Authentication
• Monitoring
• Backup where applicable

Use Redis for:

• Presence
• Caching
• Rate limiting
• WebSocket coordination
• Distributed locks
• Queues

Do not treat Redis as the primary persistent database.

────────────────────────────────────────

KAFKA / REDPANDA INFRASTRUCTURE

Define production event-streaming infrastructure.

Support:

• Broker scaling
• Replication
• Availability zones
• Persistent storage
• Monitoring
• Authentication
• Encryption
• Topic management

Define production requirements for:

• Partition count
• Replication factor
• Retention
• Disk capacity
• Consumer monitoring

Do not create an infrastructure topology that cannot support high-throughput message events.

────────────────────────────────────────

OBJECT STORAGE

Configure S3 architecture for:

• User media
• Temporary uploads
• Processed media
• Thumbnails
• Documents
• Backups
• Logs where appropriate

Implement:

• Bucket separation
• Encryption
• Versioning
• Lifecycle rules
• Access policies
• Private buckets
• Replication
• Object locking where justified

Do not make private media buckets publicly accessible.

────────────────────────────────────────

CDN

Configure CloudFront architecture.

Support:

• S3 origins
• Protected media
• Signed URLs
• Signed cookies where appropriate
• Cache policies
• Origin protection
• TLS
• Compression
• Regional delivery

Differentiate cache behavior for:

• Public static assets
• Immutable media
• Protected user content
• Short-lived resources

────────────────────────────────────────

DNS

Configure Route 53 architecture.

Support:

• Public DNS
• Private DNS where appropriate
• Health checks
• Regional routing
• Failover routing
• Weighted routing
• Latency-based routing where justified

Support future multi-region failover.

────────────────────────────────────────

CERTIFICATES

Use AWS Certificate Manager or approved certificate-management infrastructure.

Support:

• TLS certificates
• Automatic renewal
• Regional certificate requirements
• Load balancers
• CloudFront
• Secure ingress

Avoid manual certificate distribution where possible.

────────────────────────────────────────

SECRETS MANAGEMENT

Use:

• AWS Secrets Manager
• Kubernetes secret integration
• Approved secret-management architecture

Manage:

• Database credentials
• Redis credentials
• Kafka credentials
• JWT secrets
• OAuth secrets
• Push-provider secrets
• S3 credentials where required
• External service credentials

Support:

• Rotation
• Least privilege
• Audit access
• Environment isolation

Never commit secrets to Git.

────────────────────────────────────────

BACKUPS

Design backup infrastructure for:

• PostgreSQL
• Object storage
• Redis where applicable
• Kafka configuration
• Terraform state
• Kubernetes configuration
• Critical application configuration

Define:

• Retention
• Encryption
• Cross-region copies
• Restore validation
• Backup monitoring

Backups must be tested, not merely created.

────────────────────────────────────────

MONITORING FOUNDATION

Deploy the observability foundation.

Support:

• Prometheus
• Grafana
• Loki
• Tempo
• OpenTelemetry

Monitor:

• Kubernetes
• Nodes
• Pods
• Services
• Load balancers
• PostgreSQL
• Redis
• Kafka
• S3
• CloudFront
• Application metrics

────────────────────────────────────────

LOGGING FOUNDATION

Implement centralized logging.

Support:

• Structured JSON logs
• Log collection
• Loki
• Correlation IDs
• Trace IDs
• Retention policies
• Sensitive-data filtering

Never collect:

• Passwords
• Tokens
• Private keys
• Encryption keys
• Plaintext E2EE messages

────────────────────────────────────────

ALERTING FOUNDATION

Design alerts for:

• CPU
• Memory
• Disk
• Latency
• Error rate
• Pod failures
• Node failures
• Database health
• Redis health
• Kafka health
• Queue health
• Certificate expiry
• Backup failures
• Storage failures
• Regional failures

Define severity levels.

────────────────────────────────────────

NETWORK SECURITY

Implement:

• Security groups
• Network ACLs
• Kubernetes NetworkPolicies
• Private subnets
• IAM
• Encryption
• TLS
• Least privilege

Separate:

• Public edge
• Application
• Data
• Management

────────────────────────────────────────

WAF AND EDGE SECURITY

Design WAF-ready architecture.

Support:

• Rate limiting
• IP filtering
• Bot protection
• Common OWASP protections
• DDoS protection
• Request-size limits

Do not place all security logic exclusively at the WAF.

Application services must still perform authentication and authorization.

────────────────────────────────────────

DISASTER RECOVERY FOUNDATION

Design infrastructure recovery for:

• Availability-zone failure
• Database failure
• Redis failure
• Kafka failure
• Kubernetes failure
• Region failure
• Object-storage failure

Define:

• Recovery objectives
• Backup dependencies
• Infrastructure reconstruction
• Regional failover
• Restore verification

────────────────────────────────────────

COST OPTIMIZATION

Design infrastructure cost controls.

Consider:

• Autoscaling
• Reserved capacity
• Savings plans
• Spot workloads where appropriate
• Storage tiering
• S3 lifecycle rules
• CDN caching
• Log retention
• Right-sizing
• Environment scheduling

Never compromise critical availability for minor cost reductions.

────────────────────────────────────────

SECURITY HARDENING

Implement infrastructure controls for:

• Least privilege
• IAM
• Encryption
• TLS
• Secret rotation
• Container security
• Image scanning
• Network segmentation
• Kubernetes RBAC
• NetworkPolicies
• Pod security
• Audit logging

Prepare infrastructure for:

• SOC 2
• ISO 27001
• GDPR
• Security audits

────────────────────────────────────────

INFRASTRUCTURE TESTING

Create infrastructure testing architecture for:

• Terraform validation
• Terraform formatting
• Terraform plan validation
• Kubernetes schema validation
• Helm validation
• Docker image scanning
• Configuration validation
• Smoke tests
• Connectivity tests
• Backup restoration tests
• Disaster recovery tests

────────────────────────────────────────

DOCUMENTATION

Generate:

• Infrastructure architecture
• AWS architecture
• Environment architecture
• Network architecture
• Terraform structure
• Kubernetes foundation
• Docker development guide
• Secrets-management guide
• Backup guide
• Disaster-recovery guide
• Monitoring guide
• Logging guide
• Operational runbooks

────────────────────────────────────────

PROJECT INDEX

Maintain the infrastructure Project Index.

Track:

• Terraform modules
• AWS resources
• Kubernetes clusters
• Namespaces
• Node groups
• Docker images
• ECR repositories
• PostgreSQL infrastructure
• Redis infrastructure
• Kafka infrastructure
• S3 buckets
• CloudFront distributions
• DNS
• Certificates
• Secrets
• Monitoring
• Logging
• Backups
• Generated files
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

INFRASTRUCTURE MILESTONE 1

Terraform foundation, providers, remote state, variables, outputs, naming conventions, and environment structure.

INFRASTRUCTURE MILESTONE 2

VPC, subnets, routing, security groups, NAT, endpoints, and foundational networking.

INFRASTRUCTURE MILESTONE 3

IAM, workload identity, ECR, KMS, and secrets foundations.

INFRASTRUCTURE MILESTONE 4

EKS cluster, node groups, namespaces, autoscaling, RBAC, and network policies.

INFRASTRUCTURE MILESTONE 5

PostgreSQL, Redis, Kafka/Redpanda, and supporting data infrastructure.

INFRASTRUCTURE MILESTONE 6

S3, CloudFront, Route 53, ACM, and media-delivery infrastructure.

INFRASTRUCTURE MILESTONE 7

Docker Compose, development environment, container standards, and image security.

INFRASTRUCTURE MILESTONE 8

Prometheus, Grafana, Loki, Tempo, OpenTelemetry, dashboards, and alerts.

INFRASTRUCTURE MILESTONE 9

Backups, disaster-recovery foundations, restore testing, and operational runbooks.

INFRASTRUCTURE MILESTONE 10

Security hardening, cost optimization, infrastructure testing, and production-readiness foundations.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must be validated before proceeding.

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never truncate code.

Never summarize files instead of generating them.

Never generate pseudo-code.

Never generate placeholder files.

Never generate TODO implementations.

When modifying an existing file:

1. Provide the exact file path.
2. Explain why it must change.
3. Provide the complete updated file.

Never regenerate unchanged files.

────────────────────────────────────────

SCOPE RESTRICTION

This volume covers infrastructure foundations:

• AWS
• Terraform
• Networking
• IAM
• EKS
• Node groups
• Kubernetes foundations
• PostgreSQL infrastructure
• Redis infrastructure
• Kafka infrastructure
• S3
• CloudFront
• Route 53
• ACM
• ECR
• Secrets
• Docker
• Local development infrastructure
• Observability foundations
• Logging foundations
• Backup foundations
• Disaster-recovery foundations

Do not implement:

• Backend business logic
• Frontend code
• Mobile code
• Application-level APIs
• Application-level WebSocket logic

────────────────────────────────────────

QUALITY BAR

Treat this as infrastructure for a globally distributed production communication platform.

Assume:

• Hundreds of millions of users
• Billions of messages
• Tens of millions of concurrent connections
• Large media traffic
• Large event streams
• High call infrastructure demand
• Multi-region deployment
• High availability
• Zero-downtime operations
• Strict security requirements

Prioritize:

• Security
• Availability
• Scalability
• Reliability
• Recoverability
• Observability
• Cost efficiency
• Operational simplicity
• Production readine

You are operating in Senior Engineering Team Mode.

Build the production-ready infrastructure foundation for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The infrastructure must support the established backend, web frontend, and mobile applications.

Do not redesign the application architecture.

Do not implement backend business logic.

Do not implement frontend code.

Do not implement mobile code.

Do not generate application business logic.

This volume establishes the foundational cloud, container, networking, infrastructure-as-code, and deployment platform.

────────────────────────────────────────

MISSION

Build production-grade infrastructure supporting:

• Hundreds of millions of users
• Billions of messages
• Tens of millions of concurrent WebSocket connections
• Large media traffic
• Large notification traffic
• Voice/video infrastructure
• Multi-region deployment
• High availability
• Horizontal scaling
• Zero-downtime deployment
• Disaster recovery
• Secure operations

Infrastructure must support:

• Local development
• Development
• Testing
• Staging
• Production
• Disaster recovery

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Cloud:

• AWS

Containers:

• Docker

Orchestration:

• Kubernetes

Package management:

• Helm

Infrastructure as Code:

• Terraform

CI/CD:

• GitHub Actions

Container Registry:

• Amazon ECR

Networking:

• AWS VPC
• Public subnets
• Private subnets
• NAT gateways
• Internet Gateway
• Route tables
• Security groups
• Network ACLs

Load Balancing:

• AWS Load Balancer
• Kubernetes ingress

Database:

• PostgreSQL
• AWS managed PostgreSQL where appropriate

Caching:

• Redis
• AWS managed Redis where appropriate

Object Storage:

• Amazon S3

CDN:

• CloudFront

DNS:

• Route 53

Certificates:

• AWS Certificate Manager

Secrets:

• AWS Secrets Manager and/or approved secret-management architecture

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

────────────────────────────────────────

INFRASTRUCTURE ARCHITECTURE

Design infrastructure for:

• Multiple availability zones
• Multiple AWS regions
• Horizontal scaling
• Automatic recovery
• Network isolation
• Secure private workloads
• Public edge services only where required

Clearly separate:

• Public traffic
• Application traffic
• Database traffic
• Internal service traffic
• Management traffic
• Observability traffic

Do not expose databases or internal infrastructure directly to the public internet.

────────────────────────────────────────

ENVIRONMENT ARCHITECTURE

Define environments for:

• Local
• Development
• Testing
• Staging
• Production
• Disaster Recovery

Define:

• Environment boundaries
• AWS account strategy where appropriate
• VPC strategy
• Namespace strategy
• Secrets strategy
• Deployment strategy
• Configuration isolation

Production credentials and infrastructure must never be reused across lower environments.

────────────────────────────────────────

TERRAFORM ARCHITECTURE

Create a scalable Terraform structure.

Organize infrastructure into reusable modules for:

• Networking
• IAM
• EKS
• Node groups
• PostgreSQL
• Redis
• S3
• CloudFront
• Route 53
• ACM
• ECR
• Load balancers
• Secrets
• Monitoring
• Logging
• Backup
• Disaster recovery

Use environment-specific configuration without duplicating entire modules.

Implement:

• Remote state
• State locking
• Variable validation
• Outputs
• Module versioning
• Provider configuration
• Region configuration
• Tags
• Naming conventions

Never hard-code secrets into Terraform.

────────────────────────────────────────

NETWORKING

Design AWS networking.

Include:

• VPC
• CIDR strategy
• Public subnets
• Private application subnets
• Private data subnets
• Internet Gateway
• NAT Gateways
• Route tables
• Security groups
• Network ACLs
• VPC endpoints where appropriate

Define traffic rules between:

• Internet
• CDN
• Load balancers
• Kubernetes
• PostgreSQL
• Redis
• Kafka
• Search
• Object storage

Use least-privilege network access.

────────────────────────────────────────

AWS IAM

Implement IAM using least privilege.

Define roles for:

• Terraform
• Kubernetes
• Applications
• Workers
• Media processors
• CI/CD
• Monitoring
• Backup systems

Avoid long-lived static access keys where possible.

Use workload identity mechanisms such as:

• IAM Roles for Service Accounts
• OIDC federation

where appropriate.

────────────────────────────────────────

KUBERNETES FOUNDATION

Create the infrastructure foundation for Kubernetes.

Support:

• AWS EKS
• Multiple node groups
• Cluster autoscaling
• Pod scheduling
• Namespaces
• Resource quotas
• Network policies
• Service accounts
• RBAC

Separate workload categories such as:

• API services
• WebSocket services
• Workers
• Media workers
• Call signaling
• Administration
• Observability

Do not generate all application-specific manifests in this volume.

────────────────────────────────────────

KUBERNETES NAMESPACES

Define namespaces for appropriate workload isolation.

Possible categories include:

• system
• application
• realtime
• workers
• media
• calls
• observability
• ingress
• security

Avoid creating excessive namespaces without operational value.

────────────────────────────────────────

NODE GROUP ARCHITECTURE

Design node groups for different workloads.

Include strategies for:

• General application workloads
• WebSocket-heavy workloads
• CPU-intensive media workers
• Memory-intensive workloads
• Observability workloads
• Specialized infrastructure

Define:

• Instance families
• Scaling behavior
• Taints
• Tolerations
• Node labels
• Availability zones

Use workload-specific autoscaling where appropriate.

────────────────────────────────────────

CONTAINERIZATION

Create production-ready Docker strategy.

Support:

• Multi-stage builds
• Minimal runtime images
• Non-root users
• Dependency caching
• Security scanning compatibility
• Health checks
• Environment injection
• Graceful shutdown

Create reusable patterns for:

• Backend services
• Workers
• Web frontend
• Media workers

Do not embed secrets in images.

────────────────────────────────────────

DOCKER COMPOSE

Provide local-development infrastructure using Docker Compose.

Support:

• PostgreSQL
• Redis
• Kafka/Redpanda
• Elasticsearch/OpenSearch where needed
• Supporting services

The local environment must make it possible to run the core project infrastructure without AWS.

Do not attempt to perfectly emulate all production infrastructure locally.

────────────────────────────────────────

CONTAINER REGISTRY

Configure Amazon ECR architecture.

Support:

• Separate repositories where appropriate
• Image versioning
• Immutable tags where appropriate
• Lifecycle policies
• Image scanning
• Access control

Define tagging strategy for:

• Development
• Staging
• Production
• Release versions
• Commit SHA

────────────────────────────────────────

LOAD BALANCING

Design load balancing for:

• Web traffic
• REST APIs
• WebSocket connections
• Administrative traffic

Support:

• Health checks
• TLS termination
• Connection timeouts
• Idle timeouts
• WebSocket support
• Cross-zone load balancing

Do not route high-bandwidth media traffic through application load balancers when direct CDN delivery is appropriate.

────────────────────────────────────────

INGRESS

Design Kubernetes ingress architecture.

Support:

• TLS
• HTTP routing
• WebSocket upgrades
• Health checks
• Rate limiting integration
• Security headers where appropriate
• Service routing

Separate public routes from internal services.

────────────────────────────────────────

POSTGRESQL INFRASTRUCTURE

Configure production PostgreSQL architecture.

Support:

• Multi-AZ deployment
• Automated backups
• Point-in-time recovery
• Read replicas
• Connection pooling
• Monitoring
• Encryption
• Parameter groups
• Maintenance windows
• Failover

Define:

• Backup retention
• Restore strategy
• Replica strategy
• Connection limits
• Monitoring thresholds

Do not expose PostgreSQL publicly.

────────────────────────────────────────

REDIS INFRASTRUCTURE

Configure managed Redis architecture.

Support:

• High availability
• Replication
• Automatic failover
• Encryption in transit
• Encryption at rest
• Authentication
• Monitoring
• Backup where applicable

Use Redis for:

• Presence
• Caching
• Rate limiting
• WebSocket coordination
• Distributed locks
• Queues

Do not treat Redis as the primary persistent database.

────────────────────────────────────────

KAFKA / REDPANDA INFRASTRUCTURE

Define production event-streaming infrastructure.

Support:

• Broker scaling
• Replication
• Availability zones
• Persistent storage
• Monitoring
• Authentication
• Encryption
• Topic management

Define production requirements for:

• Partition count
• Replication factor
• Retention
• Disk capacity
• Consumer monitoring

Do not create an infrastructure topology that cannot support high-throughput message events.

────────────────────────────────────────

OBJECT STORAGE

Configure S3 architecture for:

• User media
• Temporary uploads
• Processed media
• Thumbnails
• Documents
• Backups
• Logs where appropriate

Implement:

• Bucket separation
• Encryption
• Versioning
• Lifecycle rules
• Access policies
• Private buckets
• Replication
• Object locking where justified

Do not make private media buckets publicly accessible.

────────────────────────────────────────

CDN

Configure CloudFront architecture.

Support:

• S3 origins
• Protected media
• Signed URLs
• Signed cookies where appropriate
• Cache policies
• Origin protection
• TLS
• Compression
• Regional delivery

Differentiate cache behavior for:

• Public static assets
• Immutable media
• Protected user content
• Short-lived resources

────────────────────────────────────────

DNS

Configure Route 53 architecture.

Support:

• Public DNS
• Private DNS where appropriate
• Health checks
• Regional routing
• Failover routing
• Weighted routing
• Latency-based routing where justified

Support future multi-region failover.

────────────────────────────────────────

CERTIFICATES

Use AWS Certificate Manager or approved certificate-management infrastructure.

Support:

• TLS certificates
• Automatic renewal
• Regional certificate requirements
• Load balancers
• CloudFront
• Secure ingress

Avoid manual certificate distribution where possible.

────────────────────────────────────────

SECRETS MANAGEMENT

Use:

• AWS Secrets Manager
• Kubernetes secret integration
• Approved secret-management architecture

Manage:

• Database credentials
• Redis credentials
• Kafka credentials
• JWT secrets
• OAuth secrets
• Push-provider secrets
• S3 credentials where required
• External service credentials

Support:

• Rotation
• Least privilege
• Audit access
• Environment isolation

Never commit secrets to Git.

────────────────────────────────────────

BACKUPS

Design backup infrastructure for:

• PostgreSQL
• Object storage
• Redis where applicable
• Kafka configuration
• Terraform state
• Kubernetes configuration
• Critical application configuration

Define:

• Retention
• Encryption
• Cross-region copies
• Restore validation
• Backup monitoring

Backups must be tested, not merely created.

────────────────────────────────────────

MONITORING FOUNDATION

Deploy the observability foundation.

Support:

• Prometheus
• Grafana
• Loki
• Tempo
• OpenTelemetry

Monitor:

• Kubernetes
• Nodes
• Pods
• Services
• Load balancers
• PostgreSQL
• Redis
• Kafka
• S3
• CloudFront
• Application metrics

────────────────────────────────────────

LOGGING FOUNDATION

Implement centralized logging.

Support:

• Structured JSON logs
• Log collection
• Loki
• Correlation IDs
• Trace IDs
• Retention policies
• Sensitive-data filtering

Never collect:

• Passwords
• Tokens
• Private keys
• Encryption keys
• Plaintext E2EE messages

────────────────────────────────────────

ALERTING FOUNDATION

Design alerts for:

• CPU
• Memory
• Disk
• Latency
• Error rate
• Pod failures
• Node failures
• Database health
• Redis health
• Kafka health
• Queue health
• Certificate expiry
• Backup failures
• Storage failures
• Regional failures

Define severity levels.

────────────────────────────────────────

NETWORK SECURITY

Implement:

• Security groups
• Network ACLs
• Kubernetes NetworkPolicies
• Private subnets
• IAM
• Encryption
• TLS
• Least privilege

Separate:

• Public edge
• Application
• Data
• Management

────────────────────────────────────────

WAF AND EDGE SECURITY

Design WAF-ready architecture.

Support:

• Rate limiting
• IP filtering
• Bot protection
• Common OWASP protections
• DDoS protection
• Request-size limits

Do not place all security logic exclusively at the WAF.

Application services must still perform authentication and authorization.

────────────────────────────────────────

DISASTER RECOVERY FOUNDATION

Design infrastructure recovery for:

• Availability-zone failure
• Database failure
• Redis failure
• Kafka failure
• Kubernetes failure
• Region failure
• Object-storage failure

Define:

• Recovery objectives
• Backup dependencies
• Infrastructure reconstruction
• Regional failover
• Restore verification

────────────────────────────────────────

COST OPTIMIZATION

Design infrastructure cost controls.

Consider:

• Autoscaling
• Reserved capacity
• Savings plans
• Spot workloads where appropriate
• Storage tiering
• S3 lifecycle rules
• CDN caching
• Log retention
• Right-sizing
• Environment scheduling

Never compromise critical availability for minor cost reductions.

────────────────────────────────────────

SECURITY HARDENING

Implement infrastructure controls for:

• Least privilege
• IAM
• Encryption
• TLS
• Secret rotation
• Container security
• Image scanning
• Network segmentation
• Kubernetes RBAC
• NetworkPolicies
• Pod security
• Audit logging

Prepare infrastructure for:

• SOC 2
• ISO 27001
• GDPR
• Security audits

────────────────────────────────────────

INFRASTRUCTURE TESTING

Create infrastructure testing architecture for:

• Terraform validation
• Terraform formatting
• Terraform plan validation
• Kubernetes schema validation
• Helm validation
• Docker image scanning
• Configuration validation
• Smoke tests
• Connectivity tests
• Backup restoration tests
• Disaster recovery tests

────────────────────────────────────────

DOCUMENTATION

Generate:

• Infrastructure architecture
• AWS architecture
• Environment architecture
• Network architecture
• Terraform structure
• Kubernetes foundation
• Docker development guide
• Secrets-management guide
• Backup guide
• Disaster-recovery guide
• Monitoring guide
• Logging guide
• Operational runbooks

────────────────────────────────────────

PROJECT INDEX

Maintain the infrastructure Project Index.

Track:

• Terraform modules
• AWS resources
• Kubernetes clusters
• Namespaces
• Node groups
• Docker images
• ECR repositories
• PostgreSQL infrastructure
• Redis infrastructure
• Kafka infrastructure
• S3 buckets
• CloudFront distributions
• DNS
• Certificates
• Secrets
• Monitoring
• Logging
• Backups
• Generated files
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

INFRASTRUCTURE MILESTONE 1

Terraform foundation, providers, remote state, variables, outputs, naming conventions, and environment structure.

INFRASTRUCTURE MILESTONE 2

VPC, subnets, routing, security groups, NAT, endpoints, and foundational networking.

INFRASTRUCTURE MILESTONE 3

IAM, workload identity, ECR, KMS, and secrets foundations.

INFRASTRUCTURE MILESTONE 4

EKS cluster, node groups, namespaces, autoscaling, RBAC, and network policies.

INFRASTRUCTURE MILESTONE 5

PostgreSQL, Redis, Kafka/Redpanda, and supporting data infrastructure.

INFRASTRUCTURE MILESTONE 6

S3, CloudFront, Route 53, ACM, and media-delivery infrastructure.

INFRASTRUCTURE MILESTONE 7

Docker Compose, development environment, container standards, and image security.

INFRASTRUCTURE MILESTONE 8

Prometheus, Grafana, Loki, Tempo, OpenTelemetry, dashboards, and alerts.

INFRASTRUCTURE MILESTONE 9

Backups, disaster-recovery foundations, restore testing, and operational runbooks.

INFRASTRUCTURE MILESTONE 10

Security hardening, cost optimization, infrastructure testing, and production-readiness foundations.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must be validated before proceeding.

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never truncate code.

Never summarize files instead of generating them.

Never generate pseudo-code.

Never generate placeholder files.

Never generate TODO implementations.

When modifying an existing file:

1. Provide the exact file path.
2. Explain why it must change.
3. Provide the complete updated file.

Never regenerate unchanged files.

────────────────────────────────────────

SCOPE RESTRICTION

This volume covers infrastructure foundations:

• AWS
• Terraform
• Networking
• IAM
• EKS
• Node groups
• Kubernetes foundations
• PostgreSQL infrastructure
• Redis infrastructure
• Kafka infrastructure
• S3
• CloudFront
• Route 53
• ACM
• ECR
• Secrets
• Docker
• Local development infrastructure
• Observability foundations
• Logging foundations
• Backup foundations
• Disaster-recovery foundations

Do not implement:

• Backend business logic
• Frontend code
• Mobile code
• Application-level APIs
• Application-level WebSocket logic

────────────────────────────────────────

QUALITY BAR

Treat this as infrastructure for a globally distributed production communication platform.

Assume:

• Hundreds of millions of users
• Billions of messages
• Tens of millions of concurrent connections
• Large media traffic
• Large event streams
• High call infrastructure demand
• Multi-region deployment
• High availability
• Zero-downtime operations
• Strict security requirements

Prioritize:

• Security
• Availability
• Scalability
• Reliability
• Recoverability
• Observability
• Cost efficiency
• Operational simplicity
• Production readine

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
