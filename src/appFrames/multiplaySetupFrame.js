import rotateBtn from "../img/rotate.svg";

function multiplaySetupFrame() {
  const main = document.querySelector("main");

  main.innerHTML = "";

  const setupBoardFrame = document.createElement("div");
  setupBoardFrame.classList.add("setupboard-frame");
  setupBoardFrame.innerHTML = `<div class="player1-board-container">
      <div>
        <h1>Player 1 Board</h1>
        <div class="notif-btn-container">
          <h3 class="player1-notification-msg">Captain our ships are ready to be setup!</h3> 
          <img src="${rotateBtn}" alt="Rotate Button" class="player1-rotate-btn">
        </div>
        <div class="player1-board"></div>
      </div>
      <div class="ship-options-container">
        <h1>Ship Options</h1>
        <div>
          <h3 class="player1-ship-chosen-msg"></h3>
        </div>
        <div class="player1-ship-options">
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
        <button class="player1-ready-button">Ready</button>
      </div>
    </div>
    <div class="player2-board-container">
      <div>
        <h1>Player 2 Board</h1>
        <div class="notif-btn-container">
          <h3 class="player2-notification-msg">Captain our ships are ready to be setup!</h3> 
          <img src="${rotateBtn}" alt="Rotate Button" class="player2-rotate-btn">
        </div>
        <div class="player2-board"></div>
      </div>
      <div class="ship-options-container">
        <h1>Ship Options</h1>
        <div>
          <h3 class="player2-ship-chosen-msg"></h3>
        </div>
        <div class="player2-ship-options">
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
        <button class="player2-ready-button">Ready</button>
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

export { multiplaySetupFrame };
