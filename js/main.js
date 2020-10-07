"use strict";

const playBtn = document.querySelector(".play__btn");
const playTime = document.querySelector(".play__out");
const playCount = document.querySelector(".play__count");
const itemArea = document.querySelector(".item-area");
const itemBoundary = itemArea.getBoundingClientRect();

const pop = document.querySelector(".pop");
const popIcon = document.querySelector(".pop__icon");
const popMessage = document.querySelector(".pop__message");

const CARROT_NUMBER = 8;
const BUG_NUMBER = 7;
const CRAZYBUG_NUMBER = 2;
const CARROT_SIZE = 80;
const GAME_DURATION = 9;
let started = false;
let countDown = undefined;

playBtn.addEventListener("click", () => {
  gameStart();
});

function gameStart() {
  if (started) {
    hideBtn();
    stopCountDown();
    showPopUp("REPLAY? ⛏");
  } else {
    initGame();
    showTimeAndCount();
    startCountDown();
    stopBtn();
  }
  started = !started;
}

function stopBtn() {
  playBtn.innerHTML = `<i class="fas fa-stop">`;
}
function hideBtn() {
  playBtn.style.visibility = "hidden";
}

function showPopUp(text) {
  pop.style.display = "flex";
  popMessage.textContent = text;
}

function stopCountDown() {
  clearInterval(countDown);
}

function startCountDown() {
  let countNumber = GAME_DURATION;
  playCount.textContent = countNumber;
  countDown = setInterval(() => {
    if (countNumber <= 0) {
      clearInterval(countDown);
      return;
    }
    --countNumber;
    playCount.textContent = countNumber;
  }, 1000);
}

function showTimeAndCount() {
  playTime.style.visibility = "visible";
  playCount.style.visibility = "visible";
}

function initGame() {
  itemArea.innerHTML = "";
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
