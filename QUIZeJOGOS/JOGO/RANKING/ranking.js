document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "http://localhost:3333"; 

    try {
        const response = await fetch(`${API_URL}/ranking`);
        const rankingData = await response.json();

        if (!response.ok) {
            console.error("Erro na resposta da API");
            return;
        }

        // === 1º LUGAR (OURO) ===
        // Seleciona a div principal do primeiro lugar
        const firstPlaceDiv = document.querySelector('.first-place');
        if (rankingData[0]) {
            // Busca os elementos dentro dessa div
            const nomeEl = firstPlaceDiv.querySelector('.player-name');
            const pontosEl = firstPlaceDiv.querySelector('.player-score');
            
            if(nomeEl) nomeEl.textContent = rankingData[0].name;
            if(pontosEl) pontosEl.textContent = rankingData[0].score + " Pontos";
        } else {
            // Se o banco estiver VAZIO, esconde o 1º lugar (opcional)
            if(firstPlaceDiv) firstPlaceDiv.style.display = 'none';
        }

        // === 2º LUGAR (PRATA) ===
        const secondPlaceDiv = document.querySelector('.second-place');
        if (rankingData[1]) {
            const nomeEl = secondPlaceDiv.querySelector('.player-name');
            const pontosEl = secondPlaceDiv.querySelector('.player-score');
            
            if(nomeEl) nomeEl.textContent = rankingData[1].name;
            if(pontosEl) pontosEl.textContent = rankingData[1].score + " Pontos";
        } else {
            // Se não tiver 2º jogador, esconde o degrau de prata
            if(secondPlaceDiv) secondPlaceDiv.style.visibility = 'hidden';
        }

        // === 3º LUGAR (BRONZE) ===
        const thirdPlaceDiv = document.querySelector('.third-place');
        if (rankingData[2]) {
            // AVISO: No seu HTML o nome do 3º tem ID="terceiro", mantive a lógica aqui:
            const nomeEl = document.getElementById('terceiro'); 
            const pontosEl = thirdPlaceDiv.querySelector('.player-score');
            
            if(nomeEl) nomeEl.textContent = rankingData[2].name;
            if(pontosEl) pontosEl.textContent = rankingData[2].score + " Pontos";
        } else {
            // Se não tiver 3º jogador, esconde o degrau de bronze
            if(thirdPlaceDiv) thirdPlaceDiv.style.visibility = 'hidden';
        }

    } catch (error) {
        console.error("Erro ao carregar ranking. Verifique se o server.js está rodando:", error);
    }
});