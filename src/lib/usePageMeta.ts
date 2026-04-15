import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>;

type UsePageMetaOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string;
  robots?: string;
  structuredData?: StructuredData;
};

const DEFAULT_SITE_URL = 'https://lecyberassureur.fr';
const DEFAULT_IMAGE = '/hero-cyber.png';
const SITE_NAME = 'Le Cyberassureur';

const ensureMetaTag = (selector: string, attributes: Record<string, string>) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement('meta');
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag?.setAttribute(key, value);
  });
};

const ensureLinkTag = (selector: string, attributes: Record<string, string>) => {
  let tag = document.head.querySelector<HTMLLinkElement>(selector);

  if (!tag) {
    tag = document.createElement('link');
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag?.setAttribute(key, value);
  });
};

const toAbsoluteUrl = (siteUrl: string, value: string) => {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return new URL(value, siteUrl).toString();
};

export function usePageMeta({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  keywords,
  robots,
  structuredData,
}: UsePageMetaOptions) {
  const location = useLocation();

  useEffect(() => {
    const siteUrl = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');
    const pathname = path || location.pathname || '/';
    const canonicalUrl = new URL(pathname, `${siteUrl}/`).toString();
    const imageUrl = toAbsoluteUrl(siteUrl, image);
    const activeRobots = robots || 'index,follow';

    document.title = title;

    ensureMetaTag('meta[name="description"]', {
      name: 'description',
      content: description,
    });

    ensureMetaTag('meta[name="robots"]', {
      name: 'robots',
      content: activeRobots,
    });

    if (keywords) {
      ensureMetaTag('meta[name="keywords"]', {
        name: 'keywords',
        content: keywords,
      });
    } else {
      document.head.querySelector('meta[name="keywords"]')?.remove();
    }

    ensureMetaTag('meta[property="og:title"]', {
      property: 'og:title',
      content: title,
    });
    ensureMetaTag('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    ensureMetaTag('meta[property="og:type"]', {
      property: 'og:type',
      content: type,
    });
    ensureMetaTag('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl,
    });
    ensureMetaTag('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: SITE_NAME,
    });
    ensureMetaTag('meta[property="og:image"]', {
      property: 'og:image',
      content: imageUrl,
    });

    ensureMetaTag('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    ensureMetaTag('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: title,
    });
    ensureMetaTag('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });
    ensureMetaTag('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: imageUrl,
    });

    ensureLinkTag('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl,
    });

    document.head
      .querySelectorAll('script[data-seo-structured="true"]')
      .forEach((node) => node.remove());

    if (!structuredData) {
      return;
    }

    const payloads = Array.isArray(structuredData) ? structuredData : [structuredData];

    payloads.forEach((entry) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoStructured = 'true';
      script.text = JSON.stringify(entry);
      document.head.appendChild(script);
    });
  }, [description, image, keywords, location.pathname, path, robots, structuredData, title, type]);
}

export const siteMeta = {
  siteName: SITE_NAME,
  siteUrl: (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, ''),
  defaultImage: DEFAULT_IMAGE,
  logoUrl: '/brand-assets/logo-cropped-384.png',
};
