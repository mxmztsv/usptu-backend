const express = require('express')
const EmployeeController = require("../controllers/employeeController")
const auth = require('../middlewares/authMiddleware')
const router = express.Router()

/**
 * Пути к эндпоинтам сотрудника с указанием метода запроса, middleware и контроллера.
 */
router.post('/save', auth, EmployeeController.save)
router.post('/remove', auth, EmployeeController.remove)
router.get('/get-all', auth, EmployeeController.getAll)

module.exports = router
