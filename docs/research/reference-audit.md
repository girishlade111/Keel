# Keel Reference Audit

- **Live Reference URL**: `https://keel-templates.webflow.io/`
- **Template Designer**: Waida Studio
- **Audit Method**: Automated Playwright crawl (`scripts/discover-reference-routes.ts`, `scripts/extract-detailed-dom.ts`, `scripts/extract-extra.ts`, `scripts/inspect-interactions.ts`), stylesheet extraction (`docs/research/reference-styles.css`), animation auditing (`docs/research/animation-audit.json`), and full-page screenshot captures across Desktop (`1440px`), Tablet (`1024px`), and Mobile (`390px`).

## Route Discovery

`sitemap.xml` on the live reference returned HTTP 404, so route discovery crawled navigation menus, dropdown drawers, card links, and category links cleanly:

- **Total Discovered & Implemented Routes**: 36 (35 active application routes + `/404` utility route)
  - 7 main marketing routes (`/`, `/about-us`, `/features`, `/pricing`, `/blogs`, `/integration`, `/contact`)
  - 5 utility routes (`/style-guide`, `/licenses`, `/changelog`, `/instructions`, `/password`, `/404`)
  - 13 blog article routes (`/blog/more-systems-for-calmer-money` through `/blog/one-dashboard-for-every-account`)
  - 9 integration detail routes (`/integration/clearvault` through `/integration/meridian`)

## Excluded Promotional Chrome

Per task scope, Webflow marketplace template badges (`All-Access Bundle`, `Buy For $99`) present only as external template promotion chrome on the live demo are omitted in the recreated application.

## Layout & Surface Architecture

- **Canvas**: `#f5f7fa` (`rgb(245, 247, 250)`)
- **Container**: `1440px` max width with `40px` desktop horizontal gutter
- **Footer Surface**: `linear-gradient(226.83deg, rgb(32, 32, 32), rgb(0, 0, 0))` with top border radius `64px 64px 0 0`
- **Card Grammar**: Rounded `16px`, `20px`, `24px`, and `32px` cards with fine `1px` borders (`var(--border-navy-08)`, `var(--black-10)`) and flat neutral contrast hierarchy.
