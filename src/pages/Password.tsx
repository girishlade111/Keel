import React, { useEffect, useState } from 'react';
import { KeelButton } from '@/components/common/KeelButton';
import './UtilityPages.css';

export const Password: React.FC = () => {
  const [pass, setPass] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    document.title = 'Protected Page — Keel';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pass.trim()) {
      setFeedback('Please enter a password.');
      return;
    }
    setFeedback(
      'Demonstration UI only: real access control requires server-side authentication.'
    );
  };

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
          <div className="error-404-card password-card">
            <div className="keel-pill-badge">PROTECTED PAGE</div>
            <h1 className="h4" style={{ marginTop: 16 }}>
              Protected Page
            </h1>
            <p className="text-small text-muted" style={{ margin: '10px 0 22px' }}>
              Enter the access passcode to preview protected template layouts.
            </p>
            <form onSubmit={handleSubmit} className="password-form" noValidate>
              <label htmlFor="protected-password" className="sr-only">
                Password
              </label>
              <input
                id="protected-password"
                type="password"
                placeholder="Enter your password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="password-input"
              />
              <KeelButton type="submit" label="Submit" fullWidth />
            </form>
            {feedback && (
              <p className="text-small text-muted" role="status" style={{ marginTop: 14 }}>
                {feedback}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
