if (!sessionStorage.getItem("usuarioId")) {     
    alert("Ops! Você precisa fazer login para jogar e salvar sua pontuação.");
    
    window.location.href = "../../LOGIN/login.html"; 
    
    throw new Error("Acesso negado: Usuário não logado.");
}       
document.addEventListener('DOMContentLoaded', function() {
  // Elementos da DOM
  const telas = {
      inicio: document.getElementById('tela-inicio'),
      quiz: document.getElementById('tela-quiz'),
      final: document.getElementById('tela-final'),
      respostas: document.getElementById('tela-respostas')
  };
  
  const btnComecar = document.getElementById('btn-comecar');
  const btnSair = document.getElementById('btn-sair');
  const btnSairQuiz = document.getElementById('btn-sair-quiz');
  const btnProximo = document.getElementById('btn-proximo');
  const btnVerRespostas = document.getElementById('btn-ver-respostas');
  const btnTentarNovamente = document.getElementById('btn-tentar-novamente');
  const btnVoltarMenu = document.getElementById('btn-voltar-menu');
  const btnVoltarFinal = document.getElementById('btn-voltar-final');
  const btnMenuRespostas = document.getElementById('btn-menu-respostas');
  
  const perguntaTexto = document.getElementById('pergunta-texto');
  const opcoesContainer = document.getElementById('opcoes-container');
  const barraProgresso = document.getElementById('barra-progresso');
  const contadorPerguntas = document.getElementById('contador-perguntas');
  const pontosElemento = document.getElementById('pontos');
  const mensagemDesempenho = document.getElementById('mensagem-desempenho');
  const respostasContainer = document.getElementById('respostas-container');
  
  // Elementos do modal
  const modal = document.getElementById('modal-confirmacao');
  const modalConfirmar = document.getElementById('modal-confirmar');
  const modalCancelar = document.getElementById('modal-cancelar');
  
  // Variáveis do quiz
  let perguntaAtual = 0;
  let pontuacao = 0;
  let respostasSelecionadas = [];
  let quizFinalizado = false;
  let acaoConfirmada = null;
  
  // Perguntas do quiz
  const perguntas = [
      {
          pergunta: "Qual vitamina é principalmente obtida através da exposição ao sol?",
          opcoes: ["Vitamina A", "Vitamina C", "Vitamina D", "Vitamina K"],
          respostaCorreta: 2,
          explicacao: "A Vitamina D é conhecida como a 'vitamina do sol' porque nosso corpo a produz naturalmente quando a pele é exposta à luz solar."
      },
      {
          pergunta: "Qual desses alimentos é a melhor fonte de ômega-3?",
          opcoes: ["Salmão", "Frango", "Carne bovina", "Queijo"],
          respostaCorreta: 0,
          explicacao: "O salmão é uma excelente fonte de ômega-3, um ácido graxo essencial importante para a saúde do coração e do cérebro."
      },
      {
          pergunta: "Quantos litros de água em média um adulto deve consumir por dia?",
          opcoes: ["0,5-1 litro", "1,5-2 litros", "2,5-3 litros", "3,5-4 litros"],
          respostaCorreta: 1,
          explicacao: "A recomendação geral é de 1,5 a 2 litros de água por dia, mas isso pode variar conforme o clima, atividade física e necessidades individuais."
      },
      {
          pergunta: "Qual mineral é essencial para a formação dos ossos e dentes?",
          opcoes: ["Ferro", "Cálcio", "Potássio", "Sódio"],
          respostaCorreta: 1,
          explicacao: "O cálcio é um mineral crucial para a formação e manutenção de ossos e dentes saudáveis."
      },
      {
          pergunta: "Qual destes é um carboidrato complexo?",
          opcoes: ["Açúcar refinado", "Arroz integral", "Mel", "Refrigerante"],
          respostaCorreta: 1,
          explicacao: "O arroz integral é um carboidrato complexo, que é digerido mais lentamente, fornecendo energia de forma gradual."
      },
      {
          pergunta: "Qual alimento é rico em probióticos?",
          opcoes: ["Iogurte natural", "Pão branco", "Arroz", "Macarrão"],
          respostaCorreta: 0,
          explicacao: "O iogurte natural contém culturas bacterianas vivas que são probióticos, benéficos para a saúde intestinal."
      },
      {
          pergunta: "Qual destas vitaminas é solúvel em gordura?",
          opcoes: ["Vitamina B1", "Vitamina C", "Vitamina D", "Vitamina B12"],
          respostaCorreta: 2,
          explicacao: "A Vitamina D é solúvel em gordura, assim como as vitaminas A, E e K. Isso significa que elas são armazenadas no corpo e não precisam ser consumidas diariamente."
      },
      {
          pergunta: "Qual é a principal função das proteínas no organismo?",
          opcoes: ["Fornecer energia imediata", "Construir e reparar tecidos", "Regular a temperatura corporal", "Facilitar a digestão"],
          respostaCorreta: 1,
          explicacao: "A principal função das proteínas é construir e reparar tecidos, incluindo músculos, órgãos e pele."
      },
      {
          pergunta: "Qual destes alimentos tem o maior teor de fibras?",
          opcoes: ["Feijão preto", "Arroz branco", "Leite", "Ovo cozido"],
          respostaCorreta: 0,
          explicacao: "O feijão preto é rico em fibras, que são importantes para a saúde digestiva e ajudam a manter a sensação de saciedade."
      },
      {
          pergunta: "O que significa a sigla 'ANVISA' no contexto da nutrição no Brasil?",
          opcoes: [
              "Associação Nacional de Vigilância Sanitária",
              "Agência Nacional de Vigilância Sanitária",
              "Associação Nacional de Vitaminas e Sais",
              "Agência Nacional de Vitaminas e Suplementos Alimentares"
          ],
          respostaCorreta: 1,
          explicacao: "ANVISA significa Agência Nacional de Vigilância Sanitária, responsável pela regulamentação e fiscalização de alimentos, medicamentos e outros produtos relacionados à saúde no Brasil."
      }
  ];
  
  // Inicialização
  function init() {
      mostrarTela('inicio');
      adicionarEventListeners();
  }
  
  // Adicionar event listeners aos botões
  function adicionarEventListeners() {
      btnComecar.addEventListener('click', comecarQuiz);
      btnSair.addEventListener('click', () => mostrarModal('sair'));
      btnSairQuiz.addEventListener('click', () => mostrarModal('sairQuiz'));
      btnProximo.addEventListener('click', proximaPergunta);
      btnVerRespostas.addEventListener('click', verRespostas);
      btnTentarNovamente.addEventListener('click', tentarNovamente);
      btnVoltarMenu.addEventListener('click', () => mostrarModal('voltarMenu'));
      btnVoltarFinal.addEventListener('click', voltarParaFinal);
      btnMenuRespostas.addEventListener('click', () => mostrarModal('voltarMenu'));
      
      // Event listeners do modal
      modalConfirmar.addEventListener('click', confirmarAcao);
      modalCancelar.addEventListener('click', fecharModal);
  }
  
  // Função para mostrar uma tela específica
  function mostrarTela(tela) {
      // Esconder todas as telas
      for (let key in telas) {
          telas[key].classList.remove('ativa');
      }
      
      // Mostrar a tela solicitada
      telas[tela].classList.add('ativa');
  }
  
  // Mostrar modal de confirmação
  function mostrarModal(acao) {
      acaoConfirmada = acao;
      modal.classList.add('ativo');
  }
  
  // Fechar modal
  function fecharModal() {
      modal.classList.remove('ativo');
      acaoConfirmada = null;
  }
  
  // Confirmar ação do modal
  function confirmarAcao() {
      switch(acaoConfirmada) {
          case 'sair':
              window.location.href = './quizEjogos.html';
              break;
          case 'sairQuiz':
              mostrarTela('inicio');
              break;
          case 'voltarMenu':
              mostrarTela('inicio');
              break;
      }
      fecharModal();
  }
  
  // Começar o quiz
  function comecarQuiz() {
      perguntaAtual = 0;
      pontuacao = 0;
      respostasSelecionadas = [];
      quizFinalizado = false;
      
      mostrarTela('quiz');
      mostrarPergunta();
  }
  
  // Mostrar a pergunta atual
  function mostrarPergunta() {
      // Atualizar barra de progresso
      const progresso = ((perguntaAtual + 1) / perguntas.length) * 100;
      barraProgresso.style.width = `${progresso}%`;
      
      // Atualizar contador de perguntas
      contadorPerguntas.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
      
      // Exibir pergunta
      const pergunta = perguntas[perguntaAtual];
      perguntaTexto.textContent = pergunta.pergunta;
      
      // Limpar opções anteriores
      opcoesContainer.innerHTML = '';
      
      // Adicionar opções de resposta
      pergunta.opcoes.forEach((opcao, index) => {
          const opcaoElemento = document.createElement('div');
          opcaoElemento.classList.add('opcao');
          
          // Verificar se esta opção foi selecionada anteriormente
          if (respostasSelecionadas[perguntaAtual] === index) {
              opcaoElemento.classList.add('selecionada');
          }
          
          opcaoElemento.textContent = opcao;
          opcaoElemento.dataset.index = index;
          
          opcaoElemento.addEventListener('click', selecionarOpcao);
          
          opcoesContainer.appendChild(opcaoElemento);
      });
      
      // Atualizar estado do botão próximo
      btnProximo.disabled = respostasSelecionadas[perguntaAtual] === undefined;
  }
  
  // Selecionar uma opção de resposta
  function selecionarOpcao(e) {
      const opcoes = opcoesContainer.querySelectorAll('.opcao');
      
      // Remover seleção anterior
      opcoes.forEach(opcao => opcao.classList.remove('selecionada'));
      
      // Adicionar seleção atual
      e.target.classList.add('selecionada');
      
      // Salvar resposta selecionada
      respostasSelecionadas[perguntaAtual] = parseInt(e.target.dataset.index);
      
      // Habilitar botão próximo
      btnProximo.disabled = false;
  }
  
  // Ir para a próxima pergunta
  function proximaPergunta() {
      // Verificar se é a última pergunta
      if (perguntaAtual === perguntas.length - 1) {
          finalizarQuiz();
          return;
      }
      
      // Avançar para a próxima pergunta
      perguntaAtual++;
      mostrarPergunta();
  }
  
  // Finalizar o quiz
  function finalizarQuiz() {
      quizFinalizado = true;
      
      // Calcular pontuação
      pontuacao = 0;
      respostasSelecionadas.forEach((resposta, index) => {
          if (resposta === perguntas[index].respostaCorreta) {
              pontuacao++;
          }
      });
      
      // Atualizar elementos da tela final
      pontosElemento.textContent = pontuacao;
      
      // Definir mensagem de desempenho
      if (pontuacao <= 3) {
          mensagemDesempenho.textContent = "Você pode melhorar! Volte e continue explorando sobre nutrientes!";
      } else if (pontuacao <= 7) {
          mensagemDesempenho.textContent = "Bom trabalho! Seu conhecimento em nutrientes é sólido.";
      } else {
          mensagemDesempenho.textContent = "Excelente! Você é um verdadeiro expert em nutrientes!";
      }
      
      mostrarTela('final');
  }
  
  // Ver respostas
  function verRespostas() {
      respostasContainer.innerHTML = '';
      
      perguntas.forEach((pergunta, index) => {
          const respostaUsuario = respostasSelecionadas[index];
          const respostaCorreta = pergunta.respostaCorreta;
          const usuarioAcertou = respostaUsuario === respostaCorreta;
          
          const respostaItem = document.createElement('div');
          respostaItem.classList.add('resposta-item');
          
          if (usuarioAcertou) {
              respostaItem.classList.add('correta');
          } else {
              respostaItem.classList.add('incorreta');
          }
          
          const respostaPergunta = document.createElement('div');
          respostaPergunta.classList.add('resposta-pergunta');
          
          const numeroPergunta = document.createElement('div');
          numeroPergunta.classList.add('numero-pergunta');
          numeroPergunta.textContent = index + 1;
          
          const textoPergunta = document.createElement('span');
          textoPergunta.textContent = pergunta.pergunta;
          
          respostaPergunta.appendChild(numeroPergunta);
          respostaPergunta.appendChild(textoPergunta);
          
          const respostaCorretaElemento = document.createElement('div');
          respostaCorretaElemento.classList.add('resposta-correta');
          respostaCorretaElemento.innerHTML = `<span class="resposta-label">Resposta correta:</span> ${pergunta.opcoes[respostaCorreta]}`;
          
          const respostaUsuarioElemento = document.createElement('div');
          respostaUsuarioElemento.classList.add('resposta-usuario');
          
          let respostaTexto = "Não respondida";
          if (respostaUsuario !== undefined) {
              respostaTexto = pergunta.opcoes[respostaUsuario];
          }
          
          respostaUsuarioElemento.innerHTML = `<span class="resposta-label">Sua resposta:</span> ${respostaTexto}`;
          
          const explicacaoElemento = document.createElement('div');
          explicacaoElemento.classList.add('resposta-explicacao');
          explicacaoElemento.innerHTML = `<span class="resposta-label">Explicação:</span> ${pergunta.explicacao}`;
          explicacaoElemento.style.marginTop = "10px";
          explicacaoElemento.style.padding = "8px 10px";
          explicacaoElemento.style.backgroundColor = "#f8f9fa";
          explicacaoElemento.style.borderRadius = "5px";
          
          respostaItem.appendChild(respostaPergunta);
          respostaItem.appendChild(respostaCorretaElemento);
          respostaItem.appendChild(respostaUsuarioElemento);
          respostaItem.appendChild(explicacaoElemento);
          
          respostasContainer.appendChild(respostaItem);
      });
      
      mostrarTela('respostas');
  }
  
  // Tentar novamente
  function tentarNovamente() {
      comecarQuiz();
  }
  
  // Voltar para a tela final a partir da tela de respostas
  function voltarParaFinal() {
      mostrarTela('final');
  }
  
  // Inicializar o quiz
  init();
});