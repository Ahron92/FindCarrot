// "use strict";

import * as sound from './sound.js';

const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount, crazyBug) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.crazyBug = crazyBug;
    this.itemArea = document.querySelector(".item-area");
    this.itemBoundary = this.itemArea.getBoundingClientRect();
    // this.onClick = this.onClick.bind(this);
    // this.itemArea.addEventListener("click", (event) => this.onClick(event));
    this.itemArea.addEventListener("click", this.onClick);
  }

  init() {
    this.itemArea.innerHTML = "";
    this._deployment("carrot", this.carrotCount, "./img/carrot.png");
    this._deployment("bug", this.bugCount, "./img/bug.png");
    this._deployment("bug--crazy", this.crazyBug, "./img/crazybug.png");
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }



  _deployment(className, number, imgPath) {
    //private 한 함수를 만들기위해 _ 를 추가 외부에서 부르지 말것!
    const x = 0;
    const y = 0;
    const widthX = this.itemBoundary.width - CARROT_SIZE;
    const heightY = this.itemBoundary.height - CARROT_SIZE;
    for (let i = 0; i < number; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const ranX = randomNumber(x, widthX);
      const ranY = randomNumber(y, heightY);
      item.style.left = `${ranX}px`;
      item.style.top = `${ranY}px`;
      this.itemArea.appendChild(item);
    }
  }


  onClick = (event) =>{
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug") || target.matches(".bug--crazy")) {
      this.onItemClick && this.onItemClick("bug");
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
