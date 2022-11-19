const CommentService = require ('../services/CommentService')

class CommentController {
    async getComments (req, res) {
        try {
            const comments = await CommentService.getLastThree ()
            return res.status (200).json (comments)
        } catch (e) {
            res.status (400).json (e.message)
        }
    }
}

module.exports = new CommentController ()