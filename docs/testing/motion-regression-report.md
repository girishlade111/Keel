# Motion Regression Report

## Motion Architecture Verified

- **Smooth Scrolling**: `Lenis` (`lerp: 0.08`) initialized in `src/animations/scrollManager.ts` and synchronized with GSAP `ScrollTrigger`. Automatically disables smooth RAF when `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true.
- **GSAP Timelines & ScrollTriggers**:
  - `PhoneMockup`: Synced card carousel (`hero-card-wrapper`) and rolling balance digit tracks (`conter-namber`) with `expo.inOut` easing and context cleanup (`ctx.revert()` on unmount).
  - `RollingNumber`: Scroll-triggered 4-cycle digit train across Homepage & About numeric milestones (`4+hrs`, `32%`, `24x`, `28%`, `85K+`, `18M`, `94%`). Tested in `vitest run` (`src/__tests__/keel.test.tsx`) plus Playwright scroll sweeps.
  - `Home.tsx`: `[fade-up="true"]` uses `gsap.from` on `y: 28 -> 0` (avoiding permanent `opacity: 0` traps on scrolled sections), verified visually in full-page captures (`home-1440-full.png`, `home-390-mobile.png`).
- **Cumulative Layout Shift (`CLS`)**: Measured **`0`** across `/`, `/features`, and `/pricing` (`docs/testing/metrics-audit.json`).
