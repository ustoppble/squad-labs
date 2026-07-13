// Grão de Origem — interações mínimas

(function () {
  'use strict';

  // --- Scroll suave do CTA até o grid ---
  const ctaBtn = document.getElementById('cta-cardapio');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const destino = document.getElementById('cardapio');
      if (destino) {
        destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // --- Contador de pedido ---
  let totalItens = 0;
  const pedidoStatus = document.getElementById('pedido-status');
  const pedidoTexto = document.getElementById('pedido-texto');
  const btnLimpar = document.getElementById('btn-limpar');

  function atualizarStatus() {
    if (totalItens === 0) {
      pedidoStatus.hidden = true;
      return;
    }
    pedidoStatus.hidden = false;
    const sufixo = totalItens === 1 ? 'item' : 'itens';
    pedidoTexto.textContent = totalItens + ' ' + sufixo + ' no pedido';
  }

  document.querySelectorAll('.btn--secundario').forEach(function (btn) {
    btn.addEventListener('click', function () {
      totalItens += 1;
      atualizarStatus();

      // Feedback visual no botão
      const textoOriginal = btn.textContent;
      btn.textContent = 'Adicionado!';
      btn.classList.add('adicionado');
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = textoOriginal;
        btn.classList.remove('adicionado');
        btn.disabled = false;
      }, 1500);
    });
  });

  if (btnLimpar) {
    btnLimpar.addEventListener('click', function () {
      totalItens = 0;
      atualizarStatus();
    });
  }

})();
