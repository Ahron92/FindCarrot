"use strict";

export default class PopUp {
  constructor() {
    this.pop = document.querySelector(".pop");
    this.popIcon = document.querySelector(".pop__icon");
    this.popMessage = document.querySelector(".pop__message");
    this.popIcon.addEventListener("click", () => {
      this.onClick && this.onClick();
      hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showPopUp(text) {
    this.pop.classList.remove("pop--hide");
    this.popMessage.textContent = text;
  }

  hide() {
    pop.classList.add("pop--hide");
  }
}
