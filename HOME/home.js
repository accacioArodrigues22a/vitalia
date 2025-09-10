const fade = document.getElementById("fade"); // pega o elemento fade (aquele fundo escuro)

window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  const mainContent = document.getElementById('main-content');
  const typingText = document.querySelector('.typing-text');

  const textToType = "VITALIA"; // texto que vai aparecer como digitação
  let index = 0;

  function type() {
    if (index < textToType.length) {
      typingText.textContent += textToType.charAt(index);
      index++;
      setTimeout(type, 200); // velocidade da digitação
    }
  }

  type(); // inicia a digitação

  // Tempo total da splash (ajuste de acordo com a digitação)
  const splashTime = 3000;

  setTimeout(() => {
    splash.classList.add('hidden');
    mainContent.classList.add('visible');
  }, splashTime);
});




// função pra abrir popup
function abrirPopup(id) {
    const popup = document.getElementById(id); // pega o popup certo pelo id
    if (!popup) return; // se n existir, nem faz nada
    popup.style.display = "flex"; // mostra popup
    fade.classList.add("show"); // mostra o fade atras
}

// função pra fechar popup
function fecharPopup(id) {
    const popup = document.getElementById(id); // pega popup pelo id
    if (!popup) return; // se n existir, sai da função
    popup.style.display = "none"; // esconde popup
    fade.classList.remove("show"); // esconde o fade
}

// fecha todos os popups de uma vez
function fecharTodos() {
    document.querySelectorAll(".popup, .popup-feedback").forEach(p => p.style.display = "none"); // some todos
    fade.classList.remove("show"); // some o fade tbm
}

// fecha popup se clicar no fundo escuro
fade.addEventListener("click", fecharTodos);

// se clicar dentro do popup, não fecha ele
document.querySelectorAll(".popup, .popup-feedback").forEach(popup => {
    popup.addEventListener("click", function(e) {
        e.stopPropagation(); // impede clique do fade de fechar
    });
});
