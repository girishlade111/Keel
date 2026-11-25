import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'https://keel-templates.webflow.io';

const SEED_PATHS = [
  '/',
  '/about-us',
  '/features',
  '/pricing',
  '/blogs',
  '/contact',
  '/integration',
  '/style-guide',
  '/license',
  '/changelog',
  '/404',
  '/password',
  '/utility-pages/license',
  '/utility-pages/changelog',
  '/utility-pages/style-guide',
  '/utility-pages/404',
  '/utility-pages/password',
];

interface RouteRecord {
  referenceUrl: string;
  localUrl: string;
  statusCode: number;
  pageTitle: string;
  metaDescription: string;
  pageCategory: string;
  cmsCollection: string | null;
  parentRoute: string | null;
  sectionSequence: string[];
  components: string[];
  requiredAssets: string[];
  requiredVideo: string[];
  interactiveElements: string[];
  linkedRoutes: string[];
  responsiveBehavior: string;
  inspectionStatus: 'verified' | 'not-found' | 'error';
  headings: Array<{ tag: string; text: string }>;
  fullTextBlocks: string[];
}

function normalizePath(href: string): string | null {
  try {
    const u = new URL(href, BASE_URL);
    if (u.origin !== BASE_URL) return null;
    if (u.pathname.startsWith('/cdn-cgi')) return null;
    let p = u.pathname;
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
    return p + (u.search || '');
  } catch {
    return null;
  }
}

function classifyRoute(pathname: string): { category: string; cms: string | null; parent: string | null } {
  const clean = pathname.split('?')[0];
  if (clean === '/') return { category: 'main', cms: null, parent: null };
  if (['/about-us', '/features', '/pricing', '/blogs', '/contact', '/integration'].includes(clean)) {
    return { category: 'main', cms: null, parent: '/' };
  }
  if (clean.includes('style-guide') || clean.includes('license') || clean.includes('changelog') || clean.includes('404') || clean.includes('password')) {
    return { category: 'utility', cms: null, parent: '/' };
  }
  if (clean.startsWith('/blogs/') || clean.startsWith('/blog/') || clean.startsWith('/post/')) {
    return { category: 'cms-detail', cms: 'blogs', parent: '/blogs' };
  }
  if (clean.startsWith('/integration/') || clean.startsWith('/integrations/')) {
    return { category: 'cms-detail', cms: 'integrations', parent: '/integration' };
  }
  return { category: 'discovered', cms: null, parent: '/' };
}

async function main() {
  await fs.mkdir(path.resolve('docs/research'), { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const queue: string[] = [...SEED_PATHS];
  const visited = new Set<string>();
  const manifest: RouteRecord[] = [];
  const rawPages: Record<string, unknown> = {};

  while (queue.length > 0) {
    const rel = queue.shift()!;
    if (visited.has(rel)) continue;
    visited.add(rel);

    const url = `${BASE_URL}${rel}`;
    console.log(`Inspecting ${url} ...`);
    try {
      const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      const status = resp?.status() ?? 0;

      // Wait for fonts
      await page.evaluate(() => document.fonts.ready);

      // Scroll slowly to trigger lazy content
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(400);

      // Click All pages dropdown if present to reveal hidden nav links
      try {
        const dropdownToggle = page.locator('.w-dropdown-toggle').first();
        if (await dropdownToggle.count()) {
          await dropdownToggle.click({ timeout: 2000 }).catch(() => {});
          await page.waitForTimeout(250);
        }
      } catch {
        // ignore
      }

      const data = await page.evaluate(() => {
        const title = document.title;
        const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

        const links = Array.from(document.querySelectorAll('a[href]'))
          .map((a) => a.getAttribute('href') || '')
          .filter(Boolean);

        const sections = Array.from(document.querySelectorAll('section, header, footer, [class*="section"]'))
          .map((el) => {
            const cls = typeof el.className === 'string' ? el.className : '';
            const h = el.querySelector('h1,h2,h3')?.textContent?.trim()?.slice(0, 80) || '';
            return `${el.tagName.toLowerCase()}.${cls.split(' ').slice(0, 3).join('.')}${h ? ` :: ${h}` : ''}`;
          });

        const imgs = Array.from(document.querySelectorAll('img')).map((img) => img.currentSrc || img.src).filter(Boolean);
        const videos = Array.from(document.querySelectorAll('video, video source')).map((v) => v.getAttribute('src')).filter(Boolean) as string[];

        const interactives = Array.from(
          document.querySelectorAll('button, [role="button"], .w-dropdown, .w-tab-link, .w-slider, form, input, textarea')
        ).map((el) => `${el.tagName.toLowerCase()}.${(typeof el.className === 'string' ? el.className : '').split(' ').slice(0, 2).join('.')}:${el.textContent?.trim().slice(0, 40) || ''}`);

        const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((h) => ({
          tag: h.tagName.toLowerCase(),
          text: h.textContent?.replace(/\s+/g, ' ').trim() || '',
        }));

        const textBlocks = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,button,li,label,td,th'))
          .map((el) => el.textContent?.replace(/\s+/g, ' ').trim() || '')
          .filter((t) => t.length > 0 && t.length < 500);

        return { title, metaDesc, links, sections, imgs, videos, interactives, headings, textBlocks };
      });

      // Check pagination links on /blogs
      if (rel.startsWith('/blogs')) {
        const nextHref = await page.evaluate(() => {
          const next = document.querySelector('a.w-pagination-next, [class*="pagination"] a[href*="page="]') as HTMLAnchorElement | null;
          return next?.getAttribute('href') || null;
        });
        if (nextHref) {
          const norm = normalizePath(nextHref);
          if (norm && !visited.has(norm)) queue.push(norm);
        }
      }

      const normalizedLinks = Array.from(
        new Set(
          data.links
            .map((l) => normalizePath(l))
            .filter((l): l is string => l !== null && !l.startsWith('/#'))
        )
      );

      for (const link of normalizedLinks) {
        if (!visited.has(link) && !queue.includes(link)) {
          // Only enqueue actual page routes (skip query duplicates except pagination)
          const [pOnly, qOnly] = link.split('?');
          if (!qOnly || qOnly.includes('page=')) {
            queue.push(qOnly ? link : pOnly);
          }
        }
      }

      const cls = classifyRoute(rel);
      const isNotFound = status === 404 && !rel.includes('404');

      manifest.push({
        referenceUrl: url,
        localUrl: rel,
        statusCode: status,
        pageTitle: data.title,
        metaDescription: data.metaDesc,
        pageCategory: cls.category,
        cmsCollection: cls.cms,
        parentRoute: cls.parent,
        sectionSequence: Array.from(new Set(data.sections)).slice(0, 30),
        components: Array.from(new Set(data.interactives)).slice(0, 30),
        requiredAssets: Array.from(new Set(data.imgs)),
        requiredVideo: Array.from(new Set(data.videos)),
        interactiveElements: Array.from(new Set(data.interactives)).slice(0, 30),
        linkedRoutes: normalizedLinks,
        responsiveBehavior: 'Verified at 1440x900; queued for multi-viewport capture',
        inspectionStatus: isNotFound ? 'not-found' : 'verified',
        headings: data.headings,
        fullTextBlocks: Array.from(new Set(data.textBlocks)),
      });

      rawPages[rel] = {
        status,
        title: data.title,
        headings: data.headings,
        textBlocks: Array.from(new Set(data.textBlocks)),
        links: normalizedLinks,
      };
    } catch (err) {
      console.error(`Error inspecting ${url}:`, err);
      const cls = classifyRoute(rel);
      manifest.push({
        referenceUrl: url,
        localUrl: rel,
        statusCode: 0,
        pageTitle: '',
        metaDescription: '',
        pageCategory: cls.category,
        cmsCollection: cls.cms,
        parentRoute: cls.parent,
        sectionSequence: [],
        components: [],
        requiredAssets: [],
        requiredVideo: [],
        interactiveElements: [],
        linkedRoutes: [],
        responsiveBehavior: 'Error during inspection',
        inspectionStatus: 'error',
        headings: [],
        fullTextBlocks: [],
      });
    }
  }

  await browser.close();

  const verifiedRoutes = manifest.filter((r) => r.inspectionStatus === 'verified' || r.localUrl === '/404');
  await fs.writeFile('docs/research/route-manifest.json', JSON.stringify(verifiedRoutes, null, 2));
  await fs.writeFile('docs/research/route-crawl-all.json', JSON.stringify(manifest, null, 2));
  await fs.writeFile('docs/research/dom-content.json', JSON.stringify(rawPages, null, 2));
  console.log(`Discovered ${verifiedRoutes.length} verified routes out of ${manifest.length} probed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
