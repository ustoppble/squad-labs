/* =========================================================
   Barba Brava — PDP dinâmica (lê ?id=<slug> da query string)
   Renderiza a partir do PRODUCTS array (products.js).
   ========================================================= */

const SITE = 'https://barbabrava.com.br';

function getSlugFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ---- Renderizar estado "produto não encontrado" ---- */
function renderNotFound() {
  document.title = 'Produto não encontrado — Barba Brava';
  const el = document.getElementById('pdpContent');
  el.innerHTML = `
    <div class="pdp-notfound">
      <h1>Produto não encontrado</h1>
      <p>O creme que você procura não está no nosso catálogo (ou o link veio quebrado).</p>
      <a class="btn btn-primary" href="catalogo.html">Ver todos os cremes</a>
    </div>`;
}

/* ---- Atualizar SEO da página ---- */
function updateSeo(p) {
  const url = `${SITE}/produto.html?id=${p.slug}`;
  document.title = `${p.nome} — Barba Brava`;

  const setMeta = (selector, attr, value) => {
    const tag = document.querySelector(selector);
    if (tag) tag.setAttribute(attr, value);
  };
  setMeta('meta[name="description"]', 'content', p.desc);
  setMeta('link[rel="canonical"]', 'href', url);
  setMeta('meta[property="og:title"]', 'content', `${p.nome} — Barba Brava`);
  setMeta('meta[property="og:description"]', 'content', p.desc);
  setMeta('meta[property="og:url"]', 'content', url);
  setMeta('meta[name="twitter:title"]', 'content', `${p.nome} — Barba Brava`);
  setMeta('meta[name="twitter:description"]', 'content', p.desc);

  /* JSON-LD: Product + BreadcrumbList */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: p.nome,
        description: p.descLonga,
        category: p.colecao,
        brand: { '@type': 'Brand', name: 'Barba Brava' },
        offers: {
          '@type': 'Offer',
          price: p.preco.toFixed(2),
          priceCurrency: 'BRL',
          availability: 'https://schema.org/InStock',
          url: url,
        },
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Família olfativa', value: p.familiaOlfativa },
          { '@type': 'PropertyValue', name: 'Tipo de pele', value: p.tipoPele },
          { '@type': 'PropertyValue', name: 'Volume', value: `${p.volumeMl} ml` },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Catálogo', item: `${SITE}/catalogo.html` },
          { '@type': 'ListItem', position: 3, name: p.nome, item: url },
        ],
      },
    ],
  };
  const ldEl = document.getElementById('productJsonLd');
  if (ldEl) ldEl.textContent = JSON.stringify(jsonLd, null, 2);
}

/* ---- Renderizar PDP ---- */
function renderPdp(p) {
  document.getElementById('breadcrumbCurrent').textContent = p.nome;

  const ingredientes = p.ingredientes
    .map((i) => `<li>${escapeHtml(i)}</li>`)
    .join('');

  const el = document.getElementById('pdpContent');
  el.innerHTML = `
    <div class="pdp-grid">
      <div class="pdp-media">
        <div class="pdp-placeholder" style="background: ${p.gradient};" role="img" aria-label="Pote de ${escapeHtml(p.nome)}">
          <span class="pdp-monogram" aria-hidden="true">BB</span>
          <span class="pdp-jar-label" aria-hidden="true">${escapeHtml(p.nome.split(' ').slice(0, 2).join(' '))}</span>
        </div>
        <span class="pdp-img-note">Imagem ilustrativa — foto real em breve</span>
      </div>

      <div class="pdp-info">
        <p class="pdp-collection">${escapeHtml(p.colecao)}</p>
        <h1 class="pdp-name">${escapeHtml(p.nome)}</h1>
        <p class="pdp-price">${formatBRL(p.preco)}</p>
        <p class="pdp-desc">${escapeHtml(p.descLonga)}</p>

        <ul class="pdp-attrs">
          <li><span class="attr-k">Família olfativa</span><span class="attr-v">${escapeHtml(p.familiaOlfativa)}</span></li>
          <li><span class="attr-k">Tipo de pele</span><span class="attr-v">${escapeHtml(p.tipoPele)}</span></li>
          <li><span class="attr-k">Intensidade</span><span class="attr-v">${escapeHtml(p.intensidade)}</span></li>
          <li><span class="attr-k">Volume</span><span class="attr-v">${p.volumeMl} ml</span></li>
        </ul>

        <div class="pdp-ingredients">
          <h2>Ingredientes-chave</h2>
          <ul>${ingredientes}</ul>
        </div>

        <button class="btn btn-primary btn-full pdp-add" id="pdpAddBtn" data-product-id="${p.id}">
          + Adicionar ao carrinho — ${formatBRL(p.preco)}
        </button>
        <p class="pdp-trust">Sem parabenos · Sem sulfatos · Artesanal</p>
      </div>
    </div>`;

  const addBtn = document.getElementById('pdpAddBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      addToCart(p.id);
      openCart();
    });
  }
}

/* ---- Init ---- */
function init() {
  initCart();

  const slug = getSlugFromQuery();
  const product = slug ? getProductBySlug(slug) : null;

  if (!product) {
    renderNotFound();
    return;
  }

  updateSeo(product);
  renderPdp(product);
}

document.addEventListener('DOMContentLoaded', init);
