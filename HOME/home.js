const fade = document.getElementById("fade"); // pega elemnt fade (aquele fundo escuro)


  window.addEventListener("load", function() {
    const splash = document.getElementById("splash");
    const site = document.getElementById("site-content");

    setTimeout(() => {
      splash.style.opacity = 0;
      setTimeout(() => {
        splash.style.display = "none";
        site.style.display = "block";
      }, 500);
    }, 2000);
  });

function abrirPopup(id) {
  const popup = document.getElementById(id); // pega popup pelo id
  if (!popup) return; // se n existir, sai d func
  popup.style.display = "flex"; // mostra popup
  fade.classList.add("show"); // mostra fundo escuro (fade)
}

function fecharPopup(id) {
  const popup = document.getElementById(id); // pega popup pelo id
  if (!popup) return; // se n existir, sai d func
  popup.style.display = "none"; // esconde popup
  fade.classList.remove("show"); // esconde fundo escuro
}

function fecharTodos() {
  // fecha td popup
  document.querySelectorAll(".popup, .popup-feedback").forEach(p => p.style.display = "none");
  fade.classList.remove("show"); // esconde fade
}

// fecha popup qnd clica no fade
fade.addEventListener("click", fecharTodos);

// impede q clique dentro do popup feche ele
document.querySelectorAll(".popup, .popup-feedback").forEach(popup => {
  popup.addEventListener("click", function(e) {
    e.stopPropagation(); // pára propagação do clique p fade (n fecha popup)
  });
});
