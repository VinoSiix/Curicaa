# Curicaa

A full K–12 homeschool curriculum platform with 8 grade levels (ages 5–18), 4 subjects each, 40 weeks of lesson plans per subject, auth, pricing, and a mobile-responsive dark UI.

**Live:** [mockup-sandbox-omega.vercel.app](https://mockup-sandbox-omega.vercel.app)

## What's Inside

- **32 subject pages** — Math, English, Science, Art/PE across 8 age groups
- **320+ weeks of curriculum** — week-by-week lesson plans with warmups, main activities, games, assessments, and differentiation
- **Hub landing page** — hero, curriculum pathways, feature overview, lesson previews, pricing, comparison table, FAQ
- **Auth system** — Supabase-backed login/signup with Google OAuth, profile management, subscription tiers
- **4-tier pricing** — Free, Single Grade, Full Bundle, Pro
- **Mobile responsive** — hamburger nav, sticky CTA, responsive grids
- **Worksheets** — printable PDF-style HTML worksheets with answer keys

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML/CSS/JS (no framework) |
| Styling | Inline CSS, CSS variables, Font Awesome icons |
| Fonts | DM Serif Display + DM Sans |
| Auth | Supabase (JWT, email/password + Google OAuth) |
| Hosting | Vercel |

## Project Structure

```
public-curriculum-v2/          ← Live site (what gets deployed)
  hub.html                     ← Main landing page
  hub-pro.html                 ← Pro tier variant
  ages-5-7-{subject}.html      ← Early Elementary (4 files)
  age-8-{subject}.html         ← Grade 3
  age-9-{subject}.html         ← Grade 4
  age-10-{subject}.html        ← Grade 5
  ages-11-12-{subject}.html    ← Middle School
  age-14-{subject}.html        ← High School
  ages-15-16-{subject}.html    ← GED Prep
  ages-17-18-{subject}.html    ← SAT Prep
  auth.js                      ← Auth state (Supabase)
  paywall.js                   ← Premium content gating
  legal.html                   ← Terms, Privacy, Refund Policy
  worksheets/                  ← Printable worksheets + answer keys
  assets/                      ← Fonts, JS bundles, favicon
```

## Run Locally

Any static file server works — no build step needed.

```bash
# Option 1: Python
cd public-curriculum-v2
python -m http.server 8080

# Option 2: Node
npx serve public-curriculum-v2

# Option 3: Just open hub.html in your browser
```

## Design

- Dark mode default (`#0f1119` background)
- Glass-morphism cards with colored glow per age group
- Gradient hero titles, animated stars, scroll-reveal animations
- Sticky header with backdrop blur
- Each subject has its own accent color (Math=blue, English=green, Science=purple, Art=pink)

## Contact

- **Email:** timppamsix@gmail.com
- **GitHub:** [VinoSiix](https://github.com/VinoSiix)
- **X:** [VinoSiix](https://x.com/VinoSiix)
