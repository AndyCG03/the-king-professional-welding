'use client';

import {useEffect} from 'react';

/**
 * Progressive enhancement: one-time fade-ins and a reading-progress bar.
 * Content stays visible without JavaScript or with prefers-reduced-motion.
 */
export function Motion({selector}: {selector: string}) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    if (!reduce.matches && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer?.unobserve(entry.target);
        });
      }, {threshold: 0.08});
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        if (element.getBoundingClientRect().top < window.innerHeight) return; // already on screen: no flash
        element.style.setProperty('--fade-delay', `${(index % 3) * 80}ms`);
        element.classList.add('fade-reveal');
        observer?.observe(element);
      });
    }
    const showAll = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      observer?.disconnect();
      document.querySelectorAll('.fade-reveal').forEach(element => element.classList.add('is-visible'));
    };
    reduce.addEventListener('change', showAll);

    const bar = document.querySelector<HTMLElement>('.reading-progress');
    let scheduled = false;
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar?.style.setProperty('transform', `scaleX(${total > 0 ? Math.min(1, window.scrollY / total) : 0})`);
      document.documentElement.classList.toggle('scrolled', window.scrollY > 480);
      scheduled = false;
    };
    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    update();
    return () => {
      observer?.disconnect();
      reduce.removeEventListener('change', showAll);
      window.removeEventListener('scroll', onScroll);
    };
  }, [selector]);
  return <div className="reading-progress" aria-hidden="true" />;
}
