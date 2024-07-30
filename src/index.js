import "./style.css";
import { Gameboard } from "./battleship/gameboard";
import { shipOptions } from "./battleship/shipOptions";

const player = new Gameboard("player");

player.renderBoard();
shipOptions();
