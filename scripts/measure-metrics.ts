import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import { preview } from 'vite';

const PORT = 4175;
const LOCAL_URL = `http://127.0.0.1:${PORT}`;

const KEY_ROUTES = [
  '/',
  '/about-us',
  '/features',
  '/pricing',
  '/blogs',
  '/contact',
  '/integration',
  '/style-guide',
  '/licenses',
  '/changelog',
  '/instructions',
  '/password',
  '/404',
];

async function main() {
  const server = await preview({ preview: { port: PORT, host: '127.0.0.1', strictPort: true } });
  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    // 1. Measure Web Vitals & Performance on /, /features, /pricing
    const perfResults: Record<string, unknown> = {};
    for (const route of ['/', '/features', '/pricing']) {
      await page.addInitScript(`(() => {
        window.__lcp = 0;
        window.__cls = 0;
        try {
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              window.__lcp = entry.startTime;
            }
          }).observe({ type: 'largest-contentful-paint', buffered: true });
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) window.__cls += entry.value;
            }
          }).observe({ type: 'layout-shift', buffered: true });
        } catch {}
      })()`);

      await page.goto(`${LOCAL_URL}${route}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(500);

      const metrics = await page.evaluate(`(() => {
        const nav = performance.getEntriesByType('navigation')[0];
        const fcp = performance.getEntriesByName('first-contentful-paint')[0];
        const resources = performance.getEntriesByType('resource');
        const totalBytes = resources.reduce((acc, r) => acc + (r.transferSize || 0), 0);
        return {
          fcpMs: fcp ? Math.round(fcp.startTime) : null,
          lcpMs: Math.round(window.__lcp || 0),
          cls: Number((window.__cls || 0).toFixed(4)),
          domInteractiveMs: nav ? Math.round(nav.domInteractive) : null,
          loadEventMs: nav ? Math.round(nav.loadEventEnd) : null,
          resourceCount: resources.length,
          transferKB: Math.round(totalBytes / 1024),
        };
      })()`);

      perfResults[route] = metrics;
    }

    // 2. Typography, Colors & Gradients check
    await page.goto(`${LOCAL_URL}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const computedStyles = await page.evaluate(`(() => {
      const pick = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const s = getComputedStyle(el);
        return {
          fontFamily: s.fontFamily,
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          lineHeight: s.lineHeight,
          letterSpacing: s.letterSpacing,
          color: s.color,
          backgroundColor: s.backgroundColor,
          backgroundImage: s.backgroundImage,
          borderRadius: s.borderRadius,
        };
      };
      return {
        body: pick('body'),
        h1: pick('h1'),
        h2: pick('h2'),
        navLink: pick('.site-header__link'),
        primaryButton: pick('.keel-button--dark'),
        pillBadge: pick('.keel-pill-badge'),
        heroSurface: pick('.hero-surface-bg, .home-hero__card'),
        darkSection: pick('.benefits-section'),
        footer: pick('.site-footer'),
      };
    })()`);

    // 3. Accessibility & Internal Link Audit across KEY_ROUTES
    const a11yReport: Array<Record<string, unknown>> = [];
    const internalLinksFound = new Set<string>();

    for (const route of KEY_ROUTES) {
      await page.goto(`${LOCAL_URL}${route}`, { waitUntil: 'networkidle' });
      const audit = await page.evaluate(`(() => {
        const lang = document.documentElement.getAttribute('lang');
        const h1Count = document.querySelectorAll('h1').length;
        const hasMain = !!document.querySelector('main');
        const hasHeader = !!document.querySelector('header');
        const hasFooter = !!document.querySelector('footer');
        const hasSkip = !!document.querySelector('a.skip-link');
        const imgsNoAlt = Array.from(document.querySelectorAll('img')).filter(
          (i) => i.getAttribute('alt') === null
        ).length;
        const buttonsNoName = Array.from(document.querySelectorAll('button')).filter((b) => {
          const txt = (b.textContent || '').trim();
          const aria = b.getAttribute('aria-label') || '';
          return !txt && !aria;
        }).length;
        const links = Array.from(document.querySelectorAll('a[href]'))
          .map((a) => a.getAttribute('href') || '')
          .filter((h) => h.startsWith('/') && !h.startsWith('//'));
        const inputsUnlabeled = Array.from(
          document.querySelectorAll('input:not([type="hidden"]), textarea')
        ).filter((el) => {
          const id = el.getAttribute('id');
          const hasLabel = id ? !!document.querySelector('label[for="' + id + '"]') : false;
          const hasAria = !!el.getAttribute('aria-label');
          return !hasLabel && !hasAria;
        }).length;
        return {
          lang,
          h1Count,
          hasMain,
          hasHeader,
          hasFooter,
          hasSkip,
          imgsNoAlt,
          buttonsNoName,
          inputsUnlabeled,
          links,
        };
      })()`) as {
        lang: string | null;
        h1Count: number;
        hasMain: boolean;
        hasHeader: boolean;
        hasFooter: boolean;
        hasSkip: boolean;
        imgsNoAlt: number;
        buttonsNoName: number;
        inputsUnlabeled: number;
        links: string[];
      };

      for (const l of audit.links) {
        internalLinksFound.add(l.split('#')[0].split('?')[0]);
      }

      a11yReport.push({
        route,
        lang: audit.lang,
        h1Count: audit.h1Count,
        landmarksOk: audit.hasHeader && audit.hasMain && audit.hasFooter && audit.hasSkip,
        imgsNoAlt: audit.imgsNoAlt,
        buttonsNoName: audit.buttonsNoName,
        inputsUnlabeled: audit.inputsUnlabeled,
      });
    }

    // Verify every internal link resolves without React NotFound fallback (unless intentional /404)
    const linkChecks: Array<{ path: string; isNotFoundFallback: boolean }> = [];
    for (const p of Array.from(internalLinksFound).sort()) {
      await page.goto(`${LOCAL_URL}${p}`, { waitUntil: 'networkidle' });
      const title = await page.title();
      linkChecks.push({
        path: p,
        isNotFoundFallback: p !== '/404' && title.includes('404'),
      });
    }

    // Keyboard Tab check on /
    await page.goto(`${LOCAL_URL}/`, { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    const firstFocusedTag = await page.evaluate(() => ({
      tag: document.activeElement?.tagName,
      className: document.activeElement?.className,
    }));

    const out = {
      measuredAt: new Date().toISOString(),
      performance: perfResults,
      computedStyles,
      accessibility: a11yReport,
      firstTabFocus: firstFocusedTag,
      internalLinksChecked: linkChecks.length,
      brokenInternalLinks: linkChecks.filter((l) => l.isNotFoundFallback),
    };

    await fs.writeFile('docs/testing/metrics-audit.json', JSON.stringify(out, null, 2));
    console.log('Metrics audit written to docs/testing/metrics-audit.json');
    console.log('Broken internal links:', out.brokenInternalLinks.length);
    console.log('Performance (/):', JSON.stringify(perfResults['/']));
  } finally {
    await browser.close();
    server.httpServer.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
