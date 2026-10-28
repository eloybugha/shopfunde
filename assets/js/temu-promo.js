(function () {
  'use strict';

  // DITO LANG PAPALITAN ANG PROMO SA LAHAT NG CONNECTED PAGES.
  const PROMO = {
  enabled: true,
  url: 'https://www.tkqlhce.com/click-101879213-15623152',
  headline: 'Jetzt sparen: Angebote bei Temu',
  description: 'Entdecke aktuelle Angebote für Haushalt, Küche, Technik und mehr bei Temu.',
  code: '',
  terms: 'Preise, Rabatte und Verfügbarkeit können variieren. Es gelten die aktuellen Angebotsbedingungen bei Temu.',
  button: 'Jetzt Angebote sichern →'
};

  function init() {
    let promoURL = '';

    if (PROMO.enabled && PROMO.url.trim()) {
      try {
        const parsed = new URL(PROMO.url.trim());
        if (parsed.protocol === 'https:') {
          promoURL = parsed.href;
        }
      } catch (_) {
        promoURL = '';
      }
    }

    // Styles para sa promo card.
    if (!document.getElementById('temu-promo-style')) {
      const style = document.createElement('style');
      style.id = 'temu-promo-style';
      style.textContent = `
        .sf-promo-card{
          box-sizing:border-box;
          width:100%;
          flex:0 0 100%;
          margin:14px 0 0;
          padding:24px;
          color:#151c2c;
          background:linear-gradient(135deg,#fff8ee,#fff0d0);
          border:1px solid #f2cc94;
          border-left:5px solid #ff5a1f;
          border-radius:20px;
          box-shadow:0 10px 28px rgba(17,26,45,.07);
          text-align:left;
          overflow-wrap:anywhere;
        }
        .sf-promo-card[hidden]{display:none!important}
        .sf-promo-label{
          display:inline-block;
          margin:0 0 12px;
          padding:5px 10px;
          color:#9d350d;
          background:#ffe2bd;
          border-radius:8px;
          font-size:.73rem;
          font-weight:850;
          letter-spacing:.08em;
        }
        .sf-promo-title{
          margin:0 0 8px!important;
          color:#c83d09!important;
          font-size:clamp(1.55rem,4vw,2.1rem)!important;
          font-weight:900;
          line-height:1.15!important;
          letter-spacing:-.035em;
        }
        .sf-promo-description{
          margin:0 0 14px!important;
          color:#424b5b!important;
          font-size:1rem;
        }
        .sf-promo-code{
          display:inline-flex;
          flex-wrap:wrap;
          gap:8px;
          align-items:center;
          margin:0 0 14px;
          padding:10px 14px;
          color:#151c2c;
          background:#fff;
          border:1px dashed #d99c54;
          border-radius:10px;
          font-size:.95rem;
        }
        .sf-promo-code strong{
          color:#a7350c;
          font-size:1.05rem;
          letter-spacing:.04em;
        }
        .sf-promo-terms{
          margin:0 0 18px!important;
          color:#5b5144!important;
          font-size:.88rem;
          line-height:1.6;
        }
        .sf-promo-link{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          min-height:48px;
          padding:12px 18px;
          color:#fff!important;
          background:#ff5a1f;
          border-radius:12px;
          text-decoration:none;
          font-size:.95rem;
          font-weight:850;
          text-align:center;
        }
        .sf-promo-link:hover{background:#e9470c}
        .sf-promo-link:focus-visible{
          outline:3px solid #111a2d;
          outline-offset:4px;
        }
        .sf-promo-disclosure{
          margin:12px 0 0!important;
          color:#70665a!important;
          font-size:.75rem;
        }
        @media(max-width:620px){
          .sf-promo-card{padding:20px}
          .sf-promo-link{width:100%}
        }
      `;
      document.head.appendChild(style);
    }

    // Itago ang lumang hiwalay na terms.
    document.querySelectorAll('[data-promo-terms]').forEach(function (note) {
      note.hidden = true;
    });

    // Palitan ang promo button ng buong promo card.
    document.querySelectorAll('a[data-promo]').forEach(function (oldLink) {
      if (!promoURL) {
        oldLink.hidden = true;
        oldLink.removeAttribute('href');
        return;
      }

      const card = document.createElement('aside');
      card.className = 'sf-promo-card';
      card.setAttribute('aria-label', 'Temu-Gutschein');

      const label = document.createElement('span');
      label.className = 'sf-promo-label';
      label.textContent = '🎟 TEMU-GUTSCHEIN · WERBUNG';

      const title = document.createElement('h3');
      title.className = 'sf-promo-title';
      title.textContent = PROMO.headline;

      const description = document.createElement('p');
      description.className = 'sf-promo-description';
      description.textContent = PROMO.description;

      const codeBox = document.createElement('div');
      codeBox.className = 'sf-promo-code';
      codeBox.hidden = !PROMO.code;

      const codeLabel = document.createElement('span');
      codeLabel.textContent = 'Gutscheincode:';

      const code = document.createElement('strong');
      code.textContent = PROMO.code;
      codeBox.append(codeLabel, code);

      const terms = document.createElement('p');
      terms.className = 'sf-promo-terms';
      terms.textContent = PROMO.terms;

      const link = document.createElement('a');
      link.className = 'sf-promo-link';
      link.href = promoURL;
      link.target = '_blank';
      link.rel = 'nofollow sponsored noopener';
      link.dataset.affiliate = 'temu';
      link.dataset.linkType = 'promo';
      link.dataset.placement = oldLink.dataset.placement || 'promo-card';
      link.textContent = PROMO.button;

      const disclosure = document.createElement('p');
      disclosure.className = 'sf-promo-disclosure';
      disclosure.textContent =
        'Affiliate-Link · Es gelten die Aktionsbedingungen bei Temu.';

      card.append(
        label,
        title,
        description,
        codeBox,
        terms,
        link,
        disclosure
      );

      oldLink.replaceWith(card);
    });

    // Hiwalay ang item clicks at promo clicks.
    const product = document.querySelector('[data-product-slug]');
    const productSlug = product
      ? product.dataset.productSlug
      : location.pathname.split('/').pop().replace(/\.html$/, '');

    document.querySelectorAll('a[data-affiliate]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        if (link.hidden || !link.hasAttribute('href')) {
          event.preventDefault();
          return;
        }

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'affiliate_click', {
            affiliate_partner: 'temu',
            product_slug: productSlug,
            link_type: link.dataset.linkType || 'item',
            link_placement: link.dataset.placement || '',
            link_url: link.href,
            transport_type: 'beacon'
          });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
