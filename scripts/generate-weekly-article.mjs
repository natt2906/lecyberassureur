import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const poolPath = path.join(projectRoot, 'scripts', 'article-image-pool.json');
const usedPath = path.join(projectRoot, 'scripts', 'used-article-images.json');
const articlesPath = path.join(projectRoot, 'src', 'data', 'articles.ts');
const publicArticlesDir = path.join(projectRoot, 'public', 'articles');

const NVIDIA_CHAT_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL = process.env.NVIDIA_ARTICLE_MODEL || 'mistralai/mistral-medium-3.5-128b';
const SITE_URL = (process.env.VITE_SITE_URL || 'https://lecyberassureur.fr').replace(/\/+$/, '');
const DRY_RUN = process.argv.includes('--dry-run') || process.env.ARTICLE_GENERATOR_DRY_RUN === '1';

const categories = new Set(['Impact', 'Couverture', 'Cible', 'Expertise']);

function normalizeApiKey(value) {
  return (value || '')
    .trim()
    .replace(/^Bearer\s+/i, '')
    .replace(/^['"]|['"]$/g, '')
    .replace(/\s+/g, '');
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return fallback;
    }
    throw error;
  }
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function publicFilePath(src) {
  return path.join(projectRoot, 'public', src.replace(/^\/+/, ''));
}

function slugify(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

function extractExistingSlugs(source) {
  return new Set([...source.matchAll(/["']?slug["']?\s*:\s*['"`]([^'"`]+)['"`]/g)].map((match) => match[1]));
}

function createUniqueSlug(baseSlug, existingSlugs) {
  const base = slugify(baseSlug) || `article-${Date.now()}`;
  let slug = base;
  let index = 2;
  while (existingSlugs.has(slug)) {
    slug = `${base}-${index}`;
    index += 1;
  }
  return slug;
}

function formatFrenchDate(date = new Date()) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Paris',
  }).format(date);
}

function wordCount(article) {
  const parts = [
    article.title,
    article.excerpt,
    article.intro,
    ...(article.sections || []).flatMap((section) => [section.title, ...(section.body || [])]),
    ...(article.takeaways || []),
  ];

  return parts.join(' ').split(/\s+/).filter(Boolean).length;
}

function estimateReadTime(article) {
  return `${Math.max(4, Math.round(wordCount(article) / 180))} min`;
}

function extractJsonObject(text) {
  const withoutFence = text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    return JSON.parse(withoutFence);
  } catch {
    const start = withoutFence.indexOf('{');
    const end = withoutFence.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) {
      throw new Error('La reponse NVIDIA ne contient pas de JSON exploitable.');
    }
    return JSON.parse(withoutFence.slice(start, end + 1));
  }
}

function assertString(value, field) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Champ article invalide: ${field}`);
  }
  return value.trim();
}

function normalizeArticle(rawArticle, imageEntry, existingSlugs) {
  const sections = Array.isArray(rawArticle.sections)
    ? rawArticle.sections.map((section, sectionIndex) => ({
        title: assertString(section?.title, `sections[${sectionIndex}].title`),
        body: Array.isArray(section?.body)
          ? section.body.map((paragraph, paragraphIndex) =>
              assertString(paragraph, `sections[${sectionIndex}].body[${paragraphIndex}]`),
            )
          : [],
      }))
    : [];

  if (sections.length < 3 || sections.some((section) => section.body.length < 2)) {
    throw new Error('Article trop court: au moins 3 sections avec 2 paragraphes chacune sont attendues.');
  }

  const takeaways = Array.isArray(rawArticle.takeaways)
    ? rawArticle.takeaways.map((item, index) => assertString(item, `takeaways[${index}]`)).slice(0, 5)
    : [];

  if (takeaways.length < 3) {
    throw new Error('Article invalide: au moins 3 points cles sont attendus.');
  }

  const title = assertString(rawArticle.title, 'title');
  const slug = createUniqueSlug(rawArticle.slug || title, existingSlugs);
  const category = categories.has(rawArticle.category) ? rawArticle.category : imageEntry.category;

  const article = {
    slug,
    title,
    category,
    image: {
      alt: imageEntry.alt,
      src: imageEntry.image,
      filter: 'brightness(1.18) contrast(1.04) saturate(1.06)',
      overlayOpacity: 0.08,
    },
    readTime: typeof rawArticle.readTime === 'string' && rawArticle.readTime.trim()
      ? rawArticle.readTime.trim()
      : '5 min',
    updatedAt: formatFrenchDate(),
    excerpt: assertString(rawArticle.excerpt, 'excerpt'),
    intro: assertString(rawArticle.intro, 'intro'),
    sections,
    takeaways,
  };

  article.readTime = estimateReadTime(article);
  return article;
}

function buildPrompt(imageEntry) {
  return `Genere un article pour Le Cyberassureur, marque de Prorisk Assurances specialisee en assurance cyber pour TPE, PME et professionnels.

Contexte du visuel:
- Theme image: ${imageEntry.theme}
- Angle editorial: ${imageEntry.angle}
- Categorie souhaitee: ${imageEntry.category}
- Mots cles: ${(imageEntry.keywords || []).join(', ')}
- Alt image: ${imageEntry.alt}

Contraintes editoriales:
- Langue: francais.
- Ton: clair, professionnel, concret, rassurant.
- Cible: dirigeants de TPE/PME, responsables administratifs, dirigeants commerciaux.
- Ne donne pas de conseil juridique definitif.
- Ne promets pas une indemnisation automatique.
- Explique toujours que garanties, franchises, plafonds et exclusions dependent du contrat.
- Integre naturellement l'assurance cyber, la demande de devis, et les liens internes utiles sous forme de texte si pertinent: /assurance-cyber, /offres, /devis-assurance-cyber, /assurance-cyber-prix.
- Longueur: 650 a 950 mots environ.
- Structure: 4 a 6 sections, chaque section avec 2 a 3 paragraphes.

Retourne uniquement un objet JSON valide, sans markdown, sans commentaire, avec exactement cette forme:
{
  "slug": "slug-url-en-minuscules-sans-accents",
  "title": "Titre court",
  "category": "Impact | Couverture | Cible | Expertise",
  "readTime": "5 min",
  "excerpt": "Meta description de 145 a 165 caracteres environ",
  "intro": "Introduction de 2 phrases",
  "sections": [
    { "title": "Titre section", "body": ["Paragraphe", "Paragraphe"] }
  ],
  "takeaways": ["Point cle", "Point cle", "Point cle"]
}`;
}

async function callNvidia(imageEntry) {
  const apiKey = normalizeApiKey(process.env.NVIDIA_API_KEY);
  if (!apiKey) {
    throw new Error('NVIDIA_API_KEY manquant. Ajoute ce secret dans GitHub/Vercel ou dans ton environnement local.');
  }

  const response = await fetch(NVIDIA_CHAT_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'LeCyberAssureur-ArticleGenerator/1.0 (+https://lecyberassureur.fr)',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content:
            'Tu es un redacteur SEO francophone specialise en cyberassurance B2B. Tu retournes uniquement du JSON valide.',
        },
        { role: 'user', content: buildPrompt(imageEntry) },
      ],
      max_tokens: 3800,
      temperature: 0.65,
      top_p: 1,
      stream: false,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`NVIDIA a refuse la requete (${response.status}): ${body.slice(0, 600)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('Reponse NVIDIA vide.');
  }
  return extractJsonObject(content);
}

function articleToTsObject(article) {
  return JSON.stringify(article, null, 2).replace(/^/gm, '  ');
}

function createMarkdownMirror(article) {
  const url = `${SITE_URL}/articles/${article.slug}`;
  const body = [
    `title: ${article.title} | Le Cyberassureur`,
    `description: ${article.excerpt}`,
    `url: ${url}`,
    `last_updated: ${new Date().toISOString()}`,
    '',
    `# ${article.title}`,
    '',
    `![${article.image.alt}](${article.image.src})`,
    '',
    article.intro,
    '',
    article.excerpt,
    '',
    ...article.sections.flatMap((section) => [
      `## ${section.title}`,
      '',
      ...section.body.flatMap((paragraph) => [paragraph, '']),
    ]),
    '## Points cles',
    '',
    ...article.takeaways.map((item) => `- ${item}`),
    '',
    '## Sources utiles et pages liees',
    '',
    'References externes: ANSSI, Cybermalveillance.gouv.fr, CNIL.',
    '',
    'Continuer: /assurance-cyber, /offres, /devis-assurance-cyber.',
    '',
  ];

  return `${body.join('\n').replace(/\n{3,}/g, '\n\n')}\n`;
}

async function appendArticle(article) {
  const source = await readFile(articlesPath, 'utf8');
  const marker = '\n];\n\nexport const articleRedirects';
  if (!source.includes(marker)) {
    throw new Error('Impossible de trouver la fin du tableau articles.');
  }
  const nextSource = source.replace(marker, `\n${articleToTsObject(article)},${marker}`);
  await writeFile(articlesPath, nextSource, 'utf8');
}

async function writeMarkdownMirror(article) {
  const targetDir = path.join(publicArticlesDir, article.slug);
  await mkdir(targetDir, { recursive: true });
  await writeFile(path.join(targetDir, 'index.md'), createMarkdownMirror(article), 'utf8');
}

async function main() {
  const pool = await readJson(poolPath, []);
  const used = await readJson(usedPath, []);
  const usedIds = new Set(used.map((item) => (typeof item === 'string' ? item : item.id)));
  const requestedId = process.argv.find((arg) => arg.startsWith('--image-id='))?.split('=')[1];

  const candidates = requestedId
    ? pool.filter((entry) => entry.id === requestedId)
    : pool.filter((entry) => !usedIds.has(entry.id));

  if (!candidates.length) {
    console.log(requestedId ? `Aucune image trouvee pour ${requestedId}.` : 'Toutes les images du pool ont deja ete utilisees.');
    return;
  }

  let imageEntry = null;
  for (const candidate of candidates) {
    const candidatePath = publicFilePath(candidate.image);
    if (await fileExists(candidatePath)) {
      imageEntry = candidate;
      break;
    }
    console.log(`Image absente, passage a la suivante: ${candidate.image}`);
  }

  if (!imageEntry) {
    console.log('Aucune image disponible physiquement dans public/article-image-pool. Aucun article genere.');
    return;
  }

  const articlesSource = await readFile(articlesPath, 'utf8');
  const existingSlugs = extractExistingSlugs(articlesSource);

  if (DRY_RUN && !normalizeApiKey(process.env.NVIDIA_API_KEY)) {
    console.log(
      JSON.stringify(
        {
          image: imageEntry,
          note: 'NVIDIA_API_KEY absent: le dry-run confirme le choix de l image sans appeler NVIDIA.',
        },
        null,
        2,
      ),
    );
    return;
  }

  const rawArticle = await callNvidia(imageEntry);
  const article = normalizeArticle(rawArticle, imageEntry, existingSlugs);

  if (DRY_RUN) {
    console.log(JSON.stringify({ image: imageEntry, article }, null, 2));
    return;
  }

  await appendArticle(article);
  await writeMarkdownMirror(article);
  used.push({
    id: imageEntry.id,
    image: imageEntry.image,
    slug: article.slug,
    title: article.title,
    usedAt: new Date().toISOString(),
  });
  await writeFile(usedPath, `${JSON.stringify(used, null, 2)}\n`, 'utf8');

  console.log(`Article genere: /articles/${article.slug}`);
  console.log(`Image utilisee: ${imageEntry.image}`);
}

await main();
