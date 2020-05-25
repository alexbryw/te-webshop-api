const mongoose = require("mongoose");

const productSchema = new.mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
  title: String,
  description: String,
  price: Number,
  category: [String],
  nrInStock: Number,
});

module.exports = mongoose.model("Product", productSchema);
