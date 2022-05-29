const DocsGeneratorService = require("../services/docsGeneratorService")

/**
 * Функция генерации документов
 */
const generateDocument = async (req, res) => {
    try {
        // Генерируем документ и получаем имя выходного файла
        const fileName = await DocsGeneratorService.generateDocument(req.body.type, req.body.trainingId)
        console.log('fileName', fileName)
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
        const doc = req.files.document
        // Пермещаем документ в директорию uploaded_docs
        doc.mv('./uploaded_docs/' + doc.name)
        // Возвращаем статус 200 (ОК)
        res.sendStatus(200)
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
