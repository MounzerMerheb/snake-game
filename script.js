import Snake from "./snake.js";
const nbRows = 20;
const nbCols = 20;
const cellSize = 40;

const grid = Array.from(Array(nbRows), () =>
  Object.seal(new Array(nbCols).fill(0))
);

document.documentElement.style.setProperty("--cols", nbCols);
document.documentElement.style.setProperty("--cellSize", cellSize + "px");

const container = document.getElementById("grid-container");

createGrid();

function createGrid() {
  for (let row = 0; row < nbRows; row++) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("grid-row");
    for (let col = 0; col < nbCols; col++) {
      const cellElement = document.createElement("div");
      cellElement.classList.add("grid-cell");
      rowElement.appendChild(cellElement);
    }
    container.appendChild(rowElement);
  }
}
