const express = require('express')
const EmployeeController = require("../controllers/employeeController")
const router = express.Router()


router.post('/save', EmployeeController.save)
router.post('/remove', EmployeeController.remove)
router.get('/get-all', EmployeeController.getAll)

module.exports = router
