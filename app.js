var express = require('express');
var authRouter = require('./routes/auth');
var departmentRouter = require('./routes/department');
var employeeRouter = require('./routes/employee');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/department', departmentRouter);
app.use('/employee', employeeRouter);

module.exports = app;
