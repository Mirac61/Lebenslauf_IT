// Kurzhilfen
const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));

/* === Theme-Umschaltung === */
(() => {
  const KEY = 'theme';
  const knopf = $('#themaKnopf');
  const root = document.documentElement;
  const gespe = localStorage.getItem(KEY);
  const dunkel = matchMedia('(prefers-color-scheme: dark)').matches;
  const start = gespe || (dunkel ? 'dark' : 'light');

  root.setAttribute('data-theme', start);
  if (knopf) knopf.textContent = start === 'dark' ? '🔆' : '🌓';

  knopf?.addEventListener('click', () => {
    const neu = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', neu);
    localStorage.setItem(KEY, neu);
    knopf.textContent = neu === 'dark' ? '🔆' : '🌓';
  });
})();

/* === Projektfilter === */
(() => {
  const input = $('#projektFilter');
  const items = $$('.projekt');
  if (!input || !items.length) return;

  const norm = s => (s || '').toLowerCase();
  input.addEventListener('input', () => {
    const q = norm(input.value);
    items.forEach(el => {
      const text = norm(el.textContent);
      const tags = norm(el.dataset.tags);
      el.style.display = (!q || text.includes(q) || tags.includes(q)) ? '' : 'none';
    });
  });
})();

/* === Anzeigen / Ausblenden === */
(() => {
  $$('[data-toggle]').forEach(k => {
    k.addEventListener('click', () => {
      const ziel = $(k.dataset.toggle);
      if (!ziel) return;
      const versteckt = ziel.classList.toggle('versteckt');
      k.textContent = versteckt ? 'Anzeigen' : 'Ausblenden';
      k.setAttribute('aria-expanded', String(!versteckt));
    });
  });
})();