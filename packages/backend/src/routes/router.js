const express = require('express')
const ShortnerController = require('../controllers/shortner.controller')
const UserController = require('../controllers/user.controller')

const Router = express.Router()

Router.get('/short', ShortnerController.index)
Router.get('/short/:id', ShortnerController.getOne)
Router.post('/short', ShortnerController.store)
Router.put('/short/:id', ShortnerController.update)
Router.delete('/short/:id', ShortnerController.remove)
Router.post('/user', UserController.store)
Router.post('/auth', UserController.login)

module.exports = Router
