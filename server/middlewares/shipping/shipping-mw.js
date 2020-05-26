const Shipping = require("../../models/shippingModel")
//Get all users from database..
async function getShippings(req, res, next) {
    try {
        const shipping = await Shipping.find();
        res.json(shipping);
        next()
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//POST Shipping options from database.
function addShippings(req, res, next){
    const shipping = new Shipping(req.body)
    shipping.save((err,shipping) =>{ 
        if (err) {
            next(err)
        } else{
            res.json(shipping)
        }
    })
}

module.exports = { addShippings, getShippings }




// async function getShipping(req, res, next) {
//     try {
//         const shipping = new ShippingModel(req.body)
//         await shipping.find({})
//         res.json(shipping);
//         next()
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }