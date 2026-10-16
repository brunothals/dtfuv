const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
assert(!/glitter|metaliz|metálic|metalic|foil|folha de ouro/i.test(html));
for (const match of html.matchAll(/(?:src|href)="(assets\/[^"?]+)"/g)) assert(fs.existsSync(match[1]), match[1]);
const storage = () => { const data = new Map(); return { getItem: k => data.get(k) || null, setItem: (k,v) => data.set(k,v) }; };
const links = [...html.matchAll(/<a\b[^>]*(?:id="wa-[^"]+"|data-sku="[^"]+")[^>]*>/g)].map(([tag]) => ({ tagName: 'A', dataset: {sku: /data-sku="([^"]+)"/.exec(tag)?.[1], campaign: /data-campaign="([^"]+)"/.exec(tag)?.[1]}, addEventListener(event, fn) { this.click = fn; } }));
function run(savedConsent) {
  const localStorage = storage();
  if (savedConsent) localStorage.setItem('dtf-consent', savedConsent);
  const scripts = [], banner = {}, buttons = ['denied','granted'].map(value => ({dataset:{consent:value},addEventListener(event,fn){this.click=fn;}}));
  const context = { localStorage, sessionStorage: storage(), location: {search:'?utm_source=meta&utm_campaign=teste&utm_content=arte', reload(){}}, URLSearchParams, URL, document: {head:{append:s=>scripts.push(s)},createElement:()=>({}),getElementById:id=>id==='cookie-banner'?banner:{addEventListener(){}},querySelectorAll:selector=>selector==='[data-consent]'?buttons:links} };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('config.js','utf8'),context);
  vm.runInContext(fs.readFileSync('landing.js','utf8'),context);
  return {context,scripts,banner,buttons};
}
const initial = run();
assert.equal(initial.scripts.length,0);
assert.equal(initial.banner.hidden,false);
assert(links.length >= 10);
for(const link of links) {
  const campaign = link.dataset.campaign || 'teste';
  assert(new URL(link.href).searchParams.get('text').includes(`[ref: meta-${campaign}-arte]`));
}
assert(html.includes('Cartelas pequenas'));
assert(html.includes('2–3,5 cm') && html.includes('10–15 cm'));
const smallPosition = html.indexOf('id="cartelas-pequenas"');
const largePosition = html.search(/folha grande/i);
assert(smallPosition >= 0 && (largePosition < 0 || smallPosition < largePosition));
const natal = links.find(link => link.dataset.sku === 'natal-mesa');
assert(natal);
assert.equal(new URL(natal.href).searchParams.get('utm_campaign'), 'natal2026');
natal.click();
assert.equal(initial.context.fbq, undefined);

initial.buttons[1].click();
assert.equal(initial.scripts.length,1);
natal.click();
assert(initial.context.fbq.queue.some(args=>args[1]==='Lead'));
const denied = run('denied');
natal.click();
assert.equal(denied.scripts.length,0);
assert.equal(denied.context.fbq,undefined);
assert.equal(run('granted').scripts.length,1);
console.log('PASS: termos ativos, assets, CTAs + UTM, aceite/recusa e Lead.');
