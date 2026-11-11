# Solo-owner delivery governance

Status: Proposed — not active

Issue: #17. Date: 11 November 2026. Decision owner: Product Owner.

## Purpose and tradeoff

Heard currently has one human owner. Claude and Codex can perform independent work while their GitHub operations use the owner's account. GitHub cannot count a PR author's review as an approving review from another account.

This proposal retains independent agent assessment and final human authority, while defining a long-term workflow that does not depend on a second human collaborator. Its tradeoff is that GitHub would not mechanically enforce the agent review and human merge-approval evidence. The owner and agents must enforce the documented gates; a later automated evidence check would require its own scoped issue, review and approval. Independent AI review does not provide the same assurance as an additional human reviewer.

## Required delivery sequence after activation

1. Work from a scoped Ready issue with an approved plan and issue branch. Claude normally implements; Codex implements only explicitly assigned tasks.
2. Open a PR linked to the issue. The other workstream reviews the exact head SHA in an isolated checkout: Codex reviews Claude's implementation, and Claude reviews Codex's implementation. Review acceptance criteria, code, security/privacy/tenancy, migrations and appropriate test evidence. Record exact commands/results, limitations and severity-ranked findings. A second pass by the implementer does not satisfy independence.
3. Resolve blocking findings and rerun affected checks. The independent reviewer explicitly records an accepted disposition for the current head. Any head change invalidates that disposition and previous owner approval until the new diff is assessed. The reviewer may carry forward unchanged evidence with an explanation and run checks appropriate to the delta.
4. Require successful `Lint, typecheck, test, build` and `Secret scan` checks on the current PR revision. Resolve review conversations and applicable issue/design/policy dependencies. Check current base compatibility; the resulting integration revision must satisfy applicable required checks. Do not treat a missing, skipped, stale, cancelled or failed required check as passing.
5. Present the exact PR, head SHA, review outcome, validation and remaining risks to the Product Owner. Obtain explicit approval to merge that revision and record it in GitHub. If given in a chat session, the authorised agent records its provenance honestly; do not impersonate a distinct human reviewer or label an agent-written record as an independent GitHub approval.
6. An authorised agent or the Product Owner may perform a normal merge of the approved SHA once live protections permit it. Recheck the head and gates immediately before merging; use head matching where supported. No autonomous merges based solely on green CI or a standing instruction to merge future work.
7. Verify the merged commit, issue closure and actual board status before declaring Done. Posting review evidence or pushing commits does not complete the ticket. If the board lacks Testing/Blocked, record the logical state in the issue and use a documented existing mapping; do not create duplicate options or claim an unsupported status was set.

Product Owner approval remains required for deployment as a separate decision covering environment, artifact/commit, migration/rollback and operational evidence. Merge approval does not authorise production deployment, destructive database operations, payments or permission changes.

## Evidence templates

Independent reviewer posts on the PR:

```text
INDEPENDENT_AGENT_REVIEW
PR: <URL>
Head: <full SHA>
Implementer: <Claude Code or Codex>
Reviewer: <other workstream>
Disposition: Accepted | Changes requested
Findings: <severity, file/line, action; or none>
Checks: <commands, results, CI links, coverage limitations>
Carried-forward evidence: <unchanged scope and rationale; or none>
```

Owner approval, or an accurately attributed record of it, includes:

```text
PRODUCT_OWNER_MERGE_APPROVAL
PR: <URL>
Head: <full SHA>
Decision: Approved to merge
Independent review: <link for this head>
Validation: <links>
Risks accepted: <explicit scope; or none>
Source: <owner GitHub comment or identified owner instruction/session>
Recorded by: <human or agent identity>
Deployment approval: Not included
```

Continue using the existing Status/Owner and HANDOFF templates for transitions. Author identity, timestamps and links must remain auditable; do not fabricate another account's review or successful check.

## Proposed steady-state GitHub configuration

These are reviewable recommendations, not commands to change current settings. They apply only if this governance model is independently reviewed, adopted and activated through an authorised process.

| Setting for main | Proposed value |
| --- | --- |
| Require pull request before merging | Enabled |
| Required status checks | `Lint, typecheck, test, build`; `Secret scan` |
| Branch must be up to date | Enabled |
| Conversation resolution | Required |
| Protections apply to administrators | Enabled |
| Force pushes and branch deletion | Disallowed |
| GitHub approving reviews from a separate account | No account-based approval requirement in this model; exact-head independent agent review plus owner approval remains mandatory policy |
| Code Owner approval / approval of latest push | No separate account-based approval requirement in this model; reassessment of every new head remains mandatory policy |
| Readiness reporting | Additional reporting unless separately approved as a reliable required check for every applicable PR |
| Automatic merge or production deployment | Not enabled by this proposal |

Removing account-based review enforcement reduces platform-enforced separation of duties. Preserve CI and normal PR merges, record that tradeoff explicitly in the owner decision, and reassess the model when a trusted collaborator joins. Do not toggle protection temporarily around an individual PR.

## Adoption and activation conditions

1. This documentation-only PR must receive independent review from Claude because Codex authored it. The Product Owner must approve the final proposal SHA after seeing that review and the enforcement tradeoff.
2. Existing protections and instructions apply to the proposal itself. A proposal cannot approve itself, self-activate, or waive the rules needed to merge it. The existing separate-account approval requirement is an unresolved adoption dependency if no eligible approver is available.
3. The Product Owner must resolve that adoption dependency through an authorised governance process. An agent must stop and report the dependency; it must not disable protection, use admin bypass, push directly to main, invent a passing check, or route around a rejected merge to activate this proposal.
4. After authorised adoption, record the owner decision, policy commit, independent review and any separately authorised settings change in #17. Verify the live settings and a representative PR's required checks before declaring the model active. Update this document and both instruction-file notices to reflect the verified activation state through a reviewed change.
5. Existing open PRs require current-head review, checks and owner approval under whichever policy is actually in force. This proposal does not retrospectively approve or merge PR #15 or PR #16.

## Unchanged product and security gates

Issue #1 continues to gate policy-dependent implementation; #2's recorded scaffolding exemption is limited to #2. Missing source PRD/Figma, unresolved high-severity findings, failed validation, privacy/tenant isolation defects and destructive operations retain their existing escalation requirements. Approval of this proposal does not define reply guarantees, waive security requirements, authorise spending or grant broad unattended execution.
