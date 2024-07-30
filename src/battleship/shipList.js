import { Ship } from "./ship";

const carrier = new Ship("Carrier", 5, "X-axis");
const battleship = new Ship("Battleship", 4, "X-axis");
const cruiser = new Ship("Cruiser", 3, "X-axis");
const destroyer = new Ship("Destroyer", 3, "X-axis");
const submarine = new Ship("Submarine", 2, "X-axis");

let shipsList = [carrier, battleship, cruiser, destroyer, submarine];

export { shipsList };
