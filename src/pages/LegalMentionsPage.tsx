import LegalPageLayout from '../components/LegalPageLayout';
import { usePageMeta } from '../lib/usePageMeta';

export default function LegalMentionsPage() {
  usePageMeta({
    title: 'Mentions légales | Le Cyberassureur',
    description:
      "Consultez les mentions légales du site Le Cyberassureur, les informations d'identification de l'éditeur et les éléments d'hébergement du service.",
    path: '/mentions-legales',
    robots: 'noindex,follow',
  });

  return (
    <LegalPageLayout
      title="Mentions legales"
      intro="Cette page regroupe les informations d'identification et d'hebergement du site Le Cyberassureur. Complete les champs societaires exacts avant mise en production definitive."
    >
      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Editeur du site</h2>
        <p>Nom commercial: Le Cyberassureur</p>
        <p>Le Cyberassureur est une marque de Prorisk Assurances.</p>
        <p>Raison sociale: Prorisk Assurances</p>
        <p>Numero de SIREN: 952546612</p>
        <p>RCS (Registre du Commerce et des Societes): 952 546 612 R.C.S. Creteil</p>
        <p>Immatriculation ORIAS: 23006734</p>
        <p>Contact: contact@lecyberassureur.fr</p>
        <p>Ville: Paris, France</p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Hebergement</h2>
        <p>Hebergeur technique: Vercel Inc.</p>
        <p>Adresse de l'hebergeur: 340 S Lemon Ave #4133, Walnut, CA 91789, United States.</p>
        <p>
          Site web: <a href="https://vercel.com" target="_blank" rel="noreferrer">https://vercel.com</a>
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Propriete intellectuelle</h2>
        <p>
          Les contenus, textes, visuels et elements graphiques du site sont proteges par le droit de la propriete intellectuelle. Toute
          reproduction non autorisee est interdite.
        </p>
      </section>
    </LegalPageLayout>
  );
}
