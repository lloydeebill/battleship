class Ship {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.hits = 0;
  }

  isSunk() {
    if (this.hits === this.size) {
      return true;
    }
  }

  hit() {
    this.hits++;
  }

  removeBoat() {}
}

export { Ship };
