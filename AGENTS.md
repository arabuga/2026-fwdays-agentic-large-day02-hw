# AGENTS.md

## Project Overview

This repository is an **Excalidraw** fork: an open-source collaborative whiteboard (hand-drawn style) shipped as a **Yarn monorepo**. The core editor lives in `packages/excalidraw/`; the full web app (Vite, PWA, collab shell) is in `excalidraw-app/`. Agents should respect Excalidraw’s documented state and rendering model (see Architecture and Do-Not-Touch).

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | TypeScript (strict) |
| UI | React 19 (app); library peers React 17–19 |
| Monorepo | Yarn 1.x workspaces |
| App bundler | Vite 5 |
| Tests | Vitest, Testing Library, jsdom |
| Package builds | esbuild (packages) |
| Styles | SCSS (editor package) |

Node **≥ 18**; use **yarn** (not npm) for install and scripts.

## Project Structure

- **`packages/excalidraw/`** — main library (`@excalidraw/excalidraw`), published to npm.
- **`excalidraw-app/`** — standalone app (excalidraw.com–style), Vite entry, collaboration UI.
- **`packages/common/`**, **`packages/element/`**, **`packages/math/`**, **`packages/utils/`** — shared packages (`@excalidraw/*`).
- **`examples/`** — integration examples (e.g. Next.js, browser script).
- **`.cursor/`** — Cursor rules, commands, skills, MCP config for agent workflows.
- **`docs/memory/`**, **`docs/technical/`** — Memory Bank and technical documentation.

## Key Commands

```bash
yarn                 # install workspaces
yarn start           # Vite dev server (excalidraw-app)
yarn build           # production app build
yarn build:packages  # build all packages
yarn test            # Vitest (watch)
yarn test:all        # typecheck + lint + format + tests
yarn test:typecheck  # tsc
yarn fix             # Prettier + ESLint --fix
```

Before commits, prefer **`yarn test:update`** or **`yarn test:all`** per team policy.

## Architecture

- **Orchestration:** `packages/excalidraw/components/App.tsx` coordinates scene, store, history, and `ActionManager`.
- **State:** Editor state flows through the existing action pipeline; **do not** add Redux, Zustand, MobX, or parallel global stores for core editor state.
- **Mutations:** Prefer **`actionManager.dispatch()`** (and related patterns) for user-visible changes.
- **Rendering:** Drawing is **canvas-based** (Rough.js, layered canvases), not React DOM for the canvas.
- **Collaboration / app shell:** Firebase, Socket.io, Jotai for app-level concerns live primarily under `excalidraw-app/`; in `packages/excalidraw`, follow the **no direct `jotai` import** rule (use project wrappers where applicable).

### Development workflow

1. Library features: work under `packages/*`.
2. App-only features: work under `excalidraw-app/`.
3. Run typecheck and tests before pushing.

## Conventions

- **Rules:** All agent-facing guardrails live in **`.cursor/rules/*.mdc`** (architecture, security, memory bank, docs maintenance, etc.). Follow them in generated code and refactors.
- **Code style:** TypeScript strict, ESLint/Prettier as configured; match existing file layout (no invented `packages/excalidraw/src/` tree).
- **Exports / naming:** Follow **`excalidraw-code-conventions.mdc`** (e.g. export patterns, file naming).
- **Documentation:** Non-trivial behavior changes should update **`docs/memory/*`** and **`docs/technical/*`** per **`memory-bank.mdc`** / **`docs-maintenance.mdc`**.
- **PRs:** Small, reviewable diffs; reference protected files and testing when touching risky areas.

## Do-Not-Touch / Constraints

**Protected files** (require explicit approval, full tests, manual QA if changed):

- `packages/excalidraw/scene/renderer.ts`
- `packages/excalidraw/data/restore.ts`
- `packages/excalidraw/actions/manager.ts`
- `packages/excalidraw/types.ts`

**General guardrails:**

- Do **not** add dependencies without explicit approval.
- Do **not** use `eval`, dynamic `Function`, or weaken security validations without review.
- Preserve undo/history, event ordering, and cache contracts documented in Memory Bank when refactoring.

---

## Rules (Cursor)

Defined in `.cursor/rules/*.mdc` — categories include architecture, conventions, protected files, testing, memory, security.

## Custom commands

- `/review-code` — `.cursor/commands/review-code.md`
- `/create-component` — `.cursor/commands/create-component.md`
- `/run-rule-ab-test` — `.cursor/commands/run-rule-ab-test.md`

## Skills

See `.cursor/skills/` for full playbooks.

- **build-verify** — run `yarn build` after risky edits; fix compile errors without shortcuts.
- **codebase-explore** — map unfamiliar areas of the monorepo before changing code.
- **memory-bank-update** — keep `docs/memory/*` and `docs/technical/*` aligned after non-trivial work.
- **rule-ab-test** — A/B validation for one `.mdc` rule; record results in `docs/technical/rule-validation.md`.
- **excalidraw-ref** — reference layout and patterns for this Fwdays Day 02 homework fork.

## Memory Bank

Short operational context: `docs/memory/*`. Deep detail: `docs/technical/*`, `docs/product/*`.

## Validation

- Rule behavior: A/B tests under `docs/technical/ab-tests/` and index in `docs/technical/rule-validation.md`.
- Build: `yarn build` / `yarn test:all` as appropriate.

## Agent goal

Generated code should match real Excalidraw APIs and patterns, respect constraints above, and integrate without hallucinated APIs or parallel state frameworks.
