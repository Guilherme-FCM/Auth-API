const express = require('express')
const UserController = require('./controllers/UserController')
const authMiddleware = require('./middlewares/auth')

const routes = express.Router()
routes.route('/users')
    .get(UserController.index)
    .post(UserController.create)
    .put(authMiddleware, UserController.update)
    .delete(authMiddleware, UserController.remove)

routes.get('/users/:userName', UserController.show)
routes.post('/authenticate', UserController.auth)
routes.put('/password', authMiddleware, UserController.changePassword)

module.exports = routes