
/**
 * Модель подразделения.
 */
module.exports = (sequelize, DataTypes) => {

    const Department = sequelize.define("Podrazdelenie", {
        Id_podrazdeleniya: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Polnoe_nazvanie: {
            type: "varchar(60)",
            allowNull: false,
            unique: true
        },
        Abbreviatura: {
            type: "varchar(12)",
            allowNull: false,
            unique: true
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

    }, {
        freezeTableName: true
    })

    return Department

}
