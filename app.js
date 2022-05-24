var express = require('express');
var authRouter = require('./routes/auth');
var departmentRouter = require('./routes/department');
var employeeRouter = require('./routes/employee');
var trainingRouter = require('./routes/training');
var trainingFormRouter = require('./routes/trainingForm');
var internshipFormRouter = require('./routes/internshipForm');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/department', departmentRouter);
app.use('/employee', employeeRouter);
app.use('/training', trainingRouter);
app.use('/training-form', trainingFormRouter);
app.use('/internship-form', internshipFormRouter);

module.exports = app;
