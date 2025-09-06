const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById('finalScore');
finalScore.innerText = `Você acertou ${mostRecentScore}`;