class CreateShip {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.hits = 0;
    this.position = [];
  }

  isSunk() {
    if (this.hits === this.size) {
      return true;
    }
  }

  hit() {
    this.hits++;
  }

  setPosition(indices) {
    this.position = indices;
  }
}

export { CreateShip };
