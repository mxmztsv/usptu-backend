const express = require('express')
const InternshipFormController = require("../controllers/internshipFormController")
const auth = require('../middlewares/authMiddleware')
const router = express.Router()

/**
 * Пути к эндпоинтам стажировки с указанием метода запроса, middleware и контроллера.
 */
router.post('/save', auth, InternshipFormController.save)
router.post('/remove', auth, InternshipFormController.remove)
router.get('/get-all-by-training-id/:id', auth, InternshipFormController.getAllByTrainingId)

module.exports = router
