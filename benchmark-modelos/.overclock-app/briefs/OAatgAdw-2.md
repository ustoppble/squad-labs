---
id: OAatgAdw-2
missionId: OAatgAdwMb7K
titulo: Você vai criar a página `modelos/grok-4-5.html` do site de benchmark da Overc...
status: aberto
---

Você vai criar a página `modelos/grok-4-5.html` do site de benchmark da Overclock.

## ANTES DE ESCREVER QUALQUER COISA
1. Leia `docs/research/gpt-5-6-dossier.md` INTEIRO — a seção 6 é sobre o Grok 4.5, mas leia o doc todo (as seções 7, 8 e 9 têm preços de referência, fórmula de custo e a matriz de testes).
2. Leia `modelos/fable-5.html` COMPLETO. É o padrão visual e editorial exato que você deve seguir.
3. Leia `assets/site.css` pra conhecer as classes disponíveis.

## REGRA ANTI-ALUCINAÇÃO (crítica)
O dossiê marca cada fato como ✅ confirmado, ⚠️ reportado ou ❌ não verificado.
- ✅ pode afirmar direto.
- ⚠️ escreva como "reportado" / "segundo fontes secundárias".
- ❌ NÃO ESCREVA.
O dossiê tem POUCO sobre o Grok comparado ao GPT-5.6. Isso é esperado. Faça uma página honesta e mais curta em vez de encher com invenção. Se não sabe, escreva "não divulgado". Zero exceção.

## O QUE CONSTRUIR
Página do Grok 4.5 (xAI), em português do Brasil, mesmo tom do fable-5.html: direto, explicando pro leigo, sem hype.

Estrutura (espelhe o fable-5.html, adaptando o tamanho ao que temos de fato):
- nav idêntico ao do fable-5.html com "Modelos" ativo. Links: Home (../index.html), Modelos (../modelos.html), Benchmark (../benchmark.html), Fable vs Opus (../benchmark-fable-vs-opus.html), GPT-5.6 (../benchmark-gpt-5-6.html).
- eyebrow + h1 "Grok 4.5" + lede: é o modelo classe-Opus da xAI, lançado 08/07/2026, e é o MAIS BARATO do topo de linha ($2/$6 — o Sol do GPT-5.6 cobra 5× a saída dele).
- spec-grid: preço ($2 entrada / $6 saída; entrada cacheada $0,50), contexto (500k), arquitetura de SKU única com reasoning_effort, lançamento 08/07/2026.
- Seção "A escolha de arquitetura: uma SKU só" — enquanto OpenAI parte em 3 modelos (Sol/Terra/Luna) e a Anthropic em famílias, a xAI entrega `grok-4.5` única com `reasoning_effort` low/medium/high (high é o padrão). Você troca profundidade por velocidade num parâmetro, não trocando de modelo. Explique o trade-off pro leitor.
- Seção "O custo escondido: ferramentas server-side" — importante e pouco falado. Web search, X search e code execution custam $5 por 1.000 chamadas CADA, cobrados POR FORA dos tokens. Busca em anexo $10/1k. Collections/RAG $2,50/1k. Num agente que busca muito, isso pode passar o custo de token. Faça a conta pro leitor.
- Seção "Onde ele se posiciona" — tabela rt com o score composto reportado do Artificial Analysis (Grok 4.5 = 54, Fable 5 = 60, Opus 4.8 = 56, GPT-5.5 = 55) e a posição #4. MARCAR como reportado (⚠️), não como fato oficial. Nota: vence em uso agêntico de ferramentas e é o mais rápido do topo — boa escolha pra trabalho agêntico sensível a custo.
- Seção "Preço lado a lado" — tabela rt comparando saída por 1M: Grok 4.5 $6 · Sonnet 5 $10 · Opus 4.8 $25 · GPT-5.6 Sol $30 · Fable 5 $50. Deixe claro visualmente que o Grok é o mais barato do topo.
- Seção "Nossos números no benchmark" — os 4 testes (001 solar, 002 Apple, 003 física, 004 FPS), todas as células "a rodar". Nota: o provider grok-cli no Overclock está habilitado mas com a lista de modelos vazia, então as runs entram quando o provider carregar. Link pra ../benchmark-gpt-5-6.html (rodada 3 é Sol vs Fable 5 vs Grok 4.5).
- Seção "Conclusão" com ul.insight — bullets honestos: mais barato do topo; SKU única é simplicidade real; o custo de ferramenta server-side é a pegadinha; score composto abaixo do Fable mas vence em agêntico; veredito = a medir.
- footer com as fontes de Grok (OpenRouter, Artificial Analysis — estão na seção 11 do dossiê).

## RESTRIÇÕES
- Arquivo único `modelos/grok-4-5.html`. Não crie outros arquivos. Não toque em nenhum arquivo existente.
- Use SOMENTE classes que já existem em assets/site.css. Não invente CSS novo nem edite o site.css. Estilo inline pontual é ok, como o fable-5.html faz.
- Português do Brasil com acentuação correta e completa.
- Números sempre em algarismo.
- Página mais curta e honesta > página longa e inventada.

Quando terminar, responda em 3 linhas: o que criou, quais fatos marcou como reportado, e o que faltou de dado.

## Resultado

Reescrevi `modelos/grok-4-5.html` do zero seguindo o padrão visual/editorial do fable-5.html e só fatos do dossiê (arquivo anterior tinha dados inventados — V9 1,5T, acordo SpaceX-Cursor, benchmarks DeepSWE — nenhum disso está no dossiê, foi descartado).

Marcados como reportado (⚠️): score composto Artificial Analysis (Grok 4.5=54, Fable 5=60, Opus 4.8=56, GPT-5.5=55, posição #4) e a liderança em uso agêntico/velocidade.

Faltou: nenhum número de benchmark próprio (provider grok-cli sem modelos carregados) — as 4 tabelas de teste ficaram "a rodar"; também não há dado de velocidade/latência oficial pra citar como fato, só o ⚠️ reportado.
