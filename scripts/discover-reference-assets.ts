import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const BASE_URL = 'https://keel-templates.webflow.io';

interface AssetRecord {
  id: string;
  sourceUrl: string;
  referenceRoute: string;
  component: string;
  mediaType: 'image' | 'svg-inline' | 'svg-external' | 'css-background' | 'video' | 'font' | 'lottie';
  mimeType: string;
  originalFilename: string;
  originalWidth: number;
  originalHeight: number;
  displayWidth: number;
  displayHeight: number;
  aspectRatio: string;
  objectFit: string;
  objectPosition: string;
  transform: string;
  zIndex: number;
  hasTransparency: boolean;
  localPath: string;
  sha256: string;
  licenseStatus: string;
  acquisitionStatus: 'acquired' | 'inline-captured' | 'failed' | 'skipped';
  optimizedVariants: string[];
  notes: string;
  srcset?: string[];
  alt?: string;
}

function sanitizeFilename(urlStr: string, fallbackExt = '.bin'): string {
  try {
    const u = new URL(urlStr);
    const base = path.basename(u.pathname) || 'asset';
    const clean = base.replace(/[^a-zA-Z0-9._-]/g, '_');
    if (path.extname(clean)) return clean;
    return clean + fallbackExt;
  } catch {
    return 'asset' + fallbackExt;
  }
}

function classifyFolder(url: string, component: string, mediaType: string): string {
  const lc = (url + ' ' + component).toLowerCase();
  if (mediaType === 'font') return 'fonts';
  if (mediaType === 'video') return 'videos';
  if (lc.includes('logo') || lc.includes('favicon') || lc.includes('brand') || lc.includes('keel')) return 'brand';
  if (lc.includes('phone') || lc.includes('mobile') || lc.includes('iphone') || lc.includes('mockup')) return 'images/phones';
  if (lc.includes('card') && !lc.includes('blog') && !lc.includes('team')) return 'images/cards';
  if (lc.includes('ribbon') || lc.includes('gradient') || lc.includes('blur') || lc.includes('bg') || lc.includes('hero')) return 'images/backgrounds';
  if (lc.includes('blog') || lc.includes('article') || lc.includes('post') || lc.includes('insight')) return 'images/blog';
  if (lc.includes('team') || lc.includes('member') || lc.includes('portrait')) return 'images/team';
  if (lc.includes('testimonial') || lc.includes('avatar')) return 'images/testimonials';
  if (lc.includes('integration') || lc.includes('novi') || lc.includes('verapay') || lc.includes('milo') || lc.includes('arcus') || lc.includes('paya') || lc.includes('luma') || lc.includes('oakline') || lc.includes('clover') || lc.includes('northline')) return 'images/integrations';
  if (lc.includes('partner')) return 'images/partners';
  if (lc.includes('chart') || lc.includes('graph') || lc.includes('stat')) return 'images/charts';
  if (lc.includes('icon') || lc.includes('arrow') || lc.includes('plus')) return 'icons';
  return 'images/mockups';
}

async function main() {
  const routeManifestRaw = await fs.readFile('docs/research/route-manifest.json', 'utf-8');
  const routeManifest: Array<{ localUrl: string; referenceUrl: string }> = JSON.parse(routeManifestRaw);
  const routes = Array.from(new Set(routeManifest.map((r) => r.localUrl)));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const networkAssets = new Map<string, { mime: string; url: string }>();
  page.on('response', (res) => {
    const u = res.url();
    const ct = (res.headers()['content-type'] || '').toLowerCase();
    if (
      ct.startsWith('image/') ||
      ct.startsWith('video/') ||
      ct.includes('font') ||
      u.endsWith('.woff2') ||
      u.endsWith('.json')
    ) {
      if (!u.includes('google-analytics') && !u.includes('googletagmanager')) {
        networkAssets.set(u, { mime: ct, url: u });
      }
    }
  });

  const discovered: Map<string, AssetRecord> = new Map();
  const inlineSvgs: Array<{ route: string; component: string; html: string; width: number; height: number; hash: string }> = [];
  const fontFaceRules: Array<{ family: string; weight: string; style: string; src: string }> = [];

  for (const route of routes) {
    const url = `${BASE_URL}${route}`;
    console.log(`Discovering assets on ${url} ...`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);

    // Scroll to trigger lazy images
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);

    const extracted = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img')).map((img) => {
        const rect = img.getBoundingClientRect();
        const cs = getComputedStyle(img);
        const parentCls = img.closest('section, header, footer, [class]')?.className || '';
        const srcsetUrls = (img.getAttribute('srcset') || '')
          .split(',')
          .map((s) => s.trim().split(/\s+/)[0])
          .filter(Boolean);
        return {
          src: img.currentSrc || img.src || img.getAttribute('data-src') || '',
          srcset: srcsetUrls,
          alt: img.alt || '',
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          displayWidth: Math.round(rect.width),
          displayHeight: Math.round(rect.height),
          objectFit: cs.objectFit,
          objectPosition: cs.objectPosition,
          transform: cs.transform,
          zIndex: parseInt(cs.zIndex, 10) || 0,
          component: typeof parentCls === 'string' ? parentCls.slice(0, 80) : '',
        };
      });

      const cssBgs: Array<{ url: string; component: string; width: number; height: number }> = [];
      for (const el of Array.from(document.querySelectorAll('*'))) {
        const cs = getComputedStyle(el);
        const bg = cs.backgroundImage;
        if (bg && bg.includes('url(')) {
          const matches = bg.matchAll(/url\(["']?([^"')]+)["']?\)/g);
          for (const m of matches) {
            if (m[1] && !m[1].startsWith('data:')) {
              const rect = el.getBoundingClientRect();
              cssBgs.push({
                url: m[1],
                component: typeof el.className === 'string' ? el.className.slice(0, 80) : el.tagName,
                width: Math.round(rect.width),
                height: Math.round(rect.height),
              });
            }
          }
        }
      }

      const videos = Array.from(document.querySelectorAll('video')).map((v) => {
        const rect = v.getBoundingClientRect();
        const sources = Array.from(v.querySelectorAll('source')).map((s) => s.src).filter(Boolean);
        return {
          src: v.currentSrc || v.src || sources[0] || '',
          poster: v.poster || '',
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          component: typeof v.className === 'string' ? v.className.slice(0, 80) : 'video',
        };
      });

      const svgs = Array.from(document.querySelectorAll('svg')).map((s) => {
        const rect = s.getBoundingClientRect();
        const parentCls = s.closest('a, button, div, section, header, footer')?.className || '';
        return {
          html: s.outerHTML,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          component: (typeof s.className?.baseVal === 'string' ? s.className.baseVal : '') + ' | ' + (typeof parentCls === 'string' ? parentCls.slice(0, 60) : ''),
        };
      });

      const fonts: Array<{ family: string; weight: string; style: string; src: string }> = [];
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules)) {
            if (rule instanceof CSSFontFaceRule) {
              fonts.push({
                family: rule.style.getPropertyValue('font-family').replace(/["']/g, ''),
                weight: rule.style.getPropertyValue('font-weight') || '400',
                style: rule.style.getPropertyValue('font-style') || 'normal',
                src: rule.style.getPropertyValue('src'),
              });
            }
          }
        } catch {
          // CORS stylesheet
        }
      }

      const favicons = Array.from(document.querySelectorAll('link[rel*="icon"], meta[property="og:image"], meta[name="twitter:image"]'))
        .map((el) => el.getAttribute('href') || el.getAttribute('content') || '')
        .filter(Boolean);

      return { imgs, cssBgs, videos, svgs, fonts, favicons };
    });

    for (const f of extracted.fonts) {
      if (!fontFaceRules.some((x) => x.family === f.family && x.weight === f.weight && x.src === f.src)) {
        fontFaceRules.push(f);
      }
      const matches = f.src.matchAll(/url\(["']?([^"')]+)["']?\)/g);
      for (const m of matches) {
        const fontUrl = m[1];
        if (!discovered.has(fontUrl)) {
          discovered.set(fontUrl, {
            id: `font-${discovered.size + 1}`,
            sourceUrl: fontUrl,
            referenceRoute: route,
            component: `${f.family} (${f.weight} ${f.style})`,
            mediaType: 'font',
            mimeType: fontUrl.endsWith('.woff2') ? 'font/woff2' : 'font/woff',
            originalFilename: sanitizeFilename(fontUrl, '.woff2'),
            originalWidth: 0,
            originalHeight: 0,
            displayWidth: 0,
            displayHeight: 0,
            aspectRatio: '',
            objectFit: '',
            objectPosition: '',
            transform: '',
            zIndex: 0,
            hasTransparency: false,
            localPath: '',
            sha256: '',
            licenseStatus: 'Pending inspection',
            acquisitionStatus: 'skipped',
            optimizedVariants: [],
            notes: `Font family ${f.family} weight ${f.weight}`,
          });
        }
      }
    }

    for (const img of extracted.imgs) {
      if (!img.src || img.src.startsWith('data:')) continue;
      const existing = discovered.get(img.src);
      if (!existing) {
        const isSvg = img.src.toLowerCase().endsWith('.svg');
        discovered.set(img.src, {
          id: `asset-${discovered.size + 1}`,
          sourceUrl: img.src,
          referenceRoute: route,
          component: img.component,
          mediaType: isSvg ? 'svg-external' : 'image',
          mimeType: isSvg ? 'image/svg+xml' : 'image/unknown',
          originalFilename: sanitizeFilename(img.src),
          originalWidth: img.naturalWidth,
          originalHeight: img.naturalHeight,
          displayWidth: img.displayWidth,
          displayHeight: img.displayHeight,
          aspectRatio: img.naturalWidth && img.naturalHeight ? `${img.naturalWidth}:${img.naturalHeight}` : '',
          objectFit: img.objectFit,
          objectPosition: img.objectPosition,
          transform: img.transform,
          zIndex: img.zIndex,
          hasTransparency: false,
          localPath: '',
          sha256: '',
          licenseStatus: 'Template asset - inspect /license',
          acquisitionStatus: 'skipped',
          optimizedVariants: [],
          notes: img.alt ? `alt: ${img.alt}` : '',
          srcset: img.srcset,
          alt: img.alt,
        });
      }
    }

    for (const bg of extracted.cssBgs) {
      if (!discovered.has(bg.url)) {
        discovered.set(bg.url, {
          id: `bg-${discovered.size + 1}`,
          sourceUrl: bg.url,
          referenceRoute: route,
          component: bg.component,
          mediaType: 'css-background',
          mimeType: 'image/unknown',
          originalFilename: sanitizeFilename(bg.url),
          originalWidth: 0,
          originalHeight: 0,
          displayWidth: bg.width,
          displayHeight: bg.height,
          aspectRatio: '',
          objectFit: 'cover',
          objectPosition: 'center',
          transform: '',
          zIndex: 0,
          hasTransparency: false,
          localPath: '',
          sha256: '',
          licenseStatus: 'Template asset - inspect /license',
          acquisitionStatus: 'skipped',
          optimizedVariants: [],
          notes: 'CSS background-image',
        });
      }
    }

    for (const vid of extracted.videos) {
      if (vid.src && !discovered.has(vid.src)) {
        discovered.set(vid.src, {
          id: `vid-${discovered.size + 1}`,
          sourceUrl: vid.src,
          referenceRoute: route,
          component: vid.component,
          mediaType: 'video',
          mimeType: 'video/mp4',
          originalFilename: sanitizeFilename(vid.src, '.mp4'),
          originalWidth: 0,
          originalHeight: 0,
          displayWidth: vid.width,
          displayHeight: vid.height,
          aspectRatio: '',
          objectFit: 'cover',
          objectPosition: 'center',
          transform: '',
          zIndex: 0,
          hasTransparency: false,
          localPath: '',
          sha256: '',
          licenseStatus: 'Template asset - inspect /license',
          acquisitionStatus: 'skipped',
          optimizedVariants: [],
          notes: vid.poster ? `poster: ${vid.poster}` : '',
        });
      }
      if (vid.poster && !discovered.has(vid.poster)) {
        discovered.set(vid.poster, {
          id: `poster-${discovered.size + 1}`,
          sourceUrl: vid.poster,
          referenceRoute: route,
          component: `${vid.component} poster`,
          mediaType: 'image',
          mimeType: 'image/unknown',
          originalFilename: sanitizeFilename(vid.poster),
          originalWidth: 0,
          originalHeight: 0,
          displayWidth: vid.width,
          displayHeight: vid.height,
          aspectRatio: '',
          objectFit: 'cover',
          objectPosition: 'center',
          transform: '',
          zIndex: 0,
          hasTransparency: false,
          localPath: '',
          sha256: '',
          licenseStatus: 'Template asset - inspect /license',
          acquisitionStatus: 'skipped',
          optimizedVariants: [],
          notes: 'Video poster',
        });
      }
    }

    for (const fav of extracted.favicons) {
      if (!fav.startsWith('data:') && !discovered.has(fav)) {
        discovered.set(fav, {
          id: `meta-${discovered.size + 1}`,
          sourceUrl: fav,
          referenceRoute: route,
          component: 'head-icon-or-og',
          mediaType: fav.endsWith('.svg') ? 'svg-external' : 'image',
          mimeType: 'image/unknown',
          originalFilename: sanitizeFilename(fav),
          originalWidth: 0,
          originalHeight: 0,
          displayWidth: 0,
          displayHeight: 0,
          aspectRatio: '',
          objectFit: '',
          objectPosition: '',
          transform: '',
          zIndex: 0,
          hasTransparency: false,
          localPath: '',
          sha256: '',
          licenseStatus: 'Template asset - inspect /license',
          acquisitionStatus: 'skipped',
          optimizedVariants: [],
          notes: 'Head favicon / OG image',
        });
      }
    }

    for (const s of extracted.svgs) {
      const hash = crypto.createHash('sha256').update(s.html).digest('hex').slice(0, 12);
      if (!inlineSvgs.some((x) => x.hash === hash)) {
        inlineSvgs.push({ route, component: s.component, html: s.html, width: s.width, height: s.height, hash });
      }
    }
  }

  await browser.close();

  // Also include any network-observed images/videos missed in DOM
  for (const [u, info] of networkAssets.entries()) {
    if (!discovered.has(u) && (u.includes('website-files.com') || u.includes('fonts.gstatic.com'))) {
      discovered.set(u, {
        id: `net-${discovered.size + 1}`,
        sourceUrl: u,
        referenceRoute: 'network',
        component: 'network-observed',
        mediaType: info.mime.includes('font') ? 'font' : info.mime.includes('video') ? 'video' : u.endsWith('.svg') ? 'svg-external' : 'image',
        mimeType: info.mime,
        originalFilename: sanitizeFilename(u),
        originalWidth: 0,
        originalHeight: 0,
        displayWidth: 0,
        displayHeight: 0,
        aspectRatio: '',
        objectFit: '',
        objectPosition: '',
        transform: '',
        zIndex: 0,
        hasTransparency: false,
        localPath: '',
        sha256: '',
        licenseStatus: 'Template asset - inspect /license',
        acquisitionStatus: 'skipped',
        optimizedVariants: [],
        notes: 'Captured via network response',
      });
    }
  }

  // Acquire assets and deduplicate by SHA-256
  const hashToLocalPath = new Map<string, string>();
  const records = Array.from(discovered.values());
  const usedPaths = new Set<string>();

  for (const rec of records) {
    if (!rec.sourceUrl.startsWith('http')) continue;
    try {
      const res = await fetch(rec.sourceUrl);
      if (!res.ok) {
        rec.acquisitionStatus = 'failed';
        rec.notes += ` | HTTP ${res.status}`;
        continue;
      }
      const ct = (res.headers.get('content-type') || '').toLowerCase();
      if (ct.includes('text/html')) {
        rec.acquisitionStatus = 'failed';
        rec.notes += ' | HTML response rejected';
        continue;
      }
      rec.mimeType = ct.split(';')[0] || rec.mimeType;
      const buf = Buffer.from(await res.arrayBuffer());
      const sha = crypto.createHash('sha256').update(buf).digest('hex');
      rec.sha256 = sha;

      if (hashToLocalPath.has(sha)) {
        rec.localPath = hashToLocalPath.get(sha)!;
        rec.acquisitionStatus = 'acquired';
        rec.notes += ' | Deduplicated to existing binary';
      } else {
        const folder = classifyFolder(rec.sourceUrl, rec.component, rec.mediaType);
        const dir = path.join('public', 'assets', folder);
        await fs.mkdir(dir, { recursive: true });
        let fname = rec.originalFilename;
        let targetRel = path.posix.join('assets', folder, fname);
        let counter = 1;
        while (usedPaths.has(targetRel)) {
          const ext = path.extname(fname);
          const stem = path.basename(fname, ext);
          fname = `${stem}-${counter++}${ext}`;
          targetRel = path.posix.join('assets', folder, fname);
        }
        usedPaths.add(targetRel);
        const fullPath = path.join('public', targetRel);
        await fs.writeFile(fullPath, buf);
        rec.localPath = '/' + targetRel;
        hashToLocalPath.set(sha, rec.localPath);
        rec.acquisitionStatus = 'acquired';
      }

      // Inspect raster metadata via sharp
      if (rec.mediaType === 'image' || rec.mediaType === 'css-background') {
        if (!rec.mimeType.includes('svg')) {
          try {
            const meta = await sharp(buf).metadata();
            rec.originalWidth = meta.width || rec.originalWidth;
            rec.originalHeight = meta.height || rec.originalHeight;
            rec.hasTransparency = Boolean(meta.hasAlpha);
            if (rec.originalWidth && rec.originalHeight) {
              rec.aspectRatio = `${rec.originalWidth}:${rec.originalHeight}`;
            }
          } catch {
            // ignore non-raster
          }
        }
      }
    } catch (e) {
      rec.acquisitionStatus = 'failed';
      rec.notes += ` | Fetch error: ${String(e)}`;
    }
  }

  await fs.writeFile('docs/research/asset-manifest.json', JSON.stringify(records, null, 2));
  await fs.writeFile('docs/research/inline-svgs.json', JSON.stringify(inlineSvgs, null, 2));
  await fs.writeFile('docs/research/font-faces.json', JSON.stringify(fontFaceRules, null, 2));
  console.log(`Assets discovered: ${records.length}, inline SVGs: ${inlineSvgs.length}, font-face rules: ${fontFaceRules.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
