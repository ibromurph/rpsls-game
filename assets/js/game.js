// GLOBAL CONSTANTS -------------------------------------------------------- //
const IMAGE_BASE_PATH = "assets/images/";
const ANIMATION_UPDATE_DELAY = 500; // Nice to have.
const DELAY_BETWEEN_ROUNDS = ANIMATION_UPDATE_DELAY + 2000;
const POINTS_TO_WIN = 5;

// Stores each possible outcome of the game | 1 = win, 0 = lose, 0.5 = tie
// ex. rock against scissors = 1 -> win for the rock
const RESULT_OPTIONS = {
  rock: {
    scissors: 1,
    lizard: 1,
    rock: 0.5,
    paper: 0,
    spock: 0
  },
  paper: {
    rock: 1,
    spock: 1,
    paper: 0.5,
    scissors: 0,
    lizard: 0
  },
  scissors: {
    paper: 1,
    lizard: 1,
    scissors: 0.5,
    rock: 0,
    spock: 0
  },
  lizard: {
    spock: 1,
    paper: 1,
    lizard: 0.5,
    rock: 0,
    scissors: 0
  },
  spock: {
    scissors: 1,
    rock: 1,
    spock: 0.5,
    paper: 0,
    lizard: 0
  }
};

const RESULT_TEXTS = {
  win: 'You win!',
  lose: 'You lose!',
  tie: 'Tie!'
};

class Player {
  constructor(identifier) {
    this.winner = false;
    this.selection = null;
    this.resultScore = null;
    this.container = document.querySelector(`[data-player="${identifier}"]`);
    this.selectionImage = this.container.querySelector('img');
    this.score = 0;
    this.scoreSpan = document.querySelector(`[data-score="${identifier}"]`);
  }

  // makes the player select an icon
  select(icon) {
    this.selection = icon.dataset.selection;
  }

  // updates the UI based on the player's selection with the image and image classes
  update() {
    this.container.classList.add(`icon--${this.selection}`);
    this.selectionImage.src = `${IMAGE_BASE_PATH}/icon-${this.selection}.svg`;

    // after the result animation is done the players's score is updated
    this.animationTimeout = setTimeout(() => {
      this.scoreSpan.innerText = this.score;

      // if this player is the winner, the winner class is added to the container
      if (this.winner)
        this.container.classList.add('icon--winner');
    }, ANIMATION_UPDATE_DELAY);
  }

  // resets every logic element to it's initial state and removes the UI classnames
  reset() {
    this.container.classList.remove(`icon--${this.selection}`);
    this.selection = null;
    this.winner = false;
    this.resultScore = null;
    this.selectionImage.src = '';
    this.container.classList.remove('icon--winner');
    clearTimeout(this.animationTimeout);
  }
  // resets the score to 0 and updates the UI accordingly
  resetScore() {
    this.score = 0;
    this.scoreSpan.innerText = this.score;
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

// selects the result text from the result page 
const resultText = document.querySelector('[data-text="result"]');
const gameOverText = document.querySelector('[data-text="game-over"]');

// Object with all page sections selected from the HTML
const sections = {
  menu: document.querySelector('[data-section="menu"]'),
  game: document.querySelector('[data-section="game"]'),
  rules: document.querySelector('[data-section="rules"]'),
  selection: document.querySelector('[data-section="selection"]'),
  decision: document.querySelector('[data-section="decision"]'),
};
// selects are the 5 icons that can be selected by the player
const icons = document.querySelectorAll('[data-selection]');

// EVENT LISTENERS
// executes the startGame/resetGame function when the button is clicked 
startButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', resetGame);

// if the rules button is clicked, the rules section is shown (hidden class removed)
rulesButton.addEventListener('click', () => sections.rules.classList.remove('hidden'));

// if the user clicks on the rules close button or outside of the modal on the overlay 
// the rules section gets hidden (hidden class added)
closeButton.addEventListener('click', () => sections.rules.classList.add('hidden'));
sections.rules.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay'))
    sections.rules.classList.add('hidden');
});

// when an icon is clicked a new game round starts
icons.forEach(icon => icon.addEventListener('click', () => gameRound(icon)));

// FUNCTIONS
function startGame() {
  sections.menu.classList.add('hidden');
  sections.game.classList.remove('hidden');
  playAgainButton.classList.add('hidden');
}

// function to control a single game round
function gameRound(icon) {
  // at the start of a round the selection section gets hidden and the decision section gets shown
  sections.selection.classList.add('hidden');
  sections.decision.classList.remove('hidden');

  // the user selection is stored in the user object and the computer's selection is made randomly
  user.select(icon);
  computer.select(makeComputerSelection());

  // winner is determined and the result is shown in the result section
  decideWinner();

  // if a player reaches the game ends and the ending screen updates as necessary
  // otherwise a new round starts after a bit of delay
  if (user.score == POINTS_TO_WIN || computer.score == POINTS_TO_WIN) {
    playAgainButton.classList.remove('hidden');
    gameOverText.classList.remove('hidden');
    resultText.innerText = user.score == POINTS_TO_WIN ? RESULT_TEXTS.win : RESULT_TEXTS.lose;
  } else
    setTimeout(resetRound, DELAY_BETWEEN_ROUNDS);
}

// a random icon is selected from the icons array and stored in the computer object
function makeComputerSelection() {
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
}

// the winner is determined based on the user and computer selections using 
// the result options object, and the computer and the player objects are updated accordingly
function decideWinner() {
  user.resultScore = RESULT_OPTIONS[user.selection][computer.selection];

  if (user.resultScore == 1) {
    user.score++;
    user.winner = true;
    resultText.innerText = RESULT_TEXTS.win;
  } else if (user.resultScore == 0) {
    computer.score++;
    computer.winner = true;
    resultText.innerText = RESULT_TEXTS.lose;
  } else {
    resultText.innerText = RESULT_TEXTS.tie;
  }
  user.update();
  computer.update();
}

// resets the game to it's initial state where a new round can start
function resetRound() {
  sections.decision.classList.add('hidden');
  sections.selection.classList.remove('hidden');
  user.reset();
  computer.reset();
}

// resets everything to the initial state for a new game
function resetGame() {
  resetRound();
  user.resetScore();
  computer.resetScore();
  playAgainButton.classList.add('hidden');
  gameOverText.classList.add('hidden');
}