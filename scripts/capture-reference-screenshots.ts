import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'https://keel-templates.webflow.io';

async function capturePage(page: import('playwright').Page, route: string, outPath: string, fullPage = true) {
  await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  // Scroll through slowly so ScrollTrigger / reveal animations reach final visible states
  await page.evaluate(async () => {
    const total = document.body.scrollHeight;
    for (let y = 0; y <= total; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: outPath, fullPage });
}

async function main() {
  const dirs = [
    'docs/reference/desktop',
    'docs/reference/tablet',
    'docs/reference/mobile',
    'docs/reference/interactions',
  ];
  for (const d of dirs) await fs.mkdir(path.resolve(d), { recursive: true });

  const browser = await chromium.launch({ headless: true });

  // Desktop 1440x900
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dp = await desktopCtx.newPage();

  const desktopRoutes: Array<[string, string]> = [
    ['/', 'home-1440-full.png'],
    ['/about-us', 'about-1440-full.png'],
    ['/features', 'features-1440-full.png'],
    ['/pricing', 'pricing-1440-full.png'],
    ['/blogs', 'blogs-1440-full.png'],
    ['/contact', 'contact-1440-full.png'],
    ['/integration', 'integration-1440-full.png'],
    ['/style-guide', 'style-guide-1440-full.png'],
    ['/404', '404-1440-full.png'],
  ];

  for (const [route, filename] of desktopRoutes) {
    console.log(`Capturing desktop ${route} -> ${filename}`);
    await capturePage(dp, route, `docs/reference/desktop/${filename}`, true);
  }

  // Interactive captures: All pages dropdown
  await dp.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await dp.evaluate(() => document.fonts.ready);
  const toggle = dp.locator('.w-dropdown-toggle').first();
  if (await toggle.count()) {
    await toggle.click().catch(() => {});
    await dp.waitForTimeout(350);
    await dp.screenshot({ path: 'docs/reference/interactions/navigation-all-pages-expanded.png', fullPage: false });
  }

  // Tablet 1024x768
  const tabletCtx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const tp = await tabletCtx.newPage();
  for (const [route, name] of [['/', 'home'], ['/features', 'features'], ['/pricing', 'pricing']] as const) {
    console.log(`Capturing tablet ${route}`);
    await capturePage(tp, route, `docs/reference/tablet/${name}-1024.png`, true);
  }

  // Mobile 390x844 & 320x700
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await mobileCtx.newPage();
  for (const [route, name] of [['/', 'home'], ['/features', 'features'], ['/pricing', 'pricing'], ['/about-us', 'about'], ['/blogs', 'blogs'], ['/contact', 'contact'], ['/integration', 'integration']] as const) {
    console.log(`Capturing mobile ${route}`);
    await capturePage(mp, route, `docs/reference/mobile/${name}-390-mobile.png`, true);
  }

  await browser.close();
  console.log('Reference screenshots captured.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
