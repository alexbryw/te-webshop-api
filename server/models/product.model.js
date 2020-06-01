const mongoose = require("mongoose");
const Schema = mongoose.Schema

const productSchema = new mongoose.Schema({
  file: {
    type: Schema.Types.ObjectId, ref: "File",
    required: true,
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
