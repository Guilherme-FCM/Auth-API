const User = require('../models/User')
const authConfig = require('../config/auth') 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const getToken = (params = {}) => jwt.sign(
    params, authConfig.secret, 
    { expiresIn: 86400 }
)

const UserController = {
    async index(request, response){
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        })
        return response.json(users)
    },

    async show(request, response){
        const { userName } = request.params

        const user = await User.findOne({
            where: { userName },
            attributes: { exclude: ['password'] }
        })

        if (! user) return response.json({ 
            error: 'User not found.' 
        })

        return response.json(user)
    },

    async create(request, response){
        let {userName, password, firstName, lastName, email} = request.body

        const user = await User.findOne({ where: { userName } })
        if (user) return response.json({
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
        let {firstName, lastName, email} = request.body

        try {
            const updatedUser = await User.update(
                { firstName, lastName, email }, 
                { where: { userName: request.userName } }
            )

            return response.json({ success: updatedUser == 1 })
        } catch (error) {
            return response.status(400).json({
                error: `Column ${error.parent.column} do not can be null.`
            })
        }
    },

    async remove(request, response){
        const { userName } = request
        const { password } = request.body

        const user = await User.findOne({ where: { userName } })

        let comparation = await bcrypt.compare(password, user.password)
        if (! comparation) return response.json({ 
            error: 'Invalid password.' 
        }) 

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
    },

    async changePassword(request, response){
        const { userName } = request
        const { oldPassword, newPassword } = request.body

        if (! oldPassword || ! newPassword) 
        return response.status(400).json({
            error: 'oldPassword and newPassword are required.'
        })

        const user = await User.findOne({ where: { userName } })

        let comparation = await bcrypt.compare(oldPassword, user.password)
        if (! comparation) return response.json({ 
            error: 'Invalid password.' 
        }) 

        const hashedPassword = await bcrypt.hash(newPassword, 8)
        const updatedUser = await User.update(
            { password: hashedPassword }, 
            { where: { userName: request.userName } }
        )
        return response.json({ success: updatedUser == 1 })
    }
}

module.exports = UserController