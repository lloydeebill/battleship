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
      <div class="ship-options-container">
        <h1>Enemies Waters</h1>
        <div class="enemy-board"></div>
      </div>
     `;

  main.appendChild(div);
}

export { initializeGameFrame };
