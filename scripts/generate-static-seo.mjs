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

function linkifyText(value) {
  const escaped = escapeHtml(value);
  const withExternalLinks = escaped.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noreferrer">$1</a>',
  );

  return withExternalLinks.replace(
    /(^|\s)(\/[a-z0-9\-\/]+)(?=[\s.,;:!?)]|$)/gi,
    (match, prefix, route) => `${prefix}<a href="${route}">${route}</a>`,
  );
}

function renderStaticSections(sections = []) {
  return sections
    .map((section) => {
      const paragraphs = (section.body || [])
        .map((paragraph) => `<p>${linkifyText(paragraph)}</p>`)
        .join('');
      const table = section.table
        ? `<div class="seo-static-table-wrapper"><table class="seo-static-table"><thead><tr>${section.table.headers
            .map((header) => `<th>${escapeHtml(header)}</th>`)
            .join('')}</tr></thead><tbody>${section.table.rows
            .map(
              (row) =>
                `<tr>${row.map((cell) => `<td>${linkifyText(String(cell))}</td>`).join('')}</tr>`,
            )
            .join('')}</tbody></table></div>`
        : '';

      return `<section><h2>${escapeHtml(section.title)}</h2>${paragraphs}${table}</section>`;
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
    '.seo-static-table-wrapper{overflow-x:auto;margin:16px 0 8px}',
    '.seo-static-table{width:100%;border-collapse:collapse;min-width:620px}',
    '.seo-static-table th,.seo-static-table td{border:1px solid #d1d5db;padding:10px 12px;text-align:left;vertical-align:top}',
    '.seo-static-table th{background:#eff6ff}',
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
      staticContent: {
        intro:
          "Page d'accueil dédiée à l'assurance cyber pour TPE et PME, avec un cadrage opérationnel des risques, des garanties et des étapes de devis.",
        sections: [
          {
            title: 'Pourquoi assurer une TPE ou PME contre le risque cyber ?',
            body: [
              "Une petite ou moyenne entreprise dépend souvent de quelques outils clés: messagerie, facturation, ERP, CRM, partage documentaire et accès à distance. Quand l'un de ces outils devient indisponible, l'impact économique est immédiat.",
              "L'assurance cyber permet de protéger la continuité d'activité en couvrant certains coûts d'interruption, d'expertise et de gestion de crise selon le contrat. Elle réduit le risque qu'un incident technique se transforme en choc durable pour la trésorerie.",
              "Le sujet concerne autant les structures de service que les entreprises industrielles, commerciales ou artisanales. Dans chaque cas, la question n'est pas seulement de prévenir l'incident, mais aussi de savoir comment redémarrer vite, qui contacter, quels coûts peuvent être absorbés et quels coûts doivent être transférés.",
              "Une approche utile consiste à relier la couverture à trois enjeux concrets: le maintien de la relation client, la reprise des opérations essentielles et la protection de la trésorerie pendant la période de perturbation. Cette logique évite une sous-couverture qui paraît économique avant sinistre mais devient coûteuse au moment critique.",
            ],
          },
          {
            title: 'Ce que couvre une assurance cyber',
            body: [
              "La couverture peut inclure l'interruption d'activité, des frais d'experts techniques et juridiques, ainsi que des postes complémentaires selon la formule. Les garanties varient selon le contrat, d'où l'importance de lire les exclusions, plafonds et franchises.",
              "Une lecture utile du contrat relie toujours les garanties aux scénarios concrets: compromission de messagerie, rançongiciel, indisponibilité d'outil critique ou fraude selon options.",
              "La qualité d'un contrat se mesure sur la capacité d'activation réelle des garanties: conditions de déclenchement explicites, accompagnement joignable rapidement, articulation claire entre assistance et indemnisation, et transparence sur les limites de prise en charge.",
              "Avant de choisir, il est recommandé de comparer les formules sur un même scénario: arrêt de facturation pendant plusieurs jours, compromission d'un compte de direction, indisponibilité d'un logiciel central ou fuite de données. Cette méthode rend la comparaison plus factuelle que la simple lecture d'un tarif.",
            ],
          },
          {
            title: 'Comment obtenir un devis adapté ?',
            body: [
              "Un devis pertinent repose sur des informations simples: activité, taille, outils critiques, données traitées, niveau de sécurité et besoins de couverture. Ce cadrage permet de comparer les offres sur des bases concrètes.",
              "Ressources internes: /assurance-cyber, /assurance-cyber-prix, /devis-assurance-cyber, /offres.",
              "Le devis permet aussi d'identifier les arbitrages possibles: franchises plus hautes pour réduire la prime, plafonds renforcés sur les postes les plus sensibles, ou options ciblées selon le profil de risque. L'objectif n'est pas de tout couvrir, mais de protéger les zones qui peuvent fragiliser l'entreprise après un incident.",
              "Si votre activité dépend fortement de la disponibilité numérique, comparez toujours les délais et conditions d'intervention prévus au contrat. La rapidité de mobilisation des experts peut avoir autant d'impact que le niveau d'indemnisation sur la continuité opérationnelle.",
            ],
          },
          {
            title: 'Méthode éditoriale et confiance',
            body: [
              "Mis à jour le 8 mai 2026. Rédigé par l'équipe Le Cyberassureur. Le Cyberassureur, marque spécialisée de Prorisk Assurances. Pour l'identité du cabinet et les informations réglementaires, consultez /qui-sommes-nous et /mentions-legales. Numéro ORIAS: se référer aux mentions légales du cabinet.",
              "Sources publiques: https://www.ssi.gouv.fr/, https://www.cybermalveillance.gouv.fr/, https://www.cnil.fr/, https://www.francenum.gouv.fr/.",
            ],
          },
        ],
      },
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
      staticContent: {
        intro:
          "Guide complet pour comprendre le rôle d'une assurance cyber en entreprise, ses garanties, ses limites et les critères de choix adaptés aux TPE/PME.",
        sections: [
          { title: "Qu’est-ce qu’une assurance cyber entreprise ?", body: [
            "Une assurance cyber entreprise couvre les conséquences financières et opérationnelles d'un incident numérique qui perturbe l'activité. Elle intervient quand la prévention ne suffit plus à éviter l'arrêt ou la dégradation des flux métiers.",
            "Son utilité se mesure au moment du sinistre: continuité d'activité, mobilisation d'experts, gestion de crise et protection économique de la trésorerie."
          ]},
          { title: "Que couvre une assurance cyber ?", body: [
            "Selon les contrats, la couverture peut inclure interruption d'activité, frais d'expertise technique, accompagnement juridique et autres garanties complémentaires.",
            "La lecture doit porter sur les conditions d'activation, les plafonds, les franchises et la durée d'indemnisation.",
            "Le dirigeant doit aussi vérifier la cohérence entre garanties et dépendances critiques: facturation, production, relation client, gestion des accès, obligations vis-à-vis de partenaires. Une garantie non alignée avec les flux réels apporte peu de valeur en cas de crise.",
            "La transparence contractuelle est un critère central: quels frais sont pris en charge, à quelles conditions, sur quelle durée, avec quelles limites. Cette lisibilité évite les malentendus lors de la déclaration de sinistre."
          ],
          table: {
            headers: ["Garanties généralement couvertes", "Limites fréquentes ou exclusions"],
            rows: [
              ["Interruption d'activité selon conditions du contrat", "Durée d'indemnisation limitée ou délais de carence"],
              ["Frais d'experts techniques pour analyse et remédiation", "Incidents antérieurs à la souscription non couverts"],
              ["Accompagnement juridique et gestion de crise selon formule", "Non-respect de certaines exigences de sécurité prévues au contrat"],
              ["Assistance à la reprise d'activité", "Plafonds insuffisants face à un incident long"],
            ],
          }},
          { title: "Ce qui est souvent exclu ou limité", body: [
            "Les exclusions fréquentes concernent les incidents antérieurs à la souscription, certains défauts de sécurité prévus au contrat, ou des postes non inclus dans la formule choisie.",
            "Une vérification fine des limites évite les mauvaises surprises au moment de la déclaration."
          ]},
          { title: "Assurance cyber et RC Pro : quelles différences ?", body: [
            "La RC Pro couvre la responsabilité civile professionnelle générale. L'assurance cyber cible les conséquences spécifiques des incidents numériques.",
            "Les deux approches peuvent être complémentaires, mais leurs mécanismes et périmètres sont différents."
          ]},
          { title: "Comment adapter la couverture à une TPE ou PME ?", body: [
            "Une TPE peut prioriser un socle de continuité simple, alors qu'une PME plus digitalisée doit analyser davantage ses dépendances, ses tiers et ses obligations contractuelles.",
            "Liens utiles: /assurance-cyber-tpe, /assurance-cyber-pme, /assurance-cyber-prix, /offres.",
            "Pour une TPE, la priorité est souvent la reprise rapide des opérations clés avec un budget maîtrisé. Pour une PME, il faut ajouter une lecture plus fine des flux inter-équipes, des obligations clients/fournisseurs et des risques liés aux prestataires.",
            "Dans les deux cas, un contrat utile répond à des scénarios concrets définis en amont: arrêt partiel d'activité, indisponibilité d'un logiciel métier, fraude par compromission de compte ou exposition de données."
          ]},
          { title: "Comment demander un devis ?", body: [
            "Préparez activité, taille, outils critiques, données traitées et scénarios de risque pour obtenir un devis cohérent avec l'exposition réelle.",
            "Demande: /devis-assurance-cyber. Références: https://www.ssi.gouv.fr/ et https://www.cybermalveillance.gouv.fr/.",
            "Un dossier bien préparé améliore la qualité de la comparaison entre offres et limite les angles morts. Il faut notamment préciser les outils indispensables au chiffre d'affaires et les conséquences d'un arrêt de quelques jours.",
            "Après réception des propositions, vérifiez poste par poste la cohérence entre prime, franchises, plafonds et exclusions. Cette relecture est essentielle pour sécuriser la décision de souscription."
          ]},
          { title: "Bloc E-E-A-T", body: [
            "Mis à jour le 8 mai 2026. Rédigé par l'équipe Le Cyberassureur. Le Cyberassureur, marque spécialisée de Prorisk Assurances.",
            "Voir /qui-sommes-nous et /mentions-legales. Numéro ORIAS: se référer aux mentions légales du cabinet."
          ]},
        ],
      },
    },
    {
      path: '/assurance-cyber-prix',
    title: 'Prix assurance cyber PME | Le Cyberassureur',
      description:
        "Prix assurance cyber : comprenez les critères de tarif, évitez les garanties inadaptées et demandez un devis cohérent avec votre exposition réelle.",
      keywords:
        'assurance cyber prix pme, prix assurance cyber, tarif assurance cyber entreprise, devis assurance cyber, budget assurance cyber',
      structuredData: [toFaqStructuredData(content.assuranceCyberPriceFaqItems)],
      staticContent: {
        intro:
          "Page de référence pour comprendre le prix d'une assurance cyber, les critères de tarification et les arbitrages utiles pour TPE/PME.",
        sections: [
          { title: "Combien coûte une assurance cyber ?", body: [
            "Il n'existe pas de tarif unique. Le montant dépend du profil de risque, du niveau de garanties choisi et de la structure financière de l'entreprise.",
            "La comparaison doit intégrer plafonds, franchises et mécanismes d'indemnisation."
          ]},
          { title: "Pourquoi les prix varient selon les entreprises ?", body: [
            "Deux entreprises proches en taille peuvent avoir des prix différents selon leur dépendance aux outils numériques, leur secteur et les données traitées.",
            "Le niveau de sécurité de base et les scénarios redoutés influencent également le cadrage."
          ]},
          { title: "Quels critères analysent les assureurs ?", body: [
            "Taille, chiffre d'affaires, activité, dépendance IT, mesures de sécurité, garanties demandées et historique de risques sont des éléments structurants.",
            "Ces critères orientent la profondeur du contrat et la qualité de la proposition."
          ]},
          { title: "Plafond, franchise, garanties : quel impact sur le prix ?", body: [
            "Une franchise plus élevée peut réduire la prime mais augmente le reste à charge. Un plafond trop bas peut limiter la protection en cas de sinistre majeur.",
            "L'équilibre dépend de la capacité d'absorption financière de l'entreprise."
          ]},
          { title: "Facteurs qui influencent le prix", body: [
            "Tableau inclus sur la page: taille, secteur, dépendance numérique, niveau de sécurité, franchises/plafonds, options complémentaires.",
            "Tableau complémentaire: exemples de profils TPE/PME et points d'attention."
          ],
          table: {
            headers: ["Facteur analysé", "Impact possible sur le prix", "Point de vigilance"],
            rows: [
              ["Taille de l'entreprise et chiffre d'affaires", "Le besoin de capacité d'indemnisation peut augmenter", "Vérifier l'adéquation entre plafond et exposition réelle"],
              ["Secteur d'activité", "Certains secteurs sont plus exposés à l'arrêt numérique", "Comparer les exclusions spécifiques au secteur"],
              ["Dépendance aux outils numériques", "Forte dépendance = enjeu continuité plus élevé", "Ne pas sous-estimer le coût d'un arrêt court"],
              ["Niveau de sécurité opérationnelle", "Des mesures solides peuvent stabiliser le risque", "Documenter les pratiques réellement appliquées"],
              ["Franchise et plafonds", "Franchise haute peut réduire la prime", "Évaluer le reste à charge supportable"],
            ],
          }},
          { title: "Comment réduire le coût sans réduire la protection essentielle ?", body: [
            "Priorisez les risques majeurs, améliorez les mesures minimales de sécurité, comparez les garanties sur des scénarios concrets et ajustez les franchises de manière réaliste.",
            "Liens internes: /assurance-cyber, /offres, /devis-assurance-cyber, /assurance-cyber-que-couvre."
          ]},
          { title: "Comment obtenir un tarif adapté ?", body: [
            "Construisez un devis détaillé, relisez les exclusions et validez l'adéquation entre budget et continuité d'activité.",
            "Sources: https://www.cnil.fr/ et https://www.francenum.gouv.fr/.",
            "Le meilleur tarif n'est pas nécessairement le plus bas, mais celui qui conserve les protections essentielles sur les scénarios critiques de votre entreprise. Une économie apparente peut coûter plus cher si les garanties décisives sont absentes.",
            "Avant validation, confrontez le contrat à deux ou trois cas de sinistre plausibles. Cette simulation simple permet de vérifier si le budget et le niveau de couverture restent cohérents."
          ]},
          { title: "Bloc E-E-A-T", body: [
            "Mis à jour le 8 mai 2026. Rédigé par l'équipe Le Cyberassureur. Le Cyberassureur, marque spécialisée de Prorisk Assurances.",
            "Voir /qui-sommes-nous et /mentions-legales. Numéro ORIAS: se référer aux mentions légales du cabinet."
          ]},
        ],
      },
    },
    {
      path: '/devis-assurance-cyber',
    title: 'Devis assurance cyber rapide | Le Cyberassureur',
      description:
        "Devis assurance cyber : décrivez votre activité et vos risques pour obtenir rapidement un cadrage clair, utile et cohérent avec votre niveau d’exposition.",
      keywords:
        'devis assurance cyber, demande devis assurance cyber, devis cyber entreprise, prix assurance cyber devis, formulaire assurance cyber',
      structuredData: [toFaqStructuredData(content.devisAssuranceCyberFaqItems)],
      staticContent: {
        intro:
          "Page conversion pour demander un devis d'assurance cyber en transmettant les informations utiles à une analyse fiable et rapide.",
        sections: [
          { title: "Comment obtenir un devis d’assurance cyber ?", body: [
            "Un devis pertinent commence par un cadrage de l'exposition réelle de l'entreprise: activité, taille, dépendances numériques, données sensibles et priorités de couverture.",
            "La qualité de ces informations accélère l'analyse et améliore la comparaison des offres."
          ]},
          { title: "Quelles informations sont nécessaires ?", body: [
            "Préparez activité, chiffre d'affaires, outils critiques, mesures de sécurité, scénarios redoutés et objectifs de couverture.",
            "Ces données permettent d'évaluer les garanties vraiment utiles et les limites à vérifier."
          ]},
          { title: "Informations utiles pour préparer un devis", body: [
            "Tableau inclus: informations à préparer et utilité de chaque élément pour qualifier le risque.",
            "L'objectif est d'éviter les propositions génériques et de réduire les écarts de compréhension."
          ],
          table: {
            headers: ["Information à préparer", "Pourquoi c'est utile", "Exemple concret"],
            rows: [
              ["Activité et organisation", "Comprendre les flux métiers critiques", "Entreprise de service dépendante à la messagerie et au CRM"],
              ["Taille et chiffre d'affaires", "Évaluer les besoins de plafonds", "PME multi-sites avec processus de facturation quotidien"],
              ["Outils et dépendances numériques", "Identifier les points de rupture", "ERP et logiciel de caisse indispensables à l'encaissement"],
              ["Mesures de sécurité en place", "Qualifier le niveau de maturité", "Sauvegardes, MFA, gestion des accès administrateurs"],
              ["Scénarios redoutés", "Cadrer les garanties prioritaires", "Rançongiciel bloquant la production pendant 3 jours"],
            ],
          }},
          { title: "Quels critères influencent le prix ?", body: [
            "Les critères principaux sont la dépendance aux outils numériques, les données traitées, les garanties retenues, les plafonds et franchises, ainsi que le niveau de sécurité.",
            "Voir aussi /assurance-cyber-prix."
          ]},
          { title: "Pourquoi comparer les garanties et franchises ?", body: [
            "Deux offres au prix proche peuvent produire des protections très différentes selon les exclusions et les mécanismes d'indemnisation.",
            "Comparer uniquement la prime annuelle peut conduire à une sous-protection."
          ]},
          { title: "Que se passe-t-il après la demande ?", body: [
            "Après qualification, une proposition est construite avec des arbitrages de couverture adaptés au profil de risque.",
            "Cette étape sert à valider cohérence budgétaire et lisibilité contractuelle avant souscription.",
            "Le rôle du courtier consiste à expliciter les différences entre formules: franchises, plafonds, exclusions et conditions de déclenchement. Cette pédagogie réduit le risque de choisir un contrat uniquement sur le prix.",
            "Lorsque plusieurs offres sont disponibles, une comparaison scénario par scénario facilite la décision: continuité d'activité, prise en charge des frais techniques, appui juridique et niveau d'accompagnement pendant la crise."
          ]},
          { title: "Quand demander un devis ?", body: [
            "Avant une croissance, un changement d'outil critique, une exigence client ou une externalisation majeure. Anticiper réduit le risque d'angles morts.",
            "Source utile: https://www.cybermalveillance.gouv.fr/. Liens internes: /offres, /assurance-cyber, /assurance-cyber-pme.",
            "Il est aussi pertinent de demander un devis avant un renouvellement de contrat, une évolution du modèle économique ou l'ouverture de nouveaux accès distants. Ces changements modifient souvent l'exposition réelle.",
            "Demander tôt permet de comparer calmement les options et d'ajuster la couverture sans pression opérationnelle."
          ]},
          { title: "Bloc E-E-A-T", body: [
            "Mis à jour le 8 mai 2026. Rédigé par l'équipe Le Cyberassureur. Le Cyberassureur, marque spécialisée de Prorisk Assurances.",
            "Voir /qui-sommes-nous et /mentions-legales. Numéro ORIAS: se référer aux mentions légales du cabinet."
          ]},
        ],
      },
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
      staticContent: {
        intro:
          "Page dédiée aux besoins spécifiques des PME: exposition opérationnelle, risques majeurs, garanties pertinentes et méthode de choix.",
        sections: [
          { title: "Pourquoi les PME ont besoin d’une assurance cyber ?", body: [
            "Les PME cumulent outils métiers, données clients, flux de facturation et dépendances prestataires. Un incident cyber peut donc impacter rapidement la continuité d'activité et la trésorerie.",
            "La couverture cyber aide à absorber ces conséquences et à structurer la reprise."
          ]},
          { title: "Quels risques cyber touchent les PME ?", body: [
            "Compromission de messagerie, rançongiciel, indisponibilité d'ERP, fraude et exposition de données figurent parmi les scénarios fréquents.",
            "Ces risques créent des coûts techniques, commerciaux et parfois juridiques."
          ]},
          { title: "Quelles garanties privilégier ?", body: [
            "Interruption d'activité, frais d'expertise, réponse de crise, responsabilités liées aux données et options complémentaires selon profil.",
            "Les garanties doivent être reliées à des cas d'usage concrets."
          ]},
          { title: "Combien peut coûter une interruption d’activité ?", body: [
            "Le coût dépend de la durée d'arrêt, du poids des outils critiques et des flux d'encaissement interrompus.",
            "Même une interruption courte peut déstabiliser une PME avec trésorerie tendue."
          ]},
          { title: "Comment préparer son dossier ?", body: [
            "Rassembler informations d'activité, dépendances numériques, mesures de sécurité et scénarios redoutés améliore la qualité du devis.",
            "Liens internes: /assurance-cyber-risques, /assurance-cyber-prix, /devis-assurance-cyber."
          ]},
          { title: "Comment choisir une couverture adaptée ?", body: [
            "Comparer garanties, exclusions, plafonds et franchises sur des scénarios PME réels. Éviter le choix uniquement par prix.",
            "Exemples de sinistres PME: fraude via messagerie compromise, arrêt de facturation après incident ERP.",
            "Une décision robuste inclut une revue des obligations clients et fournisseurs, notamment lorsque des clauses de sécurité ou de continuité sont prévues dans les contrats commerciaux.",
            "Pour renforcer votre analyse, comparez aussi /assurance-cyber, /offres, /assurance-cyber-que-couvre et /devis-assurance-cyber avant arbitrage final."
          ]},
          { title: "Bloc E-E-A-T", body: [
            "Mis à jour le 8 mai 2026. Rédigé par l'équipe Le Cyberassureur. Le Cyberassureur, marque spécialisée de Prorisk Assurances.",
            "Voir /qui-sommes-nous et /mentions-legales. Numéro ORIAS: se référer aux mentions légales du cabinet. Sources: https://www.ssi.gouv.fr/ et https://www.francenum.gouv.fr/."
          ]},
        ],
      },
    },
    {
      path: '/assurance-cyber-tpe',
    title: 'Assurance cyber TPE | Le Cyberassureur',
      description:
        "Assurance cyber TPE : garanties utiles, limites à connaître et devis clair pour protéger trésorerie, activité et données de votre petite entreprise.",
      keywords:
        'assurance cyber tpe, assurance cyber petite entreprise, devis assurance cyber tpe, cyber risque tpe, assurance cyber startup',
      structuredData: [toFaqStructuredData(content.assuranceCyberTpeFaqItems)],
      staticContent: {
        intro:
          "Page pédagogique pour expliquer aux TPE les risques cyber concrets, les garanties prioritaires et la façon d'obtenir une couverture simple.",
        sections: [
          { title: "Une TPE est-elle vraiment exposée au risque cyber ?", body: [
            "Oui. Une petite structure peut être fortement dépendante à la messagerie, à la facturation et au cloud, avec peu de ressources internes pour absorber un incident.",
            "Le risque n'est pas la taille technique mais l'impact économique d'un arrêt."
          ]},
          { title: "Que couvre une assurance cyber pour TPE ?", body: [
            "Interruption d'activité, frais d'experts, remise en état et autres garanties selon formule.",
            "Le contrat doit rester lisible et adapté à la réalité opérationnelle de la TPE."
          ]},
          { title: "Quelles garanties sont prioritaires avec un petit budget ?", body: [
            "Prioriser la continuité d'activité, l'accès rapide à des experts et des franchises supportables.",
            "Comparer le socle essentiel avant d'ajouter des options."
          ]},
          { title: "Quel prix prévoir ?", body: [
            "Le prix dépend de l'activité, de la dépendance numérique et du niveau de garanties. Un devis bien cadré évite les écarts entre budget et protection réelle.",
            "Voir /assurance-cyber-prix."
          ]},
          { title: "Comment obtenir une couverture simple ?", body: [
            "Préparer un dossier court mais précis: outils critiques, données, mesures de sécurité, scénarios redoutés.",
            "Liens internes: /devis-assurance-cyber, /offres, /assurance-cyber."
          ]},
          { title: "Pourquoi ne pas attendre un incident ?", body: [
            "La couverture doit être active avant l'événement. Anticiper permet de protéger la trésorerie et de réduire le temps de crise.",
            "Exemples TPE: faux virement après compromission email, outil de facturation indisponible plusieurs jours."
          ]},
          { title: "Bloc E-E-A-T", body: [
            "Mis à jour le 8 mai 2026. Rédigé par l'équipe Le Cyberassureur. Le Cyberassureur, marque spécialisée de Prorisk Assurances.",
            "Voir /qui-sommes-nous et /mentions-legales. Numéro ORIAS: se référer aux mentions légales du cabinet. Source: https://www.cybermalveillance.gouv.fr/."
          ]},
        ],
      },
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
