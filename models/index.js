const {Sequelize, DataTypes} = require('sequelize') // Подключаем пакет ORM Sequelize
require('dotenv').config() // Для доступа к переменным окружения

// Инициализация БД с параметрами из конфига .env
// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: 'postgres'
//     }
// )
const sequelize = new Sequelize(
    'usptu',
    'postgres',
    'root',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
)

// Проверка подключения к БД
sequelize.authenticate().then(() => {
    console.log("Connected to DB")
}).catch(err => {
    console.error('DB connection error: ' + err)
})

// Создаем объект db и кладем туда модуль Sequelize и модели
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.departments = require('./departmentModel.js')(sequelize, DataTypes)
db.employees = require('./employeeModel')(sequelize, DataTypes)
db.trainings = require('./trainingModel')(sequelize, DataTypes)
db.trainingForms = require('./trainingFormModel')(sequelize, DataTypes)
db.internshipForms = require('./internshipFormModel')(sequelize, DataTypes)

// Синхронизация с БД
db.sequelize.sync()
    .then(() => {
        console.log('The database is synchronized')
    })

// Relations
db.employees.belongsTo(db.departments, {
    foreignKey: 'Id_podrazdeleniya'
})

db.trainings.belongsTo(db.employees, {
    foreignKey: 'Id_prepodavatelya'
})

db.trainingForms.belongsTo(db.trainings, {
    foreignKey: 'Id_povysheniya_kvalifikacii'
})

db.internshipForms.belongsTo(db.trainings, {
    foreignKey: 'Id_povysheniya_kvalifikacii'
})

// Экспорт объекта db
module.exports = db
