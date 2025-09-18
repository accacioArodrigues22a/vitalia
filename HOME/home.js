


const fade = document.getElementById("fade"); // pega o fundo escuro q fica atras de popups/modais

// animação de splash screen
window.addEventListener('load', () => {
    const splash = document.getElementById('splash'); // tela inicial
    const mainContent = document.getElementById('main-content'); // conteudo principal
    
    const splashTime = 2000; // tempo q a splash fica visivel (ms)
    
    setTimeout(() => {
      splash.classList.add('hidden'); // some a splash
      mainContent.classList.add('visible'); // mostra conteúdo
    }, splashTime);
});

// função pra abrir popup
function abrirPopup(id) {
    const popup = document.getElementById(id); // pega popup certo
    if (!popup) return; // se n existir, sai
    popup.style.display = "flex"; // mostra popup
    fade.classList.add("show"); // mostra fundo escuro atrás
}

// função pra fechar popup
function fecharPopup(id) {
    const popup = document.getElementById(id); // pega popup
    if (!popup) return; // se n existir, sai
    popup.style.display = "none"; // esconde popup
    fade.classList.remove("show"); // some fade
}

// fecha todos os popups de uma vez
function fecharTodos() {
    document.querySelectorAll(".popup, .popup-feedback").forEach(p => p.style.display = "none"); // some geral
    fade.classList.remove("show"); // some fade tbm
}

// fecha popup se clicar no fade
fade.addEventListener("click", fecharTodos);

// se clicar dentro do popup, não fecha ele
document.querySelectorAll(".popup, .popup-feedback").forEach(popup => {
    popup.addEventListener("click", function(e) {
        e.stopPropagation(); // impede clique do fade de fechar
    });
});

// modais de imagem (só clicar fora fecha)
document.querySelectorAll("[data-modal]").forEach(el => {
    el.addEventListener("click", () => {
      const modalId = el.getAttribute("data-modal"); // pega id do modal
      const modal = document.getElementById(modalId);
      if (!modal) return;
  
      modal.classList.add("show"); // mostra modal
      fade.classList.add("show"); // mostra fade
  
      // fecha modal clicando no fundo
      fade.onclick = () => {
        modal.classList.remove("show"); // some modal
        fade.classList.remove("show"); // some fade
      };
  
      // impede que clicar dentro do modal feche ele
      modal.onclick = e => e.stopPropagation();
    });
});

const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

function updateCarousel() {
  const cardWidth = track.querySelector('.card').offsetWidth + 24; // largura + margin
  track.style.transform = `translateX(${-index * cardWidth}px)`;

  // Desabilita botões se chegar ao início ou fim
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index >= track.children.length - Math.floor(track.parentElement.offsetWidth / cardWidth);
}

nextBtn.addEventListener('click', () => {
  index++;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  index--;
  updateCarousel();
});

window.addEventListener('resize', updateCarousel); // Ajusta se tela mudar
updateCarousel(); // Inicializa estado dos botões





/*document.getElementById('btnAbrirFAQ').addEventListener('click', () => {
  document.getElementById('popupFAQ').style.display = 'block';
});

document.getElementById('fecharFAQ').addEventListener('click', () => {
  document.getElementById('popupFAQ').style.display = 'none';
});

window.addEventListener('click', (e) => {
  const popup = document.getElementById('popupFAQ');
  if (e.target === popup) {
    popup.style.display = 'none';
  }
});*/


// animação da linha do tempo (timeline)
document.addEventListener("DOMContentLoaded", () => {
  const eventos = document.querySelectorAll(".evento");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // garante que anima só 1x
      }
    });
  }, { threshold: 0.2 }); // ativa quando 20% visível

  eventos.forEach(evento => observer.observe(evento));
});


  document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("title");
    const text = el.textContent.trim();
    el.innerHTML = text
      .split("")
      .map((ch, i) => 
        `<span style="animation-delay:${i * 0.1}s">${ch === " " ? "&nbsp;" : ch}</span>`
      )
      .join("");
  });

  window.addEventListener("scroll", function () {
    const img = document.querySelector(".arraste img");
  
    // valor bem pequeno em rem (ex.: 0.5rem)
    const limiteEmRem = 0.5;
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const limitePx = limiteEmRem * rootFontSize;
  
    if (window.scrollY > limitePx) {
      img.classList.add("oculto");
    } else {
      img.classList.remove("oculto");
    }
  });
  