const express = require('express')
const AuthController = require("../controllers/authController") // Подключение контроллера
const auth = require('../middlewares/authMiddleware') // Подключение middleware
const router = express.Router()

/**
 * Пути к эндпоинтам авторизации с указанием метода запроса, middleware и контроллера.
 */
router.post('/sign-in', AuthController.signIn)
router.post('/sign-out', auth, AuthController.signOut)

module.exports = router
