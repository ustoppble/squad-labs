/* =========================================================
   Barba Brava — Checkout mock (resumo do carrinho + validação)
   Sem backend: valida no cliente, confirma e limpa o carrinho.
   ========================================================= */

/* ---- Resumo do pedido (lê do carrinho persistido) ---- */
function renderSummary() {
  const itemsEl = document.getElementById('summaryItems');
  const subEl   = document.getElementById('summarySubtotal');
  const totalEl = document.getElementById('summaryTotal');
  if (!itemsEl) return;

  itemsEl.innerHTML = cart.map((item) => {
    const p = getProductById(item.id);
    if (!p) return '';
    return `
      <li class="summary-item">
        <span class="summary-item-thumb" style="background: ${p.gradient};" aria-hidden="true">BB</span>
        <span class="summary-item-info">
          <span class="summary-item-name">${p.nome}</span>
          <span class="summary-item-qty">${item.qty} × ${formatBRL(p.preco)}</span>
        </span>
        <span class="summary-item-line">${formatBRL(p.preco * item.qty)}</span>
      </li>`;
  }).join('');

  const total = cartTotal();
  subEl.textContent   = formatBRL(total);
  totalEl.textContent = formatBRL(total);
}

/* ---- Validação ---- */
function setError(field, msg) {
  const input = document.getElementById(field);
  const errEl = document.querySelector(`[data-error-for="${field}"]`);
  if (input) input.classList.toggle('invalid', !!msg);
  if (errEl) errEl.textContent = msg || '';
  return !msg;
}

function isBlank(v) {
  return !v || v.trim() === '';
}

function validateForm() {
  const form = document.getElementById('checkoutForm');
  const data = Object.fromEntries(new FormData(form).entries());
  let ok = true;

  const required = (field, label) => {
    const valid = !isBlank(data[field]);
    if (!setError(field, valid ? '' : `Informe ${label}.`)) ok = false;
    return valid;
  };

  required('nome', 'seu nome');

  if (!required('email', 'seu e-mail')) {
    /* já marcado */
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    setError('email', 'E-mail inválido.');
    ok = false;
  }

  if (!required('cep', 'o CEP')) {
    /* já marcado */
  } else if (!/^\d{5}-?\d{3}$/.test(data.cep.trim())) {
    setError('cep', 'CEP no formato 00000-000.');
    ok = false;
  }

  required('endereco', 'o endereço');
  required('numero', 'o número');
  required('cidade', 'a cidade');

  if (!required('uf', 'o estado')) {
    /* já marcado */
  } else if (!/^[A-Za-z]{2}$/.test(data.uf.trim())) {
    setError('uf', 'UF com 2 letras.');
    ok = false;
  }

  if (data.pagamento === 'cartao') {
    required('cardNome', 'o nome no cartão');

    const numero = (data.cardNumero || '').replace(/\s/g, '');
    if (isBlank(numero)) {
      setError('cardNumero', 'Informe o número do cartão.');
      ok = false;
    } else if (!/^\d{13,19}$/.test(numero)) {
      setError('cardNumero', 'Número de cartão inválido.');
      ok = false;
    } else {
      setError('cardNumero', '');
    }

    if (isBlank(data.cardValidade)) {
      setError('cardValidade', 'Informe a validade.');
      ok = false;
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardValidade.trim())) {
      setError('cardValidade', 'Use o formato MM/AA.');
      ok = false;
    } else {
      setError('cardValidade', '');
    }

    const cvv = (data.cardCvv || '').trim();
    if (isBlank(cvv)) {
      setError('cardCvv', 'Informe o CVV.');
      ok = false;
    } else if (!/^\d{3,4}$/.test(cvv)) {
      setError('cardCvv', 'CVV inválido.');
      ok = false;
    } else {
      setError('cardCvv', '');
    }
  } else {
    /* Pix: limpa eventuais erros de cartão */
    ['cardNome', 'cardNumero', 'cardValidade', 'cardCvv'].forEach((f) => setError(f, ''));
  }

  return ok;
}

/* ---- Alternar campos por método de pagamento ---- */
function togglePayment() {
  const method = document.querySelector('input[name="pagamento"]:checked').value;
  const cardFields = document.getElementById('cardFields');
  const pixNote = document.getElementById('pixNote');
  const isCard = method === 'cartao';
  cardFields.hidden = !isCard;
  pixNote.hidden = isCard;
}

/* ---- Número de pedido mock ---- */
function makeOrderNumber() {
  const n = Math.floor(Math.random() * 900000) + 100000;
  return `BB-${n}`;
}

/* ---- Confirmação ---- */
function showConfirmation(nome) {
  const total = cartTotal();
  document.getElementById('checkoutLayout').hidden = true;
  document.getElementById('orderNumber').textContent = makeOrderNumber();
  document.getElementById('confirmMsg').textContent =
    `Obrigado, ${nome.split(' ')[0]}! Enviamos a confirmação por e-mail. Total: ${formatBRL(total)}.`;
  document.getElementById('checkoutConfirm').hidden = false;

  clearCart(); // esvazia e persiste
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---- Estados de página ---- */
function showState() {
  const empty  = document.getElementById('checkoutEmpty');
  const layout = document.getElementById('checkoutLayout');
  if (cart.length === 0) {
    empty.hidden = false;
    layout.hidden = true;
  } else {
    empty.hidden = true;
    layout.hidden = false;
    renderSummary();
  }
}

/* ---- Init ---- */
function init() {
  initCart();
  showState();
  togglePayment();

  document.querySelectorAll('input[name="pagamento"]').forEach((r) => {
    r.addEventListener('change', togglePayment);
  });

  const form = document.getElementById('checkoutForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showState();
      return;
    }
    if (!validateForm()) {
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    const nome = document.getElementById('nome').value;
    showConfirmation(nome);
  });

  // Limpa erro do campo ao digitar.
  form.addEventListener('input', (e) => {
    if (e.target.classList && e.target.classList.contains('invalid')) {
      e.target.classList.remove('invalid');
      const errEl = document.querySelector(`[data-error-for="${e.target.id}"]`);
      if (errEl) errEl.textContent = '';
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
