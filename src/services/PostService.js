const PostModel = require ('../models/PostModel')
const UserModel = require ('../models/UserModel')
const CommentModel = require ('../models/CommentModel')
const FileService = require ('./FileService')
const CommentService = require ('./CommentService')
const UserService = require ('./UserService')
const CommentDto = require ('../dtos/CommentDto')


class PostService {
    async getAllPosts (limit, page) {
        const posts = await PostModel.find ()
        let invertPosts = []
        for (let i = posts.length - 1; i >= 0; i--) {
            invertPosts.push (posts[i])
        }
        if (limit && page) {
            const postsForResponse = []
            for (let i = 0; i < limit * page; i++) {
                if (invertPosts [i]) postsForResponse.push (invertPosts[i])
            }

            if (page >= 2) {
                return postsForResponse.slice (limit * page - limit)
            }
            return postsForResponse
        }        
        return invertPosts
    }

    async getOnePost (id) {
        if (!id) {
            throw new Error ('ID not found')
        }
        const post = await PostModel.findById (id)
        post.views = ++post.views
        post.save ()
        return post
    }

    async createPost (authorID, post, image) {
        const authorName = await UserService.increaseCreated (authorID)
        const imageName = FileService.saveFile (image, 'postImages')
        if (post.tags) {
            post.tags = post.tags.split (' ')
        }
        const newPost = await PostModel.create ({
            ...post, 
            authorID, 
            author: authorName,
            image: imageName
        })
        return newPost
    }

    async updatePost (postID, post, image) {
        if (!postID) {
            throw new Error ('Post update error')
        }
        const updatedPost = await PostModel.findById (postID)
        await FileService.deleteImage (updatedPost.image, 'postImages')
        const imageName = FileService.saveFile (image, 'postImages')
        updatedPost.title = post.title
        updatedPost.content = post.content
        updatedPost.image = imageName
        updatedPost.tags = post.tags.split (' ')
        updatedPost.save ()
        return updatedPost
    }

    async deletePost (postID) {
        if (!postID) {
            throw new Error ('Post delete error')
        }
        const deletedPost = await PostModel.findByIdAndDelete (postID)
        await CommentService.clearCommentsAfterDelete (postID)
        await UserService.clearLikedAfterDelete (postID)
        await FileService.deleteImage (deletedPost.image, 'postImages')
        return deletedPost
    }

    async getPostsCount () {
        const posts = await PostModel.find ()
        return posts.length
    }

    async addLike (postID, userID) {
        const post = await PostModel.findById (postID)
        post.likes = ++post.likes
        post.save ()
        const user = await UserModel.findById (userID)
        user.liked = [...user.liked, postID]
        user.save ()
        return post
    }

    async removeLike (postID, userID) {
        const post = await PostModel.findById (postID)
        post.likes = --post.likes
        post.save ()
        const user = await UserModel.findById (userID)
        user.liked = user.liked.filter (id => id !== postID)
        user.save ()
        return post
    }

    async addComment (postID, userID, comment) {
        const post = await PostModel.findById (postID)
        const user = await UserModel.findById (userID)
        const commentDto = new CommentDto (postID, user, comment)
        const savedComment = await CommentModel.create (commentDto)
        post.comments = [...post.comments, savedComment]
        post.save ()
        return post
    }

    async removeComment (postID, commentID) {
        const post = await PostModel.findById (postID)
        post.comments = post.comments.filter (comment => String (comment._id) !== commentID)
        post.save ()
        const status = await CommentService.deleteComment (commentID)
        return { post, status }
    }
}

module.exports = new PostService ()