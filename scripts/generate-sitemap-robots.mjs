import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://lecyberassureur.fr';

const robots = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.mkdirSync('public', { recursive: true });
fs.writeFileSync(path.join('public', 'robots.txt'), robots, 'utf8');

const distSitemapPath = path.join('dist', 'sitemap.xml');
if (fs.existsSync(distSitemapPath)) {
  fs.copyFileSync(distSitemapPath, path.join('public', 'sitemap.xml'));
}

if (fs.existsSync('dist')) {
  fs.writeFileSync(path.join('dist', 'robots.txt'), robots, 'utf8');
}

console.log('Generated robots.txt and synced sitemap.xml from dist when available');
