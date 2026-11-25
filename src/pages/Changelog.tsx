import React, { useEffect } from 'react';
import { SectionLabel } from '@/components/common/SectionLabel';
import './UtilityPages.css';

export const Changelog: React.FC = () => {
  useEffect(() => {
    document.title = 'Changelog — Keel';
  }, []);

  return (
    <div className="utility-page">
      <section className="utility-hero-section">
        <div className="container">
          <div className="utility-title-card">
            <div className="keel-pill-badge">UTILITY</div>
            <h1 className="h1">Changelog</h1>
          </div>

          <div className="sg-row sg-row--last">
            <div className="sg-row__left">
              <SectionLabel label="02 JULY, 2026" />
            </div>
            <div className="sg-row__right utility-copy-block">
              <h2 className="h5">Version 1.0.0</h2>
              <p className="text-default text-muted">
                Keel initial multi-page React &amp; GSAP reconstruction release. Complete design
                system tokens, smartphone mockups, rolling counters, CMS articles, integrations,
                pricing comparison, and accessible controls.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
