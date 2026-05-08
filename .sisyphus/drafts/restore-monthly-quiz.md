# Draft: Restore End-of-Month Quiz Feature

## Requirements (confirmed)
- **Goal**: Restore the deleted end-of-month quiz feature
- **Quiz location**: End of every subject's weekly topics (all 33 subject HTML pages)
- **Quiz format**: 5 multiple-choice questions per subject per month
- **Free month**: September is free for all subscription plans
- **Other months**: Pro-only (blurred + "Must upgrade" overlay for non-Pro)
- **Behavior**: Instant scoring, confetti for good scores, retake option, results saved to localStorage
- **Styling**: Match existing dark theme, use current CSS custom properties

## Technical Decisions
- **quiz.js exists and is intact**: Contains all quiz data (2800+ lines), rendering logic, scoring, confetti, localStorage
- **Root cause identified**: quiz.js is NOT being loaded by any subject HTML page
- **Current script loading**: Pages only load `paywall.js` at the bottom
- **Fix approach**: Add `<script src="quiz.js"></script>` to all 33 subject HTML pages, right after `paywall.js`
- **Paywall integration**: quiz.js already checks `CuricaaAuth.getUser().plan === 'pro'` — compatible with existing paywall.js

## Research Findings
- **quiz.js location**: `public-curriculum-v2/quiz.js`
- **Subject pages**: 33 HTML files in `public-curriculum-v2/` matching pattern `age-*.html` and `ages-*.html`
- **quiz.js structure**:
  - Detects pageKey from URL path (e.g., 'ages-5-7-math')
  - QUIZ_DATA object with 10 months (Sep-Jun) per subject
  - `injectQuiz()` appends quiz to `#monthContent` element
  - `initQuizObserver()` watches for month tab changes
  - `QuizEngine` object handles selection, submission, scoring, reset
  - Confetti animation for scores >= 4/5
  - Results saved to localStorage as `curicaa_quiz_{pageKey}`
- **Missing subjects in quiz.js**: Need to verify all 33 subjects have quiz data

## Open Questions
- [x] Should quiz be on all subject pages? → YES
- [x] Is auth system compatible? → YES (uses same CuricaaAuth)
- [x] Should September remain free? → YES
- [x] Any styling changes? → Preferably match existing

## Scope Boundaries
- INCLUDE: Adding quiz.js script tag to all 33 subject HTML pages
- INCLUDE: Verifying quiz data exists for all subjects
- INCLUDE: Testing quiz injection and paywall integration
- EXCLUDE: Modifying quiz.js logic or data (unless data is missing for some subjects)
- EXCLUDE: Changes to paywall.js or auth system
- EXCLUDE: Changes to hub.html or pricing page

## Test Strategy Decision
- **Infrastructure exists**: NO (no jest/vitest/mocha in package.json)
- **Automated tests**: NO (static HTML/JS site, no test framework)
- **Agent-Executed QA**: YES — Playwright for browser verification
  - Navigate to subject page, verify quiz appears
  - Test September quiz is interactive (free)
  - Test non-September quiz shows lock overlay for non-Pro
  - Test quiz submission and scoring
  - Test month tab switching updates quiz
