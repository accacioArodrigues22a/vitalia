function abrirPopup(id) {
    fecharTodos(); //chama a função
    document.getElementById(id).style.display = "block"; //Mostra o popup com o id que foi usado
    // display block mostra na tela, fica visivel
}

function fecharPopup(id) {
    document.getElementById(id).style.display = "none";
    // display none não mostra na tela, fica invisivel
}

function fecharTodos() {
    document.querySelectorAll(".popup").forEach(p => p.style.display = "none");
    //Seleciona todos os elementos com a classe popup
    //Para cada um deles, define display: none
}
