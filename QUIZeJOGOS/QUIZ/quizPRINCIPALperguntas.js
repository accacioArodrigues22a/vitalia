// espera o HTML carregar antes de mexer nos elementos
document.addEventListener('DOMContentLoaded', function() {

  // pega todas as telas do quiz (início, perguntas, final, respostas)
  const telas = { ... }

  // pega todos os botões que a gente vai usar
  const btnComecar = document.getElementById('btn-comecar');
  const btnSair = document.getElementById('btn-sair');

  // pega os elementos que vão mudar conforme as perguntas
  const perguntaTexto = document.getElementById('pergunta-texto');
  const opcoesContainer = document.getElementById('opcoes-container');
  const barraProgresso = document.getElementById('barra-progresso');
  const contadorPerguntas = document.getElementById('contador-perguntas');
  const pontosElemento = document.getElementById('pontos');
  const mensagemDesempenho = document.getElementById('mensagem-desempenho');
  const respostasContainer = document.getElementById('respostas-container');

  // modal de confirmação (tipo "tem certeza que quer sair?")
  const modal = document.getElementById('modal-confirmacao');
  const modalConfirmar = document.getElementById('modal-confirmar');
  const modalCancelar = document.getElementById('modal-cancelar');

  // variáveis pra controlar o quiz
  let perguntaAtual = 0;
  let pontuacao = 0;
  let respostasSelecionadas = [];
  let quizFinalizado = false;
  let acaoConfirmada = null;

  // array de perguntas com opções, resposta certa e explicação
  const perguntas = [ ... ]

  // função que inicia o quiz, mostra a tela inicial e adiciona os eventos
  function init() { 
    mostrarTela('inicio');
    adicionarEventListeners();
  }

  // adiciona todos os event listeners nos botões
  function adicionarEventListeners() {
    btnComecar.addEventListener('click', comecarQuiz);
    btnSair.addEventListener('click', () => mostrarModal('sair'));
    btnProximo.addEventListener('click', proximaPergunta);
    btnVerRespostas.addEventListener('click', verRespostas);
    btnTentarNovamente.addEventListener('click', tentarNovamente);
    // ... e mais alguns
    modalConfirmar.addEventListener('click', confirmarAcao);
    modalCancelar.addEventListener('click', fecharModal);
  }

  // função pra mostrar só uma tela e esconder as outras
  function mostrarTela(tela) {
    for (let key in telas) {
      telas[key].classList.remove('ativa');
    }
    telas[tela].classList.add('ativa');
  }

  // mostra modal de confirmação
  function mostrarModal(acao) {
    acaoConfirmada = acao;
    modal.classList.add('ativo');
  }

  // fecha modal
  function fecharModal() {
    modal.classList.remove('ativo');
    acaoConfirmada = null;
  }

  // confirma ação do modal (sair, voltar pro menu, etc)
  function confirmarAcao() {
    switch(acaoConfirmada) {
      case 'sair':
        window.location.href = 'quizPRINCIPAL.html';
        break;
      case 'sairQuiz':
      case 'voltarMenu':
        mostrarTela('inicio');
        break;
    }
    fecharModal();
  }

  // começa o quiz de verdade
  function comecarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    respostasSelecionadas = [];
    quizFinalizado = false;
    mostrarTela('quiz');
    mostrarPergunta();
  }

  // mostra a pergunta atual e as opções
  function mostrarPergunta() {
    const pergunta = perguntas[perguntaAtual];
    perguntaTexto.textContent = pergunta.pergunta;

    opcoesContainer.innerHTML = '';
    pergunta.opcoes.forEach((opcao, index) => {
      const opcaoElemento = document.createElement('div');
      opcaoElemento.classList.add('opcao');
      if (respostasSelecionadas[perguntaAtual] === index) opcaoElemento.classList.add('selecionada');
      opcaoElemento.textContent = opcao;
      opcaoElemento.dataset.index = index;
      opcaoElemento.addEventListener('click', selecionarOpcao);
      opcoesContainer.appendChild(opcaoElemento);
    });

    // barra de progresso e contador
    const progresso = ((perguntaAtual + 1) / perguntas.length) * 100;
    barraProgresso.style.width = `${progresso}%`;
    contadorPerguntas.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    btnProximo.disabled = respostasSelecionadas[perguntaAtual] === undefined;
  }

  // quando clica numa opção
  function selecionarOpcao(e) {
    const opcoes = opcoesContainer.querySelectorAll('.opcao');
    opcoes.forEach(opcao => opcao.classList.remove('selecionada'));
    e.target.classList.add('selecionada');
    respostasSelecionadas[perguntaAtual] = parseInt(e.target.dataset.index);
    btnProximo.disabled = false;
  }

  // vai pra próxima pergunta
  function proximaPergunta() {
    if (perguntaAtual === perguntas.length - 1) {
      finalizarQuiz();
      return;
    }
    perguntaAtual++;
    mostrarPergunta();
  }

  // termina o quiz e mostra resultados
  function finalizarQuiz() {
    quizFinalizado = true;
    pontuacao = respostasSelecionadas.reduce((acc, resp, i) => acc + (resp === perguntas[i].respostaCorreta ? 1 : 0), 0);

    pontosElemento.textContent = pontuacao;

    if (pontuacao <= 3) mensagemDesempenho.textContent = "Você pode melhorar! Volte e continue explorando sobre nutrientes!";
    else if (pontuacao <= 7) mensagemDesempenho.textContent = "Bom trabalho! Seu conhecimento em nutrientes é sólido.";
    else mensagemDesempenho.textContent = "Excelente! Você é um verdadeiro expert em nutrientes!";

    mostrarTela('final');
  }

  // mostra todas as respostas e explicações
  function verRespostas() {
    respostasContainer.innerHTML = '';
    perguntas.forEach((pergunta, index) => {
      const respostaUsuario = respostasSelecionadas[index];
      const respostaCorreta = pergunta.respostaCorreta;
      const usuarioAcertou = respostaUsuario === respostaCorreta;

      const respostaItem = document.createElement('div');
      respostaItem.classList.add('resposta-item');
      respostaItem.classList.add(usuarioAcertou ? 'correta' : 'incorreta');

      respostaItem.innerHTML = `
        <div class="resposta-pergunta"><div class="numero-pergunta">${index + 1}</div> <span>${pergunta.pergunta}</span></div>
        <div class="resposta-correta"><span class="resposta-label">Resposta correta:</span> ${pergunta.opcoes[respostaCorreta]}</div>
        <div class="resposta-usuario"><span class="resposta-label">Sua resposta:</span> ${respostaUsuario !== undefined ? pergunta.opcoes[respostaUsuario] : 'Não respondida'}</div>
        <div class="resposta-explicacao" style="margin-top:10px; padding:8px 10px; background:#f8f9fa; border-radius:5px;"><span class="resposta-label">Explicação:</span> ${pergunta.explicacao}</div>
      `;

      respostasContainer.appendChild(respostaItem);
    });
    mostrarTela('respostas');
  }

  function tentarNovamente() { comecarQuiz(); }
  function voltarParaFinal() { mostrarTela('final'); }

  // inicia o programa
  init();
});
