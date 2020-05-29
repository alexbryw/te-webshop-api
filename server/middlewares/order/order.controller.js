const orderModel = require('../../models/orderModel')
const productModel = require('../../models/productModel')

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
    let errorMessage
    if(!req.body.productRow || req.body.productRow.length < 1){
        return res.status(400).json({msg: "Could not find any products in the order."})
    }

    console.log("from product row")
    console.log(req.body.productRow)
    let idList = []
    for (const product of req.body.productRow) {
        if(product.product || product.product.length < 1){
            idList.push(product.product)
        } else {
            res.status(400).json({msg: "Product missing."})
            break
        }
    }

    const productFound = productModel.find().where('_id').in(idList).exec((err, product) => {
        if(err){
            next(err)
        } else {
            console.log(product)
            res.json({msg: "ok"})
        }
    })


    // for (const productRow of req.body.productRow) {
    //     if(!productRow.product || !productRow.qty || isNaN(productRow.qty) || productRow.qty < 1 || errorFound){
    //         errorFound = true
    //         break
    //     } else {
    //         //TODO kolla produkt id och antal i db
    //         console.log(productRow.product)
    //         console.log(productRow.qty)
    //         const productFound = productModel.findById({_id: productRow.product}, (err, product) => {
    //             if(err){
    //                 errorFound = true
    //                 errorMessage = err
    //                 throw new Error
    //                 // console.log(errorMessage)
    //                 // next(err)
    //             } else {
    //                 console.log("from product db")
    //                 console.log(product)
    //             }
    //         })
    //     }
    // }
    
    // if(!errorFound){
    //     //got next() if no errorFound
    //     res.json({msg: "test remove later check product in row"})
    // } else {
    //     // res.status(400).json({msg: "Wrong or missing 'product' and or 'qty'."})
    //     // next(errorMessage)
    // }
}

module.exports = {getOrders, getMyOrders, placeOrder, updateOrderStatus, checkProductInStock}