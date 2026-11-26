'use client';

import {useId, useState} from 'react';
import type {Lang} from '@/lib/i18n';

const copy = {
  en: {
    legend: 'Your rating', stars: (n: number) => `${n} star${n === 1 ? '' : 's'}`, name: 'Your name (optional)', comment: 'Your comments',
    placeholder: 'How was the service? What did we do well, and what can we improve?',
    google: 'POST ON GOOGLE', whatsapp: 'SEND PRIVATELY BY WHATSAPP',
    copied: 'Your comment was copied. Paste it on the Google page that just opened and choose your stars there.',
    pick: 'Choose a rating from 1 to 5 stars.', googleNote: 'Posting on Google requires a Google account.',
    message: (stars: number, name: string, text: string, business: string) => `Rating for ${business}: ${'★'.repeat(stars)}${'☆'.repeat(5 - stars)} (${stars}/5)${name ? `\nName: ${name}` : ''}${text ? `\n\n${text}` : ''}`,
  },
  es: {
    legend: 'Tu calificación', stars: (n: number) => `${n} estrella${n === 1 ? '' : 's'}`, name: 'Tu nombre (opcional)', comment: 'Tu opinión',
    placeholder: '¿Cómo fue el servicio? ¿Qué hicimos bien y qué podemos mejorar?',
    google: 'PUBLICAR EN GOOGLE', whatsapp: 'ENVIAR EN PRIVADO POR WHATSAPP',
    copied: 'Copiamos tu comentario. Pégalo en la página de Google que se abrió y elige ahí tus estrellas.',
    pick: 'Elige una calificación de 1 a 5 estrellas.', googleNote: 'Para publicar en Google necesitas una cuenta de Google.',
    message: (stars: number, name: string, text: string, business: string) => `Calificación para ${business}: ${'★'.repeat(stars)}${'☆'.repeat(5 - stars)} (${stars}/5)${name ? `\nNombre: ${name}` : ''}${text ? `\n\n${text}` : ''}`,
  },
};

/**
 * Lets customers rate the service. Both channels are always offered, whatever the rating
 * (Google forbids "review gating", i.e. sending only happy customers to Google).
 * Nothing is stored by the website.
 */
export function RateService({lang, business, whatsapp, googleUrl}: {lang: Lang; business: string; whatsapp: string; googleUrl?: string}) {
  const t = copy[lang];
  const id = useId();
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');

  const requireStars = () => {
    if (stars) return true;
    setStatus(t.pick);
    return false;
  };
  const toGoogle = async () => {
    if (!googleUrl || !requireStars()) return;
    try { if (text) await navigator.clipboard.writeText(text); } catch { /* clipboard unavailable: still open Google */ }
    window.open(googleUrl, '_blank', 'noopener,noreferrer');
    setStatus(text ? t.copied : '');
  };
  const toWhatsapp = () => {
    if (!requireStars()) return;
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(t.message(stars, name.trim(), text.trim(), business))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setStatus('');
  };

  return (
    <form className="rate-form" onSubmit={event => event.preventDefault()}>
      <fieldset className="rate-stars" onMouseLeave={() => setHover(0)}>
        <legend>{t.legend}</legend>
        {[1, 2, 3, 4, 5].map(n => (
          <label key={n} className={(hover || stars) >= n ? 'on' : undefined} onMouseEnter={() => setHover(n)}>
            <input type="radio" name={`${id}-stars`} value={n} checked={stars === n} onChange={() => { setStars(n); setStatus(''); }} />
            <span aria-hidden="true">★</span>
            <span className="visually-hidden">{t.stars(n)}</span>
          </label>
        ))}
      </fieldset>
      <label htmlFor={`${id}-name`}>{t.name}</label>
      <input id={`${id}-name`} value={name} onChange={e => setName(e.target.value)} maxLength={80} autoComplete="name" />
      <label htmlFor={`${id}-text`}>{t.comment}</label>
      <textarea id={`${id}-text`} value={text} onChange={e => setText(e.target.value)} rows={3} maxLength={2000} placeholder={t.placeholder} />
      <div className="rate-actions">
        {googleUrl && <button type="button" className="rate-google" onClick={toGoogle}>{t.google}</button>}
        <button type="button" className="rate-whatsapp" onClick={toWhatsapp}>{t.whatsapp}</button>
      </div>
      {googleUrl && <p className="rate-note">{t.googleNote}</p>}
      <p className="rate-status" role="status">{status}</p>
    </form>
  );
}
