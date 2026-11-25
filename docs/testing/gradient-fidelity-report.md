# Gradient & Surface Fidelity Report

Verified from `docs/testing/metrics-audit.json` and visual screenshot review against `docs/research/reference-gradients.css` and `docs/research/style-audit.json`:

- **Page Canvas (`body`)**: `rgb(245, 247, 250)` (`#f5f7fa`).
- **Dark Footer (`.site-footer`)**:
  - `backgroundImage`: `linear-gradient(226.83deg, rgb(32, 32, 32), rgb(0, 0, 0))`
  - `borderRadius`: `64px 64px 0px 0px`
  - `color`: `rgb(255, 255, 255)`
- **Phone Balance Mask & Backdrop**: Vertical alpha fade mask (`linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)`) with warm-peach gradient surface (`rgba(246, 236, 233, 0.98)` -> `rgba(247, 239, 236, 0.99)`).
- **Atmospheric Hero & CTA Backdrops**: Preserved via downloaded original `.avif` surface artwork (`Hero_20Surface-p-1600.avif` and `image_2019291-p-1600.avif`).
