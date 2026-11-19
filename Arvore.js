class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    isEmpty() {
        return this.root === null;
    }

    insert(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.root = newNode;
            return;
        }

        this.insertRecursive(this.root, newNode);
    }

    insertRecursive(currentNode, newNode) {
        if (newNode.data.preco < currentNode.data.preco) {
            if (currentNode.left === null) {
                currentNode.left = newNode;
            } else {
                this.insertRecursive(currentNode.left, newNode);
            }
        } else {
            if (currentNode.right === null) {
                currentNode.right = newNode;
            } else {
                this.insertRecursive(currentNode.right, newNode);
            }
        }
    }

    // Pré-ordem: raiz,esquerda e direita
    preOrder(node = this.root) {
        if (node !== null) {
            node.data.mostrarInfo(1);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }

    // Em ordem: esquerda, raiz e direita
    inOrder(node = this.root) {
        if (node !== null) {
            this.inOrder(node.left);
            node.data.mostrarInfo(1);
            this.inOrder(node.right);
        }
    }

    // Pós-ordem: esquerda, direita e raiz
    postOrder(node = this.root) {
        if (node !== null) {
            this.postOrder(node.left);
            this.postOrder(node.right);
            node.data.mostrarInfo(1);
        }
    }

    clear() {
        this.root = null;
    }
}

module.exports = BinaryTree;
