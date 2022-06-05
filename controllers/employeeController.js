const db = require('../models')
const bcrypt = require("bcrypt")
const DateService = require("../services/dateService");
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
        Id_podrazdeleniya: req.body.department,
        Login: req.body.login,
        Is_superuser: req.body.isSuperuser,
    }

    if (req.body.password !== undefined && req.body.password !== null && req.body.password.trim() !== '') {
        // Если передан пароль, то хэшируем пароль и добавляем в data
        console.log('pass', req.body.password)
        data.Password = await bcrypt.hash(req.body.password, 3)
    }

    // Устанавливаем стаж в годах
    data.Stazh = DateService.getExperienceByHiringDate(req.body.hiringDate)

    console.log(data)

    try {
        let candidate = null
        let employee
        if (req.body.id !== null && req.body.id !== undefined) {
            candidate = await Employee.findByPk(req.body.id)
        }
        if (candidate) {
            employee = await Employee.update(data, {
                where: {
                    Id_prepodavatelya: req.body.id
                }
            })
            // Получаем обновленного сотрудника из БД
            employee = await Employee.findByPk(req.body.id)
        } else {
            try {
                employee = await Employee.create(data)
            } catch (e) {
                console.error(e.message)
                return res.status(400).json({message: "Сотрудник с таким логином уже существует"})
            }
        }
        console.log(employee)
        res.status(201).json(employee)
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
 * Функция получения сотрудника по id. Все аналогично как в departmentController
 */
const getEmployeeById = async (req, res) => {
    try {
        // Получаем подразделение из БД
        const employee = await Employee.findByPk(req.params.id)
        // Возвращаем в ответ код 200 (ОК) и подразделение
        res.status(200).send(employee)
    } catch (e) {
        console.error(e.message)
        // Если ловим ошибку, возвращаем 500 (Internal server error)
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
    getAll,
    getEmployeeById
}
