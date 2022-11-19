const { Schema, model } = require ('mongoose')

const PostModel = new Schema ({
    authorID: {type: Schema.Types.ObjectId, ref: 'User'},
    author: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: String, required: true},
    tags: {type: Array, required: true, default: []},
    likes: {type: Number, required: true, default: 0},
    comments: {type: Array, required: true, default: []},
    views: {type: Number, required: true, default: 0}
})

module.exports = model ('Post', PostModel)