import "./style.css";

import { initializeLandingFrame } from "./appFrames/landingFrame";
import { setupBoardFrame } from "./appFrames/setupBoardFrame";
import { Gameboard } from "./battleship/gameboard";
import { initializeGameFrame } from "./appFrames/gameFrame";
import { Gameplay } from "./battleship/gameplay";
import { multiplaySetupFrame } from "./appFrames/multiplaySetupFrame";

function initializeApp() {
  const main = document.querySelector("main");
  resetGameState();

  initializeLandingFrame();

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
        player.loadShipsList(),
        enemy.loadBoardState(),
        enemy.loadShipsList(),
      );

      const playAgainBtn = document.querySelector(".play-again-btn");

      playAgainBtn.addEventListener("click", () => {
        clearBoardState();
        resetGameState();
        initializeApp();
      });
    });
  });

  const multiplayButton = document.querySelector(".multiplay-button");
  multiplayButton.addEventListener("click", () => {
    main.innerHTML = ""; // Clear the current view

    multiplaySetupFrame();

    // Initialize player gameboard
    const player1 = new Gameboard("player1");
    const player2 = new Gameboard("player2");

    const player1Container = document.querySelector(".player1-board-container");
    const player2Container = document.querySelector(".player2-board-container");

    let player1Ready = false;
    let player2Ready = false;

    player2Container.style.display = "none";

    const player1ReadyBtn = document.querySelector(".player1-ready-button");
    player1ReadyBtn.addEventListener("click", () => {
      player1Ready = true;
      player1Container.style.display = "none";
      player2Container.style.display = "flex";
      player1.saveBoardState();
    });

    const player2ReadyBtn = document.querySelector(".player2-ready-button");
    player2ReadyBtn.addEventListener("click", () => {
      player2Ready = true;

      if (player1Ready) {
        const startGameModal = document.querySelector(".start-game-modal");
        startGameModal.style.display = "block";
      }
    });

    const startGameButton = document.querySelector(".start-game-button");
    startGameButton.addEventListener("click", () => {
      main.innerHTML = "";

      initializeGameFrame();

      const gamePlay = new Gameplay(
        player1.loadBoardState(),
        player1.loadShipsList(),
        player2.loadBoardState(),
        player2.loadShipsList(),
      );

      const playAgainBtn = document.querySelector(".play-again-btn");

      playAgainBtn.addEventListener("click", () => {
        resetGameState(player1, player2);
        initializeApp();
      });
    });
  });
}

function clearBoardState(player1, player2) {
  if (player1 && player2) {
    localStorage.removeItem(`${player1}-boardState`);
    localStorage.removeItem(`${player1}-shipsList`);
    localStorage.removeItem(`${player2}-boardState`);
    localStorage.removeItem(`${player2}-shipsList`);
  } else {
    localStorage.removeItem("player-boardState");
    localStorage.removeItem("player-shipsaList");
    localStorage.removeItem("enemy-boardState");
    localStorage.removeItem("enemy-shipsList");
  }
}

function resetGameState(player1, player2) {
  clearBoardState(player1, player2);
}

// Start the application
initializeApp();
