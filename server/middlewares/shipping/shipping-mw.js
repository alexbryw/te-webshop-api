const Shipping = require("../../models/shippingModel")

//GET all shipping options from database.
async function getShippings(req, res, next) {
    try {
        const shipping = await Shipping.find();
        res.json(shipping);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//POST Shipping options from database.
function addShippings(req, res, next){
    const shipping = new Shipping(req.body)
    shipping.save((err,shipping) => { 
        if (err) {
            next(err)
        } else{
            res.json(shipping)
        }
    })
}

module.exports = { addShippings, getShippings }