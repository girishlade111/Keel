import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ArticleEntry } from '@/data/articles';
import './ArticleCard.css';

interface ArticleCardProps {
  article: ArticleEntry;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <article className="article-card">
      <Link to={`/blog/${article.slug}`} className="article-card__link">
        <div className="article-card__media">
          <img
            src={article.coverImage}
            alt={article.title}
            loading="lazy"
          />
        </div>
        <div className="article-card__body">
          <div className="article-card__meta">
            <span>{article.category}</span>
            <span aria-hidden="true">/</span>
            <span>{article.publicationDate}</span>
          </div>
          <h3 className="article-card__title">{article.title}</h3>
          <div className="article-card__cta">
            <span>READ MORE</span>
            <ArrowRight size={14} className="article-card__arrow" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </article>
  );
};
