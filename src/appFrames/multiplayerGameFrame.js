import { setupBoardFrame } from "./setupBoardFrame";

function initializeMultiplayerGameFrame() {
  const main = document.querySelector("main");

  const div = document.createElement("div");

  div.classList.add("game-frame");

  div.innerHTML = `
      <div class="player1-view">
        <div class="player-board-container">
          <div>
            <h1>Allied Waters</h1>
          </div>
          <div class="player1-board"></div>
        </div>
        <div class="enemy-board-game-container">
          <h1>Enemies Waters</h1>
          <div class="player2-board-attack"></div>
        </div>
      </div>

      <div class="player2-view">
        <div class="player2-board-container">
          <div>
            <h1>Allied Waters</h1>
          </div>
          <div class="player2-board"></div>
        </div>
        <div class="enemy-board-game-container">
          <h1>Enemies Waters</h1>
          <div class="player1-board-attack"></div>
        </div>
      </div>

      
     `;

  main.appendChild(div);

  const gameOverModal = document.createElement("div");
  gameOverModal.classList.add("game-over-modal");

  gameOverModal.innerHTML = `<div class="game-over-modal-content">
      <h1 class="game-over-title"></h1>
      <button class="play-again-btn">Play Again</button>
  </div>`;

  main.appendChild(gameOverModal);
}

export { initializeMultiplayerGameFrame };
