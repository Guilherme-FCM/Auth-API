const express = require('express')
const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')
const JwtMiddleware = require('./middlewares/jwt')
const CookieAuthMiddleware = require('./middlewares/cookie')
const BasicAuthMiddleware = require('./middlewares/basic')

const routes = express.Router()

// MAIN ROUTE //
routes.get('/', (req, res) => { res.send('Auth-API') })

// USER ROUTES //
routes.route('/users')
    .get(UserController.index)
    .post(UserController.create)
    .put(JwtMiddleware, UserController.update)
    .delete(JwtMiddleware, UserController.remove)

routes.get('/users/:userName', UserController.show)
routes.put('/users/password', JwtMiddleware, UserController.changePassword)

// JWT AUTH ROUTES //
    
routes.post('/jwt/login', AuthController.jwt)
routes.post('/jwt/validate', JwtMiddleware, AuthController.validate)

// BASIC AUTH ROUTES //

routes.post('/basic/validate', BasicAuthMiddleware, AuthController.validate)

// COOKIES SESSION ROUTES //

routes.post('/cookies/login', AuthController.cookies)
routes.post('/cookies/validate', CookieAuthMiddleware, AuthController.validate)


module.exports = routes