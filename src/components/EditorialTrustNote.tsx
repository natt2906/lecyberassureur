import { Link } from 'react-router-dom';

type EditorialTrustNoteProps = {
  updatedAt: string;
  reviewer?: string;
};

export default function EditorialTrustNote({
  updatedAt,
  reviewer = 'Rédigé par l’équipe Le Cyberassureur',
}: EditorialTrustNoteProps) {
  return (
    <section className="site-section site-section--muted">
      <div className="site-section__container">
        <article className="site-card">
          <h2 className="site-card__title">Méthode éditoriale et informations de confiance</h2>
          <p className="site-card__body">
            Contenu mis à jour le {updatedAt}. {reviewer}. Le Cyberassureur, marque spécialisée de Prorisk
            Assurances. Ce bloc éditorial vise à clarifier la source du contenu et son cadre métier pour faciliter
            la lecture, la confiance et la vérification des informations clés.
          </p>
          <p className="site-card__body">
            Références: <Link className="topic-page__inline-link" to="/qui-sommes-nous">qui sommes-nous</Link> et{' '}
            <Link className="topic-page__inline-link" to="/mentions-legales">mentions légales</Link>. Numéro ORIAS:
            se référer aux mentions légales du cabinet.
          </p>
        </article>
      </div>
    </section>
  );
}
