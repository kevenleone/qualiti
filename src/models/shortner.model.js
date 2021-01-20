const mongoose = require('mongoose')

const ShortnerSchema = mongoose.Schema({
    url: String,
    expired: { type: Boolean, default: false },
    hits: Number,
    hash: String,
});

const model = mongoose.model('shortner', ShortnerSchema);

module.exports = model;