const FilterService = require ('./../services/FilterService')

class FilterController {
    async search (req, res) {
        try {
            if (!req.query) {
                return res.status (400).json ({ message: 'Search query not found' })
            }

            let post
            switch (Object.keys (req.query)[0]) {
                case '_query':
                    const searchQuery = req.query._query
                    post = await FilterService.byQuery (searchQuery)
                    res.status (200).json (post)
                    break
                case '_tag':
                    const searchTag = req.query._tag
                    post = await FilterService.byTag (searchTag)
                    res.status (200).json (post)
                    break
                default: res.status (400).json ({ message: 'Post not found' })
            }
        } catch (e) {
            res.status (400).json ({ message: 'Search Error' })
        }
    }

    async getAllTags (req, res) {
        try {
            const tags = await FilterService.getAllTags ()
            return res.status (200).json (tags)
        } catch (e) {
            res.status (400).json ({ message: 'Error loading tags' })
        }
    }
}

module.exports = new FilterController ()