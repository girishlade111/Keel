import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { integrations } from '@/data/integrations';
import { FAQSection } from '@/components/faq/FAQSection';
import { GetStartedSection } from '@/components/cta/GetStartedSection';
import { NotFound } from '@/pages/NotFound';
import './IntegrationDetail.css';

export const IntegrationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = integrations.find((i) => i.slug === slug);

  useEffect(() => {
    if (item) {
      document.title = `${item.name} Integration — Keel`;
    }
  }, [item]);

  if (!item) {
    return <NotFound />;
  }

  const related = integrations.filter((i) => item.relatedSlugs.includes(i.slug));

  return (
    <div className="int-detail-page">
      <section className="int-detail-section">
        <div className="container">
          <Link to="/integration" className="back-pill-link">
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Back</span>
          </Link>

          <div className="int-detail__hero">
            <h1 className="h1 int-detail__title">{item.name}</h1>
            <div className="int-detail__logos">
              <img src={item.logo} alt={`${item.name} logo`} className="int-detail__partner-logo" />
              <img
                src="/assets/images/mockups/6ac1fcb493c31641547d6389_X.png"
                alt=""
                aria-hidden="true"
                className="int-detail__x"
              />
              <img
                src="/assets/images/mockups/6ac1fcb3f6dd0719a5653667_Group_2070.svg"
                alt="Keel symbol"
                className="int-detail__keel-mark"
              />
            </div>
          </div>

          <div className="int-detail__content">
            <h2 className="h4 int-detail__lead">{item.description}</h2>

            <div className="int-detail__block">
              <h3 className="h6">Overview</h3>
              <p>{item.overview}</p>
            </div>

            <div className="int-detail__block">
              <h3 className="h6">Key Capabilities</h3>
              <h4>Everything you need to stay in control.</h4>
              <p>{item.capabilitiesLead}</p>

              <h4>Real-time Account Sync</h4>
              <p>{item.capabilities[0]}</p>

              <h4>Automatic Transaction Tracking</h4>
              <p>{item.capabilities[1]}</p>

              <h4>Unified Financial View</h4>
              <p>{item.capabilities[2]}</p>
            </div>

            <div className="int-detail__block">
              <h3 className="h6">Setup Instructions</h3>
              <p>{item.setupLead}</p>

              <h4>01 — Connect</h4>
              <p>{item.setupSteps[0]}</p>

              <h4>02 — Sync</h4>
              <p>{item.setupSteps[1]}</p>

              <h4>03 — Take Control</h4>
              <p>{item.setupSteps[2]}</p>
            </div>

            <div className="int-detail__block">
              <h3 className="h6">Security &amp; Privacy</h3>
              <p>{item.security}</p>
            </div>

            {related.length > 0 && (
              <div className="int-detail__related">
                <h3 className="h6">Related Integrations</h3>
                <div className="int-detail__related-grid">
                  {related.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/integrations/${rel.slug}`}
                      className="int-detail__related-card"
                    >
                      <img src={rel.logo} alt={rel.name} />
                      <span>{rel.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <FAQSection indexLabel="04" background="white-to-body" />
      <GetStartedSection />
    </div>
  );
};
