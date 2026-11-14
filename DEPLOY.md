# Preparacao de dominio (nao executada)

Esta branch e uma proposta. Nao fazer merge, executar deploy manual ou alterar DNS sem Bruno aprovar.
O workflow atual publica apenas pushes em main. Push nesta branch nao publica Pages.

## Antes do merge

Revisar PLACEHOLDERS.md, numero de atendimento, IDs, precos e textos legais.
Canonical e OG ja apontam ao dominio proposto. Publicar somente quando a troca de dominio estiver aprovada.
Nao foi adicionado CNAME para evitar ativacao acidental.

## Procedimento futuro, apos aprovacao

1. Em GitHub > brunothals/dtfuv > Settings > Pages, definir cartelasdtfuv.com.br como custom domain.
2. Conferir na documentacao oficial do GitHub Pages os registros DNS atuais antes de aplicar na Locaweb.
3. Na zona DNS da Locaweb, configurar apex conforme os registros A/AAAA oficiais de Pages. Configurar www como CNAME para brunothals.github.io (sem caminho /dtfuv).
4. Adicionar verificacao TXT de dominio recomendada pelo GitHub. Preservar registros de email existentes.
5. Aguardar verificacao DNS e certificado; habilitar Enforce HTTPS. Testar dominio raiz e www.
6. Somente com aprovacao, mergear o PR. O workflow em main fara a publicacao.

Links legais relativos: privacidade/ e termos/, compativeis com o subdiretorio /dtfuv/ e com dominio proprio.
Railway e a loja Next nao foram alterados.
