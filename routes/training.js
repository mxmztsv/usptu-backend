const express = require('express')
const TrainingController = require("../controllers/trainingController")
const auth = require('../middlewares/authMiddleware')
const router = express.Router()

/**
 * Пути к эндпоинтам повышения квалификации с указанием метода запроса, middleware и контроллера.
 */
router.post('/save', auth, TrainingController.save)
router.post('/remove', auth, TrainingController.remove)
router.get('/get-all-by-employee-id/:id', auth, TrainingController.getAllByEmployeeId)

module.exports = router
