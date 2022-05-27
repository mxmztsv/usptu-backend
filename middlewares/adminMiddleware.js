/**
 * Middleware который пропускает только суперпользователей.
 */
module.exports =  (req, res, next) => {

    // Запросы метода options пропускаем без проверки, они сервисные
    if (req.method === 'OPTIONS') {
        return next()
    }

    const isSuperuser = req.user.isSuperuser
    if (!isSuperuser) {
        // Если пользователь не суперпользователь, возвращаем в ответ код 403 (Forbidden)
        return res.status(403).json({ message: 'Нет доступа' })
    } else {
        // Или пускаем запрос дальше
        next()
    }
}
