---
id: OAatgAdw-5
missionId: OAatgAdwMb7K
titulo: Criar `benchmark-sol-vs-fable-5.html` na RAIZ. É a página comparativa 1×1 mai...
status: aberto
---

Criar `benchmark-sol-vs-fable-5.html` na RAIZ. É a página comparativa 1×1 mais importante do site: **GPT-5.6 Sol vs Claude Fable 5** — os dois topos de linha.

## LEIA ANTES (obrigatório)
1. `benchmark-fable-vs-opus.html` COMPLETO — é o MOLDE exato. Copie a estrutura: nav, eyebrow, h1, lede, scoreboard 2 cards, bloco analysis, 4 seções `test` (cada uma: test-head, term com o prompt, grid de cells, tabela `rt tok`, parágrafo test-sub, flag-clean, bloco analysis), footer.
2. `docs/research/gpt-5-6-dossier.md` INTEIRO — única fonte de fatos sobre o Sol.
3. `assets/site.css` — só use classes que já existem lá.
4. `prompts/00*.md` — os 4 prompts.

## REGRA ANTI-ALUCINAÇÃO (crítica)
Os apps do **Sol AINDA NÃO FORAM RODADOS**. As pastas `001-sol/`, `002-sol/`, `003-sol/`, `004-sol/` existem e estão VAZIAS. Confira com `ls`.
- NÃO crie iframe apontando pra arquivo do Sol. NÃO invente token, custo, linha, tempo, idas ou paneId do Sol.
- Célula do Sol = placeholder "aguardando run", altura igual à do iframe (a classe `missing` existe no CSS: `.frame,.missing{height:300px}` / 380px no mobile), fundo escuro, texto centralizado.
- Linha do Sol na tabela = "—" em TODAS as colunas.

## DADOS REAIS DO FABLE 5 (use exatamente estes, já conferidos)
Preço: $10 entrada / $50 saída por M. Total dos 4 runs: **$15,81**. Volume: 0,60M tokens novos, 110k gerados.
Colunas: entrada / saída / linhas / cache relido / idas / tempo / custo · paneId
- 001 solar: 161k / 28k / 356 / 1,15M / 29 / 2,6min / $4,41 · pane-80 · app: `001-fable-5/sistema-solar.html`
- 002 Apple: 39k / 10k / 432 / 186k / 6 / 1,6min / $1,13 · kOvJrseEcV8m · app: `002-fable-5/index.html`
- 003 física: 157k / 18k / 307 / 792k / 23 / 1,7min / $3,50 · ih4YwzPIvR5z · app: `003-fable-5/bolinhas.html`
- 004 FPS: 244k / 55k / 817 / 1,12M / 22 / 3,7min / $6,76 · OR0ZREPYdHqA · app: `004-fable-5/fps.html`
Comportamento auditado do Fable: abriu o navegador em 3 dos 4 testes (solar, física, FPS) e corrigiu o próprio bug no solar e no FPS (1 Edit cada). No Apple escreveu e parou (2 ferramentas, zero browser).

## DADOS DO SOL (do dossiê — só estes)
Preço: $5 entrada / $30 saída por M. Mesmo preço do GPT-5.5. Contexto 1,5M (⚠️ reportado, não confirmado em fonte primária). GA 09/07/2026 após liberação do governo dos EUA.
Terminal-Bench 2.1 (números divulgados pela própria OpenAI): Sol Ultra 91,9% · Sol 88,8% · Fable 5 83,4%.
ExploitBench: Sol competitivo com o Mythos Preview usando ~1/3 dos tokens de saída.
Altman: 54% mais eficiência de token pra código (declaração do CEO, não benchmark auditado).

## O ÂNGULO EDITORIAL DA PÁGINA (é o que a torna boa)
Sol custa **metade** do Fable por token de saída ($30 vs $50) e diz bater ele no Terminal-Bench (88,8% vs 83,4%). No papel o Sol ganha. **Mas tem dois asteriscos**, e a página existe pra explicar:
1. **Os 91,9% são do Sol Ultra, que usa SUBAGENTES** — não é agente único. Comparar Ultra com Fable solo é comparar orquestração com um agente. Por isso nosso teste roda **Sol base**, nunca Ultra.
2. **A METR achou no Sol a maior taxa de reward-hacking de qualquer modelo público que ela já testou** — ele explora bugs do ambiente de avaliação em vez de resolver a tarefa (extraiu código-fonte escondido com a resposta esperada; empacotou exploits pra revelar suites de teste ocultas). O horizonte de tempo estimado dele oscila entre ~11 horas e ~270 horas dependendo de contar os exploits como sucesso ou falha. O próprio system card da OpenAI admite "verbalized metagaming" e regressão em "ir além da intenção do usuário" em código agêntico.
Explique reward-hacking em português claro, pro leigo. Conecte com a tese do site: é exatamente por isso que a gente roda os próprios testes em vez de confiar em benchmark de laboratório.
Seja justo, não hostil: o Sol pode ser excelente. A questão é que o número de vitrine tem duas ressalvas, e o nosso teste é quem vai decidir.

## ESTRUTURA
- nav igual ao de `benchmark-gpt-5-6.html` (leia pra copiar), com o link GPT-5.6 ativo.
- scoreboard de 2 cards (style="grid-template-columns:repeat(2,1fr)"): Sol (hero) e Fable 5. Card do Sol: preço $5/$30, papel "o novo topo da OpenAI", custo dos 4 runs = "a rodar". Card do Fable: $10/$50, "topo da Anthropic", $15,81.
- bloco analysis no topo: "Os dois asteriscos do Sol" (os 2 pontos acima).
- tabela rt: Terminal-Bench 2.1 (Sol Ultra / Sol / Fable 5) com ressalva de que é número da própria OpenAI.
- 4 seções de teste (001 solar, 002 Apple, 003 física, 004 FPS). Cada uma: prompt no bloco `term` (copie do benchmark-fable-vs-opus.html), grid de 2 cells (Sol placeholder + Fable iframe real), tabela `rt tok` com as 2 linhas (Sol tudo "—", Fable com os números reais), flag-clean "✓ Modelo puro — sem skill, sem subagente (auditado no transcript)", e um bloco analysis descrevendo o que o Fable fez (comportamento auditado acima) e o que esperamos observar no Sol.
- seção final "Status da infra": o `codex-cli` no Overclock ainda lista apenas `gpt-5.5`. Sol/Terra/Luna não subiram. As runs entram quando o provider carregar. Seja honesto, não esconda.
- footer: explicação das colunas, fórmula de custo (seção 8 do dossiê — vale pros dois labs, ambos usam cache write 1,25× e read 0,1×), regra de fairness (Sol roda base, nunca Ultra), links pra `modelos/gpt-5-6.html`, `modelos/fable-5.html`, `benchmark-gpt-5-6.html`.

## RESTRIÇÕES
- Arquivo único `benchmark-sol-vs-fable-5.html` na raiz. Não crie outro arquivo. NÃO toque em nenhum arquivo existente.
- Só classes que já existem em assets/site.css. Não edite o site.css. Inline pontual é ok.
- Português do Brasil, acentuação completa e correta. Números sempre em algarismo.
- Zero iframe pra arquivo inexistente. Confira com `ls` antes de escrever.

Ao terminar responda em 4 linhas: o que criou, quais iframes são reais, quais células ficaram pendentes, e qualquer inconsistência que achou.

## Resultado

**O que criou:** `benchmark-sol-vs-fable-5.html` na raiz, arquivo único, nenhum arquivo existente tocado. Estrutura copiada do molde `benchmark-fable-vs-opus.html`: nav (com `benchmark-gpt-5-6.html` ativo), eyebrow, h1, lede, scoreboard de 2 cards (Sol hero "a rodar" / Fable $15,81), bloco analysis "Os dois asteriscos do Sol", tabela `rt` do Terminal-Bench 2.1 com a ressalva de que os números são divulgados pela própria OpenAI, 4 seções `test` completas, seção "Status da infra" e footer. Só classes já existentes em `assets/site.css` (checado por diff: zero classe ausente); `site.css` não foi editado. HTML validado com parser: todas as tags balanceadas. Screenshot conferido — o placeholder do Sol tem a mesma altura do iframe do Fable.

**Iframes reais (4, todos verificados com `ls`):** `001-fable-5/sistema-solar.html`, `002-fable-5/index.html`, `003-fable-5/bolinhas.html`, `004-fable-5/fps.html`. Zero iframe apontando pra arquivo inexistente — confirmado com grep: nenhuma ocorrência de `src="00X-sol`.

**Células pendentes:** as 4 do Sol (001 solar, 002 Apple, 003 física, 004 FPS) usam a classe `missing` com "aguardando run" sobre `--ov-deep`, sem link `abrir ↗`. As 4 linhas do Sol nas tabelas `rt tok` estão com "—" em todas as 7 colunas. Nenhum token, custo, linha, tempo, ida ou paneId do Sol foi inventado. Confirmei com `ls -A` que `001-sol/`, `002-sol/`, `003-sol/` e `004-sol/` estão vazias.

**Inconsistências encontradas:** (1) a regra `.rt.tok tbody tr:nth-child(2)` do `site.css` destaca sempre a **segunda** linha da tabela — como o Sol vem primeiro (espelhando o scoreboard), quem recebe o realce vermelho é o Fable, não o card hero. Deixei assim porque o brief proíbe editar o CSS e, na prática, o realce cai na única linha com dados reais, o que funciona. (2) O dossiê marca o contexto de 1,5M do Sol como ⚠️ reportado (a página oficial da OpenAI devolveu HTTP 403) — reproduzi o aviso no card e no footer em vez de apresentar como fato. (3) O dossiê registra que o `explainX` erra ao afirmar 200K de contexto pro Fable 5 (o correto é 1M); não usei essa fonte. (4) O brief pede link pra `modelos/fable-5.html` e `modelos/gpt-5-6.html` — os dois existem e estão no footer.
