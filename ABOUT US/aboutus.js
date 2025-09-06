const perfis = {
    andressa: {
      nome: "🏵️ Andressa Acaccio",
      user: "Instagram: @andressaaxl",
      faculdade: "Estuda no: UNASP-SP",
      resumo: "Organizada, decidida e sempre pronta pra ajudar.",
      imagem: "../HOME/imgs/andressa.png"
    },
    bruna: {
      nome: "🌸 Bruna Silva",
      user: "Instagram: @brunasmqs",
      faculdade: "Estuda no: UNASP-SP",
      resumo: "Criativa e determinada, fala pouco mas observa tudo.",
      imagem: "../HOME/imgs/bruna.png"
    },
    myria: {
      nome: "🌼 Myriã de Pires",
      user: "Instagram: @myria.vi_",
      faculdade: "Estuda no: UNASP-SP",
      resumo: "Mente inquieta e um coração que enxerga beleza onde ninguém mais vê.",
      imagem: "../HOME/imgs/userCinza.png"
    },
    nicolas: {
      nome: "💫 Nicolas de Souza",
      user: "Sem rede social ativa no momento.",
      faculdade: "Estuda no: UNASP-SP",
      resumo: "Tranquilo por fora, mente acelerada por dentro.",
      imagem: "../HOME/imgs/userCinza.png"
    },
    rayssa: {
      nome: "💗 Rayssa Cruz",
      user: "Instagram: @cqzray",
      faculdade: "Estuda no: UNASP-SP",
      resumo: "Detalhista, ama estética e transforma tudo em arte.",
      imagem: "../HOME/imgs/rayssa.png"
    }
  };
  

  function mostrarPerfil(nome, imgElement) {
    const perfil = perfis[nome];
  
    // caixinha de texto sobre os criadores
    document.getElementById("nome").textContent = perfil.nome;
    document.getElementById("user").textContent = perfil.user;
    document.getElementById("faculdade").textContent = perfil.faculdade;
    document.getElementById("resumo").textContent = perfil.resumo;
    document.getElementById("perfil").style.display = "block";
  
    // Remove apenas a classe 'selecionada' de todas as imagens (não altera mais as imagens para verde)
    const todasImagens = document.querySelectorAll('.f');
    todasImagens.forEach(img => {
        img.classList.remove('selecionada');
    });
  
    // Adiciona a classe 'selecionada' apenas na imagem clicada
    imgElement.classList.add('selecionada');
}
  

/*function mostrarPerfil(nome, imgElement) {
    const perfil = perfis[nome];
  
    // caixinha de texto sobre os criadores
    document.getElementById("nome").textContent = perfil.nome;
    document.getElementById("user").textContent = perfil.user;
    document.getElementById("faculdade").textContent = perfil.faculdade;
    document.getElementById("resumo").textContent = perfil.resumo;
    document.getElementById("perfil").style.display = "block";
  
    // Remove apenas a classe 'selecionada' de todas as imagens (não altera mais as imagens para verde)
    const todasImagens = document.querySelectorAll('.f');
    todasImagens.forEach(img => {
        img.classList.remove('selecionada');
    });
  
    // Adiciona a classe 'selecionada' apenas na imagem clicada
    imgElement.classList.add('selecionada');
}*/

  

