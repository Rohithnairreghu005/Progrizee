# AGENTS.md — Heard AI Engineering Operating Guide

> Applies to Claude Code, OpenAI Codex, and any other AI contributor working in this repository.
> **Read this file before making changes.** GitHub Issues and the approved PRD define the work; this file defines how to execute it.

## 1. Product mission

**Heard** is a job platform built around the promise **“Every application gets an answer.”** It is not a generic LinkedIn clone. The initial product serves candidates, employers/recruiters, and Heard platform administrators.

The source PRD is **Heard — Feature List (11 Nov 2026)**, supplied by the Product Owner. It identifies 42 designed and 15 planned features. Request the source PRD/Figma screens if they are not available in the repository; **do not invent missing screens or business rules**.

Core PRD capabilities:
- Employers choose a **5-, 7-, or 10-day** reply commitment for jobs.
- Candidate application tracking: **Applied → Viewed → Shortlisted → Interview → Decision**, with reply-by dates.
- One-click applications from a reusable candidate profile and CV.
- Mandatory salary range and upfront interview process for job listings.
- Employer company workspaces with Admin, Recruiter, Hiring Manager and Employee roles; draft/approval workflow.
- Recruiter one-tap decisions and meaningful rejection feedback; notify remaining applicants when a job closes.
- Public company response metrics, applicant-verified reviews and trust indicators.
- Candidate matching and job transparency; privacy features including silent mode.
- An additional **Heard Super Admin** interface for operations, company verification, moderation, SLA monitoring and audit history.

Some features are planned rather than approved for MVP: AI CV review, AI mock interviews, reverse job board, gamification, paid employer plans, imported jobs, and more. **Do not build these without an approved issue.**

## 2. Roles and responsibilities

| Role | Primary responsibility |
|---|---|
| Product Owner (human) | Product direction, approvals, credentials, production releases |
| ChatGPT (Product/Project Manager) | Prioritisation, issue descriptions, acceptance criteria, sprint coordination, review of evidence |
| Claude Code | Primary implementation: frontend, backend, database, infrastructure, unit/integration tests |
| OpenAI Codex | Independent architecture, security, quality and PR reviews; isolated implementation tasks when explicitly assigned |
| Figma/design workflow | UI specifications, interaction states, component designs, handoff links when needed |

**Assignment is recorded in the GitHub Issue.** These names are AI workstreams, not necessarily assignable GitHub user accounts. Neither tool should assume a ticket is automatically running.

## 3. GitHub is the source of truth

- Repository: https://github.com/Rohithnairreghu005/Progrizee
- Project board: https://github.com/users/Rohithnairreghu005/projects/2/views/1
- Work only from a scoped GitHub Issue; reference its number in branch, commits and PR.
- Workflow: **Backlog → Ready → In Progress → Code Review → Testing → Done**.
- Suggested branch names: `feat/issue-10-application-tracker`, `fix/issue-11-deadline-retry`.
- One feature/fix per PR. Do not push directly to `main` for feature work.
- Update the issue with progress, blockers, test evidence and PR link.
- A ticket is **Done** only after acceptance criteria pass, review findings are resolved, and the Product Owner approves. Do not claim tests passed unless they ran.

## 4. Approved initial architecture (proposed, subject to architecture review)

- **Monorepo:** pnpm + Turborepo; TypeScript end-to-end.
- **Web:** Next.js for candidate and employer role-based routes.
- **Admin:** separate Next.js application with restricted access.
- **API:** NestJS modular monolith, REST APIs and server-side authorisation.
- **Database:** PostgreSQL + Prisma migrations.
- **Async/cache:** Redis + BullMQ for deadline checks, notifications and durable retries.
- **Storage:** private S3-compatible object storage for CVs and media.
- **UI:** Tailwind CSS + shared accessible components.
- **Local/deploy:** Docker Compose; initially target Hostinger VPS, keep cloud integrations portable to AWS.
- **CI/testing:** lint, typecheck, unit/integration tests, Playwright end-to-end tests, security checks.

Target layout (create incrementally; do not assume these paths exist yet):
```text
apps/
  web/
  admin/
  api/
  worker/
packages/
  ui/
  types/
  validation/
  api-client/
  database/
  config/
infrastructure/
  docker/
  nginx/
  aws/
docs/
  architecture/
  decisions/
```

Avoid microservices, Kafka, Kubernetes, separate graph databases, or OpenSearch in the MVP unless evidence and an approved architecture decision justify them.

## 5. Domain boundaries

Keep distinct NestJS modules for identity, candidate profiles, companies/memberships, jobs, applications, reply guarantees, notifications, trust/reviews, admin, and audit events. Every read/write must enforce the authenticated user's permissions and company tenancy.

Minimum core entities: users, candidate_profiles, companies, company_memberships, jobs, applications, application_events, reply_guarantees, notifications, audit_events. Add migrations, foreign keys, unique constraints and indexes deliberately.

## 6. Non-negotiable reply guarantee behavior

- Store the selected guarantee and calculated due date per application; don't rely on a UI countdown as the source of truth.
- Store immutable application status/decision events with actor and timestamp.
- Background reminders and breach detection must be idempotent, retryable and recover after worker downtime.
- Acknowledgement emails are **not automatically substantive decisions**.
- Track overdue outcomes and company response metrics from verified application events.
- **Business decisions are not yet final:** calendar vs working days; what constitutes a qualifying reply; exceptions, extensions and appeals; whether/how the optional £50 deposit is refunded or forfeited. See issue #1. Do not invent these rules or implement monetary penalties before approval.

## 7. Security and privacy

- Enforce RBAC and resource ownership in the API, never only in the frontend.
- MFA for platform administrators; audit privileged actions.
- Private CV storage, short-lived signed URLs, strict upload type/size limits and malware scanning plan.
- Do not expose private messages, CV contents or sensitive candidate data in general admin analytics.
- Treat silent mode as a privacy/security feature; verify it across search, recommendations and employer views.
- Rate-limit sensitive endpoints; validate input; avoid leaking account existence where relevant.
- Keep secrets out of code, logs, issues and PRs. Use environment variables and secret managers.
- Plan UK GDPR data access/deletion/retention, backups and tested restores.

## 8. Development and review contract

### Before coding
1. Read this file and the linked GitHub Issue.
2. Inspect existing code and conventions; do not overwrite unrelated work.
3. Check dependencies, acceptance criteria, PRD/Figma references and unresolved decisions.
4. Post a short implementation plan in the issue or PR.

### Claude Code implementation
1. Create an issue-specific branch.
2. Make the smallest cohesive change; add tests and migrations where required.
3. Run relevant lint, typecheck, tests and build; report actual commands and results.
4. Open a PR with `Closes #<issue>` when appropriate, screenshots for UI, risks and deployment notes.
5. Hand the PR to Codex for independent review. Address findings with follow-up commits.

### Codex review
1. Review the issue, acceptance criteria, diff, migrations and test evidence.
2. Prioritise security, tenant isolation, data integrity, reply-deadline correctness, failure modes, accessibility and maintainability.
3. Report findings with severity, file/line reference and reproduction or test guidance.
4. Never approve merely because code compiles; request changes for blockers.
5. If explicitly assigned implementation, use its own branch/PR and seek independent review.

### Figma handoff
For UI work, link approved designs and component states (desktop/mobile, loading, empty, error, permission denied). Use shared UI components and accessibility standards. If design is missing, flag it rather than guessing a final product decision.

## 9. Definition of Done

- All issue acceptance criteria demonstrably met.
- Appropriate tests added and run successfully; CI green.
- Auth, privacy and tenancy reviewed where applicable.
- Database migrations safe and reproducible.
- API contracts, setup instructions and relevant ADRs updated.
- PR reviewed independently, blockers resolved.
- Product Owner approves; then merge/deploy according to release process.
- GitHub Issue and project board reflect actual state.

## 10. Sprint 0 starting tickets

- **#1:** Confirm MVP scope and reply-guarantee rules — Product Owner + PM.
- **#2:** Initialise monorepo — Claude Code.
- **#3:** Docker, PostgreSQL, Redis and local environments — Claude Code.
- **#4:** Architecture, security and CI review — Codex.

Follow-up issues #5–#14 cover data model, auth, Figma flows, candidate/employer MVP, applications, SLA engine, admin, QA and staging.

## 11. Communication template

When posting an update to a GitHub Issue or PR, use:
```text
Status: Backlog | Ready | In Progress | Code Review | Testing | Done
Owner: Claude Code | Codex | Figma | PM
Completed:
Next:
Blockers / decisions needed:
Evidence: PR / tests / screenshots / logs
```

**If the PRD, acceptance criteria, or security requirements conflict, stop and request a Product Owner decision. Never silently invent policy or report work as complete before verification.**
