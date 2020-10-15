"use strict";

import PopUp from "./popup.js";
import * as sound from './sound.js';
import {GameBuilder, Reason}  from "./game.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
.gameDuration(8)
.carrotCount(10)
.bugCount(12)
.bigBugCount(2)
.build();

game.setGameStopListener((reason)=>{
  let message;
  switch(reason){
    case Reason.cancel:
      message = 'Replay❓'
      sound.playAlert();
    break;
    case Reason.win:
      message = 'You Won😉'
      sound.playWin();
    break;
    case Reason.lose:
      message = 'You Lose😥'
      sound.playBug();
      break;
      default:
        throw new Error('not valid reason');
  }
  gameFinishBanner.showPopUp(message);
})

gameFinishBanner.setClickListener(() => {
  game.start();
});