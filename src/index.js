import "./style.css";

import { initializeLandingFrame } from "./appFrames/landingFrame";
import { setupBoardFrame } from "./appFrames/setupBoardFrame";
import { Gameboard } from "./battleship/gameboard";
import { shipOptions } from "./battleship/shipOptions";
import { initializeGameFrame } from "./appFrames/gameFrame";

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

    // Set up ship options
    shipOptions();

    // Handle start game button click to transition to game frame
    const startGameButton = document.querySelector(".start-game-button");
    startGameButton.addEventListener("click", () => {
      main.innerHTML = ""; // Clear the current view

      // Initialize the game frame
      initializeGameFrame();
    });
  });
}

// Start the application
initializeApp();
