'use strict';

// Selecting elements
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const scoreOne = document.querySelector('#score--0');
const scoreTwo = document.querySelector('#score--1');
const currentScoreOne = document.querySelector('#current--0');
const currentScoreTwo = document.querySelector('#current--1');
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

scoreOne.textContent = 0;
scoreTwo.textContent = 0;
diceImg.classList.add('hidden');


// Rolling dice
let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerOne.classList.toggle('player--active');
    playerTwo.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {

    if (playing) {
        //1. Generating a random dice roll
        let diceRoll = Math.trunc(Math.random() * 6) + 1;

        //2. Display dice
        diceImg.classList.remove('hidden');
        diceImg.src = `dice-${diceRoll}.png`;

        //3. Check for rolled dice "1", if true
        if (diceRoll !== 1) {
            // Add dice to current score
            currentScore += diceRoll;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //switch to next player

            switchPlayer();
        }


    }

});

btnHold.addEventListener('click', function () {

    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceImg.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function () {
    playing = true;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    currentScoreOne.textContent = 0;
    currentScoreTwo.textContent = 0;
    playerOne.classList.add('player--active');
    playerTwo.classList.remove('player--active');
    activePlayer = 0;
    scoreOne.textContent = 0;
    scoreTwo.textContent = 0;
    scores = [0, 0];

});

