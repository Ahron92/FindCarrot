'use strict'

import * as sound from './sound.js';
import Field from "./field.js";

export default class Game{
  constructor(gameDuration, carrotCount, bugCount, bigBugCount){
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.bigBugCount = bigBugCount;

    this.playTime = document.querySelector(".play__out");
    this.playCount = document.querySelector(".play__count");
    this.playBtn = document.querySelector(".play__btn");
    this.playBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });
    this.gameField = new Field(carrotCount, bugCount, bigBugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.countDown = undefined;
  }
  setGameStopListener(onGameStop){
    this.onGameStop = onGameStop;
  }
  onItemClick = (item) =>{
    if (item === "carrot") {
      this.score++;
      this.scoreCountDown();
      if (this.carrotCount === this.score) {
        this.finish(true);
        this.stopCountDown();
      }
    } else if (item === "bug") {
      this.finish(false);
      this.stopCountDown();
    }
  }
  start() {
    this.started = true;
    this.initGame();
    this.showTimeAndCount();
    this.startCountDown();
    this.showStopBtn();
    sound.playBg();
  }
  
  stop() {
    this.started = false;
    this.hideBtn();
    this.stopCountDown();
    sound.stopBg();
    sound.playAlert();
    this.onGameStop && this.onGameStop('cansel');
  }  

  finish(winOrLose) {
    this.started = false;
    this.hideBtn();
    if (winOrLose) {
      sound.playWin();
    } else {
      sound.playBug();
    }
    this.onGameStop && this.onGameStop(winOrLose ? 'win' : 'lose');
    sound.stopBg();
  }

  
  scoreCountDown() {
    this.playCount.textContent = this.carrotCount - this.score;
  }

  showStopBtn() {
    this.playBtn.innerHTML = `<i class="fas fa-stop">`;
    this.playBtn.style.visibility = "visible";
  }
  hideBtn() {
    this.playBtn.style.visibility = "hidden";
  }

  startCountDown() {
    let countNumber = this.gameDuration;
    this.playTime.textContent = countNumber;
    this.countDown = setInterval(() => {
      if (countNumber <= 0) {
        clearInterval(this.countDown);
        this.finish(this.carrotCount === this.score);
        return;
    }
      --countNumber;
      this.playTime.textContent = countNumber;
    }, 1000);
  }

  stopCountDown() {
    clearInterval(this.countDown);
  }

  showTimeAndCount() {
    this.playTime.style.visibility = "visible";
    this.playCount.style.visibility = "visible";
  }


  initGame() {
    this.score = 0;
    this.playCount.innerText = this.carrotCount;
    this.gameField.init();
  }
}
