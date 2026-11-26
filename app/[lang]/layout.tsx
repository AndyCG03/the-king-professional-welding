import type {Metadata, Viewport} from 'next';
import {Barlow, Barlow_Condensed} from 'next/font/google';
import {notFound} from 'next/navigation';
import {dictionaries, isLang, languages, pathFor} from '@/lib/i18n';
import {site} from '@/lib/site';
import '../globals.css';

const barlow = Barlow({subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body', display: 'swap'});
const condensed = Barlow_Condensed({subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-display', display: 'swap'});

export const dynamicParams = false;
export function generateStaticParams() {
  return languages.map(lang => ({lang}));
}

export const viewport: Viewport = {themeColor: '#141615', colorScheme: 'dark'};

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  if (!isLang(lang)) return {};
  const m = dictionaries[lang].meta;
  return {
    metadataBase: new URL(site.url),
    title: m.title,
    description: m.description,
    applicationName: site.name,
    alternates: {
      canonical: pathFor(lang),
      languages: {'en-US': '/', 'es-US': '/es', 'x-default': '/'},
    },
    openGraph: {
      type: 'website',
      url: pathFor(lang),
      siteName: site.name,
      title: m.title,
      description: m.description,
      locale: m.locale,
      alternateLocale: lang === 'en' ? 'es_US' : 'en_US',
      images: [{url: '/og-image.jpg', width: 1200, height: 630, alt: m.ogAlt, type: 'image/jpeg'}],
    },
    twitter: {card: 'summary_large_image', title: m.title, description: m.description, images: ['/og-image.jpg']},
    icons: {
      icon: [{url: '/favicon.ico', sizes: '48x48'}, {url: '/favicon-32.png', type: 'image/png', sizes: '32x32'}, {url: '/icon-192.png', type: 'image/png', sizes: '192x192'}],
      apple: [{url: '/apple-touch-icon.png', sizes: '180x180'}],
    },
    robots: {index: true, follow: true, googleBot: {index: true, follow: true, 'max-image-preview': 'large'}},
    formatDetection: {telephone: false, email: false, address: false},
    category: 'business',
  };
}

export default async function RootLayout({children, params}: {children: React.ReactNode; params: Promise<{lang: string}>}) {
  const {lang} = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} className={`${barlow.variable} ${condensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
