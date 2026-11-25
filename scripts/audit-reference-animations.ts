import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'https://keel-templates.webflow.io';

async function main() {
  await fs.mkdir(path.resolve('docs/research'), { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const routes = ['/', '/about-us', '/features', '/pricing', '/blogs', '/contact', '/integration'];
  const animationAudit: Record<string, unknown> = {};

  for (const route of routes) {
    console.log(`Auditing animations & scripts on ${BASE_URL}${route} ...`);
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);

    const info = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]')).map((s) => s.getAttribute('src'));
      const inlineScripts = Array.from(document.querySelectorAll('script:not([src])'))
        .map((s) => s.textContent || '')
        .filter((t) => t.includes('gsap') || t.includes('ScrollTrigger') || t.includes('SplitText') || t.includes('Lenis') || t.includes('Swiper') || t.includes('data-'));

      const w = window as unknown as Record<string, unknown>;
      const hasGsap = Boolean(w.gsap);
      const hasScrollTrigger = Boolean(w.ScrollTrigger);
      const hasLenis = Boolean(w.Lenis);
      const hasSwiper = Boolean(w.Swiper);

      const animatedAttrs = Array.from(document.querySelectorAll('[data-w-id], [data-gsap], [data-animate], [class*="marquee"], [class*="slider"], [class*="carousel"], [class*="accordion"]'))
        .slice(0, 50)
        .map((el) => ({
          tag: el.tagName,
          className: typeof el.className === 'string' ? el.className : '',
          dataWId: el.getAttribute('data-w-id'),
          text: el.textContent?.trim().slice(0, 60),
        }));

      const inlineStyleRules: string[] = [];
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules)) {
            if (rule instanceof CSSKeyframesRule) {
              inlineStyleRules.push(`@keyframes ${rule.name}`);
            }
          }
        } catch {
          // ignore
        }
      }

      return {
        scripts,
        inlineScripts: inlineScripts.map((s) => s.slice(0, 4000)),
        globals: { hasGsap, hasScrollTrigger, hasLenis, hasSwiper },
        animatedAttrs,
        keyframes: inlineStyleRules,
      };
    });

    animationAudit[route] = info;
  }

  await browser.close();
  await fs.writeFile('docs/research/animation-audit.json', JSON.stringify(animationAudit, null, 2));
  console.log('Saved docs/research/animation-audit.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
