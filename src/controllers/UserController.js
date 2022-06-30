const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth') 

const getToken = (params = {}) => jwt.sign(
    params, 
    authConfig.secret, 
    { expiresIn: 86400 }
)

const UserController = {
    async show(request, response){
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        })
        return response.json(users)
    },

    async create(request, response){
        let {userName, password, firstName, lastName, email} = request.body

        const user = await User.create({
            userName, password, firstName, lastName, email 
        })

        user.password = undefined
        const token = getToken({ id: user.userName })
        return response.json({ user, token })
    },

    async update(){},

    async remove(){},

    async auth(request, response){
        const { userName, password } = request.body
        
        const user = await User.findOne({ 
            where: { userName } 
        })

        if (! user) return response.json({ error: 'User not found.' })

        let comparation = await bcrypt.compare(password, user.password)
        if (! comparation) return response.json({ error: 'Invalid password.' }) 
        
        user.password = undefined
        const token = getToken({ id: user.userName })
        return response.json({ user, token })
    }
}

module.exports = UserController