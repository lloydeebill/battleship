import { Ship } from "./ship";

class Gameboard {
  constructor(boardId) {
    this.boardSize = 10;
    this.grid = this.createGrid(this.boardSize);
    this.ships = [];
    this.gridElement = document.getElementById(boardId);
    this.renderGrid();
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

  renderGrid() {
    if (!this.gridElement) return;

    this.gridElement.innerHTML = "";

    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        if (this.grid[row][col] !== null) {
          cell.classList.add("ship");
        }

        this.gridElement.appendChild(cell);
      }
    }
  }
}

export { Gameboard };
