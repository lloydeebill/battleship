import rotateBtn from "../img/rotate.svg";

function setupBoardFrame() {
  const main = document.querySelector("main");

  main.innerHTML = "";

  const setupBoardFrame = document.createElement("div");
  setupBoardFrame.classList.add("setupboard-frame");
  setupBoardFrame.innerHTML = `<div class="player-board-container">
        <h1>Player Board</h1>
        <div class="notif-btn-container">
          <h3 class="notification-msg">Captain our ships are ready to be setup!</h3> 
          <img src="${rotateBtn}" alt="Rotate Button" class="rotate-btn">
        </div>
        <div class="player-board"></div>
        <div class="enemy-board"></div>
      </div>
      <div class="ship-options-container">
        <h1>Ship Options</h1>
        <div>
          <h3 class="ship-chosen-msg"></h3>
        </div>
        <div class="player-ship-options">
          <div
            class="carrier-preview"
            data-name="Carrier"
            data-size="5"
            data-orientation="horizontal"
          ></div>
          <div
            class="battleship-preview"
            data-name="Battleship"
            data-size="4"
            data-orientation="horizontal"
          ></div>
          <div
            class="destroyer-preview"
            data-name="Destroyer"
            data-size="3"
            data-orientation="horizontal"
          ></div>
          <div
            class="submarine-preview"
            data-name="Submarine"
            data-size="2"
            data-orientation="horizontal"
          ></div>
        </div>
      </div>
      `;

  const startGameModal = document.createElement("div");
  startGameModal.classList.add("start-game-modal");

  startGameModal.innerHTML = `<div class="start-game-modal-content">
      <h1 class="start-game-title">Awaiting Your Orders Captain</h1>
      <button class="start-game-button">Fire</button>
  </div>`;

  main.appendChild(setupBoardFrame);
  main.appendChild(startGameModal);
}

export { setupBoardFrame };
