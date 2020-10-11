"use strict";

import PopUp from "./popup.js";
import Game from "./game.js";

const gameFinishBanner = new PopUp();
const game = new Game(8, 5, 5, 3);
game.setGameStopListener((reason)=>{
  let message;
  switch(reason){
    case 'cansel':
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