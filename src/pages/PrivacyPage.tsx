import LegalPageLayout from '../components/LegalPageLayout';
import { usePageMeta } from '../lib/usePageMeta';

export default function PrivacyPage() {
  usePageMeta({
    title: 'Politique de confidentialité | Le Cyberassureur',
    description:
      "Consultez la politique de confidentialité du site Le Cyberassureur : données collectées, cookies, vos droits RGPD et contact du responsable du traitement.",
    path: '/politique-confidentialite',
    robots: 'noindex,follow',
  });

  return (
    <LegalPageLayout
      title="Politique de confidentialité"
      intro="Cette page décrit les données personnelles collectées via le site Le Cyberassureur, leur utilisation, leur durée de conservation et les droits dont vous disposez conformément au Règlement Général sur la Protection des Données (RGPD)."
    >
      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données personnelles collectées sur ce site est :
        </p>
        <ul className="mt-3 list-disc list-inside space-y-1">
          <li><strong>Raison sociale :</strong> Prorisk Assurances (marque Le Cyberassureur)</li>
          <li><strong>Adresse :</strong> Paris, France</li>
          <li>
            <strong>Contact :</strong>{' '}
            <a className="text-cyan-400 hover:text-cyan-300" href="mailto:contact@lecyberassureur.fr">
              contact@lecyberassureur.fr
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">2. Données collectées</h2>
        <p>
          Lorsque vous remplissez le formulaire de demande de devis ou de contact, nous collectons les
          informations suivantes :
        </p>
        <ul className="mt-3 list-disc list-inside space-y-1">
          <li>Nom de l&apos;entreprise</li>
          <li>Secteur d&apos;activité</li>
          <li>Numéro de téléphone</li>
          <li>Adresse e-mail (le cas échéant)</li>
        </ul>
        <p className="mt-3">
          Le site collecte également des informations d&apos;attribution marketing liées à votre visite :
          page d&apos;arrivée, référent, paramètres <code>utm_*</code>, <code>gclid</code> et{' '}
          <code>fbclid</code> lorsqu&apos;ils sont présents dans l&apos;URL. Ces données permettent de
          mesurer l&apos;efficacité de nos campagnes publicitaires.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">3. Base légale du traitement</h2>
        <p>
          Le traitement de vos données repose sur les bases légales suivantes au sens de l&apos;article 6
          du RGPD :
        </p>
        <ul className="mt-3 list-disc list-inside space-y-1">
          <li>
            <strong>Votre consentement</strong> — pour les cookies non essentiels (mesure d&apos;audience,
            cookies publicitaires) que vous acceptez via le bandeau de consentement.
          </li>
          <li>
            <strong>L&apos;intérêt légitime</strong> — pour le suivi des demandes entrantes et la
            qualification commerciale des prospects B2B.
          </li>
          <li>
            <strong>L&apos;exécution de mesures précontractuelles</strong> — pour le traitement de vos
            demandes de devis et l&apos;établissement d&apos;une proposition commerciale.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">4. Finalités du traitement</h2>
        <p>Vos données sont utilisées exclusivement pour :</p>
        <ul className="mt-3 list-disc list-inside space-y-1">
          <li>Répondre à vos demandes de devis ou d&apos;analyse de risque cyber</li>
          <li>Qualifier et suivre la relation prospect</li>
          <li>Mesurer l&apos;efficacité de nos campagnes d&apos;acquisition (Google Ads, Meta Ads)</li>
          <li>Améliorer l&apos;expérience utilisateur sur le site</li>
        </ul>
        <p className="mt-3">
          Vos données ne sont <strong>jamais vendues</strong> à des tiers et ne sont pas utilisées à des
          fins de prospection commerciale non sollicitée.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">5. Cookies et traçage</h2>
        <p>Le site utilise plusieurs catégories de cookies :</p>
        <ul className="mt-3 list-disc list-inside space-y-1">
          <li>
            <strong>Cookies essentiels</strong> — nécessaires au fonctionnement du site (consentement,
            navigation). Ils ne peuvent pas être désactivés.
          </li>
          <li>
            <strong>Cookies analytiques</strong> — permettent de mesurer l&apos;audience et le comportement
            des visiteurs (ex. Google Analytics).
          </li>
          <li>
            <strong>Cookies publicitaires</strong> — utilisés pour la mesure de conversions et le
            remarketing (ex. Google Ads, Meta Pixel).
          </li>
        </ul>
        <p className="mt-3">
          Vous pouvez accepter, refuser ou paramétrer vos choix à tout moment depuis le bandeau initial ou
          via le lien <strong>« Gérer les cookies »</strong> disponible en pied de page.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">6. Destinataires des données</h2>
        <p>
          Les informations soumises via le formulaire sont transmises à nos outils internes de gestion
          commerciale via un endpoint sécurisé (Vercel). Elles ne sont communiquées qu&apos;aux
          collaborateurs habilités au sein de Prorisk Assurances.
        </p>
        <p className="mt-3">
          Certains prestataires techniques peuvent avoir accès à des données dans le cadre de
          l&apos;hébergement ou de l&apos;analytique (ex. Vercel, Supabase). Ces prestataires sont liés par
          des obligations contractuelles de confidentialité conformes au RGPD.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">7. Durée de conservation</h2>
        <ul className="mt-3 list-disc list-inside space-y-1">
          <li>
            <strong>Données de prospects</strong> — conservées pendant <strong>3 ans</strong> à compter du
            dernier contact, conformément aux recommandations de la CNIL.
          </li>
          <li>
            <strong>Données de clients</strong> — conservées pendant la durée de la relation contractuelle,
            puis 5 ans à des fins d&apos;archivage légal.
          </li>
          <li>
            <strong>Cookies de consentement</strong> — votre choix est mémorisé pendant <strong>6 mois</strong>.
          </li>
          <li>
            <strong>Données d&apos;attribution marketing</strong> — conservées pendant <strong>13 mois</strong>{' '}
            maximum.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">8. Vos droits</h2>
        <p>
          Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants sur vos données
          personnelles :
        </p>
        <ul className="mt-3 list-disc list-inside space-y-1">
          <li><strong>Droit d&apos;accès</strong> — obtenir une copie de vos données</li>
          <li><strong>Droit de rectification</strong> — corriger des données inexactes</li>
          <li><strong>Droit à l&apos;effacement</strong> — demander la suppression de vos données</li>
          <li>
            <strong>Droit à la limitation</strong> — suspendre temporairement le traitement de vos données
          </li>
          <li>
            <strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré et
            lisible
          </li>
          <li>
            <strong>Droit d&apos;opposition</strong> — vous opposer au traitement fondé sur
            l&apos;intérêt légitime
          </li>
          <li>
            <strong>Droit de retrait du consentement</strong> — à tout moment pour les traitements basés
            sur votre consentement
          </li>
        </ul>
        <p className="mt-3">
          Pour exercer ces droits, contactez-nous à :{' '}
          <a className="text-cyan-400 hover:text-cyan-300" href="mailto:contact@lecyberassureur.fr">
            contact@lecyberassureur.fr
          </a>
          . Nous répondrons dans un délai maximum de <strong>30 jours</strong>.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">9. Réclamation auprès de la CNIL</h2>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation
          auprès de la Commission Nationale de l&apos;Informatique et des Libertés (CNIL) :
        </p>
        <ul className="mt-3 list-disc list-inside space-y-1">
          <li>
            <strong>Site :</strong>{' '}
            <a
              className="text-cyan-400 hover:text-cyan-300"
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.cnil.fr
            </a>
          </li>
          <li><strong>Adresse :</strong> 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-white">10. Mise à jour de la politique</h2>
        <p>
          Cette politique de confidentialité peut être mise à jour à tout moment pour refléter des
          changements légaux, réglementaires ou fonctionnels. La date de dernière mise à jour est
          indiquée ci-dessous.
        </p>
        <p className="mt-3 text-sm text-gray-400">
          Dernière mise à jour : mai 2026
        </p>
      </section>
    </LegalPageLayout>
  );
}
