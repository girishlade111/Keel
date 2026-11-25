import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionLabel } from '@/components/common/SectionLabel';
import { KeelButton } from '@/components/common/KeelButton';
import { benefitsSlides } from '@/data/homeData';
import { siteConfig } from '@/data/siteConfig';

export const BenefitsCarousel: React.FC = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + benefitsSlides.length) % benefitsSlides.length);
  const next = () => setActive((i) => (i + 1) % benefitsSlides.length);

  return (
    <section className="key-benefits-section" aria-labelledby="benefits-heading">
      <div className="container">
        <div className="key-benefits__header">
          <div className="key-benefits__header-left">
            <SectionLabel label="KEY BENEFITS" index="08" variant="light" />
            <h2 id="benefits-heading" className="h2 key-benefits__title">
              Clear when you check in, connected whenever your money moves.
            </h2>
          </div>
          <div className="key-benefits__header-right">
            <KeelButton
              label={siteConfig.primaryCtaLabel}
              to={siteConfig.primaryCtaHref}
              variant="light"
            />
          </div>
        </div>

        <div className="key-benefits__divider" />

        <div className="key-benefits__viewport">
          <div
            className="key-benefits__track"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {benefitsSlides.map((slide) => (
              <div key={slide.index} className="benefit-slide">
                <div className="benefit-slide__media">
                  <img
                    src={slide.bgImage}
                    alt=""
                    aria-hidden="true"
                    className="benefit-slide__bg"
                    loading="lazy"
                  />
                  <img
                    src={slide.fgImage}
                    alt={slide.title}
                    className="benefit-slide__fg"
                    loading="lazy"
                  />
                </div>
                <div className="benefit-slide__meta">
                  <div className="benefit-slide__index">{slide.index}</div>
                  <h3 className="benefit-slide__title">{slide.title}</h3>
                  <p className="benefit-slide__desc">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="key-benefits__nav">
          <div className="key-benefits__dots" role="tablist" aria-label="Benefits slides">
            {benefitsSlides.map((slide, idx) => (
              <button
                key={slide.index}
                type="button"
                role="tab"
                aria-selected={active === idx}
                aria-label={`Slide ${idx + 1}: ${slide.title}`}
                className={`key-benefits__dot ${active === idx ? 'is-active' : ''}`}
                onClick={() => setActive(idx)}
              />
            ))}
          </div>
          <div className="key-benefits__arrows">
            <button
              type="button"
              className="circle-arrow-btn circle-arrow-btn--dark-outline"
              onClick={prev}
              aria-label="Previous benefit"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="circle-arrow-btn circle-arrow-btn--light"
              onClick={next}
              aria-label="Next benefit"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
