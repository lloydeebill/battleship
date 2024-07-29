import { Ship } from "./ship";

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

  addShip(ship) {
    this.ships.push(ship);
  }

  positionShip(ship, startX, startY) {
    for (let i = 0; i < ship.size; i++) {
      const x = ship.position === "X-axis" ? startX + i : startX;
      const y = ship.position === "Y-axis" ? startY + i : startY;

      this.grid[x][y] = ship;
      ship.coordinates.push({ x, y });
    }
  }

  canPlaceShip(ship, startX, startY) {
    for (let i = 0; i < ship.size; i++) {
      const x = ship.position === "X-axis" ? startX + i : startX;
      const y = ship.position === "Y-axis" ? startY + i : startY;

      if (
        x >= this.boardSize ||
        y >= this.boardSize ||
        this.grid[x][y] !== null
      ) {
        return false;
      }
    }
    return true;
  }
}

export { Gameboard };
