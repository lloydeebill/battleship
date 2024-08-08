import { CreateShip } from "./ship";
import { getShipChosen } from "./shipOptions";
class Gameboard {
  constructor(user) {
    this.boardSize = 10;
    this.user = user;
    this.boardState = Array(this.boardSize * this.boardSize).fill(null);
    this.currPrevShipIndices = [];
    this.shipsList = [];
    this.initializeBoardPositioning();
    this.loadBoardState();
  }

  initializeBoardPositioning() {
    this.renderBoard();
    this.initializeOrientationHandler();
  }

  renderBoard() {
    const board = document.querySelector(`.${this.user}-board`);

    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add(`cell-${i}`, "cell");
      board.appendChild(cell);
    }

    const cells = document.querySelectorAll(`.${this.user}-board .cell`);
    cells.forEach((cell, index) => {
      cell.addEventListener("mouseover", () => {
        let chosenShip = getShipChosen();

        // centerIndex === chosenIndex
        const centerIndex = index;

        this.previewBoardShip(centerIndex, chosenShip);
      });
      cell.addEventListener("click", () => {
        let chosenShip = getShipChosen();
        this.placeChosenShipInBoard(chosenShip);
      });
    });

    return board;
  }

  previewBoardShip(centerIndex, chosenShip) {
    const cells = document.querySelectorAll(`.${this.user}-board .cell`);
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
    const changeOrientBtn = document.querySelector(".change-orientation-btn");

    changeOrientBtn.addEventListener("click", () => {
      const chosenShip = getShipChosen();

      if (chosenShip) {
        this.toggleChangeOrientation(chosenShip);
        this.previewBoardShip(chosenShip.currentIndex, chosenShip);
      }
    });
  }

  placeChosenShipInBoard(chosenShip) {
    const ship = new CreateShip(chosenShip.name, chosenShip.size);
    ship.position = [...this.currPrevShipIndices];

    if (
      !this.shipsList.some((existingShip) => existingShip.name === ship.name)
    ) {
      this.currPrevShipIndices.forEach((index) => {
        this.boardState[index] = ship.name;

        const cellElement = document.querySelector(
          `.${this.user}-board .cell-${index}`,
        );

        cellElement.classList.add(`${ship.name}`);
      });
      this.shipsList.push(ship);
    } else {
      console.log("ship already added");
    }

    console.log(this.shipsList);
    this.askGameStart();
  }

  askGameStart() {
    if (this.shipsList.length === 4) {
      console.log("start game?");
      this.saveBoardState();
    }
  }

  saveBoardState() {
    localStorage.setItem(
      `${this.user}-boardState`,
      JSON.stringify(this.boardState),
    );
  }

  loadBoardState() {
    const savedState = localStorage.getItem(`${this.user}-boardState`);
    if (savedState) {
      this.boardState = JSON.parse(savedState);
    }
  }
}

export { Gameboard };
