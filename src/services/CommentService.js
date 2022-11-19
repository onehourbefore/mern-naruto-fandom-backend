const CommentModel = require ('../models/CommentModel')

class CommentService {
    async getLastThree () {
        const comments = await CommentModel.find ()
        if (comments.length <= 3) {
            return comments
        }
        return comments.slice (comments.length - 3)
    }

    async clearCommentsAfterDelete (postID) {
        const comments = await CommentModel.find ()
        comments.forEach (async (comment) => {
            if (String (comment.postID) === postID) {
                await CommentModel.findByIdAndDelete (comment._id)
            }
        })
    }

    async deleteComment (id) {
        await CommentModel.findByIdAndDelete (id)
        return {message: 'Comment was deleted'}
    }
}

module.exports = new CommentService ()