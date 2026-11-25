import { describe, expect, it } from 'vitest';
import { articles, catalogArticles, featuredArticle } from '@/data/articles';
import { integrations } from '@/data/integrations';
import { pricingPlans, pricingComparisonRows } from '@/data/pricing';
import { faqItems } from '@/data/faqs';
import { siteConfig } from '@/data/siteConfig';

describe('Keel CMS & Configuration Integrity', () => {
  it('has 13 total articles (1 featured + 12 catalog)', () => {
    expect(articles.length).toBe(13);
    expect(featuredArticle.slug).toBe('more-systems-for-calmer-money');
    expect(catalogArticles.length).toBe(12);
  });

  it('matches exact blog category counts (Planning 4, Saving 3, Systems 2, Guide 3)', () => {
    const counts = catalogArticles.reduce<Record<string, number>>((acc, a) => {
      acc[a.category] = (acc[a.category] || 0) + 1;
      return acc;
    }, {});
    expect(counts).toEqual({
      Planning: 4,
      Saving: 3,
      Systems: 2,
      Guide: 3,
    });
  });

  it('has all 9 integration entries with unique slugs and local logos', () => {
    expect(integrations.length).toBe(9);
    const slugs = new Set(integrations.map((i) => i.slug));
    expect(slugs.size).toBe(9);
    for (const item of integrations) {
      expect(item.logo.startsWith('/assets/')).toBe(true);
    }
  });

  it('has synchronized monthly & yearly pricing data and 9 comparison rows', () => {
    expect(pricingPlans.length).toBe(2);
    expect(pricingPlans[0].monthlyPrice).toBe(16);
    expect(pricingPlans[1].monthlyPrice).toBe(24);
    expect(pricingComparisonRows.length).toBe(9);
  });

  it('has 6 FAQ entries and valid site navigation links', () => {
    expect(faqItems.length).toBe(6);
    expect(siteConfig.allPagesDropdown.pages.length).toBe(7);
    expect(siteConfig.allPagesDropdown.utilities.length).toBe(5);
  });
});
