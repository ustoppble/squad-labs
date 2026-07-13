/* =========================================================
   BARBA BRAVA — Carrinho compartilhado (persistência localStorage)
   Incluído em: index, produto, catalogo, checkout.
   Depende de products.js (PRODUCTS / getProductById) carregado antes.
   Estado persistido como [{ id, qty }] na chave STORAGE_KEY.
   ========================================================= */

const STORAGE_KEY = 'barbabrava_cart';

/* ---- Estado (carregado do localStorage) ---- */
let cart = loadCart();

/* ---- Persistência ---- */
function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Sanitiza: só itens com id válido no catálogo e qty > 0.
    return parsed
      .filter((i) => i && typeof i.id === 'number' && i.qty > 0 && getProductById(i.id))
      .map((i) => ({ id: i.id, qty: Math.floor(i.qty) }));
  } catch (e) {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    /* localStorage indisponível (modo privado): segue só em memória. */
  }
}

function clearCart() {
  cart = [];
  saveCart();
  updateHeader();
  renderCartItems();
}

/* ---- Formatação ---- */
function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* ---- Mutações ---- */
function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  saveCart();
  updateHeader();
  renderCartItems();
  showToast(`✦ ${product.nome} adicionado!`);
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateHeader();
  renderCartItems();
}

function changeQty(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  updateHeader();
  renderCartItems();
}

/* ---- Totais ---- */
function cartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

function cartTotal() {
  return cart.reduce((sum, i) => {
    const p = getProductById(i.id);
    return sum + (p ? p.preco * i.qty : 0);
  }, 0);
}

/* ---- Header badge ---- */
function updateHeader() {
  const totalItems = cartCount();
  const countEl = document.getElementById('cartCount');
  if (!countEl) return;

  const prevCount = parseInt(countEl.textContent, 10) || 0;
  countEl.textContent = totalItems;

  if (totalItems > prevCount) {
    countEl.classList.remove('pop');
    void countEl.offsetWidth;
    countEl.classList.add('pop');
  }
}

/* ---- Itens do drawer ---- */
function renderCartItems() {
  const emptyEl  = document.getElementById('cartEmpty');
  const itemsEl  = document.getElementById('cartItems');
  const footerEl = document.getElementById('drawerFooter');
  const totalEl  = document.getElementById('cartTotal');
  if (!itemsEl) return; // página sem drawer

  if (cart.length === 0) {
    if (emptyEl)  emptyEl.hidden  = false;
    itemsEl.hidden = true;
    if (footerEl) footerEl.hidden = true;
    return;
  }

  if (emptyEl)  emptyEl.hidden  = true;
  itemsEl.hidden = false;
  if (footerEl) footerEl.hidden = false;

  if (totalEl) totalEl.textContent = formatBRL(cartTotal());

  itemsEl.innerHTML = cart.map((item) => {
    const p = getProductById(item.id);
    if (!p) return '';
    return `
    <li class="cart-item" data-id="${p.id}">
      <div class="cart-item-img">
        <div class="cart-item-thumb" style="background: ${p.gradient}; border-radius: 6px; width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
          <span style="font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 900; color: rgba(255,255,255,0.9);">BB</span>
        </div>
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name" title="${p.nome}">${p.nome}</p>
        <p class="cart-item-price">${formatBRL(p.preco)}</p>
      </div>
      <div class="cart-item-controls">
        <div class="qty-control">
          <button class="qty-btn" data-action="dec" data-id="${p.id}" aria-label="Diminuir quantidade">−</button>
          <span class="qty-value" aria-label="${item.qty} unidades">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${p.id}" aria-label="Aumentar quantidade">+</button>
        </div>
        <button class="remove-btn" data-action="remove" data-id="${p.id}" aria-label="Remover ${p.nome} do carrinho">
          Remover
        </button>
      </div>
    </li>`;
  }).join('');
}

/* Delegação única no container de itens (evita listeners duplicados). */
function handleCartAction(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const id = parseInt(btn.dataset.id, 10);
  const action = btn.dataset.action;

  if (action === 'inc')    changeQty(id, 1);
  if (action === 'dec')    changeQty(id, -1);
  if (action === 'remove') removeFromCart(id);
}

/* ---- Drawer abrir/fechar ---- */
function openCart() {
  const drawer  = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const btn     = document.getElementById('cartBtn');
  if (!drawer) return;

  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  if (overlay) {
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
  }
  if (btn) btn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('cartClose');
  if (closeBtn) closeBtn.focus();
}

function closeCart() {
  const drawer  = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const btn     = document.getElementById('cartBtn');
  if (!drawer) return;

  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  }
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  }
  document.body.style.overflow = '';
}

/* ---- Toast ---- */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ---- Inicialização do carrinho (chamar em toda página) ---- */
function initCart() {
  updateHeader();
  renderCartItems();

  const cartBtn   = document.getElementById('cartBtn');
  const cartClose = document.getElementById('cartClose');
  const overlay   = document.getElementById('cartOverlay');
  const itemsEl   = document.getElementById('cartItems');

  if (cartBtn)   cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (overlay)   overlay.addEventListener('click', closeCart);
  if (itemsEl)   itemsEl.addEventListener('click', handleCartAction);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });
}

/* Expor para outras páginas/scripts. */
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQty = changeQty;
window.clearCart = clearCart;
window.cartCount = cartCount;
window.cartTotal = cartTotal;
window.formatBRL = formatBRL;
window.initCart = initCart;
