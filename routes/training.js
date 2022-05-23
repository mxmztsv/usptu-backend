const express = require('express')
const TrainingController = require("../controllers/trainingController")
const router = express.Router()

router.post('/save', TrainingController.save)
router.post('/remove', TrainingController.remove)
router.get('/get-all-by-employee-id/:id', TrainingController.getAllByEmployeeId)

module.exports = router
