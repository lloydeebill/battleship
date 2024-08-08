let shipChosen = null;
let lastSavedShip = null;

function shipOptions() {
  const shipOptionsContainer = document.querySelector(".ship-options");
  const shipChosenMsg = document.querySelector(".ship-chosen-msg");

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
        orientation: ship.getAttribute("data-orientation"),
      };

      shipChosenMsg.innerText = `${shipChosen.name} selected`;

      lastSavedShip = ship;
    });
  });

  if (shipOptions.length > 0) {
    const firstShip = shipOptions[0];

    if (lastSavedShip) {
      lastSavedShip.classList.remove("ship-chosen");
    }

    firstShip.classList.add("ship-chosen");

    shipChosen = {
      name: firstShip.getAttribute("data-name"),
      size: parseInt(firstShip.getAttribute("data-size"), 10),
      orientation: firstShip.getAttribute("data-orientation"),
    };

    shipChosenMsg.innerText = `${shipChosen.name} selected`;

    lastSavedShip = firstShip;
  }
}

function getShipChosen() {
  return shipChosen;
}

export { shipOptions, getShipChosen };
