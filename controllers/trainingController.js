const db = require('../models')
const Training = db.trainings

/**
 * Функция сохранения. Все аналогично как в departmentController
 */
const save = async (req, res) => {
    const data = {
        Id_povysheniya_kvalifikacii: req.body.trainingId,
        Id_prepodavatelya: req.body.employeeId,
        Data_nachala: req.body.startDate,
        Data_zaversheniya: req.body.endDate,
        Forma_povysheniya_kvalifikacii: req.body.trainingType,
    }

    try {
        let candidate = null
        if (req.body.trainingId !== null && req.body.trainingId !== undefined) {
            candidate = await Training.findByPk(req.body.trainingId)
        }
        if (candidate) {
            const training = await Training.update(data, {
                where: {
                    Id_povysheniya_kvalifikacii: req.body.trainingId
                }
            })
        } else {
            const training = await Training.create(data)
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
        const training = await Training.destroy({
            where: {
                "Id_povysheniya_kvalifikacii": req.body.id
            }
        })
        res.sendStatus(200)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

/**
 * Функция получения всех повышений квалификации по id сотрудника. Все аналогично как в departmentController
 */
const getAllByEmployeeId = async (req, res) => {
    try {
        const trainings = await Training.findAll({
            where: {
                Id_prepodavatelya: req.params.id
            }
        })
        res.status(200).send(trainings)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

// Экспорт модулей
module.exports = {
    save,
    remove,
    getAllByEmployeeId
}
