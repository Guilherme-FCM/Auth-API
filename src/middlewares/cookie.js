module.exports = (req, res, next) => {
    if (!req.session.user) return res.status(401).json({
        message: "Not authenticated"
    });

    req.user = req.session.user
    return next()
}