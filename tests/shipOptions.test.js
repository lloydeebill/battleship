import { shipOptions, getShipChosen } from "../src/battleship/shipOptions";

beforeAll(() => {
  // Create mock elements for testing
  document.body.innerHTML = `
    <div class="ship-options">
      <div class="carrier"></div>
      <div class="battleship"></div>
      <div class="destroyer"></div>
      <div class="submarine"></div>
    </div>
  `;
});

// test("selects the ships", () => {
//   shipOptions();

//   const carrier = document.querySelector(".carrier");
//   const battleship = document.querySelector(".battleship");
//   const destroyer = document.querySelector(".destroyer");
//   const submarine = document.querySelector(".submarine");

//   carrier.click();
//   expect(getShipChosen()).toBe(carrier);

//   battleship.click();
//   expect(getShipChosen()).toBe(battleship);

//   destroyer.click();
//   expect(getShipChosen()).toBe(destroyer);

//   submarine.click();
//   expect(getShipChosen()).toBe(submarine);
// });
