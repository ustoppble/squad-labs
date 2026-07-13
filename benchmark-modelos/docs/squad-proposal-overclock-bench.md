# Proposta de Squad — "Overclock Bench"

> **Status:** PROPOSTA para aprovação humana. Nada persistido, instalado ou executado.
> Fluxo usado: `overclock-squad-session-analysis` → `overclock-squad-catalog-search` → `overclock-squad-team-assembly`.
> Gerado 2026-07-03.

---

## 0. Tese e diferencial

Benchmark próprio da Overclock para **modelos crus** e — inédito no mercado — para **harnesses** (orquestração multi-modelo tratada como caixa-preta, medida na mesma régua).

**Tese de marketing:** *"Opus 4.8 + Sonnet 5 orquestrados batem Fable 5 solo, por ~1/3 do custo."*

Gap de mercado (já mapeado vs. BridgeMind): benchmarks públicos testam **1 modelo sozinho**. Ninguém mede orquestração. É o que esse projeto ataca — colocar um harness multi-modelo no mesmo ringue que um modelo solo, com **mesmo prompt, mesma rubrica, mesmo juiz cego, custo cumulativo da caixa**.

Insight já publicado que a rubrica precisa premiar: o que separa os modelos é **auto-verificação** (abrir o browser e conferir o próprio trabalho).

---

## 1. O que já existe (v0 — analisado antes de propor)

Diretório `benchmark/sonnet-5/`:

- **`prompts/001-005*.md`** — 5 testes single-file HTML (sistema solar 3D, site Apple, física do mouse, FPS, 2048). Prompt fixo, verboso, em PT.
- **Outputs** `00N`, `00N-46`, `00N-48`, `00N-fable-5` — 4 modelos (Sonnet 5, Sonnet 4.6, Opus 4.8, Fable 5) nos testes 001-004; 005 parcial.
- **`judging/00N/`** — pipeline de julgamento cego já existe:
  - `mapping.json` → `{run-A: sonnet-5, run-B: opus-4.8, run-C: fable-5, run-D: sonnet-4.6}` (mapa anonimizado).
  - `_metrics.json` → captura automática de **console errors** + screenshots por ponto de interação (`_look_before/after`, `_wasd`, `_zoom`, `_click`, `_anim1/2`) via Playwright.
  - `run-A.png … run-D` + variações de interação.
- **`runs/00N/<modelo>/manifest.json`** — manifesto por run.
- **`agentic/`** — app Next.js (candidato natural a **harness contender** e/ou host de publicação).
- **Site de publicação** — `index.html`, `benchmark.html`, `benchmark-fable-vs-opus.html`, `modelos/`, `modelos.html`.
- **Custos reais medidos:** Sonnet 5 $2,27 · Sonnet 4.6 $2,06 · Opus 4.8 $3,49 · **Fable 5 $15,81**.

**Regra de fairness vigente:** modelo cru, um chute, zero skill/subagente, auditado no transcript.

**Conclusão da análise:** a infra de v0 (prompt fixo + anonimização + captura Playwright + rubrica implícita) é exatamente o esqueleto do harness de benchmark. A squad **automatiza e generaliza** esse esqueleto e adiciona a **fase 2 (harness contender)** que v0 ainda não tem.

---

## 2. squad_spec

```json
{
  "goal": "Rodar um benchmark reproduzível de modelos crus (fase 1, baseline) e de harnesses multi-modelo caixa-preta (fase 2, a tese), medindo custo/tokens/transcript e julgando qualidade às cegas com rubrica única, e publicar no site existente.",
  "domain": "LLM/harness benchmarking + publicação estática",
  "deliverable": "Por bateria: artefatos de output anonimizados, _metrics.json (custo+tokens+erros+screenshots), veredito cego com rubrica, e páginas publicadas no site benchmark/sonnet-5.",
  "tags": ["benchmark", "llm-eval", "harness", "blind-judging", "cost-audit", "playwright", "static-site"],
  "roles_needed": [
    "orchestrator",
    "runner (executa bateria crua + harness contender de forma reproduzível, captura artefatos, enforce fairness)",
    "metrics-auditor (custo/tokens/transcript)",
    "blind-judge (rubrica, às cegas)",
    "blind-judge-cross (controle de viés cross-model — opcional)",
    "publisher (site existente)"
  ],
  "constraints": [
    "Fairness fase 1: modelo cru, um chute, zero skill/subagente, auditado no transcript.",
    "Fase 2: contender é caixa-preta — squad só entrega o prompt fixo, deixa a caixa se auto-orquestrar, captura só o output single-file final + custo CUMULATIVO de todas as sub-panes.",
    "Prompt entregue VERBATIM — runner nunca edita/otimiza o prompt.",
    "Anonimização obrigatória: juiz recebe run-A/B/C/D sem o mapping.",
    "Mesma rubrica, mesmo juiz, mesmo conjunto de prompts nas duas fases.",
    "Rubrica premia auto-verificação (abrir browser e conferir o próprio trabalho).",
    "Publicação respeita o design system do site existente — não inventar layout.",
    "Gated: true (aprovação humana antes de rodar qualquer bateria e antes de publicar)."
  ],
  "media": { "image": false, "video": false, "audio": false }
}
```

### Como as duas fases se encaixam (mesma régua)

```
                 ┌───────────────── MESMO RIG ─────────────────┐
prompt fixo ───► │  runner  ──►  captura  ──►  metrics-auditor  │ ──► judge (cego, rubrica)
(001..00N)       │                (Playwright + transcript)     │
                 └──────────────────────────────────────────────┘
FASE 1 (baseline):  contender = modelo CRU (fable-5 | opus-4.8 | sonnet-5 | sonnet-4.6), 1 chute, 0 skill
FASE 2 (a tese):    contender = HARNESS caixa-preta (Opus 4.8 + Sonnet 5 orquestrados), auto-orquestra
                    → custo = SOMA de todas as sub-panes da caixa (cumulativo)

Comparação da tese:  quality(harness) ≥ quality(Fable-5 solo)  E  cost(harness) ≈ ⅓ · cost(Fable-5 solo)
                     (Fable-5 solo baseline: $15,81 medido → alvo caixa ≈ $5)
```

- **Baseline (fase 1)** reproduz e automatiza a v0 → ranking de qualidade + custo por modelo cru.
- **Tese (fase 2)** roda o harness na MESMA bateria, MESMA rubrica, MESMO juiz cego. O juiz não sabe se o run-X é modelo solo ou caixa. Custo da caixa é cumulativo. A tese vale se a caixa empata/ganha em qualidade a ~⅓ do custo do Fable-5 solo.

---

## 3. Shortlist do catálogo (instalado — zero marketplace)

Fonte: `overclock_agent_list` / `overclock_skill_list`. **Todos os papéis cobertos pelo catálogo instalado — nenhum gap de marketplace.** `sources_used: ["installed"]`.

### Agentes

| Papel | Agente instalado | area | score | Por quê |
|---|---|---|---|---|
| orchestrator | `overclock-orchestrator` | orchestrator | — | canônico (único agentName de piloto) |
| runner | `prompt-engineer` | builder | 0.6 | executa/testa prompts em LLM; repurposed como executor de protocolo fixo (entrega verbatim, 1 chute) |
| metrics-auditor | `data-analyst` | builder | 0.7 | análise quantitativa, métricas, custo/token math sobre transcripts |
| blind-judge | `model-evaluator` | reviewer | 0.8 | **especialista em avaliação/benchmark de modelo + design de rubrica** — melhor fit do catálogo |
| blind-judge-cross | `model-evaluator` | reviewer | 0.8 | mesmo agente, CLI diferente (Gemini) p/ controle de viés cross-model |
| publisher | `frontend-developer` | builder | 0.6 | publica HTML no site existente respeitando o design system |

Descartados e por quê: `competitive-analyst` (análise BridgeMind já feita, fora do loop de execução); `oc-chef-*` (sub-orquestradores delegateOnly, redundantes com o piloto); `overclock-site-builder` / `overclock-site-design-extractor` (específicos de scrub/scroll — o site aqui é HTML estático simples); `screenshot-reviewer` (descrição real = revisar task lists, mislabeled); `code-reviewer` / `qa-*` (o alvo do julgamento é qualidade de UX renderizada, não caça-bug de código).

### Skills (bind por membro — nunca lista flat)

| Skill instalada | Bound em | Por quê |
|---|---|---|
| `dispatching-parallel-agents` | orchestrator | fan-out das baterias (N prompts × M contenders em paralelo) |
| `webapp-testing` | runner | captura Playwright: render, screenshots por interação, console logs |
| `llm-evaluation` | blind-judge, blind-judge-cross | estratégias de avaliação (rubrica, human-eval, escalas) |
| `agent-evaluation` | blind-judge | benchmark de agente/harness (fase 2, caixa-preta) |
| `frontend-design` | publisher | publicar respeitando padrão visual (claude → espelhado se CLI≠claude) |

Nada de marketplace: `skills_to_install: []`, `agents_to_install: []`.

---

## 4. SquadPreset final (JSON)

> Modelos por papel: **barato pro mecânico** (haiku/sonnet-4-6), **caro pra decisão** (opus-4-8). CLI default = `claude` (CLI em que o Squad Former roda). Alternativas habilitadas nesta máquina: `gemini`, `codex`, `antigravity`.
>
> **Nota de viés (importante):** os contenders sob teste são modelos Claude. Um juiz Claude (opus-4-8) tem risco de *self-preference*. Por isso a proposta inclui `judge-cross` num modelo NÃO-Claude (Gemini via antigravity) como controle de viés. O veredito final concilia os dois; divergência vira flag de revisão humana.

```json
{
  "preset": {
    "id": "overclock-bench-2026-07-03",
    "name": "Overclock Bench Squad",
    "agents": [
      {
        "id": "orchestrator",
        "agentName": "overclock-orchestrator",
        "category": "orchestrator",
        "cli": "claude",
        "model": "claude-opus-4-8",
        "effort": "high",
        "allowedSkills": ["dispatching-parallel-agents"]
      },
      {
        "id": "runner",
        "agentName": "prompt-engineer",
        "category": "executor",
        "cli": "claude",
        "model": "claude-sonnet-4-6",
        "effort": "medium",
        "allowedSkills": ["webapp-testing"]
      },
      {
        "id": "metrics-auditor",
        "agentName": "data-analyst",
        "category": "executor",
        "cli": "claude",
        "model": "claude-haiku-4-5",
        "effort": "low"
      },
      {
        "id": "blind-judge",
        "agentName": "model-evaluator",
        "category": "reviewer",
        "cli": "claude",
        "model": "claude-opus-4-8",
        "effort": "high",
        "allowedSkills": ["llm-evaluation", "agent-evaluation"]
      },
      {
        "id": "blind-judge-cross",
        "agentName": "model-evaluator",
        "category": "reviewer",
        "cli": "antigravity",
        "model": "gemini-3.5-flash-high",
        "effort": "medium",
        "allowedSkills": ["llm-evaluation"]
      },
      {
        "id": "publisher",
        "agentName": "frontend-developer",
        "category": "executor",
        "cli": "claude",
        "model": "claude-sonnet-5",
        "effort": "medium",
        "allowedSkills": ["frontend-design"]
      }
    ],
    "createdAt": 1783085808867,
    "orchestratorInstructions": "Você orquestra a squad Overclock Bench.\n\nGoal: Benchmark reproduzível de modelos crus (fase 1) e de harnesses multi-modelo caixa-preta (fase 2), com custo/tokens/transcript auditados e julgamento cego por rubrica única, publicado no site existente.\nDomain: LLM/harness benchmarking + publicação estática.\nDeliverable: por bateria — outputs anonimizados, _metrics.json, veredito cego, páginas publicadas.\n\n## Team\n- orchestrator (você): overclock-orchestrator — desenha a bateria, faz fan-out, mantém o mapping.json secreto do juiz, concilia vereditos, gate humano.\n- runner: prompt-engineer — executa cada contender. FASE 1: spawna a pane do modelo cru, entrega o prompt VERBATIM, um chute, zero skill/subagente, salva output single-file + transcript. FASE 2: spawna o harness contender (caixa-preta), entrega o MESMO prompt, deixa a caixa se auto-orquestrar, captura só o output final + TODAS as sub-panes p/ custo cumulativo. Captura render/screenshots/console via Playwright (webapp-testing). NUNCA edita o prompt.\n- metrics-auditor: data-analyst — lê transcripts, soma tokens e custo (cumulativo na fase 2), extrai console errors, emite _metrics.json por run.\n- blind-judge: model-evaluator — desenha/aplica a rubrica ÀS CEGAS sobre run-A/B/C/D (sem mapping). Rubrica premia auto-verificação (abrir browser e conferir o próprio trabalho), correção funcional, fidelidade ao prompt, robustez (zero console error), qualidade de UX.\n- blind-judge-cross: model-evaluator (Gemini, não-Claude) — repete o julgamento cego como controle de viés self-preference. Divergência vs blind-judge vira flag de revisão humana.\n- publisher: frontend-developer — publica resultados no site existente (benchmark/sonnet-5: index.html, benchmark.html, modelos/) respeitando o design system atual (frontend-design). Não inventa layout.\n\n## Workflow\n1. GATE: confirme prompts da bateria e lista de contenders com o humano.\n2. Fan-out (dispatching-parallel-agents): para cada (prompt × contender), dispare runner. Fase 1 = modelos crus; fase 2 = harness contender.\n3. Colete outputs via handoff_list. Anonimize em run-A/B/C/D; grave mapping.json FORA do alcance dos juízes.\n4. metrics-auditor audita cada run → _metrics.json (custo cumulativo na fase 2).\n5. blind-judge + blind-judge-cross julgam às cegas com a MESMA rubrica. Concilie; flag divergências.\n6. Revele o mapping, monte o ranking qualidade×custo. Fase 2: compare quality/cost do harness vs Fable-5 solo (baseline $15,81 → alvo caixa ≈ ⅓).\n7. GATE: aprovação humana antes de publicar.\n8. publisher publica no site existente.\n\n## Constraints\n- Fairness fase 1: cru, 1 chute, 0 skill/subagente, auditado no transcript.\n- Fase 2: contender = caixa-preta; só prompt fixo entra; custo é cumulativo de todas as sub-panes.\n- Prompt VERBATIM sempre. Mesma rubrica/juiz/prompts nas duas fases.\n- Juízes cegos: nunca recebem mapping.json.\n- Publicação respeita o design system existente.\nGated: true"
  },
  "skills_to_install": [],
  "agents_to_install": []
}
```

**Sem provedores de mídia** (`imageProvider`/`videoProvider`/`audioProvider` omitidos) — a squad não gera imagem/vídeo/áudio.

### Alternativas de CLI oferecidas no gate
- Juiz-cross pode ir para `gemini` (`gemini-3-flash-preview`) em vez de `antigravity` — ambos não-Claude, servem de controle de viés. `antigravity/gemini-3.5-flash-high` proposto por ser mais forte em julgamento.
- `codex` (`gpt-5.5`) disponível como terceiro juiz não-Claude se quiser painel de 3 para desempate.
- `frontend-design` é skill claude → se o publisher rodar noutra CLI, o runtime espelha automaticamente.

---

## 5. Checklist de qualidade (team-assembly)

- [x] Exatamente 1 orchestrator com `agentName: "overclock-orchestrator"`.
- [x] Nenhum worker usa `overclock-scout/executor/reviewer` (não existem).
- [x] Todos os `agentName` de worker são nomes reais do catálogo instalado.
- [x] `allowedSkills` por membro — bind específico; omitido (não `[]`) em quem não usa skill (`metrics-auditor`).
- [x] `orchestratorInstructions` nomeia cada membro por `id`, sem enumerar skills como prosa.
- [x] Manifesto de instalação só com `installed:false` → **vazio** (tudo instalado).
- [x] `id` único com data.
- [x] `createdAt` numérico (Unix ms).

---

## 6. Próximo passo (após aprovação humana)

Nada foi persistido/instalado. Ao aprovar:
1. `overclock-squad-team-assembly` já entregou o preset — persistir via `overclock_squad_save` (manifesto de install vazio → sem `overclock-squad-marketplace-install`).
2. Rodar **fase 1** (baseline) numa bateria pequena p/ validar o rig contra os números de v0.
3. Rodar **fase 2** (harness contender) e medir a tese.

Aprovar o squad_spec, a shortlist e o SquadPreset acima antes de qualquer persist/execução.
