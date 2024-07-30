function shipOptions() {
  const shipOptionsContainer = document.querySelector(".ship-options");

  const shipOptions = shipOptionsContainer.children;

  let shipChosen = null;

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

export { shipOptions };
