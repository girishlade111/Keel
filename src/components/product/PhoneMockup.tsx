import React, { useEffect, useRef } from 'react';
import { ensureGsapRegistered, prefersReducedMotion } from '@/animations/gsapSetup';
import './PhoneMockup.css';

interface PhoneMockupProps {
  variant?: 'hero' | 'dark' | 'cta' | 'features-hero';
  className?: string;
}

const DIGIT_TRACKS: string[][] = [
  ['1', '2'],
  ['3', '0', '1', '2', '3'],
  [','],
  ['1', '0', '1'],
  ['4', '0', '1', '2', '3', '4'],
  ['7', '0', '1', '2', '3', '4', '5', '6', '7'],
  ['0'],
];

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  variant = 'hero',
  className = '',
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || prefersReducedMotion()) return;

    const { gsap } = ensureGsapRegistered();
    const cardWrapper = wrap.querySelector<HTMLElement>('.hero-card-wrapper');
    const cards = wrap.querySelectorAll<HTMLElement>('.hero-card-box');
    const rollingCols = Array.from(wrap.querySelectorAll<HTMLElement>('[data-rolling-col="true"]'));

    if (!cardWrapper || cards.length < 2) return;

    const ctx = gsap.context(() => {
      const getSlideDistance = () => -(cards[1].offsetLeft - cards[0].offsetLeft);

      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        delay: 2,
        repeatDelay: 2,
        defaults: { duration: 1.2, ease: 'expo.inOut' },
      });

      tl.to(cardWrapper, { x: () => getSlideDistance() }, 'syncAnim');
      if (rollingCols.length > 0) {
        tl.to(
          rollingCols,
          {
            yPercent: (_i, el) => {
              const total = (el as HTMLElement).children.length;
              return -((total - 1) / total) * 100;
            },
            stagger: 0.03,
          },
          'syncAnim'
        );
      }
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`keel-phone keel-phone--${variant} card-hero-wrap ${className}`}
      aria-label="Keel mobile application wallet balance preview"
    >
      <div className="keel-phone__inner">
        <img
          src="/assets/images/mockups/6ab149f783943882f5685d2b_8bf14678f1352aa7f80afc76208cae79_Body_20_281_29.avif"
          alt=""
          aria-hidden="true"
          className="keel-phone__frame"
        />

        <img
          src="/assets/images/phones/6ab149f786b5260ca8fbe28e_4771fd6f0b655d7d9fcebad2e8433f29_Screen.avif"
          alt="Keel mobile wallet screen showing Ryan Brooks balance, card selector, quick actions, savings and travel goals"
          className="keel-phone__screen"
        />

        <div className="keel-phone__screen-clip">
          {/* Animated wallet balance overlay matching reference position */}
          <div className="keel-phone__balance-overlay">
            <div className="keel-phone__balance-label">wallet balance</div>
            <div className="keel-phone__balance-value conter-namber" aria-label="$13,147.00">
              {prefersReducedMotion() ? (
                <span>
                  13,147<span style={{ opacity: 0.35 }}>0</span>
                </span>
              ) : (
                DIGIT_TRACKS.map((track, idx) => {
                  const isLast = idx === DIGIT_TRACKS.length - 1;
                  const isRolling = track.length > 1;
                  return (
                    <span
                      key={idx}
                      className="keel-phone__digit-col"
                      data-rolling-col={isRolling ? 'true' : 'false'}
                      style={isLast ? { opacity: 0.35 } : undefined}
                    >
                      {track.map((ch, j) => (
                        <span key={j} className="keel-phone__digit-item">
                          {ch}
                        </span>
                      ))}
                    </span>
                  );
                })
              )}
            </div>
          </div>

          {/* Sliding card deck inside screen */}
          <div className="keel-phone__cards-viewport">
            <div className="hero-card-wrapper">
              <div className="hero-card-box">
                <img
                  src="/assets/brand/6ae0f02ca5dc9784ec1daa15_keel-card-debit.avif"
                  alt="Keel dark debit card"
                />
              </div>
              <div className="hero-card-box">
                <img
                  src="/assets/brand/6ae0f02d5985e65fbbf8a35e_keel-card-credit.avif"
                  alt="Keel slate credit card"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
