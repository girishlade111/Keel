import React, { useEffect, useRef } from 'react';
import { ensureGsapRegistered, prefersReducedMotion } from '@/animations/gsapSetup';

interface RollingNumberProps {
  value: string;
  className?: string;
  triggerOnScroll?: boolean;
}

export const RollingNumber: React.FC<RollingNumberProps> = ({
  value,
  className = '',
  triggerOnScroll = true,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = ensureGsapRegistered();
    const windows = Array.from(el.querySelectorAll<HTMLElement>('.digit-window'));
    if (windows.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline(
        triggerOnScroll
          ? {
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
              },
            }
          : {}
      );

      windows.forEach((win, idx) => {
        const train = win.querySelector<HTMLElement>('.digit-train');
        const targetDigit = Number(win.dataset.digit || '0');
        const digitHeight = win.offsetHeight || 64;
        if (!train || !digitHeight) return;

        const direction = idx % 2 === 0 ? 'up' : 'down';
        const startIndex = direction === 'up' ? targetDigit + 10 : targetDigit + 30;
        const finalIndex = targetDigit + 20;

        gsap.set(train, { y: -(startIndex * digitHeight) });
        tl.to(
          train,
          {
            y: -(finalIndex * digitHeight),
            duration: 2.2,
            ease: 'power3.out',
          },
          0
        );
      });

      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, [value, triggerOnScroll]);

  if (prefersReducedMotion()) {
    return (
      <span className={`train-counter ${className}`} aria-label={value}>
        {value}
      </span>
    );
  }

  return (
    <span ref={containerRef} className={`train-counter ${className}`} aria-label={value}>
      {[...value].map((char, i) => {
        if (/^\d$/.test(char)) {
          return (
            <span
              key={i}
              className="digit-window"
              data-digit={char}
              aria-hidden="true"
            >
              <span className="digit-train">
                {[0, 1, 2, 3].map((cycle) =>
                  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <span key={`${cycle}-${num}`} className="digit">
                      {num}
                    </span>
                  ))
                )}
              </span>
            </span>
          );
        }
        return (
          <span
            key={i}
            className={`static-char ${char === '.' ? 'dot' : ''}`}
            aria-hidden="true"
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};
