import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeelButton } from '@/components/common/KeelButton';
import { FAQSection } from '@/components/faq/FAQSection';
import { GetStartedSection } from '@/components/cta/GetStartedSection';
import { siteConfig } from '@/data/siteConfig';
import './Contact.css';

const contactSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.string().trim().email('Please enter a valid email address'),
  message: z.string().trim().min(5, 'Please enter a short message'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    document.title = 'Contact Us — Keel';
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitState('loading');
    setServerMsg('');
    try {
      if (siteConfig.contactEndpoint) {
        const res = await fetch(siteConfig.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Submission failed');
        setSubmitState('success');
        setServerMsg('Thank you! Your submission has been received!');
        reset();
      } else {
        await new Promise((r) => setTimeout(r, 400));
        setSubmitState('success');
        setServerMsg(
          'Demo mode: Enquiry validated locally (no external backend configured via VITE_CONTACT_ENDPOINT).'
        );
        reset();
      }
    } catch {
      setSubmitState('error');
      setServerMsg('Oops! Something went wrong while submitting the form.');
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-left">
              <div className="keel-pill-badge">CONTACT</div>
              <h1 className="h1 contact-title">Contact Us</h1>
              <p className="text-default text-muted contact-sub">
                A comprehensive platform that seamlessly connects your financial system manage your
                finances efficiently and effectively
              </p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true">
                    <img
                      src="/assets/icons/6ac23b3713a195647a7eeb80_envelope-solid.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </div>
                  <div>
                    <div className="text-small text-subtle">Email us at</div>
                    <a href={`mailto:${siteConfig.contact.email}`} className="contact-info-value">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true">
                    <img
                      src="/assets/images/phones/6ac23b570b5c6e631b30b583_phone-solid.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </div>
                  <div>
                    <div className="text-small text-subtle">Call us at</div>
                    <a href={siteConfig.contact.phoneHref} className="contact-info-value">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true">
                    <img
                      src="/assets/icons/6ac23b37ee3d0df22822276b_map-marker-alt-solid.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </div>
                  <div>
                    <div className="text-small text-subtle">San Francisco Office</div>
                    <div className="contact-info-value">
                      {siteConfig.contact.addressLine1}
                      <br />
                      {siteConfig.contact.addressLine2}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
                <div className="contact-form__row">
                  <div className="contact-field">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter your name"
                      aria-invalid={Boolean(errors.firstName)}
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <span className="contact-field__err" role="alert">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>

                  <div className="contact-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Enter your name"
                      aria-invalid={Boolean(errors.lastName)}
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <span className="contact-field__err" role="alert">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="email">Email (required)</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    aria-invalid={Boolean(errors.email)}
                    {...register('email')}
                  />
                  {errors.email && (
                    <span className="contact-field__err" role="alert">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="contact-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Leave your message"
                    aria-invalid={Boolean(errors.message)}
                    {...register('message')}
                  />
                  {errors.message && (
                    <span className="contact-field__err" role="alert">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <div className="contact-form__actions">
                  <KeelButton
                    type="submit"
                    label={submitState === 'loading' ? 'Submitting...' : 'Submit'}
                    disabled={submitState === 'loading'}
                  />
                </div>

                {submitState === 'success' && (
                  <div className="contact-status contact-status--success" role="status">
                    {serverMsg}
                  </div>
                )}
                {submitState === 'error' && (
                  <div className="contact-status contact-status--error" role="alert">
                    {serverMsg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <FAQSection indexLabel="04" background="white-to-body" />
      <GetStartedSection />
    </div>
  );
};
