class Ship {
  constructor(name, size, position, lives) {
    this.name = name;
    this.size = size;
    this.position = position;
    this.lives = lives;
    this.hits = 0;
  }

  isSunk() {
    if (this.hits === this.lives) {
      return true;
    }
  }

  hit() {
    this.hits++;
  }

  removeBoat() {}
}

export { Ship };
