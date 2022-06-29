const User = require('../models/User')

module.exports = {
    async show(request, response){
        const users = await User.findAll()
        return response.json(users)
    }
}