const questions = [
    {
        question: "Who directed the movie 'Inception'?",
        choices: ["Steven Spielberg", "Quentin Tarantino", "Christopher Nolan"],
        correctAnswer: 3
    },
    {
        question: "Which actor played the character (Tony Stark) in the Marvel Cinematic Universe?",
        choices: ["Robert Downey Jr.", "Chris Hemsworth", "Chris Evans"],
        correctAnswer: 1
    },
    {
        question: "Who played the lead role in the movie 'The Shawshank Redemption'?",
        choices: ["Tom Hanks", "Tim Robbins", "Brad Pitt"],
        correctAnswer: 2
    },
    {
        question: "What is the highest-grossing film of all time?",
        choices: ["Avatar", "Avengers: Endgame", "Titanic"],
        correctAnswer: 1
    },
    {
        question: "Who won the Academy Award (Oscars) for Best Actor for his role in the movie 'Joker'?",
        choices: ["Brad Pitt", "Keanu Reeves", "Joaquin Phoenix"],
        correctAnswer: 3
    },
    {
        question: "Who directed the movie 'Pulp Fiction'?",
        choices: ["Martin Scorsese", "Quentin Tarantino", "Christopher Nolan"],
        correctAnswer: 2
    },
    {
        question: "Which movie won the Academy Award for Best Film in 2020?",
        choices: ["Joker", "The Irishman", "Parasite"],
        correctAnswer: 3
    },
    {
        question: "Which Mystery movie features the character (Hannibal Lecter)?",
        choices: [ "Se7en", "The Silence of the Lambs", "Psycho"],
        correctAnswer: 2
    },
    {
        question: "Who played the role of (Jack Dawson) in the movie 'Titanic'?",
        choices: ["Leonardo DiCaprio", "Johnny Depp", "Brad Pitt" ],
        correctAnswer: 1
    }
];

 // index of the first element of questions
let score = 0;

// get HTML elements that are needed
const gameTitle = document.getElementById('game-title');
const startButton = document.getElementById('start-game');
const gameBoard = document.getElementById('game-board');
const squares = document.querySelectorAll('.square');
const questionModal = document.getElementById('question-modal');
const questionId = document.getElementById('question-id');
const questionText = document.getElementById('question-text');
const answerLabels = document.querySelectorAll('#answer-form label span');
const submitButton = document.getElementById('submit-answer');
const scoreValue = document.getElementById('score-value');

function displayQuestion(currentQuestionIndex) {
    squares[currentQuestionIndex].style.backgroundColor = '#4CAF50';
    const currentQuestion = questions[currentQuestionIndex];
    gameTitle.style.display = 'block';
    questionId.textContent = currentQuestionIndex+1; // display the current question
    questionText.textContent = currentQuestion.question; // display the current question
    for (let i = 0; i < 3; i++) {
        answerLabels[i].textContent = currentQuestion.choices[i]; // display the three answers
        document.getElementById('answer' + (i + 1)).checked = false;
    }
    questionModal.style.display = 'block';
    document.getElementById('result').textContent = "";
}

// function to check if the answer of each question true or false is
function checkAnswer() {
    currentQuestionIndex = questionId.textContent;
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const userAnswer = parseInt(selectedAnswer.value);
        const currentQuestion = questions[currentQuestionIndex-1];

        if (userAnswer === currentQuestion.correctAnswer) {
            score++;
            scoreValue.textContent = score;
            document.getElementById('result').textContent = "Correct!";
            document.getElementById('result').style.color = '#04ef12';
            currentQuestionIndex++;
            squares[currentQuestionIndex-1].style.backgroundColor = '#4CAF50';

            if (score === questions.length) {
                endGame(); // if user answers all 9 question then reset game after 3 seconds
            }
            setTimeout(() => {
                questionModal.style.display = 'none';
            }, 1000);


            if (currentQuestionIndex < squares.length) {
                squares[currentQuestionIndex-1].classList.add('unlocked');// unlock next level
                squares[currentQuestionIndex-2].style.backgroundColor = '#757272';
                squares[currentQuestionIndex-2].classList.remove('unlocked');
            }
        } else {
            document.getElementById('result').textContent = "Please try again";
            document.getElementById('result').style.color = '#ff0000';
        }
    }

}

function endGame() {
        alert(`Congratulations! You have completed the game with a score of ${score}/${questions.length}`);
        resetGame();
        startButton.style.display = 'none';
}

// function to reset the game instead of refresh the page
function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreValue.textContent = score;
    squares.forEach(square => {
        square.style.backgroundColor = '#ddd';
        square.classList.remove('unlocked');
    });
    gameTitle.style.display = 'block';
    startButton.style.display = 'block';
}

// what to display onclick 'Start Game' button
startButton.addEventListener('click', () => {
    gameTitle.style.display = 'none';
    startButton.style.display = 'none';
    gameBoard.style.display = 'grid';
    squares[0].classList.add('unlocked');
    displayQuestion(0);
});
// if the user clicks on the square, the question displays on screen
squares.forEach((square, index) => {
    square.addEventListener('click', () => {
        if (square.classList.contains('unlocked')) {
            currentQuestionIndex = index;
            displayQuestion(index);
        }
    });
});
// check if the answer true or false onclick 'submit answer'
submitButton.addEventListener('click', checkAnswer);

// here is how to close the modal question's screen
document.getElementsByClassName('close')[0].addEventListener('click', () => {
    questionModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === questionModal) {
        questionModal.style.display = 'none';
    }
});



