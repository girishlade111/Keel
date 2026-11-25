import React, { useEffect, useRef, useState } from 'react';
import { SectionLabel } from '@/components/common/SectionLabel';
import { KeelButton } from '@/components/common/KeelButton';
import { RollingNumber } from '@/components/charts/RollingNumber';
import { GetStartedSection } from '@/components/cta/GetStartedSection';
import { siteConfig } from '@/data/siteConfig';
import { partnerLogosRowOne, partnerLogosRowTwo, teamMembers } from '@/data/team';
import { ensureGsapRegistered, prefersReducedMotion } from '@/animations/gsapSetup';
import './About.css';

const philosophyItems = [
  {
    title: 'Clarity First',
    body: 'We turn scattered financial information into one clear picture, so you can understand your money without digging through multiple accounts and apps.',
  },
  {
    title: 'Control Without Complexity',
    body: 'Stay in control of spending, budgets, and goals with simple tools designed to help you make decisions without adding more work.',
  },
  {
    title: 'Progress You Can See',
    body: 'Every budget, saving goal, and financial decision should move you forward. Keel makes that progress visible and easy to follow.',
  },
  {
    title: 'Built for Real Life',
    body: 'Your finances change every day. Keel adapts to the way you actually spend, save, and plan—not the other way around.',
  },
];

const principles = [
  {
    number: '/01',
    title: 'Connect',
    subtitle: 'Everything in one place',
    icon: '/assets/images/mockups/6abb66c6a92eaa67298bb89c_link-solid.svg',
    bullets: [
      'Connect accounts, cards, and financial tools in one workspace.',
      'See balances, spending, and budgets without switching between apps.',
      'Keep your financial information organized and always up to date.',
    ],
  },
  {
    number: '/02',
    title: 'Understand',
    subtitle: 'Know where your money goes',
    icon: '/assets/images/charts/6abb66c6eedbad4e79873ff4_chart-pie-solid.svg',
    bullets: [
      'See your spending patterns across every connected account.',
      'Understand your habits with simple and useful financial insights.',
      'Turn everyday transactions into a clearer financial picture.',
    ],
  },
  {
    number: '/03',
    title: 'Stay in Control',
    subtitle: 'Make progress with confidence',
    icon: '/assets/images/mockups/6abb66c6414bf9b85aa8e1c0_bullseye-solid.svg',
    bullets: [
      'Set budgets and savings goals that fit your everyday life.',
      'Track your progress without constantly checking your finances.',
      'Stay ahead of upcoming spending and long-term priorities.',
    ],
  },
];

const valuesColumns = [
  {
    title: 'Make It Clear',
    subtitle: 'Less noise, more understanding.',
    description:
      'Bring financial information into one simple view, so people can understand where they stand without the complexity.',
    icon: '/assets/icons/6abca7edd801e9051110f769_eye-solid.svg',
  },
  {
    title: 'Make It Personal',
    subtitle: 'Built around real life.',
    description:
      'Give people tools that adapt to their habits, priorities, and goals instead of forcing them into rigid financial systems.',
    icon: '/assets/icons/6abca7d1a973bad1b6a47f90_user.svg',
  },
  {
    title: 'Make It Possible',
    subtitle: 'Turn clarity into confidence.',
    description:
      'Help people make better everyday decisions, build healthier habits, and move steadily toward the future they want.',
    icon: '/assets/images/charts/6abca7b482b8ecfd7f9a71bf_chart-line-solid.svg',
  },
];

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'About Us — Keel';
    const root = pageRef.current;
    if (!root || prefersReducedMotion()) return;

    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      const circles = root.querySelector('.about-values__circles');
      if (circles) {
        gsap.fromTo(
          circles,
          { y: 40, scale: 0.94, opacity: 0.7 },
          {
            y: -15,
            scale: 1.03,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.about-values-section',
              start: 'top 75%',
              end: 'bottom 30%',
              scrub: true,
            },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="about-page">
      {/* 1. ABOUT HERO */}
      <section className="soft-gradient-hero about-hero">
        <img
          src="/assets/images/mockups/6abb4ca7e48f3c140d241a6c_image_20130_20_1_.avif"
          alt=""
          aria-hidden="true"
          className="soft-gradient-hero__bg"
        />
        <div className="container soft-gradient-hero__content about-hero__inner">
          <div className="about-hero__app-icon" aria-hidden="true">
            <img
              src="/assets/images/mockups/6abb4a3586100e0e81e87333_Polygon_201.svg"
              alt=""
              className="about-hero__polygon"
            />
            <img
              src="/assets/images/mockups/6abb4a35692aa5041a6c2231_Vector_20_11_.svg"
              alt=""
              className="about-hero__mark"
            />
          </div>
          <h1 className="h1 about-hero__title">
            Every money move,
            <br />
            one clear view
          </h1>
          <p className="text-default text-muted about-hero__sub">
            Ask, see and control accounts, cards, budgets and cash flow from one connected
            workspace.
          </p>
          <KeelButton label={siteConfig.primaryCtaLabel} to={siteConfig.primaryCtaHref} />
        </div>
      </section>

      {/* 2. DARK PRODUCT PHILOSOPHY */}
      <section className="about-philosophy-section">
        <div className="container">
          <div className="about-section-head">
            <SectionLabel label="OUR VALUES" index="01" />
            <h2 className="h2 about-section-head__title">
              Money management
              <br />
              built around clarity.
            </h2>
          </div>

          <div className="dark-grid-surface about-philosophy-panel">
            <div className="dark-grid-overlay" aria-hidden="true" />
            <div className="about-philosophy__left">
              <h3 className="h5 about-philosophy__title">Make money feel simpler.</h3>

              <div className="about-philosophy__accordion">
                {philosophyItems.map((item, idx) => {
                  const isOpen = activeTab === idx;
                  return (
                    <div key={item.title} className={`about-acc-item ${isOpen ? 'is-open' : ''}`}>
                      <button
                        type="button"
                        className="about-acc-item__trigger"
                        aria-expanded={isOpen}
                        onClick={() => setActiveTab(idx)}
                      >
                        <span>{item.title}</span>
                        <span className="about-acc-item__icon" aria-hidden="true">
                          <img
                            src="/assets/icons/6ab0e2fa75bb8f53da54efd3_plus.svg"
                            alt=""
                            width={14}
                            height={14}
                          />
                        </span>
                      </button>
                      <div
                        className="about-acc-item__content"
                        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                      >
                        <div className="about-acc-item__inner">
                          <p>{item.body}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <KeelButton
                  label={siteConfig.primaryCtaLabel}
                  to={siteConfig.primaryCtaHref}
                  variant="light"
                />
              </div>
            </div>

            <div className="about-philosophy__right">
              <img
                src="/assets/images/mockups/6abb568220476a9362abef2a_Rectangle_2034624625.avif"
                alt="Person managing personal finances on smartphone"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE PRINCIPLE CARDS */}
      <section className="about-principles-section">
        <div className="container">
          <div className="about-section-head">
            <SectionLabel label="WHY CHOOSE US" index="02" />
            <h2 className="h2 about-section-head__title">
              Clearer money.
              <br />
              Better decisions.
            </h2>
          </div>

          <div className="about-principles-grid">
            {principles.map((p) => (
              <div key={p.number} className="about-principle-card">
                <div className="about-principle-card__top">
                  <span className="text-small text-subtle">{p.number}</span>
                  <img
                    src="/assets/images/mockups/6ab3602110dbef39c87b1223_4ad0772666aa1fea8291219052b7cb8f_Frame_202147263043.svg"
                    alt=""
                    width={12}
                    height={10}
                    aria-hidden="true"
                  />
                </div>
                <div className="about-principle-card__head">
                  <img src={p.icon} alt="" width={28} height={28} aria-hidden="true" />
                  <h3 className="h5">{p.title}</h3>
                </div>
                <div className="about-principle-card__sub">{p.subtitle}</div>
                <ul className="about-principle-card__list">
                  {p.bullets.map((b) => (
                    <li key={b}>
                      <img
                        src="/assets/images/mockups/6ab7baf3599f8e93c91827cf_check-solid.svg"
                        alt=""
                        width={11}
                        height={11}
                        aria-hidden="true"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATISTICS & CIRCULAR DIAGRAM */}
      <section className="about-stats-section">
        <div className="container">
          <div className="about-stats__top">
            <div>
              <SectionLabel label="REAL RESULTS" index="03" />
              <h2 className="h2 about-stats__title">
                Built to make money
                <br />
                management simpler.
              </h2>
            </div>
            <p className="text-default text-muted about-stats__sub">
              From everyday spending to long-term goals, Keel helps more people understand their
              money, build better habits, and stay in control.
            </p>
          </div>

          <div className="about-stats__grid">
            <div className="about-stats__diagram">
              <img
                src="/assets/images/mockups/6abb9fa4cd1d0befaf0da77c_9d91b18d3e9173a1b3f538ec1e2cf405_Ellipse_207473.svg"
                alt=""
                aria-hidden="true"
                className="about-stats__circle-bg"
                loading="lazy"
              />
              <img
                src="/assets/images/mockups/6abb9fa2ea898c682b9f29d6_2c26590480508167ba1c19db2d4e158e_Vector_20_2812_29.svg"
                alt=""
                aria-hidden="true"
                className="about-stats__circle-ring"
                loading="lazy"
              />
            </div>

            <div className="about-stats__list">
              <div className="about-stat-row">
                <img
                  src="/assets/images/mockups/6abb9fa2ce072ad7a5a3d6dc_Group_20239716.svg"
                  alt=""
                  aria-hidden="true"
                  className="about-stat-row__connector"
                />
                <div className="about-stat-row__body">
                  <div className="about-stat-row__num">
                    <RollingNumber value="85" className="h1" />
                    <span className="h1">K</span>
                    <span className="about-stat-row__plus">+</span>
                  </div>
                  <div className="about-stat-row__label">Active users</div>
                  <p className="text-small text-muted">
                    People using Keel to track spending, manage budgets, and stay on top of their
                    finances.
                  </p>
                </div>
              </div>

              <div className="about-stat-row about-stat-row--offset">
                <img
                  src="/assets/images/mockups/6abb9fa2ce072ad7a5a3d6dc_Group_20239716.svg"
                  alt=""
                  aria-hidden="true"
                  className="about-stat-row__connector"
                />
                <div className="about-stat-row__body">
                  <div className="about-stat-row__num">
                    <RollingNumber value="18" className="h1" />
                    <span className="h1">M</span>
                  </div>
                  <div className="about-stat-row__label">Transactions tracked</div>
                  <p className="text-small text-muted">
                    Financial activity organized and monitored through the Keel platform every month.
                  </p>
                </div>
              </div>

              <div className="about-stat-row">
                <img
                  src="/assets/images/mockups/6abb9fa2ce072ad7a5a3d6dc_Group_20239716.svg"
                  alt=""
                  aria-hidden="true"
                  className="about-stat-row__connector"
                />
                <div className="about-stat-row__body">
                  <div className="about-stat-row__num">
                    <RollingNumber value="94" className="h1" />
                    <span className="h1">%</span>
                  </div>
                  <div className="about-stat-row__label">User retention</div>
                  <p className="text-small text-muted">
                    Users who continue using Keel to manage their money after their first month.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PARTNER LOGO STRIP */}
      <section className="about-partners-section" aria-label="Global Partners">
        <div className="container">
          <div className="about-partners__label">
            <SectionLabel label="GLOBAL PARTNERS" index="04" />
          </div>
        </div>

        <div className="about-partners__marquee-wrap">
          <div className="about-partners__row about-partners__row--left">
            {[...partnerLogosRowOne, ...partnerLogosRowOne, ...partnerLogosRowOne].map((src, i) => (
              <div key={`r1-${i}`} className="about-partner-pill">
                <img src={src} alt="Partner logo" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="about-partners__row about-partners__row--right">
            {[...partnerLogosRowTwo, ...partnerLogosRowTwo, ...partnerLogosRowTwo].map((src, i) => (
              <div key={`r2-${i}`} className="about-partner-pill">
                <img src={src} alt="Partner logo" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MISSION FULL-WIDTH PHOTO */}
      <section className="about-mission-photo">
        <img
          src="/assets/images/mockups/6abbbf8d59eee977a499051d_image_2019293-p-1600.avif"
          alt="Two Keel team members reviewing financial interface together"
          className="about-mission-photo__img"
          loading="lazy"
        />
        <div className="about-mission-photo__scrim" aria-hidden="true" />
        <div className="container about-mission-photo__content">
          <SectionLabel label="OUR STORY" index="05" variant="light" />
          <h2 className="h2 about-mission-photo__title">
            We built Keel because
            <br />
            money was getting too
            <br />
            complicated.
          </h2>
          <p className="about-mission-photo__sub">
            Keel started with a simple belief: managing money should not mean jumping between apps,
            spreadsheets, and scattered accounts. We built one clear space to help people understand
            their finances, make better decisions.
          </p>
        </div>
      </section>

      {/* 7. TEAM GRID */}
      <section className="about-team-section">
        <div className="container">
          <div className="about-stats__top">
            <div>
              <SectionLabel label="TEAM MEMBERS" index="06" />
              <h2 className="h2 about-stats__title">
                A small team building
                <br />
                a clearer financial life.
              </h2>
            </div>
            <p className="text-default text-muted about-stats__sub">
              A calm, repeatable check-in for seeing what changed, choosing what matters next, and
              keeping your money moving with intention.
            </p>
          </div>

          <div className="about-team-grid">
            {teamMembers.map((member) => (
              <div key={member.name} className="team-card">
                <div className="team-card__photo">
                  <img src={member.image} alt={`${member.name} portrait`} loading="lazy" />
                </div>
                <div className="team-card__meta">
                  <div>
                    <div className="team-card__dept">{member.department}</div>
                    <div className="team-card__name">{member.name}</div>
                    <div className="team-card__role">{member.role}</div>
                  </div>
                  <div className="team-card__socials" aria-label={`${member.name} social links`}>
                    <img
                      src="/assets/images/mockups/6abbca10bda28036442d2c56_Frame.svg"
                      alt=""
                      width={14}
                      height={14}
                      aria-hidden="true"
                    />
                    <img
                      src="/assets/images/mockups/6abbc9efc52b00c17a992482_Vector.svg"
                      alt=""
                      width={14}
                      height={14}
                      aria-hidden="true"
                    />
                    <img
                      src="/assets/images/mockups/6abbc9cae4a0e03da84be08f_Vector.svg"
                      alt=""
                      width={14}
                      height={14}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="team-contact-card">
              <div className="team-contact-card__top">
                <span className="team-contact-card__badge">BUILD WITH US</span>
                <span className="team-contact-card__dot" aria-hidden="true" />
              </div>
              <div className="team-contact-card__mid">
                <h3 className="h5 team-contact-card__title">
                  Make finance
                  <br />
                  feel human.
                </h3>
                <p className="team-contact-card__desc">
                  We are looking for thoughtful builders who care about clarity, craft and real-world
                  impact.
                </p>
              </div>
              <KeelButton label="Contact Us" to="/contact" variant="light" fullWidth />
            </div>
          </div>
        </div>
      </section>

      {/* 8. VALUES & DECORATIVE CORAL CIRCLES */}
      <section className="about-values-section">
        <div className="container">
          <div className="about-section-head">
            <SectionLabel label="OUR MISSION" index="07" />
            <h2 className="h2 about-section-head__title">
              Make financial clarity
              <br />
              feel effortless.
            </h2>
            <p className="text-default text-muted about-values__sub">
              We believe managing money should feel clear, calm, and empowering, not fragmented,
              overwhelming, or difficult to understand.
            </p>
          </div>

          <div className="about-values-columns">
            {valuesColumns.map((v) => (
              <div key={v.title} className="about-value-col">
                <div className="about-value-col__head">
                  <h3 className="h5">{v.title}</h3>
                  <img src={v.icon} alt="" width={20} height={20} aria-hidden="true" />
                </div>
                <div className="about-value-col__sub">{v.subtitle}</div>
                <p className="text-small text-muted">{v.description}</p>
              </div>
            ))}
          </div>

          <div className="about-values__circles" aria-hidden="true">
            <img
              src="/assets/images/mockups/6abcac5f22d8581ea1fd1509_Vector_20_13_.svg"
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <GetStartedSection />
    </div>
  );
};
