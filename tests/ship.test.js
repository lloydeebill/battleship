import { Ship } from "../src/battleship/ship";

test("creates a battleship", () => {
  const ship1 = new Ship("Destroyer", 3);

  expect(ship1.name).toBe("Destroyer");
  expect(ship1.size).toBe(3);
  expect(ship1.hits).toBe(0);
});

test("ship is hit", () => {
  const ship1 = new Ship("Destroyer", 3);

  ship1.hit();
  expect(ship1.hits).toBe(1);

  ship1.hit();
  expect(ship1.hits).toBe(2);

  ship1.hit();
  expect(ship1.hits).toBe(3);
});

test("check if ship is sunk", () => {
  const ship1 = new Ship("Destroyer", 3);
  ship1.hit();
  ship1.hit();
  ship1.hit();
  expect(ship1.isSunk()).toBe(true);
});
