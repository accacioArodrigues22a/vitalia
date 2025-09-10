// pega a pontuação mais recente q tá salva no localStorage
const mostRecentScore = localStorage.getItem("mostRecentScore");

// pega o elemento do HTML que mostra a pontuação final
const finalScore = document.getElementById('finalScore');

// mostra no HTML tipo "X de 6"
finalScore.innerText = `${mostRecentScore} de 6`;
