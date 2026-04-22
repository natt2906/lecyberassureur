const articleLinks = [
  { path: '/articles/pertes-financieres-cyberattaque', title: 'Pertes financières' },
  { path: '/articles/interruption-activite-cyber', title: "Interruption d'activité" },
  { path: '/articles/exposition-juridique-et-reglementaire', title: 'Exposition juridique et réglementaire' },
  { path: '/articles/atteinte-a-la-reputation-apres-incident', title: 'Atteinte à la réputation' },
  { path: '/articles/pertes-financieres-et-perte-de-revenus', title: 'Pertes financières & perte de revenus' },
  { path: '/articles/experts-en-reponse-aux-incidents', title: 'Experts en réponse aux incidents' },
  { path: '/articles/defense-juridique-et-couts-reglementaires', title: 'Défense juridique & coûts réglementaires' },
  { path: '/articles/communication-de-crise-et-reputation', title: 'Communication de crise & réputation' },
  { path: '/articles/dommages-aux-tiers-en-cyberassurance', title: 'Dommages aux tiers' },
  { path: '/articles/cyberassurance-pour-tpe-et-startups', title: 'TPE & Startups' },
  { path: '/articles/cyberassurance-pour-pme', title: 'PME' },
  { path: '/articles/cyberassurance-pour-eti-et-grandes-entreprises', title: 'ETI & Grandes entreprises' },
  { path: '/articles/pourquoi-un-specialiste-de-lassurance-cyber', title: "Spécialiste de l'assurance cyber" },
  { path: '/articles/assistance-humaine-24-7', title: 'Assistance humaine 24/7' },
  { path: '/articles/reseau-dexperts-cyber', title: "Réseau d'experts" },
  { path: '/articles/activation-rapide-apres-incident', title: 'Activation rapide' },
  { path: '/articles/continuite-dactivite-et-cyberassurance', title: "Priorité à la continuité d'activité" },
] as const;

export function getArticleLinkByTitle(title: string) {
  return articleLinks.find((article) => article.title === title);
}
