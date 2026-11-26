'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {dictionaries, pathFor, type Lang} from '@/lib/i18n';
import {site} from '@/lib/site';

const SECTIONS = ['trailers', 'services', 'projects', 'reviews', 'contact'] as const;

export function Header({lang}: {lang: Lang}) {
  const t = dictionaries[lang].nav;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const other: Lang = lang === 'en' ? 'es' : 'en';
  const labels: Record<(typeof SECTIONS)[number], string> = {trailers: t.trailers, services: t.services, projects: t.work, reviews: t.reviews, contact: t.contact};

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);

  // Highlight the section currently in view (scroll-spy) without scroll listeners.
  useEffect(() => {
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0));
      const top = [...ratios].filter(([, r]) => r > 0).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
      setActive(top);
    }, {rootMargin: '-18% 0px -35% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]});
    SECTIONS.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="header wrap">
      <Link className="brand" href={pathFor(lang)} aria-label={`${site.name} — home`}>
        <Image src="/images/logo.png" width={66} height={66} alt="" priority />
        <span>THE KING OF<small>PROFESSIONAL WELDING</small></span>
      </Link>
      <nav id="navigation" aria-label={lang === 'en' ? 'Main navigation' : 'Navegación principal'} className={open ? 'open' : undefined}>
        {SECTIONS.map(id => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className={active === id ? 'is-active' : undefined} aria-current={active === id ? 'location' : undefined}>
            {labels[id]}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <Link className="language" href={pathFor(other)} hrefLang={other} lang={other} aria-label={t.switchLabel}>{t.switchTo}</Link>
        <a className="button button-small" href={`tel:${site.phoneE164}`}>{t.talk}</a>
        <button className="menu" type="button" aria-expanded={open} aria-controls="navigation" aria-label={open ? t.menuClose : t.menuOpen} onClick={() => setOpen(value => !value)}>
          {open ? '×' : '☰'}
        </button>
      </div>
    </header>
  );
}
