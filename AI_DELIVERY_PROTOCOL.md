# AI DELIVERY PROTOCOL — Heard

This is the shared operating contract for ChatGPT (PM), Claude Code, Codex, and any design agent. Read `AGENTS.md` first.

## GitHub is the single source of truth

- Repository: https://github.com/Rohithnairreghu005/Progrizee
- Kanban: https://github.com/users/Rohithnairreghu005/projects/2/views/1
- Every unit of work requires a GitHub Issue and an intended owner.
- Use issue comments, PRs, CI checks, and project status as durable handoffs. Do not rely on another AI chat's memory.
- Statuses: Backlog, Ready, In Progress, Code Review, Testing, Blocked, Done. Map these to the board's actual configured Status options; do not create duplicate statuses.

## Dispatch and ownership

1. PM prioritises and marks a ticket **Ready** once requirements, dependencies and acceptance criteria are complete.
2. The designated agent picks up **only** a Ready issue explicitly assigned to its workstream. Do not start a second task when one is already in progress unless the PM authorises it.
3. Agent comments `STARTED`, links its working branch, and moves the board card to **In Progress**.
4. Claude typically implements; Codex typically reviews, but either can implement an explicitly assigned independent task.
5. Figma/design work must provide an approved design link and responsive/empty/loading/error states before UI implementation.

## Implementation handoff

1. Branch from main: `feat/issue-<number>-<slug>`.
2. Commit small cohesive changes, run relevant tests and document results.
3. Push branch, open PR linking issue. Do **not** merge straight to main.
4. Move the card to **Code Review** and request the designated independent reviewer.
5. Reviewer posts findings on the PR. If blockers exist, move to **In Progress** and return to implementer. If accepted, move to **Testing**.
6. CI, tests and required approvals must pass. The Product Owner retains final approval for merge/release until an explicit automation policy is approved.
7. On approved merge, close issue and move card to **Done**. A push alone never means Done.

## Board update mechanism

- Agents should use authenticated GitHub CLI (`gh`) or GitHub API with an identity/token authorised to update the owner's GitHub Project.
- Check board fields/options first: `gh project field-list 2 --owner Rohithnairreghu005 --format json`.
- Find the project item for the linked issue; if absent, add it using `gh project item-add 2 --owner Rohithnairreghu005 --url <issue-url>`.
- Update Status using `gh project item-edit` with the actual project ID, item ID, Status field ID and matching option ID obtained from the API. Never guess these IDs.
- GitHub Projects V2 GraphQL API can be used as an alternative. Ensure the token has the required project permission (often `project` scope for classic CLI tokens).
- If the agent lacks project access, leave an issue comment `BOARD_UPDATE_REQUIRED: <status>` with evidence and flag the blocker. Never claim the board moved when it did not.
- Optionally configure GitHub's built-in project workflows to add newly created issues and automatically mark merged/closed items Done. Verify configuration before relying on it.

## Machine-readable issue handoff comment

Use this template on every transition:

```text
HANDOFF
Issue: #<number>
Agent: Claude Code | Codex | Figma | PM
From: <previous status>
To: <new status>
Branch/PR: <URL or none>
Completed: <short evidence>
Checks: <exact commands and results, or not run>
Blockers: <none or specific decision>
Next owner: <agent or human>
```

## Unattended execution: prerequisites and limits

GitHub Projects **does not execute agents**. For work to continue while the Product Owner is away, configure a persistent/hosted runner or supported cloud agent for Claude Code and Codex, and event/schedule triggers that:
- discover Ready issues,
- dispatch the authorised agent with issue context,
- respect concurrency and budgets,
- post status and PRs,
- invoke independent review,
- stop on policy/security/business ambiguity.

**Do not store model API keys or GitHub tokens in repository files.** Use protected secrets, least-privilege access, branch protection and CI. Disable autonomous production deployment, destructive database operations, payments, permission changes, and merging until the Product Owner approves explicit guardrails.

ChatGPT in a normal conversation is **not** an always-running worker. Scheduled PM check-ins require a separately configured automation; otherwise ChatGPT reviews the board when invoked.

## Escalation and stop conditions

Stop and mark **Blocked** for missing PRD decisions, unapproved product policy, missing Figma design for a UI ticket, credential/permission errors, security-sensitive changes, failed CI, destructive migrations, or unresolved high-severity review findings. Ask for human approval instead of inventing a resolution.

## Definition of Done

Acceptance criteria met; tests run and CI green; independent review complete; security and tenancy checks passed; documentation updated; Product Owner approves; PR merged; GitHub Issue closed; board card moved to Done.

## Proposed solo-owner policy — not yet active

See [solo-owner delivery governance](docs/governance/solo-owner-delivery.md), proposed under #17. It specifies independent AI review and validation tied to the exact PR head, explicit Product Owner merge approval, passing required CI/secret scanning and a separate deployment decision. For Codex implementations, Claude is the independent reviewer; for Claude implementations, Codex is the independent reviewer. Neither agent may review its own implementation as independent evidence.

The proposal distinguishes agent review evidence from GitHub account approvals and documents proposed steady-state protection settings. It does not change current dispatch, review, approval, merge or release rules. Existing live protections apply until the proposal's adoption and activation conditions are demonstrably met. Never remove protections temporarily, manufacture approvals/checks, or use an admin/direct-push path to complete a rejected merge.
