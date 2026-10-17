/*
 * Configuração central da landing. Tudo que estiver entre [COLCHETES] é
 * PLACEHOLDER: o Bruno precisa preencher antes de rodar anúncios.
 * Veja PLACEHOLDERS.md.
 */
window.LANDING_CONFIG = Object.freeze({
  // Só números, com DDI 55 + DDD. Ex.: '5519999999999'.
  // Enquanto for placeholder, o botão abre o WhatsApp para escolher o contato.
  WHATSAPP: '[WHATSAPP]',
  MESSAGE: 'Olá! Vim pelo site Cartelas DTF UV e quero montar minha cartela.',

  // Pixels: só carregam depois que a visitante aceita os cookies.
  // META_PIXEL_ID herdado do site atual (main) — Bruno confirma se é o pixel certo.
  META_PIXEL_ID: '994830476341510',
  TIKTOK_PIXEL_ID: '[PIXEL_ID_TIKTOK]',
  GA4_ID: '[GA4_ID]',

  INSTAGRAM: '[INSTAGRAM]',
  CANONICAL: 'https://cartelasdtfuv.com.br',

  // Preços por quantidade de artes. Nunca inventar: deixar o placeholder até o Bruno definir.
  PRECOS: {
    10: '[PRECO_10_ARTES]',
    15: '[PRECO_15_ARTES]',
    20: '[PRECO_20_ARTES]',
    30: '[PRECO_30_ARTES]'
  }
});
