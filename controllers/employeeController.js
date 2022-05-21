const db = require('../models')
const Employee = db.employees

const save = async (req, res) => {
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
        Id_podrazdeleniya: req.body.department
    }

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
            const employee = await Employee.create(data)
        }
        res.sendStatus(201)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }

}

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

module.exports = {
    save,
    remove
}
