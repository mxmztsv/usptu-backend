const express = require('express')
const InternshipFormController = require("../controllers/internshipFormController")
const router = express.Router()

router.post('/save', InternshipFormController.save)
router.post('/remove', InternshipFormController.remove)
router.get('/get-all-by-training-id/:id', InternshipFormController.getAllByTrainingId)

module.exports = router
