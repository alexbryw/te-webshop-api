const orderModel = require('../../models/orderModel')
const productModel = require('../../models/product.model')

// get all orders
const getOrders = async (req, res) => {
    let query = {}
    if (!req.session.admin) {
        query.user = req.session.id
    }
    const orders = await orderModel.find(query).populate('user').populate('shipping').populate('productRow.product')
    res.json(orders)
}

// get one order
const getOrder = async (req, res) => {
    try {
        let query = {}
        if (req.body.id) query._id = req.body._id
        if (req.params.id) query._id = req.params.id



        order = orderModel.findOne(query, (err, order) => {
            if (err) {
                next(err)
            } else {
                res.json(order)
            }
        })
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}

//:id //cookie id getMyOrders
const getMyOrders = (req, res, next) => { //TODO test with other users_id.
    const userOrders = orderModel.find({ user: req.params.id }, (err, allUserOrders) => {
        if (err) {
            next(err)
        } else {
            res.json(allUserOrders)
        }
    }).populate('user', '-password').populate('shipping').populate('productRow.product')
}

// post placeOrder.
const placeOrder = async (req, res, next) => {
    const order = new orderModel(req.body)
    const orderSaved = await order.save()
    if (orderSaved) {
        for (const product of req.body.productRow) {
            const updatedProductStock = await productModel.findByIdAndUpdate({ _id: product.product }, { $inc: { nrInStock: -product.qty } }, { new: true })
        }
    }

    if (orderSaved) {
        res.json(orderSaved)
    } else {
        res.status(400).json({ err: "Could not place order." })
    }
}

// updateOrderStatus
const updateOrderStatus = (req, res, next) => {
    const order = orderModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, oneOrders) => {
        if (err) {
            next(err)
        } else {
            res.json(oneOrders)
        }
    }).populate('user', '-password')
}

//check if order products are in stock before placing order.
const checkProductInStock = async (req, res, next) => {
    let errorFound = false
    let errorMessage = ""

    if (!req.body.productRow || req.body.productRow.length < 1) {
        return res.status(400).json({ err: "Could not find any products in the order." })
    } else if (req.body.user !== req.session.id) {
        return res.status(401).json({ err: "Wrong user is placing order." })
    }

    //---- Loop over all products in order req and see if they are in stock.
    for (const product of req.body.productRow) {

        if (product.product && product.qty && Number.isInteger(product.qty) && product.qty >= 1) {
            const foundProduct = await productModel.findById({ _id: product.product })
            if (foundProduct && foundProduct.nrInStock && (foundProduct.nrInStock >= product.qty)) {

            } else {
                errorFound = true
                errorMessage += " Problem adding product: " + product.product
            }
        } else {
            errorFound = true
            errorMessage += "Product not found in request and or wrong qty. "
        }
    }

    //Check for duplicate product id's in order request.
    if (!errorFound) {
        //Create array of product_id string only.
        let productList = req.body.productRow.map(function (product) {
            return product.product
        })

        //Set will not allow duplicates. Will be true if there are duplicates.
        let isDuplicate = (new Set(productList)).size !== productList.length
        if (isDuplicate) {
            errorFound = true
            errorMessage += "Duplicate product id found. "
        }

    }

    //---- If all products are in stock place order and update stock in next middleware.
    if (!errorFound) {
        next()
    } else {
        res.status(400).json({ err: errorMessage })
    }
}


module.exports = { getOrders, getMyOrders, getOrder, placeOrder, updateOrderStatus, checkProductInStock }