const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
    required: false,
  },
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
    min: [0, "The price must be greater than 0"],
    required: true,
  },
  category: [{
    type: String,
    required: true,
  }],
  nrInStock: {
    type: Number,
    min: [0, "Stock can't be less than 0"],
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
