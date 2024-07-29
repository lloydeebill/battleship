import "./style.css";
import { startFrame, shipPlacementFrame } from "./frame/gameFrames";

document.addEventListener("DOMContentLoaded", () => {
  startFrame();
  const startButton = document.querySelector(".start-button");
  startButton.addEventListener("click", () => shipPlacementFrame());
});
