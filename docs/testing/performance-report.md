# Performance & Bundle Report

## 1. Production Build Output (`vite build`)

- **CSS Chunks (code-split per route + global bundle)**:
  - Global `index-LRh6TIgS.css`: `41.73 kB` (`8.22 kB` gzip)
  - Route stylesheets (`About`, `Features`, `Blog`, `BlogDetail`, `Contact`, `Pricing`, `Integration`, `IntegrationDetail`, `UtilityPages`): `1.11 kB` – `8.80 kB` raw each
- **JS Chunks (`React.lazy` route splitting + vendor splitting)**:
  - `index-OO6EYBwb.js`: `355.52 kB` (`112.18 kB` gzip)
  - `motion-DdEiTQuA.js` (GSAP + Lenis): `70.90 kB` (`27.95 kB` gzip)
  - `vendor-BjShnv2N.js`: `52.65 kB` (`18.56 kB` gzip)
  - Lazy route chunks (`About`, `Features`, `Pricing`, `Blog`, `BlogDetail`, `Integration`, `IntegrationDetail`, `StyleGuide`, `Licenses`, `Changelog`, `Instructions`, `Password`, `NotFound`): `1.11 kB` – `15.32 kB` raw; `Contact`: `97.70 kB` (`27.69 kB` gzip, includes `react-hook-form` + `zod`)

## 2. Measured Headless Chromium Metrics (`vite preview`, `docs/testing/metrics-audit.json`)

| Route | FCP | LCP | CLS | DOM Interactive | Load Event | Resources | Transferred |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | `1260 ms` | `1260 ms` | `0` | `37 ms` | `286 ms` | `46` | `351 KB` |
| `/features` | `452 ms` | `452 ms` | `0` | `18 ms` | `23 ms` | `34` | `169 KB` |
| `/pricing` | `428 ms` | `428 ms` | `0` | `22 ms` | `29 ms` | `25` | `46 KB` |

## 3. Limitations

- Formal Google Lighthouse CLI scores (0–100) were not executed separately; performance measurements above come directly from Chromium's `PerformanceObserver` (`first-contentful-paint`, `largest-contentful-paint`, `layout-shift`) and Navigation Timing API against local `vite preview`.
