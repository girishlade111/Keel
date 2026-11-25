import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const BASE_URL = 'https://keel-templates.webflow.io';

async function main() {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);

  const homeExtra = await p.evaluate(`(() => {
    const fin = document.querySelector('.financial-insights-section');
    const pricingCards = Array.from(document.querySelectorAll('.pricing-card-box')).map(c => c.innerText.replace(/\\s+/g,' ').trim());
    const deepDiveSlides = Array.from(document.querySelectorAll('.product-feature-slider .w-slide')).map(s => s.innerText.replace(/\\s+/g,' ').trim());
    const benefitsSlides = Array.from(document.querySelectorAll('.key-benefits-slider .w-slide')).map(s => s.innerText.replace(/\\s+/g,' ').trim());
    const problemSlides = Array.from(document.querySelectorAll('.card-slider .w-slide')).map(s => s.innerText.replace(/\\s+/g,' ').trim());
    const testimonials = Array.from(document.querySelectorAll('.testimonials-slider .w-slide')).map(s => s.innerText.replace(/\\s+/g,' ').trim());
    const heroInfo = document.querySelector('.hero-section')?.innerText.replace(/\\s+/g,' ').trim();
    const chartSvgOrEmbed = fin ? Array.from(fin.querySelectorAll('*')).filter(el => el.tagName === 'svg' || el.className?.toString().includes('chart') || el.className?.toString().includes('graph')).map(e => ({ tag: e.tagName, cls: e.className?.toString(), html: e.outerHTML.slice(0, 4000) })) : [];
    return {
      heroInfo,
      finHtml: fin ? fin.innerHTML.slice(0, 12000) : '',
      chartSvgOrEmbed,
      pricingCards,
      deepDiveSlides,
      benefitsSlides,
      problemSlides,
      testimonials
    };
  })()`);

  await p.goto(BASE_URL + '/blogs', { waitUntil: 'networkidle' });
  const blogsP1 = await p.evaluate(`(() => Array.from(document.querySelectorAll('.w-dyn-item')).map(i => ({ text: i.innerText.replace(/\\s+/g,' ').trim(), href: i.querySelector('a')?.getAttribute('href'), img: i.querySelector('img')?.currentSrc || i.querySelector('img')?.src })))()`);
  await p.goto(BASE_URL + '/blogs?669fbf9d_page=2', { waitUntil: 'networkidle' });
  const blogsP2 = await p.evaluate(`(() => Array.from(document.querySelectorAll('.w-dyn-item')).map(i => ({ text: i.innerText.replace(/\\s+/g,' ').trim(), href: i.querySelector('a')?.getAttribute('href'), img: i.querySelector('img')?.currentSrc || i.querySelector('img')?.src })))()`);

  await b.close();
  await fs.writeFile('docs/research/sections-extra.json', JSON.stringify({ homeExtra, blogsP1, blogsP2 }, null, 2));
  console.log('Saved docs/research/sections-extra.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
