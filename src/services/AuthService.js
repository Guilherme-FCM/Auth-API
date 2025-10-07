const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const authConfig = require('../config/auth')

const User = require("../models/User")

const AuthService = {
    getToken(params = {}) {
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 60 
        })
    },
    async auth(userName, password) {
        const user = await User.findOne({ where: { userName } })
        if (!user) throw new Error('User not found.')

        const comparation = await bcrypt.compare(password, user.password)
        if (!comparation) throw new Error('Invalid password.')

        delete user.password
        return user
    }
}

module.exports = AuthService