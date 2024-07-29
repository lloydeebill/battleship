class Ship {
  constructor(name, size, position) {
    this.name = name;
    this.size = size;
    this.position = position;
    this.hits = 0;
    this.coordinates = [];
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
