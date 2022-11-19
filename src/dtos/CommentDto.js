module.exports = class CommentDto {
    postID
    date
    name
    email
    avatar
    body

    constructor (postID, user, comment) {
        this.postID = postID
        this.date = new Date ()
        this.email = user.email
        this.name = user.name
        this.avatar = user.avatar
        this.body = comment
    }
}