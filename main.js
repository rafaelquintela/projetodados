const readline = require("readline");

const BinaryTree = require("./Arvore");
const funcoes = require("./funcoes");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const pedidos = [];
const arvore = new BinaryTree();

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

// Controla as opções do menu
function iniciar() {
    mostrarMenu();

    rl.question("Escolha uma opção: ", (opcao) => {
        switch (opcao.trim()) {
            case "1":
                funcoes.adicionarPedido(rl, pedidos, arvore, iniciar);
                break;
            case "2":
                funcoes.listarPedidos(pedidos, iniciar);
                break;
            case "3":
                funcoes.marcarEntregue(rl, pedidos, iniciar);
                break;
            case "4":
                funcoes.cancelarPedido(rl, pedidos, iniciar);
                break;
            case "5":
                funcoes.removerPedido(rl, pedidos, arvore, iniciar);
                break;
            case "6":
                funcoes.buscarCliente(rl, pedidos, iniciar);
                break;
            case "7":
                funcoes.mostrarValorTotal(pedidos, iniciar);
                break;
            case "8":
                funcoes.mostrarPendentes(pedidos, iniciar);
                break;
            case "9":
                console.log("\nPrograma encerrado. Até mais!");
                rl.close();
                break;
            case "10":
                funcoes.inserirNaArvore(pedidos, arvore, iniciar);
                break;
            case "11":
                funcoes.imprimirPreOrdem(arvore, iniciar);
                break;
            case "12":
                funcoes.imprimirEmOrdem(arvore, iniciar);
                break;
            case "13":
                funcoes.imprimirPosOrdem(arvore, iniciar);
                break;
            default:
                console.log("\nOpção inválida. Escolha uma opção de 1 a 13.");
                iniciar();
        }
    });
}

iniciar();
