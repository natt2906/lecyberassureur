const articleLinks = [
  { slug: 'pertes-financieres-cyberattaque', title: 'Pertes financières' },
  { slug: 'interruption-activite-cyber', title: "Interruption d'activité" },
  { slug: 'exposition-juridique-et-reglementaire', title: 'Exposition juridique et réglementaire' },
  { slug: 'atteinte-a-la-reputation-apres-incident', title: 'Atteinte à la réputation' },
  { slug: 'pertes-financieres-et-perte-de-revenus', title: 'Pertes financières & perte de revenus' },
  { slug: 'experts-en-reponse-aux-incidents', title: 'Experts en réponse aux incidents' },
  { slug: 'defense-juridique-et-couts-reglementaires', title: 'Défense juridique & coûts réglementaires' },
  { slug: 'communication-de-crise-et-reputation', title: 'Communication de crise & réputation' },
  { slug: 'dommages-aux-tiers-en-cyberassurance', title: 'Dommages aux tiers' },
  { slug: 'cyberassurance-pour-tpe-et-startups', title: 'TPE & Startups' },
  { slug: 'cyberassurance-pour-pme', title: 'PME' },
  { slug: 'cyberassurance-pour-eti-et-grandes-entreprises', title: 'ETI & Grandes entreprises' },
  { slug: 'specialiste-de-lassurance-cyber', title: "Spécialiste de l'assurance cyber" },
  { slug: 'assistance-humaine-24-7', title: 'Assistance humaine 24/7' },
  { slug: 'reseau-dexperts-cyber', title: "Réseau d'experts" },
  { slug: 'activation-rapide-apres-incident', title: 'Activation rapide' },
  { slug: 'continuite-dactivite-et-cyberassurance', title: "Priorité à la continuité d'activité" },
] as const;

export function getArticleLinkByTitle(title: string) {
  return articleLinks.find((article) => article.title === title);
}
