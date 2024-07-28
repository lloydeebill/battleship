import { Ship } from "./ship";

const ship1 = new Ship("Destroyer", 3, "X-axis");

class Gameboard {
  constructor() {
    this.boardSize = 10;
    this.grid = this.createGrid(this.boardSize);
    this.ships = [];
  }

  createGrid(size) {
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
  }

  addShips() {
    this.ships.push(ship1);
  }
}

export { Gameboard };
