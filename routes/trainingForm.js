const express = require('express')
const TrainingFormController = require("../controllers/trainingFormController")
const auth = require('../middlewares/authMiddleware')
const router = express.Router()

/**
 * Пути к эндпоинтам формы повышения квалификации с указанием метода запроса, middleware и контроллера.
 */
router.post('/save', auth, TrainingFormController.save)
router.post('/remove', auth, TrainingFormController.remove)
router.get('/get-all-by-training-id/:id', auth, TrainingFormController.getAllByTrainingId)

module.exports = router

