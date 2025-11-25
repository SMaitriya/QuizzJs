let questionsData = []; 
let currentQuestionIndex = 0;
let score = 0;

const loadingMessage = document.getElementById('loading-message');
const quizContainer = document.getElementById('quiz-container');

async function loadQuestions() {
    const url = "./questions.json"
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        questionsData = result;
        loadingMessage.style.display = 'none'
        renderQuestion();
    } catch(error) {
        console.error(error.message);
    }
}

function renderQuestion() {

    quizContainer.innerHTML = "";
   const currentQuestionText =  questionsData[currentQuestionIndex].question;
   questionElement = document.createElement("h2");
   questionElement.textContent = currentQuestionText;
   quizContainer.appendChild(questionElement);

   const currentOptionText = questionsData[currentQuestionIndex].options;


   currentOptionText.forEach(element => {

    const button = document.createElement("button");
    button.textContent = element;

    quizContainer.appendChild(button);
    button.classList.add('ml-4', 'p-2', 'bg-blue-500', 'text-white', 'rounded');


    
   });





}


loadQuestions();