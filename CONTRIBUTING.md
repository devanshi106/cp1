# Contributing

Thanks for your interest in the FAQ Platform. This guide covers how to set up, the conventions we follow, and how to get a change merged.

## Getting set up

```bash
npm install            # root + both workspaces
cp .env.example .env   # leave AI_API_KEY empty to run AI in mock mode
npm run dev            # Express :5000 + Vite :5173
npm run seed           # optional: load the demo dataset
```

See [`README.md`](./README.md) for more, and [`PLANNING.md`](./PLANNING.md) for the architecture and the *why* behind decisions.

## Before you open a PR

Run the same checks CI runs — all three must be green:

```bash
npm run lint                 # ESLint across all workspaces (0 errors)
npm test                     # server tests (in-memory Mongo, mocked AI)
npm run build                # client production build
```

- Add or update tests for any behavior change. Server tests use Jest + Supertest + `mongodb-memory-server` and run with the AI layer mocked (no key, no quota, deterministic).
- Keep the AI/database touchpoints behind the **swappable boundaries** (`server/config/ai.js`, `server/config/db.js`). No other file should import the AI SDK or open a DB connection.
- Match the surrounding code style — ESM throughout, small focused modules (route → controller → service), and comments that explain *why*, not *what*.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/) with a scope:

```
feat(server): add duplicate detection to query intake
fix(client): stop the chatbot from losing its session on reload
test(server): cover the ban-expiry job
docs(task): mark Milestone 7 complete
chore(ci): bump actions/setup-node to v4
```

Common types: `feat`, `fix`, `test`, `docs`, `chore`, `ci`, `build`, `refactor`. Keep the subject imperative and under ~72 chars; put the detail in the body.

## Pull requests

1. Branch off `main` (`feat/...`, `fix/...`).
2. Keep PRs focused; one logical change per PR.
3. Fill in the PR template (what changed, why, how tested).
4. Ensure CI is green. Squash-merge keeps history clean.

## Reporting bugs / requesting features

Open an issue using the relevant template. For bugs, include reproduction steps, expected vs. actual behavior, and your environment.
