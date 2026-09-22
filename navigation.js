// Warm only the internal menu page the visitor is about to open.
const menu = document.querySelector('#quarto-header .navbar');
if (menu && !navigator.connection?.saveData) {
  const prefetched = new Set();
  const warmPage = (event) => {
    const link = event.target.closest('a[href]');
    if (!link || link.target || link.hasAttribute('download')) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || url.search || url.hash) return;
    if (url.pathname !== '/' && !url.pathname.endsWith('.html')) return;
    if (url.pathname === location.pathname || prefetched.has(url.href)) return;
    prefetched.add(url.href);
    // Use the HTTP cache; no page scripts, videos or analytics are executed.
    fetch(url.href, { credentials: 'same-origin', priority: 'low' })
      .then((response) => {
        if (!response.ok) throw new Error('Prefetch failed');
        return response.arrayBuffer();
      })
      .catch(() => prefetched.delete(url.href));
  };
  for (const type of ['pointerover', 'focusin', 'touchstart']) {
    menu.addEventListener(type, warmPage, { passive: true });
  }
}
