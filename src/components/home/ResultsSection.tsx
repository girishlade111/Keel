import React from 'react';
import { SectionLabel } from '@/components/common/SectionLabel';
import { RollingNumber } from '@/components/charts/RollingNumber';
import { resultMetrics } from '@/data/homeData';

export const ResultsSection: React.FC = () => {
  return (
    <section className="results-section" aria-labelledby="results-heading">
      <div className="container">
        <div className="results-header">
          <SectionLabel label="REAL RESULTS" index="06" />
          <h2 id="results-heading" className="h2 results-title">
            Progress you can see and follow
          </h2>
          <p className="text-default text-muted results-sub">
            Follow balances, budgets and goals over time with every change and next step easy to see.
          </p>
        </div>

        <div className="results-chart-wrap" fade-up="true">
          <img
            src="/assets/images/mockups/6ac76f769c33f92895e761cf_a8972c042a09505febaa043423531171_Vector.svg"
            alt="Financial progress trend chart showing upward balance and savings trajectory across four weeks"
            className="results-chart-img"
            loading="lazy"
          />
        </div>

        <div className="results-metrics-grid">
          {resultMetrics.map((m) => (
            <div key={m.index} className="metric-tile" fade-up="true">
              <div className="metric-tile__top">
                <span className="text-small text-subtle">{m.index}</span>
                <img
                  src="/assets/images/mockups/6ab3602110dbef39c87b1223_4ad0772666aa1fea8291219052b7cb8f_Frame_202147263043.svg"
                  alt=""
                  width={12}
                  height={10}
                  aria-hidden="true"
                />
              </div>

              <div className="metric-tile__label-row">
                <img src={m.icon} alt="" width={18} height={18} aria-hidden="true" />
                <span className="text-default">{m.label}</span>
              </div>

              <div className="metric-tile__bottom">
                <div className="metric-tile__value-row">
                  <RollingNumber value={m.value} className="h2" />
                  <span className="h2">{m.suffix}</span>
                </div>
                <p className="text-small text-muted metric-tile__desc">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
