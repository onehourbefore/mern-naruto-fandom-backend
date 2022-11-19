const { Schema, model } = require ('mongoose')

const CommentModel = new Schema ({
    postID: {type: Schema.Types.ObjectId, ref: 'Post'},
    date: {type: String, required: true, default: ''},
    name: {type: String, required: true, default: ''},
    email: {type: String, required: true, default: ''},
    avatar: {type: String, required: true, default: ''},
    body: {type: String, required: true, default: ''}
})

module.exports = model ('Comment', CommentModel)