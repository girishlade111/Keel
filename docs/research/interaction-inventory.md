# Keel Interaction Inventory

All interactive controls verified end-to-end by `scripts/verify-all-routes.ts` against production build (`vite preview`):

1. **Header Navigation & "All pages" Dropdown (`src/components/layout/Header.tsx`)**:
   - Dual hover (`onMouseEnter`) + click (`onClick` with 450ms hover-debounce guard so hover-then-click does not immediately collapse) and `Escape` key dismissal.
   - Exposes 7 primary pages (`Home`, `About`, `Features`, `Pricing`, `Insights`, `Integrations`, `Contact`) and 5 utility routes (`Style Guide`, `License`, `Changelog`, `Instructions`, `Password`).
   - Mobile hamburger drawer (`<= 991px`) with focusable navigation groups and full-width `Get Started` CTA.
2. **Homepage Problem Statement Switcher (`src/pages/Home.tsx`)**:
   - Tab controls (`Problem slide 1..3`) switching problem statistic copy (`4+hrs`, `5+`, etc.) and card photography.
3. **Homepage Testimonial Slider (`src/components/home/TestimonialSlider.tsx`)**:
   - Avatar selector thumbnails + prev/next navigation arrows updating active quote, author name, role, and portrait.
4. **Homepage Benefits Carousel (`src/components/home/BenefitsCarousel.tsx`)**:
   - Multi-slide dark surface showcase with dot pagination and prev/next controls.
5. **Homepage Pricing Billing Switch (`src/components/home/HomepagePricing.tsx`)**:
   - Accessible `role="switch"` toggle (`Toggle yearly billing`) updating `Keel Essential` (`$16.00` monthly / `$13.33` yearly) and `Keel Plus` (`$24.00` monthly / `$20.00` yearly). Note: `/pricing` matches the live reference by displaying fixed monthly comparison columns (`$16 / month`, `$24 / month`) without a billing toggle.
6. **FAQ Accordion (`src/components/faq/FAQSection.tsx`)**:
   - Toggle buttons with `aria-expanded` and high-contrast white `+` / `×` Lucide icon inside black circular trigger badge.
7. **Insights / Blog Category Filter & Pagination (`src/pages/Blog.tsx`)**:
   - URL-synced query state (`?category=`, `?page=`) filtering across `ALL / 12`, `PLANNING / 04`, `SAVING / 03`, `SYSTEMS / 02`, `GUIDE / 03` with 6 cards per page and prev/next pagination buttons.
8. **Contact Enquiry Form (`src/pages/Contact.tsx`)**:
   - `react-hook-form` + `zod` schema validating required `First Name`, `Last Name`, valid `Email`, and `Message`, plus configurable submission endpoint (`VITE_CONTACT_ENDPOINT`) with Demo mode validation feedback when unset.
9. **Footer Newsletter Form (`src/components/layout/Footer.tsx`)**:
   - Validated email signup with configurable `VITE_NEWSLETTER_ENDPOINT` and Demo mode confirmation feedback.
10. **Protected Page Password Preview (`src/pages/Password.tsx`)**:
    - Form validation feedback matching reference utility page behavior.
