# Draft: Worksheet Curation Strategy for Curicaa

## Requirements (confirmed)
- **Coverage**: Every week, every subject = ~1,280 worksheets + answer keys
- **Grade levels**: 8 (Ages 5-7, 8, 9, 10, 11-12, 14, 15-16, 17-18)
- **Subjects per level**: 4 (Math, English, Science, Art/Social Studies)
- **Weeks per subject**: 40
- **Source approach**: Curate from free resources (NOT hand-craft, NOT AI-generate)

## Problems with AI-generated worksheets (confirmed by user)
- Content is shallow/generic
- Formatting is inconsistent
- Not educationally sound
- Too time-consuming to prompt iteratively

## Current State
- 2 worksheets exist: ages-5-7-math-sep-w1.html + answer key
- 2 templates: template.html + template-answer-key.html
- Template uses clean B&W math-aids style layout
- Directory structure: worksheets/{grade}/{subject}/{file}.html

## Technical Decisions
- [pending] Integration method: link vs embed vs download+self-host
- [pending] Which sources to use per subject
- [pending] How to handle answer keys
- [pending] How to maintain consistent formatting across curated sources

## Research Findings

### Curriculum Data Model (from explore agent)
- **Identical shape across all grades** — 10 months (Sep-Jun), 4 weeks/month, each week has: title, objective, warmup, mainActivity, game, homeConnection, assessment, differentiation
- **Zero current worksheet integration** — no links from lesson pages to worksheets
- **Convention-based naming works**: `worksheets/{age}/{subject}/{age}-{subject}-{mon}-w{N}.html`
- **Two worksheet types exist**: "Lesson Companion" (styled, parent guide) and "Printable Drill" (B&W, child-facing)
- **Best UI placement**: First row inside expanded week detail (before warm-up), or small icon in week header row
- **Convention-based path construction is possible**: derive path from month name + week index, no need to add fields to every week object

### Free Worksheet Sources (from librarian agent)

**Critical finding**: Almost no commercial worksheet site allows redistribution/embedding. Strategy must be tiered.

**Tier 1 — Self-Generate (Zero licensing issues, fully yours)**:
- Math: `hw-gen` (MIT, pure JS, runs in browser, print-friendly HTML + answer keys)
- Math: `random_math_question_generator` (Apache 2.0, 125+ topics, algebra through calculus)
- Both are open source, commercially safe, can be bundled into static site

**Tier 2 — Self-Host OER (CC/Public Domain)**:
- English Banana Big Grammar Book: **Public Domain**, 101 grammar worksheets + answers
- Open Schools BC workbooks: CC-BY-NC, K-7 Math/ELA/Science
- OER Commons: 1,067 K-12 resources, mixed CC licenses

**Tier 3 — Embed (with permission)**:
- CK-12: Provides official embed codes, auto-attribution, K-12 Math/Science/Social Studies

**Tier 4 — External Links (always legal)**:
- Math-Aids.com: 94+ math topics, dynamically generated, linking welcomed
- Math-Drills.com: 70,000+ worksheets, link only
- CommonCoreSheets: K-8, link only (explicitly prohibits framing)
- K5 Learning: Schools may link directly to PDF URLs
- WorksheetWorks.com: Linking explicitly welcomed

**Subject Strategy**:
- Math → Self-generate with JS libraries (hw-gen base) + external links for variety
- English → Self-host English Banana (Public Domain) + Open Schools BC + external links
- Science → CK-12 embeds + external experiment worksheet links
- Art → External links (JustFamilyFun, MonkeyPen, etc.)

## Open Questions
- How should worksheets be accessed? (inline in lesson page, separate tab, PDF download?)
- Should we standardize the look of curated worksheets to match the existing template?
- Budget for any paid resources? Or strictly free?
- Do answer keys need to be password-protected (parent-only)?

## Scope Boundaries (FINAL)
- INCLUDE: Math worksheets for Ages 5-7 (40 weeks) — external links to free worksheet sites
- INCLUDE: UI integration — add worksheet links into the weekly lesson page (ages-5-7-math.html)
- INCLUDE: Answer key links where available
- EXCLUDE: English, Science, Art worksheets (future work)
- EXCLUDE: Other grade levels (future work)
- EXCLUDE: Custom math worksheet generator
- EXCLUDE: Self-hosting OER content
- EXCLUDE: Replacing or modifying existing curriculum content

## User Decisions
- Math approach: Link to external sites (Math-Aids, Math-Drills, CommonCoreSheets, etc.)
- Coverage: Math only, Ages 5-7 only, 40 weeks
- Styling: Use source styling as-is
- Answer keys: Separate file/link next to the worksheet
- Access method: Flexible (whatever works best per source)
