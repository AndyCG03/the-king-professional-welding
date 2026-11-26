'use client';

import {useEffect, useRef, useState} from 'react';
import {dictionaries, type Lang} from '@/lib/i18n';
import {whatsappUrl} from '@/lib/site';

/** Prepares a WhatsApp message; nothing is stored or sent by the site itself. */
export function QuoteForm({lang}: {lang: Lang}) {
  const d = dictionaries[lang];
  const t = d.contact.form;
  const services = d.services.items.map(item => item.title);
  const select = useRef<HTMLSelectElement>(null);
  const [error, setError] = useState('');
  const [fallback, setFallback] = useState('');

  // "Discuss this service" links preselect the matching option (custom event, no URL state).
  useEffect(() => {
    const titles = dictionaries[lang].services.items.map(item => item.title);
    const pick = (event: Event) => {
      const index = (event as CustomEvent<number>).detail;
      if (select.current && titles[index]) select.current.value = titles[index];
    };
    window.addEventListener('pick-service', pick);
    return () => window.removeEventListener('pick-service', pick);
  }, [lang]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const detail = String(data.get('message') ?? '').trim();
    if (!name || !detail) {
      setError(t.error);
      return;
    }
    setError('');
    const url = whatsappUrl(`${t.greeting(name, String(data.get('service')))}\n\n${detail}`);
    window.open(url, '_blank', 'noopener,noreferrer');
    setFallback(url);
  };

  return (
    <form id="quote-form" onSubmit={submit} noValidate>
      <h3>{t.title}</h3>
      <label htmlFor="name">{t.name}</label>
      <input id="name" name="name" autoComplete="name" required maxLength={100} />
      <label htmlFor="service">{t.service}</label>
      <select id="service" name="service" ref={select} defaultValue={services[services.length - 1]}>
        {services.map(service => <option key={service}>{service}</option>)}
      </select>
      <label htmlFor="message">{t.details}</label>
      <textarea id="message" name="message" required rows={3} maxLength={2500} placeholder={t.placeholder} />
      <button className="button" type="submit">{t.submit}</button>
      <p className="form-note">{t.note}</p>
      <p id="form-status" role="status">
        {error}
        {fallback && <a href={fallback} target="_blank" rel="noopener noreferrer">{t.fallback}</a>}
      </p>
    </form>
  );
}

export function ServiceLink({index, label}: {index: number; label: string}) {
  return (
    <a className="service-link" href="#contact" onClick={() => window.dispatchEvent(new CustomEvent('pick-service', {detail: index}))}>
      {label}
    </a>
  );
}
