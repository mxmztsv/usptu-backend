/**
 * Функция получает дату найма в виде строки и текущий возвращает стаж
 */
const getExperienceByHiringDate = (hiringDateString) => {
    const hiringDate = Date.parse(hiringDateString)
    const now = new Date()

    const experienceInYears = Math.floor((now - hiringDate) / (1000 * 60 * 60 * 24 * 365))

    if (experienceInYears >= 1) {
        return experienceInYears
    } else return 0
}

/**
 * Функция преобразует дату в RU формат.
 * Пояснение: дата храниться в БД по умолчанию в формате гггг-мм-дд,
 * но для русского пользователя привычнее формат дд.мм.гггг
 */
const toRU = (dateString) => {
    return dateString.split('-').reverse().join('.')
}

module.exports = {
    getExperienceByHiringDate,
    toRU
}
