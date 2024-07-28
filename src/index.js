import "./style.css";

function component() {
  const element = document.createElement("p");

  element.classList.add("hello");

  element.innerText = "hello world";

  return element;
}

document.body.appendChild(component());
