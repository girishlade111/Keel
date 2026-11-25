import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'https://keel-templates.webflow.io';

const KEY_ROUTES = [
  '/',
  '/about-us',
  '/features',
  '/pricing',
  '/blogs',
  '/contact',
  '/integration',
  '/style-guide',
  '/404',
];

async function main() {
  await fs.mkdir(path.resolve('docs/research'), { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const auditResults: Record<string, unknown> = {};

  for (const route of KEY_ROUTES) {
    console.log(`Auditing styles on ${BASE_URL}${route} ...`);
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);

    const metrics = await page.evaluate(`(() => {
      const bodyCs = getComputedStyle(document.body);
      const header = document.querySelector('header, nav, [class*="navbar"], [class*="header"]');
      const footer = document.querySelector('footer, [class*="footer"]');
      const h1 = document.querySelector('h1');
      const h2 = document.querySelector('h2');
      const h3 = document.querySelector('h3');
      const container = document.querySelector('[class*="container"], .w-container');

      const sampleStyle = (el) => {
        if (!el) return null;
        const cs = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          className: typeof el.className === 'string' ? el.className : '',
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
          color: cs.color,
          backgroundColor: cs.backgroundColor,
          backgroundImage: cs.backgroundImage !== 'none' ? cs.backgroundImage : '',
          borderRadius: cs.borderRadius,
          border: cs.border,
          padding: cs.padding,
          margin: cs.margin,
          maxWidth: cs.maxWidth,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      };

      const buttons = Array.from(document.querySelectorAll('a[class*="button"], button, .w-button'))
        .slice(0, 8)
        .map((b) => ({
          text: b.textContent?.trim(),
          ...sampleStyle(b),
        }));

      const sections = Array.from(document.querySelectorAll('section, [class*="section"]'))
        .slice(0, 20)
        .map((s) => sampleStyle(s));

      const cssVars = {};
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules)) {
            if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
              for (let i = 0; i < rule.style.length; i++) {
                const prop = rule.style[i];
                if (prop.startsWith('--')) {
                  cssVars[prop] = rule.style.getPropertyValue(prop).trim();
                }
              }
            }
          }
        } catch {}
      }

      return {
        body: {
          backgroundColor: bodyCs.backgroundColor,
          color: bodyCs.color,
          fontFamily: bodyCs.fontFamily,
          fontSize: bodyCs.fontSize,
          lineHeight: bodyCs.lineHeight,
        },
        header: sampleStyle(header),
        footer: sampleStyle(footer),
        container: sampleStyle(container),
        h1: sampleStyle(h1),
        h2: sampleStyle(h2),
        h3: sampleStyle(h3),
        buttons,
        sections,
        cssVars,
        loadedFonts: Array.from(document.fonts).map((f) => ({
          family: f.family,
          weight: f.weight,
          style: f.style,
          status: f.status,
        })),
      };
    })()`);

    auditResults[route] = metrics;
  }

  await browser.close();
  await fs.writeFile('docs/research/style-audit.json', JSON.stringify(auditResults, null, 2));
  console.log('Saved docs/research/style-audit.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
