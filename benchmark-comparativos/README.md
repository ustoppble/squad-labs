# site/ — páginas publicadas do Overclock Benchmark

## Como regenerar

```bash
python3 tools/publish.py
```

Grava `site/index.html` e `site/teste-001.html`. Zero dependência (stdlib).
Output determinístico — só o timestamp do footer muda entre execuções.

## Contrato

- **Fonte única de dados: `site/data/results.json`** (validado por `site/data/results.schema.json`).
  Toda célula, pill, custo e contagem das páginas deriva exclusivamente dele.
- Veredito (`entregou` / `defeitos` / `quebrou`) só entra no results.json via
  julgamento cego (judge.json) — nunca editorial.
- `null` no results.json = "não medido / não julgado" → vira `—` na página.
  Célula vazia é célula vazia: nenhum número é inventado.
- Destaque (`tr.hero` / `.cell.hero`) só existe quando há verdict `entregou`;
  sem julgamento, nenhuma linha é herói.
- Design system: `site/assets/site.css` (tokens `--ov`, dark `#0A0A0A`,
  accent `#FF3B30`, Geist Mono via Google Fonts no `<head>` gerado).

## O que NUNCA fazer

- **NUNCA editar `index.html` / `teste-001.html` à mão** — são gerados;
  qualquer edição manual é perdida no próximo `publish.py`.
  Conteúdo muda em `results.json` (dados) ou `tools/publish.py` (template).
- NUNCA escrever número, veredito ou análise direto no template — se não está
  no results.json, não existe.
- NUNCA inventar classe CSS nova no template sem antes existir em `site.css`.
- NUNCA usar `:nth-child` pra marcar herói — a classe explícita é `tr.hero`.
