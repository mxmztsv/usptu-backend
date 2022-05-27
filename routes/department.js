const express = require('express')
const DepartmentController = require("../controllers/departmentController")
const auth = require('../middlewares/authMiddleware')
const adminOnly = require('../middlewares/adminMiddleware')
const router = express.Router()

/**
 * Пути к эндпоинтам подразделения с указанием метода запроса, middleware и контроллера.
 */
router.post('/save', auth, adminOnly, DepartmentController.save)
router.post('/remove', auth, adminOnly, DepartmentController.remove)
router.get('/get-all', auth, adminOnly, DepartmentController.getAll)

module.exports = router
