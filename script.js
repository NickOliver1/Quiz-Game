'use strict';

const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const answerChoicesEl = document.getElementById('answer-choices');
const quizFormEl = document.getElementById('quiz-form');

const feedbackEl = document.getElementById('feedback');
const nextButtonEl = document.getElementById('next-button');
const timerEl = document.getElementById("timer");
console.log(questionNumberEl, questionTextEl, answerChoicesEl);
const startScreenEl = document.getElementById('start-screen');
const questionScreenEl = document.getElementById('question-screen');
const startButtonEl = document.getElementById('start-button');
const dialogEl = document.getElementById('timer-warning');
const dialogCancelEl = document.getElementById('dialog-cancel');
const dialogConfirmEl = document.getElementById('dialog-confirm');

const questions = [
  {
    prompt: 'Which HTML element is best for the main heading of a page?',
    choices: ['<p>', '<h1>', '<div>', '<span>'],
    answerIndex: 1
  },
  {
    prompt: 'Which tag is used to create a hyperlink?',
    choices: ['<link>', '<a>', '<href>', '<nav>'],
    answerIndex: 1
  },
  {
    prompt: 'Which language runs in the browser?',
    choices: ['Java', 'C++', 'JavaScript', 'Python'],
    answerIndex: 2
  }
];
const QUESTION_TIME = 20;
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = QUESTION_TIME;
timerEl.textContent = `Time: ${timeLeft}s`;
let timerInterval = null;
function startTimer() {
  clearInterval(timerInterval); // safety clear
  
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      feedbackEl.textContent = "Time's up!";
      nextButtonEl.hidden = false;
      // If this was the last question, show full results
      if (currentQuestionIndex >= questions.length - 1) {
        showResults();
      }
    }
  }, 1000);
}
function renderQuestion(question, number) {
  // 1) Update question number label
  questionNumberEl.textContent = `Question ${number}`;

  // 2) Update the legend text (the question prompt)
  questionTextEl.textContent = question.prompt;

  // 3) Clear any old choices
  answerChoicesEl.innerHTML = '';

  // 4) Create one radio + label per choice
  question.choices.forEach((choiceText, index) => {
   // Create a wrapper so each option is on its own line
    const optionDiv = document.createElement('div');

    // Create the radio input
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'answer';          
    input.id = `choice-${index}`;   
    input.value = String(index);    
    input.required = true;          

    // Create the label
    const label = document.createElement('label');
    label.htmlFor = input.id;       
    label.textContent = choiceText;

    // Put input + label into the wrapper, then into the page
    optionDiv.appendChild(input);
    optionDiv.appendChild(label);
    answerChoicesEl.appendChild(optionDiv);
  });

  // Reset feedback and start the per-question timer
  feedbackEl.textContent = '';
  nextButtonEl.hidden = true;
  timeLeft = QUESTION_TIME;
  timerEl.textContent = `Time: ${timeLeft}s`;
  startTimer();
}

startButtonEl.addEventListener('click', () => {
  dialogEl.showModal();  
  dialogConfirmEl.addEventListener('click', () => {
  dialogEl.close();                    // close the dialog
  startScreenEl.hidden = true;         // hide start screen
  questionScreenEl.hidden = false;     // show question screen
  renderQuestion(questions[currentQuestionIndex], currentQuestionIndex + 1);
  startTimer();                        // global timer begins!
});

dialogCancelEl.addEventListener('click', () => {
  dialogEl.close(); // just dismiss, start screen stays visible
});
});
quizFormEl.addEventListener('submit', (event) => {
  event.preventDefault();
  
if (!quizFormEl.checkValidity()) {
    feedbackEl.textContent = "Please select an answer!";
  return;
}  
  const formData = new FormData(quizFormEl);
   const selected = Number(formData.get('answer'));

  const correct = questions[currentQuestionIndex].answerIndex;

  if (selected === correct) {
    feedbackEl.textContent = "Correct!";
    score++;
  } else {
    feedbackEl.textContent = "Incorrect.";
  }

    // stop this question's timer and reveal next
    clearInterval(timerInterval);
    nextButtonEl.hidden = false;
});
nextButtonEl.addEventListener('click', () => {
  currentQuestionIndex++;

  feedbackEl.textContent = '';
  nextButtonEl.hidden = true;
  quizFormEl.reset();

  if (currentQuestionIndex < questions.length) {
    renderQuestion(
      questions[currentQuestionIndex],
      currentQuestionIndex + 1
    );
  } else {
    showResults();
  }
});
function showResults() {
  questionScreenEl.hidden = true;

  const resultsScreenEl = document.getElementById('results-screen');
  resultsScreenEl.hidden = false;

  const finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = `You scored ${score} out of ${questions.length}!`;
}
const restartButtonEl = document.getElementById('restart-button');

restartButtonEl.addEventListener('click', () => {
  const resultsScreenEl = document.getElementById('results-screen');
  resultsScreenEl.hidden = true;

  score = 0;
  currentQuestionIndex = 0;

  questionScreenEl.hidden = false;
  renderQuestion(questions[currentQuestionIndex], currentQuestionIndex + 1);
});