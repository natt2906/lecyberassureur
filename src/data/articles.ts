import { cardImages, type CardImageConfig, type CardIllustrationVariant } from './cardImages';

export type ArticleSection = {
  title: string;
  body: string[];
};

export type Article = {
  slug: string;
  title: string;
  category: 'Impact' | 'Couverture' | 'Cible' | 'Expertise';
  variant?: CardIllustrationVariant;
  image?: CardImageConfig;
  readTime: string;
  updatedAt?: string;
  excerpt: string;
  intro: string;
  sections: ArticleSection[];
  takeaways: string[];
};

export const articles: Article[] = [
  {
    slug: 'pertes-financieres-cyberattaque',
    title: 'Pertes financières',
    category: 'Impact',
    variant: 'finance-impact',
    readTime: '9 min',
    excerpt:
      "Pertes financières cyberattaque: coûts d’urgence, trésorerie sous tension, retards d’encaissement et points de couverture pour protéger l’activité.",
    intro:
      "Pour une entreprise, le choc cyber se lit d'abord dans les comptes. Même un incident de taille moyenne peut générer des coûts d'urgence, retarder les encaissements et désorganiser toute la chaîne opérationnelle.",
    sections: [
      {
        title: 'Les premiers coûts arrivent très vite',
        body: [
          "Dès les premières heures, l'entreprise peut devoir mobiliser un prestataire, isoler ses postes, rétablir des accès ou suspendre certains flux. Ces décisions ont un coût immédiat, souvent avant même de comprendre l'origine exacte du problème.",
          "À cela s'ajoutent les heures internes perdues, les arbitrages de priorité, les délais commerciaux et parfois le recours à des solutions provisoires plus coûteuses que le fonctionnement normal.",
          "Dans les TPE et PME, cette phase peut aussi geler la direction: on suspend des décisions commerciales, on reporte des signatures et on mobilise des équipes non prévues pour la crise. Ces heures ne sont pas toujours comptabilisées, mais elles pèsent lourd dans le coût final.",
        ],
      },
      {
        title: 'Le vrai risque est la désorganisation financière',
        body: [
          "Quand la trésorerie est déjà tendue, une cyberattaque agit comme un accélérateur de fragilité. Les paiements clients peuvent être bloqués, la facturation retardée ou les équipes comptables paralysées par l'indisponibilité des outils.",
          "Le sujet n'est donc pas seulement le montant du sinistre, mais la capacité de l'entreprise à absorber plusieurs semaines de friction financière sans dégrader son activité.",
          "Ce point est souvent sous-estimé lors de la souscription. Beaucoup d'entreprises évaluent le coût de remise en état IT mais oublient la perte de marge pendant la reprise et le délai de retour au rythme normal.",
        ],
      },
      {
        title: 'Exemples concrets de sinistres qui dégradent la trésorerie',
        body: [
          "Compromission de messagerie avec fraude au changement de RIB: des paiements partent vers un compte frauduleux, puis il faut financer des investigations et gérer les impacts clients.",
          "Rançongiciel sur un serveur de production: l'entreprise redémarre lentement, facture moins pendant plusieurs semaines et supporte des coûts de restauration non prévus.",
          "Indisponibilité d'un outil clé de gestion: retards de livraison, litiges commerciaux et allongement du cycle d'encaissement.",
        ],
      },
      {
        title: 'Ce qu’il faut vérifier dans le contrat cyber',
        body: [
          "Vérifiez les mécanismes d'indemnisation des pertes d'exploitation, les plafonds, les franchises et la durée de couverture pendant la période de reprise.",
          "Examinez aussi les exclusions fréquentes: négligence grave, préexistence de l'incident, défaut de mesures minimales de sécurité, ou périmètre technique insuffisant.",
          "Le bon contrat est celui qui protège à la fois les dépenses d'urgence et la dynamique de trésorerie pendant la reprise.",
        ],
      },
    ],
    takeaways: [
      "Le coût cyber commence avant même le diagnostic complet.",
      "Les tensions de trésorerie sont souvent sous-estimées.",
      "La couverture doit protéger le bilan autant que l'outil informatique.",
    ],
  },
  {
    slug: 'interruption-activite-cyber',
    title: "Interruption d'activité",
    category: 'Impact',
    variant: 'downtime-impact',
    readTime: '9 min',
    excerpt:
      "L'arrêt partiel ou total d'un système d'information coupe rapidement la production, le service client et la facturation.",
    intro:
      "Une entreprise numérique n'a pas besoin d'être un acteur purement tech pour être dépendante à ses systèmes. Un blocage de messagerie, d'ERP, de caisse ou d'accès distant peut suffire à interrompre l'activité réelle.",
    sections: [
      {
        title: 'Un arrêt informatique devient vite un arrêt opérationnel',
        body: [
          "Quand les outils métiers tombent, les conséquences dépassent très vite le service informatique. Les commandes ne partent plus, les équipes ne travaillent plus correctement et les flux internes se dégradent en cascade.",
          "Même quand l'entreprise continue officiellement de fonctionner, la qualité de service et la capacité de production peuvent chuter assez fortement pour créer une perte économique tangible.",
          "Dans une PME industrielle, de services ou de négoce, quelques briques indisponibles suffisent à casser les flux: planification, relation client, devis, facturation et support.",
        ],
      },
      {
        title: 'La reprise est souvent plus longue que prévu',
        body: [
          "Le retour à la normale n'est pas instantané. Il faut parfois restaurer, contrôler, reconfigurer, communiquer et tester avant de reprendre un rythme acceptable. Cette phase de reprise pèse souvent autant que l'arrêt initial.",
          "C'est précisément là que la continuité d'activité et la protection des pertes d'exploitation deviennent des sujets majeurs dans l'assurance cyber.",
          "La reprise opérationnelle n'est pas binaire. Les entreprises passent souvent par un mode dégradé avant un retour complet, ce qui prolonge la perte de productivité.",
        ],
      },
      {
        title: "Quels scénarios d'interruption touchent le plus les TPE/PME ?",
        body: [
          "Compte administrateur compromis empêchant l'accès à la messagerie et aux outils cloud.",
          "Blocage de l'ERP ou du logiciel métier pendant plusieurs jours.",
          "Incident chez un prestataire IT ou SaaS critique qui empêche la facturation et la gestion commerciale.",
        ],
      },
      {
        title: "Comment limiter l'impact business avant et après incident ?",
        body: [
          "Avant incident: définir les fonctions critiques, tester les sauvegardes, documenter un plan de reprise et les contacts d'urgence.",
          "Après incident: déclarer vite, prioriser les flux économiques essentiels, informer clients/fournisseurs de façon structurée et documenter les pertes.",
          "Côté assurance: vérifier la période d'indemnisation, les conditions de déclenchement et le traitement des coûts de remise en route.",
        ],
      },
    ],
    takeaways: [
      "Le risque cyber est aussi un risque d'arrêt d'activité.",
      "La reprise coûte du temps, pas seulement de l'argent.",
      "Une bonne couverture doit intégrer l'impact opérationnel complet.",
    ],
  },
  {
    slug: 'exposition-juridique-et-reglementaire',
    title: 'Exposition juridique et réglementaire',
    category: 'Impact',
    variant: 'legal-impact',
    readTime: '4 min',
    excerpt:
      "Une violation de données peut déclencher des obligations de notification, des frais juridiques et une exposition réglementaire significative.",
    intro:
      "Dès qu'un incident touche des données personnelles, des données clients ou des informations sensibles, l'entreprise n'affronte plus seulement un problème technique. Elle entre aussi dans un cadre juridique et réglementaire qui exige méthode, traçabilité et rapidité.",
    sections: [
      {
        title: 'Le risque réglementaire commence avec l’analyse des faits',
        body: [
          "Avant même toute sanction, il faut qualifier l'incident, comprendre quelles données ont été exposées et déterminer les obligations de notification éventuelles. Cela demande souvent un accompagnement juridique et technique coordonné.",
          "Un défaut d'analyse, une déclaration tardive ou une communication imprécise peuvent aggraver la situation et exposer davantage l'entreprise.",
        ],
      },
      {
        title: 'La conformité coûte du temps et des ressources',
        body: [
          "Préparer les éléments, dialoguer avec les parties prenantes, documenter la chronologie et répondre aux demandes représente une charge réelle. Pour une PME ou une ETI, cette charge peut détourner les équipes clés pendant plusieurs jours.",
          "L'intérêt d'une assurance cyber est aussi d'encadrer cette séquence avec des experts, au lieu de la subir en improvisation.",
        ],
      },
    ],
    takeaways: [
      "Un incident cyber peut devenir un dossier juridique en quelques heures.",
      "La notification et la conformité mobilisent fortement l'entreprise.",
      "Le pilotage juridique fait partie de la réponse au sinistre.",
    ],
  },
  {
    slug: 'atteinte-a-la-reputation-apres-incident',
    title: 'Atteinte à la réputation',
    category: 'Impact',
    variant: 'reputation-impact',
    readTime: '4 min',
    excerpt:
      "La confiance des clients, partenaires et prospects peut être durablement fragilisée après une cyberattaque mal gérée.",
    intro:
      "Le préjudice réputationnel ne vient pas seulement de l'attaque elle-même. Il dépend surtout de la manière dont l'entreprise informe, répond et rassure au moment critique.",
    sections: [
      {
        title: 'Le silence ou l’improvisation coûtent cher',
        body: [
          "Quand le message est confus, tardif ou contradictoire, les clients interprètent l'incident comme un manque de maîtrise. La crise change alors de nature : elle devient commerciale et réputationnelle.",
          "À l'inverse, une communication cadrée, factuelle et rapide peut réduire fortement la perte de confiance.",
        ],
      },
      {
        title: 'La réputation se reconstruit après la remédiation',
        body: [
          "Même une fois les systèmes rétablis, il faut encore rassurer les clients, les partenaires et parfois les collaborateurs. Le retour à la normale passe aussi par la relation et par la preuve que l'entreprise a repris le contrôle.",
          "Cette phase demande souvent des arbitrages entre communication externe, support client et image de marque.",
        ],
      },
    ],
    takeaways: [
      "La gestion de crise influence directement la perception du marché.",
      "La communication est une composante du sinistre.",
      "La réputation peut rester affectée au-delà de la remise en état technique.",
    ],
  },
  {
    slug: 'pertes-financieres-et-perte-de-revenus',
    title: 'Pertes financières & perte de revenus',
    category: 'Couverture',
    variant: 'revenue-cover',
    readTime: '4 min',
    excerpt:
      "La couverture cyber vise à protéger les dépenses imprévues mais aussi les revenus non réalisés pendant l'incident et la reprise.",
    intro:
      "Le cœur économique d'une assurance cyber n'est pas seulement le remboursement de quelques frais techniques. Son rôle est aussi de préserver l'entreprise contre la perte de revenus liée à un arrêt ou à une dégradation d'activité.",
    sections: [
      {
        title: 'Les pertes directes et les pertes indirectes ne se confondent pas',
        body: [
          "Une entreprise peut payer des experts, réinstaller des systèmes et gérer une crise. Ce sont des coûts visibles. Mais elle peut surtout ne plus encaisser normalement pendant plusieurs jours, ce qui crée une perte de revenus moins visible mais parfois plus lourde.",
          "La protection cyber pertinente est celle qui reconnaît cette double réalité économique.",
        ],
      },
      {
        title: 'La garantie doit être lue dans son mécanisme',
        body: [
          "Le sujet n'est pas seulement de savoir si la garantie existe, mais comment elle s'applique : période d'indemnisation, plafonds, franchises, événements déclencheurs et lien avec l'interruption réelle.",
          "Un accompagnement spécialisé aide à éviter les contrats qui semblent protecteurs sur le papier mais trop limités au moment du sinistre.",
        ],
      },
    ],
    takeaways: [
      "La perte de revenus est souvent le poste majeur après incident.",
      "La mécanique d'indemnisation compte autant que le libellé de la garantie.",
      "Une cyberassurance utile protège la continuité économique réelle.",
    ],
  },
  {
    slug: 'experts-en-reponse-aux-incidents',
    title: 'Experts en réponse aux incidents',
    category: 'Couverture',
    variant: 'incident-experts',
    readTime: '4 min',
    excerpt:
      "L'accès rapide à des experts techniques, forensic et remédiation réduit la durée et le coût d'un incident.",
    intro:
      "Une entreprise ne devrait pas découvrir sa chaîne de réponse le jour d'une attaque. La capacité à mobiliser les bons experts rapidement change profondément le coût final du sinistre.",
    sections: [
      {
        title: 'La vitesse de mobilisation est décisive',
        body: [
          "Quand un incident démarre, perdre plusieurs heures avant de parler à un expert qualifié peut aggraver la propagation, allonger l'arrêt et compliquer la collecte des preuves.",
          "L'intérêt d'un réseau déjà structuré est précisément d'éviter cette inertie au moment où les décisions sont les plus sensibles.",
        ],
      },
      {
        title: 'L’expertise évite les mauvaises décisions',
        body: [
          "Couper trop large, communiquer trop tôt ou restaurer sans vérifier peuvent coûter cher. Les spécialistes en réponse aux incidents apportent une méthode, une hiérarchie des actions et une lecture concrète du risque.",
          "Leur rôle n'est pas seulement de réparer, mais d'aider l'entreprise à reprendre le contrôle avec discipline.",
        ],
      },
    ],
    takeaways: [
      "La réponse cyber se joue dans les premières heures.",
      "L'expertise technique limite les erreurs de pilotage.",
      "Le réseau d'intervenants fait partie de la valeur du contrat.",
    ],
  },
  {
    slug: 'defense-juridique-et-couts-reglementaires',
    title: 'Défense juridique & coûts réglementaires',
    category: 'Couverture',
    variant: 'legal-defense',
    readTime: '4 min',
    excerpt:
      "Au-delà de l'incident technique, l'entreprise doit souvent financer du conseil, de la défense et des démarches réglementaires.",
    intro:
      "Le droit et la conformité deviennent vite un poste de coût après une violation de données ou un incident majeur. Une garantie dédiée évite de laisser l'entreprise seule face à des démarches complexes et urgentes.",
    sections: [
      {
        title: 'Le risque juridique est concret, pas théorique',
        body: [
          "Dès qu'un incident affecte des données ou des tiers, il faut documenter, qualifier, notifier et parfois répondre à des demandes externes. Cela crée des besoins immédiats de conseil et d'encadrement juridique.",
          "Sans accompagnement, l'entreprise risque de gérer l'urgence avec des moyens internes inadaptés.",
        ],
      },
      {
        title: 'Les coûts de conformité peuvent être importants',
        body: [
          "Même sans contentieux, la simple mise en conformité post-incident, les notifications et la coordination des parties prenantes représentent une charge significative. Pour beaucoup d'entreprises, ce poste n'est pas budgété.",
          "La présence d'une garantie claire sur ces frais est donc un vrai sujet de qualité contractuelle.",
        ],
      },
    ],
    takeaways: [
      "Les coûts juridiques ne se limitent pas aux litiges.",
      "La conformité post-incident mobilise des ressources externes et internes.",
      "Une garantie bien rédigée évite les angles morts après violation de données.",
    ],
  },
  {
    slug: 'communication-de-crise-et-reputation',
    title: 'Communication de crise & réputation',
    category: 'Couverture',
    variant: 'crisis-comms',
    readTime: '4 min',
    excerpt:
      "La communication de crise fait partie intégrante de la remédiation : elle protège la relation client et limite l'effet réputationnel.",
    intro:
      "Face à un incident cyber, les entreprises pensent d'abord technique. Pourtant, la manière de parler à l'extérieur influe directement sur la confiance, la fidélité et la perception de maîtrise.",
    sections: [
      {
        title: 'Chaque message compte pendant la crise',
        body: [
          "Un message mal calibré peut provoquer de l'inquiétude, des résiliations, des tensions contractuelles ou un emballement médiatique. La communication de crise permet de définir un message cohérent, utile et crédible.",
          "L'objectif n'est pas de masquer le problème, mais de montrer que l'entreprise pilote la situation avec sérieux.",
        ],
      },
      {
        title: 'La réputation se protège aussi après l’incident',
        body: [
          "Une fois la phase aiguë passée, il faut souvent rassurer sur les mesures prises, accompagner les clients concernés et réaffirmer la capacité de l'entreprise à opérer normalement.",
          "Cette reconstruction de confiance peut nécessiter un appui spécialisé, notamment si l'incident touche des clients stratégiques ou des partenaires majeurs.",
        ],
      },
    ],
    takeaways: [
      "La communication de crise n'est pas accessoire.",
      "Une mauvaise communication prolonge les effets du sinistre.",
      "La confiance client se travaille avant, pendant et après la crise.",
    ],
  },
  {
    slug: 'dommages-aux-tiers-en-cyberassurance',
    title: 'Dommages aux tiers',
    category: 'Couverture',
    variant: 'third-party',
    readTime: '4 min',
    excerpt:
      "Un incident cyber peut affecter des clients, partenaires ou fournisseurs et engager la responsabilité de l'entreprise.",
    intro:
      "La cyberattaque n'endommage pas toujours uniquement l'entreprise assurée. Elle peut aussi entraîner des préjudices subis par des tiers, qu'il s'agisse d'une fuite de données, d'un service indisponible ou d'une propagation d'impact.",
    sections: [
      {
        title: 'La responsabilité vis-à-vis des tiers est souvent sous-estimée',
        body: [
          "Quand un client subit une perte, une indisponibilité ou une atteinte à ses données à la suite de votre incident, la discussion change immédiatement d'échelle. Le dossier devient contractuel, juridique et commercial.",
          "Même sans condamnation, les frais de gestion et de défense peuvent être élevés.",
        ],
      },
      {
        title: 'La protection doit couvrir la relation avec l’écosystème',
        body: [
          "Dans une économie interconnectée, un incident touche rarement un seul système isolé. Prestataires, clients, sous-traitants et partenaires peuvent tous être impactés d'une manière ou d'une autre.",
          "Une cyberassurance sérieuse doit prendre en compte cet effet d'écosystème et pas seulement les dommages strictement internes.",
        ],
      },
    ],
    takeaways: [
      "Le risque cyber inclut la responsabilité envers les tiers.",
      "L'écosystème client et partenaire peut être directement affecté.",
      "La protection doit dépasser le seul périmètre technique interne.",
    ],
  },
  {
    slug: 'cyberassurance-pour-tpe-et-startups',
    title: 'TPE & Startups',
    category: 'Cible',
    variant: 'startup-stack',
    readTime: '10 min',
    excerpt:
      "Les petites structures numériques sont souvent très exposées, car elles dépendent d'outils cloud, de paiements en ligne et de ressources limitées.",
    intro:
      "Les TPE et startups pensent parfois être trop petites pour intéresser les attaquants. C'est souvent l'inverse : leur surface numérique est réelle et leurs marges de manœuvre en cas d'arrêt sont plus faibles.",
    sections: [
      {
        title: 'Des outils simples, mais une vraie dépendance numérique',
        body: [
          "Email, CRM, paiements, visio, stockage, outils SaaS et accès distants suffisent à créer une exposition cyber importante. La complexité technique n'est pas nécessaire pour subir un incident coûteux.",
          "La concentration des opérations sur quelques outils critiques augmente même parfois la vulnérabilité globale.",
          "Une indisponibilité même courte peut paralyser la production commerciale, la relation client et la capacité d'encaissement.",
        ],
      },
      {
        title: 'La petite taille réduit la capacité d’absorption',
        body: [
          "Une jeune structure ou une très petite entreprise supporte moins facilement un arrêt, une perte de trésorerie ou des frais imprévus. Le moindre incident peut avoir un effet disproportionné sur l'activité.",
          "La cyberassurance a ici un rôle de stabilisation financière et d'accès rapide à des ressources externes que l'entreprise n'a pas en interne.",
        ],
      },
      {
        title: 'Garanties prioritaires pour TPE et startups',
        body: [
          "Interruption d'activité et perte de revenus: souvent le premier poste critique.",
          "Frais d'experts et assistance de crise: utile quand il n'existe pas d'équipe cyber interne.",
          "Responsabilités liées aux données: essentielle si l'entreprise traite des données clients ou RH.",
        ],
      },
      {
        title: 'Prix, exclusions et méthode de choix',
        body: [
          "Le tarif dépend du niveau de dépendance numérique, du volume de données, des mesures de sécurité minimales et du périmètre de garanties.",
          "Les exclusions à relire: incidents préexistants, défaut de sécurité manifeste, périmètre technique non déclaré, ou franchises trop lourdes pour une petite structure.",
          "Commencez par un devis précis et comparez ensuite les formules en regardant les conditions d'activation et les limites réelles.",
        ],
      },
    ],
    takeaways: [
      "Être petit ne protège pas du risque cyber.",
      "La dépendance aux outils SaaS crée une exposition concrète.",
      "La cyberassurance aide surtout quand la capacité d'absorption est limitée.",
    ],
  },
  {
    slug: 'cyberassurance-pour-pme',
    title: 'PME',
    category: 'Cible',
    variant: 'sme-ops',
    readTime: '14 min',
    excerpt:
      "Les PME cumulent souvent données clients, RH, finance et outils métiers, avec une exposition forte et une gouvernance cyber encore inégale.",
    intro:
      "La PME moderne concentre une quantité importante d'actifs numériques : données, flux financiers, outils de pilotage, dépendance à des prestataires et obligations réglementaires. Cette combinaison crée un risque cyber très tangible.",
    sections: [
      {
        title: 'Pourquoi la cyberassurance PME est un sujet de continuité d’activité',
        body: [
          "Dans une PME, la dépendance numérique n'est plus limitée au service informatique. Les ventes, la production, la relation client, la facturation, les paiements et la coordination des équipes reposent souvent sur quelques outils critiques.",
          "Quand un incident cyber survient, l'effet domino est rapide: les opérations ralentissent, les équipes contournent les processus, la trésorerie se tend et la communication client devient fragile.",
          "La cyberassurance est alors un dispositif de continuité d’activité. Elle sert à financer la réponse, structurer les décisions et limiter le temps pendant lequel l’entreprise opère en mode dégradé.",
        ],
      },
      {
        title: 'Les points de fragilité les plus fréquents en PME',
        body: [
          "Messagerie compromise, comptes administrateurs mal protégés, dépendance à un ERP, accès distants non segmentés, prestataire unique sur un outil métier: ces situations sont fréquentes et augmentent la surface d'impact.",
          "Le risque ne se résume pas à un vol de données. Il inclut aussi l'arrêt de production, l'incapacité à facturer, l'impossibilité de traiter les commandes et la perte de confiance clients.",
          "Les PME qui ont grandi rapidement sont souvent les plus exposées: les process ont évolué plus vite que la gouvernance cyber, ce qui crée des zones de fragilité invisibles jusqu'au premier incident.",
        ],
      },
      {
        title: 'Que doit couvrir en priorité une assurance cyber PME ?',
        body: [
          "Interruption d'activité et perte d'exploitation: poste central dès qu'un incident bloque les flux commerciaux ou opérationnels.",
          "Frais d'expertise technique et pilotage de crise: indispensables pour qualifier l'incident, contenir la propagation et organiser la reprise.",
          "Volet juridique et données: utile quand des informations clients, partenaires ou RH sont concernées par l'événement.",
          "Garanties complémentaires (dommages subis, fraude) selon le profil: à arbitrer selon les scénarios réellement redoutés.",
        ],
      },
      {
        title: 'Exclusions et limites : ce que la PME doit vérifier avant de signer',
        body: [
          "Présence d'un sinistre antérieur non déclaré, défaut de mesures minimales prévues au contrat, périmètre technique incomplet ou usage non précisé: ces points peuvent limiter l'indemnisation.",
          "Les franchises doivent être compatibles avec la capacité financière réelle de la PME. Une franchise mal calibrée peut annuler l'intérêt de la couverture au moment critique.",
          "Les plafonds doivent rester cohérents avec l'impact estimé d'un arrêt de plusieurs jours. Un plafond trop bas peut laisser un reste à charge significatif.",
        ],
      },
      {
        title: 'Prix de la cyberassurance PME : comment le lire sans erreur',
        body: [
          "Le prix est la conséquence d'un arbitrage entre périmètre de garanties, plafonds, franchises et niveau d'exposition observé.",
          "Deux PME de taille similaire peuvent avoir des devis différents selon leur secteur, leur dépendance aux outils numériques, la nature des données traitées et leur maturité de sécurité.",
          "Comparer uniquement la prime annuelle est trompeur. Il faut comparer la mécanique d'indemnisation, la rapidité de mobilisation des experts et les limites réelles du contrat.",
        ],
      },
      {
        title: 'Exemples concrets de sinistres PME',
        body: [
          "Compromission de messagerie: un email de faux fournisseur modifie un RIB, des virements partent vers un compte frauduleux, puis la PME doit gérer vérifications internes, communication et tension de trésorerie.",
          "Rançongiciel sur un serveur de fichiers: les équipes ne peuvent plus accéder aux documents de production, la livraison ralentit et la facturation prend du retard pendant plusieurs jours.",
          "Incident chez un prestataire critique: un outil cloud central devient indisponible, la PME bascule en mode manuel et perd temporairement en qualité de service.",
          "Exposition de données clients: il faut qualifier les faits, cadrer la communication et assurer le suivi juridique et opérationnel.",
        ],
      },
      {
        title: 'Méthode recommandée pour choisir sa couverture PME',
        body: [
          "Étape 1: cartographier les flux critiques (vente, facturation, production, relation client) et identifier le coût d’un arrêt.",
          "Étape 2: sélectionner les garanties qui protègent d'abord la continuité d'activité et la trésorerie.",
          "Étape 3: vérifier exclusions, plafonds, franchises et modalités d'activation pour éviter les angles morts.",
          "Étape 4: comparer plusieurs formules sur des scénarios concrets, pas seulement sur la prime annuelle.",
          "Étape 5: formaliser un devis avec des informations fiables pour accélérer la qualification et limiter les écarts entre promesse et réalité contractuelle.",
        ],
      },
      {
        title: 'Sources utiles et ressources pour dirigeants de PME',
        body: [
          "Pour structurer votre démarche, appuyez-vous sur des ressources publiques fiables: ANSSI (guides et bonnes pratiques), Cybermalveillance.gouv.fr (prévention et assistance), CNIL (données et conformité), France Num (accompagnement des PME).",
          "Ces sources ne remplacent pas le contrat d'assurance, mais elles aident à formuler une demande de devis plus solide et à réduire les erreurs de cadrage.",
          "Liens internes recommandés: /assurance-cyber, /assurance-cyber-prix, /offres, /devis-assurance-cyber.",
        ],
      },
      {
        title: 'Comment préparer la PME avant incident pour améliorer la couverture',
        body: [
          "La qualité d'un contrat cyber dépend aussi de la préparation interne. Une PME qui documente ses actifs critiques, ses accès sensibles, ses dépendances prestataires et son plan de sauvegarde formule une demande plus précise.",
          "Ce travail permet de mieux justifier les garanties demandées et de réduire les écarts entre le besoin opérationnel et la proposition reçue. Il facilite également la gestion de crise, car les informations structurantes sont déjà disponibles.",
          "Concrètement, un état des lieux simple peut suffire: cartographie des outils indispensables, inventaire des comptes à privilèges, fréquence des sauvegardes, procédures de validation des paiements et contacts d'urgence internes/externes.",
          "L'objectif n'est pas d'atteindre une maturité parfaite, mais de disposer d'un socle de pilotage qui sécurise la décision d'assurance et accélère la reprise en cas d'incident.",
        ],
      },
      {
        title: 'Questions à poser avant de comparer deux contrats cyber PME',
        body: [
          "Les mêmes intitulés de garanties peuvent recouvrir des réalités différentes. Une PME doit donc poser des questions précises: quel événement déclenche la garantie, quelles dépenses sont réellement prises en charge, et quelles pièces sont exigées pour l'indemnisation.",
          "Il faut aussi clarifier la disponibilité des experts en cas de crise, les modalités de coordination avec votre prestataire IT et la couverture en cas d'incident touchant un partenaire critique.",
          "La temporalité est un autre point décisif: durée d'indemnisation de l'interruption d'activité, délais déclaratifs, et limites sur les coûts de reprise progressive.",
          "Enfin, l'analyse ne doit pas isoler le prix. Le contrat le plus économique peut devenir le plus coûteux si les franchises, plafonds ou exclusions neutralisent la protection sur vos scénarios majeurs.",
        ],
      },
      {
        title: 'Conclusion : transformer le devis cyber en décision stratégique PME',
        body: [
          "Pour une PME, la cyberassurance ne doit pas être traitée comme une formalité administrative. C'est une décision de continuité d'activité qui conditionne la capacité à absorber un choc numérique sans rupture durable.",
          "Une démarche robuste repose sur trois principes: partir des risques concrets, vérifier le fonctionnement réel des garanties, et arbitrer le budget en fonction de la trésorerie mobilisable en crise.",
          "Avec cette méthode, le devis devient un outil de pilotage plutôt qu'un simple document commercial. Vous comparez des scénarios, pas des slogans, et vous pouvez justifier vos choix auprès de la direction, des clients ou des partenaires.",
          "Si vous souhaitez passer à l'étape opérationnelle, utilisez la page /devis-assurance-cyber puis comparez les formules sur /offres avant de finaliser la souscription.",
        ],
      },
      {
        title: 'Checklist et informations éditoriales',
        body: [
          "Checklist PME avant devis: lister les outils critiques, estimer le coût d'un arrêt, identifier les données sensibles, vérifier MFA/sauvegardes et comparer les garanties sur des cas concrets.",
          "Mis à jour le 8 mai 2026. Rédigé par l'équipe Le Cyberassureur. Le Cyberassureur, marque spécialisée de Prorisk Assurances.",
          "Références utiles: /qui-sommes-nous, /mentions-legales, /assurance-cyber, /assurance-cyber-prix, /devis-assurance-cyber.",
        ],
      },
      {
        title: 'Gouvernance interne PME : qui pilote le sujet cyberassurance ?',
        body: [
          "Dans beaucoup de PME, la gouvernance cyber est répartie entre direction générale, direction financière, IT interne ou prestataire externe. Cette répartition peut ralentir les décisions en cas d'incident si les rôles ne sont pas clarifiés à l'avance.",
          "Une bonne pratique consiste à définir un responsable de coordination, un circuit de validation des décisions urgentes et un point de contact unique pour l'assureur et les experts mobilisés.",
          "Le pilotage ne doit pas rester théorique. Il faut documenter qui déclare l'incident, qui valide les communications clients, qui arbitre les priorités de reprise et qui suit l'impact financier au quotidien.",
          "Cette gouvernance améliore la valeur du contrat: les garanties deviennent plus rapidement activables, la collecte des preuves est mieux structurée et les délais de reprise diminuent.",
          "En pratique, ce cadre peut être formalisé dans une note interne simple, revue au moins une fois par an, en lien avec les évolutions d'outils, de prestataires et d'obligations contractuelles.",
          "Pour sécuriser cette coordination, la PME peut aussi prévoir un exercice court de simulation: incident messagerie, arrêt d'outil critique ou suspicion de fraude. Tester le rôle de chaque acteur avant crise améliore nettement la réactivité et la qualité des décisions lorsque l'événement survient réellement.",
        ],
      },
    ],
    takeaways: [
      "La PME est exposée à des impacts opérationnels et financiers en cascade.",
      "Le bon contrat cyber se lit sur ses conditions réelles d'activation et ses limites.",
      "Comparer les garanties sur des scénarios concrets améliore la qualité du devis et de la souscription.",
    ],
  },
  {
    slug: 'cyberassurance-pour-eti-et-grandes-entreprises',
    title: 'ETI & Grandes entreprises',
    category: 'Cible',
    variant: 'enterprise-grid',
    readTime: '4 min',
    excerpt:
      "Plus l'organisation est vaste, plus les dépendances techniques, réglementaires et tierces augmentent la gravité potentielle d'un incident cyber.",
    intro:
      "Les ETI et grandes entreprises ne sont pas seulement exposées à des attaques plus sophistiquées. Elles sont aussi confrontées à une complexité organisationnelle qui rend les incidents plus longs, plus visibles et plus coûteux.",
    sections: [
      {
        title: 'La complexité augmente le coût de coordination',
        body: [
          "Un incident dans une grande structure implique souvent plusieurs sites, des équipes nombreuses, des dépendances applicatives, des prestataires externes et une gouvernance en couches. Chaque décision prend une dimension plus critique.",
          "Le coût vient autant de cette orchestration que de l'incident technique lui-même.",
        ],
      },
      {
        title: 'L’exposition réglementaire et réputationnelle est plus forte',
        body: [
          "Une grande entreprise traite davantage de données, supporte davantage de relations contractuelles et subit plus fortement les attentes du marché. La visibilité publique de l'incident peut donc être beaucoup plus lourde.",
          "Le contrat cyber doit alors intégrer la profondeur opérationnelle et la sensibilité réputationnelle propres aux grandes structures.",
        ],
      },
    ],
    takeaways: [
      "La taille rend la réponse plus complexe et plus coûteuse.",
      "Les dépendances tierces amplifient souvent le sinistre.",
      "Le niveau de couverture doit refléter la profondeur de l'organisation.",
    ],
  },
  {
    slug: 'pourquoi-un-specialiste-de-lassurance-cyber',
    title: "Spécialiste de l'assurance cyber",
    category: 'Expertise',
    variant: 'specialist-focus',
    readTime: '10 min',
    excerpt:
      "La cyberassurance demande une lecture technique, juridique et opérationnelle qu'un intermédiaire généraliste ne maîtrise pas toujours.",
    intro:
      "Tous les contrats ne se valent pas, et tous les intermédiaires non plus. Dans un domaine aussi spécifique que le cyber, l'interprétation des garanties, des exclusions et des scénarios de crise exige une expertise dédiée.",
    sections: [
      {
        title: 'Le cyber n’est pas un simple prolongement de l’assurance classique',
        body: [
          "La matière cyber mélange interruption d'activité, réponse technique, obligations de données, fraude, responsabilité, communication et parfois gestion de crise internationale. Cette combinaison ne se traite pas comme un risque standard.",
          "Un spécialiste lit le contrat à partir des sinistres concrets, pas seulement à partir des conditions générales.",
          "Il sait aussi relier les clauses techniques aux conséquences business: arrêt de production, pertes commerciales, obligations réglementaires et gestion de crise.",
        ],
      },
      {
        title: 'Le rôle du spécialiste est aussi de cadrer le besoin',
        body: [
          "Le bon accompagnement ne consiste pas uniquement à trouver un prix. Il consiste à traduire l'exposition réelle de l'entreprise en priorités de couverture compréhensibles et défendables.",
          "C'est ce travail de cadrage qui évite les contrats mal alignés avec la réalité du risque.",
        ],
      },
      {
        title: 'Différence concrète entre approche généraliste et spécialisée',
        body: [
          "Une approche généraliste compare surtout des tarifs et des libellés.",
          "Une approche spécialisée qualifie vos scénarios de sinistre, vos dépendances numériques et la capacité réelle d'indemnisation.",
          "Le résultat attendu est un contrat plus robuste, avec moins de zones d'ambiguïté au moment du sinistre.",
        ],
      },
      {
        title: 'Quand faire appel à un spécialiste devient critique',
        body: [
          "Quand votre activité dépend fortement d'un ERP, de la messagerie ou d'applications cloud critiques.",
          "Quand vous traitez des données sensibles ou répondez à des exigences contractuelles fortes de clients/donneurs d'ordre.",
          "Quand vous devez arbitrer entre plusieurs offres avec des garanties proches en apparence mais très différentes dans les détails.",
        ],
      },
    ],
    takeaways: [
      "La cyberassurance demande une expertise métier réelle.",
      "Le contrat doit être lu à l'échelle du sinistre probable.",
      "Le spécialiste aide à faire coïncider exposition et couverture.",
    ],
  },
  {
    slug: 'assistance-humaine-24-7',
    title: 'Assistance humaine 24/7',
    category: 'Expertise',
    variant: 'support-247',
    readTime: '4 min',
    excerpt:
      "En cas d'incident, la disponibilité d'un interlocuteur humain et compétent réduit fortement l'effet de sidération et accélère les bonnes décisions.",
    intro:
      "Quand un incident survient, les dirigeants n'ont pas besoin d'une promesse abstraite. Ils ont besoin d'un point d'entrée clair, humain et joignable immédiatement pour démarrer la réponse.",
    sections: [
      {
        title: 'Le premier échange conditionne la suite',
        body: [
          "Dans les premières minutes, l'entreprise doit savoir quoi faire, quoi éviter et qui mobiliser. Une assistance humaine réduit l'improvisation et structure les premières actions critiques.",
          "Cette qualité d'entrée en matière fait souvent la différence entre une crise pilotée et une crise subie.",
        ],
      },
      {
        title: 'La disponibilité permanente a une vraie valeur opérationnelle',
        body: [
          "Les incidents n'arrivent pas uniquement pendant les horaires de bureau. Soirées, week-ends, jours fériés ou périodes de congés sont précisément des moments de fragilité.",
          "Le support humain 24/7 permet de ne pas laisser l'entreprise seule face à une attaque pendant les heures les plus risquées.",
        ],
      },
    ],
    takeaways: [
      "L'assistance immédiate réduit la perte de temps critique.",
      "Le point d'entrée humain sécurise les premières décisions.",
      "Le 24/7 est une capacité opérationnelle, pas un argument marketing.",
    ],
  },
  {
    slug: 'reseau-dexperts-cyber',
    title: "Réseau d'experts",
    category: 'Expertise',
    variant: 'expert-network',
    readTime: '4 min',
    excerpt:
      "La qualité d'une réponse cyber dépend souvent de la capacité à coordonner plusieurs expertises complémentaires au même moment.",
    intro:
      "Un incident cyber n'est presque jamais un sujet purement informatique. Il peut impliquer des enjeux forensic, juridiques, assurantiels, réglementaires, contractuels et réputationnels en parallèle.",
    sections: [
      {
        title: 'Une expertise unique ne suffit pas',
        body: [
          "L'entreprise peut avoir besoin d'un spécialiste technique pour contenir, d'un juriste pour qualifier, d'un communicant pour préparer les messages et d'un interlocuteur assurance pour encadrer le sinistre.",
          "Un réseau d'experts permet d'éviter la dispersion et de gagner un temps précieux dans la coordination.",
        ],
      },
      {
        title: 'La valeur est dans l’orchestration',
        body: [
          "Avoir plusieurs intervenants ne suffit pas ; encore faut-il qu'ils puissent travailler vite, dans le bon ordre et avec une logique commune. C'est cette capacité d'orchestration qui protège vraiment l'entreprise.",
          "Un réseau déjà activable limite les pertes liées au temps de recherche, d'arbitrage et de mise en relation.",
        ],
      },
    ],
    takeaways: [
      "La réponse cyber est multidisciplinaire.",
      "La coordination des expertises est un facteur clé de maîtrise.",
      "Le bon réseau vaut autant que la garantie financière.",
    ],
  },
  {
    slug: 'activation-rapide-apres-incident',
    title: 'Activation rapide',
    category: 'Expertise',
    variant: 'rapid-response',
    readTime: '4 min',
    excerpt:
      "Plus la réponse démarre vite, plus l'entreprise réduit la propagation, l'arrêt et l'incertitude de gestion.",
    intro:
      "La lenteur est l'alliée du sinistre cyber. Plus l'entreprise tarde à qualifier, contenir et mobiliser les bons interlocuteurs, plus le coût final augmente.",
    sections: [
      {
        title: 'La rapidité protège autant que la technique',
        body: [
          "Un incident contenu tôt n'a pas le même impact qu'un incident laissé évoluer plusieurs heures sans méthode. La rapidité d'activation influence directement l'étendue de la perturbation.",
          "C'est aussi un levier de réduction des coûts secondaires, comme la durée de l'arrêt ou l'escalade des responsabilités.",
        ],
      },
      {
        title: 'Une bonne activation repose sur un dispositif prêt',
        body: [
          "On ne construit pas une réponse efficace dans l'urgence. Elle suppose des contacts, des procédures, des garanties lisibles et un déclenchement simple.",
          "La cyberassurance utile n'est pas celle qui réagit lentement après vérification interminable, mais celle qui permet d'agir vite tout en cadrant le sinistre.",
        ],
      },
    ],
    takeaways: [
      "La vitesse réduit l'ampleur du sinistre.",
      "L'activation doit être simple et opérationnelle.",
      "Le temps gagné au début se traduit souvent en pertes évitées.",
    ],
  },
  {
    slug: 'continuite-dactivite-et-cyberassurance',
    title: "Priorité à la continuité d'activité",
    category: 'Expertise',
    variant: 'continuity-core',
    readTime: '4 min',
    excerpt:
      "La vraie question après un incident n'est pas seulement de réparer, mais de remettre l'entreprise en mouvement dans les meilleurs délais.",
    intro:
      "Une cyberattaque n'est pas un sujet de système seul. C'est un sujet de continuité d'activité : comment continuer à servir, produire, facturer et décider malgré la perturbation ?",
    sections: [
      {
        title: 'La continuité d’activité doit guider les priorités',
        body: [
          "Dans la crise, tout paraît urgent. Pourtant, toutes les restaurations n'ont pas la même valeur économique. L'approche la plus mature consiste à prioriser ce qui remet l'activité au travail le plus vite possible.",
          "Cette logique de priorisation évite de disperser les ressources sur des tâches secondaires au mauvais moment.",
        ],
      },
      {
        title: 'L’assurance cyber doit soutenir la reprise réelle',
        body: [
          "Un bon contrat ne se contente pas d'accompagner l'analyse de l'incident. Il doit aussi soutenir le retour à un fonctionnement acceptable, en cohérence avec la réalité opérationnelle de l'entreprise.",
          "Au fond, la cyberassurance devient pertinente lorsqu'elle protège la capacité de l'entreprise à redémarrer, pas seulement la capacité à constater le dommage.",
        ],
      },
    ],
    takeaways: [
      "La continuité d'activité est le vrai centre de gravité du risque cyber.",
      "Toutes les restaurations n'ont pas la même priorité métier.",
      "La couverture doit servir la reprise réelle de l'entreprise.",
    ],
  },
  {
    slug: 'cybersecurite-bonnes-pratiques-entreprise',
    title: 'Cybersécurité : les bonnes pratiques',
    category: 'Expertise',
    variant: 'cyber-security',
    readTime: '10 min',
    excerpt:
      "Ransomware, phishing, vol de données : les cybermenaces se multiplient. Découvrez les bonnes pratiques de cybersécurité indispensables pour protéger votre entreprise et renforcer votre posture face aux attaques.",
    intro:
      "La cybersécurité n'est plus un sujet réservé aux grandes entreprises ou aux DSI. Chaque organisation, quelle que soit sa taille, est une cible potentielle. Mettre en place des mesures concrètes de protection, former ses équipes et anticiper les incidents sont désormais des réflexes de survie économique.",
    sections: [
      {
        title: 'Le paysage des cybermenaces en 2026',
        body: [
          "Les cyberattaques ne cessent de se sophistiquer. Les ransomwares ciblent désormais des PME et des collectivités, pas seulement les grands groupes. Le phishing reste le vecteur d'attaque numéro un, avec des campagnes de plus en plus personnalisées et difficiles à détecter.",
          "Les attaques par supply chain (chaîne d'approvisionnement) se développent rapidement : un prestataire compromis peut ouvrir la porte à des dizaines d'entreprises clientes. La surface d'attaque s'élargit aussi avec le télétravail, les objets connectés et la multiplication des accès cloud.",
          "Selon l'ANSSI, les incidents signalés augmentent chaque année. Les conséquences vont bien au-delà du technique : pertes financières, arrêt d'activité, atteinte à la réputation et obligations réglementaires (RGPD, NIS2) pèsent lourdement sur les entreprises touchées.",
        ],
      },
      {
        title: 'Les fondamentaux de la cybersécurité en entreprise',
        body: [
          "La première ligne de défense reste l'hygiène numérique. Cela commence par des mots de passe robustes et uniques pour chaque service, combinés à l'authentification multifacteur (MFA) sur tous les accès critiques : messagerie, VPN, applications métiers et comptes administrateurs.",
          "La gestion des mises à jour est un autre pilier souvent négligé. Les failles connues non corrigées sont l'une des portes d'entrée les plus exploitées par les attaquants. Appliquer les correctifs de sécurité rapidement, sur les postes comme sur les serveurs, réduit considérablement la surface d'exposition.",
          "Le cloisonnement des réseaux et des droits d'accès limite la propagation en cas de compromission. Un collaborateur ne devrait avoir accès qu'aux ressources strictement nécessaires à son activité. Le principe du moindre privilège est simple à énoncer, mais exige une discipline continue.",
        ],
      },
      {
        title: 'Sauvegardes et plan de reprise : votre filet de sécurité',
        body: [
          "Les sauvegardes sont votre ultime rempart contre le ransomware. Mais encore faut-il qu'elles soient fiables, testées régulièrement et stockées hors ligne ou dans un environnement isolé. Une sauvegarde corrompue ou inaccessible au moment critique ne vaut rien.",
          "La règle 3-2-1 reste une référence : trois copies de vos données, sur deux supports différents, dont une hors site. Ce schéma protège contre les pannes matérielles, les erreurs humaines et les attaques ciblant votre infrastructure principale.",
          "Au-delà de la sauvegarde, il faut un plan de reprise d'activité (PRA) documenté et testé. Qui fait quoi en cas d'incident ? Quels systèmes restaurer en priorité ? Combien de temps pouvez-vous tolérer un arrêt ? Ces questions doivent avoir des réponses avant la crise, pas pendant.",
        ],
      },
      {
        title: 'Former et sensibiliser les collaborateurs',
        body: [
          "Le facteur humain reste le maillon le plus vulnérable. Plus de 80 % des incidents impliquent une erreur humaine : clic sur un lien malveillant, pièce jointe ouverte sans précaution, mot de passe partagé ou réutilisé, transfert de données sensibles par email non sécurisé.",
          "La sensibilisation ne peut pas se limiter à une formation annuelle. Elle doit être continue, concrète et adaptée aux métiers. Des exercices de simulation de phishing, des alertes internes régulières et des retours d'expérience après incidents réels renforcent la vigilance collective.",
          "L'objectif n'est pas de transformer chaque collaborateur en expert sécurité, mais de créer un réflexe : douter, vérifier, signaler. Une culture de la prudence partagée réduit drastiquement le risque d'intrusion initiale.",
        ],
      },
      {
        title: 'Sécuriser les accès distants et le cloud',
        body: [
          "Le travail à distance et les outils cloud ont multiplié les points d'entrée potentiels. Chaque accès distant non sécurisé est une porte ouverte pour un attaquant. L'utilisation d'un VPN d'entreprise, la segmentation des accès et le contrôle des appareils connectés sont des mesures de base.",
          "Pour les environnements cloud (Microsoft 365, Google Workspace, AWS, etc.), la configuration par défaut n'est jamais suffisante. Il faut activer les journaux d'audit, restreindre les partages externes, surveiller les connexions inhabituelles et appliquer des politiques de sécurité conditionnelles.",
          "La gestion des identités est devenue centrale : savoir qui accède à quoi, depuis où et quand permet de détecter les comportements anormaux avant qu'ils ne deviennent des incidents majeurs.",
        ],
      },
      {
        title: "Anticiper l'incident : préparer sa réponse",
        body: [
          "Aucune entreprise n'est invulnérable. La question n'est pas de savoir si un incident arrivera, mais quand. Préparer sa réponse à l'avance change radicalement l'issue : temps de réaction, coût du sinistre, capacité de reprise et impact sur la confiance.",
          "Un plan de réponse aux incidents doit identifier les contacts d'urgence (prestataire IT, assureur, conseil juridique), les procédures d'isolement des systèmes, les circuits de communication interne et externe, et les priorités de restauration.",
          "L'assurance cyber vient compléter ce dispositif en apportant un accès immédiat à des experts (forensic, juridique, communication de crise) et en couvrant les pertes financières liées à l'interruption d'activité, aux frais de remédiation et aux responsabilités envers les tiers.",
        ],
      },
      {
        title: 'Le lien entre cybersécurité et cyberassurance',
        body: [
          "Cybersécurité et cyberassurance ne s'opposent pas : elles se complètent. La prévention réduit la probabilité d'un incident. L'assurance réduit la gravité de ses conséquences. Ensemble, elles forment un dispositif complet de gestion du risque cyber.",
          "Les assureurs évaluent d'ailleurs la maturité de sécurité de l'entreprise lors de la souscription. Des mesures de base en place (MFA, sauvegardes, sensibilisation) facilitent l'accès à de meilleures garanties et à des tarifs plus compétitifs.",
          "Investir dans la cybersécurité améliore donc directement la qualité et le coût de la couverture cyber. C'est un cercle vertueux qui protège l'activité, la trésorerie et la réputation de l'entreprise.",
        ],
      },
    ],
    takeaways: [
      "La cybersécurité est un investissement de continuité, pas une dépense accessoire.",
      "Les fondamentaux (MFA, sauvegardes, mises à jour) bloquent la majorité des attaques.",
      "Former les équipes réduit le premier vecteur d'attaque : l'erreur humaine.",
      "Préparer sa réponse avant l'incident change radicalement le coût du sinistre.",
      "Cybersécurité et cyberassurance se renforcent mutuellement.",
    ],
  },
  {
    "slug": "cout-arret-activite-ransomware-assurance-cyber",
    "title": "Ransomware : quel coût pour l'arrêt d'activité de votre entreprise ?",
    "category": "Impact",
    "image": {
      "alt": "Attaque par ransomware dans une entreprise",
      "src": "/article-image-pool/01-attaque-par-ransomware.png",
      "filter": "brightness(1.18) contrast(1.04) saturate(1.06)",
      "overlayOpacity": 0.08
    },
    "readTime": "4 min",
    "updatedAt": "7 juin 2026",
    "excerpt": "Découvrez les impacts financiers d'une attaque par ransomware et comment l'assurance cyber peut limiter les pertes pour votre entreprise.",
    "intro": "Une attaque par ransomware peut paralyser votre entreprise en quelques heures. Entre perte de chiffre d'affaires, frais de restauration et atteinte à la réputation, les conséquences financières sont souvent sous-estimées.",
    "sections": [
      {
        "title": "L’urgence d’agir face à un ransomware",
        "body": [
          "Un ransomware, ou rançongiciel, est un logiciel malveillant qui chiffre vos données et exige une rançon pour les débloquer. Les cybercriminels ciblent de plus en plus les TPE et PME, souvent moins protégées que les grandes entreprises. Selon l’ANSSI, 54 % des entreprises françaises ont subi une cyberattaque en 2023, dont une part importante était des attaques par ransomware.",
          "Dès la détection de l’attaque, chaque minute compte. L’interruption d’activité peut être immédiate : systèmes verrouillés, accès aux fichiers bloqués, et impossibilité de facturer ou de produire. Plus l’entreprise met de temps à réagir, plus les pertes financières s’aggravent. Sans plan de réponse adapté, la reprise peut prendre des jours, voire des semaines."
        ]
      },
      {
        "title": "Les coûts cachés de l’interruption d’activité",
        "body": [
          "Le coût direct d’une attaque par ransomware ne se limite pas au montant de la rançon. Les pertes incluent souvent la baisse de chiffre d’affaires due à l’arrêt des opérations, les heures supplémentaires pour la récupération des données, ou encore les frais liés à la communication de crise. Selon une étude de Coveware, le coût moyen d’une interruption d’activité après un ransomware s’élève à plus de 200 000 € pour une PME, sans compter les éventuelles amendes en cas de fuite de données personnelles.",
          "Les conséquences indirectes sont tout aussi lourdes : perte de confiance des clients, dégradation de l’image de marque, ou encore départ de partenaires commerciaux. Pour une TPE ou une PME, ces impacts peuvent être fatals. Une assurance cyber peut prendre en charge une partie de ces coûts, sous réserve des garanties, franchises et plafonds prévus dans votre contrat."
        ]
      },
      {
        "title": "Le rôle clé de l’assurance cyber",
        "body": [
          "L’assurance cyber est conçue pour accompagner les entreprises face aux risques numériques, dont les attaques par ransomware. Elle peut couvrir les frais liés à la gestion de crise, comme l’intervention d’experts en cybersécurité pour contenir l’attaque et restaurer les systèmes. Certains contrats incluent également une indemnisation pour la perte d’exploitation, afin de compenser partiellement l’arrêt d’activité.",
          "Cependant, il est essentiel de bien comprendre les termes de votre contrat. Les garanties varient selon les assureurs : certaines solutions couvrent les rançons (sous conditions strictes), tandis que d’autres se concentrent sur les coûts de remise en état ou les pertes financières. Pour évaluer vos besoins, une demande de devis personnalisé via /devis-assurance-cyber est recommandée. Vous pouvez aussi consulter nos offres détaillées sur /offres."
        ]
      },
      {
        "title": "Comment limiter les risques et les pertes ?",
        "body": [
          "La prévention reste la meilleure arme contre les ransomwares. Sensibilisez vos équipes aux bonnes pratiques (ne pas cliquer sur des liens suspects, vérifier les pièces jointes, etc.), mettez à jour régulièrement vos systèmes et sauvegardez vos données de manière sécurisée. Un plan de continuité d’activité (PCA) permet aussi de réduire le temps d’arrêt en cas d’attaque.",
          "Malgré ces mesures, le risque zéro n’existe pas. C’est pourquoi souscrire une assurance cyber adaptée à votre activité est un complément indispensable. Pour en savoir plus sur les solutions proposées par Le Cyberassureur, visitez notre page dédiée à l’/assurance-cyber. Vous y trouverez des informations sur les tarifs et les garanties disponibles, ainsi que des conseils pour protéger votre entreprise."
        ]
      }
    ],
    "takeaways": [
      "Une attaque par ransomware peut coûter plus de 200 000 € à une PME, entre interruption d’activité et frais de restoration.",
      "L’assurance cyber prend en charge une partie des coûts, sous réserve des garanties et exclusions du contrat.",
      "Prévention et couverture assurantielle sont complémentaires pour limiter les risques financiers."
    ]
  },
];

export const articleRedirects: Record<string, string> = {};

export const visibleArticles = articles;

export function getArticleImage(article: Article) {
  return article.image ?? (article.variant ? cardImages[article.variant] : cardImages['cyber-security']);
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticleByTitle(title: string) {
  return articles.find((article) => article.title === title);
}
