/**
 * Модель формы повышения квалификации.
 */
module.exports = (sequelize, DataTypes) => {

    const TrainingForm = sequelize.define("Forma povysheniya kvalifikacii", {
        Id_formy_PK: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Tematika: {
            type: "varchar(10)",
            allowNull: false
        },
        Forma_programmy_PK: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Zagruzhennaya_forma_programmy_PK: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Otchet: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Zagruzhenniy_otchet: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Naimenovanie_programmy_PK: {
            type: "varchar(30)",
            allowNull: false
        },
        Mesto_prohozhdeniya_PK: {
            type: "varchar(50)",
            allowNull: false
        },
        Izuchennye_voprosy: {
            type: "varchar(255)",
            allowNull: false
        },
        Rezultaty_PK: {
            type: "varchar(255)",
            allowNull: false
        },
        Izmeneniya_v_rabochih_programmy_disciplin: {
            type: "varchar(255)",
            allowNull: false
        },
        Izmenenie_v_rabochie_programmy_obrazovatelnyh_programm: {
            type: "varchar(255)",
            allowNull: false
        },
        Pererabotka_po_disciplinam: {
            type: "varchar(255)",
            allowNull: false
        },
        Pererabotka_dlya_obrazovatelnyh_programm: {
            type: "varchar(255)",
            allowNull: false
        },
        Razrabotka_APIM_po_disciplinam: {
            type: "varchar(255)",
            allowNull: false
        },
        Razrabotka_APIM_dlya_obrazovatelnyh_programm: {
            type: "varchar(255)",
            allowNull: false
        },
        Drugie_pokazateli_rezultatov_PK: {
            type: "varchar(50)",
            allowNull: false
        },
        Ocenka_soderzhaniya_programmy_obucheniya: {
            type: "varchar(30)",
            allowNull: false,
            validate: {
                isIn: [['Отлично', 'Хорошо', 'Удовлетворительно', 'Неудовлетворительно']]
            }
        },
        Ocenka_zayavlennoj_programmy: {
            type: "varchar(30)",
            allowNull: false,
            validate: {
                isIn: [['Отлично', 'Хорошо', 'Удовлетворительно', 'Неудовлетворительно']]
            }
        },
        Sootvetstvie_soderzhaniya_programmy: {
            type: "varchar(30)",
            allowNull: false,
            validate: {
                isIn: [['Соответствует', 'Не соответствует']]
            }
        },
        Ocenka_urovnya_organizacii_PK: {
            type: "varchar(30)",
            allowNull: false,
            validate: {
                isIn: [['Отлично', 'Хорошо', 'Удовлетворительно', 'Неудовлетворительно']]
            }
        },
        Celesoobraznost_napravleniya: {
            type: "varchar(30)",
            allowNull: false,
            validate: {
                isIn: [['Целесообразно', 'Нецелесообразно']]
            }
        },
        Data_protokola: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        Nomer_protokola: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Vypiska_iz_protokola: {
            type: "varchar(255)",
            allowNull: false
        },
        Postanovlenie_kafedry: {
            type: "varchar(255)",
            allowNull: false
        },
        Kommentarij_k_postanovleniyu: {
            type: "varchar(255)",
            allowNull: false
        },
        Prichiny_nizkoj_rezultativnosti: {
            type: "varchar(255)",
            allowNull: false
        },
        Predlozheniya_po_ustraneniyu: {
            type: "varchar(255)",
            allowNull: false
        },
    }, {
        freezeTableName: true
    })

    return TrainingForm

}
