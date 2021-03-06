const express = require('express')
const router = express.Router()
const {
    getOrders,
    getOrder,
    placeOrder,
    updateOrderStatus,
    checkProductInStock
} = require('../middlewares/order/order.controller')

const {
    checkLoginSession,
    checkAuthorization
} = require('../middlewares/session/session.controller')

//Get all orders for admin only.
router.get("/",
    checkLoginSession,
    getOrders)

//Get orders from logged in user only.
router.get("/:id",
    checkLoginSession,
    getOrder)

// //Get orders from logged in user only.
// router.get("/:id", getMyOrders)

//All logged in users can place an order.
router.post("/",
    checkLoginSession,
    checkProductInStock,
    placeOrder)

//Admin only can change shipping status. (patch? not post?)
router.patch("/:id",
    checkLoginSession,
    checkAuthorization,
    updateOrderStatus)

module.exports = router