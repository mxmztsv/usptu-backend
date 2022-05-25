const express = require('express')
const TrainingFormController = require("../controllers/trainingFormController")
const router = express.Router()

router.post('/save', TrainingFormController.save)
router.post('/remove', TrainingFormController.remove)
router.get('/get-all-by-training-id/:id', TrainingFormController.getAllByTrainingId)
router.post('/generate-document', TrainingFormController.generateDocument)
router.post('/upload-report', TrainingFormController.uploadReport)

module.exports = router

