# Curicaa — Agent Context File

> **Last updated**: 2026-05-03 (end of session)
> **Project path**: `C:\Users\Kuusi1\Desktop\VScode\Curicaa\Dark-Mode`
> **Primary frontend**: `artifacts/mockup-sandbox/`

---

## What Is This Project?

Curicaa is a **K-12 educational platform** for kids/parents. Age-based curriculum content (ages 5-18) across 4 subjects (Math, English, Science, Art/Social Studies). Originally built on Replit.

## Tech Stack

| Layer | Tech |
|---|---|
| Monorepo | pnpm workspaces |
| Frontend | React 19, Vite 7, Tailwind CSS 4, Wouter (routing), Framer Motion, Lucide icons |
| UI Components | 55 shadcn/ui components in `src/components/ui/` |
| Backend | Express 5 (only has `/api/healthz` — basically empty) |
| Database | PostgreSQL + Drizzle ORM (schema is completely empty) |
| API Contract | OpenAPI 3.1 spec → Orval codegen (only health check defined) |

## Windows Dev Setup (Non-Replit)

- `pnpm install` works after fixing the `preinstall` script (changed from `sh -c` to `node -e`)
- Vite dev server config was relaxed — `PORT` defaults to `5173`, `BASE_PATH` defaults to `"/"`
- Run with: `cd artifacts/mockup-sandbox && pnpm dev`
- Dev server was started in a separate PowerShell window at `http://localhost:5173`

---

## Current State of the App

### What's Working
- ✅ React SPA with Wouter routing: `/` → HubPage, `/:ageGroup/:subject` → SubjectPage
- ✅ Dark/light mode via next-themes (dark is default)
- ✅ All 36 subject pages accessible via routes (e.g., `/ages-5-7/math`)
- ✅ Hub page has: hero section, 8 age group cards, subject selection modal, features section, about section
- ✅ Subject pages have: header with back nav, skill cards, monthly tabs (Sep-Jun), expandable week rows, prev/next month navigation
- ✅ Curriculum data extracted from original HTML into `src/data/extracted.json` (36 pages, 10 months each)
- ✅ Typecheck passes (`pnpm run typecheck`)
- ✅ QA passed 14/14 tests

### Known Issues / State Notes
- The visual design does NOT perfectly match the original `public/hub.html`. It's a reinterpretation using shadcn + Tailwind rather than pixel-perfect copy. The user was asked about matching it exactly but then said "never mind" — so it stays as-is.
- A cancelled agent partially modified Header.tsx, ThemeToggle.tsx, HubPage.tsx, BackgroundOrbs.tsx, SubjectModal.tsx, ageGroups.ts, types.ts — these were fixed (escaped `\n` and `\"` replaced) and typecheck passes, but the files are a MIX of the pre-cancel and partial-cancel state. Some components use the original's exact rgba colors via `style` props (Header, SubjectPage), others use Tailwind classes (HubPage cards).
- `Header.tsx` now uses `GraduationCap` icon + "Curriculum Hub" branding (matching original), uses CSS classes `nav-link` and `nav-cta` that are NOT defined in CSS — these are class names that won't have any styling. May need CSS classes added to `index.css`.
- `index.css` does NOT have the keyframe animations the original used (`twinkle`, `gradientShift`, `modalIn`, `pulse`). BackgroundOrbs uses inline `animation` style referencing `twinkle` which needs to be defined in CSS or the stars won't animate.

---

## What Has Been Done

### [DONE] Assessment & Exploration
- Full codebase audit by 3 explore agents (frontend, backend, content)
- Identified that the entire platform was 28 static HTML files in `public/` — the React stack was installed but completely unused

### [DONE] Data Extraction
- All **36 curriculum pages** extracted to `src/data/extracted.json`
  - Each page has: age group, subject, CSS colors, hero title/description, 4 skill cards, 10 months of curriculum data
  - 10 months × 36 pages = 360 months of curriculum content
- Data types in `src/data/types.ts`
- Age group config in `src/data/ageGroups.ts` (8 groups + features + about cards + colorMap)
- Subject lookup in `src/data/subjects.ts`

### [DONE] Windows Compatibility Fixes
- Fixed `package.json` preinstall script (sh → node -e)
- Fixed `vite.config.ts` (PORT and BASE_PATH are now optional with defaults)

### [DONE] Tier 1 — React SPA Migration
- Built complete React SPA replacing the 28 static HTML files
- Components: HubPage, SubjectPage, Header, Footer, BackgroundOrbs, ThemeToggle, SubjectModal
- Routing via Wouter, theming via next-themes
- Data-driven rendering from extracted JSON

### [DONE] Review & Bug Fixes
- 5-agent parallel review (goal verification, code quality, security, QA, context mining)
- Fixed: dynamic Tailwind classes (added colorMap), missing sections (features, about, hero details), SubjectPage content gaps (week text, prev/next, expanded details), BackgroundOrbs cleanup, unused state, type safety
- QA: 14/14 tests passed (all P0 and P1 scenarios)

---

## What Needs To Be Done

### Visual Polish (NOT STARTED)
- [ ] Match visual design closer to original `public/hub.html` if desired
- [ ] Add missing CSS keyframes to `index.css` (`twinkle`, `gradientShift`, `modalIn`, `pulse`)
- [ ] Add `nav-link` and `nav-cta` CSS classes for Header.tsx
- [ ] The `section-label` CSS class is used in SubjectPage but may not be defined in index.css

### Tier 2 — User Experience (NOT STARTED)
- [ ] Responsive design validation on mobile/tablet
- [ ] Proper dark/light mode (using CSS variables, no !important hacks)
- [ ] Accessibility (ARIA labels, keyboard nav, focus traps, semantic HTML)
- [ ] Replace CDN Tailwind with build-time CSS (should be done as part of React migration)

### Tier 3 — Backend & Data (NOT STARTED)
- [ ] Design Drizzle schema (users, age_groups, subjects, lessons, progress)
- [ ] Build real API endpoints (CRUD for content, progress tracking)
- [ ] Authentication (user accounts, sessions, JWT)
- [ ] Admin CMS (UI for managing curriculum content)
- [ ] Content ingestion pipeline (HTML → DB)

---

## Key Files & Directories

```
Dark-Mode/
├── AGENT_CONTEXT.md           ← YOU ARE HERE
├── artifacts/
│   ├── mockup-sandbox/        ← THE FRONTEND (this is where work happens)
│   │   ├── src/
│   │   │   ├── App.tsx        ← Main app with Wouter routing + ThemeProvider
│   │   │   ├── main.tsx       ← Entry point
│   │   │   ├── index.css      ← Tailwind CSS 4 + design system (light/dark vars)
│   │   │   ├── pages/
│   │   │   │   ├── HubPage.tsx     ← Hub with hero, cards, features, about
│   │   │   │   └── SubjectPage.tsx ← Subject with tabs, weeks, skills
│   │   │   ├── components/
│   │   │   │   ├── layout/
│   │   │   │   │   ├── Header.tsx      ← Sticky header with logo + nav + theme toggle
│   │   │   │   │   └── Footer.tsx      ← Simple footer
│   │   │   │   ├── shared/
│   │   │   │   │   ├── BackgroundOrbs.tsx  ← Animated gradient orbs + stars
│   │   │   │   │   ├── SubjectModal.tsx    ← shadcn Dialog for subject selection
│   │   │   │   │   └── ThemeToggle.tsx     ← Dark/light toggle via next-themes
│   │   │   │   └── ui/         ← 55 shadcn/ui components (don't modify these)
│   │   │   ├── data/
│   │   │   │   ├── extracted.json  ← ALL curriculum data (36 pages)
│   │   │   │   ├── types.ts        ← TypeScript interfaces
│   │   │   │   ├── ageGroups.ts    ← 8 age groups + features + aboutCards + colorMap
│   │   │   │   └── subjects.ts     ← Lookup functions for curriculum data
│   │   │   └── lib/
│   │   │       └── utils.ts        ← cn() utility (clsx + tailwind-merge)
│   │   ├── public/              ← OLD static HTML files (36 pages + hub.html) — READ ONLY REFERENCE
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── api-server/              ← Express 5 backend (only /healthz)
├── lib/
│   ├── api-client-react/        ← Orval-generated React Query hooks
│   ├── api-spec/                ← OpenAPI spec
│   ├── api-zod/                 ← Generated Zod schemas
│   └── db/                      ← Drizzle ORM (empty schema)
├── attached_assets/             ← Original uploaded HTML content (timestamped dupes, ignore)
└── pnpm-workspace.yaml
```

## Age Groups & Subjects Reference

| Age Group | Slug | Subjects |
|---|---|---|
| Early Elementary | `ages-5-7` | math, english, science, art |
| Grade 3 | `age-8` | math, english, science, art |
| Grade 4 | `age-9` | math, english, science, art |
| Grade 5 | `age-10` | math, english, science, art |
| Middle School | `ages-11-12` | math, english, science, art |
| High School | `age-14` | math, english, science, art |
| GED | `ages-15-16` | math, english, science, social-studies |
| SAT Prep | `ages-17-18` | math, english, science, art |

## Design Language

- **Background**: Dark space theme (#04040e) with animated gradient orbs (indigo, purple, cyan) and twinkling stars
- **Cards**: Glass-morphism with subtle glow on hover, colored by age group variant
- **Typography**: Inter font, gradient hero titles, section labels are uppercase micro-text
- **Colors per age group**: purple (5-7), blue (8), emerald (9), orange (10), indigo (11-12), rose (14), yellow (15-16), orange (17-18)
- **Subject pages**: Header with back link, gradient page title, 4 skill cards, monthly tabs with expandable weeks
- **Original reference**: `public/hub.html` (1007 lines) and `public/ages-5-7-math.html` (238 lines) — READ ONLY, do not edit

## Deployment & GitHub

### ALWAYS UPDATE GITHUB AFTER CHANGES

**GitHub repo**: https://github.com/VinoSiix/Curriculum-Hub (`origin` remote)
**Vercel project**: `mockup-sandbox-omega.vercel.app`

After making ANY changes to the project, you MUST:
1. `git add` relevant files
2. `git commit -m "descriptive message"`
3. `git push`

Do NOT leave changes uncommitted/unpushed. Luke needs the GitHub repo to stay in sync.

### How Deployment Works

- **Vercel is connected to this project via CLI** (not GitHub auto-deploy). Deploy with:
  ```
  cd artifacts/mockup-sandbox && vercel --prod --yes
  ```
- The Vercel project was set up by running `vercel login` + `vercel --prod --yes` from the `mockup-sandbox` directory.
- **Root `/` redirects to `/hub.html`** via `vercel.json` in `mockup-sandbox/`.
- The build runs `vite build` which copies all static HTML files from `public/` and `public-curriculum-v2/` into `dist/`, alongside the React SPA bundle.

### Build Setup Notes (for future agents)

The `mockup-sandbox` was originally part of a pnpm monorepo but is deployed **standalone** to Vercel. Several fixes were applied to make this work:

1. **`package.json`**: All `catalog:` references (pnpm workspace feature) were replaced with real semver versions. If you add new deps with `catalog:`, replace them before deploying.
2. **`tsconfig.json`**: The `extends: "../../tsconfig.base.json"` was inlined. Don't add it back — the base config doesn't exist on Vercel.
3. **`vite.config.ts`**: `@replit/vite-plugin-*` imports were removed. Don't add them back — they don't work outside Replit.
4. **`vercel.json`**: Has redirect `/` → `/hub.html`. Keep this.
5. **The GitHub auto-deploy DOES NOT WORK** — Vercel's dashboard has a stale build command override. Only `vercel --prod --yes` from `artifacts/mockup-sandbox/` works.

### What's Live

- **https://mockup-sandbox-omega.vercel.app** → redirects to hub.html (full curriculum hub)
- All static HTML pages: `/hub.html`, `/ages-5-7-math.html`, etc.
- The React SPA (`/index.html`) also exists but shows a mostly empty shell — the real content is in the static HTML files.

## Gotchas

- The project was designed for **Replit (Linux)** — preinstall script and vite config were patched for Windows
- `public/hub.html` and `public/*.html` are the OLD static files — they're the **visual reference** for the original design, do not edit
- The `attached_assets/` folder has timestamped duplicates — ignore it
- Some components are a mix of two agent passes due to a cancelled task — they work but the code style isn't perfectly consistent
- Header.tsx uses CSS class names `nav-link` and `nav-cta` that may need to be added to `index.css`
- BackgroundOrbs references `twinkle` animation in inline styles — needs keyframe in `index.css`
- The `section-label` CSS class is used in SubjectPage but may not be defined in index.css
- Font Awesome is used in the old HTML — React app uses **Lucide React**
- The original footer had "Hi Luke!!!" — removed in React version
- `colorMap` in `ageGroups.ts` provides static Tailwind class strings per color — ALWAYS use this instead of dynamic class construction like `bg-${color}-500` which won't compile
- Agent file corruption bug: some agents write files with literal `\n` and `\"` instead of actual newlines/quotes. If you see parse errors on line 1 with very long lines, fix with: `$c = Get-Content $path -Raw; $fixed = $c -replace '\\n', "\`n" -replace '\\"', '"'; [System.IO.File]::WriteAllText($path, $fixed)`
