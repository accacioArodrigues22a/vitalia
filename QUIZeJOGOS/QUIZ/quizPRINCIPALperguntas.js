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
    getNewQuestion();
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("./quizFINAL.html");
    }

    questionCounter++;

    document.querySelector("#inabar").style.width = `${questionCounter * 25}%`;
    document.querySelector("#percent").innerHTML = `${questionCounter * 25}%`;

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

    // Atualiza o botão para "Responder"
    button.innerText = "RESPONDER";
};

// Clique no container inteiro, não só no texto
choiceContainers.forEach(container => {
    container.addEventListener('click', () => {
        if (!acceptingAnswers) return;

        // Remove seleção anterior
        choiceContainers.forEach(c => c.classList.remove("selected"));

        selectedChoice = container.querySelector('.choice-text'); // pega o texto clicado
        container.classList.add("selected");
    });
});

const button = document.querySelector('.the-real-button');

button.addEventListener('click', () => {
    // Se ainda não respondeu, avalia a resposta
    if (acceptingAnswers && selectedChoice) {
        acceptingAnswers = false;

        const selectedAnswer = selectedChoice.dataset['number'];

        // REMOVE O AMARELO ANTES DE APLICAR O RESULTADO
        selectedChoice.closest(".choice-container").classList.remove("selected");

        if (selectedAnswer == currentQuestion.answer) {
            classToApply = "correct";
            score += CORRECT_BONUS;
        } else {
            classToApply = "incorrect";

            // Mostra a correta
            correctAnswer = document.querySelector(
                `[data-number='${currentQuestion.answer}']`
            ).closest(".choice-container");
            correctAnswer.classList.add("correct");
        }

        // Aplica classe na escolha do usuário
        selectedChoice.closest(".choice-container").classList.add(classToApply);

        // Muda texto do botão para "Próxima Pergunta"
        button.innerText = "PRÓXIMA PERGUNTA";

    } else if (!acceptingAnswers) {
        // Resetar estilos para próxima pergunta
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