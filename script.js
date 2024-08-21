// Estrutura de dados para perguntas, opções e respostas corretas
const questions = [
    {
        question: "Quem foi o primeiro presidente do Brasil?",
        options: ["Getúlio Vargas", "Juscelino Kubitschek", "Deodoro da Fonseca", "Dom Pedro II"],
        correctAnswer: "Deodoro da Fonseca"
    },
    {
        question: "Qual é a capital da Austrália?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswer: "Canberra"
    },
    {
        question: "Em que ano a primeira Guerra Mundial começou?",
        options: ["1914", "1918", "1939", "1945"],
        correctAnswer: "1914"
    },
    {
        question: "Quem pintou a Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci"
    }
];

let currentQuestionIndex;

// Função para iniciar o quiz
function startQuiz() {
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    displayQuestion();
}

// Função para exibir a pergunta e as opções
function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const feedbackElement = document.getElementById("feedback");
    const reloadButton = document.getElementById("reload");

    // Limpar feedback e esconder botão "Reload"
    feedbackElement.textContent = "";
    reloadButton.style.display = "none";

    // Obter a pergunta e as opções atuais
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Limpar as opções anteriores
    optionsElement.innerHTML = "";

    // Exibir as opções
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsElement.appendChild(button);
    });
}

// Função para verificar a resposta selecionada
function checkAnswer(selectedOption) {
    const feedbackElement = document.getElementById("feedback");
    const reloadButton = document.getElementById("reload");

    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
        feedbackElement.textContent = "Acertou!!!";
    } else {
        feedbackElement.textContent = `Errado! A resposta correta é: ${currentQuestion.correctAnswer}.`;
    }

    // Exibir botão "Reload"
    reloadButton.style.display = "block";
}

// Função para recarregar o quiz
function reloadQuiz() {
    startQuiz();
}

// Iniciar o quiz ao carregar a página
window.onload = startQuiz;
