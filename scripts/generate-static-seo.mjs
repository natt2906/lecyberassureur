import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const siteUrl = (process.env.VITE_SITE_URL || 'https://lecyberassureur.fr').replace(/\/+$/, '');
const defaultImage = '/hero-cyber.png';
const siteName = 'Le Cyberassureur';
const logoUrl = '/brand-assets/logo-cropped-384.png';

function toAbsoluteUrl(value) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return new URL(value, `${siteUrl}/`).toString();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function upsertTag(html, regex, tag) {
  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  return html.replace('</head>', `  ${tag}\n</head>`);
}

function removeTag(html, regex) {
  return html.replace(regex, '');
}

function removeStructuredData(html) {
  return html.replace(/\s*<script[^>]*data-seo-structured=["']true["'][^>]*>[\s\S]*?<\/script>/gi, '');
}

function applyMeta(baseHtml, meta) {
  const canonicalUrl = new URL(meta.path, `${siteUrl}/`).toString();
  const imageUrl = toAbsoluteUrl(meta.image || defaultImage);
  const robots = meta.robots || 'index,follow';
  let html = removeStructuredData(baseHtml);

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  html = upsertTag(
    html,
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+name=["']robots["'][^>]*>/i,
    `<meta name="robots" content="${escapeHtml(robots)}" />`,
  );

  if (meta.keywords) {
    html = upsertTag(
      html,
      /<meta\s+name=["']keywords["'][^>]*>/i,
      `<meta name="keywords" content="${escapeHtml(meta.keywords)}" />`,
    );
  } else {
    html = removeTag(html, /\s*<meta\s+name=["']keywords["'][^>]*>\s*/i);
  }

  html = upsertTag(
    html,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+property=["']og:type["'][^>]*>/i,
    `<meta property="og:type" content="${escapeHtml(meta.type || 'website')}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+property=["']og:site_name["'][^>]*>/i,
    `<meta property="og:site_name" content="${escapeHtml(siteName)}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+property=["']og:image["'][^>]*>/i,
    `<meta property="og:image" content="${imageUrl}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+name=["']twitter:card["'][^>]*>/i,
    `<meta name="twitter:card" content="summary_large_image" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
  );
  html = upsertTag(
    html,
    /<meta\s+name=["']twitter:image["'][^>]*>/i,
    `<meta name="twitter:image" content="${imageUrl}" />`,
  );

  if (meta.structuredData?.length) {
    const scripts = meta.structuredData
      .map(
        (entry) =>
          `  <script type="application/ld+json" data-seo-structured="true">${JSON.stringify(entry)}</script>`,
      )
      .join('\n');

    html = html.replace('</head>', `${scripts}\n</head>`);
  }

  return html;
}

function extractAssignment(source, name, openToken, closeToken) {
  const startMatch = source.match(new RegExp(`export const ${name}(?::[^=]+)? = ${openToken === '[' ? '\\[' : '\\{'}`));

  if (!startMatch?.index && startMatch?.index !== 0) {
    throw new Error(`Impossible de trouver ${name}`);
  }

  const assignmentStart = startMatch.index + startMatch[0].length - 1;
  let depth = 0;
  let inString = false;
  let stringDelimiter = '';
  let escaped = false;

  for (let index = assignmentStart; index < source.length; index += 1) {
    const character = source[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (character === '\\') {
        escaped = true;
      } else if (character === stringDelimiter) {
        inString = false;
      }
      continue;
    }

    if (character === '"' || character === "'" || character === '`') {
      inString = true;
      stringDelimiter = character;
      continue;
    }

    if (character === openToken) {
      depth += 1;
    } else if (character === closeToken) {
      depth -= 1;
      if (depth === 0) {
        return source.slice(assignmentStart, index + 1);
      }
    }
  }

  throw new Error(`Impossible d'extraire ${name}`);
}

function evaluateExpression(expression, scope = {}) {
  const keys = Object.keys(scope);
  const values = Object.values(scope);
  return new Function(...keys, `return (${expression});`)(...values);
}

async function loadContentData() {
  const faqSource = await readFile(path.join(projectRoot, 'src/data/faqs.ts'), 'utf8');
  const articlesSource = await readFile(path.join(projectRoot, 'src/data/articles.ts'), 'utf8');
  const cardImagesSource = await readFile(path.join(projectRoot, 'src/data/cardImages.ts'), 'utf8');

  const homeFaqItems = evaluateExpression(extractAssignment(faqSource, 'homeFaqItems', '[', ']'));
  const faqPageItems = evaluateExpression(extractAssignment(faqSource, 'faqPageItems', '[', ']'), {
    homeFaqItems,
  });
  const assuranceCyberFaqItems = evaluateExpression(
    extractAssignment(faqSource, 'assuranceCyberFaqItems', '[', ']'),
  );
  const offersFaqItems = evaluateExpression(extractAssignment(faqSource, 'offersFaqItems', '[', ']'));
  const cyberRisksFaqItems = evaluateExpression(
    extractAssignment(faqSource, 'cyberRisksFaqItems', '[', ']'),
  );
  const articles = evaluateExpression(extractAssignment(articlesSource, 'articles', '[', ']'));
  const cardImages = evaluateExpression(extractAssignment(cardImagesSource, 'cardImages', '{', '}'));

  return {
    homeFaqItems,
    faqPageItems,
    assuranceCyberFaqItems,
    offersFaqItems,
    cyberRisksFaqItems,
    articles,
    cardImages,
  };
}

function toFaqStructuredData(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

function createStaticRoutes(content) {
  return [
    {
      path: '/',
      title: 'Assurance cyber pour entreprise, TPE et PME | Le Cyberassureur',
      description:
        "Le Cyberassureur propose une assurance cyber pour entreprise avec analyse du risque, couverture des pertes financières, dommages subis, fraude et accompagnement expert pour TPE et PME.",
      keywords:
        'assurance cyber, assurance cyber entreprise, offre assurance cyber, assurance cyber risques, assurance cyber PME, assurance cyber TPE, risque cyber entreprise, protection financiere cyber',
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteName,
          url: siteUrl,
          logo: toAbsoluteUrl(logoUrl),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteName,
          url: siteUrl,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Assurance cyber pour entreprise',
          serviceType: 'Assurance cyber',
          provider: {
            '@type': 'Organization',
            name: siteName,
            url: siteUrl,
          },
          areaServed: 'FR',
          audience: {
            '@type': 'BusinessAudience',
            audienceType: 'TPE, PME et entreprises',
          },
        },
        toFaqStructuredData(content.homeFaqItems),
      ],
    },
    {
      path: '/offres',
      title: "Offres d'assurance cyber pour entreprise | Le Cyberassureur",
      description:
        "Comparez nos offres d'assurance cyber Basic, Silver et Gold pour choisir un niveau de protection cohérent avec votre activité, votre exposition au risque et vos besoins de couverture.",
      keywords:
        "offre assurance cyber, offres d'assurance cyber, assurance cyber entreprise, assurance cyber PME, protection cyber entreprise",
      structuredData: [toFaqStructuredData(content.offersFaqItems)],
    },
    {
      path: '/assurance-cyber',
      title: 'Assurance cyber pour entreprise : comprendre la protection utile | Le Cyberassureur',
      description:
        "Comprenez à quoi sert une assurance cyber pour entreprise, ce qu'elle couvre, comment choisir le bon niveau de protection et pourquoi elle complète la cybersécurité.",
      keywords:
        'assurance cyber, assurance cyber entreprise, assurance cyber PME, assurance cyber TPE, protection cyber entreprise',
      structuredData: [toFaqStructuredData(content.assuranceCyberFaqItems)],
    },
    {
      path: '/assurance-cyber-risques',
      title: 'Assurance cyber-risques : comprendre les risques les plus coûteux | Le Cyberassureur',
      description:
        "Découvrez quels cyber-risques coûtent le plus cher aux entreprises, pourquoi les TPE et PME sont exposées et comment une assurance cyber-risques aide à absorber l'impact financier.",
      keywords:
        'assurance cyber risques, assurance cyber-risques, cyber risques entreprise, risque cyber PME, assurance cyber fraude',
      structuredData: [toFaqStructuredData(content.cyberRisksFaqItems)],
    },
    {
      path: '/articles',
      title: 'Articles cyberassurance et risques cyber | Le Cyberassureur',
      description:
        "Consultez nos articles sur les pertes financières, l'interruption d'activité, les garanties cyber, la fraude et les profils d'entreprises à protéger.",
      keywords:
        'articles assurance cyber, article cyber risques, interruption activite cyber, pertes financieres cyberattaque',
    },
    {
      path: '/faq',
      title: 'FAQ assurance cyber : questions fréquentes | Le Cyberassureur',
      description:
        "Retrouvez les réponses clés sur l'assurance cyber, les garanties, les pertes d'exploitation, la fraude et les conditions de couverture pour les TPE et PME.",
      structuredData: [toFaqStructuredData(content.faqPageItems)],
    },
    {
      path: '/temoignages',
      title: 'Témoignages clients cyberassurance | Le Cyberassureur',
      description:
        "Découvrez des retours d'expérience concrets sur la gestion d'incidents, l'absorption des pertes financières et l'accompagnement après cyberattaque.",
    },
    {
      path: '/politique-confidentialite',
      title: 'Politique de confidentialité | Le Cyberassureur',
      description:
        'Consultez la politique de confidentialité du site Le Cyberassureur, les données collectées via le formulaire et la gestion du consentement cookies.',
    },
    {
      path: '/conditions-utilisation',
      title: "Conditions d'utilisation | Le Cyberassureur",
      description:
        "Consultez les conditions d'utilisation du site Le Cyberassureur et le cadre d'usage du contenu et du formulaire de contact.",
    },
    {
      path: '/mentions-legales',
      title: 'Mentions légales | Le Cyberassureur',
      description:
        "Consultez les mentions légales du site Le Cyberassureur, les informations d'identification de l'éditeur et les éléments d'hébergement du service.",
    },
    {
      path: '/merci',
      title: 'Merci pour votre demande | Le Cyberassureur',
      description:
        "Votre demande d'analyse de risque cyber a bien été transmise. Un expert revient vers vous pour qualifier votre besoin et la suite à donner.",
      robots: 'noindex,follow',
    },
  ];
}

function createArticleRoutes(content) {
  return content.articles.map((article) => {
    const image = content.cardImages[article.variant]?.src || defaultImage;
    return {
      path: `/articles/${article.slug}`,
      title: `${article.title} | Le Cyberassureur`,
      description: article.excerpt,
      image,
      type: 'article',
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          image: [toAbsoluteUrl(image)],
          mainEntityOfPage: new URL(`/articles/${article.slug}`, `${siteUrl}/`).toString(),
          author: {
            '@type': 'Organization',
            name: siteName,
          },
          publisher: {
            '@type': 'Organization',
            name: siteName,
            logo: {
              '@type': 'ImageObject',
              url: toAbsoluteUrl(logoUrl),
            },
          },
        },
      ],
    };
  });
}

async function writeRouteHtml(baseHtml, route) {
  const targetPath =
    route.path === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.path.replace(/^\/+/, ''), 'index.html');

  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, applyMeta(baseHtml, route), 'utf8');
}

async function writeSitemap(routes) {
  const indexedRoutes = routes.filter((route) => route.path !== '/merci' && route.robots !== 'noindex,follow');
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...indexedRoutes.map(
      (route) => `  <url><loc>${new URL(route.path, `${siteUrl}/`).toString()}</loc></url>`,
    ),
    '</urlset>',
    '',
  ];

  await writeFile(path.join(distDir, 'sitemap.xml'), lines.join('\n'), 'utf8');
}

async function main() {
  const baseHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');
  const content = await loadContentData();
  const routes = [...createStaticRoutes(content), ...createArticleRoutes(content)];

  await Promise.all(routes.map((route) => writeRouteHtml(baseHtml, route)));
  await writeSitemap(routes);
}

await main();
