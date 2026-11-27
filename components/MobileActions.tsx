import {dictionaries, type Lang} from '@/lib/i18n';
import {site, whatsappUrl} from '@/lib/site';

const icon = {width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true};

/** Thumb-zone action bar on phones: the three things a local customer wants to do. */
export function MobileActions({lang}: {lang: Lang}) {
  const t = dictionaries[lang].mobile;
  return (
    <nav className="mobile-actions" aria-label={lang === 'en' ? 'Quick contact' : 'Contacto rápido'}>
      <a href={`tel:${site.phoneE164}`}>
        <svg {...icon}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>
        {t.call}
      </a>
      <a href={whatsappUrl(t.whatsappText)} target="_blank" rel="noopener noreferrer">
        <svg {...icon}><path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3L3 21Z" /><path d="M9 9.5c.3 1.6 1.9 3.6 4 4.6l1.1-1.1 1.9.8-.4 1.6c-3.5.3-7-3.2-7.2-6.6l1.6-.5.8 1.9L9.6 11" /></svg>
        {t.whatsapp}
      </a>
      <a href="#contact" className="primary">
        <svg {...icon}><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" /><path d="M13.5 6.5l4 4" /></svg>
        {t.quote}
      </a>
    </nav>
  );
}
