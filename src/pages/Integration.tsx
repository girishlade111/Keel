import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { integrations } from '@/data/integrations';
import { GetStartedSection } from '@/components/cta/GetStartedSection';
import './Integration.css';

export const Integration: React.FC = () => {
  useEffect(() => {
    document.title = 'Integrations — Keel';
  }, []);

  return (
    <div className="integration-page">
      <section className="integration-hero">
        <div className="container">
          <div className="integration-hero__head">
            <div className="keel-pill-badge">INTEGRATION</div>
            <h1 className="h1 integration-hero__title">
              Smart Financial
              <br />
              Integrations Suite
            </h1>
            <p className="text-default text-muted integration-hero__sub">
              A comprehensive platform that seamlessly connects your financial system manage your
              finances efficiently and effectively
            </p>
          </div>

          <div className="integration-grid">
            {integrations.map((item) => (
              <Link key={item.id} to={`/integrations/${item.slug}`} className="integration-card">
                <div className="integration-card__logo">
                  <img src={item.logo} alt={`${item.name} logo`} loading="lazy" />
                </div>
                <div className="integration-card__body">
                  <h2 className="integration-card__name">{item.name}</h2>
                  <p className="text-small text-muted integration-card__desc">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GetStartedSection />
    </div>
  );
};
