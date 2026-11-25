# Keel Typography Audit

- **Primary & Display Font**: `Inter Tight` (variable weight `400..600`, SIL Open Font License), served locally from `/assets/fonts/NGSwv5HMAFg6IuGlBNMjxLsH8ag.woff2` with preloading in `index.html`.
- **Fallback Stack**: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

## Verified Desktop Scale (1440px)

Measured against `docs/research/style-audit.json`, `docs/research/reference-root.css`, and local computed verification (`docs/testing/metrics-audit.json`):

| Role / Class | Font Family | Computed Desktop Size | Weight | Line Height | Letter Spacing |
|---|---|---:|---:|---:|---:|
| Body (`body`) | Inter Tight | `16px` | `400` | `22.4px` (`1.4`) | `normal` |
| Display Hero (`h1` / `.h1`) | Inter Tight | `93.6px` | `500` | `93.6px` (`1.0`) | `-3.744px` (`-0.04em`) |
| Pill Badge (`.keel-pill-badge`) | Inter Tight | `13px` | `400` | `15.6px` (`1.2`) | `0.26px` (`0.02em`) |
| Nav Link (`.site-header__link`) | Inter Tight | `16px` | `400` | `22.4px` (`1.4`) | `normal` |
| Footer (`footer`) | Inter Tight | `16px` | `400` | `22.4px` (`1.4`) | `normal` |

## Heading Color Inheritance Rule

Reference headings in dark bands (`BenefitsCarousel` on `/`, Mission/Philosophy/Build-With-Us blocks on `/about-us`, Feature dark panel on `/features`) render in `#ffffff`, while light surface headings inherit black. `src/styles/typography.css` sets `color: inherit` on `.h1`–`.h6` so section surface classes cleanly control foreground contrast.
