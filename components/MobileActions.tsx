import {dictionaries, type Lang} from '@/lib/i18n';
import {site, whatsappUrl} from '@/lib/site';

/** Thumb-zone action bar on phones: the three things a local customer wants to do. */
export function MobileActions({lang}: {lang: Lang}) {
  const t = dictionaries[lang].mobile;
  return (
    <nav className="mobile-actions" aria-label={lang === 'en' ? 'Quick contact' : 'Contacto rápido'}>
      <a href={`tel:${site.phoneE164}`}><span aria-hidden="true">✆</span>{t.call}</a>
      <a href={whatsappUrl(t.whatsappText)} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">✉</span>{t.whatsapp}</a>
      <a href="#contact" className="primary"><span aria-hidden="true">✳</span>{t.quote}</a>
    </nav>
  );
}
