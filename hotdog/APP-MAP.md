# APP-MAP — Singular Contabilidade (Organizador)

> Mapa para redesign visual. READ-ONLY. Não modificar lógica.
> Repo: `/Users/laschuk/vibe-coding/singular/singular-contabilidade-project`

---

## 1. STACK / FRAMEWORK

### Backend
| Camada | Tecnologia | Arquivo de prova |
|--------|-----------|-----------------|
| Framework web | **FastAPI 0.138** + Uvicorn 0.49 | `requirements.txt:8-9` |
| Banco de dados | **SQLite** (stdlib, WAL mode) | `web/db.py:20,43` |
| Autenticação | Cookie httponly `sid` (sessão + PBKDF2-SHA256) | `web/auth.py:43-70` |
| Motor de docs | `motor/` — pdfplumber, openpyxl, python-docx, EasyOCR opcional | `requirements.txt:2-8` |
| Servidor de estáticos | FastAPI serve `/web/static/` na raiz `/` | `web/api.py:59-61` |

### Frontend
| Aspecto | Tecnologia | Arquivo |
|---------|-----------|---------|
| Arquitetura | **SPA em vanilla JS** (`"use strict"`) — sem framework | `web/static/app.js:1-4` |
| Template engine | **Nenhuma** — HTML puro gerado por string templates em JS | `web/static/app.js:188-238` |
| CSS | **CSS puro** — variables CSS custom (`:root`), sem Tailwind/Bootstrap | `web/static/estilo.css:7-35` |
| Fontes | Google Fonts: **Fraunces** (display/serif) + **Plus Jakarta Sans** (corpo) | `web/static/index.html:7-9` |
| Build tooling | **Nenhum** — arquivos servidos diretamente | — |
| Ícones | SVG inline hard-coded no HTML | `web/static/index.html:52-79` |

### Paleta de Design System (tokens CSS)
```css
/* web/static/estilo.css:7-35 */
--paper: #f4f2ec;        /* fundo body */
--surface: #fffefb;      /* cards/painéis */
--surface-2: #faf8f2;    /* fundos secundários */
--ink: #1b2420;          /* texto principal */
--ink-soft: #3c4742;     /* texto secundário */
--muted: #76847d;        /* rótulos/placeholder */
--line: #e7e3d8;         /* bordas */
--line-strong: #d9d4c6;  /* bordas fortes */
--brand: #1c7a52;        /* verde primário */
--brand-700: #145d3e;    /* verde escuro */
--brand-50: #e7f1ea;     /* verde pálido */
--ok: #1c7a52;           /* verde status OK */
--warn: #9a6a12;         /* âmbar aviso */
--danger: #b23a32;       /* vermelho perigo */
--radius: 14px;
--radius-sm: 9px;
--sans: "Plus Jakarta Sans";
--serif: "Fraunces";
```

---

## 2. SCREENS / ROUTES

O app é uma SPA: **uma única rota** `GET /` serve `index.html`. A navegação é feita por JS trocando classes `.ativo` em `<section class="painel">` e botões `.aba`. Não há router de URL — tudo na memória.

### Endpoint de estáticos
```
GET /          → web/static/index.html   (índice)
GET /estilo.css → web/static/estilo.css
GET /app.js    → web/static/app.js
```

### API REST (consumida pelo frontend)
```
POST   /api/login                          auth/login
POST   /api/logout                         auth/logout
GET    /api/me                             usuário atual
POST   /api/upload                         upload + processa documento
GET    /api/documentos?limite=50           lista recentes
GET    /api/documentos/{id}/arquivo        serve arquivo para visualização
POST   /api/documentos/{id}/corrigir       reclassificação manual
POST   /api/documentos/{id}/descartar      → lixeira (reversível)
POST   /api/documentos/{id}/restaurar      lixeira → revisão
POST   /api/documentos/{id}/copiar         copia para outra empresa
DELETE /api/documentos/{id}                exclusão definitiva (admin)
GET    /api/revisao                         fila de revisão
GET    /api/lixeira                         lixeira de documentos
GET    /api/checklist?empresa_id=&competencia=  checklist mensal
GET    /api/empresas                        lista cadastradas
POST   /api/empresas                        cria empresa (manual)
PATCH  /api/empresas/{id}                  atualiza empresa
DELETE /api/empresas/{id}                  exclui (suave, só admin)
GET    /api/empresas/revisao               cadastros com problema
GET    /api/empresas/lixeira               empresas na lixeira
POST   /api/empresas/acoes                 ação em lote (desativar/excluir/etc.)
POST   /api/empresas/importar/previa       pré-visualização de importação
POST   /api/empresas/importar              importa lote confirmado
GET    /api/empresas/{id}/detalhe          empresa + documentos
GET    /api/empresas/{id}/arvore           árvore de pastas/arquivos
GET    /api/usuarios                        lista usuários (admin)
POST   /api/usuarios                        cria usuário (admin)
PATCH  /api/usuarios/{id}                  atualiza papel/ativo (admin)
GET    /api/logs                           registro de atividades (admin)
GET    /api/backup/baixar                  .zip do sistema (admin)
```

### Screens (painéis da SPA)

#### LOGIN
- **Elemento:** `#tela-login` (`div.tela-login`) — `index.html:14-37`
- **Visibilidade:** `fixed; inset:0; z-index:100` — sobrepõe tudo; mostrado até autenticação
- **Formulário:** `#form-login` → `POST /api/login` → seta cookie `sid`
- **Campos:** `#login-email` (email), `#login-senha` (password)
- **Elementos chave:** `#login-erro` (erro inline), `#login-btn` (submit), `.ponto-online` (status servidor)
- **CSS:** `.tela-login`, `.login-card`, `.login-marca`, `.login-form` — `estilo.css:641-689`

#### DASHBOARD / ENTRADA (aba padrão)
- **Elemento:** `#painel-entrada` — `index.html:115-150`
- **Aba trigger:** `button.aba[data-aba="entrada"]` — `index.html:51-54`
- **O que faz:** Upload de documentos (drag-and-drop ou seleção); lista "Últimos processados"
- **Sub-elementos:**
  - `#dropzone` — área de drag-and-drop
  - `#btn-escolher` → `#input-file` (1 arquivo)
  - `#btn-pasta` → `#input-pasta` (pasta inteira)
  - `#lote-progresso` — progresso de lote
  - `#resultado` — card do resultado imediato
  - `#entrada-busca` — busca nos recentes
  - `#lista-documentos` — grid de `.cartao` com docs recentes
- **API:** `POST /api/upload`, `GET /api/documentos`

#### CHECKLIST
- **Elemento:** `#painel-checklist` — `index.html:153-166`
- **Aba trigger:** `button.aba[data-aba="checklist"]`
- **O que faz:** Mostra o que foi/falta receber de uma empresa em determinada competência
- **Filtros:** `#sel-empresa` (select), `#sel-competencia` (seletor mês+ano PT-BR)
- **Tabela:** `#checklist-tabela` — `table.checklist` com colunas "Categoria esperada" e "Situação"
- **API:** `GET /api/checklist?empresa_id=&competencia=`

#### REVISÃO
- **Elemento:** `#painel-revisao` — `index.html:169-189`
- **Aba trigger:** `button.aba[data-aba="revisao"]` com `#badge-revisao` (contador)
- **O que faz:** Documentos que o motor não teve certeza; equipe corrige empresa/categoria/competência
- **Filtro:** segmento "Todos / Só os meus" (`#revisao-segmento`)
- **Busca:** `#revisao-busca`
- **Lista:** `#lista-revisao` — cards `.cartao.revisar` com form de correção injetado
- **Formulário de correção** (por card):
  - `select[data-campo="empresa"]` — empresa
  - `select[data-campo="categoria"]` — categoria
  - `[data-campo="competencia"]` — seletor mês+ano
  - `button[data-corrigir]` → `POST /api/documentos/{id}/corrigir`
  - `button[data-descartar]` → `POST /api/documentos/{id}/descartar`
- **API:** `GET /api/revisao`

#### LIXEIRA
- **Elemento:** `#painel-lixeira` — `index.html:192-212`
- **Aba trigger:** `button.aba[data-aba="lixeira"]` com `#badge-lixeira`
- **O que faz:** Documentos descartados da revisão; pode restaurar ou excluir definitivamente
- **Lista:** `#lista-lixeira` com botões `data-restaurar` e `data-excluir-def`
- **API:** `GET /api/lixeira`, `POST /api/documentos/{id}/restaurar`, `DELETE /api/documentos/{id}`

#### EMPRESAS (Gestão de Clientes)
- **Elemento:** `#painel-empresas` — `index.html:215-302`
- **Aba trigger:** `button.aba[data-aba="empresas"]`
- **Visão padrão:** `#empresas-visao-lista` com 3 sub-abas:
  - **Cadastradas** (`#emp-sub-cadastradas`):
    - Importação em lote de arquivo (`#btn-importar` → `POST /api/empresas/importar/previa`)
    - Nova empresa manual (`#btn-nova-empresa` → modal → `POST /api/empresas`)
    - Tabela `#empresas-tabela` — checkboxes de seleção + barra de ação em massa `#empresas-acao-massa`
    - Busca `#empresas-busca`
  - **Em revisão** (`#emp-sub-revisao`): cadastros com CNPJ inválido/ausente/duplicado
  - **Lixeira** (`#emp-sub-lixeira`): empresas excluídas (recuperáveis)
- **Visão detalhe:** `#empresas-visao-detalhe` com explorador de arquivos (árvore de pastas)
- **API:** CRUD completo em `/api/empresas/*`

#### USUÁRIOS (admin)
- **Elemento:** `#painel-usuarios` — `index.html:305-341`
- **Aba trigger:** `button.aba.aba-admin[data-aba="usuarios"]` — **oculta para não-admins**
- **O que faz:** Backup do sistema + CRUD de usuários (papel: funcionário/admin)
- **Formulário:** `#form-usuario` → `POST /api/usuarios`
- **Tabela:** `#usuarios-tabela`
- **API:** `GET/POST/PATCH /api/usuarios`, `GET /api/backup/baixar`

#### LOGS (admin)
- **Elemento:** `#painel-logs` — `index.html:344-353`
- **Aba trigger:** `button.aba.aba-admin[data-aba="logs"]` — **oculta para não-admins**
- **Tabela:** `#logs-tabela` (`table.logs`)
- **API:** `GET /api/logs`

---

## 3. COMPONENT & TEMPLATE STRUCTURE

### Layout geral (`index.html:39-356`)
```
.app (grid: 268px sidebar | 1fr main)
├── aside.sidebar
│   ├── .marca (logo "S" + nome)
│   ├── nav.abas#abas (botões de navegação)
│   ├── .sidebar-usuario#sidebar-usuario (avatar + nome + logout)
│   └── .sidebar-rodape (ponto online + versão)
└── div.main
    ├── header.topbar (título + subtítulo + stat contador)
    └── main.conteudo
        ├── section#painel-entrada
        ├── section#painel-checklist
        ├── section#painel-revisao
        ├── section#painel-lixeira
        ├── section#painel-empresas
        ├── section#painel-usuarios
        └── section#painel-logs
```

### Onde fica o CSS global
**Um único arquivo:** `web/static/estilo.css` — todas as variáveis, reset, layout, componentes.  
**Ponto de injeção do tema:** variáveis CSS em `:root` (linha 7-35) — trocar as variáveis reestiliza o app inteiro.

### Componentes reutilizados (gerados dinamicamente por JS)
| Componente | Classe CSS | Gerado em |
|-----------|-----------|-----------|
| Card de documento | `.cartao` (`.ok` / `.revisar`) | `app.js:188-238` (fn `cartaoDocumento`) |
| Selo de status | `.selo.ok` / `.selo.revisar` / `.selo.neutro` | `app.js:181-186` |
| Barra de confiança | `.conf-barra > .conf-fill` | `app.js:202` |
| Seletor de competência PT-BR | `.seletor-comp > .comp-mes + .comp-ano` | `app.js:101-118` |
| Modal genérico | `.modal-overlay > .modal-caixa` | `app.js:579-602` (fn `confirmarSimples`) |
| Modal de exclusão com motivo | `.modal-overlay > .modal-caixa + .modal-motivos` | `app.js:626-667` |
| Toast | `#toast.toast` (`.erro-toast`) | `app.js:137-144` |
| Explorador de pastas | `.explorador > .explorador-arvore + .explorador-arquivo` | `app.js` (fn `renderExplorador`) |
| Tabela de checklist | `table.checklist` | `app.js:481-490` |
| Progresso de lote | `.lote-progresso > .lote-itens > .lote-item` | `app.js:334-409` |

### Sidebar
- **Marca/logo:** `.marca > .marca-logo` (fundo gradiente verde, letra "S" em Fraunces) + `.marca-texto`
- **Nav:** `.abas > button.aba[data-aba]` — JS troca `.ativa` em `trocarAba()` (`app.js:166-176`)
- **Usuário:** `.sidebar-usuario` com `.su-avatar`, `.su-info`, `#btn-logout`
- **Admin-only:** `.aba-admin` — hidden por padrão, revelada se `usuario.papel === "admin"`

### Responsivo
- `@media (max-width: 860px)` — sidebar vira header horizontal (`estilo.css:766-776`)
- `@media (max-width: 720px)` — form de empresa: grid 1 coluna (`estilo.css:503-506`)
- `@media (max-width: 560px)` — opções de entrada: 1 coluna (`estilo.css:533`)
- `@media (max-width: 760px)` — explorador: 1 coluna (`estilo.css:624`)

---

## 4. DATA / LOGIC PER SCREEN

### LOGIN
- **Lê:** nada (pré-autenticação)
- **Escreve:** `POST /api/login {email, senha}` → seta cookie `sid` httponly (12h)
- **Lógica JS:** `form-login submit` → `apiPost('/api/login', ...)` → chama `iniciarApp()` que carrega empresas, documentos e mostra `#app`

### ENTRADA (Dashboard)
- **Lê:** `GET /api/documentos` (últimos 50, filtrável por busca local)
- **Escreve:** `POST /api/upload` (multipart) — processa via motor (OCR/texto → reconhecimento → classificação → banco)
- **Formulários:** `#input-file`, `#input-pasta`, `#dropzone` (drag-and-drop)
- **Busca:** cliente-side, sobre `_DOCS_RECENTES` (nome, empresa, CNPJ, competência)
- **Interações:** botão "Abrir documento" (modal inline com iframe/img), "Localizar na pasta" (navega para aba Empresas → detalhe), "Ir para revisão", "Corrigir" (modal de reclassificação)

### CHECKLIST
- **Lê:** `GET /api/checklist?empresa_id=&competencia=` — lista de obrigações com status `recebido/falta`
- **Formulário de filtro:** `#sel-empresa` (select) + `#sel-competencia` (seletor mês+ano PT-BR)
- **Interação:** botão "Ver checklist" chama `carregarChecklist()`

### REVISÃO
- **Lê:** `GET /api/revisao` — docs `status='revisar'`
- **Escreve:**
  - `POST /api/documentos/{id}/corrigir {empresa_id, categoria, competencia}` — reclassifica e move arquivo
  - `POST /api/documentos/{id}/descartar {}` — move para lixeira
- **Filtros:** todos/meus (por `usuario_id`), busca client-side
- **Estado:** `_REVISAO_DOCS`, `_REVISAO_FILTRO`, `_REVISAO_BUSCA` (variáveis globais JS)

### LIXEIRA
- **Lê:** `GET /api/lixeira`
- **Escreve:**
  - `POST /api/documentos/{id}/restaurar` — volta para revisão
  - `DELETE /api/documentos/{id} {motivo, motivo_texto}` — exclusão definitiva (qualquer usuário que enviou, ou admin)
- **Modal de exclusão** exige escolha de motivo + confirmação (`app.js:626-667`)

### EMPRESAS
- **Lê:**
  - `GET /api/empresas` (lista com status, CNPJ, regime)
  - `GET /api/empresas/{id}/detalhe` (empresa + documentos)
  - `GET /api/empresas/{id}/arvore` (árvore de pastas do filesystem)
  - `GET /api/empresas/revisao`, `GET /api/empresas/lixeira`
- **Escreve:**
  - `POST /api/empresas {razao_social, cnpj, nome_fantasia, sigla, regime, apelidos, dados_cadastrais}` — obrigatórios: razao_social + cnpj
  - `PATCH /api/empresas/{id}` — edição/ativar/desativar
  - `DELETE /api/empresas/{id}` — exclusão suave (admin)
  - `POST /api/empresas/acoes {ids:[], acao}` — ação em massa
  - `POST /api/empresas/importar/previa` (arquivo) + `POST /api/empresas/importar` (lote confirmado)
- **Interações:** seleção múltipla com checkboxes + barra `.acao-massa`, busca client-side por nome/sigla/CNPJ
- **Formulário de empresa:** modal `.modal-empresa-form` com 2 colunas, sócios dinâmicos (linhas `socio-row`)

### USUÁRIOS (admin)
- **Lê:** `GET /api/usuarios`
- **Escreve:**
  - `POST /api/usuarios {nome, email, senha, papel}` — cria usuário
  - `PATCH /api/usuarios/{id} {papel|ativo}` — promover/rebaixar/ativar/desativar
- **Backup:** `GET /api/backup/baixar` — ZIP streaming para download

### LOGS (admin)
- **Lê:** `GET /api/logs`
- **Exibe:** table `logs` com colunas quando, quem, ação, detalhe

---

## 5. SAFE-CHANGE NOTES

### Ponto único para injetar tema global
**`web/static/estilo.css` bloco `:root` (linhas 7-35)** — substituir ou sobrescrever as variáveis CSS é o único ponto necessário para trocar paleta, tipografia, raios e sombras. O CSS inteiro consome essas variáveis.

Para redesign: adicionar um arquivo `tema.css` carregado APÓS `estilo.css` em `index.html:10` e sobrescrever apenas o `:root` — zero risco de quebrar lógica.

### Markup seguro para restyling (sem consequências JS)
Estas classes são puramente visuais — podem ser renomeadas **somente se** o novo CSS replicar exatamente as mesmas referências JS:

| Elemento | Observação |
|----------|-----------|
| `.sidebar`, `.main`, `.topbar`, `.conteudo` | Layout — JS não lê essas classes |
| `.cartao`, `.cartao-topo`, `.cartao-grade`, `.campo`, `.rotulo`, `.valor` | Puramente visual |
| `.selo`, `.conf-barra`, `.conf-fill` | Puramente visual |
| `.filtros`, `.secao-cabecalho`, `.secao-titulo`, `.secao-ajuda` | Puramente visual |
| `.tabela-wrap`, `table.checklist` | Puramente visual |
| `.login-card`, `.login-form`, `.login-marca` | Puramente visual |
| `.toast`, `.toast.erro-toast` | Puramente visual |
| `.modal-overlay`, `.modal-caixa` | Puramente visual |

### IDs e classes usados pelo JS — NÃO renomear sem atualizar app.js
| Seletor | Usado em |
|---------|---------|
| `#tela-login` | `app.js` — controla visibilidade da tela de login |
| `#app` | `app.js` — controla visibilidade do app principal |
| `#form-login` | `app.js` — event listener submit |
| `#login-email`, `#login-senha`, `#login-erro`, `#login-btn` | `app.js` — leitura de valores e exibição de erro |
| `#abas`, `button.aba[data-aba]` | `app.js:166` — trocarAba() por `dataset.aba` |
| `.painel#painel-{nome}` | `app.js:167` — toggle `.ativo` |
| `#badge-revisao`, `#badge-lixeira` | `app.js` — atualização de contadores |
| `#titulo-secao`, `#sub-secao` | `app.js:161-164` — topbar dinâmica |
| `#topbar-stat`, `#stat-num` | `app.js:267-271` |
| `#dropzone`, `#input-file`, `#input-pasta` | `app.js:412-431` — upload |
| `#btn-escolher`, `#btn-pasta` | `app.js:416-417` |
| `#lote-progresso`, `#lote-itens`, `#lote-n`, `#lote-fill`, `#lote-pct` | `app.js:334-408` — progresso de lote |
| `#resultado` | `app.js:253` |
| `#lista-documentos` | `app.js:279-297` |
| `#entrada-busca` | `app.js` — busca client-side |
| `#sel-empresa`, `#sel-competencia` | `app.js:443-446, 472` — checklist |
| `#btn-checklist` | `app.js` |
| `#checklist-tabela` | `app.js:476` |
| `#lista-revisao` | `app.js:504` |
| `#revisao-segmento .seg-opcao[data-filtro]` | `app.js:763-765` |
| `#revisao-contagem`, `#revisao-busca` | `app.js` |
| `#lista-lixeira` | `app.js:687` |
| `#lixeira-segmento .seg-opcao[data-filtro]` | `app.js:754-758` |
| `#lixeira-contagem`, `#lixeira-busca` | `app.js` |
| `#empresas-tabela`, `#empresas-busca`, `#empresas-busca-contagem` | `app.js:1025-1093` |
| `#empresas-acao-massa`, `#empresas-sel-count`, `#emp-check-all` | `app.js:1097-1109` |
| `.emp-check[data-emp-id]` | `app.js:1079-1083` — seleção em massa |
| `#empresas-segmento .seg-opcao[data-emp-sub]` | `app.js:1140-1148` — sub-abas Empresas |
| `#emp-sub-cadastradas`, `#emp-sub-revisao`, `#emp-sub-lixeira` | `app.js:1144-1147` |
| `#empresas-visao-lista`, `#empresas-visao-detalhe` | `app.js:998-1004` |
| `#empresa-detalhe` | `app.js` — detalhe da empresa (explorador) |
| `#btn-nova-empresa`, `#btn-importar`, `#import-arquivo` | `app.js` |
| `#badge-emp-revisao`, `#badge-emp-lixeira` | `app.js:1159-1162` |
| `#empresas-revisao-lista`, `#empresas-lixeira-lista` | `app.js:1164, 1221` |
| `#emp-lixeira-acao-massa`, `#emp-lixeira-sel-count`, `#emplix-check-all` | `app.js:1262-1273` |
| `.emplix-check[data-emp-id]` | `app.js:1241-1251` |
| `#usuarios-tabela` | `app.js:916` |
| `#form-usuario`, `#nu-nome`, `#nu-email`, `#nu-senha`, `#nu-papel` | `app.js:978-990` |
| `#btn-recarregar-*` | `app.js` — botões de recarregar em cada painel |
| `#btn-logout` | `app.js` — logout |
| `#sidebar-usuario`, `#su-avatar`, `#su-nome`, `#su-papel` | `app.js` — info do usuário logado |
| `button.aba.aba-admin` | `app.js` — visibilidade para admins |
| `#logs-tabela` | `app.js` |
| `#toast` | `app.js:137-144` — notificações |
| `#btn-baixar-backup` | `app.js:883-911` |

### Atributos `data-*` usados pelo JS (NÃO remover do HTML)
- `data-aba` nos botões de navegação
- `data-campo`, `data-doc` nos selects de revisão (corrigir documento)
- `data-corrigir`, `data-descartar`, `data-restaurar`, `data-excluir-def`
- `data-emp-ver`, `data-emp-ativo`, `data-emp-id`, `data-emp-sub`
- `data-emp-massa`, `data-emplix-massa`
- `data-emprev-editar`, `data-emprev-confirmar`, `data-emprev-descartar`
- `data-abrir-doc`, `data-ir-pasta`, `data-ir-revisao`, `data-ir-empresas`
- `data-corr-emp`, `data-copia-emp`
- `data-modal` (cancelar/confirmar/salvar/copiar) — controles de modal
- `data-acao`, `data-id`, `data-papel`, `data-ativo` — nos botões de usuários
- `data-filtro` nos botões de segmento (todos/meus)

### Nomes de campos de formulário que chegam à API
| Campo | Form | API endpoint |
|-------|------|-------------|
| `email`, `senha` | `#form-login` | `POST /api/login` |
| `nome`, `email`, `senha`, `papel` | `#form-usuario` | `POST /api/usuarios` |
| `select[data-campo="empresa"]` | revisão | `POST /api/documentos/{id}/corrigir` |
| `select[data-campo="categoria"]` | revisão | idem |
| `[data-campo="competencia"]` | revisão | idem |

### O que NÃO tocar no motor/backend
- `web/db.py` — schema SQLite; colunas são referenciadas por nome em todo o JS
- `web/auth.py` — lógica de sessão; cookie `sid` é lido diretamente por `usuario_atual()`
- `web/api.py` — rotas; URLs hardcoded em `app.js`
- `motor/` — não faz parte do frontend

---

## Sumário

**Stack:** FastAPI + SQLite no backend; SPA vanilla JS sem framework no frontend; CSS puro com variáveis custom (`:root` em `estilo.css`).

**Telas:** LOGIN (`#tela-login`), ENTRADA/dashboard (`#painel-entrada`), CHECKLIST (`#painel-checklist`), REVISÃO (`#painel-revisao`), LIXEIRA (`#painel-lixeira`), EMPRESAS (`#painel-empresas`), USUÁRIOS/admin (`#painel-usuarios`), LOGS/admin (`#painel-logs`).

**Ponto de injeção do tema:** variáveis CSS em `web/static/estilo.css:7-35` (`:root`). Adicionar `<link rel="stylesheet" href="/tema.css">` após linha 10 do `index.html` e sobrescrever o `:root` é suficiente para reestilizar todo o app sem risco de quebrar lógica JS.
