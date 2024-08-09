function initializeLandingFrame() {
  const main = document.querySelector("main");

  const div = document.createElement("div");

  div.classList.add("landing-frame");

  div.innerHTML = `<h1>Battle Ship⛴</h2>
  <button class="play-button">Play</button>`;

  main.appendChild(div);
}

export { initializeLandingFrame };
