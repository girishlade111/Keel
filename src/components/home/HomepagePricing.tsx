import React, { useState } from 'react';
import { SectionLabel } from '@/components/common/SectionLabel';
import { KeelButton } from '@/components/common/KeelButton';
import { pricingPlans } from '@/data/pricing';

export const HomepagePricing: React.FC = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section className="home-pricing-section" aria-labelledby="home-pricing-heading">
      <div className="container">
        <div className="home-pricing__header">
          <SectionLabel label="PRICING" index="09" />
          <h2 id="home-pricing-heading" className="h2 home-pricing__title">
            Simple plans for a clearer financial life.
          </h2>
          <p className="text-default text-muted home-pricing__sub">
            Link accounts, cards, budgets and goals securely in one workspace built for everyday
            clarity.
          </p>
        </div>

        <div className="home-pricing__cards">
          {pricingPlans.map((plan) => {
            const isYearly = billing === 'yearly';
            const displayPrice = isYearly ? plan.yearlyMonthlyPrice : plan.monthlyPrice;
            const displaySaved = isYearly ? plan.yearlySavingsLabel : plan.monthlySavingsLabel;

            return (
              <div key={plan.id} className="home-pricing-card" fade-up="true">
                <div className="home-pricing-card__left">
                  <div className="home-pricing-card__top">
                    <div
                      className="billing-toggle"
                      role="group"
                      aria-label={`Billing period for ${plan.name}`}
                    >
                      <button
                        type="button"
                        className={`billing-toggle__label ${!isYearly ? 'is-active' : ''}`}
                        onClick={() => setBilling('monthly')}
                      >
                        MONTHLY
                      </button>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isYearly}
                        aria-label="Toggle yearly billing"
                        className={`billing-toggle__switch ${isYearly ? 'is-yearly' : ''}`}
                        onClick={() => setBilling(isYearly ? 'monthly' : 'yearly')}
                      >
                        <span className="billing-toggle__thumb" />
                      </button>
                      <button
                        type="button"
                        className={`billing-toggle__label ${isYearly ? 'is-active' : ''}`}
                        onClick={() => setBilling('yearly')}
                      >
                        YEARLY
                      </button>
                    </div>

                    <div className="home-pricing-card__plan-meta">
                      <div>
                        <div className="home-pricing-card__name">{plan.name}</div>
                        <div className="home-pricing-card__badge">
                          <span className="home-pricing-card__badge-dot" aria-hidden="true" />
                          <span>{plan.badge}</span>
                        </div>
                      </div>

                      <div className="home-pricing-card__price-col">
                        <div className="home-pricing-card__price-row">
                          <span className="h3">${displayPrice.toFixed(2)}</span>
                          <span className="text-small text-muted">/ MONTH</span>
                        </div>
                        <div className="home-pricing-card__billed">
                          <span>${plan.yearlyBilledTotal.toFixed(2)} billed yearly. </span>
                          <span className="home-pricing-card__saved">{displaySaved}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="home-pricing-card__features">
                    {plan.features.map((feat) => (
                      <div key={feat} className="home-pricing-card__feature-item">
                        <img
                          src="/assets/images/mockups/6ab7baf3599f8e93c91827cf_check-solid.svg"
                          alt=""
                          width={12}
                          height={12}
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="home-pricing-card__bottom">
                    <div>
                      <div className="home-pricing-card__pay-label">PAY WITH</div>
                      <div className="text-small text-muted">Card · Bank · Wallet</div>
                    </div>
                    <KeelButton label="Get Started" to={plan.ctaUrl} />
                  </div>
                </div>

                <div className="home-pricing-card__right">
                  <img
                    src={plan.cardArtwork}
                    alt={`${plan.name} membership card`}
                    className="home-pricing-card__artwork"
                    loading="lazy"
                  />
                  <div className="home-pricing-card__guarantees">
                    <div className="home-pricing-card__guarantee">
                      <img
                        src="/assets/images/cards/6ab7c12b345451158de0a9ae_Vector.svg"
                        alt=""
                        width={14}
                        height={14}
                        aria-hidden="true"
                      />
                      <span>CANCEL ANYTIME</span>
                    </div>
                    <div className="home-pricing-card__guarantee">
                      <img
                        src="/assets/images/cards/6ab7c0baa8718c2df518eadc_Vector.svg"
                        alt=""
                        width={14}
                        height={14}
                        aria-hidden="true"
                      />
                      <span>14-DAY REVIEW</span>
                    </div>
                    <div className="home-pricing-card__guarantee">
                      <img
                        src="/assets/images/cards/6ab7bf8110e9df803f8c7c0d_Vector.svg"
                        alt=""
                        width={14}
                        height={14}
                        aria-hidden="true"
                      />
                      <span>SUPPORT INCLUDED</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
