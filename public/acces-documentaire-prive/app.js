const STORAGE_KEY = "lecyberassureur-pdf-template-v2";

const sampleData = {
  documentKicker: "Presentation commerciale cyber",
  documentType: "Synthese de couverture, eligibilite et accompagnement",
  documentTitle: "Dossier cyber Le Cyberassureur",
  documentSubtitle:
    "Support precharge a partir des fiches produit, argumentaires, conditions d'eligibilite et notices d'information fournis, recompose sous la marque Le Cyberassureur.",
  companyName: "Le Cyberassureur",
  contactName: "Equipe commerciale",
  reference: "LCA-CYBER-2026-001",
  documentDate: "2026-04-14",
  stat1Label: "Intervention",
  stat1Value: "Mise en oeuvre sous 48h",
  stat2Label: "Capacite",
  stat2Value: "Jusqu'a 10 M EUR par sinistre et par an",
  stat3Label: "Point d'entree",
  stat3Value: "A partir de 273 EUR TTC / an",
  summary:
    "Le dossier reprend le positionnement des supports fournis : une assurance cyber dediee vise a proteger l'entreprise contre les consequences financieres, operationnelles et reputationnelles d'un incident informatique. La promesse clef est double : couvrir les dommages propres et ceux causes a des tiers, tout en mobilisant rapidement des experts informatiques, des avocats specialises et des intervenants en communication de crise.",
  argumentsList:
    "Protection de la tresorerie, de la continuite d'activite et de la reputation en cas de cyber-incident\nAccompagnement structure avant, pendant et apres crise avec reseau d'experts mobilisable rapidement\nOffre pertinente pour les TPE, PME et entreprises plus structurees selon le profil de risque\nApproche pedagogique utile pour expliquer pourquoi les garanties traditionnelles ne suffisent pas",
  guaranteesList:
    "Perte d'exploitation, frais supplementaires et couts operationnels lies a l'incident\nFrais d'avocats, enquetes des regulateurs, notifications et communication de crise\nCyber-extorsion, atteinte aux donnees, dommages causes aux tiers et sanctions administratives assurables\nEn option selon le montage retenu : cyber-fraude et certaines surfacturations techniques",
  vigilanceList:
    "La RC Pro, la garantie fraude ou les tous risques informatiques ne couvrent pas a elles seules les consequences d'une cyber-attaque\nLe champ standard exclut certains secteurs ou situations : finance, assurance, reseaux sociaux, jeux en ligne, transport aerien, defense, certains etablissements de sante ou logiciels de controle industriel\nLa qualite des sauvegardes, des mises a jour, du MFA et des acces distants reste determinante avant emission",
  eligibilityList:
    "Ne pas exercer dans les secteurs hors appetit standard : finance, assurance, reseaux sociaux, jeux et paris, transport aerien, defense, utilites ou certains environnements industriels\nDisposer de sauvegardes de tous les systemes et donnees, et appliquer les mises a jour de securite sous 30 jours maximum\nMettre en place l'authentification multifacteur pour les acces admin a distance lorsque le contexte l'exige\nNe pas avoir connaissance d'un evenement, d'une enquete administrative ou d'un sinistre cyber important non resolu",
  documentsList:
    "Questionnaire de souscription et description precise de l'activite de l'entreprise\nChiffre d'affaires total, part realisee en ligne, export Etats-Unis / Canada et organisation capitalistique\nVolume de donnees sensibles detenues, description des sauvegardes et des acces distants\nElements sur les outils de prevention, les mises a jour, la messagerie et les usages cloud",
  actionPlan:
    "1. Qualifier l'activite, les exclusions potentielles et les besoins de couverture.\n2. Verifier le socle de securite : sauvegardes, patch management, MFA, acces distants et volume de donnees.\n3. Calibrer le niveau de garantie, les options de fraude et les plafonds.\n4. Finaliser la collecte documentaire et transmettre le dossier au partenaire assureur.\n5. Completer l'emission avec les ressources de prevention et de sensibilisation adaptees.",
  nextStep:
    "Valider les criteres d'eligibilite, confirmer le perimetre de garantie souhaite et joindre ensuite la documentation reglementaire du partenaire assureur avant emission.",
  privacySummary:
    "Les supports fournis indiquent que les donnees personnelles sont collectees et traitees pour proposer et executer des contrats d'assurance, gerer les reclamations, prevenir la fraude et assurer la gestion operationnelle. Elles sont conservees pendant la duree necessaire au regard des obligations legales et peuvent etre communiquees aux intervenants habilites : courtiers, experts, prestataires, regulateurs, conseillers professionnels et organismes de lutte contre la fraude.",
  privacyRightsList:
    "Droit d'acces aux donnees et droit de rectification\nDroit d'opposition pour motifs legitimes\nDroit a l'effacement et a la portabilite sous certaines conditions\nPossibilite de definir des directives relatives au sort des donnees apres deces\nOpposition aux actions marketing et aux decisions individuelles automatisees",
  claimsProcess:
    "Les notices d'information indiquent qu'une reclamation doit etre adressee au service client du partenaire concerne par courrier, telephone ou email. Un accuse de reception intervient au plus tard sous cinq jours ouvres. Si possible, une reponse est apportee dans ce meme delai ; a defaut, l'objectif annonce est une reponse sous quatre semaines, avec une decision finale au plus tard sous deux mois. En cas de desaccord persistant, une mediation ou la juridiction competente peut etre saisie.",
  advisorName: "Le Cyberassureur",
  advisorEmail: "contact@lecyberassureur.fr",
  advisorPhone: "+33 1 89 71 41 20",
  website: "lecyberassureur.fr",
};

const form = document.getElementById("pdf-form");
const loadSampleButton = document.getElementById("load-sample");
const clearFormButton = document.getElementById("clear-form");
const printButton = document.getElementById("print-pdf");
const resetLogoButton = document.getElementById("reset-logo");
const logoUploadInput = document.getElementById("logo-upload");
const logoCleanupInput = document.getElementById("logo-cleanup");
const logoThresholdInput = document.getElementById("logo-threshold");
const logoThresholdValue = document.getElementById("logo-threshold-value");
const logoSlots = document.querySelectorAll("[data-logo-slot]");
const pdfPages = document.querySelectorAll(".pdf-page");
const DEFAULT_LOGO_SOURCE = "assets/logo-transparent.png";

const logoState = {
  rawDataUrl: "",
};

let fitPagesFrame = 0;

setDefaultLogos();
hydrateForm();
render();
window.addEventListener("resize", schedulePageFit);

form.addEventListener("input", handleFormInput);
form.addEventListener("change", handleFormInput);
loadSampleButton.addEventListener("click", () => {
  populateForm(sampleData);
  saveForm();
  render();
});
clearFormButton.addEventListener("click", () => {
  form.reset();
  logoCleanupInput.checked = true;
  logoThresholdInput.value = "26";
  logoThresholdValue.textContent = "26";
  saveForm();
  render();
});
printButton.addEventListener("click", printPdf);
resetLogoButton.addEventListener("click", () => {
  logoState.rawDataUrl = "";
  logoUploadInput.value = "";
  setDefaultLogos();
});
logoUploadInput.addEventListener("change", handleLogoUpload);
logoCleanupInput.addEventListener("change", updateLogoPreview);
logoThresholdInput.addEventListener("input", () => {
  logoThresholdValue.textContent = logoThresholdInput.value;
  updateLogoPreview();
});

function handleFormInput() {
  saveForm();
  render();
}

function hydrateForm() {
  const saved = loadForm();
  const initialData = Object.keys(saved).length ? { ...sampleData, ...saved } : sampleData;
  populateForm(initialData);
  logoThresholdValue.textContent = logoThresholdInput.value;
}

function populateForm(values) {
  Object.entries(values).forEach(([name, value]) => {
    const field = form.elements.namedItem(name);

    if (!field) {
      return;
    }

    if ("value" in field) {
      field.value = value;
    }
  });
}

function render() {
  const data = getFormData();

  document.querySelectorAll("[data-bind-text]").forEach((node) => {
    const key = node.dataset.bindText;
    node.textContent = safeText(data[key], "—");
  });

  document.querySelectorAll("[data-bind-rich]").forEach((node) => {
    const key = node.dataset.bindRich;
    node.innerHTML = formatRichText(data[key]);
  });

  document.querySelectorAll("[data-bind-list]").forEach((node) => {
    const key = node.dataset.bindList;
    node.innerHTML = buildListMarkup(data[key]);
  });

  schedulePageFit();
}

function getFormData() {
  const data = {};
  const fields = new FormData(form);

  for (const [key, value] of fields.entries()) {
    data[key] = typeof value === "string" ? value.trim() : value;
  }

  data.documentDateFormatted = formatDate(data.documentDate);
  return data;
}

function safeText(value, fallback) {
  return value && value.length ? value : fallback;
}

function formatRichText(value) {
  if (!value || !value.trim()) {
    return "—";
  }

  return escapeHtml(value).replace(/\n/g, "<br>");
}

function buildListMarkup(value) {
  const items = (value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!items.length) {
    return "<li>—</li>";
  }

  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function saveForm() {
  const data = getFormData();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadForm() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setDefaultLogos() {
  applyLogoToSlots(DEFAULT_LOGO_SOURCE);
}

function applyLogoToSlots(dataUrl) {
  if (!dataUrl) {
    logoSlots.forEach((slot) => {
      slot.innerHTML = "";
    });
    schedulePageFit();
    return;
  }

  logoSlots.forEach((slot) => {
    slot.innerHTML = "";
    const image = document.createElement("img");
    image.src = dataUrl;
    image.alt = "Logo";
    image.className = "brand-image";
    slot.appendChild(image);
  });

  schedulePageFit();
}

async function handleLogoUpload(event) {
  const [file] = event.target.files || [];

  if (!file) {
    return;
  }

  logoState.rawDataUrl = await readFileAsDataUrl(file);
  await updateLogoPreview();
}

async function updateLogoPreview() {
  if (!logoState.rawDataUrl) {
    setDefaultLogos();
    return;
  }

  if (!logoCleanupInput.checked) {
    applyLogoToSlots(logoState.rawDataUrl);
    return;
  }

  const processedLogo = await removeDarkBackground(
    logoState.rawDataUrl,
    Number(logoThresholdInput.value || 26),
  );
  applyLogoToSlots(processedLogo);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function removeDarkBackground(dataUrl, threshold) {
  const image = await loadImage(dataUrl);
  const maxDimension = 900;
  const ratio = Math.min(1, maxDimension / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * ratio));
  const height = Math.max(1, Math.round(image.height * ratio));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  const imageData = context.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  // The uploaded visual has a black background. Dark pixels become transparent
  // while slightly brighter pixels are softly faded to keep the glow edges clean.
  for (let index = 0; index < pixels.length; index += 4) {
    const red = pixels[index];
    const green = pixels[index + 1];
    const blue = pixels[index + 2];
    const alpha = pixels[index + 3];
    const brightness = (red + green + blue) / 3;
    const strongestChannel = Math.max(red, green, blue);

    if (alpha === 0) {
      continue;
    }

    if (brightness <= threshold && strongestChannel <= threshold + 14) {
      pixels[index + 3] = 0;
      continue;
    }

    if (brightness < threshold + 26 && strongestChannel < threshold + 38) {
      const fade = (brightness - threshold) / 26;
      pixels[index + 3] = Math.max(0, Math.round(alpha * fade));
    }
  }

  context.putImageData(imageData, 0, 0);
  const trimmedCanvas = trimCanvas(canvas);
  return trimmedCanvas.toDataURL("image/png");
}

function trimCanvas(sourceCanvas) {
  const context = sourceCanvas.getContext("2d", { willReadFrequently: true });
  const { width, height } = sourceCanvas;
  const { data } = context.getImageData(0, 0, width, height);

  let top = height;
  let left = width;
  let right = -1;
  let bottom = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = data[(y * width + x) * 4 + 3];

      if (alpha <= 8) {
        continue;
      }

      top = Math.min(top, y);
      left = Math.min(left, x);
      right = Math.max(right, x);
      bottom = Math.max(bottom, y);
    }
  }

  if (right === -1 || bottom === -1) {
    return sourceCanvas;
  }

  const padding = Math.round(Math.max(width, height) * 0.04);
  const trimmedCanvas = document.createElement("canvas");
  const trimmedWidth = right - left + 1;
  const trimmedHeight = bottom - top + 1;

  trimmedCanvas.width = trimmedWidth + padding * 2;
  trimmedCanvas.height = trimmedHeight + padding * 2;

  trimmedCanvas
    .getContext("2d")
    .drawImage(
      sourceCanvas,
      left,
      top,
      trimmedWidth,
      trimmedHeight,
      padding,
      padding,
      trimmedWidth,
      trimmedHeight,
    );

  return trimmedCanvas;
}

function printPdf() {
  const previousTitle = document.title;
  const nextTitle = buildFileName();

  document.title = nextTitle;
  fitPages();

  const restoreTitle = () => {
    document.title = previousTitle;
    window.removeEventListener("afterprint", restoreTitle);
  };

  window.addEventListener("afterprint", restoreTitle);

  requestAnimationFrame(() => {
    window.print();
  });
}

function schedulePageFit() {
  if (fitPagesFrame) {
    cancelAnimationFrame(fitPagesFrame);
  }

  fitPagesFrame = requestAnimationFrame(() => {
    fitPagesFrame = 0;
    fitPages();
  });
}

function fitPages() {
  pdfPages.forEach((page) => {
    const inner = page.querySelector(".pdf-page__inner");

    if (!inner) {
      return;
    }

    page.style.setProperty("--page-scale", "1");

    if (window.innerWidth <= 760) {
      return;
    }

    const computed = window.getComputedStyle(page);
    const paddingTop = parseFloat(computed.paddingTop || "0");
    const paddingBottom = parseFloat(computed.paddingBottom || "0");
    const availableHeight = page.clientHeight - paddingTop - paddingBottom;
    const contentHeight = inner.scrollHeight;

    if (contentHeight <= availableHeight + 2) {
      return;
    }

    const scale = Math.max(0.92, Math.min(1, (availableHeight - 2) / contentHeight));
    page.style.setProperty("--page-scale", scale.toFixed(3));
  });
}

function buildFileName() {
  const { companyName, documentTitle } = getFormData();
  const base = companyName || documentTitle || "template-cyber";
  const sanitized = base
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return sanitized || "template-cyber";
}

function formatDate(value) {
  if (!value) {
    return "Date a definir";
  }

  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "Date a definir";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}
