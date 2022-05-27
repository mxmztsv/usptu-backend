const db = require('../models')
const bcrypt = require("bcrypt");
const TokenService = require("../services/tokenService");
const Employee = db.employees

/**
 * Функция обработки запроса на авторизацию.
 */
const signIn = async (req, res) => {
    try {
        // Поверяем, есть ли пользователь с таким логином в БД
        const candidate = await Employee.findOne({
            where: {
                Login: req.body.login // Логин из тела запроса
            }
        })
        if (candidate) {
            // Если пользователь есть, проверяем, совпадает ли переданный в теле запроса пароль с хэшем пароля в БД
            const isPasswordMatchesHash = await bcrypt.compare(req.body.password, candidate.getDataValue('Password'))
            if (isPasswordMatchesHash) {
                // Если пароль совпал, генерируем токены для пользователя
                // В токены кладем id пользователя и поле о том, является ли он суперпользователем
                const tokens = TokenService.generateTokens({
                    id: candidate.getDataValue('Id_prepodavatelya'),
                    isSuperuser: candidate.getDataValue('Is_superuser')
                })
                // Кладем access token в куки
                // Тут указывается время жизни (90 дней) куки и httpOnly - запрет доступа м помощью JavaScript(для безопасности)
                res.cookie('accessToken', tokens.accessToken, {maxAge: 90 * 24 * 60 * 60 * 1000, httpOnly: true})
                // Возвращаем json с пользователем в ответе
                res.json(candidate.dataValues)
            } else {
                // Если пароль не совпал, возвращаем статус-код 401 (Not authorized)
                res.status(400).json({message: "Неправильный логин или пароль"})
            }
        } else {
            // Если такого пользователя нет, возвращаем статус-код 401 (Not authorized)
            res.status(400).json({message: "Неправильный логин или пароль"})
        }
    } catch (e) {
        console.error(e.message)
        // Если ловим ошибку, возвращаем 500 (Internal server error)
        res.sendStatus(500)
    }

}

/**
 * Функция обработки запроса на выход.
 */
const signOut = async (req, res) => {
    try {
        // Удаляем access token из куки
        res.clearCookie('accessToken')
        // Отправляем ответ 200 (ОК)
        res.sendStatus(200)
    } catch (e) {
        console.error(e.message)
        // Если ловим ошибку, возвращаем 500 (Internal server error)
        res.sendStatus(500)
    }
}

// Экспорт функций из модуля
module.exports = {
    signIn,
    signOut
}
