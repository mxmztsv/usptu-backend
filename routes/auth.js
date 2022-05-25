const express = require('express')
const AuthController = require("../controllers/authController")
const auth = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/sign-in', AuthController.signIn)
router.post('/sign-out', auth, AuthController.signOut)

module.exports = router
