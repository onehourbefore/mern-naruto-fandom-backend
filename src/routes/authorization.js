const Router = require ('express')
const { body } = require ('express-validator')
const AuthController = require ('../controllers/AuthController')
const Auth = require ('../middlewares/AuthMiddleware')

const authorization = new Router ()

authorization.post (
    '/registration', [
        body ( 'email' ).isEmail (),
        body ( 'password' ).isLength ({ min: 3, max: 12 }),
        body ( 'name' ).isLength ({ min: 2, max: 10 })
    ], 
    AuthController.registration
)
authorization.post ('/login', AuthController.login)
authorization.get ('/refresh', AuthController.refresh)
authorization.get ('/logout', AuthController.logout)
authorization.get ('/deleteProfile', Auth, AuthController.deleteProfile)

module.exports = authorization