# 02 · Seção Natal + destaque cartelas mini

**Status:** TODO

## Objetivo
Destacar na landing (ou em `natal/index.html`) o que vende agora: **cartelas mini** e **Natal na mesa** (pratos, copos, taças, temperos).

## Fazer
1. Seção ou página “Natal na mesa” com CTA WhatsApp `utm_campaign=natal2026` (respeitar consentimento Pixel já existente).
2. Bloco bem visível “Cartelas pequenas” (mini 2–3,5 cm + 10–15 cm) **acima** de qualquer menção a folha grande.
3. Textos podem ser placeholders / comentários `<!-- CLAUDE: docs/copy/campanha-natal-landing.md -->` se o Claude ainda não entregou.
4. Atualizar `PLACEHOLDERS.md` e `config.js` se precisar de novos campos.
5. Rodar / estender `verify-landing.cjs` (tarefa 03 pode completar o grep).

## Não fazer
Merge, deploy, DNS, inventar preços, editar copy longo em `docs/`.

## Done quando
Commit `codex: seção Natal + destaque cartelas mini` na branch da ponte + STATUS atualizado.
