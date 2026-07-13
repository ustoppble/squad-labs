/* =========================================================
   Barba Brava — Home (grid de produtos + scroll reveal)
   Carrinho e catálogo vêm de cart.js / products.js (carregados antes).
   ========================================================= */

/* ---- Renderizar grid da home ---- */
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((p) => `
    <article class="product-card reveal" role="listitem" data-id="${p.id}">
      <a class="product-img-link" href="produto.html?id=${p.slug}" aria-label="Ver ${p.nome}">
        <div class="product-img-wrap">
          <div class="product-placeholder" style="background: ${p.gradient};" role="img" aria-label="Pote de ${p.nome}">
            <span class="p-monogram" aria-hidden="true">BB</span>
            <span class="p-label" aria-hidden="true">${p.nome.split(' ').slice(0, 2).join(' ')}</span>
          </div>
        </div>
      </a>
      <div class="product-body">
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

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-product-id]');
    if (!btn) return;
    addToCart(parseInt(btn.dataset.productId, 10));
  });
}

/* ---- Scroll reveal ---- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const siblings = entry.target.closest('.products-grid')?.children;
      const delay = siblings
        ? Array.from(siblings).indexOf(entry.target) * 75
        : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  els.forEach((el) => observer.observe(el));
}

/* ---- Init ---- */
function init() {
  renderProducts();
  initCart();

  requestAnimationFrame(() => {
    initReveal();
    document.querySelectorAll('.about-visual, .about-text').forEach((el) => {
      el.classList.add('reveal');
    });
    initReveal();
  });
}

document.addEventListener('DOMContentLoaded', init);
