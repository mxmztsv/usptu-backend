const {Sequelize, DataTypes} = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
)

sequelize.authenticate().then(() => {
    console.log("Connected to DB")
}).catch(err => {
    console.error('DB connection error: ' + err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.departments = require('./departmentModel.js')(sequelize, DataTypes)
db.employees = require('./employeeModel')(sequelize, DataTypes)
db.trainings = require('./trainingModel')(sequelize, DataTypes)
db.trainingForms = require('./trainingFormModel')(sequelize, DataTypes)
db.internshipForms = require('./internshipFormModel')(sequelize, DataTypes)

db.sequelize.sync()
    .then(() => {
        console.log('The database is synchronized')
    })

//Relations
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

module.exports = db
