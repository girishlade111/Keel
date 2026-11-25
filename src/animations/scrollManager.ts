import Lenis from 'lenis';
import { ensureGsapRegistered, prefersReducedMotion } from './gsapSetup';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

export function initSmoothScroll(): () => void {
  if (prefersReducedMotion()) {
    return () => {};
  }

  const { ScrollTrigger } = ensureGsapRegistered();
  const lenis = new Lenis({ lerp: 0.08 });
  lenisInstance = lenis;

  lenis.on('scroll', ScrollTrigger.update);

  const raf = (time: number) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    lenis.destroy();
    if (lenisInstance === lenis) {
      lenisInstance = null;
    }
  };
}

export function scrollToTopSmooth() {
  if (prefersReducedMotion()) {
    window.scrollTo(0, 0);
    return;
  }
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: false });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
