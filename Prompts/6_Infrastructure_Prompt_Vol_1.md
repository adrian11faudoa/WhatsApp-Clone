# WhatsApp-Style Messaging Platform — Infrastructure Prompt — Volume 1

## ROLE

You are the **Cloud Architect, DevOps Engineer, Infrastructure Engineer, Security Engineer, Reliability Engineer, Performance Engineer, Platform Engineer, and QA Engineer** responsible for implementing the foundational production infrastructure for the **WhatsApp-style messaging platform**.

This is a **bounded infrastructure implementation milestone**.

Operate with the combined responsibilities of:

* Cloud Architect
* DevOps Engineer
* Infrastructure Engineer
* Platform Engineer
* Kubernetes Engineer
* Security Engineer
* Reliability Engineer
* Database Infrastructure Engineer
* Performance Engineer
* QA Engineer
* Technical Writer

Implement real, production-grade infrastructure-as-code and operational configuration within the scope of this prompt.

Do not implement unrelated application business logic, frontend, mobile, or future infrastructure functionality.

---

# PROJECT

The project is an independently engineered **production-grade, globally scalable, WhatsApp-style real-time communications platform**.

The infrastructure must support, where applicable:

* Next.js web application;
* React Native/Expo mobile clients;
* NestJS backend services;
* PostgreSQL;
* Redis;
* event streaming;
* background workers;
* object storage;
* media processing;
* search;
* realtime WebSocket gateways;
* notification services;
* observability;
* CI/CD;
* staging and production environments;
* disaster recovery.

The intended infrastructure technology direction is:

* Docker;
* Kubernetes where justified;
* Helm where Kubernetes is used;
* Terraform or equivalent infrastructure-as-code;
* GitHub Actions or equivalent CI/CD;
* OpenTelemetry;
* Prometheus;
* Grafana;
* centralized structured logging;
* distributed tracing;
* cloud-managed infrastructure where it is operationally advantageous.

The exact cloud provider must be determined from the repository and established project contracts when one has already been selected.

Do not silently introduce a different cloud platform.

---

# CURRENT INFRASTRUCTURE SCOPE

Implement the foundational infrastructure required to run the application consistently across local development, CI/test, development, and a production-oriented baseline.

This milestone includes:

* infrastructure repository structure;
* Docker development/runtime configuration;
* local development orchestration;
* environment/configuration conventions;
* infrastructure-as-code foundation;
* networking foundation;
* Kubernetes foundation where selected;
* namespace/environment boundaries;
* application deployment foundations;
* PostgreSQL infrastructure definition;
* Redis infrastructure definition;
* object-storage definition;
* ingress/load-balancing foundation;
* TLS configuration structure;
* secrets-management integration boundaries;
* IAM/least-privilege foundations;
* resource limits;
* health/readiness integration;
* autoscaling foundations;
* persistent storage;
* backup foundations;
* foundational monitoring;
* foundational logging;
* foundational tracing;
* CI validation;
* infrastructure documentation.

Do not attempt to complete all production disaster recovery, multi-region failover, or full production observability in this volume.

Those responsibilities belong to later planned infrastructure work.

---

# OUT-OF-SCOPE

Do not implement:

* frontend business logic;
* mobile application code;
* backend domain functionality;
* database schema migrations that belong to application development;
* full production multi-region failover;
* complete disaster-recovery automation;
* complete security-compliance certification;
* complete cost-optimization program;
* advanced global traffic routing;
* full production incident-management platform;
* fake cloud provisioning;
* fabricated credentials or secrets.

Infrastructure-as-code is in scope.

Claiming that real cloud resources are provisioned is not in scope unless the execution environment actually provisions and verifies them.

---

# SOURCE-OF-TRUTH MODEL

Inspect the repository before changing anything.

Determine:

* current deployment structure;
* Dockerfiles;
* compose configuration;
* Kubernetes files;
* Helm charts;
* Terraform or other IaC;
* CI workflows;
* environment templates;
* existing observability;
* application ports;
* health endpoints;
* database dependencies;
* Redis dependencies;
* object-storage configuration;
* backend worker processes.

The repository is authoritative for actual implementation state.

Do not assume an earlier infrastructure prompt was executed.

Do not depend on another AI conversation.

Where infrastructure artifacts are missing, create them within this prompt's scope.

Preserve compatible infrastructure that already exists.

---

# IMPLEMENTATION DISCIPLINE

Before modifying infrastructure:

1. Inspect the repository.
2. Identify application runtime requirements.
3. Identify containerization requirements.
4. Identify network dependencies.
5. Identify stateful services.
6. Identify environment/configuration requirements.
7. Identify existing deployment conventions.
8. Identify current health/readiness endpoints.
9. Identify current CI behavior.
10. Implement only this infrastructure milestone.

Do not create duplicate infrastructure systems.

Do not introduce Kubernetes if the repository's established production architecture intentionally uses a different deployment model without first evaluating the existing architecture.

---

# INFRASTRUCTURE DIRECTORY STRUCTURE

Create a clear infrastructure structure appropriate to the repository.

A reasonable structure may include:

```text
infra/
  docker/
  terraform/
  kubernetes/
  helm/
  environments/
  scripts/
  docs/
```

Adapt this to the existing repository rather than blindly imposing it.

Keep reusable infrastructure modules separate from environment-specific configuration.

Do not duplicate identical resources across environments unnecessarily.

---

# CONTAINERIZATION

Implement production-oriented containerization for the backend and applicable workers.

Containers must:

* use appropriate base images;
* run as non-root where practical;
* minimize unnecessary packages;
* use deterministic dependency installation;
* separate build and runtime stages where appropriate;
* define health behavior;
* handle signals correctly;
* expose only required ports;
* avoid embedding secrets.

Use multi-stage builds when they materially reduce image size or attack surface.

---

# FRONTEND CONTAINERIZATION

Where the web application is deployed through containers, implement an appropriate production container strategy.

Distinguish between:

* build-time configuration;
* runtime configuration;
* public client configuration;
* server-only secrets.

Do not expose private infrastructure credentials through client bundles.

---

# WORKER CONTAINERIZATION

Where background workers exist, provide dedicated runtime definitions when they have materially different:

* startup commands;
* resource requirements;
* scaling behavior;
* health behavior.

Do not run unrelated worker workloads in the same container merely for convenience.

---

# LOCAL DEVELOPMENT STACK

Implement a reproducible local development environment for required infrastructure dependencies.

Support, as applicable:

* PostgreSQL;
* Redis;
* message/event infrastructure where required;
* object-storage-compatible local service where appropriate;
* search service where required;
* observability components only when local execution remains manageable.

Local development must not require production credentials.

Provide deterministic startup instructions.

---

# LOCAL ENVIRONMENT CONFIGURATION

Provide safe example configuration files or templates.

Never commit:

* actual secrets;
* real production credentials;
* private keys;
* cloud tokens.

Clearly distinguish:

* required variables;
* optional variables;
* development defaults;
* externally supplied secrets.

Validate required variables where tooling allows.

---

# NETWORKING FOUNDATION

Define the foundational network topology.

Consider:

* public ingress;
* private application networks;
* database isolation;
* Redis isolation;
* worker communication;
* object-storage access;
* search access;
* observability access;
* administrative access.

Stateful services must not be exposed directly to the public internet.

---

# KUBERNETES FOUNDATION

Where Kubernetes is part of the selected production architecture, implement the foundational manifests and/or Helm structure.

Support:

* namespaces;
* service accounts;
* deployments;
* services;
* config maps;
* secret references;
* ingress;
* resource requests;
* resource limits;
* health probes;
* pod disruption considerations;
* rolling deployments.

Do not hardcode cloud-specific secrets into manifests.

---

# DEPLOYMENT UNIT MODEL

Define separate deployment units where operational behavior differs.

At minimum evaluate:

* web;
* API;
* realtime gateway;
* worker;
* scheduler/periodic jobs where required.

The exact decomposition must follow the application architecture.

Do not create deployment units for every internal module.

---

# RESOURCE MANAGEMENT

Define:

* CPU requests;
* CPU limits;
* memory requests;
* memory limits;
* ephemeral-storage expectations where appropriate.

Avoid unlimited pods.

Do not choose arbitrary production values without documenting that they are starting capacity assumptions subject to measurement and tuning.

---

# HEALTH PROBES

Integrate with actual application health endpoints.

Define:

* liveness;
* readiness;
* startup probes where useful.

Readiness must prevent traffic from reaching instances that cannot safely serve requests.

Do not use a simple TCP probe when application-level health behavior exists and is more meaningful.

---

# AUTOSCALING FOUNDATION

Where Kubernetes is used, provide autoscaling foundations appropriate to:

* API workload;
* realtime workload;
* workers.

Do not apply CPU-only autoscaling to every workload blindly.

For workers, consider queue depth or another meaningful workload metric where the observability/platform architecture supports it.

Do not claim autoscaling behavior has been load-validated unless it actually has.

---

# POSTGRESQL INFRASTRUCTURE

Define infrastructure for the PostgreSQL service appropriate to the selected cloud model.

Where managed PostgreSQL is selected, implement infrastructure-as-code for:

* instance/service;
* network access;
* security;
* backup configuration;
* parameter configuration where required;
* monitoring;
* credentials through secret management.

Where self-managed PostgreSQL is intentionally selected, define:

* persistent storage;
* high availability where appropriate;
* backup;
* upgrade strategy;
* monitoring.

Do not move application schema management into infrastructure code.

Database schema migrations remain an application/release responsibility.

---

# REDIS INFRASTRUCTURE

Define Redis infrastructure appropriate to the selected architecture.

Support:

* private network access;
* authentication;
* TLS where supported;
* persistence mode appropriate to its role;
* availability;
* monitoring;
* memory limits;
* eviction policy appropriate to workload.

Distinguish:

* cache data;
* ephemeral coordination;
* presence;
* rate-limiting state.

Do not assume Redis is the durable system of record for messages.

---

# OBJECT STORAGE

Define secure object storage for media.

Configure:

* private bucket/container;
* encryption;
* lifecycle rules;
* versioning where appropriate;
* access policy;
* logging/monitoring where appropriate;
* CORS only when required;
* CDN integration boundary where applicable.

Do not make user media publicly readable by default.

Do not embed storage credentials in application configuration that reaches clients.

---

# SEARCH INFRASTRUCTURE

Where Elasticsearch/OpenSearch is part of the architecture, provide the infrastructure foundation required for the selected environment.

Support:

* private access;
* authentication;
* encryption;
* resource configuration;
* monitoring;
* lifecycle where applicable.

Do not create arbitrary search indexes in infrastructure code unless that is explicitly part of the selected deployment strategy.

Search mappings remain an application/search concern unless the repository intentionally manages them through IaC.

---

# EVENT INFRASTRUCTURE

Where Kafka/Redpanda is selected, provide the foundational infrastructure integration.

Define:

* broker connectivity;
* private networking;
* authentication;
* encryption;
* persistence;
* basic monitoring;
* environment configuration.

Do not hardcode topic creation assumptions if application-level topic management is the established project convention.

Do not claim production broker capacity has been validated without actual load testing.

---

# QUEUE INFRASTRUCTURE

Where BullMQ or equivalent is used, ensure infrastructure properly supports the queue backend.

Define:

* Redis connectivity;
* worker deployment;
* resource requirements;
* scaling;
* observability.

Do not create duplicate queue systems.

---

# INGRESS AND LOAD BALANCING

Define ingress/load balancing appropriate to the selected cloud and Kubernetes architecture.

Support:

* HTTPS;
* TLS termination;
* HTTP routing;
* WebSocket upgrade;
* appropriate timeouts;
* request-size limits;
* health integration;
* security policies.

Realtime traffic must not use HTTP timeouts that are incompatible with long-lived WebSocket connections.

---

# TLS

Define secure TLS handling.

Where certificates are externally managed:

* define integration;
* do not create fake certificates;
* do not commit private keys.

Where cert-manager or equivalent is selected, configure it appropriately.

Do not disable certificate validation in production.

---

# DOMAIN AND DNS

Define deployment-ready DNS integration where appropriate.

Do not claim that the production domain is configured unless the external DNS environment is actually accessible and the change has been verified.

Infrastructure-as-code may provide the configuration necessary to manage DNS, but the completion report must distinguish code from actual provisioning.

---

# SECRETS MANAGEMENT

Integrate with an appropriate secret-management system.

Possible mechanisms include:

* cloud secret manager;
* Vault;
* Kubernetes secrets sourced from an external secret system.

Never commit:

* passwords;
* tokens;
* database credentials;
* signing keys;
* provider credentials.

Environment templates must contain placeholders or variable names only.

---

# IAM AND LEAST PRIVILEGE

Define least-privilege roles for:

* application runtime;
* workers;
* deployment pipeline;
* infrastructure provisioning;
* observability;
* administrative operations.

Do not grant application workloads unrestricted cloud permissions.

Separate:

* infrastructure provisioning identity;
* deployment identity;
* runtime identity.

---

# SECURITY GROUPS / FIREWALLS

Restrict network access so:

* databases accept only required application traffic;
* Redis accepts only required internal traffic;
* search accepts only required internal traffic;
* brokers accept only required internal traffic;
* administrative access is tightly restricted.

Do not expose stateful infrastructure directly to the internet.

---

# ENVIRONMENT MODEL

Implement clear support for:

* local;
* development;
* CI/test;
* staging;
* production.

Where applicable prepare the structure for:

* disaster recovery;
* secondary region.

Each environment must have:

* isolated configuration;
* isolated secrets;
* isolated state where appropriate;
* clear deployment targeting.

Do not reuse production credentials in development.

---

# CI/CD FOUNDATION

Implement CI workflows appropriate to the repository.

At minimum validate:

* dependency installation;
* linting;
* type checking;
* unit tests;
* integration tests where practical;
* build;
* container build;
* infrastructure formatting/validation;
* IaC security checks where tooling exists.

Do not deploy automatically to production without an explicit deployment strategy.

---

# CONTAINER IMAGE SECURITY

Add image-level security practices such as:

* non-root runtime;
* pinned/base-image strategy;
* dependency scanning where available;
* minimal runtime images;
* no embedded secrets;
* reproducible builds where practical.

Do not claim an image is vulnerability-free merely because a scan was run.

Report material scan findings accurately.

---

# DEPENDENCY AND IaC SCANNING

Where supported by repository tooling, integrate checks for:

* dependency vulnerabilities;
* container vulnerabilities;
* IaC misconfiguration;
* exposed secrets.

Do not make CI silently ignore critical findings.

Define appropriate failure policies according to severity.

---

# OBSERVABILITY FOUNDATION

Implement foundational infrastructure observability.

Support:

* metrics collection;
* application logs;
* container logs;
* node/platform metrics where relevant;
* tracing transport;
* basic dashboards;
* alerts for critical availability failures.

Ensure correlation IDs and trace context can flow from application telemetry into infrastructure diagnostics where supported.

---

# LOG AGGREGATION

Provide a consistent path for centralized logs.

Logs should include enough metadata to identify:

* environment;
* service;
* instance/pod;
* timestamp;
* severity;
* correlation/request ID.

Do not expose application secrets or private message content in centralized logs.

---

# METRICS

Collect meaningful infrastructure metrics for:

* API availability;
* HTTP latency;
* WebSocket connections;
* worker throughput;
* queue depth;
* PostgreSQL health;
* Redis health;
* search health where applicable;
* CPU;
* memory;
* storage.

Do not create large volumes of meaningless high-cardinality metrics.

---

# TRACING

Provide infrastructure support for distributed tracing using the project's selected OpenTelemetry architecture.

Ensure:

* trace propagation;
* service identity;
* appropriate sampling strategy;
* secure transport;
* trace retention considerations.

Do not enable uncontrolled full-rate tracing in production without considering cost and storage.

---

# ALERTING FOUNDATION

Define initial alerts for:

* service unavailable;
* readiness failures;
* high error rates;
* excessive latency;
* database health;
* Redis failures;
* queue backlog;
* worker failures;
* storage exhaustion;
* certificate expiry where practical.

Alerts should be actionable.

Do not alert on every transient error.

---

# BACKUP FOUNDATION

Define foundational backup configuration for:

* PostgreSQL;
* object storage metadata/configuration where applicable;
* infrastructure state;
* critical configuration.

Backups must be:

* encrypted;
* access-controlled;
* retained according to defined policy.

Do not claim successful restore until a restore has actually been tested.

---

# INFRASTRUCTURE STATE

If Terraform or another IaC system is used:

* configure remote state appropriately;
* secure state storage;
* enable state locking where supported;
* prevent credentials from entering state unnecessarily;
* separate environment state appropriately.

Do not commit local provider credentials or state files containing sensitive information.

---

# DEPLOYMENT SAFETY

Configure deployment behavior for:

* rolling updates;
* readiness gates;
* graceful shutdown;
* connection draining;
* worker shutdown;
* migration compatibility.

Do not implement deployment configurations that terminate active WebSocket connections unnecessarily during every rollout if graceful draining is technically possible.

---

# DATABASE DEPLOYMENT ORDER

Infrastructure and deployment documentation must distinguish application release steps from database migration steps.

Where backward-compatible schema evolution is required:

1. deploy compatible schema/application changes;
2. run migrations according to the repository's migration policy;
3. validate;
4. complete rollout.

Do not assume all database migrations are instantly reversible.

---

# INFRASTRUCTURE SECURITY

Apply:

* least privilege;
* network isolation;
* encryption in transit;
* encryption at rest;
* secure defaults;
* secret management;
* image hardening;
* audit logging;
* restricted administrative access.

Do not disable security controls merely to simplify local development.

Use explicit development-only overrides where required.

---

# COST AWARENESS

Infrastructure should be commercially realistic.

Avoid:

* unnecessary always-on services;
* excessive observability retention;
* overprovisioned initial resources;
* redundant infrastructure without operational justification;
* unnecessary cross-region traffic.

Document important cost drivers.

Do not sacrifice security or reliability solely to minimize cost.

---

# DOCUMENTATION

Create/update infrastructure documentation covering:

* local development;
* environment model;
* architecture;
* deployment prerequisites;
* configuration;
* secrets;
* IaC usage;
* containerization;
* Kubernetes usage where applicable;
* CI/CD;
* observability;
* backup basics;
* operational troubleshooting.

Documentation must distinguish:

* infrastructure-as-code;
* generated configuration;
* actual provisioned resources.

---

# TESTING AND VALIDATION

Validate, as applicable:

* Docker builds;
* local development startup;
* Terraform formatting;
* Terraform validation;
* Kubernetes manifest validation;
* Helm template rendering;
* CI workflow syntax;
* container startup;
* health probes;
* environment configuration;
* secret references;
* network configuration;
* IaC security scanning.

Do not claim a production deployment succeeded if the infrastructure was only rendered or validated locally.

---

# INFRASTRUCTURE TESTING

Where practical, test:

* container startup;
* service discovery;
* database connectivity;
* Redis connectivity;
* application readiness;
* worker startup;
* WebSocket ingress behavior;
* configuration injection.

Use ephemeral/local infrastructure for tests where feasible.

Do not require production credentials for repository-level validation.

---

# COMPLETION REPORT

After implementation, report:

* files created;
* files modified;
* files deleted, if any;
* containerization changes;
* local-development infrastructure;
* Terraform/IaC changes;
* Kubernetes/Helm changes;
* networking;
* PostgreSQL infrastructure;
* Redis infrastructure;
* object storage;
* search/event infrastructure where applicable;
* ingress/TLS;
* IAM/secrets;
* CI/CD;
* observability;
* backup configuration;
* security scanning;
* tests and validation executed;
* actual resources provisioned, if any;
* resources only defined as IaC;
* unresolved issues;
* external blockers.

Explicitly distinguish repository implementation from external cloud provisioning.

---

# DEFINITION OF DONE

This infrastructure milestone is complete only when:

* the repository has a coherent infrastructure structure;
* production-oriented containers exist where applicable;
* local development infrastructure is reproducible;
* environment/configuration conventions are defined;
* infrastructure-as-code foundation exists;
* networking boundaries are defined;
* application deployment foundations exist;
* PostgreSQL infrastructure is defined;
* Redis infrastructure is defined;
* object storage is defined;
* ingress/load balancing is defined;
* TLS integration is defined;
* secret-management integration is defined;
* least-privilege IAM foundations exist;
* resource limits are defined;
* health/readiness integration is implemented;
* autoscaling foundations exist where appropriate;
* CI validates application and infrastructure changes;
* foundational observability is configured;
* backup foundations are defined;
* security validation is configured where tooling permits;
* documentation reflects the actual infrastructure;
* no credentials or secrets are hardcoded;
* no intentional implementation gaps remain within scope.

This Definition of Done applies only to **Infrastructure Prompt — Volume 1**.

It does not require full multi-region disaster recovery, global traffic management, or complete production operations.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as **Infrastructure Prompt — Volume 1 only**.

Inspect the repository before making changes.

Implement only the foundational containerization, local environment, infrastructure-as-code, networking, deployment, stateful-service, secrets, security, CI/CD, backup, and observability scope defined here.

Do not implement application business logic.

Do not redesign backend, frontend, or mobile functionality.

Do not invent another infrastructure volume or project phase.

Do not depend on previous AI responses.

Use the repository and actually available project architecture/contracts as the source of truth.

Preserve compatible existing infrastructure.

Implement real production-grade infrastructure code within scope.

Run appropriate validation.

Inspect the final diff.

Clearly distinguish infrastructure-as-code from actual external provisioning.

Provide the required completion report and accurately report what was implemented and verified.
