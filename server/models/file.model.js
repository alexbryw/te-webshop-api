const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
      data: Buffer,
      contentType: String,
      name: String
})

module.exports = mongoose.model("File", fileSchema);