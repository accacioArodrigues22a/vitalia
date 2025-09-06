document.addEventListener("DOMContentLoaded", () => {
    const fade = document.getElementById("fade");
    const modals = document.querySelectorAll(".modal");
    const botoesFechar = document.querySelectorAll(".fechar");
    const botoesModal = document.querySelectorAll("[data-modal]");

    const SOUNDS_PATH = '../IMGSjogo/';

    // Abrir modal
    botoesModal.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            const modal = document.getElementById(modalId);

            // Fecha todos os modais, mas mantém o modal principal aberto
            modals.forEach(m => {
                if (m.id !== "modal1") { // id real do modal principal
                    m.classList.remove("show");
                }
            });

            fade.classList.add("show");
            modal.classList.add("show");
        });
    });

    // Fechar modal ao clicar no X
    botoesFechar.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-close");
            const modal = document.getElementById(modalId);

            modal.classList.remove("show");

            // Se não houver nenhum modal secundário aberto, esconde o fade
            const algumAberto = Array.from(modals).some(m => m.classList.contains("show"));
            if (!algumAberto) {
                fade.classList.remove("show");
            }
        });
    });

    // Fechar modal clicando no fundo escuro
    fade.addEventListener("click", () => {
        fade.classList.remove("show");
        modals.forEach(m => m.classList.remove("show"));
    });

        // Botão Começar com som imediato + leve atraso no redirecionamento
    const botaoComecar = document.querySelector(".com");
    if (botaoComecar) {
        const startSound = new Audio("start.mp3"); // ajuste o caminho do som

        botaoComecar.addEventListener("click", (e) => {
            e.preventDefault(); // impede de sair antes do som tocar

            startSound.currentTime = 0;
            startSound.play().catch(err => console.log("Erro ao tocar som:", err));

            // espera 200ms e muda de página
            setTimeout(() => {
                window.location.href = "../select/select.html";
            }, 200);
        });
    }

});
