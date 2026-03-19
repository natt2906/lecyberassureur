import LegalPageLayout from '../components/LegalPageLayout';

export default function LegalMentionsPage() {
  return (
    <LegalPageLayout
      title="Mentions legales"
      intro="Cette page regroupe les informations d'identification et d'hebergement du site Le Cyberassureur. Complete les champs societaires exacts avant mise en production definitive."
    >
      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Editeur du site</h2>
        <p>Nom commercial: Le Cyberassureur</p>
        <p>Contact: contact@lecyberassureur.fr</p>
        <p>Ville: Paris, France</p>
        <p className="mt-3">
          Informations societaires a completer: raison sociale, forme juridique, adresse du siege, numero SIREN/SIRET, RCS, numero ORIAS et
          autorite de supervision le cas echeant.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Hebergement</h2>
        <p>Hebergeur technique: a completer selon la plateforme de deploiement retenue.</p>
        <p>Adresse de l'hebergeur: a completer.</p>
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
