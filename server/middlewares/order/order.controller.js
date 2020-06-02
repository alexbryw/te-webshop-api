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

// post placeOrder.
async function placeOrder(req, res, next){
    const order = new orderModel(req.body)
    const orderSaved = await order.save()
    // console.log(orderSaved)
    if(orderSaved){
        for (const product of req.body.productRow) {
            console.log(product.product, product.qty)
            const updatedProductStock = await productModel.findByIdAndUpdate({_id: product.product},{$inc: {nrInStock:-product.qty}},{new: true})
            console.log(updatedProductStock)
        }
    }

    if(orderSaved){
        res.json(orderSaved)
    } else {
        res.status(400).json({err: "Could not place order."})
    }
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

    //---- Loop over all products in order req and see if they are in stock.
    for (const product of req.body.productRow) {
        if(product.product && product.qty && Number.isInteger(product.qty) && product.qty >= 1){
            const foundProduct = await productModel.findById({_id: product.product})
            if(foundProduct && foundProduct.nrInStock && (foundProduct.nrInStock >= product.qty)){
                // console.log("Yes order can be filled.")
                // console.log(foundProduct.nrInStock + " in stock")
                // console.log(product.qty + " qty in order.")
            } else {
                console.log("No. Order can not be filled.")
                errorFound = true
                errorMessage += " Problem adding product: " + product.product
            }
        } else {
            // console.log("From not found in req.")
            errorFound = true
            errorMessage += "Product not found in request and or wrong qty. "
        }
    }

    //---- If all products are in stock place order and update stock in next middleware.
    if(!errorFound){
        next()
    } else {
        res.status(400).json({err: errorMessage})
        // next(errorMessage)
    }
}

module.exports = {getOrders, getMyOrders, placeOrder, updateOrderStatus, checkProductInStock}