let shipChosen = null;
let lastSavedShip = null;

function shipOptions() {
  const shipOptionsContainer = document.querySelector(".ship-options");

  const shipOptions = shipOptionsContainer.children;

  Array.from(shipOptions).forEach((ship) => {
    ship.addEventListener("click", () => {
      if (lastSavedShip) {
        lastSavedShip.classList.remove("ship-chosen");
      }

      ship.classList.add("ship-chosen");

      shipChosen = {
        name: ship.getAttribute("data-name"),
        size: parseInt(ship.getAttribute("data-size"), 10),
      };

      lastSavedShip = ship;
    });
  });
}

function getShipChosen() {
  return shipChosen;
}

export { shipOptions, getShipChosen };
