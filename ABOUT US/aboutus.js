// Lista com os perfis de todo mundo do grupo
// Cada um tem: nome, insta, faculdade, resumo e foto
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
  
  // Variável que guarda qual perfil tá aberto na tela
  // Se ninguém estiver aberto, fica null
  let perfilVisivel = null;
  
  // Função que roda quando clica numa foto
  // "nome" é de quem é o perfil, "imgElement" é a foto clicada
  function mostrarPerfil(nome, imgElement) {
    const perfil = perfis[nome]; // pega as infos da pessoa
    const perfilCaixa = document.getElementById("perfil"); // pega a caixinha que mostra o perfil
  
    // Se clicou na mesma pessoa que já tava aberta
    if (perfilVisivel === nome) {
        // fecha a caixinha e tira a marcação da foto
        perfilCaixa.style.display = "none";
        imgElement.classList.remove('selecionada');
        perfilVisivel = null; // ninguém tá aberto agora
    } else {
        // se clicou em outra pessoa, mostra as infos dela
        document.getElementById("nome").textContent = perfil.nome;
        document.getElementById("user").textContent = perfil.user;
        document.getElementById("faculdade").textContent = perfil.faculdade;
        document.getElementById("resumo").textContent = perfil.resumo;
        perfilCaixa.style.display = "block"; // mostra a caixinha
  
        // tira a seleção de todas as fotos
        const todasImagens = document.querySelectorAll('.f');
        todasImagens.forEach(img => {
            img.classList.remove('selecionada');
        });
  
        // marca só a foto clicada
        imgElement.classList.add('selecionada');
        
        // atualiza qual perfil tá aberto agora
        perfilVisivel = nome;
    }
  }
  