'use strict'

import {Field, itemType} from "./field.js";
import * as sound from './sound.js';

export let started = false;
export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel : 'cancel'
})

//build pattern
export class GameBuilder{
  gameDuration(duration){
    this.gameDuration = duration;
    return this;
  }
  carrotCount(num){
    this.carrotCount = num;
    return this;
  }
  bugCount(num){
    this.bugCount = num;
    return this;
  }
  bigBugCount(num){
    this.bigBugCount = num;
    return this;
  }
  build(){
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount,
      this.bigBugCount
    )
  }
}

class Game{
  constructor(gameDuration, carrotCount, bugCount, bigBugCount){
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.bigBugCount = bigBugCount;

    this.playTime = document.querySelector(".play__out");
    this.playCount = document.querySelector(".play__count");
    this.playBtn = document.querySelector(".play__btn");
    this.playBtn.addEventListener("click", () => {
      if (started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });
    this.gameField = new Field(carrotCount, bugCount, bigBugCount);
    this.gameField.setClickListener(this.onItemClick);
    this.score = 0;
    this.countDown = undefined;
  }
  setGameStopListener(onGameStop){
    this.onGameStop = onGameStop;
  }
  onItemClick = (item) =>{
    if (item === itemType.carrot) {
      this.score++;
      this.scoreCountDown();
      if (this.carrotCount === this.score) {
        this.stop(Reason.win);
        this.stopCountDown();
      }
    } else if (item === itemType.bug) {
      this.stop(Reason.lose);
      this.stopCountDown();
    }
  }
  start() {
    started = true;
    this.initGame();
    this.showTimeAndCount();
    this.startCountDown();
    this.showStopBtn();
    sound.playBg();
  }
  
  stop(reason) {
    started = false;
    this.hideBtn();
    this.stopCountDown();
    sound.stopBg()
    this.onGameStop && this.onGameStop(reason);
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
