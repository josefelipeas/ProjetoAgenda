const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/middleware');

//Rotas da home
route.get('/', homeController.index);

//Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/enter', loginController.enter);
route.get('/login/logout', loginController.logout);

//Rotas de contato
route.get('/contato/index', loginRequired, contatoController.index);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);
route.post('/contato/register', loginRequired, contatoController.register);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);

module.exports = route;