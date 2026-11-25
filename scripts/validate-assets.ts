import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

interface AssetRecord {
  id: string;
  sourceUrl: string;
  mediaType: string;
  mimeType: string;
  localPath: string;
  sha256: string;
  acquisitionStatus: string;
}

async function main() {
  const raw = await fs.readFile('docs/research/asset-manifest.json', 'utf-8');
  const records: AssetRecord[] = JSON.parse(raw);

  let valid = 0;
  let invalid = 0;
  const uniqueHashes = new Set<string>();

  for (const r of records) {
    if (r.acquisitionStatus !== 'acquired' || !r.localPath) continue;
    const filePath = path.join('public', r.localPath.replace(/^\//, ''));
    try {
      const buf = await fs.readFile(filePath);
      if (buf.length === 0) {
        console.error(`Empty file: ${filePath}`);
        invalid++;
        continue;
      }
      const head = buf.slice(0, 64).toString('utf8').toLowerCase();
      if (head.includes('<!doctype html') || head.includes('<html')) {
        console.error(`HTML masquerading as media: ${filePath}`);
        invalid++;
        continue;
      }
      const sha = crypto.createHash('sha256').update(buf).digest('hex');
      if (r.sha256 && sha !== r.sha256) {
        console.error(`SHA mismatch for ${filePath}`);
        invalid++;
        continue;
      }
      uniqueHashes.add(sha);
      valid++;
    } catch (e) {
      console.error(`Missing file ${filePath}:`, e);
      invalid++;
    }
  }

  console.log(`Asset validation complete: ${valid} verified records, ${uniqueHashes.size} unique binaries, ${invalid} invalid.`);
  if (invalid > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
