const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if (error) return res.status(401).json({ message: 'Invalid token.', error })
        req.user = decoded.user
        return next();
    })
}