/**
 * Модель сотрудника.
 */
module.exports = (sequelize, DataTypes) => {

    const Employee = sequelize.define("Sotrudnik", {
        Id_prepodavatelya: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Familiya: {
            type: "varchar(30)",
            allowNull: false
        },
        Imya: {
            type: "varchar(30)",
            allowNull: false
        },
        Otchestvo: {
            type: "varchar(30)",
            allowNull: false
        },
        Data_Rozhdeniya: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Dolzhnost: {
            type: "varchar(50)",
            allowNull: false
        },
        Uchenaya_stepen: {
            type: "varchar(30)",
            allowNull: false,
            validate: {
                isIn: [['Кандидат наук', 'Доктор наук']]
            }
        },
        Zvanie: {
            type: "varchar(30)",
            allowNull: false,
            validate: {
                isIn: [['Доцент', 'Профессор']]
            }
        },
        Data_priema: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Stazh: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Login: {
            type: "varchar(150)",
            allowNull: false
        },
        Password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Is_superuser: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },


    }, {
        freezeTableName: true
    })

    return Employee

}
