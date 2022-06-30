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

        let existsUserName = await User.findOne({
            where: { userName }
        })
        if (existsUserName) return response.json({
            error: 'User alredy exists.'
        })

        try {
            const user = await User.create({
                userName, password, firstName, lastName, email 
            })

            user.password = undefined
            const token = getToken({ id: user.userName })
            return response.json({ user, token })
        } catch (error) {
            return response.status(400).json({
                error: `Column ${error.parent.column} is required.`
            })
        }
    },

    async update(request, response){
        let {password, firstName, lastName, email} = request.body

        try {
            const updatedUser = await User.update(
                { password, firstName, lastName, email }, 
                { where: { userName: request.userName } }
            );

            return response.json({ success: updatedUser == 1 })
        } catch (error) {
            return response.status(400).json({
                error: `Column ${error.parent.column} do not can be null.`
            })
        }
    },

    async remove(request, response){
        const deletedUser = await User.destroy({
            where: { userName: request.userName }
        })

        return response.json({ success: deletedUser === 1 })
    },

    async auth(request, response){
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
        const token = getToken({ id: user.userName })
        return response.json({ user, token })
    }
}

module.exports = UserController