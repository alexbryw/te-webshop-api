const express = require("express");
const router = express.Router();
const {
  // getProduct,
  getAllProducts,
  addProduct,
  // updateProduct,
  // deleteProduct,
} = require("../middlewares/product/product.controller");

// const checkAdminRights = require("..middlewares/sessionAuth/checkAdminRights");

// Get all products
router.get("/", getAllProducts);

// Get one product by id
// router.get("/:id", getProduct);

// Add new product
router.post("/", addProduct);

// Update one product
// router.put("/:id", updateProduct);

// Delete one product
// router.delete("/:id", deleteProduct);

module.exports = router;
