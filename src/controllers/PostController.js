const PostService = require ('../services/PostService')

class PostController {
    async getAllPosts (req, res) {
        try {
            if (req.query._count) {
                const postsCount = await PostService.getPostsCount ()
                return res.status (200).json ({ postsCount })
            }
            if (req.query._limit && req.query._page) {
                const posts = await PostService.getAllPosts (req.query._limit, req.query._page)
                return res.status (200).json (posts)
            }
            const posts = await PostService.getAllPosts ()
            return res.status (200).json (posts)
        } catch (e) {
            return res.status (400).json ({ message: e.message })
        }
    }

    async getOnePost (req, res) {
        try {
            const post = await PostService.getOnePost (req.params.id)
            return res.status (200).json (post)
        } catch (e) {
            return res.status (400).json ({ message: e.message })
        }
    }

    async createPost (req, res) {
        try {
            const userID = req.user.id
            const post = await PostService.createPost (userID, req.body, req.files.image)
            return res.status (200).json ({ message: 'New post created', post })
        } catch (e) {
            return res.status (400).json ({ message: e.message })
        }
    }

    async updatePost (req, res) {
        try {
            const postID = req.params.id
            const changedPost = req.body
            const post = await PostService.updatePost (postID, changedPost, req.files.image)
            return res.status (200).json ({ message: 'Post was update', post })
        } catch (e) {
            return res.status (400).json ({ message: e.message })
        }
    }

    async deletePost (req, res) {
        try {
            const { id } = req.params
            const post = await PostService.deletePost (id)
            return res.status (200).json ({ message: 'Post was delete', post })
        } catch (e) {
            return res.status (400).json ({ message: e.message })
        }
    }

    async addLike (req, res) {
        try {
            const postID = req.params.id
            const userID = req.user.id
            const post = await PostService.addLike (postID, userID)
            return res.status (200).json (post)
        } catch (e) {
            return res.status (400).json ({ message: e.message })
        }
    }

    async removeLike (req, res) {
        try {
            const postID = req.params.id
            const userID = req.user.id
            const post = await PostService.removeLike (postID, userID)
            return res.status (200).json (post)
        } catch (e) {
            return res.status (400).json ({ message: e.message })
        }
    }

    async addComment (req, res) {
        try {
            const { comment } = req.body
            const postID  = req.params.id
            const userID = req.user.id
            const post = await PostService.addComment (postID, userID, comment)
            return res.status (200).json (post)
        } catch (e) {
            return res.status (400).json ({ message: e.message })
        }
    }

    async removeComment (req, res) {
        try {
            const postID = req.params.id
            const { _commentID } = req.query
            const { post, status } = await PostService.removeComment (postID, _commentID)
            return res.status (200).json ({ post, status })
        } catch (e) {
            return res.status (400).json ({ message: e.message })
        }
    }
}

module.exports = new PostController ()