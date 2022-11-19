module.exports = class UserDto {
    id
    email
    name
    avatar
    role
    created
    liked

    constructor (model) {
        this.id = model._id
        this.email = model.email
        this.name = model.name
        this.avatar = model.avatar
        this.role = model.role
        this.created = model.created
        this.liked = model.liked
    }
}