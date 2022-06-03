const db = require('../models')
const TrainingForm = db.trainingForms
const InternshipForm = db.internshipForms
const Training = db.trainings

const uploadDocument = async (reportType, trainingId, file, filename) => {
    try {
        // Пермещаем документ в директорию uploaded_docs
        // file.mv('./uploaded_docs/' + file.name)
        await file.mv('./uploaded_docs/' + filename)
        // Кладем в БД ссылку на загруженный отчет
        switch (reportType) {
            case "training_report":
                await TrainingForm.update({Zagruzhenniy_otchet: filename}, {
                    where: {
                        Id_povysheniya_kvalifikacii: trainingId
                    }
                })
                break
            case "internship_report":
                await InternshipForm.update({Zagruzhenniy_otchet: filename}, {
                    where: {
                        Id_povysheniya_kvalifikacii: trainingId
                    }
                })
                break
            case "training_form":
                await TrainingForm.update({Zagruzhennaya_forma_programmy_PK: filename}, {
                    where: {
                        Id_povysheniya_kvalifikacii: trainingId
                    }
                })
                break
            case "internship_form":
                await InternshipForm.update({Zagruzhennaya_forma_programmy_stazhirovki: filename}, {
                    where: {
                        Id_povysheniya_kvalifikacii: trainingId
                    }
                })
                break
        }
    } catch (e) {
        throw e
    }
    return filename
}

module.exports = {
    uploadDocument
}
