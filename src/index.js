import "./style.css";

import { landingFrame } from "./appFrames/landingFrame";
import { setupBoardFrame } from "./appFrames/setupBoardFrame";
import { Gameboard } from "./battleship/gameboard";
import { shipOptions } from "./battleship/shipOptions";

function initializeApp() {
  landingFrame();

  const startButton = document.querySelector(".start-game");
  startButton.addEventListener("click", () => {
    const main = document.querySelector("main");
    main.innerHTML = ``;

    setupBoardFrame();
    const player = new Gameboard("player");
    shipOptions();
  });
}

initializeApp();
