const express = require('express')
const UserController = require('./controllers/UserController')
const authMiddleware = require('./middlewares/auth')

const routes = express.Router()

routes.route('/users')
    .get(UserController.show)
    .post(UserController.create)
    .put(authMiddleware, UserController.update)
    .delete(authMiddleware, UserController.remove)

routes.post('/authenticate', UserController.auth)

module.exports = routes