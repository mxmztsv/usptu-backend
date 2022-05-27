const db = require('../models') // Подключение модуля db
const Department = db.departments // Получение модели Department

/**
 * Функция сохранения подразделения.
 */
const save = async (req, res) => {
    // Вытаскиваем поля из тела запроса
    const data = {
        Polnoe_nazvanie: req.body.title,
        Abbreviatura: req.body.abbreviation,
        Familiya: req.body.surname,
        Imya: req.body.name,
        Otchestvo: req.body.middleName,
    }

    try {
        let candidate = null
        if (req.body.id !== null && req.body.id !== undefined) {
            // Если поле id не пустое, значит подразумевается обновление полей существующего подразделения,
            // берем его из БД по id
            candidate = await Department.findByPk(req.body.id)
        }
        if (candidate) {
            // Если такое подразделения нашлось, обновляем его в БД
            const department = await Department.update(data, {
                where: {
                    Id_podrazdeleniya: req.body.id
                }
            })
        } else {
            // Если его нет, значит подразумевается создание нового подразделения
            try {
                const department = await Department.create(data)
            } catch (e) {
                return res.status(400).json({message: "Подразделение с таким названием уже существует"})
            }
        }
        // Возвращаем в ответ код 201 (Created)
        res.sendStatus(201)
    } catch (e) {
        console.error(e.message)
        // Если ловим ошибку, возвращаем 500 (Internal server error)
        res.sendStatus(500)
    }

}

/**
 * Функция удаления подразделения.
 */
const remove = async (req, res) => {
    try {
        // Получаем подразделение по id из БД
        const department = await Department.destroy({
            where: {
                "Id_podrazdeleniya": req.body.id // id из тела запроса
            }
        })
        // Возвращаем в ответ код 200 (ОК)
        res.sendStatus(200)
    } catch (e) {
        console.error(e.message)
        // Если ловим ошибку, возвращаем 500 (Internal server error)
        res.sendStatus(500)
    }
}

/**
 * Функция получения всех подразделений.
 */
const getAll = async (req, res) => {
    try {
        // Получаем все подразделения из БД
        const departments = await Department.findAll()
        // Возвращаем в ответ код 200 (ОК) и подразделения
        res.status(200).send(departments)
    } catch (e) {
        console.error(e.message)
        // Если ловим ошибку, возвращаем 500 (Internal server error)
        res.sendStatus(500)
    }
}

// Экспорт функций из модуля
module.exports = {
    save,
    remove,
    getAll
}
