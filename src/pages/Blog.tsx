import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KeelButton } from '@/components/common/KeelButton';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { GetStartedSection } from '@/components/cta/GetStartedSection';
import { catalogArticles, featuredArticle, type BlogCategory } from '@/data/articles';
import './Blog.css';

const PAGE_SIZE = 6;

const FILTER_OPTIONS: Array<{ key: 'ALL' | BlogCategory; label: string; count: string }> = [
  { key: 'ALL', label: 'ALL', count: '12' },
  { key: 'Planning', label: 'PLANNING', count: '04' },
  { key: 'Saving', label: 'SAVING', count: '03' },
  { key: 'Systems', label: 'SYSTEMS', count: '02' },
  { key: 'Guide', label: 'GUIDE', count: '03' },
];

export const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = (searchParams.get('category') as 'ALL' | BlogCategory) || 'ALL';
  const currentPage = Math.max(1, Number(searchParams.get('page') || '1') || 1);

  useEffect(() => {
    document.title = 'Insights & Blog — Keel';
  }, []);

  const filtered =
    activeCat === 'ALL'
      ? catalogArticles
      : catalogArticles.filter((a) => a.category.toLowerCase() === activeCat.toLowerCase());

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const selectCategory = (cat: 'ALL' | BlogCategory) => {
    if (cat === 'ALL') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const goToPage = (p: number) => {
    const next: Record<string, string> = {};
    if (activeCat !== 'ALL') next.category = activeCat;
    if (p > 1) next.page = String(p);
    setSearchParams(next);
  };

  return (
    <div className="blog-page">
      {/* 1. BLOG HERO */}
      <section className="blog-hero">
        <div className="container">
          <div className="keel-pill-badge">BLOG</div>
          <div className="blog-hero__grid">
            <h1 className="h1 blog-hero__title">Read what grows wealth.</h1>
            <div className="blog-hero__right">
              <p className="text-default text-muted">
                A calm, repeatable check-in for seeing what changed, choosing what matters next, and
                keeping your money moving with intention.
              </p>
              <div className="blog-hero__cadence">Update every Thursday</div>
            </div>
          </div>

          {/* 2. FEATURED ARTICLE */}
          <article className="featured-article-card">
            <div className="featured-article-card__left">
              <div className="featured-article-card__meta-top">
                <div className="featured-article-card__author">
                  <img
                    src={featuredArticle.author.avatar}
                    alt={featuredArticle.author.name}
                    width={40}
                    height={40}
                  />
                  <div>
                    <div className="featured-article-card__author-name">
                      {featuredArticle.author.name}
                    </div>
                    <div className="text-small text-subtle">{featuredArticle.author.role}</div>
                  </div>
                </div>
                <div className="featured-article-card__date">
                  <div className="text-xs text-subtle">{featuredArticle.shortDate}</div>
                  <div className="text-xs" style={{ fontWeight: 500 }}>
                    {featuredArticle.readingTime} MIN READ
                  </div>
                </div>
              </div>

              <div className="featured-article-card__bottom">
                <h2 className="h4 featured-article-card__title">
                  <Link to={`/blog/${featuredArticle.slug}`}>{featuredArticle.title}</Link>
                </h2>
                <p className="text-small text-muted featured-article-card__excerpt">
                  {featuredArticle.excerpt}
                </p>
                <div>
                  <KeelButton label="Read More" to={`/blog/${featuredArticle.slug}`} />
                </div>
              </div>
            </div>

            <Link to={`/blog/${featuredArticle.slug}`} className="featured-article-card__media">
              <img src={featuredArticle.coverImage} alt={featuredArticle.title} />
            </Link>
          </article>
        </div>
      </section>

      {/* 3. NEWEST POSTS + CATEGORY FILTERS + PAGINATION */}
      <section className="blog-catalog-section" aria-label="Blog articles">
        <div className="container">
          <div className="blog-catalog__toolbar">
            <h2 className="blog-catalog__heading">NEWEST POSTS</h2>

            <div className="blog-filters" role="tablist" aria-label="Filter articles by category">
              {FILTER_OPTIONS.map((opt) => {
                const isActive = activeCat === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`blog-filter-pill ${isActive ? 'is-active' : ''}`}
                    onClick={() => selectCategory(opt.key)}
                  >
                    {opt.label} / {opt.count}
                  </button>
                );
              })}
            </div>
          </div>

          {pageItems.length === 0 ? (
            <div className="blog-empty">No articles found in this category.</div>
          ) : (
            <div className="blog-grid">
              {pageItems.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="blog-pagination" role="navigation" aria-label="Blog pagination">
              {safePage > 1 && (
                <button
                  type="button"
                  className="blog-page-btn"
                  onClick={() => goToPage(safePage - 1)}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
              )}
              {safePage < totalPages && (
                <button
                  type="button"
                  className="blog-page-btn"
                  onClick={() => goToPage(safePage + 1)}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <GetStartedSection />
    </div>
  );
};
