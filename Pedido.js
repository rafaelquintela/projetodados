class Pedido {
    constructor(cliente = "", produto = "", preco = 0, status = "Pendente") {
        this.cliente = cliente;
        this.produto = produto;
        this.preco = preco;
        this.status = status;
    }

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

module.exports = Pedido;
