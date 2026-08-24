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
