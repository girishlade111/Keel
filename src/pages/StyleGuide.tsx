import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '@/components/common/SectionLabel';
import { KeelButton } from '@/components/common/KeelButton';
import './UtilityPages.css';

const blackSwatches = [
  { name: 'Black - 100', sub: '#000000 / 100%', bg: '#000000' },
  { name: 'Black - 70', sub: '#000000 / 70%', bg: 'rgba(0,0,0,0.70)' },
  { name: 'Black - 50', sub: '#000000 / 50%', bg: 'rgba(0,0,0,0.50)' },
  { name: 'Black - 20', sub: '#000000 / 20%', bg: 'rgba(0,0,0,0.20)' },
  { name: 'Black - 10', sub: '#000000 / 10%', bg: 'rgba(0,0,0,0.10)' },
];

const whiteSwatches = [
  { name: 'White - 100', sub: '#FFFFFF / 100%', bg: '#FFFFFF' },
  { name: 'White - 70', sub: '#FFFFFF / 70%', bg: 'rgba(255,255,255,0.70)' },
  { name: 'White - 50', sub: '#FFFFFF / 50%', bg: 'rgba(255,255,255,0.50)' },
  { name: 'White - 20', sub: '#FFFFFF / 20%', bg: 'rgba(255,255,255,0.20)' },
];

const accentSwatches = [
  { name: 'Coral', sub: '#F46A44 / 100%', bg: '#F46A44' },
  { name: 'Ice', sub: '#ECF5FB / 70%', bg: 'rgba(236,245,251,0.70)' },
];

export const StyleGuide: React.FC = () => {
  useEffect(() => {
    document.title = 'Style Guide — Keel';
  }, []);

  return (
    <div className="utility-page">
      <section className="styleguide-section">
        <div className="container">
          <div className="utility-title-card">
            <div className="keel-pill-badge">UTILITY</div>
            <h1 className="h1">Styleguide</h1>
          </div>

          {/* 01 COLOR */}
          <div className="sg-row">
            <div className="sg-row__left">
              <SectionLabel label="COLOR" index="01" />
            </div>

            <div className="sg-row__right">
              <div className="sg-color-group">
                <h2 className="h6">Black</h2>
                <div className="sg-swatches-grid">
                  {blackSwatches.map((s) => (
                    <div key={s.name} className="sg-swatch">
                      <div className="sg-swatch__box" style={{ background: s.bg }} />
                      <div className="sg-swatch__name">{s.name}</div>
                      <div className="sg-swatch__sub">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sg-color-group">
                <h2 className="h6">White</h2>
                <div className="sg-swatches-grid">
                  {whiteSwatches.map((s) => (
                    <div key={s.name} className="sg-swatch">
                      <div
                        className="sg-swatch__box sg-swatch__box--border"
                        style={{ background: s.bg }}
                      />
                      <div className="sg-swatch__name">{s.name}</div>
                      <div className="sg-swatch__sub">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sg-color-group">
                <h2 className="h6">Accent</h2>
                <div className="sg-swatches-grid">
                  {accentSwatches.map((s) => (
                    <div key={s.name} className="sg-swatch">
                      <div
                        className="sg-swatch__box sg-swatch__box--border"
                        style={{ background: s.bg }}
                      />
                      <div className="sg-swatch__name">{s.name}</div>
                      <div className="sg-swatch__sub">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 02 TYPOGRAPHY */}
          <div className="sg-row">
            <div className="sg-row__left">
              <SectionLabel label="TYPOGRAPHY" index="02" />
            </div>

            <div className="sg-row__right sg-typo-stack">
              <div className="sg-font-specimen">
                <div className="h4">Inter Tight</div>
                <p className="text-small text-muted">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  abcdefghijklmnopqrstuvwxyz · 0123456789
                </p>
              </div>

              <div className="sg-type-item">
                <div className="sg-type-meta">HEADING / 96PX / 100% / -4%</div>
                <div className="h1">H1 Heading</div>
              </div>

              <div className="sg-type-item">
                <div className="sg-type-meta">HEADING / 64PX / 100% / -3%</div>
                <div className="h2">H2 Heading</div>
              </div>

              <div className="sg-type-item">
                <div className="sg-type-meta">HEADING / 48PX / 100% / -2%</div>
                <div className="h3">H3 Heading</div>
              </div>

              <div className="sg-type-item">
                <div className="sg-type-meta">HEADING / 40PX / 100% / -2%</div>
                <div className="h4">H4 Heading</div>
              </div>

              <div className="sg-type-item">
                <div className="sg-type-meta">HEADING / 32PX / 100% / -1%</div>
                <div className="h5">H5 Heading</div>
              </div>

              <div className="sg-type-item">
                <div className="sg-type-meta">HEADING / 24PX / 100% / -1%</div>
                <div className="h6">H6 Heading</div>
              </div>

              <div className="sg-type-item">
                <div className="sg-type-meta">BODY / 20PX / 120% / 0%</div>
                <div className="text-large">Body 1</div>
              </div>

              <div className="sg-type-item">
                <div className="sg-type-meta">BODY / 18PX / 120% / 0%</div>
                <div className="text-medium">Body 2</div>
              </div>

              <div className="sg-type-item">
                <div className="sg-type-meta">BODY / 16PX / 120% / 0%</div>
                <div className="text-default">Body 3</div>
              </div>

              <div className="sg-type-item">
                <div className="sg-type-meta">BODY / 14PX / 120% / 0%</div>
                <div className="text-small">Body 4</div>
              </div>
            </div>
          </div>

          {/* 03 BUTTON */}
          <div className="sg-row sg-row--last">
            <div className="sg-row__left">
              <SectionLabel label="BUTTON" index="03" />
            </div>

            <div className="sg-row__right sg-buttons-row">
              <KeelButton label="Contact Me" to="/contact" />
              <Link to="/blogs" className="keel-text-link">
                <span>READ MORE</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
