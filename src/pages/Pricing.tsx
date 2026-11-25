import React, { useEffect } from 'react';
import { Check, Minus } from 'lucide-react';
import { KeelButton } from '@/components/common/KeelButton';
import { GetStartedSection } from '@/components/cta/GetStartedSection';
import { pricingComparisonRows, pricingPlans } from '@/data/pricing';
import './Pricing.css';

export const Pricing: React.FC = () => {
  useEffect(() => {
    document.title = 'Pricing — Keel';
  }, []);

  return (
    <div className="pricing-page">
      {/* 1. PRICING HERO */}
      <section className="soft-gradient-hero pricing-hero">
        <img
          src="/assets/images/mockups/6abcdf7528dca1668d770105_image_20130_20_2_.avif"
          alt=""
          aria-hidden="true"
          className="soft-gradient-hero__bg"
        />
        <div className="container soft-gradient-hero__content pricing-hero__inner">
          <div className="keel-pill-badge">PRICING</div>
          <h1 className="h1 pricing-hero__title">
            Simple plans for a clearer
            <br />
            financial life.
          </h1>
          <p className="text-default text-muted pricing-hero__sub">
            Link accounts, cards, budgets and goals securely in one workspace built for everyday
            clarity.
          </p>
        </div>
      </section>

      {/* 2. PLAN HEADER CARDS + COMPARISON TABLE */}
      <section className="pricing-comparison-section">
        <div className="container">
          <div className="pricing-headers-grid">
            <div className="pricing-headers-spacer" />
            {pricingPlans.map((plan) => (
              <div key={plan.id} className="pricing-header-artwork">
                <img src={plan.cardArtwork} alt={`${plan.name} plan card`} />
              </div>
            ))}
          </div>

          <div className="pricing-table-wrap">
            <table className="pricing-table" aria-label="Keel plan comparison">
              <thead>
                <tr>
                  <th scope="col" className="pricing-table__key-heading">
                    KEY FEATURES
                  </th>
                  <th scope="col" className="sr-only">
                    Keel Essential
                  </th>
                  <th scope="col" className="sr-only">
                    Keel Plus
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingComparisonRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="pricing-table__label">
                      {row.label}
                    </th>
                    <td>
                      {typeof row.essential === 'boolean' ? (
                        row.essential ? (
                          <Check size={16} aria-label="Included" />
                        ) : (
                          <Minus size={16} aria-label="Not included" className="text-subtle" />
                        )
                      ) : (
                        row.essential
                      )}
                    </td>
                    <td>
                      {typeof row.plus === 'boolean' ? (
                        row.plus ? (
                          <Check size={16} aria-label="Included" />
                        ) : (
                          <Minus size={16} aria-label="Not included" className="text-subtle" />
                        )
                      ) : (
                        row.plus
                      )}
                    </td>
                  </tr>
                ))}

                <tr className="pricing-table__price-row">
                  <th scope="row" className="pricing-table__label">
                    Price
                  </th>
                  <td>
                    <span className="h4">$16</span>{' '}
                    <span className="h5 text-muted">/ month</span>
                  </td>
                  <td>
                    <span className="h4">$24</span>{' '}
                    <span className="h5 text-muted">/ month</span>
                  </td>
                </tr>

                <tr className="pricing-table__cta-row">
                  <th scope="row" className="sr-only">
                    Get Started
                  </th>
                  <td>
                    <KeelButton label="Get Started" to="/contact" fullWidth />
                  </td>
                  <td>
                    <KeelButton label="Get Started" to="/contact" fullWidth />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <GetStartedSection />
    </div>
  );
};
