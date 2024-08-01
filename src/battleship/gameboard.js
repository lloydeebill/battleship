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

        this.previewBoardShip(index, ship);
      });
    });

    return board;
  }

  previewBoardShip(startIndex, ship) {
    console.log(`Hovered over cell-${startIndex}`);
    console.log("Ship chosen:", ship);
  }
}

export { Gameboard };
