const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  //   img: {
  //     data: Buffer,
  //     contentType: String,
  //   },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  nrInStock: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
