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
        date: Date,
        required: true,
    }
})


// Shipping.create({ 
//     company: 'PostNord Hemleverans',
//     price: 99,
//     deliveryDate: 1
// }, function (err, shipping) {
//     if (err) return handleError(err);
//     // saved!
//   });

module.exports = mongoose.model('Shipping', shippingSchema)