const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
});

module.exports = mongoose.model("File", fileSchema);
