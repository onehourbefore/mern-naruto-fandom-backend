const UserModel = require ('../models/UserModel')

class UserService {
    async clearLikedAfterDelete (postID) {
        const users = await UserModel.find ()
        users.forEach (user => {
            user.liked = user.liked.filter (item => item !== postID)
            user.save ()
        })
    }

    async increaseCreated (authorID) {
        const author = await UserModel.findById (authorID)
        author.created = ++author.created
        author.save ()
        return author.name
    }
}

module.exports = new UserService ()