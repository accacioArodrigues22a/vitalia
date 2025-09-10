// espera a página carregar toda antes de rodar o código
document.addEventListener("DOMContentLoaded", () => {
  const fade = document.getElementById("fade"); // pega o fundo que escurece atrás do modal

  // função pra abrir o modal
  function openModal(id) {
    document.getElementById(id).classList.add("show"); // mostra o modal certo
    fade.classList.add("show"); // mostra o fade por trás
  }

  // função pra fechar o modal
  function closeModal(id) {
    document.getElementById(id).classList.remove("show"); // esconde o modal
    fade.classList.remove("show"); // esconde o fade
  }

  // aqui pega todos os botões que abrem modal (1 a 9)
  for (let i = 1; i <= 9; i++) {
    const botao = document.querySelector(`.botao${i}`);
    if (botao) { // se o botão existir
      botao.addEventListener("click", () => openModal(`modal${i}`)); // abre o modal certo
    }
  }

  // aqui pega todos os botões de fechar dentro dos modais
  document.querySelectorAll(".fechar").forEach(botao => {
    botao.addEventListener("click", () => closeModal(botao.dataset.close)); // fecha o modal
  });

  // fecha todos os modais se clicar no fade
  fade.addEventListener("click", () => {
    document.querySelectorAll(".modal.show").forEach(m => m.classList.remove("show")); // fecha todos
    fade.classList.remove("show"); // esconde o fade tbm
  });
});
