# Draft: Curicaa Real Auth + Database

## Current State (confirmed via code exploration)

### Frontend
- Vanilla HTML/CSS/JS static site in `public-curriculum-v2/`
- 28+ static HTML pages (hub + 7 grade levels × 4 subjects)
- Client-side auth via `auth.js` — stores users in **localStorage**, passwords in **plaintext**
- Client-side paywall via `paywall.js` — checks localStorage plan, easily bypassed
- Pricing: Free ($0), Single Grade ($79/yr), Full Bundle ($169/yr), Pro ($259/yr)
- Monthly/Annual billing toggle on frontend (prices flip dynamically)
- Checkout modal is fake: "Demo — no real payment processed"

### Backend (Scaffolded, nearly empty)
- **Express 5 API server** at `artifacts/api-server/` with pino logging, CORS, JSON parsing
- **Only route**: `GET /api/healthz` → returns `{ status: "ok" }`
- **Database**: Drizzle ORM + PostgreSQL at `lib/db/` — schema is EMPTY (placeholder comments)
- **API spec**: OpenAPI 3.1 at `lib/api-spec/openapi.yaml` — only health check
- **Zod schemas**: Auto-generated from OpenAPI at `lib/api-zod/` — only HealthCheckResponse
- **Monorepo**: pnpm workspace, TypeScript throughout

### Hosting
- Frontend: Vercel (vercel.json → serves `public-curriculum-v2/` as static)
- Backend: Unknown — needs to be deployed somewhere
- Replit config exists (`.replit`)

## Requirements (from user)
- "Set up real auth so that it could be used online"
- "Real database that stores all the users info and subscription days and everything"
- "I will set up payment next" → Payment NOT in scope for this plan

## Technical Decisions (confirmed)
- **Auth approach**: Supabase Auth (managed service)
- **API hosting**: Vercel Serverless Functions
- **Email verification**: YES — required on signup
- **Password reset**: YES — include it
- **Database**: Supabase PostgreSQL (comes with Supabase project)
- **Session management**: Supabase handles JWT automatically

## Remaining Questions
1. ~~Social logins~~ → **Add Google login too**
2. ~~Test strategy~~ → **No tests, agent-executed QA only**

## Final Architecture
- **Supabase Auth**: email/password + Google sign-in, email verification, password reset, JWT sessions
- **Supabase PostgreSQL**: user profiles, subscription/plan data, subscription days tracking
- **Frontend**: Replace `auth.js` (localStorage) with `@supabase/supabase-js` client
- **Paywall**: Replace `paywall.js` localStorage checks with real Supabase DB reads
- **Vercel Serverless Functions**: Not needed for this phase. Will be added when payment comes.
- **No tests**: Agent-executed QA scenarios for verification

## Scope Boundaries
- INCLUDE: Real auth, real database, user/subscription data model, frontend integration
- EXCLUDE: Payment processing (user says "I will set up payment next")
