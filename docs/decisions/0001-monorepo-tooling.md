# ADR 0001: Monorepo tooling

- **Status:** Proposed (issue #2, pending Codex review and Product Owner approval)
- **Date:** 2026-11-11

## Context

AGENTS.md §4 sets a TypeScript monorepo with Next.js web/admin apps, a NestJS API and a background
worker. The #4 architecture review asked for pinned versions, a committed lockfile and clear package
boundaries, with no auth, schema, product UI or policy in the scaffold.

## Decision

- **pnpm workspaces + Turborepo.** `packageManager` pins pnpm; `.npmrc` sets `save-exact` and
  `engine-strict`; `pnpm-lock.yaml` is committed and CI installs with `--frozen-lockfile`.
- **Node 22 LTS** (`.nvmrc`, `engines`).
- **TypeScript 6.0.** TypeScript 7 is the latest release, but `typescript-eslint` 8 supports
  `<6.1.0`. Revisit once it supports 7.
- **ESLint 9 flat config.** ESLint 10 is available, but `eslint-config-next`'s plugin set is not yet
  verified against it.
- **Vitest** in every workspace. The API uses `unplugin-swc` so tests keep the decorator metadata
  NestJS dependency injection needs. `pnpm dev` for the API uses the Nest CLI for the same reason.
- **Shared packages compile to CommonJS in `dist/`** and Turbo builds them before dependents
  (`^build`). This works for both the NestJS API (CommonJS) and the Next.js bundler.
- **Tailwind CSS v4.** `@heard/ui` ships `theme.css` tokens; apps import it and add the UI source via
  `@source`. Token values are placeholders until approved Figma designs exist (issue #7).
- **Package boundaries.** Frontends depend only on `ui`, `types` and `validation`. Prisma and server
  secrets never enter shared client packages. `packages/database` and `packages/api-client` are
  deferred to issues #5 and #6.
- **CI** runs format, lint, typecheck, test, build, `pnpm audit --audit-level=high` and a gitleaks
  secret scan, with `contents: read` permissions and actions pinned to commit SHAs.

## Consequences

- Shared packages must be built before dependents typecheck or test; Turbo handles this.
- Dependency upgrades are explicit because versions are exact.
- The TypeScript and ESLint major versions should be revisited when the lint toolchain supports them.
