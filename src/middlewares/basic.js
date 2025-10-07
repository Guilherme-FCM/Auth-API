module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    const base64Credentials = authHeader && authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [userName, password] = credentials.split(':')

    req.user = { userName, password }

    return next()
}