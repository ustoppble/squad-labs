---
id: OAatgAdw-6
missionId: OAatgAdwMb7K
titulo: Criar `benchmark-sol-vs-grok-4-5.html` na RAIZ. Comparativo 1×1: **GPT-5.6 So...
status: aberto
---

Criar `benchmark-sol-vs-grok-4-5.html` na RAIZ. Comparativo 1×1: **GPT-5.6 Sol vs Grok 4.5** — os dois topos, com ângulo de PREÇO.

## LEIA ANTES (obrigatório)
1. `benchmark-fable-vs-opus.html` COMPLETO — é o MOLDE exato (nav, scoreboard, seções test, tabelas rt tok, analysis, footer).
2. `docs/research/gpt-5-6-dossier.md` INTEIRO — seção 6 é o Grok, seções 1-5 são o GPT-5.6.
3. `assets/site.css`.
4. `prompts/00*.md`.

## REGRA ANTI-ALUCINAÇÃO (crítica)
**NENHUM dos dois modelos foi rodado ainda.** As pastas `00X-sol/` e `00X-grok/` existem e estão VAZIAS. Confira com `ls`.
- ZERO iframe nesta página. Ambas as células de cada teste são placeholder "aguardando run" (classe `missing` — existe no CSS).
- ZERO número de telemetria inventado. Todas as linhas das tabelas `rt tok` vêm com "—".
- Isso é uma página de PREPARO. Ela fica pronta pra receber os números. Deixe isso claro pro leitor logo no lede.
- Só são fatos os preços, specs e benchmarks divulgados — que estão no dossiê.

## FATOS (só estes)
**GPT-5.6 Sol:** $5 entrada / $30 saída por M. Mesmo preço do GPT-5.5. Contexto 1,5M (⚠️ reportado, não confirmado na fonte primária). GA 09/07/2026 após liberação do governo dos EUA. Terminal-Bench 2.1: 88,8% base, 91,9% em modo Ultra. ExploitBench: competitivo com Mythos Preview usando ~1/3 dos tokens de saída.
**Grok 4.5 (xAI):** $2 entrada / $6 saída por M. Entrada cacheada $0,50/M. Contexto 500k. Lançado 08/07/2026. SKU única `grok-4.5` com `reasoning_effort` low/medium/high (high é o padrão) — não tem split de modelos. #4 no Artificial Analysis (⚠️ reportado). Score composto reportado: Grok 4.5 = 54, Fable 5 = 60, Opus 4.8 = 56, GPT-5.5 = 55 (⚠️ reportado). Vence em uso agêntico de ferramentas e é o mais rápido do topo.
**Custo escondido do Grok:** ferramentas server-side cobradas POR FORA dos tokens — web search, X search e code execution a $5 por 1.000 chamadas CADA; busca em anexo $10/1k; collections/RAG $2,50/1k.

## O ÂNGULO EDITORIAL (é o que faz a página valer)
O Sol cobra **5× a saída do Grok** ($30 vs $6). Essa é a maior diferença de preço entre dois modelos de topo hoje. A página pergunta: o Sol entrega 5× mais?
Três tensões pra desenvolver:
1. **Preço.** Grok $2/$6 é o mais barato do topo de linha. Mas o custo de ferramenta server-side ($5 por mil buscas) pode virar o jogo num agente que busca muito — faça a conta pro leitor.
2. **Arquitetura.** OpenAI parte em 3 modelos (Sol/Terra/Luna); a xAI entrega 1 SKU com `reasoning_effort` ajustável. Escolher tier vs girar um botão. Discuta o trade-off.
3. **Confiança no número.** O Sol tem os dois asteriscos: (a) os 91,9% são do modo **Ultra, que usa SUBAGENTES** — não é agente único; (b) a **METR** achou nele a maior taxa de reward-hacking de qualquer modelo público já testado (ele explora bugs do ambiente de teste em vez de resolver a tarefa; o horizonte de tempo estimado oscila entre ~11h e ~270h dependendo de contar exploit como sucesso ou falha). Explique reward-hacking em português claro. Seja justo, não hostil.

## ESTRUTURA
- nav igual ao de `benchmark-gpt-5-6.html` (leia pra copiar), link GPT-5.6 ativo.
- scoreboard 2 cards (grid-template-columns:repeat(2,1fr)): Sol (hero) e Grok 4.5. Custo dos 4 runs = "a rodar" nos dois.
- bloco analysis no topo: "5× o preço — entrega 5×?" com as 3 tensões acima.
- tabela rt "Preço e specs lado a lado": preço entrada, preço saída, contexto, arquitetura, ferramentas server-side.
- tabela rt "Terminal-Bench 2.1" com Sol Ultra 91,9%, Sol 88,8% e a ressalva de que é número da própria OpenAI. O Grok NÃO tem número nessa tabela — escreva "não divulgado", não invente.
- 4 seções de teste (001 solar, 002 Apple, 003 física, 004 FPS). Cada uma: prompt no bloco `term` (copie do benchmark-fable-vs-opus.html), grid de 2 cells AMBAS placeholder, tabela `rt tok` com as 2 linhas todas "—", flag-clean, e um bloco analysis dizendo o que o teste vai medir e o que esperamos de cada modelo.
- seção "Status da infra": `codex-cli` no Overclock lista só `gpt-5.5`; `grok-cli` habilitado mas com lista de modelos vazia. Nenhum dos dois roda ainda. Honestidade total.
- footer: colunas, fórmula de custo (seção 8 do dossiê), regra de fairness (Sol roda base, nunca Ultra; Grok roda no reasoning_effort padrão), links pra `modelos/gpt-5-6.html`, `modelos/grok-4-5.html`, `benchmark-gpt-5-6.html`.

## RESTRIÇÕES
- Arquivo único `benchmark-sol-vs-grok-4-5.html` na raiz. Não crie outro. NÃO toque em arquivo existente.
- Só classes que já existem em assets/site.css. Não edite o site.css.
- Português do Brasil, acentuação completa. Números em algarismo.
- Zero iframe. Zero telemetria inventada.

Ao terminar responda em 3 linhas: o que criou, o que marcou como reportado, e o que ficou pendente.

## Resultado

Criado `benchmark-sol-vs-grok-4-5.html` na raiz — molde de `benchmark-fable-vs-opus.html`, nav copiada de `benchmark-gpt-5-6.html` com "GPT-5.6 vs Claude vs Grok" ativo. Scoreboard 2 cards, bloco analysis "5× o preço — entrega 5×?" com as 3 tensões (preço/ferramentas server-side, arquitetura SKU única vs 3 modelos, reward-hacking METR), tabela preço/specs, tabela Terminal-Bench 2.1 (Sol Ultra 91,9% / Sol 88,8% / Grok "não divulgado"), 4 seções de teste (solar, Apple, física, FPS) todas com placeholder `missing` nas 2 células, tabela `rt tok` com "—", flag-clean e analysis explicando o que cada teste vai medir. Seção "Status da infra" e footer com fórmula de custo, regra de fairness e links pra `modelos/gpt-5-6.html`, `modelos/grok-4-5.html`, `benchmark-gpt-5-6.html`.

Marcado como reportado (⚠️): contexto do Sol (1,5M), contexto/posição do Grok no Artificial Analysis (#4, score composto 54), claim de 54% de eficiência de token (atribuído a Sam Altman, não benchmark auditado).

Pendente: nenhum número de telemetria real — os dois modelos ainda não rodaram (pastas `00X-sol/` e `00X-grok/` vazias, confirmado via `ls`); página fica pronta pra receber os runs assim que codex-cli e grok-cli subirem os providers.
