class CreateShip {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.hits = 0;
    this.position = [];
    this.destroyed = false;
  }

  isSunk() {
    if (this.hits === this.size) {
      console.log(`${this.name} is sunk`);
      this.destroyed = true;
    }
  }

  hit() {
    this.hits++;
    this.isSunk();
  }

  setPosition(indices) {
    this.position = indices;
  }
}

export { CreateShip };
