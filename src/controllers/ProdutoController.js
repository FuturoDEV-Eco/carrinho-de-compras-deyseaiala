const Database = require("../database/conexao");


class ProdutoController extends Database{
    async criar(request, response){
        try {
            const dados = request.body

            if(!dados.nome || !dados.categoria_id || !dados.preco){
                return response.status(400).json({mensagem: "Nome do produto e id da categoria são obrigatórios. Por favor complete os dados."})
            }

            await this.database.query(
                `INSERT INTO produtos
                (
                nome,
                quantidade,
                cor,
                voltagem,
                descricao,
                categoria_id,
                preco
                )
                values
                (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7
                )`, [dados.nome, dados.quantidade, dados.cor, dados.voltagem, dados.descricao, dados.categoria_id, dados.preco]
            )

            console.log(dados)
            response.status(201).json({mensagem: 'Novo produto cadastrado com sucesso'})


        } catch {
            response.status(500).json({mensagem: "Erro ao cadastrar novo produto"})
        }
    }

    async listar(request, response){
        try {
            const dados = request.query

            if(dados.nome){
                const produtos = await this.database.query('SELECT * from produtos where nome ilike $1', [`%${dados.nome}$`])
                response.status(200).json(produtos.rows)
            } else {
                const produtos = await this.database.query('SELECT * from produtos')
                response.status(200).json(produtos.rows)
            }
            
        } catch {
            response.status(500).json({mensagem: "Erro"})
        }
    }


        async listarPorId(request, response){
            try {
                const id = request.params.id
    
                const produto = await this.database.query(
                    `SELECT p.nome, p.quantidade, p.cor, p.voltagem, p.descricao, c.nome_categoria, p.preco 
                    FROM produtos p INNER JOIN categorias c ON p.categoria_id = c.id 
                    WHERE p.id = $1`, [id])
    
                if(produto.rows.legth === 0){
                    return response.status(404).json({mensagem: "Não foi encontrado nenhum produto"})
                }
    
                response.status(200).json(produto.rows[0])    
    
            } catch {
                response.status(500).json({ mensagem: 'Erro' })
            }
        }
}


module.exports = ProdutoController;