# Heard unattended execution: audit and activation record

Audit date: 11 November 2026. Repository: Rohithnairreghu005/Progrizee.

## Verified current state

The repository contains AGENTS.md and AI_DELIVERY_PROTOCOL.md only. Issues #1–#14 were read. They describe backlog work, not approval to execute. Issue #1 explicitly blocks implementation pending policy approval. Project #2 cannot be inspected with the current CLI token: missing read:project scope. Repository admin access works. Actions are enabled, default token permissions are read-only, and workflow PR approval is disabled. Auto-merge is disabled. Secret scanning and push protection are enabled. No repository Actions secrets, environments, or main branch protection exist.

## Implemented boundary

AI readiness provides scheduled/manual/PR policy tests and a read-only issue report. It uses no model credentials and has zero model budget. Runs serialize and stop after five minutes. Checkout credentials are not persisted. Issue content is never executed or included in shell commands. Reports use issue numbers and fixed policy text to prevent Markdown injection. This workflow does not dispatch workers or change board statuses. Scheduling and manual dispatch require the workflow to reach the default branch through human review.

## Required before enabling workers

1. Product Owner resolves #1, supplies PRD/design references, and approves issue-specific implementation plans. Do not label all backlog work Ready.
2. Authorize a separate project token with access to Project #2. Inspect actual field/option IDs and dependencies; never guess IDs. Project credentials must stay in a trusted coordinator job and never reach agent code.
3. Configure a GitHub App scoped to this repository for branch/PR publication. Keep its private key in a protected coordinator environment. Worker jobs must not receive repository write credentials. Branch publication must reject workflow, policy, secret, permission, deployment, payment, and destructive migration changes pending human review.
4. Establish protected implementation and independent-review environments with required owner reviewers, prevent self-review, and restrict allowed refs. Use separate provider projects/credentials. Set provider-enforced spending limits before enabling any paid calls; timeouts and client estimates alone are not billing caps. Initially approve at most one task, one implementation attempt and one independent review per day; no automatic repair loops.
5. Implement isolated ephemeral worker execution, network restrictions and removal of elevated privileges. Never execute agent-generated code in a job containing provider or publication secrets. Pin agent/action versions and validate sandbox behavior before installing credentials.
6. Add main protection: PR required, owner approval, independent review, stale approval dismissal, resolved discussions, required CI, no force pushes/deletions, enforce administrators. The current readiness tests are not product CI. Add lint/typecheck/unit/integration/build/E2E checks once #2 defines the actual workspace commands. Never silently skip absent scripts.

## Required orchestration contract (not yet implemented)

Select only owner-approved Ready issues with completed dependencies and one global lease. Recheck authorization at dispatch. Record STARTED and move to In Progress only after worker start is confirmed. Publish a bounded diff to an issue branch and draft PR; record Code Review. A separate reviewer evaluates the exact PR commit, acceptance criteria and CI with no write credentials. Findings return to In Progress only within approved retry limits; otherwise Blocked. Testing requires independently accepted review and green CI for the current commit. Any push invalidates review evidence. Done requires human-approved merge, verified merged PR, closed issue and successful board mutation. Closed unmerged PRs never imply Done. Board failures must emit BOARD_UPDATE_REQUIRED with evidence. Credentials, CI failures, unresolved decisions and budget exhaustion stop work. No automated merge, production deployment, payments or destructive commands are authorized.

## Verification and remaining work

Local policy tests cover missing approval, prompt-like issue content, blocked work, human-only tickets and out-of-scope issues. Run the PR workflow and inspect its job summary after publication. Test default-branch manual and scheduled triggers only after human merge. Paid worker execution, review handoff, failure recovery, board transitions, protected environments and full product CI remain unverified and unimplemented; do not describe this starter as operational unattended development. Full activation requires the credentials, controls and end-to-end trials above.
