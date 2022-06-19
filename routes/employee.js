const express = require('express')
const EmployeeController = require("../controllers/employeeController")
const auth = require('../middlewares/authMiddleware')
const adminOnly = require('../middlewares/adminMiddleware')
const router = express.Router()

/**
 * Пути к эндпоинтам сотрудника с указанием метода запроса, middleware и контроллера.
 */
router.post('/save', EmployeeController.save)
router.post('/remove', auth, adminOnly, EmployeeController.remove)
router.get('/get-all', auth, adminOnly, EmployeeController.getAll)
router.get('/get-by-training-period', auth, adminOnly, EmployeeController.getByTrainingPeriod)
router.get('/get-by-period-without-training', auth, adminOnly, EmployeeController.getByPeriodWithoutTraining)
router.get('/get-by-id/:id', auth, EmployeeController.getEmployeeById)

module.exports = router
