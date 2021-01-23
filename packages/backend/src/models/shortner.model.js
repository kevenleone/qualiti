const mongoose = require('mongoose')

const ShortnerSchema = mongoose.Schema({
  url: String,
  uuid: String,
  expired: { type: Boolean, default: false },
  hits: { type: Number, default: 0 },
  created_by: String,
  hash: String
})

const model = mongoose.model('shortner', ShortnerSchema)

module.exports = model
