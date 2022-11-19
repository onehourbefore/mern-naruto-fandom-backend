const Router = require ('express')
const ExpertController = require ('../controllers/ExpertController')

const experts = new Router ()

experts.get ('/experts', ExpertController.getExperts)

module.exports = experts