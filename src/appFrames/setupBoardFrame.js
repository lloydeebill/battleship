import rotateBtn from "../img/rotate.svg";

function setupBoardFrame() {
  const main = document.querySelector("main");

  const div = document.createElement("div");

  div.classList.add("setupboard-frame");

  div.innerHTML = `<div class="player-board-container">
        <h1>Player Board</h1>
        <div class="notif-btn-container">
          <h3 class="notification-msg">Place your ships Admiral!</h3> 
          <img src="${rotateBtn}" alt="Rotate Button" class="rotate-btn">
        </div>
        <div class="player-board"></div>
      </div>
      <div class="ship-options-container">
        <h1>Ship Options</h1>
        <div class="ship-options">
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

  main.appendChild(div);
}

export { setupBoardFrame };
