# Task: Add weekly worksheet links and monthly quizzes to curriculum subject pages

**File to modify:** `paywall.js` (same directory as this file)

## Context

There are 30+ subject pages (e.g. `ages-5-7-math.html`, `age-14-english.html`) that share `paywall.js`. Each page has a monthly curriculum view with clickable weeks that expand into a dropdown showing warm-up, main activity, game, home connection, assessment, and differentiation. The expanded content is rendered by the `renderContent()` function in each page's inline `<script>`, but the paywall.js uses a MutationObserver to inject/modify content after renders.

---

## Requirement 1: Weekly Worksheet Links (inside each week's dropdown)

- At the **top** of each week's expanded dropdown detail (`.week-detail`), add a "Weekly Worksheet" button/link
- These should be **external links** to free worksheet sites relevant to that week's topic (e.g. Math-Aids.com, Education.com, K5Learning, SuperTeacherWorksheets, etc. — pick the most relevant one per subject+topic)
- The link should be styled as a small button with an icon, sitting above the warm-up section
- **Gating:** September weeks show the link for ALL users (free included). Other months show a locked "Pro only" version that triggers the existing `wsPaywallModal`

---

## Requirement 2: End of Month Quiz (below all weeks, inline)

- At the **bottom** of the month content area (after the last week row), inject an "End of Month Quiz" section
- Each quiz has **5 multiple-choice questions** covering that month's weekly topics
- The quiz should be inline/interactive (user selects answers, sees score) — not a link to another page
- Questions should be generated based on the `curriculumData` for each month (the data already exists in each subject page's inline script — weeks have `title`, `objective`, `assessment` fields you can derive questions from)
- **Gating:** September quiz is free for all users. Other months show a locked overlay/truncated version prompting Pro upgrade via `wsPaywallModal`

---

## Requirement 3: Implementation approach

- Modify `paywall.js` — specifically the `injectResources()` function and add new functions
- The `paywall.js` uses MutationObserver on `#monthContent` to re-inject when the user switches months. All injection must work within this pattern
- Each subject page has a global `curriculumData` object (month names as keys, each with a `weeks` array containing `{title, objective, assessment, warmup, mainActivity, game}` etc.). You can read this from `paywall.js` since it's in the global scope
- Use `parsePageInfo()` (already in paywall.js) to get `{grade, subject}` from the URL
- Use `getActiveMonth()` to get the current month name
- Free/Pro check: `hasProAccess()` returns true for Pro, `isFreeMonth(name)` returns true for September

---

## Requirement 4: Must NOT do

- Don't modify any of the 30+ individual subject HTML files
- Don't modify `auth.js`
- Don't modify `hub.html`
- Don't create new files — only edit `paywall.js`
- Don't remove or break existing paywall functionality (month locking, existing worksheet gating, modal system)

---

## Requirement 5: Subject-to-external-worksheet-site mapping

Use these free worksheet sites as external links:

| Subject | External Site |
|---------|--------------|
| Math | Math-Aids.com or K5Learning.com worksheet generators |
| English | Education.com reading/writing worksheets or K12Reader.com |
| Science | Education.com science worksheets |
| Art/PE | Education.com coloring/activity pages |
| Social Studies | Education.com social studies worksheets |

The link URL should be the relevant category page on that site (e.g. `https://www.math-aids.com/Kindergarten/` for ages 5-7 math).

---

## Existing helpers in paywall.js you can reuse

- `MONTH_ABBR` — maps month names to abbreviations
- `parsePageInfo()` — returns `{grade, subject}` from URL
- `getActiveMonth()` — returns current active month name
- `hasProAccess()` — checks if user has Pro plan
- `isFreeUser()` — checks if user is on free plan
- `isFreeMonth(name)` — checks if month is September
- `showWsPaywall()` — shows the worksheet upgrade modal
- `wsPaywallModal` — the modal DOM element for worksheet upgrade
