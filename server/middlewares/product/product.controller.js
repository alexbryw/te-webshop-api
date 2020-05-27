const Product = require("../../models/productModel");

function getAllProducts(req, res, next) {
  Product.find({}, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.json(result);
    }
  });
}

function addProduct(req, res, next) {
  const product = new Product(req.body);
  product.save((err, product) => {
    if (err) {
      next(err);
    } else {
      res.json(product);
    }
  });
}

module.exports = { getAllProducts, addProduct };
