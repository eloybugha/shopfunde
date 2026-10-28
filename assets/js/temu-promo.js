(function () {
  'use strict';

  /*
   * IISANG PROMO SETTING PARA SA LAHAT NG PRODUCT PAGES.
   *
   * Bagong promo: palitan ang url at terms.
   * Walang promo: enabled: false o gawing blanko ang url.
   */
  const PROMO = {
    enabled: true,
    url: 'https://www.dpbolvw.net/click-101586981-15850975',
    text: 'Temu-Angebote entdecken',
    terms: ''
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

    document.querySelectorAll('[data-promo]').forEach(function (link) {
      if (!promoURL) {
        link.hidden = true;
        link.removeAttribute('href');
        link.setAttribute('aria-disabled', 'true');
        return;
      }

      link.href = promoURL;
      link.target = '_blank';
      link.rel = 'nofollow sponsored noopener';
      link.textContent = PROMO.text;
      link.removeAttribute('aria-disabled');
      link.hidden = false;
    });

    document.querySelectorAll('[data-promo-terms]').forEach(function (note) {
      note.textContent = promoURL ? PROMO.terms : '';
      note.hidden = !promoURL || !PROMO.terms.trim();
    });

    const product = document.querySelector('[data-product-slug]');
    const productSlug = product
      ? product.dataset.productSlug
      : location.pathname.split('/').pop().replace(/\.html$/, '');

    document.querySelectorAll('a[data-affiliate]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        if (
          link.hidden ||
          link.getAttribute('aria-disabled') === 'true' ||
          !link.hasAttribute('href')
        ) {
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
