const {Router} = require('express');
const PedidoController = require('../controllers/PedidoController');


const pedidosRoutes = new Router();
const pedidoController = new PedidoController();

pedidosRoutes.post('/', pedidoController.criar.bind(pedidoController))


module.exports = pedidosRoutes;