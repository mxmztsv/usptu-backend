const DocsGeneratorService = require("../services/docsGeneratorService")
const DocsUploaderService = require("../services/docsUploaderService")

/**
 * Функция генерации документов
 */
const generateDocument = async (req, res) => {
    try {
        // Генерируем документ и получаем имя выходного файла
        const fileName = await DocsGeneratorService.generateDocument(req.body.type, req.body.trainingId)
        // Возвращаем код 201 (Created)
        res.status(201).json({
            fileName
        })
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

/**
 * Функция загрузки подписанного документа
 */
const uploadReport = async (req, res) => {
    try {
        // Получаем документ из загруженных файлов в запросе
        const file = req.files.file
        const reportType = req.body.reportType
        const trainingId = req.body.trainingId
        const filename = req.body.filename
        const savedFileName = await DocsUploaderService.uploadDocument(reportType, trainingId, file, filename)
        // Возвращаем статус 200 (ОК)
        res.status(200).json({filename: savedFileName})
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

// Экспорт функций из модуля
module.exports = {
    generateDocument,
    uploadReport
}
