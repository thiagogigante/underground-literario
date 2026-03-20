export function initMobileMenu($) {
  const toggle = $('.menu-toggle');
  const menu = $('.menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

