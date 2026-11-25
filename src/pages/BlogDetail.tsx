import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { articles, catalogArticles } from '@/data/articles';
import { siteConfig } from '@/data/siteConfig';
import { SectionLabel } from '@/components/common/SectionLabel';
import { KeelButton } from '@/components/common/KeelButton';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { FAQSection } from '@/components/faq/FAQSection';
import { GetStartedSection } from '@/components/cta/GetStartedSection';
import { NotFound } from '@/pages/NotFound';
import './BlogDetail.css';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} — Keel Insights`;
    }
  }, [article]);

  if (!article) {
    return <NotFound />;
  }

  const related = catalogArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="blog-detail-page">
      <section className="blog-detail-section">
        <div className="container">
          <Link to="/blogs" className="back-pill-link">
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Back</span>
          </Link>

          <div className="blog-detail__head-grid">
            <h1 className="h2 blog-detail__title">{article.title}</h1>
            <p className="text-default text-muted blog-detail__excerpt">{article.excerpt}</p>
          </div>

          <div className="blog-detail__meta-bar">
            <div className="blog-detail__author">
              <img src={article.author.avatar} alt={article.author.name} width={44} height={44} />
              <div>
                <div className="blog-detail__author-name">{article.author.name}</div>
                <div className="text-small text-subtle">{article.author.role}</div>
              </div>
            </div>

            <div className="blog-detail__date">
              <div className="text-xs text-subtle">{article.publicationDate}</div>
              <div className="text-xs" style={{ fontWeight: 500 }}>
                {article.readingTime} MIN READ
              </div>
            </div>
          </div>

          <div className="blog-detail__cover">
            <img src={article.detailImage} alt={article.title} />
          </div>

          <div className="blog-detail__body-grid">
            <aside className="blog-detail__sidebar" aria-label="Article table of contents">
              <nav className="blog-detail__toc">
                <a href="#sec-overview">01 / Overview</a>
                <a href="#sec-capabilities">02 / Key Capabilities</a>
                <a href="#sec-setup">03 / Setup Instructions</a>
                <a href="#sec-security">04 / Security & Privacy</a>
              </nav>

              <div className="blog-detail__share">
                <div className="blog-detail__share-title">SHARE THIS POST</div>
                <div className="blog-detail__share-icons">
                  {siteConfig.socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-detail__share-btn"
                      aria-label={`Share on ${s.name}`}
                    >
                      <img src={s.icon} alt="" width={14} height={14} />
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            <div className="blog-detail__article">
              <section id="sec-overview">
                <h2 className="h5">Overview</h2>
                <p>{article.overview}</p>
              </section>

              <section id="sec-capabilities">
                <h2 className="h5">Key Capabilities</h2>
                <p>{article.capabilitiesLead}</p>
                <ul>
                  {article.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </section>

              <div className="blog-detail__inline-img">
                <img src={article.inlineImage} alt="Keel workspace editorial visual" loading="lazy" />
              </div>

              <section id="sec-setup">
                <h2 className="h5">Setup Instructions</h2>
                <p>{article.setupLead}</p>
                <ul>
                  {article.setupSteps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </section>

              <section id="sec-security">
                <h2 className="h5">Security & Privacy</h2>
                <p>{article.security}</p>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Explore more posts */}
      <section className="blog-more-section">
        <div className="container">
          <div className="home-blog__header">
            <div>
              <SectionLabel label="BLOG" showDot />
              <h2 className="h2 home-blog__title">Explore more posts</h2>
              <p className="text-default text-muted home-blog__sub">
                Practical notes on spending, saving, and building calmer financial habits.
              </p>
            </div>
            <KeelButton label="View All" to="/blogs" />
          </div>

          <div className="home-blog__grid">
            {related.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </div>
        </div>
      </section>

      <FAQSection indexLabel="04" background="white-to-body" />
      <GetStartedSection />
    </div>
  );
};
