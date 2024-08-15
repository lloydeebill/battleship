class Gameplay {
  constructor(playerBoardState, enemyBoardState) {
    this.playerBoardState = playerBoardState;
    this.enemyBoardState = enemyBoardState;
    this.initializeGamePlay();
    this.shipList = ["Carrier", "Battleship", "Destroyer", "Submarine"];
  }

  initializeGamePlay() {
    this.playGame();
  }

  playGame() {
    this.populateBoards();

    const player = "player";
    const enemy = "enemy";

    this.listenForAttacks("player");
    this.listenForAttacks("enemy");
  }

  //populate boards with the cells according from array of each boardState
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

  listenForAttacks(user) {
    const cells = document.querySelectorAll(`.${user}-cell`);

    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        this.attackFire(cell);
      });
    });
  }

  attackFire(cell) {
    const successfulAttack = this.shipList.some((ship) => {
      if (cell.classList.contains(ship)) {
        cell.classList.remove(ship);
        this.successfulAttack(ship);
        return true;
      }
      return false;
    });

    if (!successfulAttack) {
      this.failedAttack();
    }
  }
  successfulAttack(ship) {
    console.log(`Successful attack captain, their ${ship} is damaged`);
  }

  failedAttack() {
    console.log("Our attacks have missed Captain");
  }
}

export { Gameplay };
