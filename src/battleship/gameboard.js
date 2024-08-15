import { CreateShip } from "./ship";

class Gameboard {
  constructor(user) {
    this.boardSize = 10;
    this.user = user;
    this.boardState = Array(this.boardSize * this.boardSize).fill(null);
    this.board = [];
    this.currPrevShipIndices = [];
    this.shipsList = [];
    this.shipChosen = null;
    this.lastSavedShip = null;
    this.initializeBoardPositioning();
    this.loadBoardState();
    this.shipOptions();
  }

  initializeBoardPositioning() {
    this.renderBoardPlacement();
    this.initializeOrientationHandler();

    if (this.user === "enemy") {
      this.hideEnemyBoard();
    }
  }

  renderBoardPlacement() {
    const board = document.querySelector(`.${this.user}-board`);

    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add(`${this.user}-cell`, `${this.user}-cell-${i}`);
      board.appendChild(cell);
    }

    if (this.user === "player") {
      const cells = document.querySelectorAll(`.${this.user}-cell`);
      cells.forEach((cell, centerIndex) => {
        cell.addEventListener("mouseover", () => {
          if (this.shipChosen) {
            this.previewBoardShip(centerIndex, this.shipChosen);
          }
        });
        cell.addEventListener("click", () => {
          if (this.shipChosen) {
            this.placeChosenShipInBoard(this.shipChosen);
          }
        });
      });
    }

    if (this.user === "enemy") {
      this.enemyShipPlacement();
    }

    return board;
  }

  enemyShipPlacement() {
    const enemyShips = [
      {
        name: "Carrier",
        size: 5,
      },
      {
        name: "Battleship",
        size: 4,
      },
      {
        name: "Destroyer",
        size: 3,
      },
      {
        name: "Submarine",
        size: 2,
      },
    ];

    this.currPrevShipIndices = [];

    enemyShips.forEach((ship) => {
      let validPlacement = false;

      while (!validPlacement) {
        const enemyShipOrientaion =
          Math.random() > 0.5 ? "horizontal" : "vertical";
        const enemyStartIndex = Math.floor(
          Math.random() * (this.boardSize * this.boardSize),
        );

        this.currPrevShipIndices = [];
        this.calculateShipPlacement(
          enemyStartIndex,
          enemyShipOrientaion,
          ship.size,
        );

        ship.position = [...this.currPrevShipIndices];

        if (this.isPlacementValid(ship)) {
          this.placeChosenShipInBoard(ship);
          validPlacement = true;
        }
      }
    });
  }

  calculateShipPlacement(enemyStartIndex, enemyShipOrientation, enemyShipSize) {
    if (enemyShipOrientation === "horizontal") {
      let startIndex = enemyStartIndex;
      let endIndex = startIndex + enemyShipSize - 1;

      const rowStart = Math.floor(startIndex / this.boardSize) * this.boardSize;
      const rowEnd = rowStart + this.boardSize - 1;

      if (endIndex > rowEnd) {
        endIndex = rowEnd;
        startIndex = endIndex - enemyShipSize + 1;
      }

      for (let i = startIndex; i <= endIndex; i++) {
        this.currPrevShipIndices.push(i);
      }
    } else if (enemyShipOrientation === "vertical") {
      let startIndex = enemyStartIndex;
      let endIndex = startIndex + (enemyShipSize - 1) * this.boardSize;

      const colStart = startIndex % this.boardSize;

      if (endIndex >= this.boardSize * this.boardSize) {
        endIndex = colStart + (this.boardSize - 1) * this.boardSize;
        startIndex = endIndex - (enemyShipSize - 1) * this.boardSize;
      }

      for (let i = startIndex; i <= endIndex; i += this.boardSize) {
        this.currPrevShipIndices.push(i);
      }
    }
  }

  hideEnemyBoard() {
    const board = document.querySelector(`.${this.user}-board`);
    board.style.display = "none";
  }

  previewBoardShip(centerIndex, chosenShip) {
    const cells = document.querySelectorAll(
      `.${this.user}-board .${this.user}-cell`,
    );
    cells.forEach((cell) => cell.classList.remove("ship-preview"));

    this.currPrevShipIndices = [];

    const rowStart = Math.floor(centerIndex / this.boardSize) * this.boardSize;
    const rowEnd = rowStart + this.boardSize - 1;

    if (chosenShip.orientation === "horizontal") {
      this.previewHorizontal(rowStart, rowEnd, chosenShip, cells, centerIndex);
    } else {
      this.previewVertical(centerIndex, chosenShip, cells);
    }
  }

  previewHorizontal(rowStart, rowEnd, chosenShip, cells, centerIndex) {
    const halfSize = Math.floor(chosenShip.size / 2);
    let startIndex = centerIndex - halfSize;
    let endIndex = centerIndex + halfSize;

    if (chosenShip.size % 2 !== 0) {
      if (startIndex < rowStart) {
        startIndex = rowStart;
        endIndex = startIndex + chosenShip.size - 1;
      }

      if (endIndex > rowEnd) {
        endIndex = rowEnd;
        startIndex = endIndex - chosenShip.size + 1;
      }

      for (let i = startIndex; i <= endIndex; i++) {
        if (cells[i]) {
          cells[i].classList.add("ship-preview");
          this.currPrevShipIndices.push(i);
        }
      }
    } else if (chosenShip.size % 2 === 0) {
      let startIndex = centerIndex;
      let endIndex = centerIndex + chosenShip.size - 1;

      if (startIndex < rowStart) {
        startIndex = rowStart;
        endIndex = startIndex + chosenShip.size - 1;
      }

      if (endIndex > rowEnd) {
        endIndex = rowEnd;
        startIndex = endIndex - chosenShip.size + 1;
      }

      for (let i = startIndex; i <= endIndex; i++) {
        if (cells[i]) {
          cells[i].classList.add("ship-preview");
          this.currPrevShipIndices.push(i);
        }
      }
    }
  }

  previewVertical(centerIndex, chosenShip, cells) {
    const colStart = centerIndex % this.boardSize;
    const verticalStart = centerIndex - colStart;
    const halfSize = Math.floor(chosenShip.size / 2);

    let startIndex = verticalStart + colStart - halfSize * this.boardSize;
    let endIndex = startIndex + (chosenShip.size - 1) * this.boardSize;

    // Ensure startIndex and endIndex are within bounds
    if (startIndex < 0) {
      startIndex = colStart;
      endIndex = startIndex + (chosenShip.size - 1) * this.boardSize;
    }

    if (endIndex >= this.boardSize * this.boardSize) {
      endIndex = colStart + (this.boardSize - 1) * this.boardSize;
      startIndex = endIndex - (chosenShip.size - 1) * this.boardSize;
    }

    for (let i = startIndex; i <= endIndex; i += this.boardSize) {
      if (cells[i]) {
        cells[i].classList.add("ship-preview");
        this.currPrevShipIndices.push(i);
      }
    }
  }

  toggleChangeOrientation(chosenShip) {
    if (chosenShip.orientation === "horizontal") {
      chosenShip.orientation = "vertical";
    } else if (chosenShip.orientation === "vertical")
      chosenShip.orientation = "horizontal";
  }

  initializeOrientationHandler() {
    if (this.user === "player") {
      const changeOrientBtn = document.querySelector(".rotate-btn");

      changeOrientBtn.addEventListener("click", () => {
        if (this.shipChosen) {
          this.toggleChangeOrientation(this.shipChosen);
          this.previewBoardShip(this.shipChosen.currentIndex, this.shipChosen);
        }
      });
    }
  }

  shipOptions() {
    const shipOptionsContainer = document.querySelector(".ship-options");
    const shipChosenMsg = document.querySelector(".ship-chosen-msg");

    const shipOptions = shipOptionsContainer.children;

    Array.from(shipOptions).forEach((ship) => {
      ship.addEventListener("click", () => {
        if (this.lastSavedShip) {
          this.lastSavedShip.classList.remove("ship-chosen");
        }

        ship.classList.add("ship-chosen");

        this.shipChosen = {
          name: ship.getAttribute("data-name"),
          size: parseInt(ship.getAttribute("data-size"), 10),
          orientation: ship.getAttribute("data-orientation"),
        };

        shipChosenMsg.innerText = `${this.shipChosen.name} selected`;

        this.lastSavedShip = ship;
      });
    });

    if (shipOptions.length > 0) {
      const firstShip = shipOptions[0];

      if (this.lastSavedShip) {
        this.lastSavedShip.classList.remove("ship-chosen");
      }

      firstShip.classList.add("ship-chosen");

      this.shipChosen = {
        name: firstShip.getAttribute("data-name"),
        size: parseInt(firstShip.getAttribute("data-size"), 10),
        orientation: firstShip.getAttribute("data-orientation"),
      };

      shipChosenMsg.innerText = `${this.shipChosen.name} selected`;

      this.lastSavedShip = firstShip;
    }
  }

  isPlacementValid(ship) {
    const { position } = ship;

    const positionsValid = position.every((index) => {
      return (
        index >= 0 &&
        index < this.boardSize * this.boardSize &&
        this.boardState[index] === null
      );
    });

    const shipAlreadyPlaced = this.shipsList.some(
      (existingShip) => existingShip.name === ship.name,
    );

    return positionsValid && !shipAlreadyPlaced;
  }

  // Modified function to place the chosen ship in the board
  placeChosenShipInBoard(chosenShip) {
    if (!chosenShip) return;

    const ship = new CreateShip(chosenShip.name, chosenShip.size);
    ship.position = [...this.currPrevShipIndices];

    const notifMsg = document.querySelector(".notification-msg");

    if (this.user === "player") {
      if (this.isPlacementValid(ship)) {
        this.currPrevShipIndices.forEach((index) => {
          this.boardState[index] = ship.name;

          const cellElement = document.querySelector(
            `.${this.user}-board .${this.user}-cell-${index}`,
          );

          cellElement.classList.add(`${ship.name}`);
        });

        this.shipsList.push(ship);

        notifMsg.innerText = `${ship.name} deployed Captain!`;
      } else {
        const shipAlreadyPlaced = this.shipsList.some(
          (existingShip) => existingShip.name === ship.name,
        );

        if (shipAlreadyPlaced) {
          notifMsg.innerText = `Ship already in position Captain.`;
        } else {
          notifMsg.innerText = `Invalid position for ${ship.name} Captain.`;
        }
      }

      this.askGameStart();
    } else if (this.user === "enemy") {
      if (this.isPlacementValid(ship)) {
        this.currPrevShipIndices.forEach((index) => {
          this.boardState[index] = ship.name;

          const cellElement = document.querySelector(
            `.${this.user}-board .${this.user}-cell-${index}`,
          );

          cellElement.classList.add(`${ship.name}`);
        });

        this.shipsList.push(ship);
      }

      this.saveBoardState();
    }
  }

  askGameStart() {
    if (this.shipsList.length === 4) {
      const notifMsg = document.querySelector(".notification-msg");
      notifMsg.innerText = `Full Steam Ahead!`;

      const startGameModal = document.querySelector(".start-game-modal");
      startGameModal.style.display = "block";
    }

    this.saveBoardState();
  }

  clearBoardState() {
    localStorage.removeItem(`${this.user}-boardState`);
    localStorage.removeItem(`${this.user}-shipsList`);
  }

  saveBoardState() {
    localStorage.setItem(
      `${this.user}-boardState`,
      JSON.stringify(this.boardState),
    );
  }

  loadBoardState() {
    const savedBoardState = localStorage.getItem(`${this.user}-boardState`);

    // Parse only if the value is not null
    if (savedBoardState !== null) {
      this.boardState = JSON.parse(savedBoardState);
    }

    return this.boardState;
  }
}

export { Gameboard };
