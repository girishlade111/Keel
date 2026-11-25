import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import { SectionLabel } from '@/components/common/SectionLabel';
import { KeelButton } from '@/components/common/KeelButton';
import { PhoneMockup } from '@/components/product/PhoneMockup';
import './GetStartedSection.css';

export const GetStartedSection: React.FC = () => {
  return (
    <section className="cta-section" aria-label="Get Started with Keel">
      <img
        src="/assets/images/mockups/6ab8c1abb1319400415ad461_image_2019291-p-1600.avif"
        alt=""
        aria-hidden="true"
        className="cta-section__bg"
        loading="lazy"
      />
      <div className="container cta-section__container">
        <div className="cta-box">
          {/* Left Panel */}
          <div className="cta-box__left">
            <div className="cta-box__left-top">
              <SectionLabel label="GET STARTED" index="NOW" />
              <h2 className="h4 cta-box__heading">Get your money under control.</h2>
              <div className="cta-box__coral-mark">
                <img
                  src="/assets/images/mockups/6ab8e3abfd660243630c087e_Vector.svg"
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="cta-box__left-bottom">
              <div className="cta-box__divider" />
              <p className="cta-box__sub">
                One place
                <br />
                Budgets and goals
                <br />
                together
              </p>
            </div>
          </div>

          {/* Center Overlapping Phone */}
          <div className="cta-box__phone-wrap">
            <PhoneMockup variant="cta" />
          </div>

          {/* Right Panel */}
          <div className="cta-box__right">
            <div className="cta-box__right-top">
              <div className="cta-box__starting-label">STARTING FROM</div>
              <div className="h3 cta-box__price">$16.00</div>
              <p className="text-small text-muted cta-box__desc">
                One connected workspace for accounts, cards, budgets and goals without stitching
                together separate tools.
              </p>
            </div>

            <div className="cta-box__benefits">
              <div className="cta-box__benefit-pill">
                <span className="cta-box__dot" aria-hidden="true" />
                <span>Everything included from day one</span>
              </div>
              <div className="cta-box__benefit-pill">
                <span className="cta-box__dot" aria-hidden="true" />
                <span>No setup fee. Cancel anytime.</span>
              </div>
              <div className="cta-box__benefit-pill">
                <span className="cta-box__dot" aria-hidden="true" />
                <span>Clear controls for shared access</span>
              </div>

              <div className="cta-box__action">
                <KeelButton
                  label={siteConfig.primaryCtaLabel}
                  to={siteConfig.primaryCtaHref}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
