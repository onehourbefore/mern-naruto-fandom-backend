const Router = require ('express')
const CommentController = require ('../controllers/CommentController')

const comments = new Router ()

comments.get ('/comments', CommentController.getComments)

module.exports = comments