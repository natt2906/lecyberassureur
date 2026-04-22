import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const siteUrl = (process.env.VITE_SITE_URL || 'https://lecyberassureur.fr').replace(/\/+$/, '');
const defaultImage = '/hero-cyber.png';
const siteName = 'Le Cyberassureur';
const logoUrl = '/brand-assets/logo-cropped-384.png';
const buildTimestamp = new Date().toISOString();

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
  const assuranceCyberCoverageFaqItems = evaluateExpression(
    extractAssignment(faqSource, 'assuranceCyberCoverageFaqItems', '[', ']'),
  );
  const assuranceCyberPmeFaqItems = evaluateExpression(
    extractAssignment(faqSource, 'assuranceCyberPmeFaqItems', '[', ']'),
  );
  const assuranceCyberTpeFaqItems = evaluateExpression(
    extractAssignment(faqSource, 'assuranceCyberTpeFaqItems', '[', ']'),
  );
  const assuranceCyberMandatoryFaqItems = evaluateExpression(
    extractAssignment(faqSource, 'assuranceCyberMandatoryFaqItems', '[', ']'),
  );
  const assuranceCyberPriceFaqItems = evaluateExpression(
    extractAssignment(faqSource, 'assuranceCyberPriceFaqItems', '[', ']'),
  );
  const devisAssuranceCyberFaqItems = evaluateExpression(
    extractAssignment(faqSource, 'devisAssuranceCyberFaqItems', '[', ']'),
  );
  const offersFaqItems = evaluateExpression(extractAssignment(faqSource, 'offersFaqItems', '[', ']'));
  const cyberRisksFaqItems = evaluateExpression(
    extractAssignment(faqSource, 'cyberRisksFaqItems', '[', ']'),
  );
  const articles = evaluateExpression(extractAssignment(articlesSource, 'articles', '[', ']'));
  const articleRedirects = evaluateExpression(
    extractAssignment(articlesSource, 'articleRedirects', '{', '}'),
  );
  const cardImages = evaluateExpression(extractAssignment(cardImagesSource, 'cardImages', '{', '}'));

  return {
    homeFaqItems,
    faqPageItems,
    assuranceCyberFaqItems,
    assuranceCyberCoverageFaqItems,
    assuranceCyberPmeFaqItems,
    assuranceCyberTpeFaqItems,
    assuranceCyberMandatoryFaqItems,
    assuranceCyberPriceFaqItems,
    devisAssuranceCyberFaqItems,
    offersFaqItems,
    cyberRisksFaqItems,
    articles,
    articleRedirects,
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

function createBreadcrumbStructuredData(pathname, title) {
  const segments = pathname.split('/').filter(Boolean);
  const baseItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: `${siteUrl}/`,
    },
  ];

  if (pathname === '/') {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: baseItems,
    };
  }

  const itemListElement = [...baseItems];
  let currentPath = '';

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    const crumbName = isLast
      ? title.split(' | ')[0]
      : segment
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ');

    itemListElement.push({
      '@type': 'ListItem',
      position: itemListElement.length + 1,
      name: crumbName,
      item: new URL(currentPath, `${siteUrl}/`).toString(),
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

function createWebPageStructuredData(route) {
  const pageType =
    route.path === '/qui-sommes-nous'
      ? 'AboutPage'
      : route.path === '/articles'
        ? 'CollectionPage'
        : 'WebPage';

  return {
    '@context': 'https://schema.org',
    '@type': pageType,
    name: route.title,
    description: route.description,
    url: new URL(route.path, `${siteUrl}/`).toString(),
    image: toAbsoluteUrl(route.image || defaultImage),
    inLanguage: 'fr-FR',
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
    },
  };
}

function createStaticRoutes(content) {
  return [
    {
      path: '/',
      title: 'Assurance cyber entreprise, TPE et PME : devis et accompagnement | Le Cyberassureur',
      description:
        "Le Cyberassureur accompagne les TPE et PME avec une assurance cyber pensée pour absorber les pertes financières, l’arrêt d’activité et les frais de gestion de crise.",
      keywords:
        'assurance cyber entreprise, assurance cyber TPE, assurance cyber PME, devis assurance cyber, protection cyber entreprise, couverture cyber entreprise',
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
      path: '/qui-sommes-nous',
      title: 'Qui sommes-nous ? | Le Cyberassureur',
      description:
        "Découvrez Le Cyberassureur, la marque spécialisée de Prorisk Assurances dédiée à l'assurance cyber entreprise, à la protection financière et à l'accompagnement des organisations face aux cyber-risques.",
      keywords:
        'qui sommes nous cyberassurance, le cyberassureur, prorisk assurances, courtier assurance cyber entreprise, specialiste assurance cyber',
    },
    {
      path: '/offres',
      title: 'Offre assurance cyber : Basic, Silver et Gold | Le Cyberassureur',
      description:
        "Comparez nos offres d'assurance cyber Basic, Silver et Gold pour choisir une formule cohérente avec votre activité, votre exposition au risque et votre besoin de couverture.",
      keywords:
        "offre assurance cyber, offres assurance cyber entreprise, formule assurance cyber, prix assurance cyber entreprise, niveau de couverture cyber",
      structuredData: [toFaqStructuredData(content.offersFaqItems)],
    },
    {
      path: '/assurance-cyber',
      title: "Comment fonctionne l'assurance cyber en entreprise | Le Cyberassureur",
      description:
        "Guide pratique pour comprendre le rôle d'une assurance cyber en entreprise, ce qu'elle couvre, ce qu'elle ne remplace pas et comment choisir le bon niveau de protection.",
      keywords:
        "fonctionnement assurance cyber, couverture assurance cyber, assurance cyber entreprise guide, que couvre assurance cyber, protection cyber entreprise",
      structuredData: [toFaqStructuredData(content.assuranceCyberFaqItems)],
    },
    {
      path: '/assurance-cyber-prix',
      title: 'Prix assurance cyber PME : comment estimer le bon budget | Le Cyberassureur',
      description:
        "Prix assurance cyber PME : découvrez ce qui fait varier le tarif, comment lire un prix d'appel et comment demander un devis cohérent avec votre exposition réelle.",
      keywords:
        'assurance cyber prix pme, prix assurance cyber, tarif assurance cyber entreprise, devis assurance cyber, budget assurance cyber',
      structuredData: [toFaqStructuredData(content.assuranceCyberPriceFaqItems)],
    },
    {
      path: '/devis-assurance-cyber',
      title: 'Devis assurance cyber : demande rapide pour entreprise | Le Cyberassureur',
      description:
        "Demandez un devis assurance cyber pour votre entreprise. Décrivez votre activité, votre exposition et votre besoin de couverture pour obtenir un cadrage rapide et cohérent.",
      keywords:
        'devis assurance cyber, demande devis assurance cyber, devis cyber entreprise, prix assurance cyber devis, formulaire assurance cyber',
      structuredData: [toFaqStructuredData(content.devisAssuranceCyberFaqItems)],
    },
    {
      path: '/assurance-cyber-obligatoire',
      title: 'Assurance cyber obligatoire ou non : ce qu’une entreprise doit savoir | Le Cyberassureur',
      description:
        "Assurance cyber obligatoire ou non : découvrez ce qu'une entreprise doit vérifier, quand la couverture n'est pas imposée par la loi mais devient nécessaire en pratique, et quels profils sont les plus exposés.",
      keywords:
        'assurance cyber obligatoire, assurance cyber obligatoire ou non, obligation assurance cyber entreprise, assurance cyber profession reglementee',
      structuredData: [toFaqStructuredData(content.assuranceCyberMandatoryFaqItems)],
    },
    {
      path: '/assurance-cyber-que-couvre',
      title: 'Que couvre une assurance cyber pour entreprise ? | Le Cyberassureur',
      description:
        "Découvrez ce que couvre une assurance cyber pour entreprise : interruption d'activité, frais d'experts, gestion de crise, responsabilités liées aux données, dommages subis et fraude selon les garanties.",
      keywords:
        'assurance cyber que couvre, que couvre assurance cyber, garanties assurance cyber, couverture assurance cyber entreprise, assurance cyber fraude',
      structuredData: [toFaqStructuredData(content.assuranceCyberCoverageFaqItems)],
    },
    {
      path: '/assurance-cyber-pme',
      title: 'Assurance cyber PME : couverture et devis pour votre activité | Le Cyberassureur',
      description:
        "Assurance cyber PME : identifiez les risques les plus coûteux pour une PME, les garanties réellement utiles et la meilleure façon d'obtenir un devis cohérent avec votre activité.",
      keywords:
        'assurance cyber pme, devis assurance cyber pme, couverture cyber pme, cyber risques pme, prix assurance cyber pme',
      structuredData: [toFaqStructuredData(content.assuranceCyberPmeFaqItems)],
    },
    {
      path: '/assurance-cyber-tpe',
      title: 'Assurance cyber TPE : protéger une petite entreprise contre le risque cyber | Le Cyberassureur',
      description:
        "Assurance cyber TPE : découvrez pourquoi une petite entreprise, une startup ou une structure agile reste exposée, quelles garanties regarder et comment demander un devis adapté.",
      keywords:
        'assurance cyber tpe, assurance cyber petite entreprise, devis assurance cyber tpe, cyber risque tpe, assurance cyber startup',
      structuredData: [toFaqStructuredData(content.assuranceCyberTpeFaqItems)],
    },
    {
      path: '/assurance-cyber-risques',
      title: 'Cyber-risques en entreprise : coûts, impacts et couverture | Le Cyberassureur',
      description:
        "Identifiez les cyber-risques les plus coûteux pour une entreprise, les impacts concrets sur l'activité et la manière dont une couverture adaptée peut limiter la perte.",
      keywords:
        'cyber risques entreprise, risques cyber PME, cout cyberattaque entreprise, exposition cyber entreprise, couverture cyber risques',
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
      robots: 'noindex,follow',
    },
    {
      path: '/conditions-utilisation',
      title: "Conditions d'utilisation | Le Cyberassureur",
      description:
        "Consultez les conditions d'utilisation du site Le Cyberassureur et le cadre d'usage du contenu et du formulaire de contact.",
      robots: 'noindex,follow',
    },
    {
      path: '/mentions-legales',
      title: 'Mentions légales | Le Cyberassureur',
      description:
        "Consultez les mentions légales du site Le Cyberassureur, les informations d'identification de l'éditeur et les éléments d'hébergement du service.",
      robots: 'noindex,follow',
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
  return content.articles
    .filter((article) => !content.articleRedirects[article.slug])
    .map((article) => {
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
  const structuredData = [
    createWebPageStructuredData(route),
    createBreadcrumbStructuredData(route.path, route.title),
    ...(route.structuredData || []),
  ];
  const targetPath =
    route.path === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.path.replace(/^\/+/, ''), 'index.html');

  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, applyMeta(baseHtml, { ...route, structuredData }), 'utf8');
}

async function writeSitemap(routes) {
  const indexedRoutes = routes.filter((route) => route.path !== '/merci' && route.robots !== 'noindex,follow');
  const routePriorityMap = new Map([
    ['/', '1.0'],
    ['/assurance-cyber', '0.9'],
    ['/offres', '0.9'],
    ['/devis-assurance-cyber', '0.9'],
    ['/assurance-cyber-prix', '0.8'],
    ['/assurance-cyber-obligatoire', '0.8'],
    ['/assurance-cyber-que-couvre', '0.8'],
    ['/assurance-cyber-pme', '0.8'],
    ['/assurance-cyber-tpe', '0.8'],
    ['/assurance-cyber-risques', '0.8'],
    ['/articles', '0.8'],
    ['/faq', '0.7'],
    ['/temoignages', '0.7'],
    ['/qui-sommes-nous', '0.7'],
  ]);
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...indexedRoutes.map((route) => {
      const priority = routePriorityMap.get(route.path) || (route.path.startsWith('/articles/') ? '0.7' : '0.6');
      const changefreq = route.path === '/' ? 'weekly' : route.path.startsWith('/articles/') ? 'monthly' : 'weekly';
      return [
        '  <url>',
        `    <loc>${new URL(route.path, `${siteUrl}/`).toString()}</loc>`,
        `    <lastmod>${buildTimestamp}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n');
    }),
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
