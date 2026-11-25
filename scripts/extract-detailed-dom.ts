import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const BASE_URL = 'https://keel-templates.webflow.io';

async function main() {
  const manifest: Array<{ localUrl: string; statusCode: number }> = JSON.parse(
    await fs.readFile('docs/research/route-manifest.json', 'utf-8')
  );
  const routes = manifest.filter((r) => r.statusCode === 200 || r.localUrl === '/404').map((r) => r.localUrl);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const out: Record<string, unknown> = {};

  for (const route of routes) {
    console.log(`Extracting detailed structure for ${route} ...`);
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);

    const detail = await page.evaluate(() => {
      // Remove promotional Webflow template badges from text extraction if present
      const sections = Array.from(document.querySelectorAll('section, header, footer, main > div')).map((sec) => {
        const cls = typeof sec.className === 'string' ? sec.className : '';
        const items = Array.from(sec.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,button,li,label,td,th,span,div'))
          .filter((el) => {
            if (el.closest('.promotional-image-slider, [class*="webflow-badge"], [class*="promo"]')) return false;
            // only leaf text nodes or direct text
            return Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && (n.textContent || '').trim().length > 0);
          })
          .map((el) => ({
            tag: el.tagName.toLowerCase(),
            cls: typeof el.className === 'string' ? el.className.split(' ').slice(0, 3).join('.') : '',
            href: el.getAttribute('href') || undefined,
            text: el.textContent?.replace(/\s+/g, ' ').trim() || '',
          }));
        const imgs = Array.from(sec.querySelectorAll('img')).map((img) => ({
          src: img.currentSrc || img.src,
          alt: img.alt || '',
          cls: typeof img.className === 'string' ? img.className : '',
          w: img.naturalWidth,
          h: img.naturalHeight,
        }));
        return { cls, items, imgs };
      });

      const navDropdownLinks = Array.from(document.querySelectorAll('.w-dropdown-list a, nav a')).map((a) => ({
        text: a.textContent?.replace(/\s+/g, ' ').trim(),
        href: a.getAttribute('href'),
        cls: typeof a.className === 'string' ? a.className : '',
      }));

      return { title: document.title, sections, navDropdownLinks };
    });

    out[route] = detail;
  }

  await browser.close();
  await fs.writeFile('docs/research/detailed-dom.json', JSON.stringify(out, null, 2));
  console.log('Saved docs/research/detailed-dom.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
