import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqItems } from '@/data/faqs';
import { SectionLabel } from '@/components/common/SectionLabel';
import './FAQSection.css';

interface FAQSectionProps {
  indexLabel?: string;
  background?: 'white-to-body' | 'body';
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  indexLabel = '04',
  background = 'white-to-body',
}) => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const toggleItem = (idx: string) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      className={`faq-section ${background === 'white-to-body' ? 'faq-section--gradient' : ''}`}
      aria-labelledby="faq-heading"
    >
      <div className="container">
        <div className="faq-grid">
          <div className="faq-left">
            <SectionLabel label="FAQS" index={indexLabel} />
            <h2 id="faq-heading" className="h2 faq-heading">
              Questions,
              <br />
              answered clearly.
            </h2>
            <p className="text-default text-muted faq-sub">
              Plans, account connections, privacy, shared access and support—explained clearly
              before you start.
            </p>
          </div>

          <div className="faq-list">
            {faqItems.map((item) => {
              const isOpen = activeIndex === item.index;
              const panelId = `faq-panel-${item.index}`;
              const btnId = `faq-btn-${item.index}`;
              return (
                <div key={item.index} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    id={btnId}
                    type="button"
                    className="faq-item__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.index)}
                  >
                    <span className="faq-item__index">{item.index}</span>
                    <span className="faq-item__question">{item.question}</span>
                    <span className="faq-item__icon" aria-hidden="true">
                      <Plus size={14} strokeWidth={2.2} color="#ffffff" />
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="faq-item__content-wrap"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                    }}
                  >
                    <div className="faq-item__content-inner">
                      <p className="faq-item__answer">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
