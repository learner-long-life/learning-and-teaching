/*
 * Node of a sorted binary search tree
 */
class TreeNode<T> {
    
  left: TreeNode | null;
  right: TreeNode | null;
  parent: TreeNode | null;
  value: T;

  constructor(value: T) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;
  }

  print(level: string = "") {
    console.log(level + "Node: " + this.value);
    if (this.left) {
      this.left.print(level + "  ");
    }
    if (this.right) {
      this.right.print(level + "  ");
    }
  }

  insertNode(newNode: T) {
    if (newNode.value <= this.value) {
      if (this.left == null) {
        this.left = newNode;
      } else {
        this.left.insertNode(newNode); 
      }
    } else {
      if (this.right == null) {
        this.right = newNode;
      } else {
        this.right.insertNode(newNode);
      }
    }
  }
}

class Tree<T> {
  root: TreeNode | null;
  
  constructor() {
      this.root = null;
  }

  insertNode(newNode: TreeNode<T>) {
    if (this.root == null) {
        this.root = newNode;
    } else {
        this.root.insertNode(newNode);
    }
  }

  print() {
    if (this.root == null) {
      console.log("Null root");
    } else {
      this.root.print(0);
    }
  }

}

export {
  Tree,
  TreeNode,
};
