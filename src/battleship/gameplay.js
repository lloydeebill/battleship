class Gameplay {
  constructor(playerBoardState, enemyBoardState) {
    this.playerBoardState = playerBoardState;
    this.enemyBoardState = enemyBoardState;
    this.initializeGamePlay();
  }

  initializeGamePlay() {
    this.populateBoards();
  }

  populateBoards() {
    const playerBoard = document.querySelector(".player-board");
    const enemyBoard = document.querySelector(".enemy-board");

    this.playerBoardState.forEach((cell) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("player-cell");

      if (cell === null) {
        cellElement.classList.add("empty-cell");
      } else {
        cellElement.classList.add(cell);
      }

      playerBoard.appendChild(cellElement);
    });

    this.enemyBoardState.forEach((cell) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("enemy-cell");

      if (cell === null) {
        cellElement.classList.add("empty-cell");
      } else {
        cellElement.classList.add(cell);
      }
      enemyBoard.appendChild(cellElement);
    });
  }
}

export { Gameplay };
