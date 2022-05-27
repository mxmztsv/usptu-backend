const db = require('../models')
const bcrypt = require("bcrypt")
const Employee = db.employees

/**
 * Функция сохранения сотрудника. Все аналогично как в departmentController
 */
const save = async (req, res) => {
    // Вытаскиваем поля из тела запроса
    const data = {
        Familiya: req.body.surname,
        Imya: req.body.name,
        Otchestvo: req.body.middleName,
        Data_Rozhdeniya: req.body.birthdate,
        Dolzhnost: req.body.position,
        Uchenaya_stepen: req.body.degree,
        Zvanie: req.body.rank,
        Data_priema: req.body.hiringDate,
        Stazh: req.body.experience,
        Id_podrazdeleniya: req.body.department,
        Login: req.body.login,
        Is_superuser: req.body.isSuperuser,
    }

    // Хэшируем пароль и добавляем в data
    data.Password = await bcrypt.hash(req.body.password, 3)

    try {
        let candidate = null
        if (req.body.id !== null && req.body.id !== undefined) {
            candidate = await Employee.findByPk(req.body.id)
        }
        if (candidate) {
            const employee = await Employee.update(data, {
                where: {
                    Id_prepodavatelya: req.body.id
                }
            })
        } else {
            try {
                const employee = await Employee.create(data)
            } catch (e) {
                return res.status(400).json({message: "Сотрудник с таким логином уже существует"})
            }
        }
        res.sendStatus(201)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }

}

/**
 * Функция удаления. Все аналогично как в departmentController
 */
const remove = async (req, res) => {
    try {
        const employee = await Employee.destroy({
            where: {
                "Id_prepodavatelya": req.body.id
            }
        })
        res.sendStatus(200)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

/**
 * Функция получения всех. Все аналогично как в departmentController
 */
const getAll = async (req, res) => {
    try {
        const employees = await Employee.findAll()
        res.status(200).send(employees)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

// Экспорт функций из модуля
module.exports = {
    save,
    remove,
    getAll
}
