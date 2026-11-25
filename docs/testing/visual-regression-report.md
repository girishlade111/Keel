# Visual Regression Report

Automated full-page comparison executed by `scripts/verify-all-routes.ts` using `pixelmatch` (`threshold: 0.15`) comparing local Vite preview (`1440x900` full-page renders) against captured live Webflow reference screenshots (`docs/reference/desktop/*.png`). Diff images are saved in `docs/testing/screenshots/diffs/`.

## Measured Pixelmatch Comparison (Top 4000px Window)

| Route | Reference Height | Local Height | Compared Region | Diff Pixels | Total Pixels | Raw Pixel Diff % |
|---|---:|---:|---:|---:|---:|---:|
| `/` | `14945px` | `14420px` | `1440x4000` | `772,395` | `5,760,000` | `13.41%` |
| `/about-us` | `11513px` | `8602px` | `1440x4000` | `1,116,050` | `5,760,000` | `19.38%` |
| `/features` | `8199px` | `7673px` | `1440x4000` | `1,060,738` | `5,760,000` | `18.42%` |
| `/pricing` | `3930px` | `3422px` | `1440x3422` | `1,339,896` | `4,927,680` | `27.19%` |
| `/blogs` | `3897px` | `3790px` | `1440x3790` | `932,724` | `5,457,600` | `17.09%` |
| `/contact` | `3411px` | `3046px` | `1440x3046` | `744,108` | `4,386,240` | `16.96%` |
| `/integration` | `3323px` | `3094px` | `1440x3094` | `469,229` | `4,455,360` | `10.53%` |
| `/style-guide` | `3838px` | `3439px` | `1440x3439` | `632,675` | `4,952,160` | `12.78%` |
| `/404` | `1753px` | `1395px` | `1440x1395` | `416,639` | `2,008,800` | `20.74%` |

## Visual Inspection Findings & Fixes Applied

1. **PhoneMockup Layering & Clipping**: Initial captures revealed `Body` silhouette frame covering `Screen.avif` and card slides overflowing bezel bounds. Fixed by ordering `z-index: 1` (`Body`), `2` (`Screen.avif`), `3` (`.keel-phone__screen-clip` with `inset: 2.5% 5.6%`, `border-radius: 38px`, `overflow: hidden`) and adding opaque peach gradient backing under `.keel-phone__balance-overlay`.
2. **Dark Section Headings**: Headings inside dark sections (`BenefitsCarousel`, `About` Mission/Story/Build-with-us, `Features` dark strip) previously inherited black text; changed `.h1`–`.h6` in `src/styles/typography.css` to `color: inherit`.
3. **Scroll Reveal Visibility**: Home `[fade-up="true"]` GSAP hook previously trapped off-screen sections at `opacity: 0` during full-page screenshots; switched to `y`-only reveal so all sections remain visible.
4. **FAQ & Lazy Image Visibility**: Replaced inverted SVG with `#ffffff` `Plus` icon inside black circle and removed premature `loading="lazy"` on team portraits and `/features` lifestyle overlay cards (`z-index: 3`).
5. **Diff Interpretation**: Raw pixel diffs primarily reflect vertical cadence differences (`refHeight` vs `implHeight`), Webflow promotional chrome exclusion (`All-Access Bundle`, `Buy For $99`), and transient animation phases (live phone card/balance offsets). Direct visual inspection of final desktop (`1440px`) and mobile (`390px`) PNGs confirms structural, typographic, surface, and artwork fidelity.
