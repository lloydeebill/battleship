function gameFrame() {
  const main = document.querySelector("main");

  const div = document.createElement("div");

  div.classList.add("game-frame");

  div.innerHTML = `<div class="player-board-container">
        <div>
          <h1>Player Board</h1>
          <button class="change-orientation-btn">Change Orientation</button>
        </div>
        <div class="player-board"></div>
      </div>
      <div class="ship-options-container">
        <h1>Ship Options</h1>
        <div class="ship-options">
          <div
            class="carrier-preview"
            data-name="carrier"
            data-size="5"
            data-orientation="horizontal"
          ></div>
          <div
            class="battleship-preview"
            data-name="battleship"
            data-size="4"
            data-orientation="horizontal"
          ></div>
          <div
            class="destroyer-preview"
            data-name="destroyer"
            data-size="3"
            data-orientation="horizontal"
          ></div>
          <div
            class="submarine-preview"
            data-name="submarine"
            data-size="2"
            data-orientation="horizontal"
          ></div>
        </div>
      </div>
      <div class="enemy-board-container">
        <h1>Enemy Board</h1>
        <div class="enemy-board"></div>
      </div>`;

  main.appendChild(div);
}

export { gameFrame };
