import React, { useEffect } from 'react';
import { SectionLabel } from '@/components/common/SectionLabel';
import './UtilityPages.css';

export const Licenses: React.FC = () => {
  useEffect(() => {
    document.title = 'Licenses — Keel';
  }, []);

  return (
    <div className="utility-page">
      <section className="utility-hero-section">
        <div className="container">
          <div className="utility-title-card">
            <div className="keel-pill-badge">UTILITY</div>
            <h1 className="h1">License</h1>
            <p className="text-default text-muted utility-title-card__sub">
              All graphical assets in this template are licensed for personal and commercial use. If
              you&apos;d like to use a specific asset, please check the license below.
            </p>
          </div>

          <div className="sg-row">
            <div className="sg-row__left">
              <SectionLabel label="IMAGE" index="01" />
            </div>
            <div className="sg-row__right utility-copy-block">
              <p className="text-default text-muted">
                All Images in this template are licensed for personal and commercial use. If
                you&apos;d like to use a specific asset, please check the license below.
              </p>
              <p className="text-default">
                All Images are sourced from:{' '}
                <a href="https://www.lummi.ai" target="_blank" rel="noopener noreferrer" className="utility-ext-link">
                  Lummi
                </a>
                ,{' '}
                <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="utility-ext-link">
                  Unsplash
                </a>
              </p>
            </div>
          </div>

          <div className="sg-row">
            <div className="sg-row__left">
              <SectionLabel label="FONTS" index="02" />
            </div>
            <div className="sg-row__right utility-copy-block">
              <p className="text-default text-muted">
                This template uses a single font family, licensed for personal and commercial use
                under the SIL Open Font License. It is sourced from Google Fonts:{' '}
                <a
                  href="https://fonts.google.com/specimen/Inter+Tight"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="utility-ext-link"
                >
                  Inter Tight
                </a>
                .
              </p>
            </div>
          </div>

          <div className="sg-row sg-row--last">
            <div className="sg-row__left">
              <SectionLabel label="ICON" index="03" />
            </div>
            <div className="sg-row__right utility-copy-block">
              <p className="text-default text-muted">
                All Icons in this template are licensed for personal and commercial use. If you&apos;d
                like to use a specific asset, please check the license below.
              </p>
              <p className="text-default">
                All Icons are sourced from:{' '}
                <a
                  href="https://icons8.com/line-awesome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="utility-ext-link"
                >
                  LineAwesome
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
