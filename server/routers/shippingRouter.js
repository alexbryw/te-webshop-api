const express = require('express')
const router = express.Router()

const { getShippings, addShippings } = require('../middlewares/shipping/shipping-mw')

//Get all user.
router.get('/', getShippings)

//Get all shipping alternetives.
router.post('/', addShippings)



module.exports = router