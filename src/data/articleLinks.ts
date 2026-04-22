const articleLinks = [
  { path: '/assurance-cyber-risques', title: 'Pertes financières' },
  { path: '/assurance-cyber-risques', title: "Interruption d'activité" },
  { path: '/assurance-cyber-risques', title: 'Exposition juridique et réglementaire' },
  { path: '/assurance-cyber-risques', title: 'Atteinte à la réputation' },
  { path: '/assurance-cyber-que-couvre', title: 'Pertes financières & perte de revenus' },
  { path: '/assurance-cyber-que-couvre', title: 'Experts en réponse aux incidents' },
  { path: '/assurance-cyber-que-couvre', title: 'Défense juridique & coûts réglementaires' },
  { path: '/assurance-cyber-que-couvre', title: 'Communication de crise & réputation' },
  { path: '/assurance-cyber-que-couvre', title: 'Dommages aux tiers' },
  { path: '/assurance-cyber-tpe', title: 'TPE & Startups' },
  { path: '/assurance-cyber-pme', title: 'PME' },
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
