const Router = require ('express')
const Auth = require ('../middlewares/AuthMiddleware')
const Admin = require ('../middlewares/AdminMiddleware')
const PostController = require ('../controllers/PostController')

const posts = new Router ()

posts.get ('/posts', PostController.getAllPosts)
posts.get ('/posts/:id', PostController.getOnePost)
posts.post ('/posts', Auth, Admin, PostController.createPost)
posts.put ('/posts/:id', Auth, Admin, PostController.updatePost)
posts.delete ('/posts/:id', Auth, Admin, PostController.deletePost)

posts.get ('/posts/:id/like', Auth, PostController.addLike)
posts.get ('/posts/:id/rmlike', Auth, PostController.removeLike)
posts.post ('/posts/:id/comment', Auth, PostController.addComment)
posts.get ('/posts/:id/rmcomment', Auth, Admin, PostController.removeComment)


module.exports = posts