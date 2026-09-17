# WhatsApp-Style Messaging Platform — Frontend Prompt — Volume 3

## ROLE

You are the **Staff Frontend Engineer, UI/UX Engineer, Accessibility Engineer, Security Engineer, Performance Engineer, Administration-Interface Engineer, and QA Engineer** responsible for implementing the remaining production web experience for the **WhatsApp-style messaging platform** within this bounded frontend milestone.

This is a **bounded frontend implementation milestone**.

Operate with the combined responsibilities of:

* Staff Frontend Engineer
* Frontend Architect
* UI/UX Engineer
* Accessibility Engineer
* Security Engineer
* Performance Engineer
* Administration-Interface Engineer
* Reliability Engineer
* QA Engineer
* Technical Writer

Implement real, production-grade web functionality within the scope of this prompt.

Do not implement unrelated mobile, backend, infrastructure, or future functionality.

---

# PROJECT

The project is an independently engineered **production-grade, globally scalable, WhatsApp-style real-time communications platform**.

The web client technology direction is:

* Next.js;
* React;
* TypeScript;
* Tailwind CSS;
* accessible reusable UI components;
* production-grade server-state/data-fetching;
* client-state management appropriate to the application;
* authenticated realtime communication;
* secure API integration;
* automated testing.

The completed web application is intended to support:

* authentication;
* accounts and profiles;
* privacy controls;
* devices and sessions;
* conversations;
* groups;
* messaging;
* reactions;
* message editing and deletion;
* media;
* presence;
* typing indicators;
* notifications;
* search;
* blocking;
* reporting;
* administration;
* moderation;
* responsive experiences;
* accessibility;
* operationally robust client behavior.

This prompt implements the **remaining production web experience**, including account/privacy/settings surfaces, device/session management, group management UX, notification preferences, moderation/reporting administration interfaces where authorized, robust error/recovery states, performance hardening, and final web-client quality integration.

---

# CURRENT FRONTEND SCOPE

Implement:

* account settings;
* profile settings;
* privacy settings supported by backend contracts;
* security/session management;
* device/session visibility;
* session revocation;
* notification preferences;
* conversation/group settings;
* group administration UI;
* participant management UI;
* group role management where supported;
* leave/remove-group flows where supported;
* block-list management;
* report-status UI where authorized;
* moderation/admin interface foundations where the backend exposes authorized capabilities;
* application-level error/recovery surfaces;
* connection/degraded-state UX;
* account/session boundary handling;
* accessibility hardening;
* responsive hardening;
* performance optimization;
* client telemetry integration where appropriate;
* final frontend integration consistency;
* frontend regression testing;
* production build validation;
* frontend documentation.

This milestone completes the planned web-client functionality without implementing backend behavior.

---

# OUT-OF-SCOPE

Do not implement:

* backend business logic;
* backend schema changes unless an unavoidable client-contract adjustment is explicitly required and safely coordinated;
* mobile applications;
* production Kubernetes/Terraform infrastructure;
* push-provider infrastructure;
* search backend;
* moderation backend;
* analytics backend;
* end-to-end encryption;
* unsupported administrative operations;
* fake backend endpoints.

The frontend may integrate with existing backend contracts, but must not silently invent new server capabilities.

---

# SOURCE-OF-TRUTH MODEL

Inspect the actual repository before modifying it.

Use the repository and currently implemented APIs/contracts as the authoritative source for:

* authentication;
* account;
* profile;
* device/session;
* privacy;
* notifications;
* conversations;
* groups;
* membership;
* blocking;
* reporting;
* moderation;
* administration;
* realtime behavior.

Do not assume that a capability exists merely because it was described in an earlier prompt.

Do not reference previous AI conversations.

If a backend capability is unavailable, provide an accurate unavailable/unsupported state rather than faking it.

---

# IMPLEMENTATION DISCIPLINE

Before changing code:

1. Inspect the current application structure.
2. Identify existing settings pages and shared components.
3. Identify existing authentication/session handling.
4. Identify privacy and notification APIs.
5. Identify group-management APIs.
6. Identify moderation/admin APIs.
7. Identify current realtime connection-state handling.
8. Identify error/recovery conventions.
9. Identify current telemetry and testing.
10. Implement only this prompt's scope.

Preserve working functionality.

Avoid broad rewrites unless required by a demonstrable architectural issue.

---

# SETTINGS ARCHITECTURE

Establish a coherent settings experience organized into logical areas such as:

* profile;
* account/security;
* privacy;
* notifications;
* devices/sessions;
* conversations/groups;
* application preferences.

Do not duplicate settings logic across unrelated screens.

Use shared form, validation, loading, saving, success, and error patterns.

---

# PROFILE SETTINGS

Implement profile-management UI supported by the backend.

Support appropriate fields such as:

* display name;
* username/public identifier where applicable;
* profile image where supported;
* profile information allowed by the backend.

Each editable field must support:

* loading;
* current value;
* validation;
* saving;
* success confirmation;
* server error;
* retry.

Do not display internal database identifiers as editable profile fields.

---

# PRIVACY SETTINGS

Implement privacy controls supported by the backend.

Potential settings include:

* last-seen visibility;
* presence visibility;
* read receipts;
* profile visibility;
* notification privacy;
* blocked users.

Only expose settings actually supported by the backend contract.

Do not simulate settings that are purely client-side if authoritative server behavior is required.

---

# PRIVACY UX

Privacy changes must:

* clearly communicate the setting;
* provide meaningful states;
* prevent ambiguous partial saves;
* reflect the server-authoritative value after mutation;
* handle concurrent/stale changes safely.

Do not assume a local toggle means the server accepted the change.

---

# SECURITY AND SESSION SETTINGS

Implement a security/session management experience.

Support, where backend contracts exist:

* active devices;
* active sessions;
* device/platform information;
* last activity;
* session revocation;
* logout from another device;
* logout from current device.

Sensitive session operations should require appropriate confirmation.

Do not reveal secrets or raw tokens.

---

# DEVICE MANAGEMENT

Display safe device/session metadata.

Do not expose:

* refresh tokens;
* access tokens;
* private cryptographic keys;
* secret session material.

The UI must accurately distinguish:

* current device;
* other devices;
* revoked/inactive sessions where returned by the API.

---

# SESSION REVOCATION

Implement session/device revocation.

Support:

* selecting a session;
* confirmation;
* mutation;
* pending state;
* success state;
* server failure;
* refreshed authoritative list.

Do not assume local removal means the server session has been revoked.

---

# NOTIFICATION SETTINGS

Implement notification-preference UI against real backend contracts.

Support categories returned by the server, such as:

* direct-message notifications;
* group notifications;
* mention-related notifications;
* other supported product notifications.

Represent:

* loading;
* current server state;
* update pending;
* saved;
* failed;
* retry.

Do not hardcode categories the backend does not recognize.

---

# GROUP MANAGEMENT UI

Implement production group-management experiences supported by the backend.

Support, where available:

* group information;
* participant list;
* member roles;
* add/invite;
* remove member;
* promote/demote;
* group metadata changes;
* leave group;
* ownership/admin controls.

Every action must be permission-aware.

Do not expose group controls to users without the corresponding server-side authorization.

---

# GROUP ROLE EXPERIENCE

Render group roles consistently.

Where the backend exposes roles such as:

* owner;
* administrator;
* member;

the UI must:

* clearly display the current role;
* conditionally expose available controls;
* explain unavailable actions where useful.

Client-side role gating is for UX only.

The backend remains authoritative.

---

# GROUP MEMBER MANAGEMENT

Implement safe member-management interactions.

Handle:

* list loading;
* pagination where required;
* search/filter within members where supported;
* add;
* remove;
* role change;
* operation confirmation;
* optimistic/pessimistic mutation behavior according to risk;
* mutation failure;
* refreshed server state.

Do not allow destructive member operations to remain visually successful if the server rejects them.

---

# GROUP CONCURRENCY

Handle stale state scenarios.

For example:

* another administrator removes a member while the current screen is open;
* another administrator changes a role;
* the current user loses administrative privileges;
* the group is deleted or becomes inaccessible.

On conflict, reconcile with authoritative server state.

Do not continue exposing controls that the user no longer owns.

---

# BLOCK LIST MANAGEMENT

Implement a dedicated blocked-users experience.

Support:

* list blocked accounts;
* unblock;
* empty state;
* loading;
* errors;
* refresh.

Use server state as the source of truth.

Do not treat the local block state as authoritative.

---

# REPORT STATUS

Where backend contracts permit users to view their own reports, implement a safe report-status experience.

Display only information explicitly authorized by the API.

Do not expose:

* moderator identities;
* internal evidence;
* private moderation notes;
* privileged administrative information.

---

# MODERATION/ADMIN INTERFACE FOUNDATION

Where the current backend exposes authorized administrative APIs, implement the web foundation for those capabilities.

Support appropriate screens for:

* reports;
* moderation queues;
* restricted accounts;
* moderation actions;
* administrative audit views,

only where the backend actually provides these contracts.

Administrative UI must be inaccessible to unauthorized users.

Do not build fake moderation controls for APIs that do not exist.

---

# ADMINISTRATIVE AUTHORIZATION

Administrative pages must enforce:

* authenticated session;
* appropriate role/permission;
* server-authoritative authorization;
* safe failure behavior.

Never rely solely on route hiding.

An unauthorized API response must produce a clear access-denied state.

---

# ADMINISTRATIVE DATA HANDLING

Administrative interfaces must:

* use bounded pagination;
* avoid unrestricted client-side loading;
* hide unnecessary private data;
* avoid exposing secrets;
* support explicit filters;
* handle stale data;
* provide safe destructive-action confirmations.

Do not download entire moderation or audit datasets into the browser.

---

# AUDIT DISPLAY

Where authorized, provide a safe administrative audit-log view.

Support:

* actor;
* action;
* target;
* timestamp;
* reason/context where returned;
* correlation/request identifier where appropriate;
* filtering;
* pagination.

Do not expose security-sensitive internals unnecessarily.

---

# NOTIFICATION PRESENTATION

Complete the user-facing notification experience supported by the existing backend.

Where applicable implement:

* unread indicators;
* notification panel;
* notification item;
* read/unread state;
* notification preferences;
* notification-related empty/error states.

Do not invent provider-specific delivery states not returned by the backend.

---

# GLOBAL ERROR EXPERIENCE

Create a consistent application-wide error strategy.

Handle:

* network unavailable;
* API timeout;
* unauthorized;
* forbidden;
* not found;
* rate limited;
* validation failure;
* server error;
* realtime failure;
* synchronization failure;
* expired session.

Use meaningful recovery actions where possible.

Avoid generic "Something went wrong" messages when the application can safely explain the next action.

---

# DEGRADED CONNECTION EXPERIENCE

Represent degraded system conditions clearly.

Examples:

* disconnected;
* reconnecting;
* synchronization in progress;
* notification delivery unavailable;
* media processing unavailable;
* search unavailable.

Do not falsely claim that a feature is healthy when a required backend connection is unavailable.

Do not prevent unrelated functionality from working merely because one noncritical dependency is degraded.

---

# GLOBAL RECOVERY PATTERNS

Define reusable recovery components for:

* retry;
* refresh;
* reconnect;
* reload data;
* return to safe state.

Avoid implementing separate inconsistent retry UIs throughout the application.

---

# FORM ARCHITECTURE

Use consistent form behavior across settings and administrative interfaces.

Forms must support:

* initial loading;
* validation;
* dirty-state tracking where useful;
* submit;
* pending state;
* success;
* error;
* server validation;
* cancellation.

Prevent accidental navigation away from important unsaved changes where appropriate.

---

# RESPONSIVE HARDENING

Review all implemented web surfaces across:

* desktop;
* tablet;
* narrow mobile-web.

Pay particular attention to:

* settings navigation;
* group-management sheets/dialogs;
* attachment controls;
* search;
* notification panels;
* administrative tables;
* moderation actions;
* session management.

No critical action should depend on hover.

---

# ACCESSIBILITY HARDENING

Review and improve all frontend surfaces for:

* semantic structure;
* keyboard navigation;
* focus management;
* dialog focus trapping;
* screen-reader labels;
* live updates;
* error announcements;
* accessible tables;
* accessible menus;
* accessible settings controls;
* reduced motion;
* contrast.

Realtime UI updates must not create disruptive screen-reader announcements for every low-value event.

Use appropriate announcement priority.

---

# PERFORMANCE HARDENING

Measure and improve:

* initial route loading;
* hydration cost;
* large settings screens;
* conversation-list rendering;
* message timeline rendering;
* realtime event updates;
* administrative tables;
* search results;
* notification panels.

Avoid unnecessary client-side JavaScript for static content.

Use code splitting where justified.

Do not move server-authoritative data into redundant global stores merely to optimize perceived architecture.

---

# CLIENT TELEMETRY

Where a telemetry system is already provided, integrate safe client-side operational metrics.

Relevant signals may include:

* route performance;
* API error rates;
* realtime reconnect rates;
* synchronization failures;
* upload failures;
* search failures;
* frontend crashes.

Do not collect:

* message bodies;
* passwords;
* access tokens;
* private notification content;
* sensitive moderation evidence.

Respect privacy requirements.

---

# ACCOUNT SWITCHING AND SECURITY BOUNDARIES

Where account switching or logout behavior permits it, ensure private state is cleared appropriately.

After logout or account change:

* clear sensitive server state;
* clear private client caches;
* close realtime connections;
* remove account-specific subscriptions;
* reset relevant client state.

Do not allow a new account to momentarily display the previous account's private conversation data.

---

# STALE DATA MANAGEMENT

Settings and administration views must detect and handle stale data where the backend provides appropriate versions/timestamps.

After mutations:

* invalidate/refetch affected state;
* reconcile realtime updates;
* avoid rendering stale permissions as current.

Do not rely indefinitely on cached authorization-sensitive data.

---

# SECURITY

Protect administrative and account-management interfaces against:

* XSS;
* unsafe URLs;
* token leakage;
* accidental secret rendering;
* unauthorized privileged actions;
* stale permissions;
* cross-account cache contamination;
* insecure client-side persistence.

Never render server-provided HTML without explicit sanitization.

Never place sensitive tokens in URLs.

---

# SERVER-AUTHORITATIVE SECURITY

The frontend must never treat a hidden button or disabled control as the primary security mechanism.

For every sensitive operation:

* hide or disable unauthorized controls for UX;
* still expect the backend to enforce authorization;
* handle server-side denial correctly.

---

# TESTING

Implement comprehensive tests for this milestone.

## Settings

Test:

* profile update;
* privacy update;
* notification preferences;
* validation;
* server errors;
* stale-state reconciliation.

## Sessions

Test:

* active-session display;
* revoke;
* current-device handling;
* unauthorized access.

## Groups

Test:

* authorized management;
* unauthorized controls;
* member operations;
* role changes;
* stale admin permissions;
* concurrent updates.

## Blocking

Test:

* blocked list;
* unblock;
* authoritative refresh.

## Administration

Where applicable test:

* access control;
* report lists;
* moderation actions;
* audit views;
* pagination;
* unauthorized states.

## Errors

Test:

* network failure;
* API failure;
* forbidden;
* unauthorized;
* rate limiting;
* reconnect;
* synchronization failure.

## Security boundaries

Test:

* account switching;
* logout cleanup;
* cache isolation;
* administrative route protection.

## Accessibility

Test:

* keyboard navigation;
* dialog focus;
* menu accessibility;
* form labels;
* live announcements;
* table semantics.

---

# REGRESSION TESTING

Run the complete relevant frontend test suite, not only tests created in this milestone.

Verify that earlier messaging functionality still works after adding:

* settings;
* group management;
* session management;
* notification preferences;
* administrative interfaces;
* performance changes.

Do not declare the milestone complete if this work regresses the existing chat experience.

---

# DOCUMENTATION

Update the frontend documentation to include:

* application settings architecture;
* privacy settings;
* session/device management;
* group-management behavior;
* notification preferences;
* moderation/admin interfaces;
* error/recovery patterns;
* account switching/logout boundaries;
* telemetry behavior;
* frontend testing.

Documentation must match the actual implementation.

---

# FINAL WEB-CLIENT QUALITY REVIEW

Perform a repository-wide frontend review after implementation.

Check:

* consistent terminology;
* consistent components;
* consistent forms;
* consistent loading states;
* consistent error states;
* consistent responsive behavior;
* consistent accessibility;
* no duplicate API clients;
* no duplicate state stores;
* no leaked secrets;
* no unsafe HTML rendering;
* no stale authorization assumptions;
* no cross-account cache contamination.

Do not redesign the entire application merely for stylistic preference.

---

# NO FAKE FUNCTIONALITY

Do not create:

* fake settings persistence;
* fake moderation results;
* fake session revocation;
* fake notification preferences;
* fake audit data;
* fake backend responses;
* fake permissions.

If an API is unavailable, represent the unsupported state accurately.

---

# NO HARDCODED SECRETS

Never hardcode:

* credentials;
* provider tokens;
* API keys;
* signing secrets;
* private keys;
* production secrets.

Never expose server-only environment variables to the browser.

---

# VALIDATION

Before completion:

* run frontend tests;
* run regression tests;
* run type checking;
* run linting;
* run formatting;
* run production build;
* validate critical routes;
* validate session/logout cleanup;
* validate settings;
* validate groups;
* validate administrative authorization;
* validate responsive layouts;
* validate accessibility where tooling permits;
* inspect the final diff.

Verify no unrelated files were modified unnecessarily.

---

# COMPLETION REPORT

After implementation, report:

* files created;
* files modified;
* files deleted, if any;
* profile/settings changes;
* privacy changes;
* session/device management;
* notification settings;
* group-management UX;
* blocking/reporting UX;
* moderation/admin interfaces;
* audit views;
* error/recovery improvements;
* performance improvements;
* accessibility improvements;
* telemetry changes;
* tests added;
* tests executed;
* regression validation;
* build/type/lint validation;
* documentation changes;
* compatibility considerations;
* unresolved issues;
* backend/external blockers.

Do not claim functionality that was not actually implemented or verified.

---

# DEFINITION OF DONE

This frontend milestone is complete only when:

* profile and account settings are implemented where supported;
* privacy settings are implemented where supported;
* device/session management is implemented where supported;
* session revocation is implemented where supported;
* notification preferences are implemented where supported;
* group-management UX is implemented where supported;
* member and role management is implemented where supported;
* blocked-user management is implemented;
* report-status UX is implemented where authorized;
* administration/moderation interfaces are implemented where supported by real backend contracts;
* administrative authorization is enforced in the client and correctly handled by the server;
* error and degraded-state UX is consistent;
* account switching/logout boundaries are safe;
* accessibility is hardened;
* responsive behavior is hardened;
* performance is hardened;
* client telemetry is privacy-safe where used;
* the complete relevant frontend regression suite passes;
* the production build succeeds;
* documentation reflects actual behavior;
* no intentional implementation gaps remain within scope;
* the resulting web application is coherent with the existing backend and realtime contracts.

This Definition of Done applies only to **Frontend Prompt — Volume 3**.

It does not require implementation of mobile applications, infrastructure, or backend functionality.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as **Frontend Prompt — Volume 3 only**.

Inspect the repository before making changes.

Implement only the settings, privacy, session/device management, group-management, notification-preference, blocking/reporting, authorized administration, error/recovery, accessibility, performance, and final web-client quality scope defined here.

Do not implement mobile applications.

Do not redesign the backend.

Do not implement final production infrastructure.

Do not invent another frontend volume or project phase.

Do not depend on previous AI responses.

Use the repository and actually available backend contracts as the source of truth.

Preserve compatible existing behavior.

Implement real production-grade functionality within scope.

Run appropriate validation, including relevant regression tests.

Inspect the final diff.

Provide the required completion report and accurately report what was implemented and verified.
