# Keel Product Mockup Audit

Source components: `src/components/product/PhoneMockup.tsx`, `src/components/product/PhoneMockup.css`, `src/components/charts/RollingNumber.tsx`.

## Layered `PhoneMockup` Composition

The interactive Keel iPhone mockup appears in 4 contexts across `/`, `/features`, and global `GetStartedSection`:

1. **Layer 1 (`z-index: 1`, `.keel-phone__frame`)**:
   - Asset: `/assets/images/mockups/6ab149f783943882f5685d2b_8bf14678f1352aa7f80afc76208cae79_Body_20_281_29.avif`
   - Acts as outer hardware silhouette (`object-fit: contain`, `pointer-events: none`).
2. **Layer 2 (`z-index: 2`, `.keel-phone__screen`)**:
   - Asset: `/assets/images/phones/6ab149f786b5260ca8fbe28e_4771fd6f0b655d7d9fcebad2e8433f29_Screen.avif`
   - Renders inner Ryan Brooks wallet screen chrome (`Welcome back`, notification bell, Send/Request/Top-up/New Card actions, Savings `$5,250K`, Travel `$1,400K`).
3. **Layer 3 (`z-index: 3`, `.keel-phone__screen-clip`)**:
   - Clipped inner viewport (`inset: 2.5% 5.6%`, `border-radius: 38px`, `overflow: hidden`) prevents card slides or overlays from escaping the phone bezel.
   - **Balance Overlay (`.keel-phone__balance-overlay`)**: Opaque peach backing (`top: 16.5%`, `left: 5.5%`) cleanly replaces underlying static digits with GSAP-animated multi-column `.keel-phone__digit-col` tracks (`13,1470` -> `23,1470` synced with card deck motion, respecting `prefers-reduced-motion`).
   - **Card Deck Carousel (`.hero-card-wrapper`)**: Horizontal track containing debit (`6ae0f02ca5dc9784ec1daa15_keel-card-debit.avif`) and credit (`6ae0f02d5985e65fbbf8a35e_keel-card-credit.avif`) cards synchronized on a repeating `yoyo: true` GSAP `expo.inOut` timeline (`duration: 1.2`, `repeatDelay: 2`).

## Additional UI Mockups

- **Homepage Financial Results Chart (`/`)**: `/assets/images/mockups/6ac76f769c33f92895e761cf_a8972c042a09505febaa043423531171_Vector.svg`
- **Features & Home Feature Cards**: Quick Transfer card (`6ae0f030e2cca3f12ed8b18b_keel-quick-transfer.avif`), Payment Stack (`6ae0f02f7a586fd89d015dc9_keel-payment-stack.avif`), Cash Flow (`6ab76f42b39946ad1381cdb3_Cash_20Flow_20Card.avif`), Adaptive Controls (`6ab76eaeb1b6eb96b4e8572e_Adaptive_20Controls_20Card.avif`).
- **Features Lifestyle Overlays (`/features`)**: Two photo blocks with bottom-anchored dark floating insight overlay cards (`Monthly Budget $1,200 / $2,300` and `Savings Goal Japan Trip $10,220 / Target $20,000`) layered at `z-index: 3`.
