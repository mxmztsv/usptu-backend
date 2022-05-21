module.exports = (sequelize, DataTypes) => {

    const InternshipForm = sequelize.define("Forma stazhirovki", {
        Id_formy_stazhirovki: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Tematika: {
            type: "varchar(30)",
            allowNull: false
        },
        Mesto: {
            type: "varchar(30)",
            allowNull: false
        },
        Forma_programmy_stazhirovki: {
            type: "varchar(30)",
            allowNull: false
        },
        Otchet: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Naimenovanie_organizacii: {
            type: "varchar(150)",
            allowNull: false
        },
        Sistemnoe_izlozhenie: {
            type: "varchar(150)",
            allowNull: false
        },
        Familiya_rukovoditelya: {
            type: "varchar(30)",
            allowNull: false
        },
        Imya_rukovoditelya: {
            type: "varchar(30)",
            allowNull: false
        },
        Otchestvo_rukovoditelya: {
            type: "varchar(30)",
            allowNull: false
        },
    }, {
        freezeTableName: true
    })

    return InternshipForm

}
