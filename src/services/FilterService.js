const PostModel = require ('../models/PostModel')
const makeUnique = require ('../utils/makeUnique')

class FilterService {
    async byQuery (searchQuery) {
        const posts = await PostModel.find ()
        const filteredPosts = posts.filter (
            post => post.title.toLowerCase ().includes (searchQuery.toLowerCase ())
        )
        return filteredPosts
    }

    async byTag (searchTag) {
        const posts = await PostModel.find ()
        const filteredPosts = posts.filter (post => {
            for (let i = 0; i < post.tags.length; i++) {
                if (post.tags[i] === `#${searchTag}`) return post
            }
        })
        return filteredPosts
    }

    async getAllTags () {
        const posts = await PostModel.find ()
        let postTags = []
        posts.forEach (post => {
            post.tags.forEach (item => postTags.push (item))
        })
        const uniqTags = makeUnique (postTags)
        return uniqTags
    }
}

module.exports = new FilterService ()