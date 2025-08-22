const question = document.querySelector('.questiontext1');
const choices = Array.from( document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
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
        answer: 1
    }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

const getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign("./quizFINAL.html");
    }
    questionCounter++;
    const questionIndex =Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

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
        const selectedChoice = e.target; 
        const selectedAnswer = selectedChoice.dataset['number'];
        console.log(selectedAnswer);
        getNewQuestion();


    });
});

startGame();