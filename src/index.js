import "./style.css";

import { initializeLandingFrame } from "./appFrames/landingFrame";
import { setupBoardFrame } from "./appFrames/setupBoardFrame";
import { Gameboard } from "./battleship/gameboard";
import { initializeGameFrame } from "./appFrames/gameFrame";
import { Gameplay } from "./battleship/gameplay";

function initializeApp() {
  // Initialize the landing frame
  initializeLandingFrame();

  // Reference to the main container
  const main = document.querySelector("main");

  // Handle play button click to transition to setup board frame
  const playButton = document.querySelector(".play-button");
  playButton.addEventListener("click", () => {
    main.innerHTML = ""; // Clear the current view

    // Set up the board frame
    setupBoardFrame();

    // Initialize player gameboard
    const player = new Gameboard("player");
    const enemy = new Gameboard("enemy");

    // Set up ship options

    // Handle start game button click to transition to game frame
    const startGameButton = document.querySelector(".start-game-button");
    startGameButton.addEventListener("click", () => {
      main.innerHTML = ""; // Clear the current view

      // Initialize the game frame
      initializeGameFrame();

      const gamePlay = new Gameplay(player.loadBoardState);

      console.log(gamePlay);
    });
  });
}

// Start the application
initializeApp();
