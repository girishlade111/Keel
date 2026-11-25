# Keel — Finance SaaS Website Recreation

High-fidelity React + TypeScript + Vite recreation of the **Keel** Finance SaaS Webflow template (`https://keel-templates.webflow.io/`, originally designed by Waida Studio).

## Key Features & Scope

- **36 Verified Routes**:
  - **Core Pages**: `/` (Home), `/about-us`, `/features`, `/pricing`, `/blogs`, `/integration`, `/contact`
  - **Utility Pages**: `/style-guide`, `/licenses`, `/changelog`, `/instructions`, `/password`, `/404` (plus catch-all fallback)
  - **CMS Detail Pages**: 13 blog articles (`/blog/:slug`) and 9 financial integration detail pages (`/integration/:slug`)
- **Design System & Typography**:
  - Local `Inter Tight` variable font (`NGSwv5HMAFg6IuGlBNMjxLsH8ag.woff2`) and Keel brand tokens (`#f5f7fa` canvas, `#f37360` coral, `#000000` primary action, `linear-gradient(226.83deg, rgb(32, 32, 32), rgb(0, 0, 0))` footer).
- **Interactive Product Mockups & Motion**:
  - `PhoneMockup` with `Lenis` (`lerp: 0.08`) + GSAP `ScrollTrigger` synced rolling wallet balance and synced debit/credit card deck carousel.
  - `RollingNumber` 4-cycle vertical digit train counter across problem stats, real results metrics, and about stats.
  - Interactive Problem slider, Testimonial switcher carousel, Benefits showcase carousel, Monthly/Yearly pricing switch (Homepage pricing section), FAQ accordion, category filter tabs & pagination on `/blogs`.
- **Validated Forms**:
  - Contact form (`First Name`, `Last Name`, `Email`, `Message`) and Footer newsletter form built with `react-hook-form` and `zod`, supporting optional `.env` endpoints (`VITE_CONTACT_ENDPOINT`, `VITE_NEWSLETTER_ENDPOINT`) and demo preview feedback when unconfigured.

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — Start Vite development server
- `npm run typecheck` — Run TypeScript type checking (`tsc --noEmit`)
- `npm run build` — Type-check and build production bundle to `dist/`
- `npm run preview` — Preview built bundle locally
- `npm test` — Run Vitest unit tests (`src/__tests__/keel.test.tsx`)
- `npm run validate:assets` — Verify all downloaded media assets under `public/assets/`
- `npx tsx scripts/verify-all-routes.ts` — Full Playwright 35-route QA, desktop/mobile screenshots, `pixelmatch` visual comparison, responsive overflow check, and 10 interactive checks
- `npx tsx scripts/measure-metrics.ts` — Web Vitals (FCP/LCP/CLS), computed styles, accessibility landmarks/labels, and internal link integrity check

## Configuration

Copy `.env.example` to `.env` if connecting live form submission endpoints. See [docs/configuration.md](docs/configuration.md) for details.
