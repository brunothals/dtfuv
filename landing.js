(() => {
  'use strict';
  const config = window.LANDING_CONFIG;
  const read = (storage, key) => { try { return storage.getItem(key); } catch { return null; } };
  const write = (storage, key, value) => { try { storage.setItem(key, value); } catch {} };
  // Preserve first-visit attribution for this tab, including ad click identifiers.
  let attribution = {};
  try { attribution = JSON.parse(read(sessionStorage, 'dtf-attribution') || 'null'); } catch {}
  if (!attribution) {
    const params = new URLSearchParams(location.search);
    attribution = Object.fromEntries(['utm_source', 'utm_campaign', 'utm_content', 'utm_medium', 'utm_term', 'fbclid', 'gclid'].filter(key => params.has(key)).map(key => [key, params.get(key)]));
    write(sessionStorage, 'dtf-attribution', JSON.stringify(attribution));
  }
  function waLink(message = config.MESSAGE) {
    const ref = ['utm_source', 'utm_campaign', 'utm_content'].map(key => String(attribution[key] || 'direto').replace(/[\r\n\[\]]/g, '').slice(0, 150)).join('-');
    return `https://wa.me/${config.WHATSAPP}?text=${encodeURIComponent(`${message} [ref: ${ref}]`)}`;
  }
  window.waLink = waLink;
  const messages = {
    'faixa-avulso': 'Olá! Quero um adesivo avulso. Pode confirmar preço e prazo?',
    'faixa-cartela': 'Olá! Quero uma cartela personalizada. Pode confirmar preço e prazo?',
    'faixa-kit': 'Olá! Quero um kit completo para meu evento.',
    'faixa-atacado': 'Olá! Quero saber as condições de revenda.',
    'faixa-dourado': 'Olá! Quero Efeito dourado (cores que imitam o dourado). Pode me orientar?'
  };
  let consent = read(localStorage, 'dtf-consent');
  let loaded = false;
  function loadTracking() {
    if (loaded || consent !== 'granted') return;
    loaded = true;
    if (/^\d+$/.test(config.META_PIXEL_ID)) {
      window.fbq = window.fbq || function () { window.fbq.queue.push(arguments); };
      window.fbq.queue = window.fbq.queue || [];
      window.fbq.loaded = true;
      window.fbq.version = '2.0';
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.append(script);
      window.fbq('init', config.META_PIXEL_ID);
      window.fbq('consent', 'grant');
      window.fbq('track', 'PageView');
    }
    if (/^G-[A-Z0-9]+$/.test(config.GA4_ID)) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', config.GA4_ID);
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.GA4_ID}`;
      document.head.append(script);
    }
  }
  document.querySelectorAll('[id^="wa-"], a[data-sku]').forEach(link => {
    if (link.tagName !== 'A') return;
    link.href = waLink(messages[link.dataset.sku] || config.MESSAGE);
    link.addEventListener('click', () => {
      if (consent !== 'granted') return;
      if (window.fbq) window.fbq('track', 'Lead', { content_name: link.dataset.sku || 'geral' });
      if (window.gtag) window.gtag('event', 'generate_lead', { method: 'WhatsApp' });
    });
  });
  const banner = document.getElementById('cookie-banner');
  banner.hidden = consent === 'granted' || consent === 'denied';
  document.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => {
    consent = button.dataset.consent;
    write(localStorage, 'dtf-consent', consent);
    banner.hidden = true;
    if (consent === 'denied' && loaded) {
      if (window.fbq) window.fbq('consent', 'revoke');
      location.reload();
      return;
    }
    loadTracking();
  }));
  document.getElementById('privacy-settings').addEventListener('click', () => { banner.hidden = false; });
  loadTracking();
})();
