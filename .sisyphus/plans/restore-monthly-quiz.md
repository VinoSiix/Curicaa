# Restore End-of-Month Quiz Feature

## TL;DR

> **Quick Summary**: The quiz.js file (2794 lines of quiz data + engine) exists intact but is not loaded by any subject page. Fix: add `<script src="quiz.js"></script>` to all 33 subject HTML files. Two subjects (ages-17-18-science, ages-17-18-art) are missing quiz data entirely and need placeholder or generated questions.
>
> **Deliverables**:
> - 33 subject HTML files updated with quiz.js script tag
> - 2 missing quiz data sections added to quiz.js (ages-17-18-science, ages-17-18-art)
> - QA verification: quiz renders, submits, scores, paywall works
>
> **Estimated Effort**: Short
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Task 1 (script tags) → Task 3 (missing data) → Final QA

---

## Context

### Original Request
User wants to restore the end-of-month quiz feature that "got deleted somehow." The quiz should appear at the end of every subject's weekly topics as a 5-question test with instant scoring.

### Interview Summary
**Key Discussions**:
- Quiz should be on ALL subject pages: YES
- Auth system (CuricaaAuth) is compatible: YES
- September remains free for all users: YES
- Styling should match existing dark theme: YES

**Research Findings**:
- `quiz.js` exists with 2794 lines of fully functional quiz engine and data
- 31 out of 33 subjects have complete quiz data (10 months × 5 questions)
- 2 subjects missing quiz data: `ages-17-18-science`, `ages-17-18-art`
- Root cause: NO subject HTML page includes `<script src="quiz.js"></script>`
- All 33 pages load `paywall.js` but not `quiz.js`
- quiz.js already integrates with existing Pro paywall (checks `CuricaaAuth.getUser().plan === 'pro'`)

### Metis Review
**Identified Gaps** (addressed):
- Missing quiz data for 2 subjects → Added as Task 3
- Need to verify script tag placement consistency → Added to QA
- Potential conflict with paywall.js worksheet quiz links → Documented as guardrail

---

## Work Objectives

### Core Objective
Restore the end-of-month interactive quiz to all 33 subject pages by reconnecting the existing quiz.js file and filling missing quiz data.

### Concrete Deliverables
- 33 subject HTML files with `<script src="quiz.js"></script>` added after `paywall.js`
- quiz.js updated with quiz data for `ages-17-18-science` and `ages-17-18-art`

### Definition of Done
- [ ] Opening any subject page shows the End-of-Month Quiz section after monthly content
- [ ] September quiz is fully interactive for all users (no paywall)
- [ ] Non-September quizzes show blurred preview + Pro upgrade CTA for non-Pro users
- [ ] Quiz submission shows correct/incorrect feedback per question
- [ ] Score display and confetti animation work for 4-5/5 scores
- [ ] Month tab switching updates the quiz to the correct month's questions

### Must Have
- quiz.js script tag on all 33 subject pages
- Quiz data for ages-17-18-science and ages-17-18-art
- September remains free month
- Pro paywall integration preserved

### Must NOT Have (Guardrails)
- Do NOT modify quiz.js engine logic (rendering, scoring, auth)
- Do NOT modify paywall.js
- Do NOT change existing CSS/styling beyond what's in quiz.js
- Do NOT create separate worksheet quiz HTML files (out of scope)
- Do NOT add new dependencies or libraries

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None
- **Framework**: None (static HTML/JS site)
- **Agent-Executed QA**: Playwright browser automation

### QA Policy
Every task MUST include agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Playwright - Navigate, interact, assert DOM, screenshot
- **Verification**: Quiz renders, options selectable, submit works, scoring correct, paywall active

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately - script tag injection):
├── Task 1: Add quiz.js script tag to all 33 subject HTML files [quick]
└── Task 2: Verify all 33 pages have consistent script loading [quick]

Wave 2 (After Wave 1 - data completion):
└── Task 3: Add quiz data for ages-17-18-science and ages-17-18-art [unspecified-high]

Wave 3 (After Wave 2 - integration testing):
├── Task 4: QA - Verify quiz injection on sample subject pages [unspecified-high]
├── Task 5: QA - Verify paywall gating for non-September months [unspecified-high]
└── Task 6: QA - Verify free September quiz works without auth [unspecified-high]

Wave FINAL (After ALL tasks):
├── Task F1: Cross-browser check (Chrome, Firefox) [unspecified-high]
└── Task F2: Final verification - all 33 pages load quiz without errors [unspecified-high]
-> Present results -> Get explicit user okay

Critical Path: Task 1 → Task 3 → Task 4-6 → F1-F2 → user okay
Parallel Speedup: Tasks 4-6 can run in parallel
```

### Dependency Matrix
- **Task 1**: None → Blocks Task 2, 4-6
- **Task 2**: Task 1 → Blocks nothing (verification)
- **Task 3**: None → Blocks Task 4-6
- **Task 4-6**: Task 1, Task 3 → Blocks F1-F2
- **F1-F2**: Task 4-6 → Blocks user okay

### Agent Dispatch Summary
- **Wave 1**: Task 1 → `quick`, Task 2 → `quick`
- **Wave 2**: Task 3 → `unspecified-high`
- **Wave 3**: Task 4 → `unspecified-high`, Task 5 → `unspecified-high`, Task 6 → `unspecified-high`
- **FINAL**: Task F1 → `unspecified-high`, Task F2 → `unspecified-high`

---

## TODOs

- [ ] 1. Add quiz.js script tag to all 33 subject HTML files

  **What to do**:
  - Find all 33 subject HTML files in `public-curriculum-v2/` (pattern: `age-*.html`, `ages-*.html`, excluding `hub.html`, `legal.html`, `curicaa-price-analysis.html`)
  - In each file, locate the line: `<script src="paywall.js"></script>`
  - Add immediately after it: `<script src="quiz.js"></script>`
  - Verify the placement is before `</body>`

  **Must NOT do**:
  - Do not modify any other content in the HTML files
  - Do not change the order of existing scripts
  - Do not add quiz.js before paywall.js (quiz.js depends on auth being initialized)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Reason**: Simple, repetitive file edits. No domain-specific skills needed.

  **Parallelization**:
  - **Can Run In Parallel**: NO (file edits should be sequential to avoid conflicts)
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 2, Task 4-6
  - **Blocked By**: None

  **References**:
  - `ages-5-7-math.html:292` - Example of where to add script tag (after paywall.js)
  - `quiz.js:1-25` - Quiz engine detects page from URL, auto-injects on load

  **Acceptance Criteria**:
  - [ ] All 33 subject HTML files contain `<script src="quiz.js"></script>`
  - [ ] Script tag appears after `<script src="paywall.js"></script>` in every file
  - [ ] No other file modifications

  **QA Scenarios**:

  ```
  Scenario: Verify script tag added to sample files
    Tool: Bash (grep)
    Preconditions: Task 1 complete
    Steps:
      1. Run: grep -l "quiz.js" public-curriculum-v2/age-*.html public-curriculum-v2/ages-*.html
      2. Count matches: expect 33 files
      3. Run: grep -A1 "paywall.js" public-curriculum-v2/ages-5-7-math.html | head -2
      4. Verify second line contains "quiz.js"
    Expected Result: 33 files match, quiz.js appears immediately after paywall.js
    Evidence: .sisyphus/evidence/task-1-script-tags.txt
  ```

  **Commit**: YES
  - Message: `fix(quiz): restore quiz.js loading on all subject pages`
  - Files: `public-curriculum-v2/*.html` (33 files)

---

- [ ] 2. Verify script loading consistency across all pages

  **What to do**:
  - Run a grep check to confirm all 33 subject pages have the exact pattern: `paywall.js` followed by `quiz.js`
  - Verify no pages have duplicate or malformed script tags
  - Check that non-subject pages (hub.html, legal.html) were NOT modified

  **Recommended Agent Profile**:
  - **Category**: `quick`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 1, but logically after)
  - **Parallel Group**: Wave 1
  - **Blocked By**: Task 1

  **Acceptance Criteria**:
  - [ ] Exactly 33 files contain quiz.js reference
  - [ ] hub.html and legal.html do NOT contain quiz.js reference
  - [ ] All quiz.js references are in `<script src="quiz.js"></script>` format

  **QA Scenarios**:
  ```
  Scenario: Verify no stray quiz.js references
    Tool: Bash (grep)
    Steps:
      1. grep -r "quiz.js" public-curriculum-v2/ --include="*.html" | wc -l
      2. Expect: 33 lines (one per subject page)
      3. grep "quiz.js" public-curriculum-v2/hub.html public-curriculum-v2/legal.html
      4. Expect: no matches
    Expected Result: Exactly 33 references, only in subject pages
    Evidence: .sisyphus/evidence/task-2-consistency.txt
  ```

  **Commit**: NO (groups with Task 1)

---

- [ ] 3. Add quiz data for ages-17-18-science and ages-17-18-art

  **What to do**:
  - In `quiz.js`, locate the end of the QUIZ_DATA object (before line 2293: `};`)
  - The last entry is `ages-17-18-english` (starts at line 2219)
  - Add two new entries after `ages-17-18-english`:
    - `ages-17-18-science`: 10 months (September through June), 5 questions each
    - `ages-17-18-art`: 10 months (September through June), 5 questions each
  - Follow the exact format: `{ question: '...', options: ['A','B','C','D'], correct: 0 }`
  - Questions should be age-appropriate for 17-18 year olds (advanced high school / early college level)

  **Must NOT do**:
  - Do NOT modify existing quiz data
  - Do NOT change the quiz engine logic
  - Do NOT remove the trailing comma pattern (check how previous entry ends)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Reason**: Requires generating 100 quiz questions (2 subjects × 10 months × 5 questions) that are educationally appropriate for 17-18 year olds

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Wave 1 tasks)
  - **Parallel Group**: Wave 2
  - **Blocked By**: None
  - **Blocks**: Task 4-6

  **References**:
  - `quiz.js:2219-2290` - ages-17-18-english format to follow
  - `quiz.js:2147-2218` - ages-17-18-math format to follow
  - `quiz.js:30-33` - Data format comment

  **Acceptance Criteria**:
  - [ ] `ages-17-18-science` entry exists with 10 months × 5 questions
  - [ ] `ages-17-18-art` entry exists with 10 months × 5 questions
  - [ ] All entries follow the exact same object format as existing data
  - [ ] quiz.js parses without syntax errors

  **QA Scenarios**:
  ```
  Scenario: Verify new quiz data loads correctly
    Tool: Bash (node REPL)
    Preconditions: Task 3 complete
    Steps:
      1. node -e "const fs=require('fs'); eval(fs.readFileSync('quiz.js','utf8').replace('(function(){','').replace(/window\.location\.pathname.*$/m,'').replace('})();','')); console.log(QUIZ_DATA['ages-17-18-science'] ? 'OK' : 'MISSING');"
      2. Verify output is "OK"
    Expected Result: Both new subjects have quiz data accessible
    Evidence: .sisyphus/evidence/task-3-data-validation.txt
  ```

  **Commit**: YES
  - Message: `feat(quiz): add quiz data for ages-17-18 science and art`
  - Files: `public-curriculum-v2/quiz.js`

---

- [ ] 4. QA - Verify quiz injection on sample subject pages

  **What to do**:
  - Open 3 sample subject pages in a browser (e.g., ages-5-7-math, age-14-science, ages-17-18-math)
  - Navigate to September tab
  - Verify the End-of-Month Quiz section appears after the weekly topics
  - Verify 5 questions are displayed with 4 options each
  - Select answers and submit
  - Verify scoring feedback appears

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`playwright`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 5, 6)
  - **Parallel Group**: Wave 3
  - **Blocked By**: Task 1, Task 3

  **QA Scenarios**:
  ```
  Scenario: Quiz renders and submits correctly
    Tool: Playwright
    Preconditions: Local server running on localhost:8080 (or file://)
    Steps:
      1. Navigate to /public-curriculum-v2/ages-5-7-math.html
      2. Wait for page to load
      3. Click tab with text "September"
      4. Scroll to find element matching .quiz-section
      5. Assert: .quiz-section is visible
      6. Assert: 5 .quiz-question elements exist
      7. Click first option (data-q="0" data-o="0") in first question
      8. Repeat for all 5 questions
      9. Click button with text "Submit Answers"
      10. Wait for .quiz-results to be visible
      11. Assert: .quiz-result-score contains text like "/ 5"
    Expected Result: Quiz section visible, 5 questions, submission successful, score displayed
    Evidence: .sisyphus/evidence/task-4-quiz-renders.png
  ```

  **Commit**: NO

---

- [ ] 5. QA - Verify paywall gating for non-September months

  **What to do**:
  - Open a subject page without Pro auth (clear localStorage or use incognito)
  - Click October tab
  - Verify quiz section shows blurred preview with "Pro Feature" overlay
  - Verify upgrade CTA button is present
  - Verify quiz is NOT interactive (options cannot be clicked)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`playwright`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 4, 6)
  - **Parallel Group**: Wave 3
  - **Blocked By**: Task 1, Task 3

  **QA Scenarios**:
  ```
  Scenario: Non-September quiz is locked for non-Pro users
    Tool: Playwright
    Preconditions: Clear localStorage / no auth session
    Steps:
      1. Navigate to /public-curriculum-v2/age-14-science.html
      2. Click tab with text "October"
      3. Scroll to .quiz-section
      4. Assert: element with text "Pro Feature" is visible
      5. Assert: blurred preview is visible (opacity < 1 or filter: blur)
      6. Assert: button/ link with text containing "Upgrade" is visible
      7. Try to click .quiz-option element
      8. Assert: no state change (quiz remains locked)
    Expected Result: Quiz is blurred, overlay shows, upgrade CTA present, not interactive
    Evidence: .sisyphus/evidence/task-5-paywall-locked.png
  ```

  **Commit**: NO

---

- [ ] 6. QA - Verify free September quiz works without auth

  **What to do**:
  - Open a subject page in incognito (no auth)
  - Click September tab
  - Verify quiz is fully interactive (no blur, no overlay)
  - Select answers, submit, verify scoring works

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`playwright`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 4, 5)
  - **Parallel Group**: Wave 3
  - **Blocked By**: Task 1, Task 3

  **QA Scenarios**:
  ```
  Scenario: September quiz is free and interactive
    Tool: Playwright
    Preconditions: Clear localStorage / no auth session
    Steps:
      1. Navigate to /public-curriculum-v2/ages-11-12-math.html
      2. Click tab with text "September"
      3. Scroll to .quiz-section
      4. Assert: element with text "Pro Feature" is NOT visible
      5. Assert: .quiz-interactive is visible
      6. Click option in first question
      7. Assert: option gets selected styling (border color change)
      8. Fill all 5 questions
      9. Click "Submit Answers"
      10. Assert: .quiz-results is visible with score
    Expected Result: September quiz fully interactive without auth, scoring works
    Evidence: .sisyphus/evidence/task-6-september-free.png
  ```

  **Commit**: NO

---

## Final Verification Wave

> 2 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user.

- [ ] F1. **Cross-browser Compatibility Check** — `unspecified-high`
  Test quiz rendering and interaction in Chrome and Firefox. Verify no console errors. Check that month tab switching updates quiz. Screenshots of each browser.
  Output: `Chrome [PASS/FAIL] | Firefox [PASS/FAIL] | Console Errors [N] | VERDICT`

- [ ] F2. **Final Scope Verification** — `unspecified-high`
  Verify exactly 33 subject pages have quiz.js. Verify quiz.js has 33 subjects in page keys AND 33 subjects with quiz data. Verify no modifications to paywall.js, hub.html, or legal.html.
  Output: `Pages [33/33] | Quiz Data [33/33] | Unmodified Files [CLEAN] | VERDICT`

---

## Commit Strategy

- **1**: `fix(quiz): restore quiz.js loading on all subject pages` - 33 HTML files
- **2**: `feat(quiz): add quiz data for ages-17-18 science and art` - quiz.js

---

## Success Criteria

### Verification Commands
```bash
# Count subject pages with quiz.js
grep -l "quiz.js" public-curriculum-v2/age-*.html public-curriculum-v2/ages-*.html | wc -l
# Expected: 33

# Verify quiz data completeness
node -e "const fs=require('fs'); const m=fs.readFileSync('quiz.js','utf8').match(/'ages-17-18-science':/); console.log(m ? 'science: OK' : 'science: MISSING');"
node -e "const fs=require('fs'); const m=fs.readFileSync('quiz.js','utf8').match(/'ages-17-18-art':/); console.log(m ? 'art: OK' : 'art: MISSING');"
```

### Final Checklist
- [ ] All 33 subject pages load quiz.js
- [ ] quiz.js contains data for all 33 subjects
- [ ] September quiz is free for all users
- [ ] Non-September quizzes require Pro (blurred + CTA)
- [ ] Quiz submission, scoring, and retake work
- [ ] Month tab switching updates quiz content
- [ ] No console errors on subject pages
- [ ] hub.html, legal.html, paywall.js unchanged
