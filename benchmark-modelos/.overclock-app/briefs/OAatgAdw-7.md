---
id: OAatgAdw-7
missionId: OAatgAdwMb7K
titulo: Criar `benchmark-terra-vs-opus-4-8.html` na RAIZ. Comparativo 1×1 do tier MÉD...
status: aberto
---

Criar `benchmark-terra-vs-opus-4-8.html` na RAIZ. Comparativo 1×1 do tier MÉDIO: **GPT-5.6 Terra vs Claude Opus 4.8**.

## LEIA ANTES (obrigatório)
1. `benchmark-fable-vs-opus.html` COMPLETO — MOLDE exato (nav, scoreboard, seções test, tabelas rt tok, analysis, flag-clean, footer).
2. `docs/research/gpt-5-6-dossier.md` INTEIRO.
3. `benchmark.html` — tem os números reais do Opus 4.8. Confira contra os que passo abaixo; se divergir, o benchmark.html manda.
4. `assets/site.css` e `prompts/00*.md`.

## REGRA ANTI-ALUCINAÇÃO (crítica)
Os apps do **Terra AINDA NÃO FORAM RODADOS**. As pastas `001-terra/` ... `004-terra/` existem e estão VAZIAS. Confira com `ls`.
- NÃO crie iframe do Terra. NÃO invente token, custo, linha, tempo, idas ou paneId do Terra.
- Célula do Terra = placeholder "aguardando run" (classe `missing`, existe no CSS). Linha da tabela = "—" em todas as colunas.

## DADOS REAIS DO OPUS 4.8 (use exatamente estes)
Preço: $5 entrada / $25 saída por M. Total dos 4 runs: **$3,49**. Volume: 0,36M tokens novos, 53k gerados.
Colunas: entrada / saída / linhas / cache relido / idas / tempo / custo · paneId · app
- 001 solar: 68k / 13k / 305 / 130k / 4 / 1,6min / $0,80 · azM3KZ4t · `001-48/index.html`
- 002 Apple: 50k / 6k / 382 / 53k / 2 / 1,3min / $0,47 · yo80Y2kq · `002-48/index.html`
- 003 física: 74k / 5k / 233 / 122k / 4 / 1,2min / $0,60 · eOV5uqst · `003-48/index.html`
- 004 FPS: 118k / 29k / 704 / 341k / 8 / 3,9min / $1,61 · mYGgyEpQ · `004-48/index.html`
Comportamento auditado do Opus: **verificador seletivo** — só abriu o navegador no FPS (o mais difícil), onde achou 1 erro e fez 2 correções. Nos outros 3 escreveu e parou. É o mais enxuto em linhas.

## DADOS DO TERRA (do dossiê — só estes)
Preço: $2,50 entrada / $15 saída por M — exatamente **metade** do Sol e metade do GPT-5.5.
Posição declarada pela OpenAI: "performance competitiva com o GPT-5.5" por metade do preço. Tier de alto volume: suporte, ferramentas internas, análise de documento.
Terminal-Bench 2.1 (número divulgado pela própria OpenAI): **Terra 82,5%** · Opus 4.8 78,9%.
Contexto da família: 1,5M (⚠️ reportado, não confirmado na fonte primária).

## O ÂNGULO EDITORIAL
O Terra cobra **metade** do Opus 4.8 na entrada ($2,50 vs $5) e **60% da saída** ($15 vs $25). E, no número da OpenAI, passa o Opus no Terminal-Bench (82,5% vs 78,9%).
Mas duas ressalvas honestas:
1. **O número do Opus 4.8 diverge conforme quem publica.** A Anthropic reporta 82,7% no Terminal-Bench 2.1; a OpenAI, na tabela dela, reporta 78,9% pro mesmo modelo no mesmo benchmark. Não acuse ninguém de má-fé — apenas mostre o fato e conclua: benchmark divulgado por laboratório é sempre auto-reportado, e é por isso que a gente roda os próprios testes.
2. **O Opus é econômico em idas.** Ele verifica seletivamente (2 a 8 idas por teste), enquanto modelos que verificam sempre queimam cache. Preço por token não é a conta final — o total é.
Esse é o duelo mais interessante do meio: o desafiante mais barato contra o rei destronado que virou custo-benefício.

## ESTRUTURA
- nav igual ao de `benchmark-gpt-5-6.html` (leia pra copiar), link GPT-5.6 ativo.
- scoreboard 2 cards (grid-template-columns:repeat(2,1fr)): Terra (hero) e Opus 4.8. Terra: custo dos 4 runs = "a rodar". Opus: $3,49.
- bloco analysis no topo: "Metade do preço, e diz passar no papel" com as 2 ressalvas acima.
- tabela rt: Terminal-Bench 2.1 com Terra 82,5% e Opus 4.8 78,9%, mais a linha da divergência (Anthropic reporta 82,7% pro Opus). Ressalva de fonte.
- 4 seções de teste (001 solar, 002 Apple, 003 física, 004 FPS). Cada uma: prompt no bloco `term` (copie do benchmark-fable-vs-opus.html), grid de 2 cells (Terra placeholder + Opus iframe real), tabela `rt tok` (Terra "—", Opus com números reais), flag-clean "✓ Modelo puro — sem skill, sem subagente (auditado no transcript)", bloco analysis com o comportamento auditado do Opus e o que esperamos do Terra.
- seção "Status da infra": `codex-cli` no Overclock lista só `gpt-5.5`; Terra não subiu. Honestidade.
- footer: colunas, fórmula de custo (seção 8 do dossiê), regra de fairness, links pra `modelos/gpt-5-6.html`, `modelos/opus-4-8.html`, `benchmark-gpt-5-6.html`.

## RESTRIÇÕES
- Arquivo único `benchmark-terra-vs-opus-4-8.html` na raiz. Não crie outro. NÃO toque em arquivo existente.
- Só classes que já existem em assets/site.css. Não edite o site.css.
- Português do Brasil, acentuação completa. Números em algarismo.
- Zero iframe pra arquivo inexistente. Confira com `ls`.

Ao terminar responda em 3 linhas: o que criou, quais iframes são reais, e se os números do Opus bateram com o benchmark.html.

## Resultado

Criei `benchmark-terra-vs-opus-4-8.html` na raiz — molde do `benchmark-fable-vs-opus.html`, nav com link ativo, scoreboard 2 cards, análise "metade do preço, e diz passar no papel" com as 2 ressalvas (divergência Anthropic 82,7% vs OpenAI 78,9%; Opus econômico em idas), tabela Terminal-Bench, 4 seções de teste, status da infra, footer.

Iframes reais: só os 4 do Opus 4.8 (`001-48` a `004-48/index.html`, confirmados com `ls`). Terra 100% placeholder `missing` — confirmei `001-terra/` a `004-terra/` vazias, zero iframe/número inventado.

Números do Opus batem com `benchmark.html`: 001 $0,80/azM3KZ4t, 002 $0,47/yo80Y2kq, 003 $0,60/eOV5uqst, 004 $1,61/mYGgyEpQ, total $3,49 — conferidos linha a linha, idênticos.
