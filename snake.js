class Node {
    constructor(x,y){
        this.x = x ;
        this.y = y;
        this.next
    }
}
class Snake {
    constructor(){

    this.head = null;
    this.tail = null;
    this.length = 0;
    
    }

    addNode(x,y){
        let node = new Node(x,y);
        this.head.next = node;
        head = node;
    }
}

export default Snake;
