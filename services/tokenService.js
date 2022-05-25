const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '90d'})
    return {
        accessToken,
        refreshToken
    }
}

const validateAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    } catch (e) {
        return null
    }
}

const validateRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    } catch (e) {
        return null
    }
}

module.exports = {
    generateTokens,
    validateAccessToken,
    validateRefreshToken
}
