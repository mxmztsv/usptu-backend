const express = require('express')
const EmployeeController = require("../controllers/employeeController")
const auth = require('../middlewares/authMiddleware')
const adminOnly = require('../middlewares/adminMiddleware')
const router = express.Router()

/**
 * Пути к эндпоинтам сотрудника с указанием метода запроса, middleware и контроллера.
 */
router.post('/save', auth, adminOnly, EmployeeController.save)
router.post('/remove', auth, adminOnly, EmployeeController.remove)
router.get('/get-all', auth, adminOnly, EmployeeController.getAll)

module.exports = router
