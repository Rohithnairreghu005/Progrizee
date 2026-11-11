# Heard

Job platform built around one promise: **every application gets an answer.**

Read [AGENTS.md](AGENTS.md) and [AI_DELIVERY_PROTOCOL.md](AI_DELIVERY_PROTOCOL.md) before contributing.

## Repository layout

| Path                  | Purpose                                                 |
| --------------------- | ------------------------------------------------------- |
| `apps/web`            | Next.js app for candidates and employers (port 3000)    |
| `apps/admin`          | Next.js Heard Super Admin app (port 3001)               |
| `apps/api`            | NestJS modular monolith REST API (port 4000)            |
| `apps/worker`         | Background worker process (queues arrive with issue #3) |
| `packages/config`     | Shared TypeScript, ESLint presets                       |
| `packages/types`      | Shared TypeScript types                                 |
| `packages/validation` | Shared zod schemas                                      |
| `packages/ui`         | Shared accessible React components and Tailwind theme   |
| `docs/decisions`      | Architecture decision records                           |

## Prerequisites

- Node.js 22 (`nvm use` reads `.nvmrc`)
- pnpm 10.33 (`npm install -g pnpm@10.33.0`)

## Getting started

```sh
pnpm install --frozen-lockfile
cp .env.example .env   # placeholders only; never commit .env
pnpm dev               # runs every app in watch mode
```

Health check: `curl http://localhost:4000/health`.

## Checks

These run in CI on every pull request:

```sh
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Local infrastructure (Docker, PostgreSQL, Redis) is set up in issue #3.
