/**
 * Middleware проверяет соответвие переданного в теле запроса id сотрудника с id в куках,
 * если пользователь не является суперпользователем
 * (Суперпользователь может работать с формами всех сотрудников).
 */
module.exports =  (req, res, next) => {

    // Запросы метода options пропускаем без проверки, они сервисные
    if (req.method === 'OPTIONS') {
        return next()
    }

    const isSuperuser = req.user.isSuperuser
    const userId = req.user.id
    if (!isSuperuser && (req.body.employeeId !== userId)) {
        // Если пользователь не суперпользователь и id из тела запроса != id в куках,
        // возвращаем в ответ код 403 (Forbidden)
        return res.status(403).json({ message: 'Нет доступа' })
    } else {
        // Иначе пускаем запрос дальше
        next()
    }
}
