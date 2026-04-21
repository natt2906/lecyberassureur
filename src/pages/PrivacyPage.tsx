import LegalPageLayout from '../components/LegalPageLayout';
import { usePageMeta } from '../lib/usePageMeta';

export default function PrivacyPage() {
  usePageMeta({
    title: 'Politique de confidentialité | Le Cyberassureur',
    description:
      "Consultez la politique de confidentialité du site Le Cyberassureur, les données collectées via le formulaire et la gestion du consentement cookies.",
    path: '/politique-confidentialite',
    robots: 'noindex,follow',
  });

  return (
    <LegalPageLayout
      title="Politique de confidentialite"
      intro="Cette page decrit les donnees collectees via le formulaire de contact du site Le Cyberassureur, leur usage et la maniere de demander leur suppression."
    >
      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Donnees collectees</h2>
        <p>
          Lorsque vous remplissez le formulaire, nous collectons les informations que vous saisissez, notamment le nom de votre entreprise,
          votre numero de telephone et votre secteur d'activite.
        </p>
        <p className="mt-3">
          Le site conserve egalement des informations d'attribution marketing liees a votre visite: page d'arrivee, referent, parametres
          `utm_*`, `gclid` et `fbclid` lorsqu'ils sont presents dans l'URL.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Cookies et consentement</h2>
        <p>
          Le site utilise des cookies strictement necessaires a son fonctionnement, notamment pour conserver certains choix d&apos;interface et
          de consentement. Les cookies non essentiels, comme la mesure d&apos;audience, la personnalisation ou le marketing, ne doivent etre
          actives qu&apos;apres votre accord explicite.
        </p>
        <p className="mt-3">
          Vous pouvez accepter, refuser ou parametrer vos choix a tout moment depuis le bandeau initial ou via le lien &quot;Gerer les cookies&quot;
          disponible en pied de page.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Finalites</h2>
        <p>
          Ces donnees sont utilisees pour recontacter les prospects ayant demande une analyse de risque cyber, qualifier la demande et mesurer
          l'efficacite des campagnes d'acquisition.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Destinataires</h2>
        <p>
          Les informations soumises sont transmises au webhook configure, par exemple un endpoint Vercel, pour enregistrer les leads dans votre
          outil de suivi et declencher les notifications commerciales internes.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Conservation</h2>
        <p>
          Les donnees sont conservees pendant la duree necessaire au traitement de la demande commerciale et au suivi de la relation
          prospect. Adaptez cette duree a votre politique interne avant mise en production.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">Vos droits</h2>
        <p>
          Vous pouvez demander l'acces, la rectification ou la suppression de vos donnees en ecrivant a
          {' '}
          <a className="text-cyan-400 hover:text-cyan-300" href="mailto:contact@lecyberassureur.fr">
            contact@lecyberassureur.fr
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
