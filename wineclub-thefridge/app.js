(() => {
  const menu = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); mobileNav.hidden = true; }
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); mobileNav.hidden = !open; });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menu.focus(); } });
  window.matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

  const fridges = [
    ['DRY THINGS', 'Clean, bright and easy to love. Think Grüner Veltliner, Riesling and a good conversation about which one to take home.', 'FAMILIAR STYLES. NEW FAVOURITES.'],
    ['ORANGE, BUT NOT INSANE', 'Skin-contact wines chosen for balance and drinkability. A friendly first step into orange, with a human nearby if you’re curious.', 'CURIOSITY, WITHOUT THE LECTURE.'],
    ['COLD REDS', 'Lighter, juicy reds that come alive with a little chill. Think Frankovka, Pinot Noir or Schiava, served for the wine rather than the rulebook.', 'RED WINE. A LITTLE COOLER.'],
    ['UNDER 700', 'An easy place to start. A rotating selection of bottles with a proposed takeaway price below 700 Kč, chosen for the pleasure they give.', 'GOOD BUYING. CLEAR PRICING.'],
    ['BUBBLES', 'Crémant, pét-nat and other sparkling discoveries. A good Tuesday is a perfectly acceptable occasion.', 'CELEBRATION OPTIONAL.'],
    ['IGGY’S SHELF', 'A small, considered selection for birthdays, generous gifts and the bottle you’ll talk about tomorrow. More special, never more intimidating.', 'THE OCCASIONAL EXTRAORDINARY.']
  ];
  const fridgeButtons = [...document.querySelectorAll('[data-fridge]')];
  function selectFridge(index, focus = false) {
    fridgeButtons.forEach((button, i) => { button.classList.toggle('active', i === index); button.setAttribute('aria-selected', String(i === index)); button.tabIndex = i === index ? 0 : -1; });
    const data = fridges[index];
    document.querySelector('#detail-number').textContent = `${String(index + 1).padStart(2, '0')} / ${data[0]}`;
    document.querySelector('#detail-copy').textContent = data[1];
    document.querySelector('#detail-note').textContent = data[2];
    document.querySelector('#fridge-detail').setAttribute('aria-labelledby', `fridge-${index}`);
    if (focus) { fridgeButtons[index].focus(); fridgeButtons[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' }); }
  }
  fridgeButtons.forEach((button, index) => button.addEventListener('click', () => selectFridge(index)));
  function keyboardTabs(buttons, select) { buttons.forEach((button, index) => button.addEventListener('keydown', e => { let next; if (e.key === 'ArrowRight') next = (index + 1) % buttons.length; if (e.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length; if (e.key === 'Home') next = 0; if (e.key === 'End') next = buttons.length - 1; if (next !== undefined) { e.preventDefault(); select(next, true); } })); }
  keyboardTabs(fridgeButtons, selectFridge);

  const slider = document.querySelector('#design-slider');
  slider.addEventListener('input', () => { slider.closest('.comparison').style.setProperty('--split', `${slider.value}%`); slider.setAttribute('aria-valuetext', `${slider.value}% sketch, ${100 - slider.value}% render`); });
  slider.setAttribute('aria-valuetext', '48% sketch, 52% render');

  const zones = {
    retail: 'A visible fridge wall, a legible entrance and a browsing route that stays clear of seated guests.',
    social: 'A communal table, comfortable banquette and vinyl corner. Flexible furniture for a glass, a conversation or a small tasting.',
    service: 'A compact service counter with space behind it for stock, prep and support. Washing, staff and WC provision need a measured feasibility study.'
  };
  document.querySelectorAll('[data-zone]').forEach(button => button.addEventListener('click', () => {
    const zone = button.dataset.zone;
    document.querySelectorAll('[data-zone]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    document.querySelectorAll('[data-plan-zone]').forEach(g => g.classList.toggle('is-selected', g.dataset.planZone === zone));
    document.querySelector('#zone-note').textContent = zones[zone];
  }));

  const partnerTabs = [...document.querySelectorAll('.partner-tabs [role="tab"]')];
  function selectPartner(index, focus = false) { partnerTabs.forEach((button, i) => { button.classList.toggle('active', i === index); button.setAttribute('aria-selected', String(i === index)); button.tabIndex = i === index ? 0 : -1; document.getElementById(button.getAttribute('aria-controls')).hidden = i !== index; }); if (focus) partnerTabs[index].focus(); }
  partnerTabs.forEach((button, index) => button.addEventListener('click', () => selectPartner(index)));
  keyboardTabs(partnerTabs, selectPartner);

  document.querySelector('#copy-link').addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    const url = 'https://hugo-crispim.github.io/wineclub-thefridge/';
    try { await navigator.clipboard.writeText(url); status.textContent = 'Concept link copied.'; }
    catch { status.textContent = url; }
  });
})();
