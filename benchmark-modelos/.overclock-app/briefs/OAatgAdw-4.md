---
id: OAatgAdw-4
missionId: OAatgAdwMb7K
titulo: Você vai criar a página `benchmark-gpt-5-6.html` na RAIZ do projeto — o compa...
status: aberto
---

Você vai criar a página `benchmark-gpt-5-6.html` na RAIZ do projeto — o comparativo GPT-5.6 vs Claude vs Grok. É a página mais importante desse lote.

## ANTES DE ESCREVER QUALQUER COISA
1. Leia `docs/research/gpt-5-6-dossier.md` INTEIRO. É a única fonte de fatos permitida. A seção 9 define a matriz de testes.
2. Leia `benchmark-fable-vs-opus.html` COMPLETO. É o padrão exato de página comparativa (scoreboard, seções de teste, iframes, tabelas, análise, flag-clean, footer).
3. Leia `benchmark.html` COMPLETO — tem os números reais do Sonnet 5 e do Opus 4.8 nos 4 testes.
4. Leia `assets/site.css` pra conhecer as classes.
5. Leia os 4 prompts em `prompts/00*.md`.

## REGRA ANTI-ALUCINAÇÃO (crítica)
- Os apps do GPT-5.6 (Sol/Terra/Luna) e do Grok 4.5 **AINDA NÃO FORAM RODADOS**. As pastas `00X-sol/`, `00X-terra/`, `00X-luna/`, `00X-grok/` existem mas estão VAZIAS.
- Portanto: NÃO crie iframe apontando pra arquivo que não existe. NÃO invente token, custo, linha, tempo ou idas desses modelos. Use células de placeholder com "aguardando run" e tabelas com "—" nas colunas.
- Os apps do Claude JÁ EXISTEM e você DEVE usar iframe real neles:
  - Sonnet 5: `001/index.html`, `002/index.html`, `003/index.html`, `004/index.html`
  - Opus 4.8: `001-48/index.html`, `002-48/index.html`, `003-48/index.html`, `004-48/index.html`
  - Fable 5: `001-fable-5/sistema-solar.html`, `002-fable-5/index.html`, `003-fable-5/bolinhas.html`, `004-fable-5/fps.html`
- Os números reais do Sonnet 5, Opus 4.8 e Fable 5 estão em `benchmark.html` e `benchmark-fable-vs-opus.html`. EXTRAIA de lá, não invente.

## A MATRIZ (3 rodadas, pareadas por faixa de preço)
- **Rodada 1 — tier barato:** GPT-5.6 Luna ($1/$6) vs Claude Sonnet 5 ($2/$10)
- **Rodada 2 — tier médio:** GPT-5.6 Terra ($2,50/$15) vs Claude Opus 4.8 ($5/$25)
- **Rodada 3 — topo:** GPT-5.6 Sol ($5/$30) vs Claude Fable 5 ($10/$50) vs Grok 4.5 ($2/$6)

Cada rodada roda os MESMOS 4 testes: 001 sistema solar 3D, 002 site da Apple, 003 física com mouse, 004 FPS.

## REGRA DE FAIRNESS (destaque na página)
Modelo puro: sem skill, sem subagente, sem squad. Um chute. Auditado no transcript depois.
**O Sol roda em modo BASE, nunca Ultra** — porque o Ultra mode usa subagentes, e isso quebraria a comparação contra agentes únicos. Isso precisa estar explícito e bem explicado na página.

## O QUE CONSTRUIR
- nav igual ao do benchmark-fable-vs-opus.html, com um link novo `benchmark-gpt-5-6.html` marcado como active. Os outros: Home (index.html), Modelos (modelos.html), Benchmark (benchmark.html), Fable vs Opus (benchmark-fable-vs-opus.html).
- h1: GPT-5.6 vs Claude vs Grok. Lede explicando as 3 rodadas pareadas por preço.
- Um scoreboard de 3 cards com os tiers do GPT-5.6 (Sol, Terra, Luna) — preço e posição de cada.
- Bloco `analysis` no topo: "Os dois asteriscos do GPT-5.6" — (a) Ultra mode usa subagentes, então os 91,9% do Terminal-Bench não são de agente único; (b) a METR achou a maior taxa de reward-hacking de qualquer modelo público, e o horizonte de tempo do Sol oscila entre ~11h e ~270h dependendo de contar exploit como sucesso ou falha. Explique reward-hacking em português claro.
- Uma tabela `rt` com o Terminal-Bench 2.1 completo (está no dossiê), COM a ressalva de que são números divulgados pela própria OpenAI.
- Seção por rodada (3 seções). Em cada rodada, os 4 testes. Para cada teste: o prompt num bloco `term` (copie do benchmark-fable-vs-opus.html), um `grid` de cells (2 colunas nas rodadas 1 e 2, 3 colunas na rodada 3 — use style="grid-template-columns:repeat(N,1fr)"), e uma tabela `rt tok` com as colunas Modelo / entrada / saída / linhas / cache relido / idas / tempo / custo.
  - Cell do modelo Claude = iframe real + telemetria real + paneId real.
  - Cell do GPT/Grok = placeholder "aguardando run", sem iframe. Use a classe `missing` (existe no CSS: `.frame,.missing{height:380px}`) ou uma div com a mesma altura, fundo escuro e o texto "aguardando run" centralizado. Linha da tabela com "—" em todas as colunas.
- Seção final "Status da infra" — honestidade: o codex-cli no Overclock ainda lista só `gpt-5.5` (Sol/Terra/Luna não subiram); o `grok-cli` está habilitado mas com lista de modelos vazia. As runs entram assim que os providers carregarem. Não esconda isso.
- footer no mesmo padrão: explicação das colunas, fórmula de custo (seção 8 do dossiê — vale pros 3 labs, todos usam cache write 1,25× e read 0,1×), regra de fairness, links pras fichas `modelos/gpt-5-6.html`, `modelos/grok-4-5.html`, `modelos/fable-5.html`, `modelos/sonnet-5.html`.

## RESTRIÇÕES
- Arquivo único `benchmark-gpt-5-6.html` na raiz. Não crie outros arquivos. Não toque em nenhum arquivo existente.
- Use SOMENTE classes que já existem em assets/site.css. Não invente CSS novo nem edite o site.css. Estilo inline pontual é ok.
- Português do Brasil com acentuação correta e completa.
- Números sempre em algarismo.
- Nenhum iframe apontando pra arquivo inexistente. Confira com `ls` antes.

Quando terminar, responda em 4 linhas: o que criou, quais iframes são reais, quais células ficaram pendentes, e qualquer inconsistência que encontrou nos dados de origem.

## Resultado

**O que criei:** `benchmark-gpt-5-6.html` na raiz, arquivo único, nenhum outro arquivo tocado. Nav com o link novo `active` (5 itens), h1 "GPT-5.6 vs Claude vs Grok", lede das 3 rodadas pareadas por preço, scoreboard de 3 cards (Sol hero $5/$30, Terra $2,50/$15, Luna $1/$6), bloco `analysis` "Os dois asteriscos do GPT-5.6" (Ultra usa subagentes → os 91,9% não são de agente único; METR + reward-hacking explicado em português claro, com o horizonte oscilando entre ~11h e ~270h conforme se conte exploit como falha ou sucesso — fator de 24×), tabela `rt` do Terminal-Bench 2.1 completa com a ressalva de que os números são divulgados pela própria OpenAI, 3 seções de rodada × 4 testes cada (12 blocos de teste, cada um com prompt em `term` copiado verbatim do `benchmark-fable-vs-opus.html`, `grid` de cells, tabela `rt tok` de 8 colunas e `flag-clean`), seção "Status da infra" e footer com fórmula de custo da seção 8, regra de fairness e as 4 fichas. Só classes que já existem em `assets/site.css` — usei a `.missing` que já estava lá e nunca tinha sido usada em markup nenhum. Zero CSS novo, zero edição no site.css.

**Iframes reais (12, todos verificados com `ls` antes e revalidados depois):** Sonnet 5 em `001/`, `002/`, `003/`, `004/index.html` (rodada 1) · Opus 4.8 em `001-48/`, `002-48/`, `003-48/`, `004-48/index.html` (rodada 2) · Fable 5 em `001-fable-5/sistema-solar.html`, `002-fable-5/index.html`, `003-fable-5/bolinhas.html`, `004-fable-5/fps.html` (rodada 3). Toda a telemetria (entrada, saída, linhas, cache relido, idas, tempo, custo, contexto e paneId) foi extraída de `benchmark.html` e `benchmark-fable-vs-opus.html` — nada recalculado, nada inventado.

**Células pendentes (16):** GPT-5.6 Luna nos 4 testes da rodada 1, GPT-5.6 Terra nos 4 da rodada 2, GPT-5.6 Sol e Grok 4.5 nos 4 da rodada 3 (8 células). Todas com `div.missing` de mesma altura do iframe, texto "aguardando run", sem `src` apontando pra arquivo inexistente e sem link `abrir ↗`. As linhas correspondentes das tabelas têm "—" em todas as 7 colunas de dados. As cells do Sol trazem "aguardando run · modo base" no cabeçalho, e o `flag-clean` da rodada 3 repete "Sol rodará em modo base, sem Ultra".

**Inconsistências que encontrei nos dados de origem:** (1) A matriz da seção 9 do dossiê aponta o Grok 4.5 para `00X-grok/`, que está vazia — mas o Grok 4.5 **já foi rodado** e está em `00X-grok45/`, com iframes e números (estimados) vivos no `benchmark.html`. Segui o brief e deixei as células do Grok como pendentes na rodada 3, mas os apps existem: ou a matriz devia reaproveitar `00X-grok45/`, ou o plano é re-rodar o Grok sob a metodologia nova. Vale decidir antes das runs. (2) O `benchmark.html` se contradiz no teste 001 do Sonnet 5: a tabela e o parágrafo de custo dizem **26 idas**, o bloco de análise logo abaixo diz **19 idas**. Usei 26, que é o número da tabela e aparece 2×. (3) A tabela do Terminal-Bench inclui **Claude Mythos 5** (84,3%), modelo que não tem ficha nem aparece em nenhuma outra página do site — reproduzi porque está no dossiê, mas fica órfão. (4) O dossiê marca como ❌ o limite de saída do GPT-5.6 e como ⚠️ os IDs de API; não escrevi limite de saída em lugar nenhum e marquei os IDs explicitamente como "prováveis, não confirmados". (5) `modelos/gpt-5-6.html` não existia quando comecei; passou a existir durante a execução (outro pane), então o link do footer está válido — mas se aquele pane falhar, esse link cai.
