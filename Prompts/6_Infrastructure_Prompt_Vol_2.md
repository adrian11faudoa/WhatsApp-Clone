# WhatsApp-Style Messaging Platform — Infrastructure Prompt — Volume 2

## ROLE

You are the **Cloud Architect, DevOps Engineer, Kubernetes Engineer, Reliability Engineer, Security Engineer, Database Infrastructure Engineer, Observability Engineer, Disaster Recovery Engineer, Performance Engineer, and QA Engineer** responsible for implementing the advanced production infrastructure for the **WhatsApp-style messaging platform**.

This is a **bounded infrastructure implementation milestone**.

Operate with the combined responsibilities of:

* Cloud Architect
* DevOps Engineer
* Kubernetes Engineer
* Platform Engineer
* Reliability Engineer
* Security Engineer
* Database Infrastructure Engineer
* Observability Engineer
* Disaster Recovery Engineer
* Performance Engineer
* QA Engineer
* Technical Writer

Implement real, production-grade infrastructure within the scope of this prompt.

Do not implement unrelated application business logic, frontend, mobile, or future infrastructure functionality.

---

# PROJECT

The project is an independently engineered **production-grade, globally scalable, WhatsApp-style real-time communications platform**.

The infrastructure supports:

* Next.js web;
* React Native/Expo mobile clients;
* NestJS backend services;
* realtime WebSocket gateways;
* PostgreSQL;
* Redis;
* event streaming where selected;
* background workers;
* object storage;
* media processing;
* search;
* notifications;
* observability;
* CI/CD;
* staging;
* production;
* disaster recovery.

The infrastructure technology direction is:

* Docker;
* Kubernetes where selected;
* Helm;
* Terraform or equivalent infrastructure-as-code;
* GitHub Actions or equivalent CI/CD;
* OpenTelemetry;
* Prometheus;
* Grafana;
* centralized structured logging;
* distributed tracing;
* cloud-managed stateful services where appropriate.

Use the repository's established cloud provider and infrastructure architecture.

Do not silently switch cloud providers.

---

# CURRENT INFRASTRUCTURE SCOPE

Implement the **advanced production infrastructure and operational-resilience layer**.

This milestone includes:

* production environment topology;
* high-availability application deployment;
* WebSocket scaling;
* worker scaling;
* advanced autoscaling;
* managed PostgreSQL high availability;
* Redis high availability;
* event infrastructure production configuration where selected;
* search infrastructure production configuration where selected;
* secure object-storage/media infrastructure;
* CDN integration;
* WAF/security-edge foundations;
* production secrets integration;
* workload identity/IAM hardening;
* advanced observability;
* dashboards;
* alerting;
* SLO-oriented telemetry;
* centralized log retention;
* distributed tracing;
* backup and restore automation;
* disaster-recovery foundations;
* deployment strategies;
* rollback strategy;
* infrastructure validation;
* operational runbooks.

This volume must take the foundational infrastructure and make it suitable for serious staging and production operation.

---

# OUT-OF-SCOPE

Do not implement:

* backend business logic;
* frontend application code;
* mobile application code;
* database domain migrations;
* fake cloud provisioning;
* unsupported cloud services;
* a complete global active-active architecture unless required by the selected architecture;
* a complete incident-management SaaS implementation;
* application-level moderation or analytics functionality.

Do not claim production capacity or availability has been proven without actual validation.

---

# SOURCE-OF-TRUTH MODEL

Inspect the repository first.

Treat actual infrastructure files as authoritative for what exists.

Inspect:

* Terraform;
* Helm;
* Kubernetes;
* Docker;
* CI/CD;
* environment configuration;
* monitoring;
* logging;
* network definitions;
* storage definitions;
* database configuration;
* Redis;
* search;
* event infrastructure;
* backup configuration.

Do not assume Infrastructure Prompt — Volume 1 was executed merely because it appears earlier in the prompt sequence.

Use the repository's actual state.

Preserve compatible infrastructure.

---

# IMPLEMENTATION DISCIPLINE

Before changes:

1. Inspect the current infrastructure implementation.
2. Identify cloud provider and deployment topology.
3. Identify existing environments.
4. Identify current application deployment units.
5. Identify stateful services.
6. Identify networking boundaries.
7. Identify current observability.
8. Identify backup/restore configuration.
9. Identify CI/CD behavior.
10. Implement only this milestone.

Do not rebuild the infrastructure from scratch when compatible foundations already exist.

---

# PRODUCTION ENVIRONMENT MODEL

Define production-oriented topology for:

* staging;
* production;
* disaster recovery/secondary region where the architecture requires it.

Each environment must have:

* isolated infrastructure state;
* isolated secrets;
* isolated networking;
* appropriate access controls;
* controlled deployment permissions;
* environment-specific resource sizing.

Production resources must never depend on development credentials.

---

# HIGH-AVAILABILITY APPLICATION TOPOLOGY

Ensure stateless application workloads can run across multiple failure domains where supported.

At minimum evaluate:

* multiple API replicas;
* multiple realtime gateway replicas;
* multiple workers;
* multiple web replicas where containerized;
* disruption budgets;
* topology spread;
* anti-affinity where appropriate.

Do not claim high availability merely because replica counts are greater than one.

Pods/instances must also be distributed appropriately.

---

# WEBSOCKET SCALING

The realtime system is a critical infrastructure workload.

Implement infrastructure support for:

* multiple WebSocket gateway replicas;
* sticky behavior only if the architecture actually requires it;
* shared realtime coordination;
* connection draining;
* graceful shutdown;
* appropriate idle/connection timeouts;
* load balancer WebSocket support;
* observability of connection counts.

Do not use infrastructure-level session affinity as a substitute for proper shared realtime coordination.

---

# CONNECTION DRAINING

During rolling deployments:

* stop accepting new realtime connections on terminating instances;
* allow existing connections to drain where practical;
* provide reconnect behavior;
* avoid message loss;
* respect shutdown timeouts.

The application must receive enough termination time to close connections gracefully.

---

# WORKER SCALING

Separate worker workloads where resource profiles differ.

Support scaling based on meaningful signals such as:

* queue depth;
* job latency;
* CPU;
* memory;
* media-processing demand.

Avoid CPU-only scaling for workloads where queue backlog is the actual bottleneck.

---

# MEDIA PROCESSING INFRASTRUCTURE

Where media workers are part of the architecture, support:

* isolated worker pools;
* appropriate CPU/memory;
* temporary storage;
* FFmpeg dependencies where selected;
* concurrency limits;
* queue-driven autoscaling;
* graceful shutdown;
* failure isolation.

Media processing must not starve critical API or realtime workloads.

---

# POSTGRESQL HIGH AVAILABILITY

Implement production-grade PostgreSQL infrastructure appropriate to the selected deployment model.

For managed PostgreSQL where applicable, configure:

* multi-zone/high-availability mode;
* automated backups;
* point-in-time recovery;
* encryption;
* monitoring;
* maintenance windows;
* connection security;
* parameter controls where needed.

For self-managed PostgreSQL, provide an actual HA architecture rather than a single persistent pod.

Application schema ownership remains outside infrastructure code.

---

# DATABASE CONNECTION MANAGEMENT

Support safe application connection scaling.

Consider:

* connection limits;
* connection pooling;
* PgBouncer or managed pooling where justified;
* worker connection behavior;
* migration connection behavior;
* failure/retry characteristics.

Do not allow autoscaling application replicas to overwhelm PostgreSQL connection capacity.

---

# DATABASE BACKUP AND PITR

Implement:

* automated backups;
* retention;
* point-in-time recovery where supported;
* encryption;
* backup monitoring;
* backup-failure alerts.

Document:

* recovery procedure;
* restore ordering;
* validation requirements.

Do not claim recoverability merely because backups are enabled.

---

# REDIS HIGH AVAILABILITY

Implement the appropriate Redis availability model.

Consider:

* managed Redis;
* replication;
* failover;
* multi-zone placement;
* TLS;
* authentication;
* memory limits;
* eviction policy;
* monitoring.

Redis durability configuration must match its actual responsibilities.

Do not over-engineer persistence for data that is intentionally ephemeral.

---

# EVENT STREAM INFRASTRUCTURE

Where Kafka/Redpanda is part of the selected architecture, provide production-oriented configuration for:

* broker availability;
* persistence;
* replication;
* authentication;
* encryption;
* monitoring;
* topic partition capacity;
* retention.

Do not create arbitrary partition counts without documenting the capacity assumptions.

Do not claim exact throughput guarantees without load testing.

---

# EVENT STREAM SECURITY

Restrict event infrastructure access.

Define:

* producer identities;
* consumer identities;
* least-privilege access;
* TLS;
* credential rotation;
* network restrictions.

Application services must not receive unrestricted administrative broker permissions.

---

# SEARCH INFRASTRUCTURE

Where Elasticsearch/OpenSearch is selected, configure production-oriented:

* multi-node availability where justified;
* storage;
* snapshots;
* encryption;
* authentication;
* resource limits;
* monitoring;
* access restrictions.

Search failure must not compromise the availability of durable messaging.

---

# OBJECT STORAGE PRODUCTION HARDENING

Secure media object storage with:

* private access;
* encryption;
* versioning where appropriate;
* lifecycle rules;
* access logging where justified;
* blocked public access;
* controlled CORS;
* CDN integration;
* secure deletion/lifecycle behavior.

Do not expose bucket-level credentials to clients.

---

# CDN

Where media or web delivery requires a CDN, implement the infrastructure integration.

Support:

* origin configuration;
* TLS;
* cache policy;
* compression where appropriate;
* signed access where needed;
* cache invalidation strategy;
* security headers.

Do not cache private user content publicly.

---

# WAF AND EDGE SECURITY

Where supported by the selected cloud architecture, configure WAF foundations for:

* common web attacks;
* bot/rate controls;
* request-size limits;
* suspicious traffic;
* managed rule groups where appropriate.

Do not rely on WAF alone for application authorization.

Avoid excessively aggressive rules that can block legitimate messaging traffic without monitoring.

---

# PRODUCTION IAM

Harden workload and deployment identities.

Separate:

* application runtime;
* worker runtime;
* infrastructure provisioning;
* CI deployment;
* human administration.

Use:

* workload identity;
* short-lived credentials;
* least privilege;
* explicit resource scopes.

Do not use long-lived static cloud credentials when short-lived identity mechanisms are available.

---

# SECRETS ROTATION

Implement the infrastructure required to support:

* secret rotation;
* database credential rotation;
* provider token rotation;
* TLS certificate lifecycle;
* CI credential rotation.

Do not embed secret values in Terraform variables, Kubernetes YAML, or GitHub Actions files.

Use references to external secret stores.

---

# PRODUCTION OBSERVABILITY

Expand observability from basic infrastructure metrics into operational production monitoring.

Track:

* request latency;
* error rate;
* realtime connection count;
* connection churn;
* message throughput;
* queue lag;
* worker latency;
* database saturation;
* Redis saturation;
* search latency;
* media processing latency;
* notification processing;
* infrastructure saturation.

Use consistent labels without creating uncontrolled metric cardinality.

---

# SERVICE LEVEL OBJECTIVES

Define measurable operational objectives where appropriate for:

* API availability;
* API latency;
* realtime connection availability;
* message acceptance;
* message synchronization;
* media processing;
* notification processing;
* search availability.

SLOs are engineering objectives.

Do not claim they have been achieved without measurement.

---

# DASHBOARDS

Create production dashboards covering at minimum:

* platform overview;
* API;
* realtime;
* database;
* Redis;
* workers/queues;
* media processing;
* search;
* infrastructure;
* deployment health.

Dashboards must be based on actual available telemetry.

Do not create decorative metrics that do not represent real system state.

---

# ALERTING

Implement actionable alerts for:

* service unavailability;
* readiness failure;
* elevated HTTP errors;
* elevated latency;
* WebSocket connection loss;
* database saturation;
* database failover;
* Redis failure;
* queue backlog;
* worker crash;
* media processing backlog;
* search failure;
* storage exhaustion;
* certificate expiration;
* backup failure;
* restore-validation failure where automation can detect it.

Avoid alert storms.

Use sensible evaluation windows and severities.

---

# LOG RETENTION

Define centralized logging retention according to:

* operational needs;
* privacy requirements;
* cost;
* compliance requirements if explicitly established.

Do not retain private message contents in logs.

Keep logs structured and queryable.

---

# DISTRIBUTED TRACING

Complete the production tracing architecture.

Trace:

* HTTP requests;
* database operations where appropriate;
* Redis;
* WebSocket operations;
* queues;
* event publication/consumption;
* media-processing jobs;
* external providers.

Use sampling appropriate to production cost.

Do not sample in a way that makes critical troubleshooting impossible.

---

# DEPLOYMENT STRATEGY

Implement production deployment controls for:

* rolling deployments;
* readiness gating;
* graceful shutdown;
* rollback;
* deployment verification.

Where justified, support:

* canary;
* blue/green;
* phased rollout.

Do not implement complex deployment patterns without an operational reason.

---

# APPLICATION MIGRATION COMPATIBILITY

Infrastructure deployment must support expand-and-contract application changes.

Avoid rollout sequences that require all application replicas to upgrade simultaneously.

Database migrations must remain compatible with rolling application versions where possible.

---

# ZERO-DOWNTIME CONSIDERATIONS

Design deployments so that:

* existing HTTP requests can finish;
* WebSocket clients can reconnect;
* workers finish or safely retry jobs;
* readiness prevents premature traffic;
* stateful services remain available.

Do not promise zero downtime if the infrastructure and application do not technically support it.

---

# DISASTER RECOVERY

Implement the infrastructure foundation for recovery from:

* application-region outage;
* database failure;
* object-storage failure;
* event infrastructure failure;
* Redis failure.

Define:

* recovery order;
* dependencies;
* required snapshots;
* configuration recovery;
* DNS/traffic recovery where applicable.

Do not implement a "DR" label without actual recovery procedures.

---

# RECOVERY POINT AND RECOVERY TIME OBJECTIVES

Define project-configurable RPO/RTO targets appropriate to the architecture.

Do not invent contractual commitments.

The infrastructure should expose the configuration and tooling necessary to measure or achieve the engineering targets.

---

# BACKUP RESTORE AUTOMATION

Where practical, automate periodic restore validation.

The restore test should verify:

* backup can be restored;
* database is readable;
* critical schema exists;
* application connectivity can be established;
* required infrastructure dependencies can be recreated.

Do not claim restore success without an actual restore test.

---

# INFRASTRUCTURE DRIFT DETECTION

Implement CI checks or scheduled validation for:

* Terraform drift where supported;
* Kubernetes configuration drift where relevant;
* unexpected resource changes;
* unauthorized production configuration changes.

Drift detection must not automatically overwrite live infrastructure without a controlled process.

---

# CI/CD PRODUCTION PIPELINE

Extend CI/CD to support controlled production release.

The pipeline should provide stages such as:

1. validation;
2. test;
3. build;
4. security checks;
5. image publishing;
6. staging deployment;
7. staging validation;
8. production approval;
9. production deployment;
10. post-deployment verification.

The exact workflow must match repository standards.

Do not automatically deploy production without the required approval model.

---

# RELEASE ARTIFACTS

Use immutable release artifacts where practical.

Production deployments should reference:

* immutable container image digests;
* versioned charts;
* versioned infrastructure modules.

Avoid deploying mutable `latest` tags to production.

---

# ROLLBACK

Define rollback procedures for:

* application deployments;
* Helm releases;
* container versions;
* configuration;
* infrastructure changes where safely reversible.

Database rollback must be treated carefully.

Do not assume destructive migrations are automatically reversible.

---

# SECURITY VALIDATION

Integrate appropriate automated checks for:

* IaC misconfiguration;
* container vulnerabilities;
* exposed secrets;
* dependency vulnerabilities;
* Kubernetes security posture;
* cloud permissions.

Define severity thresholds.

Do not silently suppress findings without documenting why.

---

# COST MONITORING

Provide infrastructure-level cost visibility where supported.

Monitor major cost drivers:

* compute;
* database;
* Redis;
* event streaming;
* object storage;
* CDN;
* search;
* observability;
* network transfer.

Do not optimize away critical reliability or security capabilities solely to reduce spending.

---

# OPERATIONAL RUNBOOKS

Create production runbooks for at least:

* API outage;
* realtime outage;
* database failover;
* Redis failure;
* queue backlog;
* media-processing backlog;
* search outage;
* notification provider outage;
* certificate problem;
* deployment rollback;
* backup restore.

Each runbook should contain:

* symptoms;
* diagnostics;
* immediate mitigation;
* recovery steps;
* validation;
* escalation conditions.

Do not invent infrastructure commands that do not correspond to the actual platform.

---

# SECURITY INCIDENT READINESS

Document infrastructure-level procedures for:

* compromised credentials;
* leaked secrets;
* suspicious production access;
* malicious traffic;
* compromised container image.

Define:

* credential revocation;
* rotation;
* containment;
* evidence preservation where applicable;
* recovery.

Do not create an elaborate incident-management system outside the prompt scope.

---

# CAPACITY MANAGEMENT

Define capacity signals and scaling thresholds for:

* API;
* WebSockets;
* workers;
* database;
* Redis;
* brokers;
* search;
* media processors.

Infrastructure configurations should expose tunable values instead of hardcoding assumptions into application code.

---

# LOAD AND RESILIENCE VALIDATION

Where the repository supports test environments, create infrastructure configuration suitable for:

* load tests;
* WebSocket connection tests;
* queue stress;
* media-processing load;
* database performance tests.

Do not claim production-scale validation unless it was actually run.

---

# FINAL INFRASTRUCTURE SECURITY REVIEW

Review all infrastructure changes for:

* public exposure;
* overly broad IAM;
* hardcoded secrets;
* unsafe network rules;
* unencrypted state;
* unrestricted storage;
* insecure CI permissions;
* privileged containers;
* missing health probes;
* missing resource limits;
* missing backups;
* missing alerts.

Correct issues within the current scope.

---

# DOCUMENTATION

Update infrastructure documentation covering:

* production topology;
* high availability;
* WebSocket scaling;
* database operations;
* Redis operations;
* event/search infrastructure;
* object storage;
* CDN;
* WAF;
* IAM;
* secrets;
* observability;
* deployment;
* rollback;
* disaster recovery;
* restore;
* incident runbooks;
* capacity management.

Documentation must distinguish repository configuration from actual external resource state.

---

# VALIDATION

Before completion, run applicable validation for:

* Terraform formatting;
* Terraform validation;
* IaC security scanning;
* Helm template rendering;
* Kubernetes schema validation;
* Kubernetes security validation;
* Docker builds;
* CI workflow syntax;
* configuration checks;
* secret scanning;
* infrastructure dependency consistency.

Where test environments exist, validate:

* application deployment;
* WebSocket ingress;
* readiness/liveness;
* worker execution;
* database connectivity;
* Redis connectivity;
* object storage;
* observability.

---

# COMPLETION REPORT

After implementation, report:

* files created;
* files modified;
* files deleted, if any;
* production topology changes;
* Kubernetes/Helm changes;
* Terraform/IaC changes;
* high-availability changes;
* WebSocket scaling;
* worker scaling;
* PostgreSQL HA;
* Redis HA;
* event infrastructure;
* search infrastructure;
* object storage;
* CDN;
* WAF;
* IAM;
* secret management;
* observability;
* dashboards;
* alerts;
* backups;
* restore validation;
* disaster-recovery configuration;
* CI/CD changes;
* release/rollback behavior;
* runbooks;
* security validation;
* tests executed;
* actual external resources provisioned, if any;
* infrastructure defined but not provisioned;
* unresolved issues;
* external blockers.

Never claim a recovery drill, production deployment, or cloud provisioning happened unless it actually did.

---

# DEFINITION OF DONE

This infrastructure milestone is complete only when:

* production environment topology is defined;
* application workloads are highly available where appropriate;
* WebSocket infrastructure supports horizontal scaling;
* worker infrastructure scales according to workload;
* PostgreSQL production HA is configured;
* backups and PITR are configured where supported;
* Redis production availability is configured;
* event infrastructure is production-configured where selected;
* search infrastructure is production-configured where selected;
* media object storage is securely configured;
* CDN integration exists where required;
* WAF/security-edge foundations are implemented where applicable;
* IAM is least-privilege;
* secrets support rotation;
* observability is production-grade;
* dashboards exist;
* actionable alerts exist;
* deployment and rollback are defined;
* disaster-recovery foundations exist;
* restore validation is implemented or accurately documented as an external operational requirement;
* drift/security validation is integrated;
* CI/CD supports controlled production releases;
* cost drivers are visible;
* operational runbooks exist;
* infrastructure documentation reflects actual configuration;
* no credentials or secrets are hardcoded;
* no intentional implementation gaps remain within scope.

This Definition of Done applies only to **Infrastructure Prompt — Volume 2**.

It does not require a fully operational multi-region active-active platform unless that architecture is explicitly required by the project.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as **Infrastructure Prompt — Volume 2 only**.

Inspect the repository before making changes.

Implement only the advanced production topology, high availability, scaling, security, observability, backup/recovery, deployment, CI/CD, and operational resilience scope defined here.

Do not implement application business logic.

Do not redesign backend, frontend, or mobile functionality.

Do not invent another infrastructure volume or project phase.

Do not depend on previous AI responses.

Use the repository and actual infrastructure architecture as the source of truth.

Preserve compatible infrastructure.

Implement real production-grade infrastructure code within scope.

Run appropriate validation.

Inspect the final diff.

Clearly distinguish infrastructure-as-code from externally provisioned resources.

Provide the required completion report and accurately report what was implemented and verified.
