const characters = document.querySelectorAll(".characters img");
const startBtn = document.getElementById("startBtn");
let selectedCharacter = null;

// Clicar no personagem
characters.forEach(img => {
  img.addEventListener("click", () => {
    characters.forEach(i => i.classList.remove("selected"));
    img.classList.add("selected");
    selectedCharacter = img.dataset.file;
    localStorage.setItem("selectedCharacter", selectedCharacter);
  });
});

// Iniciar jogo
startBtn.addEventListener("click", () => {
  if (!selectedCharacter) {
    alert("Escolha um personagem antes de começar!");
    return;
  }
  window.location.href = "../jogo.html"; // leva para fase 1
});
