
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Classe que guarda as informações de cada pedido
class Pedido {
    constructor(cliente = "", produto = "", preco = 0, status = "Pendente") {
        this.cliente = cliente;
        this.produto = produto;
        this.preco = preco;
        this.status = status;
    }

    // Mostra os dados do pedido
    mostrarInfo(numero) {
        console.log(
            `${numero}. Cliente: ${this.cliente} | ` +
            `Produto: ${this.produto} | ` +
            `Preço: R$ ${this.preco.toFixed(2)} | ` +
            `Status: ${this.status}`
        );
    }

    entregar() {
        this.status = "Entregue";
    }

    cancelar() {
        this.status = "Cancelado";
    }
}

// Classe que representa cada nó da árvore
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Árvore binária de busca
class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Verifica se a árvore está vazia
    isEmpty() {
        return this.root === null;
    }

    // Insere um pedido na árvore
    insert(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.root = newNode;
            return;
        }

        this.insertRecursive(this.root, newNode);
    }

    // Procura o lugar certo para inserir o novo nó
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

    // Percurso pré-ordem: raiz, esquerda e direita
    preOrder(node = this.root) {
        if (node !== null) {
            node.data.mostrarInfo(1);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }

    // Percurso em ordem: esquerda, raiz e direita
    inOrder(node = this.root) {
        if (node !== null) {
            this.inOrder(node.left);
            node.data.mostrarInfo(1);
            this.inOrder(node.right);
        }
    }

    // Percurso pós-ordem: esquerda, direita e raiz
    postOrder(node = this.root) {
        if (node !== null) {
            this.postOrder(node.left);
            this.postOrder(node.right);
            node.data.mostrarInfo(1);
        }
    }

    // Apaga todos os nós da árvore
    clear() {
        this.root = null;
    }
}

// Lista onde ficam armazenados os pedidos
const pedidos = [];
const arvore = new BinaryTree();

// Atualiza a árvore com os pedidos cadastrados
function atualizarArvore() {
    arvore.clear();

    pedidos.forEach((pedido) => {
        arvore.insert(pedido);
    });
}

// Mostra as opções do programa
function mostrarMenu() {
    console.log("\n==============================");
    console.log("      GERENCIADOR DE PEDIDOS");
    console.log("==============================");
    console.log("1 - Adicionar pedido");
    console.log("2 - Listar pedidos");
    console.log("3 - Marcar como entregue");
    console.log("4 - Cancelar pedido");
    console.log("5 - Remover pedido");
    console.log("6 - Buscar por cliente");
    console.log("7 - Mostrar valor total");
    console.log("8 - Mostrar pedidos pendentes");
    console.log("9 - Sair");
    console.log("10 - Inserir pedidos na árvore");
    console.log("11 - Imprimir em pré-ordem");
    console.log("12 - Imprimir em ordem");
    console.log("13 - Imprimir em pós-ordem");
    console.log("==============================");
}

// Cadastra um novo pedido
function adicionarPedido() {
    rl.question("\nNome do cliente: ", (cliente) => {
        if (cliente.trim() === "") {
            console.log("\nO nome do cliente não pode estar vazio.");
            iniciar();
            return;
        }

        rl.question("Produto: ", (produto) => {
            if (produto.trim() === "") {
                console.log("\nO produto não pode estar vazio.");
                iniciar();
                return;
            }

            rl.question("Preço: R$ ", (valor) => {
                const preco = Number(valor);

                if (!Number.isFinite(preco) || preco < 0) {
                    console.log("\nDigite um preço válido.");
                    iniciar();
                    return;
                }

                const novoPedido = new Pedido(
                    cliente.trim(),
                    produto.trim(),
                    preco
                );

                pedidos.push(novoPedido);
                atualizarArvore();

                console.log("\nPedido adicionado com sucesso!");
                iniciar();
            });
        });
    });
}

// Exibe todos os pedidos cadastrados
function listarPedidos() {
    console.log("\n===== TODOS OS PEDIDOS =====");

    if (pedidos.length === 0) {
        console.log("Nenhum pedido cadastrado.");
    } else {
        pedidos.forEach((pedido, indice) => {
            pedido.mostrarInfo(indice + 1);
        });
    }

    iniciar();
}

// Mostra os pedidos para escolher um número
function mostrarPedidos() {
    console.log("\n===== PEDIDOS =====");

    pedidos.forEach((pedido, indice) => {
        pedido.mostrarInfo(indice + 1);
    });
}

// Altera o status do pedido para entregue
function marcarEntregue() {
    if (pedidos.length === 0) {
        console.log("\nNenhum pedido cadastrado.");
        iniciar();
        return;
    }

    mostrarPedidos();

    rl.question("\nDigite o número do pedido entregue: ", (numero) => {
        const indice = Number(numero) - 1;

        if (
            Number.isInteger(indice) &&
            indice >= 0 &&
            indice < pedidos.length
        ) {
            if (pedidos[indice].status === "Cancelado") {
                console.log("\nNão é possível entregar um pedido cancelado.");
            } else {
                pedidos[indice].entregar();
                console.log("\nPedido marcado como entregue!");
            }
        } else {
            console.log("\nNúmero de pedido inválido.");
        }

        iniciar();
    });
}

// Cancela um pedido que ainda não foi entregue
function cancelarPedido() {
    if (pedidos.length === 0) {
        console.log("\nNenhum pedido cadastrado.");
        iniciar();
        return;
    }

    mostrarPedidos();

    rl.question("\nDigite o número do pedido que deseja cancelar: ", (numero) => {
        const indice = Number(numero) - 1;

        if (
            Number.isInteger(indice) &&
            indice >= 0 &&
            indice < pedidos.length
        ) {
            if (pedidos[indice].status === "Entregue") {
                console.log("\nNão é possível cancelar um pedido entregue.");
            } else {
                pedidos[indice].cancelar();
                console.log("\nPedido cancelado com sucesso!");
            }
        } else {
            console.log("\nNúmero de pedido inválido.");
        }

        iniciar();
    });
}

// Remove um pedido da lista
function removerPedido() {
    if (pedidos.length === 0) {
        console.log("\nNenhum pedido cadastrado.");
        iniciar();
        return;
    }

    mostrarPedidos();

    rl.question("\nDigite o número do pedido que deseja remover: ", (numero) => {
        const indice = Number(numero) - 1;

        if (
            Number.isInteger(indice) &&
            indice >= 0 &&
            indice < pedidos.length
        ) {
            const pedidoRemovido = pedidos.splice(indice, 1);

            atualizarArvore();

            console.log(
                `\nPedido de "${pedidoRemovido[0].cliente}" removido com sucesso!`
            );
        } else {
            console.log("\nNúmero de pedido inválido.");
        }

        iniciar();
    });
}

// Procura os pedidos pelo nome do cliente
function buscarCliente() {
    if (pedidos.length === 0) {
        console.log("\nNenhum pedido cadastrado.");
        iniciar();
        return;
    }

    rl.question("\nDigite o nome do cliente: ", (nome) => {
        const nomeBusca = nome.trim().toLowerCase();

        console.log("\n===== RESULTADO DA BUSCA =====");

        let encontrados = 0;

        pedidos.forEach((pedido, indice) => {
            if (pedido.cliente.toLowerCase().includes(nomeBusca)) {
                pedido.mostrarInfo(indice + 1);
                encontrados++;
            }
        });

        if (encontrados === 0) {
            console.log("Nenhum pedido encontrado para esse cliente.");
        }

        iniciar();
    });
}

// Soma os valores dos pedidos que não foram cancelados
function mostrarValorTotal() {
    if (pedidos.length === 0) {
        console.log("\nNenhum pedido cadastrado.");
        iniciar();
        return;
    }

    let total = 0;

    pedidos.forEach((pedido) => {
        if (pedido.status !== "Cancelado") {
            total += pedido.preco;
        }
    });

    console.log(`\nValor total dos pedidos: R$ ${total.toFixed(2)}`);

    iniciar();
}

// Mostra somente os pedidos que ainda estão pendentes
function mostrarPendentes() {
    if (pedidos.length === 0) {
        console.log("\nNenhum pedido cadastrado.");
        iniciar();
        return;
    }

    console.log("\n===== PEDIDOS PENDENTES =====");

    let encontrados = 0;

    pedidos.forEach((pedido, indice) => {
        if (pedido.status === "Pendente") {
            pedido.mostrarInfo(indice + 1);
            encontrados++;
        }
    });

    if (encontrados === 0) {
        console.log("Não existem pedidos pendentes.");
    }

    iniciar();
}

// Coloca os pedidos cadastrados na árvore
function inserirNaArvore() {
    if (pedidos.length === 0) {
        console.log("\nNenhum pedido cadastrado.");
        iniciar();
        return;
    }

    atualizarArvore();

    console.log("\nPedidos inseridos na árvore!");
    iniciar();
}

// Mostra a árvore começando pela raiz
function imprimirPreOrdem() {
    console.log("\n===== PRÉ-ORDEM =====");

    if (arvore.isEmpty()) {
        console.log("Árvore vazia.");
    } else {
        arvore.preOrder();
    }

    iniciar();
}

// Mostra os pedidos em ordem crescente de preço
function imprimirEmOrdem() {
    console.log("\n===== EM ORDEM =====");

    if (arvore.isEmpty()) {
        console.log("Árvore vazia.");
    } else {
        arvore.inOrder();
    }

    iniciar();
}

// Mostra a raiz por último
function imprimirPosOrdem() {
    console.log("\n===== PÓS-ORDEM =====");

    if (arvore.isEmpty()) {
        console.log("Árvore vazia.");
    } else {
        arvore.postOrder();
    }

    iniciar();
}

// Controla as opções escolhidas no menu
function iniciar() {
    mostrarMenu();

    rl.question("Escolha uma opção: ", (opcao) => {
        switch (opcao.trim()) {
            case "1":
                adicionarPedido();
                break;

            case "2":
                listarPedidos();
                break;

            case "3":
                marcarEntregue();
                break;

            case "4":
                cancelarPedido();
                break;

            case "5":
                removerPedido();
                break;

            case "6":
                buscarCliente();
                break;

            case "7":
                mostrarValorTotal();
                break;

            case "8":
                mostrarPendentes();
                break;

            case "9":
                console.log("\nPrograma encerrado. Até mais!");
                rl.close();
                break;

            case "10":
                inserirNaArvore();
                break;

            case "11":
                imprimirPreOrdem();
                break;

            case "12":
                imprimirEmOrdem();
                break;

            case "13":
                imprimirPosOrdem();
                break;

            default:
                console.log("\nOpção inválida. Escolha uma opção de 1 a 13.");
                iniciar();
        }
    });
}

// Inicia o programa
iniciar();
