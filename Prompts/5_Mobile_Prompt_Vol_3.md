# WhatsApp-Style Messaging Platform — Mobile Prompt — Volume 3

## ROLE

You are the **Staff Mobile Engineer, Mobile Architect, Security Engineer, Privacy Engineer, Accessibility Engineer, Performance Engineer, Push Notification Engineer, Administration-Interface Engineer, and QA Engineer** responsible for implementing the remaining production mobile experience for the **WhatsApp-style messaging platform**.

This is a **bounded mobile implementation milestone**.

Operate with the combined responsibilities of:

* Staff Mobile Engineer
* Mobile Architect
* React Native Engineer
* Expo Engineer
* Security Engineer
* Privacy Engineer
* Realtime Client Engineer
* Push Notification Engineer
* Accessibility Engineer
* Performance Engineer
* QA Engineer
* Technical Writer

Implement real, production-grade mobile functionality within the scope of this prompt.

Do not implement unrelated web, backend, infrastructure, or future mobile functionality.

---

# PROJECT

The project is an independently engineered **production-grade, globally scalable, WhatsApp-style real-time communications platform**.

The mobile client technology direction is:

* React Native;
* Expo;
* TypeScript;
* secure platform storage;
* typed REST integration;
* authenticated WebSocket communication;
* durable local state only where justified;
* offline/network resilience;
* push notifications;
* accessible native UI;
* automated testing.

The completed mobile applications are intended to support:

* authentication;
* profiles;
* conversations;
* groups;
* messaging;
* replies;
* reactions;
* editing;
* deletion;
* delivery/read state;
* presence;
* typing indicators;
* media;
* notifications;
* search;
* privacy;
* blocking;
* reporting;
* group administration;
* device/session management;
* notification preferences;
* account lifecycle management.

This prompt implements the **remaining production mobile experience**, including search, privacy/settings, device/session management, group-management UX, blocking/reporting, notification preferences, account security, application recovery behavior, accessibility hardening, performance hardening, and final mobile regression integration.

---

# CURRENT MOBILE SCOPE

Implement:

* mobile search;
* search result navigation;
* privacy settings;
* profile/account settings;
* notification preferences;
* device/session management;
* session revocation;
* blocked-user management;
* reporting flows;
* group settings;
* group participant management;
* group role management where supported;
* group leave/remove flows where supported;
* administrative/moderation mobile surfaces only where explicitly exposed by backend contracts;
* account switching and secure logout cleanup;
* application-level error/recovery flows;
* degraded-connection UX;
* stale-state reconciliation;
* accessibility hardening;
* responsive/native layout hardening;
* performance and memory hardening;
* privacy-safe client telemetry where available;
* final mobile regression validation;
* production build validation;
* documentation.

This milestone completes the planned mobile client scope.

---

# OUT-OF-SCOPE

Do not implement:

* backend logic;
* backend schema changes;
* web application;
* final cloud infrastructure;
* Kubernetes/Terraform;
* backend search;
* backend moderation;
* backend analytics;
* unsupported administrative APIs;
* fake moderation functionality;
* end-to-end encryption;
* unrelated native functionality.

Use the actual repository and available backend contracts.

Where a capability is not supported, present an accurate unavailable state.

---

# SOURCE-OF-TRUTH MODEL

Inspect the current mobile repository before making changes.

Use the repository and currently available backend contracts as the authority for:

* authentication;
* accounts;
* profiles;
* privacy;
* notifications;
* devices;
* sessions;
* conversations;
* groups;
* membership;
* blocking;
* reporting;
* moderation;
* search;
* realtime;
* synchronization.

Do not assume previous AI-generated prompts were executed.

Do not depend on another conversation.

Do not invent endpoints, permissions, or response structures that are not available.

---

# IMPLEMENTATION DISCIPLINE

Before implementation:

1. Inspect the current mobile application.
2. Identify current navigation.
3. Identify authentication/session architecture.
4. Identify profile/settings screens.
5. Identify privacy APIs.
6. Identify group-management contracts.
7. Identify blocking/reporting contracts.
8. Identify search APIs.
9. Identify device/session APIs.
10. Identify notification-preference APIs.
11. Identify current error/recovery patterns.
12. Implement only this prompt's scope.

Preserve compatible behavior.

Avoid broad rewrites unless clearly required for correctness, security, or maintainability.

---

# SEARCH EXPERIENCE

Implement mobile search against the backend search contract.

Support:

* search entry;
* query validation;
* debounce/cancellation;
* loading;
* result list;
* result pagination;
* empty state;
* errors;
* retry;
* navigation to matching conversation/message.

Do not perform private-message search entirely on-device unless explicitly supported by the architecture.

---

# SEARCH NAVIGATION

When a user selects a search result:

1. verify authenticated state;
2. navigate to the authorized conversation;
3. synchronize the required history;
4. locate the matching message;
5. scroll/focus it;
6. visually identify it temporarily where appropriate.

Do not trust a search result to grant conversation access.

---

# SEARCH PERFORMANCE

Limit:

* query frequency;
* query length;
* concurrent requests;
* result memory.

Cancel obsolete searches when a new query supersedes them.

Do not retain large result sets unnecessarily.

---

# PROFILE AND ACCOUNT SETTINGS

Implement mobile settings supported by backend contracts.

Support:

* profile editing;
* account information where appropriate;
* logout;
* security/session controls;
* privacy;
* notifications.

Use consistent forms and server-authoritative state.

---

# PRIVACY SETTINGS

Implement supported privacy options such as:

* presence visibility;
* last-seen visibility;
* read receipts;
* profile visibility;
* other server-supported privacy controls.

Each setting must:

* display the current server value;
* validate changes;
* show pending state;
* confirm server success;
* recover from failure;
* refresh authoritative state.

Do not simulate backend privacy behavior locally.

---

# NOTIFICATION PREFERENCES

Implement notification settings supported by the backend.

Support:

* message notifications;
* group notifications;
* mention-related notifications;
* other server-defined notification categories.

Do not hardcode unsupported categories.

After changes, reconcile the state with the server.

---

# DEVICE AND SESSION MANAGEMENT

Implement safe UI for viewing active devices/sessions.

Display only safe metadata such as:

* device/platform;
* approximate activity information returned by the backend;
* session status;
* current-device designation.

Never display:

* raw access tokens;
* refresh tokens;
* private keys;
* session secrets.

---

# SESSION REVOCATION

Implement:

* session selection;
* confirmation;
* revocation request;
* pending state;
* success;
* failure;
* refreshed state.

If the current session is revoked, perform the appropriate secure logout flow.

Do not treat removing a session from the local list as sufficient proof of server revocation.

---

# ACCOUNT ISOLATION

Strengthen account isolation across:

* secure storage;
* persisted state;
* query caches;
* realtime subscriptions;
* notification navigation;
* pending operations.

When logging out:

* terminate authenticated realtime connections;
* clear account-specific server state;
* clear account-specific local state;
* clear pending operations that belong to the account where appropriate;
* unregister/deactivate notification registration according to backend semantics;
* reset navigation.

When a different account signs in, no previous account data may remain visible.

---

# GROUP SETTINGS

Implement mobile group-management UX supported by the backend.

Support where available:

* group metadata;
* member list;
* member search;
* add/invite;
* remove;
* role changes;
* ownership/admin controls;
* leave group.

Every operation must respect server-authoritative permissions.

---

# GROUP ROLE MANAGEMENT

Render roles consistently.

Where the backend exposes:

* owner;
* administrator;
* member;

the UI must expose only the actions permitted for the current user.

If privileges change remotely, refresh the group state and immediately adjust available controls.

---

# GROUP CONCURRENCY

Handle:

* remote member removal;
* remote role change;
* current-user demotion;
* group deletion;
* membership loss during an active screen.

On conflict, reconcile with the authoritative backend.

Do not leave stale privileged controls active indefinitely.

---

# BLOCKED-USERS MANAGEMENT

Implement:

* blocked-user list;
* unblock;
* loading;
* empty state;
* errors;
* refresh.

Block state must come from the backend.

Do not rely on a locally maintained block list for security decisions.

---

# REPORTING

Implement supported user/message/conversation reporting flows.

Support:

* category;
* optional reason;
* validation;
* confirmation;
* submission;
* success;
* failure;
* duplicate/rate-limit errors where returned.

Do not expose internal moderation evidence.

---

# REPORT HISTORY

If the backend exposes the current user's report history, provide a safe view.

Display only fields the backend authorizes.

Do not expose:

* moderator-only notes;
* private evidence;
* privileged identities;
* internal risk scores.

---

# MODERATION / ADMIN SURFACES

Where mobile administrative functionality is explicitly supported by real backend contracts, implement only the appropriate limited surfaces.

Examples:

* moderation queue;
* report review;
* account restriction;
* moderation action.

These screens must be strongly permission-gated.

Do not build an unsupported full administrator application.

---

# ADMIN SECURITY

All privileged mobile surfaces must:

* require authenticated sessions;
* verify server-side permissions;
* fail closed;
* avoid caching privileged data longer than necessary;
* clear privileged state at logout/account switch.

Never trust local role flags as authorization.

---

# ERROR AND RECOVERY ARCHITECTURE

Implement consistent mobile recovery for:

* API errors;
* authentication expiration;
* synchronization failure;
* WebSocket failure;
* search failure;
* media failure;
* notification registration failure;
* stale settings;
* permission changes.

Provide recovery actions such as:

* retry;
* refresh;
* reconnect;
* reauthenticate;
* return to a safe screen.

Avoid repeated automatic retries that can amplify failures.

---

# DEGRADED-STATE UX

Represent conditions such as:

* offline;
* reconnecting;
* synchronization pending;
* service unavailable;
* search unavailable;
* media processing delayed.

Do not block unrelated parts of the application because one noncritical subsystem is degraded.

---

# PERMISSION CHANGES

Handle platform permission changes made outside the application.

Examples:

* notification permission revoked in system settings;
* photo-library access changed;
* camera permission changed;
* microphone permission changed.

Refresh permission state at appropriate lifecycle boundaries.

Do not assume permissions remain unchanged after the first prompt.

---

# ACCESSIBILITY HARDENING

Review the complete mobile application for:

* screen-reader labels;
* logical reading order;
* touch target sizes;
* modal accessibility;
* dynamic text/state announcements;
* accessible forms;
* accessible settings controls;
* accessible search;
* accessible group management;
* accessible media;
* reduced motion.

Important realtime state should be announced appropriately without overwhelming assistive technologies.

---

# PERFORMANCE HARDENING

Review:

* startup time;
* navigation transitions;
* large conversation histories;
* settings screens;
* search results;
* group member lists;
* notification navigation;
* realtime event processing;
* local persistence;
* memory usage.

Avoid:

* unnecessary global state;
* repeated network requests;
* redundant cache copies;
* oversized navigation params;
* retaining large media objects in memory.

---

# MEMORY AND RESOURCE CLEANUP

Verify cleanup of:

* WebSocket subscriptions;
* event listeners;
* timers;
* upload handlers;
* media resources;
* stale queries;
* large cached datasets;
* background lifecycle listeners.

Do not leak listeners when screens mount/unmount repeatedly.

---

# TELEMETRY

Where client telemetry already exists, add safe operational signals such as:

* screen performance;
* API error rates;
* reconnect frequency;
* synchronization failures;
* search failures;
* notification registration failures;
* crash/error categories.

Do not send:

* message bodies;
* private conversation content;
* access tokens;
* refresh tokens;
* private cryptographic material;
* privileged moderation evidence.

---

# SECURITY

Protect against:

* token leakage;
* account-switch leakage;
* unauthorized admin surfaces;
* insecure deep links;
* stale permissions;
* unsafe file/document opening;
* private data in logs;
* private data in telemetry;
* notification payload abuse.

Treat all server-provided URLs and navigation values as untrusted until safely validated.

---

# TESTING

Implement comprehensive mobile tests.

## Search

Test:

* debouncing;
* cancellation;
* loading;
* pagination;
* navigation;
* authorization failure;
* errors.

## Settings

Test:

* profile changes;
* privacy changes;
* notification preferences;
* stale-state recovery;
* validation.

## Sessions

Test:

* device list;
* session revocation;
* current-session handling;
* logout cleanup.

## Groups

Test:

* authorized controls;
* unauthorized controls;
* member management;
* role changes;
* stale permissions;
* membership loss.

## Blocking

Test:

* blocked list;
* unblock;
* refresh;
* error handling.

## Reporting

Test:

* validation;
* submission;
* success;
* failure;
* rate limits.

## Administration

Where applicable test:

* privileged navigation;
* permission checks;
* moderation actions;
* state refresh.

## Account isolation

Test:

* logout;
* account switch;
* cache cleanup;
* realtime cleanup;
* notification-state cleanup.

## Accessibility

Test:

* screen-reader labels;
* focus order;
* touch targets;
* dialogs;
* forms;
* settings;
* search.

---

# REGRESSION TESTING

Run the relevant complete mobile test suite.

Verify that this milestone does not regress:

* authentication;
* messaging;
* media;
* realtime;
* synchronization;
* notifications;
* account isolation.

A new settings or administration screen must not destabilize the core chat application.

---

# DOCUMENTATION

Update mobile documentation with:

* search behavior;
* privacy settings;
* device/session management;
* notification preferences;
* group management;
* blocking/reporting;
* moderation surfaces;
* error/recovery model;
* account-isolation behavior;
* telemetry/privacy behavior;
* testing and release validation.

Documentation must reflect the implemented application.

---

# FINAL MOBILE QUALITY REVIEW

Perform a complete mobile repository review.

Check:

* consistent navigation;
* consistent forms;
* consistent error handling;
* consistent loading states;
* consistent permissions;
* consistent accessibility;
* consistent typography/components;
* secure storage boundaries;
* account isolation;
* resource cleanup;
* no duplicate API clients;
* no duplicate state stores;
* no leaked secrets;
* no unsupported fake functionality.

Do not redesign stable architecture merely for stylistic preference.

---

# NO FAKE FUNCTIONALITY

Do not create:

* fake search results;
* fake privacy persistence;
* fake session revocation;
* fake moderation actions;
* fake notification preferences;
* fake reports;
* fake backend permissions.

Represent unsupported operations explicitly.

---

# NO HARDCODED SECRETS

Never hardcode:

* API keys;
* authentication secrets;
* push credentials;
* storage credentials;
* private keys;
* production secrets.

Treat mobile binaries as inspectable by attackers.

---

# VALIDATION

Before completion:

* run unit tests;
* run component tests;
* run integration tests where configured;
* run TypeScript checks;
* run linting;
* run formatting;
* validate Expo builds/bundling;
* validate navigation;
* validate account settings;
* validate session handling;
* validate groups;
* validate search;
* validate blocking/reporting;
* validate accessibility where tooling permits;
* inspect the final diff.

Where a required iOS or Android environment is unavailable, clearly report what could not be verified.

---

# COMPLETION REPORT

After implementation, report:

* files created;
* files modified;
* files deleted, if any;
* search implementation;
* privacy/settings implementation;
* notification preferences;
* device/session management;
* session revocation;
* group-management UX;
* blocking;
* reporting;
* moderation/admin surfaces;
* error/recovery improvements;
* accessibility improvements;
* performance improvements;
* telemetry changes;
* tests added;
* tests executed;
* regression validation;
* build/type/lint validation;
* documentation changes;
* compatibility considerations;
* unresolved issues;
* platform/external blockers.

Do not claim functionality was verified if it was not actually tested or accessible.

---

# DEFINITION OF DONE

This mobile milestone is complete only when:

* mobile search is implemented;
* search navigation is implemented;
* privacy settings are implemented where supported;
* profile/account settings are implemented where supported;
* notification preferences are implemented where supported;
* device/session management is implemented;
* session revocation is implemented;
* account isolation is hardened;
* group settings are implemented;
* member/role management is implemented where supported;
* blocking is implemented;
* reporting is implemented;
* authorized moderation/admin surfaces are implemented where supported;
* error/recovery UX is consistent;
* permission-state changes are handled;
* accessibility is hardened;
* performance and memory behavior are hardened;
* relevant regression tests exist and pass;
* production build validation succeeds where available;
* documentation reflects actual behavior;
* no intentional implementation gaps remain within scope;
* the complete mobile application remains compatible with the backend, realtime, synchronization, media, and notification contracts.

This Definition of Done applies only to **Mobile Prompt — Volume 3**.

It completes the planned mobile implementation scope.

---

# FINAL EXECUTION INSTRUCTION

Execute this prompt as **Mobile Prompt — Volume 3 only**.

Inspect the repository before making changes.

Implement only the search, settings, privacy, notification preferences, device/session management, group-management, blocking/reporting, authorized administration, recovery, accessibility, performance, and final mobile quality scope defined here.

Do not implement the web frontend.

Do not redesign the backend.

Do not implement final production infrastructure.

Do not invent another mobile volume or project phase.

Do not depend on previous AI responses.

Use the repository and actually available backend contracts as the source of truth.

Preserve compatible existing behavior.

Implement real production-grade functionality within scope.

Run appropriate validation, including relevant regression testing.

Inspect the final diff.

Provide the required completion report and accurately report what was implemented and verified.
