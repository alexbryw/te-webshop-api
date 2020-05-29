const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  fileUpload,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../middlewares/product/product.controller");

// Get all products
router.get("/", getAllProducts);

// Get one product by id
router.get("/:id", getProduct);

// Add new product
router.post("/", fileUpload, addProduct);

// Update one product
router.put("/:id", updateProduct);

// Delete one product
router.delete("/:id", deleteProduct);

module.exports = router;
