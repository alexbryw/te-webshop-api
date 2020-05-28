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

function checkProductInStock(req, res, next) {
    let errorFound = false
    if(!req.body.productRow || req.body.productRow.length < 1){
        res.status(400).json({msg: "Could not find any products in the order."})
    } else {
        console.log("from product row")
        console.log(req.body.productRow)
        req.body.productRow.map(productRow => {
            if(!productRow.product || !productRow.qty || isNaN(productRow.qty) || productRow.qty < 1){
                return errorFound = true
            } else {
                //TODO kolla produkt id och antal i db
                console.log(productRow.product)
                console.log(productRow.qty)
            }
        })
        
        if(!errorFound){
            //got next() if no errorFound
            res.json({msg: "test remove later check product in row"})
        } else {
            res.status(400).json({msg: "Wrong or missing 'product' and or 'qty'."})
        }
    }
}

module.exports = {getOrders, getMyOrders, placeOrder, updateOrderStatus, checkProductInStock}