const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const { getFile, addFile } = require("../middlewares/files/file.controller");

router.use(fileUpload());

// Get one file by ID
router.get("/:id", getFile);

// Add new file
router.post("/", addFile);

module.exports = router;
