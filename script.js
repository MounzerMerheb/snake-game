import Snake from "./snake.js";
const nbRows = 20;
const nbCols = 20;
const cellSize = 40;

const values = {
  1: "snake",
  2: "apple",
};

const grid = Array.from(Array(nbRows), () =>
  Object.seal(new Array(nbCols).fill(0))
);

document.documentElement.style.setProperty("--cols", nbCols);
document.documentElement.style.setProperty("--cellSize", cellSize + "px");

const container = document.getElementById("grid-container");

createGrid();
placeApple();

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

function updateGrid(row, col, val) {
  if (val <= 0) return;
  grid[row][col] = val;
  container.children[row].children[col].classList.add(values[val]);
}

function placeApple() {
  let exclusion = [];
  let rowApple, colApple;
  do {
    rowApple = random(0, nbRows);
    colApple = random(0, nbCols);
  } while (isArrayIncluded([rowApple, colApple], exclusion));
  updateGrid(rowApple, colApple, 2);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function isArrayIncluded(arr, arr2D) {
  return arr2D.some(
    (subArray) =>
      subArray.length === arr.length &&
      subArray.every((value, index) => value === arr[index])
  );
}
