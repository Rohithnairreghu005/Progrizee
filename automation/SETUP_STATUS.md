# Setup status

## Applied to GitHub

- Main protection enforced for admins: required readiness CI, one fresh independent approval, code owner review, last-push approval, resolved discussions, no force pushes or deletions.
- Auto-merge explicitly disabled.
- Protected `ai-workers` environment created: owner review, protected branches only. Self-review remains permitted for environment approval because the sole owner is the designated approver. GitHub reports administrator environment bypass remains enabled; this is a recorded limitation, not a claim of an unbypassable environment.
- Owner CLI workflow and project access verified. The local token is never copied into hosted secrets.
- Project has Backlog, Ready, In progress, In review, Done. Code Review and Testing map to In review; evidence must distinguish them.
- Existing PR #15 implements #2 and has passing product CI and secret scanning. It was not merged or modified by this setup.

## Prepared in PR #16

- Scheduled/manual/PR read-only readiness report; seven policy tests.
- Owner-only, protected-main status transition workflow with evidence requirement and dry-run default. No Done transition is available. It requires environment secret `HEARD_PROJECT_TOKEN` with project access. Owner-provided evidence authorizes transitions; this is not an automated evidence validator.
- CODEOWNERS and reproducible branch/environment configuration records.

## Still required

1. The Product Owner remains the only human reviewer, as requested. Configure a separate GitHub App identity to author agent PRs; the owner can then approve them. Independent AI reviews provide additional evidence and never replace the owner's merge approval. PR #16 was published under the owner's identity and cannot receive the owner's own approval. After configuring the App, recreate the proposal under the App identity without merging or bypassing protection. No second human collaborator is required for that model.
2. Add `HEARD_PROJECT_TOKEN` through GitHub environment secrets. Do not paste it into chat. This enables hosted board transitions, not model workers.
3. Human review and merge of PR #16; no merge has been performed. Scheduled and manual workflows need the default branch. Test dry-run transition first, then an approved real transition and a restoration, checking board and run evidence.
4. The owner confirmed provider projects are not configured. Create dedicated Anthropic and OpenAI API projects with approved spending controls, independent implementation/review credentials, and isolated execution. No paid agent worker has been implemented or enabled. No model spend is authorized by this setup. Agent execution, draft PR publication, automatic review/fix handoffs, dependency-aware dispatch, durable daily budget accounting, and failure reconciliation remain engineering work.
5. Product Owner resolves #1 and approves plans/designs before implementation tickets are eligible. Do not reset #2 from In review or dispatch duplicate implementation while #15 exists.
6. Integrate product CI from #15 after human review; readiness policy tests alone do not verify the application. Add secret scanning to every relevant PR and ensure required checks cannot be bypassed through an unrelated workflow with the same job name.

This status supersedes historical audit observations in ACTIVATION.md. The repository has stronger controls and a tested readiness foundation, but full unattended development is not ready. Do not enable scheduling of paid work until the remaining execution and review controls are implemented and tested.
