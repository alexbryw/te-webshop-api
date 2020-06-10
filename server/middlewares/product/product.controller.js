const Product = require("../../models/product.model");

function getAllProducts(req, res, next) {
  const product = Product.find({}, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.json(result);
    }
  }).populate('file')
}

function getProduct(req, res, next) {
  const product = Product.findById({ _id: req.params.id }, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.json(result);
    }
  }).populate('file')
}

function getProductsByCategory(req, res, next) {
  const products = Product.find({ category: req.params.category }, (err, result) => {
    if (err) {
      next(err)
    } else {
      res.json(result)
    }
  }).populate('file')
}

function addProduct(req, res, next) {
  const product = new Product(req.body);
  product.save((err, product) => {
    if (err) {
      next(err);
    } else {
      res.json(product);
    }
  })
}

function updateProduct(req, res, next) {
  console.log(req.body)
  Product.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, result) => {
      if (err) {
        next(err);
      } else {
        res.json(result);
      }
    }
  );
}

function deleteProduct(req, res, next) {
  Product.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.json(result);
    }
  });
}

module.exports = {
  getAllProducts,
  getProduct,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
};
