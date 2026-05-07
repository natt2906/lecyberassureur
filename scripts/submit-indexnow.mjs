import { readFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const siteUrl = (process.env.VITE_SITE_URL || 'https://lecyberassureur.fr').replace(/\/+$/, '');
const indexNowKey = '9dfdc12a56384f23bd90cb1284d0add0';
const keyLocation = `${siteUrl}/${indexNowKey}.txt`;
const sitemapPath = path.join(projectRoot, 'dist', 'sitemap.xml');

function extractUrls(sitemapXml) {
  return [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]).filter(Boolean);
}

async function main() {
  const sitemapXml = await readFile(sitemapPath, 'utf8');
  const urls = extractUrls(sitemapXml);

  if (!urls.length) {
    throw new Error('Aucune URL indexable trouvée dans dist/sitemap.xml');
  }

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      host: new URL(siteUrl).host,
      key: indexNowKey,
      keyLocation,
      urlList: urls,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`IndexNow a refusé la requête (${response.status}): ${body}`);
  }

  console.log(`IndexNow: ${urls.length} URL(s) soumises pour ${siteUrl}`);
}

await main();
