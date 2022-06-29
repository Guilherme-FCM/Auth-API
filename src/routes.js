const express = require('express')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.get('/users', UserController.show)

module.exports = routes