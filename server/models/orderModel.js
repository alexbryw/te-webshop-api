const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new mongoose.Schema({
    //user populate
    user: [{
        type: Schema.Types.ObjectId, ref: "User",
        require: true
    }],
    //shipping populate
    shipping: {
        type: Schema.Types.ObjectId, ref: "shipping",
        require: true
    },
    //array[{product:{product_id}, qty: Number, rowPrice: Number}]
    productRow: [{
        product: {
            type: Schema.Types.ObjectId, ref: "Product",
            require: true
        },
        qty: {
            type: Number,
            require: true
        },
        rowPrice: {
            type: Number,
            require: true
        }
    }],
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
