const File = require("../../models/file.model");

function addFile(req, res, next) {
  const file = new File({
    name: req.files.image.name,
    data: req.files.image.data,
    contentType: req.files.image.mimetype,
  });
  console.log(file);
  file.save((err, doc) => {
    if (err) {
      next(err);
      console.log(err);
      return;
    }
    doc.data = undefined;
    console.log(doc);
    res.send(doc);
  });
}

function getFile(req, res, next) {
  const file = File.findById({ _id: req.params.id }, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.json(result);
    }
  });
}

module.exports = {
  addFile,
  getFile,
};
