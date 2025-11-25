document.addEventListener("DOMContentLoaded", () => {
    // 1. Recupera a pontuação salva no arquivo de perguntas
    const mostRecentScore = localStorage.getItem("mostRecentScore");
    const finalScore = document.getElementById('finalScore');

    // 2. Mostra na tela e Salva no Banco
    if (mostRecentScore) {
        // Atualiza o texto na tela
        finalScore.innerText = `${mostRecentScore} de 10`;

        // Chama a função para salvar no banco
        enviarPontuacaoParaBanco(parseInt(mostRecentScore));
    } else {
        finalScore.innerText = "0 de 10";
    }
});

// =================================================
// FUNÇÃO DE CONEXÃO COM O BANCO DE DADOS
// =================================================
async function enviarPontuacaoParaBanco(pontosFinais) {
    const idUsuario = sessionStorage.getItem("usuarioId");
    
    // Se não tiver usuário, para aqui (mas o HTML já deve ter bloqueado)
    if (!idUsuario) return;

    try {
        const response = await fetch('http://localhost:3333/salvar-pontuacao', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: idUsuario,
                pontos: pontosFinais
            })
        });
        
        const data = await response.json();
        console.log("Status do Ranking:", data.message);
        
        if(data.newRecord) {
            console.log("Parabéns! Novo recorde pessoal registrado!");
        }
    } catch (error) {
        console.error("Erro ao salvar pontuação:", error);
    }
}