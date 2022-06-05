const TokenService = require("../services/tokenService");

/**
 * Middleware - функция, которая встраивается в pipeline запроса и проверяет авторизацию (валидирует токен).
 */
module.exports =  (req, res, next) => {

    // Запросы метода options пропускаем без проверки, они сервисные
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        // Достаем токен из куки
        const {accessToken} = req.cookies

        // Если токена нет, значит пользователь не авторизован, возвращаем статус-код 401 (Not authorized)
        if (!accessToken) {
            return res.status(401).json({ message: 'Пользователь не авторизован' })
        }

        // Валидируем токен и получаем его содержимое (или null, если токен не валиден)
        req.user = TokenService.validateAccessToken(accessToken)

        if (req.user) {
            // Если получили содержимое, значит токен валиден, пропускаем запрос дальше по пайплайну
            next()
        } else {
            // Если там null, возвращаем статус-код 401 (Not authorized)
            res.status(401).json({ message: 'Пользователь не авторизован' })
        }


    } catch (e) {
        // При ошибке возвращаем статус-код 401 (Not authorized)
        res.status(401).json({ message: 'Пользователь не авторизован' })
    }
}
