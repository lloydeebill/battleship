import { Gameboard } from "../src/battleship/gameboard";
import { Ship } from "../src/battleship/ship";
import { getShipChosen, shipOptions } from "../src/battleship/shipOptions";

jest.mock("../src/battleship/shipOptions", () => ({
  getShipChosen: jest.fn(),
}));

beforeAll(() => {
  // Create mock elements for testing
  document.body.innerHTML = `
    <div class="player-board"></div>
    <div class="enemy-board"></div>
  `;
});

test("creates a gameboard", () => {
  const player = new Gameboard();

  expect(player.boardSize).toBe(10);
});

test("render board 100 cells", () => {
  const player = new Gameboard("player");
  const boardElement = document.querySelector(".player-board");

  player.renderBoard();

  expect(boardElement.children.length).toBe(100);
});

test("adds hover listeners to cells", () => {
  const player = new Gameboard("player");
  player.renderBoard();

  const firstCell = document.querySelector(".player-board .cell-0");
  const secondCell = document.querySelector(".player-board .cell-1");

  console.log = jest.fn();

  firstCell.dispatchEvent(new Event("mouseover"));
  expect(console.log).toHaveBeenCalledWith("Hovered over cell-0");

  secondCell.dispatchEvent(new Event("mouseover"));
  expect(console.log).toHaveBeenCalledWith("Hovered over cell-1");
});

test("preview ship to board during hover", () => {
  const mockShip = { size: 3 };

  getShipChosen.mockReturnValue(mockShip);

  const player = new Gameboard("player");
  player.renderBoard();

  const cells = document.querySelectorAll(".player-board .cell");

  cells[2].dispatchEvent(new Event("mouseover"));

  expect(cells[2].classList.contains("ship-preview")).toBe(true);
  expect(cells[3].classList.contains("ship-preview")).toBe(true);
  expect(cells[4].classList.contains("ship-preview")).toBe(true);

  cells[3].dispatchEvent(new Event("mouseover"));

  expect(cells[2].classList.contains("ship-preview")).toBe(false);
  expect(cells[3].classList.contains("ship-preview")).toBe(true);
  expect(cells[4].classList.contains("ship-preview")).toBe(true);
  expect(cells[5].classList.contains("ship-preview")).toBe(true);
});
