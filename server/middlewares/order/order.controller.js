const orderModel = require('../../models/orderModel')
const productModel = require('../../models/product.model')

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

async function checkProductInStock(req, res, next) {
    let errorFound = false
    let errorMessage = ""
    if(!req.body.productRow || req.body.productRow.length < 1){
        return res.status(400).json({msg: "Could not find any products in the order."})
    }

    for (const product of req.body.productRow) {
        if(product.product && product.qty && Number.isInteger(product.qty) && product.qty >= 1){
            const foundProduct = await productModel.findById({_id: product.product})
            if(foundProduct && foundProduct.nrInStock && (foundProduct.nrInStock >= product.qty)){
                console.log("Yes order can be filled.")
                console.log(foundProduct.nrInStock + " in stock")
                console.log(product.qty + " qty in order.")
            } else {
                console.log("No order can not be filled.")
                errorFound = true
                errorMessage += " Problem adding product: " + product.product
                // console.log(foundProduct)
            }
        } else {
            console.log("From not found in req.")
            errorFound = true
            errorMessage += "Product not found in request and or wrong qty."
        }
    }
    console.log(errorFound , " 2.bool error found.")
    if(!errorFound){
        //got next() if no errorFound
        res.json({msg: "test remove later check product in row"})
    } else {
        res.status(400).json({err: errorMessage})
        // next(errorMessage)
    }
}

module.exports = {getOrders, getMyOrders, placeOrder, updateOrderStatus, checkProductInStock}