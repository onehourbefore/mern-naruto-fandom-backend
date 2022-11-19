const ExpertService = require ('../services/ExpertService');

class ExpertController {
    async getExperts (req, res) {
        try {
            const experts = await ExpertService.getExperts ();
            return res.status (200).json (experts);
        } catch (e) {
            res.status (400).json ({ message: e.message })
        }
    }
}

module.exports = new ExpertController ();