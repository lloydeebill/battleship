import "./style.css";

import { initializeLandingFrame } from "./appFrames/landingFrame";
import { setupBoardFrame } from "./appFrames/setupBoardFrame";
import { Gameboard } from "./battleship/gameboard";
import { initializeGameFrame } from "./appFrames/gameFrame";
import { Gameplay } from "./battleship/gameplay";

function initializeApp() {
  initializeLandingFrame();

  const main = document.querySelector("main");

  // Handle play button click to transition to setup board frame
  const playButton = document.querySelector(".play-button");
  playButton.addEventListener("click", () => {
    main.innerHTML = ""; // Clear the current view

    setupBoardFrame();

    // Initialize player gameboard
    const player = new Gameboard("player");
    const enemy = new Gameboard("enemy");

    // Handle start game button click to transition to game frame
    const startGameButton = document.querySelector(".start-game-button");
    startGameButton.addEventListener("click", () => {
      main.innerHTML = "";

      initializeGameFrame();

      const gamePlay = new Gameplay(
        player.loadBoardState(),
        enemy.loadBoardState(),
      );
    });
  });
}

// Start the application
initializeApp();
