const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    //user populate
    //shipping populate
    //product row array[product_id, qty: number, rowPrice: Number]
    to_firstname: {
        type: String,
        minlength: 1,
        required: true,
    },
    to_lastname: {
        type: String,
        minlength: 1,
        required: true,
    },
    to_street: {
        type: String,
        minlength: 1,
        required: true,
    },
    to_city: {
        type: String,
        minlength: 1,
        required: true,
    },
    to_zip: {
        type: Number,
        minlength: 1,
        required: true,
    },
    isOrderShipped: {
        type: Boolean,
        required: true
    },
    totalPrice: {
        type: Number,
        minlength: 1,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Order', orderSchema)
