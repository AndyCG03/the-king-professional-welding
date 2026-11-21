let language = 'en';
const languageButton = document.querySelector('#language');
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.querySelectorAll('[data-en]').forEach(el => { el.innerHTML = el.dataset[next]; });
  document.querySelectorAll('[data-placeholder-en]').forEach(el => { el.placeholder = el.dataset[next === 'en' ? 'placeholderEn' : 'placeholderEs']; });
  languageButton.textContent = next === 'en' ? 'ES' : 'EN';
  languageButton.setAttribute('aria-label', next === 'en' ? 'Cambiar a español' : 'Switch to English');
  document.querySelector('#form-status').textContent = '';
}
languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'es' : 'en'));
const menu = document.querySelector('#menu');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get('name')).trim();
  const detail = String(data.get('message')).trim();
  if (!name || !detail) { document.querySelector('#form-status').textContent = language === 'es' ? 'Escribe tu nombre y los detalles del proyecto.' : 'Enter your name and project details.'; return; }
  const message = language === 'es' ? `Hola, soy ${name}. Me interesa: ${data.get('service')}.\n\n${detail}` : `Hello, my name is ${name}. I’m interested in: ${data.get('service')}.\n\n${detail}`;
  const destination = `https://wa.me/18327327616?text=${encodeURIComponent(message)}`;
  window.open(destination, '_blank', 'noopener,noreferrer');
  const status = document.querySelector('#form-status');
  status.replaceChildren();
  const link = document.createElement('a'); link.href = destination; link.target = '_blank'; link.rel = 'noopener noreferrer';
  link.textContent = language === 'es' ? 'Abrir WhatsApp si no se abrió automáticamente.' : 'Open WhatsApp if it did not open automatically.';
  status.append(link);
});

// Progressive enhancement: content stays visible without JavaScript, IntersectionObserver,
// or when the visitor requests reduced motion. No scroll handlers or animation library.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;
function initFades() {
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;
  const groups = [
    [...document.querySelectorAll('.hero-copy > *, .hero-visual')],
    [...document.querySelectorAll('.section-head, .service')],
    [...document.querySelectorAll('.craft-grid > *, .process > .eyebrow, .process > h2, .steps > article')],
    [...document.querySelectorAll('.contact-grid > *')],
  ];
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08});
  groups.forEach(elements => elements.forEach((element, index) => {
    element.style.setProperty('--fade-delay', `${Math.min(index % 3, 2) * 80}ms`);
    element.classList.add('fade-reveal');
    revealObserver.observe(element);
  }));
}
motionPreference.addEventListener('change', event => {
  if (event.matches) {
    revealObserver?.disconnect();
    document.querySelectorAll('.fade-reveal').forEach(el => el.classList.add('is-visible'));
  }
});
if (document.documentElement.classList.contains('intro-pending') && !document.querySelector('#brand-intro').classList.contains('is-leaving')) {
  document.addEventListener('intro:complete', initFades, {once: true});
} else {
  initFades();
}

// A service choice carries through to the inquiry instead of making visitors select twice.
document.querySelectorAll('.service').forEach((card, index) => {
  const link = document.createElement('a');
  link.className = 'service-link';
  link.href = '#contact';
  link.dataset.en = 'DISCUSS THIS SERVICE';
  link.dataset.es = 'COTIZAR ESTE SERVICIO';
  link.textContent = link.dataset[language];
  link.addEventListener('click', () => {
    document.querySelector('#service').selectedIndex = index;
  });
  card.append(link);
});

const progress = document.createElement('div');
progress.className = 'reading-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.prepend(progress);
let progressScheduled = false;
function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0})`;
  progressScheduled = false;
}
function requestProgressUpdate() {
  if (!progressScheduled) { progressScheduled = true; requestAnimationFrame(updateProgress); }
}
window.addEventListener('scroll', requestProgressUpdate, {passive: true});
window.addEventListener('resize', requestProgressUpdate, {passive: true});
updateProgress();

if ('IntersectionObserver' in window) {
  const sectionRatios = new Map();
  const sections = document.querySelectorAll('#home, #trailers, #services, #projects, #contact');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => sectionRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0));
    const active = [...sectionRatios].filter(([,ratio]) => ratio > 0).sort((a,b) => b[1] - a[1])[0]?.[0];
    navigation.querySelectorAll('a').forEach(link => {
      const selected = link.hash === `#${active}`;
      link.classList.toggle('is-active', selected);
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, {rootMargin: '-18% 0px -35% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]});
  sections.forEach(section => sectionObserver.observe(section));
}

const heroFigure = document.querySelector('.hero-visual');
const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
function resetHeroPointer() {
  heroFigure.style.removeProperty('--pointer-x');
  heroFigure.style.removeProperty('--pointer-y');
}
heroFigure.addEventListener('pointermove', event => {
  if (motionPreference.matches || !precisePointer.matches) return;
  const bounds = heroFigure.getBoundingClientRect();
  const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
  const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
  heroFigure.style.setProperty('--pointer-x', `${x * 5}px`);
  heroFigure.style.setProperty('--pointer-y', `${y * 5}px`);
});
heroFigure.addEventListener('pointerleave', resetHeroPointer);
motionPreference.addEventListener('change', resetHeroPointer);
