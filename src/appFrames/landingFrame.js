function initializeLandingFrame() {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const div = document.createElement("div");

  div.classList.add("landing-frame");

  div.innerHTML = `<h1>Battle Ship⛴</h2>
  <div>
    <button class="play-button">Single Player</button>
    <button class="multiplay-button">Multi-Player</button>
  </div>
`;

  main.appendChild(div);
}

export { initializeLandingFrame };
