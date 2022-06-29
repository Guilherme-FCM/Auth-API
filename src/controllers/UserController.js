const User = require('../models/User')

const UserController = {
    async show(request, response){
        const config = {
            attributes: {
                exclude: ['password']
            }
        }
        const users = await User.findAll(config)
        return response.json(users)
    },

    async create(request, response){
        let {userName, password, firstName, lastName, email} = request.body

        const user = await User.create({
            userName, password, firstName, lastName, email 
        })
        return response.json(user)
    }
}

module.exports = UserController