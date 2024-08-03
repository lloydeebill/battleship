import { Ship } from "./ship";
import { getShipChosen, shipOptions } from "./shipOptions";
class Gameboard {
  constructor(user) {
    this.boardSize = 10;
    this.user = user;
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
        const ship = getShipChosen();

        // centerIndex === chosenIndex
        const centerIndex = index;

        this.previewBoardShip(centerIndex, ship);
      });
    });

    return board;
  }

  previewBoardShip(centerIndex, ship) {
    console.log(centerIndex);
    console.log(ship);

    const cells = document.querySelectorAll(`.${this.user}-board .cell`);
    cells.forEach((cell) => cell.classList.remove("ship-preview"));

    const rowStart = Math.floor(centerIndex / this.boardSize) * this.boardSize;
    const rowEnd = rowStart + this.boardSize - 1;

    if (ship.size % 2 !== 0) {
      const halfSize = Math.floor(ship.size / 2);
      let startIndex = centerIndex - halfSize;
      let endIndex = centerIndex + halfSize;

      if (startIndex < rowStart) {
        startIndex = rowStart;
        endIndex = startIndex + ship.size - 1;
      }

      if (endIndex > rowEnd) {
        endIndex = rowEnd;
        startIndex = endIndex - ship.size + 1;
      }

      for (let i = startIndex; i <= endIndex; i++) {
        if (cells[i]) {
          cells[i].classList.add("ship-preview");
        }
      }
    } else {
      // centerIndex === chosenIndex

      let startIndex = centerIndex;
      let endIndex = centerIndex + ship.size - 1;

      if (startIndex < rowStart) {
        startIndex = rowStart;
        endIndex = startIndex + ship.size - 1;
      }
      if (endIndex > rowEnd) {
        endIndex = rowEnd;
        startIndex = endIndex - ship.size + 1;
      }

      for (let i = centerIndex; i <= endIndex; i++) {
        if (cells[i]) {
          cells[i].classList.add("ship-preview");
        }
      }
    }
  }

  addShipToBoard() {}
}

export { Gameboard };
