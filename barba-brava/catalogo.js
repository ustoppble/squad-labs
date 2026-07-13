/* =========================================================
   Barba Brava — Catálogo com filtros client-side (sem reload)
   Facetas: coleção, família olfativa, tipo de pele. Ordenação por preço.
   ========================================================= */

const SITE_URL = 'https://barbabrava.com.br';

/* Grupos de filtro (chave no produto + rótulo da seção). Valores derivados
   dinamicamente do PRODUCTS array para nunca sair do catálogo real. */
const FILTER_GROUPS = [
  { key: 'colecao',         label: 'Coleção' },
  { key: 'familiaOlfativa', label: 'Família olfativa' },
  { key: 'tipoPele',        label: 'Tipo de pele' },
];

const state = {
  colecao: 'Todos',
  familiaOlfativa: 'Todos',
  tipoPele: 'Todos',
  sort: 'relevancia',
};

function uniqueValues(key) {
  const seen = [];
  PRODUCTS.forEach((p) => {
    if (p[key] && !seen.includes(p[key])) seen.push(p[key]);
  });
  return seen;
}

/* ---- Renderizar painel de filtros ---- */
function renderFilters() {
  const wrap = document.getElementById('filters');
  wrap.innerHTML = `
    <div class="filters-head">
      <h2>Filtros</h2>
      <button class="filters-reset" id="filtersReset" type="button">Limpar</button>
    </div>
    ${FILTER_GROUPS.map((g) => {
      const values = ['Todos', ...uniqueValues(g.key)];
      return `
        <fieldset class="filter-group">
          <legend>${g.label}</legend>
          <div class="filter-chips" role="group" aria-label="${g.label}">
            ${values.map((v) => `
              <button
                type="button"
                class="filter-chip${state[g.key] === v ? ' active' : ''}"
                data-group="${g.key}"
                data-value="${v}"
                aria-pressed="${state[g.key] === v}"
              >${v}</button>
            `).join('')}
          </div>
        </fieldset>`;
    }).join('')}
  `;

  wrap.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    state[chip.dataset.group] = chip.dataset.value;
    renderFilters();
    renderGrid();
  });

  const reset = document.getElementById('filtersReset');
  if (reset) reset.addEventListener('click', resetFilters);
}

function resetFilters() {
  state.colecao = 'Todos';
  state.familiaOlfativa = 'Todos';
  state.tipoPele = 'Todos';
  renderFilters();
  renderGrid();
}

/* ---- Aplicar filtros + ordenação ---- */
function applyFilters() {
  let list = PRODUCTS.filter((p) =>
    (state.colecao === 'Todos' || p.colecao === state.colecao) &&
    (state.familiaOlfativa === 'Todos' || p.familiaOlfativa === state.familiaOlfativa) &&
    (state.tipoPele === 'Todos' || p.tipoPele === state.tipoPele)
  );

  if (state.sort === 'preco-asc')  list = [...list].sort((a, b) => a.preco - b.preco);
  if (state.sort === 'preco-desc') list = [...list].sort((a, b) => b.preco - a.preco);

  return list;
}

/* ---- Renderizar grid de resultados ---- */
function renderGrid() {
  const grid     = document.getElementById('catalogGrid');
  const emptyEl  = document.getElementById('catalogEmpty');
  const countEl  = document.getElementById('resultCount');
  const list     = applyFilters();

  countEl.textContent = list.length === 1
    ? '1 creme encontrado'
    : `${list.length} cremes encontrados`;

  if (list.length === 0) {
    grid.innerHTML = '';
    grid.hidden = true;
    emptyEl.hidden = false;
    return;
  }

  grid.hidden = false;
  emptyEl.hidden = true;

  grid.innerHTML = list.map((p) => `
    <article class="product-card" role="listitem" data-id="${p.id}">
      <a class="product-img-link" href="produto.html?id=${p.slug}" aria-label="Ver ${p.nome}">
        <div class="product-img-wrap">
          <div class="product-placeholder" style="background: ${p.gradient};" role="img" aria-label="Pote de ${p.nome}">
            <span class="p-monogram" aria-hidden="true">BB</span>
            <span class="p-label" aria-hidden="true">${p.nome.split(' ').slice(0, 2).join(' ')}</span>
          </div>
        </div>
      </a>
      <div class="product-body">
        <span class="product-tag">${p.familiaOlfativa}</span>
        <h3 class="product-name">
          <a href="produto.html?id=${p.slug}">${p.nome}</a>
        </h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">${formatBRL(p.preco)}</span>
          <button
            class="btn btn-add"
            data-product-id="${p.id}"
            aria-label="Adicionar ${p.nome} ao carrinho"
          >
            + Adicionar
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

/* ---- JSON-LD do catálogo (ItemList) ---- */
function injectCatalogJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cremes de Barbear Barba Brava',
    url: `${SITE_URL}/catalogo.html`,
    itemListElement: PRODUCTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/produto.html?id=${p.slug}`,
      name: p.nome,
    })),
  };
  const el = document.getElementById('catalogJsonLd');
  if (el) el.textContent = JSON.stringify(jsonLd, null, 2);
}

/* ---- Init ---- */
function init() {
  initCart();
  renderFilters();
  renderGrid();
  injectCatalogJsonLd();

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sort = e.target.value;
      renderGrid();
    });
  }

  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) clearBtn.addEventListener('click', resetFilters);

  // Delegação do "+ Adicionar" no grid.
  document.getElementById('catalogGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-product-id]');
    if (!btn) return;
    addToCart(parseInt(btn.dataset.productId, 10));
  });
}

document.addEventListener('DOMContentLoaded', init);
