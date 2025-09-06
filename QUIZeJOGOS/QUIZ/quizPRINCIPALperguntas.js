const question = document.querySelector('.questiontext1');
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
            classToApply = 'correct';
            score = score + CORRECT_BONUS;
        } else {
            classToApply = 'incorrect';
            correctAnswer = document.querySelector(`[data-number='${currentQuestion.answer}']`)
            correctAnswer.parentElement.classList.add("correct")
        }

        classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selectedChoice.parentElement.classList.add(classToApply);

        console.log(selectedAnswer == currentQuestion.answer);
        
    });
});

const button = document.querySelector('.next-button button');
button.addEventListener('click', () => {
    selectedChoice.parentElement.classList.remove(classToApply);
    correctAnswer.parentElement.classList.remove("correct")
    getNewQuestion();
});

startGame();

/* CHAT QUE FEZ. NICOLAS, DÊ UMA OLHADA.
// Seletores principais
const questionElement = document.querySelector('.questiontext1');
const choiceElements = Array.from(document.getElementsByClassName('choice-text'));
const nextButton = document.querySelector('.next-button button');

// Variáveis de estado
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let selectedChoice = null;
let classToApply = "";
let correctAnswerElement = null;

// Banco de questões
const QUESTIONS = [
    {
        question: "Qual é a principal função do carboidrato no organismo?",
        choice1: "Construção de Tecidos",
        choice2: "Fornecer Energia Rápida",
        choice3: "Proteger Contra Doenças",
        answer: 2
    },
    {
        question: "Qual nutriente ajuda na digestão?",
        choice1: "Fibra",
        choice2: "Sal",
        choice3: "Proteína",
        answer: 1
    },
    {
        question: "Qual vitamina é conhecida por ajudar a prevenir gripes e resfriados?",
        choice1: "Vitamina K",
        choice2: "Vitamina B12",
        choice3: "Vitamina C",
        answer: 3
    },
    {
        question: "Qual sistema do corpo é fortalecido com boa alimentação?",
        choice1: "Sistema Muscular",
        choice2: "Sistema Visual",
        choice3: "Sistema Imunológico",
        answer: 3
    }
];

// Configurações
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = QUESTIONS.length;

// Inicia o jogo
function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...QUESTIONS];
    getNewQuestion();
}

// Carrega uma nova questão
function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign("./quizFINAL.html");
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    // Exibe a pergunta
    questionElement.innerHTML = `<span class="question-number">${questionCounter}. </span>${currentQuestion.question}`;

    // Exibe alternativas
    choiceElements.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
        choice.parentElement.classList.remove("correct", "incorrect");
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    correctAnswerElement = null;
}

// Verifica resposta
function handleChoice(e) {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    const isCorrect = selectedAnswer == currentQuestion.answer;
    classToApply = isCorrect ? 'correct' : 'incorrect';

    selectedChoice.parentElement.classList.add(classToApply);

    if (!isCorrect) {
        correctAnswerElement = document.querySelector(`[data-number='${currentQuestion.answer}']`);
        correctAnswerElement.parentElement.classList.add("correct");
    }

    if (isCorrect) score += CORRECT_BONUS;
}

// Evento clique nas alternativas
choiceElements.forEach(choice => {
    choice.addEventListener('click', handleChoice);
});

// Evento botão próximo
nextButton.addEventListener('click', () => {
    if (selectedChoice) {
        selectedChoice.parentElement.classList.remove(classToApply);
    }
    if (correctAnswerElement) {
        correctAnswerElement.parentElement.classList.remove("correct");
    }
    getNewQuestion();
});

// Inicia
startGame();
*/