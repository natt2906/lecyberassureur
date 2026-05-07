import fs from "fs";
import path from "path";

const BASE_URL = "https://lecyberassureur.fr";
const today = new Date().toISOString().slice(0, 10);

const urls = [
  ["/", "weekly", "1.0"],

  ["/devis-assurance-cyber", "monthly", "0.95"],
  ["/offres", "monthly", "0.95"],

  ["/assurance-cyber", "monthly", "0.90"],
  ["/assurance-cyber-tpe", "monthly", "0.90"],
  ["/assurance-cyber-pme", "monthly", "0.90"],
  ["/assurance-cyber-prix", "monthly", "0.90"],

  ["/assurance-cyber-que-couvre", "monthly", "0.85"],
  ["/assurance-cyber-risques", "monthly", "0.85"],
  ["/assurance-cyber-obligatoire", "monthly", "0.80"],

  ["/faq", "monthly", "0.80"],
  ["/qui-sommes-nous", "monthly", "0.80"],
  ["/temoignages", "monthly", "0.75"],

  ["/articles", "monthly", "0.75"],

  ["/articles/activation-rapide-apres-incident", "monthly", "0.70"],
  ["/articles/assistance-humaine-24-7", "monthly", "0.70"],
  ["/articles/atteinte-a-la-reputation-apres-incident", "monthly", "0.70"],
  ["/articles/communication-de-crise-et-reputation", "monthly", "0.70"],
  ["/articles/continuite-dactivite-et-cyberassurance", "monthly", "0.70"],
  ["/articles/cyberassurance-pour-eti-et-grandes-entreprises", "monthly", "0.70"],
  ["/articles/cyberassurance-pour-pme", "monthly", "0.70"],
  ["/articles/cyberassurance-pour-tpe-et-startups", "monthly", "0.70"],
  ["/articles/defense-juridique-et-couts-reglementaires", "monthly", "0.70"],
  ["/articles/dommages-aux-tiers-en-cyberassurance", "monthly", "0.70"],
  ["/articles/experts-en-reponse-aux-incidents", "monthly", "0.70"],
  ["/articles/exposition-juridique-et-reglementaire", "monthly", "0.70"],
  ["/articles/interruption-activite-cyber", "monthly", "0.70"],
  ["/articles/pertes-financieres-cyberattaque", "monthly", "0.70"],
  ["/articles/pertes-financieres-et-perte-de-revenus", "monthly", "0.70"],
  ["/articles/pourquoi-un-specialiste-de-lassurance-cyber", "monthly", "0.70"],
  ["/articles/reseau-dexperts-cyber", "monthly", "0.70"],

  ["/mentions-legales", "monthly", "0.20"],
  ["/politique-confidentialite", "monthly", "0.20"],
  ["/conditions-utilisation", "monthly", "0.20"]
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(([url, changefreq, priority]) => `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`)
  .join("\n")}
</urlset>
`;

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

fs.mkdirSync("public", { recursive: true });
fs.writeFileSync(path.join("public", "sitemap.xml"), sitemap);
fs.writeFileSync(path.join("public", "robots.txt"), robots);

if (fs.existsSync("dist")) {
  fs.writeFileSync(path.join("dist", "sitemap.xml"), sitemap);
  fs.writeFileSync(path.join("dist", "robots.txt"), robots);
}

console.log(`Generated sitemap.xml with ${urls.length} URLs`);
console.log("Generated robots.txt");
