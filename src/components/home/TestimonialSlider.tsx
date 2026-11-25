import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionLabel } from '@/components/common/SectionLabel';
import { testimonials } from '@/data/team';

export const TestimonialSlider: React.FC = () => {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  const prev = () => setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((i) => (i + 1) % testimonials.length);

  return (
    <section className="testimonials-section" aria-label="Customer testimonials">
      <div className="container">
        <div className="testimonials-top-label">
          <SectionLabel label="TESTIMONIAL" index="07" />
        </div>

        <div className="testimonial-card" fade-up="true">
          <div className="testimonial-card__media">
            <img
              src={current.portrait}
              alt={`${current.name} portrait`}
              className="testimonial-card__portrait"
              loading="lazy"
            />
            <div className="testimonial-card__gradient" aria-hidden="true" />
          </div>

          <div className="testimonial-card__content">
            <div className="testimonial-card__quote-mark" aria-hidden="true">
              <img
                src="/assets/images/mockups/6ab52774f1f549bce56e4955_Mark.svg"
                alt=""
                width={28}
                height={22}
              />
            </div>

            <blockquote className="testimonial-card__quote">{current.quote}</blockquote>

            <div className="testimonial-card__author-row">
              <div>
                <div className="testimonial-card__name">{current.name}</div>
                <div className="text-small text-muted">{current.tenure}</div>
                <div className="text-small text-subtle">{current.goal}</div>
              </div>
              <div className="testimonial-card__index">{current.index}</div>
            </div>

            <div className="testimonial-card__controls">
              <div className="testimonial-card__avatars" role="tablist" aria-label="Select testimonial">
                {testimonials.map((t, idx) => (
                  <button
                    key={t.index}
                    type="button"
                    role="tab"
                    aria-selected={active === idx}
                    aria-label={`View testimonial from ${t.name}`}
                    className={`testimonial-avatar-btn ${active === idx ? 'is-active' : ''}`}
                    onClick={() => setActive(idx)}
                  >
                    <img src={t.avatar} alt={t.name} width={44} height={44} />
                  </button>
                ))}
              </div>

              <div className="testimonial-card__arrows">
                <button
                  type="button"
                  className="circle-arrow-btn"
                  onClick={prev}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="circle-arrow-btn circle-arrow-btn--dark"
                  onClick={next}
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
