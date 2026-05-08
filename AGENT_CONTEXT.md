# Curicaa — Agent Context File

> **Last updated**: 2026-05-08
> **Project path**: `C:\Users\Kuusi1\Desktop\VScode\Curicaa\Dark-Mode`
> **Primary frontend**: `public-curriculum-v2/hub.html` (current live version)

---

## What Is This Project?

Curicaa is a **K-12 homeschool curriculum platform**. The current live version is a static HTML/CSS/JS site located at `public-curriculum-v2/hub.html` (572 lines, 97KB). It serves as the main landing page and curriculum hub. There is also an older React SPA version in `artifacts/mockup-sandbox/` that is no longer the primary focus.

## Tech Stack

| Layer | Tech |
|---|---|
| Current Live Site | Static HTML/CSS/JS (vanilla, no framework) |
| Styling | Custom CSS with CSS variables, inline styles, Font Awesome icons |
| Fonts | DM Serif Display (headings), DM Sans (body) |
| Old React Version | React 19, Vite 7, Tailwind CSS 4, Wouter, Framer Motion, Lucide icons (in `artifacts/mockup-sandbox/`) |
| UI Components (old) | 55 shadcn/ui components |
| Backend (old) | Express 5 (only `/api/healthz`) |
| Database (old) | PostgreSQL + Drizzle ORM (empty schema) |

## Windows Dev Setup (Non-Replit)

- `pnpm install` works after fixing the `preinstall` script (changed from `sh -c` to `node -e`)
- Vite dev server config was relaxed — `PORT` defaults to `5173`, `BASE_PATH` defaults to `"/"`
- Run with: `cd artifacts/mockup-sandbox && pnpm dev`
- Dev server was started in a separate PowerShell window at `http://localhost:5173`

---

## Current State of the App

### What's Working (Current Live Version - `public-curriculum-v2/`)
- ✅ **Main hub page** (`hub.html`) — 572 lines, fully self-contained with all CSS inline
- ✅ Dark mode default with CSS variables (`--bg-primary: #0f1119`, etc.)
- ✅ **Sections**: Announcement bar, Hero, Audience targeting, Curriculum Pathways (8 levels), Platform Features, Lesson Preview (2 sample lessons), What You Get (stats), Testimonials carousel, Pricing (4 tiers), Day in the Life timeline, Comparison table, FAQ, About, Footer
- ✅ **Auth system**: Login/signup modals, user menu, settings modal with subscription management
- ✅ **Mobile responsive**: Hamburger nav, sticky mobile CTA, responsive grids
- ✅ **Animations**: Scroll reveal (IntersectionObserver), twinkling stars, card hover effects, price flip animations
- ✅ **Premium features**: 4-tier pricing (Free, Single Grade $79/yr, Full Bundle $169/yr, Pro $259/yr), checkout modal, subscription cancellation
- ✅ All subject pages in same directory (ages 5-7 through 17-18, 4 subjects each)

### Known Issues / State Notes
- The **React SPA version** in `artifacts/mockup-sandbox/` is OLD and NOT the current live site. It was an earlier attempt that was abandoned.
- The current live site is the **static HTML version** in `public-curriculum-v2/` which is actively maintained and deployed.
- `hub.html` uses **Font Awesome** icons (via `assets/font-awesome.css`), not Lucide.
- The original footer had "Hi Luke!!!" — this was removed in the current version.
- All curriculum content is in the same folder (`public-curriculum-v2/`) — no separate `public/` folder needed anymore.

---

## What Has Been Done

### [DONE] Current Live Site (`public-curriculum-v2/`)
- **Hub page** (`hub.html`) — Complete landing page with all sections
- **8 grade levels** × 4 subjects = 32 subject pages (some with deep curriculum)
- **Auth system** — Login/signup modals, user menu, settings with subscription management
- **4-tier pricing** — Free, Single Grade ($79/yr), Full Bundle ($169/yr), Pro ($259/yr)
- **Mobile responsive** — Hamburger nav, sticky CTA, responsive grids
- **Animations** — Scroll reveal, stars, card hovers, price flips
- **Comparison table** — Curicaa vs competitors

### [OLD - React SPA in `artifacts/mockup-sandbox/`]
- Previous React SPA attempt — abandoned, NOT the current live site

---

## What Needs To Be Done

### Content Expansion (NOT STARTED)
- [ ] Grade 3 (age-8) — 4 subjects need deep curriculum rewrite
- [ ] Grade 4 (age-9) — 4 subjects need deep curriculum rewrite
- [ ] Grade 5 (age-10) — 4 subjects need deep curriculum rewrite
- [ ] Middle School (ages-11-12) — 4 subjects need deep curriculum rewrite
- [ ] GED Prep (ages-15-16) — 4 subjects need deep curriculum rewrite
- [ ] SAT Prep (ages-17-18) — 4 subjects need deep curriculum rewrite

### Visual Polish (NOT STARTED)
- [ ] Light mode toggle (currently dark mode only)
- [ ] Accessibility audit (ARIA labels, keyboard nav, focus traps, semantic HTML)
- [ ] Performance optimization (lazy load images, code splitting)

### Backend & Data (NOT STARTED)
- [ ] Real payment integration (Stripe)
- [ ] User accounts and progress tracking
- [ ] Admin CMS for curriculum content
- [ ] Content ingestion pipeline (HTML → DB)

---

## Key Files & Directories

```
Dark-Mode/
├── AGENT_CONTEXT.md           ← YOU ARE HERE
├── public-curriculum-v2/      ← CURRENT LIVE SITE (this is where work happens)
│   ├── hub.html               ← Main landing page (572 lines, all CSS inline)
│   ├── ages-5-7-{subject}.html ← Early Elementary (4 subjects)
│   ├── age-8-{subject}.html    ← Grade 3 (4 subjects)
│   ├── age-9-{subject}.html    ← Grade 4 (4 subjects)
│   ├── age-10-{subject}.html   ← Grade 5 (4 subjects)
│   ├── ages-11-12-{subject}.html ← Middle School (4 subjects)
│   ├── age-14-{subject}.html   ← High School (4 subjects)
│   ├── ages-15-16-{subject}.html ← GED Prep (4 subjects)
│   ├── ages-17-18-{subject}.html ← SAT Prep (4 subjects)
│   ├── assets/                ← Font Awesome, hub-premium.js, favicon
│   ├── worksheets/            ← PDF worksheets for lessons
│   ├── auth.js                ← Auth state management
│   ├── paywall.js             ← Premium content paywall
│   └── legal.html             ← Terms, Privacy, Refund Policy
├── artifacts/
│   └── mockup-sandbox/        ← OLD React SPA (abandoned, do not modify)
│       ├── src/               ← React components (legacy)
│       ├── public/            ← Old static HTML reference files
│       └── ...                ← Vite, Tailwind, etc.
├── lib/                       ← API clients, DB schema (unused)
└── attached_assets/           ← Original uploaded content (ignore)
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

- **Background**: Dark theme (#0f1119) with animated gradient orbs (gold, green, pink) and twinkling stars
- **Cards**: Glass-morphism with subtle glow on hover, colored by age group variant (purple, blue, green, orange, indigo, red, yellow, teal)
- **Typography**: DM Serif Display (headings), DM Sans (body), gradient hero titles, section labels are uppercase micro-text in gold
- **Colors per age group**: purple (5-7), blue (8), emerald (9), orange (10), indigo (11-12), rose (14), yellow (15-16), orange (17-18)
- **Subject pages**: Header with back link, gradient page title, 4 skill cards, monthly tabs with expandable weeks
- **Current reference**: `public-curriculum-v2/hub.html` (572 lines) — THIS IS THE LIVE VERSION

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
- **Root `/` redirects to `/hub.html`** via `vercel.json` in `mockup-sandbox/`.
- The build copies all static HTML files from `public-curriculum-v2/` into `dist/`.

### What's Live

- **https://mockup-sandbox-omega.vercel.app** → redirects to hub.html (full curriculum hub)
- All static HTML pages: `/hub.html`, `/ages-5-7-math.html`, etc.
- The current live site is the static HTML in `public-curriculum-v2/` — this is what users see.

## Gotchas

- The **current live site** is in `public-curriculum-v2/` — this is what gets deployed and what users see
- The React SPA in `artifacts/mockup-sandbox/` is **OLD and ABANDONED** — do not modify it unless explicitly asked
- `hub.html` uses **Font Awesome** icons (via `assets/font-awesome.css`), not Lucide React
- All CSS in `hub.html` is **inline** (either in `<style>` tag or inline `style` attributes) — no external CSS files for the main page
- The `attached_assets/` folder has timestamped duplicates — ignore it
- The original footer had "Hi Luke!!!" — this was removed in the current version
- Agent file corruption bug: some agents write files with literal `\n` and `\"` instead of actual newlines/quotes. If you see parse errors on line 1 with very long lines, fix with: `$c = Get-Content $path -Raw; $fixed = $c -replace '\\n', "\`n" -replace '\\"', '"'; [System.IO.File]::WriteAllText($path, $fixed)`
