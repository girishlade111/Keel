import React, { useEffect } from 'react';
import { SectionLabel } from '@/components/common/SectionLabel';
import './UtilityPages.css';

export const Instructions: React.FC = () => {
  useEffect(() => {
    document.title = 'Instructions — Keel';
  }, []);

  return (
    <div className="utility-page">
      <section className="utility-hero-section">
        <div className="container">
          <div className="utility-title-card">
            <div className="keel-pill-badge">UTILITY</div>
            <h1 className="h1">Instructions</h1>
          </div>

          <div className="sg-row">
            <div className="sg-row__left">
              <SectionLabel label="DESIGN SYSTEM" index="01" />
            </div>
            <div className="sg-row__right utility-copy-block">
              <h2 className="h6">Centralized Tokens &amp; Typography</h2>
              <p className="text-default text-muted">
                All color tokens, opacity-based shades, Inter Tight fluid scales, spacing, and
                border radii live in <code>src/styles/tokens.css</code> and{' '}
                <code>src/styles/typography.css</code>.
              </p>
            </div>
          </div>

          <div className="sg-row">
            <div className="sg-row__left">
              <SectionLabel label="GSAP &amp; LENIS" index="02" />
            </div>
            <div className="sg-row__right utility-copy-block">
              <h2 className="h6">Number Counter &amp; Card Stack Motion</h2>
              <p className="text-default text-muted">
                <code>RollingNumber</code> implements the 4-cycle alternating digit train with
                GSAP ScrollTrigger. <code>PhoneMockup</code> synchronizes horizontal card deck
                sliding with vertical rolling wallet balance digits, while respecting{' '}
                <code>prefers-reduced-motion</code>.
              </p>
            </div>
          </div>

          <div className="sg-row sg-row--last">
            <div className="sg-row__left">
              <SectionLabel label="CONFIGURATION" index="03" />
            </div>
            <div className="sg-row__right utility-copy-block">
              <h2 className="h6">Site Identity &amp; Endpoints</h2>
              <p className="text-default text-muted">
                Configure contact details, links, and optional API endpoints via{' '}
                <code>src/data/siteConfig.ts</code> and <code>.env.example</code>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
