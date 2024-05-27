import Snake from "./snake.js";
document.addEventListener("DOMContentLoaded", () => {
  const nbRows = 15;
  const nbCols = 25;
  const cellSize = 30;
  const values = {
    1: "snake",
    2: "apple",
  };
  const container = document.getElementById("grid-container");

  let snake;
  let apple;
  let direction;
  let isAppleEaten;

  let grid;

  document.documentElement.style.setProperty("--cols", nbCols);
  document.documentElement.style.setProperty("--cellSize", cellSize + "px");

  initGame();

  // ===============================================
  let lastTime = 0;
  let canChangeDirection = true;
  let willLose = false;

  function updateScreen(time) {
    if (time - lastTime >= 200) {
      move();
      if (isLosing()) {
        return;
      }
      eatApple();
      canChangeDirection = true;
      lastTime = time;
    }

    requestAnimationFrame(updateScreen);
  }
  document.addEventListener("keydown", handleKeyDown);
  startGame();

  // ===================================================

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

  function startGame() {
    lastTime = 0; // Reset lastTime if necessary
    requestAnimationFrame(updateScreen);
  }
  function initGame() {
    snake = new Snake();
    apple = [];
    direction = "L";
    isAppleEaten = false;

    grid = Array.from(Array(nbRows), () =>
      Object.seal(new Array(nbCols).fill(0))
    );
    createGrid();
    initSnake(3);
    placeSnake();
    placeApple();
  }

  function restart() {
    removeApple();
    removeSnake();
    snake = new Snake();
    apple = [];
    direction = "L";
    isAppleEaten = false;
    canChangeDirection = true;
    willLose = false;
    grid = Array.from(Array(nbRows), () =>
      Object.seal(new Array(nbCols).fill(0))
    );
    initSnake(3);
    placeSnake();
    placeApple();
    startGame();
  }

  function eatApple() {
    //check collision
    if (!(snake.head.y == apple[0] && snake.head.x == apple[1])) {
      isAppleEaten = false;
      return;
    }
    removeApple();

    snake.addNode(snake.tail.x, snake.tail.y);

    placeApple();
    isAppleEaten = true;
  }

  function isLosing() {
    return isLosingOnWall() || isLosingOnSelf();
  }
  function isLosingOnSelf() {
    return isArrayIncluded(
      [snake.head.y, snake.head.x],
      snake.getPosArrButHead()
    );
  }
  function isLosingOnWall() {
    if (willLose) {
      return snake.isOnEdge(direction, nbCols - 1, nbRows - 1);
    }
    willLose = snake.isOnEdge(direction, nbCols - 1, nbRows - 1);
    return false;
  }

  function move() {
    if (snake.isOnEdge(direction, nbCols - 1, nbRows - 1)) return;
    if (!isAppleEaten) {
      moveAll();
    } else {
      moveButTail();
    }
  }

  function moveAll() {
    removeSnake();
    let moved = snake.move(direction, nbCols - 1, nbRows - 1);
    placeSnake();
    return moved;
  }

  function moveButTail() {
    removeSnake();
    let moved = snake.moveButTail(direction, nbCols, nbRows);
    placeSnake();
    return moved;
  }

  function updateGrid(row, col, val) {
    if (val <= 0) return;

    grid[row][col] = val;
    container.children[row].children[col].classList.add(values[val]);
  }

  function placeApple() {
    let exclusion = snake.getPosArr();
    let rowApple, colApple;
    do {
      rowApple = random(0, nbRows);
      colApple = random(0, nbCols);
    } while (isArrayIncluded([rowApple, colApple], exclusion));
    updateGrid(rowApple, colApple, 2);
    apple = [rowApple, colApple];
  }
  function removeApple() {
    removeFromGrid(apple[0], apple[1], 2);
    apple = [];
  }

  function placeSnake() {
    let temp = snake.tail;
    while (temp != null) {
      updateGrid(temp.y, temp.x, 1);
      temp = temp.next;
    }
    container.children[snake.head.y].children[snake.head.x].classList.add(
      "head"
    );
  }

  function initSnake(length) {
    let x = parseInt(nbCols / 2) + length - 1;
    let y = parseInt(nbRows / 2);
    for (let i = length - 1; i >= 0; i--) {
      snake.addNode(x - i, y);
    }
  }

  function removeFromGrid(row, col, val) {
    grid[row][col] = 0;
    container.children[row].children[col].classList.remove(values[val]);
  }
  function removeSnake() {
    let temp = snake.tail;
    while (temp != null) {
      removeFromGrid(temp.y, temp.x, 1);
      temp = temp.next;
    }
    container.children[snake.head.y].children[snake.head.x].classList.remove(
      "head"
    );
  }

  function handleKeyDown(event) {
    if (!canChangeDirection) return;
    const key = event.key; // The key value
    const keyCode = event.keyCode; // The key code

    // Perform actions based on the key pressed
    switch (keyCode) {
      case 37: // Left arrow key
      case 65: // 'A' key
        if (direction == "R" || direction == "L") {
          return;
        }
        direction = "L";
        canChangeDirection = false;
        // move();

        break;
      case 38: // Up arrow key
      case 87: // 'W' key
        if (direction == "D" || direction == "U") return;
        direction = "U";
        canChangeDirection = false;
        // move();

        break;
      case 39: // Right arrow key
      case 68: // 'D' key
        if (direction == "L" || direction == "R") return;
        direction = "R";
        canChangeDirection = false;
        // move();
        break;
      case 40: // Down arrow key
      case 83: // 'S' key
        if (direction == "U" || direction == "D") return;
        direction = "D";
        canChangeDirection = false;
        // move();
        break;
      default:
        restart();
        break;
    }
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
});
