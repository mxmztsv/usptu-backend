const db = require('../models')
const InternshipForm = db.internshipForms

const save = async (req, res) => {
    const data = {
        Id_formy_stazhirovki: req.body.formId,
        Id_povysheniya_kvalifikacii: req.body.trainingId,
        Tematika: req.body.topic,
        Mesto: req.body.location,
        Otchet: req.body.report,
        Forma_programmy_stazhirovki: req.body.internshipForm,
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
        if (candidate) {
            const internshipForm = await InternshipForm.update(data, {
                where: {
                    Id_formy_stazhirovki: req.body.formId
                }
            })
        } else {
            const internshipForm = await InternshipForm.create(data)
        }
        res.sendStatus(201)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }

}

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

const getAllByTrainingId = async (req, res) => {
    try {
        const internshipForms = await InternshipForm.findAll({
            where: {
                Id_povysheniya_kvalifikacii: req.params.id
            }
        })
        res.status(200).send(internshipForms)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

module.exports = {
    save,
    remove,
    getAllByTrainingId
}
