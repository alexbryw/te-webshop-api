const express = require('express')
const router = express.Router()
const { getOrders, getMyOrders, placeOrder, updateOrderStatus, checkProductInStock} = require('../middlewares/order/order.controller')

//Get all orders for admin only.
router.get("/", getOrders)

//Get orders from logged in user only.
router.get("/:id", getMyOrders)

//All logged in users can place an order.
router.post("/", checkProductInStock, placeOrder)

//Admin only can change shipping status. (patch? not post?)
router.patch("/:id", updateOrderStatus)

//Delete not needed in order.
// router.delete()

module.exports = router