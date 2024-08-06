import { Ship } from "./ship";
import { getShipChosen, shipOptions } from "./shipOptions";
class Gameboard {
  constructor(user) {
    this.boardSize = 10;
    this.user = user;
    this.boardState = Array(this.boardSize * this.boardSize).fill(null);
    this.currPrevShipIndices = [];
    this.initializeBoardPositioning();
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
        const chosenShip = getShipChosen();

        // centerIndex === chosenIndex
        const centerIndex = index;
        this.previewBoardShip(centerIndex, chosenShip);
      });
    });

    return board;
  }

  previewBoardShip(centerIndex, chosenShip) {
    const cells = document.querySelectorAll(`.${this.user}-board .cell`);
    cells.forEach((cell) => cell.classList.remove("ship-preview"));

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
    console.log(this.currPrevShipIndices);
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

    let indices = [];

    for (let i = startIndex; i <= endIndex; i += this.boardSize) {
      if (cells[i]) {
        cells[i].classList.add("ship-preview");
        indices.push(i);
      }
    }
    console.log(indices);
    this.boardState.push(indices);
    console.log(this.boardState);
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
    const createShip = new Ship(name, indices, size);
  }
}

export { Gameboard };
