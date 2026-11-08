(() => {
  const toggle = document.querySelector('.experience-menu-toggle');
  const panel = document.querySelector('#experience-mobile-nav');
  const header = document.querySelector('header.nav');
  if (!toggle || !panel || !header) return;

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
  function closeMenu(restoreFocus = false) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open experience navigation');
    panel.hidden = true;
    if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => {
    const open = !isOpen();
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close experience navigation' : 'Open experience navigation');
    panel.hidden = !open;
  });

  const navigationLinks = [...panel.querySelectorAll('a'), header.querySelector('.brand')].filter(Boolean);
  navigationLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
      if (link.hash && link.origin === location.origin && link.pathname === location.pathname) {
        const target = document.getElementById(link.hash.slice(1));
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isOpen()) {
      event.preventDefault();
      closeMenu(true);
    }
  });

  const outsideMenu = target => !header.contains(target) && !panel.contains(target);
  document.addEventListener('pointerdown', event => {
    if (isOpen() && outsideMenu(event.target)) closeMenu();
  });
  document.addEventListener('focusin', event => {
    if (isOpen() && outsideMenu(event.target)) closeMenu();
  });

  window.matchMedia('(min-width: 1001px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });
})();
