const roles = {
  socialbakers: {
    date: 'JUN 2014 — JUN 2018', title: 'Marketing Director', company: 'Socialbakers',
    description: 'Drove global demand, leads and product sales for a B2B SaaS marketing platform, now Emplifi. Owned digital marketing, paid acquisition and demand generation.',
    points: ['Increased product trials by 285%; MQLs contributed 75% of pipeline.', 'Grew online sales by 250% through Google Ads, with 400% ROI.', 'Led promotion for Engage Prague, generating $1.92M in event sales.']
  },
  codewise: {
    date: 'JUL 2018 — JAN 2020', title: 'GTM Product Marketing Lead', company: 'Codewise',
    description: 'Led a 15-person cross-functional team across growth, product and creative, building an acquisition engine for self-serve and sales-assisted AdTech products.',
    points: ['Grew digital revenue 57% and customer acquisition 55% year over year.', 'Increased sales-assisted pipeline by 90% year over year; inbound drove over 95% of total sales pipeline.', 'Built inbound funnels and lead-scoring models aligned with Sales and Product; online product sales grew 188% year over year.']
  },
  wargaming: {
    date: 'MAY 2020 — FEB 2022', title: 'Director of Growth & Product', company: 'Wargaming',
    description: 'Led hands-on regional marketing for World of Tanks across the UK and Nordics, combining digital, influencers, partnerships, TV and out-of-home campaigns.',
    points: ['Grew the UK & Ireland new player base by 9% month over month.', 'Developed a UK & Ireland performance optimization project that was adopted globally.', 'Grew in-game sales in Sweden by 320%, making it a top 10 revenue market.']
  },
  manifesto: {
    date: 'APR 2022 — SEP 2024', title: 'Global Head of Sales & Marketing', company: 'Manifesto Market',
    description: 'Led an eight-person team across marketing and sales for food halls in Prague and Berlin, with ownership of footfall, reservations, campaigns and marketing P&L.',
    points: ['Increased annual footfall by 30% and gross sales by 17% year over year.', 'Achieved 10× month-over-month growth in paid table reservations, reaching 2,000+ covers per month.', 'Led go-to-market for Berlin, the company’s first international expansion.']
  },
  marinade: {
    date: 'SEP 2024 — JUL 2025', title: 'Growth & Commercial Director', company: 'Marinade Finance',
    description: 'Built and led marketing for institutional and retail staking audiences. Developed positioning, messaging, media partnerships and product go-to-market plans.',
    points: ['Launched campaigns for three new products, delivering 1.5M SOL in new TVL ($230M).', 'Drove $38M in staked SOL from a $150K advertising budget.', 'Built an institution-focused website and secured partnerships with Blockworks, Messari and Flipside.']
  },
  gen: {
    date: 'OCT 2025 — AUG 2026', title: 'Sr. Product Marketing Manager (IC)', company: 'Gen Digital',
    description: 'Owned mobile product marketing and growth initiatives for Norton and Avast apps, connecting acquisition, adoption and retention with product value.',
    points: ['Launched Project Momentum, adding $24M in net revenue.', 'Led integration of AI-personalized customer journeys, adding $5.4M in net revenue.', 'Shaped in-app messaging and took features including Protection Score to market.']
  }
};

const companyButtons = document.querySelectorAll('[data-company]');
companyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const role = roles[button.dataset.company];
    if (!role) return;
    companyButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.getElementById('role-date').textContent = role.date;
    document.getElementById('role-title').textContent = role.title;
    document.getElementById('role-company').textContent = role.company;
    document.getElementById('role-description').textContent = role.description;
    const points = role.points.map(point => {
      const item = document.createElement('li');
      item.textContent = point;
      return item;
    });
    document.getElementById('role-points').replaceChildren(...points);
  });
});

const copyButton = document.getElementById('copy-email');
let statusTimeout;
copyButton.addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  clearTimeout(statusTimeout);
  try {
    await navigator.clipboard.writeText('hugocrispim.writer@gmail.com');
    status.textContent = 'Copied!';
  } catch {
    status.textContent = 'Select the email above to copy it.';
  }
  statusTimeout = setTimeout(() => { status.textContent = ''; }, 5000);
});
