const Product = require("../../models/product.model");

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
  console.log(req)
  console.log("fiiiles", req.files)
  console.log(req.body, "booody")
  // const product = new Product(req.body);
  // product.save((err, product) => {
  //   if (err) {
  //     next(err);
  //   } else {
  //     res.json(product);
  //   }
  // });
  res.json({msg: "test"})
}

function updateProduct(req, res, next) {
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
  addProduct,
  updateProduct,
  deleteProduct,
};
