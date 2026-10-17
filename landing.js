/* Landing Cartelas DTF UV — WhatsApp com origem (UTM), catálogo por quantidade de artes,
 * consentimento LGPD e pixels (Meta/TikTok/GA4) só após aceite.
 * Base: PR #1 (Codex) — atribuição de visita + waLink + consentimento. */
(() => {
  'use strict';
  const config = window.LANDING_CONFIG || {};
  const isPlaceholder = v => !v || /^\[.*\]$/.test(String(v));
  const read = (s, k) => { try { return s.getItem(k); } catch { return null; } };
  const write = (s, k, v) => { try { s.setItem(k, v); } catch {} };

  /* 1. Atribuição: guarda UTMs / fbclid / ttclid da primeira página da visita. */
  const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'ttclid', 'gclid'];
  let attribution = null;
  try { attribution = JSON.parse(read(sessionStorage, 'dtf-attribution') || 'null'); } catch {}
  if (!attribution) {
    const params = new URLSearchParams(location.search);
    attribution = Object.fromEntries(KEYS.filter(k => params.has(k)).map(k => [k, params.get(k)]));
    write(sessionStorage, 'dtf-attribution', JSON.stringify(attribution));
  }
  const clean = v => String(v || 'direto').replace(/[\r\n\[\]]/g, '').slice(0, 60);

  /* 2. Link do WhatsApp com a origem no fim da mensagem (o wa.me não carrega UTM). */
  function waLink(message) {
    const msg = message || config.MESSAGE;
    const ref = [attribution.utm_source, attribution.utm_campaign, attribution.utm_content].map(clean).join('-');
    const text = encodeURIComponent(`${msg}\n\n[ref: ${ref}]`);
    const phone = String(config.WHATSAPP || '').replace(/\D/g, '');
    return isPlaceholder(config.WHATSAPP) || !phone
      ? `https://wa.me/?text=${text}`
      : `https://wa.me/${phone}?text=${text}`;
  }
  window.waLink = waLink;

  let consent = read(localStorage, 'dtf-consent');
  function trackLead(name) {
    if (consent !== 'granted') return;
    if (window.fbq) window.fbq('track', 'Lead', { content_name: name });
    if (window.ttq) window.ttq.track('Contact', { content_name: name });
    if (window.gtag) window.gtag('event', 'generate_lead', { method: 'WhatsApp', item_name: name });
  }

  document.querySelectorAll('a[data-wa]').forEach(a => {
    a.href = waLink(a.dataset.waMsg);
    a.target = '_blank';
    a.rel = 'noopener';
    a.addEventListener('click', () => trackLead(a.dataset.wa));
  });

  /* 3. Catálogo: escolher quantidade de artes atualiza preço e mensagem. */
  const price = qtd => (config.PRECOS || {})[qtd] || `[PRECO_${qtd}_ARTES]`;
  document.querySelectorAll('.card[data-nome]').forEach(card => {
    const nome = card.dataset.nome;
    const priceEl = card.querySelector('.card-price');
    const btn = card.querySelector('.card-cta');
    const chips = card.querySelectorAll('.qtd button');
    function select(qtd) {
      chips.forEach(c => c.setAttribute('aria-pressed', String(c.dataset.qtd === qtd)));
      priceEl.textContent = price(qtd);
      priceEl.classList.toggle('ph', isPlaceholder(price(qtd)));
      btn.href = waLink(`Olá! Quero a cartela "${nome}" com ${qtd} artes. Pode me passar o valor e o prazo?`);
      btn.dataset.wa = `${card.dataset.id}-${qtd}`;
    }
    chips.forEach(c => c.addEventListener('click', () => select(c.dataset.qtd)));
    btn.target = '_blank';
    btn.rel = 'noopener';
    btn.addEventListener('click', () => trackLead(btn.dataset.wa));
    select(card.dataset.qtdPadrao || '20');
  });

  /* Tabela de preços por quantidade. */
  document.querySelectorAll('[data-preco]').forEach(el => {
    el.textContent = price(el.dataset.preco);
    el.classList.toggle('ph', isPlaceholder(price(el.dataset.preco)));
  });

  /* 4. Filtro do catálogo. */
  const filters = document.querySelectorAll('.filters button');
  filters.forEach(f => f.addEventListener('click', () => {
    filters.forEach(x => x.setAttribute('aria-pressed', String(x === f)));
    const cat = f.dataset.filter;
    document.querySelectorAll('.card[data-cat]').forEach(card => {
      card.hidden = cat !== 'todas' && !card.dataset.cat.split(' ').includes(cat);
    });
  }));

  /* 5. Barra fixa de WhatsApp no celular aparece depois do topo. */
  const bar = document.querySelector('.sticky-cta');
  const hero = document.querySelector('.hero');
  if (bar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => bar.classList.toggle('show', !e.isIntersecting)).observe(hero);
  }

  /* 6. Pixels só depois do aceite (LGPD). */
  let loaded = false;
  function addScript(src) { const s = document.createElement('script'); s.async = true; s.src = src; document.head.append(s); }
  function loadTracking() {
    if (loaded || consent !== 'granted') return;
    loaded = true;
    if (/^\d+$/.test(config.META_PIXEL_ID || '')) {
      /* Meta Pixel (equivalente ao snippet oficial comentado no <head>) */
      const f = window.fbq = function () { f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments); };
      if (!window._fbq) window._fbq = f;
      f.push = f; f.loaded = true; f.version = '2.0'; f.queue = [];
      addScript('https://connect.facebook.net/en_US/fbevents.js');
      f('init', config.META_PIXEL_ID);
      f('track', 'PageView');
    }
    if (/^[A-Z0-9]{10,}$/.test(config.TIKTOK_PIXEL_ID || '')) {
      /* TikTok Pixel (equivalente ao snippet oficial comentado no <head>) */
      const ttq = window.ttq = window.ttq || [];
      ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie'];
      ttq.setAndDefer = (t, e) => { t[e] = function () { t.push([e].concat([].slice.call(arguments))); }; };
      ttq.methods.forEach(m => ttq.setAndDefer(ttq, m));
      addScript(`https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${config.TIKTOK_PIXEL_ID}&lib=ttq`);
      ttq.page();
    }
    if (/^G-[A-Z0-9]+$/.test(config.GA4_ID || '')) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', config.GA4_ID);
      addScript(`https://www.googletagmanager.com/gtag/js?id=${config.GA4_ID}`);
    }
  }

  const banner = document.getElementById('cookie-banner');
  if (banner) banner.hidden = consent === 'granted' || consent === 'denied';
  document.querySelectorAll('[data-consent]').forEach(b => b.addEventListener('click', () => {
    consent = b.dataset.consent;
    write(localStorage, 'dtf-consent', consent);
    banner.hidden = true;
    if (consent === 'denied' && loaded) { location.reload(); return; }
    loadTracking();
  }));
  const pref = document.getElementById('privacy-settings');
  if (pref) pref.addEventListener('click', () => { banner.hidden = false; });
  loadTracking();

  const y = document.getElementById('ano');
  if (y) y.textContent = new Date().getFullYear();
})();
