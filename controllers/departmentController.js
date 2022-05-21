const db = require('../models')
const Department = db.departments

const save = async (req, res) => {
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
            candidate = await Department.findByPk(req.body.id)
        }
        if (candidate) {
            const department = await Department.update(data, {
                where: {
                    Id_podrazdeleniya: req.body.id
                }
            })
        } else {
            const department = await Department.create(data)
        }
        res.sendStatus(201)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }

}

const remove = async (req, res) => {

    try {
        const department = await Department.destroy({
            where: {
                "Id_podrazdeleniya": req.body.id
            }
        })
        res.sendStatus(200)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }

}

module.exports = {
    save,
    remove
}
