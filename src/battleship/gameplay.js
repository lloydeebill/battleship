class Gameplay {
  constructor(
    playerBoardState,
    playerShipsList,
    enemyBoardState,
    enemyShipsList,
  ) {
    this.playerBoardState = playerBoardState;
    this.playerShipsList = playerShipsList;
    this.enemyBoardState = enemyBoardState;
    this.enemyShipsList = enemyShipsList;
    this.isPlayerTurn = true;
    this.initializeGamePlay();

    console.log(this.playerShipsList.map((ship) => ship.constructor.name)); // Should show "CreateShip"
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
        cellElement.classList.add("enemy-ship");
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
              this.attackFire("player", cell);
              this.endTurn();
            }
          },
          { once: true },
        );
      });
    }
  }

  attackFire(user, cell) {
    const shipList = ["Carrier", "Battleship", "Destroyer", "Submarine"];

    //parse through each ship in shipsList
    //check if one of the ships inside shiplsit is equal to the shiplist

    const successfulAttack = shipList.some((ship) => {
      if (cell.classList.contains(ship)) {
        cell.classList.remove(ship);

        // this.successfulAttack(ship);
        cell.classList.add("damage");

        this.hitTracker(ship, user);
        this.checkGameStatus();

        return true;
      }
      return false;
    });

    if (!successfulAttack) {
      // this.failedAttack();
      cell.classList.add("missed");
    }
  }

  successfulAttack(ship) {
    console.log(`Successful attack captain, their ${ship} is damaged`);
  }

  failedAttack() {
    console.log("Our attacks have missed Captain");
  }

  playerMove() {
    this.listenToAttacks("enemy");
  }

  enemyMove() {
    const attackedCellIndex = this.enemyRandomAttack();
    this.enemyAttack(attackedCellIndex);
  }

  enemyRandomAttack() {
    const enemyAttackCell = Math.floor(
      Math.random() * this.playerBoardState.length,
    );

    return enemyAttackCell;
  }

  enemyAttack(attackedIndex) {
    const cells = document.querySelectorAll(`.player-cell`);
    if (attackedIndex <= cells.length) {
      const attackedCell = cells[attackedIndex];

      if (
        !attackedCell.classList.contains("damage") &&
        !attackedCell.classList.contains("missed")
      ) {
        this.attackFire("enemy", attackedCell);
        this.endTurn();
      } else {
        setTimeout(() => {
          this.enemyMove();
        }, 250);
      }
    }

    //check if the tile is already hit or damaged before firing another one
  }

  endTurn() {
    this.isPlayerTurn = !this.isPlayerTurn;

    if (this.isPlayerTurn) {
      this.playerMove();
    } else {
      setTimeout(() => {
        this.enemyMove();
      }, 500);
    }
  }

  hitTracker(targetedShip, user) {
    if (user === "player") {
      this.enemyShipsList.forEach((ship) => {
        if (ship.name === targetedShip) {
          ship.hit();
        }
      });
    }

    if (user === "enemy") {
      this.playerShipsList.forEach((ship) => {
        if (ship.name === targetedShip) {
          ship.hit();
        }
      });
    }
  }

  checkGameStatus() {
    console.log(this.enemyShipsList);
    console.log(this.playerShipsList);
  }
}

export { Gameplay };
