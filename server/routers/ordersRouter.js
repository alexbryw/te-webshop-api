const express = require('express')
const router = express.Router()
const { getOrders } = require('../middlewares/order/order-mw')

router.get("/", getOrders)

// router.post("/")

//Change shipping status only. patch? not post?
// router.put("/")

//Delete not needed in order.
// router.delete()

module.exports = router