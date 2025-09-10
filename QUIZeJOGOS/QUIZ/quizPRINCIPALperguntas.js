/*const question = document.querySelector('.questiontext1');
const choices = Array.from( document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let selectedChoice = ""
let classToApply = ""
let correctAnswer = ""

let questions = [
    {
        question: `Qual é a principal função do carboidrato no organismo?`,
        choice1: "Construção de Tecidos",
        choice2: "Fornecer Energia Rápida",
        choice3: "Proteger Contra Doenças",
        answer: 2
    },
    {
        question: `Qual nutriente ajuda na digestão?`,
        choice1: "Fibra",
        choice2: "Sal",
        choice3: "Proteína",
        answer: 1
    },
    {
        question: `Qual vitamina é conhecida por ajudar a prevenir gripes e resfriados?`,
        choice1: "Vitamina K",
        choice2: "Vitamina B12",
        choice3: "Vitamina C",
        answer: 3
    },
    {
        question: `Qual sistema do corpo é fortalecido com boa alimentação?`,
        choice1: "Sistema Muscular",
        choice2: "Sistema Visual",
        choice3: "Sistema Imunológico",
        answer: 1
    }
];

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 4;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

const getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("./quizFINAL.html");
    }
    questionCounter++;
    
    document.querySelector("#inabar").style.width = `${questionCounter * 25}%`
    document.querySelector("#percent").innerHTML = `${questionCounter * 25}%`

    const questionIndex =Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = `<span class="question-number">${questionCounter}. </span>${currentQuestion.question}`;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        if(selectedAnswer == currentQuestion.answer) {
            classToApply = "correct";
            score = score + CORRECT_BONUS;
        } else {
            classToApply = "incorrect";
            correctAnswer = document.querySelector(`[data-number='${currentQuestion.answer}']`)
            correctAnswer.parentElement.classList.add("correct")
        }

        classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        selectedChoice.parentElement.classList.add(classToApply);

        console.log(selectedAnswer == currentQuestion.answer);
        
    });
});

const button = document.querySelector('.next-button button');
button.addEventListener('click', () => {
    if (selectedChoice && selectedChoice.parentElement) {
    selectedChoice.parentElement.classList.remove(classToApply);
    }
    if (correctAnswer && correctAnswer.parentElement) {
    correctAnswer.parentElement.classList.remove("correct");
    }
    getNewQuestion();
});

startGame();*/

const question = document.querySelector('.questiontext1');
const choiceContainers = Array.from(document.getElementsByClassName('choice-container'));
const button = document.querySelector('.the-real-button');
const indicator = document.getElementById("question-indicator");

let answerHistory = [];
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let selectedChoice = "";
let classToApply = "";
let correctAnswer = "";

let questions = [
  {
    question: `Qual é a principal função do carboidrato no organismo?`,
    choice1: "Construção de Tecidos",
    choice2: "Fornecer Energia Rápida",
    choice3: "Proteger Contra Doenças",
    choice4: "Transporte de Oxigênio",
    answer: 2
  },
  {
    question: `Qual nutriente ajuda na digestão?`,
    choice1: "Fibra",
    choice2: "Sal",
    choice3: "Proteína",
    choice4: "Vitamina A",
    answer: 1
  },
  {
    question: `Qual vitamina é conhecida por ajudar a prevenir gripes e resfriados?`,
    choice1: "Vitamina K",
    choice2: "Vitamina B12",
    choice3: "Vitamina C",
    choice4: "Vitamina D",
    answer: 3
  },
  {
    question: `Qual sistema do corpo é fortalecido com boa alimentação?`,
    choice1: "Sistema Muscular",
    choice2: "Sistema Visual",
    choice3: "Sistema Imunológico",
    choice4: "Sistema Reprodutor",
    answer: 3
  },
  {
    question: `Qual nutriente é fundamental para a construção dos músculos?`,
    choice1: "Proteínas",
    choice2: "Carboidratos",
    choice3: "Gorduras",
    choice4: "Vitaminas",
    answer: 1
  },
  {
    question: `Qual mineral é essencial para ossos fortes?`,
    choice1: "Ferro",
    choice2: "Cálcio",
    choice3: "Potássio",
    choice4: "Magnésio",
    answer: 2
  }
];

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = questions.length;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

// ... (restante do código igual até getNewQuestion)

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem("mostRecentScore", score);
      return window.location.assign("./quizFINAL.html");
    }
  
    questionCounter++;
    indicator.innerText = `PERGUNTA ${questionCounter} DE ${MAX_QUESTIONS}`;
  
    const percentage = ((questionCounter / MAX_QUESTIONS) * 100).toFixed(0);
    document.querySelector("#inabar").style.width = `${percentage}%`;
    document.querySelector("#percent").innerHTML = `${percentage}%`;
  
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = `<span class="question-number">${questionCounter}. </span>${currentQuestion.question}`;
  
    choiceContainers.forEach((container, index) => {
      const number = index + 1;
      const choiceText = container.querySelector('.choice-text');
      choiceText.innerText = currentQuestion['choice' + number];
      container.classList.remove("correct", "incorrect", "selected");
      choiceText.dataset.number = number;
    });
  
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    selectedChoice = "";
    classToApply = "";
    correctAnswer = "";
  
    button.innerText = "RESPONDER";
  };
  
  choiceContainers.forEach(container => {
    container.addEventListener('click', () => {
      if (!acceptingAnswers) return;
  
      choiceContainers.forEach(c => c.classList.remove("selected"));
      selectedChoice = container.querySelector('.choice-text');
      container.classList.add("selected");
    });
  });
  
  button.addEventListener('click', () => {
    if (acceptingAnswers && selectedChoice) {
      acceptingAnswers = false;
      const selectedAnswer = selectedChoice.dataset['number'];
      selectedChoice.closest(".choice-container").classList.remove("selected");
  
      if (selectedAnswer == currentQuestion.answer) {
        classToApply = "correct";
        score += CORRECT_BONUS;
      } else {
        classToApply = "incorrect";
        correctAnswer = document.querySelector(`[data-number='${currentQuestion.answer}']`).closest(".choice-container");
        correctAnswer.classList.add("correct");
      }
  
      selectedChoice.closest(".choice-container").classList.add(classToApply);
      button.innerText = "PRÓXIMA PERGUNTA";
  
    } else if (!acceptingAnswers) {
      if (selectedChoice) {
        selectedChoice.closest(".choice-container").classList.remove(classToApply, "selected");
      }
      if (correctAnswer) {
        correctAnswer.classList.remove("correct");
      }
      getNewQuestion();
    }
  });
  
  startGame();
  
  // Modal de saída
  const exitBtn = document.getElementById("exit-btn");
  const modal = document.getElementById("exit-modal");
  const confirmExit = document.getElementById("confirm-exit");
  const cancelExit = document.getElementById("cancel-exit");
  
  exitBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });
  
  cancelExit.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  
  confirmExit.addEventListener("click", () => {
    window.location.href = "./quizPRINCIPAL.html";
  });
  

