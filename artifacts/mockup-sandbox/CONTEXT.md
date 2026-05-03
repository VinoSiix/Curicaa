# Curriculum Hub - Project Context

## What Is This?

A **K-12 homeschool curriculum website** called "Curriculum Hub" (aka "Curicaa"). It's a collection of static HTML pages that parents can use to teach their kids at home. Each page covers one subject for one age group, organized into monthly themes with weekly lesson plans.

The site is designed as a dark-mode, glass-morphism UI with a light mode toggle. No framework — vanilla HTML/CSS/JS with Tailwind CDN for utility classes and Font Awesome for icons.

## Project Structure

```
public/                          <-- ORIGINAL working version (DO NOT TOUCH unless asked)
  hub.html                       <-- Main hub/landing page (mobile-responsive)
  ages-5-7-{subject}.html        <-- Early Elementary (4 files: math, english, science, art)
  age-8-{subject}.html           <-- Grade 3 (4 files)
  age-9-{subject}.html           <-- Grade 4 (4 files)
  age-10-{subject}.html          <-- Grade 5 (4 files)
  ages-11-12-{subject}.html      <-- Middle School (4 files)
  age-14-{subject}.html          <-- High School (4 files)
  ages-15-16-{subject}.html      <-- GED prep (4 files: math, english, science, social-studies)
  ages-17-18-{subject}.html      <-- SAT prep (4 files)

public-curriculum-v2/            <-- NEW version with deep-researched curriculum
  hub.html                       <-- Copy of hub.html (links point to same directory)
  ages-5-7-math.html             <-- FULLY REWRITTEN with 40 detailed weeks
  ages-5-7-english.html          <-- FULLY REWRITTEN with 40 detailed weeks
  ages-5-7-science.html          <-- FULLY REWRITTEN with 40 detailed weeks
  ages-5-7-art.html              <-- FULLY REWRITTEN with 40 detailed weeks
  age-14-math.html               <-- FULLY REWRITTEN with 40 detailed weeks
  age-14-english.html            <-- FULLY REWRITTEN with 40 detailed weeks
  age-14-science.html            <-- FULLY REWRITTEN with 40 detailed weeks
  age-14-social-studies.html     <-- FULLY REWRITTEN with 40 detailed weeks
```

## Grade Levels & Subjects

| Level | Ages | Subjects |
|---|---|---|
| Early Elementary | 5-7 | Math, English, Science, Art & PE |
| Grade 3 | 8 | Math, English, Science, Art & PE |
| Grade 4 | 9 | Math, English, Science, Art & PE |
| Grade 5 | 10 | Math, English, Science, Art & PE |
| Middle School | 11-12 | Math, English, Science, Art & PE |
| High School | 14 | Math, English, Science, Social Studies |
| GED Prep | 15-16 | Math, English, Science, Social Studies |
| SAT Prep | 17-18 | Math, English, Science, Art & PE |

## Current State of Work

### DONE
- [x] Hub page (hub.html) — mobile responsive with hamburger nav, light/dark mode
- [x] All 37 subject pages exist with basic curriculum structure (vague but functional)
- [x] Early Elementary (Ages 5-7) — **all 4 subjects DEEPLY rewritten** in `public-curriculum-v2/`:
  - **Math**: 40 weeks covering counting, teen numbers, addition/subtraction, geometry, measurement, skip counting, place value. Aligned to Common Core K-2.
  - **English**: 40 weeks covering alphabet, phonics (Orton-Gillingham inspired), CVC words, sight words (Dolch), digraphs, long vowels, writing workshop, vowel teams, fluency. Science of Reading aligned.
  - **Science**: 40 weeks covering plants, animals, weather, light/shadow, forces, human body, earth/space, life cycles, water/matter, eco-science. NGSS K-2 aligned.
  - **Art & PE**: 40 weeks covering color theory, nature art, drawing, sculpture, famous artists (Monet, Matisse, Kandinsky), music/rhythm, printmaking, photography. National Core Arts Standards aligned.
- [x] High School (Age 14) — **all 4 subjects DEEPLY rewritten** in `public-curriculum-v2/`:
  - **Math**: 40 weeks covering Algebra I — variables, equations, functions, graphing, systems, polynomials, quadratics. Common Core aligned.
  - **English**: 40 weeks covering literature analysis, academic writing, grammar, and research skills.
  - **Science**: 40 weeks covering Biology — cells, genetics, ecology, evolution, human body systems, scientific method. NGSS aligned.
  - **Social Studies**: 40 weeks covering world history, geography, civics, and economics.

### NOT YET DONE (potential next steps)
- [ ] Grade 3 (age-8) — 4 subjects need deep curriculum rewrite
- [ ] Grade 4 (age-9) — 4 subjects need deep curriculum rewrite
- [ ] Grade 5 (age-10) — 4 subjects need deep curriculum rewrite
- [ ] Middle School (ages-11-12) — 4 subjects need deep curriculum rewrite
- [ ] GED Prep (ages-15-16) — 4 subjects need deep curriculum rewrite
- [ ] SAT Prep (ages-17-18) — 4 subjects need deep curriculum rewrite
- [ ] Mobile responsiveness on individual subject pages (only hub.html got the mobile treatment)
- [ ] Replace `public/` originals with v2 once user approves

## How the Pages Work

### Hub Page (hub.html)
- Main landing with hero section, curriculum pathway cards (7 levels), feature pills, about section
- Clicking a card opens a subject modal (Math, English, Science, Art & PE)
- Selecting a subject navigates to `{level}-{subject}.html`
- Has dark/light mode toggle, mobile hamburger nav
- Inline styles heavily used, media queries for responsive breakpoints

### Subject Pages (e.g. ages-5-7-math.html)
- Header with back button to hub, subject badge, age pill, dark mode toggle
- Hero section with subject description
- 4 skill cards showing core competencies
- Monthly tab system (September through June, 10 months)
- Each month shows: focus, skills, 4 expandable weeks, project, materials
- All data in a `curriculumData` JS object, rendered dynamically

### V2 Curriculum Data Model (the rewritten version)
Each week is an object with:
```js
{
  title: 'Week title',
  objective: 'What child learns',
  warmup: '5-min opening activity',
  mainActivity: 'Core lesson (detailed for parent)',
  game: 'Reinforcing game/activity',
  homeConnection: 'Practice in daily life',
  assessment: 'How to check understanding',
  differentiation: 'Easier: ... | Harder: ...'
}
```

The `loadContent()` function renders these with Font Awesome icons (fa-bullseye, fa-fire, fa-book-open/fa-flask/fa-palette, fa-gamepad, fa-home, fa-check-circle, fa-layer-group) in expandable week detail sections.

## Design Conventions
- Dark mode default (`#04040e` background), light mode via `body.light` class
- Each subject has its own accent color: Math=blue, English=green, Science=purple, Art=pink/orange
- Glass-morphism cards with `rgba(255,255,255,0.035)` backgrounds and subtle borders
- Sticky header with backdrop-filter blur
- Background orbs (fixed, blurred gradient circles) for atmosphere
- Star twinkle animation on hub page
- Intersection Observer for scroll-reveal animations

## Key Constraints
- No frameworks — vanilla HTML/CSS/JS only
- Tailwind CDN loaded but not heavily used (mostly inline styles + custom CSS)
- All pages are static, no build step — just open in browser
- Must work offline (except CDN resources like fonts/icons/Tailwind)
- Budget-friendly materials only for activities (household items)
- Content must be genuinely useful for homeschooling parents
- The user (Luke) built this for their kids/family

## User Notes
- User's name is Luke (see footer easter egg)
- User prefers a separate folder approach for safety (don't modify originals)
- User values working software — don't break existing functionality
- The "Dark-Mode" folder name is the project workspace, not a theme toggle feature
