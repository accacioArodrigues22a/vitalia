document.addEventListener("DOMContentLoaded", () => {
    const fade = document.getElementById("fade"); // fundo escuro por trás dos modais
    const modals = document.querySelectorAll(".modal"); // todos os modais
    const botoesFechar = document.querySelectorAll(".fechar"); // botões de X
    const botoesModal = document.querySelectorAll("[data-modal]"); // botões q abrem modais

    const SOUNDS_PATH = '../IMGSjogo/'; // pasta dos sons

    // abrir modal
    botoesModal.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal"); // pega id do modal q abriu
            const modal = document.getElementById(modalId);

            // fecha todos os modais, menos o principal (modal1)
            modals.forEach(m => {
                if (m.id !== "modal1") {
                    m.classList.remove("show"); // some os secundários
                }
            });

            fade.classList.add("show"); // mostra fade
            modal.classList.add("show"); // mostra modal clicado
        });
    });

    // fechar modal clicando no X
    botoesFechar.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-close"); // pega id do modal a fechar
            const modal = document.getElementById(modalId);

            modal.classList.remove("show"); // some modal

            // se n tiver nenhum outro modal aberto, some fade
            const algumAberto = Array.from(modals).some(m => m.classList.contains("show"));
            if (!algumAberto) fade.classList.remove("show");
        });
    });

    // fechar modal clicando no fundo escuro
    fade.addEventListener("click", () => {
        fade.classList.remove("show"); // some fade
        modals.forEach(m => m.classList.remove("show")); // some todos os modais
    });

    // botão começar com som + leve delay pra mudar de página
    const botaoComecar = document.querySelector(".com");
    if (botaoComecar) {
        const startSound = new Audio("start.mp3"); // som de start

        botaoComecar.addEventListener("click", (e) => {
            e.preventDefault(); // impede de mudar de página antes do som tocar

            startSound.currentTime = 0;
            startSound.play().catch(err => console.log("Erro ao tocar som:", err)); // play do som

            // espera 200ms e vai pra página de seleção
            setTimeout(() => {
                window.location.href = "../select/select.html";
            }, 200);
        });
    }

});
