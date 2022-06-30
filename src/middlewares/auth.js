const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if (error) return res.status(401).json({ message: 'Invalid token.', error })
        req.userName = decoded.id
        return next();
    })
}