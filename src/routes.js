const express = require('express')
const UserController = require('./controllers/UserController')
const authMiddleware = require('./middlewares/auth')

const routes = express.Router()

routes.get('/users', UserController.show)
routes.post('/users', UserController.create)
routes.put('/users', UserController.update)
routes.delete('/users', UserController.remove)
routes.post('/authenticate', UserController.auth)

module.exports = routes