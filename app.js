/**
 * Главный файл проекта. (Но не точка входа, см. /bin/www)
 */


/**
 * Подключение всякого
 */
const express = require('express'); // Сам Express
const fileUpload = require('express-fileupload'); // Модуль для загрузки файлов
// Пути
const authRouter = require('./routes/auth');
const departmentRouter = require('./routes/department');
const employeeRouter = require('./routes/employee');
const trainingRouter = require('./routes/training');
const trainingFormRouter = require('./routes/trainingForm');
const internshipFormRouter = require('./routes/internshipForm');
const cors = require('cors')
const cookieParser = require("cookie-parser"); // Модуль для работы с куками

// Создаем Express приложение
const app = express();


const corsOptions = {
    // origin: 'http://localhost:3000',
    origin: ['http://localhost:3000', 'http://192.168.0.107:3000'],
    optionsSuccessStatus: 200,
    credentials: true
}
/**
 * Подцепляем всякие middleware - промежуточные функции-обработчики
 */
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload({
    createParentPath: true
}));

/**
 * Подцепляем роуты api
 */
app.use('/auth', authRouter);
app.use('/department', departmentRouter);
app.use('/employee', employeeRouter);
app.use('/training', trainingRouter);
app.use('/training-form', trainingFormRouter);
app.use('/internship-form', internshipFormRouter);

//Все, что в директории generated_docs и uploaded_docs, отдаем как статические файлы
app.use('/download/generated', express.static('./generated_docs'));
app.use('/download/uploaded', express.static('./uploaded_docs'));

module.exports = app;
