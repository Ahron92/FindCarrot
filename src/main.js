"use strict";

import PopUp from "./popup.js";
import GameBuilder from "./game.js";

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
    case 'cancel':
      message = 'Replay❓'
    break;
    case 'win':
      message = 'You Won😉'
    break;
    case 'lose':
      message = 'You Lose😥'
      break;
      default:
        throw new Error('not valid reason');
  }
  gameFinishBanner.showPopUp(message);
})

gameFinishBanner.setClickListener(() => {
  game.start();
});