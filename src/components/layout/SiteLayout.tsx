import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { initSmoothScroll } from '@/animations/scrollManager';
import { ensureGsapRegistered } from '@/animations/gsapSetup';

export const SiteLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const { ScrollTrigger } = ensureGsapRegistered();
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="site-wrapper">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
