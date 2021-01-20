const express = require('express')
const ShortnerController = require('../controllers/shortner.controller');

const Router = express.Router();

Router.get('/short', ShortnerController.index);
Router.get('/short/:id', ShortnerController.getOne)
Router.post('/short', ShortnerController.store)
Router.put('/short/:id', ShortnerController.update)
Router.delete('/short/:id', ShortnerController.remove)

module.exports = Router;