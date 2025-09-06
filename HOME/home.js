const fade = document.getElementById("fade");

function abrirPopup(id) {
  const popup = document.getElementById(id);
  if (!popup) return;
  popup.style.display = "flex";
  fade.classList.add("show");
}

function fecharPopup(id) {
  const popup = document.getElementById(id);
  if (!popup) return;
  popup.style.display = "none";
  fade.classList.remove("show");
}

function fecharTodos() {
  document.querySelectorAll(".popup, .popup-feedback").forEach(p => p.style.display = "none");
  fade.classList.remove("show");
}

// Fechar ao clicar no fade
fade.addEventListener("click", fecharTodos);


// Impede que o clique dentro do popup feche ele
document.querySelectorAll(".popup, .popup-feedback").forEach(popup => {
  popup.addEventListener("click", function(e) {
    e.stopPropagation();
  });
});
