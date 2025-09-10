// cria o carrossel do siema pra ir trocando os blocos tipo um slideshow
new Siema;

// funcao que mostra ou esconde o bloco de info
// id = qual bloco clicou
function mostrarInfo(id) {
    const bloco = document.getElementById(id); // pega o bloco q clicou

    // se o bloco ja ta aberto, fecha ele
    if (bloco.classList.contains('ativo')) {
        bloco.classList.remove('ativo');
    } else {
        // fecha todos os outros blocos antes de abrir esse
        document.querySelectorAll('.info').forEach(el => el.classList.remove('ativo'));

        // abre o bloco clicado
        bloco.classList.add('ativo');
    }
}
