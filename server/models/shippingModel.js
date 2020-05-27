const mongoose = require('mongoose')

const shippingSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    delivery: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Shipping', shippingSchema)