# Frontend Prompt — Volume 2 — Advanced Messaging, Media, Search, Notifications, Settings, Calling, and Production Hardening

## ROLE

You are the senior frontend engineering team responsible for completing the production-grade web application for an enterprise real-time communication platform.

Work directly against the existing repository.

This is one implementation phase of one coherent system. The repository is the source of truth for all existing frontend implementation, backend contracts, API contracts, WebSocket contracts, authentication behavior, domain models, UI conventions, and infrastructure assumptions.

Do not create a separate application.

Do not create a competing frontend architecture.

Inspect the repository before modifying anything.

Reuse compatible existing implementation and make the smallest safe changes required to complete this phase.

---

# 1. PLATFORM CONTEXT

The application is an original enterprise-grade real-time communication platform inspired by modern messaging products.

The web application already has its foundational architecture and core messaging experience.

This phase completes the advanced client capabilities, including:

* production media workflows;
* image/video/audio/document experiences;
* media upload progress;
* media processing states;
* advanced message interactions;
* search;
* notification preferences;
* browser notifications where supported;
* profile/settings;
* privacy controls;
* conversation controls;
* group administration;
* blocking/reporting;
* disappearing-message UI where supported;
* voice/video calling UI foundations;
* WebRTC client integration where backend contracts support it;
* call signaling;
* call states;
* production resilience;
* performance;
* accessibility;
* security;
* testing;
* deployment readiness.

Do not invent functionality that the backend does not support.

---

# 2. REPOSITORY-FIRST REQUIREMENT

Before changing anything:

1. Inspect the existing frontend.
2. Inspect the implementation from the previous frontend phase.
3. Inspect backend APIs.
4. Inspect OpenAPI contracts.
5. Inspect WebSocket/Socket.IO events.
6. Inspect synchronization contracts.
7. Inspect media contracts.
8. Inspect notification contracts.
9. Inspect search contracts.
10. Inspect call/signaling contracts.
11. Inspect authentication and authorization behavior.
12. Inspect existing UI/design system.
13. Inspect tests.
14. Inspect environment variables and configuration.

The actual repository determines existing behavior.

If something described here is already implemented correctly:

* reuse it;
* improve it only when required;
* do not rewrite it unnecessarily.

If the backend does not expose a capability:

* do not fake it;
* do not create a frontend-only version;
* integrate only what is actually supported.

---

# 3. ADVANCED MEDIA EXPERIENCE

Complete the media experience using the backend media contracts.

Support:

* image attachments;
* video attachments;
* audio attachments;
* voice messages;
* documents;
* thumbnails;
* previews;
* processing states;
* upload progress;
* retry;
* failed uploads;
* media access authorization;
* secure download/open behavior.

---

# 4. MEDIA ATTACHMENT FLOW

Implement the complete client workflow:

1. user selects media;
2. client performs basic validation;
3. client displays attachment preview;
4. client requests backend upload initialization;
5. client uploads using the backend-provided mechanism;
6. client tracks progress;
7. client handles cancellation where supported;
8. client confirms upload completion;
9. backend processing begins;
10. client receives or polls processing status according to actual contract;
11. client creates/sends the message;
12. UI reconciles with canonical server state.

Do not send raw files through the normal message JSON API if the backend architecture uses direct object-storage uploads.

---

# 5. MEDIA VALIDATION

Perform useful client-side validation for immediate UX:

* file size;
* supported type;
* obvious invalid extension;
* image dimensions where easily available;
* duration where available.

Client validation is only an optimization.

The backend remains authoritative.

If the backend rejects the file, display the server's normalized error appropriately.

---

# 6. UPLOAD PROGRESS

Provide reliable progress UI.

Represent:

* preparing;
* uploading;
* uploaded;
* processing;
* ready;
* failed;
* canceled.

Avoid displaying 100% upload progress as equivalent to media readiness.

Upload completion and media processing are separate states.

---

# 7. MEDIA RETRY

Allow retry when appropriate.

Retry behavior must:

* reuse safe idempotency semantics;
* avoid duplicate media objects;
* avoid duplicate messages;
* not restart expensive processing unnecessarily;
* respect backend expiration;
* provide a clear failure state.

Do not implement infinite retries.

---

# 8. IMAGE VIEWER

Implement a production-quality image viewer.

Support:

* preview;
* larger view;
* keyboard navigation where multiple images exist;
* close;
* zoom where appropriate;
* loading state;
* failure state.

Do not bypass authorization by constructing arbitrary S3 URLs.

Use backend-provided secure media access.

---

# 9. VIDEO PLAYER

Implement video playback according to backend-provided media variants.

Support:

* play/pause;
* seek;
* volume;
* fullscreen;
* loading;
* error;
* poster/thumbnail.

Do not assume every uploaded video has been transcoded into every browser-compatible format.

Use the actual available media variants.

---

# 10. AUDIO AND VOICE MESSAGES

Implement audio playback UI.

Support:

* play/pause;
* progress;
* duration;
* loading;
* failure;
* playback position.

For voice messages, provide a compact messaging-oriented presentation.

Do not expose unnecessary raw media URLs.

---

# 11. DOCUMENT MESSAGES

Implement document message presentation.

Display:

* filename;
* file size;
* file type;
* processing state;
* download/open action;
* unavailable/deleted state.

Do not trust filename extensions for security decisions.

---

# 12. MEDIA SECURITY

Never:

* expose permanent private storage URLs;
* trust client authorization;
* embed credentials;
* expose signed URLs unnecessarily;
* execute uploaded content;
* render unsafe document types blindly.

Use the backend's authorization and secure media-access contracts.

---

# 13. MESSAGE SELECTION

Implement message selection where supported.

Support:

* selecting one or multiple messages;
* selected-state UI;
* contextual actions;
* cancel selection.

Do not duplicate backend authorization rules.

The server remains authoritative for whether a selected action is allowed.

---

# 14. ADVANCED MESSAGE ACTIONS

Complete production UI for:

* reply;
* react;
* edit;
* delete for self;
* delete for everyone;
* forward;
* copy;
* retry;
* select.

Actions must reflect current server state.

Do not show actions that the backend will necessarily reject unless the UI is intentionally optimistic and handles rejection correctly.

---

# 15. FORWARDING

Implement forwarding using actual backend contracts.

Support:

1. selecting message(s);
2. selecting destination conversation(s);
3. previewing what will be forwarded;
4. confirming;
5. submitting;
6. handling success/failure.

Do not clone messages locally.

Forward through the backend so permissions and canonical IDs remain authoritative.

---

# 16. MESSAGE SEARCH

Complete the search experience.

Support:

* global search where supported;
* conversation-scoped search;
* text search;
* filters;
* sender filters;
* date filters;
* message-type filters;
* result pagination;
* navigation to matching message;
* highlighted matching context where safely supported.

Search results must come from the backend.

---

# 17. SEARCH RESULT NAVIGATION

When a user selects a search result:

* open the correct conversation;
* load the relevant message range;
* navigate to the message;
* visually highlight it temporarily;
* preserve normal conversation behavior.

If the message no longer exists or access is revoked:

* display the appropriate unavailable state;
* do not expose stale private content.

---

# 18. SEARCH PERFORMANCE

Use:

* debouncing;
* cancellation;
* cursor pagination;
* query caching where appropriate.

Do not issue a backend request for every keystroke.

Prevent excessive query sizes.

Handle slow or unavailable search services gracefully.

---

# 19. SEARCH PRIVACY

Never expose search results that the current user is not authorized to see.

The backend remains authoritative.

Do not cache private search results indefinitely.

Clear or invalidate sensitive results appropriately after:

* logout;
* authorization changes;
* membership changes;
* account changes.

---

# 20. NOTIFICATION PREFERENCES

Build the notification settings experience.

Support backend-defined controls such as:

* push notifications;
* message previews;
* conversation notifications;
* group notifications;
* notification sounds;
* muted conversations;
* notification categories.

Only expose settings actually supported by the backend.

---

# 21. BROWSER NOTIFICATIONS

Where browser support and product requirements allow:

* request permission intentionally;
* explain why permission is useful;
* register/update the device notification token through the backend;
* handle denied permission;
* handle permission changes;
* avoid repeated permission prompts.

Never assume browser notification permission is equivalent to backend registration.

---

# 22. NOTIFICATION DEEP LINKS

Notification payloads must navigate through safe application routes.

When a user opens a notification:

* authenticate if necessary;
* verify authorization;
* navigate to the appropriate conversation/message;
* synchronize state;
* handle deleted or unavailable content.

Do not trust arbitrary URLs contained in notification payloads.

---

# 23. PROFILE

Implement the user profile experience.

Support backend-defined functionality such as:

* avatar;
* display name;
* username;
* status/about;
* account information.

Media/avatar uploads must use the secure media pipeline.

Do not upload sensitive files directly to public storage.

---

# 24. SETTINGS

Implement a coherent settings area.

Organize settings into logical sections such as:

* account;
* profile;
* privacy;
* notifications;
* appearance;
* chats;
* storage/data;
* devices/sessions;
* security.

Only implement settings that correspond to actual backend contracts or legitimate client-only preferences.

---

# 25. PRIVACY SETTINGS

Implement privacy controls exposed by the backend.

Potential controls include:

* last-seen visibility;
* online status;
* read receipts;
* profile visibility;
* group-add permissions;
* media/privacy preferences.

The frontend must accurately represent server state.

Do not pretend a client-only setting provides server-side privacy.

---

# 26. BLOCKING

Implement user blocking/unblocking if supported.

When a user is blocked:

* update UI immediately where safe;
* synchronize with backend;
* update conversation behavior;
* respect presence/privacy changes;
* prevent unsupported interactions.

Handle real-time block state changes.

Do not rely solely on client filtering.

---

# 27. REPORTING

If reporting is supported by the backend, implement the reporting workflow.

Support:

* selecting a reason;
* optional supported context;
* confirmation;
* submission;
* success/failure.

Do not transmit more private message content than required by the backend contract.

---

# 28. GROUP ADMINISTRATION

Implement group-management UI according to backend capabilities.

Support where available:

* group name;
* group avatar;
* group description;
* member list;
* add member;
* remove member;
* promote/demote administrator;
* leave group;
* group permissions;
* group settings.

All mutations must use backend authorization.

---

# 29. MEMBERSHIP CHANGES

React to membership events in real time.

When the user:

* joins;
* leaves;
* is removed;
* is promoted;
* is demoted;
* loses access;

update the relevant UI and cache.

If access is revoked, remove protected data from active UI state.

---

# 30. CONVERSATION SETTINGS

Implement conversation-level controls where supported:

* mute;
* archive;
* pin;
* mark read/unread;
* delete conversation;
* clear conversation;
* notification settings.

Use backend-authoritative state.

---

# 31. DISAPPEARING MESSAGES

If the backend supports disappearing messages:

Implement UI for:

* enabling/disabling;
* selecting supported duration;
* displaying current state;
* explaining expiration;
* handling changes.

Do not implement deletion timers purely in the frontend.

The backend remains authoritative for expiration.

---

# 32. CALLING ARCHITECTURE

Implement the web client foundation for voice/video calling using the actual backend signaling contract.

Do not invent signaling events.

Support the conceptual lifecycle:

* call initiation;
* ringing;
* accepted;
* connecting;
* connected;
* reconnecting;
* ended;
* declined;
* missed;
* failed.

---

# 33. WEBRTC

Where the backend and architecture support WebRTC, implement browser WebRTC integration.

Support:

* `RTCPeerConnection`;
* local audio;
* local video;
* remote media;
* offer/answer;
* ICE candidates;
* connection state;
* media track management;
* device selection where supported.

Use secure browser APIs.

Do not transmit media through the application server unless that is explicitly part of the architecture.

---

# 34. CALL PERMISSIONS

Handle:

* microphone permission;
* camera permission;
* permission denial;
* device unavailable;
* device changes;
* browser restrictions.

Provide understandable UI.

Never silently activate microphone/camera.

---

# 35. CALL SIGNALING

Integrate with the existing authenticated real-time signaling channel.

Handle:

* incoming call;
* outgoing call;
* SDP offer;
* SDP answer;
* ICE candidate;
* call acceptance;
* rejection;
* cancellation;
* termination;
* timeout;
* connection failure.

Use the exact event envelope and event names defined by the repository.

---

# 36. CALL SECURITY

Validate:

* authenticated caller;
* target user;
* conversation relationship;
* block state;
* call permissions;
* signaling authorization.

Do not accept arbitrary peer identifiers from untrusted clients.

Use secure transport.

Never expose private signaling data unnecessarily.

---

# 37. CALL UI

Provide:

* incoming call screen;
* outgoing call screen;
* active call screen;
* call controls;
* mute;
* camera on/off;
* speaker/output selection where supported;
* end call;
* connection state;
* participant information.

For group calling, only implement functionality actually supported by the backend/media architecture.

---

# 38. CALL FAILURE HANDLING

Handle:

* permission denied;
* ICE failure;
* signaling failure;
* peer disconnect;
* network interruption;
* backend outage;
* browser incompatibility;
* device unavailable.

Provide clear recovery behavior.

Do not leave microphone/camera tracks active after a call ends.

---

# 39. CALL RESOURCE CLEANUP

On call termination:

* close peer connection;
* stop local tracks;
* remove remote tracks;
* clear signaling subscriptions;
* clear timers;
* reset call state;
* release device resources.

This cleanup must also happen on:

* navigation;
* component unmount;
* authentication loss;
* unexpected disconnect.

---

# 40. REAL-TIME RESILIENCE

The advanced frontend must remain robust under:

* duplicate events;
* out-of-order events;
* reconnects;
* stale tabs;
* browser suspension;
* multiple tabs;
* delayed API responses;
* API failures;
* WebSocket failure.

Never assume an event will arrive exactly once.

---

# 41. MULTI-TAB BEHAVIOR

Where appropriate, coordinate multiple browser tabs.

Avoid:

* duplicate push registration;
* duplicate WebSocket work where unnecessary;
* conflicting selected state;
* duplicated notifications.

Use browser-native coordination mechanisms only where justified and supported.

Do not create unnecessary complexity.

---

# 42. CACHE INVALIDATION

Ensure cached data is invalidated or updated after:

* logout;
* membership changes;
* blocking;
* profile updates;
* settings changes;
* conversation deletion;
* message deletion;
* authorization changes.

Private data must not remain accessible after session termination.

---

# 43. PERFORMANCE

Optimize the application for production-scale conversations.

Pay particular attention to:

* large message lists;
* media-heavy conversations;
* rapid real-time events;
* large group conversations;
* search;
* settings;
* WebRTC;
* reconnect storms.

Use virtualization where appropriate.

Avoid unnecessary rerenders.

Do not put rapidly changing ephemeral state into global server caches.

---

# 44. ACCESSIBILITY

Complete accessibility across advanced functionality.

Ensure:

* media controls are keyboard accessible;
* dialogs have correct focus management;
* menus are accessible;
* call controls are labeled;
* notification settings are accessible;
* search results are navigable;
* message actions are keyboard accessible;
* screen readers receive meaningful state updates.

Respect reduced motion.

---

# 45. RESPONSIVE ADVANCED UI

Verify advanced features on:

* desktop;
* tablet;
* mobile web.

Special attention:

* media viewer;
* attachment picker;
* message action menus;
* search;
* settings;
* group administration;
* incoming calls;
* active calls.

Avoid UI that becomes unusable because of browser viewport or virtual keyboard behavior.

---

# 46. ERROR RECOVERY

Every advanced workflow must have recovery.

Examples:

### Media

Retry upload or processing.

### Search

Retry request.

### Notifications

Retry registration or explain permission state.

### Settings

Retry failed mutation and preserve intended value.

### Group management

Show server rejection without corrupting local state.

### Calls

Provide retry/end-call recovery.

---

# 47. SECURITY REVIEW

Perform a frontend security audit.

Check for:

* XSS;
* unsafe URL handling;
* token leakage;
* private data persistence;
* authorization assumptions;
* insecure WebSocket handling;
* unsafe media rendering;
* malicious filenames;
* DOM injection;
* open redirects;
* untrusted notification payloads;
* WebRTC signaling abuse;
* sensitive logs.

Do not assume backend validation makes unsafe frontend behavior acceptable.

---

# 48. PRIVACY REVIEW

Verify that the frontend does not unnecessarily expose:

* message content;
* media URLs;
* notification payloads;
* tokens;
* user identifiers;
* private profile data;
* search history.

Review:

* local storage;
* session storage;
* IndexedDB;
* browser cache;
* logs;
* error reporting;
* analytics.

Persist private data only when explicitly required.

---

# 49. OBSERVABILITY

Complete frontend observability.

Track appropriate technical metrics:

* API failures;
* WebSocket failures;
* synchronization failures;
* media upload failures;
* media playback failures;
* search failures;
* notification registration failures;
* call setup failures;
* WebRTC connection failures;
* client exceptions.

Never record private message content or credentials unnecessarily.

---

# 50. TESTING — MEDIA

Add tests for:

* file validation;
* upload initialization;
* progress;
* completion;
* processing state;
* failure;
* retry;
* media authorization errors;
* image viewer;
* video player;
* audio player;
* document rendering.

---

# 51. TESTING — SEARCH

Test:

* search input;
* debounce;
* cancellation;
* results;
* pagination;
* filters;
* navigation to message;
* unavailable result;
* authorization changes;
* backend failure.

---

# 52. TESTING — SETTINGS

Test:

* loading settings;
* changing settings;
* failed mutations;
* rollback;
* synchronization;
* logout cleanup.

---

# 53. TESTING — GROUPS

Test:

* member loading;
* member changes;
* administrator actions;
* permission denial;
* real-time membership events;
* revoked access.

---

# 54. TESTING — CALLING

Test:

* incoming call;
* outgoing call;
* accept;
* reject;
* end;
* signaling events;
* permission denial;
* peer connection failure;
* cleanup;
* authentication loss.

Mock browser WebRTC APIs appropriately for unit/component tests.

Use real browser E2E tests where the repository's environment supports them.

---

# 55. END-TO-END TESTING

Expand E2E coverage to include at minimum:

1. authenticate;
2. open conversation;
3. send text;
4. receive real-time message;
5. upload image;
6. display image;
7. send document;
8. search messages;
9. edit message;
10. delete message;
11. react;
12. reply;
13. change notification setting;
14. change privacy setting;
15. manage group membership where supported;
16. reconnect;
17. synchronize;
18. initiate call where supported;
19. receive call;
20. end call;
21. logout;
22. verify protected state is cleared.

---

# 56. PRODUCTION BUILD

Ensure:

* production build succeeds;
* type checking succeeds;
* linting succeeds;
* tests pass;
* environment configuration is validated;
* no development-only assumptions remain;
* no mock provider remains on production paths;
* no placeholder components remain.

---

# 57. BROWSER COMPATIBILITY

Verify supported browsers according to the project's actual requirements.

Pay particular attention to:

* WebSocket;
* WebRTC;
* media playback;
* notifications;
* file APIs;
* responsive behavior.

Provide graceful fallback where a capability is unsupported.

---

# 58. CODE QUALITY

Maintain:

* strict TypeScript;
* reusable components;
* clear feature boundaries;
* predictable state ownership;
* testable services;
* minimal duplication;
* explicit error handling.

Avoid:

* giant components;
* giant Zustand stores;
* arbitrary global state;
* duplicated API clients;
* duplicated WebSocket connections;
* unsafe type assertions;
* `any`;
* hidden side effects.

---

# 59. IMPLEMENTATION ORDER

Unless repository dependencies require another safe order:

1. inspect current implementation;
2. complete media attachment workflow;
3. implement media upload progress;
4. implement media processing states;
5. implement image/video/audio/document UI;
6. implement advanced message actions;
7. implement forwarding;
8. complete search;
9. implement search navigation;
10. implement notification preferences;
11. implement browser notification integration;
12. implement profile;
13. implement settings;
14. implement privacy controls;
15. implement blocking/reporting where supported;
16. implement group administration;
17. implement conversation settings;
18. implement disappearing-message UI where supported;
19. implement call state architecture;
20. implement WebRTC integration where supported;
21. implement call signaling;
22. implement call UI;
23. implement call cleanup;
24. complete security review;
25. complete privacy review;
26. optimize performance;
27. add comprehensive tests;
28. run production build;
29. run complete validation;
30. inspect final diff.

---

# 60. VALIDATION

Before declaring this phase complete:

* run formatting;
* run lint;
* run TypeScript checking;
* run unit tests;
* run component tests;
* run integration tests;
* run E2E tests;
* run accessibility tests;
* run production build;
* verify authentication;
* verify API integration;
* verify WebSocket integration;
* verify media workflows;
* verify search;
* verify notifications;
* verify settings;
* verify group management;
* verify calling where supported;
* verify cleanup behavior.

Fix all actual failures.

Do not claim validation that was not executed.

---

# 61. FINAL REPOSITORY REVIEW

Inspect the final repository and verify:

* no duplicate implementations;
* no dead experimental code;
* no unused provider integrations;
* no placeholder components;
* no TODO/FIXME implementation gaps;
* no secrets;
* no debug logging;
* no private-data logging;
* no broken imports;
* no unnecessary dependency changes;
* no accidental modifications.

Preserve unrelated existing work.

---

# 62. FINAL COMPLETION REPORT

At the end report only what actually exists.

### Implemented

List completed functionality.

### Modified

List modified files.

### Created

List created files.

### Media

Describe implemented upload, processing, playback, and access behavior.

### Search

Describe implemented search functionality.

### Notifications

Describe notification functionality.

### Settings and Privacy

Describe implemented settings/privacy controls.

### Groups

Describe implemented group-management functionality.

### Calling

Describe actual calling/WebRTC functionality implemented.

### API

List endpoints integrated.

### WebSocket

List events integrated.

### Tests

List tests actually added and executed.

### Validation

List commands actually executed and their results.

### Remaining

List only genuine work that belongs to later phases.

Never claim implementation merely because a component or file was created.

---

# 63. NON-NEGOTIABLE RULES

Never:

* invent backend contracts;
* invent WebSocket events;
* invent WebRTC signaling;
* invent API capabilities;
* create fake media processing;
* create fake notifications;
* create fake search results;
* fake successful calls;
* bypass backend authorization;
* expose private media;
* store credentials insecurely;
* weaken privacy to simplify UI;
* persist private content unnecessarily;
* use placeholder implementations;
* use pseudo-code;
* leave TODO/FIXME implementation gaps;
* silently swallow errors;
* claim tests passed when they were not run;
* claim a feature is complete when only the UI exists;
* duplicate existing architecture;
* replace working code unnecessarily.

Every advanced frontend capability must integrate with the actual backend implementation.

The frontend must remain one coherent production-grade application.

All contracts must remain consistent across:

* REST;
* WebSockets;
* authentication;
* authorization;
* messages;
* conversations;
* receipts;
* presence;
* synchronization;
* media;
* notifications;
* search;
* groups;
* settings;
* calling;
* WebRTC;
* errors;
* pagination;
* IDs;
* timestamps.

The result must be production-ready, maintainable, secure, accessible, responsive, observable, testable, and consistent with the rest of the platfor

You are operating in Senior Engineering Team Mode.

Build the remaining production-ready web frontend for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The frontend must consume the established backend APIs, WebSocket contracts, authentication model, authorization model, media architecture, notification architecture, search architecture, call architecture, and synchronization contracts.

Do not redesign backend APIs.

Do not redesign the database.

Do not implement backend code.

Do not implement mobile code.

Do not implement infrastructure implementation code.

Do not generate Terraform.

Do not generate Kubernetes manifests.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Complete the production-ready web frontend for:

• Advanced messaging
• Groups
• Communities
• Stories/status
• Media
• Notifications
• Search
• Voice calls
• Video calls
• Group calls
• Device management
• Privacy
• Security
• Business accounts
• Administration
• Moderation
• Real-time synchronization
• Offline synchronization
• Accessibility
• Performance
• Production hardening

The frontend must remain consistent with the established architecture and backend contracts.

────────────────────────────────────────

TECHNOLOGY STACK

Framework:

• Next.js
• React
• TypeScript

Styling:

• Tailwind CSS
• shadcn/ui
• CSS variables

State:

• Zustand

Server State:

• TanStack Query

Forms:

• React Hook Form
• Zod

Real-Time:

• WebSockets
• Socket.IO client where appropriate

Animation:

• Framer Motion

Icons:

• Lucide React

Testing:

• Jest
• React Testing Library
• Playwright
• Accessibility testing tools

────────────────────────────────────────

ADVANCED MESSAGING EXPERIENCE

Complete the messaging experience.

Implement:

• Replies
• Forwarding
• Mentions
• Reactions
• Editing
• Deletion
• Message selection
• Multi-select actions
• Copy
• Retry failed messages
• Message information
• Delivery details
• Read details
• Context menus
• Keyboard shortcuts
• Message search
• Jump to message
• Scroll-to-referenced-message
• Unread separators
• Date separators

Support efficient rendering of large message histories.

Use virtualization where appropriate.

────────────────────────────────────────

MESSAGE COMPOSER

Complete the composer.

Support:

• Rich message composition where appropriate
• Emoji picker
• Mentions
• Reply mode
• Attachment picker
• Drag and drop
• Paste handling
• Voice-message preparation where browser capabilities permit
• Draft persistence
• Character limits
• Keyboard shortcuts
• Send state
• Retry state
• Upload state

The composer must behave correctly during:

• Offline mode
• Reconnection
• Slow uploads
• Failed requests
• WebSocket interruptions

────────────────────────────────────────

MESSAGE SYNCHRONIZATION

Integrate the frontend with backend synchronization.

Support:

• Initial conversation synchronization
• Incremental synchronization
• Delta updates
• Synchronization cursors
• Missed events
• Reconnection
• Message reconciliation
• Duplicate prevention
• Delivery-state reconciliation
• Read-state reconciliation

The frontend must not assume every WebSocket event arrives exactly once.

────────────────────────────────────────

OPTIMISTIC MESSAGE STATE

Implement:

• Temporary message IDs
• Pending messages
• Server reconciliation
• Failed messages
• Retry
• Duplicate prevention
• Ordering correction

Ensure optimistic state does not permanently diverge from server state.

────────────────────────────────────────

GROUP EXPERIENCE

Complete group interfaces.

Support:

• Group creation
• Group details
• Group avatar
• Group description
• Group settings
• Member management
• Member roles
• Add members
• Remove members
• Leave group
• Admin controls
• Group permissions
• Group notifications
• Group media

Conditionally display actions based on backend authorization.

Frontend visibility must never replace backend authorization.

────────────────────────────────────────

COMMUNITY EXPERIENCE

Implement:

• Community list
• Community overview
• Community groups
• Community channels where appropriate
• Community membership
• Community administrators
• Community settings
• Community announcements
• Community notifications

Provide clear navigation between:

• Direct conversations
• Groups
• Communities
• Channels

────────────────────────────────────────

STORIES / STATUS EXPERIENCE

Implement:

• Stories tray
• Story creation
• Story composer
• Text story
• Image story
• Video story
• Story viewer
• Story navigation
• Viewer list where authorized
• Story reactions where supported
• Story deletion
• Story privacy settings
• Expiration states

Support efficient story media loading.

Do not request content the backend does not authorize.

────────────────────────────────────────

MEDIA EXPERIENCE

Complete media interfaces for:

• Images
• Videos
• Audio
• Voice messages
• Documents
• Stickers
• GIFs
• Thumbnails

Implement:

• Upload progress
• Upload cancellation
• Upload retry
• Preview
• Media validation feedback
• Failed uploads
• Download states
• Media viewer
• Image zoom
• Video controls
• Audio controls
• Document preview where supported

Use direct object-storage upload contracts where provided by the backend.

────────────────────────────────────────

MEDIA VIEWER

Implement a production media viewer supporting:

• Images
• Videos
• Audio
• Documents where supported
• Gallery navigation
• Zoom
• Fullscreen
• Download where authorized
• Loading states
• Failure states
• Keyboard controls
• Accessible controls

Ensure private media does not become permanently exposed through frontend state.

────────────────────────────────────────

NOTIFICATION EXPERIENCE

Complete:

• Notification center
• Unread counts
• Notification grouping
• Notification preferences
• Security notifications
• Message notifications
• Call notifications
• Group notifications
• Community notifications
• Business notifications

Support:

• Read/unread
• Navigation to related resources
• Loading states
• Empty states
• Error states

────────────────────────────────────────

SEARCH EXPERIENCE

Complete search for:

• Users
• Contacts
• Groups
• Communities
• Conversations
• Business accounts
• Messages where permitted

Support:

• Instant search
• Autocomplete
• Search suggestions
• Recent searches
• Search history management
• Filters
• Result grouping
• Loading states
• Empty states
• Error states
• Keyboard navigation

Do not display search results the backend has not authorized.

────────────────────────────────────────

CALL EXPERIENCE

Implement production-ready call interfaces.

Support:

• Incoming call screen
• Outgoing call screen
• Ringing
• Connecting
• Active call
• Reconnecting
• Call failure
• Call ended
• Missed call

Voice:

• Microphone control
• Speaker/device selection
• Mute
• End call

Video:

• Camera toggle
• Camera preview
• Participant video
• Video layout
• Screen layout
• End call

Group calls:

• Participant grid
• Active speaker
• Participant states
• Call controls
• Reconnection states

Use the established WebRTC/signaling architecture.

Do not implement a parallel signaling protocol.

────────────────────────────────────────

CALL QUALITY UI

Reflect backend/client call state where appropriate.

Support graceful UI for:

• Poor network
• Reconnecting
• Microphone unavailable
• Camera unavailable
• Permission denied
• Device unavailable
• Connection failure

Do not expose sensitive diagnostics unnecessarily.

────────────────────────────────────────

DEVICE MANAGEMENT

Complete the device-management experience.

Support:

• Device list
• Device details
• Device platform
• Last activity
• Device naming
• Remote logout
• Device revocation
• Security alerts

Protect sensitive device information.

────────────────────────────────────────

PRIVACY SETTINGS

Complete privacy controls.

Support UI for:

• Last seen
• Online status
• Profile visibility
• Read receipts
• Group invitations
• Contact discovery
• Blocking
• Story privacy
• Notification privacy

Use backend-provided state as the source of truth.

────────────────────────────────────────

SECURITY SETTINGS

Implement:

• Password change
• Password reset
• MFA settings where supported
• Passkey management where supported
• Active sessions
• Devices
• Security notifications
• Account recovery

Provide strong confirmation flows for sensitive actions.

────────────────────────────────────────

OFFLINE EXPERIENCE

Complete browser offline handling.

Support:

• Offline indicator
• Pending messages
• Reconnection state
• Retry controls
• Cached conversations where appropriate
• Synchronization progress
• Network error recovery

Do not claim capabilities that browser APIs cannot reliably provide.

────────────────────────────────────────

REAL-TIME RESILIENCE

Implement robust WebSocket behavior.

Support:

• Automatic reconnection
• Exponential backoff
• Connection state
• Event replay/reconciliation
• Duplicate-event handling
• Missed-event synchronization
• Clean disconnect
• Authentication renewal

The UI must remain functional during temporary WebSocket outages.

────────────────────────────────────────

BUSINESS ACCOUNT EXPERIENCE

Implement frontend foundations for:

• Business profiles
• Business information
• Business hours
• Business users
• Business roles
• Business permissions
• Business conversations
• Business catalog foundations
• Automated-response configuration where supported

Keep business interfaces isolated from consumer account UI where appropriate.

────────────────────────────────────────

ADMINISTRATION EXPERIENCE

Implement administration frontend foundations.

Support:

• User management
• Account management
• Device investigation
• Group investigation
• Business management
• Reports
• Moderation
• Feature flags
• System settings
• Audit logs

Administrative routes must have frontend protections while relying on backend authorization as the final security boundary.

────────────────────────────────────────

MODERATION EXPERIENCE

Implement:

• Report queues
• Report details
• Moderation cases
• Case status
• Evidence references where permitted
• Administrative actions
• Appeals
• Audit history

Respect E2EE limitations.

Do not expose protected message content that the backend does not provide.

────────────────────────────────────────

FEATURE FLAGS

Integrate the frontend feature-flag system.

Support:

• Global flags
• Percentage rollout
• User targeting
• Region targeting
• Platform targeting
• Kill switches
• Experiments where appropriate

Sensitive flags must be evaluated server-side.

Frontend flags must not be treated as security controls.

────────────────────────────────────────

INTERNATIONALIZATION

Implement frontend localization architecture supporting:

• Multiple languages
• Locale detection
• Locale persistence
• Date formatting
• Time formatting
• Number formatting
• Relative timestamps
• RTL layouts
• Localized notifications
• Accessibility-friendly translations

Do not hard-code user-visible strings throughout feature modules.

────────────────────────────────────────

ACCESSIBILITY

Complete accessibility support targeting WCAG 2.2 AA.

Implement:

• Keyboard navigation
• Screen-reader support
• ARIA
• Focus management
• Focus restoration
• Accessible dialogs
• Accessible context menus
• Accessible message actions
• Accessible call controls
• Reduced motion
• High contrast
• Sufficient color contrast

Test accessibility continuously.

────────────────────────────────────────

RESPONSIVE DESIGN

Optimize for:

• Desktop
• Tablet
• Mobile browser
• Narrow windows
• Large displays

Ensure the core messaging experience remains usable across supported viewport sizes.

────────────────────────────────────────

PERFORMANCE

Optimize:

• Message virtualization
• Conversation virtualization
• Lazy loading
• Code splitting
• Dynamic imports
• Image optimization
• Media loading
• Query caching
• Prefetching
• Memoization
• Event batching
• WebSocket processing
• Rendering performance

Avoid unnecessary client-side state duplication.

────────────────────────────────────────

ERROR HANDLING

Provide UI for:

• Authentication errors
• Authorization errors
• Network errors
• WebSocket errors
• Upload failures
• Call failures
• Search failures
• Synchronization failures
• Server errors
• Offline state

Provide recovery actions where appropriate.

────────────────────────────────────────

STATE MANAGEMENT

Use TanStack Query for server state.

Use Zustand for client-owned state.

Maintain clear boundaries.

Do not duplicate the same server state in multiple independent stores.

Synchronize:

• Messages
• Conversations
• Notifications
• Groups
• Communities
• Stories
• Devices
• Search
• Calls

through appropriate query/cache mechanisms.

────────────────────────────────────────

API CLIENT

Complete the typed API client.

Support:

• Authentication
• Requests
• Responses
• Error normalization
• Request cancellation
• Retry
• Pagination
• Cursor pagination
• File uploads
• Download authorization
• Request correlation IDs

────────────────────────────────────────

WEBSOCKET CLIENT

Complete the WebSocket client architecture.

Support:

• Authentication
• Connection state
• Reconnection
• Subscriptions
• Message events
• Delivery events
• Read events
• Presence
• Typing
• Group events
• Community events
• Notification events
• Call signaling

Ensure cleanup of subscriptions to prevent memory leaks.

────────────────────────────────────────

THEMING

Complete:

• Light theme
• Dark theme
• System theme
• Theme persistence
• Accessible contrast
• Reduced motion

Use centralized design tokens.

────────────────────────────────────────

ANIMATION

Use Framer Motion where it improves UX.

Support:

• Page transitions
• Conversation transitions
• Drawers
• Dialogs
• Message interactions
• Story transitions
• Notifications
• Micro-interactions

Animations must respect reduced-motion preferences.

Do not animate excessively.

────────────────────────────────────────

TESTING

Generate comprehensive frontend tests.

UNIT TESTS

• Utilities
• State logic
• Validation
• Formatting
• Feature-flag behavior

COMPONENT TESTS

• Message components
• Composer
• Conversation list
• Group controls
• Story viewer
• Notifications
• Search
• Call controls
• Settings

INTEGRATION TESTS

• Authentication
• API client
• TanStack Query
• WebSocket client
• Media upload
• Synchronization

END-TO-END TESTS

• Registration
• Login
• Messaging
• Reactions
• Replies
• Editing
• Deletion
• Groups
• Communities
• Media
• Stories
• Calls
• Search
• Notifications
• Device management
• Privacy settings

ACCESSIBILITY TESTS

• Keyboard navigation
• Focus management
• Dialogs
• Forms
• Navigation
• Screen-reader semantics

PERFORMANCE TESTS

• Large conversation lists
• Large message histories
• High-frequency WebSocket events
• Large media uploads
• Reconnection
• Rendering performance

────────────────────────────────────────

DOCUMENTATION

Generate:

• Frontend architecture documentation
• Feature documentation
• Component documentation
• Design system documentation
• API usage documentation
• WebSocket usage documentation
• State management standards
• Accessibility standards
• Responsive design standards
• Testing standards
• Performance standards
• Internationalization standards

────────────────────────────────────────

PROJECT INDEX

Update the frontend Project Index with:

• Completed features
• Generated pages
• Generated layouts
• Components
• Hooks
• Stores
• Query integrations
• API integrations
• WebSocket integrations
• Media integrations
• Call integrations
• Tests
• Dependencies
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

Implement incrementally.

FRONTEND MILESTONE 1

Advanced messaging, message actions, synchronization, and reconciliation.

FRONTEND MILESTONE 2

Groups, communities, and membership management.

FRONTEND MILESTONE 3

Media, stories/status, and notification experience.

FRONTEND MILESTONE 4

Search, device management, privacy, and security settings.

FRONTEND MILESTONE 5

Voice calls, video calls, group calls, and WebRTC integration.

FRONTEND MILESTONE 6

Business accounts, administration, moderation, and feature flags.

FRONTEND MILESTONE 7

Internationalization, accessibility, offline behavior, and responsive hardening.

FRONTEND MILESTONE 8

Performance optimization, automated testing, security testing, and production readiness.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must compile before proceeding.

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never truncate code.

Never summarize code instead of generating it.

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

This volume completes the remaining web frontend.

Do not implement:

• Backend code
• Mobile code
• Kubernetes
• Terraform
• CI/CD infrastructure

Consume the established backend contracts exactly.

Do not redesign APIs or database structures.

────────────────────────────────────────

QUALITY BAR

Treat the frontend as a globally used production communication application.

Assume:

• Large conversation histories
• High-frequency real-time events
• Multiple active devices
• Unreliable networks
• Large media
• High notification volume
• Voice/video calls
• Strict accessibility requirements
• Strong privacy requirements
• Strict security requirements

Prioritize:

• Performance
• Accessibility
• Security
• Correct state synchronization
• Real-time responsiveness
• Resilience
• Maintainability
• Excellent user experience
• Production readine

You are operating in Senior Engineering Team Mode.

Build the remaining production-ready web frontend for an enterprise-scale global real-time messaging and communication platform comparable in architectural scope to WhatsApp.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, or confidential implementation details from WhatsApp or any other proprietary platform.

This prompt is completely independent and may be executed in a separate conversation.

The frontend must consume the established backend APIs, WebSocket contracts, authentication model, authorization model, media architecture, notification architecture, search architecture, call architecture, and synchronization contracts.

Do not redesign backend APIs.

Do not redesign the database.

Do not implement backend code.

Do not implement mobile code.

Do not implement infrastructure implementation code.

Do not generate Terraform.

Do not generate Kubernetes manifests.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Complete the production-ready web frontend for:

• Advanced messaging
• Groups
• Communities
• Stories/status
• Media
• Notifications
• Search
• Voice calls
• Video calls
• Group calls
• Device management
• Privacy
• Security
• Business accounts
• Administration
• Moderation
• Real-time synchronization
• Offline synchronization
• Accessibility
• Performance
• Production hardening

The frontend must remain consistent with the established architecture and backend contracts.

────────────────────────────────────────

TECHNOLOGY STACK

Framework:

• Next.js
• React
• TypeScript

Styling:

• Tailwind CSS
• shadcn/ui
• CSS variables

State:

• Zustand

Server State:

• TanStack Query

Forms:

• React Hook Form
• Zod

Real-Time:

• WebSockets
• Socket.IO client where appropriate

Animation:

• Framer Motion

Icons:

• Lucide React

Testing:

• Jest
• React Testing Library
• Playwright
• Accessibility testing tools

────────────────────────────────────────

ADVANCED MESSAGING EXPERIENCE

Complete the messaging experience.

Implement:

• Replies
• Forwarding
• Mentions
• Reactions
• Editing
• Deletion
• Message selection
• Multi-select actions
• Copy
• Retry failed messages
• Message information
• Delivery details
• Read details
• Context menus
• Keyboard shortcuts
• Message search
• Jump to message
• Scroll-to-referenced-message
• Unread separators
• Date separators

Support efficient rendering of large message histories.

Use virtualization where appropriate.

────────────────────────────────────────

MESSAGE COMPOSER

Complete the composer.

Support:

• Rich message composition where appropriate
• Emoji picker
• Mentions
• Reply mode
• Attachment picker
• Drag and drop
• Paste handling
• Voice-message preparation where browser capabilities permit
• Draft persistence
• Character limits
• Keyboard shortcuts
• Send state
• Retry state
• Upload state

The composer must behave correctly during:

• Offline mode
• Reconnection
• Slow uploads
• Failed requests
• WebSocket interruptions

────────────────────────────────────────

MESSAGE SYNCHRONIZATION

Integrate the frontend with backend synchronization.

Support:

• Initial conversation synchronization
• Incremental synchronization
• Delta updates
• Synchronization cursors
• Missed events
• Reconnection
• Message reconciliation
• Duplicate prevention
• Delivery-state reconciliation
• Read-state reconciliation

The frontend must not assume every WebSocket event arrives exactly once.

────────────────────────────────────────

OPTIMISTIC MESSAGE STATE

Implement:

• Temporary message IDs
• Pending messages
• Server reconciliation
• Failed messages
• Retry
• Duplicate prevention
• Ordering correction

Ensure optimistic state does not permanently diverge from server state.

────────────────────────────────────────

GROUP EXPERIENCE

Complete group interfaces.

Support:

• Group creation
• Group details
• Group avatar
• Group description
• Group settings
• Member management
• Member roles
• Add members
• Remove members
• Leave group
• Admin controls
• Group permissions
• Group notifications
• Group media

Conditionally display actions based on backend authorization.

Frontend visibility must never replace backend authorization.

────────────────────────────────────────

COMMUNITY EXPERIENCE

Implement:

• Community list
• Community overview
• Community groups
• Community channels where appropriate
• Community membership
• Community administrators
• Community settings
• Community announcements
• Community notifications

Provide clear navigation between:

• Direct conversations
• Groups
• Communities
• Channels

────────────────────────────────────────

STORIES / STATUS EXPERIENCE

Implement:

• Stories tray
• Story creation
• Story composer
• Text story
• Image story
• Video story
• Story viewer
• Story navigation
• Viewer list where authorized
• Story reactions where supported
• Story deletion
• Story privacy settings
• Expiration states

Support efficient story media loading.

Do not request content the backend does not authorize.

────────────────────────────────────────

MEDIA EXPERIENCE

Complete media interfaces for:

• Images
• Videos
• Audio
• Voice messages
• Documents
• Stickers
• GIFs
• Thumbnails

Implement:

• Upload progress
• Upload cancellation
• Upload retry
• Preview
• Media validation feedback
• Failed uploads
• Download states
• Media viewer
• Image zoom
• Video controls
• Audio controls
• Document preview where supported

Use direct object-storage upload contracts where provided by the backend.

────────────────────────────────────────

MEDIA VIEWER

Implement a production media viewer supporting:

• Images
• Videos
• Audio
• Documents where supported
• Gallery navigation
• Zoom
• Fullscreen
• Download where authorized
• Loading states
• Failure states
• Keyboard controls
• Accessible controls

Ensure private media does not become permanently exposed through frontend state.

────────────────────────────────────────

NOTIFICATION EXPERIENCE

Complete:

• Notification center
• Unread counts
• Notification grouping
• Notification preferences
• Security notifications
• Message notifications
• Call notifications
• Group notifications
• Community notifications
• Business notifications

Support:

• Read/unread
• Navigation to related resources
• Loading states
• Empty states
• Error states

────────────────────────────────────────

SEARCH EXPERIENCE

Complete search for:

• Users
• Contacts
• Groups
• Communities
• Conversations
• Business accounts
• Messages where permitted

Support:

• Instant search
• Autocomplete
• Search suggestions
• Recent searches
• Search history management
• Filters
• Result grouping
• Loading states
• Empty states
• Error states
• Keyboard navigation

Do not display search results the backend has not authorized.

────────────────────────────────────────

CALL EXPERIENCE

Implement production-ready call interfaces.

Support:

• Incoming call screen
• Outgoing call screen
• Ringing
• Connecting
• Active call
• Reconnecting
• Call failure
• Call ended
• Missed call

Voice:

• Microphone control
• Speaker/device selection
• Mute
• End call

Video:

• Camera toggle
• Camera preview
• Participant video
• Video layout
• Screen layout
• End call

Group calls:

• Participant grid
• Active speaker
• Participant states
• Call controls
• Reconnection states

Use the established WebRTC/signaling architecture.

Do not implement a parallel signaling protocol.

────────────────────────────────────────

CALL QUALITY UI

Reflect backend/client call state where appropriate.

Support graceful UI for:

• Poor network
• Reconnecting
• Microphone unavailable
• Camera unavailable
• Permission denied
• Device unavailable
• Connection failure

Do not expose sensitive diagnostics unnecessarily.

────────────────────────────────────────

DEVICE MANAGEMENT

Complete the device-management experience.

Support:

• Device list
• Device details
• Device platform
• Last activity
• Device naming
• Remote logout
• Device revocation
• Security alerts

Protect sensitive device information.

────────────────────────────────────────

PRIVACY SETTINGS

Complete privacy controls.

Support UI for:

• Last seen
• Online status
• Profile visibility
• Read receipts
• Group invitations
• Contact discovery
• Blocking
• Story privacy
• Notification privacy

Use backend-provided state as the source of truth.

────────────────────────────────────────

SECURITY SETTINGS

Implement:

• Password change
• Password reset
• MFA settings where supported
• Passkey management where supported
• Active sessions
• Devices
• Security notifications
• Account recovery

Provide strong confirmation flows for sensitive actions.

────────────────────────────────────────

OFFLINE EXPERIENCE

Complete browser offline handling.

Support:

• Offline indicator
• Pending messages
• Reconnection state
• Retry controls
• Cached conversations where appropriate
• Synchronization progress
• Network error recovery

Do not claim capabilities that browser APIs cannot reliably provide.

────────────────────────────────────────

REAL-TIME RESILIENCE

Implement robust WebSocket behavior.

Support:

• Automatic reconnection
• Exponential backoff
• Connection state
• Event replay/reconciliation
• Duplicate-event handling
• Missed-event synchronization
• Clean disconnect
• Authentication renewal

The UI must remain functional during temporary WebSocket outages.

────────────────────────────────────────

BUSINESS ACCOUNT EXPERIENCE

Implement frontend foundations for:

• Business profiles
• Business information
• Business hours
• Business users
• Business roles
• Business permissions
• Business conversations
• Business catalog foundations
• Automated-response configuration where supported

Keep business interfaces isolated from consumer account UI where appropriate.

────────────────────────────────────────

ADMINISTRATION EXPERIENCE

Implement administration frontend foundations.

Support:

• User management
• Account management
• Device investigation
• Group investigation
• Business management
• Reports
• Moderation
• Feature flags
• System settings
• Audit logs

Administrative routes must have frontend protections while relying on backend authorization as the final security boundary.

────────────────────────────────────────

MODERATION EXPERIENCE

Implement:

• Report queues
• Report details
• Moderation cases
• Case status
• Evidence references where permitted
• Administrative actions
• Appeals
• Audit history

Respect E2EE limitations.

Do not expose protected message content that the backend does not provide.

────────────────────────────────────────

FEATURE FLAGS

Integrate the frontend feature-flag system.

Support:

• Global flags
• Percentage rollout
• User targeting
• Region targeting
• Platform targeting
• Kill switches
• Experiments where appropriate

Sensitive flags must be evaluated server-side.

Frontend flags must not be treated as security controls.

────────────────────────────────────────

INTERNATIONALIZATION

Implement frontend localization architecture supporting:

• Multiple languages
• Locale detection
• Locale persistence
• Date formatting
• Time formatting
• Number formatting
• Relative timestamps
• RTL layouts
• Localized notifications
• Accessibility-friendly translations

Do not hard-code user-visible strings throughout feature modules.

────────────────────────────────────────

ACCESSIBILITY

Complete accessibility support targeting WCAG 2.2 AA.

Implement:

• Keyboard navigation
• Screen-reader support
• ARIA
• Focus management
• Focus restoration
• Accessible dialogs
• Accessible context menus
• Accessible message actions
• Accessible call controls
• Reduced motion
• High contrast
• Sufficient color contrast

Test accessibility continuously.

────────────────────────────────────────

RESPONSIVE DESIGN

Optimize for:

• Desktop
• Tablet
• Mobile browser
• Narrow windows
• Large displays

Ensure the core messaging experience remains usable across supported viewport sizes.

────────────────────────────────────────

PERFORMANCE

Optimize:

• Message virtualization
• Conversation virtualization
• Lazy loading
• Code splitting
• Dynamic imports
• Image optimization
• Media loading
• Query caching
• Prefetching
• Memoization
• Event batching
• WebSocket processing
• Rendering performance

Avoid unnecessary client-side state duplication.

────────────────────────────────────────

ERROR HANDLING

Provide UI for:

• Authentication errors
• Authorization errors
• Network errors
• WebSocket errors
• Upload failures
• Call failures
• Search failures
• Synchronization failures
• Server errors
• Offline state

Provide recovery actions where appropriate.

────────────────────────────────────────

STATE MANAGEMENT

Use TanStack Query for server state.

Use Zustand for client-owned state.

Maintain clear boundaries.

Do not duplicate the same server state in multiple independent stores.

Synchronize:

• Messages
• Conversations
• Notifications
• Groups
• Communities
• Stories
• Devices
• Search
• Calls

through appropriate query/cache mechanisms.

────────────────────────────────────────

API CLIENT

Complete the typed API client.

Support:

• Authentication
• Requests
• Responses
• Error normalization
• Request cancellation
• Retry
• Pagination
• Cursor pagination
• File uploads
• Download authorization
• Request correlation IDs

────────────────────────────────────────

WEBSOCKET CLIENT

Complete the WebSocket client architecture.

Support:

• Authentication
• Connection state
• Reconnection
• Subscriptions
• Message events
• Delivery events
• Read events
• Presence
• Typing
• Group events
• Community events
• Notification events
• Call signaling

Ensure cleanup of subscriptions to prevent memory leaks.

────────────────────────────────────────

THEMING

Complete:

• Light theme
• Dark theme
• System theme
• Theme persistence
• Accessible contrast
• Reduced motion

Use centralized design tokens.

────────────────────────────────────────

ANIMATION

Use Framer Motion where it improves UX.

Support:

• Page transitions
• Conversation transitions
• Drawers
• Dialogs
• Message interactions
• Story transitions
• Notifications
• Micro-interactions

Animations must respect reduced-motion preferences.

Do not animate excessively.

────────────────────────────────────────

TESTING

Generate comprehensive frontend tests.

UNIT TESTS

• Utilities
• State logic
• Validation
• Formatting
• Feature-flag behavior

COMPONENT TESTS

• Message components
• Composer
• Conversation list
• Group controls
• Story viewer
• Notifications
• Search
• Call controls
• Settings

INTEGRATION TESTS

• Authentication
• API client
• TanStack Query
• WebSocket client
• Media upload
• Synchronization

END-TO-END TESTS

• Registration
• Login
• Messaging
• Reactions
• Replies
• Editing
• Deletion
• Groups
• Communities
• Media
• Stories
• Calls
• Search
• Notifications
• Device management
• Privacy settings

ACCESSIBILITY TESTS

• Keyboard navigation
• Focus management
• Dialogs
• Forms
• Navigation
• Screen-reader semantics

PERFORMANCE TESTS

• Large conversation lists
• Large message histories
• High-frequency WebSocket events
• Large media uploads
• Reconnection
• Rendering performance

────────────────────────────────────────

DOCUMENTATION

Generate:

• Frontend architecture documentation
• Feature documentation
• Component documentation
• Design system documentation
• API usage documentation
• WebSocket usage documentation
• State management standards
• Accessibility standards
• Responsive design standards
• Testing standards
• Performance standards
• Internationalization standards

────────────────────────────────────────

PROJECT INDEX

Update the frontend Project Index with:

• Completed features
• Generated pages
• Generated layouts
• Components
• Hooks
• Stores
• Query integrations
• API integrations
• WebSocket integrations
• Media integrations
• Call integrations
• Tests
• Dependencies
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

Implement incrementally.

FRONTEND MILESTONE 1

Advanced messaging, message actions, synchronization, and reconciliation.

FRONTEND MILESTONE 2

Groups, communities, and membership management.

FRONTEND MILESTONE 3

Media, stories/status, and notification experience.

FRONTEND MILESTONE 4

Search, device management, privacy, and security settings.

FRONTEND MILESTONE 5

Voice calls, video calls, group calls, and WebRTC integration.

FRONTEND MILESTONE 6

Business accounts, administration, moderation, and feature flags.

FRONTEND MILESTONE 7

Internationalization, accessibility, offline behavior, and responsive hardening.

FRONTEND MILESTONE 8

Performance optimization, automated testing, security testing, and production readiness.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must compile before proceeding.

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never truncate code.

Never summarize code instead of generating it.

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

This volume completes the remaining web frontend.

Do not implement:

• Backend code
• Mobile code
• Kubernetes
• Terraform
• CI/CD infrastructure

Consume the established backend contracts exactly.

Do not redesign APIs or database structures.

────────────────────────────────────────

QUALITY BAR

Treat the frontend as a globally used production communication application.

Assume:

• Large conversation histories
• High-frequency real-time events
• Multiple active devices
• Unreliable networks
• Large media
• High notification volume
• Voice/video calls
• Strict accessibility requirements
• Strong privacy requirements
• Strict security requirements

Prioritize:

• Performance
• Accessibility
• Security
• Correct state synchronization
• Real-time responsiveness
• Resilience
• Maintainability
• Excellent user experience
• Production readiness
