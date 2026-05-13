#!/usr/bin/env bash
set -euo pipefail

BASE_URL="https://lecyberassureur.fr"
LASTMOD="2026-05-08"

mkdir -p public

cat > public/sitemap.xml <<'XML'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lecyberassureur.fr/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/devis-assurance-cyber/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/offres/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/assurance-cyber/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/assurance-cyber-tpe/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/assurance-cyber-pme/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/assurance-cyber-prix/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/assurance-cyber-que-couvre/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/assurance-cyber-risques/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/assurance-cyber-obligatoire/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/faq/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/qui-sommes-nous/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/temoignages/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/activation-rapide-apres-incident/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/assistance-humaine-24-7/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/atteinte-a-la-reputation-apres-incident/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/communication-de-crise-et-reputation/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/continuite-dactivite-et-cyberassurance/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/cyberassurance-pour-eti-et-grandes-entreprises/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/cyberassurance-pour-pme/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/cyberassurance-pour-tpe-et-startups/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/defense-juridique-et-couts-reglementaires/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/dommages-aux-tiers-en-cyberassurance/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/experts-en-reponse-aux-incidents/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/exposition-juridique-et-reglementaire/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/interruption-activite-cyber/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/pertes-financieres-cyberattaque/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/pertes-financieres-et-perte-de-revenus/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/pourquoi-un-specialiste-de-lassurance-cyber/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/articles/reseau-dexperts-cyber/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/mentions-legales/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.20</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/politique-confidentialite/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.20</priority>
  </url>
  <url>
    <loc>https://lecyberassureur.fr/conditions-utilisation/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.20</priority>
  </url>
</urlset>
XML

cat > public/robots.txt <<'TXT'
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://lecyberassureur.fr/sitemap.xml
TXT

# Optional local dist copy if dist already exists.
if [ -d dist ]; then
  cp public/sitemap.xml dist/sitemap.xml
  cp public/robots.txt dist/robots.txt
fi

printf "OK: public/sitemap.xml generated with 34 URLs.\n"
printf "OK: public/robots.txt generated.\n"
printf "Excluded from sitemap: /merci/ because it is a post-conversion thank-you page.\n"
