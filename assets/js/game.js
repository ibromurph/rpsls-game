// GLOBAL CONSTANTS -------------------------------------------------------- //
const IMAGE_BASE_PATH = "assets/images/";
const ANIMATION_UPDATE_DELAY = 4000; // 4seconds due to the result animations

// Stores each possible outcome of the game | 1 = win, 0 = lose, 0.5 = tie
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
  tie: 'Tie!'
};

// GLOBAL OBJECTS/CLASSES
const scoreObj = {
  score: 0, 
  span: document.querySelector('[data-text="score"]'),
  // function which updates the score based on the passed difference
  update(scoreDifference) {
    this.score += scoreDifference;
        // after the result animation is done, update the score in the page UI
    setTimeout(() => {
      this.span.innerText = this.score;
    }, ANIMATION_UPDATE_DELAY);
  }
};

class Player { 
  constructor(identifier){
    this.selection = null;
    this.resultScore = null;
    this.container = document.querySelector(`[data-player="${identifier}"]`);
    this.selectionImage = this.container.querySelector('img');
  }

    // makes the player select an icon
  select(icon){
    this.selection = icon.dataset.selection;
  }
  
  // updates the UI based on the player's selection with the image and image classes
  update(){
    this.container.classList.add(`icon--${this.selection}`);
    this.selectionImage.src = `${IMAGE_BASE_PATH}/icon-${this.selection}.svg`;
  }
   // resets every logic element to it's initial state and removes the UI classnames
   reset(){
    this.container.classList.remove(`icon--${this.selection}`);
    this.selection = null;
    this.winner = false;
    this.resultScore = null;
    this.selectionImage.src = '';
    this.container.classList.remove('icon--winner');
    clearTimeout(this.animationTimeout);
  }
}

// Creates a player instance for the user and computer
const user = new Player('user');
const computer = new Player('computer');

// HTML SELECTORS
// Select the buttons from the page
const startButton = document.querySelector('[data-button="start"]');
const rulesButton = document.querySelector('[data-button="rules"]');
const closeButton = document.querySelector('[data-button="close"]');
const playAgainButton = document.querySelector('[data-button="play-again"]');

const resultText = document.querySelector('[data-text="result"]'); 

// Object with all page sections selected from the HTML
const sections = {
  menu: document.querySelector('[data-section="menu"]'),
  game: document.querySelector('[data-section="game"]'),
  rules: document.querySelector('[data-section="rules"]'),
  selection: document.querySelector('[data-section="selection"]'),
  decision: document.querySelector('[data-section="decision"]'),
}

const icons = document.querySelectorAll('[data-selection]');

// EVENT LISTENERS
startButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', resetGame);

rulesButton.addEventListener('click', () => sections.rules.classList.remove('hidden'));
closeButton.addEventListener('click', () => sections.rules.classList.add('hidden'));
sections.rules.addEventListener('click', e => {
  if(e.target.classList.contains('modal-overlay'))
    sections.rules.classList.add('hidden')
  });

icons.forEach(icon => icon.addEventListener('click', () => {
  sections.selection.classList.add('hidden');
  sections.decision.classList.remove('hidden');
  user.select(icon);
  makeComputerSelection();
  decideWinner();
}))

// FUNCTIONS
function startGame(){
    sections.menu.classList.add('hidden');
    sections.game.classList.remove('hidden');
  }

// a random icon is selected from the icons array and stored in the computer object
function makeComputerSelection(){
  const randomIndex = Math.floor(Math.random() * icons.length);
  const randomSelection = icons[randomIndex];
  computer.select(randomSelection);
}

function decideWinner(){
  user.resultScore = RESULT_OPTIONS[user.selection][computer.selection];

  if(user.resultScore == 1){
    scoreObj.update(1);
    user.winner = true;
    resultText.innerText = RESULT_TEXTS.win;
  } 
  else if(user.resultScore == 0){
    scoreObj.update(-1);
    computer.winner = true;
    resultText.innerText = RESULT_TEXTS.lose;
  }
  else {
    resultText.innerText = RESULT_TEXTS.tie;
  }
  user.update();
  computer.update();
}

// resets the game to it's initial state where the player can pick a new icon
function resetGame(){
  sections.decision.classList.add('hidden');
  sections.selection.classList.remove('hidden');
  user.reset();
  computer.reset();
}