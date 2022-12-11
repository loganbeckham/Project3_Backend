const mongoose = require('mongoose')

const locationsSchema = new mongoose.Schema({
    location: String,
    city: String,
    zip: Number,
    description: String,
    image: String,
    rating: Number,
    tags: String,
})

const Location = mongoose.model('Location', locationsSchema)
module.exports = Location