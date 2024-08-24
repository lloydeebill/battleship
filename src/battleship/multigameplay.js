class MultiGameplay {
  constructor(
    player1BoardState,
    player1ShipsList,
    player2BoardState,
    player2ShipsList,
  ) {
    this.player1BoardState = player1BoardState;
    this.player1ShipsList = player1ShipsList;
    this.player2BoardState = player2BoardState;
    this.player2ShipsList = player2ShipsList;
    this.isPlayer1Turn = true;
    this.gameOverFlag = false;

    this.initializeGamePlay();
  }

  initializeGamePlay() {
    this.playGame();
  }

  playGame() {
    this.populateBoards();

    this.showPlayer1View();
    this.player1Move();
  }

  //populate boards with the cells according from array of each boardState
  populateBoards() {
    const player1Board = document.querySelector(".player1-board");
    const player2Board = document.querySelector(".player2-board");
    const player1BoardAttack = document.querySelector(".player1-board-attack");
    const player2BoardAttack = document.querySelector(".player2-board-attack");

    this.player1BoardState.forEach((cell, index) => {
      const player1CellElement = document.createElement("div");
      const player2AttackCellElement = document.createElement("div");

      player1CellElement.classList.add(`player1-cell`);
      player2AttackCellElement.classList.add(`player2-cell-attack`);

      if (cell === null) {
        player1CellElement.classList.add(`player1-cell-${index}`);
        player1CellElement.classList.add(`empty-cell-${index}`);
      } else {
        player1CellElement.classList.add(cell);
      }

      player2AttackCellElement.classList.add(`player2-cell-attack-${index}`);
      player2AttackCellElement.classList.add("empty-cell");

      player1Board.appendChild(player1CellElement);
      player2BoardAttack.appendChild(player2AttackCellElement);
    });

    this.player2BoardState.forEach((cell, index) => {
      const player2CellElement = document.createElement("div");
      const player1AttackCellElement = document.createElement("div");

      player2CellElement.classList.add(`player2-cell`);
      player1AttackCellElement.classList.add(`player1-cell-attack`);

      if (cell === null) {
        player2CellElement.classList.add(`player2-cell-${index}`);
        player2CellElement.classList.add(`empty-cell-${index}`);
      } else {
        player2CellElement.classList.add(cell);
      }

      player1AttackCellElement.classList.add(`player1-cell-attack-${index}`);
      player1AttackCellElement.classList.add("empty-cell");

      player2Board.appendChild(player2CellElement);
      player1BoardAttack.appendChild(player1AttackCellElement);
    });
  }

  listenToAttacks(user) {
    const cells = document.querySelectorAll(`.${user}-cell-attack`);
    //this listens for user's attacks in the enemy board

    if (user === "player2" && this.isPlayer1Turn) {
      cells.forEach((cell) => {
        cell.addEventListener(
          "click",
          () => {
            if (
              !cell.classList.contains("damage") &&
              !cell.classList.contains("missed")
            ) {
              this.attackFire(user, cell);
              this.endTurn();
            }
          },
          { once: true },
        );
      });
    } else if (user === "player1" && !this.isPlayer1Turn) {
      cells.forEach((cell) => {
        cell.addEventListener(
          "click",
          () => {
            if (
              !cell.classList.contains("damage") &&
              !cell.classList.contains("missed")
            ) {
              this.attackFire(user, cell);
              this.endTurn();
            }
          },
          { once: true },
        );
      });
    }
  }

  showPlayer1View() {
    document.querySelector(".player1-view").classList.add("visible");
    document.querySelector(".player2-view").classList.add("hidden");
  }

  showPlayer2View() {
    document.querySelector(".player1-view").classList.add("hidden");
    document.querySelector(".player2-view").classList.add("visible");
  }

  player1Move() {
    if (this.isPlayer1Turn) {
      this.listenToAttacks("player2");
    }
  }

  player2Move() {
    if (!this.isPlayer1Turn) {
      this.listenToAttacks("player1");
    }
  }

  attackFire(user, cell) {
    const shipList = ["Carrier", "Battleship", "Destroyer", "Submarine"];

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

  endTurn() {
    if (this.gameOverFlag) return;
    this.isPlayer1Turn = !this.isPlayer1Turn;
    if (this.isPlayer1Turn) {
      this.showPlayer1View();
      this.player1Move();
    } else {
      this.showPlayer2View();
      this.player2Move();
    }
  }

  hitTracker(targetedShip, user) {
    console.log(this.player1ShipsList);
    console.log(this.player2ShipsList);

    if (user === "player1") {
      this.player1ShipsList.forEach((ship) => {
        if (ship.name === targetedShip) {
          ship.hit();
        }
      });
    }

    if (user === "player2") {
      this.player2ShipsList.forEach((ship) => {
        if (ship.name === targetedShip) {
          ship.hit();
        }
      });
    }
  }

  checkGameStatus() {
    const player1Defeated = this.player1ShipsList.every(
      (ship) => ship.destroyed === true,
    );

    const player2Defeated = this.player2ShipsList.every(
      (ship) => ship.destroyed === true,
    );

    this.gameOver(player1Defeated, player2Defeated);
  }

  gameOver(player1Defeated, player2Defeated) {
    const gameOverTitle = document.querySelector(".game-over-title");
    const gameOverModal = document.querySelector(".game-over-modal");

    if (player1Defeated) {
      gameOverTitle.innerText = "Player 2 Wins";
      this.gameOverFlag = true;
      gameOverModal.style.display = "block";
    } else if (player2Defeated) {
      this.gameOverFlag = true;
      gameOverTitle.innerText = "Player 1 Wins";
      gameOverModal.style.display = "block";
    }
  }
}

export { MultiGameplay };
