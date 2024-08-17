import { CreateShip } from "../src/battleship/ship";

const destroyer = new CreateShip("Destroyer", 3, "player");

test("marks ship as destroyed when hits equal size", () => {
  destroyer.hit(); // Hits: 1
  destroyer.hit(); // Hits: 2
  destroyer.hit(); // Hits: 3
  expect(destroyer.destroyed).toBe(true);
});
