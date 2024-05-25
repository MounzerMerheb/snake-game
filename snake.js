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
      this.head.next = node;
      this.head = node;
    }
  }
  display() {
    console.log("hello");
    let temp = this.tail;
    while (temp != null) {
      console.log(temp.x, temp.y);
      temp = temp.next;
    }
  }
}

export default Snake;
