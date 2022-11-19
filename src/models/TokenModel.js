const { Schema, model } = require ('mongoose')

const TokenModel = new Schema ({
    userID: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true, default: ''}
})

module.exports = model ('Token', TokenModel)