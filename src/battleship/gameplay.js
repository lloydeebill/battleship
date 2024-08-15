class Gameplay {
  constructor(playerBoardState, enemyBoardState) {
    this.playerBoardState = playerBoardState;
    this.enemyBoardState = enemyBoardState;
    this.isPlayerTurn = true;
    this.initializeGamePlay();
  }

  initializeGamePlay() {
    this.playGame();
  }

  playGame() {
    this.populateBoards();

    this.playerMove();
  }

  //populate boards with the cells according from array of each boardState
  populateBoards() {
    const playerBoard = document.querySelector(".player-board");
    const enemyBoard = document.querySelector(".enemy-board");

    this.playerBoardState.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add(`player-cell`);

      if (cell === null) {
        cellElement.classList.add(`player-cell-${index}`);
        cellElement.classList.add(`empty-cell-${index}`);
      } else {
        cellElement.classList.add(cell);
      }

      playerBoard.appendChild(cellElement);
    });

    this.enemyBoardState.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add(`enemy-cell`);

      if (cell === null) {
        cellElement.classList.add(`enemy-cell-${index}`);
        cellElement.classList.add(`empty-cell-${index}`);
      } else {
        cellElement.classList.add(cell);
      }
      enemyBoard.appendChild(cellElement);
    });
  }

  listenToAttacks(user) {
    const cells = document.querySelectorAll(`.${user}-cell`);
    //this listens for user's attacks in the enemy board

    if (user === "enemy") {
      cells.forEach((cell) => {
        cell.addEventListener(
          "click",
          () => {
            if (this.isPlayerTurn) {
              this.attackFire(cell);
              this.endTurn();
            }
          },
          { once: true },
        );
      });
    }
  }

  attackFire(cell) {
    const shipList = ["Carrier", "Battleship", "Destroyer", "Submarine"];

    const successfulAttack = shipList.some((ship) => {
      if (cell.classList.contains(ship)) {
        cell.classList.remove(ship);
        // this.successfulAttack(ship);
        cell.classList.add("damage");
        return true;
      }
      return false;
    });

    if (!successfulAttack) {
      // this.failedAttack();
      cell.classList.add("damage");
    }
  }

  successfulAttack(ship) {
    console.log(`Successful attack captain, their ${ship} is damaged`);
  }

  failedAttack() {
    console.log("Our attacks have missed Captain");
  }

  playerMove() {
    console.log("Player's move started.");
    this.listenToAttacks("enemy");
  }

  enemyMove() {
    const attackedCellIndex = this.enemyRandomAttack();
    this.enemyAttack(attackedCellIndex);
    this.endTurn();
  }

  enemyRandomAttack() {
    const enemyAttackCell = Math.floor(
      Math.random() * this.playerBoardState.length,
    );

    return enemyAttackCell;
  }

  enemyAttack(index) {
    console.log("Enemy's move started.");
    const cells = document.querySelectorAll(`.player-cell`);
    if (index <= cells.length) {
      const attackedCell = cells[index];
      this.attackFire(attackedCell);
    }
  }

  endTurn() {
    console.log(this.isPlayerTurn);
    this.isPlayerTurn = !this.isPlayerTurn;

    if (this.isPlayerTurn) {
      this.playerMove();
    } else {
      setTimeout(() => {
        this.enemyMove();
      }, 1000);
    }
  }
}

export { Gameplay };
