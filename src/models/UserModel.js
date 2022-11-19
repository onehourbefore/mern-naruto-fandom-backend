const mongoose = require ('mongoose')

const UserModel = new mongoose.Schema ({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true, unique: true},
    avatar: {type: String, required: true},
    role: {type: String, required: true},
    created: {type: Number, default: 0},
    liked: {type: Array, default: []}
})

module.exports = mongoose.model ('User', UserModel)