const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * Функция генерации jwt токенов. Принимает payload - то что нужно положить в токен
 */
const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '90d'}) //мб не будем использовать...
    return {
        accessToken,
        refreshToken
    }
}

/**
 * Функция валидации access token.
 */
const validateAccessToken = (token) => {
    try {
        // Возвращаем содержимое токена или null, если токен не валиден
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    } catch (e) {
        return null
    }
}

// Экспорт функций из модуля
module.exports = {
    generateTokens,
    validateAccessToken
}
