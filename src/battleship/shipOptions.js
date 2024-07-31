let shipChosen = null;

function shipOptions() {
  const shipOptionsContainer = document.querySelector(".ship-options");

  const shipOptions = shipOptionsContainer.children;

  Array.from(shipOptions).forEach((ship) => {
    ship.addEventListener("click", () => {
      if (shipChosen) {
        shipChosen.classList.remove("ship-chosen");
      }

      ship.classList.add("ship-chosen");

      shipChosen = ship;
    });
  });
}

function getShipChosen() {
  return shipChosen;
}

export { shipOptions, getShipChosen };
