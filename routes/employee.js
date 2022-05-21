const express = require('express');
const EmployeeController = require("../controllers/employeeController");
const router = express.Router();


router.post('/save', EmployeeController.save);
router.post('/remove', EmployeeController.remove);

module.exports = router;
