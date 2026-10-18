# Placeholders para o Bruno preencher

Tudo que aparece em **[COLCHETES]** no site é placeholder e aparece com fundo amarelo tracejado na página.
Nada disso foi inventado. Preencha antes de ligar os anúncios.

## config.js (um lugar só, vale para o site inteiro)
| Campo | O que colocar |
|---|---|
| `WHATSAPP` `[WHATSAPP]` | Número só com dígitos: 55 + DDD + número. Enquanto for placeholder, os botões abrem o WhatsApp para escolher o contato. (O site antigo e o PR #1 usavam 5519997439291. Confirme se é esse.) |
| `PRECOS[10]` `[PRECO_10_ARTES]` | Preço da cartela com 10 artes |
| `PRECOS[15]` `[PRECO_15_ARTES]` | Preço da cartela com 15 artes |
| `PRECOS[20]` `[PRECO_20_ARTES]` | Preço da cartela com 20 artes |
| `PRECOS[30]` `[PRECO_30_ARTES]` | Preço da cartela com 30 artes |
| `META_PIXEL_ID` | Herdado do site atual: 994830476341510. Confirme se é o pixel da conta de anúncios certa. |
| `TIKTOK_PIXEL_ID` `[PIXEL_ID_TIKTOK]` | ID do pixel do TikTok Ads |
| `GA4_ID` `[GA4_ID]` | Opcional: G-XXXXXXX |

## Texto no index.html
| Placeholder | Onde |
|---|---|
| `[DATA_LIMITE_NATAL]` | Faixa do topo: data limite para pedir e receber antes do Natal |
| `[TAMANHO_ARTE]` | Tamanho de cada arte (seção "Por quantidade" e FAQ) |
| `[FORMAS_PAGAMENTO / PIX]` | Passo 3 e FAQ |
| `[PRAZO]`, `[FRETE]` | FAQ e termos |
| `[CUIDADOS_LAVAGEM]` | FAQ: como cuidar da peça |
| `[MIN_REVENDA]`, `[FAIXA_2]`, `[FAIXA_3]`, `[PRECO_REVENDA_1..3]` | Tabela de revenda |
| `[INSTAGRAM]`, `[RAZAO_SOCIAL / CNPJ]`, `[CIDADE_UF]` | Rodapé, privacidade e termos |
| `[POLITICA_TROCAS]` | termos/index.html |
| `[VIDEO_APLICACAO]` | Comentário na seção "Como aplicar": espaço para um vídeo REAL curto de aplicação |
| `[FOTO_RELEVO]` (opcional) | A foto de relevo atual é real, mas de um rótulo rosa/dourado de cliente. O ideal é trocar `img/fotos/alto-relevo-verniz` por um close de uma arte em **Efeito dourado com alto relevo em verniz**, de lado, com luz batendo |

## Imagens das cartelas
As fotos do catálogo são recortes dos arquivos reais de impressão do Drive (nada gerado por IA):

| Arquivo em img/cartelas | Origem no Drive |
|---|---|
| natal-laco-bico-de-papagaio | 3835.png |
| natal-raminhos-pinheiro | 3835.png |
| natal-arvore-sinos-dourado | 3836.png |
| natal-feliz-natal-traco | 3827.png |
| natal-bichinhos-traco | 3827.png |
| ano-novo-estrelas-dourado | 3825.png |
| ano-novo-brilhos | 3832.png |
| cozinha-temperos | 3838.png (só as linhas com nomes genéricos de temperos) |
| cozinha-agua-quente-leite | 3819.png |

Ficaram de fora as artes com marca ou nome de clientes (logos, nomes próprios, times, monogramas de casamento).
O ideal é trocar por **fotos reais das cartelas cortadas** e de peças aplicadas assim que houver.

## Fotos reais (img/fotos)
Todas tiradas de vídeos e fotos reais do Drive (frames extraídos com ffmpeg). Nada gerado por IA.

| Arquivo | Origem | Onde aparece |
|---|---|---|
| aplicando-efeito-dourado | vídeo aplicacao-dourado-editado.mp4, frame ~21 s | Hero (foto principal) |
| caneca-efeito-dourado | mesmo vídeo, frame ~23,5 s | Seção Efeito dourado |
| alto-relevo-verniz | foto IMG_1257.HEIC (recorte, sem o nome da cliente) | Hero e seção Efeito dourado |
| retirando-filme | vídeo aplicacao/IMG_8181.mp4, frame ~16 s | Como aplicar |
| pote-natal-aplicado | vídeo aplicacao/IMG_8722.mp4, frame ~20,5 s | Onde aplicar |

O vídeo do Efeito dourado tem só 576x1024. Uma foto em resolução maior de uma peça dourada aplicada deixaria o hero mais nítido.
