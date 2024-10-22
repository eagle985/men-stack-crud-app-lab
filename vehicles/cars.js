const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    color: { type: String, required: true },
    year: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
})

const Car = mongoose.model('Car', carSchema)
module.exports = Car