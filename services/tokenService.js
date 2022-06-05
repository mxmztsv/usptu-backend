const jwt = require('jsonwebtoken')
const {JWT_ACCESS_SECRET} = require("../config");

/**
 * Функция генерации jwt токенов. Принимает payload - то что нужно положить в токен
 */
const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: '90d'})
    return {
        accessToken
    }
}

/**
 * Функция валидации access token.
 */
const validateAccessToken = (token) => {
    try {
        // Возвращаем содержимое токена или null, если токен не валиден
        return jwt.verify(token, JWT_ACCESS_SECRET)
    } catch (e) {
        return null
    }
}

// Экспорт функций из модуля
module.exports = {
    generateToken,
    validateAccessToken
}
