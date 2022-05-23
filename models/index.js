const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('usptu', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(() => {
    console.log("Connected to DB")
}).catch( err => {
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
