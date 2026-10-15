(() => {
  let saved;
  try { saved = localStorage.getItem('option-theme'); } catch (_) {}
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const apply = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.textContent = theme === 'dark' ? 'حالت روشن' : 'حالت تاریک';
      button.setAttribute('aria-label', theme === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک');
    });
  };
  apply(['light', 'dark'].includes(saved) ? saved : preferred);
  document.addEventListener('DOMContentLoaded', () => {
    apply(document.documentElement.dataset.theme);
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        apply(theme);
        try { localStorage.setItem('option-theme', theme); } catch (_) {}
      });
    });
  });
  window.addEventListener('storage', (event) => {
    if (event.key === 'option-theme') apply(['light', 'dark'].includes(event.newValue) ? event.newValue : preferred);
  });
})();
