// GLOBAL CONSTANTS

// GLOBAL VARIABLES
let score = 0

// HTML SELECTORS
const startButton = document.querySelector('[data-button="start"]');
const rulesButton = document.querySelector('[data-button="rules"]');
const closeButton = document.querySelector('[data-button="close"]');
const playAgainButton = document.querySelector('[data-button="play-again"]');

const resultText = document.querySelector('[data-text="result"]'); 

const sections = {
    menu: document.querySelector('[data-section="menu"]'),
    game: document.querySelector('[data-section="game"]'),
    rules: document.querySelector('[data-section="rules"]'),
    selection: document.querySelector('[data-section="selection"]'),
    decision: document.querySelector('[data-section="decision"]'),
  }

// EVENT LISTENERS
startButton.addEventListener('click', startGame);

// FUNCTIONS
function startGame(){
    sections.menu.classList.add('hidden');
    sections.game.classList.remove('hidden');
  }