const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../middlewares/product/product.controller");

const {
  checkLoginSession,
  checkAuthorization
} = require('../middlewares/session/session.controller')

// Get all products
router.get("/", getAllProducts);

// Get one product by id
router.get("/:id", getProduct);

// Get products by category
router.get("/category/:category", getProductsByCategory);

// Add new product
router.post("/", checkLoginSession, checkAuthorization, addProduct);

// Update one product
router.put("/:id",
checkLoginSession,
checkAuthorization,
updateProduct);

// Delete one product
router.delete("/:id", checkLoginSession, checkAuthorization, deleteProduct);

module.exports = router;
