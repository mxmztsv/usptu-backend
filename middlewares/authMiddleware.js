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

        // Достаем токен из поля authorization заголовка запроса
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

        // Если токена нет, значит пользователь не авторизован, возвращаем статус-код 401 (Not authorized)
        if (!token) {
            return res.status(401).json({ message: 'Пользователь не авторизован' })
        }

        // Валидируем токен и получаем его содержимое (или null, если токен не валиден)
        req.user = TokenService.validateAccessToken(token)

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
