import LegalPageLayout from '../components/LegalPageLayout';
import { usePageMeta } from '../lib/usePageMeta';

export default function TermsPage() {
  usePageMeta({
    title: "Conditions d'utilisation | Le Cyberassureur",
    description:
      "Consultez les conditions d'utilisation du site Le Cyberassureur et le cadre d'usage du contenu et du formulaire de contact.",
    path: '/conditions-utilisation',
    robots: 'noindex,follow',
  });

  return (
    <LegalPageLayout
      title="Conditions d'utilisation"
      intro="Ces conditions encadrent l'utilisation du site Le Cyberassureur et de son formulaire de prise de contact."
    >
      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Objet du site</h2>
        <p>
          Le site presente une offre de mise en relation et d'information autour de la cyberassurance pour les TPE et PME. Les contenus ont une
          vocation informative et commerciale.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Usage autorise</h2>
        <p>
          Vous acceptez d'utiliser ce site de bonne foi, de fournir des informations exactes et de ne pas tenter de perturber son
          fonctionnement.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Disponibilite</h2>
        <p>
          Le Cyberassureur s'efforce d'assurer la disponibilite du site, sans garantie d'absence d'interruption, d'erreur ou d'indisponibilite
          temporaire.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Responsabilite</h2>
        <p>
          Les informations diffusees sur le site ne remplacent pas une etude personnalisee de vos besoins d'assurance. Toute proposition
          commerciale definitive suppose une analyse specifique de votre situation.
        </p>
      </section>
    </LegalPageLayout>
  );
}
