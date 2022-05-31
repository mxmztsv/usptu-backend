const express = require('express')
const TrainingController = require("../controllers/trainingController")
const auth = require('../middlewares/authMiddleware')
const ownerOnly = require('../middlewares/ownerMiddleware')
const DocsController = require("../controllers/docsController");
const router = express.Router()

/**
 * Пути к эндпоинтам повышения квалификации с указанием метода запроса, middleware и контроллера.
 */
router.post('/save', auth, ownerOnly, TrainingController.save)
router.post('/remove', auth, ownerOnly, TrainingController.remove)
router.get('/get-all-by-employee-id/:id', auth, TrainingController.getAllByEmployeeId)
router.get('/get-by-id/:id', auth, TrainingController.getByTrainingId)
router.post('/generate-document', auth, DocsController.generateDocument)
router.post('/upload-document', DocsController.uploadReport)

module.exports = router
