/**
 * Модель повышения квалификации.
 */
module.exports = (sequelize, DataTypes) => {

    // todo: delete form on cascade

    const Training = sequelize.define("Povyshenie kvalifikacii", {
        Id_povysheniya_kvalifikacii: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Data_nachala: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        Data_zaversheniya: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        Otchet: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Zagruzhenniy_otchet: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Forma_povysheniya_kvalifikacii: {
            type: "varchar(22)",
            allowNull: false,
            validate: {
                isIn: [['Стажировка', 'Повышение квалификации']]
            }
        }
    }, {
        freezeTableName: true
    })

    return Training

}
