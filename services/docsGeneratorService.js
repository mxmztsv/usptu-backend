const db = require('../models')
const TrainingForm = db.trainingForms
const InternshipForm = db.internshipForms
const Training = db.trainings
const Employee = db.employees
const Department = db.departments
const generateDocx = require('generate-docx')

/**
 * Функция возвращает данные для вставки в документ, название шаблона и название будущего документа.
 */
const getContentForDocument = async (type, trainingId) => {
    // todo: локализация даты
    let data = {}
    let templateFileName
    let outputFileName

    // Получение из БД повышения квалификации по id
    const trainingData = await Training.findOne({
        where: {
            Id_povysheniya_kvalifikacii: trainingId
        }
    })

    // Получение из БД сотрудника по его id, указонному в повышении квалификации
    const employeeData = await Employee.findOne({
        where: {
            Id_prepodavatelya: trainingData.getDataValue('Id_prepodavatelya')
        }
    })

    // Получение из БД подразделения, которому принадлежит сотрудник по id
    const departmentData = await Department.findOne({
        where: {
            Id_podrazdeleniya: employeeData.getDataValue('Id_podrazdeleniya')
        }
    })

    // Складываем все нужное из полученных данных в data
    data.Familiya = employeeData.getDataValue('Familiya')
    data.Imya = employeeData.getDataValue('Imya')
    data.Otchestvo = employeeData.getDataValue('Otchestvo')
    data.Dolzhnost = employeeData.getDataValue('Dolzhnost')
    data.Uchenaya_stepen = employeeData.getDataValue('Uchenaya_stepen')
    data.Zvanie = employeeData.getDataValue('Zvanie')
    data.Data_nachala = trainingData.getDataValue('Data_nachala')
    data.Data_zaversheniya = trainingData.getDataValue('Data_zaversheniya')
    data.Forma_povysheniya_kvalifikacii = trainingData.getDataValue('Forma_povysheniya_kvalifikacii')
    data.Nazvaniye_podrazdeleniya = departmentData.getDataValue('Polnoe_nazvanie')
    data.Initsiali = `${employeeData.getDataValue('Familiya')} ${employeeData.getDataValue('Imya').slice(0, 1)}. ${employeeData.getDataValue('Otchestvo').slice(0, 1)}.`

    // В зависимости от переданного параметра type получаем остальные нужные для заполнения документа данные из БД
    switch (type) {
        case "training_report":
            const trainingForm = await TrainingForm.findOne({
                where: {
                    Id_povysheniya_kvalifikacii: trainingId
                }
            })

            // Объединяем получаенные данные с data
            data = await Object.assign(data, trainingForm.dataValues)

            // Название необходимого шаблона
            templateFileName = 'training_report_template.docx'
            // Название выходного файла
            outputFileName = `training_report_${trainingId}.docx`
            break

        case "internship_report":
            const internshipForm = await InternshipForm.findOne({
                where: {
                    Id_povysheniya_kvalifikacii: trainingId
                }
            })

            data = await Object.assign(data, internshipForm.dataValues)

            data.Initsiali_rukovoditelya = `${data.Familiya_rukovoditelya} ${data.Imya_rukovoditelya.slice(0, 1)}. ${data.Otchestvo_rukovoditelya.slice(0, 1)}.`

            templateFileName = 'internship_report_template.docx'
            outputFileName = `internship_report_${trainingId}.docx`
            break

        case "training_form":
            templateFileName = 'training_form_template.docx'
            outputFileName = `training_form_${trainingId}.docx`
            break

        case "internship_form":
            const iForm = await InternshipForm.findOne({
                where: {
                    Id_povysheniya_kvalifikacii: trainingId
                }
            })

            data = await Object.assign(data, iForm.dataValues)

            // Формируем инициалы руководителя
            data.Initsiali_rukovoditelya = `${data.Familiya_rukovoditelya} ${data.Imya_rukovoditelya.slice(0, 1)}. ${data.Otchestvo_rukovoditelya.slice(0, 1)}.`

            templateFileName = 'internship_form_template.docx'
            outputFileName = `internship_form_${trainingId}.docx`
            break
    }
    return {
        data,
        templateFileName,
        outputFileName
    }
}

/**
 * Функция генерирует документ в формате docx и кладет в директорию generated_docs.
 */
const generateDocument = async (type, trainingId) => {

    const {data, templateFileName, outputFileName} = await getContentForDocument(type, trainingId)

    // В параметрах указан шаблон, данные и место для сохранения выходного документа
    const options = {
        template: {
            filePath: `./docs_templates/${templateFileName}`,
            data
        },
        save: {
            filePath: `./generated_docs/${outputFileName}`
        }
    }

    try {
        // Вызываем функцию генерации из библиотеки generate-docx
        generateDocx(options, async (error, message) => {
            if (error) {
                console.error(error)
            } else {
                console.log(message)
                console.log(type)
                try {
                    // Кладем в БД ссылку на отчет
                    switch (type) {
                        case "training_report":
                            await TrainingForm.update({Otchet: outputFileName}, {
                                where: {
                                    Id_povysheniya_kvalifikacii: trainingId
                                }
                            })
                            break
                        case "internship_report":
                            await InternshipForm.update({Otchet: outputFileName}, {
                                where: {
                                    Id_povysheniya_kvalifikacii: trainingId
                                }
                            })
                            break
                        case "training_form":
                            await TrainingForm.update({Forma_programmy_PK: outputFileName}, {
                                where: {
                                    Id_povysheniya_kvalifikacii: trainingId
                                }
                            })
                            break
                        case "internship_form":
                            console.log('case "internship_form"')
                            await InternshipForm.update({Forma_programmy_stazhirovki: outputFileName}, {
                                where: {
                                    Id_povysheniya_kvalifikacii: trainingId
                                }
                            })
                            break
                    }
                } catch (e) {
                    throw e
                }
            }
        })
    } catch (e) {
        throw e.message
    }

    return outputFileName // Возвращаем из функции имя выходного файла

}

// Экспорт функции из модуля
module.exports = {
    generateDocument
}
