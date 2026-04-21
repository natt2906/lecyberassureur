export type FAQItem = {
  question: string;
  answer: string;
};

export const homeFaqItems: FAQItem[] = [
  {
    question: 'Nous sommes trop petits pour être ciblés par des cyberattaques',
    answer:
      "Les TPE et PME sont en réalité des cibles principales. Les attaquants savent que les petites entreprises disposent souvent de moins de moyens de sécurité, tout en traitant des données et des paiements de valeur. Plus de 60 % des cyberattaques ciblent les PME, précisément parce qu'elles sont perçues comme des cibles plus faciles et moins protégées.",
  },
  {
    question: 'Notre prestataire IT nous protège déjà',
    answer:
      "Les prestataires IT se concentrent sur la prévention et les mesures de sécurité, ce qui est essentiel. Mais l'assurance cyber couvre ce qui se passe après qu'une attaque réussit : pertes financières, coûts juridiques, interruption d'activité et dépenses de rétablissement. Même avec une excellente sécurité informatique, aucun système n'est sécurisé à 100 %. L'assurance absorbe l'impact financier quand la prévention échoue.",
  },
  {
    question: "Nous n'avons pas de données sensibles à protéger",
    answer:
      "Si vous avez des emails, des contacts clients, des factures, des informations de paiement ou des dossiers RH, vous avez des données sensibles. Même des informations basiques d'entreprise peuvent être chiffrées par un rançongiciel, vous forçant à payer ou à perdre l'accès. L'impact financier vient de l'interruption d'activité, pas seulement du vol de données.",
  },
  {
    question: 'Notre RC Pro couvre déjà les incidents cyber',
    answer:
      "Les contrats RC Pro excluent généralement les risques cyber ou offrent une couverture très limitée. Les incidents cyber exigent une couverture spécialisée pour les actifs numériques, les violations de données, l'interruption d'activité liée à des pannes IT et les amendes réglementaires, ce qui n'est pas couvert par la responsabilité civile classique. Il vous faut une assurance cyber dédiée.",
  },
  {
    question: "En combien de temps pouvons-nous être couverts après un incident ?",
    answer:
      "La couverture doit être en place avant qu'un incident ne se produise : on ne peut pas souscrire après une attaque. En revanche, une fois couverts, notre équipe de réponse 24/7 s'active immédiatement dès votre déclaration, avec un accès instantané à des experts techniques et juridiques.",
  },
  {
    question: "Quelle est la différence entre assurance cyber et services de cybersécurité ?",
    answer:
      "Les services de cybersécurité visent à prévenir les attaques. L'assurance cyber apporte une protection financière et un soutien d'experts après un incident. Les deux sont essentiels : la sécurité réduit le risque, l'assurance transfère les conséquences financières des incidents qui réussissent malgré vos mesures.",
  },
];

export const faqPageItems: FAQItem[] = [
  ...homeFaqItems,
  {
    question: 'Une assurance cyber couvre-t-elle uniquement les rançongiciels ?',
    answer:
      "Non. Une assurance cyber couvre généralement un périmètre plus large : interruption d'activité, frais d'expertise, restauration des systèmes, responsabilités liées aux données, accompagnement juridique, communication de crise et certains frais réglementaires selon les garanties prévues au contrat.",
  },
  {
    question: 'Que se passe-t-il si un salarié clique sur un email frauduleux ?',
    answer:
      "C'est l'un des scénarios les plus fréquents. Si l'incident entraîne une compromission, une fraude, une indisponibilité du système ou une fuite de données, la garantie peut être mobilisée selon les circonstances et les clauses du contrat. L'important est de déclarer rapidement l'incident pour enclencher la réponse.",
  },
  {
    question: 'L’assurance cyber couvre-t-elle les pertes d’exploitation ?',
    answer:
      "Oui, dans de nombreux contrats, les pertes d'exploitation consécutives à un incident cyber sont couvertes, sous conditions, plafonds et délais prévus. Cela vise à compenser l'impact financier pendant l'arrêt ou la dégradation de l'activité liée à l'incident.",
  },
  {
    question: 'Faut-il avoir un certain niveau de sécurité pour être assuré ?',
    answer:
      "Oui, la plupart des assureurs demandent un socle minimal de sécurité : sauvegardes, mises à jour, protections d'accès, parfois MFA ou procédures internes. L'objectif n'est pas d'exiger un niveau parfait, mais d'éviter les situations de négligence manifeste et de mieux qualifier le risque.",
  },
  {
    question: 'Le télétravail augmente-t-il le risque cyber assuré ?',
    answer:
      "Oui, il peut augmenter certaines expositions : accès distants, appareils personnels, réseaux domestiques, partage de fichiers ou usage d'outils cloud. Cela ne veut pas dire que le risque n'est pas assurable, mais que le questionnaire et les mesures de sécurité doivent refléter cette organisation.",
  },
  {
    question: 'Peut-on être couvert en cas de fraude au virement ou d’usurpation ?',
    answer:
      "Cela dépend du contrat. Certaines polices incluent ou proposent en option une garantie de cyber-fraude couvrant certains scénarios de fraude au président, d'usurpation d'identité ou de virements frauduleux. Ce point doit être vérifié explicitement au moment de la souscription.",
  },
  {
    question: 'Une entreprise sans e-commerce a-t-elle vraiment besoin d’une assurance cyber ?',
    answer:
      "Oui. Le risque cyber ne concerne pas seulement la vente en ligne. Messagerie, comptabilité, données clients, paie, fichiers RH, outils métiers, ERP ou prestataires externes suffisent à exposer l'entreprise à un arrêt d'activité, à des coûts techniques et à des responsabilités en cas d'incident.",
  },
  {
    question: 'Que couvre l’assistance de crise après une cyberattaque ?',
    answer:
      "L'assistance de crise peut inclure l'analyse technique initiale, la mobilisation d'experts, l'accompagnement juridique, l'organisation de la communication, le pilotage de la remédiation et l'aide à la déclaration des violations de données. Le détail dépend du contrat et du réseau d'experts mobilisé.",
  },
  {
    question: 'Combien de temps faut-il pour déclarer un incident cyber ?',
    answer:
      "Il faut déclarer le plus vite possible. En pratique, une déclaration rapide protège mieux l'entreprise, facilite la maîtrise de l'incident et évite toute difficulté liée aux obligations contractuelles. Attendre peut aggraver les pertes et compliquer l'intervention des experts.",
  },
  {
    question: 'Comment choisir le bon niveau de couverture cyber ?',
    answer:
      "Le bon niveau de couverture dépend du chiffre d'affaires, de la dépendance au système d'information, de la sensibilité des données, du nombre de postes, de la dépendance à des prestataires externes et du coût potentiel d'un arrêt. L'objectif n'est pas de prendre le plafond maximum, mais un niveau cohérent avec l'exposition réelle de l'entreprise.",
  },
];

export const assuranceCyberFaqItems: FAQItem[] = [
  {
    question: "À quoi sert une assurance cyber pour une entreprise ?",
    answer:
      "Une assurance cyber sert à absorber les conséquences financières d'un incident informatique : interruption d'activité, frais d'expertise, remise en état, responsabilités liées aux données et accompagnement de crise selon les garanties prévues.",
  },
  {
    question: "Une assurance cyber est-elle utile sans activité e-commerce ?",
    answer:
      "Oui. Une entreprise peut subir un sinistre cyber sans vendre en ligne : messagerie compromise, ERP indisponible, données clients exposées, fraude au virement ou poste chiffré par rançongiciel suffisent à créer un impact économique fort.",
  },
  {
    question: "Quelle différence entre cybersécurité et assurance cyber ?",
    answer:
      "La cybersécurité vise à réduire la probabilité d'un incident. L'assurance cyber vise à couvrir ses conséquences financières et à donner accès à des experts quand l'attaque a déjà eu lieu. Les deux approches sont complémentaires.",
  },
  {
    question: "Comment choisir le bon niveau de couverture cyber ?",
    answer:
      "Le bon niveau dépend de votre chiffre d'affaires, de votre dépendance au système d'information, de la sensibilité des données manipulées, du coût potentiel d'un arrêt et de votre exposition à la fraude ou à des tiers.",
  },
];

export const offersFaqItems: FAQItem[] = [
  {
    question: "Quelle offre d'assurance cyber choisir entre Basic, Silver et Gold ?",
    answer:
      "Basic convient à un premier socle de couverture. Silver est plus pertinent si l'entreprise veut intégrer les dommages subis. Gold vise les structures qui veulent aussi couvrir des scénarios de fraude en plus du reste.",
  },
  {
    question: "Les tarifs affichés sur la page offres sont-ils définitifs ?",
    answer:
      "Non. Ils servent de prix d'appel. Le tarif réel dépend du profil de l'entreprise, de son activité, de son chiffre d'affaires, de ses mesures de sécurité et du niveau de garantie retenu.",
  },
  {
    question: "Une offre d'assurance cyber suffit-elle sans analyse du risque ?",
    answer:
      "Non. Une offre donne un cadre de protection, mais l'analyse du risque reste indispensable pour vérifier l'adéquation du niveau de couverture avec l'exposition réelle de l'entreprise.",
  },
  {
    question: "Peut-on changer d'offre d'assurance cyber plus tard ?",
    answer:
      "Oui, sous réserve des modalités de l'assureur. Une entreprise peut ajuster son niveau de protection quand son exposition évolue : croissance, nouveaux outils, plus de données, plus de dépendance au numérique ou besoin renforcé sur la fraude.",
  },
];

export const cyberRisksFaqItems: FAQItem[] = [
  {
    question: "Que recouvre exactement la notion de cyber-risques ?",
    answer:
      "Les cyber-risques regroupent les événements qui peuvent affecter le système d'information ou les données d'une entreprise : rançongiciel, compromission de messagerie, fuite de données, fraude, indisponibilité des outils ou erreur humaine exploitée.",
  },
  {
    question: "Quels cyber-risques coûtent le plus cher aux PME ?",
    answer:
      "Les plus coûteux sont souvent l'interruption d'activité, la remise en état des systèmes, les dommages subis, la fraude et les responsabilités liées aux données ou à des tiers touchés par l'incident.",
  },
  {
    question: "Les cyber-risques concernent-ils aussi les entreprises très petites ?",
    answer:
      "Oui. Les TPE et PME sont particulièrement exposées parce qu'elles dépendent fortement de quelques outils clés tout en disposant souvent de moins de ressources internes pour absorber un incident prolongé.",
  },
  {
    question: "Comment réduire l'exposition aux cyber-risques avant même l'assurance ?",
    answer:
      "Le minimum utile reste la sauvegarde régulière, les mises à jour, le MFA, la gestion des accès, la sensibilisation des équipes et la capacité à déclarer rapidement un incident. L'assurance vient ensuite couvrir ce qui reste financièrement exposé.",
  },
];

export const assuranceCyberPriceFaqItems: FAQItem[] = [
  {
    question: "Quel est le prix d'une assurance cyber pour une PME ?",
    answer:
      "Il n'existe pas de prix unique. Le budget dépend surtout du chiffre d'affaires, du niveau de dépendance au système d'information, des données manipulées, du niveau de garanties choisi et du profil de risque observé par l'assureur.",
  },
  {
    question: 'Pourquoi deux entreprises comparables n’ont-elles pas le même tarif cyber ?',
    answer:
      "Deux entreprises de taille proche peuvent avoir des expositions très différentes. Une activité fortement dépendante à la messagerie, à un ERP, au paiement en ligne ou à des données sensibles sera généralement perçue comme plus exposée qu'une structure moins numérisée.",
  },
  {
    question: 'Les prix affichés sur la page offres sont-ils des tarifs définitifs ?',
    answer:
      "Non. Les montants affichés servent d'indication de départ. Le prix final dépend de l'analyse du risque, des garanties retenues, des plafonds, des franchises et des informations fournies au moment de la demande.",
  },
  {
    question: 'Comment obtenir rapidement un devis d’assurance cyber ?',
    answer:
      "Le plus simple est de préciser votre activité, votre taille, votre niveau de dépendance aux outils numériques et le niveau de couverture recherché. Plus le besoin est cadré, plus le devis peut être qualifié rapidement.",
  },
];

export const assuranceCyberMandatoryFaqItems: FAQItem[] = [
  {
    question: "L'assurance cyber est-elle obligatoire pour une entreprise en France ?",
    answer:
      "Dans la majorité des cas, non. Il n'existe pas d'obligation générale imposant une assurance cyber à toutes les entreprises. En revanche, certaines activités ont déjà des obligations d'assurance propres, et des exigences contractuelles peuvent rendre une couverture cyber nécessaire dans la pratique.",
  },
  {
    question: 'Une activité réglementée doit-elle vérifier ses obligations d’assurance ?',
    answer:
      "Oui. Lorsqu'une activité est réglementée, il faut toujours vérifier les obligations applicables à la profession et aux contrats conclus avec les clients, partenaires ou donneurs d'ordre. L'absence d'obligation générale ne dispense pas de cette vérification.",
  },
  {
    question: 'Des clients peuvent-ils exiger une assurance cyber ?',
    answer:
      "Oui. Dans certains appels d'offres, contrats cadres, marchés ou relations avec des donneurs d'ordre, une preuve de couverture cyber peut être demandée, même si la loi ne l'impose pas de manière générale.",
  },
  {
    question: "Une petite entreprise sans e-commerce peut-elle s'en passer ?",
    answer:
      "Pas forcément. Une entreprise sans vente en ligne peut quand même dépendre fortement de sa messagerie, de ses outils métiers, de ses données clients ou de ses prestataires. Le sujet n'est donc pas seulement l'obligation, mais l'exposition réelle au risque.",
  },
];

export const assuranceCyberCoverageFaqItems: FAQItem[] = [
  {
    question: "Que couvre en pratique une assurance cyber ?",
    answer:
      "Une assurance cyber peut couvrir selon le contrat l'interruption d'activité, les frais d'experts, la remise en état, certaines responsabilités liées aux données, la communication de crise, les dommages subis et parfois la fraude selon les options retenues.",
  },
  {
    question: "Les pertes d'exploitation sont-elles couvertes ?",
    answer:
      "Elles peuvent l'être, sous réserve des conditions du contrat. Il faut vérifier les événements déclencheurs, les plafonds, les franchises et la durée d'indemnisation prévue.",
  },
  {
    question: 'La fraude est-elle toujours incluse dans une assurance cyber ?',
    answer:
      "Non. La fraude n'est pas systématiquement incluse dans tous les niveaux d'offre. Elle peut relever d'une garantie spécifique ou d'une formule plus protectrice selon la structure du contrat.",
  },
  {
    question: 'Une assurance cyber couvre-t-elle tout ?',
    answer:
      "Non. Comme tout contrat d'assurance, une assurance cyber comporte un périmètre précis, des limites, des exclusions, des plafonds et des conditions de mise en jeu. La qualité du contrat se lit autant dans ce qu'il couvre que dans la manière dont il indemnise.",
  },
];
