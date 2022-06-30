const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

module.exports = (req, res, next) => {
    const token = req.header.authorization

    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if (error) return res.status(401).json({ error: 'Invalid token.' })
        req.userName = decoded.id
        return next();
    })
}