const User = require('../models/User')
const authConfig = require('../config/auth') 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserService = require('../services/AuthService')

const AuthController = {
    async validate(request, response) {
        const user = request.user
        const logged = !!user

        return response.json({ logged, user })
    },

    async logout(request, response) {
        request.session.destroy()
        return response.status(204).send()
    },

    async jwt(request, response){
        const { userName, password } = request.body

        if (! userName || ! password) 
        return response.status(400).json({
            error: 'Username and password are required.'
        })
        
        try {            
            const user = await UserService.auth(userName, password)
            
            const token = UserService.getToken({ user })
            return response.json({ user, token })
        } catch (error) {
            return response.status(401).json({ error: error.message })
        }
    },

    async cookies(request, response) {
        const { userName, password } = request.body

        if (! userName || ! password) {
            return response.status(400).json({
                error: 'Username and password are required.'
            })
        }

        try {            
            const user = await UserService.auth(userName, password)

            request.session.user = user
            return response.json({ user })
        } catch (error) {
            return response.status(401).json({ error: error.message })
        }
    },
}

module.exports = AuthController