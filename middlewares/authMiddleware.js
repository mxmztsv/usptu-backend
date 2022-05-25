const TokenService = require("../services/tokenService");

module.exports =  (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({ message: 'Пользователь не авторизован' })
        }

        req.user = TokenService.validateAccessToken(token)
        next()

    } catch (e) {
        res.status(401).json({ message: 'Пользователь не авторизован' })
    }
}
