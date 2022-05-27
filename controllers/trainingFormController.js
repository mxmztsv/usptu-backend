const db = require('../models')
const TrainingForm = db.trainingForms
const DocsGeneratorService = require("../services/docsGeneratorService")

/**
 * Функция сохранения. Все аналогично как в departmentController
 */
const save = async (req, res) => {
    const data = {
        Id_formy_PK: req.body.formId,
        Id_povysheniya_kvalifikacii: req.body.trainingId,
        Tematika: req.body.topic,
        Forma_programmy_PK: req.body.courseForm,
        Otchet: req.body.report,
        Naimenovanie_programmy_PK: req.body.courseName,
        Mesto_prohozhdeniya_PK: req.body.trainingLocation,
        Izuchennye_voprosy: req.body.learningPoints,
        Rezultaty_PK: req.body.trainingResults,
        Izmeneniya_v_rabochih_programmy_disciplin: req.body.workingDisciplineChanges,
        Izmenenie_v_rabochie_programmy_obrazovatelnyh_programm: req.body.workingCourseChanges,
        Pererabotka_po_disciplinam: req.body.disiciplineRefactoring,
        Pererabotka_dlya_obrazovatelnyh_programm: req.body.courseRefactoring,
        Razrabotka_APIM_po_disciplinam: req.body.disciplineAPIM,
        Razrabotka_APIM_dlya_obrazovatelnyh_programm: req.body.courseAPIM,
        Drugie_pokazateli_rezultatov_PK: req.body.anotherResults,
        Ocenka_soderzhaniya_programmy_obucheniya: req.body.courseContentRating,
        Ocenka_zayavlennoj_programmy: req.body.courseRating,
        Sootvetstvie_soderzhaniya_programmy: req.body.courseContentMatching,
        Ocenka_urovnya_organizacii_PK: req.body.organizationLevelRating,
        Celesoobraznost_napravleniya: req.body.expediency,
        Data_protokola: req.body.reportDate,
        Nomer_protokola: req.body.reportNumber,
        Vypiska_iz_protokola: req.body.protocolExtract,
        Postanovlenie_kafedry: req.body.departmentsResolution,
        Kommentarij_k_postanovleniyu: req.body.resolutionReviews,
        Prichiny_nizkoj_rezultativnosti: req.body.poorPerfomanceReasons,
        Predlozheniya_po_ustraneniyu: req.body.improvementSuggestions
    }

    try {
        let candidate = null
        if (req.body.formId !== null && req.body.formId !== undefined) {
            candidate = await TrainingForm.findByPk(req.body.formId)
        }
        if (candidate) {
            const trainingForm = await TrainingForm.update(data, {
                where: {
                    Id_formy_PK: req.body.formId
                }
            })
        } else {
            const trainingForm = await TrainingForm.create(data)
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
        const trainingForm = await TrainingForm.destroy({
            where: {
                Id_formy_PK: req.body.id
            }
        })
        res.sendStatus(200)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

/**
 * Функция получения всех форм стажировки по id повышения квалификации. Все аналогично как в departmentController
 */
const getAllByTrainingId = async (req, res) => {
    try {
        const trainingForms = await TrainingForm.findAll({
            where: {
                Id_povysheniya_kvalifikacii: req.params.id
            }
        })
        res.status(200).send(trainingForms)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

// /**
//  * Функция генерации документов
//  */
// const generateDocument = async (req, res) => {
//     // todo: Вероятно надо вынести в отдельный контроллер
//     try {
//         // Генерируем документ и получает имя выходного файла
//         const fileName = await DocsGeneratorService.generateDocument(req.body.type, req.body.trainingId)
//         // Возвращаем код 201 (Created)
//         res.sendStatus(201)
//     } catch (e) {
//         console.error(e.message)
//         res.sendStatus(500)
//     }
// }
//
// /**
//  * Функция загрузки подписанного документа
//  */
// const uploadReport = async (req, res) => {
//     // todo: Вероятно надо вынести в отдельный контроллер
//     try {
//         // Получаем документ из загруженных файлов в запросе
//         const doc = req.files.document
//         // Пермещаем документ в директорию uploaded_docs
//         doc.mv('./uploaded_docs/' + doc.name)
//         // Возвращаем статус 200 (ОК)
//         res.sendStatus(200)
//     } catch (e) {
//         console.error(e.message)
//         res.sendStatus(500)
//     }
// }

// Мы уже знаем что это, не так ли? : )
module.exports = {
    save,
    remove,
    getAllByTrainingId
}
