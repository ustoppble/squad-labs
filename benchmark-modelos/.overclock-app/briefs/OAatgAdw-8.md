---
id: OAatgAdw-8
missionId: OAatgAdwMb7K
titulo: Criar `benchmark-luna-vs-sonnet-5.html` na RAIZ. Comparativo 1×1 do tier BARA...
status: aberto
---

Criar `benchmark-luna-vs-sonnet-5.html` na RAIZ. Comparativo 1×1 do tier BARATO: **GPT-5.6 Luna vs Claude Sonnet 5**.

## LEIA ANTES (obrigatório)
1. `benchmark-fable-vs-opus.html` COMPLETO — MOLDE exato (nav, scoreboard, seções test, tabelas rt tok, analysis, flag-clean, footer).
2. `docs/research/gpt-5-6-dossier.md` INTEIRO.
3. `benchmark.html` — tem os números reais do Sonnet 5. Confira contra os que passo abaixo; se divergir, o benchmark.html manda.
4. `assets/site.css` e `prompts/00*.md`.

## REGRA ANTI-ALUCINAÇÃO (crítica)
Os apps do **Luna AINDA NÃO FORAM RODADOS**. As pastas `001-luna/` ... `004-luna/` existem e estão VAZIAS. Confira com `ls`.
- NÃO crie iframe do Luna. NÃO invente token, custo, linha, tempo, idas ou paneId do Luna.
- Célula do Luna = placeholder "aguardando run" (classe `missing`, existe no CSS). Linha da tabela = "—" em todas as colunas.

## DADOS REAIS DO SONNET 5 (use exatamente estes)
Preço: $2 entrada / $10 saída por M — é promo de 33% até 31/08/2026; depois volta pra $3/$15. Isso é importante e deve aparecer.
Total dos 4 runs: **$2,06**. Volume: 0,47M tokens novos, 55k gerados.
Colunas: entrada / saída / linhas / cache relido / idas / tempo / custo · paneId · app
- 001 solar: 191k / 16k / 322 / 1,3M / 26 / 4,1min / $0,87 · pane-2 · `001/index.html`
- 002 Apple: 60k / 12k / 377 / 251k / 5 / 1,9min / $0,31 · AvfXUnCE · `002/index.html`
- 003 física: 77k / 12k / 421 / 290k / 6 / 1,0min / $0,36 · TpwqpTwc · `003/index.html`
- 004 FPS: 92k / 15k / 763 / 791k / 13 / 3,0min / $0,52 · RB1v8INf · `004/index.html`
Comportamento auditado do Sonnet 5: **o verificador mais consistente** — abriu o navegador nos testes visuais/interativos (solar e FPS), confirmando render, console e clique. No FPS bateu em 3 erros e corrigiu. No solar, verificar custou caro: 26 idas e 1,3M de cache relido fizeram o custo ($0,87) passar o do Opus ($0,80) — o único teste em que iterar demais saiu caro.

## DADOS DO LUNA (do dossiê — só estes)
Preço: $1 entrada / $6 saída por M. É o tier de volume da OpenAI: classificação, extração, roteamento, rascunho de primeira passada. Feito pra alto volume e baixa latência.
Terminal-Bench 2.1 (número divulgado pela própria OpenAI): **Luna 84,3%** — empatado com o Claude Mythos 5 e acima do Claude Fable 5 (83,4%) e do Opus 4.8 (78,9%).
Contexto da família: 1,5M (⚠️ reportado, não confirmado na fonte primária).

## O ÂNGULO EDITORIAL (é o mais forte de todos)
O Luna é o modelo **mais barato** da família GPT-5.6 ($1/$6) e, no número da própria OpenAI, marca **84,3% no Terminal-Bench — acima do Claude Fable 5 (83,4%), que custa $10/$50**. Ou seja: o tier de volume da OpenAI diz bater o topo de linha da Anthropic, por 1/10 do preço de entrada.
Se isso se confirmar nos nossos testes, muda a conta de todo mundo. Mas trate com cético saudável:
1. É número **auto-reportado pela OpenAI**, não auditoria independente. É exatamente o tipo de benchmark que a gente não confia — por isso rodamos os próprios testes.
2. Terminal-Bench mede tarefa de terminal. Nossos testes medem outra coisa: **construir um app que funciona, e conferir que funciona**. Um bom score no primeiro não garante o segundo.
3. O contraponto do Sonnet 5 é comportamental: ele **confere o próprio output sem pedir**. Verificar custa idas e cache — no solar isso o deixou mais caro que o Opus. A pergunta do teste é: o Luna verifica? Ou escreve e confia?
E lembre da armadilha do preço: os $2/$10 do Sonnet 5 são promo até 31/08. Depois sobem pra $3/$15, e aí a distância pro Luna ($1/$6) dobra.

## ESTRUTURA
- nav igual ao de `benchmark-gpt-5-6.html` (leia pra copiar), link GPT-5.6 ativo.
- scoreboard 2 cards (grid-template-columns:repeat(2,1fr)): Luna (hero) e Sonnet 5. Luna: custo dos 4 runs = "a rodar". Sonnet 5: $2,06, com a nota da promo até 31/08.
- bloco analysis no topo: "O mais barato diz bater o mais caro" com os 3 pontos de ceticismo acima.
- tabela rt: Terminal-Bench 2.1 com Luna 84,3%, Mythos 5 84,3%, Fable 5 83,4%, Opus 4.8 78,9% — e a ressalva de que são números da própria OpenAI. O Sonnet 5 NÃO aparece nessa tabela: escreva "não divulgado", não invente.
- 4 seções de teste (001 solar, 002 Apple, 003 física, 004 FPS). Cada uma: prompt no bloco `term` (copie do benchmark-fable-vs-opus.html), grid de 2 cells (Luna placeholder + Sonnet 5 iframe real), tabela `rt tok` (Luna "—", Sonnet 5 com números reais), flag-clean "✓ Modelo puro — sem skill, sem subagente (auditado no transcript)", bloco analysis com o comportamento auditado do Sonnet 5 e o que esperamos do Luna.
- seção "Status da infra": `codex-cli` no Overclock lista só `gpt-5.5`; Luna não subiu. Honestidade.
- footer: colunas, fórmula de custo (seção 8 do dossiê), regra de fairness, a armadilha da promo do Sonnet 5, links pra `modelos/gpt-5-6.html`, `modelos/sonnet-5.html`, `benchmark-gpt-5-6.html`.

## RESTRIÇÕES
- Arquivo único `benchmark-luna-vs-sonnet-5.html` na raiz. Não crie outro. NÃO toque em arquivo existente.
- Só classes que já existem em assets/site.css. Não edite o site.css.
- Português do Brasil, acentuação completa. Números em algarismo.
- Zero iframe pra arquivo inexistente. Confira com `ls`.

Ao terminar responda em 3 linhas: o que criou, quais iframes são reais, e se os números do Sonnet 5 bateram com o benchmark.html.

## Resultado

Criei `benchmark-luna-vs-sonnet-5.html` na raiz: nav, scoreboard 2 cards, tabela Terminal-Bench, 4 seções de teste (solar/Apple/física/FPS) e footer, seguindo o molde de `benchmark-fable-vs-opus.html`.
Iframes reais: só os 4 do Sonnet 5 (`001/index.html` a `004/index.html`, confirmados via `ls`). Luna = célula `missing` placeholder em todas as 4 seções — `00X-luna/` confirmado vazio, zero invenção.
Números do Sonnet 5 batem exatos com os já publicados em `benchmark-gpt-5-6.html` (rodada 1), que por sua vez casam com o brief — sem divergência a reportar.
