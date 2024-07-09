const {Router} = require('express');
const ProdutoController = require('../controllers/ProdutoController');


const produtosRoutes = new Router();
const produtoController = new ProdutoController

produtosRoutes.post('/', produtoController.criar.bind(produtoController))
produtosRoutes.get('/', produtoController.listar.bind(produtoController))
produtosRoutes.get('/:id', produtoController.listarPorId.bind(produtoController))

module.exports = produtosRoutes;