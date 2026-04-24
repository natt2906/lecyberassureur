type PartnerLogo = {
  name: string;
  logoSrc: string;
  logoAlt: string;
  darkLogoSrc?: string;
  darkLogoClassName?: string;
};

type LeadPartner = PartnerLogo & {
  role: string;
};

const leadPartners: LeadPartner[] = [
  {
    name: 'PRORISK Assurances',
    role: 'Marque du groupe',
    logoSrc: '/partners/prorisk-assurnaces-logo.png',
    logoAlt: 'Logo PRORISK Assurances',
  },
  {
    name: 'Kobalt',
    role: 'Partenaire principal',
    logoSrc: '/partners/logo-kobalt.png',
    darkLogoSrc: '/partners/kobalt-logo-white.svg',
    logoAlt: 'Logo Kobalt',
  },
] as const;

const supportPartners: PartnerLogo[] = [
  {
    name: 'Hiscox',
    logoSrc: '/partners/logo_hiscox_assurances.png',
    darkLogoSrc: '/partners/hiscox-logo-dark.png',
    logoAlt: 'Logo Hiscox',
  },
  {
    name: 'Izeho',
    logoSrc: '/partners/logo-izeho.png',
    logoAlt: 'Logo Izeho',
  },
  {
    name: 'Add Value',
    logoSrc: '/partners/logoAddValue.png',
    darkLogoClassName: 'partners-section__support-logo--white-dark',
    logoAlt: 'Logo Add Value',
  },
] as const;

export default function PartnersSection() {
  return (
    <section className="site-section site-section--muted site-section--bordered site-section--compact partners-section">
      <div className="site-section__container">
        <div className="site-section__header partners-section__header">
          <div className="site-section__eyebrow">
            <span className="site-section__eyebrow-text">Nos partenaires</span>
          </div>
          <h2 className="site-section__title">Un écosystème d’assurance et de distribution clairement identifié</h2>
          <p className="site-section__intro">
            Le Cyberassureur s&apos;appuie sur un environnement de groupe et sur des partenaires
            identifiés pour porter une offre plus lisible, plus crédible et plus rassurante pour
            les entreprises qui recherchent une solution d&apos;assurance cyber.
          </p>
        </div>

        <div className="site-card-grid site-card-grid--two partners-section__grid">
          {leadPartners.map((partner) => (
            <article key={partner.name} className="site-card partners-section__card">
              <div className="partners-section__logo-wrap">
                <img
                  src={partner.logoSrc}
                  alt={partner.logoAlt}
                  className={`partners-section__logo ${partner.darkLogoSrc ? 'partners-section__logo--light-theme' : ''}`}
                  loading="lazy"
                />
                {partner.darkLogoSrc ? (
                  <img
                    src={partner.darkLogoSrc}
                    alt={partner.logoAlt}
                    className="partners-section__logo partners-section__logo--dark-theme"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className="partners-section__copy">
                <p className="partners-section__kicker">{partner.role}</p>
                <h3 className="site-card__title">{partner.name}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="partners-section__support">
          <p className="partners-section__support-title">Partenaires complémentaires</p>
          <div className="partners-section__support-grid">
            {supportPartners.map((partner) => (
              <article key={partner.name} className="partners-section__support-card">
                <img
                  src={partner.logoSrc}
                  alt={partner.logoAlt}
                  className={`partners-section__support-logo ${partner.darkLogoSrc ? 'partners-section__support-logo--light-theme' : ''} ${partner.darkLogoClassName ?? ''}`}
                  loading="lazy"
                />
                {partner.darkLogoSrc ? (
                  <img
                    src={partner.darkLogoSrc}
                    alt={partner.logoAlt}
                    className="partners-section__support-logo partners-section__support-logo--dark-theme"
                    loading="lazy"
                  />
                ) : null}
                <span className="partners-section__support-name">{partner.name}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
