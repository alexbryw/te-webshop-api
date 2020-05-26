const orderModel = require('../../models/orderModel')

function getOrders(req, res, next) {
    res.json({msg: "TODO get all orders."})
}

//:id //cookie id getMyOrders
function getMyOrders(req, res, next){
    res.json({msg: "TODO get my orders."})
}

// post placeOrder
function placeOrder(req, res, next){
    res.json({msg: "TODO place order."})
}

// updateOrderStatus
function updateOrderStatus(req, res, next){
    res.json({msg: "TODO update order shipped status."})
}

module.exports = {getOrders, getMyOrders, placeOrder, updateOrderStatus}