const db = require('../models')
const TrainingForm = db.trainingForms
const InternshipForm = db.internshipForms
const Training = db.trainings
const Employee = db.employees
const Department = db.departments
const generateDocx = require('generate-docx')

const generateDocument = async (type, trainingId) => {

    let data = {}
    let templateFileName
    let outputFileName

    const trainingData = await Training.findAll({
        where: {
            Id_povysheniya_kvalifikacii: trainingId
        }
    })
    const employeeData = await Employee.findAll({
        where: {
            Id_prepodavatelya: trainingData[0].dataValues.Id_prepodavatelya
        }
    })
    const departmentData = await Department.findAll({
        where: {
            Id_podrazdeleniya: employeeData[0].dataValues.Id_podrazdeleniya
        }
    })

    data.Familiya = employeeData[0].dataValues.Familiya
    data.Imya = employeeData[0].dataValues.Imya
    data.Otchestvo = employeeData[0].dataValues.Otchestvo
    data.Dolzhnost = employeeData[0].dataValues.Dolzhnost
    data.Uchenaya_stepen = employeeData[0].dataValues.Uchenaya_stepen
    data.Zvanie = employeeData[0].dataValues.Zvanie
    data.Data_nachala = trainingData[0].dataValues.Data_nachala
    data.Data_zaversheniya = trainingData[0].dataValues.Data_zaversheniya
    data.Forma_povysheniya_kvalifikacii = trainingData[0].dataValues.Forma_povysheniya_kvalifikacii
    data.Nazvaniye_podrazdeleniya = departmentData[0].dataValues.Polnoe_nazvanie
    data.Initsiali = `${employeeData[0].dataValues.Familiya} ${employeeData[0].dataValues.Imya.slice(0, 1)}. ${employeeData[0].dataValues.Otchestvo.slice(0, 1)}.`

    switch (type) {
        case "training_report":
            const trainingForm = await TrainingForm.findAll({
                where: {
                    Id_povysheniya_kvalifikacii: trainingId
                }
            })

            data = await Object.assign(data, trainingForm[0].dataValues)

            // console.log(data)

            templateFileName = 'training_report_template.docx'
            outputFileName = `training_report_${trainingId}.docx`
            break
        case "internship_report":
            const internshipForm = await InternshipForm.findAll({
                where: {
                    Id_povysheniya_kvalifikacii: trainingId
                }
            })

            data = await Object.assign(data, internshipForm[0].dataValues)

            data.Initsiali_rukovoditelya = `${data.Familiya_rukovoditelya} ${data.Imya_rukovoditelya.slice(0, 1)}. ${data.Otchestvo_rukovoditelya.slice(0, 1)}.`

            templateFileName = 'internship_report_template.docx'
            outputFileName = `internship_report_${trainingId}.docx`
            break
        case "training_form":
            if (data.Forma_povysheniya_kvalifikacii === 'Стажировка') {

                const internshipForm = await InternshipForm.findAll({
                    where: {
                        Id_povysheniya_kvalifikacii: trainingId
                    }
                })

                data = await Object.assign(data, internshipForm[0].dataValues)

                data.Initsiali_rukovoditelya = `${data.Familiya_rukovoditelya} ${data.Imya_rukovoditelya.slice(0, 1)}. ${data.Otchestvo_rukovoditelya.slice(0, 1)}.`

                templateFileName = 'internship_form_template.docx'
                outputFileName = `internship_form_${trainingId}.docx`
            } else {
                templateFileName = 'training_form_template.docx'
                outputFileName = `training_form_${trainingId}.docx`
            }
            break
    }


    const options = {
        template: {
            filePath: `../server/docs_templates/${templateFileName}`,
            data
        },
        save: {
            filePath: `../server/generated_docs/${outputFileName}`
        }
    }

    try {
        generateDocx(options, (error, message) => {
            if (error) {
                console.error(error)
                // throw error
            } else {
                console.log(message)
            }
        })
    } catch (e) {
        throw e.message
    }

}

module.exports = {
    generateDocument
}
