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
        console.log(`Hovered over cell-${index}`);
        this.previewBoardShip(index, getShipChosen());
      });
    });

    return board;
  }

  previewBoardShip(startIndex, ship) {
    const cells = document.querySelectorAll(`.${this.user}-board .cell`);
    cells.forEach((cell) => cell.classList.remove("ship-preview"));

    if (!ship) return;

    const { size, orientation } = ship;

    const isHorizontal = orientation === "horizontal";

    const shipIndices = [];

    for (let i = startIndex; i < startIndex + size; i++) {
      if (cells[i]) {
        cells[i].classList.add("ship-preview");
      }
    }
  }
}

export { Gameboard };
