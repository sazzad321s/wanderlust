<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` / `npm run build` / `npm run start` — standard scripts. Turbopack is the only bundler; Tailwind v4 loads via the `@tailwindcss/turbopack` rule in `next.config.ts`.
- `npm run lint` — bare `eslint` with flat config (`eslint.config.mjs`). **Currently exits 1 with 2 pre-existing errors** in scaffolded shadcn files: `react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`. Don't fix or revert these in unrelated work; "lint clean" means no *new* errors.
- No test runner exists — don't look for one or invent test commands.
- No `typecheck` script: use `npx tsc --noEmit` (verified passing).

## Stack quirks (differs from defaults)

- Next **16.4.3** + React 19.3, App Router in `src/app`. `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler` (React Compiler via `babel-plugin-react-compiler`) — caching/async semantics differ from older Next.js. Consult `node_modules/next/dist/docs/` before writing Next-specific code (see block above).
- shadcn uses style **`base-nova`** on **`@base-ui/react` (Base UI, not Radix)** — see `components.json`. Generated components live in `src/components/ui/` (~70 files, uncommitted). Add/refresh with the shadcn CLI (`npx shadcn add <component>`); don't port Radix-based examples from tutorials.
- `cn` is the **npm package**: `import { cn } from "cn"`, also re-exported from `@/lib/utils`. `@/*` → `./src/*`.
- Tailwind v4: no `tailwind.config` file. Theme/vars are in `src/app/globals.css`, which imports `shadcn/tailwind.css` — that import is load-bearing; don't drop it when editing CSS.
- No `.env*` files exist yet (all are gitignored).

## Repo state

- Single app, no workspaces or CI workflows. README is stock create-next-app boilerplate — trust config over it.
- Entry point `src/app/page.tsx` is currently an empty placeholder; feature code (components/hooks/lib, public images) is work-in-progress, largely uncommitted. Leave unrelated dirty files alone.
