import { Gameboard } from "../src/battleship/gameboard";

beforeEach(() => {
  // Mock the DOM for player and enemy boards
  document.body.innerHTML = `
    <div id="player-board"></div>
    <div id="enemy-board"></div>
  `;
});

test("shows enemy ship Placement", () => {
  const player = new Gameboard("player");
  const enemy = new Gameboard("enemy");

  // Example test to check if the board was rendered
  expect(document.querySelectorAll("#player-board .player-cell").length).toBe(
    100,
  );
  expect(document.querySelectorAll("#enemy-board .enemy-cell").length).toBe(
    100,
  );

  // Example to verify ships array for enemy
  expect(enemy.ships).toEqual([
    { name: "Carrier", size: 5 },
    { name: "Battleship", size: 4 },
    { name: "Destroyer", size: 3 },
    { name: "Submarine", size: 2 },
  ]);
});
