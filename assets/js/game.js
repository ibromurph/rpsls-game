// GLOBAL OBJECTS/CLASSES

const user = {
  selection: null, 
  resultScore: null,
  container: document.querySelector('[data-player="user"]'),
  selectionImage: document.querySelector('[data-player="user"] img'),
  update() {
    this.container.classList.add(getIconClass(this.selection));
    this.selectionImage.src = getIconSrc(this.selection);
  }
}

const computer = {
  selection: null, 
  resultScore: null,
  container: document.querySelector('[data-player="computer"]'),
  selectionImage: document.querySelector('[data-player="computer"] img'),
  update() {
    this.container.classList.add(getIconClass(this.selection));
    this.selectionImage.src = getIconSrc(this.selection);
  }
}

// Stores each possible outcome of the game | 1 = win, 0 = lose, 0.5 = draw
// ex. rock against scissors = 1 -> win for the rock
const RESULT_OPTIONS = {
  rock: {scissors: 1, lizard: 1, rock: 0.5, paper: 0, spock: 0},
  paper: {rock: 1, spock: 1, paper: 0.5, scissors: 0, lizard: 0},
  scissors: {paper: 1, lizard: 1, scissors: 0.5, rock: 0, spock: 0},
  lizard: {spock: 1, paper: 1, lizard: 0.5, rock: 0, scissors: 0},
  spock: {scissors: 1, rock: 1, spock: 0.5, paper: 0, lizard: 0}
};

const RESULT_TEXTS = {
  win: 'You win!',
  lose: 'You lose!',
  tie: 'Draw!'
};

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
playAgainButton.addEventListener('click', resetGame)

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

function resetGame(){
  sections.decision.classList.add('hidden');
  sections.selection.classList.remove('hidden');
}