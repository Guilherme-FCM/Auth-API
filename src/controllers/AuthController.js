const User = require('../models/User')
const authConfig = require('../config/auth') 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const getToken = (params = {}) => jwt.sign(
    params, authConfig.secret, 
    { expiresIn: 86400 }
)

const AuthController = {
    async validate(request, response) {
        return response.json({ logged: true, user: request.user })
    },

    async jwt(request, response){
        const { userName, password } = request.body

        if (! userName || ! password) 
        return response.status(400).json({
            error: 'Username and password are required.'
        })
        
        const user = await User.findOne({ where: { userName } })
        if (! user) return response.json({ 
            error: 'User not found.' 
        })

        let comparation = await bcrypt.compare(password, user.password)
        if (! comparation) return response.json({ 
            error: 'Invalid password.' 
        }) 
        
        user.password = undefined
        const token = getToken({ user })
        return response.json({ user, token })
    },
}

module.exports = AuthController