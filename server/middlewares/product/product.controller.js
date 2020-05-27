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

function getProduct(req, res, next) {
  Product.findById({ _id: req.params.id }, (err, result) => {
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

function updateProduct(req, res, next) {
  Product.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      nrInStock: req.body.nrInStock,
    },
    (err) => {
      if (err) {
        next(err);
      } else {
        res.json("Product updated!");
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
  addProduct,
  updateProduct,
  deleteProduct,
};
