module.exports = class ExpertDto {
    name
    email
    avatar
    created

    constructor (expert) {
        this.name = expert.name
        this.email = expert.email
        this.avatar = expert.avatar
        this.created = expert.created
    }
}