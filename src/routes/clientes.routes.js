const {Router} = require('express');
const ClienteController = require('../controllers/ClienteController');

const clientesRoutes = new Router();
const clienteController = new ClienteController();

clientesRoutes.post('/', clienteController.criar.bind(clienteController))


module.exports = clientesRoutes;