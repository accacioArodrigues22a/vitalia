const perfis = {
  andressa: {
      nome: "Andressa Acaccio",
      user: "Instagram: @andressaaxl",
      faculdade: "Estuda no: UNASP-SP",
      resumo: "Informações textuais, auxílio no design.",
      imagem: "../HOME/imgs/andressa.png"
  },
  bruna: {
      nome: "Bruna Silva",
      user: "Instagram: @brunasmqs",
      faculdade: "Estuda no: UNASP-SP",
      resumo: "Informações textuais, auxílio no design.",
      imagem: "../HOME/imgs/bruna.png"
  },
  myria: {
      nome: "Myriã Xavier",
      user: "Instagram: @myria.vi_",
      faculdade: "Estuda no: UNASP-SP",
      resumo: "Informações textuais, auxílio no design.",
      imagem: "../HOME/imgs/userCinza.png"
  },
  nicolas: {
      nome: "Nicolas de Souza",
      user: "Sem rede social ativa no momento.",
      faculdade: "Estuda no: UNASP-SP",
      resumo: "Figuras e imagens, busca de textos, auxílio geral",
      imagem: "../HOME/imgs/userCinza.png"
  },
  rayssa: {
      nome: "Rayssa Cruz",
      user: "Instagram: @cqzray",
      faculdade: "Estuda no: UNASP-SP",
      resumo: "Editora chefe e organizadora geral, ama estética e transforma tudo em arte.",
      imagem: "../HOME/imgs/rayssa.png"
  }
};

let perfilVisivel = null; // Armazena o perfil atualmente visível

function mostrarPerfil(nome, imgElement) {
  const perfil = perfis[nome];
  const perfilCaixa = document.getElementById("perfil");

  // Verifica se a imagem clicada é a mesma que está selecionada
  if (perfilVisivel === nome) {
      // Se a mesma foto for clicada, esconde o perfil e remove a seleção da imagem
      perfilCaixa.style.display = "none";
      imgElement.classList.remove('selecionada');
      perfilVisivel = null; // Nenhum perfil está visível agora
  } else {
      // Caso contrário, exibe as informações do novo perfil
      document.getElementById("nome").textContent = perfil.nome;
      document.getElementById("user").textContent = perfil.user;
      document.getElementById("faculdade").textContent = perfil.faculdade;
      document.getElementById("resumo").textContent = perfil.resumo;
      perfilCaixa.style.display = "block";

      // Remove a seleção de todas as outras imagens
      const todasImagens = document.querySelectorAll('.f');
      todasImagens.forEach(img => {
          img.classList.remove('selecionada');
      });

      // Marca a imagem clicada como selecionada
      imgElement.classList.add('selecionada');
      
      // Atualiza a variável de perfil visível
      perfilVisivel = nome;
  }
}
