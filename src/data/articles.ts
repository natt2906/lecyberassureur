import type { CardIllustrationVariant } from './cardImages';

export type ArticleSection = {
  title: string;
  body: string[];
};

export type Article = {
  slug: string;
  title: string;
  category: 'Impact' | 'Couverture' | 'Cible' | 'Expertise';
  variant: CardIllustrationVariant;
  readTime: string;
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
    readTime: '4 min',
    excerpt:
      "Une cyberattaque ne provoque pas seulement un incident technique : elle déclenche immédiatement des sorties de trésorerie, des frais imprévus et des tensions sur l'exploitation.",
    intro:
      "Pour une entreprise, le choc cyber se lit d'abord dans les comptes. Même un incident de taille moyenne peut générer des coûts d'urgence, retarder les encaissements et désorganiser toute la chaîne opérationnelle.",
    sections: [
      {
        title: 'Les premiers coûts arrivent très vite',
        body: [
          "Dès les premières heures, l'entreprise peut devoir mobiliser un prestataire, isoler ses postes, rétablir des accès ou suspendre certains flux. Ces décisions ont un coût immédiat, souvent avant même de comprendre l'origine exacte du problème.",
          "À cela s'ajoutent les heures internes perdues, les arbitrages de priorité, les délais commerciaux et parfois le recours à des solutions provisoires plus coûteuses que le fonctionnement normal.",
        ],
      },
      {
        title: 'Le vrai risque est la désorganisation financière',
        body: [
          "Quand la trésorerie est déjà tendue, une cyberattaque agit comme un accélérateur de fragilité. Les paiements clients peuvent être bloqués, la facturation retardée ou les équipes comptables paralysées par l'indisponibilité des outils.",
          "Le sujet n'est donc pas seulement le montant du sinistre, mais la capacité de l'entreprise à absorber plusieurs semaines de friction financière sans dégrader son activité.",
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
    readTime: '4 min',
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
        ],
      },
      {
        title: 'La reprise est souvent plus longue que prévu',
        body: [
          "Le retour à la normale n'est pas instantané. Il faut parfois restaurer, contrôler, reconfigurer, communiquer et tester avant de reprendre un rythme acceptable. Cette phase de reprise pèse souvent autant que l'arrêt initial.",
          "C'est précisément là que la continuité d'activité et la protection des pertes d'exploitation deviennent des sujets majeurs dans l'assurance cyber.",
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
    readTime: '4 min',
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
        ],
      },
      {
        title: 'La petite taille réduit la capacité d’absorption',
        body: [
          "Une jeune structure ou une très petite entreprise supporte moins facilement un arrêt, une perte de trésorerie ou des frais imprévus. Le moindre incident peut avoir un effet disproportionné sur l'activité.",
          "La cyberassurance a ici un rôle de stabilisation financière et d'accès rapide à des ressources externes que l'entreprise n'a pas en interne.",
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
    readTime: '4 min',
    excerpt:
      "Les PME cumulent souvent données clients, RH, finance et outils métiers, avec une exposition forte et une gouvernance cyber encore inégale.",
    intro:
      "La PME moderne concentre une quantité importante d'actifs numériques : données, flux financiers, outils de pilotage, dépendance à des prestataires et obligations réglementaires. Cette combinaison crée un risque cyber très tangible.",
    sections: [
      {
        title: 'Une PME a souvent plusieurs points de fragilité simultanés',
        body: [
          "Messagerie, facturation, ERP, paie, dossiers clients et accès distants multiplient les scénarios possibles : phishing, compromission, fuite, indisponibilité ou fraude. Le risque n'est pas ponctuel, il est structurel.",
          "C'est cette densité d'usages numériques qui rend la PME particulièrement exposée.",
        ],
      },
      {
        title: 'La PME a besoin d’une couverture lisible et opérationnelle',
        body: [
          "Les dirigeants n'ont pas besoin d'un contrat théorique. Ils ont besoin d'un mécanisme compréhensible, mobilisable vite et adapté à la réalité de leurs opérations.",
          "La bonne approche consiste à aligner le contrat sur les flux critiques et les conséquences économiques concrètes d'un incident.",
        ],
      },
    ],
    takeaways: [
      "La PME concentre plusieurs risques cyber à la fois.",
      "Le contrat doit suivre les usages numériques réels de l'entreprise.",
      "La clarté opérationnelle du contrat est un critère clé.",
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
    readTime: '4 min',
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
        ],
      },
      {
        title: 'Le rôle du spécialiste est aussi de cadrer le besoin',
        body: [
          "Le bon accompagnement ne consiste pas uniquement à trouver un prix. Il consiste à traduire l'exposition réelle de l'entreprise en priorités de couverture compréhensibles et défendables.",
          "C'est ce travail de cadrage qui évite les contrats mal alignés avec la réalité du risque.",
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
];

export const articleRedirects: Record<string, string> = {};

export const visibleArticles = articles;

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticleByTitle(title: string) {
  return articles.find((article) => article.title === title);
}
