---
id: OAatgAdw-1
missionId: OAatgAdwMb7K
titulo: Você vai criar a página `modelos/gpt-5-6.html` do site de benchmark da Overcl...
status: aberto
---

Você vai criar a página `modelos/gpt-5-6.html` do site de benchmark da Overclock.

## ANTES DE ESCREVER QUALQUER COISA
1. Leia `docs/research/gpt-5-6-dossier.md` INTEIRO. É a única fonte de fatos permitida.
2. Leia `modelos/fable-5.html` COMPLETO. É o padrão visual e editorial exato que você deve seguir.
3. Leia `assets/site.css` pra conhecer as classes disponíveis.

## REGRA ANTI-ALUCINAÇÃO (crítica)
O dossiê marca cada fato como ✅ confirmado, ⚠️ reportado ou ❌ não verificado.
- ✅ pode afirmar direto.
- ⚠️ escreva como "reportado" / "segundo fontes secundárias".
- ❌ NÃO ESCREVA. Não invente limite de saída, não invente SWE-Bench, não invente GDPval.
Se um dado não está no dossiê, ele não entra na página. Zero exceção.

## O QUE CONSTRUIR
Página da família GPT-5.6 (Sol / Terra / Luna), em português do Brasil, mesmo tom do fable-5.html: direto, explicando pro leigo, sem hype.

Estrutura sugerida (espelhe o fable-5.html):
- nav idêntico ao do fable-5.html, mas com o link "Modelos" ativo. Os links são: Home (../index.html), Modelos (../modelos.html), Benchmark (../benchmark.html), Fable vs Opus (../benchmark-fable-vs-opus.html). Adicione também um link `../benchmark-gpt-5-6.html` chamado "GPT-5.6".
- eyebrow + h1 "GPT-5.6" + lede explicando que NÃO é um modelo, são TRÊS (Sol, Terra, Luna).
- spec-grid com: preços dos 3 tiers, contexto (1,5M — marcar como reportado), disponibilidade (GA 09/07/2026 após liberação do governo dos EUA), mecânica de cache.
- Seção "Os três modelos" — tabela rt comparando Sol/Terra/Luna: preço, posição declarada, pra que serve.
- Seção "Terminal-Bench 2.1" — a tabela do dossiê. OBRIGATÓRIO: nota destacada de que são avaliações fornecidas pela PRÓPRIA OpenAI, não terceiros independentes.
- Seção "🚨 O asterisco do Ultra" — o Ultra mode usa SUBAGENTES. Explique por que os 91,9% não são comparáveis com um agente único. Conecte com a regra de fairness do nosso benchmark (modelo puro, sem subagente).
- Seção "🚨 O que a METR encontrou" — maior taxa de reward-hacking de qualquer modelo público já testado. Explique em português claro o que é reward-hacking (o modelo explora bug do ambiente de teste em vez de resolver a tarefa). O horizonte de tempo oscila entre ~11h e ~270h dependendo de contar exploit como sucesso ou falha. Cite que o próprio system card da OpenAI admite "verbalized metagaming". Ângulo editorial: quanto do score é capacidade real e quanto é gaming do benchmark?
- Seção "Segurança e gating" — classificação High em cyber e bio, Below High em auto-aperfeiçoamento, nenhum Critical. Acesso restrito por confiança (bio pra pesquisadores, cyber pra defensores). Regressão em "ir além da intenção do usuário" em código agêntico.
- Seção "Nossos números no benchmark" — tabela com os 4 testes (001 solar, 002 Apple, 003 física, 004 FPS) × os 3 tiers, TODAS as células como "a rodar" / pendente. Nota explicando que o Codex CLI ainda lista só gpt-5.5, então as runs entram quando o provider subir. Link pra ../benchmark-gpt-5-6.html.
- Seção "Conclusão" com ul.insight — bullets honestos: é família não modelo; Sol custa igual ao GPT-5.5; Ultra é orquestração disfarçada; o alerta da METR; nosso veredito = a medir.
- footer com as fontes (estão no fim do dossiê).

## RESTRIÇÕES
- Arquivo único `modelos/gpt-5-6.html`. Não crie outros arquivos. Não toque em nenhum arquivo existente.
- Use SOMENTE as classes que já existem em assets/site.css (nav, wrap narrow, crumb, eyebrow, brand, hl, lede, spec-grid, spec, section, rt, cst, note, analysis, insight, footer, badge-soon, badge-ready). Não invente CSS novo nem edite o site.css. Estilo inline pontual é aceitável, como o fable-5.html já faz.
- Português do Brasil com acentuação correta e completa.
- Números sempre em algarismo (5, não "cinco").

Quando terminar, responda em 3 linhas: o que criou, quais fatos marcou como reportado/não-verificado, e qualquer dúvida.

## Resultado

<!-- worker: escreva o resultado aqui, depois handoff_submit({ briefId: "OAatgAdw-1", summary, status }) -->

Criei `modelos/gpt-5-6.html` seguindo padrão visual/editorial do fable-5.html, usando só classes de site.css já existentes. Cobre: spec-grid (preços 3 tiers, contexto, GA, cache), tabela dos 3 modelos, Terminal-Bench 2.1 com ressalva de fonte OpenAI, seção do asterisco Ultra (subagentes vs fairness do benchmark), seção METR reward-hacking, segurança/gating, tabela "a rodar" dos 4 testes × 3 tiers, conclusão e footer com fontes.

Marcado como reportado (⚠️): contexto 1,5M (fonte secundária, página oficial deu 403). Marcado como não verificado/omitido (❌): limite de saída (max output tokens), SWE-Bench Pro, GDPval — nenhum entrou na página. IDs de API (`gpt-5.6-sol/terra/luna`) marcados como prováveis/inferidos, não confirmados.

Dúvida: brief não fornece o arquivo `../benchmark-gpt-5-6.html` — linkei como se já existisse ou fosse criado por outro worker (conforme instruído no brief); não criei esse arquivo pois a restrição limitava a 1 arquivo único.
