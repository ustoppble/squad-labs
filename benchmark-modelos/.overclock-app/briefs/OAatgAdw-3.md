---
id: OAatgAdw-3
missionId: OAatgAdwMb7K
titulo: Você vai criar a página `modelos/opus-4-8.html` do site de benchmark da Overc...
status: aberto
---

Você vai criar a página `modelos/opus-4-8.html` do site de benchmark da Overclock. Ela está faltando — o site já linka Sonnet 5 e Fable 5, mas o Opus 4.8 aparece como "em breve".

## ANTES DE ESCREVER QUALQUER COISA
1. Leia `modelos/fable-5.html` COMPLETO — padrão visual e editorial exato.
2. Leia `modelos/sonnet-5.html` COMPLETO — o outro exemplo do padrão.
3. Leia `benchmark.html` COMPLETO — ele tem TODOS os números reais do Opus 4.8 nos 4 testes. É a tua fonte de dados.
4. Leia `benchmark-fable-vs-opus.html` — tem mais análise do Opus 4.8 lado a lado com o Fable.
5. Leia `docs/research/gpt-5-6-dossier.md` — seções 7 (preços) e 8 (fórmula de custo).
6. Leia `assets/site.css`.

## REGRA ANTI-ALUCINAÇÃO (crítica)
Os números do Opus 4.8 nos nossos testes JÁ EXISTEM no benchmark.html. EXTRAIA de lá, não recalcule de cabeça, não invente.
Dados confirmados que você vai encontrar: preço $5/$25 por M. Custo total dos 4 runs: $3,49. Volume: 0,36M tokens novos, 53k gerados.
Por teste (entrada / saída / linhas / cache relido / idas / tempo / custo):
- 001 solar: 68k / 13k / 305 / 130k / 4 / 1,6min / $0,80 — paneId azM3KZ4t
- 002 Apple: 50k / 6k / 382 / 53k / 2 / 1,3min / $0,47 — paneId yo80Y2kq
- 003 física: 74k / 5k / 233 / 122k / 4 / 1,2min / $0,60 — paneId eOV5uqst
- 004 FPS: 118k / 29k / 704 / 341k / 8 / 3,9min / $1,61 — paneId mYGgyEpQ
CONFIRA cada um desses lendo o benchmark.html. Se divergir do que eu escrevi, o benchmark.html manda.

Para benchmarks OFICIAIS da Anthropic sobre o Opus 4.8: o `modelos/fable-5.html` tem uma tabela com a coluna "Opus 4.8" (SWE-Bench Pro 69,2%, Terminal-Bench 2.1 82,7%, FrontierCode Diamond 13,4%, GDPval-AA 1890, OSWorld-Verified 83,4%, HLE com ferramentas 57,9%, HLE sem ferramentas 49,8%, Blueprint-Bench 2 14,5%, ExploitBench 40,0%, HealthBench Professional 56,9%). EXTRAIA de lá.
O dossiê também traz: no Terminal-Bench 2.1 divulgado pela OpenAI, o Opus 4.8 aparece com 78,9% (número da OpenAI, não da Anthropic — os dois números existem e são de fontes diferentes; mencione essa divergência, é interessante).
NÃO invente nenhum outro número.

## O QUE CONSTRUIR
Página do Claude Opus 4.8, em português do Brasil, mesmo tom: direto, pro leigo, sem hype.

Estrutura (espelhe fable-5.html):
- nav idêntico ao do fable-5.html com "Modelos" ativo. Links: Home (../index.html), Modelos (../modelos.html), Benchmark (../benchmark.html), Fable vs Opus (../benchmark-fable-vs-opus.html), GPT-5.6 (../benchmark-gpt-5-6.html).
- eyebrow + h1 "Claude Opus 4.8" + lede: era o topo da linha da Anthropic até o Fable 5 chegar. Agora é o degrau do meio — e é justamente onde mora o melhor custo-benefício do topo.
- spec-grid: preço ($5/$25 por M), posição (destronado pelo Fable 5, que cobra 2×), custo nos nossos 4 testes ($3,49), comportamento (verificador seletivo).
- Seção "O que ele é hoje" — o rei anterior. O Fable 5 empilhou um degrau acima ($10/$50) em vez de reprecificar o Opus. Escada: Sonnet 5 $2/$10 → Opus 4.8 $5/$25 → Fable 5 $10/$50.
- Seção "Os testes oficiais" — tabela rt com os benchmarks oficiais que você extraiu do fable-5.html, coluna Opus 4.8 vs Fable 5. Mostre onde o Fable abre vantagem (FrontierCode 29,3% vs 13,4%; ExploitBench 78% vs 40%).
- Seção "A divergência de número" — a Anthropic reporta Opus 4.8 em 82,7% no Terminal-Bench 2.1; a OpenAI, na tabela dela, reporta 78,9% pro mesmo modelo no mesmo benchmark. Explique pro leitor que benchmark divulgado por laboratório é sempre auto-reportado, e por isso a gente roda os próprios testes. Não acuse ninguém de má-fé — só mostre o fato.
- Seção "Comportamento: o verificador seletivo" — nos nossos 4 testes o Opus só abriu o navegador no FPS (o mais difícil). Escreveu e parou nos outros 3. Contraste com Sonnet 5 e Fable 5, que verificam mais. É o modelo mais enxuto: escreve menos linha que os outros.
- Seção "Nossos números no benchmark" — tabela rt com os 4 testes, TODOS os números reais (entrada, saída, linhas, cache relido, idas, tempo, custo), total $3,49. Todos com paneId. Link pra ../benchmark.html e ../benchmark-fable-vs-opus.html.
- Seção "Conclusão" com ul.insight — bullets: destronado mas não reprecificado; verificador seletivo (barato em idas); o mais enxuto em linhas; na nossa bateria custou $3,49 contra $15,81 do Fable (4,5× menos) e $2,06 do Sonnet 5; veredito: melhor custo-benefício do topo hoje.
- footer.

## RESTRIÇÕES
- Arquivo único `modelos/opus-4-8.html`. Não crie outros arquivos. Não toque em nenhum arquivo existente.
- Use SOMENTE classes que já existem em assets/site.css. Não invente CSS novo nem edite o site.css.
- Português do Brasil com acentuação correta e completa.
- Números sempre em algarismo.

Quando terminar, responda em 3 linhas: o que criou, de onde extraiu cada número, e se achou alguma divergência entre benchmark.html e benchmark-fable-vs-opus.html.

## Resultado

Criei `modelos/opus-4-8.html`, espelhando fiel o padrão visual/editorial de `fable-5.html` e `sonnet-5.html` (mesmo nav, spec-grid, section/insight/rt/note/analysis, footer), só com classes já existentes em `assets/site.css`.

Extração dos números:
- Nossos 4 testes (entrada/saída/linhas/cache/idas/tempo/custo + paneId) → `benchmark.html`, tabelas `.rt.tok` de cada seção `#t1`–`#t4`. Total $3,49 e volume 0,36M/53k → scoreboard do `benchmark.html`.
- Benchmarks oficiais Anthropic (Opus 4.8 vs Fable 5) → tabela de `modelos/fable-5.html` (coluna "Opus 4.8").
- Número da OpenAI pro Terminal-Bench 2.1 (78,9%) → `docs/research/gpt-5-6-dossier.md`.
- Preço $5/$25 e a escada de preço (Sonnet 5 $2/$10 → Opus $5/$25 → Fable $10/$50) → `benchmark.html` e `benchmark-fable-vs-opus.html`.

Divergência checada: nenhuma. `benchmark.html` e `benchmark-fable-vs-opus.html` batem 100% nos 4 testes do Opus (mesmos valores de entrada/saída/linhas/cache/idas/tempo/custo em ambos os arquivos) — não precisei arbitrar entre fontes.

Único ponto de atenção: o nav pede link pra `../benchmark-gpt-5-6.html`, arquivo que ainda não existe no repo (só `benchmark.html` e `benchmark-fable-vs-opus.html` existem hoje) — segui a instrução do brief mesmo assim, já que provavelmente é página futura planejada.
