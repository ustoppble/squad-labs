/* =========================================================
   Modal de detalhe + régua de tamanho
   - Junta os cards (nome/preço/foto lidos do DOM) com:
       • descricao + ingredientes  -> espelho de assets/menu/details.json
       • tamanho em cm              -> mapa SIZE_CM (definido aqui)
     A junção é por LABEL EXATO do item.
   - Dados embutidos de propósito: fetch() de JSON falha em file://
     (Chrome bloqueia), então embutir garante o render no navegador.
   ========================================================= */
(function () {
  "use strict";

  /* Espelho de assets/menu/details.json (descricao + ingredientes), por item */
  var DETAILS = {
    "Cachorrão Completo": {
      descricao: "O clássico raiz que não falha: salsicha grossa recheada de tudo que tem direito, empilhado com generosidade de barraca boa. Mordida de fim de tarde que aquece a alma.",
      ingredientes: ["Salsicha de pernil", "Purê de batata", "Milho verde", "Ervilha", "Batata palha", "Molho de tomate caseiro", "Maionese", "Mostarda", "Ketchup", "Parmesão ralado"]
    },
    "Dog Prensado": {
      descricao: "Pão crocante por fora, recheio quente e cremoso por dentro — o prensado sai da chapa chamando atenção de longe. Combinação irresistível que vicia na primeira mordida.",
      ingredientes: ["Salsicha defumada", "Queijo muçarela", "Maionese temperada", "Mostarda", "Ketchup", "Orégano"]
    },
    "Dog Bacon Crocante": {
      descricao: "Strips de bacon dourados no ponto certo abraçando a salsicha — o crocante que você ouve antes de morder. Para os amantes de defumado que não aceitam meias medidas.",
      ingredientes: ["Salsicha grossa", "Bacon crocante em tiras", "Queijo muçarela derretido", "Cebola caramelizada", "Maionese defumada", "Ketchup", "Batata palha"]
    },
    "Dog Calabresa": {
      descricao: "A calabresa apimentada dá o toque picante que transforma o hot-dog em experiência. Sabor marcante de churrasco de domingo direto no pão macio.",
      ingredientes: ["Salsicha de calabresa", "Vinagrete de pimentão", "Cebola roxa", "Molho de tomate apimentado", "Maionese", "Mostarda", "Parmesão ralado", "Batata palha"]
    },
    "Dog Frango & Cream Cheese": {
      descricao: "Frango desfiado temperadinho encontra o cream cheese cremoso em harmonia irresistível. Leve, diferente e impossível de parar na metade.",
      ingredientes: ["Salsicha de frango", "Frango desfiado temperado", "Cream cheese", "Milho verde", "Cebolinha", "Maionese", "Batata palha", "Queijo parmesão"]
    },
    "Mini Combo Família": {
      descricao: "Feito pra todo mundo comer junto e ninguém ficar de fora! Mini dogs variados, com os melhores sabores da casa, pra compartilhar e acabar na disputa do último.",
      ingredientes: ["4 mini salsichas sortidas", "Purê de batata", "Milho verde", "Bacon crocante", "Queijo muçarela", "Maionese", "Ketchup", "Mostarda", "Batata palha", "Molho especial da casa"]
    }
  };

  /* Tamanho coerente por item (cm): compacto 18 -> combo 30 */
  var SIZE_CM = {
    "Dog Prensado": 18,
    "Dog Frango & Cream Cheese": 21,
    "Dog Calabresa": 22,
    "Dog Bacon Crocante": 24,
    "Cachorrão Completo": 26,
    "Mini Combo Família": 30
  };

  var RULER_MAX = 32;   // eixo da régua em cm
  var WA_NUMBER = "5511999999999"; // placeholder — trocar pelo número REAL antes de publicar

  var modal = document.getElementById("itemModal");
  if (!modal) return;

  var panel = modal.querySelector(".modal__panel");
  var elImg = document.getElementById("modalImg");
  var elName = document.getElementById("modalName");
  var elPrice = document.getElementById("modalPrice");
  var elDesc = document.getElementById("modalDesc");
  var elIngr = document.getElementById("modalIngredients");
  var elWa = document.getElementById("modalWa");
  var elDog = document.getElementById("rulerDog");
  var elBadge = document.getElementById("rulerBadge");
  var elRuler = document.getElementById("modalRuler");
  var ticksBox = document.getElementById("rulerTicks");

  var lastTrigger = null;

  /* ---- ticks da régua (gerados uma vez; alinham com a barra por %) ---- */
  (function buildTicks() {
    for (var cm = 0; cm <= RULER_MAX; cm += 2) {
      var left = (cm / RULER_MAX) * 100;
      var major = cm % 10 === 0;
      var t = document.createElement("span");
      t.className = "ruler__tick" + (major ? " ruler__tick--major" : "");
      t.style.left = left + "%";
      if (major) {
        var lbl = document.createElement("span");
        lbl.className = "ruler__tick-label";
        lbl.textContent = cm;
        t.appendChild(lbl);
      }
      ticksBox.appendChild(t);
    }
  })();

  function getFocusable() {
    return Array.prototype.slice.call(
      panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return el.offsetParent !== null; });
  }

  function lockScroll() {
    var sbw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--sbw", sbw + "px");
    document.body.classList.add("modal-open");
  }
  function unlockScroll() {
    document.body.classList.remove("modal-open");
    document.documentElement.style.removeProperty("--sbw");
  }

  function openModal(card) {
    lastTrigger = card;

    var name = card.querySelector(".card__name").textContent.trim();
    var price = card.querySelector(".ticket").textContent.trim();
    var img = card.querySelector(".card__img");
    var data = DETAILS[name] || { descricao: "", ingredientes: [] };
    var cm = SIZE_CM[name];

    elImg.src = img.getAttribute("src");
    elImg.alt = img.getAttribute("alt") || name;
    elName.textContent = name;
    elPrice.textContent = price;
    elDesc.textContent = data.descricao;

    elIngr.innerHTML = "";
    data.ingredientes.forEach(function (ing) {
      var li = document.createElement("li");
      li.textContent = ing;
      elIngr.appendChild(li);
    });

    // Régua: barra = cm/RULER_MAX, badge mostra o valor; aria descreve o tamanho
    if (cm) {
      elDog.style.setProperty("--len", (cm / RULER_MAX) * 100 + "%");
      elBadge.textContent = cm + " cm";
      elRuler.setAttribute("aria-label", "Tamanho " + cm + " centímetros");
      elRuler.hidden = false;
    } else {
      elRuler.hidden = true;
    }

    // wa.me com mensagem pré-preenchida: "Quero pedir: <item>"
    elWa.href = "https://wa.me/" + WA_NUMBER +
      "?text=" + encodeURIComponent("Quero pedir: " + name);

    modal.hidden = false;
    lockScroll();
    // foca o botão fechar (entrada previsível); o trap mantém o foco dentro
    requestAnimationFrame(function () {
      var close = panel.querySelector(".modal__close");
      if (close) close.focus();
    });
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    unlockScroll();
    if (lastTrigger && typeof lastTrigger.focus === "function") {
      lastTrigger.focus();
    }
    lastTrigger = null;
  }

  function onKeydown(e) {
    if (modal.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); closeModal(); return; }
    if (e.key === "Tab") {
      var f = getFocusable();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  }

  // Fechar: X, backdrop, qualquer [data-close]
  modal.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", onKeydown);

  // Tornar cada card clicável + ativável por teclado
  var cards = document.querySelectorAll(".cardapio .card");
  cards.forEach(function (card) {
    var name = card.querySelector(".card__name");
    if (!name || !DETAILS[name.textContent.trim()]) return;

    card.classList.add("is-clickable");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-label", "Ver detalhes de " + name.textContent.trim());

    // dica visual "Ver detalhes →"
    var hint = document.createElement("span");
    hint.className = "card__hint";
    hint.textContent = "Ver detalhes";
    card.appendChild(hint);

    card.addEventListener("click", function () { openModal(card); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        openModal(card);
      }
    });
  });
})();
