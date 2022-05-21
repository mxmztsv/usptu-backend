module.exports = (sequelize, DataTypes) => {

    const Training = sequelize.define("Povyshenie kvalifikacii", {
        Id_povysheniya_kvalifikacii: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Data_nachala: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Data_zaversheniya: {
            type: DataTypes.DATE,
            allowNull: false
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
