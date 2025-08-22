const perguntas = [
    {
      texto: "Qual é a principal função do carboidrato no organismo",
      alternativas: ["Construção de tecidos", "Fornecer energia rápida", "Proteger contra doenças"],
      correta: 1
    },
    {
      texto: "Qual nutriente ajuda na digestão e no bom funcionamento do intestino?",
      alternativas: ["Fibra", "Sal", "Protéina"],
      correta: 0
    },
    {
      texto: "Qual vitamina é conhecida por ajudar a prevenir gripes e resfriados?",
      alternativas: ["Vitamina C", "Vitamina B12", "Vitamina K"],
      correta: 0
    },
    {
      texto: "Qual sistema do corpo é fortalecido com boa alimentação?",
      alternativas: ["Sistema Imunológico", "Sistema Visual", "Sistema Muscular"],
      correta: 2
    }
  ];
  
  // Índice da pergunta atual
  let numeroPergunta = 0;
  // Controle para saber se já foi respondida
  let jaRespondeu = false;
  // Contador de acertos
  let contadorAcertos = 0;
  
  // Pegando elementos do HTML
  let elementoPergunta = document.getElementById("question");
  let elementoOpcoes = document.getElementById("options");
  let botaoProximo = document.getElementById("botaoIniciar");
  
  // Função para mostrar a pergunta na tela
  function mostrarPergunta() {
    jaRespondeu = false; // permite clicar nas opções
    botaoProximo.style.display = "none"; // esconde o botão "próximo"
  
    let pergunta = perguntas[numeroPergunta];
    elementoPergunta.textContent = ${numeroPergunta + 1}. ${pergunta.texto};
    elementoOpcoes.innerHTML = ""; // limpa as opções antigas
  
    // Criar um botão para cada alternativa
    pergunta.alternativas.forEach((textoAlternativa, indice) => {
      let botao = document.createElement("div");
      botao.classList.add("option");
      botao.innerHTML = <span>${String.fromCharCode(65 + indice)}</span> ${textoAlternativa};
      botao.onclick = () => verificarResposta(indice); // quando clicar, verifica resposta
      elementoOpcoes.appendChild(botao);
    });
  }
  
  // Função para verificar se a resposta está certa
  function verificarResposta(indiceClicado) {
    if (jaRespondeu) return; // se já respondeu, não faz nada
    jaRespondeu = true;
  
    let respostaCerta = perguntas[numeroPergunta].correta;
    let todosBotoes = document.querySelectorAll(".option");
  
    // Se acertou, incrementa contador
    if (indiceClicado === respostaCerta) {
      contadorAcertos++;
    }
  
    // Marca verde para a certa e vermelho para as erradas
    todosBotoes.forEach((botao, indice) => {
      if (indice === respostaCerta) {
        botao.classList.add("correct");
      } else {
        botao.classList.add("incorrect");
      }
    });
  
    botaoProximo.style.display = "inline-block"; // mostra o botão "próximo"
  }
  
  // Função para ir para a próxima pergunta
  botaoProximo.onclick = () => {
    numeroPergunta++;
    if (numeroPergunta < perguntas.length) {
      mostrarPergunta();
    } else {
      elementoPergunta.textContent = Fim do quiz! Você acertou ${contadorAcertos} de ${perguntas.length} perguntas.;
      elementoOpcoes.innerHTML = "";
      botaoProximo.style.display = "none";
    }
  };
  
  // Inicia o quiz
  mostrarPergunta();