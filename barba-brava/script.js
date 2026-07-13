/* =========================================================
   Argila & Café — Loja de Canecas
   Carrinho client-side com persistência em localStorage
   ========================================================= */

const PRODUCTS = [
  {
    id: 1,
    nome: 'Caneca Xadrez Vintage',
    desc: 'Padrão xadrez em tons terrosos, ideal para o café da manhã com charme retrô.',
    preco: 45.90,
    img: 'https://placehold.co/400x400/c97b5a/fdf7f2?text=Xadrez',
    alt: 'Caneca com padrão xadrez em tons terrosos',
  },
  {
    id: 2,
    nome: 'Caneca Floral Suave',
    desc: 'Delicadas flores em aquarela pintadas à mão sobre fundo creme.',
    preco: 52.90,
    img: 'https://placehold.co/400x400/d4a5c0/2d1f14?text=Floral',
    alt: 'Caneca com flores em aquarela sobre fundo creme',
  },
  {
    id: 3,
    nome: 'Caneca Geométrica',
    desc: 'Linhas e formas modernas em preto e terracota. Minimalismo com personalidade.',
    preco: 39.90,
    img: 'https://placehold.co/400x400/4a3728/f6ede3?text=Geo',
    alt: 'Caneca com padrão geométrico preto e terracota',
  },
  {
    id: 4,
    nome: 'Caneca Lua & Estrelas',
    desc: 'Para os amantes do céu noturno. Azul profundo com detalhes dourados.',
    preco: 48.90,
    img: 'https://placehold.co/400x400/2c3e6b/f6ede3?text=Lua',
    alt: 'Caneca azul com lua e estrelas douradas',
  },
  {
    id: 5,
    nome: 'Caneca Tropical',
    desc: 'Folhagens exuberantes em verde vibrante. Traga a natureza para a mesa.',
    preco: 55.90,
    img: 'https://placehold.co/400x400/4a7c59/fdf7f2?text=Tropical',
    alt: 'Caneca verde com folhagens tropicais',
  },
  {
    id: 6,
    nome: 'Caneca Pôr do Sol',
    desc: 'Gradiente quente do laranja ao rosa. Cada gole parece um entardecer.',
    preco: 44.90,
    img: 'https://placehold.co/400x400/e8834a/fdf7f2?text=P%C3%B4r+do+Sol',
    alt: 'Caneca com gradiente laranja e rosa estilo pôr do sol',
  },
];

/* ---- Estado do carrinho ---- */
let cart = [];

/* ---- Utilitários ---- */
function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function saveCart() {
  localStorage.setItem('argila-cafe-cart', JSON.stringify(cart));
}

function loadCart() {
  try {
    const raw = localStorage.getItem('argila-cafe-cart');
    cart = raw ? JSON.parse(raw) : [];
  } catch {
    cart = [];
  }
}

/* ---- Renderizar header ---- */
function updateHeader() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.preco * item.qty, 0);

  const countEl  = document.getElementById('cartCount');
  const totalEl  = document.getElementById('cartTotal');

  const prevCount = parseInt(countEl.textContent, 10);

  countEl.textContent = totalItems;
  totalEl.textContent = formatBRL(totalPrice).replace('R$', 'R$ ');

  if (totalItems > prevCount) {
    countEl.classList.remove('pop');
    void countEl.offsetWidth; // reflow para reiniciar animação
    countEl.classList.add('pop');
  }
}

/* ---- Adicionar ao carrinho ---- */
function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateHeader();
  showToast(`☕ ${product.nome} adicionada!`);
}

/* ---- Toast ---- */
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ---- Renderizar produtos ---- */
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((p) => `
    <article class="product-card reveal" role="listitem" data-id="${p.id}">
      <div class="product-img-wrap">
        <img
          src="${p.img}"
          alt="${p.alt}"
          width="400"
          height="400"
          loading="lazy"
        />
      </div>
      <div class="product-body">
        <h3 class="product-name">${p.nome}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">${formatBRL(p.preco)}</span>
          <button
            class="btn btn--add product-add-btn"
            data-product-id="${p.id}"
            aria-label="Adicionar ${p.nome} ao carrinho"
          >
            + Adicionar
          </button>
        </div>
      </div>
    </article>
  `).join('');

  /* Delegar evento de clique no grid */
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-product-id]');
    if (!btn) return;
    addToCart(parseInt(btn.dataset.productId, 10));
  });
}

/* ---- Scroll reveal via IntersectionObserver ---- */
function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = (entry.target.closest('.products-grid')
            ? Array.from(entry.target.parentNode.children).indexOf(entry.target)
            : 0) * 80;

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---- Inicialização ---- */
function init() {
  loadCart();
  renderProducts();
  updateHeader();

  /* Re-observar após renderizar os cards */
  requestAnimationFrame(() => {
    initReveal();
    /* Adicionar reveal nas seções estáticas */
    document.querySelectorAll('.about-text, .about-visual').forEach((el) => {
      el.classList.add('reveal');
    });
    initReveal();
  });
}

document.addEventListener('DOMContentLoaded', init);
