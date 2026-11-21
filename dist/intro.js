// A short brand sequence, not a simulated network progress bar. It never waits on
// fonts, analytics or slow external assets. CSS and an independent head timer fail open.
(() => {
  const root = document.documentElement;
  const screen = document.querySelector('#brand-intro');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!root.classList.contains('intro-pending') || preference.matches) {
    screen.hidden = true;
    root.classList.remove('intro-pending');
    return;
  }
  let finished = false;
  let exitTimer;
  function finish(immediate = false) {
    if (finished) return;
    finished = true;
    clearTimeout(exitTimer);
    screen.classList.add('is-leaving');
    // Start page fades with the outgoing intro so the reveal feels continuous.
    document.dispatchEvent(new Event('intro:complete'));
    setTimeout(() => {
      root.classList.remove('intro-pending');
      screen.hidden = true;
    }, immediate ? 0 : 680);
  }
  const elapsed = performance.now() - (window.__introStart || 0);
  exitTimer = setTimeout(() => finish(), Math.max(0, 2350 - elapsed));
  document.querySelector('#intro-skip').addEventListener('click', () => finish(true));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') finish(true);
  });
  document.addEventListener('focusin', event => {
    if (!screen.contains(event.target)) finish(true);
  });
  preference.addEventListener('change', event => { if (event.matches) finish(true); });
  window.addEventListener('pageshow', event => { if (event.persisted) finish(true); });
})();
