import { Link } from 'react-router-dom';
import CardIllustration from '../components/CardIllustration';
import PageFeatureImage from '../components/PageFeatureImage';
import TopicPageLayout from '../components/TopicPageLayout';
import { assuranceCyberMandatoryFaqItems } from '../data/faqs';
import { usePageMeta } from '../lib/usePageMeta';

export default function AssuranceCyberMandatoryPage() {
  usePageMeta({
    title: 'Assurance cyber obligatoire ou non : ce qu’une entreprise doit savoir | Le Cyberassureur',
    description:
      "Assurance cyber obligatoire ou non : découvrez ce qu'une entreprise doit vérifier, quand la couverture n'est pas imposée par la loi mais devient nécessaire en pratique, et quels profils sont les plus exposés.",
    path: '/assurance-cyber-obligatoire',
    keywords:
      'assurance cyber obligatoire, assurance cyber obligatoire ou non, obligation assurance cyber entreprise, assurance cyber profession reglementee',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: assuranceCyberMandatoryFaqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  });

  return (
    <TopicPageLayout
      eyebrow="Assurance cyber obligatoire"
      title="Assurance cyber obligatoire ou non : ce qu’une entreprise doit réellement vérifier"
      intro="Pour la majorité des entreprises, l’assurance cyber n’est pas imposée par une obligation générale. En revanche, certaines situations contractuelles, sectorielles ou opérationnelles rendent cette couverture très difficile à ignorer."
      faqItems={assuranceCyberMandatoryFaqItems}
      faqSectionId="assurance-cyber-obligatoire-faq"
      faqTitle="Questions fréquentes sur l’obligation d’assurance cyber"
      faqIntro="Cette page aide à distinguer l’absence d’obligation générale et les situations où une couverture cyber devient attendue, exigée ou fortement recommandée."
    >
      <PageFeatureImage
        src="/seo-images/assurance-cyber-obligatoire.png"
        alt="Dirigeant et conseillère conformité échangeant sur les obligations et contrats liés au cyber-risque"
      />

      <section className="site-section site-section--muted">
        <div className="site-section__container">
          <div className="site-section__header">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Le bon cadrage</span>
            </div>
            <h2 className="site-section__title">Le sujet n’est pas seulement légal, il est aussi contractuel et économique</h2>
            <p className="site-section__intro">
              Une entreprise peut ne pas être légalement tenue de souscrire tout en étant
              fortement exposée à un risque financier, ou en devant justifier une couverture
              dans ses relations clients, fournisseurs ou donneurs d’ordre.
            </p>
          </div>

          <div className="site-card-grid site-card-grid--three">
            <article className="site-card">
              <CardIllustration variant="legal-impact" />
              <h2 className="site-card__title">Pas d’obligation générale pour tous</h2>
              <p className="site-card__body">
                En pratique, toutes les entreprises ne sont pas soumises à un texte
                imposant systématiquement une assurance cyber. Il faut donc éviter
                les raccourcis du type “obligatoire pour tout le monde”.
              </p>
            </article>
            <article className="site-card">
              <CardIllustration variant="legal-defense" />
              <h2 className="site-card__title">Des obligations propres à certaines activités</h2>
              <p className="site-card__body">
                Les activités réglementées ou encadrées doivent toujours vérifier leurs
                obligations d’assurance spécifiques et leurs contraintes de conformité,
                même lorsque la question cyber n’est pas libellée de façon explicite.
              </p>
            </article>
            <article className="site-card">
              <CardIllustration variant="specialist-focus" />
              <h2 className="site-card__title">Des exigences contractuelles fréquentes</h2>
              <p className="site-card__body">
                Appels d’offres, contrats-cadres, clients grands comptes ou partenaires
                peuvent exiger une preuve de couverture cyber, notamment lorsque vous
                traitez des données, des accès ou des flux critiques.
              </p>
            </article>
          </div>

          <div className="site-panel site-panel--accent topic-page__panel">
            <p className="site-panel__eyebrow">En pratique</p>
            <h2 className="site-panel__title">Même quand elle n’est pas imposée, une assurance cyber peut devenir nécessaire pour continuer à travailler sereinement</h2>
            <div className="topic-page__stack">
              <p className="site-panel__body">
                Le vrai sujet n’est pas seulement “suis-je obligé ?”, mais “que se passe-t-il
                si un incident bloque mon activité, expose des données ou remet en cause une relation commerciale importante ?”
              </p>
              <ul className="topic-page__list">
                <li>Contrats clients qui exigent une couverture ou un niveau de sécurité minimal</li>
                <li>Activités très dépendantes à la messagerie, aux outils métiers ou aux données</li>
                <li>Prestations externalisées avec accès à des environnements tiers</li>
                <li>Risque réputationnel ou financier trop lourd à absorber seul</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-section__container">
          <div className="site-section__header">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">À regarder ensuite</span>
            </div>
            <h2 className="site-section__title">Les entreprises les plus concernées ne sont pas forcément celles qu’on imagine</h2>
            <p className="site-section__intro">
              Les activités les plus exposées ne sont pas seulement les grandes structures.
              Beaucoup de TPE et PME subissent un risque fort dès qu’un arrêt ou une
              compromission perturbe la facturation, la relation client ou la production.
            </p>
          </div>

          <div className="site-card-grid site-card-grid--two">
            <article className="site-card">
              <h3 className="site-card__title">Comprendre votre exposition réelle</h3>
              <p className="site-card__body">
                Avant de parler obligation, il faut comprendre les scénarios qui peuvent
                déséquilibrer votre entreprise: interruption, fraude, données exposées
                ou dépendance à un prestataire.
              </p>
              <Link to="/assurance-cyber-risques" className="site-card__meta">
                Voir les cyber-risques les plus coûteux
              </Link>
            </article>
            <article className="site-card">
              <h3 className="site-card__title">Vérifier ce que couvre vraiment le contrat</h3>
              <p className="site-card__body">
                Une couverture cyber utile doit être lue dans son périmètre réel:
                interruption d’activité, frais d’experts, dommages subis, fraude
                et responsabilités liées aux données.
              </p>
              <Link to="/assurance-cyber-que-couvre" className="site-card__meta">
                Voir ce que couvre une assurance cyber
              </Link>
            </article>
          </div>
        </div>
      </section>
    </TopicPageLayout>
  );
}
