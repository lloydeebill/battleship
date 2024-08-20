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
    this.gameOverFlag = false;

    this.availableEnemytoPlayerMoves = Array.from(
      { length: playerBoardState.length },
      (_, index) => index,
    );

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
              if (
                !cell.classList.contains("damage") &&
                !cell.classList.contains("missed")
              ) {
                this.attackFire("player", cell);
                this.endTurn();
              }
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
      cell.classList.add("missed");
    }
  }

  successfulAttack() {
    console.log(`Successful attack captain, one of their ship is damaged`);
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
    const randomIndex = Math.floor(
      Math.random() * this.availableEnemytoPlayerMoves.length,
    );

    const enemyAttackCell = this.availableEnemytoPlayerMoves[randomIndex];

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
        this.availableEnemytoPlayerMoves =
          this.availableEnemytoPlayerMoves.filter(
            (index) => index !== attackedIndex,
          );
        this.endTurn();
      } else {
        setTimeout(() => {
          this.enemyMove();
        }, 250);
      }
    }
  }

  endTurn() {
    if (this.gameOverFlag) return;
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
    const enemyDefeated = this.enemyShipsList.every(
      (ship) => ship.destroyed === true,
    );

    const playerDefeated = this.playerShipsList.every(
      (ship) => ship.destroyed === true,
    );

    this.gameOver(playerDefeated, enemyDefeated);
  }

  gameOver(playerDefeated, enemyDefeated) {
    const gameOverTitle = document.querySelector(".game-over-title");
    const gameOverModal = document.querySelector(".game-over-modal");

    if (enemyDefeated) {
      gameOverTitle.innerText = "You win";
      this.gameOverFlag = true;
      gameOverModal.style.display = "block";
    } else if (playerDefeated) {
      this.gameOverFlag = true;
      gameOverTitle.innerText = "Defeated";
      gameOverModal.style.display = "block";
    }
  }
}

export { Gameplay };
