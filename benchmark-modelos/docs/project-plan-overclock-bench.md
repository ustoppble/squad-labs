# Plano de Projeto — Overclock Bench

> Do estado atual (v0 + squad aprovada) até **live com o primeiro teste publicado**.
> Base: `docs/squad-proposal-overclock-bench.md`. Comando de partida no pane-227: *"aprovado, painel de 3 juízes, persiste e roda na conta 2"*.
> Gerado 2026-07-03.

---

## Tese (a régua)

> **"Opus 4.8 + Sonnet 5 orquestrados batem Fable 5 solo, por ~1/3 do custo."**

- Fase 1 = baseline (modelo cru, 1 chute, 0 skill).
- Fase 2 = harness caixa-preta, mesma bateria, mesmo juiz cego, custo cumulativo.
- Vale se: `quality(caixa) ≥ quality(Fable-5 solo)` **E** `cost(caixa) ≈ ⅓ · $15,81 ≈ $5`.

---

## Onde estamos (v0 pronto)

- ✅ 5 prompts fixos single-file HTML (001-005).
- ✅ 4 modelos crus rodados em 001-004 (Sonnet 5, Sonnet 4.6, Opus 4.8, Fable 5); 005 parcial.
- ✅ Pipeline de julgamento cego: `mapping.json` + `_metrics.json` (console errors + screenshots Playwright por interação).
- ✅ Custos reais: Sonnet 5 $2,27 · Sonnet 4.6 $2,06 · Opus 4.8 $3,49 · Fable 5 $15,81.
- ✅ Site estático de publicação (index / benchmark / modelos, Geist Mono, `assets/site.css`).
- ✅ Squad "Overclock Bench" desenhada e aprovada (falta persistir com 3º juiz).

**Buraco:** rubrica ainda implícita (`criteria: {}` nos metrics). Fase 2 (harness contender) nunca rodou. Veredito v0 nunca foi formalizado num ranking auditável.

---

## Fases do projeto

### Fase 0 — Persistir squad + fechar rubrica *(gate humano já dado p/ persist)*
**Objetivo:** squad viva na conta 2 + rubrica explícita antes de rodar qualquer coisa.

| Passo | Quem executa | Entrega |
|---|---|---|
| 0.1 Adicionar 3º juiz (codex/gpt-5.5) ao preset → painel de 3 não-Claude vs Claude | **Tu** (edita preset) / eu preparo o JSON | preset com 3 reviewers: `blind-judge` (opus, Claude), `blind-judge-cross` (gemini), `blind-judge-3` (gpt-5.5) |
| 0.2 Persistir squad na **conta 2** | **Tu** via `overclock_squad_save` | squad `overclock-bench-2026-07-03` salva |
| 0.3 Formalizar a **rubrica** (hoje `criteria:{}`) | **blind-judge** (model-evaluator) desenha, **tu** aprova | `judging/RUBRIC.md` versionado |

**Rubrica (proposta, 5 eixos, 0-5 cada):**
1. **Auto-verificação** — abriu o browser e conferiu o próprio trabalho? *(o eixo que separa modelos)*
2. **Correção funcional** — faz o que o prompt pediu, sem quebrar.
3. **Fidelidade ao prompt** — WASD, zoom, click, dados — tudo presente.
4. **Robustez** — zero console error (medido, não opinado — `_metrics.json`).
5. **Qualidade de UX** — render, sensação, acabamento.

**Gate 0:** tu aprova rubrica + preset de 3 juízes. → só então roda.

---

### Fase 1 — Baseline reproduzível (revalidar v0 com o rig automatizado)
**Objetivo:** provar que a squad reproduz os números da v0 antes de confiar nela pra fase 2.

| Passo | Quem executa | Entrega |
|---|---|---|
| 1.1 Escolher bateria de smoke (1 prompt: **001 solar 3D**, 4 modelos crus) | **orchestrator** | plano de fan-out |
| 1.2 Fan-out: 1 pane por modelo cru, prompt VERBATIM, 1 chute, 0 skill | **runner** (prompt-engineer) | 4 outputs single-file + transcripts |
| 1.3 Captura render/screenshots/console | **runner** (webapp-testing/Playwright) | screenshots por interação |
| 1.4 Auditar custo/tokens/erros | **metrics-auditor** (data-analyst) | `_metrics.json` por run |
| 1.5 Anonimizar run-A/B/C/D, esconder `mapping.json` dos juízes | **orchestrator** | mapa secreto |
| 1.6 Julgar às cegas (painel de 3) com a rubrica da fase 0 | **blind-judge ×3** | 3 scorecards |
| 1.7 Conciliar; divergência → flag humano | **orchestrator** | veredito baseline |

**Verify:** ranking+custo da smoke bate com v0 (Fable caro, Opus/Sonnet baratos)? Sim → rig confiável. Não → debugar rig antes de escalar.

**Gate 1:** tu confirma que o baseline reproduz. → libera fase 2.

---

### Fase 2 — A tese (harness contender vs Fable solo)
**Objetivo:** medir a caixa-preta na MESMA régua e resolver a tese.

| Passo | Quem executa | Entrega |
|---|---|---|
| 2.1 Definir o **harness contender** (Opus 4.8 + Sonnet 5 orquestrados) | **Tu** + orchestrator | contender caixa-preta declarado |
| 2.2 Spawnar o harness, entregar MESMO prompt 001, deixar auto-orquestrar | **runner** | output final single-file + TODAS as sub-panes |
| 2.3 Somar custo **cumulativo** de todas as sub-panes | **metrics-auditor** | custo caixa |
| 2.4 Entrar como **run-E** anônimo no mesmo pool dos crus | **orchestrator** | juiz não sabe que é caixa |
| 2.5 Painel de 3 julga cego, mesma rubrica | **blind-judge ×3** | scorecards |
| 2.6 Revelar mapping, comparar `quality/cost(caixa)` vs `Fable-5 solo` | **orchestrator** | **veredito da tese** |

**Verify:** caixa empata/ganha em qualidade a ~⅓ do custo do Fable? → tese confirmada (ou refutada, honestamente).

**Gate 2:** tu aprova o veredito antes de publicar.

---

### Fase 3 — Live: publicar o primeiro teste
**Objetivo:** primeiro resultado no ar no site existente.

| Passo | Quem executa | Entrega |
|---|---|---|
| 3.1 Gerar página do teste 001 (baseline + tese) no padrão do site | **publisher** (frontend-developer + frontend-design) | `benchmark-harness-vs-fable.html` (ou seção em `benchmark.html`) |
| 3.2 Respeitar design system: Geist Mono, `assets/site.css`, layout nav existente — **não inventar** | **publisher** | HTML on-brand |
| 3.3 Screenshots dos runs + tabela qualidade×custo + veredito | **publisher** | página completa |
| 3.4 Link na `index.html` + `nav` | **publisher** | navegação atualizada |
| 3.5 **Ir live** (site é estático puro → deploy = servir os HTML; sem toml/vercel/netlify hoje) | **Tu** decide host | URL público |

**Verify:** página abre, screenshots carregam, números conferem com `_metrics.json`, custo cumulativo visível. → **primeiro teste publicado.** ✅

**Gate 3:** tu aprova antes de ir live (gate de publicação da constraint).

---

## Quem executa o quê (mapa da squad)

| Papel | agentName | model/CLI | Responsabilidade no plano |
|---|---|---|---|
| **orchestrator** | overclock-orchestrator | opus-4.8 / claude | fan-out, guarda mapping, concilia juízes, gates |
| **runner** | prompt-engineer | sonnet-4.6 / claude | executa contenders (cru + caixa), captura Playwright, prompt VERBATIM |
| **metrics-auditor** | data-analyst | haiku-4.5 / claude | tokens, custo cumulativo, console errors → `_metrics.json` |
| **blind-judge** | model-evaluator | opus-4.8 / claude | rubrica às cegas |
| **blind-judge-cross** | model-evaluator | gemini / antigravity | controle de viés não-Claude |
| **blind-judge-3** *(novo)* | model-evaluator | gpt-5.5 / codex | 3º juiz não-Claude, desempate |
| **publisher** | frontend-developer | sonnet-5 / claude | publica no site, respeita design system |

---

## Caminho crítico (menor rota até live)

```
Fase 0 (persist + rubrica) → GATE 0
   → Fase 1 smoke: 001 × 4 crus → GATE 1
      → Fase 2: 001 × harness caixa → GATE 2
         → Fase 3: publica 001 → GATE 3 → LIVE
```

Uma bateria só (teste 001) atravessa todas as fases = **primeiro teste publicado** com o mínimo de risco. Depois escala pros 002-005 reusando o rig.

---

## Riscos / decisões abertas

1. **Fairness fase 2** — o que conta como "sub-pane" da caixa pro custo cumulativo? Definir a fronteira da caixa-preta antes de rodar (senão o custo é contestável).
2. **Self-preference** — mitigado com painel 2-não-Claude + 1-Claude. Se os 3 divergirem muito, a tese fica frágil → flag humano.
3. **Rubrica premia auto-verificação** — precisa ser mensurável, não vibe. Como o juiz sabe que o modelo "abriu o browser"? Vem do transcript, não do output. Runner tem que capturar isso.
4. **Deploy real** — site não tem host configurado. Decisão tua: Coolify? Vercel? servir estático? (Fase 3.5.)
5. **"Conta 2"** — confirmar qual conta e que a squad persiste lá, não na default.
