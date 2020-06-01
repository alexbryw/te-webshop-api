const express = require("express");
const fileUpload = require('express-fileupload')
const router = express.Router();
const {
  getFile,
  addFile,
} = require("../middlewares/files/file.controller");

router.use(fileUpload())

// Get one product by id
router.get("/:id", getFile);

// Add new product
router.post("/", addFile);


module.exports = router;
