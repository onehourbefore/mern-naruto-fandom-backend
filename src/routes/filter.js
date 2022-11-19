const Router = require ('express')
const FilterController = require ('../controllers/FilterController')

const filter = new Router ()


filter.get ('/search', FilterController.search)
filter.get ('/tags', FilterController.getAllTags)


module.exports = filter