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
