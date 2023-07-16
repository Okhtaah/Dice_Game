"use strict";

const play = document.querySelectorAll(".player");
// player one
const secOne = document.querySelector(".player--0");
const playOne = document.querySelector("#name--0");
const scoOne = document.querySelector("#score--0");
const curOne = document.querySelector("#current--0");
// console.log(secOne);

// player two
const secTwo = document.querySelector(".player--1");
const playTwo = document.querySelector("#name--1");
const scoTwo = document.querySelector("#score--1");
const curTwo = document.querySelector("#current--1");
// btns
const dice = document.querySelector(".dice");
const newB = document.querySelector(".btn--new");
const rollB = document.querySelector(".btn--roll");
const holdB = document.querySelector(".btn--hold");

let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;
let isPlaying = true;

dice.classList.add("hidden");

// switchPlayer
const switchPlay = () => {
  console.log("switch player");
  currentScore = 0;
  document.querySelector(
    `#current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  secOne.classList.toggle("player--active");
  secTwo.classList.toggle("player--active");
};

const ranNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Roll Btn
rollB.addEventListener("click", () => {
  if (isPlaying) {
    dice.classList.remove("hidden");

    let randomNumber = ranNum(1, 6);
    dice.src = `images/dice-${randomNumber}.jpeg`;

    if (randomNumber !== 1) {
      currentScore += randomNumber;
      // curOne.textContent = currentScore;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlay();
    }
  }
});

// Hold Btn
holdB.addEventListener("click", () => {
  if (isPlaying) {
    console.log(currentScore);
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      isPlaying = false;
      dice.classList.add("hidden");
    } else {
      switchPlay();
    }
  }
});

// New Game Btn
newB.addEventListener("click", () => {
  console.log("new game");
  isPlaying = true;
  currentScore = 0;
  scores = [0, 0];
  scoOne.textContent = 0;
  scoTwo.textContent = 0;
  curOne.textContent = 0;
  curTwo.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  activePlayer = 0;
  let randomNumber = ranNum(1, 6);
  dice.src = `images/dice-${randomNumber}.jpeg`;
});
