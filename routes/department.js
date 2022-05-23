const express = require('express')
const DepartmentController = require("../controllers/departmentController")
const router = express.Router()

router.post('/save', DepartmentController.save)
router.post('/remove', DepartmentController.remove)
router.get('/get-all', DepartmentController.getAll)

module.exports = router
