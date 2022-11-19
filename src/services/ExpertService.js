const UserModel = require ('../models/UserModel')
const ExpertDto = require ('../dtos/ExpertDto')

class ExpertService {
    async getExperts () {
        const users = await UserModel.find ()
        const experts = users.filter (user => user.role === process.env.ADMIN_ROLE).map (expert => {
            const expertDto = new ExpertDto (expert)
            return expertDto
        })
        return experts
    }
}

module.exports = new ExpertService ()