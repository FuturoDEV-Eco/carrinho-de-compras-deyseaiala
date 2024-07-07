const Database = require("../database/conexao");


class PedidoController extends Database{

    async criar(request, response){

        const dados = request.body

        if(!dados.cliente_id || !dados.endereco || dados.produto_id || dados.quantidade){
            return response.status(400).json({mensagem: "ID do cliente, endereço, quantidade e ID do produto são obrigatórios. Por favor complete os dados."})
        }

        let total = 0

        for (let i = 0; i < dados.produtos.length; i++){
            const item = dados.produtos[i]
            const produtoAtual = await this.database.query(`
                SELECT preco FROM produtos 
                WHERE id = $1
            `, [item.produto_id]);

            total = total + (produtoAtual.rows[0].preco * item.quantidade);
        }

        
        const meuPedido = await this.database.query(`
            INSERT INTO pedidos (cliente_id, endereco, observacoes, total)
            values ($1,$2,$3,$4)
            returning *
            `, [dados.cliente_id, dados.endereco, dados.observacoes, total])

       
        dados.produtos.forEach(async item => {
            const produtoAtual = await this.database.query(`
                SELECT preco from produtos
                where id = $1
                `, [item.produto_id])

            this.database.query(`
                INSERT INTO itens_pedidos (pedido_id, produto_id, quantidade, preco)
                values ($1,$2,$3,$4)
                returning *
                `, [
                meuPedido.rows[0].id,
                item.produto_id,
                item.quantidade,
                produtoAtual.rows[0].preco
            ])
        })
      
        response.status(201).json({mensagem: 'Novo pedido criado com sucesso'})

    }
}


module.exports = PedidoController;