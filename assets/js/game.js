// GLOBAL CONSTANTS

// GLOBAL VARIABLES
let score = 0

// HTML SELECTORS
const startButton = document.querySelector('[data-button="start"]');
const rulesButton = document.querySelector('[data-button="rules"]');
const closeButton = document.querySelector('[data-button="close"]');
const playAgainButton = document.querySelector('[data-button="play-again"]');

const resultText = document.querySelector('[data-text="result"]'); 

const icons = document.querySelectorAll('[data-selection]');

const sections = {
    menu: document.querySelector('[data-section="menu"]'),
    game: document.querySelector('[data-section="game"]'),
    rules: document.querySelector('[data-section="rules"]'),
    selection: document.querySelector('[data-section="selection"]'),
    decision: document.querySelector('[data-section="decision"]'),
  }

// EVENT LISTENERS
startButton.addEventListener('click', startGame);

rulesButton.addEventListener('click', () => sections.rules.classList.remove('hidden'));
closeButton.addEventListener('click', () => sections.rules.classList.add('hidden'));
sections.rules.addEventListener('click', e => {
  if(e.target.classList.contains('modal-overlay'))
    sections.rules.classList.add('hidden')
});

icons.forEach(icon => icon.addEventListener('click', () => {
  sections.selection.classList.add('hidden');
  sections.decision.classList.remove('hidden');
}))

// FUNCTIONS
function startGame(){
    sections.menu.classList.add('hidden');
    sections.game.classList.remove('hidden');
  }