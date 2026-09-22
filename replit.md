# Bio/Degas 3D Trial

A technical 3D coordination viewer and parametric modeller for Bio/Degas plenum layouts, designed as an integration-ready trial for Shark OS.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/bio-degas-3d run dev` — run the 3D trial through its managed workflow
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/bio-degas-3d/src/store/useStore.ts` — governed model state, generated geometry data, and validation
- `artifacts/bio-degas-3d/src/components/Scene.tsx` — interactive 3D scene and hardware-safe technical plan fallback
- `artifacts/bio-degas-3d/src/components/Sidebar.tsx` — parameters, saves, JSON exchange, and snapshots
- `artifacts/bio-degas-3d/src/components/SelectionPanel.tsx` — selected stack/tray inspection and editing

## Architecture decisions

- Keep the trial frontend-only; named designs persist in browser storage and export as an integration-ready JSON model.
- Global parameters regenerate governed stack positions; users may edit per-stack quantities but not free-place stacks.
- Tray movement snaps to valid positions by default, with an explicit exploration override that preserves invalid states and reports failed checks.
- The technical 3D scene is primary. When WebGL is unavailable, render an interactive top-plan fallback rather than failing the workspace.
- The current reference is for engineering coordination only and must not imply fabrication release.

## Product

- Loads the governed 58-crate, two-tray reference layout.
- Supports parametric tank/layout inputs, per-stack quantities, tray positioning, part selection, isolation, and inspection.
- Reports envelope, capacity, tray, clearance, water, and transport validation.
- Saves and reloads local designs; imports/exports JSON and exports a PNG scene snapshot.

## User preferences

- Build the trial independently first; integrate it into Shark OS later.
- Prioritize technical coordination: cutaway/transparent shell, labels, dimensions, and inspectable parts.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
