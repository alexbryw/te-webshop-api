const orderModel = require('../../models/orderModel')

function getOrders(req, res, next) {
    const orders = orderModel.find((err, allOrders) =>{
        if(err){
            next(err)
        } else{
            res.json(allOrders)
        }
    }).populate('user','-password').populate('shipping').populate('productRow.product')
}

//:id //cookie id getMyOrders
function getMyOrders(req, res, next){ //TODO test with other users_id.
    // console.log(req.params.id)
    const userOrders = orderModel.find({user: req.params.id},(err, allUserOrders) =>{
        if(err){
            next(err)
        } else{
            res.json(allUserOrders)
        }
    }).populate('user','-password').populate('shipping').populate('productRow.product')
}

// post placeOrder
function placeOrder(req, res, next){ //TODO test multiple productRows.
    // console.log(req.body)
    const order = new orderModel(req.body)
    order.save((err, newOrder) => {
        if(err) {
            next(err)
        } else {
            res.json(newOrder)
        }
    })
}

// updateOrderStatus
function updateOrderStatus(req, res, next){
    // console.log(req.params.id)
    const order = orderModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, oneOrders) =>{
        if(err){
            next(err)
        } else{
            res.json(oneOrders)
        }
    }).populate('user','-password')
}

module.exports = {getOrders, getMyOrders, placeOrder, updateOrderStatus}