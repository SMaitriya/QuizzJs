let questionsData = []; 
let currentQuestionIndex = 0;
let score = 0;
const loadingMessage = document.getElementById('loading-message');
const quizContainer = document.getElementById('quiz-container');
let feedbackResult = document.getElementById('feedback-result');
const nextQuestionDiv = document.getElementById('next-question');
const showResultDiv = document.getElementById('show-result');
const finalScore = document.getElementById('final-score');

function handleOnClick(selectedAnswer) {

    const correctAnswer = questionsData[currentQuestionIndex].answer
    const options = quizContainer.querySelectorAll('button');

    if(selectedAnswer === correctAnswer) {
        score += 1;
        message = "Good answer !";
        feedbackResult.classList.remove('text-red-500', 'mt-14');
        feedbackResult.classList.add('text-green-500', 'mt-14');
    } else {
        message = "Wrong answer !";
         feedbackResult.classList.remove('text-green-500', 'mt-14');
        feedbackResult.classList.add('text-red-500', 'mt-14');

    }
    feedbackResult.textContent = message;

     options.forEach((e) => {
            e.disabled = true;
            if(e.textContent === correctAnswer) {
                e.classList.add('bg-green-800');
                e.classList.remove('hover:bg-blue-800');
            }
        })

    if(currentQuestionIndex < questionsData.length -1) {
        nextQuestion();
    }
    else {
        showFinalScore();
    }

}

function nextQuestion() {
    const nextQuestionButton = document.createElement('button');
    nextQuestionButton.textContent = 'Next Question';
    nextQuestionDiv.appendChild(nextQuestionButton);
    nextQuestionButton.classList.add('w-full', 'mt-8', 'p-4', 'bg-pink-700', 'text-white', 'rounded-lg', 'font-bold', 'uppercase', 'shadow-neon-pink', 'hover:bg-pink-500', 'transition-colors', 'duration-300');

    nextQuestionButton.addEventListener("click", () => {
        currentQuestionIndex += 1;
        nextQuestionButton.remove();
        feedbackResult.textContent = "";

        if(currentQuestionIndex < questionsData.length){
            renderQuestion();
        }
    })
}

function showFinalScore(){
    const finalQuestionButton = document.createElement('button');
    finalQuestionButton.textContent = "Check score";
    showResultDiv.appendChild(finalQuestionButton);
    finalQuestionButton.classList.add('text-white','p-4', 'bg-black', 'rounded-lg');
    const finalScoreDiv = document.createElement('div');
    
    finalQuestionButton.addEventListener("click", () => {
        quizContainer.innerHTML = "";
        feedbackResult.textContent = "";
        console.log(score);
        finalQuestionButton.remove();
        finalScoreDiv.textContent = `You got ${score}/${questionsData.length}`;
        finalScore.append(finalScoreDiv);

        const retryButton = document.createElement('button'); 
        retryButton.textContent = "RESTART";
        retryButton.classList.add('w-full', 'mt-10', 'p-4', 'bg-red-700', 'text-white', 'rounded-lg', 'font-bold', 'uppercase', 'shadow-neon-primary',
            'hover:bg-red-500', 'transition-colors', 'duration-300'
        );
        finalScore.appendChild(retryButton); 
        retryButton.addEventListener('click', () => {
            restartQuiz();
        })
    })

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

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    
    finalScore.innerHTML = "";
    feedbackResult.textContent = "";
    renderQuestion();
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
    button.classList.add('mt-4', 'p-4', 'w-full', 'text-left', 'border-2', 'border-purple-500', 'bg-black', 'text-white', 'shadow-neon-purple', 'hover:bg-purple-900', 'transition-colors', 'duration-300');


   });


}

      tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary': '#F87171',
                        'secondary': '#34D399',
                        'bg-dark-screen': '#0A0A0A',
                        'bg-arcade-base': '#1F2937',
                    },
                    fontFamily: {
                        'sans': ['"Press Start 2P"', 'cursive', 'monospace'],
                    },
                }
            }
        }

loadQuestions();