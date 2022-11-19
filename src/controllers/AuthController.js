const AuthService = require ('../services/AuthService')
const TokenService = require ('../services/TokenService')
const { validationResult } = require ('express-validator')


class AuthController {
    async registration (req, res) {
        try {
            const errors = validationResult (req)
            if (!errors.isEmpty ()) {
                return res.status (400).json ({message: "Ошибка при валидации", errors: errors.errors})
            }
            if (!req.files) {
                return res.status (404).json ({message: "Прикрепите аватар"})
            }
            const response = await AuthService.registration (req.body, req.files.avatar)
            return res.status (200).json (response)
        } catch (e) {
            res.status (400).json ({message: e.message})
        }
    }

    async login (req, res) {
        try {
            const { email, password } = req.body
            const { accessToken, refreshToken, user } = await AuthService.login (email, password)
            res.cookie (
                'refreshToken', 
                refreshToken,
                { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }
                )
            res.status (200).json ({accessToken, user})
        } catch (e) {
            res.status (400).json ({message: e.message})
        }
    }

    async refresh (req, res) {
        try {
            const { refreshToken } = req.cookies
            if (!refreshToken) {
                return res.status (401).json ({message: 'Refresh token not found'})
            }
            const userData = await AuthService.refresh (refreshToken)
            res.cookie (
                'refreshToken', 
                userData.refreshToken, 
                { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }
                )
            return res.json ({accessToken: userData.accessToken, user: userData.user})

        } catch (e) {
            res.status (400).json ({message: e.message})
        }
    }

    async logout (req, res) {
        try {
            const { refreshToken } = req.cookies
            const data = await AuthService.logout (refreshToken)
            res.clearCookie ('refreshToken')
            res.status (200).json ({ message: 'Logout success', data })
        } catch (e) {
            res.status (400).json ({ message: e.message })
        }
    }

    async deleteProfile (req, res) {
        try {
            const { refreshToken } = req.cookies
            const userID = req.user.id
            const avatarName = req.user.avatar
            const statusData = await AuthService.deleteProfile (userID, avatarName, refreshToken)
            res.clearCookie ('refreshToken')
            res.status (200).json (statusData)
        } catch (e) {
            res.status (400).json ('Error profile deletion')
        }
    }
}

module.exports = new AuthController ()