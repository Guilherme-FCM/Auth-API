const express = require('express')
const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')
const JwtMiddleware = require('./middlewares/jwt')
const BasicAuthMiddleware = require('./middlewares/basic')

const routes = express.Router()

routes.get('/', (req, res) => { res.send('Auth-API') })

routes.route('/users')
    .get(UserController.index)
    .post(UserController.create)
    .put(JwtMiddleware, UserController.update)
    .delete(JwtMiddleware, UserController.remove)

routes.get('/users/:userName', UserController.show)
routes.put('/users/password', JwtMiddleware, UserController.changePassword)
    
routes.post('/jwt/login', AuthController.jwt)
routes.post('/jwt/validate', JwtMiddleware, AuthController.validate)

routes.post('/basicAuth/validate', BasicAuthMiddleware, AuthController.validate)


module.exports = routes