import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const BASE_URL = 'https://keel-templates.webflow.io';

async function main() {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);

  // 1. All pages dropdown
  const allPagesLoc = p.getByText('All pages', { exact: false }).first();
  await allPagesLoc.hover().catch(() => {});
  await p.waitForTimeout(350);
  await allPagesLoc.click().catch(() => {});
  await p.waitForTimeout(400);
  await p.screenshot({ path: 'docs/reference/interactions/navigation-all-pages-expanded.png' });
  const dropdown = await p.evaluate(`(() => {
    const nav = document.querySelector('header, nav, .header-section');
    const links = Array.from(nav ? nav.querySelectorAll('a') : []).map(a => ({
      text: a.textContent.replace(/\\s+/g,' ').trim(),
      href: a.getAttribute('href'),
      cls: a.className
    }));
    const dd = Array.from(document.querySelectorAll('[class*="dropdown"], [class*="sub-menu"], [class*="mega"]')).map(el => ({
      cls: el.className,
      display: getComputedStyle(el).display,
      opacity: getComputedStyle(el).opacity,
      width: getComputedStyle(el).width,
      bg: getComputedStyle(el).backgroundColor,
      radius: getComputedStyle(el).borderRadius,
      text: el.textContent.replace(/\\s+/g,' ').trim().slice(0, 300)
    }));
    return { links, dd };
  })()`);

  // 2. Pricing tabs / toggle on homepage
  const pricingSection = await p.evaluate(`(() => {
    const sec = document.querySelector('.pricing-section');
    if (!sec) return null;
    const tabs = Array.from(sec.querySelectorAll('.w-tab-link, [data-w-tab], button, [class*="toggle"], [class*="switch"]')).map(el => ({
      text: el.textContent.replace(/\\s+/g,' ').trim(),
      cls: el.className,
      tab: el.getAttribute('data-w-tab')
    }));
    return { tabs, htmlSnippet: sec.innerHTML.slice(0, 6000) };
  })()`);

  // 3. Results chart SVG / img on homepage
  const chartInfo = await p.evaluate(`(() => {
    const sec = document.querySelector('.financial-insights-section');
    if (!sec) return null;
    const svgs = Array.from(sec.querySelectorAll('svg')).map(s => s.outerHTML.slice(0, 2000));
    const imgs = Array.from(sec.querySelectorAll('img')).map(i => ({ src: i.currentSrc || i.src, w: i.naturalWidth, h: i.naturalHeight, cls: i.className }));
    const counters = Array.from(sec.querySelectorAll('.train-counter, h2, h3, h4')).map(e => ({ cls: e.className, text: e.textContent.trim() }));
    return { svgs, imgs, counters };
  })()`);

  // 4. CTA destinations across homepage
  const ctaTargets = await p.evaluate(`(() => {
    return Array.from(document.querySelectorAll('a')).filter(a => /get started|explore|contact|back to/i.test(a.textContent || '')).map(a => ({
      text: a.textContent.replace(/\\s+/g,' ').trim(),
      href: a.getAttribute('href'),
      cls: a.className
    }));
  })()`);

  // 5. About page statistics & coral circles
  await p.goto(BASE_URL + '/about-us', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const aboutInfo = await p.evaluate(`(() => {
    const counters = Array.from(document.querySelectorAll('.train-counter')).map(c => ({ text: c.textContent.trim(), cls: c.className }));
    const imgs = Array.from(document.querySelectorAll('img')).map(i => ({ src: i.currentSrc || i.src, cls: i.className, alt: i.alt }));
    return { counters, imgs };
  })()`);

  // 6. Blogs page filters & pagination
  await p.goto(BASE_URL + '/blogs', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const blogInfo = await p.evaluate(`(() => {
    const filters = Array.from(document.querySelectorAll('[class*="filter"] a, [class*="category"] a, .w-dyn-list [role="button"], .blog-tab-link, .w-tab-link')).map(el => ({
      text: el.textContent.replace(/\\s+/g,' ').trim(),
      cls: el.className,
      href: el.getAttribute('href')
    }));
    const cards = Array.from(document.querySelectorAll('.w-dyn-item')).map(item => ({
      text: item.textContent.replace(/\\s+/g,' ').trim(),
      href: item.querySelector('a')?.getAttribute('href'),
      img: item.querySelector('img')?.currentSrc || item.querySelector('img')?.src
    }));
    return { filters, cards };
  })()`);

  await b.close();
  await fs.writeFile('docs/research/interactions-audit.json', JSON.stringify({ dropdown, pricingSection, chartInfo, ctaTargets, aboutInfo, blogInfo }, null, 2));
  console.log('Saved docs/research/interactions-audit.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
