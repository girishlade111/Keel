import React, { useEffect } from 'react';
import { KeelButton } from '@/components/common/KeelButton';
import './UtilityPages.css';

export const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = '404 Page Not Found — Keel';
  }, []);

  return (
    <div className="utility-page">
      <section className="soft-gradient-hero error-404-section">
        <img
          src="/assets/images/mockups/6abcdf7528dca1668d770105_image_20130_20_2_.avif"
          alt=""
          aria-hidden="true"
          className="soft-gradient-hero__bg"
        />
        <div className="container soft-gradient-hero__content error-404__inner">
          <div className="error-404-card">
            <div className="error-404__digits" aria-label="404">
              <span>4</span>
              <span className="error-404__circle" aria-hidden="true" />
              <span>4</span>
            </div>
            <h1 className="h6 error-404__title">Page Not Found</h1>
            <div className="error-404__divider" />
            <p className="text-small text-muted error-404__desc">
              The request URL doesn’t exist. Please go back to Keel home.
            </p>
            <KeelButton label="Back to Home" to="/" />
          </div>
        </div>
      </section>
    </div>
  );
};
