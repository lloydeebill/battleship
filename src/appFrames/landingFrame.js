function landingFrame() {
  const main = document.querySelector("main");

  const div = document.createElement("landing-frame");

  div.innerHTML = `<h1>Welcome to Battle Ship</h2>
  <button class="start-game">Start Game</button>`;

  main.appendChild(div);
}

export { landingFrame };
