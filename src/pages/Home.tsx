import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SectionLabel } from '@/components/common/SectionLabel';
import { KeelButton } from '@/components/common/KeelButton';
import { PhoneMockup } from '@/components/product/PhoneMockup';
import { ResultsSection } from '@/components/home/ResultsSection';
import { TestimonialSlider } from '@/components/home/TestimonialSlider';
import { BenefitsCarousel } from '@/components/home/BenefitsCarousel';
import { HomepagePricing } from '@/components/home/HomepagePricing';
import { FAQSection } from '@/components/faq/FAQSection';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { GetStartedSection } from '@/components/cta/GetStartedSection';
import { catalogArticles } from '@/data/articles';
import {
  deepDiveSlides,
  onboardingSteps,
  problemSlides,
  solutionCards,
} from '@/data/homeData';
import { siteConfig } from '@/data/siteConfig';
import { ensureGsapRegistered, prefersReducedMotion } from '@/animations/gsapSetup';
import './Home.css';

export const Home: React.FC = () => {
  const [problemIdx, setProblemIdx] = useState(0);
  const [deepDiveIdx, setDeepDiveIdx] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Keel — A Smarter Financial Lifestyle';
    const root = pageRef.current;
    if (!root || prefersReducedMotion()) return;

    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[fade-up="true"]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const currentProblem = problemSlides[problemIdx];
  const currentDeepDive = deepDiveSlides[deepDiveIdx];
  const latestThree = catalogArticles.slice(0, 3);

  return (
    <div ref={pageRef} className="home-page">
      {/* 1. HERO SECTION */}
      <section className="home-hero">
        <img
          src="/assets/images/mockups/6ab135b5e6467afd042abace_1ca8579cc8412d3a193d1b27f2176635_image_20130-p-1600.avif"
          alt=""
          aria-hidden="true"
          className="home-hero__bg"
        />
        <div className="container home-hero__container">
          <div className="home-hero__top">
            <div className="home-hero__left-meta">
              <div className="keel-pill-badge">FINANCIAL CONTROL</div>
              <div className="home-hero__trust">
                <div className="home-hero__avatars">
                  <img
                    src="/assets/images/mockups/6ab13f8eaf0e27ad7e72e97a_Frame_202147263454.avif"
                    alt="Keel user avatar"
                    width={36}
                    height={36}
                  />
                  <img
                    src="/assets/images/mockups/6ab13f8e86b5260ca8f35ba8_Frame_202147263471.avif"
                    alt="Keel user avatar"
                    width={36}
                    height={36}
                  />
                  <img
                    src="/assets/images/mockups/6ab13f8ef9239acaa5650f3b_Frame_202147263472.avif"
                    alt="Keel user avatar"
                    width={36}
                    height={36}
                  />
                </div>
                <div>
                  <div className="text-small text-subtle">Trusted By</div>
                  <div className="text-small" style={{ fontWeight: 500 }}>
                    120K+ Global Users
                  </div>
                </div>
              </div>
            </div>

            <div className="home-hero__headline-col">
              <h1 className="h1 home-hero__title">
                A Smarter
                <br />
                Financial
                <br />
                Lifestyle
              </h1>
              <div className="home-hero__cta">
                <KeelButton label={siteConfig.primaryCtaLabel} to={siteConfig.primaryCtaHref} />
              </div>
            </div>

            <div className="home-hero__phone-col">
              <PhoneMockup variant="hero" />
            </div>
          </div>

          <div className="home-hero__info-panel">
            <div className="home-hero__info-left">
              <div>
                <div className="home-hero__why-label">WHY KEEL</div>
                <p className="text-default text-muted home-hero__why-copy">
                  Accounts, cards and budgets stay connected in one place for daily choices and goals
                </p>
              </div>

              <div className="home-hero__info-bottom">
                <img
                  src="/assets/icons/6ab157b6850c852a26b9e853_Vector_20_6_.svg"
                  alt=""
                  width={56}
                  height={58}
                  aria-hidden="true"
                />
                <h2 className="h6 home-hero__info-h2">
                  Everything you need to manage money with confidence.
                </h2>
              </div>
            </div>

            <div className="home-hero__info-media">
              <img
                src="/assets/images/mockups/6ab1555cc3954e117c843f3e_Frame_202147263482.avif"
                alt="Keel financial overview card graphic"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM STATEMENT SLIDER */}
      <section className="problem-section" aria-labelledby="problem-heading">
        <div className="container">
          <div className="problem-header">
            <SectionLabel label="PROBLEM" index="01" />
            <h2 id="problem-heading" className="h2 problem-title">
              Money feels harder than it should when accounts and plans stay disconnected.
            </h2>
          </div>

          <div className="problem-card" fade-up="true">
            <div className="problem-card__visual">
              <img src={currentProblem.image} alt="" loading="lazy" />
            </div>

            <div className="problem-card__body">
              <div className="problem-card__top">
                <h3 className="h6 problem-card__title">{currentProblem.title}</h3>
                <div className="problem-card__dots" role="tablist" aria-label="Problem slides">
                  {problemSlides.map((s, idx) => (
                    <button
                      key={s.stat}
                      type="button"
                      role="tab"
                      aria-selected={problemIdx === idx}
                      aria-label={`Problem slide ${idx + 1}: ${s.stat}`}
                      className={`problem-dot ${problemIdx === idx ? 'is-active' : ''}`}
                      onClick={() => setProblemIdx(idx)}
                    />
                  ))}
                </div>
              </div>

              <div className="problem-card__stat-row">
                <div>
                  <div className="problem-card__stat">{currentProblem.stat}</div>
                  <p className="text-small text-muted problem-card__desc">
                    {currentProblem.description}
                  </p>
                </div>
                <KeelButton label={siteConfig.primaryCtaLabel} to={siteConfig.primaryCtaHref} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE-CARD SOLUTION OVERVIEW */}
      <section className="solution-section" aria-labelledby="solution-heading">
        <div className="container">
          <div className="solution-header">
            <SectionLabel label="THE SOLUTION" index="02" />
            <h2 id="solution-heading" className="h2 solution-title">
              Every money move,
              <br />
              one clear view
            </h2>
            <p className="text-default text-muted solution-sub">
              Ask, see and control accounts, cards, budgets and cash flow from one connected
              workspace.
            </p>
          </div>

          <div className="solution-grid">
            {solutionCards.map((card) => (
              <div key={card.title} className="solution-card" fade-up="true">
                <div className="solution-card__media">
                  <img src={card.image} alt={card.title} loading="lazy" />
                  {card.overlayLogo && (
                    <img
                      src={card.overlayLogo}
                      alt=""
                      aria-hidden="true"
                      className="solution-card__overlay-logo"
                    />
                  )}
                </div>
                <div className="solution-card__text">
                  <h3 className="solution-card__title">{card.title}</h3>
                  <p className="text-small text-muted solution-card__desc">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THREE-STEP ONBOARDING */}
      <section className="works-section" aria-labelledby="works-heading">
        <div className="container">
          <div className="works-grid">
            <div className="works-left">
              <SectionLabel label="HOW IT WORKS" index="03" />
              <h2 id="works-heading" className="h2 works-title">
                Get clear in three simple steps
              </h2>
              <p className="text-default text-muted works-sub">
                Connect your accounts, set a plan and keep every money decision clear from one
                workspace.
              </p>
              <div className="works-cta">
                <KeelButton label={siteConfig.primaryCtaLabel} to={siteConfig.primaryCtaHref} />
              </div>
            </div>

            <div className="works-steps">
              {onboardingSteps.map((step) => (
                <div key={step.number} className="works-step-card" fade-up="true">
                  <div className="works-step-card__top">
                    <span className="text-small text-subtle">{step.number}</span>
                    <img
                      src="/assets/images/mockups/6ab3602110dbef39c87b1223_4ad0772666aa1fea8291219052b7cb8f_Frame_202147263043.svg"
                      alt=""
                      width={12}
                      height={10}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="works-step-card__icon">
                    <img src={step.icon} alt="" width={24} height={24} aria-hidden="true" />
                  </div>
                  <h3 className="h6 works-step-card__title">{step.title}</h3>
                  <p className="text-small text-muted works-step-card__desc">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURE BENTO */}
      <section className="bento-section" aria-label="Core Features Overview">
        <div className="container">
          <div className="bento-top-grid">
            <div className="bento-card bento-card--light" fade-up="true">
              <SectionLabel label="FEATURES" index="03-1" />
              <h3 className="h4 bento-card__heading">
                Your full money picture is right in your pocket.
              </h3>
              <div className="bento-card__wallet-visuals">
                <img
                  src="/assets/images/mockups/6ab36fc7322c9c05f540a9ea_482af0ac3dbc6c3d73f84767a93a713b_S.svg"
                  alt="Account balance summary"
                  className="bento-wallet-summary"
                  loading="lazy"
                />
                <img
                  src="/assets/brand/6ae0f030e2cca3f12ed8b18b_keel-quick-transfer.avif"
                  alt="Quick transfer widget"
                  className="bento-wallet-transfer"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="bento-card bento-card--gradient" fade-up="true">
              <SectionLabel label="FEATURES" index="03-2" />
              <h3 className="h4 bento-card__heading">Every account stays connected and clear</h3>
              <div className="bento-card__stack-visual">
                <img
                  src="/assets/brand/6ae0f02f7a586fd89d015dc9_keel-payment-stack.avif"
                  alt="Stacked debit and credit cards with $3,200.00 balance"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="bento-dark-panel dark-grid-surface" fade-up="true">
            <div className="dark-grid-overlay" aria-hidden="true" />
            <div className="bento-dark-panel__content">
              <SectionLabel label="FEATURES" index="03-3" variant="light" />
              <h3 className="h2 bento-dark-panel__title">One system for every money move</h3>
              <p className="bento-dark-panel__desc">
                Move and approve money while budgets, goals and account rules stay connected in one
                workspace.
              </p>
              <KeelButton label="Explore More Features" to="/features" variant="light" />
            </div>
            <div className="bento-dark-panel__phone">
              <PhoneMockup variant="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRODUCT DEEP-DIVE */}
      <section className="deep-dive-section" aria-labelledby="deep-dive-heading">
        <div className="deep-dive-card">
          <img
            src="/assets/images/backgrounds/6ab3ad4112e488d5d71a6006_Hero_20Surface-p-1600.avif"
            alt=""
            aria-hidden="true"
            className="deep-dive-card__bg"
            loading="lazy"
          />
          <div className="container deep-dive-card__inner">
            <div className="deep-dive-header">
              <SectionLabel label="PRODUCT" index="05" />
              <h2 id="deep-dive-heading" className="h2 deep-dive-title">
                Every money detail, clear
                <br />
                and within easy reach.
              </h2>
            </div>

            <div className="deep-dive-stage">
              <div className="deep-dive-phone">
                <img
                  src="/assets/images/phones/6ab3ad419ed041e0203e617e_4341e302e7407f5be89151053828a4a2_iPhone_20Space_20Silver_20Front.avif"
                  alt="Keel analytics and transactions interface on smartphone"
                  loading="lazy"
                />
              </div>

              <div className="deep-dive-controls">
                <div className="deep-dive-slide">
                  <div className="deep-dive-slide__index">{currentDeepDive.index}</div>
                  <h3 className="h5 deep-dive-slide__title">{currentDeepDive.title}</h3>
                  <p className="text-default text-muted deep-dive-slide__desc">
                    {currentDeepDive.description}
                  </p>
                </div>

                <div className="deep-dive-nav">
                  <div className="deep-dive-arrows">
                    <button
                      type="button"
                      className="circle-arrow-btn"
                      onClick={() =>
                        setDeepDiveIdx(
                          (i) => (i - 1 + deepDiveSlides.length) % deepDiveSlides.length
                        )
                      }
                      aria-label="Previous product detail"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      type="button"
                      className="circle-arrow-btn"
                      onClick={() => setDeepDiveIdx((i) => (i + 1) % deepDiveSlides.length)}
                      aria-label="Next product detail"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  <div className="deep-dive-dots" role="tablist" aria-label="Product feature slides">
                    {deepDiveSlides.map((s, idx) => (
                      <button
                        key={s.index}
                        type="button"
                        role="tab"
                        aria-selected={deepDiveIdx === idx}
                        aria-label={s.title}
                        className={`problem-dot ${deepDiveIdx === idx ? 'is-active' : ''}`}
                        onClick={() => setDeepDiveIdx(idx)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RESULTS CHART & METRICS */}
      <ResultsSection />

      {/* 8. TESTIMONIALS */}
      <TestimonialSlider />

      {/* 9. DARK BENEFITS CAROUSEL */}
      <BenefitsCarousel />

      {/* 10. PRICING CARDS WITH MONTHLY / YEARLY TOGGLE */}
      <HomepagePricing />

      {/* 11. FAQ */}
      <FAQSection indexLabel="10" background="white-to-body" />

      {/* 12. LATEST INSIGHTS */}
      <section className="home-blog-section" aria-labelledby="home-blog-heading">
        <div className="container">
          <div className="home-blog__header">
            <div>
              <SectionLabel label="BLOG" index="11" />
              <h2 id="home-blog-heading" className="h2 home-blog__title">
                Read what moves money.
              </h2>
              <p className="text-default text-muted home-blog__sub">
                Practical notes on spending, saving, and building calmer financial habits.
              </p>
            </div>
            <KeelButton label="View All" to="/blogs" />
          </div>

          <div className="home-blog__grid">
            {latestThree.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* 13. SHARED GET STARTED CTA */}
      <GetStartedSection />
    </div>
  );
};
