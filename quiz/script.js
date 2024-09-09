document.addEventListener('DOMContentLoaded', () => {
    const introPage = document.getElementById('intro');
    const quizPage = document.getElementById('quizPage');
    const resultsPage = document.getElementById('resultsPage');
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const startQuizButton = document.getElementById('startQuiz');
    const submitButton = document.getElementById('submit');
    const restartQuizButton = document.getElementById('restartQuiz');
    const timerElement = document.getElementById('time');
    let timer; // To hold the setInterval reference

    const quizQuestions = [
        {
            question: "What is the capital of France?",
            answers: {
                a: "Berlin",
                b: "Madrid",
                c: "Paris",
                d: "Lisbon"
            },
            correctAnswer: "c"
        },
        {
            question: "Who is the CEO of Tesla?",
            answers: {
                a: "Jeff Bezos",
                b: "Elon Musk",
                c: "Bill Gates",
                d: "Tony Stark"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the largest ocean on Earth?",
            answers: {
                a: "Atlantic Ocean",
                b: "Indian Ocean",
                c: "Arctic Ocean",
                d: "Pacific Ocean"
            },
            correctAnswer: "d"
        },
        // Example of an additional question
        {
            question: "Which planet is known as the Red Planet?",
            answers: {
                a: "Earth",
                b: "Mars",
                c: "Jupiter",
                d: "Saturn"
            },
            correctAnswer: "b"
        }
    ];

    function showPage(page) {
        introPage.classList.remove('active');
        quizPage.classList.remove('active');
        resultsPage.classList.remove('active');

        page.classList.add('active');
    }

    function buildQuiz() {
        const output = [];
    
        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
    
            for (let letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
    
            output.push(
                `<div class="question-container">
                    <div class="question-number">${questionNumber + 1})</div>
                    <div class="question-text">${currentQuestion.question}</div>
                    <div class="answers">${answers.join('')}</div>
                </div>`
            );
        });
    
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;

        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainers[questionNumber].style.color = 'green';
            } else {
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        resultsContainer.innerHTML = `You scored ${numCorrect} out of ${quizQuestions.length}`;
        showPage(resultsPage);
    }

    function startTimer(duration) {
        let timeRemaining = duration;
        timerElement.textContent = timeRemaining;
        
        timer = setInterval(() => {
            timeRemaining--;
            timerElement.textContent = timeRemaining;

            if (timeRemaining <= 0) {
                clearInterval(timer);
                showResults();
            }
        }, 1000);
    }

    startQuizButton.addEventListener('click', () => {
        showPage(quizPage);
        buildQuiz();
        startTimer(60); // Start a 60-second timer
    });

    submitButton.addEventListener('click', () => {
        clearInterval(timer); // Stop the timer if the user submits early
        showResults();
    });

    restartQuizButton.addEventListener('click', () => {
        showPage(introPage);
    });

    showPage(introPage);
});
