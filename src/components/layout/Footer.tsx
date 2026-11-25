import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/data/siteConfig';
import { scrollToTopSmooth } from '@/animations/scrollManager';
import './Footer.css';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setStatusMessage("We couldn't add that email. Please check the address and try again.");
      return;
    }

    setStatus('submitting');
    try {
      if (siteConfig.newsletterEndpoint) {
        const res = await fetch(siteConfig.newsletterEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed }),
        });
        if (!res.ok) throw new Error('Request failed');
        setStatus('success');
        setStatusMessage("You're on the list. Expect calm, practical money tips in your inbox soon.");
        setEmail('');
      } else {
        await new Promise((r) => setTimeout(r, 350));
        setStatus('success');
        setStatusMessage(
          "Demo mode: You're on the local preview list. Configure VITE_NEWSLETTER_ENDPOINT for live subscriptions."
        );
        setEmail('');
      }
    } catch {
      setStatus('error');
      setStatusMessage("We couldn't add that email. Please check the address and try again.");
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <Link to="/" className="site-footer__logo" aria-label="Keel Home">
            <img src={siteConfig.footerLogo} alt="Keel" width={254} height={96} />
          </Link>

          <div className="site-footer__newsletter">
            <div className="site-footer__newsletter-title">Subscribe to our Newsletter</div>
            <form className="site-footer__form" onSubmit={handleSubscribe} noValidate>
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                className="site-footer__input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                required
                disabled={status === 'submitting'}
              />
              <button
                type="submit"
                className="site-footer__submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Submit'}
              </button>
            </form>
            {status === 'success' && (
              <p className="site-footer__status site-footer__status--success" role="status">
                {statusMessage}
              </p>
            )}
            {status === 'error' && (
              <p className="site-footer__status site-footer__status--error" role="alert">
                {statusMessage}
              </p>
            )}
          </div>
        </div>

        <div className="site-footer__middle">
          <div className="site-footer__tagline">
            A calmer system for spending, saving, and moving forward.
          </div>

          <div className="site-footer__columns">
            <div className="site-footer__col">
              <div className="site-footer__col-title">PRODUCT</div>
              {siteConfig.footerNav.product.map((item) => (
                <Link key={item.to} to={item.to} className="site-footer__link">
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="site-footer__col">
              <div className="site-footer__col-title">COMPANY</div>
              {siteConfig.footerNav.company.map((item) => (
                <Link key={item.to} to={item.to} className="site-footer__link">
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="site-footer__col">
              <div className="site-footer__col-title">UTILITY</div>
              {siteConfig.footerNav.utility.map((item) => (
                <Link key={item.to} to={item.to} className="site-footer__link">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="site-footer__lower">
          <div className="site-footer__socials">
            {siteConfig.socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__social-btn"
                aria-label={`Keel on ${s.name}`}
              >
                <img src={s.icon} alt="" width={16} height={16} />
              </a>
            ))}
          </div>

          <div className="site-footer__meta">
            <div className="site-footer__meta-block">
              <div className="site-footer__col-title">CONTACT</div>
              <a href={`mailto:${siteConfig.contact.email}`} className="site-footer__meta-link">
                {siteConfig.contact.email}
              </a>
              <a href={siteConfig.contact.phoneHref} className="site-footer__meta-link">
                {siteConfig.contact.phone}
              </a>
            </div>
            <div className="site-footer__meta-block">
              <div className="site-footer__col-title">WORKING HOURS</div>
              <div className="site-footer__meta-text">{siteConfig.contact.workingHours}</div>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <div className="site-footer__copyright">{siteConfig.copyright}</div>
          <button
            type="button"
            className="site-footer__back-top"
            onClick={scrollToTopSmooth}
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};
