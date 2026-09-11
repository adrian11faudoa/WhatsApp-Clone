# WHATSAPP — FRONTEND VOLUME 2

## ROLE

Act as a Principal Frontend Architect, Staff Frontend Engineer, Staff TypeScript Engineer, Staff Real-Time Systems Engineer, Staff UI/UX Engineer, Staff Accessibility Engineer, Staff Performance Engineer, Staff Security Engineer, and Senior QA Engineer working as one production engineering team.

Your responsibility is to implement the **advanced messaging experience and real-time communication UX** for the WhatsApp web application.

Do not act as a teacher. Do not provide tutorials instead of implementation. Inspect the repository, understand its current implementation, and directly implement the required production functionality.

The resulting implementation must support a global communication platform operating at very large scale with high message throughput, large conversation histories, large groups, millions of concurrent connections, intermittent connectivity, and continuous real-time updates.

---

# PROJECT

Build the advanced web messaging experience for a production-grade global real-time communication platform comparable in capability and usability to WhatsApp, Telegram, Signal, Messenger, Discord, and Teams.

The scope of this volume is the **complete interactive messaging experience built on top of the repository's existing frontend foundation**.

Implement production-quality support for:

* sending and receiving messages
* optimistic message states
* message delivery states
* read states
* replies
* message editing
* message deletion
* reactions
* forwarding
* pinning
* saved messages
* message selection
* contextual actions
* conversation search
* message search
* unread handling
* typing indicators
* presence
* group messaging UX
* group member interactions
* real-time reconciliation
* offline/reconnect behavior
* message pagination
* scroll restoration
* message virtualization
* notification behavior
* accessibility
* performance
* security
* automated testing

Do not create fake backend behavior.

Consume the actual API and WebSocket contracts available in the repository.

---

# TECHNOLOGY DIRECTION

Use the existing repository technology and conventions.

The intended web stack is:

* Next.js
* React
* TypeScript
* Tailwind CSS
* TanStack Query
* Zustand
* React Hook Form
* Zod
* Socket.IO client or the repository's established WebSocket client
* REST/OpenAPI APIs
* modern browser APIs
* accessible semantic HTML

Use existing shared UI components and utilities whenever appropriate.

Do not introduce redundant dependencies.

---

# SOURCE OF TRUTH

The repository is the authoritative source for:

* frontend architecture
* routes
* components
* API contracts
* WebSocket events
* domain models
* authentication
* conversation models
* message models
* group models
* design system
* state management
* testing
* environment configuration

Inspect the repository before modifying anything.

Do not assume that an endpoint or event exists.

Do not regenerate unchanged files.

Do not replace existing working implementations unnecessarily.

Do not redesign backend contracts merely to simplify frontend implementation.

---

# 1. IMPLEMENTATION OBJECTIVES

Prioritize:

1. correctness
2. real-time consistency
3. user experience
4. accessibility
5. security
6. performance
7. maintainability
8. resilience
9. testability
10. scalability

The messaging interface must remain usable during:

* high message volume
* rapid message arrival
* network loss
* WebSocket reconnect
* duplicate events
* delayed events
* out-of-order events
* large conversation histories
* large groups
* slow devices
* slow APIs

---

# 2. MESSAGE DOMAIN CLIENT ARCHITECTURE

Implement a strongly typed client-side message model.

Represent the lifecycle of a message distinctly.

Support states such as:

* composing
* pending
* sending
* sent
* delivered
* read
* failed
* edited
* deleted

Where the backend supports additional states, integrate them without collapsing semantically different states into one generic status.

Every rendered message must have a stable identity.

Do not use array indexes as message identity.

---

# 3. MESSAGE SENDING

Implement the complete send-message UX.

Support:

* text message composition
* send button
* keyboard send
* validation
* pending state
* optimistic rendering where appropriate
* server acknowledgement
* replacement of temporary client identifiers
* failure state
* retry
* cancellation where supported

The user must immediately see a locally pending message when optimistic behavior is safe.

When the server confirms the message:

* reconcile the temporary message
* preserve ordering
* prevent duplicate rendering
* update delivery state

If sending fails:

* preserve the user's message
* clearly indicate failure
* provide retry
* do not silently discard content

Never create duplicate messages because a WebSocket acknowledgement and HTTP response arrive through different paths.

---

# 4. MESSAGE IDEMPOTENCY AND RECONCILIATION

Implement client reconciliation around the backend's idempotency contract.

Track the appropriate identifiers for:

* client-generated message identity
* server message identity
* conversation identity
* event identity

When an acknowledgement is received:

* locate the pending message deterministically
* merge server-authoritative fields
* preserve local-only UI state where appropriate
* remove the temporary representation
* avoid duplicate insertion

When the same message arrives through another event:

* deduplicate it
* update existing state rather than append another message

The client must be safe against repeated delivery of the same event.

---

# 5. MESSAGE ORDERING

Respect server-authoritative ordering.

Do not rely exclusively on:

* browser timestamps
* JavaScript array insertion order
* local clock values

Use the ordering fields exposed by the backend contract.

Handle:

* late messages
* concurrent sends
* reconnect replay
* delayed acknowledgements
* edited messages
* deleted messages

Do not reorder an established history unnecessarily when a new event arrives.

---

# 6. MESSAGE DELIVERY STATES

Implement the UI representation of delivery states supported by the backend.

Represent appropriately:

* sending
* sent
* delivered
* read
* failed

The implementation must not claim delivery or read status unless the backend confirms it.

Avoid excessive animation for status changes.

Ensure status indicators are accessible and not communicated solely through iconography or color.

---

# 7. READ STATE

Implement read-state behavior according to the available backend contract.

Support:

* marking messages as read
* read boundaries
* unread count updates
* active conversation behavior
* visibility-aware behavior
* batching where appropriate
* avoiding excessive network requests

Do not send one read request for every visible message when the backend supports a read boundary or batch operation.

Do not mark messages as read merely because they were fetched.

Use appropriate viewport/focus semantics.

---

# 8. UNREAD MESSAGE EXPERIENCE

Implement robust unread behavior.

Support:

* unread count
* unread separator
* jump-to-unread
* newly received message indicator
* unread state after navigation
* unread state after reconnect
* unread state across refreshes

Preserve user context when entering a conversation with many unread messages.

Do not automatically scroll the user to the bottom when they are intentionally reading older messages.

---

# 9. SCROLL MANAGEMENT

Implement production-grade conversation scrolling.

Support:

* automatic scroll to newest message when appropriate
* preserve position while loading older messages
* new-message indicator when user is away from bottom
* jump-to-latest action
* unread boundary navigation
* smooth scrolling only when appropriate
* reduced-motion behavior

Determine whether the user is near the bottom using a robust threshold rather than exact pixel equality.

When loading older history:

1. capture relevant scroll metrics
2. fetch older messages
3. insert them
4. restore the user's visual position

The user must not experience a visible jump.

---

# 10. MESSAGE VIRTUALIZATION

Implement virtualization or another scalable rendering strategy for large histories.

The implementation must support:

* dynamic message heights
* grouped messages
* replies
* media previews
* deleted messages
* reactions
* long messages
* date separators

Do not render an unbounded number of message DOM nodes.

Do not sacrifice accessibility solely for virtualization.

Ensure keyboard navigation and screen-reader behavior remain reasonable.

---

# 11. MESSAGE REPLIES

Implement reply functionality where supported.

Provide:

* reply action
* reply preview in composer
* quoted-message display
* navigation to original message
* missing/deleted original handling
* cancellation of reply mode

The reply relationship must be represented using stable message identifiers.

Do not duplicate complete message payloads unnecessarily in client state.

---

# 12. MESSAGE EDITING

Implement message editing where supported.

Provide:

* edit action
* transition into edit mode
* existing message text
* save
* cancel
* validation
* mutation state
* server reconciliation
* edited indicator
* failure recovery

Do not allow editing after the backend rejects the operation.

Respect backend authorization and edit-window rules.

---

# 13. MESSAGE DELETION

Implement deletion UX according to backend capabilities.

Support applicable distinctions such as:

* delete for self
* delete for everyone
* unavailable deletion
* deleted message presentation

Provide confirmation for destructive actions when appropriate.

After successful deletion:

* update local cache
* reconcile WebSocket events
* preserve timeline position
* preserve references from replies where possible

Never permanently remove server-authoritative data solely because the user clicked delete before the mutation succeeds.

---

# 14. REACTIONS

Implement message reactions.

Support:

* adding reaction
* removing reaction
* reaction picker
* current-user reaction state
* reaction counts
* real-time reaction updates
* optimistic updates only where safe
* rollback on failure

Prevent duplicate reactions when the backend enforces one reaction per user.

The reaction interface must be keyboard accessible.

Do not make reaction controls unusable on touch-oriented browser widths.

---

# 15. MESSAGE CONTEXT MENU

Implement accessible message actions.

Actions should include only capabilities supported by the backend and user authorization.

Potential actions:

* reply
* react
* edit
* delete
* forward
* copy
* save
* pin
* search
* report

The menu must:

* support keyboard navigation
* support touch interaction
* position safely near viewport boundaries
* close on outside interaction
* restore focus correctly
* avoid blocking the message timeline unnecessarily

Do not expose unauthorized actions.

---

# 16. MESSAGE SELECTION

Implement message selection architecture.

Support:

* selecting one message
* selecting multiple messages where applicable
* selection toolbar
* deselection
* bulk actions supported by the backend
* keyboard accessibility

Selection must not interfere with ordinary scrolling.

Do not keep large message-selection structures in global state unnecessarily.

---

# 17. FORWARDING

Implement forwarding UX according to the available backend contracts.

Support:

* select message
* choose destination conversation
* multiple destinations where supported
* confirmation
* sending state
* success
* failure
* cancellation

Do not transmit private message contents to unauthorized destinations.

The server remains authoritative for forwarding permissions.

---

# 18. PINNED MESSAGES

Implement pinned-message UI where supported.

Support:

* pin
* unpin
* pinned indicator
* pinned message panel
* navigation to pinned message
* authorization errors
* real-time updates

If multiple pinned messages are supported, represent them efficiently.

Do not load complete conversation history merely to display pinned messages.

---

# 19. SAVED MESSAGES

Implement saved-message UX where supported.

Support:

* save
* unsave
* saved indicator
* saved-message access
* navigation to source conversation
* deleted-source handling

Maintain a clear distinction between:

* a saved message
* a pinned message
* a locally bookmarked UI state

Use server-authoritative state for persistent saved messages.

---

# 20. TYPING INDICATORS

Implement real-time typing indicators.

Support:

* local typing detection
* throttled typing events
* start/stop behavior
* timeout recovery
* remote typing display
* multiple typing participants for groups
* cleanup on disconnect

Do not emit a network event on every keystroke.

Use appropriate debounce/throttle behavior.

Typing indicators must never prevent message delivery.

---

# 21. PRESENCE

Implement presence display according to backend capabilities.

Support states such as:

* online
* offline
* last seen
* unavailable/private

Respect privacy settings.

Do not infer online status from a stale client connection.

Use server-authoritative presence events.

Avoid high-frequency rerendering of large contact lists because of presence changes.

---

# 22. GROUP CONVERSATION EXPERIENCE

Implement group messaging UX.

Support:

* group header
* group avatar
* group name
* member count
* participant information
* group message rendering
* sender identity
* sender avatar where appropriate
* typing participants
* read/delivery semantics
* group actions

The UI must remain usable for large groups.

Do not render the complete member list into the DOM if it can become large.

Use virtualization or pagination where appropriate.

---

# 23. GROUP MEMBER INTERACTION

Implement the frontend foundation for:

* viewing members
* searching members
* member profile preview
* group roles
* permissions
* administrator indicators
* moderation actions exposed to authorized users

Never determine administrative authorization solely from frontend state.

All sensitive actions must be validated by the backend.

---

# 24. CONVERSATION SEARCH

Implement conversation-level search.

Support:

* search input
* debounce
* loading
* result ranking as provided by backend
* empty state
* errors
* result navigation
* keyboard navigation
* cancellation of stale requests

Avoid firing requests for every keystroke.

Do not expose private conversations through client-side search results that the backend did not authorize.

---

# 25. MESSAGE SEARCH

Implement message search according to the repository's search API.

Support:

* global message search where available
* conversation-specific search
* query input
* filters exposed by backend
* result pagination
* navigation to matching message
* highlighting of search terms where safe
* deleted/missing message handling

When navigating to a result in a conversation:

* load the required history range
* position the timeline appropriately
* highlight the target temporarily
* preserve user context

Do not assume the target message is already loaded.

---

# 26. REAL-TIME MESSAGE EVENTS

Integrate all supported message events into the client.

Handle events such as:

* new message
* message acknowledgement
* message edited
* message deleted
* reaction changed
* delivery update
* read update
* message pinned
* message unpinned
* message saved
* message unsaved
* typing started
* typing stopped
* presence changed
* conversation updated

Each event must:

* validate payload
* identify target resource
* update only affected state
* deduplicate repeated events
* handle unknown or unsupported versions safely

---

# 27. RECONNECT RECONCILIATION

Implement correct behavior after WebSocket reconnect.

The client must not assume it received every event while disconnected.

After reconnect:

* establish authenticated connection
* determine synchronization boundary
* request missing events or data according to backend contract
* reconcile message state
* reconcile unread counts
* reconcile conversation metadata
* reconcile presence/typing where applicable

Do not simply reload the entire application after every reconnect.

Use incremental synchronization where the backend supports it.

---

# 28. OFFLINE MESSAGE UX

Implement the UI needed for offline or degraded connectivity.

Pending messages must remain visible.

Failed messages must remain actionable.

The user must understand whether a message is:

* still sending
* sent
* delivered
* failed

Do not display a successful state while the server has not acknowledged the message.

If offline queueing is supported by the backend/client architecture, preserve message ordering and idempotency.

Never silently lose locally entered content.

---

# 29. NOTIFICATION UX

Implement web notification integration only where supported by the repository and browser permission model.

Support:

* notification permission state
* in-app notification indicators
* unread counts
* notification preferences
* notification suppression while actively viewing a conversation where appropriate
* safe notification content

Never expose private message content unnecessarily in telemetry or logs.

Do not request browser notification permission immediately on application startup without an appropriate user interaction and product flow.

---

# 30. MEDIA PLACEHOLDERS AND INTEGRATION CONTRACTS

Prepare the messaging UI for media without fabricating unsupported functionality.

Message rendering architecture must accommodate:

* images
* video
* audio
* voice messages
* documents
* stickers
* GIFs
* link previews

Where backend/media functionality is already available, integrate it.

Where it belongs to another implementation scope, establish clean typed boundaries without fake uploads or fake URLs.

Media rendering must account for:

* loading
* failed loading
* authorization failure
* responsive dimensions
* unsafe content
* accessibility
* bandwidth

---

# 31. LINK PREVIEW UX

Integrate link previews when backend functionality exists.

Support:

* preview loading
* successful preview
* failed preview
* safe external navigation
* malicious URL handling
* long titles
* missing metadata

Do not perform arbitrary URL fetching directly from the browser to generate previews.

Use the server-side preview contract.

---

# 32. MESSAGE CONTENT SAFETY

Treat all message content as untrusted input.

Safely render:

* text
* URLs
* emoji
* usernames
* quoted text
* metadata

Prevent:

* XSS
* unsafe HTML
* javascript URLs
* unsafe protocol handling
* DOM injection

External links must use safe navigation behavior.

Do not blindly trust server-provided HTML.

---

# 33. CACHE CONSISTENCY

Maintain consistent TanStack Query state across:

* conversation list
* active conversation
* message history
* contacts
* profile
* unread counts
* search results

When mutations succeed:

* update directly affected cache entries
* invalidate only affected queries
* reconcile real-time events
* avoid duplicate network requests

When optimistic updates are used:

* snapshot previous state
* apply update
* rollback on failure
* reconcile with server response

---

# 34. PERFORMANCE AND LARGE-SCALE UX

Optimize for:

* 10,000+ message histories
* large conversation lists
* large groups
* frequent real-time events
* rapid typing
* rapid reactions
* repeated presence changes

Use:

* virtualization
* memoized row components where justified
* selective Zustand subscriptions
* targeted query updates
* stable callbacks where useful
* event batching
* debounced search
* throttled typing events
* incremental rendering

Do not optimize by making behavior unreliable.

---

# 35. ACCESSIBILITY

Ensure advanced messaging functionality is accessible.

Provide:

* keyboard-accessible message actions
* accessible reaction picker
* accessible context menus
* accessible unread indicators
* screen-reader announcements for new messages where appropriate
* accessible typing status
* accessible delivery/read state
* focus restoration
* keyboard shortcuts that do not conflict with browser behavior

Do not announce every message to assistive technology in a way that creates unusable noise.

Provide meaningful status semantics.

---

# 36. SECURITY AND PRIVACY

Protect message confidentiality within the frontend architecture.

Never:

* log message contents
* expose private message content through analytics
* persist unnecessary message data
* place message contents into URLs
* trust client-side authorization
* render unsanitized HTML
* expose private search results
* reveal blocked users' information through UI bugs

Respect:

* blocked-user behavior
* privacy settings
* disappearing-message behavior where supported
* deletion semantics
* account logout
* session invalidation

---

# 37. TESTING

Add comprehensive tests for advanced messaging behavior.

Cover:

* optimistic send
* acknowledgement reconciliation
* duplicate event handling
* failed send
* retry
* ordering
* pagination
* scroll restoration
* unread boundary
* reply
* edit
* delete
* reaction
* forwarding
* pinning
* saved messages
* typing indicators
* presence
* search
* reconnect
* offline state
* accessibility
* group messaging
* large-list behavior

Include integration tests for:

* HTTP + WebSocket interaction
* cache updates
* authentication transitions
* reconnect synchronization

Add browser tests for critical user journeys when Playwright is available.

---

# 38. FAILURE AND RECOVERY TESTING

Explicitly test:

* network disconnect during send
* network disconnect during history loading
* WebSocket reconnect during active conversation
* duplicate message events
* duplicate acknowledgement
* out-of-order events
* expired authentication
* server validation failure
* authorization failure
* search cancellation
* deleted message referenced by reply
* unavailable conversation
* removed group membership

The UI must fail safely and preserve user-entered information whenever possible.

---

# 39. TYPESCRIPT AND CODE QUALITY

Maintain strict typing.

Do not use:

* `any`
* unsafe casts
* index-based message identity
* duplicated message types
* untyped WebSocket payloads
* untyped API responses

Create discriminated unions where they improve correctness.

Validate external data at application boundaries.

Keep domain transformations explicit.

Avoid giant hooks containing unrelated responsibilities.

---

# 40. DOCUMENTATION

Update documentation for:

* messaging architecture
* message lifecycle
* optimistic state
* cache reconciliation
* WebSocket events
* reconnect behavior
* scroll architecture
* virtualization
* search
* group messaging
* accessibility behavior
* testing strategy

Documentation must match actual code.

---

# 41. IMPLEMENTATION AND INTEGRATION RULES

Before coding:

1. inspect the repository
2. inspect existing messaging components
3. inspect message API contracts
4. inspect WebSocket event contracts
5. inspect conversation models
6. inspect group models
7. inspect authentication state
8. inspect query/state architecture
9. inspect existing UI primitives
10. inspect existing tests

Then implement only this scope.

Preserve compatible behavior.

Do not replace working infrastructure without a clear technical reason.

Do not invent backend endpoints.

Do not invent WebSocket event names.

Do not fabricate server responses.

Do not leave temporary mock data in production paths.

If a required backend capability is genuinely absent, build the frontend integration boundary around the actual repository capabilities and report the exact limitation.

---

# 42. FINAL IMPLEMENTATION REPORT

Before finishing:

* run typecheck
* run lint
* run formatting validation
* run relevant unit tests
* run integration tests
* run accessibility tests where available
* run browser tests where available
* run production build

Resolve introduced failures.

Report:

* exact files created
* exact files modified
* message architecture
* real-time architecture
* state/cache changes
* optimistic update behavior
* scrolling/virtualization implementation
* search implementation
* group messaging implementation
* accessibility work
* security/privacy work
* performance work
* tests added
* validation commands
* validation results
* repository limitations
* backend capabilities required but unavailable
* scope intentionally left for later implementation

Do not claim tests passed unless they were actually executed.

# FRONTEND VOLUME 2 COMPLETION STANDARD

This volume is complete only when the web application provides a production-quality advanced messaging experience with:

* reliable message sending
* optimistic state
* idempotent reconciliation
* delivery/read states
* replies
* editing
* deletion
* reactions
* forwarding
* pinning
* saved messages
* message selection
* contextual actions
* unread handling
* robust scrolling
* scalable message rendering
* typing indicators
* presence
* group messaging
* group member UX
* conversation search
* message search
* reconnect reconciliation
* offline/degraded-state behavior
* notification integration
* secure message rendering
* accessibility
* automated testing
* strict TypeScript correctness
* production build validation
* accurate documentation

No pseudo-code, placeholders, fake APIs, TODO/FIXME markers, intentionally omitted implementations, or unfinished production paths are permitted.

Do not use phrases such as:

* “implement similarly”
* “left as an exercise”
* “for brevity”
* “remaining code omitted”
* “placeholder”
* “TODO”

Every implemented file must contain complete production-quality code appropriate for its responsibility.

# IMPLEMENTATION REPORT FORMAT

At completion, report:

1. **Implementation Summary**
2. **Files Created**
3. **Files Modified**
4. **Messaging Architecture**
5. **Real-Time Behavior**
6. **State and Cache Reconciliation**
7. **User Experience**
8. **Security and Privacy**
9. **Accessibility**
10. **Performance**
11. **Testing**
12. **Validation Commands**
13. **Validation Results**
14. **Repository Limitations**
15. **Remaining Scope Outside This Volume**

Stop only after the implementation and validation are complete.
