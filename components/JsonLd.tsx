import {dictionaries, pathFor, type Lang} from '@/lib/i18n';
import {site} from '@/lib/site';

/**
 * Structured data for local search. Only confirmed facts: no invented hours, prices or ratings.
 * (Google does not allow self-published aggregateRating for LocalBusiness, so it is omitted.)
 */
export function JsonLd({lang}: {lang: Lang}) {
  const d = dictionaries[lang];
  const pageUrl = `${site.url}${pathFor(lang) === '/' ? '/' : pathFor(lang)}`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${site.url}/#business`,
        name: site.name,
        description: d.meta.description,
        url: site.url,
        telephone: site.phoneE164,
        email: site.email,
        image: [`${site.url}/og-image.jpg`, `${site.url}/images/work/trailer-welded-supports.jpg`],
        logo: `${site.url}/icon-512.png`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        areaServed: {'@type': 'City', name: 'Katy, Texas'},
        hasMap: site.googleMapsCid,
        sameAs: [site.googleMapsCid, site.googleKgUrl, site.social.facebook, site.social.instagram, site.social.tiktok],
        identifier: {'@type': 'PropertyValue', propertyID: 'Google Place ID', value: site.googlePlaceId},
        knowsLanguage: ['en', 'es'],
        makesOffer: d.services.items.map(item => ({'@type': 'Offer', itemOffered: {'@type': 'Service', name: item.title, description: item.text}})),
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: ['en-US', 'es-US'],
        publisher: {'@id': `${site.url}/#business`},
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: d.meta.title,
        inLanguage: lang === 'en' ? 'en-US' : 'es-US',
        isPartOf: {'@id': `${site.url}/#website`},
        about: {'@id': `${site.url}/#business`},
        primaryImageOfPage: `${site.url}/og-image.jpg`,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        inLanguage: lang === 'en' ? 'en-US' : 'es-US',
        mainEntity: d.faq.items.map(item => ({'@type': 'Question', name: item.q, acceptedAnswer: {'@type': 'Answer', text: item.a}})),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(graph).replace(/</g, '\\u003c')}} />;
}
