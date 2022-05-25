const db = require('../models')
const bcrypt = require("bcrypt");
const TokenService = require("../services/tokenService");
const Employee = db.employees

const signIn = async (req, res) => {
    try {
        const candidate = await Employee.findOne({where:{Login: req.body.login}})
        if (candidate) {
            const isPasswordMatchesHash = await bcrypt.compare(req.body.password, candidate.dataValues.Password)
            if (isPasswordMatchesHash) {
                const tokens = TokenService.generateTokens({
                    id: candidate.dataValues.Id_prepodavatelya,
                    IsSuperuser: candidate.dataValues.Is_superuser
                })
                candidate.dataValues.accessToken = tokens.accessToken
                res.cookie('refreshToken', tokens.refreshToken, {maxAge: 90 * 24 * 60 * 60 * 1000, httpOnly: true})
                res.json(candidate.dataValues)
            } else {
                res.status(400).json({message: "Неправильный логин или пароль"})
            }
        } else {
            res.status(400).json({message: "Неправильный логин или пароль"})
        }
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }

}

const signOut = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        res.clearCookie('refreshToken')
        res.sendStatus(200)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

module.exports = {
    signIn,
    signOut
}
