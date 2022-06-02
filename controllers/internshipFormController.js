const db = require('../models')
const InternshipForm = db.internshipForms

/**
 * Функция сохранения. Все аналогично как в departmentController
 */
const save = async (req, res) => {
    const data = {
        Id_formy_stazhirovki: req.body.formId,
        Id_povysheniya_kvalifikacii: req.body.trainingId,
        Tematika: req.body.topic,
        Mesto: req.body.location,
        Naimenovanie_organizacii: req.body.companyName,
        Sistemnoe_izlozhenie: req.body.representation,
        Rekomendacii: req.body.recommendations,
        Familiya_rukovoditelya: req.body.directorSurname,
        Imya_rukovoditelya: req.body.directorName,
        Otchestvo_rukovoditelya: req.body.directorMiddleName,
    }

    try {
        let candidate = null
        if (req.body.formId !== null && req.body.formId !== undefined) {
            candidate = await InternshipForm.findByPk(req.body.formId)
        }
        let internshipForm
        if (candidate) {
            await InternshipForm.update(data, {
                where: {
                    Id_formy_stazhirovki: req.body.formId
                }
            })
            internshipForm = await InternshipForm.findByPk(req.body.formId)
        } else {
            internshipForm = await InternshipForm.create(data)
        }
        res.status(201).json(internshipForm)
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
        const internshipForm = await InternshipForm.destroy({
            where: {
                Id_formy_stazhirovki: req.body.id
            }
        })
        res.sendStatus(200)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

/**
 * Функция получения формы стажировки по id повышения квалификации. Все аналогично как в departmentController
 */
const getByTrainingId = async (req, res) => {
    try {
        const internshipForm = await InternshipForm.findOne({
            where: {
                Id_povysheniya_kvalifikacii: req.params.id // Ищем по id повышения квалификации из тела запроса
            }
        })
        res.status(200).send(internshipForm)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

// Экспорт функций
module.exports = {
    save,
    remove,
    getByTrainingId
}
