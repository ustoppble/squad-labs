# Arquitetura de Informação — Barba Brava

> Loja de cremes de barbear artesanais. Documento de planejamento de IA.
> Ancorado no conteúdo real do projeto: `index.html`, `app.js` (array `PRODUCTS`), `sitemap.xml`, `robots.txt`.
> Estado atual: **single-page** (`/`) com hero, grid de 6 produtos, seção Sobre, footer de contato e carrinho em drawer (estado em memória, checkout ainda é `alert`).

## Catálogo real (base de toda a taxonomia)

Os 6 produtos abaixo são a única fonte de verdade. Nada inventado.

| # | Nome | Preço | Ingredientes-chave | Perfil |
|---|------|-------|--------------------|--------|
| 1 | Creme Clássico Lavanda | R$ 42,90 | óleo de lavanda + aloe vera | suave, aromático, antiirritação |
| 2 | Creme Intenso Carvão Ativado | R$ 54,90 | carvão ativado + argila negra | purificante, detox |
| 3 | Creme Premium Sândalo & Cedro | R$ 67,90 | manteiga de karité + sândalo + cedro | aroma marcante, favorito dos barbeiros |
| 4 | Creme Fresh Hortelã & Eucalipto | R$ 48,90 | hortelã + eucalipto | refrescante, uso matinal |
| 5 | Creme Artesanal Âmbar & Baunilha | R$ 59,90 | âmbar + baunilha | quente, sofisticado, pós-barba macio |
| 6 | Creme Gold Argão & Aloe | R$ 79,90 | óleo de argão marroquino + aloe vera | fórmula mais nobre, barbas exigentes |

Faixa de preço real: **R$ 42,90 – R$ 79,90**. Atributos comuns a todos (do conteúdo da seção Sobre): sem parabenos, sem sulfatos, artesanal, ingredientes naturais. Marca fundada em **2018**, São Paulo/SP.

---

## 1. Sitemap / estrutura de páginas

Evolução do single-page atual para multi-page. Cada item marcado `[JÁ EXISTE como seção]` ou `[NOVA]`.

```
/                              Home                        [JÁ EXISTE como página /]
/produtos                      Catálogo / listagem         [JÁ EXISTE como seção #produtos]
/produtos/:slug                Página de Produto (PDP)     [NOVA]  (hoje só card no grid)
/colecoes/:slug                Página de Coleção/categoria [NOVA]
/sobre                         Sobre / Nossa História      [JÁ EXISTE como seção #sobre]
/guia                          Blog / Guia de Barbear      [NOVA]
/guia/:slug                    Artigo individual           [NOVA]
/contato                       Contato                     [JÁ EXISTE como footer #contato]
/carrinho                      Carrinho                    [JÁ EXISTE como drawer, vira página]
/checkout                      Checkout                    [NOVA]  (hoje é alert placeholder)
```

Páginas legais/transacionais de apoio (fase 2, exigidas por e-commerce BR):
```
/politica-de-privacidade       [NOVA]   /trocas-e-devolucoes   [NOVA]
/termos-de-uso                 [NOVA]   /entrega-e-frete       [NOVA]
```

Observação: o carrinho permanece como **drawer** para acesso rápido em qualquer página; `/carrinho` é a rota canônica/profunda (deep-link e fallback sem JS).

---

## 2. Hierarquia de navegação

### Header (menu principal)
Hoje: `Produtos · Sobre · Contato` + botão de carrinho. Evolução:

```
Produtos        → /produtos  (dropdown opcional com Coleções: Por fragrância / Por tipo de pele)
Guia de Barbear → /guia
Sobre           → /sobre
Contato         → /contato
[ícone busca]   → abre campo de busca           [fase 2]
[ícone carrinho]→ abre drawer (badge de qtd)    [JÁ EXISTE]
```

### Footer
Hoje: coluna Navegação + coluna Contato + brand. Evolução em 4 colunas:

- **Marca:** logo + tagline + ano (2018).
- **Loja:** Todos os produtos, Coleções, Mais vendidos.
- **Institucional:** Sobre, Guia de Barbear, Contato.
- **Ajuda/Legal:** Entrega e frete, Trocas e devoluções, Privacidade, Termos.
- Contato (e-mail, telefone, cidade) — manter o que já existe.

### Breadcrumbs (novos, em páginas internas)
```
Home / Produtos / Premium Sândalo & Cedro
Home / Coleções / Amadeirados
Home / Guia / Como aplicar creme de barbear
```
Marcar com schema `BreadcrumbList` (JSON-LD), reaproveitando o padrão de structured data já presente no `index.html`.

---

## 3. Taxonomia de produtos

Derivada **exclusivamente** dos 6 produtos reais.

### Coleções (categoria primária — navegável, vira `/colecoes/:slug`)
Baseadas no tier de naming já usado nos nomes (Clássico, Intenso, Premium, Fresh, Artesanal, Gold), agrupadas por faixa de preço real:

| Coleção | Produtos | Faixa |
|---------|----------|-------|
| Essenciais | Clássico Lavanda, Fresh Hortelã & Eucalipto | R$ 42–49 |
| Intermediários | Intenso Carvão Ativado, Artesanal Âmbar & Baunilha | R$ 54–60 |
| Premium / Gold | Premium Sândalo & Cedro, Gold Argão & Aloe | R$ 67–80 |

### Família olfativa (filtro/coleção secundária)
- **Floral:** Lavanda (1)
- **Herbal / Fresco:** Hortelã & Eucalipto (4)
- **Amadeirado:** Sândalo & Cedro (3)
- **Oriental / Gourmand:** Âmbar & Baunilha (5)
- **Neutro / Detox:** Carvão Ativado (2)
- **Nobre / Amadeirado suave:** Argão & Aloe (6)

### Necessidade / tipo de pele (filtro — derivado das descrições)
- **Pele sensível / antiirritação:** Lavanda (1) — "sem irritação"
- **Pele oleosa / mista:** Carvão Ativado (2) — "purificante, detox"
- **Pele seca / hidratação intensa:** Sândalo & Cedro (3, karité), Gold Argão & Aloe (6)
- **Despertar matinal:** Fresh Hortelã & Eucalipto (4)

### Tags (transversais, não-hierárquicas)
`mais-vendido` · `favorito-dos-barbeiros` (3) · `formula-nobre` (6) · `sem-parabenos` (todos) · `sem-sulfatos` (todos) · `artesanal` (todos) · `aroma-marcante` (3,5) · `aroma-suave` (1,4)

### Atributos filtráveis (facetas na listagem)
1. Faixa de preço (slider R$ 42–80)
2. Família olfativa
3. Tipo de pele / necessidade
4. Intensidade do aroma (suave → marcante)
5. Ingrediente ativo (lavanda, carvão, karité, hortelã, âmbar, argão, aloe vera)

> Os filtros "vegano / cruelty-free", "tamanho do pote (ml)" e "linha sazonal" ficam **a definir** — não há dado no código atual.

---

## 4. Modelo de conteúdo

### Tipo: Produto
| Campo | Origem | Obs. |
|-------|--------|------|
| `id` | `PRODUCTS.id` | existe |
| `nome` | `PRODUCTS.nome` | existe |
| `slug` | derivar de `nome` | novo |
| `preco` | `PRODUCTS.preco` (BRL) | existe |
| `descricao_curta` | `PRODUCTS.desc` | existe |
| `descricao_longa` | — | **a definir** |
| `ingredientes` | parcial nas descrições | estruturar lista — **a completar** |
| `familia_olfativa` | derivado (§3) | novo |
| `tipo_de_pele` | derivado (§3) | novo |
| `colecao` | derivado (§3) | novo |
| `tags` | derivado (§3) | novo |
| `imagem` | hoje placeholder com gradient (`PRODUCTS.gradient`/`cor`) + monograma "BB" | **fotos reais a definir** |
| `cor_tema` | `PRODUCTS.cor` | existe (usar como accent na PDP) |
| `volume_ml` | — | **a definir** |
| `disponibilidade` | JSON-LD usa `InStock` | mapear a estoque real |
| `reviews` / `rating` | — | **a definir** (fase 2) |

### Tipo: Artigo (Guia de Barbear)
`titulo` · `slug` · `resumo` · `corpo` · `autor` · `data_publicacao` · `categoria` (técnica, cuidados, produtos) · `imagem_capa` · `produtos_relacionados[]` (link p/ PDP) · `meta_description`.

### Tipo: Página institucional
`titulo` · `slug` · `corpo` · `meta_description`. Conteúdo de `/sobre` já existe (história 2018, stats: 6+ fórmulas, 12k clientes, 100% sem parabenos).

### Tipo: Coleção
`nome` · `slug` · `descricao` · `produtos[]` · `imagem` · `meta_description`.

### Globais (singletons)
Dados da loja já presentes no JSON-LD `Store`: nome, e-mail `contato@barbabrava.com.br`, telefone `(11) 99999-0000`, endereço São Paulo/SP, `foundingDate` 2018, `priceRange`.

---

## 5. Fluxos de usuário principais

### A. Descoberta → Produto → Carrinho → Checkout
```
Home (hero "Ver Produtos")
  → /produtos (grid)
    → /produtos/:slug (PDP: foto, descrição longa, ingredientes, preço, + Adicionar)
      → drawer abre (toast "✦ adicionado!")  [JÁ EXISTE]
        → /carrinho (revisar qtd, total)
          → /checkout (dados + entrega + pagamento)  [NOVO — hoje só alert]
            → confirmação
```

### B. Navegação por categoria
```
Header "Produtos" ▸ Coleções  ou  /colecoes/:slug
  → listagem filtrada (facetas §3: preço, fragrância, tipo de pele)
    → PDP → carrinho
```

### C. Busca [fase 2]
```
ícone de busca no header
  → resultados sobre nome, família olfativa, ingrediente, tag
    → PDP
```

### D. Conteúdo → conversão (SEO/GEO)
```
/guia/:artigo (ex: "qual creme para pele sensível")
  → bloco "produtos relacionados" → PDP → carrinho
```

---

## 6. Estrutura de URLs (slugs)

Coerente com o `sitemap.xml` (domínio `https://barbabrava.com.br/`, hoje só `/`) e o `canonical` já definido.

```
/                                              (priority 1.0 — manter)
/produtos
/produtos/classico-lavanda
/produtos/intenso-carvao-ativado
/produtos/premium-sandalo-cedro
/produtos/fresh-hortela-eucalipto
/produtos/artesanal-ambar-baunilha
/produtos/gold-argao-aloe
/colecoes/essenciais
/colecoes/intermediarios
/colecoes/premium
/colecoes/amadeirados            (família olfativa, opcional)
/sobre
/guia
/guia/:slug
/contato
/carrinho
/checkout
```

Regras de slug: minúsculas, sem acento (`sandalo`, `hortela`, `argao`), separador `-`, sem `#` (hoje a navegação usa âncoras `#produtos`/`#sobre`/`#contato` — manter como fallback de scroll na Home, mas as rotas canônicas passam a ser paths reais).

### Ajustes de SEO ao migrar
- `sitemap.xml`: adicionar uma `<url>` por página acima (hoje só lista `/`). Manter `lastmod`/`changefreq`/`priority` por tipo (Home 1.0, PDPs 0.8, artigos 0.6).
- `canonical` por página (hoje fixo em `/`).
- Migrar o JSON-LD: `Store` global no layout; cada PDP com `Product` próprio (preço, `InStock`, imagem); listagens com `ItemList`; artigos com `Article`; breadcrumbs com `BreadcrumbList`. Os 6 `Product` já existem no `index.html` e devem ser distribuídos para as PDPs.
- `robots.txt` já permite tudo e aponta o sitemap — manter; bloquear apenas `/checkout` e `/carrinho` da indexação quando existirem.

---

## 7. Recomendações de priorização

### MVP (fase 1) — destravar a venda
1. **Checkout real** substituindo o `alert` em `index.html` (maior gap funcional hoje).
2. **PDPs** (`/produtos/:slug`) para os 6 produtos — base de SEO e conversão; hoje o produto só existe como card.
3. **Catálogo `/produtos`** como página própria com os filtros essenciais: faixa de preço + família olfativa.
4. **Persistir o carrinho** (localStorage) — hoje o estado é só em memória (`let cart = []`), perde no reload.
5. **`/sobre` e `/contato`** como páginas (conteúdo já existe, só extrair das seções).
6. SEO: sitemap com todas as rotas + JSON-LD `Product` por PDP.

### Fase 2 — crescimento
- Coleções navegáveis + facetas completas (tipo de pele, intensidade, ingrediente).
- Busca no header.
- Blog/Guia de Barbear (motor de SEO/GEO e venda assistida).
- Reviews/rating nos produtos.
- Páginas legais (privacidade, trocas, frete) — necessárias para confiança e conformidade.

### Fase 3 — otimização
- Recomendações ("quem comprou X levou Y"), kits/combos por coleção, programa de recompra, volume/ml por SKU.

### Pré-requisitos de dado (bloqueiam fases)
`a definir`: fotos reais dos produtos (hoje placeholders), descrição longa, lista estruturada de ingredientes, volume em ml, política de frete/trocas. Sem fotos reais, as PDPs ficam fracas — priorizar captação junto ao MVP.
