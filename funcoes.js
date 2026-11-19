const Pedido = require("./Pedido");

function atualizarArvore(pedidos, arvore) {
    arvore.clear();

    pedidos.forEach((pedido) => {
        arvore.insert(pedido);
    });
}

function mostrarPedidos(pedidos) {
    console.log("\n===== PEDIDOS =====");

    pedidos.forEach((pedido, indice) => {
        pedido.mostrarInfo(indice + 1);
    });
}

function adicionarPedido(rl, pedidos, arvore, iniciar) {
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
                atualizarArvore(pedidos, arvore);

                console.log("\nPedido adicionado com sucesso!");
                iniciar();
            });
        });
    });
}

function listarPedidos(pedidos, iniciar) {
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

function marcarEntregue(rl, pedidos, iniciar) {
    if (pedidos.length === 0) {
        console.log("\nNenhum pedido cadastrado.");
        iniciar();
        return;
    }

    mostrarPedidos(pedidos);

    rl.question("\nDigite o número do pedido entregue: ", (numero) => {
        const indice = Number(numero) - 1;

        if (Number.isInteger(indice) && indice >= 0 && indice < pedidos.length) {
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

function cancelarPedido(rl, pedidos, iniciar) {
    if (pedidos.length === 0) {
        console.log("\nNenhum pedido cadastrado.");
        iniciar();
        return;
    }

    mostrarPedidos(pedidos);

    rl.question("\nDigite o número do pedido que deseja cancelar: ", (numero) => {
        const indice = Number(numero) - 1;

        if (Number.isInteger(indice) && indice >= 0 && indice < pedidos.length) {
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

function removerPedido(rl, pedidos, arvore, iniciar) {
    if (pedidos.length === 0) {
        console.log("\nNenhum pedido cadastrado.");
        iniciar();
        return;
    }

    mostrarPedidos(pedidos);

    rl.question("\nDigite o número do pedido que deseja remover: ", (numero) => {
        const indice = Number(numero) - 1;

        if (Number.isInteger(indice) && indice >= 0 && indice < pedidos.length) {
            const pedidoRemovido = pedidos.splice(indice, 1);
            atualizarArvore(pedidos, arvore);

            console.log(
                `\nPedido de "${pedidoRemovido[0].cliente}" removido com sucesso!`
            );
        } else {
            console.log("\nNúmero de pedido inválido.");
        }

        iniciar();
    });
}

function buscarCliente(rl, pedidos, iniciar) {
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

function mostrarValorTotal(pedidos, iniciar) {
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

function mostrarPendentes(pedidos, iniciar) {
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

function inserirNaArvore(pedidos, arvore, iniciar) {
    if (pedidos.length === 0) {
        console.log("\nNenhum pedido cadastrado.");
        iniciar();
        return;
    }

    atualizarArvore(pedidos, arvore);
    console.log("\nPedidos inseridos na árvore!");
    iniciar();
}

function imprimirPreOrdem(arvore, iniciar) {
    console.log("\n===== PRÉ-ORDEM =====");

    if (arvore.isEmpty()) {
        console.log("Árvore vazia.");
    } else {
        arvore.preOrder();
    }

    iniciar();
}

function imprimirEmOrdem(arvore, iniciar) {
    console.log("\n===== EM ORDEM =====");

    if (arvore.isEmpty()) {
        console.log("Árvore vazia.");
    } else {
        arvore.inOrder();
    }

    iniciar();
}

function imprimirPosOrdem(arvore, iniciar) {
    console.log("\n===== PÓS-ORDEM =====");

    if (arvore.isEmpty()) {
        console.log("Árvore vazia.");
    } else {
        arvore.postOrder();
    }

    iniciar();
}

module.exports = {
    adicionarPedido,
    listarPedidos,
    marcarEntregue,
    cancelarPedido,
    removerPedido,
    buscarCliente,
    mostrarValorTotal,
    mostrarPendentes,
    inserirNaArvore,
    imprimirPreOrdem,
    imprimirEmOrdem,
    imprimirPosOrdem
};
