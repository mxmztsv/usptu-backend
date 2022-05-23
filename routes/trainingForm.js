const express = require('express')
const TrainingFormController = require("../controllers/trainingFormController")
const router = express.Router()

router.post('/save', TrainingFormController.save)
router.post('/remove', TrainingFormController.remove)
router.get('/get-all-by-training-id/:id', TrainingFormController.getAllByTrainingId)

module.exports = router