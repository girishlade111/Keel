import React, { useEffect } from 'react';
import { SectionLabel } from '@/components/common/SectionLabel';
import { KeelButton } from '@/components/common/KeelButton';
import { PhoneMockup } from '@/components/product/PhoneMockup';
import { FAQSection } from '@/components/faq/FAQSection';
import { GetStartedSection } from '@/components/cta/GetStartedSection';
import { siteConfig } from '@/data/siteConfig';
import './Features.css';

export const Features: React.FC = () => {
  useEffect(() => {
    document.title = 'Features — Keel';
  }, []);

  return (
    <div className="features-page">
      {/* 1. CENTERED GRADIENT HERO */}
      <section className="soft-gradient-hero features-hero">
        <img
          src="/assets/images/mockups/6abcdf7528dca1668d770105_image_20130_20_2_.avif"
          alt=""
          aria-hidden="true"
          className="soft-gradient-hero__bg"
        />
        <div className="container soft-gradient-hero__content features-hero__inner">
          <h1 className="h1 features-hero__title">
            Every money move,
            <br />
            one clear view
          </h1>
          <p className="text-default text-muted features-hero__sub">
            Ask, see and control accounts, cards, budgets and cash flow from one connected
            workspace.
          </p>
          <KeelButton label={siteConfig.primaryCtaLabel} to={siteConfig.primaryCtaHref} />

          <div className="features-hero__phone-clip">
            <PhoneMockup variant="features-hero" />
          </div>
        </div>
      </section>

      {/* 2. KEY FEATURES STACK */}
      <section className="features-stack-section">
        <div className="container">
          <div className="features-stack__head">
            <SectionLabel label="KEY FEATURES" index="01" />
            <h2 className="h2 features-stack__title">
              Everything you need to make
              <br />
              smarter money decisions.
            </h2>
          </div>

          <div className="features-panels">
            {/* 03-1 Wallet Feature */}
            <div className="feature-row-card feature-row-card--white">
              <div className="feature-row-card__left">
                <SectionLabel label="FEATURES" index="03-1" />
                <h3 className="h4">Your full money picture is right in your pocket.</h3>
                <p className="text-default text-muted">
                  See your balances, spending, budgets, and goals together in one simple view,
                  wherever you are.
                </p>
                <ul className="feature-checklist">
                  <li>
                    <img
                      src="/assets/images/mockups/6ab7baf3599f8e93c91827cf_check-solid.svg"
                      alt=""
                      width={11}
                      height={11}
                      aria-hidden="true"
                    />
                    <span>See every account and balance at a glance.</span>
                  </li>
                  <li>
                    <img
                      src="/assets/images/mockups/6ab7baf3599f8e93c91827cf_check-solid.svg"
                      alt=""
                      width={11}
                      height={11}
                      aria-hidden="true"
                    />
                    <span>Track spending across all connected accounts.</span>
                  </li>
                  <li>
                    <img
                      src="/assets/images/mockups/6ab7baf3599f8e93c91827cf_check-solid.svg"
                      alt=""
                      width={11}
                      height={11}
                      aria-hidden="true"
                    />
                    <span>Check your financial progress anytime, anywhere.</span>
                  </li>
                </ul>
                <div>
                  <KeelButton label={siteConfig.primaryCtaLabel} to={siteConfig.primaryCtaHref} />
                </div>
              </div>

              <div className="feature-row-card__right feature-row-card__right--wallet">
                <img
                  src="/assets/images/mockups/6ab36fc7322c9c05f540a9ea_482af0ac3dbc6c3d73f84767a93a713b_S.svg"
                  alt="Account balance summary dashboard"
                  className="feature-wallet-img-1"
                  loading="lazy"
                />
                <img
                  src="/assets/brand/6ae0f030e2cca3f12ed8b18b_keel-quick-transfer.avif"
                  alt="Quick transfer panel"
                  className="feature-wallet-img-2"
                  loading="lazy"
                />
              </div>
            </div>

            {/* 03-2 Connected Accounts */}
            <div className="feature-row-card feature-row-card--ribbon">
              <img
                src="/assets/images/mockups/6abcf5963672d6c68edd5abb_image_20130-p-1600.avif"
                alt=""
                aria-hidden="true"
                className="feature-row-card__bg"
                loading="lazy"
              />
              <div className="feature-row-card__left" style={{ position: 'relative', zIndex: 2 }}>
                <SectionLabel label="FEATURES" index="03-2" />
                <h3 className="h4">Every account stays connected and clear</h3>
                <p className="text-default text-muted">
                  Keep your financial information synced in one place, so you always have an accurate
                  view of where your money stands.
                </p>
                <ul className="feature-checklist">
                  <li>
                    <img
                      src="/assets/images/mockups/6ab7baf3599f8e93c91827cf_check-solid.svg"
                      alt=""
                      width={11}
                      height={11}
                      aria-hidden="true"
                    />
                    <span>Connect accounts and cards in one secure workspace.</span>
                  </li>
                  <li>
                    <img
                      src="/assets/images/mockups/6ab7baf3599f8e93c91827cf_check-solid.svg"
                      alt=""
                      width={11}
                      height={11}
                      aria-hidden="true"
                    />
                    <span>Keep balances and transactions up to date.</span>
                  </li>
                  <li>
                    <img
                      src="/assets/images/mockups/6ab7baf3599f8e93c91827cf_check-solid.svg"
                      alt=""
                      width={11}
                      height={11}
                      aria-hidden="true"
                    />
                    <span>Avoid switching between multiple financial apps.</span>
                  </li>
                </ul>
                <div>
                  <KeelButton label={siteConfig.primaryCtaLabel} to={siteConfig.primaryCtaHref} />
                </div>
              </div>

              <div className="feature-row-card__right" style={{ position: 'relative', zIndex: 2 }}>
                <img
                  src="/assets/brand/6ae0f02f7a586fd89d015dc9_keel-payment-stack.avif"
                  alt="Stacked debit and credit cards with balance"
                  className="feature-stack-img"
                  loading="lazy"
                />
              </div>
            </div>

            {/* 03-3 One System Dark */}
            <div className="feature-row-card dark-grid-surface feature-row-card--dark">
              <div className="dark-grid-overlay" aria-hidden="true" />
              <div className="feature-row-card__left" style={{ position: 'relative', zIndex: 2 }}>
                <SectionLabel label="FEATURES" index="03-3" variant="light" />
                <h3 className="h4" style={{ color: '#fff' }}>
                  One system for every money move
                </h3>
                <p className="text-default" style={{ color: 'rgba(255,255,255,0.72)' }}>
                  Manage everyday spending, saving, and planning with tools that work together
                  around your financial goals.
                </p>
                <ul className="feature-checklist feature-checklist--light">
                  <li>
                    <img
                      src="/assets/images/mockups/6ab7baf3599f8e93c91827cf_check-solid.svg"
                      alt=""
                      width={11}
                      height={11}
                      aria-hidden="true"
                    />
                    <span>Set budgets that match your everyday spending.</span>
                  </li>
                  <li>
                    <img
                      src="/assets/images/mockups/6ab7baf3599f8e93c91827cf_check-solid.svg"
                      alt=""
                      width={11}
                      height={11}
                      aria-hidden="true"
                    />
                    <span>Create and track goals as your priorities change.</span>
                  </li>
                  <li>
                    <img
                      src="/assets/images/mockups/6ab7baf3599f8e93c91827cf_check-solid.svg"
                      alt=""
                      width={11}
                      height={11}
                      aria-hidden="true"
                    />
                    <span>Make smarter decisions with clear financial insights.</span>
                  </li>
                </ul>
                <div>
                  <KeelButton
                    label={siteConfig.primaryCtaLabel}
                    to={siteConfig.primaryCtaHref}
                    variant="light"
                  />
                </div>
              </div>

              <div
                className="feature-row-card__right feature-row-card__right--phone"
                style={{ position: 'relative', zIndex: 2 }}
              >
                <PhoneMockup variant="dark" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW KEEL FITS: TRACK, PLAN, GROW */}
      <section className="fits-section">
        <div className="container">
          <div className="features-stack__head">
            <SectionLabel label="HOW KEEL FITS" index="02" />
            <h2 className="h2 features-stack__title">
              Everything works
              <br />
              better together.
            </h2>
            <p className="text-default text-muted fits-sub">
              Keel connects the everyday parts of your financial life, giving you one system to
              manage spending, planning, and progress.
            </p>
          </div>

          <div className="fits-columns">
            <div className="fits-col">
              <img
                src="/assets/icons/6abdf75b8a2a908304e67718_binoculars-solid.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
              <h3 className="h6">01 — Track</h3>
              <div className="fits-col__sub">Know what’s happening</div>
              <p className="text-small text-muted">
                See your balances, transactions, and spending patterns in one connected view.
              </p>
            </div>
            <div className="fits-col">
              <img
                src="/assets/icons/6abdf75b5f2a79e9b7551b30_calendar-check.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
              <h3 className="h6">02 — Plan</h3>
              <div className="fits-col__sub">Give your money direction</div>
              <p className="text-small text-muted">
                Build budgets and savings goals around what matters most to you.
              </p>
            </div>
            <div className="fits-col">
              <img
                src="/assets/images/charts/6abca7b482b8ecfd7f9a71bf_chart-line-solid.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
              <h3 className="h6">03 — Grow</h3>
              <div className="fits-col__sub">Turn habits into progress</div>
              <p className="text-small text-muted">
                Use clear insights to make better decisions and build stronger financial habits over
                time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PHOTOGRAPHIC PRODUCT BENEFITS */}
      <section className="lifestyle-benefits-section">
        <div className="container">
          <div className="features-stack__head">
            <SectionLabel label="BENEFITS" index="03" />
            <h2 className="h2 features-stack__title">
              Every money move,
              <br />
              one clear view
            </h2>
          </div>

          <div className="lifestyle-rows">
            <div className="lifestyle-row">
              <div className="lifestyle-row__text">
                <div className="lifestyle-row__eyebrow">SMART BUDGETING</div>
                <h3 className="h4">Stay Ahead of Spending</h3>
                <p className="text-default text-muted">
                  Set flexible budgets around your real spending habits, so you always know what you
                  can spend and where your money is going.
                </p>
                <div>
                  <KeelButton label={siteConfig.primaryCtaLabel} to={siteConfig.primaryCtaHref} />
                </div>
              </div>

              <div className="lifestyle-row__media">
                <img
                  src="/assets/images/mockups/6abe07e2d0b04f1b0a015a24_Rectangle_2034624625.avif"
                  alt="Person using smartphone to check monthly budget"
                  className="lifestyle-row__photo"
                  loading="lazy"
                />
                <img
                  src="/assets/images/mockups/6abe07e115e9c184631c1c80_Content.avif"
                  alt="Monthly budget progress card"
                  className="lifestyle-row__overlay lifestyle-row__overlay--left"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lifestyle-row lifestyle-row--reverse">
              <div className="lifestyle-row__media">
                <img
                  src="/assets/images/mockups/6abe0b4d445800c27736a76e_Rectangle_2034624625.avif"
                  alt="Mature man relaxing indoors"
                  className="lifestyle-row__photo"
                />
                <img
                  src="/assets/images/mockups/6abe0b4bb7a51584cfe21ea8_Content.avif"
                  alt="Savings goals Japan Trip $10,220 progress card"
                  className="lifestyle-row__overlay lifestyle-row__overlay--right"
                />
              </div>

              <div className="lifestyle-row__text">
                <div className="lifestyle-row__eyebrow">SAVINGS GOALS</div>
                <h3 className="h4">Turn Your Plans Into Real Progress</h3>
                <p className="text-default text-muted">
                  Set meaningful savings goals and watch your progress grow, with a clearer path
                  from where your money is today to where you want it to be.
                </p>
                <div>
                  <KeelButton label={siteConfig.primaryCtaLabel} to={siteConfig.primaryCtaHref} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection indexLabel="04" background="white-to-body" />
      <GetStartedSection />
    </div>
  );
};
