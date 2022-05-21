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

db.sequelize.sync()
    .then(() => {
        console.log('Re-sync is done')
    })

//Relations
// db.departments.hasMany(db.employees, {
//     foreignKey: 'Id_podrazdeleniya'
// })

db.employees.belongsTo(db.departments, {
    foreignKey: 'Id_podrazdeleniya'
})

module.exports = db
