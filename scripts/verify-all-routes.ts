import { chromium } from 'playwright';
import { preview } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import sharp from 'sharp';

const PORT = 4174;
const LOCAL_URL = `http://localhost:${PORT}`;

const ALL_ROUTES = [
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
  '/blog/more-systems-for-calmer-money',
  '/blog/a-simple-monthly-money-reset',
  '/blog/give-your-savings-a-purpose',
  '/blog/automate-savings-keep-control',
  '/blog/build-a-money-plan-that-actually-works',
  '/blog/make-saving-feel-easier-every-month',
  '/blog/your-guide-to-a-clearer-financial-life',
  '/blog/plan-your-month-before-it-starts',
  '/blog/set-spending-limits-that-stick',
  '/blog/save-a-little-every-single-week',
  '/blog/build-an-emergency-fund-step-by-step',
  '/blog/a-beginners-guide-to-shared-budgets',
  '/blog/one-dashboard-for-every-account',
  '/integrations/novi-bank',
  '/integrations/verapay',
  '/integrations/milo-finance',
  '/integrations/northline',
  '/integrations/paya',
  '/integrations/luma-invest',
  '/integrations/oakline',
  '/integrations/clover-money',
  '/integrations/arcus',
];

async function waitForServer(url: string, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error('Preview server did not start in time');
}

async function comparePngs(refPath: string, implPath: string, diffPath: string) {
  try {
    const refMeta = await sharp(refPath).metadata();
    const implMeta = await sharp(implPath).metadata();
    const w = Math.min(refMeta.width || 1440, implMeta.width || 1440);
    const h = Math.min(refMeta.height || 900, implMeta.height || 900, 4000);

    const refBuf = await sharp(refPath)
      .extract({ left: 0, top: 0, width: w, height: h })
      .ensureAlpha()
      .raw()
      .toBuffer();
    const implBuf = await sharp(implPath)
      .extract({ left: 0, top: 0, width: w, height: h })
      .ensureAlpha()
      .raw()
      .toBuffer();

    const diff = new PNG({ width: w, height: h });
    const diffPixels = pixelmatch(refBuf, implBuf, diff.data, w, h, { threshold: 0.15 });
    await fs.writeFile(diffPath, PNG.sync.write(diff));

    return {
      comparedWidth: w,
      comparedHeight: h,
      refHeight: refMeta.height || 0,
      implHeight: implMeta.height || 0,
      diffPixels,
      totalPixels: w * h,
    };
  } catch (e) {
    return { error: String(e) };
  }
}

async function main() {
  await fs.mkdir('docs/testing/screenshots/desktop', { recursive: true });
  await fs.mkdir('docs/testing/screenshots/mobile', { recursive: true });
  await fs.mkdir('docs/testing/screenshots/diffs', { recursive: true });

  const server = await preview({ preview: { port: PORT, strictPort: true } });
  console.log('Preview server listening on', LOCAL_URL);

  try {
    const browser = await chromium.launch({ headless: true });

    const consoleErrors: string[] = [];
    const brokenImages: Array<{ route: string; src: string }> = [];
    const overflowIssues: Array<{ route: string; viewport: string; scrollWidth: number; clientWidth: number }> = [];
    const routeChecks: Array<{ route: string; title: string; h1: string; fontsLoaded: boolean }> = [];

    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(`${page.url()}: ${msg.text()}`);
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(`${page.url()} pageerror: ${err.message}`);
    });

    // 1. Check all routes at 1440x900
    for (const route of ALL_ROUTES) {
      await page.goto(`${LOCAL_URL}${route}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        for (let y = 0; y <= document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(250);

      const check = await page.evaluate(`(() => {
        const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.getAttribute('src'),
          complete: img.complete,
          naturalWidth: img.naturalWidth
        }));
        const broken = imgs.filter(i => !i.complete || i.naturalWidth === 0);
        const h1 = document.querySelector('h1')?.textContent?.trim() || '';
        const fonts = Array.from(document.fonts).some(f => f.family.includes('Inter Tight') && f.status === 'loaded');
        return {
          title: document.title,
          h1,
          broken,
          fontsLoaded: fonts,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth
        };
      })()`) as {
        title: string;
        h1: string;
        broken: Array<{ src: string }>;
        fontsLoaded: boolean;
        scrollWidth: number;
        clientWidth: number;
      };

      for (const b of check.broken) {
        brokenImages.push({ route, src: b.src });
      }
      if (check.scrollWidth > check.clientWidth + 2) {
        overflowIssues.push({
          route,
          viewport: '1440x900',
          scrollWidth: check.scrollWidth,
          clientWidth: check.clientWidth,
        });
      }
      routeChecks.push({ route, title: check.title, h1: check.h1, fontsLoaded: check.fontsLoaded });
    }

    // 2. Capture desktop screenshots of main pages for comparison
    const capturePairs: Array<[string, string, string]> = [
      ['/', 'home-1440-full.png', 'home-1440-full.png'],
      ['/about-us', 'about-1440-full.png', 'about-1440-full.png'],
      ['/features', 'features-1440-full.png', 'features-1440-full.png'],
      ['/pricing', 'pricing-1440-full.png', 'pricing-1440-full.png'],
      ['/blogs', 'blogs-1440-full.png', 'blogs-1440-full.png'],
      ['/contact', 'contact-1440-full.png', 'contact-1440-full.png'],
      ['/integration', 'integration-1440-full.png', 'integration-1440-full.png'],
      ['/style-guide', 'style-guide-1440-full.png', 'style-guide-1440-full.png'],
      ['/404', '404-1440-full.png', '404-1440-full.png'],
    ];

    const visualDiffs: Record<string, unknown> = {};
    for (const [route, implName, refName] of capturePairs) {
      await page.goto(`${LOCAL_URL}${route}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        document.querySelectorAll('img').forEach((img) => {
          img.loading = 'eager';
        });
        for (let y = 0; y <= document.body.scrollHeight; y += 350) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 50));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(400);
      const implPath = path.join('docs/testing/screenshots/desktop', implName);
      await page.screenshot({ path: implPath, fullPage: true });
      const refPath = path.join('docs/reference/desktop', refName);
      const diffPath = path.join('docs/testing/screenshots/diffs', implName);
      visualDiffs[route] = await comparePngs(refPath, implPath, diffPath);
    }

    // 3. Functional interactive tests
    const interactions: Record<string, boolean> = {};

    // Dropdown
    await page.goto(`${LOCAL_URL}/`, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /All pages/i }).click();
    interactions.dropdownOpens = (await page.locator('.site-header__dropdown-menu').count()) === 1;
    await page.keyboard.press('Escape');
    interactions.dropdownClosesOnEscape = (await page.locator('.site-header__dropdown-menu').count()) === 0;

    // Problem slider
    await page.getByRole('tab', { name: /Problem slide 2/i }).click();
    interactions.problemSliderSwitches = await page.getByText('5+').first().isVisible();

    // Pricing toggle
    await page.getByRole('switch', { name: /Toggle yearly billing/i }).first().click();
    interactions.pricingSwitchesToYearly = await page.getByText('$13.33').isVisible();

    // FAQ accordion
    const faqBtn = page.locator('.faq-item__trigger').first();
    await faqBtn.click();
    interactions.faqExpands = (await faqBtn.getAttribute('aria-expanded')) === 'true';

    // Blog filters & pagination
    await page.goto(`${LOCAL_URL}/blogs`, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /PLANNING/i }).click();
    interactions.blogFilterWorks = (await page.locator('.blog-grid .article-card').count()) === 4;
    await page.getByRole('tab', { name: /ALL/i }).click();
    await page.getByRole('button', { name: /Next page/i }).click();
    interactions.blogPaginationWorks = await page.getByText('One dashboard for every account').isVisible();

    // Contact form validation & demo submit
    await page.goto(`${LOCAL_URL}/contact`, { waitUntil: 'networkidle' });
    await page.locator('.contact-form button[type="submit"]').click();
    interactions.contactValidationWorks = await page.getByText('First name is required').isVisible();
    await page.fill('#firstName', 'Alex');
    await page.fill('#lastName', 'Morgan');
    await page.fill('#email', 'alex@example.com');
    await page.fill('#message', 'Testing local contact form validation.');
    await page.locator('.contact-form button[type="submit"]').click();
    await page.waitForTimeout(500);
    interactions.contactSubmitWorks = await page.getByText(/Demo mode: Enquiry validated/i).isVisible();

    // Newsletter validation
    await page.fill('#footer-newsletter-email', 'alex@example.com');
    await page.locator('.site-footer__submit').click();
    await page.waitForTimeout(500);
    interactions.newsletterSubmitWorks = await page.getByText(/Demo mode: You're on the local preview list/i).isVisible();

    // 4. Responsive viewports check (Tablet 1024, Mobile 390, Narrow Mobile 320)
    for (const [label, w, h] of [
      ['1024x768', 1024, 768],
      ['390x844', 390, 844],
      ['320x700', 320, 700],
    ] as const) {
      await page.setViewportSize({ width: w, height: h });
      for (const r of ['/', '/about-us', '/features', '/pricing', '/blogs', '/contact', '/integration']) {
        await page.goto(`${LOCAL_URL}${r}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(200);
        const dims = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        if (dims.scrollWidth > dims.clientWidth + 2) {
          overflowIssues.push({ route: r, viewport: label, ...dims });
        }
        if (label === '390x844' && r === '/') {
          await page.screenshot({ path: 'docs/testing/screenshots/mobile/home-390-mobile.png', fullPage: true });
        }
      }
    }

    await browser.close();

    const report = {
      routesTested: ALL_ROUTES.length,
      consoleErrors,
      brokenImages,
      overflowIssues,
      interactions,
      visualDiffs,
      sampleRouteChecks: routeChecks.slice(0, 15),
    };

    await fs.writeFile('docs/testing/qa-report.json', JSON.stringify(report, null, 2));
    console.log('QA Summary:', JSON.stringify({
      routesTested: report.routesTested,
      consoleErrors: consoleErrors.length,
      brokenImages: brokenImages.length,
      overflowIssues: overflowIssues.length,
      interactions,
    }, null, 2));

    if (consoleErrors.length > 0 || brokenImages.length > 0 || overflowIssues.length > 0) {
      console.error('Failures detected! Inspect docs/testing/qa-report.json');
      process.exitCode = 1;
    }
  } finally {
    server.httpServer.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
