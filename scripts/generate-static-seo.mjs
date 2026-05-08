import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const siteUrl = (process.env.VITE_SITE_URL || 'https://lecyberassureur.fr').replace(/\/+$/, '');
const defaultImage = '/hero-cyber.png';
const siteName = 'Le Cyberassureur';
const logoUrl = '/brand-assets/logo-blue-hq.png';
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

function titleToHeading(title) {
  return title.split(' | ')[0].replace(/\s*:\s*/g, ' : ');
}

function getRouteFaqItems(structuredData = []) {
  const faqEntry = structuredData.find((entry) => entry?.['@type'] === 'FAQPage');
  if (!faqEntry?.mainEntity?.length) {
    return [];
  }

  return faqEntry.mainEntity
    .map((item) => ({
      question: item?.name,
      answer: item?.acceptedAnswer?.text,
    }))
    .filter((item) => item.question && item.answer);
}

function createKeywordList(keywords = '') {
  return keywords
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function renderStaticSections(sections = []) {
  return sections
    .map((section) => {
      const paragraphs = (section.body || [])
        .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
        .join('');

      return `<section><h2>${escapeHtml(section.title)}</h2>${paragraphs}</section>`;
    })
    .join('');
}

function createStaticSnapshot(route) {
  const heading = titleToHeading(route.title);
  const keywords = createKeywordList(route.keywords);
  const faqItems = getRouteFaqItems(route.structuredData).slice(0, 4);
  const staticSections = route.staticContent?.sections || [];
  const takeaways = route.staticContent?.takeaways || [];

  const keywordMarkup = keywords.length
    ? `<ul>${keywords.map((keyword) => `<li>${escapeHtml(keyword)}</li>`).join('')}</ul>`
    : '';

  const faqMarkup = faqItems.length
    ? `<section><h2>Questions fréquentes</h2>${faqItems
        .map(
          (item) =>
            `<article><h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p></article>`,
        )
        .join('')}</section>`
    : '';

  const takeawaysMarkup = takeaways.length
    ? `<section><h2>Points clés</h2><ul>${takeaways
        .map((takeaway) => `<li>${escapeHtml(takeaway)}</li>`)
        .join('')}</ul></section>`
    : '';

  const introMarkup = route.staticContent?.intro
    ? `<p>${escapeHtml(route.staticContent.intro)}</p>`
    : '';

  return [
    '<main class="seo-static-content" aria-label="Contenu principal">',
    `<h1>${escapeHtml(heading)}</h1>`,
    `<p>${escapeHtml(route.description)}</p>`,
    introMarkup,
    keywordMarkup,
    '<nav aria-label="Pages principales">',
    '<a href="/">Accueil</a>',
    '<a href="/assurance-cyber">Assurance cyber</a>',
    '<a href="/offres">Offres</a>',
    '<a href="/devis-assurance-cyber">Devis assurance cyber</a>',
    '</nav>',
    renderStaticSections(staticSections),
    takeawaysMarkup,
    faqMarkup,
    '</main>',
  ]
    .filter(Boolean)
    .join('');
}

function injectStaticSnapshot(html, route) {
  const snapshot = createStaticSnapshot(route);
  const staticStyle = [
    '<style data-seo-static="true">',
    '.seo-static-content{max-width:1040px;margin:0 auto;padding:48px 24px;font-family:Arial,sans-serif;line-height:1.65;color:#111827;background:#fff}',
    '.seo-static-content h1{font-size:40px;line-height:1.1;margin:0 0 18px}',
    '.seo-static-content h2{font-size:24px;margin:32px 0 12px}',
    '.seo-static-content h3{font-size:18px;margin:20px 0 8px}',
    '.seo-static-content p,.seo-static-content li{font-size:17px}',
    '.seo-static-content nav{display:flex;flex-wrap:wrap;gap:12px;margin:28px 0}',
    '.seo-static-content a{color:#1d4ed8;font-weight:700}',
    '</style>',
  ].join('');

  let nextHtml = html.replace(/\s*<style[^>]*data-seo-static=["']true["'][^>]*>[\s\S]*?<\/style>/gi, '');
  nextHtml = nextHtml.replace('</head>', `  ${staticStyle}\n</head>`);
  return nextHtml.replace(/<div id=["']root["']>\s*<\/div>/i, `<div id="root">${snapshot}</div>`);
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

  return injectStaticSnapshot(html, meta);
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
    title: 'Assurance cyber TPE PME dès 29,99 € | Le Cyberassureur',
      description:
        "Assurance cyber TPE/PME : protégez activité, données et trésorerie avec des garanties lisibles, un accompagnement expert et un devis adapté à votre risque.",
      keywords:
        'assurance cyber entreprise, assurance cyber TPE, assurance cyber PME, devis assurance cyber, protection cyber entreprise, couverture cyber entreprise',
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteName,
          legalName: 'Le Cyberassureur - marque spécialisée de Prorisk Assurances',
          url: siteUrl,
          logo: toAbsoluteUrl(logoUrl),
          sameAs: [],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+33-1-88-83-08-60',
            contactType: 'customer support',
            areaServed: 'FR',
            availableLanguage: ['fr'],
          },
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
        "Découvrez Le Cyberassureur, marque de Prorisk Assurances: expertise cyber, méthode de conseil et accompagnement dédié aux entreprises françaises.",
      keywords:
        'qui sommes nous cyberassurance, le cyberassureur, prorisk assurances, courtier assurance cyber entreprise, specialiste assurance cyber',
    },
    {
      path: '/offres',
    title: 'Offres cyber Basic Silver Gold | Le Cyberassureur',
      description:
        "Comparez les offres cyber Basic, Silver et Gold, leurs garanties, limites et niveaux de protection pour choisir la formule adaptée à votre risque.",
      keywords:
        "offre assurance cyber, offres assurance cyber entreprise, formule assurance cyber, prix assurance cyber entreprise, niveau de couverture cyber",
      structuredData: [toFaqStructuredData(content.offersFaqItems)],
    },
    {
      path: '/assurance-cyber',
    title: 'Assurance cyber entreprise | Le Cyberassureur',
      description:
        "Assurance cyber entreprise : comprenez garanties, exclusions et critères de choix pour protéger activité, données sensibles et continuité financière.",
      keywords:
        "fonctionnement assurance cyber, couverture assurance cyber, assurance cyber entreprise guide, que couvre assurance cyber, protection cyber entreprise",
      structuredData: [toFaqStructuredData(content.assuranceCyberFaqItems)],
    },
    {
      path: '/assurance-cyber-prix',
    title: 'Prix assurance cyber PME | Le Cyberassureur',
      description:
        "Prix assurance cyber : comprenez les critères de tarif, évitez les garanties inadaptées et demandez un devis cohérent avec votre exposition réelle.",
      keywords:
        'assurance cyber prix pme, prix assurance cyber, tarif assurance cyber entreprise, devis assurance cyber, budget assurance cyber',
      structuredData: [toFaqStructuredData(content.assuranceCyberPriceFaqItems)],
    },
    {
      path: '/devis-assurance-cyber',
    title: 'Devis assurance cyber rapide | Le Cyberassureur',
      description:
        "Devis assurance cyber : décrivez votre activité et vos risques pour obtenir rapidement un cadrage clair, utile et cohérent avec votre niveau d’exposition.",
      keywords:
        'devis assurance cyber, demande devis assurance cyber, devis cyber entreprise, prix assurance cyber devis, formulaire assurance cyber',
      structuredData: [toFaqStructuredData(content.devisAssuranceCyberFaqItems)],
    },
    {
      path: '/assurance-cyber-obligatoire',
    title: 'Assurance cyber obligatoire ? | Le Cyberassureur',
      description:
        "Assurance cyber obligatoire ou non: vérifiez vos obligations légales, contractuelles et les cas où une couverture devient nécessaire en pratique.",
      keywords:
        'assurance cyber obligatoire, assurance cyber obligatoire ou non, obligation assurance cyber entreprise, assurance cyber profession reglementee',
      structuredData: [toFaqStructuredData(content.assuranceCyberMandatoryFaqItems)],
    },
    {
      path: '/assurance-cyber-que-couvre',
    title: "Que couvre l'assurance cyber ? | Le Cyberassureur",
      description:
        "Que couvre l’assurance cyber : interruption d’activité, experts, crise, données, limites et exclusions pour choisir un contrat adapté à votre entreprise.",
      keywords:
        'assurance cyber que couvre, que couvre assurance cyber, garanties assurance cyber, couverture assurance cyber entreprise, assurance cyber fraude',
      structuredData: [toFaqStructuredData(content.assuranceCyberCoverageFaqItems)],
    },
    {
      path: '/assurance-cyber-pme',
    title: 'Assurance cyber PME | Le Cyberassureur',
      description:
        "Assurance cyber PME : couvrez les risques les plus coûteux, clarifiez garanties et exclusions, puis obtenez un devis aligné avec votre activité réelle.",
      keywords:
        'assurance cyber pme, devis assurance cyber pme, couverture cyber pme, cyber risques pme, prix assurance cyber pme',
      structuredData: [toFaqStructuredData(content.assuranceCyberPmeFaqItems)],
    },
    {
      path: '/assurance-cyber-tpe',
    title: 'Assurance cyber TPE | Le Cyberassureur',
      description:
        "Assurance cyber TPE : garanties utiles, limites à connaître et devis clair pour protéger trésorerie, activité et données de votre petite entreprise.",
      keywords:
        'assurance cyber tpe, assurance cyber petite entreprise, devis assurance cyber tpe, cyber risque tpe, assurance cyber startup',
      structuredData: [toFaqStructuredData(content.assuranceCyberTpeFaqItems)],
    },
    {
      path: '/assurance-cyber-risques',
    title: 'Risques cyber entreprise | Le Cyberassureur',
      description:
        "Cyber-risques entreprise: identifiez les impacts les plus coûteux, les scénarios critiques et les garanties d’assurance utiles pour limiter les pertes.",
      keywords:
        'cyber risques entreprise, risques cyber PME, cout cyberattaque entreprise, exposition cyber entreprise, couverture cyber risques',
      structuredData: [toFaqStructuredData(content.cyberRisksFaqItems)],
    },
    {
      path: '/articles',
    title: 'Articles assurance cyber | Le Cyberassureur',
      description:
        "Consultez nos articles sur les pertes financières, l'interruption d'activité, les garanties cyber, la fraude et les profils d'entreprises à protéger.",
      keywords:
        'articles assurance cyber, article cyber risques, interruption activite cyber, pertes financieres cyberattaque',
    },
    {
      path: '/faq',
    title: 'FAQ assurance cyber | Le Cyberassureur',
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
  return content.articles.map((article) => {
      const image = content.cardImages[article.variant]?.src || defaultImage;
      return {
        path: `/articles/${article.slug}`,
        title: `${article.title} | Le Cyberassureur`,
        description: article.excerpt,
        image,
        type: 'article',
        staticContent: {
          intro: article.intro,
          sections: article.sections,
          takeaways: article.takeaways,
        },
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
  const resolveRouteHtmlPath = (routePath) =>
    routePath === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, routePath.replace(/^\/+/, ''), 'index.html');

  const lastmodByPath = new Map();
  await Promise.all(
    indexedRoutes.map(async (route) => {
      try {
        const htmlPath = resolveRouteHtmlPath(route.path);
        const routeStat = await stat(htmlPath);
        lastmodByPath.set(route.path, routeStat.mtime.toISOString());
      } catch (_error) {
        lastmodByPath.set(route.path, buildTimestamp);
      }
    }),
  );

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...indexedRoutes.map((route) => {
      return [
        '  <url>',
        `    <loc>${new URL(route.path, `${siteUrl}/`).toString()}</loc>`,
        `    <lastmod>${lastmodByPath.get(route.path) || buildTimestamp}</lastmod>`,
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
