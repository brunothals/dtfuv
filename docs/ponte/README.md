# Ponte de tarefas · Codex × Claude × Bruno

**Como usar**

1. Bruno (ou Grok Bot) cola orientações novas em `docs/ponte/codex/` ou `docs/ponte/claude/` com o próximo número livre.
2. Você pede ao **Codex**: *“Leia `docs/ponte/codex/00-ler-primeiro.md` e faça só a próxima tarefa `TODO`.”*
3. Você pede ao **Claude**: *“Leia `docs/ponte/claude/00-ler-primeiro.md` e faça só a próxima tarefa `TODO`.”*
4. Ao terminar, o agente marca a tarefa como `DONE` no próprio arquivo, atualiza `STATUS.md` e faz commit com prefixo `codex:` ou `claude:`.
5. **Não pule número.** Uma tarefa por vez. Sem merge em `main` sem Bruno.

**Branch desta ponte:** `feat/ponte-tarefas` (baseada em `feat/landing-efeito-dourado`).  
**Contexto de mercado:** `docs/contexto/`.

| Agente | Pasta | Prefixo de commit | Pode editar |
|--------|-------|-------------------|-------------|
| Codex | `docs/ponte/codex/` | `codex:` | HTML/CSS/JS, config, assets, DEPLOY, verify |
| Claude | `docs/ponte/claude/` | `claude:` | só `docs/copy/`, `docs/ads/`, e marcar STATUS da ponte |
| Bruno / Grok | raiz da ponte | `ponte:` | adicionar novas tarefas, prioridades |

**Regras de ouro do produto**
- Carro-chefe: **cartelas mini (2–3,5 cm)** e **10–15 cm**
- Público: senhoras · pratos, copos, taças, potes de tempero · Natal / Ano Novo
- Só **efeito dourado** (nunca metalizado/glitter/foil)
- Só superfície **rígida** (nunca tecido)
