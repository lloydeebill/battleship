import { setupBoardFrame } from "./setupBoardFrame";

function initializeGameFrame() {
  const main = document.querySelector("main");

  const div = document.createElement("div");

  div.classList.add("game-frame");

  div.innerHTML = `<div class="player-board-container">
        <div>
          <h1>Allied Waters</h1>
        </div>
        <div class="player-board"></div>
      </div>
      <div class="enemy-board-game-container">
        <h1>Enemies Waters</h1>
        <div class="enemy-board""></div>
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

export { initializeGameFrame };
