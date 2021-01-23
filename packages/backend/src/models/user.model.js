const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  login: String
}, { timestamps: true })

const model = mongoose.model('user', UserSchema)

module.exports = model
