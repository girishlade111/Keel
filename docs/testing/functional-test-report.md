# Functional QA Test Report

Test runs executed against latest production build (`tsc --noEmit && vite build` -> `dist/`).

## 1. Unit Tests (`npm test` / Vitest v3.2.7)

- **File**: `src/__tests__/keel.test.tsx`
- **Result**: **5 / 5 passed** (Pricing toggle/billing state, FAQ accordion toggle, `RollingNumber` rendering, Blog category filter/count logic, Footer newsletter validation).

## 2. Playwright Full-Route & Interaction Suite (`scripts/verify-all-routes.ts`)

- **Routes Tested**: **35 / 35 active routes** (`consoleErrors: 0`, `brokenImages: 0`, `overflowIssues: 0`).
- **Viewports Checked for Overflow**: `1440x900` (all 35 routes), `1024x768`, `390x844`, `320x700`.
- **Interactive Controls Tested (10 / 10 Passed)**:
  - `dropdownOpens`: `true`
  - `dropdownClosesOnEscape`: `true`
  - `problemSliderSwitches`: `true`
  - `pricingSwitchesToYearly`: `true` (`$13.33` rendered on switch)
  - `faqExpands`: `true` (`aria-expanded="true"`)
  - `blogFilterWorks`: `true` (`PLANNING / 04` filters to 4 cards)
  - `blogPaginationWorks`: `true` (Next page reveals `One dashboard for every account`)
  - `contactValidationWorks`: `true` (`First name is required` displayed on empty submit)
  - `contactSubmitWorks`: `true` (Demo mode validation confirmation displayed)
  - `newsletterSubmitWorks`: `true` (Demo mode subscription feedback displayed)

## 3. Accessibility & Internal Link Audit (`scripts/measure-metrics.ts`)

- **Core/Utility Routes Audited (13 routes)**:
  - `lang="en"`: Passed on 13 / 13 routes
  - Single `<h1>` (`h1Count: 1`): Passed on 13 / 13 routes
  - Semantic landmarks (`<header>`, `<main>`, `<footer>`, `.skip-link`): Passed on 13 / 13 routes
  - Missing `alt` attributes (`imgsNoAlt`): `0`
  - Unnamed buttons (`buttonsNoName`): `0`
  - Unlabeled form inputs (`inputsUnlabeled`): `0`
  - First `Tab` focus target on `/`: `<a class="skip-link">`
- **Internal Link Integrity**: `25` unique internal paths crawled, **`0` broken internal links** (`brokenInternalLinks: []`).
