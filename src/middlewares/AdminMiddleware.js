require ('dotenv').config ()
const jwt = require ("jsonwebtoken")
const TokenService = require ('../services/TokenService')


function AdminMiddleware (req, res, next) {
    if (req.method === 'OPTIONS') {
        return next ()
    }
    try {
        const { role } = req.user
        if (role !== process.env.ADMIN_ROLE) {
            return res.status (400).json ({message: 'Функция доступна только администраторам'})
        }
        next ()
    } catch (e) {
        res.status (400).json ({message: 'Ошибка авторизации'})
    }
}

module.exports = AdminMiddleware