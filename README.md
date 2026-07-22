# claude-projects

Workspace for projects that use Claude. npm workspaces monorepo.

## Layout

- `apps/template-react` — Vite + React + TypeScript + Tailwind starter. Copy this folder to `apps/<new-project>` to start a new frontend.
- `packages/ui` — shared React components (`@claude-projects/ui`).
- `packages/api-client` — thin wrapper around `@anthropic-ai/sdk` for backend/script use (`@claude-projects/api-client`).
- `packages/config` — shared Tailwind and ESLint presets.

## Getting started

```bash
npm install
npm run dev:template   # runs apps/template-react on localhost
```

## Starting a new project

1. Copy `apps/template-react` to `apps/<name>`.
2. Update `name` in its `package.json`.
3. Run `npm install` from the repo root to link workspace packages.
