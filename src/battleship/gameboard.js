import { Ship } from "./ship";
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

    return board;
  }
}

export { Gameboard };
