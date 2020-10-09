"use strict";

import PopUp from "./popup.js";

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  gameStart();
});

const playBtn = document.querySelector(".play__btn");
const playTime = document.querySelector(".play__out");
const playCount = document.querySelector(".play__count");
const itemArea = document.querySelector(".item-area");
const itemBoundary = itemArea.getBoundingClientRect();

const CARROT_NUMBER = 12;
const BUG_NUMBER = 10;
const CRAZYBUG_NUMBER = 3;
const CARROT_SIZE = 80;
const GAME_DURATION = 9;
let started = false;
let score = 0;
let countDown = undefined;

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

playBtn.addEventListener("click", () => {
  startGame();
});

function startGame() {
  if (started) {
    hideBtn();
    stopCountDown();
    gameFinishBanner.showPopUp("REPLAY? ⛏");
    stopSound(bgSound);
    playSound(alertSound);
  } else {
    initGame();
    showTimeAndCount();
    startCountDown();
    showStopBtn();
    playSound(bgSound);
  }
  started = !started;
}

function finishGame(winOrLose) {
  started = false;
  hideBtn();
  if (winOrLose) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  gameFinishBanner.showPopUp(winOrLose ? "You Won🎈" : "You Lose😑");
  stopSound(bgSound);
}

itemArea.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    scoreCountDown();
    playSound(carrotSound);
  }
  if (CARROT_NUMBER === score) {
    finishGame(true);
    stopCountDown();
  } else if (target.matches(".bug") || target.matches(".bug--crazy")) {
    finishGame(false);
    stopCountDown();
  }
});

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}

function scoreCountDown() {
  playCount.textContent = CARROT_NUMBER - score;
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
  itemArea.innerHTML = "";
  playCount.innerText = CARROT_NUMBER;
  deployment("carrot", CARROT_NUMBER, "./img/carrot.png");
  deployment("bug", BUG_NUMBER, "./img/bug.png");
  deployment("bug--crazy", CRAZYBUG_NUMBER, "./img/crazybug.png");
}

function deployment(className, number, imgPath) {
  const x = 0;
  const y = 0;
  const widthX = itemBoundary.width - CARROT_SIZE;
  const heightY = itemBoundary.height - CARROT_SIZE;

  for (let i = 0; i < number; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const ranX = randomNumber(x, widthX);
    const ranY = randomNumber(y, heightY);
    item.style.left = `${ranX}px`;
    item.style.top = `${ranY}px`;
    itemArea.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
