<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust

A single-page travel/tourism marketing site ("Explore the World") built with the Next.js App Router. `src/app/page.tsx` composes section components from `src/components/site/` (`Navbar`, `Banner`); imagery and brand assets for the landing page live in `public/images/`.

`README.md` is untouched create-next-app boilerplate — its `app/page.tsx` path is wrong; routes live under `src/app/`.

## Commands

- `npm run dev` — start the dev server (http://localhost:3000). This regenerates the Next.js rules block above.
- `npm run build` — production build; also type-checks (`typescript.ignoreBuildErrors` is not set).
- `npm run start` — serve the production build.
- `npm run lint` — plain `eslint` (no paths); target specific files with `npx eslint <path>`.
- No typecheck script — run `npx tsc --noEmit` (strict mode is on).
- No test runner is configured.
- Verification order: `npm run lint` then `npx tsc --noEmit`.

## Stack

- **Next.js 16.4.3** App Router, **React 19.3**, React Compiler enabled (`reactCompiler: true` in `next.config.ts`).
- **Tailwind CSS v4** via `@tailwindcss/turbopack`. There is no `tailwind.config.*`; theme tokens are declared with `@theme inline` in `src/app/globals.css`.
- **shadcn/ui**, style `base-nova`, built on **`@base-ui/react`** (not Radix). Components are generated into `src/components/ui/`. The `shadcn` and `@shadcn/react` packages are runtime dependencies (several generated components import from `@shadcn/react`, and `src/app/globals.css` imports `"shadcn/tailwind.css"`), so removing them breaks styling.
- **TypeScript** strict mode, path alias `@/*` → `src/*`.
- Icons: `lucide-react`. Import `cn` from the `"cn"` package directly (`import { cn } from "cn"`), as every existing component does; `src/lib/utils.ts` is only a re-export shim.

## Layout

```
src/app/             route entry points (layout.tsx, page.tsx, globals.css)
src/components/site/ hand-written page sections (Navbar, Banner) — new landing-page sections go here
src/components/ui/   generated shadcn components — prefer regenerating over hand-editing
src/hooks/           shared client hooks (use-mobile, use-highlighted-code)
src/lib/             utilities and helpers (utils.ts, highlighter.tsx)
public/images/       landing-page and brand imagery
```

## Conventions

- Lint enforces React Compiler purity rules as errors (`react-hooks/purity`, `immutability`, `set-state-in-render`, `refs`, ...): don't mutate props/state during render or touch refs in render. Code can pass `tsc` and still fail `npm run lint`.
- Use the App Router; add new routes as `src/app/<segment>/page.tsx` and metadata via the `metadata` export.
- Add `"use client"` only for components that need state, effects, or browser APIs. Most shadcn components already declare it where required.
- Use `cn(...)` for conditional class names. Style with Tailwind utilities backed by the CSS variables (`bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, etc.) rather than hard-coded colors.
- Dark mode is class-based (`@custom-variant dark (&:is(.dark *))`); colors are defined as `oklch` variables in `:root` / `.dark`. Radii derive from `--radius`.
- Add new shadcn components with `npx shadcn@latest add <name>` so they match `components.json` (`base-nova`, neutral base color, lucide icons, `src/components/ui`).
- Prefer `next/image` for assets; files are referenced from `/images/...`.
- Semicolons: the shadcn-styled code under `src/` omits them; the Next-generated root config files (`next.config.ts`, `eslint.config.mjs`) keep them — match the surrounding file rather than reformatting.
