let questionsData = []; 
let currentQuestionIndex = 0;
let score = 0;

const loadingMessage = document.getElementById('loading-message');
const quizContainer = document.getElementById('quiz-container');
let feedbackResult = document.getElementById('feedback-result');


function handleOnClick(selectedAnswer) {

    const correctAnswer = questionsData[currentQuestionIndex].answer

    if(selectedAnswer === correctAnswer) {
        score += 1;
        console.log(score);
        
    }

    message = selectedAnswer === correctAnswer ? "Good answer !" : "Wrong answer !";
    feedbackResult.textContent = message;

    



}

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
    button.addEventListener("click", () => handleOnClick(element)
    );

    quizContainer.appendChild(button);
    button.classList.add('ml-4', 'p-2', 'bg-blue-500', 'text-white', 'rounded', 'hover:bg-blue-800');


    
   });





}


loadQuestions();