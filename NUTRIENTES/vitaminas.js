document.addEventListener("DOMContentLoaded", () => {
    const fade = document.getElementById("fade");
    const modals = document.querySelectorAll(".modal");
    const imagens = document.querySelectorAll("[data-modal]");
    const botoesFechar = document.querySelectorAll(".fechar");
  
    // abrir modal ao clicar na vitamina
    imagens.forEach(img => {
      img.addEventListener("click", () => {
        const modalId = img.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
  
        fade.classList.add("show");
        modal.classList.add("show");
      });
    });
  
    // fechar modal (botão X)
    botoesFechar.forEach(btn => {
      btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-close");
        const modal = document.getElementById(modalId);
  
        fade.classList.remove("show");
        modal.classList.remove("show");
      });
    });
  
    // fechar modal clicando no fundo escuro
    fade.addEventListener("click", () => {
      fade.classList.remove("show");
      modals.forEach(m => m.classList.remove("show"));
    });
  });
  