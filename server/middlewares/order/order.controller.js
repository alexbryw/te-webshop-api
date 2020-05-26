const orderModel = require('../../models/orderModel')

function getOrders(req, res, next) {
    res.json({msg: "get all orders."})
}

module.exports = {getOrders}