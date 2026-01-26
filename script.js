'use strict';

const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const answerChoicesEl = document.getElementById('answer-choices');

console.log(questionNumberEl, questionTextEl, answerChoicesEl);
const startScreenEl = document.getElementById('start-screen');
const questionScreenEl = document.getElementById('question-screen');
const startButtonEl = document.getElementById('start-button');

const question1 = {
  prompt: 'Which HTML element is best for the main heading of a page?',
  choices: ['<p>', '<h1>', '<div>', '<span>'],
  answerIndex: 1
};

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
}

renderQuestion(question1, 1);
startButtonEl.addEventListener('click', () => {
  startScreenEl.hidden = true;     // hide start screen
  questionScreenEl.hidden = false; // show question screen
});
