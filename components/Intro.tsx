'use client';

import Image from 'next/image';
import {useEffect, useRef} from 'react';
import type {Lang} from '@/lib/i18n';

/** Runs before first paint (in <head>): show the intro once per browser session only. */
export const introBootScript = `(function(){try{var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('king-intro'))return;sessionStorage.setItem('king-intro','1');d.classList.add('intro-pending');window.__introStart=performance.now();setTimeout(function(){d.classList.remove('intro-pending')},3300)}catch(e){}})();`;

const DURATION = 2000; // weld seam finishes at ~2 s
const EXIT = 650;

/**
 * Brand intro (welding seam). Overlay only: the real page is already rendered underneath,
 * so search engines and fast users are not delayed. Skip button, Esc or any focus ends it.
 */
export function Intro({lang}: {lang: Lang}) {
  const screen = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const element = screen.current;
    if (!element || !root.classList.contains('intro-pending')) return;
    let done = false;
    const finish = (immediate = false) => {
      if (done) return;
      done = true;
      element.classList.add('is-leaving');
      window.setTimeout(() => root.classList.remove('intro-pending'), immediate ? 0 : EXIT);
    };
    const start = (window as unknown as {__introStart?: number}).__introStart ?? performance.now();
    const timer = window.setTimeout(() => finish(), Math.max(0, DURATION - (performance.now() - start)));
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && finish(true);
    const onFocus = (event: FocusEvent) => !element.contains(event.target as Node) && finish(true);
    document.addEventListener('keydown', onKey);
    document.addEventListener('focusin', onFocus);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', onFocus);
    };
  }, []);

  const skip = () => {
    screen.current?.classList.add('is-leaving');
    document.documentElement.classList.remove('intro-pending');
  };

  return (
    <section ref={screen} className="intro-screen" aria-label="The King of Professional Welding">
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-orbit" aria-hidden="true" />
      <div className="intro-content" aria-hidden="true">
        <p className="intro-kicker">KATY, TEXAS <span>CRAFTED IN METAL</span></p>
        <div className="intro-mark">
          <Image src="/images/logo.png" width={300} height={274} alt="" priority />
          <span className="intro-halo" />
        </div>
        <p className="intro-title">THE KING OF<span>PROFESSIONAL <em>WELDING</em></span></p>
        <div className="intro-weld"><i className="intro-seam" /><i className="intro-arc" /><b /><b /><b /><b /><b /><b /></div>
        <p className="intro-signature">STRONG WELDS. BUILT TO LAST.</p>
      </div>
      <span className="intro-caption" aria-hidden="true">MIG & TIG / ALUMINUM / STAINLESS STEEL</span>
      <button className="intro-skip" type="button" onClick={skip}>{lang === 'en' ? 'SKIP INTRO' : 'OMITIR'}</button>
    </section>
  );
}
