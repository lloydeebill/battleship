import { Gameboard } from "../battleship/gameboard";

function startFrame() {
  const main = document.querySelector("main");
  main.innerHTML = `
    <div>
      <h1 class="game-title">BATTLESHIP</h1>
      <button class="start-button">Start Game </button>
    </div>
  
  `;
}

function shipPlacementFrame() {
  const main = document.querySelector("main");
  main.innerHTML = `
  `;
  main.innerHTML = `
    <div>
      <h1 class="game-title">Ship Placement</h1>
      <div class="ship-placement">
        <div id="player-board" class="player-board"></div>
        <div class="show-ships-position">
          <h2>Ship Position</h3>
        </div>
      </div>
    </div>
  
  `;

  const gameBoard = new Gameboard("player-board");
  gameBoard.renderGrid();
}

export { startFrame, shipPlacementFrame };
