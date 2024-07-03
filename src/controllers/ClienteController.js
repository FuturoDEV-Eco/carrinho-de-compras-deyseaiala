const Database = require("../database/conexao");


class ClienteController extends Database{
    async criar(request, response){
        try {
            const dados = request.body

            if(!dados.nome || !dados.email || !dados.cpf || !dados.contato){
                return response.status(400).json({mensagem: "Nome, email, CPF e contato são obrigatórios. Por favor complete os dados."})
            }

            const novoCliente = await this.database.query(
                'SELECT * from clientes where email = $1 or cpf = $2',
                [dados.email, dados.cpf]
            )

            if(novoCliente.rowCount > 0){
                return response.status(400).json({mensagem: "Este email ou CPF já foi cadastrado anteriormente. Por favor insira um email ou CPF válido"})
            }


            await this.database.query(
                `INSERT INTO clientes
                (
                nome,
                email,
                cpf,
                contato
                )
                values
                (
                $1,
                $2,
                $3,
                $4
                )`, [dados.nome, dados.email, dados.cpf, dados.contato]
            )

            console.log(dados)
            response.status(201).json({mensagem: 'Novo cliente cadastrado com sucesso'})


        } catch {
            response.status(500).json({mensagem: "Erro ao cadastrar novo cliente"})
        }
    }


}

module.exports = ClienteController;