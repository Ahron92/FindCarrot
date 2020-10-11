"use strict";

import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from './sound.js';

const playBtn = document.querySelector(".play__btn");
const playTime = document.querySelector(".play__out");
const playCount = document.querySelector(".play__count");

const CARROT_NUMBER = 12;
const BUG_NUMBER = 10;
const CRAZYBUG_NUMBER = 3;

const GAME_DURATION = 9;
let started = false;
let score = 0;
let countDown = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const gameField = new Field(CARROT_NUMBER, BUG_NUMBER, CRAZYBUG_NUMBER);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (item === "carrot") {
    score++;
    scoreCountDown();
    if (CARROT_NUMBER === score) {
      finishGame(true);
      stopCountDown();
    }
  } else if (item === "bug") {
    finishGame(false);
    stopCountDown();
  }
}

function scoreCountDown() {
  playCount.textContent = CARROT_NUMBER - score;
}

playBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});


function startGame() {
  started = true;
  initGame();
  showTimeAndCount();
  startCountDown();
  showStopBtn();
  sound.playBg();
}

function stopGame() {
  started = false;
  hideBtn();
  stopCountDown();
  gameFinishBanner.showPopUp("REPLAY? ⛏");
  sound.stopBg();
  sound.playAlert(
  );
}

function finishGame(winOrLose) {
  started = false;
  hideBtn();
  if (winOrLose) {
    sound.playWin();
  } else {
    sound.playBug();
  }
  gameFinishBanner.showPopUp(winOrLose ? "You Won🎈" : "You Lose😑");
  sound.stopBg();
}

function showStopBtn() {
  playBtn.innerHTML = `<i class="fas fa-stop">`;
  playBtn.style.visibility = "visible";
}
function hideBtn() {
  playBtn.style.visibility = "hidden";
}

function startCountDown() {
  let countNumber = GAME_DURATION;
  playTime.textContent = countNumber;
  countDown = setInterval(() => {
    if (countNumber <= 0) {
      clearInterval(countDown);
      finishGame(CARROT_NUMBER === score);
      return;
    }
    --countNumber;
    playTime.textContent = countNumber;
  }, 1000);
}

function stopCountDown() {
  clearInterval(countDown);
}

function showTimeAndCount() {
  playTime.style.visibility = "visible";
  playCount.style.visibility = "visible";
}


function initGame() {
  score = 0;
  playCount.innerText = CARROT_NUMBER;
  gameField.init();
}
