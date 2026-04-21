import { Link } from 'react-router-dom';
import CardIllustration from '../components/CardIllustration';
import PageFeatureImage from '../components/PageFeatureImage';
import TopicPageLayout from '../components/TopicPageLayout';
import { assuranceCyberCoverageFaqItems } from '../data/faqs';
import { usePageMeta } from '../lib/usePageMeta';

export default function AssuranceCyberCoveragePage() {
  usePageMeta({
    title: 'Que couvre une assurance cyber pour entreprise ? | Le Cyberassureur',
    description:
      "Découvrez ce que couvre une assurance cyber pour entreprise : interruption d'activité, frais d'experts, gestion de crise, responsabilités liées aux données, dommages subis et fraude selon les garanties.",
    path: '/assurance-cyber-que-couvre',
    keywords:
      'assurance cyber que couvre, que couvre assurance cyber, garanties assurance cyber, couverture assurance cyber entreprise, assurance cyber fraude',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: assuranceCyberCoverageFaqItems.map((item) => ({
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
      eyebrow="Que couvre l’assurance cyber"
      title="Que couvre une assurance cyber pour entreprise ?"
      intro="Une assurance cyber utile ne se limite pas à un incident technique. Elle vise à absorber les conséquences financières, opérationnelles et parfois juridiques d’un événement qui désorganise l’activité."
      faqItems={assuranceCyberCoverageFaqItems}
      faqSectionId="assurance-cyber-coverage-faq"
      faqTitle="Questions fréquentes sur la couverture d’une assurance cyber"
      faqIntro="Cette page détaille les principaux postes de couverture à vérifier avant de choisir un contrat ou une formule cyber."
    >
      <PageFeatureImage
        src="/seo-images/assurance-cyber-que-couvre.png"
        alt="Equipe dirigeante et experts coordonnant la couverture d'un incident cyber dans un bureau moderne"
      />

      <section className="site-section site-section--muted">
        <div className="site-section__container">
          <div className="site-section__header">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Les principaux postes</span>
            </div>
            <h2 className="site-section__title">Une bonne couverture cyber protège l’entreprise au-delà de la seule remise en état</h2>
            <p className="site-section__intro">
              Le contrat doit être lu comme un ensemble cohérent. L’enjeu n’est pas
              seulement de redémarrer les outils, mais aussi de limiter la perte
              financière, d’organiser la réponse et de contenir les conséquences durables.
            </p>
          </div>

          <div className="site-card-grid site-card-grid--two">
            <article className="site-card">
              <CardIllustration variant="revenue-cover" />
              <h2 className="site-card__title">Interruption d’activité et perte de revenus</h2>
              <p className="site-card__body">
                Quand l’entreprise travaille au ralenti ou s’arrête, le poste le plus
                critique devient souvent la perte de revenus et l’impact sur la trésorerie,
                pas uniquement la réparation des systèmes.
              </p>
            </article>
            <article className="site-card">
              <CardIllustration variant="incident-experts" />
              <h2 className="site-card__title">Frais d’experts et gestion de crise</h2>
              <p className="site-card__body">
                Une assurance cyber peut mobiliser des experts techniques, juridiques
                et opérationnels pour qualifier l’incident, piloter la remédiation
                et cadrer la réponse dans les premières heures.
              </p>
            </article>
            <article className="site-card">
              <CardIllustration variant="legal-defense" />
              <h2 className="site-card__title">Responsabilités liées aux données et aux tiers</h2>
              <p className="site-card__body">
                Lorsqu’un incident touche des données clients, fournisseurs ou salariés,
                la couverture peut aussi concerner certains frais juridiques, réglementaires
                ou les conséquences vis-à-vis de tiers selon le contrat.
              </p>
            </article>
            <article className="site-card">
              <CardIllustration variant="finance-impact" />
              <h2 className="site-card__title">Dommages subis et fraude selon la formule</h2>
              <p className="site-card__body">
                Tous les contrats ne couvrent pas de la même manière les dommages subis
                ou la fraude. Ce point dépend fortement du niveau d’offre et doit être
                vérifié explicitement avant la souscription.
              </p>
            </article>
          </div>

          <div className="site-panel site-panel--accent topic-page__panel">
            <p className="site-panel__eyebrow">Ce qu’il faut vérifier</p>
            <h2 className="site-panel__title">Le vrai sujet n’est pas seulement la présence d’une garantie, mais sa manière de s’appliquer</h2>
            <div className="topic-page__stack">
              <p className="site-panel__body">
                Deux contrats peuvent sembler proches et pourtant réagir très différemment
                au sinistre. Il faut regarder le déclenchement, les limites et la cohérence
                globale du niveau de couverture proposé.
              </p>
              <ul className="topic-page__list">
                <li>Plafonds et franchises réellement supportables pour l’entreprise</li>
                <li>Durée d’indemnisation prévue en cas d’arrêt</li>
                <li>Périmètre exact de la fraude et des dommages subis</li>
                <li>Mobilisation concrète des experts et accompagnement de crise</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-section__container">
          <div className="site-section__header">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Comparer utilement</span>
            </div>
            <h2 className="site-section__title">Avant de choisir une formule, comparez le périmètre et pas seulement le prix</h2>
            <p className="site-section__intro">
              Une offre cyber pertinente doit rester alignée avec vos scénarios de risque,
              votre taille d’entreprise et votre capacité à absorber un incident.
            </p>
          </div>

          <div className="site-card-grid site-card-grid--two">
            <article className="site-card">
              <h3 className="site-card__title">Comparer Basic, Silver et Gold</h3>
              <p className="site-card__body">
                Les différences entre formules ne tiennent pas seulement à un montant,
                mais surtout aux postes réellement couverts et à la profondeur de protection.
              </p>
              <Link to="/offres" className="site-card__meta">
                Comparer les offres
              </Link>
            </article>
            <article className="site-card">
              <h3 className="site-card__title">Évaluer le bon budget</h3>
              <p className="site-card__body">
                Le bon niveau de couverture doit rester cohérent avec le coût potentiel
                d’un arrêt, d’une remédiation, d’une fraude ou d’une exposition de données.
              </p>
              <Link to="/assurance-cyber-prix" className="site-card__meta">
                Comprendre le prix d’une assurance cyber
              </Link>
            </article>
          </div>
        </div>
      </section>
    </TopicPageLayout>
  );
}
