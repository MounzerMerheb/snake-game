class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.next = null;
  }
  isNull() {
    return x == -1 || y == -1;
  }
}
class Snake {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addNode(x, y) {
    let node = new Node(x, y);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.tail;
      this.tail = node;
    }
    this.length++;
  }
  display() {
    console.log("hello");
    let temp = this.tail;
    while (temp != null) {
      console.log(temp.x, temp.y);
      temp = temp.next;
    }
  }
  getPosArr() {
    let arr = [];
    let temp = this.tail;
    while (temp != null) {
      arr.push([temp.y, temp.x]);
      temp = temp.next;
    }
    return arr;
  }
  getPosArrButHead() {
    let arr = [];
    let temp = this.tail;
    while (temp != null) {
      if (temp != this.head) arr.push([temp.y, temp.x]);
      temp = temp.next;
    }
    return arr;
  }

  isOnEdge(direction, maxX, maxY) {
    switch (direction) {
      case "U":
        if (this.head.y == 0) return true;

        break;
      case "D":
        if (this.head.y == maxY) return true;

        break;
      case "L":
        if (this.head.x == 0) return true;

        break;
      case "R":
        if (this.head.x == maxX) return true;

        break;
      default:
        return false;
    }
    return false;
  }

  moveButTail(direction, maxX, maxY) {
    if (this.isOnEdge(direction, maxX, maxY)) return false;
    let temp = this.tail.next;
    while (temp != null) {
      if (temp != this.head) {
        temp.x = temp.next.x;
        temp.y = temp.next.y;
      }

      temp = temp.next;
    }

    switch (direction) {
      case "U":
        this.head.y--;
        break;
      case "D":
        this.head.y++;
        break;
      case "L":
        this.head.x--;
        break;
      case "R":
        this.head.x++;
        break;
      default:
        break;
    }
    return false;
  }
  move(direction, maxX, maxY) {
    if (this.isOnEdge(direction, maxX, maxY)) return false;
    let temp = this.tail;
    while (temp != null) {
      if (temp != this.head) {
        temp.x = temp.next.x;
        temp.y = temp.next.y;
      }

      temp = temp.next;
    }

    switch (direction) {
      case "U":
        this.head.y--;
        break;
      case "D":
        this.head.y++;
        break;
      case "L":
        this.head.x--;
        break;
      case "R":
        this.head.x++;
        break;
      default:
        break;
    }
    return true;
  }
}

export default Snake;
