const TokenService = require ('../services/TokenService')


function AuthMiddleware (req, res, next) {
    if (req.method === 'OPTIONS') {
        return next ()
    }
    try {
        const accessToken = req.headers.authorization.split (' ')[1]
        if (!accessToken) {
            return res.status (401).json ({message: 'Вы не авторизованы'})
        }

        const userData = TokenService.validateAccessToken (accessToken)
        if (!userData) {
            return res.status (401).json ({message: 'Вы не авторизованы'})
        }
        req.user = userData
        next ()
    } catch (e) {
        res.status (400).json ({message: 'Ошибка авторизации'})
    }
}

module.exports = AuthMiddleware