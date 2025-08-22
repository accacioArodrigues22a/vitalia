document.addEventListener("DOMContentLoaded", () => {
    const fade = document.getElementById("fade");
  
    function openModal(id) {
      document.getElementById(id).classList.add("show");
      fade.classList.add("show");
    }
  
    function closeModal(id) {
      document.getElementById(id).classList.remove("show");
      fade.classList.remove("show");
    }
  
    // Abrir modais
    for (let i = 1; i <= 9; i++) {
      const botao = document.querySelector(`.botao${i}`);
      if (botao) {
        botao.addEventListener("click", () => openModal(`modal${i}`));
      }
    }
  
    // Fechar modais
    document.querySelectorAll(".fechar").forEach(botao => {
      botao.addEventListener("click", () => closeModal(botao.dataset.close));
    });
  
    // Fechar clicando no fade
    fade.addEventListener("click", () => {
      document.querySelectorAll(".modal.show").forEach(m => m.classList.remove("show"));
      fade.classList.remove("show");
    });
  });
  