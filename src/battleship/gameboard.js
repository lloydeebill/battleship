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
        const startIndex = index;

        this.previewBoardShip(startIndex, ship);
      });
    });

    return board;
  }

  previewBoardShip(index, ship) {
    console.log(index);
    console.log(ship);

    const cells = document.querySelectorAll(`.${this.user}-board .cell`);
    cells.forEach((cell) => cell.classList.remove("ship-preview"));
    for (let i = index; i < index + ship.size; i++) {
      if (cells[i]) {
        cells[i].classList.add("ship-preview");
      }
    }
  }
}

export { Gameboard };
