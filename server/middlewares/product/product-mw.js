const Product = require("../../models/productModel");

// Get all products from database
// async function getAllProducts(req, res, next) {
//   try {
//     const products = await Product.find();
//     res.json(products);
//     next();
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }

// Get one product by id from database
// function getProduct(req, res, next) {
//   res.json();
// }

async function addProduct(req, res, next) {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    nrInStock: req.body.nrInStock,
  });
  try {
    const newProduct = await product.save();
    res
      .status(201)
      .json({
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        nrInStock: newProduct.nrInStock,
      });
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { addProduct };
